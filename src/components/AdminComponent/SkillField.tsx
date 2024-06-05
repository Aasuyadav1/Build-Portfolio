import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
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
import skillIcons from "@/Data/skillIcon";
import { Separator } from "../ui/separator";

interface Skill {
  value: string;
  label: string;
}

export function SkillField() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [customSkill, setCustomSkill] = useState({
    skillname: "",
    skillimage: "",
  });

  const selectedSkill = skills.find((skill) => skill.value === value);

  const addNewSkill = async () => {
    if ((customSkill.skillname && customSkill.skillimage) || value) {
      alert("Only one skill can be added at a time");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/portfolio/skills", {
        method: "POST",
        body: JSON.stringify({
          skillname: customSkill.skillname || value,
          skillimage: customSkill.skillimage || "",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.data);
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (Array.isArray(skillIcons)) {
      const skillList = skillIcons.map((skill) => ({
        value: skill,
        label: skill,
      }));
      setSkills(skillList);
    } else {
      console.error("skillIcons is not an array:", skillIcons);
    }
  }, []);

  return (
    <div className="max-w-[400px]">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Select Skill</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Select Skill</DialogTitle>
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
                  {selectedSkill ? (
                    <div className="flex items-center gap-2">
                      <img
                        style={{ height: 30, width: 30 }}
                        src={`https://skillicons.dev/icons?i=${selectedSkill.value}`}
                        className="mr-2"
                      />
                      {selectedSkill.label}
                    </div>
                  ) : (
                    "Select Skill..."
                  )}
                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0">
                <Command className="w-full">
                  <CommandInput placeholder="Search skill..." className="h-9" />
                  <ScrollArea className="h-[170px]">
                    <CommandEmpty>No skill found.</CommandEmpty>
                    <CommandList>
                      <CommandGroup className="w-full">
                        {skills.map((skill) => (
                          <CommandItem
                            key={skill.value}
                            value={skill.value}
                            onSelect={(currentValue) => {
                              setValue(
                                currentValue === value ? "" : currentValue
                              );
                              setCustomSkill({ skillname: "", skillimage: "" });
                              setOpen(false);
                            }}
                          >
                            <img
                              src={`https://skillicons.dev/icons?i=${skill.value}`}
                              alt={skill.label}
                              className="mr-2 h-6 w-6"
                            />
                            {skill.label}
                            <CheckIcon
                              className={`ml-auto h-4 w-4 ${
                                value === skill.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              }`}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </ScrollArea>
                </Command>
              </PopoverContent>
            </Popover>
            <Separator />
            <p className="text-sm text-primary">
              * Enter custom image and skill name
            </p>
            <Input
              type="text"
              value={customSkill.skillimage}
              onChange={(e) =>
                setCustomSkill({ ...customSkill, skillimage: e.target.value })
              }
              placeholder="Enter custom image..."
              disabled={!!value}
            />
            <Input
              type="text"
              value={customSkill.skillname}
              onChange={(e) =>
                setCustomSkill({ ...customSkill, skillname: e.target.value })
              }
              placeholder="Enter skill name..."
              disabled={!!value}
            />
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="flex items-center gap-4"
              onClick={addNewSkill}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loader"></span>
              ) : (
                "Add Skill"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
