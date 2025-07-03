"use client";
import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const sections = [
  { id: "hero", label: "Hero" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "portfolio", label: "Portfolio" },
  { id: "experience", label: "Experience" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
];

export default function SectionDropdownNav() {
  const [active, setActive] = useState(sections[0].id);
  const [isOpen, setIsOpen] = useState(false);
  const [sectionProgress, setSectionProgress] = useState<
    Record<string, number>
  >({});

  useEffect(() => {
    const handleScroll = () => {
      let current = sections[0].id;
      const progress: Record<string, number> = {};

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const sectionTop = window.scrollY + rect.top;
          const sectionHeight = rect.height;
          const viewportTop = window.scrollY;
          // const viewportBottom = window.scrollY + window.innerHeight;

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
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSectionClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 60, behavior: "smooth" });
      setIsOpen(false);
    }
  };

  const activeSection = sections.find((s) => s.id === active);

  return (
    <div className="relative">
      {/* Dropdown Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white shadow-lg transition-all duration-300 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 relative overflow-hidden
          sm:min-w-[140px] min-w-[100px] max-w-xs"
      >
        {/* Progress Bar Background */}
        <div
          className="absolute inset-0 bg-white/20 transition-all duration-300 ease-out"
          style={{
            width: `${sectionProgress[active] || 0}%`,
            transformOrigin: "left",
          }}
        />

        <span className="font-medium relative z-10 truncate">
          {activeSection?.label}
        </span>
        <FaChevronDown
          className={`w-4 h-4 transition-transform duration-200 relative z-10 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 max-w-[90vw] bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-xl z-50 overflow-hidden">
          {sections.map((section) => (
            <div
              key={section.id}
              onClick={() => handleSectionClick(section.id)}
              className={`relative px-4 py-3 cursor-pointer transition-all duration-200 hover:bg-white/20 ${
                active === section.id
                  ? "bg-white/20 text-white"
                  : "text-white/80 hover:text-white"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium truncate">{section.label}</span>
                <span className="text-xs text-white/60">
                  {Math.round(sectionProgress[section.id] || 0)}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mt-2 h-1 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 ease-out origin-left"
                  style={{ width: `${sectionProgress[section.id] || 0}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Backdrop to close dropdown */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
}
