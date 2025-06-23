"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  // Assuming you have text elements with classes like .text-1, .text-2, etc.
  const textElements = gsap.utils.toArray<Element>(".text-element");

  textElements.forEach((text, index) => {
    gsap.to(text, {
      opacity: 1, // or visibility: "visible"
      scrollTrigger: {
        trigger: text,
        start: "top 80%", // Adjust as needed
        end: "bottom 20%", // Adjust as needed
        scrub: 1, // Smoothly follow the scrollbar
        markers: true, // Remove for production
      },
    });

    gsap.set(text, {
      opacity: 0, // or visibility: "hidden"
    });

    // Optional: Hide previous elements when the current one becomes visible
    if (index > 0) {
      gsap.set(textElements[index - 1], {
        opacity: 0, // or visibility: "hidden"
      });
    }
  });
  return (
    <section id="about" className="h-screen flex items-center justify-center">
      <div className="about-content text-white text-center max-w-4xl px-8">
        <p className="text-element text-2xl mb-6">
          I have a background in computer science and a strong interest in web
          development, especially building interactive and visually engaging
          user interfaces. My experience includes working on several freelance
          and personal projects using React, TypeScript, and modern web
          technologies. I enjoy learning new frameworks and continuously
          improving my skills to deliver high-quality software solutions.
        </p>
        <p className="text-element text-2xl mb-6">
          <strong>Main Skills:</strong> JavaScript, TypeScript, React, Next.js,
          Node.js, Python, GSAP, Tailwind CSS, HTML, CSS, Git, REST APIs.
        </p>
        <p className="text-element text-2xl">
          <strong>Core Work Principles:</strong> Timeliness, attention to
          detail, and clear communication are at the heart of my workflow. I
          strive to deliver work on schedule, ensure every aspect meets high
          standards, and maintain open, effective communication throughout every
          project.
        </p>
      </div>
    </section>
  );
}
