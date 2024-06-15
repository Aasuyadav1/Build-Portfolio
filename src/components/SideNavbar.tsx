"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  SheetTrigger,
  SheetContent,
  Sheet,
  SheetClose,
} from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { FiExternalLink } from "react-icons/fi";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function SideNavbar() {
  const { data: session, status } = useSession();
  const pathName = usePathname();
  const [domain, setDomain] = useState("");
  const [isPublish, setIsPublilsh] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const NavList = [
    {
      name: "About",
      href: "/dashboard/about",
      icon: InfoIcon,
    },
    {
      name: "Skills",
      href: "/dashboard/skill",
      icon: MenuIcon,
    },
    {
      name: "Projects",
      href: "/dashboard/project/view",
      icon: MountainIcon,
    },
    {
      name: "Contact info",
      href: "/dashboard/contact",
      icon: UserIcon,
    },
  ];

  const onSubmit = async () => {
    setIsPublishing(true);
    try {
      if (domain === "") return toast.error("Please enter a domain name");

      const response = await fetch(
        "/api/portfolio/domain/" + session?.user?.id,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ domain: domain }),
        }
      );

      const added = await response.json();

      if (response.ok) {
        toast.success("Portfolio published successfully");
        setIsPublilsh(true);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to publish portfolio");
    } finally {
      setIsPublishing(false);
    }
  };

  const getDomainName = async (domain: string) => {
    try {
      // console.log("domain get", domain);
      const response = await fetch(`/api/portfolio/domain/${domain}`, {
        method: "GET",
      });

      // console.log("response", response);

      if (response.ok) {
        setIsPublilsh(true);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to get domain name");
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      const domain = session?.user?.name?.split(" ")[0]?.toLowerCase();

      setDomain(domain);

      if (domain) {
        getDomainName(domain);
      }
    }
  }, [status === "authenticated"]);

  return (
    <div>
      <div className="w-full flex justify-end gap-4 bg-gray-100 border fixed py-2 px-10">
        {!isPublish && (
          <Button variant="outline" onClick={onSubmit}>
            Publish Portfolio
          </Button>
        )}
        {isPublish && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => window.open(`/${domain}`, "_blank")}
                variant="outline"
                size="icon"
              >
                <FiExternalLink className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Preview</p>
            </TooltipContent>
          </Tooltip>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-9 w-9">
              <AvatarImage src={session?.user?.image} />
              <AvatarFallback>{session?.user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[240px] top-4">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <div className="font-medium">{session?.user?.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {session?.user?.email}
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-600 hover:bg-red-100"
              onClick={() => signOut()}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <nav className="hidden fixed   h-screen w-64 shrink-0 border-r  bg-gray-100 dark:border-gray-800 dark:bg-gray-900 md:block ">
        <div className="flex h-full flex-col justify-between py-6">
          <div className="space-y-6 px-4">
            <Link href="/" className="flex text-lg items-end font-bold">
              <img
                src="https://res.cloudinary.com/driaaeuhp/image/upload/v1718370102/myPortfolio/private/idi0ioweymygbowtvotd.png"
                alt=""
                className="h-[35px] w-[35px] object-cover"
              />
              <span className="text-[#1D3944]">myPortfolio</span>
            </Link>
            <div className="space-y-2">
              {NavList.map((item, index) => {
                return (
                  <Link
                    key={index}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800"
                    href={item.href}
                  >
                    {item.icon && <item.icon className="h-5 w-5" />}
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
          {/* <div className="px-4">
            <Link
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800"
              href="#"
            >
              <SettingsIcon className="h-5 w-5" />
              Settings
            </Link>
          </div> */}
        </div>
      </nav>
      <div className="p-2 w-full fixed z-50 md:hidden">
        <header className="flex h-14 items-center justify-between border-b bg-white px-4 dark:border-gray-800 z-[999] dark:bg-gray-900 ">
          <div className="flex items-center gap-4 w-full">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-9 w-9">
                  <AvatarImage src={session?.user?.image} />
                  <AvatarFallback>
                    {session?.user?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[240px] top-4">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <div className="font-medium">{session?.user?.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {session?.user?.email}
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600 hover:bg-red-100"
                  onClick={() => signOut()}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {!isPublish && (
              <Button variant="outline" onClick={onSubmit}>
                Publish Portfolio
              </Button>
            )}
            {isPublish && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => window.open(`/${domain}`, "_blank")}
                    variant="outline"
                    size="icon"
                  >
                    <FiExternalLink className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Preview</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button className="rounded-full" size="icon" variant="outline">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex h-full flex-col justify-between py-2">
                <div className="space-y-6 px-1">
                  <Link href="/" className="flex text-lg items-end font-bold">
                    <img
                      src="https://res.cloudinary.com/driaaeuhp/image/upload/v1718370102/myPortfolio/private/idi0ioweymygbowtvotd.png"
                      alt=""
                      className="h-[35px] w-[35px] object-cover"
                    />
                    <span className="text-[#1D3944]">myPortfolio</span>
                  </Link>
                  <div className="space-y-2">
                    {NavList.map((item, index) => {
                      return (
                        <SheetClose key={index} asChild>
                          <Link
                            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800"
                            href={item.href}
                          >
                            {item.icon && <item.icon className="h-5 w-5" />}
                            {item.name}
                          </Link>
                        </SheetClose>
                      );
                    })}
                  </div>
                </div>
                {/* <div className="px-4">
                  <Link
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800"
                    href="#"
                  >
                    <SettingsIcon className="h-5 w-5" />
                    Settings
                  </Link>
                </div> */}
              </div>
            </SheetContent>
          </Sheet>
        </header>
        {/* <main className="p-4 md:p-6">
          <h1 className="text-2xl font-bold">Welcome to Acme Inc</h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            This is the main content area.
          </p>
        </main> */}
      </div>
    </div>
  );
}

function BriefcaseIcon(props: any) {
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
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  );
}

function FolderIcon(props: any) {
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
      <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
    </svg>
  );
}

function HomeIcon(props: any) {
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
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function InfoIcon(props: any) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
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

function SettingsIcon(props: any) {
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
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function UserIcon(props: any) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
