import React, { useEffect, useRef, useCallback, useState } from "react";
import "./cursor.css";
import gsap from "gsap";
import { MdOutlineArrowOutward } from "react-icons/md";
import { throttle } from "@/utils/performanceOptimizer";

const Cursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const handleMouseEnter = useCallback(() => {
    const cursor = cursorRef.current;
    const icon = iconRef.current;
    if (!cursor || !icon) return;

    gsap.to(cursor, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
    gsap.to(icon, {
      scale: 1,
      duration: 0.2,
      ease: "power2.out",
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    const cursor = cursorRef.current;
    const icon = iconRef.current;
    if (!cursor || !icon) return;

    gsap.to(cursor, {
      scale: 0.1,
      duration: 0.3,
      ease: "power2.out",
    });
    gsap.to(icon, {
      scale: 0,
      duration: 0.2,
      ease: "power2.out",
    });
  }, []);

  useEffect(() => {
    // Set mounted state and check if desktop
    setIsMounted(true);
    setIsDesktop(window.innerWidth > 900);

    // Add resize listener to update desktop state
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 900);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Only run cursor logic if mounted and on desktop
    if (!isMounted || !isDesktop) return;

    const cursor = cursorRef.current;
    const icon = iconRef.current;

    if (!cursor || !icon) return;

    gsap.set(cursor, {
      scale: 0.1,
      opacity: 1,
      x: 100,
      y: 100,
      willChange: "transform",
    });

    gsap.set(icon, {
      scale: 0,
      willChange: "transform",
    });

    // Throttled mouse move for better performance
    const moveCursor = throttle((e: unknown) => {
      const event = e as MouseEvent;
      gsap.set(cursor, {
        x: event.clientX,
        y: event.clientY,
      });
    }, 16); // ~60fps

    // Use passive listeners for better performance
    window.addEventListener("mousemove", moveCursor, { passive: true });

    // Setup contact button listeners
    const setupContactButtons = () => {
      const projects =
        document.querySelectorAll<HTMLElement>(".contact-button");
      projects.forEach((project) => {
        project.addEventListener("mouseenter", handleMouseEnter, {
          passive: true,
        });
        project.addEventListener("mouseleave", handleMouseLeave, {
          passive: true,
        });
      });
      return projects;
    };

    const projects = setupContactButtons();

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      projects.forEach((project) => {
        project.removeEventListener("mouseenter", handleMouseEnter);
        project.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [handleMouseEnter, handleMouseLeave, isMounted, isDesktop]);

  // Prevent hydration mismatch by not rendering until mounted and on desktop
  if (!isMounted || !isDesktop) {
    return null;
  }

  return (
    <div className="cursor" ref={cursorRef}>
      <div className="cursor-icon" ref={iconRef}>
        <MdOutlineArrowOutward size={28} />
      </div>
    </div>
  );
};

export default React.memo(Cursor);
