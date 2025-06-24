"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const aboutRef = useRef<HTMLElement>(null);
  const introSectionPinnedHeight = window.innerHeight * 1;
  useEffect(() => {
    // Pin the about section - starts when it reaches the top
    ScrollTrigger.create({
      trigger: "#about",
      start: "top top",
      end: `+=${introSectionPinnedHeight}`,
      pin: true,
      pinSpacing: true,
    }); // About content scrolls up animation - moves content into .about-header space
    ScrollTrigger.create({
      trigger: "#about",
      start: "top top",
      end: `+=${introSectionPinnedHeight}`,
      scrub: 1,
      onUpdate: (self) => {
        const topPosition = gsap.utils.interpolate(100, -50, self.progress);

        gsap.set(".about-content", {
          yPercent: `${topPosition}`,
          zIndex: 1000, // Ensure it appears above other content
        });
      },
    });
    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
  return (
    <section
      ref={aboutRef}
      id="about"
      className="h-screen relative overflow-hidden"
    >
      <div className="about-content text-white max-w-4xl px-8 absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10">
        <div className="text-center space-y-6">
          <p className="text-element text-xl mb-4">
            I have a strong interest in web development, especially building
            interactive and visually engaging user interfaces. My experience
            includes working on several freelance and personal projects using
            React, TypeScript, and modern web technologies. I enjoy learning new
            frameworks and continuously improving my skills to deliver
            high-quality software solutions.
          </p>
          <p className="text-element text-xl mb-4">
            <strong>Main Skills:</strong> JavaScript, TypeScript, React,
            Next.js, Node.js, Python, GSAP, Tailwind CSS, HTML, CSS, Git, REST
            APIs.
          </p>
          <p className="text-element text-xl">
            <strong>Core Work Principles:</strong> Timeliness, attention to
            detail, and clear communication are at the heart of my workflow. I
            strive to deliver work on schedule, ensure every aspect meets high
            standards, and maintain open, effective communication throughout
            every project.
          </p>
        </div>
      </div>
    </section>
  );
}
