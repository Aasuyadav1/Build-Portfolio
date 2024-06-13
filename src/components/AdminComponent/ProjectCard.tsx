import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import Link from "next/link";
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
    <div className="flex flex-wrap gap-2 mt-4">
      {data && data.length > 0 ? (
        data.map((project : any) => (
          <div className="flex flex-col mt-1   bg-slate-100 px-4 py-2 max-w-[250px] w-full rounded-md ">
            <img
              className="w-full object-cover h-[150px] aspect-square rounded-md"
              src={project.image}
              alt=""
            />
            <h3 className="font-medium mt-2 text-md truncate ">{project.title}</h3>

            <p className="truncate text-[#000000ea]  text-sm">
              {project.description}
            </p>
            <div className="flex mt-4 gap-4 justify-end items-center">
                <Link href={project._id}>
                <MdDeleteOutline className="text-red-400 cursor-pointer text-[24px]"/>
                </Link>
                <Link href={`/dashboard/project/${project._id}`}>
                <FaEdit className="text-blue-400 cursor-pointer text-xl"/>
                </Link>
            </div>
          </div>
        ))
      ) : (
        <div>No Projects Found</div>
      )}
    </div>
  );
};

export default ProjectCard;
