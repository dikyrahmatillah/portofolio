"use client";

import { lazy, Suspense } from "react";
import PerformanceMonitor from "@/components/PerformanceMonitor";

// Lazy load client components
const Cursor = lazy(() => import("@/components/cursor/cursor"));

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-20">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
  </div>
);

export default function ClientComponents() {
  return (
    <>
      <PerformanceMonitor />
      <Suspense fallback={<LoadingSpinner />}>
        <Cursor />
      </Suspense>
    </>
  );
}
