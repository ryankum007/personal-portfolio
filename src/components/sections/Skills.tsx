"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "@/components/ui/TextReveal";
import { siteContent } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Animate skill groups
    const groups = section.querySelectorAll(".skill-group");
    groups.forEach((group) => {
      gsap.from(group, {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: group,
          start: "top 85%",
        },
      });
    });

    // Infinite marquee
    const marquee = marqueeRef.current;
    if (marquee) {
      const inner = marquee.querySelector(".marquee-inner") as HTMLElement;
      if (inner) {
        gsap.to(inner, {
          xPercent: -50,
          duration: 30,
          ease: "none",
          repeat: -1,
        });
      }
    }
  }, []);

  const allSkills = [
    ...siteContent.skills.languages,
    ...siteContent.skills.frameworks,
  ];

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="overflow-hidden bg-dark py-[clamp(4rem,10vw,12rem)]"
    >
      {/* Marquee strip */}
      <div ref={marqueeRef} className="mb-16 overflow-hidden border-y border-light/10 py-6">
        <div className="marquee-inner flex w-max gap-12 whitespace-nowrap">
          {[...allSkills, ...allSkills].map((skill, i) => (
            <span
              key={i}
              className="font-display text-[clamp(1.5rem,3vw,2.5rem)] font-semibold text-light/15"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-[clamp(1.5rem,5vw,6rem)]">
        <TextReveal
          as="span"
          className="label-uppercase text-light/40"
          splitBy="chars"
          stagger={0.02}
        >
          Technical DNA
        </TextReveal>

        <TextReveal
          as="h2"
          className="mt-4 mb-16 font-display text-[clamp(2rem,5vw,4rem)] font-semibold text-light"
          splitBy="words"
        >
          Skills and expertise
        </TextReveal>

        <div className="grid gap-12 md:grid-cols-3">
          {/* Languages */}
          <div className="skill-group">
            <h3 className="label-uppercase mb-6 text-light/40">Languages</h3>
            <div className="space-y-3">
              {siteContent.skills.languages.map((skill) => (
                <p
                  key={skill}
                  className="font-display text-[clamp(1.25rem,2vw,1.75rem)] font-medium text-light/80"
                >
                  {skill}
                </p>
              ))}
            </div>
          </div>

          {/* Frameworks */}
          <div className="skill-group">
            <h3 className="label-uppercase mb-6 text-light/40">
              Frameworks & Tools
            </h3>
            <div className="space-y-3">
              {siteContent.skills.frameworks.map((skill) => (
                <p
                  key={skill}
                  className="font-display text-[clamp(1.25rem,2vw,1.75rem)] font-medium text-light/80"
                >
                  {skill}
                </p>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="skill-group">
            <h3 className="label-uppercase mb-6 text-light/40">
              Certifications
            </h3>
            <div className="space-y-3">
              {siteContent.skills.certifications.map((cert) => (
                <p
                  key={cert}
                  className="font-body text-sm leading-relaxed text-light/60"
                >
                  {cert}
                </p>
              ))}
            </div>

            <h3 className="label-uppercase mb-6 mt-10 text-light/40">
              Soft Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {siteContent.skills.softSkills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-light/15 px-3 py-1 font-body text-xs text-light/50"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
