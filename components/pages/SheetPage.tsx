"use client";

import { Input } from "@/components/ui/input";
import SubTitle from "../subTitle";
import Title from "../title";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SheetPage() {
  const studentLevel = [
    { value: "1", label: "Collège | 6e" },
    { value: "2", label: "Collège | 5e" },
    { value: "3", label: "Collège | 4e" },
    { value: "4", label: "Collège | 3e" },
    { value: "5", label: "Lycée | 2nde" },
    { value: "6", label: "Lycée | 1ère" },
    { value: "7", label: "Lycée | Terminale" },
  ];

  const subjects = [
    { value: "1", label: "Mathématiques" },
    { value: "2", label: "Physique-Chimie" },
    { value: "3", label: "SVT" },
    { value: "4", label: "Français" },
    { value: "5", label: "Histoire-Géographie" },
    { value: "6", label: "Anglais" },
    { value: "7", label: "Espagnol" },
  ];

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div>
        {/* @ts-ignore */}
        <lord-icon
          src="https://cdn.lordicon.com/isugonwi.json"
          trigger="loop"
          delay="2000"
          colors="primary:#fff"
          style={{ width: "100px", height: "100px" }}
        />
      </div>

      <Title text="Fiche de révision" />
      <SubTitle text="Générez votre fiche de révision en un instant ! Sélectionnez votre niveau d'études, la matière et les mots-clés de votre cours." />

      <form className="flex flex-col">
        <div className="flex ">
          {/* select for level */}
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Niveau" />
            </SelectTrigger>
            <SelectContent>
              {studentLevel.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* select for subject */}
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Matière" />
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

        {/* keywords */}
        <Input
          className="mt-4"
          placeholder="Guerre mondiale, 1914, 1918 ..."
          type="text"
        />

        {/* submit button */}
        <Button className="mt-4" type="submit">
          Générer
        </Button>
      </form>
    </div>
  );
}
