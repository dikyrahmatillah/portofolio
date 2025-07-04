"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef } from "react";
import SlideRevealText from "@/components/SlideRevealText/slideRevealText";

export default function Hero() {
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const welcomeRef = useRef<HTMLDivElement | null>(null);
  const welcomeH3Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const finishAboutHeaderClipReveal = window.innerHeight;
    const heroSectionPinnedHeight = window.innerHeight * 5;

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: heroSectionRef.current,
      start: "1% top",
      end: `+=${finishAboutHeaderClipReveal}`,
      scrub: 1,
      onUpdate: (self) => {
        const startTop = gsap.utils.interpolate(50, 0, self.progress);
        const endBottom = gsap.utils.interpolate(50, 100, self.progress);

        const clipPath = `polygon(0% ${startTop}%, 100% ${startTop}%, 100% ${endBottom}%, 0% ${endBottom}%)`;
        gsap.set(welcomeRef.current, {
          clipPath: clipPath,
        });
      },
    });

    ScrollTrigger.create({
      trigger: heroSectionRef.current,
      start: "bottom top",
      end: `+=${finishAboutHeaderClipReveal}`,
      scrub: 0.25,
      onUpdate: (self) => {
        const opacity = gsap.utils.interpolate(0.3, 0.1, self.progress);

        gsap.set(welcomeH3Ref.current, {
          opacity: opacity,
        });
      },
    });

    ScrollTrigger.create({
      trigger: heroSectionRef.current,
      start: "top top",
      end: `+=${heroSectionPinnedHeight}`,
      pin: true,
      pinSpacing: false,
    });

    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <div id="hero">
        <section
          ref={heroSectionRef}
          className="relative overflow-x-hidden"
          role="banner"
          aria-label="Hero section introducing Diky Rahmatillah"
        >
          <div
            className="bg-[url('/diky-rahmatillah.jpg')] bg-cover bg-center h-screen w-screen opacity-70 will-change-transform"
            role="img"
            aria-label="Background image of Diky Rahmatillah"
          ></div>
          <header className="absolute top-7 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-xl sm:text-3xl font-semibold">
            <span aria-label="Developer name">Diky Rahmatillah</span>
          </header>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center px-2 sm:px-4 w-full max-w-6xl">
            <SlideRevealText duration={1.2}>
              <h1 className="text-3xl sm:text-6xl font-bold">
                An Independent Full-Stack Web Developer
              </h1>
            </SlideRevealText>
          </div>
          <div className="absolute bottom-4 left-4 w-auto px-2">
            <SlideRevealText duration={0.2} delay={0.01}>
              <p className="text-base sm:text-xl max-w-xs sm:max-w-md">
                I build, break, and rebuild with code, coffee, and curiosity.
                Passionate about software, art, anime & solving weird problems.
                I’m here to build weirdly cool stuff, break it, and fix it
                better.
              </p>
            </SlideRevealText>
            <div className="mt-2 text-sm sm:text-base">
              <p>[Scroll to explore]</p>
            </div>
          </div>
          <div
            ref={welcomeRef}
            className="absolute inset-0 w-screen h-screen flex justify-center items-center bg-black text-white"
            style={{
              clipPath: "polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)",
              willChange: "clip-path",
            }}
          >
            <h3
              ref={welcomeH3Ref}
              className="text-[5rem] sm:text-[10rem] md:text-[15rem] lg:text-[25rem] whitespace-nowrap opacity-30"
            >
              Hello!
            </h3>
          </div>
        </section>
      </div>
    </>
  );
}
