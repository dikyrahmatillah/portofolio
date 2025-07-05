"use client";
import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  opacity: number;
  speed: number;
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
  const animationFrameRef = useRef<number | undefined>(undefined);
  const starsRef = useRef<Star[]>([]);
  const starClustersRef = useRef<StarCluster[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize stars
    const initStars = () => {
      const stars: Star[] = [];
      
      // Different star layers for depth
      const starLayers = [
        { count: 300, sizeRange: [0.5, 1], speedRange: [0.02, 0.05], opacity: [0.3, 0.6] }, // Far stars
        { count: 200, sizeRange: [1, 2], speedRange: [0.05, 0.1], opacity: [0.6, 0.8] }, // Mid stars
        { count: 100, sizeRange: [2, 3], speedRange: [0.1, 0.2], opacity: [0.8, 1.0] }, // Close stars
      ];

      starLayers.forEach(layer => {
        for (let i = 0; i < layer.count; i++) {
          stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            z: Math.random() * 1000,
            size: Math.random() * (layer.sizeRange[1] - layer.sizeRange[0]) + layer.sizeRange[0],
            opacity: Math.random() * (layer.opacity[1] - layer.opacity[0]) + layer.opacity[0],
            speed: Math.random() * (layer.speedRange[1] - layer.speedRange[0]) + layer.speedRange[0],
            twinkleOffset: Math.random() * Math.PI * 2,
            twinkleSpeed: Math.random() * 0.02 + 0.01
          });
        }
      });

      starsRef.current = stars;
    };

    // Initialize distant star clusters
    const initStarClusters = () => {
      const clusters: StarCluster[] = [];

      for (let i = 0; i < 5; i++) {
        clusters.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 30 + 20,
          opacity: Math.random() * 0.3 + 0.1,
          twinkleSpeed: Math.random() * 0.005 + 0.002,
          twinkleOffset: Math.random() * Math.PI * 2
        });
      }

      starClustersRef.current = clusters;
    };

    // Create shooting star
    const createShootingStar = () => {
      if (Math.random() < 0.995) return; // 0.5% chance per frame

      const startX = Math.random() * canvas.width;
      const startY = -10;
      const endX = startX + (Math.random() * 400 - 200);
      const endY = canvas.height + 10;

      shootingStarsRef.current.push({
        x: startX,
        y: startY,
        endX,
        endY,
        progress: 0,
        speed: Math.random() * 0.02 + 0.01,
        life: 0,
        maxLife: Math.random() * 60 + 30
      });
    };

    // Draw star cluster
    const drawStarCluster = (cluster: StarCluster) => {
      const twinkle = Math.sin(timeRef.current * cluster.twinkleSpeed + cluster.twinkleOffset);
      const currentOpacity = cluster.opacity * (0.5 + 0.5 * twinkle);
      
      ctx.save();
      ctx.globalAlpha = currentOpacity;
      
      // Create a subtle cluster of tiny stars
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const radius = cluster.size * (0.3 + Math.random() * 0.7);
        const x = cluster.x + Math.cos(angle) * radius;
        const y = cluster.y + Math.sin(angle) * radius;
        
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        ctx.beginPath();
        ctx.arc(x, y, 0.5, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.restore();
    };

    // Draw star
    const drawStar = (star: Star) => {
      const twinkle = Math.sin(timeRef.current * star.twinkleSpeed + star.twinkleOffset);
      const currentOpacity = star.opacity * (0.7 + 0.3 * twinkle);
      
      ctx.save();
      ctx.globalAlpha = currentOpacity;
      
      // Add glow for brighter stars
      if (star.opacity > 0.7) {
        const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 4);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${currentOpacity * 0.3})`);
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.fillRect(star.x - star.size * 4, star.y - star.size * 4, star.size * 8, star.size * 8);
      }
      
      // Draw star
      ctx.fillStyle = "white";
      ctx.beginPath();
      
      // Different star shapes based on size
      if (star.size < 1.5) {
        // Small circle stars
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      } else {
        // Larger cross/plus shaped stars
        const size = star.size;
        ctx.fillRect(star.x - size, star.y - size * 0.3, size * 2, size * 0.6);
        ctx.fillRect(star.x - size * 0.3, star.y - size, size * 0.6, size * 2);
      }
      
      ctx.fill();
      ctx.restore();
    };

    // Draw shooting star
    const drawShootingStar = (shootingStar: ShootingStar) => {
      const alpha = 1 - (shootingStar.life / shootingStar.maxLife);
      
      ctx.save();
      ctx.globalAlpha = alpha;
      
      // Main shooting star
      ctx.fillStyle = "white";
      ctx.shadowBlur = 10;
      ctx.shadowColor = "white";
      ctx.beginPath();
      ctx.arc(shootingStar.x, shootingStar.y, 2, 0, Math.PI * 2);
      ctx.fill();
      
      // Tail
      const tailX = shootingStar.x - (shootingStar.endX - shootingStar.x) * 0.1;
      const tailY = shootingStar.y - (shootingStar.endY - shootingStar.y) * 0.1;
      
      const gradient = ctx.createLinearGradient(shootingStar.x, shootingStar.y, tailX, tailY);
      gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
      gradient.addColorStop(1, "transparent");
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(shootingStar.x, shootingStar.y);
      ctx.lineTo(tailX, tailY);
      ctx.stroke();
      
      ctx.restore();
    };

    // Animation loop
    const animate = () => {
      timeRef.current += 1;
      
      // Clear canvas with galaxy background
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw star clusters
      starClustersRef.current.forEach(cluster => {
        // Subtle drift movement
        cluster.x += Math.sin(timeRef.current * 0.0001) * 0.05;
        cluster.y += Math.cos(timeRef.current * 0.0001) * 0.05;
        drawStarCluster(cluster);
      });
      
      // Update and draw stars
      starsRef.current.forEach(star => {
        // Subtle drift movement
        star.x += Math.sin(timeRef.current * star.speed + star.twinkleOffset) * 0.02;
        star.y += Math.cos(timeRef.current * star.speed * 0.7 + star.twinkleOffset) * 0.02;
        
        // Wrap around screen
        if (star.x < -10) star.x = canvas.width + 10;
        if (star.x > canvas.width + 10) star.x = -10;
        if (star.y < -10) star.y = canvas.height + 10;
        if (star.y > canvas.height + 10) star.y = -10;
        
        drawStar(star);
      });
      
      // Create new shooting stars
      createShootingStar();
      
      // Update and draw shooting stars
      shootingStarsRef.current = shootingStarsRef.current.filter(shootingStar => {
        shootingStar.progress += shootingStar.speed;
        shootingStar.life += 1;
        
        shootingStar.x = shootingStar.x + (shootingStar.endX - shootingStar.x) * shootingStar.progress * 0.1;
        shootingStar.y = shootingStar.y + (shootingStar.endY - shootingStar.y) * shootingStar.progress * 0.1;
        
        if (shootingStar.life < shootingStar.maxLife) {
          drawShootingStar(shootingStar);
          return true;
        }
        return false;
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Initialize and start animation
    initStars();
    initStarClusters();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-[-1]">
      {/* Canvas for animated elements */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      {/* Static gradient background */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: `
            radial-gradient(ellipse at center top, #23272f 0%, transparent 50%),
            radial-gradient(ellipse at center bottom, #181a1b 0%, transparent 50%),
            radial-gradient(ellipse at center, #44474a 0%, transparent 60%),
            linear-gradient(to bottom, #000000 0%, #23272f 30%, #23272f 60%, #181a1b 100%)
          `,
          zIndex: -1
        }}
      />
    </div>
  );
}
