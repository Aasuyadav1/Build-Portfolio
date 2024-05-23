import Image from "next/image";
import { Button } from "@/components/ui/button";
import Signup from "@/components/signup";
import PortfolioAbout from "@/components/portfolio/PortfolioAbout";


export default function Home() {
  return (
    <main className=" min-h-screen w-full">
     
        <PortfolioAbout/>
  
    </main>
  );
}
