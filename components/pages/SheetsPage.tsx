import { SheetWithAuthor } from "@/app/types/sheet";
import { capitalizeFirstLetter } from "@/lib/utils";
import { Toaster } from "react-hot-toast";
import SheetCard from "../sheet-card";
import Title from "../title";
import { Separator } from "../ui/separator";

export default function SheetsPage({ sheets }: { sheets: SheetWithAuthor[] }) {
  const uniqueSubjects = Array.from(
    new Set(sheets.map((sheet) => sheet.subject))
  );

  return (
    <div className="w-full h-screen overflow-y-scroll flex flex-col p-4 mt-14 md:mt-0">
      <Toaster />
      <Title text="Vos fiches de révisions" />
      <span className="text-md md:text-lg text-black dark:text-muted-foreground italic">
        Ici vous pouvez retrouver toutes vos fiches de révisions. Vous pouvez
        les consulter, les partager avec vos amis ou les supprimer.
      </span>
      <Separator className="my-4" />

      {uniqueSubjects.map((subject) => (
        <div key={subject} className="mb-4">
          <Title
            className="text-center underline"
            text={capitalizeFirstLetter(subject)}
          />
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
