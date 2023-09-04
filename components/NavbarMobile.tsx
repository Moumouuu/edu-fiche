"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { Progress } from "@/components/ui/progress";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { CgMenuGridO } from "react-icons/cg";
import { PremiumButton } from "./premium-button";
import { UserProfile } from "./user-profile";

export default function NavbarMobile({
  userLimit,
}: {
  userLimit: number | undefined;
}) {
  // TODO : premium check
  // TODO : add premium icon
  // TODO : icon color change in function of theme
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
      name: "Améliore ton anglais",
      href: "/qcm",
      icon: "https://cdn.lordicon.com/hpivxauj.json",
      premium: true,
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
          <SheetTitle className="flex ">
            <span className="text-3xl">EduFiche</span>
          </SheetTitle>
        </SheetHeader>
        <div className="h-[90%] flex flex-col justify-between">
          <div className="flex flex-col">
            {itemsMenu.map((item) => (
              <Link href={item.href} key={item.name} className="my-3">
                <div className="flex items-center w-full py-4 hover:bg-white/10 p-1 rounded">
                  {/* @ts-ignore */}
                  <lord-icon
                    src={item.icon}
                    trigger="hover"
                    colors="primary:#fff"
                  />
                  <span className="ml-2"> {item.name}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col my-3">
              <span>{userLimit ?? 0}/3 free generation</span>
              <Progress
                value={userLimit ? userLimit * 10 * 3.33 : 0}
                className="border"
              />
            </div>
            <PremiumButton />
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
