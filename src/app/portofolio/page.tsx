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
    // Debounce resize events
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
        console.log("ScrollTrigger setup: Container not found, retrying...");
        setTimeout(setupScrollTrigger, 100);
        return;
      }

      // Kill existing scroll trigger if it exists
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        console.log("ScrollTrigger setup: Killed existing trigger");
      }

      // Make sure the container has proper dimensions before setting up ScrollTrigger
      const rect = container.getBoundingClientRect();
      if (rect.height === 0) {
        console.log(
          "ScrollTrigger setup: Container has no height, retrying..."
        );
        setTimeout(setupScrollTrigger, 100);
        return;
      }

      console.log(
        "ScrollTrigger setup: Creating new trigger for container:",
        container
      );
      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: `+=${window.innerHeight * 3}`,
        pin: true,
        pinSpacing: false,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          if (self.isActive) {
            container.style.willChange = "transform";
          }
        },
        onToggle: (self) => {
          console.log(
            "ScrollTrigger toggle:",
            self.isActive ? "active" : "inactive"
          );
        },
      });

      console.log("ScrollTrigger setup: Complete!", scrollTriggerRef.current);
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

  // Additional effect to ensure ScrollTrigger works after ImageCarousel is mounted
  useEffect(() => {
    const refreshScrollTrigger = () => {
      // Wait for ImageCarousel to be fully rendered
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    };

    // Refresh ScrollTrigger after component mount
    refreshScrollTrigger();
  }, []);

  return (
    <div>
      <section className="relative mt-[-0.5px] w-full h-full p-4 md:p-16 flex flex-col">
        <div className="w-full flex flex-col gap-8">
          <div className="flex flex-col gap-8">
            <div className="flex-1">
              <p className="font-semibold text-base md:text-lg">
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
        </div>
      </section>
      <section className="relative w-full h-full flex flex-col md:flex-row px-4 md:px-16 mt-[-0.5px]">
        <div className="w-full md:flex-1 relative z-10 flex flex-col justify-center">
          {portfolioData.projectSteps.map((step, i) => (
            <div
              key={i}
              className="w-full h-auto md:h-screen flex items-center py-8 md:py-0"
            >
              <div className="flex flex-col justify-center h-full">
                <OptimizedSlideRevealText
                  duration={0.8}
                  delay={0.1}
                  direction="y"
                  distance={30}
                >
                  <h3 className="font-normal text-2xl md:text-[2.5rem] lg:text-[4rem] mb-2">
                    {step.title}
                  </h3>
                </OptimizedSlideRevealText>
                <OptimizedSlideRevealText
                  duration={0.6}
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
