"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { carouselItems } from "@/components/data";
import "./testimonials.css";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Safety check for SSR
    if (typeof window === "undefined") return;
    const projects = gsap.utils.toArray<HTMLElement>(".project");
    if (projects.length === 0) return;
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
    <section className="carousel" ref={container}>
      {carouselItems.map((item) => (
        <div className="project" id={`project-${item.id}`} key={item.id}>
          <div className="project-bg">
            <img src={item.bg} alt="" />
          </div>
          <div className="project-main">
            <img src={item.main} alt={`${item.title}'s portrait`} />
          </div>
          <div className="project-header">
            <h2>{item.title}</h2>
            <div className="review-text">"{item.review}"</div>
          </div>
        </div>
      ))}
    </section>
  );
}
