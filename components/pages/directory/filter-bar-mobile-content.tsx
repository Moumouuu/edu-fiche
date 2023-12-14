import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { studentLevel, subjects } from "@/lib/utils";

import { UseFormReturn } from "react-hook-form";
import { FaFilter } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

interface FilterBarProps {
  form: UseFormReturn;
  level: string;
  subject: string;
  setLevel: (level: string) => void;
  setSubject: (subject: string) => void;
  resetFilters: () => void;
  onSubmit: (values: { content?: string | undefined }) => Promise<void>;
}

export function FilterBarMobileContent({
  form,
  level,
  subject,
  setLevel,
  setSubject,
  resetFilters,
  onSubmit,
}: FilterBarProps) {
  return (
    <div className="block lg:hidden">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Filtres</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Filtres</DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-muted-foreground">
            Vous pouvez filtrer les fiches de révisions en fonction de leur
            contenu, de leur niveau et de leur matière.
          </DialogDescription>
          <div className="flex flex-col my-3">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="y-2">
                  <FormControl>
                    <Input
                      className="w-full"
                      placeholder="Chercher dans le contenu d'une fiche"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col justify-center my-2">
              {/* select for level */}
              <Label className="text-md ml-2" htmlFor="level">
                Niveau scolaire
              </Label>
              {/* todo : refactor with selectLevel components */}
              <Select onValueChange={(e) => setLevel(e)}>
                <SelectTrigger className="w-auto mb-3" id="level">
                  <SelectValue
                    placeholder={level === "" ? "Niveaux scolaires" : level}
                  />
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
              <Label className="text-md ml-2" htmlFor="subject">
                Matière de la fiche
              </Label>
              {/* todo : refactor with selectSubjects components */}
              <Select onValueChange={(e) => setSubject(e)}>
                <SelectTrigger className="w-auto mb-3" id="subject">
                  <SelectValue
                    placeholder={subject === "" ? "Matières" : subject}
                  />
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

            <div className="flex w-full">
              <Button
                onClick={form.handleSubmit(onSubmit)}
                type="submit"
                className="m-1"
                variant={"default"}
              >
                Filtrer
                <FaFilter className="ml-2" />
              </Button>
              <Button
                onClick={resetFilters}
                className="m-1"
                type="submit"
                variant={"destructive"}
              >
                <MdDelete size="20" color="white" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
