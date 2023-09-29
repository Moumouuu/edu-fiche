"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaExchangeAlt } from "react-icons/fa";
import { DialogClose } from "@radix-ui/react-dialog";
import FormUpdateSheet from "../form/form-update-sheet";
import { Badge } from "../ui/badge";

import { Sheet } from "@prisma/client";
import Link from "next/link";
import { Button } from "../ui/button";
import { AiOutlineMore, AiOutlineShareAlt } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";

export default function Page({ sheet }: { sheet: Sheet }) {
  const formatKeywords = (keywords: string) => {
    // split keywords by space example : "maths physique" => ["maths", "physique"]
    // and remove empty string
    const keywordsArray = keywords.split(" ").filter((k) => k !== "");
    return (
      <div className="flex flex-wrap my-2">
        {keywordsArray.map((k) => (
          <Badge key={k} className="mr-2 ">
            {k}
          </Badge>
        ))}
      </div>
    );
  };

  const copySharingLink = (sheet: Sheet) => {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_URL}/sheet/${sheet.id}`
    );
    toast.success("Lien copié dans le presse-papier !");
  };

  return (
    <>
      <Toaster />
      <div
        key={sheet.id}
        className="h-full flex flex-col p-5 m-5 mt-16 md:mt-5 bg-primary/10 hover:bg-primary/20 transition duration-200 ease-in-out rounded"
      >
        <div className="flex w-full justify-between mb-3 items-center">
          <span className="text-2xl md:text3xl">{sheet.title}</span>
          <span className="text-xl">{`${sheet.createdAt.getDate()}/${sheet.createdAt.getMonth()}/${sheet.createdAt.getFullYear()}`}</span>
        </div>
        <span className="text-lg">{sheet.text}</span>
        <div>{formatKeywords(sheet.keywords)}</div>

        <div className=" flex w-full justify-end items-center mt-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <AiOutlineMore size={30} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <Button
                  variant={"ghost"}
                  onClick={() => copySharingLink(sheet)}
                >
                  <AiOutlineShareAlt size={30} className={"mr-2"} />
                  Partager
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
}
