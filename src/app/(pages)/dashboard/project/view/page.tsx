"use client"
import React, { useEffect, useState } from "react";
import ProjectCard from "@/components/AdminComponent/ProjectCard";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from 'sonner';

const page = () => {
  const { data: session, status } = useSession();
  const [data, setData] = useState([]);

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
        console.log("data", data);
        setData(data.data)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProject = async ( id : any) => {
    try {
       const response = await fetch(`/api/portfolio/project/${id}`, {
        method: "DELETE",
       })
       await getProjects();

       toast.success('Project Deleted Successfully')
       
    } catch (error) {
      console.log(error)
      toast.error('Project Deletion Failed')
    }
  }

  useEffect(() => {
    if(status === "authenticated"){
      getProjects();
    }
  }, [status === "authenticated"]);

  if(status === "loading"){
    return <div className="w-full h-screen flex justify-center items-center">Loading</div>
  }

  return (
    <div className="md:mt-16 mt-4 px-2">
      <h1 className="text-2xl font-medium">Manage Projects</h1>
      <div className="w-full border mt-2 rounded-md px-4 py-6">
      <div className="w-full flex justify-end ">
      <Link href={"/dashboard/project"}>
      <Button >Add Project</Button>
      </Link>
      </div>
      
      <ProjectCard getProjects={getProjects} data={data} deleteProject={deleteProject} />
      
    </div>
    </div>
  );
};

export default page;
