"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  useEffect(() => {
    const aboutSectionPinnedHeight = window.innerHeight * 2;

    ScrollTrigger.create({
      trigger: ".about",
      start: "top bottom",
      end: `center bottom`,
      pin: true,
      pinSpacing: true,
    });

    ScrollTrigger.create({
      trigger: ".about",
      start: "center center",
      end: `+=${aboutSectionPinnedHeight}`,
      scrub: 1,
      onUpdate: (self) => {
        const moveAmount = self.progress * -1000;
        gsap.set(".about-content", {
          x: moveAmount,
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
  return (
    <section className="about w-full h-[200vh] relative overflow-x-hidden">
      <div className="about-content flex flex-col justify-center items-center">
        <p className="w-full text-xl my-2 py-8 border-y-1 text-center px-4">
          I build interactive web interfaces using React, TypeScript, and modern
          technologies. Always learning new frameworks to deliver quality
          solutions.
        </p>
        <p className="w-full text-xl my-2 py-8 border-y-1 text-center px-4">
          Focusing on JavaScript, TypeScript, React, Next.js, GSAP, Tailwind
          CSS, HTML, CSS, Git, REST APIs.
        </p>
        <p className="w-full text-xl my-2 py-8 border-y-1 text-center px-4">
          I strive to deliver work on schedule, ensure every aspect meets high
          standards, and maintain open, effective communication throughout every
          project.
        </p>
      </div>
    </section>
  );
}
