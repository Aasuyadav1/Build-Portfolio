"use client";
import React, { useEffect } from "react";
import { SocialIcon, getKeys } from "react-social-icons";

interface Props {
  allSkills: { network: string; url: string }[];
}

const allIcons = getKeys();

const PortfolioLinks = ({id, allLinks} : any) => {
  useEffect(() => {
    console.log("this ksills",allLinks);
  }, [allLinks]);
  return (
    <section className="w-fit p-3 ">
      <div className="mt-1 flex flex-wrap justify-center items-center w-fit gap-2">
      { allLinks && allLinks.map((skill : any) => (
        <SocialIcon 
          key={skill?.label}
          url={skill?.link}
          style={{ height: 40, width: 40 }}
          network={skill?.label?.toLowerCase()}
          target="_blank"
        />
      ))
    }
      </div>
    </section>
  );
};

export default PortfolioLinks;
