"use client";

import { useEffect, useCallback } from "react";
import { trackMemoryUsage } from "@/utils/performanceOptimizer";

interface PerformanceMetrics {
  fcp?: number;
  lcp?: number;
  cls?: number;
  ttfb?: number;
  loadTime?: number;
}

// Enhanced performance monitoring component
export default function PerformanceMonitor() {
  const logMetrics = useCallback((metrics: PerformanceMetrics) => {
    if (process.env.NODE_ENV === "development") {
      console.group("🔍 Performance Metrics");
      console.log("📊 Core Web Vitals:", {
        "First Contentful Paint": metrics.fcp
          ? `${metrics.fcp.toFixed(2)}ms`
          : "N/A",
        "Largest Contentful Paint": metrics.lcp
          ? `${metrics.lcp.toFixed(2)}ms`
          : "N/A",
        "Cumulative Layout Shift": metrics.cls ? metrics.cls.toFixed(4) : "N/A",
        "Time to First Byte": metrics.ttfb
          ? `${metrics.ttfb.toFixed(2)}ms`
          : "N/A",
        "Total Load Time": metrics.loadTime
          ? `${metrics.loadTime.toFixed(2)}ms`
          : "N/A",
      });

      trackMemoryUsage();
      console.groupEnd();
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const metrics: PerformanceMetrics = {};
    const observers: PerformanceObserver[] = [];

    // Navigation timing
    const navigationEntry = performance.getEntriesByType(
      "navigation"
    )[0] as PerformanceNavigationTiming;
    if (navigationEntry) {
      metrics.ttfb =
        navigationEntry.responseStart - navigationEntry.requestStart;
      metrics.loadTime =
        navigationEntry.loadEventEnd - navigationEntry.fetchStart;
    }

    try {
      // First Contentful Paint
      const paintObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (
            entry.entryType === "paint" &&
            entry.name === "first-contentful-paint"
          ) {
            metrics.fcp = entry.startTime;
            logMetrics(metrics);
          }
        });
      });
      paintObserver.observe({ entryTypes: ["paint"] });
      observers.push(paintObserver);

      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          metrics.lcp = entry.startTime;
          logMetrics(metrics);
        });
      });
      lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });
      observers.push(lcpObserver);

      // Cumulative Layout Shift
      const clsObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          const clsEntry = entry as PerformanceEntry & {
            hadRecentInput?: boolean;
            value?: number;
          };
          if (!clsEntry.hadRecentInput && clsEntry.value) {
            metrics.cls = (metrics.cls || 0) + clsEntry.value;
          }
        });
      });
      clsObserver.observe({ entryTypes: ["layout-shift"] });
      observers.push(clsObserver);
    } catch (error) {
      console.warn("Performance monitoring not fully supported:", error);
    }

    // Log initial metrics
    setTimeout(() => logMetrics(metrics), 2000);

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [logMetrics]);

  return null;
}
