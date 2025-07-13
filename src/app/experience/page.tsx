"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { experienceData } from "@/data/experience";
import SlideRevealText from "@/components/animations/slideRevealText/SlideRevealText";

export default function Experience() {
  const experienceCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const experienceCardInnerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollTriggerRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    scrollTriggerRef.current.forEach((trigger) => trigger.kill());
    scrollTriggerRef.current = [];

    experienceCardRefs.current.forEach((experienceEl, index) => {
      const isLast = index === experienceCardRefs.current.length - 1;
      const experienceCardInner = experienceCardInnerRefs.current[index];
      if (!isLast && experienceCardInner) {
        const isMobile = window.innerWidth < 768;
        const pinStart = isMobile ? "top 30%" : "top 25%";

        const pinTrigger = ScrollTrigger.create({
          trigger: experienceEl,
          start: pinStart,
          endTrigger: "#contact",
          pin: true,
          pinSpacing: false,
        });
        scrollTriggerRef.current.push(pinTrigger);

        const yTween = gsap.to(experienceCardInner, {
          y: `-${(experienceCardRefs.current.length - index) * 14}vh`,
          ease: "none",
          scrollTrigger: {
            trigger: experienceEl,
            start: pinStart,
            endTrigger: "#contact",
            scrub: true,
          },
        });

        if (yTween.scrollTrigger) {
          scrollTriggerRef.current.push(yTween.scrollTrigger);
        }
      }
    });

    return () => {
      scrollTriggerRef.current.forEach((trigger) => trigger.kill());
      scrollTriggerRef.current = [];
    };
  }, []);

  return (
    <>
      <div id="experience">
        <section className="w-full flex justify-center items-center text-center py-8 px-4">
          <div className="flex flex-col justify-center items-center gap-4 w-full">
            <div className="mb-24" />
            <div>
              <SlideRevealText>
                <h2 className="text-4xl md:text-7xl font-bold">
                  Been There Done That
                </h2>
              </SlideRevealText>
              <span className="block text-3xl mt-4">&#8595;</span>
            </div>
          </div>
        </section>
        <section>
          {experienceData.map((experience, index) => (
            <div
              key={experience.id}
              ref={(el) => {
                experienceCardRefs.current[index] = el;
              }}
              className="relative min-h-[200px]"
              id={`experience-card-${index + 1}`}
            >
              <div
                className={`relative will-change-transform w-[95%] md:w-[calc(100vw-4em)] h-auto md:h-1/2 mx-auto p-4 md:p-8 flex flex-col md:flex-row justify-between gap-6 md:gap-16 rounded-2xl min-h-[300px] ${experience.bgClass}`}
                ref={(el) => {
                  experienceCardInnerRefs.current[index] = el;
                }}
              >
                <div className="flex-1 flex flex-col justify-center space-y-2 md:space-y-4">
                  <h2 className="text-xl md:text-2xl font-semibold">
                    {experience.title}
                  </h2>
                  <p className="text-base md:text-lg font-medium">
                    {experience.company}
                  </p>
                  <ul className="list-disc list-inside space-y-1 md:space-y-2 pl-4">
                    {experience.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl overflow-hidden flex-shrink-0 mt-4 md:mt-0 flex items-center justify-center">
                  <Image
                    src={experience.image}
                    alt={experience.altImage}
                    width={experience.width}
                    height={experience.height}
                    className="md:w-[250px] md:h-[250px] w-[140px] h-[140px] object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}
