"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn, signOut } from "next-auth/react";
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
    if (status === "authenticated") {
      router.push("/dashboard/about");
      if (loadingGoogle || loadingGithub) {
        setLoadingGoogle(false);
        setLoadingGithub(false);
      }
    }
  }, [status]);

  const handleSignInGoogle = async () => {
    setLoadingGoogle(true);
    await signIn("google", { redirect: false }); // Use redirect: false to handle redirection manually
  };

  const handleSignInGithub = async () => {
    setLoadingGithub(true);
    await signIn("github", { redirect: false }); // Use redirect: false to handle redirection manually
  };

  return (
    <div className="flex bg-[#FEFDFF] flex-col min-h-dvh px-2 py-2">
      <Link href="/" className="flex text-lg items-end font-bold">
        <img
          src="https://res.cloudinary.com/driaaeuhp/image/upload/v1718370102/myPortfolio/private/idi0ioweymygbowtvotd.png"
          alt=""
          className="h-[35px] w-[35px] object-cover"
        />
        <span className="text-[#1D3944]">myPortfolio</span>
      </Link>
      <main className="flex-1 px-4 md:px-6 py-12 md:py-24 lg:py-32 flex flex-col items-center justify-center space-y-8">
        <div className="max-w-xl space-y-4 text-center">
          <h1 className="text-2xl font-bold tracking-tighter sm:text-2xl md:text-4xl">
            Welcome to{" "}
            <span className="text-portfolioPrimary text-3xl md:text-5xl">myPortfolio</span>
          </h1>
          <p className="text-gray-700 text-md md:text-lg dark:text-gray-400">
          MyPortfoli is a web platform enabling users to create and deploy stunning portfolio effortlessly. Elevate your online presence and attract opportunities with MyPortfoli
          </p>
        </div>
        <div className="w-full max-w-md space-y-4">
          <Button
            variant="outline"
            onClick={handleSignInGoogle}
            className="w-full border-2"
            disabled={loadingGoogle}
          >
            <FcGoogle className="mr-2 h-5 w-5" />
            Sign in with Google
            {loadingGoogle && (
              <span
                className="loader2 ml-5"
                style={{ height: "20px", width: "20px", borderWidth: "2px" }}
              ></span>
            )}
          </Button>
          <Button
            variant="outline"
            onClick={handleSignInGithub}
            className="w-full border-2"
            disabled={loadingGithub}
          >
            <FaGithub className="mr-2 h-5 w-5" />
            Sign in with GitHub
            {loadingGithub && (
              <span
                style={{ height: "20px", width: "20px", borderWidth: "2px" }}
                className="loader2 ml-5"
              ></span>
            )}
          </Button>
        </div>
      </main>
    </div>
  );
}
