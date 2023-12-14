import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import Globe from "@/components/magicui/globe";
import Marquee from "@/components/magicui/marquee";
import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import {
  CalendarIcon,
  FileTextIcon,
  GlobeIcon,
  InputIcon,
} from "@radix-ui/react-icons";
import DotPattern from "../../magicui/dot-pattern";

const files = [
  {
    name: "Math",
    body: "Les maths c'est vraiment pas ouf mais bon on fait avec. Surtout quand y'a des intégrales et des dérivées.",
  },
  {
    name: "Droit",
    body: "En vrai c'est pas compliqué le droit, il suffit de lire le code civil et de comprendre les articles.",
  },
  {
    name: "Histoire-Géographie",
    body: "Il suffit de connaître les dates et les lieux, c'est pas compliqué.",
  },
  {
    name: "Physique-Chimie",
    body: "Si tu fais pas de la physique-chimie, t'es pas un vrai. On peut faire joujou avec des tubes à essai.",
  },
  {
    name: "SVT",
    body: "La nature c'est cool ! Y'a des animaux, des plantes, des champignons, des bactéries, des virus, des humains, des extraterrestres, des licornes, des dragons !",
  },
];

const features = [
  {
    Icon: FileTextIcon,
    name: "Fiche de révision",
    description:
      "Tout est généré automatiquement, plus besoin de perdre du temps à faire des fiches de révision.",
    href: "/",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1 ",
    background: (
      <Marquee
        pauseOnHover
        className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] "
      >
        {files.map((f, idx) => (
          <figure
            key={idx}
            className={cn(
              "relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4",
              "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
              "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
              "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none"
            )}
          >
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-col">
                <figcaption className="text-sm font-medium dark:text-white ">
                  {f.name}
                </figcaption>
              </div>
            </div>
            <blockquote className="mt-2 text-xs">{f.body}</blockquote>
          </figure>
        ))}
      </Marquee>
    ),
  },
  {
    Icon: InputIcon,
    name: "Matières | Niveaux",
    description: "Tu choisis ta matière et ton niveau, et hop c'est parti !",
    href: "/",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <Command className="absolute right-10 top-10 w-[70%] origin-top translate-x-0 border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:-translate-x-10">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>Pas de bol.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Mathématique</CommandItem>
            <CommandItem>Droit</CommandItem>
            <CommandItem>Physique-Chimie</CommandItem>
            <CommandItem>Informatique</CommandItem>
            <CommandItem>SVT</CommandItem>
            <CommandItem>Autre</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    ),
  },
  {
    Icon: GlobeIcon,
    name: "Annuaire du WEB",
    description: "Accède aux fiches du monde entier !",
    href: "/",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <Globe className="top-0 h-[600px] w-[600px] transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_30%,#000_100%)] group-hover:scale-105 sm:left-40" />
    ),
  },
  {
    Icon: CalendarIcon,
    name: "Mise à jour",
    description: "Des mises à jour régulières sont prévues.",
    className: "col-span-3 lg:col-span-1",
    href: "/",
    cta: "Learn more",
    background: (
      <Calendar
        mode="single"
        selected={new Date(2022, 4, 11, 0, 0, 0)}
        className="absolute right-0 top-10 origin-top rounded-md border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105"
      />
    ),
  },
];

export async function Bento() {
  return (
    <div className="relative flex justify-center w-full px-2 py-20 lg:p-20">
      <BentoGrid className="lg:w-[80%] mx-2">
        {features.map((feature, idx) => (
          <BentoCard key={idx} {...feature} />
        ))}
      </BentoGrid>
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]"
        )}
      />
    </div>
  );
}
