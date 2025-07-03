// "use client";
// import gsap from "gsap";
// import ReactLenis from "lenis/react";
// import Link from "next/link";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useEffect, useRef, useState } from "react";
// import "./project.css";

// type ProjectClientProps = {
//   project: any;
//   nextProject: any;
//   prevProject: any;
// };

// export default function ProjectClient({
//   project,
//   nextProject,
//   prevProject,
// }: ProjectClientProps) {
//   const projectNavRef = useRef(null);
//   const progressBarRef = useRef(null);
//   const projectDescriptionRef = useRef(null);
//   const projectRef = useRef(null);
//   const nextProjectProgressBarRef = useRef<HTMLDivElement>(null);
//   const footerRef = useRef<HTMLDivElement>(null);
//   const [isTransitioning, setIsTransitioning] = useState(false);
//   const [shouldUpdateProgress, setShouldUpdateProgress] = useState(true);
//   useEffect(() => {
//     gsap.registerPlugin(ScrollTrigger);

//     // Initialize progress bars
//     gsap.set([progressBarRef.current, nextProjectProgressBarRef.current], {
//       scaleX: 0,
//     });

//     gsap.set(projectNavRef.current, {
//       opacity: 0,
//       y: -100,
//     });

//     gsap.to(projectNavRef.current, {
//       opacity: 1,
//       y: 0,
//       duration: 1,
//       delay: 0.25,
//       ease: "power2.out",
//     });

//     gsap.set(projectDescriptionRef.current, {
//       opacity: 0,
//       y: 100,
//     });

//     gsap.to(projectDescriptionRef.current, {
//       opacity: 1,
//       y: 50,
//       duration: 1,
//       delay: 0.5,
//       ease: "power3.out",
//     });
//     const navScrollTrigger = ScrollTrigger.create({
//       trigger: document.body,
//       start: "top top",
//       end: "max",
//       invalidateOnRefresh: true,
//       onUpdate: (self) => {
//         if (progressBarRef.current) {
//           gsap.set(progressBarRef.current, {
//             scaleX: self.progress,
//           });
//         }
//       },
//     });

//     const footerScrollTrigger = ScrollTrigger.create({
//       trigger: footerRef.current,
//       start: "top top",
//       end: `+=${window.innerHeight / 2}px`,
//       pin: true,
//       pinSpacing: true,
//       onEnter: () => {
//         if (projectNavRef.current && !isTransitioning) {
//           gsap.to(projectNavRef.current, {
//             y: -100,
//             duration: 0.5,
//             ease: "power2.inOut",
//           });
//         }
//       },
//       onLeaveBack: () => {
//         if (projectNavRef.current && !isTransitioning) {
//           gsap.to(projectNavRef.current, {
//             y: 0,
//             duration: 0.5,
//             ease: "power2.inOut",
//           });
//         }
//       },
//       onUpdate: (self) => {
//         if (nextProjectProgressBarRef.current && shouldUpdateProgress) {
//           gsap.set(nextProjectProgressBarRef.current, {
//             scaleX: self.progress,
//           });
//         }
//         if (self.progress >= 1 && !isTransitioning) {
//           setShouldUpdateProgress(false);
//           setIsTransitioning(true);
//           const t1 = gsap.timeline();
//           t1.set(nextProjectProgressBarRef.current, {
//             scaleX: 1,
//           });
//           t1.to(
//             [
//               footerRef.current?.querySelector(".project-footer-copy"),
//               footerRef.current?.querySelector(".next-project-progress"),
//             ],
//             {
//               opacity: 0,
//               duration: 0.3,
//               ease: "power2.inOut",
//             }
//           );
//           t1.call(() => {
//             window.location.href = `/projects/${nextProject.slug}`;
//           });
//         }
//       },
//     });

//     return () => {
//       ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
//     };
//   }, [nextProject.slug, isTransitioning, shouldUpdateProgress]);

//   return (
//     <ReactLenis root>
//       <div className="project-page">
//         <div className="project-nav" ref={projectNavRef}>
//           <div className="link">
//             <span>←</span>
//             <Link href={`/projects/${prevProject.slug}`}>
//               {prevProject.title}
//             </Link>
//           </div>
//           <div className="project-page-scroll-progress">
//             <p>{project.title}</p>
//             <div
//               className="project-page-scroll-progress-bar"
//               ref={progressBarRef}
//             ></div>
//           </div>
//           <div className="link">
//             <Link href={`/projects/${nextProject.slug}`}>
//               {nextProject.title}
//             </Link>
//             <span>→</span>
//           </div>
//         </div>
//         <div className="project-hero">
//           <h1>{project.title}</h1>
//           <p id="project-description" ref={projectDescriptionRef}>
//             {project.description}
//           </p>
//         </div>
//         <div className="project-images" ref={projectRef}>
//           {project.images.map((image: string, index: number) => (
//             <div className="project-img" key={index}>
//               <img src={image} alt={`${project.title} image ${index + 1}`} />
//             </div>
//           ))}
//           <div className="project-footer" ref={footerRef}>
//             <h1>{nextProject.title}</h1>
//             <div className="project-footer-copy">
//               <p>Next Project</p>
//             </div>
//             <div className="next-project-progress">
//               <div
//                 className="next-project-progress-bar"
//                 ref={nextProjectProgressBarRef}
//               ></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </ReactLenis>
//   );
// }
