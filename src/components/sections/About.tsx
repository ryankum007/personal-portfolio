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
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const textEl = textRef.current;
    const imageContainer = imageContainerRef.current;
    const stats = statsRef.current;
    if (!section || !textEl) return;

    // Paragraph lines fade-in with stagger
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

    // Image curtain reveal from bottom
    if (imageContainer) {
      gsap.from(imageContainer, {
        clipPath: "inset(100% 0% 0% 0%)",
        duration: 1.2,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: imageContainer,
          start: "top 75%",
        },
      });
    }

    // Stats counter animation
    if (stats) {
      const counters = stats.querySelectorAll(".stat-number");
      counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute("data-target") || "0");
        gsap.from(counter, {
          textContent: 0,
          duration: 1.5,
          ease: "power2.out",
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: counter,
            start: "top 85%",
          },
          onUpdate: function () {
            const el = counter as HTMLElement;
            el.textContent = Math.round(
              parseFloat(el.textContent || "0")
            ).toString();
          },
        });
      });

      // Stat labels fade in
      const labels = stats.querySelectorAll(".stat-label");
      gsap.from(labels, {
        y: 15,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: stats,
          start: "top 85%",
        },
      });
    }
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
      className="px-[clamp(1.5rem,5vw,6rem)] py-[clamp(6rem,12vw,14rem)]"
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
            className="mb-10 font-display text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.1] text-dark"
            splitBy="words"
          >
            Building at the intersection of technology and impact
          </TextReveal>

          <div className="space-y-5">
            {bioSentences.map((sentence, i) => (
              <p
                key={i}
                className="about-line max-w-[65ch] font-body text-[clamp(1rem,1.2vw,1.15rem)] leading-[1.7] text-dark/80"
              >
                {sentence}
              </p>
            ))}
          </div>

          {/* Stats row */}
          <div
            ref={statsRef}
            className="mt-12 grid grid-cols-3 gap-8 border-t border-dark/10 pt-10"
          >
            <div>
              <span
                className="stat-number block font-display text-[clamp(2rem,4vw,3.5rem)] font-bold text-dark"
                data-target="5"
              >
                5
              </span>
              <span className="stat-label mt-1 block font-body text-sm text-muted">
                Years Experience
              </span>
            </div>
            <div>
              <span
                className="stat-number block font-display text-[clamp(2rem,4vw,3.5rem)] font-bold text-dark"
                data-target="10"
              >
                10
              </span>
              <span className="stat-label mt-1 block font-body text-sm text-muted">
                Projects Shipped
              </span>
            </div>
            <div>
              <span
                className="stat-number block font-display text-[clamp(2rem,4vw,3.5rem)] font-bold text-dark"
                data-target="8"
              >
                8
              </span>
              <span className="stat-label mt-1 block font-body text-sm text-muted">
                Languages
              </span>
            </div>
          </div>
        </div>

        {/* Photo — asymmetric right with parallax */}
        <div
          ref={imageContainerRef}
          className="relative md:col-span-4 md:col-start-9"
          style={{ clipPath: "inset(0% 0% 0% 0%)" }}
        >
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
