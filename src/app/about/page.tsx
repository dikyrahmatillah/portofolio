"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const aboutRef = useRef<HTMLElement>(null);
  const paragraphRefs = [
    useRef<HTMLParagraphElement>(null),
    useRef<HTMLParagraphElement>(null),
    useRef<HTMLParagraphElement>(null),
  ];

  useEffect(() => {
    if (typeof window === "undefined" || !aboutRef.current) return;

    const aboutSection = aboutRef.current;
    const paragraphs = paragraphRefs.map((ref) => ref.current).filter(Boolean);

    if (paragraphs.length === 0) return;

    const pinTrigger = ScrollTrigger.create({
      trigger: aboutSection,
      start: "top top",
      end: `+=${window.innerHeight * 4}`,
      pin: true,
      pinSpacing: true,
    });

    gsap.set(paragraphs, {
      opacity: 0,
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: 10,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: aboutSection,
        start: "top top",
        end: `+=${window.innerHeight * 4}`,
        scrub: 1,
      },
    });

    paragraphs.forEach((paragraph, index) => {
      const startTime = index * 0.3;
      const fadeInDuration = 0.1;
      const visibleDuration = 0.2;
      const fadeOutDuration = 0.1;

      tl.to(paragraph, { opacity: 1, duration: fadeInDuration }, startTime)
        .to(
          paragraph,
          { opacity: 1, duration: visibleDuration },
          startTime + fadeInDuration
        )
        .to(
          paragraph,
          { opacity: 0, duration: fadeOutDuration },
          startTime + fadeInDuration + visibleDuration
        );
    });

    return () => {
      pinTrigger.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={aboutRef}
      id="about"
      className="h-screen flex items-center justify-center"
    >
      <div className="about-content text-white text-center max-w-4xl px-8">
        <p ref={paragraphRefs[0]} className="text-element text-4xl mb-6">
          I build interactive web interfaces using React, TypeScript, and modern
          technologies. Always learning new frameworks to deliver quality
          solutions.
        </p>
        <p ref={paragraphRefs[1]} className="text-element text-4xl mb-6">
          Focusing on JavaScript, TypeScript, React, Next.js, GSAP, Tailwind
          CSS, HTML, CSS, Git, REST APIs.
        </p>
        <p ref={paragraphRefs[2]} className="text-element text-4xl">
          I strive to deliver work on schedule, ensure every aspect meets high
          standards, and maintain open, effective communication throughout every
          project.
        </p>
      </div>
    </section>
  );
}
