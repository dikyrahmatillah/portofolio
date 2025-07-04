import { lazy, Suspense } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";

// Lazy load page components with better chunk names
const Hero = lazy(() =>
  import("@/app/hero/page").then((module) => ({ default: module.default }))
);
const About = lazy(() =>
  import("@/app/about/page").then((module) => ({ default: module.default }))
);
const Skills = lazy(() =>
  import("@/app/skills/page").then((module) => ({ default: module.default }))
);
const Portfolio = lazy(() =>
  import("@/app/portofolio/page").then((module) => ({
    default: module.default,
  }))
);
const Experience = lazy(() =>
  import("@/app/experience/page").then((module) => ({
    default: module.default,
  }))
);
const Testimonials = lazy(() =>
  import("@/app/testimonials/page").then((module) => ({
    default: module.default,
  }))
);
const Contact = lazy(() =>
  import("@/app/contact/page").then((module) => ({ default: module.default }))
);

// Optimized loading component with better accessibility
const SectionLoadingSpinner = ({ sectionName }: { sectionName: string }) => (
  <div
    className="flex items-center justify-center h-screen"
    role="status"
    aria-label={`Loading ${sectionName} section`}
  >
    <div className="relative">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      <span className="sr-only">Loading {sectionName}...</span>
    </div>
  </div>
);

// Individual section wrapper with improved semantics
const SectionWrapper = ({
  children,
  sectionName,
  ariaLabel,
}: {
  children: React.ReactNode;
  sectionName: string;
  ariaLabel: string;
}) => (
  <ErrorBoundary fallback={<div>Error loading {sectionName}</div>}>
    <Suspense fallback={<SectionLoadingSpinner sectionName={sectionName} />}>
      <section aria-label={ariaLabel}>{children}</section>
    </Suspense>
  </ErrorBoundary>
);

export default function MainContent() {
  return (
    <main role="main" className="relative">
      <SectionWrapper
        sectionName="Hero"
        ariaLabel="Hero section with introduction"
      >
        <Hero />
      </SectionWrapper>

      <SectionWrapper
        sectionName="About"
        ariaLabel="About section with personal information"
      >
        <About />
      </SectionWrapper>

      <SectionWrapper
        sectionName="Skills"
        ariaLabel="Skills section showcasing technical abilities"
      >
        <Skills />
      </SectionWrapper>

      <SectionWrapper
        sectionName="Portfolio"
        ariaLabel="Portfolio section with project showcase"
      >
        <Portfolio />
      </SectionWrapper>

      <SectionWrapper
        sectionName="Experience"
        ariaLabel="Experience section with work history"
      >
        <Experience />
      </SectionWrapper>

      <SectionWrapper
        sectionName="Testimonials"
        ariaLabel="Testimonials section with client feedback"
      >
        <Testimonials />
      </SectionWrapper>

      <SectionWrapper
        sectionName="Contact"
        ariaLabel="Contact section with communication options"
      >
        <Contact />
      </SectionWrapper>
    </main>
  );
}
