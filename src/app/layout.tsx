import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SideNavbar from "@/components/SideNavbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col gap-1 md:flex-row md:gap-2">
          <SideNavbar />
          <div className=" md:mt-0 md:ml-[280px] mt-16">{children}</div>
        </div>
      </body>
    </html>
  );
}
