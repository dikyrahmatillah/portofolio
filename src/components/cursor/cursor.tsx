import React, { useEffect, useRef } from "react";
import "./cursor.css";
import gsap from "gsap";
import { MdOutlineArrowOutward } from "react-icons/md";

const Cursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const icon = iconRef.current;
    const projects = document.querySelectorAll<HTMLElement>(".project");

    if (!cursor || !icon) return;

    console.log("Cursor component mounted", {
      cursor,
      icon,
      projectsCount: projects.length,
    });

    // Initial setup
    gsap.set(cursor, {
      scale: 0.1,
      opacity: 1,
      x: 100,
      y: 100,
    });

    gsap.set(icon, {
      scale: 0,
    });

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseEnter = () => {
      console.log("Mouse entered project");
      gsap.to(cursor, {
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(icon, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      console.log("Mouse left project");
      gsap.to(cursor, {
        scale: 0.1,
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(icon, {
        scale: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    projects.forEach((project) => {
      project.addEventListener("mouseenter", handleMouseEnter);
      project.addEventListener("mouseleave", handleMouseLeave);
    });

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      projects.forEach((project) => {
        project.removeEventListener("mouseenter", handleMouseEnter);
        project.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <div className="cursor" ref={cursorRef}>
      <div className="cursor-icon" ref={iconRef}>
        <MdOutlineArrowOutward size={28} />
      </div>
    </div>
  );
};

export default Cursor;
