"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, FieldError } from "react-hook-form";
import React, { useState } from "react";
import { toast } from "sonner";

type PublishProps = {
  isPublishing: boolean;
  setIsPublishing: React.Dispatch<React.SetStateAction<boolean>>;
  domain: string;
  setDomain: React.Dispatch<React.SetStateAction<string>>;
};

export function Publish({
  isPublishing,
  setIsPublishing,
  domain,
  setDomain,
}: PublishProps) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const { data: session, status } = useSession();
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onSubmit = async (data: any) => {
    setIsSubmit(true);
    try {
      const response = await fetch(
        "/api/portfolio/domain/" + session?.user?.id,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const added = await response.json();

      if (response.ok && added.success) {
        setIsPublishing(true);
        setDomain(added.data?.domain || ""); // Safe access to domain property
        toast.success(added.message || "Domain added successfully");
        setIsOpen(false);
        reset();
      } else {
        setIsPublishing(false);
        reset();
      }
    } catch (error) {
      toast.error("An error occurred while publishing");
      setIsPublishing(false);
      setIsOpen(false);
    } finally {
      setIsSubmit(false);
      setIsOpen(false);
    }
  };

  const getErrorMessage = (
    error: FieldError | undefined | any
  ): string | undefined => {
    return error?.message;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Publish Portfolio</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Domain</DialogTitle>
          <DialogDescription className="text-black">
            The domain will be used to host your portfolio for access to your
            portfolio.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-4">
              <Label htmlFor="domain" className="text-left">
                Domain
              </Label>
              <Input
                id="domain"
                placeholder="domain"
                className="col-span-3 text-md"
                {...register("domain", {
                  required: "Domain is required",
                  minLength: {
                    value: 4,
                    message: "Domain must be at least 4 characters",
                  },
                  maxLength: {
                    value: 10, // Corrected to 10
                    message: "Domain must be at most 10 characters",
                  },
                  pattern: {
                    value: /^[a-zA-Z]{2,10}$/,
                    message: "Domain must contain only letters and no spaces",
                  },
                })}
              />
              {errors.domain && (
                <span className="text-red-500 text-sm">
                  {getErrorMessage(errors.domain)}
                </span>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">
              {isSubmit ? <span className="loader"></span> : "Publish now"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
