"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Welcome from "../welcome/page";
import { GiDeadHead } from "react-icons/gi";
import LiveClock from "@/components/LiveClock";
import Spline from "@splinetool/react-spline";
import { useEffect } from "react";

export default function Hero() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const finishAboutHeaderClipReveal = window.innerHeight;
    const introSectionPinnedHeight = window.innerHeight * 1;
    const heroSectionPinnedHeight = window.innerHeight * 4;
    const aboutSectionPinnedHeight = window.innerHeight * 1;
    // Disable scrolling initially until hero animation completes
    document.body.style.overflow = "hidden";

    // reveal about section inside hero
    ScrollTrigger.create({
      trigger: "#hero",
      start: "1% top",
      end: `+=${finishAboutHeaderClipReveal}`,
      scrub: 1,
      onUpdate: (self) => {
        const startTop = gsap.utils.interpolate(50, 0, self.progress);
        const endBottom = gsap.utils.interpolate(50, 100, self.progress);

        const clipPath = `polygon(0% ${startTop}%, 100% ${startTop}%, 100% ${endBottom}%, 0% ${endBottom}%)`;
        gsap.set(".about-header", {
          clipPath: clipPath,
        });

        // Enable scrolling when reveal animation is complete
        if (self.progress >= 1) {
          document.body.style.overflow = "auto";
        }
      },
    });
    // about header fades in
    ScrollTrigger.create({
      trigger: "#hero",
      start: "top top",
      end: `+=${finishAboutHeaderClipReveal}`,
      scrub: 0.5,
      onUpdate: (self) => {
        const scale = gsap.utils.interpolate(0.75, 1, self.progress);
        const opacity = gsap.utils.interpolate(0.25, 0.5, self.progress);

        gsap.set(".about-header h1", {
          scale: scale,
          opacity: opacity,
        });
      },
    }); // about header fades out partially
    ScrollTrigger.create({
      trigger: "#hero",
      start: "bottom top",
      end: `+=${finishAboutHeaderClipReveal}`,
      scrub: 0.3,
      onUpdate: (self) => {
        const opacity = gsap.utils.interpolate(0.45, 0.1, self.progress);

        gsap.set(".about-header h1", {
          opacity: opacity,
        });
      },
    });

    // Pin section
    ScrollTrigger.create({
      trigger: "#hero",
      start: "top top",
      end: `+=${heroSectionPinnedHeight}`,
      pin: true,
      pinSpacing: false,
    });

    ScrollTrigger.create({
      trigger: "#intro",
      start: "top bottom",
      end: `+=${introSectionPinnedHeight}`,
      pin: true,
      pinSpacing: true,
    });

    ScrollTrigger.create({
      trigger: "#intro",
      start: "top bottom",
      end: `+=${introSectionPinnedHeight}`,
      scrub: 1,
      onUpdate: (self) => {
        const topPosition = gsap.utils.interpolate(100, 0, self.progress);

        gsap.set(".portrait", {
          yPercent: `${topPosition}`,
        });
      },
    }); // Move about-header to the top when about section starts
    // Portrait animations
    ScrollTrigger.create({
      trigger: "#intro",
      start: "top center",
      end: "bottom center",
      scrub: 1,
      onUpdate: (self) => {
        const topPosition = gsap.utils.interpolate(40, 30, self.progress);

        gsap.set(".profile", {
          yPercent: `${topPosition}`,
        });
      },
    });

    return () => {
      document.body.style.overflow = "auto";
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <section id="hero">
        <div className="spline-container h-screen w-screen flex justify-center items-center">
          <Spline scene="https://prod.spline.design/BNaurVSeS57NeyWI/scene.splinecode" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white">
          <h1>Artistry & Engineering</h1>
          <p>By Diky</p>
        </div>
        <div className="absolute top-8 left-10 -translate-x-1/2 -translate-y-1/2 text-center text-white">
          <GiDeadHead className="text-4xl" />
        </div>{" "}
        <div className="absolute top-8 right-10 -translate-x-1/2 -translate-y-1/2 text-center text-white">
          <LiveClock />
        </div>
        <div className="about-header">
          {/* <img src="/Bakehane.webp" alt="Profile" width="100%" /> */}
          <h1 className="text-[25rem] text-white">Hello!</h1>
        </div>
      </section>{" "}
      <section id="intro" className="h-screen relative">
        <div className="portrait">
          <img src="https://picsum.photos/700/800" alt="Portrait" />
        </div>
        <div className="profile text-white">
          <h2> I'm Diky Rahmatillah and I'am a foolish programmer</h2>
          <p>
            {" "}
            I'm based in Bandung, Indonesia, and I'm passionate about Art,
            Software Engineering, Anime, and Gaming. I'm an aspiring software
            intern with coding passion, problem-solving skills, and eagerness to
            contribute.
          </p>
          <a href="#">Contact Me</a>
        </div>
      </section>
    </>
  );
}
