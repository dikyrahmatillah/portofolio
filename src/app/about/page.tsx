"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  useEffect(() => {
    const aboutSectionPinnedHeight = window.innerHeight * 1;
    // Pin the about section - starts when it reaches the top

    ScrollTrigger.create({
      trigger: "#about",
      start: "top bottom",
      end: `+=${aboutSectionPinnedHeight}`,
      pin: true,
      pinSpacing: true,
    });

    ScrollTrigger.create({
      trigger: "#about",
      start: "top top",
      end: `+=${aboutSectionPinnedHeight}`,
      scrub: 1,
      markers: true,
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
    <section id="about" className="h-screen w-screen relative">
      <div className="about-content text-white absolute grid place-items-center left-1/2 -translate-x-1/2 md:grid-cols-1">
        <div className="flex justify-between py-8 border-t-1 gap-x-10 px-20 w-screen">
          <h2 className="text-xl mb-4">About Me</h2>
          <p className="text-xl mb-4">
            I build interactive web interfaces using React, TypeScript, and
            modern technologies. Always learning new frameworks to deliver
            quality solutions.
          </p>
        </div>
        <div className="flex justify-between py-8 border-t-1 gap-x-10 px-20 w-screen">
          <h2 className="text-xl mb-4">Main Skills</h2>
          <p className="text-element-2 text-xl mb-4">
            JavaScript, TypeScript, React, Next.js, Node.js, Python, GSAP,
            Tailwind CSS, HTML, CSS, Git, REST APIs.
          </p>
        </div>
        <div className="flex justify-between py-8 border-t-1 gap-x-10 px-20 w-screen">
          <h2 className="text-xl mb-4">Core Work Principles</h2>
          <p className="text-elemen-3 text-xl">
            Timeliness, attention to detail, and clear communication are at the
            heart of my workflow. I strive to deliver work on schedule, ensure
            every aspect meets high standards, and maintain open, effective
            communication throughout every project.
          </p>
        </div>
      </div>
    </section>
  );
}
