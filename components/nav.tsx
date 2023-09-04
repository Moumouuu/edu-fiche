"use client";
import NavbarDesk from "./NavbarDesk";
import NavbarMobile from "./NavbarMobile";

export default function Nav({
  userLimit,
  isPro,
}: {
  userLimit: number | undefined;
  isPro: boolean;
}) {
  return (
    <>
      <div className="block md:hidden">
        <NavbarMobile userLimit={userLimit} isPro={isPro} />
      </div>
      <div className="hidden md:block">
        <NavbarDesk userLimit={userLimit} isPro={isPro} />
      </div>
    </>
  );
}
