"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "../ui/badge";

import useClipboard from "@/app/hooks/use-clip-board";
import { Sheet } from "@prisma/client";
import { Toaster } from "react-hot-toast";
import { AiOutlineMore, AiOutlineShareAlt } from "react-icons/ai";
import { Button } from "../ui/button";

export default function Page({ sheet }: { sheet: Sheet }) {
  const { copyToClipboard } = useClipboard();

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

  return (
    <>
      <Toaster />
      <div
        key={sheet.id}
        className="h-screen overflow-y-scroll flex flex-col p-3 mt-16"
      >
        <div className="flex w-full justify-between mb-3 items-center">
          <span className="text-2xl md:text3xl">{sheet.title}</span>
          <span className="text-xl">{`${sheet.createdAt.getDate()}/${sheet.createdAt.getMonth()}/${sheet.createdAt.getFullYear()}`}</span>
        </div>
        <p className="text-lg whitespace-pre-wrap">{sheet.text}</p>
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
