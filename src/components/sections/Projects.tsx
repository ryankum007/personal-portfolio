"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteContent } from "@/data/content";

function SpacedHeading({ text }: { text: string }) {
  return (
    <>
      {text.split("").map((char, i) => (
        <span key={i} className="inline-block">
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </>
  );
}

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    setIsMobile(mobile);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track || isMobile) return;

    // Horizontal scroll driven by vertical scroll
    const cards = track.querySelectorAll(".project-card");
    const totalWidth = track.scrollWidth - window.innerWidth;

    gsap.to(track, {
      x: -totalWidth,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${totalWidth}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    // Each card fades in as it enters viewport
    cards.forEach((card) => {
      gsap.from(card, {
        opacity: 0.3,
        scale: 0.95,
        duration: 0.5,
        scrollTrigger: {
          trigger: card,
          containerAnimation: gsap.getById?.("horizontalScroll") || undefined,
          start: "left 80%",
          end: "left 50%",
          scrub: true,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) st.kill();
      });
    };
  }, [isMobile]);

  // Mobile: stacked vertical reveal
  useEffect(() => {
    if (!isMobile) return;
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll(".project-card");
    cards.forEach((card) => {
      gsap.from(card, {
        y: 60,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 88%",
        },
      });
    });
  }, [isMobile]);

  const topProjects = siteContent.projects.slice(0, 6);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="overflow-hidden"
    >
      {/* Desktop: horizontal scroll layout */}
      {!isMobile ? (
        <div className="flex h-screen items-center">
          <div ref={trackRef} className="flex gap-8 pl-[clamp(1.5rem,4vw,3.5rem)]">
            {/* Header card */}
            <div
              ref={headerRef}
              className="flex w-[40vw] shrink-0 flex-col justify-center pr-12"
            >
              <span className="label-uppercase text-muted">Swipe</span>

              <h2 className="mt-4 overflow-hidden font-display text-[clamp(2.5rem,7vw,6rem)] font-700 uppercase leading-[0.95] text-dark">
                <SpacedHeading text="recent works" />
              </h2>

              <div className="mt-10 flex items-center gap-3">
                <div className="h-[1px] w-12 bg-dark/20" />
                <span className="font-body text-xs text-muted">
                  Scroll to explore
                </span>
              </div>
            </div>

            {/* Project cards */}
            {topProjects.map((project, i) => (
              <div
                key={i}
                className="project-card group relative w-[55vw] shrink-0 cursor-pointer border border-dark/8 p-10 lg:w-[40vw]"
                data-cursor-text="View"
              >
                {/* Large number */}
                <span className="font-display text-[clamp(3rem,6vw,5rem)] font-bold leading-none text-dark/[0.06]">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Category pill */}
                <div className="mt-2">
                  <span className="label-uppercase text-muted">
                    {project.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="mt-6 font-display text-[clamp(1.5rem,3vw,2.5rem)] font-semibold leading-tight text-dark">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="mt-4 max-w-[45ch] font-body text-[clamp(0.875rem,1.1vw,1rem)] leading-relaxed text-dark/60">
                  {project.description}
                </p>

                {/* Bullets */}
                <ul className="mt-6 space-y-2">
                  {project.bullets.slice(0, 3).map((bullet, j) => (
                    <li
                      key={j}
                      className="font-body text-sm leading-relaxed text-dark/45"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div className="mt-8 flex flex-wrap gap-2">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-dark/10 px-3 py-1 font-body text-xs text-dark/50 transition-all duration-300 group-hover:border-dark/25 group-hover:text-dark/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Hover arrow */}
                <div className="absolute right-8 top-10 font-body text-lg text-dark opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  &rarr;
                </div>

                {/* Hover overlay */}
                <div className="pointer-events-none absolute inset-0 bg-dark/[0.02] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            ))}

            {/* End spacer */}
            <div className="w-[10vw] shrink-0" />
          </div>
        </div>
      ) : (
        /* Mobile: vertical stacked cards */
        <div className="px-[clamp(1.5rem,4vw,3.5rem)] py-[clamp(6rem,12vw,14rem)]">
          <div className="mx-auto max-w-[1400px]">
            <h2 className="mb-12 overflow-hidden font-display text-[clamp(2.5rem,8vw,5rem)] font-700 uppercase leading-[0.95] text-dark">
              <SpacedHeading text="recent works" />
            </h2>

            <div className="space-y-6">
              {topProjects.map((project, i) => (
                <div
                  key={i}
                  className="project-card border border-dark/8 p-6"
                >
                  <span className="font-display text-2xl font-bold text-dark/10">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-semibold text-dark">
                    {project.title}
                  </h3>
                  <p className="mt-2 font-body text-sm text-dark/60">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-dark/10 px-2.5 py-0.5 font-body text-xs text-dark/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
