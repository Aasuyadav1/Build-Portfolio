'use client'
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
import { useEffect } from "react";

export function Publish() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const {data: session, status} = useSession()

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch('/api/portfolio/domain' + session?.user?.id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      

      const added = await response.json();

      if(response.ok) {
        alert("Domain added successfully");
      }


    } catch (error) {
      console.log(error);

    }
  };

  // const getDomainName = async () => {
  //   try {
  //     const response = await fetch('/api/portfolio/domain' + session?.userid?.id, {
  //       method: 'GET',
  //     })

  //     const added = await response.json();

  //     if(response.ok) {
  //       setValue("domain", added?.data?.domain);
  //     }

  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const getErrorMessage = (
    error: FieldError | undefined 
    | any
  ): string | undefined => {
    return error?.message;
  };

  // useEffect(()=>{
  //   if(status === "authenticated") {
  //     getDomainName()
  //   }
  // },[status === "authenticated"])

  if(status === "loading"){
    return <div>Loading...</div>
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Publish Portfolio</Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Domain</DialogTitle>
          <DialogDescription className="text-black">
            The domain will be used to host your portfolio for access to your portfolio.
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
                className="col-span-3 text-md"
                {...register("domain", {
                  required: "Domain is required",
                  minLength: {
                    value: 2,
                    message: "Domain must be at least 2 characters",
                  },
                  maxLength: {
                    value: 10,
                    message: "Domain must be at most 10 characters",
                  },
                  pattern: {
                    value: /^[a-zA-Z]{2,10}$/,
                    message: "Domain must contain only letters and no spaces",
                  },
                })}
              />
              {errors.domain && <span className="text-red-500 text-sm">{getErrorMessage(errors.domain)}</span>}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Publish now</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
