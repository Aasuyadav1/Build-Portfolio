"use client";
import React from "react";
import InputAdmin from "@/components/AdminComponent/InputAdmin";
import { LinkField } from "@/components/AdminComponent/LinkField";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";


const Page = () => {
  const [imagePreview, setImagePreview] = useState("");
  const [formData, setFormData] : any = React.useState({
    name: "",
    heading: "",
    about: "",
    image: "",
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (
      e.target instanceof HTMLInputElement &&
      e.target.type === "file" &&
      e.target.files
    ) {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        image: file,
      });
      setImagePreview(URL.createObjectURL(file));
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
    console.log(formData);
  };

  useEffect(() => {
    return () => {
      // Clean up the URL.createObjectURL to avoid memory leaks
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <div className="w-full mt-2 border rounded-md px-4 py-10">
        <h1 className="text-2xl font-medium">Personal Details</h1>
        <div className="w-full flex justify-end">
            <Button>Add Project</Button>
        </div>
        <div className="w-full mt-4 grid grid-cols-2 gap-x-6 ">
      <div className="flex flex-col gap-9">
        <InputAdmin
          label="Name"
          placeholder="Enter your name"
          onChange={handleChange}
          value={formData.name}
          name="name"
        />
        <InputAdmin
          label="About"
          placeholder="Enter details about yourself"
          onChange={handleChange}
          value={formData.about}
          name="about"
          textarea={true}
        />
      </div>
      <div className="flex flex-col gap-9">
        <InputAdmin
          label="Heading"
          placeholder="Enter your headlines"
          onChange={handleChange}
          value={formData.heading}
          name="heading"
        />
        <InputAdmin
            type="file"
            label="Image"
            placeholder="Upload project image"
            onChange={handleChange}
            name="image"
            image={!!imagePreview}
            imageUrl={imagePreview}
          /> 
          
      </div>
        </div>
    </div>
  );
};

export default Page;
