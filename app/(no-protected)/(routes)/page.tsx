import CardSpotlight from "@/components/card";
import Footer from "@/components/footer";
import { ModeToggle } from "@/components/mode-toggle";
import SubTitle from "@/components/subTitle";
import TextShine from "@/components/text-shine";
import { Button } from "@/components/ui/button";
import prismadb from "@/lib/prismadb";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "EduFiche | Générateur de Fiche de révision",
  description:
    "Edufiche est un générateur de fiche de révision en ligne. Il permet de générer des fiches de révision en quelques clics.",
};

export default async function Home() {

    const lastestSheets = await prismadb.sheet.findMany({
        take: 3,
        orderBy: {
            createdAt: "desc",
        },
    })

  return (
    <div className="w-full">
      <nav className="flex items-center p-5 justify-between">
        <div className="flex items-center">
          <Image
            src="/assets/images/edu-fiche-logo.png"
            alt="EduFiche"
            width={50}
            height={50}
          />
          <h1 className="hidden md:block text-xl md:text-2xl ml-2">
            Edu
            <span className="font-semibold text-2xl md:text-3xl text-transparent bg-gradient-to-br from-green-400 to-blue-600 bg-clip-text">
              Fiche
            </span>
          </h1>
        </div>
        <div className="flex items-center">
          <Link href="/app">
            <Button variant={"premium"} className="mr-3">
              Essaie gratuit
            </Button>
          </Link>
          <ModeToggle />
        </div>
      </nav>

      <div className="flex flex-col items-center w-full my-28 justify-center">
        <TextShine>
          Générer vos fiches de révision en quelques clics et sans efforts !
        </TextShine>
        <div className="my-5">
          <SubTitle text="Marre des fiches de révision post-soirée arrosée ? Dites adieu aux mauvaises notes !" />
        </div>
        <Link href="/app" className="mt-3">
          <Button variant={"premium"} className="mr-3">
            Essaie gratuit
          </Button>
        </Link>
      </div>

      <div className="flex flex-col mb-28">
        <h2 className="text-3xl text-center bg-gradient-to-t text-black dark:from-[#8c8b8b] font-semibold dark:to-[#fff] bg-clip-text dark:text-transparent">
          EduFiche c&apos;est quoi ?
        </h2>
        <SubTitle text="C'est votre outils essentiel pour réussir vos examens !" />

        <div className="flex flex-col md:flex-row items-center justify-center my-5">
          <CardSpotlight
            title="Des Fiches"
            description="Sélectionne la matières et ton niveau scolaire pour obtenir ta fiche en quelques secondes !"
            icon="https://cdn.lordicon.com/isugonwi.json"
          />
          <CardSpotlight
            title="Des Exercices"
            description="Tu peux générer des exercices sur le sujet de ton choix avec le niveau de ton choix."
            icon="https://cdn.lordicon.com/kipaqhoz.json"
          />
          <CardSpotlight
            title="Partage"
            description="Partage les fiches que tu génères avec tes amis pour les aider dans leurs révision !"
            icon="https://cdn.lordicon.com/hpivxauj.json"
          />
        </div>
      </div>

      <div className="flex flex-col mb-28">
        <h2 className="text-3xl text-center bg-gradient-to-t text-black dark:from-[#8c8b8b] font-semibold dark:to-[#fff] bg-clip-text dark:text-transparent">
          Quelques exemple des dernières fiches générées par des utilisateurs
        </h2>
        <SubTitle text="C'est votre outils essentiel pour réussir vos examens !" />
        <div className="flex flex-col md:flex-row items-center justify-center my-5">
            {lastestSheets.length > 0 ? lastestSheets.map((sheet) => (
                <CardSpotlight
                key={sheet.id}
                    title={sheet.title === "Untitled" ? "Sans titre" : sheet.title}
                    description={sheet.text.slice(0, 100) + `...`}
                    icon="https://cdn.lordicon.com/isugonwi.json"
                />
            )) : (
                <p className="text-center">Aucune fiche n&apos;a été généré pour le moment</p>
            )}
        </div>
      </div>

      <Footer/>
    </div>
  );
}
