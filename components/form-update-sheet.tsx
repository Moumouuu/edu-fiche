"use client";

import { Sheet } from "@prisma/client";
import { Input } from "./ui/input";
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
import { Label } from "./ui/label";
import { DialogFooter } from "./ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function FormUpdateSheet({ sheet }: { sheet: Sheet }) {
  // todo zod validation & keywords ??
  const router = useRouter();
  const [level, setLevel] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    console.log(sheet);
    try {
      await axios.post(`/api/sheet`, {
        title: data.title,
        idSheet: sheet.id,
        level: level,
        subject: subject,
        messages: sheet.text,
        keysWords: sheet.keywords,
      });
    } catch (error) {
      console.log("[ERROR UPDATE SHEET] : ", error);
    } finally {
      router.refresh();
      window.location.reload();
    }
  };

  return (
    <>
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

        <div className="flex w-full justify-center my-5">
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
            <Button variant="secondary">Annuler</Button>
          </DialogClose>
          <Button type="submit" variant="default">
            Confirmer
          </Button>
        </DialogFooter>
      </form>
    </>
  );
}
