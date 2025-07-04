"use client";

import React, { useEffect, useRef, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface OptimizedSlideRevealTextProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  direction?: "x" | "y";
  distance?: number;
}

const OptimizedSlideRevealText = memo(function OptimizedSlideRevealText({
  children,
  className = "",
  duration = 0.8,
  delay = 0,
  direction = "y",
  distance = 50,
}: OptimizedSlideRevealTextProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const element = textRef.current;

    // Clean up previous animations
    if (animationRef.current) {
      animationRef.current.kill();
    }
    if (scrollTriggerRef.current) {
      scrollTriggerRef.current.kill();
    }

    // Simple CSS transform approach - much more performant
    const initialTransform =
      direction === "x"
        ? `translateX(${distance}px)`
        : `translateY(${distance}px)`;

    gsap.set(element, {
      transform: initialTransform,
      opacity: 0,
    });

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: element,
      start: "top 90%",
      onEnter: () => {
        animationRef.current = gsap.to(element, {
          transform: "translate(0px, 0px)",
          opacity: 1,
          duration: duration,
          delay: delay,
          ease: "power3.out",
        });
      },
      onLeave: () => {
        if (animationRef.current) {
          animationRef.current.reverse();
        }
      },
      onEnterBack: () => {
        animationRef.current = gsap.to(element, {
          transform: "translate(0px, 0px)",
          opacity: 1,
          duration: duration * 0.5,
          ease: "power2.out",
        });
      },
      onLeaveBack: () => {
        if (animationRef.current) {
          animationRef.current.reverse();
        }
      },
    });

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
    };
  }, [duration, delay, direction, distance]);

  return (
    <div
      ref={textRef}
      className={`optimized-slide-reveal-text ${className}`.trim()}
    >
      {children}
    </div>
  );
});

export default OptimizedSlideRevealText;
