"use client";

import { Sheet } from "@prisma/client";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { studentLevel, subjects } from "@/lib/utils";
import { useState } from "react";
import axios from "axios";
import { Label } from "../ui/label";
import { DialogFooter } from "../ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import toast, { Toaster } from "react-hot-toast";

export default function FormUpdateSheet({
  sheet,
  setSheets,
}: {
  sheet: Sheet;
  setSheets: any;
}) {

  const [level, setLevel] = useState<string | undefined>(undefined);
  const [subject, setSubject] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const { register, handleSubmit} = useForm();
 
  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      await axios.post(`/api/sheet`, {
        title: data.title,
        idSheet: sheet.id,
        level: level ?? sheet.level,
        subject: subject ?? sheet.subject,
        messages: sheet.text,
        keysWords: data.keywords,
      });
      toast.success("Fiche mise à jour !");
    } catch (error) {
      console.log("[ERROR UPDATE SHEET] : ", error);
    } finally {
      setSheets((sheets: Sheet[]) =>
        sheets.map((s: Sheet) =>
          s.id === sheet.id
            ? {
                ...s,
                title: ((data.title == "" ? null : data.title) ?? sheet.title),
                level: level ?? sheet.level,
                subject: subject ?? sheet.subject,
                keywords: ((data.keywords == "" ? null : data.keywords) ?? sheet.keywords),
              }
            : s
        )
      );
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <form onSubmit={handleSubmit(onSubmit)} className="p-4">
        <Label className="text-md" htmlFor="title">
          Titre de la fiche
        </Label>
        <Input
          id="title"
          placeholder="Titre de la fiche"
          defaultValue={sheet.title}
          {...register("title")}
          className="mb-3"
        />

        <Label className="text-md" htmlFor="title">
          Mots clés de la fiche
        </Label>
        <Input
          id="keywords"
          placeholder="Mot clés de la fiche"
          defaultValue={sheet.keywords}
          {...register("keywords")}
          className="mb-3"
        />

        <div className="flex flex-col md:flex-row w-full justify-center my-5">
          <div className="flex flex-col">
            <Label className="text-md" htmlFor="level">
              Niveau scolaire
            </Label>
            {/* select for level */}
            <Select onValueChange={(e) => setLevel(e)}>
              <SelectTrigger className="w-[180px]" id="level">
                <SelectValue placeholder={sheet.level} />
              </SelectTrigger>
              <SelectContent>
                {studentLevel.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col ">
            <Label className="text-md" htmlFor="subject">
              Matière de la fiche
            </Label>
            {/* select for subject */}
            <Select onValueChange={(e) => setSubject(e)}>
              <SelectTrigger className="w-[180px]" id="subject">
                <SelectValue placeholder={sheet.subject} />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary" className="my-2">Annuler</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="submit" variant="default" className="my-2" disabled={isLoading}>
              Confirmer
            </Button>
            </DialogClose>
        </DialogFooter>
      </form>
    </>
  );
}
