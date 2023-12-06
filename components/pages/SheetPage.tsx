"use client";

import { Toaster } from "react-hot-toast";
import { AiOutlineMore, AiOutlineShareAlt } from "react-icons/ai";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

import useClipboard from "@/app/hooks/use-clip-board";

import { SheetWithAuthor } from "@/app/types/sheet";

import { formatKeywords, toStringUser } from "@/lib/utils";

export default function Page({ sheet }: { sheet: SheetWithAuthor }) {
  const { copyToClipboard } = useClipboard();

  return (
    <>
      <Toaster />
      <div
        key={sheet.id}
        className="h-screen overflow-y-scroll flex flex-col p-3 md:p-6 mt-16 md:mt-0"
      >
        <div className="flex flex-col w-full mb-3 ">
          <div className="flex items-center w-full justify-between mb-1">
            <span className="text-3xl font-bold">
              {toStringUser(sheet.userApiLimit)}
            </span>
            <span className="text-xl">{`${sheet.createdAt.getDate()}/${sheet.createdAt.getMonth()}/${sheet.createdAt.getFullYear()}`}</span>
          </div>
          <div className="flex mb-1">
            <span className="text-lg">
              {sheet.level} - {sheet.subject}
            </span>
          </div>
          <div className="flex flex-wrap">
            {formatKeywords(sheet.keywords).map((k: string, i: number) => {
              return (
                <Badge key={i} variant={"secondary"} className="mr-2 ">
                  {k}
                </Badge>
              );
            })}
          </div>
        </div>
        <p className="text-lg whitespace-pre-wrap">{sheet.text}</p>

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
                  onClick={() =>
                    copyToClipboard(
                      `${process.env.NEXT_PUBLIC_APP_URL}/sheet/${sheet.id}`
                    )
                  }
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
