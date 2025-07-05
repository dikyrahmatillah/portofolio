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

function splitTextToSpans(text: string) {
  // Split by words, preserve spaces
  const words = text.split(/(\s+)/);
  return words.map((word, wIdx) => (
    <span key={wIdx} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
      {Array.from(word).map((char, cIdx) => (
        <span
          className="slide-char"
          style={{
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "top",
          }}
          key={cIdx}
        >
          <span className="slide-inner" style={{ display: "inline-block" }}>
            {char === " " ? "\u00A0" : char}
          </span>
        </span>
      ))}
    </span>
  ));
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
    const element = textRef.current;
    if (!element) return;
    // Animate all .slide-inner children
    const chars = Array.from(
      element.querySelectorAll<HTMLElement>(".slide-inner")
    );
    gsap.set(chars, { [direction]: direction === "x" ? distance : -distance });
    const trigger = ScrollTrigger.create({
      trigger: element,
      start: "top 90%",
      toggleActions: "play none none reverse",
    });
    const tween = gsap.to(chars, {
      [direction]: 0,
      duration,
      ease: "power4.out",
      delay: (i: number) => i * delay,
      scrollTrigger: trigger,
    });
    return () => {
      trigger.kill();
      tween.kill();
    };
  }, [duration, delay, direction, distance, children]);

  // Only support a single text node or string child
  let text = "";
  let tag: string = "span";
  let classNames = "";
  if (typeof children === "string") {
    text = children;
  } else if (
    React.isValidElement(children) &&
    typeof children.type === "string"
  ) {
    const childElement = children as React.ReactElement<{
      children?: React.ReactNode;
      className?: string;
    }>;
    text = (childElement.props.children as string) || "";
    tag = childElement.type as string;
    classNames =
      typeof childElement.props.className === "string"
        ? childElement.props.className
        : "";
  }
  return (
    <div ref={textRef} className={`slide-reveal-text ${className}`.trim()}>
      {React.createElement(
        tag,
        { className: classNames },
        splitTextToSpans(text)
      )}
    </div>
  );
};

export default SlideRevealText;
