"use client";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import Signup from "@/components/signup";
import InputAdmin from "@/components/AdminComponent/InputAdmin";
import PortfolioAbout from "@/components/portfolio/PortfolioAbout";
import LinkCard from "@/components/AdminComponent/LinkCard";
import SkillCard from "@/components/AdminComponent/SkillCard";
import ProjectCard from "@/components/AdminComponent/ProjectCard";
import { SkillField } from "@/components/AdminComponent/SkillField";

export default function Home() {
  const [formData, setFormData] = React.useState({
    name: "",
    headlines: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData);
  };

  return (
    <main className="h-full w-full">
      Portfolio Preview
    </main>
  );
}
