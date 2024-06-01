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
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CommandList } from "cmdk";
import { useState, useEffect } from "react";

interface Framework {
  value: string;
  label: string;
}

export function LinkField() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [frameworks, setFrameworks] = useState<Framework[]>([]);

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

  useEffect(() => {
    console.log("Current frameworks:", frameworks);
    console.log("Selected value:", value);
    console.log("Selected framework:", selectedFramework);
  }, [value, selectedFramework, frameworks]);

  return (
    <div className="max-w-[400px]">
      <Dialog>
        <DialogTrigger asChild>
          <Button  className="w-full">Add Link</Button>
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
                  {selectedFramework
                    ? <div>
                      <SocialIcon
                            style={{ height: 30, width: 30 }}
                            url={`https://${selectedFramework.value}.com`}
                            className="mr-2"
                          />
                          {selectedFramework.label}
                    </div>
                    : "Select Links..."}
                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0">
                <Command className="w-full">
                  <CommandInput placeholder="Search link..." className="h-9" />
                  <ScrollArea className="h-[170px]">
                  <CommandEmpty>No framework found.</CommandEmpty>
                  <CommandList >
                    <CommandGroup className="w-full">
                      {frameworks.map((framework) => (
                        <CommandItem
                          key={framework.value}
                          value={framework.value}
                          onSelect={(currentValue) => {
                            setValue(
                              currentValue === value ? "" : currentValue
                            );
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
            <Input type="text" placeholder="ex. https://example.com" />
          </div>
          <DialogFooter>
            <Button type="submit">Add now</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
