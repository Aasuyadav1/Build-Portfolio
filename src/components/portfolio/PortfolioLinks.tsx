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
    <section className="w-fit     p-3  ">
      <div className="mt-1 flex flex-wrap justify-center items-center w-fit gap-2">
      {allSkills.map((skill) => (
        <SocialIcon 
          key={skill.network}
          url={skill.url}
          style={{ height: 40, width: 40 }}
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
