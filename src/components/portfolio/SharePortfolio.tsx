"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { CopyIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IoShareSocialSharp } from "react-icons/io5";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  EmailShareButton,
  FacebookIcon,
  EmailIcon,
  WhatsappIcon,
  TelegramIcon,
  TwitterIcon,
  LinkedinIcon,
} from "react-share";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

function SharePortfolio() {
  const [shareData, setShareData] = React.useState(window.location.href || "");

  useEffect(() => {
    setShareData(window.location.href || "");
  }, [window.location.href]);

  const share = [
    {
      outlet: "Whatsapp",
      icon: (
        <WhatsappShareButton url={shareData}>
          <WhatsappIcon size={32} round={true} />{" "}
        </WhatsappShareButton>
      ),
    },
    {
      outlet: "Linkedin",
      icon: (
        <LinkedinShareButton url={shareData}>
          <LinkedinIcon size={32} round={true} />{" "}
        </LinkedinShareButton>
      ),
    },
    {
      outlet: "Twitter",
      icon: (
        <TwitterShareButton url={shareData}>
          <TwitterIcon size={32} round={true} />{" "}
        </TwitterShareButton>
      ),
    },
    {
      outlet: "Email",
      icon: (
        <EmailShareButton url={shareData}>
          <EmailIcon size={32} round={true} />{" "}
        </EmailShareButton>
      ),
    },
    {
      outlet: "Telegram",
      icon: (
        <TelegramShareButton url={shareData}>
          <TelegramIcon size={32} round={true} />{" "}
        </TelegramShareButton>
      ),
    },
    {
      outlet: "Facebook",
      icon: (
        <FacebookShareButton url={shareData}>
          <FacebookIcon size={32} round={true} />{" "}
        </FacebookShareButton>
      ),
    },
  ];

  return (
    <Dialog>
      <DialogTrigger>
      <Tooltip >
            <TooltipTrigger asChild>
            <Button variant="outline"  size="icon">
              <IoShareSocialSharp  className="text-gray-600 h-4 w-4" />
              <span className="sr-only">Share</span>
            </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Share</p>
            </TooltipContent>
          </Tooltip>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" defaultValue={shareData} readOnly />
          </div>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(shareData);
              toast.success("Copied to clipboard");
            }}
            size="sm"
            className="px-3"
          >
            <span className="sr-only">Copy</span>
            <CopyIcon className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex gap-2 relative items-center justify-start  py-1 pt-2  border border-solid border-accent rounded-full">
          {share.map((item, index) => (
            <span
              className="w-fit h-fil cursor-pointer hover:scale-105 transition-all "
              key={index}
            >
              {item.icon}
            </span>
          ))}
        </div>
        {/* <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}

export default SharePortfolio;