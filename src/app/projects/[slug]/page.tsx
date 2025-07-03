// "use client";
// import { projects, Project } from "@/projects";
// import ProjectClient from "./page-client";
// import { useParams } from "next/navigation";

// export default function ProjectPage() {
//   const { slug } = useParams<{ slug: string }>();
//   const project = projects.find((p) => p.slug === slug);

//   const currentIndex = projects.findIndex((p) => p.slug === slug);
//   const nextIndex = (currentIndex + 1) % projects.length;
//   const prevIndex = (currentIndex - 1 + projects.length) % projects.length;

//   const nextProject = projects[nextIndex];
//   const prevProject = projects[prevIndex];

//   return (
//     <ProjectClient
//       project={project}
//       nextProject={nextProject}
//       prevProject={prevProject}
//     />
//   );
// }
