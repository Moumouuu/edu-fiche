"use client";
import { usePremiumModal } from "@/app/hooks/use-premium-modal";
import { ModeToggle } from "@/components/mode-toggle";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { PremiumButton } from "./premium-button";
import { UserProfile } from "./user-profile";

export default function NavbarDesk({
  userLimit,
  isPro,
}: {
  userLimit: number | undefined;
  isPro: boolean;
}) {
  // TODO : icon color change in function of theme
  const path = usePathname();
  const { open, isOpen } = usePremiumModal();

  useEffect(() => {
    console.log(isOpen);
  }, [isOpen]);

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
      href: "/tchat",
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
          {itemsMenu.map((item) =>
            item.premium && !isPro ? (
              <div
                key={item.name}
                className="my- cursor-pointer"
                onClick={open}
              >
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
              </div>
            ) : (
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
    </div>
  );
}
