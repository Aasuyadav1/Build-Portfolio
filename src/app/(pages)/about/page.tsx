"use client";
import React from "react";
import InputAdmin from "@/components/AdminComponent/InputAdmin";
import { LinkField } from "@/components/AdminComponent/LinkField";


const Page = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    heading: "",
    about: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData);
  };

  return (
    <div className="w-full mt-2 border rounded-md p-4">
        <h1 className="text-2xl font-medium">Personal Details</h1>
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
      </div>
        </div>
        <h1 className="text-2xl mt-10 font-medium">Links</h1>
        <LinkField/>
    </div>
  );
};

export default Page;
