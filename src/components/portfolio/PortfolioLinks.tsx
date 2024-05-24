"use client";
import React, { useEffect } from "react";
import { SocialIcon, getKeys } from "react-social-icons";

interface Props {
  allSkills: { network: string; url: string }[];
}

const allIcons = getKeys();

const PortfolioLinks = ({ allSkills } : Props) => {
  useEffect(() => {
    console.log(allIcons);
  }, []);
  return (
    <section className=" fixed bottom-0 right-0 bg-iconbg  p-3  border-l-4 border-t-4 rounded-tl-[40px] border-solid border-secondary ">
      <div className="mt-1 flex flex-col gap-2">
      {allSkills.map((skill) => (
        <SocialIcon 
          key={skill.network}
          url={skill.url}
          network={skill.network.toLowerCase()}
          target="_blank"
        />
      ))
    }
      </div>
    </section>
  );
};

export default PortfolioLinks;
