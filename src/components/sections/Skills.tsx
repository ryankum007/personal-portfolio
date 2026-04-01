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

    // Animate skill groups with stagger
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

      // Each skill item reveals individually
      const items = group.querySelectorAll(".skill-item");
      items.forEach((item, j) => {
        gsap.from(item, {
          y: 20,
          opacity: 0,
          duration: 0.5,
          delay: j * 0.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: group,
            start: "top 80%",
          },
        });
      });

      // Horizontal divider animation within groups
      const dividers = group.querySelectorAll(".skill-divider");
      dividers.forEach((divider) => {
        gsap.from(divider, {
          scaleX: 0,
          transformOrigin: "left",
          duration: 0.6,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: divider,
            start: "top 88%",
          },
        });
      });
    });

    // Infinite marquee with scroll-based speed modulation
    const marquee = marqueeRef.current;
    if (marquee) {
      const inner = marquee.querySelector(".marquee-inner") as HTMLElement;
      if (inner) {
        const tween = gsap.to(inner, {
          xPercent: -50,
          duration: 25,
          ease: "none",
          repeat: -1,
        });

        // Speed up marquee based on scroll velocity
        ScrollTrigger.create({
          trigger: marquee,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const velocity = Math.abs(self.getVelocity());
            const speedMultiplier = 1 + velocity / 2000;
            tween.timeScale(Math.min(speedMultiplier, 3));
          },
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
      className="overflow-hidden bg-dark py-[clamp(6rem,12vw,14rem)]"
    >
      {/* Marquee strip */}
      <div
        ref={marqueeRef}
        className="mb-20 overflow-hidden border-y border-light/10 py-6"
      >
        <div className="marquee-inner flex w-max gap-16 whitespace-nowrap">
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
          className="mt-4 mb-20 font-display text-[clamp(2rem,5vw,4rem)] font-semibold text-light"
          splitBy="words"
        >
          Skills and expertise
        </TextReveal>

        <div className="grid gap-16 md:grid-cols-3">
          {/* Languages */}
          <div className="skill-group">
            <h3 className="label-uppercase mb-8 text-light/40">Languages</h3>
            <div>
              {siteContent.skills.languages.map((skill, i) => (
                <div key={skill}>
                  {i > 0 && (
                    <div className="skill-divider h-[1px] bg-light/8" />
                  )}
                  <p className="skill-item py-3 font-display text-[clamp(1.25rem,2vw,1.75rem)] font-medium text-light/80 transition-colors duration-300 hover:text-light">
                    {skill}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Frameworks */}
          <div className="skill-group">
            <h3 className="label-uppercase mb-8 text-light/40">
              Frameworks & Tools
            </h3>
            <div>
              {siteContent.skills.frameworks.map((skill, i) => (
                <div key={skill}>
                  {i > 0 && (
                    <div className="skill-divider h-[1px] bg-light/8" />
                  )}
                  <p className="skill-item py-3 font-display text-[clamp(1.25rem,2vw,1.75rem)] font-medium text-light/80 transition-colors duration-300 hover:text-light">
                    {skill}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications & Soft Skills */}
          <div className="skill-group">
            <h3 className="label-uppercase mb-8 text-light/40">
              Certifications
            </h3>
            <div>
              {siteContent.skills.certifications.map((cert, i) => (
                <div key={cert}>
                  {i > 0 && (
                    <div className="skill-divider h-[1px] bg-light/8" />
                  )}
                  <p className="skill-item py-3 font-body text-sm leading-relaxed text-light/60">
                    {cert}
                  </p>
                </div>
              ))}
            </div>

            <h3 className="label-uppercase mb-6 mt-12 text-light/40">
              Soft Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {siteContent.skills.softSkills.map((skill) => (
                <span
                  key={skill}
                  className="skill-item rounded-full border border-light/10 px-3 py-1.5 font-body text-xs text-light/40 transition-all duration-300 hover:border-light/25 hover:text-light/60"
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
