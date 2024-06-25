"use client";
import React, { useEffect, useState } from "react";
import ProjectCard from "@/components/AdminComponent/ProjectCard";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from 'sonner';

const Page = () => {
  const { data: session, status } = useSession();
  const [data, setData] = useState([]);
  const [pageLoading, setPageLoading] = useState<boolean>(true);

  const getProjects = async () => {
    try {
      if (!session?.user?.id) return;

      const response = await fetch(
        "/api/portfolio/project/allprojects/" + session?.user?.id,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      if (response.ok) {
        // console.log("data", data);
        setData(data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPageLoading(false);
    }
  };

  const deleteProject = async (id: any) => {
    deleteImage(id)
    try {
      const response = await fetch(`/api/portfolio/project/${id}`, {
        method: "DELETE",
      });
      await getProjects();

      toast.success('Project Deleted Successfully');
    } catch (error) {
      console.log(error);
      toast.error('Project Deletion Failed');
    }
  };

  const deleteImage = async (id : string) => {
    try {
      const response = await fetch("/api/portfolio/project/" + id, {
        method: "GET",
      });

      const data = await response.json();

      if (response.ok) {
        const image = data.data.image;
        if(image){
          const response = fetch(`/api/image/upload/${image}`, {
            method: "DELETE",
          });
        }
      }
    } catch (error) {
      console.log("error on deleting image",error);
    }
  }

  useEffect(() => {
    if (data.length === 0) {
      getProjects();
    }
  }, [status === "authenticated"]);

  if (status === "loading" || pageLoading) {
    return (
      <main className="flex justify-center items-center w-full h-screen">
        <span className="loader2"></span>
      </main>
    );
  }

  return (
    <div className="md:mt-16 mt-4 px-2">
      <h1 className="text-2xl font-medium">Manage Projects</h1>
      <div className="w-full border mt-2 rounded-md px-4 py-6">
        <div className="w-full flex justify-end">
          <Link href={"/dashboard/project"}>
            <Button>Add Project</Button>
          </Link>
        </div>
        <ProjectCard getProjects={getProjects} data={data} deleteProject={deleteProject} />
      </div>
    </div>
  );
};

export default Page;
