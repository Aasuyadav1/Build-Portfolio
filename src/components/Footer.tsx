import React from "react";
import Link from "next/link";
import { RxExternalLink } from "react-icons/rx";

const Footer = () => {
  return (
    <footer className="w-full mt-6  py-3 px-2 flex justify-around text-center gap-10 items-center">
      <p>
        Powered by{" "}
        <Link
          href="/"
          className="hover:underline font-medium  text-portfolioSecondary transition-colors"
        >
          buildPortfolio &#8599;
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
