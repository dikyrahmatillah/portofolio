"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

      if (services.length === 0) return; // Exit if no service cards found

      const mainTrigger = ScrollTrigger.create({
        trigger: services[0],
        start: "top 50%",
        endTrigger: services[services.length - 1],
        end: "top 150%",
      });
      scrollTriggerInstances.current.push(mainTrigger);

      services.forEach((service, index) => {
        const isLastServiceCard = index === services.length - 1;
        const serviceCardInner = service.querySelector(".service-card-inner");

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
      {/* <section className="services-header">
        <div className="services-header-content">
          <div className="services-profile-icon">
            <img
              src="/images/services-header/portrait.jpeg"
              alt="Otis Valen Portrait"
            />
          </div>
          <p>Your ideas. My toolbox.</p>
          <div className="services-header-title">
            <h1>Pixel wizardry</h1>
            <h1>served fresh</h1>
          </div>
          <div className="services-header-arrow-icon">
            <h1>&#8595;</h1>
          </div>
        </div>
      </section> */}
      <section className="services">
        <div className="service-card" id="service-card-1">
          <div className="service-card-inner">
            <div className="service-card-content">
              <h1>Frontend Developer</h1>
            </div>
            <p>SmartEdu Systems | Remote | Jul 2015 – Jul 2018</p>
            <ul>
              <li>
                Developed and maintained responsive web applications, improving
                user engagement by 30%.
              </li>
              <li>
                Collaborated with UX/UI designers to implement modern design
                principles, enhancing user experience.
              </li>
              <li>
                Optimized web applications for maximum speed and scalability,
                resulting in a 20% reduction in load times.
              </li>
            </ul>
            <div className="service-card-img">
              <img
                src="/images/services/service-1.jpg"
                alt="Experience Design"
              />
            </div>
          </div>
        </div>
        <div className="service-card" id="service-card-2">
          <div className="service-card-inner">
            <div className="service-card-content">
              <h1>Junior Web Developer</h1>
            </div>
            <p>Global MedTech Inc. | Chicago, IL | Aug 2018 – Dec 2020</p>
            <ul>
              <li>
                Collaborated on a team to develop a web application for medical
                device management, enhancing operational efficiency by 25%.
              </li>
              <li>
                Implemented responsive design principles, ensuring accessibility
                across devices and platforms.
              </li>
              <li>
                Assisted in migrating legacy systems to modern web technologies,
                reducing maintenance costs by 40%.
              </li>
            </ul>
            <div className="service-card-img">
              <img
                src="/images/services/service-2.jpg"
                alt="Experience Design"
              />
            </div>
          </div>
        </div>
        <div className="service-card" id="service-card-3">
          <div className="service-card-inner">
            <div className="service-card-content">
              <h1>Mobile App Developer (Freelance Contract)</h1>
            </div>
            <p>LocalStart Gym App | Remote | Mar 2020 – Oct 2020</p>
            <ul>
              <li>
                Developed a cross-platform fitness app using React Native and
                Firebase, with over 10,000 downloads in the first six months.
              </li>
              <li>
                Integrated features such as class schedules, membership
                management, and workout tracking.
              </li>
              <li>
                Collaborated with the client to ensure the app met user needs
                and business goals.
              </li>
            </ul>
            <div className="service-card-img">
              <img
                src="/images/services/service-3.jpg"
                alt="Experience Design"
              />
            </div>
          </div>
        </div>
        <div className="service-card" id="service-card-4">
          <div className="service-card-inner">
            <div className="service-card-content">
              <h1>Student</h1>
            </div>
            <p>Purwadhika | On Campus | May 2025 - August 2025</p>
            <ul>
              <li>
                Engaged in a comprehensive curriculum covering advanced web
                development, including React, next.js, and database management.
              </li>
              <li>
                Completed hands-on projects that simulated real-world scenarios,
                enhancing practical skills.
              </li>
              <li>
                Collaborated with peers on group projects, fostering teamwork
                and communication skills.
              </li>
            </ul>
            <div className="service-card-img">
              <img
                src="/images/services/service-4.jpg"
                alt="Experience Design"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="contact-cta">
        <div className="contact-button">
          <a href="/contact"></a>
          <div className="contact-text-small">
            <p>Collabs, or cosmic brainstorms welcome</p>
          </div>
          <div className="contact-text-large">
            <h1>Hit Me Up</h1>
          </div>
        </div>
      </section>
    </>
  );
}
