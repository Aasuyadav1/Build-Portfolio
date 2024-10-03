import React from "react";
import PortfolioNavbar from "@/components/portfolio/PortfolioNavbar";
import Footer from "@/components/Footer";
import { redirect } from "next/navigation";


const Layout = async ({ children, params }: Readonly<{ children: React.ReactNode, params : {username: string} }>) => {
  await redirect('https://www.buildportfolio.co/' + params.username)
  return (
    <div className="scroll-smooth" >
      
      <PortfolioNavbar/>
      {
        children
      }
      <Footer/>
    </div>
  );
};

export default Layout;
