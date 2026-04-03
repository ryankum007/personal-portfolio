"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SkillsScene = dynamic(() => import("@/components/three/SkillsScene"), {
  ssr: false,
});

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

const services = [
  {
    number: "00-1",
    title: "software engineering",
    items: [
      "/ System design",
      "/ Microservices architecture",
      "/ API development",
      "/ Performance optimization",
      "/ CI/CD pipelines",
    ],
    description:
      "I build reliable, scalable software systems that power real business outcomes. From microservices to monoliths, every project combines clean architecture with pragmatic engineering.",
  },
  {
    number: "00-2",
    title: "AI & machine learning",
    items: [
      "/ Data pipelines",
      "/ Model training",
      "/ NLP & computer vision",
      "/ MLOps deployment",
    ],
    description:
      "I design and deploy intelligent systems that extract value from data. From predictive models to NLP pipelines, I bring machine learning from prototype to production.",
  },
  {
    number: "00-3",
    title: "full-stack development",
    items: [
      "/ React / Next.js",
      "/ Node.js / Spring Boot",
      "/ Database design",
      "/ Cloud infrastructure",
      "/ Responsive interfaces",
    ],
    description:
      "End-to-end web development from database schema to pixel-perfect UI. I work across the entire stack to deliver fast, accessible, and beautiful web applications.",
  },
  {
    number: "00-4",
    title: "mobile & cross-platform",
    items: [
      "/ React Native",
      "/ iOS & Android",
      "/ Offline-first design",
      "/ Push notifications",
    ],
    description:
      "Cross-platform mobile experiences that feel native. I build apps that work seamlessly across devices with offline capabilities and real-time features.",
  },
  {
    number: "00-5",
    title: "research & data",
    items: [
      "/ Data analysis",
      "/ Visualization",
      "/ ETL pipelines",
      "/ Academic research",
      "/ Technical writing",
    ],
    description:
      "Data-driven insights through rigorous analysis and compelling visualization. From financial modeling to academic research, I turn raw data into actionable knowledge.",
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const [showScene, setShowScene] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

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

    // Section entrance
    gsap.fromTo(
      section,
      { clipPath: "inset(4% 0% 0% 0%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 92%" },
      }
    );

    // Header reveal
    const heading = section.querySelector(".skills-heading");
    if (heading) {
      const letters = heading.querySelectorAll("span");
      gsap.from(letters, {
        y: "100%",
        opacity: 0,
        duration: 0.8,
        stagger: 0.03,
        ease: "power4.out",
        scrollTrigger: { trigger: heading, start: "top 85%" },
      });
    }

    // Service cards stagger
    const cards = section.querySelectorAll(".service-card");
    gsap.from(cards, {
      y: 40,
      opacity: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: { trigger: cards[0], start: "top 85%" },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative overflow-hidden bg-light px-[clamp(1.5rem,4vw,3.5rem)] py-[clamp(6rem,12vw,14rem)]"
    >
      {showScene && !isMobile && <SkillsScene />}

      <div className="relative z-10 mx-auto max-w-[1400px]">
        {/* Header row */}
        <div className="mb-20 flex items-start justify-between">
          <div>
            <h2 className="skills-heading overflow-hidden font-display text-[clamp(2.5rem,8vw,7rem)] font-700 uppercase leading-[0.95] text-dark">
              <SpacedHeading text="services" />
            </h2>
          </div>
          <span className="hidden font-body text-xs uppercase tracking-wider text-muted md:block">
            dsgn/4
          </span>
        </div>

        {/* Service accordion cards */}
        <div>
          {services.map((service, i) => (
            <div
              key={i}
              className="service-card group cursor-pointer border-t border-dark/10"
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
              onClick={() => setActiveIndex(activeIndex === i ? null : i)}
            >
              <div className="py-8 md:py-10">
                {/* Top row: number + title */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-6 md:gap-10">
                    <span className="font-body text-[0.7rem] uppercase tracking-wider text-muted">
                      {service.number}
                    </span>
                    <h3 className="font-display text-[clamp(1.5rem,3.5vw,2.8rem)] font-600 uppercase leading-[1.1] text-dark transition-all duration-300 group-hover:tracking-[0.02em]">
                      {service.title}
                    </h3>
                  </div>
                  {/* Hover title */}
                  <span className="hidden font-display text-[clamp(1rem,1.5vw,1.2rem)] font-500 text-dark/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:block">
                    // {service.title}
                  </span>
                </div>

                {/* Expandable content */}
                <div
                  className="overflow-hidden transition-all duration-500 ease-out"
                  style={{
                    maxHeight: activeIndex === i ? "400px" : "0px",
                    opacity: activeIndex === i ? 1 : 0,
                  }}
                >
                  <div className="mt-6 grid gap-8 md:grid-cols-2 md:pl-[calc(0.7rem+2.5rem+1rem)]">
                    {/* Bullet list */}
                    <ul className="space-y-2">
                      {service.items.map((item, j) => (
                        <li
                          key={j}
                          className="font-body text-[0.8rem] text-dark/70"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>

                    {/* Description */}
                    <p className="font-body text-[0.8rem] leading-relaxed text-dark/60">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* Final border */}
          <div className="border-t border-dark/10" />
        </div>
      </div>
    </section>
  );
}
