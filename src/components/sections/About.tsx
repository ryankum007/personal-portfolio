"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "@/components/ui/TextReveal";
import ParallaxImage from "@/components/ui/ParallaxImage";
import { siteContent } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const textEl = textRef.current;
    if (!section || !textEl) return;

    const paragraphs = textEl.querySelectorAll(".about-line");
    gsap.from(paragraphs, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 60%",
      },
    });
  }, []);

  // Split bio into sentences for staggered reveal
  const bioSentences = siteContent.about.bio
    .split(". ")
    .filter(Boolean)
    .map((s) => (s.endsWith(".") ? s : s + "."));

  return (
    <section
      ref={sectionRef}
      id="about"
      className="px-[clamp(1.5rem,5vw,6rem)] py-[clamp(4rem,10vw,12rem)]"
    >
      <div className="mx-auto grid max-w-[1400px] gap-12 md:grid-cols-12 md:gap-16">
        {/* Label */}
        <div className="md:col-span-12">
          <TextReveal
            as="span"
            className="label-uppercase text-muted"
            splitBy="chars"
            stagger={0.02}
          >
            About Me
          </TextReveal>
        </div>

        {/* Text content — asymmetric left */}
        <div ref={textRef} className="md:col-span-7 md:col-start-1">
          <TextReveal
            as="h2"
            className="mb-8 font-display text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.1] text-dark"
            splitBy="words"
          >
            Building at the intersection of technology and impact
          </TextReveal>

          <div className="space-y-4">
            {bioSentences.map((sentence, i) => (
              <p
                key={i}
                className="about-line max-w-[65ch] font-body text-[clamp(1rem,1.2vw,1.15rem)] leading-[1.7] text-dark/80"
              >
                {sentence}
              </p>
            ))}
          </div>
        </div>

        {/* Photo — asymmetric right with parallax */}
        <div className="relative md:col-span-4 md:col-start-9">
          <ParallaxImage
            src={siteContent.about.image}
            alt="Ryan Kumar"
            className="relative aspect-[3/4] w-full"
            speed={0.15}
          />
        </div>
      </div>
    </section>
  );
}
