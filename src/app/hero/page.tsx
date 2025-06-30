"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect } from "react";
import "./hero.css";
import SlideRevealText from "@/components/slideRevealText/slideRevealText";
import Link from "next/link";

export default function Hero() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const finishAboutHeaderClipReveal = window.innerHeight;
    const heroSectionPinnedHeight = window.innerHeight * 5;
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

    // ScrollTrigger.create({
    //   trigger: "#hero",
    //   start: "top top",
    //   end: `+=${finishAboutHeaderClipReveal}`,
    //   scrub: 0.4,
    //   onUpdate: (self) => {
    //     const scale = gsap.utils.interpolate(0.75, 1, self.progress);
    //     const opacity = gsap.utils.interpolate(0.25, 0.4, self.progress);

    //     gsap.set(".welcome h1", {
    //       scale: scale,
    //       opacity: opacity,
    //     });
    //   },
    // });

    ScrollTrigger.create({
      trigger: "#hero",
      start: "bottom top",
      end: `+=${finishAboutHeaderClipReveal}`,
      scrub: 0.25,
      onUpdate: (self) => {
        const opacity = gsap.utils.interpolate(0.3, 0.1, self.progress);

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
      <section id="hero" className="overflow-x-hidden">
        <div className="bg-[url('/bg3.jpg')] bg-cover bg-center h-screen w-screen opacity-70"></div>
        <div className="absolute top-6 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <span>Diky Rahmatillah</span>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center px-4">
          <SlideRevealText duration={1.2}>
            <h1 className="text-6xl">
              An Independent Full-Stack Web Developer
            </h1>
          </SlideRevealText>
        </div>
        <div className="absolute bottom-4 left-4 w-[30rem]">
          <SlideRevealText duration={0.2} delay={0.01}>
            <p className="text-xl">
              I build, break, and rebuild with code, coffee, and curiosity.
              Passionate about software, art, anime & solving weird problems.
              I’m here to build weirdly cool stuff, break it, and fix it better.
            </p>
          </SlideRevealText>
          <div className="flex justify-between mt-2">
            <p>[Scroll to explore]</p>
            <Link href="#">Let's Console.log("Talk")</Link>
          </div>
        </div>
        <div className="welcome overflow-hidden flex items-center justify-center">
          <h1 className="text-[25rem] whitespace-nowrap opacity-30">Hello!</h1>
        </div>
      </section>
    </>
  );
}
