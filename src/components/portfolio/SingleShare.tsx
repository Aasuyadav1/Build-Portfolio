'use client'
import React, { useState } from "react";
import { SocialIcon } from "react-social-icons";
import { RiGithubFill } from "react-icons/ri";
import Image from "next/image";

const SingleShare = ({id}:any) => {
  const [allLinks, setAllLinks] = useState([])

  const getlinks = async () => {
    try {
      const response = await fetch("/api/portfolio/links/getlinks/" + id );

      const data = await response.json();

      if (response.ok) {
        console.log("links are fetched successfully",data);
        setAllLinks(data.data)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="mt-4 w-full h-full">
      <h1 className="text-2xl font-bold text-primary">#Single share</h1>
      <div className="w-full py-6 px-2 h-full border-2 border-solid border-iconbg mt-4 flex justify-center items-center">
      <div className=" max-w-[380px] w-full px-6 py-10 flex flex-col justify-center rounded-lg items-center border-2 border-solid border-primary bg-iconbg">
        <div className="flex justify-center items-center w-full max-w-[150px]  md:max-w-[150px] aspect-square p-1 rounded-full border-solid border-4 border-secondary">
          <Image
            className="rounded-full object-cover w-full h-full"
            src="https://images.unsplash.com/photo-1618641986557-1ecd230959aa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
            alt="user's image"
            width={100}
            height={100}
            quality={100}
            title="user image"
          />
        </div>
        <div className="text-center mt-4 ">
          <h3 className="">
            <span className="font-semibold text-md">My Self,</span>{" "}
            <span className="text-secondary text-3xl font-bold">Aasu</span>
          </h3>
          <h1 className="text-xl   font-bold">Full Stack Developer</h1>
        </div>
        <div className="mt-4 flex w-full flex-col gap-3">
            <div className="flex gap-2 items-center bg-iconbg border-2 border-solid border-secondary rounded-full px-4 py-[2px] ">
                <RiGithubFill className="text-secondary text-2xl" />
                <a target="_blank" href="https://github.com/Aasu-Yadav" className="text-secondary font-medium text-sm truncate" >https://github.com/Aasu-Yadav</a>
            </div>
            
        </div>
      </div>
      </div>
    </section>
  );
};

export default SingleShare;
