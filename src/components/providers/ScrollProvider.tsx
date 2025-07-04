"use client";

import { useEffect, useCallback, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  configureGSAPPerformance,
  debounce,
} from "@/utils/performanceOptimizer";

export default function ScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number | null>(null);

  // Debounced resize handler for better performance
  const handleResize = useCallback(() => {
    const debouncedRefresh = debounce(() => {
      ScrollTrigger.refresh();
    }, 200);
    debouncedRefresh();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Configure GSAP for optimal performance
    configureGSAPPerformance();

    // Register GSAP plugins once
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis with optimized settings
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: window.innerWidth < 768 ? 0.8 : 1, // Reduce on mobile
      touchMultiplier: window.innerWidth < 768 ? 1.5 : 2,
      infinite: false,
      autoResize: true,
    });

    // Properly integrate Lenis with ScrollTrigger using requestAnimationFrame
    const onScroll = () => {
      ScrollTrigger.update();
    };

    lenisRef.current.on("scroll", onScroll);

    // Use optimized RAF loop
    const raf = () => {
      if (lenisRef.current) {
        lenisRef.current.raf(Date.now());
        rafIdRef.current = requestAnimationFrame(raf);
      }
    };
    rafIdRef.current = requestAnimationFrame(raf);

    // Add resize listener
    window.addEventListener("resize", handleResize, { passive: true });

    // Refresh ScrollTrigger after initialization with progressive timing
    const timeouts = [
      setTimeout(() => ScrollTrigger.refresh(), 100),
      setTimeout(() => ScrollTrigger.refresh(), 500),
      setTimeout(() => ScrollTrigger.refresh(), 1000),
    ];

    return () => {
      // Cleanup timeouts
      timeouts.forEach(clearTimeout);

      // Cleanup RAF
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }

      // Cleanup Lenis
      if (lenisRef.current) {
        lenisRef.current.off("scroll", onScroll);
        lenisRef.current.destroy();
        lenisRef.current = null;
      }

      // Cleanup ScrollTrigger
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      // Remove resize listener
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return <>{children}</>;
}
