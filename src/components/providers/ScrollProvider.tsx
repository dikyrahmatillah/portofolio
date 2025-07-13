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

  const handleResize = useCallback(() => {
    const debouncedRefresh = debounce(() => {
      ScrollTrigger.refresh();
    }, 200);
    debouncedRefresh();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    configureGSAPPerformance();
    gsap.registerPlugin(ScrollTrigger);

    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: window.innerWidth < 768 ? 0.8 : 1,
      touchMultiplier: window.innerWidth < 768 ? 1.5 : 2,
      infinite: false,
      autoResize: true,
    });

    const onScroll = () => {
      ScrollTrigger.update();
    };

    lenisRef.current.on("scroll", onScroll);

    const raf = () => {
      if (lenisRef.current) {
        lenisRef.current.raf(Date.now());
        rafIdRef.current = requestAnimationFrame(raf);
      }
    };
    rafIdRef.current = requestAnimationFrame(raf);

    window.addEventListener("resize", handleResize, { passive: true });

    const timeouts = [
      setTimeout(() => ScrollTrigger.refresh(), 100),
      setTimeout(() => ScrollTrigger.refresh(), 500),
      setTimeout(() => ScrollTrigger.refresh(), 1000),
    ];

    return () => {
      timeouts.forEach(clearTimeout);

      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }

      if (lenisRef.current) {
        lenisRef.current.off("scroll", onScroll);
        lenisRef.current.destroy();
        lenisRef.current = null;
      }

      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return <>{children}</>;
}
