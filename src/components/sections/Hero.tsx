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
  const subtitleRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const basedRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const typewriterRef = useRef<HTMLSpanElement>(null);
  const [showScene, setShowScene] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    setIsMobile(mobile);
    if (!mobile) {
      // Show 3D scene shortly after load
      const timer = setTimeout(() => setShowScene(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  // Typewriter subtitle effect
  useEffect(() => {
    if (!typewriterRef.current) return;
    const phrases = [
      "Software Engineer",
      "Analytics & Quant",
      "Full-Stack Developer",
      "Business Thinker",
    ];
    const el = typewriterRef.current;
    el.textContent = "";
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      const current = phrases[phraseIndex];
      if (!isDeleting) {
        el.textContent = current.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) {
          timeout = setTimeout(() => {
            isDeleting = true;
            tick();
          }, 2200);
          return;
        }
        timeout = setTimeout(tick, 45 + Math.random() * 50);
      } else {
        el.textContent = current.slice(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          timeout = setTimeout(tick, 500);
          return;
        }
        timeout = setTimeout(tick, 25);
      }
    };

    const startTimer = setTimeout(tick, 4400);
    return () => {
      clearTimeout(startTimer);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    if (!section || !title) return;

    const tl = gsap.timeline({ delay: 3 });

    // Title chars — 3D sweep with perspective
    const chars = title.querySelectorAll(".hero-char");
    tl.from(chars, {
      y: "120%",
      rotateX: -90,
      opacity: 0,
      duration: 1.4,
      stagger: 0.02,
      ease: "power4.out",
    });

    // Subtitle line + text
    if (subtitleRef.current) {
      const line = subtitleRef.current.querySelector(".hero-line");
      const text = subtitleRef.current.querySelector(".typewriter-cursor");
      if (line) {
        tl.from(
          line,
          { scaleX: 0, transformOrigin: "left", duration: 0.6, ease: "power3.inOut" },
          "-=0.7"
        );
      }
      if (text) {
        tl.from(
          text,
          { opacity: 0, duration: 0.4, ease: "power2.out" },
          "-=0.3"
        );
      }
    }

    // Services list — staggered from left
    if (servicesRef.current) {
      const items = servicesRef.current.querySelectorAll(".service-item");
      tl.from(
        items,
        {
          x: -40,
          opacity: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
        },
        "-=0.4"
      );
    }

    // Based in text
    if (basedRef.current) {
      tl.from(
        basedRef.current,
        { opacity: 0, y: 20, duration: 0.6, ease: "power2.out" },
        "-=0.5"
      );
    }

    // Bio
    if (bioRef.current) {
      tl.from(
        bioRef.current,
        { y: 25, opacity: 0, duration: 0.7, ease: "power3.out" },
        "-=0.4"
      );
    }

    // CTAs
    if (ctaRef.current) {
      const links = ctaRef.current.querySelectorAll("a");
      const divider = ctaRef.current.querySelector(".cta-divider");
      if (divider) {
        tl.from(
          divider,
          { scaleX: 0, transformOrigin: "left", duration: 0.6, ease: "power3.inOut" },
          "-=0.3"
        );
      }
      tl.from(
        links,
        { y: 20, opacity: 0, stagger: 0.08, duration: 0.5 },
        "-=0.3"
      );
    }

    // Scroll indicator — fade in then pulse
    if (scrollRef.current) {
      tl.from(scrollRef.current, { opacity: 0, duration: 0.8 }, "-=0.2");
      gsap.to(scrollRef.current, {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 5.5,
      });
    }

    // Cinematic parallax on scroll — title drifts up and fades
    gsap.to(title, {
      yPercent: 40,
      opacity: 0.15,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Subtitle parallax — slightly different rate for depth
    if (subtitleRef.current) {
      gsap.to(subtitleRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "15% top",
          end: "85% top",
          scrub: true,
        },
      });
    }

    // Services list parallax — drifts up at own rate
    if (servicesRef.current) {
      gsap.to(servicesRef.current, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "35% top",
          end: "95% top",
          scrub: true,
        },
      });
    }

    // Bio parallax
    if (bioRef.current) {
      gsap.to(bioRef.current, {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "35% top",
          end: "95% top",
          scrub: true,
        },
      });
    }

    // Based location parallax
    if (basedRef.current) {
      gsap.to(basedRef.current, {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "35% top",
          end: "95% top",
          scrub: true,
        },
      });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col justify-between overflow-hidden px-[clamp(1.5rem,4vw,3.5rem)] pb-10 pt-28"
    >
      {/* 3D canvas — desktop only */}
      {showScene && !isMobile && <HeroScene />}

      {/* Top area */}
      <div className="relative z-10">
        {/* Name — massive display with perspective */}
        <h1
          ref={titleRef}
          className="font-display text-[clamp(3.5rem,14vw,14rem)] font-bold uppercase leading-[0.85] tracking-[-0.03em] text-dark"
          style={{ perspective: "800px" }}
        >
          {"RYAN\nKUMAR".split("\n").map((line, li) => (
            <span key={li} className="block overflow-hidden">
              {line.split("").map((char, ci) => (
                <span
                  key={`${li}-${ci}`}
                  className="hero-char inline-block"
                  style={{ transformOrigin: "bottom center" }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
          ))}
        </h1>

        {/* Typewriter subtitle */}
        <div
          ref={subtitleRef}
          className="relative z-10 mt-6 flex items-center gap-4"
        >
          <div className="hero-line h-[1px] w-12 bg-dark/30" />
          <span
            ref={typewriterRef}
            className="typewriter-cursor font-body text-[clamp(0.9rem,1.3vw,1.15rem)] tracking-[0.15em] text-muted"
          />
        </div>
      </div>

      {/* Middle info row */}
      <div className="relative z-10 mt-auto grid gap-8 md:grid-cols-12">
        {/* Services — left */}
        <div ref={servicesRef} className="md:col-span-4 md:col-start-1">
          {[
            "Software Engineering",
            "Analytics & Quant",
            "Business Strategy",
          ].map((s) => (
            <p
              key={s}
              className="service-item border-b border-dark/8 py-3 font-body text-[clamp(0.75rem,1vw,0.9rem)] font-500 uppercase tracking-wider text-dark transition-all duration-300 hover:pl-2 hover:border-dark/20"
            >
              {s}
            </p>
          ))}
        </div>

        {/* Bio — center */}
        <p
          ref={bioRef}
          className="rounded-lg bg-light/60 p-3 backdrop-blur-[3px] font-body text-[clamp(0.8rem,1vw,0.95rem)] leading-relaxed text-dark/80 md:col-span-4 md:col-start-5"
        >
          {siteContent.personal.heroDescription}
        </p>

        {/* Location — right */}
        <div
          ref={basedRef}
          className="flex flex-col gap-1 md:col-span-3 md:col-start-10 md:items-end"
        >
          <span className="font-body text-[0.7rem] uppercase tracking-[0.3em] text-muted">
            Based in
          </span>
          <span className="font-display text-[clamp(1rem,1.5vw,1.25rem)] font-600 uppercase text-dark">
            Dallas, Texas
          </span>
        </div>
      </div>

      {/* Bottom CTAs */}
      <div
        ref={ctaRef}
        className="relative z-10 mt-8 flex flex-col gap-4 pt-6 md:flex-row md:items-center md:justify-between"
      >
        <div className="cta-divider absolute left-0 right-0 top-0 h-[1px] bg-dark/10" />
        <a
          href="#projects"
          className="group flex items-center gap-3 font-body text-[clamp(0.7rem,0.85vw,0.8rem)] uppercase tracking-wider text-dark transition-all duration-300 hover:gap-4"
          onClick={(e) => {
            e.preventDefault();
            document
              .querySelector("#projects")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="font-body text-xs text-muted">
            explore projects
          </span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          >
            <path
              d="M1 11L11 1M11 1H3M11 1V9"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </a>

        <a
          href={siteContent.personal.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 font-body text-[clamp(0.7rem,0.85vw,0.8rem)] uppercase tracking-wider text-dark transition-all duration-300 hover:gap-4"
        >
          <span className="text-xs text-muted">let&apos;s connect</span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          >
            <path
              d="M1 11L11 1M11 1H3M11 1V9"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
          <span className="font-body text-xs">linkedin</span>
        </a>

        {/* Scroll indicator */}
        <div ref={scrollRef} className="hidden items-center gap-2 md:flex">
          <span className="font-body text-[0.65rem] uppercase tracking-[0.2em] text-muted">
            scroll
          </span>
          <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
            <path
              d="M5 0V14M5 14L1 10M5 14L9 10"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.4"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
