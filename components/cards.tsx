"use client";
import { MagicCard, MagicContainer } from "@/components/magicui/magic-card";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CiCircleCheck } from "react-icons/ci";
import { LuPartyPopper } from "react-icons/lu";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export function Cards() {
  const { data: session } = useSession();
  const router = useRouter();

  const onSubscribe = async () => {
    try {
      if (!session) router.push("/sign-in");
      const response = await axios.get("/api/stripe");

      window.location.href = response.data.url;
    } catch (error) {
      console.log(`Error on subscribe: ${error}`);
    }
  };

  const freeLabels = [
    "Vous avez accès à 10 générations de fiche gratuitement.",
    "Toutes les 5 générations de fiche vous gagnez un EduCoin. Vous pouvez les utiliser pour acheter des générations de Quiz.",
    "Vous pouvez consulter vos fiches de révision sur tous vos appareils.",
    "Vous avez accès à l'annuaire du Web.",
  ];

  const premiumLabels = [
    "Vous pouvez générez des fiches de révision à l'infini.",
    "Vous pouvez générer des Quiz à l'infini.",
    "Les mêmes avantages que les utilisateurs gratuits.",
  ];

  return (
    <div className="w-full px-2 py-20 lg:p-20">
      <div className="text-center mb-10">
        <h1 className="text-6xl font-bold">
          C&apos;est presque{" "}
          <span className="p-1 bg-gradient-to-br from-green-400 rounded-md to-blue-600 uppercase">
            gratuit
          </span>{" "}
          pour vous !
        </h1>
        <h3 className="mt-6 text-xl font-semibold text-muted-foreground">
          Améliorez votre expérience avec notre abonnement premium ! Soutenez
          directement le développement, l&apos;unique étudiant derrière ce
          projet. Rejoignez-nous maintenant !
        </h3>
      </div>

      <MagicContainer
        className={
          "flex h-auto lg:h-[700px] w-full flex-col gap-4  lg:flex-row"
        }
      >
        <MagicCard
          size={700}
          className="flex w-full cursor-pointer flex-col items-start justify-center overflow-hidden bg-[radial-gradient(var(--mask-size)_circle_at_var(--mouse-x)_var(--mouse-y),#22c55e,#2563eb_50%,transparent_100%)] p-8 lg:p-20 shadow-2xl"
        >
          <p className="z-10 whitespace-nowrap text-4xl font-medium text-gray-800 dark:text-gray-200">
            Gratuit
          </p>
          <span className="text-8xl my-4">0€</span>
          <p className="text-muted-foreground text-lg mb-4">
            Vous préférez manger des MacDo ? Pas de soucis, vous pouvez utiliser
            EduFiche gratuitement. Vous avez accès à 10 générations de fiche
            gratuitement.
          </p>
          <Link href="/app" className="w-full">
            <Button variant={"premium"} className="w-full">
              Essaie gratuit
            </Button>
          </Link>
          <Separator className="my-4" />

          {freeLabels.map((label, i) => (
            <div key={i} className="flex items-center my-2">
              <div>
                <CiCircleCheck color="green" size="30" />
              </div>
              <span className="ml-2">{label}</span>
            </div>
          ))}

          <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
        </MagicCard>
        <MagicCard
          size={700}
          className="flex w-full cursor-pointer flex-col items-start justify-center overflow-hidden bg-[radial-gradient(var(--mask-size)_circle_at_var(--mouse-x)_var(--mouse-y),#22c55e,#2563eb_50%,transparent_100%)]  p-8 lg:p-20 shadow-2xl"
        >
          <p className="z-10 whitespace-nowrap text-4xl font-medium text-gray-800 dark:text-gray-200">
            Premium
          </p>

          <span className="text-8xl my-4">7.99€</span>
          <p className="text-muted-foreground text-lg mb-4">
            C&apos;est le prix d&apos;un menu au McDo, mais vous soutenez un
            étudiant qui a besoin de vous ! Le paiement est unique et vous avez
            un <span className="underline">accès à vie.</span>
          </p>
          <Button variant={"premium"} onClick={onSubscribe} className="w-full">
            <LuPartyPopper size={25} />
            <span className="ml-2"> Passer premium</span>
          </Button>

          <Separator className="my-4" />

          {premiumLabels.map((label, i) => (
            <div key={i} className="flex items-center my-2">
              <div>
                <CiCircleCheck color="green" size="30" />
              </div>
              <span className="ml-2">{label}</span>
            </div>
          ))}

          <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
        </MagicCard>
      </MagicContainer>
    </div>
  );
}
