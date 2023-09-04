"use client";
import NavbarDesk from "./NavbarDesk";
import NavbarMobile from "./NavbarMobile";

export default function Nav({ userLimit }: { userLimit: number }) {
  return (
    <>
      <div className="block md:hidden">
        <NavbarMobile userLimit={userLimit} />
      </div>
      <div className="hidden md:block">
        <NavbarDesk userLimit={userLimit} />
      </div>
    </>
  );
}
