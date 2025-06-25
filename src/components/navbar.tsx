"use client";
import { GiDeadHead } from "react-icons/gi";
import LiveClock from "@/components/LiveClock";

export default function Navbar() {
  return (
    <nav className="fixed w-screen mx-auto px-6 py-2 flex justify-between items-center z-1000">
      <div>
        <GiDeadHead className="text-4xl" />
      </div>
      <div>
        <LiveClock />
      </div>
    </nav>
  );
}
