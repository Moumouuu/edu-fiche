import { Sheet } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}/${path}`;
}

export const copySharingLink = (sheet: Sheet) => {
  navigator.clipboard.writeText(
    `${process.env.NEXT_PUBLIC_URL}/sheet/${sheet.id}`
  );
  toast.success("Lien copié dans le presse-papier !");
};

export const MAX_FREE_TRIAL = 3;

export const studentLevel = [
  { value: "Collège | 6e", label: "Collège | 6e" },
  { value: "Collège | 5e", label: "Collège | 5e" },
  { value: "Collège | 4e", label: "Collège | 4e" },
  { value: "Collège | 3e", label: "Collège | 3e" },
  { value: "Lycée | 2nde", label: "Lycée | 2nde" },
  { value: "Lycée | 1ère", label: "Lycée | 1ère" },
  { value: "Lycée | Terminale", label: "Lycée | Terminale" },
  { value: "Prépa | MPSI", label: "Prépa | MPSI" },
  { value: "Prépa | PCSI", label: "Prépa | PCSI" },
  { value: "Prépa | PTSI", label: "Prépa | PTSI" },
  { value: "Prépa | BCPST", label: "Prépa | BCPST" },
  { value: "Prépa | ECS", label: "Prépa | ECS" },
  { value: "Prépa | ECE", label: "Prépa | ECE" },
  { value: "Prépa | ECT", label: "Prépa | ECT" },
  { value: "Prépa | BL", label: "Prépa | BL" },
  { value: "Prépa | Littéraire", label: "Prépa | Littéraire" },
  { value: "Prépa | Autre", label: "Prépa | Autre" },
  { value: "Université | L1", label: "Université | L1" },
  { value: "Université | L2", label: "Université | L2" },
  { value: "Université | L3", label: "Université | L3" },
  { value: "Université | M1", label: "Université | M1" },
  { value: "Université | M2", label: "Université | M2" },
  { value: "Université | Autre", label: "Université | Autre" },
];

export const subjects = [
  { value: "Mathématiques", label: "Mathématiques" },
  { value: "Physique-Chimie", label: "Physique-Chimie" },
  { value: "SVT", label: "SVT" },
  { value: "Français", label: "Français" },
  { value: "Histoire-Géographie", label: "Histoire-Géographie" },
  { value: "Philosophie", label: "Philosophie" },
  { value: "Anglais", label: "Anglais" },
  { value: "Espagnol", label: "Espagnol" },
  { value: "SES", label: "SES" },
  { value: "Economie", label: "Economie" },
  { value: "Informatique", label: "Informatique" },
  { value: "Droit", label: "Droit" },
];
