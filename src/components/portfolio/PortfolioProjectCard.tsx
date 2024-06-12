"use client";
import React, { useState } from "react";

const PortfolioProjectCard = ({id, projectData}:any) => {
  

  return (
    <section className="mt-4 w-full ">
      <h1 className="text-2xl font-bold text-primary">#Projects</h1>
      <div className="w-ful mt-4 border-2 px-2 py-6  border-solid border-iconbg rounded-sm flex flex-wrap gap-2">
        {
          projectData && projectData.map((project: any, i : number) => (
            <div key={i} className="p-2 max-w-[300px] w-full border-2 border-solid border-iconbg rounded-md">
          <img
            className="w-full cursor-pointer rounded-sm object-cover h-[250px]  border-2 border-solid border-[#D9D9D9]"
            src={project?.image}
            alt=" project"
          />
          <div className="">
            <h1 className="text-xl font-bold text-black">{project?.title}</h1>
            <p className="text-[16px] text-[#000000d3]">
              {project?.description}
            </p>
            <div className="flex mt-2 flex-wrap gap-2">
              {["html", "css", "javascript", "node js", "next js"].map(
                (skil) => (
                  <span className="font-medium bg-iconbg border-2 border-solid border-primary rounded-full px-2 text-secondary  text-sm">
                    #{skil}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
          ))
        }
      </div>
    </section>
  );
};

export default PortfolioProjectCard;
