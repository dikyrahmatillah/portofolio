import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Diky Rahmatillah",
  description: "Portfolio of Diky Rahmatillah",
  openGraph: {
    title: "Diky Rahmatillah",
    description: "Portfolio of Diky Rahmatillah",
    url: "https://dikyrahmatillah.com",
    siteName: "Diky Rahmatillah",
    images: [
      {
        url: "https://dikyrahmatillah.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Diky Rahmatillah Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Diky Rahmatillah",
    description: "Portfolio of Diky Rahmatillah",
    images: ["https://dikyrahmatillah.com/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-16x16.png",
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#5bbad5",
      },
    ],
  },
  themeColor: "#ffffff",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "https://dikyrahmatillah.com",
    languages: {
      "en-US": "https://dikyrahmatillah.com",
      "id-ID": "https://dikyrahmatillah.com/id",
    },
  },
  keywords: [
    "Diky Rahmatillah",
    "Portfolio",
    "Web Developer",
    "React Developer",
    "Front-End Developer",
    "Full-Stack Developer",
    "JavaScript",
    "TypeScript",
    "Next.js",
    "GSAP",
    "Tailwind CSS",
    "HTML",
    "CSS",
    "Git",
    "GitHub",
    "REST APIs",
    "Web Design",
    "Web Development",
    "Software Engineer",
    "UI/UX Designer",
    "Freelancer",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
