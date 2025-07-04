"use client";

import { useEffect, lazy, Suspense } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Navbar from "@/components/navbar";
import PerformanceMonitor from "@/components/PerformanceMonitor";
import { configureGSAPPerformance } from "@/utils/performanceOptimizer";

// Lazy load components for better performance
const Hero = lazy(() => import("./hero/page"));
const About = lazy(() => import("./about/page"));
const Skills = lazy(() => import("./skills/page"));
const Portfolio = lazy(() => import("./portofolio/page"));
const Experience = lazy(() => import("./experience/page"));
const Testimonials = lazy(() => import("./testimonials/page"));
const Contact = lazy(() => import("./contact/page"));
const Cursor = lazy(() => import("@/components/cursor/cursor"));

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
  </div>
);

export default function Home() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Configure GSAP for optimal performance
      configureGSAPPerformance();

      // Register GSAP plugins once
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });

      // Optimize scroll updates
      let scrollRAF: number;
      const onScroll = (time: number) => {
        lenis.raf(time);
        ScrollTrigger.update();
        scrollRAF = requestAnimationFrame(onScroll);
      };
      scrollRAF = requestAnimationFrame(onScroll);

      return () => {
        lenis.destroy();
        cancelAnimationFrame(scrollRAF);
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }
  }, []);

  return (
    <>
      <PerformanceMonitor />
      <Suspense fallback={<LoadingSpinner />}>
        <Cursor />
      </Suspense>
      <Navbar />
      <main>
        <Suspense fallback={<LoadingSpinner />}>
          <Hero />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <About />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <Portfolio />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <Experience />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <Testimonials />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <Contact />
        </Suspense>
      </main>
    </>
  );
}
