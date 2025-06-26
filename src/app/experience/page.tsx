"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import "./experience.css";
import { experienceData } from "@/data/data";
import ShuffleText from "@/components/shuffleText/ShuffleText";

export default function Experience() {
  const scrollTriggerInstances = useRef<(ScrollTrigger | undefined)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const initAnimations = () => {
      if (window.innerWidth <= 1000) {
        scrollTriggerInstances.current.forEach((instance) => {
          if (instance) instance.kill();
        });
        scrollTriggerInstances.current = [];
        return;
      }

      scrollTriggerInstances.current.forEach((instance) => {
        if (instance) instance.kill();
      });
      scrollTriggerInstances.current = [];

      const services = gsap.utils.toArray(".service-card") as HTMLElement[];

      const mainTrigger = ScrollTrigger.create({
        trigger: services[0],
        start: "top 70%",
        endTrigger: services[services.length],
        end: "top 150%",
      });
      scrollTriggerInstances.current.push(mainTrigger);

      services.forEach((service, index) => {
        const isLastServiceCard = index === services.length - 1;
        const serviceCardInner = service.querySelector(".service-card-inner");
        console.log(serviceCardInner);

        if (!isLastServiceCard && serviceCardInner) {
          const pinTrigger = ScrollTrigger.create({
            trigger: service,
            start: "top 45%",
            endTrigger: ".contact-cta",
            end: "top 90%",
            pin: true,
            pinSpacing: false,
          });
          scrollTriggerInstances.current.push(pinTrigger);

          const scrollAnimation = gsap.to(serviceCardInner, {
            y: `-${(services.length - index) * 14}vh`,
            ease: "none",
            scrollTrigger: {
              trigger: service,
              start: "top 45%",
              endTrigger: ".contact-cta",
              end: "top 90%",
              scrub: true,
            },
          });
          scrollTriggerInstances.current.push(scrollAnimation.scrollTrigger);
        }
      });
    };

    const timer = setTimeout(() => {
      initAnimations();
    }, 100);

    const handleResize = () => {
      initAnimations();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
      scrollTriggerInstances.current.forEach((instance) => {
        if (instance) instance.kill();
      });
      scrollTriggerInstances.current = [];
    };
  }, []);
  return (
    <>
      <section className="services-header">
        <div className="services-header-content">
          <div className="services-header-title"></div>
          <div className="services-header-arrow-icon">
            <ShuffleText
              as="h2"
              text="Experience"
              className="text-9xl"
              triggerOnScroll={true}
            />
            <h2>&#8595;</h2>
          </div>
        </div>
      </section>
      <section className="services">
        {experienceData.map((experience, index) => (
          <div
            key={experience.id}
            className="service-card"
            id={`service-card-${index + 1}`}
          >
            <div className="service-card-inner">
              <h1>{experience.title}</h1>
              <p>{experience.company}</p>
              <ul>
                {experience.achievements.map(
                  (achievement, achievementIndex) => (
                    <li key={achievementIndex}>{achievement}</li>
                  )
                )}
              </ul>
              <div className="service-card-img">
                <Image
                  src={experience.image}
                  alt="Experience Design"
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
