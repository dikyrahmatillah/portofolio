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

interface StarCluster {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

interface ShootingStar {
  x: number;
  y: number;
  endX: number;
  endY: number;
  progress: number;
  speed: number;
  life: number;
  maxLife: number;
}

export default function CanvasGalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);
  const starsRef = useRef<Star[]>([]);
  const clustersRef = useRef<StarCluster[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const timeRef = useRef<number>(0);

  // Initialize stars
  const initStars = useCallback((width: number, height: number) => {
    const stars: Star[] = [];
    const starLayers = [
      { count: 150, sizeRange: [0.5, 1], opacity: [0.3, 0.6] },
      { count: 100, sizeRange: [1, 2], opacity: [0.6, 0.8] },
      { count: 50, sizeRange: [2, 3], opacity: [0.8, 1.0] },
    ];
    for (const layer of starLayers) {
      for (let i = 0; i < layer.count; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size:
            Math.random() * (layer.sizeRange[1] - layer.sizeRange[0]) +
            layer.sizeRange[0],
          opacity:
            Math.random() * (layer.opacity[1] - layer.opacity[0]) +
            layer.opacity[0],
          twinkleOffset: Math.random() * Math.PI * 2,
          twinkleSpeed: Math.random() * 0.02 + 0.01,
        });
      }
    }
    starsRef.current = stars;
  }, []);

  // Initialize clusters
  const initClusters = useCallback((width: number, height: number) => {
    const clusters: StarCluster[] = [];
    for (let i = 0; i < 5; i++) {
      clusters.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 30 + 20,
        opacity: Math.random() * 0.3 + 0.1,
        twinkleSpeed: Math.random() * 0.005 + 0.002,
        twinkleOffset: Math.random() * Math.PI * 2,
      });
    }
    clustersRef.current = clusters;
  }, []);

  // Resize and re-init
  const resizeAndInit = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initStars(canvas.width, canvas.height);
    initClusters(canvas.width, canvas.height);
  }, [initStars, initClusters]);

  // Shooting star logic
  const createShootingStar = (width: number, height: number) => {
    if (Math.random() < 0.995) return;
    const startX = Math.random() * width;
    const startY = -10;
    const endX = startX + (Math.random() * 400 - 200);
    const endY = height + 10;
    shootingStarsRef.current.push({
      x: startX,
      y: startY,
      endX,
      endY,
      progress: 0,
      speed: Math.random() * 0.02 + 0.01,
      life: 0,
      maxLife: Math.random() * 60 + 30,
    });
  };

  // Drawing functions
  const drawStar = (ctx: CanvasRenderingContext2D, star: Star, t: number) => {
    const twinkle = Math.sin(t * star.twinkleSpeed + star.twinkleOffset);
    const currentOpacity = star.opacity * (0.7 + 0.3 * twinkle);
    ctx.save();
    ctx.globalAlpha = currentOpacity;
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  const drawCluster = (
    ctx: CanvasRenderingContext2D,
    cluster: StarCluster,
    t: number
  ) => {
    const twinkle = Math.sin(t * cluster.twinkleSpeed + cluster.twinkleOffset);
    const currentOpacity = cluster.opacity * (0.5 + 0.5 * twinkle);
    ctx.save();
    ctx.globalAlpha = currentOpacity;
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const radius = cluster.size * (0.3 + Math.random() * 0.7);
      const x = cluster.x + Math.cos(angle) * radius;
      const y = cluster.y + Math.sin(angle) * radius;
      ctx.fillStyle = "rgba(255,255,255,0.4)";
      ctx.beginPath();
      ctx.arc(x, y, 0.5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  };

  const drawShootingStar = (ctx: CanvasRenderingContext2D, s: ShootingStar) => {
    const alpha = 1 - s.life / s.maxLife;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = "white";
    ctx.shadowBlur = 10;
    ctx.shadowColor = "white";
    ctx.beginPath();
    ctx.arc(s.x, s.y, 2, 0, Math.PI * 2);
    ctx.fill();
    // Tail
    const tailX = s.x - (s.endX - s.x) * 0.1;
    const tailY = s.y - (s.endY - s.y) * 0.1;
    const gradient = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
    gradient.addColorStop(0, `rgba(255,255,255,${alpha})`);
    gradient.addColorStop(1, "transparent");
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(tailX, tailY);
    ctx.stroke();
    ctx.restore();
  };

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    resizeAndInit();

    const animate = () => {
      timeRef.current += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw clusters
      clustersRef.current.forEach((cluster) =>
        drawCluster(ctx, cluster, timeRef.current)
      );
      // Draw stars (twinkle only, no drift)
      starsRef.current.forEach((star) => drawStar(ctx, star, timeRef.current));

      // Shooting stars
      createShootingStar(canvas.width, canvas.height);
      shootingStarsRef.current = shootingStarsRef.current.filter((s) => {
        s.progress += s.speed;
        s.life += 1;
        s.x += (s.endX - s.x) * s.progress * 0.1;
        s.y += (s.endY - s.y) * s.progress * 0.1;
        if (s.life < s.maxLife) {
          drawShootingStar(ctx, s);
          return true;
        }
        return false;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    window.addEventListener("resize", resizeAndInit);
    return () => {
      window.removeEventListener("resize", resizeAndInit);
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
    };
  }, [resizeAndInit]);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-[-1]">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: `
            radial-gradient(ellipse at center top, #23272f 0%, transparent 50%),
            radial-gradient(ellipse at center bottom, #181a1b 0%, transparent 50%),
            radial-gradient(ellipse at center, #44474a 0%, transparent 60%),
            linear-gradient(to bottom, #000000 0%, #23272f 30%, #23272f 60%, #181a1b 100%)
          `,
          zIndex: -1,
        }}
      />
    </div>
  );
}
