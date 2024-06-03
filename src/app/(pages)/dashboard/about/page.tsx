"use client";
import React, { useState, useEffect } from "react";
import InputAdmin from "@/components/AdminComponent/InputAdmin";
import { Button } from "@/components/ui/button";
import { aboutValidation } from "@/Schema/aboutValidation";
import { useForm, FieldError } from "react-hook-form";
import { useSession } from "next-auth/react";

type AboutFormData = {
  name: string;
  heading: string;
  about: string;
  image: string
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

  const onSubmit = async (data: AboutFormData) => {
    console.log(data);
    console.log("submit invoked", session);
    try {
        
       console.log("image is uploaded",data.image);

       const imageurl = await fetch("/api/image/upload", {
        method: "POST",
        body: JSON.stringify({ path: data.image }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("image is uploaded",imageurl);

      const response = await fetch("/api/portfolio/about/addabout", {
        method: "POST",
        body: JSON.stringify({
          userid: session?.user?.id,
          name: data.name,
          heading: data.heading,
          about: data.about,
        }),
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
    const file = e.target.files?.[0];
    console.log(file);
    if (file) {
      setValue("image", file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const getErrorMessage = (error: FieldError | undefined): string | undefined => {
    return error?.message;
  };

  return (
    <div className="w-full mt-2 border rounded-md px-4 py-10">
      <h1 className="text-2xl font-medium">Personal Details</h1>
      <div className="w-full flex justify-end">
        <Button>Add Project</Button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-4 grid grid-cols-2 gap-x-6">
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
            onChange={handleImageChange}
            name="image"
            image={!!imagePreview}
            imageUrl={imagePreview}
          />
        </div>
        <div className="col-span-2 flex justify-end">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default Page;
