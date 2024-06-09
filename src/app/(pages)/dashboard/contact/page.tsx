"use client";
import React, { useEffect, useState } from "react";
import LinkCard from "@/components/AdminComponent/LinkCard";
import { LinkField } from "@/components/AdminComponent/LinkField";
import { useSession } from "next-auth/react";

const page = () => {
  const { data: session, status } = useSession();
  const [icons, setIcons] = useState([]);

  const getLinks = async () => {
    if (!session?.user?.id) return;
    try {
      const response = await fetch(`/api/portfolio/links/getlinks/${session?.user?.id}`);
      const data = await response.json();
      if (response.ok) {
        setIcons(data.data)
      }
    } catch (error) {
      console.error(error);
    }
  };

  const removeLinks = async (id:any) => {
    try {
      const response = await fetch(`/api/portfolio/links/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        console.log('Product is deleted successfully');
        getLinks();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      getLinks();
    }
  }, [status]);

  if (status === 'loading') return <div className="w-full h-screen flex justify-center items-center">
    <h1>Loading...</h1>
  </div>;
  return (
    <div className="w-full mt-2 border rounded-md p-4">
      <h1 className="text-2xl font-medium">Links</h1>
      <div className="mt-4 max-w-[200px] w-full">
        <LinkField fetchLinks={getLinks} />
      </div>
      <LinkCard fetchLinks={getLinks} removeLinks={removeLinks} icons={icons}/>
    </div>
  );
};

export default page;
