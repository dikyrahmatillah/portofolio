import { SkillItem } from "@/app/types/skill";
import SlideRevealText from "@/components/slideRevealText/slideRevealText";

export default function SkillTitles({
  skills,
  skillTitlesRef,
}: {
  skills: SkillItem[];
  skillTitlesRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      className="relative flex flex-col gap-2 sm:flex-row h-[60vh] sm:h-screen w-full sm:w-[500vw] will-change-transform"
      ref={skillTitlesRef}
    >
      {skills.map((item, i) => (
        <div
          key={i}
          className={`flex-1 flex flex-col justify-center items-center px-4 ${
            item.type === "title" ? "" : "text-base sm:text-2xl md:text-4xl"
          }`}
        >
          {item.type === "title" ? (
            <h1 className="text-center text-2xl sm:text-4xl md:text-6xl translate-y-10 font-bold mb-2">
              {item.text}
            </h1>
          ) : (
            <SlideRevealText>
              <h2 className="text-center">{item.text}</h2>
            </SlideRevealText>
          )}
        </div>
      ))}
    </div>
  );
}
