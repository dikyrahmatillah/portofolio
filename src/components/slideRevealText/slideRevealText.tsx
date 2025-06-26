"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./slideRevealText.css";

gsap.registerPlugin(ScrollTrigger);

interface SlideRevealTextProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  direction?: "x" | "y";
  distance?: number;
}

const SlideRevealText: React.FC<SlideRevealTextProps> = ({
  children,
  className = "",
  duration = 1,
  delay = 0.05,
  direction = "x",
  distance = 100,
}) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const element = textRef.current;

    const firstChild = element.firstElementChild as HTMLElement;
    let originalStyles: CSSStyleDeclaration | null = null;
    let originalTagName = "span";

    if (firstChild) {
      originalStyles = window.getComputedStyle(firstChild);
      originalTagName = firstChild.tagName.toLowerCase();
    }

    const text = element.innerText;

    element.innerHTML = "";
    const styledWrapper = document.createElement(originalTagName);
    if (firstChild) {
      styledWrapper.className = firstChild.className;
      if (firstChild.style.cssText) {
        styledWrapper.style.cssText = firstChild.style.cssText;
      }
    }

    const chars: HTMLElement[] = [];

    text.split("").forEach((char, index) => {
      const span = document.createElement("span");
      span.className = "slide-char";
      span.style.display = "inline-block";
      span.style.overflow = "hidden";
      span.style.verticalAlign = "top";

      const inner = document.createElement("span");
      inner.textContent = char === " " ? "\u00A0" : char;
      inner.style.display = "inline-block";

      gsap.set(inner, {
        [direction]: direction === "x" ? distance : -distance,
      });

      span.appendChild(inner);
      styledWrapper.appendChild(span);
      chars.push(inner);
    });

    element.appendChild(styledWrapper);

    gsap.to(chars, {
      [direction]: 0,
      duration: duration,
      ease: "power4.out",
      delay: (index) => index * delay,
      scrollTrigger: {
        trigger: element,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [duration, delay, direction, distance]);

  return (
    <div ref={textRef} className={`slide-reveal-text ${className}`.trim()}>
      {children}
    </div>
  );
};

export default SlideRevealText;
