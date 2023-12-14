"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
import { cn, formatDate, formatKeywords, toStringUser } from "@/lib/utils";
import FormUpdateSheet from "../../form/form-update-sheet";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";

import { SheetWithAuthor } from "@/app/types/sheet";

import useClipboard from "@/app/hooks/use-clip-board";

import { DialogClose } from "@radix-ui/react-dialog";
import { AiOutlineMore, AiOutlineShareAlt } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { RiEdit2Line as RxUpdate } from "react-icons/ri";
import { SheetModal } from "./sheet-modal";

import { useSession } from "next-auth/react";

export default function SheetCard({
  sheet: s,
  className,
}: {
  sheet: SheetWithAuthor;
  className?: string;
}) {
  const [sheet, setSheet] = useState(s);
  const { data: session } = useSession();
  const router = useRouter();

  const isAuthor = session?.user?.email === sheet.userApiLimit.userEmail;

  useEffect(() => {
    router.refresh();
  }, []);

  useEffect(() => {
    setSheet(s);
  }, [s]);

  const { copyToClipboard } = useClipboard();

  const deleteSheet = async (sheetId: String) => {
    try {
      await axios.delete(`/api/sheet/${sheetId}`);
    } catch (error) {
      console.log("[ERROR DELETE SHEET] : ", error);
    }
  };

  return (
    <div
      key={sheet.id}
      className={cn(
        className,
        "flex flex-col justify-between p-5 m-3 border rounded-lg min-w-[90%] lg:min-w-[45%]"
      )}
    >
      <div className="flex flex-col w-full mb-3">
        <div className="flex items-center w-full justify-between mb-1">
          <span className="text-2xl font-bold">
            {toStringUser(sheet.userApiLimit)}
          </span>
          <span>{formatDate(sheet.createdAt)}</span>
        </div>
        <div className="flex mb-1">
          <span className="text-lg">
            {sheet.level} - {sheet.subject}
          </span>
        </div>
        <div className="flex flex-wrap my-2">
          {formatKeywords(sheet.keywords).map((k: string, i: number) => {
            return (
              <Badge key={i} variant={"secondary"} className="m-1 ">
                {k}
              </Badge>
            );
          })}
        </div>
      </div>

      <p className="whitespace-pre-wrap h-[100%] overflow-hidden">
        {sheet.text.length > 500
          ? sheet.text.substring(0, 500) + "..."
          : sheet.text}
      </p>

      <div className=" flex w-full justify-between items-center mt-4">
        <SheetModal sheet={sheet} />

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
                className="w-full flex justify-start"
                onClick={() =>
                  copyToClipboard(
                    `${process.env.NEXT_PUBLIC_APP_URL}/sheets/?sheetId=${sheet.id}`
                  )
                }
              >
                <AiOutlineShareAlt size={25} className="mr-2" />
                Partager
              </Button>
            </DropdownMenuItem>

            <div className="flex flex-col">
              {isAuthor && (
                <>
                  <Dialog>
                    <DialogTrigger>
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <Button
                          variant={"ghost"}
                          className="w-full flex justify-start"
                        >
                          <MdDeleteForever size={25} className="mr-2" />
                          Supprimer
                        </Button>
                      </DropdownMenuItem>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="text-2xl mb-4">
                          Vous allez supprimer une fiche !
                        </DialogTitle>
                        <DialogDescription>
                          Cette action est irréversible. Vous allez supprimer la
                          fiche de révision. Voulez-vous continuer ?
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button type="submit" variant="secondary">
                            Annuler
                          </Button>
                        </DialogClose>
                        <Button
                          type="submit"
                          variant="destructive"
                          onClick={() => deleteSheet(sheet.id)}
                        >
                          <MdDeleteForever size={25} className={"mr-2"} />
                          Supprimer
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger>
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <Button
                          className="w-full flex justify-start"
                          variant={"ghost"}
                        >
                          <RxUpdate
                            size={25}
                            color={"white"}
                            className={"mr-2"}
                          />
                          Modifier
                        </Button>
                      </DropdownMenuItem>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="text-2xl">
                          <span className="p-1 bg-gradient-to-br from-green-400 rounded-md to-blue-600 uppercase">
                            Modification
                          </span>{" "}
                          de la fiche de révision
                        </DialogTitle>
                        <DialogDescription>
                          Vous pouvez modifier le titre, le sujet, le niveau et
                          les mots-clés de votre fiche de révision.
                        </DialogDescription>
                        <FormUpdateSheet sheet={sheet} setSheet={setSheet} />
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </>
              )}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
