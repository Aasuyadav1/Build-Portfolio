"use client";
import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ScrollArea } from "../ui/scroll-area";
import { getKeys, SocialIcon } from "react-social-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface Framework {
  value: string;
  label: string;
}

export function LinkField({ fetchLinks }: { fetchLinks: () => void }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [frameworks, setFrameworks] = useState<Framework[]>([]);
  const [customLink, setCustomLink] = useState("");
  const { data: session } = useSession();

  useEffect(() => {
    const allIcons = getKeys();
    const frameworkList = allIcons.map((icon) => ({
      value: icon,
      label: icon,
    }));
    setFrameworks(frameworkList);
  }, []);

  const selectedFramework = frameworks.find(
    (framework) => framework.value === value
  );

  const isValidUrl = (url: string) => {
    const urlPattern = new RegExp(
      /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g
    );
    return urlPattern.test(url);
  };

  const addLink = async () => {
    if (!customLink || !selectedFramework?.value) {
      return alert("Please fill in all fields.");
    }

    if (!isValidUrl(customLink)) {
      return alert("Please enter a valid URL.");
    }

    try {
      const response = await fetch(
        "/api/portfolio/links/addlinks/" + session?.user?.id,
        {
          method: "POST",
          body: JSON.stringify({
            link: customLink,
            label: selectedFramework?.value,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        fetchLinks();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-[400px]">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full">Add Link</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Link</DialogTitle>
            <DialogDescription>
              Add a new link to your portfolio
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
                >
                  {selectedFramework ? (
                    <div>
                      <SocialIcon
                        style={{ height: 30, width: 30 }}
                        url={`https://${selectedFramework.value}.com`}
                        className="mr-2"
                      />
                      {selectedFramework.label}
                    </div>
                  ) : (
                    "Select Links..."
                  )}
                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0">
                <Command className="w-full">
                  <CommandInput placeholder="Search link..." className="h-9" />
                  <ScrollArea className="h-[170px]">
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandList>
                      <CommandGroup className="w-full">
                        {frameworks.map((framework) => (
                          <CommandItem
                            key={framework.value}
                            value={framework.value}
                            onSelect={(currentValue) => {
                              setValue(
                                currentValue === value ? "" : currentValue
                              );
                              setCustomLink("");
                              setOpen(false);
                            }}
                          >
                            <SocialIcon
                              style={{ height: 30, width: 30 }}
                              url={`https://${framework.value}.com`}
                              className="mr-2"
                            />
                            {framework.label}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                value === framework.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </ScrollArea>
                </Command>
              </PopoverContent>
            </Popover>
            <Input
              type="text"
              placeholder="ex. https://example.com"
              value={customLink}
              onChange={(e) => setCustomLink(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button type="submit" onClick={addLink}>
              Add now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
