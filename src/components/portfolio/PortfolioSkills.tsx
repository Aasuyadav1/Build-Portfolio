"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import SkillCard from "../AdminComponent/SkillCard";

interface Icon {
  name: string;
  body: string;
}

const SkillsSection = ({ id, skillData }: any) => {
  return (
    <section id="skill" className=" mt-4 w-full ">
      <h1 className="text-2xl font-bold text-portfolioPrimary">#Skills</h1>
      <div className="flex mt-4 px-2 py-6 border-2 border-solid border-iconbg rounded-sm w-full h-full sm:justify-normal justify-center flex-wrap gap-2 ">
        {skillData &&
          skillData.map((icon: any, i: number) => (
            <div className="flex truncate flex-col justify-center items-center  gap-2 bg-slate-100 px-4 py-2 max-w-[150px] w-full rounded-md ">
              <img
                style={{ height: 50, width: 50 }}
                key={icon.value}
                className="rounded-lg"
                src={
                  icon.label.startsWith("http") ||
                  icon.label.startsWith("https")
                    ? icon.label
                    : `https://skillicons.dev/icons?i=${icon.label}`
                }
              />

              <h1 className="font-medium text-md truncate">{icon.value}</h1>
            </div>
          ))}
      </div>
    </section>
  );
};

export default SkillsSection;
