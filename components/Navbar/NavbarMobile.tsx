"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { CgMenuGridO } from "react-icons/cg";

export default function NavbarMobile() {
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
              <span>0/3 free generation</span>
              <Progress value={50} className="border" />
            </div>
            <Button variant={"premium"}>Upgrade to Premium</Button>
            <div className="flex w-full justify-between items-center">
              <UserButton afterSignOutUrl="/" />
              <ModeToggle />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
