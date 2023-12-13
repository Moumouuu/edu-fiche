"use client";
import { SheetWithAuthor } from "@/app/types/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatDate, formatKeywords, toStringUser } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function SheetModal({ sheet }: { sheet: SheetWithAuthor }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const dialogIsOpen =
    searchParams.has("sheetId") &&
    searchParams.get("sheetId")?.toString() === sheet.id.toString();

  const updateSearchParams = () => {
    const updatedParams = new URLSearchParams(
      Array.from(searchParams.entries())
    );

    if (
      !updatedParams.has("sheetId") ||
      updatedParams.get("sheetId")?.toString() !== sheet.id.toString()
    ) {
      updatedParams.set("sheetId", sheet.id);
    } else {
      updatedParams.delete("sheetId");
    }

    const updatedSearch = updatedParams.toString();

    // Build the final query string
    const query = updatedSearch ? `?${updatedSearch}` : "";

    // Push the updated URL to the router
    router.push(`${pathname}${query}`);
  };

  return (
    <Dialog onOpenChange={updateSearchParams} open={dialogIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Consulter</Button>
      </DialogTrigger>
      <DialogContent className="h-[80%] md:max-w-[60%] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Votre fiche de{" "}
            <span className="text-center py-1 bg-gradient-to-br from-green-400 rounded-md to-blue-600 uppercase">
              révision
            </span>
          </DialogTitle>
          <DialogDescription>
            Attention <span className="underline"> pour rappel</span> les fiches
            peuvent contenir des erreurs. Il est donc important de les vérifier
            avant de les utiliser.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col">
          <div className="flex items-center w-full justify-between">
            <span className="text-2xl font-bold">
              {toStringUser(sheet.userApiLimit)}
            </span>
            <span className="text-xl">{formatDate(sheet.createdAt)}</span>
          </div>
          <span className="my-1">
            {sheet.level} - {sheet.subject}
          </span>
          <div className="flex flex-wrap">
            {formatKeywords(sheet.keywords).map((k: string, i: number) => {
              return (
                <Badge key={i} variant={"secondary"} className="mr-2 ">
                  {k}
                </Badge>
              );
            })}
          </div>
          <p className="mt-4 text-lg whitespace-pre-wrap ">{sheet.text}</p>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Finito les révisions !
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
