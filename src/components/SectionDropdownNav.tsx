"use client";
import { useEffect, useState, useCallback, useMemo } from "react";
import { FaChevronDown } from "react-icons/fa";
import { throttle } from "@/utils/performanceOptimizer";

const sections = [
  { id: "hero", label: "Hero" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "portofolio", label: "Portfolio" },
  { id: "experience", label: "Experience" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
];

export default function SectionDropdownNav() {
  const [active, setActive] = useState<string>(sections[0].id);
  const [isOpen, setIsOpen] = useState(false);
  const [sectionProgress, setSectionProgress] = useState<
    Record<string, number>
  >({});

  // Memoize active section
  const activeSection = useMemo(
    () => sections.find((s) => s.id === active),
    [active]
  );

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(() => {
    const throttledHandler = throttle(() => {
      let current = sections[0].id;
      const progress: Record<string, number> = {};

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const sectionTop = window.scrollY + rect.top;
          const sectionHeight = rect.height;
          const viewportTop = window.scrollY;

          // Calculate progress for each section
          if (
            viewportTop >= sectionTop &&
            viewportTop <= sectionTop + sectionHeight
          ) {
            const scrolledInSection = viewportTop - sectionTop;
            progress[section.id] = Math.min(
              (scrolledInSection / sectionHeight) * 100,
              100
            );
          } else if (viewportTop > sectionTop + sectionHeight) {
            progress[section.id] = 100;
          } else {
            progress[section.id] = 0;
          }

          // Set active section
          if (window.scrollY >= sectionTop - 100) {
            current = section.id;
          }
        }
      }

      setActive(current);
      setSectionProgress(progress);
    }, 16); // ~60fps

    throttledHandler();
  }, []);

  const handleSectionClick = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 60, behavior: "smooth" });
      setIsOpen(false);
    }
  }, []);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <nav className="relative" role="navigation" aria-label="Section navigation">
      {/* Dropdown Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className="flex justify-between items-center w-full gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white shadow-lg transition-all duration-300 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 relative overflow-hidden
          sm:min-w-[140px] min-w-[100px] max-w-xs"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={`Current section: ${activeSection?.label}. Click to open navigation menu.`}
      >
        {/* Progress Bar Background */}
        <div
          className="absolute inset-0 bg-white/20 transition-all duration-300 ease-out"
          style={{
            width: `${sectionProgress[active] || 0}%`,
            transformOrigin: "left",
          }}
          aria-hidden="true"
        />

        <span className="font-medium relative z-10 truncate">
          {activeSection?.label}
        </span>
        <FaChevronDown
          className={`w-4 h-4 transition-transform duration-200 relative z-10 ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute top-full right-0 mt-2 w-64 max-w-[90vw] bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-xl z-50 overflow-hidden"
          role="menu"
          aria-label="Section navigation menu"
        >
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleSectionClick(section.id)}
              className={`relative px-4 py-3 cursor-pointer transition-all duration-200 hover:bg-white/20 w-full text-left ${
                active === section.id
                  ? "bg-white/20 text-white"
                  : "text-white/80 hover:text-white"
              }`}
              role="menuitem"
              aria-label={`Navigate to ${section.label} section. Progress: ${Math.round(sectionProgress[section.id] || 0)}%`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium truncate">{section.label}</span>
                <span className="text-xs text-white/60" aria-hidden="true">
                  {Math.round(sectionProgress[section.id] || 0)}%
                </span>
              </div>

              {/* Progress Bar */}
              <div
                className="mt-2 h-1 bg-white/20 rounded-full overflow-hidden"
                aria-hidden="true"
              >
                <div
                  className="h-full bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 ease-out origin-left"
                  style={{ width: `${sectionProgress[section.id] || 0}%` }}
                />
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Backdrop to close dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </nav>
  );
}
