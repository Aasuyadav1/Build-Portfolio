// Assuming you are using TypeScript based on your type annotations

'use client'
import React from 'react'
import SideNavbar from '@/components/SideNavbar';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';


const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const { data: session, status } = useSession();


  useEffect(() => {
    if (status === "unauthenticated") {
      window.location.href = "/";
    }
  }, [status]);

  // Show loading or any other UI while session status is being checked
  if (status === "loading") {
    return (
      <div>Loading...</div>
    );
  }

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
