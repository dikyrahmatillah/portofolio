"use client";

import { useEffect } from "react";
import Welcome from "./welcome/page";
// import About from "./about/page"; // Now part of Hero component
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
      <Hero />
      {/* <About /> */}
      <Skills />
      <Portfolio />
      <Experience />
      <Testimonials />
      <Contact />
    </>
  );
}
