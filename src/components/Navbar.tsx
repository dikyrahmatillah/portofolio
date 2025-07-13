"use client";
import Image from "next/image";
import SectionDropdownNav from "./SectionDropdownNav";

export default function Navbar() {
  return (
    <header
      className="fixed w-full mx-auto px-2 sm:px-4 md:px-6 py-2 z-50"
      role="banner"
    >
      <nav
        className="flex justify-between items-center"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex-shrink-0">
          <a href="#hero" aria-label="Go to top of page">
            <Image
              src="/logo.svg"
              alt="Diky Rahmatillah Logo"
              width={48}
              height={48}
              className="w-10 h-10 sm:w-12 sm:h-12 transition-transform hover:scale-105"
              priority
              fetchPriority="high"
            />
          </a>
        </div>
        <div className="flex items-center">
          <SectionDropdownNav />
        </div>
      </nav>
    </header>
  );
}
