"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  useEffect(() => {
    const aboutSectionPinnedHeight = window.innerHeight * 1;

    ScrollTrigger.create({
      trigger: ".about",
      start: "top bottom",
      end: `+=${aboutSectionPinnedHeight}`,
      pin: true,
      pinSpacing: true,
    });

    ScrollTrigger.create({
      trigger: ".about",
      start: "top top",
      end: `+=${aboutSectionPinnedHeight}`,
      scrub: 1,
      onUpdate: (self) => {
        const topPosition = gsap.utils.interpolate(100, 0, self.progress);

        gsap.set(".about-content", {
          yPercent: `${topPosition}`,
        });
      },
    });
    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
  return (
    <section className="about h-screen w-screen relative">
      <div className="flex flex-col justify-center items-align">
        <p className="w-screen text-xl my-2 py-8 border-y-1 text-center">
          I build interactive web interfaces using React, TypeScript, and modern
          technologies. Always learning new frameworks to deliver quality
          solutions.
        </p>
        <p className="w-screen text-xl my-2 py-8 border-y-1 text-center">
          Focusing on JavaScript, TypeScript, React, Next.js, GSAP, Tailwind
          CSS, HTML, CSS, Git, REST APIs.
        </p>
        <p className="w-screen text-xl my-2 py-8 border-y-1 text-center">
          I strive to deliver work on schedule, ensure every aspect meets high
          standards, and maintain open, effective communication throughout every
          project.
        </p>
      </div>
    </section>
  );
}
