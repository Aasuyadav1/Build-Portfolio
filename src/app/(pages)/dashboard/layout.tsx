
import React from "react";
import SideNavbar from "@/components/SideNavbar";


const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="flex flex-col gap-1 md:flex-row md:gap-2">
      <SideNavbar />
      <div className="md:mt-0 md:ml-[280px] mt-16 w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default Layout;
