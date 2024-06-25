"use client";
import React, { useEffect, useState } from "react";
import LinkCard from "@/components/AdminComponent/LinkCard";
import { LinkField } from "@/components/AdminComponent/LinkField";
import { useSession } from "next-auth/react";
import { toast } from 'sonner';

const Page: React.FC = () => {
  const { data: session, status } = useSession();
  const [icons, setIcons] = useState([]);
  const [pageLoading, setPageLoading] = useState<boolean>(true); // Add a state for page loading

  const getLinks = async () => {
    if (!session?.user?.id) return;
    setPageLoading(true); // Set pageLoading to true when starting data fetch
    try {
      const response = await fetch(`/api/portfolio/links/getlinks/${session?.user?.id}`);
      const data = await response.json();
      if (response.ok) {
        setIcons(data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setPageLoading(false); // Set pageLoading to false when data fetch is complete
    }
  };

  const removeLinks = async (id: any) => {
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
    if (icons.length === 0) {
      getLinks();
    }
  }, [status === 'authenticated']);

  if (status === 'loading' || pageLoading) {
    return (
      <main className="flex justify-center items-center w-full h-screen">
      <span className="loader2"></span>
    </main>
    );
  }

  return (
    <div className="md:mt-16 mt-4 px-2">
      <h1 className="text-2xl font-medium">Contact Detail</h1>
      <div className="w-full mt-4 border rounded-md p-4">
        <div className="w-full">
          <LinkField fetchLinks={getLinks} />
        </div>
        <LinkCard fetchLinks={getLinks} removeLinks={removeLinks} icons={icons} />
      </div>
    </div>
  );
};

export default Page;
