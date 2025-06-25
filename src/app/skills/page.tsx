"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./skills.css";

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const scrollTriggerInstance = useRef<ScrollTrigger | null>(null);
  const featuredTitlesRef = useRef<HTMLDivElement>(null);
  const featuredImagesRef = useRef<HTMLDivElement>(null);
  const indicatorRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [windowWidth, setWindowWidth] = useState(0);

  const featuredCardPosSmall = useMemo(
    () => [
      { y: 100, x: 1000 },
      { y: 1500, x: 100 },
      { y: 1250, x: 1950 },
      { y: 1500, x: 850 },
      { y: 200, x: 2100 },
      { y: 250, x: 600 },
      { y: 1100, x: 1650 },
      { y: 1000, x: 800 },
      { y: 900, x: 2200 },
      { y: 150, x: 1600 },
    ],
    []
  );

  const featuredCardPosLarge = useMemo(
    () => [
      { y: 800, x: 5000 },
      { y: 2000, x: 3000 },
      { y: 240, x: 4450 },
      { y: 1200, x: 3450 },
      { y: 500, x: 2200 },
      { y: 750, x: 1100 },
      { y: 1850, x: 3350 },
      { y: 2200, x: 1300 },
      { y: 3000, x: 1950 },
      { y: 500, x: 4500 },
    ],
    []
  );

  const featuredCardPos = useMemo(
    () => (windowWidth >= 1600 ? featuredCardPosLarge : featuredCardPosSmall),
    [windowWidth, featuredCardPosLarge, featuredCardPosSmall]
  );

  const indicators = useMemo(() => {
    const indicatorArray = [];
    for (let section = 1; section <= 5; section++) {
      indicatorArray.push({ type: "number", value: `0${section}` });
      for (let i = 0; i < 10; i++) {
        indicatorArray.push({ type: "indicator", value: `${section}-${i}` });
      }
    }
    return indicatorArray;
  }, []);

  const workItems = useMemo(
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

      const moveDistance = windowWidth * 4;

      imageCardRefs.current.forEach((card, index) => {
        if (card) {
          const position = featuredCardPos[index];
          gsap.set(card, {
            x: position.x,
            y: position.y,
            z: -1500,
            scale: 0,
          });
        }
      });

      scrollTriggerInstance.current = ScrollTrigger.create({
        trigger: ".featured-work",
        start: "top top",
        end: `+=${windowWidth * 5}px`,
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const xPosition = -moveDistance * self.progress;

          if (featuredTitlesRef.current) {
            gsap.set(featuredTitlesRef.current, {
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

          const totalIndicators = indicatorRefs.current.filter(Boolean).length;
          const progressPerIndicator = 1 / totalIndicators;

          indicatorRefs.current.forEach((indicator, index) => {
            if (indicator) {
              const indicatorStart = index * progressPerIndicator;
              const indicatorOpacity = self.progress > indicatorStart ? 1 : 0.2;

              gsap.to(indicator, {
                opacity: indicatorOpacity,
                duration: 0.3,
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
  }, [windowWidth, featuredCardPos]);
  return (
    <section className="featured-work">
      <div className="featured-images" ref={featuredImagesRef}>
        {workItems.map((item, index) => (
          <div
            key={item}
            ref={(el) => {
              imageCardRefs.current[index] = el;
            }}
            className={`featured-img-card featured-img-card-${item}`}
          >
            <img
              src={`/images/work-items/work-item-${item}.jpg`}
              alt={`featured work image ${item}`}
            />
          </div>
        ))}
      </div>

      <div className="featured-titles" ref={featuredTitlesRef}>
        <div className="featured-title-wrapper">
          <h1 className="featured-title">Work Playground</h1>
        </div>
        <div className="featured-title-wrapper">
          <h1 className="featured-title">
            Front-End Skills: Technologies like HTML, CSS, JavaScript, React,
            Angular, etc.
          </h1>
        </div>
        <div className="featured-title-wrapper">
          <div className="featured-title-img">
            <img src="/images/work-items/work-item-1.jpg" alt="" />
          </div>
          <h1 className="featured-title">
            Back-End Skills: Frameworks and languages like Node.js, Express,
            Django, or Ruby on Rails.
          </h1>
        </div>
        <div className="featured-title-wrapper">
          <div className="featured-title-img">
            <img src="/images/work-items/work-item-2.jpg" alt="" />
          </div>
          <h1 className="featured-title">
            DevOps & Tools: Tools used in development, such as Docker, Git,
            Jenkins, AWS, or CI/CD solutions.
          </h1>
        </div>
      </div>

      <div className="featured-work-indicator">
        {indicators.map((indicator, index) =>
          indicator.type === "number" ? (
            <p
              key={indicator.value}
              ref={(el) => {
                indicatorRefs.current[index] = el;
              }}
              className="mn"
            >
              {indicator.value}
            </p>
          ) : (
            <div
              key={indicator.value}
              ref={(el) => {
                indicatorRefs.current[index] = el;
              }}
              className="indicator"
            />
          )
        )}
      </div>
    </section>
  );
}
