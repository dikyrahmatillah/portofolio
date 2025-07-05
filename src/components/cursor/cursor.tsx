"use client";

import React, { useEffect, useRef, useCallback, useState } from "react";
import "./cursor.css";

const Cursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Store trail particles
  const particles = useRef<
    Array<{ x: number; y: number; alpha: number; life: number }>
  >([]);
  // Store animation frame id for cleanup
  const rafId = useRef<number | null>(null);

  // Resize canvas to fill viewport
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

  // Add particle to trail
  const addParticle = useCallback((x: number, y: number) => {
    particles.current.push({
      x,
      y,
      alpha: 1,
      life: 1,
    });

    // Limit particles for performance (optimized for enhanced effect)
    if (particles.current.length > 35) {
      particles.current.shift();
    }
  }, []);

  // Draw and update particles
  const drawParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw all particles as light/glow
    particles.current.forEach((particle, index) => {
      ctx.save();

      // Use additive blending for smooth light overlay
      ctx.globalCompositeOperation = "screen";
      ctx.globalAlpha = particle.alpha * 0.8;

      // Create larger, softer radial gradient for enhanced light effect
      const gradient = ctx.createRadialGradient(
        particle.x,
        particle.y,
        0,
        particle.x,
        particle.y,
        18.75 // 25% smaller than 25
      );
      gradient.addColorStop(0, `rgba(255, 255, 255, ${particle.alpha * 1.0})`);
      gradient.addColorStop(
        0.15,
        `rgba(240, 248, 255, ${particle.alpha * 0.9})`
      );
      gradient.addColorStop(
        0.35,
        `rgba(200, 230, 255, ${particle.alpha * 0.7})`
      );
      gradient.addColorStop(
        0.65,
        `rgba(150, 200, 255, ${particle.alpha * 0.4})`
      );
      gradient.addColorStop(
        0.85,
        `rgba(100, 170, 255, ${particle.alpha * 0.2})`
      );
      gradient.addColorStop(1, "rgba(80, 150, 255, 0)");

      // Draw soft outer glow
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, 18.75, 0, Math.PI * 2); // 25% smaller
      ctx.fill();

      // Add bright inner core with enhanced glow
      ctx.globalCompositeOperation = "lighten";
      ctx.globalAlpha = particle.alpha * 0.9;
      const innerGradient = ctx.createRadialGradient(
        particle.x,
        particle.y,
        0,
        particle.x,
        particle.y,
        9 // 25% smaller than 12
      );
      innerGradient.addColorStop(
        0,
        `rgba(255, 255, 255, ${particle.alpha * 0.95})`
      );
      innerGradient.addColorStop(
        0.3,
        `rgba(230, 240, 255, ${particle.alpha * 0.7})`
      );
      innerGradient.addColorStop(
        0.7,
        `rgba(180, 210, 255, ${particle.alpha * 0.4})`
      );
      innerGradient.addColorStop(1, "rgba(255, 255, 255, 0)");

      ctx.fillStyle = innerGradient;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, 9, 0, Math.PI * 2); // 25% smaller
      ctx.fill();

      // Add sparkle effect for extra brightness
      if (particle.alpha > 0.7) {
        ctx.globalCompositeOperation = "screen";
        ctx.globalAlpha = particle.alpha * 0.6;
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.alpha * 0.8})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2.25, 0, Math.PI * 2); // 25% smaller than 3
        ctx.fill();
      }

      ctx.restore();

      // Update particle with enhanced fade curve
      particle.life -= 0.018; // Slightly faster for more dynamic trail
      particle.alpha = Math.pow(particle.life, 1.8); // Smoother fade curve

      // Remove dead particles
      if (particle.life <= 0) {
        particles.current.splice(index, 1);
      }
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    cursor.dataset.scale = "1.8";
    cursor.style.transform = `translate3d(-50%, -50%, 0) scale(1.8)`;
    cursor.style.transition =
      "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)";
    cursor.style.filter = "brightness(1.3) saturate(1.2)";
  }, []);

  const handleMouseLeave = useCallback(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    cursor.dataset.scale = "1";
    cursor.style.transform = `translate3d(-50%, -50%, 0) scale(1)`;
    cursor.style.transition =
      "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    cursor.style.filter = "brightness(1) saturate(1)";
  }, []);

  useEffect(() => {
    setIsMounted(true);
    setIsDesktop(window.innerWidth > 900);
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  useEffect(() => {
    if (!isMounted || !isDesktop) return;
    const cursorElement = cursorRef.current;
    const canvas = canvasRef.current;
    if (!cursorElement || !canvas) return;

    resizeCanvas();

    // Set initial cursor position with native CSS
    cursorElement.style.left = "100px";
    cursorElement.style.top = "100px";
    cursorElement.style.transform = "translate3d(-50%, -50%, 0) scale(1)";
    cursorElement.style.willChange = "transform";

    // Animation loop for drawing particles
    const animate = () => {
      drawParticles();
      rafId.current = requestAnimationFrame(animate);
    };
    animate();

    // Simple throttle implementation with enhanced responsiveness
    let lastTime = 0;
    const throttleDelay = 12; // Higher FPS for smoother trail

    // Mouse move handler
    const moveCursor = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime < throttleDelay) return;
      lastTime = now;

      if (cursorElement) {
        cursorElement.style.left = `${e.clientX}px`;
        cursorElement.style.top = `${e.clientY}px`;
        cursorElement.style.transform = `translate3d(-50%, -50%, 0) scale(${cursorElement.dataset.scale || "1"})`;
      }

      // Add particle at current position
      addParticle(e.clientX, e.clientY);
    };
    // Setup contact button listeners
    const setupContactButtons = () => {
      const contactButtons =
        document.querySelectorAll<HTMLElement>(".contact-button");
      contactButtons.forEach((button) => {
        button.addEventListener("mouseenter", handleMouseEnter, {
          passive: true,
        });
        button.addEventListener("mouseleave", handleMouseLeave, {
          passive: true,
        });
      });
      return contactButtons;
    };
    const contactButtons = setupContactButtons();

    // Mouse leave handler to clear trail
    const handleWindowMouseLeave = () => {
      particles.current = [];
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      }
    };
    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mouseleave", handleWindowMouseLeave);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseleave", handleWindowMouseLeave);
      contactButtons.forEach((button) => {
        button.removeEventListener("mouseenter", handleMouseEnter);
        button.removeEventListener("mouseleave", handleMouseLeave);
      });
      if (rafId.current) cancelAnimationFrame(rafId.current);
      // Clear canvas
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
  }, [
    handleMouseEnter,
    handleMouseLeave,
    isMounted,
    isDesktop,
    resizeCanvas,
    addParticle,
    drawParticles,
  ]);

  // Prevent hydration mismatch by not rendering until mounted and on desktop
  if (!isMounted || !isDesktop) {
    return null;
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        className="comet-canvas"
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 998,
          background: "transparent",
          display: "block",
        }}
        tabIndex={-1}
      />
      <div className="cursor-star" ref={cursorRef}>
        <div className="star-core"></div>
        <div className="star-glow"></div>
      </div>
    </>
  );
};

export default React.memo(Cursor);
