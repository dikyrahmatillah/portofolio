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

// Intersection Observer for lazy loading
export const createIntersectionObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
) => {
  return new IntersectionObserver(callback, {
    rootMargin: "50px",
    threshold: 0.1,
    ...options,
  });
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
