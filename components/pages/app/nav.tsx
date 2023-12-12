"use client";
import { useUserLimitQuiz } from "@/app/hooks/use-user-limit-quiz";
import { useUserLimitSheet } from "@/app/hooks/use-user-limit-sheet";
import { UserLimit } from "@/app/types/sheet";
import { useEffect } from "react";
import NavbarDesk from "./navbar-desk";
import NavbarMobile from "./navbar-mobile";

export default function Nav({
  userLimit,
  isPro,
}: {
  userLimit: UserLimit;
  isPro: boolean;
}) {
  const { setCount: setCountSheet } = useUserLimitSheet();
  const { setCount: setCountQuiz } = useUserLimitQuiz();

  const initStateOfFreeTrials = () => {
    setCountSheet(userLimit.userLimitSheet || 0);
    setCountQuiz(userLimit.userLimitQuiz || 0);
  };

  useEffect(() => {
    // use to init the free trials of sheets & quiz when the user is logged in
    initStateOfFreeTrials();
  }, []);

  return (
    <>
      <div className="block lg:hidden">
        <NavbarMobile userLimit={userLimit} isPro={isPro} />
      </div>
      <div className="hidden lg:block">
        <NavbarDesk userLimit={userLimit} isPro={isPro} />
      </div>
    </>
  );
}
