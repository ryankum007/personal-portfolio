"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "@/components/ui/TextReveal";
import { siteContent } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = section.querySelectorAll(".project-item");
    items.forEach((item, i) => {
      gsap.from(item, {
        y: 50,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top 88%",
        },
      });

      // Subtle hover lift on desktop
      const el = item as HTMLElement;
      el.addEventListener("mouseenter", () => {
        gsap.to(el, { y: -4, duration: 0.3, ease: "power2.out" });
      });
      el.addEventListener("mouseleave", () => {
        gsap.to(el, { y: 0, duration: 0.4, ease: "power2.out" });
      });
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="px-[clamp(1.5rem,5vw,6rem)] py-[clamp(4rem,10vw,12rem)]"
    >
      <div className="mx-auto max-w-[1400px]">
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
          className="mt-4 mb-16 font-display text-[clamp(2rem,5vw,4rem)] font-semibold text-dark"
          splitBy="words"
        >
          Projects that define my craft
        </TextReveal>

        {/* Grid layout */}
        <div className="grid gap-8 md:grid-cols-2">
          {siteContent.projects.map((project, i) => (
            <div
              key={i}
              className="project-item group cursor-pointer border border-dark/8 p-8 transition-all duration-300 hover:border-dark/20"
              data-cursor-hover
            >
              {/* Number */}
              <span className="font-body text-sm text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Title */}
              <h3 className="mt-4 font-display text-[clamp(1.25rem,2.5vw,2rem)] font-semibold leading-tight text-dark">
                {project.title}
              </h3>

              {/* Description */}
              <p className="mt-3 max-w-[50ch] font-body text-sm leading-relaxed text-dark/60">
                {project.description}
              </p>

              {/* Key bullets */}
              <ul className="mt-4 space-y-1.5">
                {project.bullets.slice(0, 2).map((bullet, j) => (
                  <li
                    key={j}
                    className="font-body text-sm leading-relaxed text-dark/50"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>

              {/* Tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-dark/10 px-3 py-1 font-body text-xs text-dark/50 transition-colors duration-300 group-hover:border-dark/25 group-hover:text-dark/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Category badge */}
              <div className="mt-6">
                <span className="label-uppercase text-muted">
                  {project.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
