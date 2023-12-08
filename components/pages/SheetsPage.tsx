import { Toaster } from "react-hot-toast";

import { SheetWithAuthor } from "@/app/types/sheet";

import { capitalizeFirstLetter } from "@/lib/utils";

import Title from "../title";
import { Separator } from "../ui/separator";
import SheetCard from "./app/sheet-card";

export default function SheetsPage({ sheets }: { sheets: SheetWithAuthor[] }) {
  const uniqueSubjects = Array.from(
    new Set(sheets.map((sheet) => sheet.subject))
  );

  return (
    <div className="w-full h-screen overflow-y-scroll flex flex-col p-4 mt-14 lg:mt-0">
      <Title text="Vos fiches de révisions" />
      <span className="text-md md:text-lg text-black dark:text-muted-foreground italic">
        Ici vous pouvez retrouver toutes vos fiches de révisions. Vous pouvez
        les consulter, les partager avec vos amis ou les supprimer.
      </span>
      <Separator className="my-4" />

      {uniqueSubjects.map((subject) => (
        <div key={subject} className="mb-4">
          <div className="flex justify-center">
            <Title
              className="text-center py-1 px-10 bg-gradient-to-br from-green-400 rounded-md to-blue-600 uppercase"
              text={capitalizeFirstLetter(subject)}
            />
          </div>

          <div className="flex overflow-x-auto">
            {/* Utilisez la classe flex pour les aligner côte à côte */}
            {sheets
              .filter((sheet) => sheet.subject === subject)
              .map((filteredSheet: SheetWithAuthor) => (
                <SheetCard key={filteredSheet.id} sheet={filteredSheet} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
