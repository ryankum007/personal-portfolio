"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteContent } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

const ExperienceScene = dynamic(
  () => import("@/components/three/ExperienceScene"),
  { ssr: false }
);

/* ─── Category icon by project type ─── */
function CategoryIcon({ category }: { category: string }) {
  const cls = "w-4 h-4 text-light/40";
  const lower = category.toLowerCase();

  if (lower.includes("analytics") || lower.includes("quant") || lower.includes("finance") || lower.includes("risk")) {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 3v18h18M7 16l4-4 4 4 5-6" />
      </svg>
    );
  }
  if (lower.includes("ai") || lower.includes("ml")) {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 3v2m6-2v2M9 19v2m6-2v2M3 9h2m-2 6h2m14-6h2m-2 6h2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    );
  }
  if (lower.includes("hardware") || lower.includes("iot")) {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    );
  }
  // Default: code terminal
  return (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M8 9l3 3-3 3m5 0h3M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" />
    </svg>
  );
}

/* ─── Tab button ─── */
function ProjectTab({
  project,
  index,
  isActive,
  onClick,
}: {
  project: (typeof siteContent.projects)[0];
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`project-tab group relative flex items-center gap-3 whitespace-nowrap border-b-2 px-5 py-4 font-body text-[0.7rem] uppercase tracking-[0.15em] transition-all duration-400 ${
        isActive
          ? "border-light bg-light/[0.06] text-light"
          : "border-transparent text-light/50 hover:border-light/25 hover:text-light/75"
      }`}
    >
      <span className="font-display text-[0.6rem] text-light/35">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="max-w-[120px] overflow-hidden text-ellipsis">
        {project.title.split(" ").slice(0, 2).join(" ")}
      </span>
      {isActive && (
        <span className="ml-1 h-1.5 w-1.5 rounded-full bg-light/60 animate-pulse" />
      )}
    </button>
  );
}

/* ─── Case file card for a project ─── */
function ProjectFile({
  project,
  index,
  isActive,
}: {
  project: (typeof siteContent.projects)[0];
  index: number;
  isActive: boolean;
}) {
  const fileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!fileRef.current || !isActive) return;
    gsap.fromTo(
      fileRef.current,
      { opacity: 0, y: 30, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" }
    );
    const items = fileRef.current.querySelectorAll(".case-animate");
    gsap.fromTo(
      items,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: "power3.out", delay: 0.15 }
    );
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div ref={fileRef} className="relative">
      <div className="relative border border-light/10 bg-light/[0.02] p-8 md:p-12">
        {/* Corner accents */}
        <div className="pointer-events-none absolute left-0 top-0 h-6 w-6 border-l-2 border-t-2 border-light/15" />
        <div className="pointer-events-none absolute right-0 top-0 h-6 w-6 border-r-2 border-t-2 border-light/15" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 border-light/15" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2 border-light/15" />

        {/* Header */}
        <div className="case-animate flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex-1">
            {/* Classification */}
            <div className="mb-6 flex items-center gap-3">
              <div className="flex items-center gap-2 border border-light/15 px-3 py-1">
                <CategoryIcon category={project.category} />
                <span className="font-body text-[0.6rem] uppercase tracking-[0.25em] text-light/60">
                  {project.category}
                </span>
              </div>
              <div className="h-[1px] flex-1 bg-light/8" />
              <span className="font-body text-[0.6rem] tracking-[0.15em] text-light/25">
                PROJECT #{String(index + 1).padStart(3, "0")}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-display text-[clamp(1.4rem,3vw,2.2rem)] font-bold uppercase leading-[0.95] text-light">
              {project.title}
            </h3>

            {/* Description */}
            <p className="mt-4 max-w-[60ch] font-body text-[0.85rem] leading-[1.7] text-light/65">
              {project.description}
            </p>

            {/* Key Impact highlight */}
            {project.highlight && (
              <div className="case-animate mt-5 flex items-center gap-3">
                <div className="flex items-center gap-2 border border-light/20 bg-light/[0.05] px-3.5 py-1.5">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    className="text-light/50"
                  >
                    <path
                      d="M6 1L7.545 4.13L11 4.635L8.5 7.07L9.09 10.51L6 8.885L2.91 10.51L3.5 7.07L1 4.635L4.455 4.13L6 1Z"
                      stroke="currentColor"
                      strokeWidth="0.8"
                      fill="currentColor"
                      fillOpacity="0.15"
                    />
                  </svg>
                  <span className="font-body text-[0.7rem] font-medium tracking-wide text-light/70">
                    {project.highlight}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* File badge */}
          <div className="case-animate shrink-0 border border-light/10 bg-light/[0.03] px-5 py-3 text-center">
            <span className="block font-body text-[0.55rem] uppercase tracking-[0.3em] text-light/45">
              Category
            </span>
            <span className="mt-1 block font-display text-[0.85rem] font-semibold text-light/85">
              {project.category.split("/")[0].trim()}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="case-animate my-8 flex items-center gap-3">
          <div className="h-1 w-1 rounded-full bg-light/15" />
          <div className="h-[1px] flex-1 bg-light/8" />
          <span className="font-body text-[0.5rem] uppercase tracking-[0.3em] text-light/35">
            key deliverables
          </span>
          <div className="h-[1px] flex-1 bg-light/8" />
          <div className="h-1 w-1 rounded-full bg-light/15" />
        </div>

        {/* Bullet points */}
        <div className="case-animate grid gap-4 md:grid-cols-2">
          {project.bullets.map((bullet, j) => (
            <div
              key={j}
              className="case-animate group/bullet flex gap-3 border-l-2 border-light/6 py-2 pl-4 transition-all duration-300 hover:border-light/25 hover:bg-light/[0.02]"
            >
              <span className="shrink-0 font-display text-[0.6rem] font-semibold text-light/35 transition-colors duration-300 group-hover/bullet:text-light/55">
                {String(j + 1).padStart(2, "0")}
              </span>
              <p className="font-body text-[0.8rem] leading-[1.7] text-light/70 transition-colors duration-300 group-hover/bullet:text-light/85">
                {bullet}
              </p>
            </div>
          ))}
        </div>

        {/* Tags footer */}
        <div className="case-animate mt-8 flex flex-wrap items-center gap-2 border-t border-light/8 pt-6">
          <span className="mr-2 font-body text-[0.55rem] uppercase tracking-[0.25em] text-light/40">
            Tech Stack:
          </span>
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded border border-light/10 bg-light/[0.03] px-3 py-1 font-body text-[0.6rem] uppercase tracking-[0.1em] text-light/40 transition-all duration-300 hover:border-light/25 hover:text-light/60"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Scan lines */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.015]">
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className="h-[1px] bg-light" style={{ marginTop: `${i * 2.5}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showScene, setShowScene] = useState(false);

  const projects = siteContent.projects;

  useEffect(() => {
    const timer = setTimeout(() => setShowScene(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Auto-cycle
  const [autoCycle, setAutoCycle] = useState(true);
  const autoTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (!autoCycle) return;
    autoTimerRef.current = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, 8000);
    return () => clearTimeout(autoTimerRef.current);
  }, [activeIndex, autoCycle, projects.length]);

  const handleTabClick = useCallback((index: number) => {
    setActiveIndex(index);
    setAutoCycle(false);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ta = "play none none none";

    if (headingRef.current) {
      const chars = headingRef.current.querySelectorAll(".proj-heading-char");
      gsap.from(chars, {
        y: "130%",
        rotateX: -90,
        opacity: 0,
        duration: 1.2,
        stagger: 0.025,
        ease: "power4.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          end: "top 20%",
          toggleActions: ta,
          once: true,
        },
      });
    }

    if (counterRef.current) {
      gsap.from(counterRef.current, {
        textContent: 0,
        duration: 2.5,
        snap: { textContent: 1 },
        ease: "power2.out",
        scrollTrigger: {
          trigger: counterRef.current,
          start: "top 85%",
          end: "top 25%",
          toggleActions: ta,
          once: true,
        },
      });
    }

    if (tabsRef.current) {
      const tabs = tabsRef.current.querySelectorAll(".project-tab");
      gsap.from(tabs, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.06,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: tabsRef.current,
          start: "top 88%",
          end: "top 30%",
          toggleActions: ta,
          once: true,
        },
      });
    }

    const fileArea = section.querySelector(".project-file-area");
    if (fileArea) {
      gsap.from(fileArea, {
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: fileArea,
          start: "top 85%",
          end: "top 15%",
          toggleActions: ta,
          once: true,
        },
      });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative bg-dark px-[clamp(1.5rem,4vw,3.5rem)] py-[clamp(6rem,12vw,14rem)]"
    >
      {showScene && <ExperienceScene />}

      <div className="relative z-10 mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="mb-16 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="font-body text-[0.65rem] uppercase tracking-[0.35em] text-light/45">
              // portfolio
            </span>
            <h2
              ref={headingRef}
              className="mt-3 overflow-hidden font-display text-[clamp(2.5rem,7vw,6rem)] font-bold uppercase leading-[0.85] text-light"
              style={{ perspective: "600px" }}
            >
              {"Projects".split("").map((char, i) => (
                <span
                  key={i}
                  className="proj-heading-char inline-block"
                  style={{ transformOrigin: "bottom center" }}
                >
                  {char}
                </span>
              ))}
            </h2>
          </div>

          <div className="flex gap-10 md:gap-14">
            <div>
              <div
                ref={counterRef}
                className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold leading-none text-light"
              >
                {projects.length}
              </div>
              <span className="font-body text-[0.6rem] uppercase tracking-[0.25em] text-light/45">
                Projects
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div
          ref={tabsRef}
          className="mb-0 flex overflow-x-auto border-b border-light/8 scrollbar-none"
          style={{ scrollbarWidth: "none" }}
        >
          {projects.map((project, i) => (
            <ProjectTab
              key={i}
              project={project}
              index={i}
              isActive={i === activeIndex}
              onClick={() => handleTabClick(i)}
            />
          ))}
        </div>

        {/* Active project file */}
        <div className="project-file-area mt-0">
          {projects.map((project, i) => (
            <ProjectFile
              key={i}
              project={project}
              index={i}
              isActive={i === activeIndex}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => handleTabClick(i)}
                className={`h-1.5 rounded-full transition-all duration-400 ${
                  i === activeIndex
                    ? "w-8 bg-light/50"
                    : "w-1.5 bg-light/15 hover:bg-light/25"
                }`}
                aria-label={`Go to project ${i + 1}`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() =>
                handleTabClick(activeIndex === 0 ? projects.length - 1 : activeIndex - 1)
              }
              className="flex h-10 w-10 items-center justify-center border border-light/10 text-light/55 transition-all duration-300 hover:border-light/30 hover:text-light/80"
              aria-label="Previous"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </button>
            <button
              onClick={() =>
                handleTabClick(activeIndex === projects.length - 1 ? 0 : activeIndex + 1)
              }
              className="flex h-10 w-10 items-center justify-center border border-light/10 text-light/55 transition-all duration-300 hover:border-light/30 hover:text-light/80"
              aria-label="Next"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
