"use client";
import React, { useState, useEffect } from "react";
import InputAdmin from "@/components/AdminComponent/InputAdmin";
import { Button } from "@/components/ui/button";
import { useForm, FieldError } from "react-hook-form";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

type AboutFormData = {
  userid: string | undefined;
  name: string;
  heading: string;
  about: string;
  image: FileList; // Use FileList to handle file input
};

const Page: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<string>("");
  const { data: session, status } = useSession();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AboutFormData>();
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [aboutId, setAboutId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pageLoading, setPageLoading] = useState<boolean>(true); // Add a state for page loading
  const [previousImage, setPreviousImage] = useState<string>("");


  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const onSubmit = async (data: AboutFormData) => {
    setIsLoading(true);
    let imageUrl = imagePreview;

    // Upload the image first if it exists
    if (data.image && data.image.length > 0) {
      const formData = new FormData();
      formData.append("file", data.image[0]);

      // delete the previous image if it exists

      const imageResponse = await fetch("/api/image/upload", {
        method: "POST",
        body: formData,
      });

      const imageResult = await imageResponse.json();

      if (previousImage) {
        console.log("previousImage", previousImage);
        const response = fetch(`/api/image/upload/${previousImage}`, {
          method: "DELETE",
        });
      }
      if (imageResponse.ok) {
        imageUrl = imageResult.imgUrl;
        setPreviousImage(imageUrl);
      } else {
        console.error("Failed to upload image", imageResult);
        setIsLoading(false);
        return;
      }
    } else {
      if (!imagePreview) {
        toast.error("Please select an image");
        setIsLoading(false);
        return;
      }
    }

    const aboutData = {
      userid: session?.user?.id,
      name: data.name,
      heading: data.heading,
      about: data.about,
      image: imageUrl,
    };

    if (isUpdate) {
      await updateUserAbout(aboutData);
    } else {
      await addUserAbout(aboutData);
    }
    setTimeout(() => setIsLoading(false), 1000);
  };

  const addUserAbout = async (
    data: Omit<AboutFormData, "image"> & { image: string }
  ) => {
    try {
      const response = await fetch("/api/portfolio/about/addabout", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("About added successfully");
        setIsUpdate(true); // Set to update mode after adding
      } else {
        console.error("Failed to submit data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUserAbout = async () => {
    setPageLoading(true); // Set pageLoading to true when starting data fetch
    try {
      const response = await fetch(
        `/api/portfolio/about/getabout/${session?.user?.id}`,
        {
          method: "GET",
          cache: "default"
        }
      );

      const data = await response.json();

      if (response.ok && data.data && data.data.length > 0) {
        setIsUpdate(true);
        setIsLoading(false);
        setValue("name", data.data[0].name);
        setAboutId(data.data[0]._id);
        setValue("heading", data.data[0].heading);
        setValue("about", data.data[0].about);
        setPreviousImage(data.data[0].image);
        
        setImagePreview(data.data[0].image); // Set the current image preview
      } else {
        setIsUpdate(false);
        setIsLoading(false);
        setAboutId(""); // Reset aboutId if there's no existing data
        // console.log(data);
      
      }
    } catch (error) {
      console.log("error getting user about", error);
    } finally {
      setPageLoading(false); // Set pageLoading to false when data fetch is complete
    }
  };

  const updateUserAbout = async (
    data: Omit<AboutFormData, "image"> & { image: string }
  ) => {
    try {
      const response = await fetch(`/api/portfolio/about/${aboutId}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("About updated successfully");
      } else {
        console.error("Failed to submit data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setValue("image", files);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const getErrorMessage = (
    error: FieldError | undefined
  ): string | undefined => {
    return error?.message;
  };

  useEffect(() => {
    if (status === "authenticated") {
      getUserAbout();
    }
  }, [status === "authenticated"]);

  if (pageLoading || status === "loading") {
    return (
      <main className="flex justify-center items-center w-full h-screen">
        <span className="loader2"></span>
      </main>
    );
  }

  return (
    <div className="md:mt-16 mt-4 px-2">
      <h1 className="text-2xl font-medium">Personal Details</h1>
      <div className="w-full mt-2 border rounded-md px-4 py-4">
        <div className="w-full flex gap-4 justify-end">
          <Button
            className="flex gap-2 px-6"
            onClick={handleSubmit(onSubmit)}
            disabled={isLoading}
          >
            {isUpdate ? "Update" : "Add"}
            {isLoading && <span className="loader ml-2"></span>}
          </Button>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full mt-4 lg:grid lg:grid-cols-2 gap-x-6"
        >
          <div className="flex flex-col gap-9">
            <InputAdmin
              label="Name"
              placeholder="Enter your name"
              {...register("name")}
              error={getErrorMessage(errors.name)}
            />
            <InputAdmin
              label="About"
              placeholder="Enter details about yourself"
              {...register("about")}
              error={getErrorMessage(errors.about)}
              textarea={true}
            />
          </div>
          <div className="flex mt-9 lg:mt-0 flex-col gap-9">
            <InputAdmin
              label="Heading"
              placeholder="Enter your headlines"
              {...register("heading")}
              error={getErrorMessage(errors.heading)}
            />
            <InputAdmin
              type="file"
              label="Image"
              placeholder="Upload project image"
              onChange={handleImageChange} // Use onImageChange for file input
              error={getErrorMessage(errors.image)}
              image={!!imagePreview}
              imageUrl={imagePreview}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
