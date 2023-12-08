"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { capitalizeFirstLetter, cn, studentLevel } from "@/lib/utils";

interface StudentLevelProps {
  onValueChange: (value: string) => void;
  value?: string;
}

export function SelectLevel({ onValueChange, value }: StudentLevelProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value ? value : "Niveaux d'études"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>Aucun niveau d&apos;étude trouvé.</CommandEmpty>
          <CommandGroup className="h-[200px] overflow-y-scroll">
            {studentLevel.map((level) => (
              <CommandItem
                key={level.value}
                value={level.value}
                onSelect={(currentValue) => {
                  onValueChange(capitalizeFirstLetter(currentValue));
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === level.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {level.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
