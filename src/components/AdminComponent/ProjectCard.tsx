import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import Link from "next/link";
import DeleteModel from "../DeleteModel";

interface Props {
  data: {
    title: string;
    description: string;
    github: string;
    image: string;
    link: string;
    technologies: string;
  }[];
  getProjects: () => void;
  deleteProject: (id: any) => void;
}

const ProjectCard = ({data, getProjects, deleteProject}: Props ) => {
  
  return (
    <div className={`flex flex-wrap ${ data.length > 0 ? "justify-center" : "justify-normal"} sm:justify-normal gap-5 mt-4`}>
      {data && data.length > 0 ? (
        data.map((project : any) => (
          <div key={project._id} className="flex flex-col mt-1   bg-slate-100 px-4 py-2 sm:max-w-[250px] max-w-full w-full border  rounded-md ">
            <img
              className="w-full object-cover sm:h-[150px] h-[200px] border-2 aspect-square rounded-md"
              src={project.image}
              alt=""
            />
            <h3 className="font-medium mt-2 text-md truncate ">{project.title}</h3>

            <p className="truncate text-[#000000ea]  text-sm">
              {project.description}
            </p>
            <div className="flex mt-4 gap-4 justify-end items-center">
                <DeleteModel item={project} onDelete={deleteProject}/>
                <Link href={`/dashboard/project/${project._id}`}>
                <FaEdit className="text-blue-400 cursor-pointer text-xl"/>
                </Link>
            </div>
          </div>
        ))
      ) : (
        <div className="!text-left">No Projects Found</div>
      )}
    </div>
  );
};

export default ProjectCard;
