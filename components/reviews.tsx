import Marquee from "@/components/magicui/marquee";
import { cn } from "@/lib/utils";
import Image from "next/image";

const reviews = [
  {
    name: "Sophie G.",
    username: "@Sophie G.",
    body: "Edu-Fiche a révolutionné ma manière de réviser ! Des fiches intelligentes qui s'adaptent à mon programme. Merci pour cette aide précieuse !",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Thomas L.",
    username: "@Thomas L.",
    body: "Incroyablement utile ! Les fiches générées automatiquement ont considérablement simplifié mes révisions. Je recommande vivement Edu-Fiche.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "Emma B.",
    username: "@Emma B.",
    body: "Edu-Fiche m'a sauvé la vie pendant les examens ! Des fiches complètes en un clin d'œil. Un outil incontournable pour tout étudiant.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Lucas P.",
    username: "@Lucas P.",
    body: "Des fiches claires, concises et générées automatiquement ! Une véritable pépite pour optimiser mes révisions. Merci, Edu-Fiche !",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Alexandre V.",
    username: "@Alexandre V.",
    body: "J'adore la nouvelle version ! Le design épuré et les fonctionnalités améliorées en font un incontournable pour tous les étudiants sérieux.",
    img: "https://avatar.vercel.sh/jenny",
  },
];
const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-80 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <Image
          className="rounded-full"
          width="32"
          height="32"
          alt=""
          src={img}
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

const Reviews = () => {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-lg py-36 shadow-2xl">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
};

export default Reviews;
