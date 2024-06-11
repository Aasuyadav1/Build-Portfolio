"use client";
import React, { useState, useEffect } from "react";
import InputAdmin from "@/components/AdminComponent/InputAdmin";
import { Button } from "@/components/ui/button";
import { useForm, FieldError } from "react-hook-form";
import { useSession } from "next-auth/react";
import { Publish } from "@/components/Publish";

type AboutFormData = {
  userid: string | undefined;
  name: string;
  heading: string;
  about: string;
  image: FileList; // Use FileList to handle file input
};

const Page: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<string>("");
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AboutFormData>();
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [aboutId, setAboutId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (session) {
      getUserAbout();
    }
  }, [session]);

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

      const imageResponse = await fetch("/api/image/upload", {
        method: "POST",
        body: formData,
      });

      const imageResult = await imageResponse.json();
      if (imageResponse.ok) {
        imageUrl = imageResult.imgUrl;
      } else {
        console.error("Failed to upload image", imageResult);
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

      const res = await response.json();

      if (response.ok) {
        console.log(res);
      } else {
        console.error("Failed to submit data", res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUserAbout = async () => {
    try {
      const response = await fetch(
        `/api/portfolio/about/getabout/${session?.user?.id}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("update user data");
        setIsUpdate(true);
        setValue("name", data.data[0].name);
        setAboutId(data.data[0]._id);
        setValue("heading", data.data[0].heading);
        setValue("about", data.data[0].about);
        setImagePreview(data.data[0].image); // Set the current image preview
      } else {
        setIsUpdate(false);
        console.log(data);
      }

      console.log("add user data");
    } catch (error) {
      console.log("error getting user about", error);
    }
  };

  const updateUserAbout = async (
    data: Omit<AboutFormData, "image"> & { image: string }
  ) => {
    try {
      console.log(data);
      const response = await fetch(`/api/portfolio/about/${aboutId}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const res = await response.json();

      if (response.ok) {
        console.log(res);
      } else {
        console.error("Failed to submit data", res);
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

  return (
    <div className="w-full mt-2 border rounded-md px-4 py-10">
      <h1 className="text-2xl font-medium">Personal Details</h1>
      <div className="w-full flex gap-10 justify-end">
        <Button onClick={handleSubmit(onSubmit)} disabled={isLoading}>
          {isUpdate ? "Update" : "Add"}
          {isLoading && <span className="loader ml-2"></span>}
        </Button>
        <Publish/>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full mt-4 grid grid-cols-2 gap-x-6"
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
        <div className="flex flex-col gap-9">
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
        <div className="col-span-2 flex justify-end">
          <Button type="submit" className="flex gap-4" disabled={isLoading}>
            {isUpdate ? "Update" : "Add"}
            {isLoading && <span className="loader ml-2"></span>}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Page;
