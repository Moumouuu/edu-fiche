"use client";

import Image from "next/image";
import Link from "next/link";

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
import { PremiumModal } from "./premium-modal";
import { UserProfile } from "./user-profile";

import { MAX_FREE_TRIAL, itemsMenu } from "@/lib/utils";

import { CgMenuGridO } from "react-icons/cg";

export default function NavbarMobile({
  userLimit,
  isPro,
}: {
  userLimit: number | undefined;
  isPro: boolean;
}) {
  const { open } = usePremiumModal();

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
            <div className="flex items-center">
              <Image
                src="/assets/images/edu-fiche-logo.png"
                alt="EduFiche"
                width={50}
                height={50}
              />
              <h1 className="text-xl md:text-2xl ml-2">
                Edu
                <span className="font-semibold text-2xl md:text-3xl text-transparent bg-gradient-to-br from-green-400 to-blue-600 bg-clip-text">
                  Fiche
                </span>
              </h1>
            </div>
          </SheetTitle>
        </SheetHeader>
        <div className="h-[90%] flex flex-col justify-between">
          <div className="flex flex-col">
            {itemsMenu.map((item) =>
              item.premium && !isPro ? (
                <div
                  key={item.name}
                  className="my-3 cursor-pointer"
                  onClick={open}
                >
                  <div
                    className={
                      "flex items-center w-full hover:bg-white/10 p-3 rounded"
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
                      "flex items-center w-full hover:bg-white/10 p-3 rounded"
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
                <span>
                  {userLimit ?? 0}/{MAX_FREE_TRIAL} générations gratuites
                </span>
                <Progress
                  value={userLimit ? userLimit * 20 : 0}
                  className="border"
                />
              </div>
            )}

            <PremiumModal isPro={isPro} />
            <div className="flex w-full justify-between items-center mt-2">
              <UserProfile />
              <ModeToggle />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
