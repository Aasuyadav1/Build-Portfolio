import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

const PortfolioProjectCard = ({ projectData }:any ) => {
 
  return (
    <section id="project" className="mt-4 w-full ">
      <h1 className="text-2xl font-bold text-portfolioPrimary">#Projects</h1>
      <div className="w-full mt-4 border-2 px-2 py-6 border-solid rounded-sm flex flex-wrap sm:justify-normal justify-center gap-5">
        {projectData &&
          projectData.map((project: any, i: number) => (
            <div
              key={i}
              className="bg-slate-100 relative p-2 max-w-[350px] w-full border-2  rounded-md"
            >
              <img
                className="w-full cursor-pointer rounded-sm object-cover h-[200px] border-2"
                src={project?.image}
                alt="project"
              />
              <div className="mt-4">
                <h1 className="text-lg font-bold text-black">
                  {project?.title}
                </h1>
                <p style={{
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 2,
                    overflow: 'hidden',
                  }} className="text-[15px]  text-gray-700">
                  {project?.description}
                </p>
                
                <div className="flex mt-3 mb-9 flex-wrap gap-2">
                  {project?.technologies &&
                    project?.technologies.map((tech: any, j: number) => (
                      <span
                        key={j}
                        className="font-medium border-2 border-gray-300 border-solid  rounded-full px-2  text-gray-500 text-[13px]"
                      >
                        {tech}
                      </span>
                    ))}
                </div>

                
              </div>
              {(project.github || project.link) && (
                <div className="w-full absolute bottom-2 right-2 flex justify-end items-center gap-4">
                  {project.github && (
                    <Link href={project.github} target="_blank">
                      <FaGithub className="text-gray-500 hover:scale-125 transition-all cursor-pointer text-lg" />
                    </Link>
                  )}
                  {project.link && (
                    <Link href={project.link} target="_blank">
                      <FaExternalLinkAlt className="text-gray-500 cursor-pointer hover:scale-125 transition-all text-lg" />
                    </Link>
                  )}
                </div>
              )}
            </div>
          ))}
      </div>
    </section>
  );
};

export default PortfolioProjectCard;
