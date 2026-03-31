"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "@/components/ui/TextReveal";
import { siteContent } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll(".exp-card");
    cards.forEach((card) => {
      gsap.from(card, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
        },
      });
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="bg-dark px-[clamp(1.5rem,5vw,6rem)] py-[clamp(4rem,10vw,12rem)]"
    >
      <div className="mx-auto max-w-[1400px]">
        <TextReveal
          as="span"
          className="label-uppercase text-light/40"
          splitBy="chars"
          stagger={0.02}
        >
          Experience
        </TextReveal>

        <TextReveal
          as="h2"
          className="mt-4 mb-16 font-display text-[clamp(2rem,5vw,4rem)] font-semibold text-light"
          splitBy="words"
        >
          Where I have worked
        </TextReveal>

        <div className="space-y-0">
          {siteContent.experience.map((exp, i) => (
            <div
              key={i}
              className="exp-card group border-t border-light/10 py-10 md:py-14"
            >
              <div className="grid gap-4 md:grid-cols-12 md:items-start">
                {/* Number + Date */}
                <div className="md:col-span-2">
                  <span className="font-body text-sm text-light/30">
                    0{i + 1}
                  </span>
                  <p className="mt-1 font-body text-sm text-light/50">
                    {exp.dates}
                  </p>
                </div>

                {/* Company + Role */}
                <div className="md:col-span-4">
                  <h3 className="font-display text-[clamp(1.25rem,2.5vw,2rem)] font-semibold text-light transition-all duration-300 group-hover:text-light/80">
                    {exp.company}
                  </h3>
                  <p className="mt-1 font-body text-sm italic text-light/60">
                    {exp.role}
                  </p>
                  <p className="font-body text-sm text-light/40">
                    {exp.location}
                  </p>
                </div>

                {/* Key bullets (first 3) */}
                <div className="md:col-span-5 md:col-start-8">
                  <ul className="space-y-2">
                    {exp.bullets.slice(0, 3).map((bullet, j) => (
                      <li
                        key={j}
                        className="font-body text-sm leading-relaxed text-light/60"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-light/15 px-3 py-1 font-body text-xs text-light/40"
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
