"use client";

import React from "react";
import { useCursor } from "@/hooks/useCursor";

const Cursor: React.FC = () => {
  const { canvasRef, cursorRef, cursor, active, desktop, mouseInitialized } =
    useCursor();

  if (!active || !desktop || !mouseInitialized) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed left-0 top-0 w-full h-full pointer-events-none z-[998] bg-transparent block"
        tabIndex={-1}
      />
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[999]"
        style={{
          left: cursor.x,
          top: cursor.y,
          transform: `translate3d(-50%, -50%, 0) scale(${cursor.scale})`,
          filter: cursor.filter,
          transition: "none",
        }}
      >
        {/* Outer glow ring */}
        <div
          className="absolute top-1/2 left-1/2 w-12 h-12 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(230,240,255,0.2) 25%, rgba(200,220,255,0.1) 50%, rgba(150,190,255,0.05) 75%, transparent 100%)",
            animation: "glowPulse 2s ease-in-out infinite",
          }}
        />
        {/* Star glow */}
        <div
          className="absolute top-1/2 left-1/2 w-7 h-7 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(230,240,255,0.3) 25%, rgba(200,220,255,0.2) 50%, rgba(150,190,255,0.1) 75%, transparent 100%)",
            animation: "starTwinkle 3s ease-in-out infinite",
          }}
        />
        {/* Star core */}
        <div
          className="absolute top-1/2 left-1/2 w-2.5 h-2.5 rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.95) 40%, rgba(230,240,255,0.8) 70%, rgba(200,220,255,0.6) 100%)",
            boxShadow:
              "0 0 8px rgba(255,255,255,1), 0 0 16px rgba(255,255,255,0.8), 0 0 24px rgba(200,220,255,0.6), 0 0 32px rgba(180,200,255,0.4)",
            animation: "corePulse 2.5s ease-in-out infinite",
          }}
        />
        {/* Central bright dot */}
        <div
          className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{
            background: "rgba(255,255,255,1)",
            boxShadow:
              "0 0 4px rgba(255,255,255,1), 0 0 8px rgba(255,255,255,0.8)",
          }}
        />
      </div>
    </>
  );
};

export default React.memo(Cursor);
