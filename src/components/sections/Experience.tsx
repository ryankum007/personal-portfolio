"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteContent } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

function SpacedHeading({ text }: { text: string }) {
  return (
    <>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="exp-char inline-block"
          style={{ transformOrigin: "bottom center" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </>
  );
}

/* ─── Category icon ─── */
function CategoryIcon({ category }: { category: string }) {
  const cls = "w-3.5 h-3.5";
  switch (category) {
    case "Software":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M8 9l3 3-3 3m5 0h3M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" />
        </svg>
      );
    case "Research":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 3v2m6-2v2M9 19v2m6-2v2M3 9h2m-2 6h2m14-6h2m-2 6h2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    case "Leadership":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    default:
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 13.255A23.193 23.193 0 0112 15c-3.183 0-6.22-.64-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
  }
}

/* ─── Progress bar for role navigation ─── */
function ProgressRing({ current, total }: { current: number; total: number }) {
  const progress = ((current + 1) / total) * 100;
  const circumference = 2 * Math.PI * 18;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width="44" height="44" viewBox="0 0 44 44" className="transition-all duration-500">
      <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(247,247,247,0.08)" strokeWidth="2" />
      <circle
        cx="22" cy="22" r="18" fill="none"
        stroke="rgba(247,247,247,0.35)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform="rotate(-90 22 22)"
        style={{ transition: "stroke-dashoffset 0.5s ease" }}
      />
      <text x="22" y="22" textAnchor="middle" dominantBaseline="central" fill="rgba(247,247,247,0.6)" fontSize="11" fontWeight="600" fontFamily="var(--font-display)">
        {current + 1}
      </text>
    </svg>
  );
}

/* ─── Role slide content ─── */
function RoleSlide({
  exp,
  index,
  isActive,
}: {
  exp: (typeof siteContent.experience)[0];
  index: number;
  isActive: boolean;
}) {
  const slideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!slideRef.current || !isActive) return;
    const items = slideRef.current.querySelectorAll(".slide-anim");
    gsap.fromTo(
      items,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.04, ease: "power3.out", delay: 0.12 }
    );
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div ref={slideRef} className="h-full overflow-y-auto px-6 py-6 md:px-12 md:py-8 scrollbar-none" style={{ scrollbarWidth: "none" }}>
      {/* Header */}
      <div className="slide-anim flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex-1">
          {/* Category badge */}
          <div className="slide-anim mb-4 flex items-center gap-2.5">
            <div className="flex items-center gap-1.5 border border-light/12 px-3 py-1.5 transition-colors duration-300 hover:border-light/25 hover:bg-light/[0.03]">
              <CategoryIcon category={exp.category} />
              <span className="font-body text-[0.55rem] uppercase tracking-[0.2em] text-light/50">
                {exp.category}
              </span>
            </div>
            <div className="h-[1px] flex-1 bg-light/6" />
          </div>

          {/* Company */}
          <h3 className="slide-anim font-display text-[clamp(1.8rem,4vw,3.2rem)] font-bold uppercase leading-[0.92] text-light">
            {exp.company}
          </h3>

          {/* Role + meta */}
          <div className="slide-anim mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <span className="font-body text-[0.82rem] text-light/70">{exp.role}</span>
            <span className="h-0.5 w-0.5 rounded-full bg-light/25" />
            <span className="font-body text-[0.72rem] text-light/45">{exp.dates}</span>
            <span className="h-0.5 w-0.5 rounded-full bg-light/25" />
            <span className="font-body text-[0.72rem] text-light/45">{exp.location}</span>
          </div>
        </div>

        {/* Index badge */}
        <div className="slide-anim shrink-0 border border-light/10 bg-light/[0.03] px-5 py-3 text-center transition-colors duration-300 hover:border-light/18 hover:bg-light/[0.05]">
          <span className="block font-body text-[0.5rem] uppercase tracking-[0.3em] text-light/40">Role</span>
          <span className="block font-display text-[1.4rem] font-bold text-light/80">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="slide-anim my-6 flex items-center gap-3">
        <div className="h-1 w-1 rounded-full bg-light/15" />
        <div className="h-[1px] flex-1 bg-light/8" />
        <span className="font-body text-[0.5rem] uppercase tracking-[0.3em] text-light/30">
          responsibilities
        </span>
        <div className="h-[1px] flex-1 bg-light/8" />
        <div className="h-1 w-1 rounded-full bg-light/15" />
      </div>

      {/* Bullets */}
      <div className="grid gap-3 md:grid-cols-2">
        {exp.bullets.map((bullet, j) => (
          <div
            key={j}
            className="slide-anim group flex gap-3 border-l-2 border-light/6 py-2 pl-4 transition-all duration-300 hover:border-light/30 hover:bg-light/[0.025]"
          >
            <span className="shrink-0 font-display text-[0.55rem] font-semibold text-light/25 transition-colors duration-300 group-hover:text-light/50">
              {String(j + 1).padStart(2, "0")}
            </span>
            <p className="font-body text-[0.75rem] leading-[1.75] text-light/60 transition-colors duration-300 group-hover:text-light/80">
              {bullet}
            </p>
          </div>
        ))}
      </div>

      {/* Tags */}
      <div className="slide-anim mt-7 flex flex-wrap items-center gap-2 border-t border-light/8 pt-5">
        <span className="mr-1 font-body text-[0.5rem] uppercase tracking-[0.25em] text-light/35">
          Stack:
        </span>
        {exp.tags.map((tag) => (
          <span
            key={tag}
            className="border border-light/10 bg-light/[0.03] px-3 py-1 font-body text-[0.55rem] uppercase tracking-[0.1em] text-light/40 transition-all duration-300 hover:border-light/25 hover:text-light/60 hover:bg-light/[0.06]"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const imacRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [imacHovered, setImacHovered] = useState(false);
  const touchStartX = useRef(0);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const experiences = siteContent.experience;

  // Autoplay — cycles through roles, pauses on interaction
  const startAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % experiences.length);
    }, 6000);
  }, [experiences.length]);

  const pauseAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  useEffect(() => {
    startAutoplay();
    return () => pauseAutoplay();
  }, [startAutoplay, pauseAutoplay]);

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(experiences.length - 1, index));
      if (clamped === activeIndex || isTransitioning) return;

      setIsTransitioning(true);
      pauseAutoplay();

      if (screenRef.current) {
        const direction = clamped > activeIndex ? 1 : -1;
        gsap.fromTo(
          screenRef.current,
          { opacity: 0.2, x: direction * 40, scale: 0.98 },
          {
            opacity: 1, x: 0, scale: 1, duration: 0.5, ease: "power3.out",
            onComplete: () => setIsTransitioning(false),
          }
        );
      } else {
        setIsTransitioning(false);
      }

      setActiveIndex(clamped);
      startAutoplay();
    },
    [activeIndex, experiences.length, isTransitioning, pauseAutoplay, startAutoplay]
  );

  const goNext = useCallback(() => {
    goTo(activeIndex === experiences.length - 1 ? 0 : activeIndex + 1);
  }, [activeIndex, experiences.length, goTo]);

  const goPrev = useCallback(() => {
    goTo(activeIndex === 0 ? experiences.length - 1 : activeIndex - 1);
  }, [activeIndex, experiences.length, goTo]);

  // Touch/swipe
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    pauseAutoplay();
  }, [pauseAutoplay]);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const diff = touchStartX.current - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) goNext();
        else goPrev();
      }
      startAutoplay();
    },
    [goNext, goPrev, startAutoplay]
  );

  // Keyboard
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev]);

  // GSAP scroll animations
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const ta = "play none none none";

      if (headingRef.current) {
        const chars = headingRef.current.querySelectorAll(".exp-char");
        gsap.from(chars, {
          y: "130%",
          rotateX: -90,
          opacity: 0,
          duration: 1.2,
          stagger: 0.025,
          ease: "power4.out",
          immediateRender: false,
          scrollTrigger: { trigger: headingRef.current, start: "top 80%", toggleActions: ta, once: true },
        });
      }

      if (imacRef.current) {
        gsap.from(imacRef.current, {
          y: 100,
          opacity: 0,
          scale: 0.92,
          duration: 1.2,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: { trigger: imacRef.current, start: "top 85%", toggleActions: ta, once: true },
        });
      }

      const desc = section.querySelectorAll(".exp-desc");
      if (desc.length) {
        gsap.from(desc, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: { trigger: desc[0], start: "top 88%", toggleActions: ta, once: true },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative overflow-hidden px-[clamp(1.5rem,4vw,3.5rem)] py-[clamp(6rem,12vw,14rem)]"
    >
      {/* Background shapes */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute left-[8%] top-[15%] h-40 w-40 rounded-full border border-dark/[0.03]" />
        <div className="absolute right-[5%] bottom-[25%] h-[1px] w-24 bg-dark/[0.04] rotate-[-25deg]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="font-body text-[0.65rem] uppercase tracking-[0.35em] text-dark/50">
              // career path
            </span>
            <h2
              ref={headingRef}
              className="mt-3 overflow-hidden font-display text-[clamp(2.5rem,7vw,6rem)] font-bold uppercase leading-[0.85] text-dark"
              style={{ perspective: "600px" }}
            >
              <SpacedHeading text="Experience" />
            </h2>
          </div>

          {/* Stats */}
          <div className="flex gap-10 md:gap-14">
            <div>
              <div className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold leading-none text-dark/12">
                {experiences.length}
              </div>
              <span className="font-body text-[0.6rem] uppercase tracking-[0.25em] text-dark/45">
                Roles
              </span>
            </div>
            <div>
              <div className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold leading-none text-dark/12">
                5+
              </div>
              <span className="font-body text-[0.6rem] uppercase tracking-[0.25em] text-dark/45">
                Years
              </span>
            </div>
          </div>
        </div>

        {/* Swipe hint */}
        <div className="exp-desc mb-8 flex items-center gap-3">
          <div className="h-[1px] w-8 bg-dark/15" />
          <span className="font-body text-[0.6rem] uppercase tracking-[0.2em] text-dark/40">
            Swipe, use arrows, or click to navigate
          </span>
        </div>

        {/* ─── iMac Frame — BIGGER ─── */}
        <div
          ref={imacRef}
          className="mx-auto max-w-[900px]"
          onMouseEnter={() => { setImacHovered(true); pauseAutoplay(); }}
          onMouseLeave={() => { setImacHovered(false); startAutoplay(); }}
        >
          {/* Monitor body */}
          <div
            className="relative overflow-hidden border-[3px] border-dark/15 bg-dark/[0.03] transition-shadow duration-500"
            style={{
              borderRadius: "1.8rem 1.8rem 0 0",
              boxShadow: imacHovered
                ? "0 20px 60px rgba(16,16,16,0.12), 0 8px 24px rgba(16,16,16,0.06)"
                : "0 8px 32px rgba(16,16,16,0.06)",
            }}
          >
            {/* Top bezel with camera + traffic lights */}
            <div className="flex items-center justify-between border-b border-dark/8 bg-dark/[0.025] px-5 py-3">
              {/* Traffic lights */}
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-dark/10 transition-colors duration-300 hover:bg-red-400/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-dark/10 transition-colors duration-300 hover:bg-yellow-400/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-dark/10 transition-colors duration-300 hover:bg-green-400/60" />
              </div>

              {/* Camera */}
              <div className="h-2.5 w-2.5 rounded-full border border-dark/15 bg-dark/5" />

              {/* Progress ring */}
              <ProgressRing current={activeIndex} total={experiences.length} />
            </div>

            {/* Screen */}
            <div
              ref={screenRef}
              className="relative bg-dark"
              style={{ minHeight: "clamp(360px, 42vw, 520px)" }}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* Scanline effect */}
              <div
                className="pointer-events-none absolute inset-0 z-30"
                style={{
                  background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(247,247,247,0.008) 2px, rgba(247,247,247,0.008) 4px)",
                  mixBlendMode: "overlay",
                }}
              />

              {/* Screen content */}
              {experiences.map((exp, i) => (
                <RoleSlide key={i} exp={exp} index={i} isActive={i === activeIndex} />
              ))}

              {/* Navigation arrows — bigger hit area, better design */}
              <button
                onClick={goPrev}
                className="absolute left-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-light/8 bg-dark/70 text-light/40 backdrop-blur-md transition-all duration-300 hover:border-light/25 hover:text-light/80 hover:bg-dark/90 hover:scale-110 md:left-4"
                aria-label="Previous role"
              >
                <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                  <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </button>
              <button
                onClick={goNext}
                className="absolute right-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-light/8 bg-dark/70 text-light/40 backdrop-blur-md transition-all duration-300 hover:border-light/25 hover:text-light/80 hover:bg-dark/90 hover:scale-110 md:right-4"
                aria-label="Next role"
              >
                <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                  <path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </button>

              {/* Bottom bar — role counter + autoplay indicator */}
              <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between border-t border-light/6 bg-dark/80 backdrop-blur-sm px-5 py-2.5">
                <span className="font-body text-[0.55rem] uppercase tracking-[0.2em] text-light/30">
                  {experiences[activeIndex].company.split(" ").slice(0, 2).join(" ")}
                </span>
                <div className="flex items-center gap-2">
                  {/* Autoplay progress bar */}
                  <div className="h-[2px] w-12 bg-light/8 overflow-hidden rounded-full">
                    <div
                      className="h-full bg-light/25 rounded-full"
                      style={{
                        width: `${((activeIndex + 1) / experiences.length) * 100}%`,
                        transition: "width 0.5s ease",
                      }}
                    />
                  </div>
                  <span className="font-body text-[0.55rem] tracking-wider text-light/25">
                    {String(activeIndex + 1).padStart(2, "0")} / {String(experiences.length).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Chin — BIGGER with Ryan Kumar name */}
          <div
            className="flex items-center justify-center border-x-[3px] border-b-[3px] border-dark/15 bg-dark/[0.04] py-4"
            style={{ borderRadius: "0 0 1.8rem 1.8rem" }}
          >
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-6 bg-dark/10" />
              <div className="font-display text-[0.65rem] font-semibold uppercase tracking-[0.5em] text-dark/18">
                Ryan Kumar
              </div>
              <div className="h-[1px] w-6 bg-dark/10" />
            </div>
          </div>

          {/* Stand neck — slightly taller */}
          <div className="mx-auto h-8 w-[90px] border-x-[3px] border-dark/10 bg-dark/[0.02]" />

          {/* Stand base — wider */}
          <div
            className="mx-auto h-[7px] w-[220px] border-[2px] border-dark/10 bg-dark/[0.03]"
            style={{ borderRadius: "0 0 10px 10px" }}
          />

          {/* Reflection under base */}
          <div
            className="mx-auto h-[2px] w-[180px] mt-1"
            style={{
              background: "radial-gradient(ellipse, rgba(16,16,16,0.06) 0%, transparent 70%)",
            }}
          />
        </div>

        {/* Dot navigation below iMac */}
        <div className="mt-10 flex items-center justify-center gap-2.5">
          {experiences.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-500 ${
                i === activeIndex
                  ? "h-2 w-10 bg-dark/40"
                  : "h-2 w-2 bg-dark/10 hover:bg-dark/25 hover:scale-125"
              }`}
              aria-label={`Go to role ${i + 1}`}
            />
          ))}
        </div>

        {/* Role name quick-nav — more interactive */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-1 gap-y-1.5">
          {experiences.map((exp, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`px-3 py-1 border font-body text-[0.6rem] uppercase tracking-[0.1em] transition-all duration-300 ${
                i === activeIndex
                  ? "border-dark/20 bg-dark/[0.04] text-dark/70"
                  : "border-transparent text-dark/25 hover:text-dark/50 hover:border-dark/10"
              }`}
            >
              {exp.company.split(" ").slice(0, 2).join(" ")}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
