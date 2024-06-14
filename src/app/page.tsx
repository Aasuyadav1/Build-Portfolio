'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn, signOut } from 'next-auth/react';
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation"; // Fixed import from "next/navigation" to "next/router"

export default function Component() {
  const { data: session, status } = useSession();
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingGithub, setLoadingGithub] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard/about')
      toast.success('Signed in successfully!');
      if(loadingGoogle || loadingGithub){
        setLoadingGoogle(false);
        setLoadingGithub(false);
      }
    }
  }, [status])

  const handleSignInGoogle = async () => {
    setLoadingGoogle(true);
    await signIn('google', { redirect: false }); // Use redirect: false to handle redirection manually
  }

  const handleSignInGithub = async () => {
    setLoadingGithub(true);
    await signIn('github', { redirect: false }); // Use redirect: false to handle redirection manually
  }

  return (
    <div className="flex flex-col min-h-dvh">
      <main className="flex-1 px-4 md:px-6 py-12 md:py-24 lg:py-32 flex flex-col items-center justify-center space-y-8">
        <div className="max-w-xl space-y-4 text-center">
          <h1 className="text-xl font-bold tracking-tighter sm:text-2xl md:text-4xl">Welcome to <span className="text-portfolioPrimary">myPortfolio</span></h1>
          <p className="text-gray-500 md:text-md dark:text-gray-400">
            myPortfolio enables you to effortlessly display your work to the world. It is fully responsive, customizable, and simple to set up.
          </p>
        </div>
        <div className="w-full max-w-md space-y-4">
          <Button variant="outline" onClick={handleSignInGoogle} className="w-full" disabled={loadingGoogle}>
            
                <FcGoogle className="mr-2 h-5 w-5" />
                Sign in with Google 
                {
                  loadingGoogle && <span className="loader2 ml-5" style={{height:"20px",width:"20px"}}></span>
                }
             
          </Button>
          <Button variant="outline" onClick={handleSignInGithub} className="w-full" disabled={loadingGithub}>
            
                <FaGithub className="mr-2 h-5 w-5" />
                Sign in with GitHub
                {
                  loadingGithub &&  <span style={{height:"20px",width:"20px"}} className="loader2 ml-5"></span>
                }
          </Button>
        </div>
      </main>
    </div>
  )
}
