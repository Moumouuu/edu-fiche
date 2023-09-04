"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PremiumButton } from "../premium-button";
import { UserProfile } from "../user-profile";

export default function NavbarDesk({ userLimit }: { userLimit: number }) {
  // TODO : icon color change in function of theme
  const path = usePathname();
  const { data: session } = useSession();

  const itemsMenu = [
    {
      name: "Fiche de révision",
      href: "/",
      icon: "https://cdn.lordicon.com/isugonwi.json",
      premium: false,
      isActive: "/" === path,
    },
    {
      name: "Générateur d'exercices",
      href: "/exercices",
      icon: "https://cdn.lordicon.com/kipaqhoz.json",
      premium: true,
      isActive: "/exercices" === path,
    },
    {
      name: "Améliore ton anglais",
      href: "/qcm",
      icon: "https://cdn.lordicon.com/hpivxauj.json",
      premium: true,
      isActive: "/tchat" === path,
    },
  ];
  return (
    <div className="w-[300px] border-r h-[100vh] p-4">
      <div className="mb-8">
        <div className="flex ">
          <span className="text-3xl">EduFiche</span>
        </div>
      </div>
      <div className="h-[90%] flex flex-col justify-between">
        <div className="flex flex-col">
          {itemsMenu.map((item) => (
            <Link href={item.href} key={item.name} className="my-3">
              <div
                className={cn(
                  "flex items-center w-full hover:bg-white/10 p-1 py-3 rounded",
                  item.isActive && "bg-white/10"
                )}
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
          ))}
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col my-3">
            <span>{userLimit}/3 free generation</span>
            <Progress value={userLimit * 10 * 3.33} className="border" />
          </div>
          <PremiumButton />
          <div className="flex w-full justify-between items-center">
            <UserProfile />
            <ModeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
