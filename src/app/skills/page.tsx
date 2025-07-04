"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skills, skillImages } from "@/data/data";
import SkillTitles from "@/components/skills/SkillTitles";
import SkillImagesMobile from "@/components/skills/SkillImagesMobile";
import SkillImages3D from "@/components/skills/SkillImages3D";

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const skillTitlesRef = useRef<HTMLDivElement>(null);
  const skillImagesRef = useRef<HTMLDivElement>(null);
  const imageCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isLarge = windowWidth >= 1600;
  const isMobile = windowWidth < 640;

  useEffect(() => {
    const moveDistance = isMobile ? windowWidth : windowWidth * 5;

    if (scrollTriggerRef.current) scrollTriggerRef.current.kill();

    if (!isMobile) {
      imageCardRefs.current.forEach((card, index) => {
        if (card) {
          const pos = isLarge
            ? skillImages[index]?.pos.large
            : skillImages[index]?.pos.small;
          if (pos) {
            gsap.set(card, {
              x: pos.x,
              y: pos.y,
              z: -1500,
              scale: 0,
              opacity: 0,
            });
          }
        }
      });
    }

    // Use a slight delay to ensure About section's ScrollTrigger is properly initialized
    const timer = setTimeout(() => {
      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: skillImagesRef.current,
        start: "top top",
        end: `+=${moveDistance}px`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        // Lower priority to ensure it runs after About section
        refreshPriority: -1,
        onUpdate: (self) => {
          const xPosition = -moveDistance * self.progress;
          if (skillTitlesRef.current) {
            gsap.set(skillTitlesRef.current, { x: xPosition });
          }

          if (!isMobile) {
            imageCardRefs.current.forEach((card, index) => {
              if (card) {
                const staggerOffset = index * 0.075;
                const scaledProgress = (self.progress - staggerOffset) * 2;
                const individualProgress = Math.max(
                  0,
                  Math.min(1, scaledProgress)
                );
                const newZ = -1500 + 3000 * individualProgress;
                const scale = Math.max(
                  0,
                  Math.min(1, individualProgress * 1.2)
                );
                gsap.set(card, {
                  z: newZ,
                  scale,
                  opacity: scale,
                });
              }
            });
          }
        },
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
    };
  }, [windowWidth, isLarge, isMobile]);

  return (
    <div id="skills">
      <section
        className="relative w-screen h-[100svh] overflow-hidden"
        ref={skillImagesRef}
      >
        <SkillTitles skills={skills} skillTitlesRef={skillTitlesRef} />

        {isMobile ? (
          <SkillImagesMobile skillImages={skillImages} />
        ) : (
          <SkillImages3D
            skillImages={skillImages}
            imageCardRefs={imageCardRefs}
            isLarge={isLarge}
          />
        )}
      </section>
    </div>
  );
}
