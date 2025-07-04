"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { aboutContent } from "@/data/data";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const aboutRef = useRef<HTMLDivElement>(null);
  const paragraphRefs = useRef<HTMLParagraphElement[]>([]);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !aboutRef.current) return;

    const aboutSection = aboutRef.current;
    const paragraphs = paragraphRefs.current.filter(
      Boolean
    ) as HTMLParagraphElement[];

    if (paragraphs.length === 0) return;

    scrollTriggerRef.current = ScrollTrigger.create({
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

    timelineRef.current = tl;

    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
    };
  }, []);

  return (
    <div id="about" ref={aboutRef}>
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-8">
        <div className="text-white text-center max-w-2xl sm:max-w-4xl w-full">
          {aboutContent.map((text, index) => (
            <p
              key={index}
              ref={(el) => {
                paragraphRefs.current[index] = el!;
              }}
              className="text-lg sm:text-2xl md:text-4xl mb-6 last:mb-0"
            >
              {text}
            </p>
          ))}
        </div>
      </section>
    </div>
  );
}
