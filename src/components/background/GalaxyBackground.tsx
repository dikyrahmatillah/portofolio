"use client";

import useGalaxyAnimation from "@/hooks/useGalaxyAnimation";
import { useRef } from "react";

export default function CanvasGalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useGalaxyAnimation(canvasRef);

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
