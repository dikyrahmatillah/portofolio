"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { skills, skillImages } from "@/data/data";
import SlideRevealText from "@/components/slideRevealText/slideRevealText";

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

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: skillImagesRef.current,
      start: "top top",
      end: `+=${moveDistance}px`,
      pin: true,
      scrub: 1,
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
              const scale = Math.max(0, Math.min(1, individualProgress * 1.2));
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

    return () => {
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
        <div
          className="relative flex flex-col gap-2 sm:flex-row h-[60vh] sm:h-screen w-full sm:w-[500vw] will-change-transform"
          ref={skillTitlesRef}
        >
          {skills.map((item, i) => (
            <div
              key={i}
              className={`flex-1 flex flex-col justify-center items-center px-4 ${
                item.type === "title" ? "" : "text-base sm:text-2xl md:text-4xl"
              }`}
            >
              {item.type === "title" ? (
                <h1 className="text-center text-2xl sm:text-4xl md:text-6xl translate-y-10 font-bold mb-2">
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

        {isMobile ? (
          <div className="grid grid-cols-4 gap-4 justify-items-center items-center w-full h-auto py-8 mt-4">
            {skillImages.map((item) => (
              <div
                key={item.name}
                className="rounded-xl overflow-hidden bg-white/20 p-2"
                style={{ width: 80, height: 80 }}
              >
                <Image
                  src={item.image}
                  alt={`skill image ${item.name}`}
                  width={item.width}
                  height={item.height}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="absolute top-1/2 left-1/2 w-[200vw] h-[200vh] -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d] [perspective:500px]">
            {skillImages.map((item, idx) => (
              <div
                key={item.name}
                ref={(el) => {
                  imageCardRefs.current[idx] = el;
                }}
                className="absolute flex items-center justify-center"
                style={{
                  width: isLarge ? 300 : 120,
                  height: isLarge ? 300 : 120,
                  borderRadius: "1rem",
                  overflow: "hidden",
                }}
              >
                <div className="absolute inset-0 bg-white/70 dark:bg-white/30 rounded-xl pointer-events-none" />
                <Image
                  src={item.image}
                  alt={`skill image ${item.name}`}
                  width={item.width}
                  height={item.height}
                  className="w-full h-full object-contain relative z-10"
                />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
