"use client"
import React, { useEffect, useState } from "react";
import ProjectCard from "@/components/AdminComponent/ProjectCard";
import { useSession } from "next-auth/react";

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

       if(response.ok){
        console.log("project deleted")
       }
    } catch (error) {
      console.log(error)
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
    <div className="w-full mt-2 border rounded-md px-4 py-10">
      <h1 className="text-2xl font-medium">Manage Projects</h1>
      <ProjectCard getProjects={getProjects} data={data} deleteProject={deleteProject} />
    </div>
  );
};

export default page;
