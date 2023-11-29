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
import { Sheet } from "@prisma/client";
import { DialogClose } from "@radix-ui/react-dialog";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineMore, AiOutlineShareAlt } from "react-icons/ai";
import { FaExchangeAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import FormUpdateSheet from "../form/form-update-sheet";
import Title from "../title";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { copySharingLink } from "@/lib/utils";

export default function MySheetPage({ sheets: s }: { sheets: Sheet[] }) {
  const [sheets, setSheets] = useState(s);
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, []);

  useEffect(() => {
    setSheets(s);
  }, [s]);

  const deleteSheet = async (sheetId: String) => {
    try {
      await axios.delete(`/api/sheet/${sheetId}`);
    } catch (error) {
      console.log("[ERROR DELETE SHEET] : ", error);
    }
  };

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
    <div className="w-full h-[100vh] overflow-y-scroll flex flex-col p-4 mt-14 md:mt-0">
      <Toaster />
      <Title text="Vos fiches de révisions" />
      <span className="text-md md:text-lg text-black dark:text-zinc-500 italic">
        Ici vous pouvez retrouver toutes vos fiches de révisions. Vous pouvez
        les consulter, les partager avec vos amis ou les supprimer.
      </span>
      <Separator className="my-4" />

      <div className="grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4">
        {sheets.map((sheet: Sheet) => (
          <div
            key={sheet.id}
            className="flex flex-col justify-between p-4 m-3 bg-primary/10 hover:bg-primary/20 transition duration-200 ease-in-out  rounded"
          >
            <div className="flex w-full justify-between mb-3 items-center">
              <span className="text-xl">{sheet.title}</span>
              <span>{`${sheet.createdAt.getDate()}/${sheet.createdAt.getMonth()}/${sheet.createdAt.getFullYear()}`}</span>
            </div>
            <span>
              {sheet.text.length > 150
                ? sheet.text.substring(0, 150) + "..."
                : sheet.text}
            </span>
            <div>{formatKeywords(sheet.keywords)}</div>

            <div className=" flex w-full justify-between items-center mt-4">
              <Link href={`/sheet/${sheet.id}`}>
                <Button variant={"premium"}>Consulter</Button>
              </Link>

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

                  <div className="flex flex-col">
                    <Dialog>
                      <DialogTrigger>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          <Button variant={"ghost"}>
                            <MdDeleteForever
                              size={30}
                              color="red"
                              className={"mr-2"}
                            />
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
                            Cette action est irréversible. Vous allez supprimer
                            la fiche de révision. Voulez-vous continuer ?
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
                            <MdDeleteForever
                              size={30}
                              color="red"
                              className={"mr-2"}
                            />
                            Supprimer
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Dialog>
                      <DialogTrigger>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          <Button variant={"ghost"}>
                            <FaExchangeAlt
                              size={30}
                              className={"mr-2"}
                              color="green"
                            />
                            Modifier
                          </Button>
                        </DropdownMenuItem>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="text-2xl mb-4">
                            Modification de la fiche de révision
                          </DialogTitle>
                          <DialogDescription>
                            Vous pouvez modifier le titre, le sujet, le niveau
                            et les mots-clés de votre fiche de révision.
                          </DialogDescription>
                          <FormUpdateSheet
                            sheet={sheet}
                            setSheets={setSheets}
                          />
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
