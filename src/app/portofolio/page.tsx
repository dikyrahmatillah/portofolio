"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import OptimizedShuffleText from "@/components/optimizedShuffleText/OptimizedShuffleText";
import OptimizedSlideRevealText from "@/components/optimizedSlideRevealText/OptimizedSlideRevealText";
import ImageCarousel from "@/components/ImageCarousel";
import { portfolioData } from "@/data/data";

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
  const imgContainerRef = useRef<HTMLDivElement | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  const images = portfolioData.mainProject.imgSrc;

  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
    };

    const setupScrollTrigger = () => {
      if (window.innerWidth < 768) return;

      const container = imgContainerRef.current;
      if (!container) {
        setTimeout(setupScrollTrigger, 100);
        return;
      }

      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }

      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === container) {
          st.kill();
        }
      });

      const rect = container.getBoundingClientRect();
      if (rect.height === 0) {
        setTimeout(setupScrollTrigger, 100);
        return;
      }

      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: `+=${window.innerHeight * 3}`,
        pin: true,
        pinSpacing: false,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        refreshPriority: 0,
      });
    };

    // Setup with a slight delay to ensure DOM is ready
    const timer = setTimeout(setupScrollTrigger, 200);

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);

      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
    };
  }, []);

  return (
    <div id="portofolio">
      <article className="relative mt-[-0.5px] w-full h-full p-4 md:p-16 flex flex-col">
        <header className="w-full flex flex-col gap-8">
          <div className="flex flex-col gap-8">
            <div className="flex-1">
              <p
                className="font-semibold text-base md:text-lg"
                role="doc-subtitle"
              >
                [Look How I Did It]
              </p>
            </div>
            <div className="flex flex-col-reverse gap-4 md:gap-8">
              <OptimizedShuffleText
                className="font-bold uppercase text-4xl md:text-7xl leading-none"
                as="h2"
                text={portfolioData.mainProject.title}
                triggerOnScroll={true}
                duration={1.2}
              />
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col-reverse gap-4 md:gap-8">
              <div className="flex-1">
                <div className="w-full md:w-[70%]">
                  <p className="text-base md:text-lg">
                    {portfolioData.mainProject.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>
      </article>
      <section
        className="relative w-full h-full flex flex-col md:flex-row px-4 md:px-16 mt-[-0.5px]"
        aria-label="Project development process"
      >
        <div
          className="w-full md:flex-1 relative z-10 flex flex-col justify-center"
          role="region"
          aria-label="Project steps"
        >
          {portfolioData.projectSteps.map((step, i) => (
            <div
              key={i}
              className="w-full h-auto md:h-screen flex items-center py-8 md:py-0"
            >
              <div className="flex flex-col justify-center h-full">
                <OptimizedSlideRevealText
                  duration={1.2}
                  delay={0.1}
                  direction="y"
                  distance={30}
                >
                  <h3 className="font-normal text-2xl md:text-[2.5rem] lg:text-[4rem] mb-2">
                    {step.title}
                  </h3>
                </OptimizedSlideRevealText>
                <OptimizedSlideRevealText
                  duration={1}
                  delay={0.2}
                  direction="y"
                  distance={20}
                >
                  <p className="mb-2 text-base md:text-lg">
                    {step.description}
                  </p>
                </OptimizedSlideRevealText>
              </div>
            </div>
          ))}
        </div>
        <div className="relative w-full md:w-2/5 h-64 md:h-screen ml-0 md:ml-8 mt-8 md:mt-0">
          <ImageCarousel images={images} containerRef={imgContainerRef} />
        </div>
      </section>
    </div>
  );
}
