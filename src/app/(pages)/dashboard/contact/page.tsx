"use client";
import React, { useEffect, useState } from "react";
import LinkCard from "@/components/AdminComponent/LinkCard";
import { LinkField } from "@/components/AdminComponent/LinkField";
import { useSession } from "next-auth/react";
import { toast } from 'sonner';

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
        toast.success('Link Deleted Successfully');
        getLinks();
      }
    } catch (error) {
      console.error(error);
      toast.error('Link Deletion Failed');
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
    <div className="mt-16">
      <h1 className="text-2xl font-medium">Contact Detail</h1>
      <div className="w-full mt-4 border rounded-md p-4">
      
      <div className="  w-full">
        <LinkField fetchLinks={getLinks} />
      </div>
      <LinkCard fetchLinks={getLinks} removeLinks={removeLinks} icons={icons}/>
    </div>
    </div>
  );
};

export default page;
