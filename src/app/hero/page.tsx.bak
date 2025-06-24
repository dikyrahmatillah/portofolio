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
    const aboutSectionPinnedHeight = window.innerHeight * 1;
    const heroSectionPinnedHeight = window.innerHeight * 3;

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

    // Portrait animations
    ScrollTrigger.create({
      trigger: "#intro",
      start: "top center",
      end: "bottom center",
      scrub: 1,
      onUpdate: (self) => {
        const topPosition = gsap.utils.interpolate(40, 30, self.progress);

        gsap.set(".portrait", {
          yPercent: `${topPosition}`,
        });
      },
    });

    ScrollTrigger.create({
      trigger: "#intro",
      start: "top bottom",
      end: `+=${introSectionPinnedHeight}`,
      scrub: 1,
      onUpdate: (self) => {
        const topPosition = gsap.utils.interpolate(100, 0, self.progress);

        gsap.set(".profile", {
          yPercent: `${topPosition}`,
        });
      },
    }); // Move about-header to the top when about section starts

    // Pin about section in the center of viewport and keep it fixed    // Pin about section
    ScrollTrigger.create({
      trigger: "#about",
      start: "top top",
      end: `+=${aboutSectionPinnedHeight}`, // Increased to 4 screen heights for longer display
      pin: true,
      pinSpacing: false,
    });

    // Show about paragraphs one by one with longer display times
    const aboutParagraphs = document.querySelectorAll("#about p"); // Initially hide all paragraphs and center them
    gsap.set(aboutParagraphs, {
      opacity: 0,
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: 10,
    });

    // Show first paragraph - balanced display time
    ScrollTrigger.create({
      trigger: "#about",
      start: "top 100%",
      end: "center 90%",
      scrub: 1,
      onUpdate: (self) => {
        const opacity = gsap.utils.interpolate(0, 1, self.progress);
        gsap.set(aboutParagraphs[0], {
          opacity: opacity,
        });
      },
    });

    // Hide first paragraph
    ScrollTrigger.create({
      trigger: "#about",
      start: "center 90%",
      end: "center 85%",
      scrub: 1,
      onUpdate: (self) => {
        const opacity = gsap.utils.interpolate(1, 0, self.progress);
        gsap.set(aboutParagraphs[0], {
          opacity: opacity,
        });
      },
    });

    // Show second paragraph - balanced display time
    ScrollTrigger.create({
      trigger: "#about",
      start: "center 85%",
      end: "center 75%",
      scrub: 1,
      onUpdate: (self) => {
        const opacity = gsap.utils.interpolate(0, 1, self.progress);
        gsap.set(aboutParagraphs[1], {
          opacity: opacity,
        });
      },
    });

    // Hide second paragraph
    ScrollTrigger.create({
      trigger: "#about",
      start: "center 75%",
      end: "top  60%",
      scrub: 1,
      onUpdate: (self) => {
        const opacity = gsap.utils.interpolate(1, 0, self.progress);
        gsap.set(aboutParagraphs[1], {
          opacity: opacity,
        });
      },
    });

    // Show third paragraph - balanced display time
    ScrollTrigger.create({
      trigger: "#about",
      start: "center 60%",
      end: "center 50%",
      scrub: 1,
      onUpdate: (self) => {
        const opacity = gsap.utils.interpolate(0, 1, self.progress);
        gsap.set(aboutParagraphs[2], {
          opacity: opacity,
        });
      },
    });

    // Hide third paragraph
    ScrollTrigger.create({
      trigger: "#about",
      start: "center 50%",
      end: "bottom 45%",
      scrub: 1,
      onUpdate: (self) => {
        const opacity = gsap.utils.interpolate(1, 0, self.progress);
        gsap.set(aboutParagraphs[2], {
          opacity: opacity,
        });
      },
    });

    // Cleanup function
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
          <img src="https://picsum.photos/200/300" alt="Portrait" />
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
      </section>{" "}
      <section id="about" className="h-screen flex items-center justify-center">
        <div className="about-content text-white text-center max-w-4xl px-8">
          <p className="text-2xl">
            I have a background in computer science and a strong interest in web
            development, especially building interactive and visually engaging
            user interfaces. My experience includes working on several freelance
            and personal projects using React, TypeScript, and modern web
            technologies. I enjoy learning new frameworks and continuously
            improving my skills to deliver high-quality software solutions.
          </p>
          <p className="text-2xl">
            <strong>Main Skills:</strong> JavaScript, TypeScript, React,
            Next.js, Node.js, Python, GSAP, Tailwind CSS, HTML, CSS, Git, REST
            APIs.
          </p>
          <p className="text-2xl">
            <strong>Core Work Principles:</strong> Timeliness, attention to
            detail, and clear communication are at the heart of my workflow. I
            strive to deliver work on schedule, ensure every aspect meets high
            standards, and maintain open, effective communication throughout
            every project.
          </p>
        </div>
      </section>
    </>
  );
}
