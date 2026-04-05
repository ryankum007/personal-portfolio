"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteContent } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

const SkillsScene = dynamic(() => import("@/components/three/SkillsScene"), {
  ssr: false,
});

/* ─── Scramble text effect on scroll ─── */
function ScrambleHeading({ text }: { text: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ&!@#$%^*()";

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const original = text;
    let iteration = 0;
    let interval: ReturnType<typeof setInterval>;

    const runScramble = () => {
      clearInterval(interval);
      iteration = 0;
      interval = setInterval(() => {
        el.textContent = original
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iteration) return original[i];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");

        if (iteration >= original.length) {
          clearInterval(interval);
        }
        iteration += 1 / 2;
      }, 30);
    };

    ScrollTrigger.create({
      trigger: el,
      start: "top 82%",
      end: "top 20%",
      onEnter: runScramble,
      once: true,
    });

    return () => clearInterval(interval);
  }, [text, chars]);

  return (
    <h2
      ref={ref}
      className="font-display text-[clamp(2.5rem,7vw,6rem)] font-bold uppercase leading-[0.85] text-light"
    >
      {text}
    </h2>
  );
}

/* ─── Skill row with index and hover ─── */
function SkillRow({ skill, index }: { skill: string; index: number }) {
  return (
    <div className="skill-item group relative cursor-default">
      <div className="flex items-center justify-between py-3 transition-all duration-300 group-hover:pl-3">
        <div className="flex items-baseline gap-3">
          <span className="font-display text-[0.55rem] tracking-[0.2em] text-light/30 transition-colors duration-300 group-hover:text-light/50">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-display text-[clamp(1.1rem,1.8vw,1.6rem)] font-medium text-light/80 transition-all duration-300 group-hover:text-light">
            {skill}
          </span>
        </div>
        <svg
          width="12"
          height="12"
          viewBox="0 0 14 14"
          fill="none"
          className="-translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
        >
          <path
            d="M1 13L13 1M13 1H5M13 1V9"
            stroke="currentColor"
            strokeWidth="1.2"
            className="text-light/45"
          />
        </svg>
      </div>
      <div className="skill-divider h-[1px] bg-light/12 transition-colors duration-300 group-hover:bg-light/25" />
    </div>
  );
}

/* ─── Soft skill card with icon ─── */
function SoftSkillCard({ skill, index }: { skill: string; index: number }) {
  const icons: Record<string, React.ReactNode> = {
    Leadership: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    "Strategic Thinking": (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    Networking: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
        <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
    "Problem Solving": (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
        <path d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>
    ),
    Communication: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
        <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    Adaptability: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
        <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    "Critical Thinking": (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
        <path d="M9 3v2m6-2v2M9 19v2m6-2v2M3 9h2m-2 6h2m14-6h2m-2 6h2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
    "Stakeholder Management": (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    "Cross-Functional Collaboration": (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
        <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    "Business Acumen": (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
        <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  };

  return (
    <div
      className="skill-tag group flex items-center gap-3 border border-light/8 bg-light/[0.02] px-4 py-3 transition-all duration-400 hover:border-light/20 hover:bg-light/[0.05]"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <span className="text-light/40 transition-colors duration-300 group-hover:text-light/60">
        {icons[skill] || (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
            <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        )}
      </span>
      <span className="font-body text-[0.75rem] text-light/65 transition-colors duration-300 group-hover:text-light/85">
        {skill}
      </span>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [showScene, setShowScene] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    setIsMobile(mobile);
    if (!mobile) {
      const timer = setTimeout(() => setShowScene(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const ta = "play none none none";

      // Section label
      const label = section.querySelector(".skills-label");
      if (label) {
        gsap.from(label, {
          x: -30,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: { trigger: label, start: "top 88%", end: "top 30%", toggleActions: ta, once: true },
        });
      }

      // Skill groups stagger
      const groups = section.querySelectorAll(".skill-group");
      groups.forEach((group, gi) => {
        gsap.from(group, {
          y: 60,
          opacity: 0,
          duration: 0.9,
          delay: gi * 0.12,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: group,
            start: "top 88%",
            end: "top 20%",
            toggleActions: ta,
            once: true,
          },
        });

        const heading = group.querySelector(".skill-group-heading");
        if (heading) {
          gsap.from(heading, {
            x: -20,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
            immediateRender: false,
            scrollTrigger: { trigger: group, start: "top 85%", end: "top 25%", toggleActions: ta, once: true },
          });
        }

        const items = group.querySelectorAll(".skill-item");
        items.forEach((item, j) => {
          gsap.from(item, {
            x: -30,
            opacity: 0,
            duration: 0.5,
            delay: j * 0.05,
            ease: "power3.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: group,
              start: "top 80%",
              end: "top 20%",
              toggleActions: ta,
              once: true,
            },
          });
        });

        const dividers = group.querySelectorAll(".skill-divider");
        dividers.forEach((divider, j) => {
          gsap.from(divider, {
            scaleX: 0,
            transformOrigin: "left",
            duration: 0.6,
            delay: j * 0.04,
            ease: "power3.inOut",
            immediateRender: false,
            scrollTrigger: {
              trigger: group,
              start: "top 82%",
              end: "top 22%",
              toggleActions: ta,
              once: true,
            },
          });
        });
      });

      // Certifications
      const certItems = section.querySelectorAll(".cert-item");
      certItems.forEach((item, i) => {
        gsap.from(item, {
          x: 20,
          opacity: 0,
          duration: 0.5,
          delay: i * 0.06,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            end: "top 30%",
            toggleActions: ta,
            once: true,
          },
        });
      });

      // Soft skill tags
      const tags = section.querySelectorAll(".skill-tag");
      if (tags.length) {
        gsap.from(tags, {
          y: 20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.04,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: tags[0],
            start: "top 88%",
            end: "top 30%",
            toggleActions: ta,
            once: true,
          },
        });
      }

      // Interest tags
      const interestTags = section.querySelectorAll(".interest-tag");
      if (interestTags.length) {
        gsap.from(interestTags, {
          scale: 0.8,
          opacity: 0,
          duration: 0.4,
          stagger: 0.04,
          ease: "back.out(2)",
          immediateRender: false,
          scrollTrigger: {
            trigger: interestTags[0],
            start: "top 88%",
            end: "top 30%",
            toggleActions: ta,
            once: true,
          },
        });
      }

      // Marquee
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

          ScrollTrigger.create({
            trigger: marquee,
            start: "top bottom",
            end: "bottom top",
            onUpdate: (self) => {
              const velocity = Math.abs(self.getVelocity());
              tween.timeScale(Math.min(1 + velocity / 2000, 3));
            },
          });
        }
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const allSkills = [
    ...siteContent.skills.languages,
    ...siteContent.skills.frameworks,
  ];

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative overflow-hidden bg-dark py-[clamp(6rem,12vw,14rem)]"
    >
      {showScene && !isMobile && <SkillsScene />}

      {/* Marquee strip */}
      <div
        ref={marqueeRef}
        className="mb-20 overflow-hidden border-y border-light/8 py-6"
      >
        <div className="marquee-inner flex w-max gap-16 whitespace-nowrap">
          {[...allSkills, ...allSkills].map((skill, i) => (
            <span
              key={i}
              className="font-display text-[clamp(1.5rem,3vw,2.5rem)] font-semibold text-light/20"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-[clamp(1.5rem,5vw,6rem)]">
        {/* Header */}
        <div className="mb-20 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="skills-label font-body text-[0.65rem] uppercase tracking-[0.35em] text-light/45">
              What I work with
            </span>
            <div className="mt-3">
              <ScrambleHeading text="Skills" />
            </div>
          </div>

          <p className="max-w-[360px] font-body text-[0.8rem] leading-relaxed text-light/60 md:text-right">
            Technologies, frameworks, and competencies I bring to every project
            and partnership.
          </p>
        </div>

        {/* Main grid — 2 column on desktop */}
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Left column — Technical Skills */}
          <div className="space-y-14">
            {/* Languages */}
            <div className="skill-group">
              <h3 className="skill-group-heading mb-6 flex items-center gap-3 font-body text-[0.7rem] uppercase tracking-[0.3em] text-light/50">
                <span className="h-[1px] w-6 bg-light/20" />
                Languages
              </h3>
              <div>
                {siteContent.skills.languages.map((skill, i) => (
                  <SkillRow key={skill} skill={skill} index={i} />
                ))}
              </div>
            </div>

            {/* Frameworks & Tools */}
            <div className="skill-group">
              <h3 className="skill-group-heading mb-6 flex items-center gap-3 font-body text-[0.7rem] uppercase tracking-[0.3em] text-light/50">
                <span className="h-[1px] w-6 bg-light/20" />
                Frameworks & Tools
              </h3>
              <div>
                {siteContent.skills.frameworks.map((skill, i) => (
                  <SkillRow key={skill} skill={skill} index={i} />
                ))}
              </div>
            </div>
          </div>

          {/* Right column — Certifications, Soft Skills, Interests */}
          <div className="space-y-14">
            {/* Certifications */}
            <div className="skill-group">
              <h3 className="skill-group-heading mb-6 flex items-center gap-3 font-body text-[0.7rem] uppercase tracking-[0.3em] text-light/50">
                <span className="h-[1px] w-6 bg-light/20" />
                Certifications
              </h3>
              <div className="space-y-2">
                {siteContent.skills.certifications.map((cert, i) => (
                  <div
                    key={cert}
                    className="cert-item group flex items-center gap-3 border border-light/6 bg-light/[0.015] px-5 py-3 transition-all duration-300 hover:border-light/18 hover:bg-light/[0.04]"
                  >
                    <span className="font-display text-[0.55rem] text-light/30 transition-colors duration-300 group-hover:text-light/50">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-body text-[0.8rem] text-light/70 transition-colors duration-300 group-hover:text-light/85">
                      {cert}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Soft Skills */}
            <div className="skill-group">
              <h3 className="skill-group-heading mb-6 flex items-center gap-3 font-body text-[0.7rem] uppercase tracking-[0.3em] text-light/50">
                <span className="h-[1px] w-6 bg-light/20" />
                Core Competencies
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {siteContent.skills.softSkills.map((skill, i) => (
                  <SoftSkillCard key={skill} skill={skill} index={i} />
                ))}
              </div>
            </div>

            {/* Interests & Focus Areas */}
            <div className="skill-group">
              <h3 className="skill-group-heading mb-6 flex items-center gap-3 font-body text-[0.7rem] uppercase tracking-[0.3em] text-light/50">
                <span className="h-[1px] w-6 bg-light/20" />
                Interests & Focus Areas
              </h3>
              <div className="flex flex-wrap gap-2">
                {siteContent.interests.map((interest) => (
                  <span
                    key={interest}
                    className="interest-tag border border-light/15 px-4 py-2 font-body text-[0.7rem] text-light/60 transition-all duration-300 hover:border-light/35 hover:text-light/80"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
