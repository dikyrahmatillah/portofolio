"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import "./experience.css";
import { experienceData } from "@/data/data";
import ShuffleText from "@/components/shuffleText/ShuffleText";

export default function Experience() {
  const experienceCardInnerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const experience = gsap.utils.toArray(".experience-card") as HTMLElement[];

    experience.forEach((experienceEl, index) => {
      const isLast = index === experience.length - 1;
      const experienceCardInner = experienceCardInnerRefs.current[index];
      if (!isLast && experienceCardInner) {
        ScrollTrigger.create({
          trigger: experienceEl,
          start: "top 45%",
          endTrigger: ".contact-cta",
          end: "top 90%",
          pin: true,
          pinSpacing: false,
        });
        gsap.to(experienceCardInner, {
          y: `-${(experience.length - index) * 14}vh`,
          ease: "none",
          scrollTrigger: {
            trigger: experienceEl,
            start: "top 45%",
            endTrigger: ".contact-cta",
            end: "top 90%",
            scrub: true,
          },
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((el) => el.kill());
    };
  }, []);
  return (
    <>
      <section className="experience-header">
        <div className="experience-header-content">
          <div className="experience-header-title"></div>
          <div className="experience-header-arrow-icon">
            <ShuffleText
              as="h2"
              text="Been There Done That"
              className="text-9xl"
              triggerOnScroll={true}
            />
            <h2>&#8595;</h2>
          </div>
        </div>
      </section>
      <section className="experience">
        {experienceData.map((experience, index) => (
          <div
            key={experience.id}
            className="experience-card"
            id={`experience-card-${index + 1}`}
          >
            <div
              className="experience-card-inner"
              ref={(el) => {
                experienceCardInnerRefs.current[index] = el;
              }}
            >
              <h1>{experience.title}</h1>
              <p>{experience.company}</p>
              <ul>
                {experience.achievements.map((achievement, i) => (
                  <li key={i}>{achievement}</li>
                ))}
              </ul>
              <div className="experience-card-img">
                <Image
                  src={experience.image}
                  alt={experience.title}
                  width={250}
                  height={250}
                />
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
