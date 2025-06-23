"use client";

import Welcome from "./welcome/page";
import About from "./about/page";
import Contact from "./contact/page";
import Experience from "./experience/page";
import Hero from "./hero/page";
import Portfolio from "./portofolio/page";
import Skills from "./skills/page";
import Testimonials from "./testimonials/page";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

export default function Home() {
  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
  return (
    <>
      <div className="relative z-10">
        <Hero />
        {/* <About /> */}
        <Skills />
        <Portfolio />
        <Experience />
        <Testimonials />
        {/* Spacer to allow scrolling past testimonials to reveal contact */}
        <div className="h-screen"></div>
        {/* <Contact /> */}
      </div>
    </>
  );
}
