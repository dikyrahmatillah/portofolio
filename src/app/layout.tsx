import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Diky Rahmatillah - Full Stack Developer & UI/UX Designer",
  description:
    "Portfolio of Diky Rahmatillah - Experienced Full Stack Developer specializing in modern web technologies, React, Next.js, and innovative UI/UX design solutions.",
  keywords: [
    "Diky Rahmatillah",
    "Full Stack Developer",
    "React",
    "Next.js",
    "UI/UX Designer",
    "Portfolio",
    "Web Development",
  ],
  authors: [{ name: "Diky Rahmatillah" }],
  creator: "Diky Rahmatillah",
  publisher: "Diky Rahmatillah",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Diky Rahmatillah - Full Stack Developer & UI/UX Designer",
    description:
      "Portfolio of Diky Rahmatillah - Experienced Full Stack Developer specializing in modern web technologies, React, Next.js, and innovative UI/UX design solutions.",
    url: "https://dikyrahmatillah.com",
    siteName: "Diky Rahmatillah Portfolio",
    images: [
      {
        url: "/diky-rahmatillah.jpg",
        width: 1200,
        height: 630,
        alt: "Diky Rahmatillah - Full Stack Developer Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Diky Rahmatillah - Full Stack Developer & UI/UX Designer",
    description:
      "Portfolio of Diky Rahmatillah - Experienced Full Stack Developer specializing in modern web technologies, React, Next.js, and innovative UI/UX design solutions.",
    images: "/diky-rahmatillah.jpg",
    creator: "@dikyrahmatillah",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="dark light" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden bg-black text-white selection:bg-white/20`}
        suppressHydrationWarning
      >
        <ToastContainer
          theme="dark"
          position="top-center"
          toastClassName="backdrop-blur-md"
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {children}
      </body>
    </html>
  );
}
