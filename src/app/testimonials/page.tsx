"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { testimonials } from "@/data/data";
import OptimizedShuffleText from "@/components/optimizedShuffleText/OptimizedShuffleText";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const container = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const projects = projectRefs.current;

    gsap.set(projects, {
      clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
    });
    gsap.set(projects[0], {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    });

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: container.current,
      start: "top top",
      end: `+=${window.innerHeight * (projects.length - 1)}`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      refreshPriority: -1,
      onRefresh: () => {
        gsap.set(projects[0], {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        });
      },
      onUpdate: (self) => {
        const progress = self.progress * (projects.length - 1);
        const currentSlide = Math.floor(progress);
        const slideProgress = progress - currentSlide;

        if (currentSlide < projects.length - 1) {
          gsap.set(projects[currentSlide], {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          });
          const nextSlideProgress = gsap.utils.interpolate(
            "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            slideProgress
          );

          gsap.set(projects[currentSlide + 1], {
            clipPath: nextSlideProgress,
          });
        }

        projects.forEach((item, index) => {
          if (index < currentSlide) {
            gsap.set(item, {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            });
          } else if (index > currentSlide + 1) {
            gsap.set(item, {
              clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            });
          }
        });
      },
    });

    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <div id="testimonials">
        <section className="relative w-screen bg-[var(--background-light)]">
          <div className="w-full h-[200px] bg-[var(--background)] mb-[5px]" />
          <div className="w-full h-[15px] bg-[var(--background)] mb-[10px]" />
          <div className="w-full h-[15px] bg-[var(--background)] mb-[20px]" />
          <div className="w-full h-[15px] bg-[var(--background)] mb-[30px]" />
          <div className="w-full h-[15px] bg-[var(--background)] mb-[50px]" />
          <div className="w-full h-[15px] bg-[var(--background)] mb-[80px]" />
          <div className="w-full h-[15px] bg-[var(--background)] " />
        </section>
        <section className="relative w-screen bg-[var(--background-light)]">
          <div className="grid grid-rows-1 place-content-center text-center text-white py-7 text-4xl md:text-7xl font-bold">
            <OptimizedShuffleText
              as="h2"
              text="What People Say"
              triggerOnScroll={true}
            />
          </div>
        </section>
        <section
          className="relative w-screen h-screen overflow-hidden"
          ref={container}
        >
          {testimonials.map((item, index) => (
            <div
              key={item.client}
              ref={(el) => {
                projectRefs.current[index] = el;
              }}
              className="absolute top-0 left-0 w-screen h-screen"
              style={{
                clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
              }}
            >
              <div className="absolute inset-0">
                <Image
                  src={item.image}
                  alt={item.altImage}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
              <div className="absolute inset-0 bg-black/60" />
              <div className="absolute aspect-square rounded-lg overflow-hidden -translate-x-1/2 -translate-y-1/2 w-32 top-[35%] left-1/2 sm:w-40 md:w-1/4 md:top-1/2 md:left-[35%]">
                <Image
                  src={item.profile}
                  alt={`${item.client}'s portrait`}
                  width={1024}
                  height={1024}
                />
              </div>
              <div className="absolute flex flex-col gap-4 text-white text-shadow w-full top-[55%] left-0 -translate-y-1/2 px-4 sm:px-6 md:top-1/2 md:w-[35%] md:left-2/4 text-center md:text-left">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold">
                  {item.client}
                </h2>
                <div className="text-base sm:text-lg md:text-2xl">
                  {item.reviews}
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}
