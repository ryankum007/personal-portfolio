"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteContent } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

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

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Section entrance — clip-path reveal from bottom
    gsap.fromTo(
      section,
      { clipPath: "inset(8% 0% 0% 0%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 90%",
        },
      }
    );

    // Animate horizontal dividers
    const dividers = section.querySelectorAll(".exp-divider");
    dividers.forEach((divider) => {
      gsap.from(divider, {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: divider,
          start: "top 90%",
        },
      });
    });

    // Staggered card reveals
    const cards = section.querySelectorAll(".exp-card");
    cards.forEach((card) => {
      const inner = card.querySelectorAll(".exp-inner");
      gsap.from(inner, {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
        },
      });
    });

    // Hover interaction for cards
    cards.forEach((card) => {
      const el = card as HTMLElement;
      const bullets = el.querySelector(".exp-bullets") as HTMLElement;

      el.addEventListener("mouseenter", () => {
        gsap.to(el, {
          backgroundColor: "rgba(247, 247, 247, 0.03)",
          duration: 0.3,
        });
        if (bullets) {
          gsap.to(bullets, { opacity: 1, y: 0, duration: 0.3 });
        }
      });
      el.addEventListener("mouseleave", () => {
        gsap.to(el, { backgroundColor: "transparent", duration: 0.3 });
        if (bullets) {
          gsap.to(bullets, { opacity: 0.6, y: 4, duration: 0.3 });
        }
      });
    });
  }, []);

  // Show top 5 most relevant experiences
  const topExperiences = siteContent.experience.slice(0, 5);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="bg-dark px-[clamp(1.5rem,4vw,3.5rem)] py-[clamp(6rem,12vw,14rem)]"
    >
      <div className="mx-auto max-w-[1400px]">
        <h2 className="mb-20 overflow-hidden font-display text-[clamp(2.5rem,8vw,7rem)] font-700 uppercase leading-[0.95] text-light">
          <SpacedHeading text="experience" />
        </h2>

        <div>
          {topExperiences.map((exp, i) => (
            <div key={i}>
              {/* Divider line */}
              <div className="exp-divider h-[1px] w-full bg-light/10" />

              <div className="exp-card group cursor-default py-10 md:py-14">
                <div className="grid gap-4 md:grid-cols-12 md:items-start">
                  {/* Number + Date */}
                  <div className="exp-inner md:col-span-2">
                    <span className="font-display text-[clamp(1rem,1.5vw,1.25rem)] font-semibold text-light/40">
                      0{i + 1}
                    </span>
                    <p className="mt-2 font-body text-sm text-light/50">
                      {exp.dates}
                    </p>
                  </div>

                  {/* Company + Role */}
                  <div className="exp-inner md:col-span-4">
                    <h3 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-[1.15] text-light transition-all duration-300 group-hover:text-light/80">
                      {exp.company}
                    </h3>
                    <p className="mt-2 font-body text-sm italic text-light/50">
                      {exp.role}
                    </p>
                    <p className="font-body text-sm text-light/50">
                      {exp.location}
                    </p>
                  </div>

                  {/* Key bullets */}
                  <div className="exp-inner md:col-span-5 md:col-start-8">
                    <div className="exp-bullets" style={{ opacity: 0.6, transform: "translateY(4px)" }}>
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
                    </div>

                    {/* Tags */}
                    <div className="mt-5 flex flex-wrap gap-2">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-light/10 px-3 py-1 font-body text-xs text-light/50 transition-all duration-300 group-hover:border-light/20 group-hover:text-light/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* Final divider */}
          <div className="exp-divider h-[1px] w-full bg-light/10" />
        </div>
      </div>
    </section>
  );
}
