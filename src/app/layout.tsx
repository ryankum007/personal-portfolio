import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/layout/CustomCursor";
import Preloader from "@/components/layout/Preloader";
import Navigation from "@/components/layout/Navigation";
import JsonLd from "@/components/layout/JsonLd";
import ScrollProgress from "@/components/layout/ScrollProgress";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const siteUrl = "https://ryankumar.net";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ryan Kumar — Software Engineer",
    template: "%s | Ryan Kumar",
  },
  description:
    "Portfolio of Ryan Kumar, a software engineer passionate about innovation in medical and financial technology. McMaster University B.Eng.",
  keywords: [
    "Ryan Kumar",
    "Software Engineer",
    "McMaster University",
    "Full Stack Developer",
    "React",
    "Next.js",
    "Java",
    "Python",
    "Portfolio",
  ],
  authors: [{ name: "Ryan Kumar", url: siteUrl }],
  creator: "Ryan Kumar",
  openGraph: {
    title: "Ryan Kumar — Software Engineer",
    description:
      "Driven software engineer building impactful solutions in healthcare and fintech.",
    url: siteUrl,
    siteName: "Ryan Kumar",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ryan Kumar — Software Engineer",
    description:
      "Driven software engineer building impactful solutions in healthcare and fintech.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="grain min-h-full">
        <JsonLd />
        <ScrollProgress />
        <Preloader />
        <CustomCursor />
        <Navigation />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
