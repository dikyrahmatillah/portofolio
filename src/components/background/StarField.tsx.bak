"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  element: HTMLDivElement;
}

export default function StarField() {
  const containerRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<Star[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    const container = containerRef.current;
    const starCount = 250;
    const stars: Star[] = [];

    // Create stars
    for (let i = 0; i < starCount; i++) {
      const starElement = document.createElement("div");
      starElement.className =
        "absolute rounded-full bg-white pointer-events-none";

      const size = Math.random() * 3 + 1;
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight * 4; // Extra height for scrolling
      const speed = Math.random() * 0.5 + 0.1;
      const opacity = Math.random() * 0.8 + 0.2;

      starElement.style.width = `${size}px`;
      starElement.style.height = `${size}px`;
      starElement.style.left = `${x}px`;
      starElement.style.top = `${y}px`;
      starElement.style.opacity = `${opacity}`;

      // Add twinkle animation
      gsap.to(starElement, {
        opacity: opacity * 0.3,
        duration: Math.random() * 3 + 1,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: Math.random() * 2,
      });

      container.appendChild(starElement);

      stars.push({
        x,
        y,
        size,
        speed,
        opacity,
        element: starElement,
      });
    }

    starsRef.current = stars;

    // Phase 1: Zoom in effect when entering skills section
    ScrollTrigger.create({
      trigger: "#skills",
      start: "top bottom",
      end: "bottom center",
      scrub: 0.5,
      onUpdate: (self) => {
        const scale = 1 + self.progress * 2; // Scale from 1 to 3
        container.style.transform = `scale(${scale})`;
      },
    });

    // Phase 2: Upward movement when entering portfolio section
    ScrollTrigger.create({
      trigger: "#portofolio",
      start: "top bottom",
      end: "bottom center",
      scrub: 0.5,
      onUpdate: (self) => {
        const scrollY = self.progress * window.innerHeight * 2;

        stars.forEach((star) => {
          const newY = star.y - scrollY * star.speed;

          // Reset star position when it goes off screen
          if (newY < -50) {
            star.y = window.innerHeight + 50;
            star.x = Math.random() * window.innerWidth;
            star.element.style.left = `${star.x}px`;
          }

          star.element.style.transform = `translateY(${newY - star.y}px)`;
        });
      },
    });

    // Phase 3: Stop movement after portfolio section
    ScrollTrigger.create({
      trigger: "#portofolio",
      start: "bottom center",
      end: "bottom top",
      scrub: 0.5,
      onUpdate: (self) => {
        // Gradually stop the movement
        const stopFactor = 1 - self.progress;
        stars.forEach((star) => {
          const currentTransform = star.element.style.transform;
          if (currentTransform.includes("translateY")) {
            const match = currentTransform.match(/translateY\(([^)]+)\)/);
            if (match) {
              const currentY = parseFloat(match[1]);
              const newY = currentY * stopFactor;
              star.element.style.transform = `translateY(${newY}px)`;
            }
          }
        });
      },
    });

    // Handle window resize
    const handleResize = () => {
      stars.forEach((star) => {
        if (star.x > window.innerWidth) {
          star.x = Math.random() * window.innerWidth;
          star.element.style.left = `${star.x}px`;
        }
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      // Clean up star elements
      stars.forEach((star) => {
        if (star.element.parentNode) {
          star.element.parentNode.removeChild(star.element);
        }
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full bg-gradient-to-b from-gray-900 via-purple-900 to-violet-800 overflow-hidden pointer-events-none z-[-1]"
      style={{
        background: `
          radial-gradient(ellipse at top, #1e1b4b 0%, transparent 50%),
          radial-gradient(ellipse at bottom, #581c87 0%, transparent 50%),
          linear-gradient(to bottom, #0f0f23 0%, #1a0b2e 50%, #2d1b4e 100%)
        `,
      }}
    />
  );
}
