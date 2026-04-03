"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

const awards = [
  { name: "Dean's List", count: 4, detail: "McMaster University" },
  { name: "Gore Mutual", count: 1, detail: "Innovation Award" },
  { name: "Bloomberg", count: 1, detail: "Trading Challenge Top Quartile" },
  { name: "DARE Expedition", count: 1, detail: "Research Contribution" },
  { name: "Terry Fox", count: 1, detail: "Campaign Excellence" },
  { name: "Air Cadets", count: 1, detail: "Leadership Citation" },
];

export default function Awards() {
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Heading letters
    const heading = section.querySelector(".awards-heading");
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

    // Description text
    const desc = section.querySelectorAll(".awards-desc");
    gsap.from(desc, {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: { trigger: desc[0], start: "top 88%" },
    });

    // Award cards horizontal scroll
    const marquee = marqueeRef.current;
    if (marquee) {
      const inner = marquee.querySelector(".awards-track") as HTMLElement;
      if (inner) {
        const tween = gsap.to(inner, {
          xPercent: -50,
          duration: 30,
          ease: "none",
          repeat: -1,
        });

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

    // Individual award card reveals
    const cards = section.querySelectorAll(".award-card");
    gsap.from(cards, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: { trigger: cards[0], start: "top 88%" },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden px-[clamp(1.5rem,4vw,3.5rem)] py-[clamp(6rem,12vw,14rem)]"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="mb-12 flex items-start justify-between">
          <div>
            <h2 className="awards-heading overflow-hidden font-display text-[clamp(2.5rem,8vw,7rem)] font-700 uppercase leading-[0.95] text-dark">
              <SpacedHeading text="awards" />
            </h2>
          </div>
          <span className="hidden font-body text-xs uppercase tracking-wider text-muted md:block">
            dsgn/5
          </span>
        </div>

        {/* Description */}
        <div className="mb-16 max-w-[600px]">
          <p className="awards-desc font-body text-[clamp(0.85rem,1vw,1rem)] leading-relaxed text-dark/70">
            My commitment to excellence is reflected in recognitions across
            academics, research, and professional work.
          </p>
          <p className="awards-desc mt-3 font-body text-[0.8rem] text-dark/50">
            Dean&apos;s List 4x at McMaster University
          </p>
        </div>

        {/* Awards marquee */}
        <div ref={marqueeRef} className="overflow-hidden border-y border-dark/10 py-6">
          <div className="awards-track flex w-max gap-8">
            {[...awards, ...awards].map((award, i) => (
              <div
                key={i}
                className="award-card flex shrink-0 items-center gap-4 border border-dark/10 px-8 py-5 transition-all duration-300 hover:border-dark/30"
              >
                <h3 className="font-display text-[clamp(1rem,1.5vw,1.25rem)] font-600 uppercase text-dark">
                  {award.name}
                </h3>
                <span className="font-body text-xs text-dark/40">
                  ( {award.count} )
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
