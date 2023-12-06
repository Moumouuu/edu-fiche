import { UserApiLimit } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const MAX_FREE_TRIAL = 5;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}/${path}`;
}

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export function toStringUser(user: UserApiLimit) {
  // split email to get username before @ (ex: "john" from "john@gmail") & set first letter to uppercase
  return capitalizeFirstLetter(user.userEmail.split("@")[0]);
}

export const formatKeywords = (keywords: string) => {
  // split keywords by space example : "maths physique" => ["maths", "physique"]
  // and remove empty string
  return keywords.split(" ").filter((k) => k !== "");
};

export const itemsMenu = [
  {
    name: "Fiche de révision",
    href: "/app",
    icon: "https://cdn.lordicon.com/isugonwi.json",
    premium: false,
  },
  {
    name: "Générateur de Quiz (BETA)",
    href: "/quiz",
    icon: "https://cdn.lordicon.com/kipaqhoz.json",
    premium: true,
  },
  {
    name: "Mes fiches",
    href: "/sheets",
    icon: "https://cdn.lordicon.com/hpivxauj.json",
    premium: false,
  },
  {
    name: "Annuaire du WEB (BETA)",
    href: "/directory",
    icon: "https://cdn.lordicon.com/kkvxgpti.json",
    premium: false,
  },
  {
    name: "Paramètres",
    href: "/settings",
    icon: "https://cdn.lordicon.com/lecprnjb.json",
    premium: false,
  },
];

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
  { value: "SVT", label: "SVT" },
  { value: "Français", label: "Français" },
  { value: "Histoire-géographie", label: "Histoire-géographie" },
  { value: "Philosophie", label: "Philosophie" },
  { value: "Anglais", label: "Anglais" },
  { value: "Espagnol", label: "Espagnol" },
  { value: "SES", label: "SES" },
  { value: "Economie", label: "Economie" },
  { value: "Informatique", label: "Informatique" },
  { value: "Droit", label: "Droit" },
  { value: "Chimie", label: "Chimie" },
  { value: "Biologie", label: "Biologie" },
  { value: "Géologie", label: "Géologie" },
  { value: "Physique", label: "Physique" },
  { value: "Langue et littérature", label: "Langue et littérature" },
  { value: "Arts plastiques", label: "Arts plastiques" },
  { value: "Musique", label: "Musique" },
  { value: "Éducation physique et sportive (EPS)", label: "EPS" },
  { value: "Technologie", label: "Technologie" },
  { value: "Sciences sociales", label: "Sciences sociales" },
  { value: "Psychologie", label: "Psychologie" },
  { value: "Sociologie", label: "Sociologie" },
  { value: "Langues étrangères appliquées (LEA)", label: "LEA" },
  { value: "Médecine", label: "Médecine" },
  { value: "Architecture", label: "Architecture" },
];
