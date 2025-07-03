import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: "Diky Rahmatillah",
    description: "Portfolio of Diky Rahmatillah",
    url: "https://dikyrahmatillah.com",
    siteName: "Diky Rahmatillah",
    images: [
      {
        url: "/diky-rahmatillah.jpg",
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
    images: "/diky-rahmatillah.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
