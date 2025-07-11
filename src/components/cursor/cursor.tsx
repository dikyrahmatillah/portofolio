"use client";

import React, { useEffect, useRef, useCallback, useState } from "react";
import "./cursor.css";

const MAX_PARTICLES = 35;
const PARTICLE_RADIUS = 13.5;
const INNER_RADIUS = 6.5;

const Cursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<
    Array<{ x: number; y: number; alpha: number; life: number }>
  >([]);
  const rafId = useRef<number>(0);
  const [active, setActive] = useState(false);
  const [desktop, setDesktop] = useState(false);

  // Cursor state
  const [cursor, setCursor] = useState({
    x: 100,
    y: 100,
    scale: 1,
    filter: "brightness(1) saturate(1)",
    transition: "transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94)",
  });

  // Resize canvas to viewport
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  }, []);

  // Add particle at (x, y)
  const addParticle = useCallback((x: number, y: number) => {
    particles.current.push({ x, y, alpha: 1, life: 1 });
    if (particles.current.length > MAX_PARTICLES) particles.current.shift();
  }, []);

  // Draw all particles
  const drawParticles = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.current.forEach((p, i) => {
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      ctx.globalAlpha = p.alpha * 0.8;
      const grad = ctx.createRadialGradient(
        p.x,
        p.y,
        0,
        p.x,
        p.y,
        PARTICLE_RADIUS
      );
      grad.addColorStop(0, `rgba(255,255,255,${p.alpha})`);
      grad.addColorStop(0.15, `rgba(240,248,255,${p.alpha * 0.9})`);
      grad.addColorStop(0.35, `rgba(200,230,255,${p.alpha * 0.7})`);
      grad.addColorStop(0.65, `rgba(150,200,255,${p.alpha * 0.4})`);
      grad.addColorStop(0.85, `rgba(100,170,255,${p.alpha * 0.2})`);
      grad.addColorStop(1, "rgba(80,150,255,0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, PARTICLE_RADIUS, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalCompositeOperation = "lighten";
      ctx.globalAlpha = p.alpha * 0.9;
      const innerGrad = ctx.createRadialGradient(
        p.x,
        p.y,
        0,
        p.x,
        p.y,
        INNER_RADIUS
      );
      innerGrad.addColorStop(0, `rgba(255,255,255,${p.alpha * 0.95})`);
      innerGrad.addColorStop(0.3, `rgba(230,240,255,${p.alpha * 0.7})`);
      innerGrad.addColorStop(0.7, `rgba(180,210,255,${p.alpha * 0.4})`);
      innerGrad.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = innerGrad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, INNER_RADIUS, 0, Math.PI * 2);
      ctx.fill();

      if (p.alpha > 0.7) {
        ctx.globalCompositeOperation = "screen";
        ctx.globalAlpha = p.alpha * 0.6;
        ctx.fillStyle = `rgba(255,255,255,${p.alpha * 0.8})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.25, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      p.life -= 0.018;
      p.alpha = Math.pow(p.life, 1.8);
      if (p.life <= 0) particles.current.splice(i, 1);
    });
  }, []);

  // Cursor scale handlers
  const scaleCursor = useCallback(
    (scale: number, filter: string, transition: string) => {
      setCursor((c) => ({ ...c, scale, filter, transition }));
    },
    []
  );

  // Setup
  useEffect(() => {
    setActive(true);
    setDesktop(window.innerWidth > 900);
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  // Animation and events
  useEffect(() => {
    if (!active || !desktop) return;
    resizeCanvas();

    // Store the current canvas ref value
    const canvas = canvasRef.current;

    // Animation loop
    const animate = () => {
      drawParticles();
      rafId.current = requestAnimationFrame(animate);
    };
    animate();

    // Mouse move
    let last = 0;
    const move = (e: MouseEvent) => {
      const now = Date.now();
      if (now - last < 12) return;
      last = now;
      setCursor((c) => ({
        ...c,
        x: e.clientX,
        y: e.clientY,
      }));
      addParticle(e.clientX, e.clientY);
    };

    // Mouse leave
    const clearTrail = () => {
      particles.current = [];
      if (canvas) {
        const ctx = canvas.getContext("2d");
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseleave", clearTrail);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", clearTrail);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      if (canvas) {
        const ctx = canvas.getContext("2d");
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
  }, [active, desktop, resizeCanvas, addParticle, drawParticles]);

  // React way: handle hover via onMouseEnter/onMouseLeave
  useEffect(() => {
    if (!desktop) return;
    const buttons = Array.from(
      document.querySelectorAll<HTMLElement>(".contact-button")
    );
    const handleEnter = () =>
      scaleCursor(
        1.8,
        "brightness(1.3) saturate(1.2)",
        "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)"
      );
    const handleLeave = () =>
      scaleCursor(
        1,
        "brightness(1) saturate(1)",
        "transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94)"
      );
    buttons.forEach((btn) => {
      btn.onmouseenter = handleEnter;
      btn.onmouseleave = handleLeave;
    });
    return () => {
      buttons.forEach((btn) => {
        btn.onmouseenter = null;
        btn.onmouseleave = null;
      });
    };
  }, [desktop, scaleCursor]);

  if (!active || !desktop) return null;

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
      <div
        className="cursor-star"
        style={{
          left: cursor.x,
          top: cursor.y,
          transform: `translate3d(-50%, -50%, 0) scale(${cursor.scale})`,
          filter: cursor.filter,
          transition: cursor.transition,
          position: "fixed",
          pointerEvents: "none",
          zIndex: 999,
        }}
      >
        <div className="star-core"></div>
        <div className="star-glow"></div>
      </div>
    </>
  );
};

export default React.memo(Cursor);
