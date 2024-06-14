import React from "react";
import Link from "next/link";
import { RxExternalLink } from "react-icons/rx";

const Footer = () => {
  return (
    <footer className="w-full mt-6 border-t-2 py-3 px-2 flex justify-around gap-10 items-center">
      <div className="flex gap-1 opacity-90">
        <p>&copy; {new Date().getFullYear()} all rights reserved </p>
      </div>
      <p>
        Powered by{" "}
        <Link
          href="/"
          className="hover:underline font-medium  text-portfolioSecondary transition-colors"
        >
          myPortfolio &#8599;
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
