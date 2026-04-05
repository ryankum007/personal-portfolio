"use client";

import { useEffect, useRef, useState } from "react";
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

/* ─── Award type icons ─── */
function AwardIcon({ type }: { type: string }) {
  const cls = "w-5 h-5";
  switch (type) {
    case "academic":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422A12.083 12.083 0 0121 12.75V17.25a.75.75 0 01-.148.444L12 22.5l-8.852-4.806A.75.75 0 013 17.25V12.75c0-.538.214-1.055.84-1.422L12 14z" />
        </svg>
      );
    case "merit":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      );
    case "professional":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 13.255A23.193 23.193 0 0112 15c-3.183 0-6.22-.64-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    default: // aviation
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      );
  }
}

const awards = [
  {
    name: "Presidential Scholar",
    count: 1,
    detail: "Hardin-Simmons University",
    year: "2024-26",
    type: "academic",
    description:
      "Awarded to students demonstrating exceptional academic excellence, leadership potential, and commitment to the university community. Maintains a 4.0 GPA while pursuing a B.S. in Computer Science with a Business minor.",
  },
  {
    name: "Honor Roll",
    count: 1,
    detail: "Hardin-Simmons University",
    year: "2024-26",
    type: "academic",
    description:
      "Recognized each semester for maintaining a GPA in the top tier of the Computer Science program, reflecting consistent academic performance across both technical and business coursework.",
  },
  {
    name: "Endowed Scholarship",
    count: 1,
    detail: "Hardin-Simmons University",
    year: "2024-26",
    type: "merit",
    description:
      "Merit-based scholarship funded by university endowment, awarded to high-achieving transfer students who demonstrate academic distinction and potential for meaningful contribution to their field.",
  },
  {
    name: "Dean's List",
    count: 4,
    detail: "McMaster University",
    year: "2020-24",
    type: "academic",
    description:
      "Named to the Dean's List for four consecutive academic terms in McMaster's rigorous Software Engineering program, placing in the top percentage of the Faculty of Engineering.",
  },
  {
    name: "Engineering Scholar",
    count: 1,
    detail: "McMaster University",
    year: "2020-24",
    type: "academic",
    description:
      "Recognized by McMaster's Faculty of Engineering for sustained academic excellence and research engagement throughout the Software Engineering program.",
  },
  {
    name: "Glider Pilot License",
    count: 1,
    detail: "Royal Canadian Air Cadets",
    year: "2019",
    type: "aviation",
    description:
      "Earned Glider Pilot certification through the Royal Canadian Air Cadets national aviation program. Completed ground school, flight training, and solo flight requirements in one of the most competitive cadet achievements in Canada.",
  },
  {
    name: "Bloomberg Challenge",
    count: 1,
    detail: "Trading Challenge -- Top Quartile",
    year: "2021",
    type: "professional",
    description:
      "Led a team in the Bloomberg Trading Challenge, building Python-based regression models for S&P 500 volatility prediction and intraday performance dashboards. Placed in the top quartile regionally.",
  },
  {
    name: "Gore Mutual Award",
    count: 1,
    detail: "Innovation Award",
    year: "2023",
    type: "professional",
    description:
      "Received the internal Innovation Award at Gore Mutual Insurance for contributions to the company's digital transformation initiative, including microservice architecture improvements and CI/CD automation.",
  },
];

/* ─── Single award card ─── */
function AwardCard({
  award,
  index,
  isExpanded,
  onToggle,
}: {
  award: (typeof awards)[0];
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    if (isExpanded) {
      gsap.fromTo(
        contentRef.current,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.5, ease: "power3.out" }
      );
    } else {
      gsap.to(contentRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.35,
        ease: "power3.in",
      });
    }
  }, [isExpanded]);

  return (
    <div
      className={`award-card group relative overflow-hidden border transition-all duration-500 ${
        isExpanded
          ? "border-dark/25 shadow-sm bg-dark/[0.02]"
          : "border-dark/8 hover:border-dark/18 hover:bg-dark/[0.01]"
      }`}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-start gap-4 p-6 text-left"
      >
        {/* Icon */}
        <div
          className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center border transition-all duration-400 ${
            isExpanded
              ? "border-dark/25 bg-dark/8 text-dark/70"
              : "border-dark/10 bg-dark/[0.02] text-dark/35 group-hover:border-dark/20 group-hover:text-dark/50"
          }`}
        >
          <AwardIcon type={award.type} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-body text-[0.55rem] uppercase tracking-[0.25em] text-dark/50">
              {award.year}
            </span>
            {award.count > 1 && (
              <span className="border border-dark/15 bg-dark/5 px-1.5 py-0.5 font-display text-[0.5rem] font-semibold text-dark/50">
                x{award.count}
              </span>
            )}
          </div>
          <h3 className="mt-1.5 font-display text-[clamp(1.05rem,1.8vw,1.4rem)] font-semibold uppercase leading-tight text-dark transition-transform duration-400 group-hover:translate-x-0.5">
            {award.name}
          </h3>
          <span className="mt-1 block font-body text-[0.72rem] text-dark/55">
            {award.detail}
          </span>
        </div>

        {/* Index + expand icon */}
        <div className="flex shrink-0 flex-col items-end gap-3">
          <span className="font-display text-[2rem] font-bold leading-none text-dark/[0.05] transition-colors duration-400 group-hover:text-dark/[0.1]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div
            className={`flex h-7 w-7 items-center justify-center border transition-all duration-300 ${
              isExpanded
                ? "border-dark/25 bg-dark/8"
                : "border-dark/10 group-hover:border-dark/20"
            }`}
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              className={`text-dark/40 transition-transform duration-300 ${
                isExpanded ? "rotate-180" : ""
              }`}
            >
              <path
                d="M2 3.5L5 7L8 3.5"
                stroke="currentColor"
                strokeWidth="1.2"
              />
            </svg>
          </div>
        </div>
      </button>

      {/* Expandable description */}
      <div ref={contentRef} className="h-0 overflow-hidden opacity-0">
        <div className="px-6 pb-6 pl-[4.5rem]">
          <div className="mb-4 h-[1px] bg-dark/8" />
          <p className="font-body text-[0.78rem] leading-[1.75] text-dark/60">
            {award.description}
          </p>
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className={`absolute bottom-0 left-0 h-[2px] transition-all duration-[600ms] ${
          isExpanded ? "w-full bg-dark/20" : "w-0 bg-dark/15 group-hover:w-full"
        }`}
      />
    </div>
  );
}

export default function Awards() {
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [expandedIndex, setExpandedIndex] = useState<number>(-1);

  const totalAwards = awards.reduce((sum, a) => sum + a.count, 0);
  const institutions = [...new Set(awards.map((a) => a.detail.split(" -- ")[0].split(" \u2014 ")[0]))].length;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ta = "play none none none";

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
        immediateRender: false,
        scrollTrigger: {
          trigger: heading,
          start: "top 85%",
          toggleActions: ta,
          once: true,
        },
      });
    }

    // Stats counters
    const statNums = section.querySelectorAll(".awards-stat-num");
    statNums.forEach((el) => {
      const target = parseInt(el.textContent || "0", 10);
      gsap.from(el, {
        textContent: 0,
        duration: 2,
        snap: { textContent: 1 },
        ease: "power2.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: ta,
          once: true,
        },
      });
    });

    // Description text
    const desc = section.querySelectorAll(".awards-desc");
    if (desc.length) {
      gsap.from(desc, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: desc[0],
          start: "top 88%",
          toggleActions: ta,
          once: true,
        },
      });
    }

    // Cards stagger
    const cards = section.querySelectorAll(".award-card");
    if (cards.length) {
      gsap.from(cards, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: cards[0],
          start: "top 88%",
          toggleActions: ta,
          once: true,
        },
      });
    }

    // Marquee
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
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-[clamp(1.5rem,4vw,3.5rem)] py-[clamp(6rem,12vw,14rem)]"
    >
      {/* Background floating shapes */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute right-[10%] top-[20%] h-20 w-20 rounded-full border border-dark/[0.03]" />
        <div className="absolute left-[8%] bottom-[30%] h-[1px] w-12 bg-dark/[0.05] rotate-45" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="font-body text-[0.65rem] uppercase tracking-[0.35em] text-dark/50">
              // achievements
            </span>
            <h2 className="awards-heading mt-3 overflow-hidden font-display text-[clamp(2.5rem,8vw,7rem)] font-bold uppercase leading-[0.95] text-dark">
              <SpacedHeading text="Awards" />
            </h2>
          </div>

          {/* Stats */}
          <div className="flex gap-10 md:gap-14">
            <div>
              <div className="awards-stat-num font-display text-[clamp(2.5rem,5vw,4rem)] font-bold leading-none text-dark/12">
                {totalAwards}
              </div>
              <span className="font-body text-[0.6rem] uppercase tracking-[0.25em] text-dark/45">
                Awards
              </span>
            </div>
            <div>
              <div className="awards-stat-num font-display text-[clamp(2.5rem,5vw,4rem)] font-bold leading-none text-dark/12">
                {institutions}
              </div>
              <span className="font-body text-[0.6rem] uppercase tracking-[0.25em] text-dark/45">
                Institutions
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-10 max-w-[600px]">
          <p className="awards-desc font-body text-[clamp(0.85rem,1vw,1rem)] leading-relaxed text-dark/80">
            My commitment to excellence is reflected in recognitions across
            academics, research, aviation, and professional work.
          </p>
        </div>

        {/* Hint */}
        <div className="awards-desc mb-8 flex items-center gap-3">
          <div className="h-[1px] w-8 bg-dark/15" />
          <span className="font-body text-[0.6rem] uppercase tracking-[0.2em] text-dark/40">
            Click to expand
          </span>
        </div>

        {/* Interactive award cards */}
        <div className="mb-16 grid gap-3 md:grid-cols-2">
          {awards.map((award, i) => (
            <AwardCard
              key={i}
              award={award}
              index={i}
              isExpanded={expandedIndex === i}
              onToggle={() =>
                setExpandedIndex(expandedIndex === i ? -1 : i)
              }
            />
          ))}
        </div>

        {/* Awards marquee */}
        <div
          ref={marqueeRef}
          className="overflow-hidden border-y border-dark/10 py-6"
        >
          <div className="awards-track flex w-max gap-12">
            {[...awards, ...awards].map((award, i) => (
              <div key={i} className="flex shrink-0 items-center gap-4">
                <h3 className="font-display text-[clamp(1rem,1.5vw,1.25rem)] font-semibold uppercase text-dark/20">
                  {award.name}
                </h3>
                <span className="h-1 w-1 rounded-full bg-dark/10" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
