"use client";
import React from "react";
import LinkCard from "@/components/AdminComponent/LinkCard";
import { LinkField } from "@/components/AdminComponent/LinkField";
import { useSession } from "next-auth/react";

const page = () => {
  const { data: session } = useSession();
  const getSkills = async () => {
    try {
      const response = await fetch("/api/portfolio/links" + session?.user?.id );

      const data = await response.json();

      if (response.ok) {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeSkills = async (id: any) => {
    try {
      const response = await fetch(`/api/portfolio/links/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log(" Product is deleted successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full mt-2 border rounded-md p-4">
      <h1 className="text-2xl font-medium">Links</h1>
      <div className="mt-4 max-w-[200px] w-full">
        <LinkField />
      </div>
      <LinkCard />
    </div>
  );
};

export default page;
