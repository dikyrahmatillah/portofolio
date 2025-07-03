"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutNavbar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let trigger: ScrollTrigger | undefined;

    // Wait for DOM to be ready
    setTimeout(() => {
      const section = document.getElementById("about-section");
      if (section && barRef.current) {
        trigger = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            barRef.current!.style.transform = `scaleX(${self.progress})`;
          },
        });
      }
    }, 0);

    return () => {
      if (trigger) trigger.kill();
    };
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 24,
        right: 24,
        left: 24,
        zIndex: 1100,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        className="project-page-scroll-progress"
        style={{ width: 400, maxWidth: "100%" }}
      >
        <div
          ref={barRef}
          className="project-page-scroll-progress-bar"
          style={{ transition: "transform 0.2s" }}
        />
        <span
          style={{
            position: "relative",
            zIndex: 1,
            color: "#222",
            fontWeight: 500,
          }}
        >
          About Section
        </span>
      </div>
    </nav>
  );
}
