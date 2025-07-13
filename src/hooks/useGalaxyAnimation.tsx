"use client";

import { useEffect, useRef, useCallback } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleOffset: number;
  twinkleSpeed: number;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

export default function useGalaxyAnimation(
  canvasRef: React.RefObject<HTMLCanvasElement | null>
) {
  const animationRef = useRef<number>(0);
  const starsRef = useRef<Star[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const timeRef = useRef<number>(0);

  const initStars = useCallback((width: number, height: number) => {
    const stars: Star[] = [];

    const isMobile = window.innerWidth < 768;
    const layers = isMobile
      ? [
          { count: 80, size: [0.5, 1], opacity: [0.3, 0.6] },
          { count: 50, size: [1, 2], opacity: [0.6, 0.8] },
          { count: 30, size: [2, 3], opacity: [0.8, 1.0] },
        ]
      : [
          { count: 150, size: [0.5, 1], opacity: [0.3, 0.6] },
          { count: 100, size: [1, 2], opacity: [0.6, 0.8] },
          { count: 50, size: [2, 3], opacity: [0.8, 1.0] },
        ];

    layers.forEach((layer) => {
      for (let i = 0; i < layer.count; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * (layer.size[1] - layer.size[0]) + layer.size[0],
          opacity:
            Math.random() * (layer.opacity[1] - layer.opacity[0]) +
            layer.opacity[0],
          twinkleOffset: Math.random() * Math.PI * 2,
          twinkleSpeed: Math.random() * 0.02 + 0.01,
        });
      }
    });

    // Add cluster stars
    for (let c = 0; c < 2; c++) {
      const centerX = Math.random() * width;
      const centerY = Math.random() * height;
      const clusterSize = Math.random() * 30 + 20;

      for (let i = 0; i < 16; i++) {
        const angle = (i / 16) * Math.PI * 2;
        const radius = clusterSize * (0.3 + Math.random() * 0.7);
        stars.push({
          x: centerX + Math.cos(angle) * radius,
          y: centerY + Math.sin(angle) * radius,
          size: 0.5,
          opacity: 0.2 + Math.random() * 0.3,
          twinkleOffset: Math.random() * Math.PI * 2,
          twinkleSpeed: Math.random() * 0.005 + 0.002,
        });
      }
    }

    starsRef.current = stars;
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initStars(canvas.width, canvas.height);
  }, [canvasRef, initStars]);

  const createShootingStar = useCallback((width: number) => {
    if (Math.random() > 0.005) return;

    const startX = Math.random() * width;
    const minAngle = (70 * Math.PI) / 180;
    const maxAngle = (110 * Math.PI) / 180;
    const angle = Math.random() * (maxAngle - minAngle) + minAngle;
    const speed = Math.random() * 8 + 4;

    shootingStarsRef.current.push({
      x: startX,
      y: -10,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 0,
      maxLife: Math.random() * 60 + 30,
    });
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    timeRef.current += 1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw stars
    starsRef.current.forEach((star) => {
      const twinkle = Math.sin(
        timeRef.current * star.twinkleSpeed + star.twinkleOffset
      );
      const alpha = star.opacity * (0.7 + 0.3 * twinkle);

      ctx.globalAlpha = alpha;
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();
    });

    // Create and update shooting stars
    createShootingStar(canvas.width);
    shootingStarsRef.current = shootingStarsRef.current.filter((s) => {
      s.x += s.vx;
      s.y += s.vy;
      s.life += 1;

      if (
        s.life < s.maxLife &&
        s.x > -50 &&
        s.x < canvas.width + 50 &&
        s.y < canvas.height + 50
      ) {
        const alpha = 1 - s.life / s.maxLife;

        // Draw shooting star
        ctx.globalAlpha = alpha;
        ctx.fillStyle = "white";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "white";
        ctx.beginPath();
        ctx.arc(s.x, s.y, 2, 0, Math.PI * 2);
        ctx.fill();

        // Draw tail
        ctx.shadowBlur = 0;
        const tailLength = 20;
        const gradient = ctx.createLinearGradient(
          s.x,
          s.y,
          s.x - s.vx * tailLength,
          s.y - s.vy * tailLength
        );
        gradient.addColorStop(0, `rgba(255,255,255,${alpha})`);
        gradient.addColorStop(1, "transparent");

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * tailLength, s.y - s.vy * tailLength);
        ctx.stroke();

        return true;
      }
      return false;
    });

    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
    animationRef.current = requestAnimationFrame(animate);
  }, [canvasRef, createShootingStar]);

  useEffect(() => {
    resizeCanvas();
    animationRef.current = requestAnimationFrame(animate);

    window.addEventListener("resize", resizeCanvas);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [resizeCanvas, animate]);
}
