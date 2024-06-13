'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn, signOut } from 'next-auth/react';
import { useSession } from "next-auth/react";
import { useEffect } from "react";



export default function Component() {
  const { data: session, status } = useSession();
 


 
  return (
    <div className="flex flex-col min-h-dvh">
  
      <main className="flex-1 px-4 md:px-6 py-12 md:py-24 lg:py-32 flex flex-col items-center justify-center space-y-8">
        <div className="max-w-xl space-y-4 text-center">
          <h1 className="text-xl font-bold tracking-tighter sm:text-2xl md:text-4xl">Welcome to myPortfolio</h1>
          <p className="text-gray-500 md:text-md dark:text-gray-400">
          Create Portfolio enables you to effortlessly display your work to the world. It is fully responsive, customizable, and simple to set up.
          </p>
        </div>
        <div className="w-full max-w-md space-y-4">
          <Button variant="outline" onClick={() => signIn('google')} className="w-full">
            <FcGoogle className="mr-2 h-5 w-5" />
            Sign in with Google
          </Button>
          <Button variant="outline" onClick={() => signIn('github')} className="w-full">
            <FaGithub className="mr-2 h-5 w-5" />
            Sign in with GitHub
          </Button>
        </div>
      </main>
     
    </div>
  )
}
