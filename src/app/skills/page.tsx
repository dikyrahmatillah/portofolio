"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { skillsContent } from "@/data/data";
import SlideRevealText from "@/components/slideRevealText/slideRevealText";

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const skillTitlesRef = useRef<HTMLDivElement>(null);
  const skillImagesRef = useRef<HTMLDivElement>(null);
  const imageCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [windowWidth, setWindowWidth] = useState(0);

  const skillCardPos = {
    small: [
      { y: 100, x: 1000 },
      { y: 1500, x: 100 },
      { y: 1250, x: 1950 },
      { y: 1500, x: 850 },
      { y: 200, x: 2100 },
      { y: 250, x: 600 },
      { y: 1100, x: 1650 },
      { y: 200, x: 1400 },
      { y: 1000, x: 800 },
      { y: 150, x: 1600 },
    ],
    large: [
      { y: 800, x: 5000 },
      { y: 2000, x: 3000 },
      { y: 240, x: 4450 },
      { y: 1200, x: 3450 },
      { y: 500, x: 2200 },
      { y: 750, x: 1100 },
      { y: 1850, x: 3350 },
      { y: 800, x: 2600 },
      { y: 2200, x: 1300 },
      { y: 500, x: 4500 },
    ],
  };
  const currentCardPos =
    windowWidth >= 1600 ? skillCardPos.large : skillCardPos.small;
  const skillItems = useMemo(
    () => Array.from({ length: 10 }, (_, i) => i + 1),
    []
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const isMobile = windowWidth < 640;
    const moveDistance = isMobile ? windowWidth : windowWidth * 5;

    if (scrollTriggerRef.current) scrollTriggerRef.current.kill();

    if (!isMobile) {
      imageCardRefs.current.forEach((card, index) => {
        if (card) {
          const pos = currentCardPos[index];
          gsap.set(card, { x: pos.x, y: pos.y, z: -1500, scale: 0 });
        }
      });
    }

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: skillImagesRef.current,
      start: "top top",
      end: `+=${moveDistance}px`,
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        const xPosition = -moveDistance * self.progress;
        if (skillTitlesRef.current)
          gsap.set(skillTitlesRef.current, { x: xPosition });

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
                Math.min(1, Math.min(1, individualProgress * 10))
              );
              gsap.set(card, { z: newZ, scale });
            }
          });
        }
      },
    });

    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
    };
  }, [windowWidth, currentCardPos]);

  return (
    <section
      className="relative w-screen h-[100svh] overflow-hidden"
      ref={skillImagesRef}
    >
      <div className="absolute top-1/2 left-1/2 w-[200vw] h-[200vh] -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d] [perspective:500px]">
        {skillItems.map((item, idx) => (
          <div
            key={item}
            ref={(el) => {
              imageCardRefs.current[idx] = el;
            }}
            className="absolute w-[120px] h-[120px] md:w-[300px] md:h-[300px] rounded-2xl overflow-hidden"
          >
            <Image
              src={`/images/skill-items/skill-item-${item}.png`}
              alt={`skill image ${item}`}
              width={250}
              height={250}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <div
        className="relative flex flex-col gap-6 sm:flex-row h-[60vh] sm:h-screen w-full sm:w-[500vw] will-change-transform"
        ref={skillTitlesRef}
      >
        {skillsContent.map((item, i) => (
          <div
            key={i}
            className={`flex-1 flex flex-col justify-center items-center px-4 ${
              item.type === "title" ? "" : "text-base sm:text-2xl md:text-4xl"
            }`}
          >
            {item.type === "title" ? (
              <h1 className="text-center text-2xl sm:text-4xl md:text-6xl -translate-y-2 font-bold mb-2">
                {item.text}
              </h1>
            ) : (
              <SlideRevealText>
                <h2 className="text-center">{item.text}</h2>
              </SlideRevealText>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
