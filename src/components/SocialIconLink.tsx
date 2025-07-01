import Link from "next/link";
import { ReactNode } from "react";

export function SocialIconLink({
  href,
  children,
  hoverBg,
}: {
  href: string;
  children: ReactNode;
  hoverBg: string;
}) {
  return (
    <Link
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className={`flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-white/20 backdrop-blur ${hoverBg}`}
    >
      {children}
    </Link>
  );
}
