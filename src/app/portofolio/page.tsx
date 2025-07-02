"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ShuffleText from "@/components/shuffleText/ShuffleText";
import Image from "next/image";
import { portfolioData } from "@/data/data";
import SlideRevealText from "@/components/slideRevealText/slideRevealText";
// import "./portofolio.css";

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
  const imgContainerRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const scaleTriggerRef = useRef<ScrollTrigger | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const container = imgContainerRef.current;
    const imgElement = imgRef.current;

    scaleTriggerRef.current = ScrollTrigger.create({
      trigger: container,
      start: "top bottom",
      end: "top top",
      onUpdate: (self) => {
        gsap.to(imgElement, {
          scale: 2 - self.progress,
          duration: 0.1,
          ease: "none",
        });
      },
    });

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: `+=${window.innerHeight * 3}`,
      pin: true,
      pinSpacing: false,
      invalidateOnRefresh: true,
    });

    return () => {
      if (scaleTriggerRef.current) {
        scaleTriggerRef.current.kill();
        scaleTriggerRef.current = null;
      }
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
    };
  }, []);

  return (
    <main>
      <section className="relative mt-[-0.5px] w-full h-full p-4 md:p-16 flex flex-col">
        <div className="w-full flex flex-col gap-8">
          <div className="flex flex-col gap-8">
            <div className="flex-1">
              <p className="font-semibold text-base md:text-lg">
                [Look What I Did]
              </p>
            </div>
            <div className="flex flex-col-reverse gap-4 md:gap-8">
              <ShuffleText
                className="font-bold uppercase text-4xl md:text-7xl leading-none"
                as="h2"
                text={portfolioData.mainProject.title}
                triggerOnScroll={true}
              />
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col-reverse gap-4 md:gap-8">
              <div className="flex-1">
                <div className="w-full md:w-[70%]">
                  <p className="text-base md:text-lg">
                    {portfolioData.mainProject.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="relative w-full h-full flex flex-col md:flex-row px-4 md:px-16 mt-[-0.5px]">
        <div className="w-full md:flex-1 relative z-10 flex flex-col justify-center">
          {portfolioData.projectSteps.map((step, i) => (
            <div
              key={i}
              className="w-full h-auto md:h-screen flex items-center py-8 md:py-0"
            >
              <div className="flex flex-col justify-center h-full">
                <SlideRevealText>
                  <h3 className="font-normal text-2xl md:text-[2.5rem] lg:text-[4rem] mb-2">
                    {step.title}
                  </h3>
                </SlideRevealText>
                <SlideRevealText duration={0.05} delay={0.01}>
                  <p className="mb-2 text-base md:text-lg">
                    {step.description}
                  </p>
                </SlideRevealText>
              </div>
            </div>
          ))}
        </div>
        <div className="relative w-full md:w-2/5 h-64 md:h-screen ml-0 md:ml-8 mt-8 md:mt-0">
          <div
            className="relative w-full h-full rounded-xl overflow-hidden"
            ref={imgContainerRef}
          >
            <Image
              ref={imgRef}
              src={portfolioData.mainProject.imgSrc}
              alt={portfolioData.mainProject.imgAlt}
              width={1200}
              height={800}
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
