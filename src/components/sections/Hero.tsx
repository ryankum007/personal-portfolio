"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteContent } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
});

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const basedRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const [showScene, setShowScene] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    setIsMobile(mobile);
    if (!mobile) {
      const timer = setTimeout(() => setShowScene(true), 3800);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    if (!section || !title) return;

    const tl = gsap.timeline({ delay: 3 });

    // Title chars reveal
    const chars = title.querySelectorAll(".hero-char");
    tl.from(chars, {
      y: "100%",
      duration: 1,
      stagger: 0.02,
      ease: "power4.out",
    });

    // Services list
    if (servicesRef.current) {
      const items = servicesRef.current.querySelectorAll("p");
      tl.from(
        items,
        { y: 30, opacity: 0, duration: 0.6, stagger: 0.08, ease: "power3.out" },
        "-=0.5"
      );
    }

    // Based in text
    if (basedRef.current) {
      tl.from(
        basedRef.current,
        { opacity: 0, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      );
    }

    // Photo reveal
    if (photoRef.current) {
      tl.from(
        photoRef.current,
        {
          clipPath: "inset(100% 0% 0% 0%)",
          duration: 1.2,
          ease: "power4.inOut",
        },
        "-=0.8"
      );
    }

    // Bio + CTAs
    if (bioRef.current) {
      tl.from(bioRef.current, { y: 20, opacity: 0, duration: 0.6 }, "-=0.4");
    }
    if (ctaRef.current) {
      const links = ctaRef.current.querySelectorAll("a");
      tl.from(links, { y: 20, opacity: 0, stagger: 0.1, duration: 0.5 }, "-=0.3");
    }

    // Parallax on scroll
    gsap.to(title, {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    if (photoRef.current) {
      gsap.to(photoRef.current, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  }, []);

  const titleText = "SOFTWARE\nENGINEER";

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden px-[clamp(1.5rem,4vw,3.5rem)] pb-16 pt-28"
    >
      {/* 3D canvas — desktop only, behind everything */}
      {showScene && !isMobile && <HeroScene />}

      {/* Label above title — matching reference "LKKR" pattern */}
      <span className="relative z-10 mb-2 block font-body text-[0.7rem] uppercase tracking-[0.3em] text-muted">
        rykr
      </span>

      {/* Title — massive condensed, filling width */}
      <h1
        ref={titleRef}
        className="relative z-10 font-display text-[clamp(3.5rem,13vw,13rem)] font-bold uppercase leading-[0.88] tracking-[-0.02em] text-dark"
      >
        {titleText.split("\n").map((line, li) => (
          <span key={li} className="block overflow-hidden">
            {line.split("").map((char, ci) => (
              <span
                key={`${li}-${ci}`}
                className="hero-char inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </span>
        ))}
      </h1>

      {/* Middle content area — photo + info */}
      <div className="relative z-10 mt-6 grid gap-8 md:grid-cols-12">
        {/* Services list — left */}
        <div
          ref={servicesRef}
          className="md:col-span-4 md:col-start-1 md:mt-4"
        >
          <p className="font-body text-[clamp(0.75rem,1vw,0.9rem)] font-500 uppercase tracking-wider text-dark">
            / Software Engineering
          </p>
          <p className="font-body text-[clamp(0.75rem,1vw,0.9rem)] font-500 uppercase tracking-wider text-dark">
            / AI &amp; Machine Learning
          </p>
          <p className="font-body text-[clamp(0.75rem,1vw,0.9rem)] font-500 uppercase tracking-wider text-dark">
            / Full-Stack Development
          </p>
        </div>

        {/* Photo — center, overlapping title */}
        <div className="md:col-span-4 md:col-start-5 md:-mt-[12vw]">
          <div
            ref={photoRef}
            className="relative aspect-[3/4] w-full max-w-[400px] overflow-hidden"
            style={{ clipPath: "inset(0% 0% 0% 0%)" }}
          >
            <img
              src={siteContent.about.image}
              alt="Ryan Kumar"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Based in — right */}
        <div
          ref={basedRef}
          className="flex items-start gap-8 font-body text-[clamp(0.65rem,0.8vw,0.75rem)] uppercase tracking-[0.35em] text-dark md:col-span-4 md:col-start-9 md:mt-4"
        >
          <span>based</span>
          <span>in</span>
          <span>canada</span>
        </div>
      </div>

      {/* Bio + CTAs */}
      <div className="relative z-10 mt-12 grid gap-8 md:grid-cols-12">
        <p
          ref={bioRef}
          className="text-center font-body text-[clamp(0.75rem,0.9vw,0.85rem)] uppercase leading-relaxed tracking-wide text-dark md:col-span-6 md:col-start-4"
        >
          I&apos;m a software engineer from McMaster University, who builds
          impactful digital experiences for companies of all sizes
        </p>
      </div>

      <div
        ref={ctaRef}
        className="relative z-10 mt-10 flex flex-col gap-4 md:flex-row md:justify-between"
      >
        <a
          href="#projects"
          className="group flex items-center gap-3 font-body text-[clamp(0.7rem,0.85vw,0.8rem)] uppercase tracking-wider text-dark transition-opacity hover:opacity-60"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="font-body text-xs text-muted">recent work</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </a>

        <a
          href={`mailto:${siteContent.personal.email}`}
          className="group flex items-center gap-3 font-body text-[clamp(0.7rem,0.85vw,0.8rem)] uppercase tracking-wider text-dark transition-opacity hover:opacity-60"
        >
          <span className="text-xs text-muted">available for work</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <span className="font-body text-xs">{siteContent.personal.email}</span>
        </a>
      </div>
    </section>
  );
}
