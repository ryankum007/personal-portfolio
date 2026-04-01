"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "@/components/ui/TextReveal";
import { siteContent } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const gallery = galleryRef.current;
    if (!section || !gallery) return;

    // Staggered project reveal with scrub
    const items = gallery.querySelectorAll(".project-item");
    items.forEach((item, i) => {
      gsap.from(item, {
        y: 80,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top 90%",
        },
      });

      // Hover effects
      const el = item as HTMLElement;
      const overlay = el.querySelector(".project-overlay") as HTMLElement;
      const content = el.querySelector(".project-content") as HTMLElement;
      const number = el.querySelector(".project-number") as HTMLElement;
      const arrow = el.querySelector(".project-arrow") as HTMLElement;

      el.addEventListener("mouseenter", () => {
        gsap.to(overlay, {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        });
        gsap.to(content, {
          y: -8,
          duration: 0.4,
          ease: "power2.out",
        });
        if (number) {
          gsap.to(number, { scale: 1.1, duration: 0.3 });
        }
        if (arrow) {
          gsap.to(arrow, { x: 4, opacity: 1, duration: 0.3 });
        }
      });

      el.addEventListener("mouseleave", () => {
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        });
        gsap.to(content, {
          y: 0,
          duration: 0.3,
          ease: "power2.in",
        });
        if (number) {
          gsap.to(number, { scale: 1, duration: 0.3 });
        }
        if (arrow) {
          gsap.to(arrow, { x: 0, opacity: 0, duration: 0.3 });
        }
      });
    });

    // Parallax offset for alternating items
    items.forEach((item, i) => {
      if (i % 2 === 1) {
        gsap.to(item, {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    });
  }, []);

  // Show top 6 projects
  const topProjects = siteContent.projects.slice(0, 6);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="px-[clamp(1.5rem,5vw,6rem)] py-[clamp(6rem,12vw,14rem)]"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-20 grid md:grid-cols-12">
          <div className="md:col-span-8">
            <TextReveal
              as="span"
              className="label-uppercase text-muted"
              splitBy="chars"
              stagger={0.02}
            >
              Selected Work
            </TextReveal>

            <TextReveal
              as="h2"
              className="mt-4 font-display text-[clamp(2rem,5vw,4rem)] font-semibold text-dark"
              splitBy="words"
            >
              Projects that define my craft
            </TextReveal>
          </div>
          <div className="hidden items-end md:col-span-4 md:flex">
            <p className="max-w-[35ch] font-body text-sm leading-relaxed text-muted">
              A selection of projects spanning AI, full-stack web, mobile, and
              hardware engineering.
            </p>
          </div>
        </div>

        {/* Asymmetric grid layout */}
        <div ref={galleryRef} className="grid gap-8 md:grid-cols-2 md:gap-12">
          {topProjects.map((project, i) => (
            <div
              key={i}
              className={`project-item group relative cursor-pointer ${
                i % 3 === 0 ? "md:col-span-2" : ""
              }`}
              data-cursor-hover
            >
              {/* Card */}
              <div className="relative overflow-hidden border border-dark/8 p-8 md:p-10">
                {/* Hover overlay */}
                <div
                  className="project-overlay pointer-events-none absolute inset-0 bg-dark/[0.03]"
                  style={{ opacity: 0 }}
                />

                <div className="project-content relative">
                  {/* Header row */}
                  <div className="flex items-start justify-between">
                    <span className="project-number font-display text-[clamp(2rem,4vw,3.5rem)] font-bold text-dark/10">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="project-arrow mt-2 font-body text-lg text-dark"
                      style={{ opacity: 0 }}
                    >
                      &rarr;
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mt-4 font-display text-[clamp(1.25rem,2.5vw,2rem)] font-semibold leading-tight text-dark">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 max-w-[55ch] font-body text-sm leading-relaxed text-dark/60">
                    {project.description}
                  </p>

                  {/* Key bullets — show on wide cards */}
                  {i % 3 === 0 && (
                    <ul className="mt-5 grid gap-2 md:grid-cols-2">
                      {project.bullets.slice(0, 4).map((bullet, j) => (
                        <li
                          key={j}
                          className="font-body text-sm leading-relaxed text-dark/45"
                        >
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Tags + Category */}
                  <div className="mt-6 flex flex-wrap items-center gap-2">
                    <span className="label-uppercase mr-4 text-muted">
                      {project.category}
                    </span>
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-dark/10 px-3 py-1 font-body text-xs text-dark/50 transition-all duration-300 group-hover:border-dark/25 group-hover:text-dark/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
