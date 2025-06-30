"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./skills.css";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const scrollTriggerInstance = useRef<ScrollTrigger | null>(null);
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
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const initAnimations = () => {
      if (windowWidth <= 1000) {
        if (scrollTriggerInstance.current) {
          scrollTriggerInstance.current.kill();
          scrollTriggerInstance.current = null;
        }
        return;
      }

      if (scrollTriggerInstance.current) {
        scrollTriggerInstance.current.kill();
      }

      const moveDistance = windowWidth * 5;

      imageCardRefs.current.forEach((card, index) => {
        if (card) {
          const position = currentCardPos[index];
          gsap.set(card, {
            x: position.x,
            y: position.y,
            z: -1500,
            scale: 0,
          });
        }
      });

      scrollTriggerInstance.current = ScrollTrigger.create({
        trigger: ".skill",
        start: "top top",
        end: `+=${windowWidth * 5}px`,
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const xPosition = -moveDistance * self.progress;

          if (skillTitlesRef.current) {
            gsap.set(skillTitlesRef.current, {
              x: xPosition,
            });
          }

          imageCardRefs.current.forEach((card, index) => {
            if (card) {
              const staggerOffset = index * 0.075;
              const scaledProgress = (self.progress - staggerOffset) * 2;
              const individualProgress = Math.max(
                0,
                Math.min(1, scaledProgress)
              );
              const newZ = -1500 + (1500 + 1500) * individualProgress;
              const scaleProgress = Math.min(1, individualProgress * 10);
              const scale = Math.max(0, Math.min(1, scaleProgress));

              gsap.set(card, {
                z: newZ,
                scale: scale,
              });
            }
          });
        },
      });
    };

    const timeoutId = setTimeout(initAnimations, 100);

    return () => {
      clearTimeout(timeoutId);
      if (scrollTriggerInstance.current) {
        scrollTriggerInstance.current.kill();
        scrollTriggerInstance.current = null;
      }
    };
  }, [windowWidth, currentCardPos]);
  return (
    <section className="skill">
      <div className="skill-images" ref={skillImagesRef}>
        {skillItems.map((item, index) => (
          <div
            key={item}
            ref={(el) => {
              imageCardRefs.current[index] = el;
            }}
            className={`skill-img-card skill-img-card-${item}`}
          >
            <Image
              src={`/images/skill-items/skill-item-${item}.png`}
              alt={`skill skill image ${item}`}
              width={250}
              height={250}
            />
          </div>
        ))}
      </div>

      <div className="skill-titles" ref={skillTitlesRef}>
        <div className="skill-title-wrapper">
          <h1 className="skill-title text-6xl">Skill Playground</h1>
        </div>
        <div className="skill-title-wrapper text-4xl">
          <h2 className="skill-title">
            Front-End Skills: React, TypeScript, Next.js, GSAP, Tailwind CSS,
            HTML, CSS.
          </h2>
        </div>
        <div className="skill-title-wrapper text-4xl">
          <h2 className="skill-title">
            Back-End Skills: Node.js, Express, REST APIs, and databases.
          </h2>
        </div>
        <div className="skill-title-wrapper text-4xl">
          <h2 className="skill-title">
            DevOps & Tools: Docker, Git and GitHub, CI/CD pipelines.
          </h2>
        </div>
      </div>
    </section>
  );
}
