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
import { toast } from "sonner";
import { Label } from "../ui/label";

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
  const [isLoading, setIsLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

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
      /^(https?:\/\/)?([a-zA-Z0-9-_]+\.)+[a-zA-Z]{2,6}(\/[a-zA-Z0-9-_#]+\/?)*$/
    );
    return urlPattern.test(url);
  };

  const addLink = async () => {
    setIsLoading(true);
    if (!customLink || !selectedFramework?.value) {
      toast.info("Please fill in all fields.");
      setIsLoading(false);
      return;
    }

    if (!isValidUrl(customLink)) {
      toast.info("Please enter a valid URL.");
      setIsLoading(false);
      return;
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
        toast.success("Link added successfully");
        setTimeout(() => {
          setIsLoading(false);
          setOpen(false);
          setDialogOpen(false);
          setValue("");
          setCustomLink("");
        }, 1000);
      } else {
        toast.error("Failed to add link");
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while adding the link");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-end">
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => setDialogOpen(true)} className="px-6">
            Add Link
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Link</DialogTitle>
            <DialogDescription>
              Add a new contact link to your portfolio
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <div>
                  <Label>Select logo</Label>
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
                </div>
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
            <div>
              <Label htmlFor="name">Redirect URL</Label>
              <Input
                type="text"
                id="name"
                placeholder="ex. https://example.com"
                value={customLink}
                onChange={(e) => setCustomLink(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={addLink} disabled={isLoading}>
              {isLoading ? <span className="loader "></span> : "Add now"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
