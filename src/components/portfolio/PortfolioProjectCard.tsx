"use client";
import React, { useState, useEffect } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

const PortfolioProjectCard = ({ id, projectData }: any) => {
  useEffect(() => {
    if (projectData && projectData.length > 0) {
      console.log("Technologies array:", projectData[0].technologies);
    }
  }, [projectData]);

  return (
    <section className="mt-4 w-full ">
      <h1 className="text-2xl font-bold text-primary">#Projects</h1>
      <div className="w-full mt-4 border-2 px-2 py-6 border-solid border-iconbg rounded-sm flex flex-wrap sm:justify-normal justify-center gap-2">
        {projectData &&
          projectData.map((project: any, i: number) => (
            <div
              key={i}
              className="bg-slate-100 relative p-2 max-w-[250px] w-full border-2 border-solid border-iconbg rounded-md"
            >
              <img
                className="w-full cursor-pointer rounded-sm object-cover h-[150px] border-2 border-solid border-[#D9D9D9]"
                src={project?.image}
                alt="project"
              />
              <div className="">
                <h1 className="text-lg font-bold text-black">
                  {project?.title}
                </h1>
                <p className="text-[15px] text-[#000000d3]">
                  {project?.description}
                </p>
                
                <div className="flex mt-4 mb-4 flex-wrap gap-2">
                  {project?.technologies &&
                    project?.technologies.map((tech: any, j: number) => (
                      <span
                        key={j}
                        className="font-medium bg-iconbg border-[1px] border-solid border-primary rounded-full px-2 text-secondary text-[13px]"
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
                      <FaGithub className="text-blue-600 cursor-pointer text-lg" />
                    </Link>
                  )}
                  {project.link && (
                    <Link href={project.link} target="_blank">
                      <FaExternalLinkAlt className="text-blue-600 cursor-pointer text-lg" />
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
