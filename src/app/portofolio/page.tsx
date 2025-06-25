"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./portofolio.css";

export default function Portfolio() {
  gsap.registerPlugin(ScrollTrigger);
  useEffect(() => {
    const timer = setTimeout(() => {
      const scaleAnimation = ScrollTrigger.create({
        trigger: ".case-studies-img-1",
        start: "top bottom",
        end: "bottom bottom",
        onUpdate: (self) => {
          const element = document.querySelector(".case-studies-img-1");
          if (element) {
            gsap.to(".case-studies-img-1", {
              scale: 2 - self.progress,
              duration: 0.1,
              ease: "none",
            });
          }
        },
        markers: false,
      });

      const pinAnimation = ScrollTrigger.create({
        trigger: ".case-studies-img-1",
        start: "top top",
        end: `+=${window.innerHeight * 3}`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
      });

      return () => {
        scaleAnimation.kill();
        pinAnimation.kill();
      };
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === ".case-studies-img-1") {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <>
      <section className="case-studies" id="case-studies">
        <div className="case-studies-content">
          <div className="container">
            <div className="col">
              <div className="col">
                <p className="primary">[ Potofolio ]</p>
              </div>
              <div className="case-studies-copy">
                <h2>E-commerce Platform for XYZ Retailer</h2>
                <p>
                  This project involved developing a full-stack e-commerce
                  platform for XYZ Retail, a traditional retail business
                  transitioning to online sales. The goal was to create a
                  scalable, user-friendly web application that catered to both
                  desktop and mobile users, with features like secure checkout,
                  product reviews, and real-time inventory updates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="case-studies-items">
        <div className="case-studies-items-content col">
          <div className="case-studies-item case-studies-item-1">
            <div className="container">
              <h3>Situation:</h3>
              <p className="primary">[ Lumina Horizon — Zara Lee ]</p>
              <p>
                XYZ Retail, an established retail company, sought to expand into
                e-commerce to reach a wider audience and streamline its sales
                processes. They needed a scalable, user-friendly platform to
                support both desktop and mobile users with features like product
                browsing, user reviews, secure checkout, and real-time inventory
                updates.
              </p>
            </div>
          </div>

          <div className="case-studies-item case-studies-item-2">
            <div className="container">
              <h3>Task</h3>
              <p className="primary">[ Task ]</p>
              <p>
                I was responsible for building the front-end and back-end
                components of the platform, ensuring seamless integration with
                the client’s inventory and payment systems. The project goal was
                to create an efficient, high-performing application with a
                smooth user experience.
              </p>
            </div>
          </div>
          <div className="case-studies-item case-studies-item-2">
            <div className="container">
              <h3>Action</h3>
              <p className="primary">[ Action ]</p>
              <p>
                Using React for the front-end, I designed a responsive,
                intuitive UI focused on user engagement and easy navigation. On
                the back end, I developed RESTful APIs with Node.js and MongoDB
                for data management. Additionally, I integrated the platform
                with AWS to optimize loading times and set up a CI/CD pipeline
                for faster deployment and testing. I worked closely with
                designers and QA to address usability and accessibility
                standards.
              </p>
            </div>
          </div>
          <div className="case-studies-item case-studies-item-4">
            <div className="container">
              <h3>Result</h3>
              <p className="primary">[ Result ]</p>
              <p>
                The project was completed on time, leading to a 35% increase in
                online sales within the first three months. User feedback
                highlighted the site's speed and ease of use, and the client
                reported a substantial reduction in manual inventory management
                tasks.
              </p>
            </div>
          </div>
        </div>
        <div className="case-studies-items-images col">
          <div className="case-studies-img case-studies-img-1">
            <img src="/images/home/case-study-1.jpeg" alt="" />
            <div className="hero-img-overlay"></div>
          </div>
        </div>
      </section>
    </>
  );
}
