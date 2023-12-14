"use client";

import Image from "next/image";
import Link from "next/link";

import { usePremiumModal } from "@/app/hooks/use-premium-modal";
import { ModeToggle } from "@/components/mode-toggle";
import { Progress } from "@/components/ui/progress";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PremiumModal } from "./premium-modal";
import { UserProfile } from "./user-profile";

import { MAX_FREE_TRIAL, MAX_FREE_TRIAL_QUIZ, itemsMenu } from "@/lib/utils";

import { UserLimit } from "@/app/types/sheet";
import { CgMenuGridO } from "react-icons/cg";

export default function NavbarMobile({
  userLimit,
  isPro,
}: {
  userLimit: UserLimit;
  isPro: boolean;
}) {
  const { open } = usePremiumModal();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="p-4 fixed top-2 left-2">
          <CgMenuGridO size={20} />
        </div>
      </SheetTrigger>
      <SheetContent side={"left"} className="h-screen overflow-y-auto">
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
                <SheetClose asChild key={item.name}>
                  <div className="my-3 cursor-pointer" onClick={open}>
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
                </SheetClose>
              ) : (
                <SheetClose asChild key={item.name}>
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
                </SheetClose>
              )
            )}
          </div>
          <div className="flex flex-col">
            {!isPro && (
              <div className="flex items-end  my-3">
                <div className="flex flex-col mx-2 flex-1">
                  <span>
                    {userLimit.userLimitSheet ?? 0}/{MAX_FREE_TRIAL} Fiches
                  </span>
                  <Progress
                    value={
                      userLimit.userLimitSheet
                        ? (userLimit.userLimitSheet * 100) / MAX_FREE_TRIAL
                        : 0
                    }
                  />
                </div>
                <div className="flex flex-col mx-2 flex-1">
                  <span>
                    {userLimit.userLimitQuiz ?? 0}/{MAX_FREE_TRIAL_QUIZ} Quiz
                  </span>
                  <Progress
                    value={
                      userLimit.userLimitQuiz
                        ? (userLimit.userLimitQuiz * 100) / MAX_FREE_TRIAL_QUIZ
                        : 0
                    }
                  />
                </div>
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
