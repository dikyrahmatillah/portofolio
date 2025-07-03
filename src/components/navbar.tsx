"use client";
import Image from "next/image";
// Remove: import { GiDeadHead } from "react-icons/gi";
import SectionDropdownNav from "./SectionDropdownNav";
// import LiveClock from "./LiveClock";

export default function Navbar() {
  return (
    <nav className="fixed w-screen mx-auto px-2 sm:px-4 md:px-6 py-2 flex justify-between items-center z-1000">
      <div>
        <Image
          src="/logo.svg"
          alt="Diky's Logo"
          width={48}
          height={48}
          className="w-10 h-10 sm:w-12 sm:h-12"
          priority
        />
      </div>
      <div>
        {/* <LiveClock /> */}
        <SectionDropdownNav />
      </div>
    </nav>
  );
}
