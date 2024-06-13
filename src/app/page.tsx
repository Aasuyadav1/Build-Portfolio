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

function ChromeIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  )
}


function GitlabIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 13.29-3.33-10a.42.42 0 0 0-.14-.18.38.38 0 0 0-.22-.11.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18l-2.26 6.67H8.32L6.1 3.26a.42.42 0 0 0-.1-.18.38.38 0 0 0-.26-.08.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18L2 13.29a.74.74 0 0 0 .27.83L12 21l9.69-6.88a.71.71 0 0 0 .31-.83Z" />
    </svg>
  )
}


function MountainIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}