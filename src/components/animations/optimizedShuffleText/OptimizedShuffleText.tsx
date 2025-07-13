"use client";

import { useEffect, useRef, useState, memo } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

interface OptimizedShuffleTextProps {
  text: string;
  as?: React.ElementType;
  className?: string;
  triggerOnScroll?: boolean;
  duration?: number;
  [key: string]: unknown;
}

const OptimizedShuffleText = memo(function OptimizedShuffleText({
  text,
  as: Component = "div",
  className = "",
  triggerOnScroll = false,
  duration = 1,
  ...props
}: OptimizedShuffleTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [currentText, setCurrentText] = useState(text);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const checkSize = () => {
      setIsDesktop(window.innerWidth > 900);
    };

    checkSize();

    let resizeTimeout: NodeJS.Timeout;

    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkSize, 150);
    };

    window.addEventListener("resize", debouncedResize);
    return () => {
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  useEffect(() => {
    if (!isDesktop || !containerRef.current) {
      setCurrentText(text);
      return;
    }

    const container = containerRef.current;

    // Clean up previous animations
    if (animationRef.current) {
      animationRef.current.kill();
    }
    if (scrollTriggerRef.current) {
      scrollTriggerRef.current.kill();
    }

    const animateText = () => {
      // More efficient animation using CSS transform instead of DOM manipulation
      const chars = ["+", "-", ".", "*", "#", "&"];
      const originalText = text;
      let progress = 0;

      animationRef.current = gsap.to(
        { progress: 0 },
        {
          progress: 1,
          duration: duration,
          ease: "power2.out",
          onUpdate: function () {
            progress = this.progress();

            // Only shuffle characters that haven't been revealed yet
            const revealedLength = Math.floor(originalText.length * progress);
            let displayText = originalText.slice(0, revealedLength);

            // Add shuffled characters for unrevealed portion
            for (let i = revealedLength; i < originalText.length; i++) {
              if (originalText[i] === " ") {
                displayText += " ";
              } else {
                displayText += chars[Math.floor(Math.random() * chars.length)];
              }
            }

            setCurrentText(displayText);
          },
          onComplete: () => {
            setCurrentText(originalText);
          },
        }
      );
    };

    // Set initial opacity
    gsap.set(container, { opacity: 0 });

    if (triggerOnScroll) {
      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: container,
        start: "top bottom-=100",
        onEnter: () => {
          gsap.to(container, { opacity: 1, duration: 0.3 });
          animateText();
        },
        once: true,
      });
    } else {
      gsap.to(container, { opacity: 1, duration: 0.3 });
      animateText();
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
    };
  }, [text, triggerOnScroll, isDesktop, duration]);

  return (
    <Component
      ref={containerRef}
      className={`optimized-shuffle-text ${className}`.trim()}
      {...props}
    >
      {currentText}
    </Component>
  );
});

export default OptimizedShuffleText;
