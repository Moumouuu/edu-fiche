"use client";
import NavbarDesk from "./NavbarDesk";
import NavbarMobile from "./NavbarMobile";

export default function Navbar() {
  return (
    <>
      <div className="block md:hidden">
        <NavbarMobile />
      </div>
      <div className="hidden md:block">
        <NavbarDesk />
      </div>
    </>
  );
}
