import React from "react";
import { SocialIcon } from "react-social-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  fetchLinks: () => void;
  removeLinks: (id: any) => void;
  icons: { label: string; link: string; _id: string }[];
}

const LinkCard = ({ fetchLinks, removeLinks, icons }: Props) => {
  return (
    <div
      className={`flex flex-wrap ${
        icons.length > 0 ? "justify-center" : "justify-normal"
      } sm:justify-normal mt-4 gap-5`}
    >
      {icons && icons.length > 0 ? (
        icons.map((icon) => (
          <div
            key={icon._id}
            className="flex flex-col  gap-2 border bg-slate-100 px-4 py-2 min-[570px]:max-w-[250px] w-full rounded-md relative"
          >
            <DropdownMenu>
              <DropdownMenuTrigger>
                <svg
                  width={15}
                  height={15}
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute top-3 right-2 cursor-pointer"
                >
                  <path
                    d="M8.625 2.5C8.625 3.12132 8.12132 3.625 7.5 3.625C6.87868 3.625 6.375 3.12132 6.375 2.5C6.375 1.87868 6.87868 1.375 7.5 1.375C8.12132 1.375 8.625 1.87868 8.625 2.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM7.5 13.625C8.12132 13.625 8.625 13.1213 8.625 12.5C8.625 11.8787 8.12132 11.375 7.5 11.375C6.87868 11.375 6.375 11.8787 6.375 12.5C6.375 13.1213 6.87868 13.625 7.5 13.625Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  />
                </svg>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="mt-4">
                <DropdownMenuItem
                  className="hover:bg-accent font-normal"
                  onClick={(e) => {
                    if (
                      !icon.link.startsWith("http://") &&
                      !icon.link.startsWith("https://")
                    ) {
                      window.open(`http://${icon.link}`, "_blank");
                    }
                    window.open(icon.link, "_blank");
                  }}
                >
                  View
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => removeLinks(icon._id)}
                  className="text-red-500 hover:bg-red-100  font-medium"
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <SocialIcon
              style={{ height: 35, width: 35 }}
              key={icon.label}
              network={icon.label}
              url={icon.link}
            />
            <div>
              <h1 className="font-medium text-sm truncate">{icon.label}</h1>
              <p className="truncate text-gray-800 text-sm">{icon.link}</p>
            </div>
          </div>
        ))
      ) : (
        <h1 className="!text-left">No Links Found</h1>
      )}
    </div>
  );
};

export default LinkCard;
