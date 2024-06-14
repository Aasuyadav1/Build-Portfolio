import React from "react";
import PortfolioNavbar from "@/components/portfolio/PortfolioNavbar";


const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="scroll-smooth" >
      
      <PortfolioNavbar/>
      {
        children
      }
    </div>
  );
};

export default Layout;
