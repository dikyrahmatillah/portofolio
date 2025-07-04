import { SkillImage } from "@/app/types/skill";
import Image from "next/image";
import { memo } from "react";

interface SkillImages3DProps {
  skillImages: SkillImage[];
  imageCardRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  isLarge: boolean;
}

// Memoize component to prevent unnecessary re-renders
const SkillImages3D = memo(function SkillImages3D({
  skillImages,
  imageCardRefs,
  isLarge,
}: SkillImages3DProps) {
  return (
    <div className="absolute top-1/2 left-1/2 w-[200vw] h-[200vh] -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d] [perspective:500px]">
      {skillImages.map((item, idx) => (
        <div
          key={item.name}
          ref={(el) => {
            imageCardRefs.current[idx] = el;
          }}
          className="absolute flex items-center justify-center"
          style={{
            width: isLarge ? 300 : 120,
            height: isLarge ? 300 : 120,
            borderRadius: "1rem",
            overflow: "hidden",
            willChange: "transform, opacity",
          }}
        >
          <div className="absolute inset-0 bg-white/70 dark:bg-white/30 rounded-xl pointer-events-none" />
          <Image
            src={item.image}
            alt={`skill image ${item.name}`}
            width={item.width}
            height={item.height}
            className="w-full h-full object-contain relative z-10"
            priority={idx < 3} // Prioritize first 3 images
            sizes={isLarge ? "300px" : "120px"}
            quality={80} // Reduce quality for better performance
          />
        </div>
      ))}
    </div>
  );
});

export default SkillImages3D;
