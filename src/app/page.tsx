"use client";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";


export default function Home() {
  const [formData, setFormData] = React.useState({
    name: "",
    headlines: "",
  });

  const { data: session, status } = useSession();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData);
  };

  const getUserPortfolio = async () => {
    try {
      const response = await fetch('/api/portfolio/'+ session?.user?.id);

      const data = await response.json();

      if(response.ok){
        console.log("user portfolio fetched successfully", data)
      }
    } catch (error) {
      console.log("error on fetching the user portfolio " ,error)
    }
  }

  useEffect(()=>{
    if(status === "authenticated"){
      getUserPortfolio()
    }
  },[status === "authenticated"])

  if(status === "loading"){
    return (
      <main className="h-full w-full">
        Loading...
      </main>
    )
  }

  return (
    <main className="h-full w-full">
      Portfolio Preview
    </main>
  );
}
