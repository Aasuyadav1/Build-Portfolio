
import Link from "next/link";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import SharePortfolio from "./SharePortfolio";

export default function PortfolioNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm dark:bg-gray-950 dark:text-gray-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="text-lg flex items-end font-bold"
          prefetch={false}
        >
          <img
            src="https://res.cloudinary.com/driaaeuhp/image/upload/v1718370102/myPortfolio/private/idi0ioweymygbowtvotd.png"
            alt=""
            className="h-[35px] w-[35px] object-cover"
          />
          <span className="text-[#1D3944]">buildPortfolio</span>
        </Link>
        <nav className="hidden space-x-10 md:flex">
          <Link
            href="#about"
            className="nav-link font-medium transition-colors hover:text-portfolioPrimary"
            prefetch={false}
          >
            About
          </Link>
          <Link
            href="#skill"
            className="nav-link font-medium transition-colors hover:text-portfolioPrimary"
            prefetch={false}
          >
            Skill
          </Link>
          <Link
            href="#project"
            className="nav-link font-medium transition-colors hover:text-portfolioPrimary"
            prefetch={false}
          >
            Project
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <SharePortfolio />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <Link
                href="/"
                className="text-lg flex items-end font-bold"
                prefetch={false}
              >
                <img
                  src="https://res.cloudinary.com/driaaeuhp/image/upload/v1718370102/myPortfolio/private/idi0ioweymygbowtvotd.png"
                  alt=""
                  className="h-[35px] w-[35px] object-cover"
                />
                <span className="text-[#1D3944]">buildPortfolio</span>
              </Link>
              <div className="grid gap-2 py-6">
                <SheetClose asChild>
                  <Link
                    href="#about"
                    className="flex w-full items-center py-2 text-lg font-semibold transition-colors hover:text-portfolioPrimary"
                    prefetch={false}
                  >
                    About
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="#skill"
                    className="flex w-full items-center py-2 text-lg font-semibold transition-colors hover:text-portfolioPrimary"
                    prefetch={false}
                  >
                    Skills
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="#project"
                    className="flex w-full items-center py-2 text-lg font-semibold transition-colors hover:text-portfolioPrimary"
                    prefetch={false}
                  >
                    Projects
                  </Link>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

