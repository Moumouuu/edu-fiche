"use client";
import { usePremiumModal } from "@/app/hooks/use-premium-modal";
import { ModeToggle } from "@/components/mode-toggle";
import { Progress } from "@/components/ui/progress";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { CgMenuGridO } from "react-icons/cg";
import { PremiumButton } from "./premium-button";
import { UserProfile } from "./user-profile";

export default function NavbarMobile({
  userLimit,
  isPro,
}: {
  userLimit: number | undefined;
  isPro: boolean;
}) {
  const { open } = usePremiumModal();

  const itemsMenu = [
    {
      name: "Fiche de révision",
      href: "/",
      icon: "https://cdn.lordicon.com/isugonwi.json",
      premium: false,
    },
    {
      name: "Générateur d'exercices",
      href: "/exercices",
      icon: "https://cdn.lordicon.com/kipaqhoz.json",
      premium: true,
    },
    {
      name: "Mes fiches",
      href: "/sheets",
      icon: "https://cdn.lordicon.com/hpivxauj.json",
      premium: false,
    },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="p-4 absolute top-2 left-2">
          <CgMenuGridO size={20} />
        </div>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader className="mb-8">
          <SheetTitle>
            <span className="text-3xl flex items-center">
              <Image
                src="/assets/images/edu-fiche-logo.png"
                width={50}
                height={50}
                alt="Logo edu-fiche"
                className="mr-3"
              />
              EduFiche
            </span>
          </SheetTitle>
        </SheetHeader>
        <div className="h-[90%] flex flex-col justify-between">
          <div className="flex flex-col">
            {itemsMenu.map((item) =>
              item.premium && !isPro ? (
                <div
                  key={item.name}
                  className="my- cursor-pointer"
                  onClick={open}
                >
                  <div
                    className={
                      "flex items-center w-full hover:bg-white/10 p-1 py-3 rounded"
                    }
                  >
                    {/* @ts-ignore */}
                    <lord-icon
                      src={item.icon}
                      trigger="hover"
                      colors="primary:#fff"
                    />
                    <span className="ml-2"> {item.name}</span>
                  </div>
                </div>
              ) : (
                <Link href={item.href} key={item.name} className="my-3">
                  <div
                    className={
                      "flex items-center w-full hover:bg-white/10 p-1 py-3 rounded"
                    }
                  >
                    {/* @ts-ignore */}
                    <lord-icon
                      src={item.icon}
                      trigger="hover"
                      colors="primary:#fff"
                    />
                    <span className="ml-2"> {item.name}</span>
                  </div>
                </Link>
              )
            )}
          </div>
          <div className="flex flex-col">
            {!isPro && (
              <div className="flex flex-col my-3">
                <span>{userLimit ?? 0}/3 free generation</span>
                <Progress
                  value={userLimit ? userLimit * 10 * 3.33 : 0}
                  className="border"
                />
              </div>
            )}

            <PremiumButton isPro={isPro} />
            <div className="flex w-full justify-between items-center">
              <UserProfile />
              <ModeToggle />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
