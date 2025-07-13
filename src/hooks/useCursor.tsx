import { useRef, useCallback, useEffect, useState } from "react";

const MAX_PARTICLES = 35;
const PARTICLE_RADIUS = 10;
const INNER_RADIUS = 6.5;

export function useCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const particles = useRef<
    Array<{ x: number; y: number; alpha: number; life: number }>
  >([]);
  const rafId = useRef<number>(0);

  const [active, setActive] = useState(false);
  const [desktop, setDesktop] = useState(false);
  const [mouseInitialized, setMouseInitialized] = useState(false);

  const [cursor, setCursor] = useState({
    x: -100,
    y: -100,
    scale: 1,
    filter: "brightness(1) saturate(1)",
    transition: "none",
  });

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  }, []);

  const addParticle = useCallback(
    (x: number, y: number) => {
      if (!mouseInitialized) return;
      particles.current.push({ x, y, alpha: 1, life: 1 });
      if (particles.current.length > MAX_PARTICLES) particles.current.shift();
    },
    [mouseInitialized]
  );

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

    const canvas = canvasRef.current;

    const animate = () => {
      drawParticles();
      rafId.current = requestAnimationFrame(animate);
    };
    animate();

    const move = (e: MouseEvent) => {
      if (!mouseInitialized) {
        setMouseInitialized(true);
      }
      const x = e.clientX;
      const y = e.clientY;

      if (cursorRef.current) {
        cursorRef.current.style.left = `${x}px`;
        cursorRef.current.style.top = `${y}px`;
      }

      setCursor((c) => ({
        ...c,
        x,
        y,
      }));

      addParticle(x + 6, y);
    };

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
  }, [
    active,
    desktop,
    resizeCanvas,
    addParticle,
    drawParticles,
    mouseInitialized,
  ]);

  return {
    canvasRef,
    cursorRef,
    cursor,
    active,
    desktop,
    mouseInitialized,
  };
}
