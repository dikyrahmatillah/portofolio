// Performance optimization utilities

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Debounce function for scroll events
export const debounce = <T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
) => {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle function for frequent events
export const throttle = <T extends (...args: unknown[]) => void>(
  func: T,
  limit: number
) => {
  let inThrottle: boolean;
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Optimized RAF for GSAP animations
export const optimizedRAF = (callback: (time: number) => void) => {
  let isRunning = false;
  let animationId: number;

  const tick = (time: number) => {
    if (isRunning) {
      callback(time);
      animationId = requestAnimationFrame(tick);
    }
  };

  return {
    start: () => {
      if (!isRunning) {
        isRunning = true;
        animationId = requestAnimationFrame(tick);
      }
    },
    stop: () => {
      isRunning = false;
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    },
  };
};

// Intersection Observer utility for lazy loading
export const createIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {}
): IntersectionObserver => {
  const defaultOptions: IntersectionObserverInit = {
    rootMargin: "10px",
    threshold: 0.1,
    ...options,
  };

  return new IntersectionObserver(callback, defaultOptions);
};

// Image optimization utility
export const getOptimizedImageSrc = (
  src: string,
  width?: number,
  quality = 75
): string => {
  // If using Next.js Image component, this would be handled automatically
  // For manual optimization, you could integrate with image CDN services
  const params = new URLSearchParams();

  if (width) params.set("w", width.toString());
  params.set("q", quality.toString());

  return src.includes("?") ? `${src}&${params}` : `${src}?${params}`;
};

// Resource preloader
export const preloadResources = async (urls: string[]): Promise<void> => {
  const promises = urls.map((url) => {
    if (url.match(/\.(jpg|jpeg|png|webp|gif)$/i)) {
      return preloadImage(url);
    } else {
      return fetch(url, { mode: "no-cors" });
    }
  });

  try {
    await Promise.allSettled(promises);
  } catch (error) {
    console.warn("Some resources failed to preload:", error);
  }
};

// Performance measurement utility
export const measurePerformance = (name: string, fn: () => void): void => {
  if (typeof window !== "undefined" && window.performance) {
    const start = performance.now();
    fn();
    const end = performance.now();
    console.log(`${name} took ${end - start} milliseconds`);
  } else {
    fn();
  }
};

// Memory usage tracker (for development)
export const trackMemoryUsage = (): void => {
  if (
    typeof window !== "undefined" &&
    "memory" in performance &&
    process.env.NODE_ENV === "development"
  ) {
    const memory = (
      performance as typeof performance & {
        memory: {
          usedJSHeapSize: number;
          totalJSHeapSize: number;
          jsHeapSizeLimit: number;
        };
      }
    ).memory;
    console.log("Memory usage:", {
      used: `${Math.round(memory.usedJSHeapSize / 1024 / 1024)} MB`,
      total: `${Math.round(memory.totalJSHeapSize / 1024 / 1024)} MB`,
      limit: `${Math.round(memory.jsHeapSizeLimit / 1024 / 1024)} MB`,
    });
  }
};

// Optimized scroll listener
export const addOptimizedScrollListener = (
  callback: () => void,
  options: { throttle?: number; passive?: boolean } = {}
): (() => void) => {
  const { throttle: throttleMs = 16, passive = true } = options;
  const throttledCallback = throttle(callback, throttleMs);

  window.addEventListener("scroll", throttledCallback, { passive });

  return () => {
    window.removeEventListener("scroll", throttledCallback);
  };
};

// GSAP performance settings
export const configureGSAPPerformance = () => {
  gsap.config({
    force3D: true,
    nullTargetWarn: false,
  });

  // Set default properties for better performance
  gsap.defaults({
    ease: "power2.out",
    duration: 0.6,
  });
};

// Memory cleanup utility
export const cleanupScrollTriggers = (triggers: ScrollTrigger[]) => {
  triggers.forEach((trigger) => {
    if (trigger && typeof trigger.kill === "function") {
      trigger.kill();
    }
  });
  triggers.length = 0;
};

// Image preloader with WebP support
export const preloadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

// Check WebP support
export const supportsWebP = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => resolve(webP.height === 2);
    webP.src =
      "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
  });
};
