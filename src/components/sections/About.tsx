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

function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      className="inline-block ml-1"
    >
      <path
        d="M1 11L11 1M11 1H3M11 1V9"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Section heading letters
    const heading = section.querySelector(".about-main-heading");
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

    // Subsection reveals
    const blocks = section.querySelectorAll(".about-block");
    blocks.forEach((block) => {
      gsap.from(block, {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: block, start: "top 85%" },
      });
    });

    // Photo curtain
    if (photoRef.current) {
      gsap.from(photoRef.current, {
        clipPath: "inset(100% 0% 0% 0%)",
        duration: 1.2,
        ease: "power4.inOut",
        scrollTrigger: { trigger: photoRef.current, start: "top 80%" },
      });
    }

    // Line reveals
    const lines = section.querySelectorAll(".about-line-reveal");
    lines.forEach((line) => {
      const spans = line.querySelectorAll("span, .line-text");
      gsap.from(spans.length > 0 ? spans : line, {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.04,
        ease: "power3.out",
        scrollTrigger: { trigger: line, start: "top 88%" },
      });
    });

    // Quote parallax
    const quote = section.querySelector(".about-quote");
    if (quote) {
      gsap.to(quote, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: quote,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="px-[clamp(1.5rem,4vw,3.5rem)] py-[clamp(6rem,12vw,14rem)]"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Section heading — spaced */}
        <div className="mb-16 flex items-start justify-between">
          <h2 className="about-main-heading overflow-hidden font-display text-[clamp(2.5rem,8vw,7rem)] font-700 uppercase leading-[0.95] text-dark">
            <SpacedHeading text="about me" />
          </h2>
        </div>

        {/* Content grid */}
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          {/* Left column: photo + decorative labels */}
          <div className="md:col-span-5">
            <div className="mb-6 flex gap-8">
              <div className="about-block">
                <p className="font-body text-[0.7rem] uppercase tracking-wider text-muted">
                  2/5
                </p>
                <p className="mt-1 font-body text-[0.7rem] uppercase tracking-wider text-muted">
                  for me
                </p>
                <p className="mt-1 font-body text-[0.7rem] uppercase tracking-wider text-muted">
                  eng/2
                </p>
              </div>
            </div>

            {/* Photo */}
            <div
              ref={photoRef}
              className="relative aspect-[3/4] w-full max-w-[420px] overflow-hidden"
              style={{ clipPath: "inset(0% 0% 0% 0%)" }}
            >
              <img
                src={siteContent.about.image}
                alt="Ryan Kumar"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Right column: text content */}
          <div className="space-y-16 md:col-span-6 md:col-start-7">
            {/* About me block */}
            <div className="about-block">
              <h4 className="font-body text-xs uppercase tracking-wider text-muted">
                about me
              </h4>
              <div className="about-line-reveal mt-6">
                <p className="font-body text-[0.85rem] leading-relaxed text-dark/80">
                  <span className="line-text block">Hello!</span>
                  <span className="line-text block">
                    I&apos;m Ryan Kumar
                  </span>
                </p>
              </div>
            </div>

            {/* My experience */}
            <div className="about-block">
              <h3 className="flex items-center gap-2 font-body text-[0.85rem] font-500 text-dark">
                my experience <ArrowIcon />
              </h3>
              <div className="about-line-reveal mt-4 space-y-1">
                <p className="font-body text-[0.85rem] leading-relaxed text-dark/70">
                  a Software Engineer with over 5
                </p>
                <p className="font-body text-[0.85rem] leading-relaxed text-dark/70">
                  years of experience building digital
                </p>
                <p className="font-body text-[0.85rem] leading-relaxed text-dark/70">
                  products for companies of all sizes.
                </p>
              </div>
            </div>

            {/* Quote */}
            <div className="about-block about-quote">
              <h2 className="font-body text-[clamp(1.5rem,3.5vw,2.8rem)] font-300 leading-[1.25] text-dark">
                It&apos;s not just a profession — it&apos;s a way of thinking.
              </h2>
            </div>

            {/* Philosophy */}
            <div className="about-block">
              <div className="about-line-reveal space-y-1">
                <p className="font-body text-[0.85rem] leading-relaxed text-dark/70">
                  My work is part of my lifestyle. As
                </p>
                <p className="font-body text-[0.85rem] leading-relaxed text-dark/70">
                  a software engineer, I am constantly
                </p>
                <p className="font-body text-[0.85rem] leading-relaxed text-dark/70">
                  observing the world: I notice how
                </p>
                <p className="font-body text-[0.85rem] leading-relaxed text-dark/70">
                  people interact with technology,
                </p>
                <p className="font-body text-[0.85rem] leading-relaxed text-dark/70">
                  systems, and interfaces.
                </p>
              </div>
            </div>

            {/* My philosophy */}
            <div className="about-block">
              <h3 className="flex items-center gap-2 font-body text-[0.85rem] font-500 text-dark">
                my philosophy <ArrowIcon />
              </h3>
              <div className="about-line-reveal mt-4 space-y-1">
                <p className="font-body text-[0.85rem] leading-relaxed text-dark/70">
                  I value clarity, meaning, and
                </p>
                <p className="font-body text-[0.85rem] leading-relaxed text-dark/70">
                  functionality — both in code and in
                </p>
                <p className="font-body text-[0.85rem] leading-relaxed text-dark/70">
                  life. I believe in conscious
                </p>
                <p className="font-body text-[0.85rem] leading-relaxed text-dark/70">
                  engineering: leaving only what
                </p>
                <p className="font-body text-[0.85rem] leading-relaxed text-dark/70">
                  makes sense and works for results.
                </p>
              </div>
            </div>

            {/* CTA + closing text */}
            <div className="about-block">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 font-body text-[0.85rem] text-dark transition-opacity hover:opacity-60"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                lets connect <ArrowIcon />
              </a>
              <div className="about-line-reveal mt-8 space-y-1">
                <p className="font-body text-[0.85rem] leading-relaxed text-dark/70">
                  Every project for me is more than
                </p>
                <p className="font-body text-[0.85rem] leading-relaxed text-dark/70">
                  a task. It&apos;s a problem I help
                </p>
                <p className="font-body text-[0.85rem] leading-relaxed text-dark/70">
                  solve through engineering.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
