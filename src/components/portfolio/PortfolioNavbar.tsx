import Link from "next/link";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function PortfolioNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm dark:bg-gray-950 dark:text-gray-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="text-lg font-bold" prefetch={false}>
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">My Portfolio</span>
        </Link>
        <nav className="hidden space-x-4 md:flex">
          <Link
            href="#about"
            className="nav-link transition-colors hover:text-portfolioPrimary"
            prefetch={false}
          >
            About
          </Link>
          <Link
            href="#skill"
            className="nav-link transition-colors hover:text-portfolioPrimary"
            prefetch={false}
          >
            Skills
          </Link>
          <Link
            href="#project"
            className="nav-link transition-colors hover:text-portfolioPrimary"
            prefetch={false}
          >
            Projects
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
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

function MountainIcon(props: any) {
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
