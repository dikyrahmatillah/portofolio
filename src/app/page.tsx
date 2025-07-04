"use client";

import { useEffect } from "react";
import About from "./about/page";
import Experience from "./experience/page";
import Hero from "./hero/page";
import Portfolio from "./portofolio/page";
import Skills from "./skills/page";
import Testimonials from "./testimonials/page";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Cursor from "@/components/cursor/cursor";
import Contact from "./contact/page";
import Navbar from "@/components/navbar";

export default function Home() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const lenis = new Lenis();
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);

      return () => {
        lenis.destroy();
        gsap.ticker.remove(() => {});
      };
    }
  }, []);

  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Portfolio />
        <Experience />
        <Testimonials />
        <Contact />
      </main>
    </>
  );
}
