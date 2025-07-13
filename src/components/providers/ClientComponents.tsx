"use client";

import { lazy, Suspense } from "react";

const Cursor = lazy(() => import("@/components/cursor/Cursor"));
const CanvasGalaxyBackground = lazy(
  () => import("@/components/background/GalaxyBackground")
);

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-20">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
  </div>
);

export default function ClientComponents() {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <CanvasGalaxyBackground />
        <Cursor />
      </Suspense>
    </>
  );
}
