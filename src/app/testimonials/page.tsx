"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { carouselItems } from "@/data/data";
import "./testimonials.css";
import ShuffleText from "@/components/shuffleText/ShuffleText";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const projects = gsap.utils.toArray<HTMLElement>(".project");

    gsap.set(projects, {
      clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
    });
    gsap.set(projects[0], {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    });

    const scrollTrigger = ScrollTrigger.create({
      trigger: ".carousel",
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

        projects.forEach((project, index) => {
          if (index < currentSlide) {
            gsap.set(project, {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            });
          } else if (index > currentSlide + 1) {
            gsap.set(project, {
              clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            });
          }
        });
      },
    });

    return () => {
      scrollTrigger.kill();
    };
  }, []);
  return (
    <>
      <section className="abstract-bg">
        <div className="strip"></div>
        <div className="strip"></div>
        <div className="strip"></div>
        <div className="strip"></div>
        <div className="strip"></div>
        <div className="strip"></div>
        <div className="strip"></div>
        <div className="strip"></div>
      </section>
      <section className="abstract-bg">
        <div className="testimonial grid grid-rows-1 place-content-center text-center text-white pt-6">
          <ShuffleText as="h2" text="What People Say" triggerOnScroll={true} />
        </div>
      </section>
      <section className="carousel" ref={container}>
        {carouselItems.map((item) => (
          <div className="project" id={`project-${item.id}`} key={item.id}>
            <div className="project-bg">
              <Image src={item.bg} alt={item.title} fill />
            </div>
            <div className="project-main">
              <Image src={item.main} alt={`${item.title}'s portrait`} fill />
            </div>
            <div className="project-header">
              <h2 className="text-2xl">{item.title}</h2>
              <div className="review-text text-3xl">"{item.review}"</div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
