"use client";

import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

import { DialogClose } from "@radix-ui/react-dialog";

import { studentLevel, subjects } from "@/lib/utils";
import { Sheet } from "@prisma/client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function FormUpdateSheet({
  sheet,
  setSheet,
}: {
  sheet: Sheet;
  setSheet: any;
}) {
  const [level, setLevel] = useState<string | undefined>(undefined);
  const [subject, setSubject] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      await axios.post(`/api/sheet`, {
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
      setSheet((sheet: Sheet) => ({
        ...sheet,
        level: level ?? sheet.level,
        subject: subject ?? sheet.subject,
        keywords: data.keywords ?? sheet.keywords,
      }));
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="p-4">
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
          <div className="flex flex-col flex-1">
            <Label className="text-md ml-2" htmlFor="level">
              Niveau scolaire
            </Label>
            {/* select for level */}
            {/* todo : refactor with selectLevel components */}
            <Select onValueChange={(e) => setLevel(e)}>
              <SelectTrigger className="w-auto mb-3" id="level">
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

          <div className="flex flex-col flex-1">
            <Label className="text-md ml-2" htmlFor="subject">
              Matière de la fiche
            </Label>
            {/* select for subject */}
            {/* todo : refactor with selectSubjects components */}
            <Select onValueChange={(e) => setSubject(e)}>
              <SelectTrigger className="w-auto mb-3" id="subject">
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
            <Button variant="secondary" className="my-2">
              Annuler
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="submit"
              variant="default"
              className="my-2"
              disabled={isLoading}
            >
              Confirmer
            </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </>
  );
}
