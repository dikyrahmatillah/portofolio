"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect } from "react";
import "./hero.css";

export default function Hero() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const finishAboutHeaderClipReveal = window.innerHeight;
    const heroSectionPinnedHeight = window.innerHeight * 3;
    document.body.style.overflow = "hidden";

    ScrollTrigger.create({
      trigger: "#hero",
      start: "1% top",
      end: `+=${finishAboutHeaderClipReveal}`,
      scrub: 1,
      onUpdate: (self) => {
        const startTop = gsap.utils.interpolate(50, 0, self.progress);
        const endBottom = gsap.utils.interpolate(50, 100, self.progress);

        const clipPath = `polygon(0% ${startTop}%, 100% ${startTop}%, 100% ${endBottom}%, 0% ${endBottom}%)`;
        gsap.set(".welcome", {
          clipPath: clipPath,
        });

        if (self.progress >= 1) {
          document.body.style.overflow = "auto";
        }
      },
    });

    ScrollTrigger.create({
      trigger: "#hero",
      start: "top top",
      end: `+=${finishAboutHeaderClipReveal}`,
      scrub: 0.5,
      onUpdate: (self) => {
        const scale = gsap.utils.interpolate(0.75, 1, self.progress);
        const opacity = gsap.utils.interpolate(0.25, 0.5, self.progress);

        gsap.set(".welcome h1", {
          scale: scale,
          opacity: opacity,
        });
      },
    });

    ScrollTrigger.create({
      trigger: "#hero",
      start: "bottom top",
      end: `+=${finishAboutHeaderClipReveal}`,
      scrub: 0.3,
      onUpdate: (self) => {
        const opacity = gsap.utils.interpolate(0.4, 0.1, self.progress);

        gsap.set(".welcome h1", {
          opacity: opacity,
        });
      },
    });

    ScrollTrigger.create({
      trigger: "#hero",
      start: "top top",
      end: `+=${heroSectionPinnedHeight}`,
      pin: true,
      pinSpacing: false,
    });
  });
  return (
    <>
      <section id="hero">
        {/* <div className="spline-container h-screen w-screen flex justify-center items-center text-white">
          <Spline scene="https://prod.spline.design/BNaurVSeS57NeyWI/scene.splinecode" />
        </div> */}
        <div className="bg-[url('/bg3.jpg')] bg-cover bg-center h-screen w-full opacity-70"></div>
        <div className="absolute top-6 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <span>Diky Rahmatillah</span>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <h1 className="text-6xl">An Independent Full-Stack Web Developer</h1>
        </div>
        <div className="absolute bottom-4 left-4 w-[30rem]">
          <p>
            I build, break, and rebuild with code, coffee, and curiosity.
            Passionate about software, art, anime & solving weird problems. I’m
            here to build weirdly cool stuff, break it, and fix it better.
          </p>
          <div className="flex justify-between mt-2">
            <p>[Scroll to explore]</p>
            <a href="#">Let's Console.log("Talk")</a>
          </div>
        </div>
        <div className="welcome">
          <h1 className="text-[25rem]">Hello!</h1>
        </div>
      </section>
      <section id="intro" className="relative h-screen">
        <div className="profile"></div>
        <div className="hero-contact"></div>
      </section>
    </>
  );
}
