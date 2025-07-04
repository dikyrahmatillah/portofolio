"use client";

import { useEffect } from "react";

interface PerformanceMetrics {
  fcp?: number;
  lcp?: number;
  fid?: number;
  cls?: number;
  ttfb?: number;
}

interface ExtendedPerformanceEntry extends PerformanceEntry {
  processingStart?: number;
  hadRecentInput?: boolean;
  value?: number;
}

interface MemoryInfo {
  usedJSHeapSize: number;
  totalJSHeapSize: number;
  jsHeapSizeLimit: number;
}

interface ExtendedPerformance extends Performance {
  memory?: MemoryInfo;
}

export default function PerformanceMonitor() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const metrics: PerformanceMetrics = {};

    // First Contentful Paint (FCP)
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (
          entry.entryType === "paint" &&
          entry.name === "first-contentful-paint"
        ) {
          metrics.fcp = entry.startTime;
          console.log("FCP:", entry.startTime);
        }
      });
    });
    observer.observe({ entryTypes: ["paint"] });

    // Largest Contentful Paint (LCP)
    const lcpObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === "largest-contentful-paint") {
          metrics.lcp = entry.startTime;
          console.log("LCP:", entry.startTime);
        }
      });
    });
    lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });

    // First Input Delay (FID)
    const fidObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === "first-input") {
          const extendedEntry = entry as ExtendedPerformanceEntry;
          if (extendedEntry.processingStart) {
            metrics.fid = extendedEntry.processingStart - entry.startTime;
            console.log("FID:", metrics.fid);
          }
        }
      });
    });
    fidObserver.observe({ entryTypes: ["first-input"] });

    // Cumulative Layout Shift (CLS)
    let cumulativeLayoutShift = 0;
    const clsObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        const extendedEntry = entry as ExtendedPerformanceEntry;
        if (
          entry.entryType === "layout-shift" &&
          !extendedEntry.hadRecentInput
        ) {
          if (extendedEntry.value) {
            cumulativeLayoutShift += extendedEntry.value;
          }
        }
      });
      metrics.cls = cumulativeLayoutShift;
      console.log("CLS:", cumulativeLayoutShift);
    });
    clsObserver.observe({ entryTypes: ["layout-shift"] });

    // Time to First Byte (TTFB)
    if ("navigation" in performance) {
      const navigationEntry = performance.getEntriesByType(
        "navigation"
      )[0] as PerformanceNavigationTiming;
      if (navigationEntry) {
        metrics.ttfb =
          navigationEntry.responseStart - navigationEntry.requestStart;
        console.log("TTFB:", metrics.ttfb);
      }
    }

    // Memory usage monitoring (if available)
    const extendedPerformance = performance as ExtendedPerformance;
    if (extendedPerformance.memory) {
      const memoryInfo = extendedPerformance.memory;
      console.log(
        "Memory Usage:",
        {
          used: Math.round(memoryInfo.usedJSHeapSize / 1048576),
          total: Math.round(memoryInfo.totalJSHeapSize / 1048576),
          limit: Math.round(memoryInfo.jsHeapSizeLimit / 1048576),
        },
        "MB"
      );
    }

    // Bundle size monitoring
    if ("getEntriesByType" in performance) {
      const resourceEntries = performance.getEntriesByType(
        "resource"
      ) as PerformanceResourceTiming[];
      const jsFiles = resourceEntries.filter(
        (entry) =>
          entry.name.includes(".js") &&
          (entry.name.includes("_next") || entry.name.includes("chunks"))
      );

      const totalJSSize = jsFiles.reduce((total, entry) => {
        return total + (entry.transferSize || 0);
      }, 0);

      console.log(
        "Total JS Bundle Size:",
        Math.round(totalJSSize / 1024),
        "KB"
      );
    }

    return () => {
      observer.disconnect();
      lcpObserver.disconnect();
      fidObserver.disconnect();
      clsObserver.disconnect();
    };
  }, []);

  // Only render in development
  if (process.env.NODE_ENV === "production") {
    return null;
  }

  return null;
}
