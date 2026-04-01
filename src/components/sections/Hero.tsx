"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteContent } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const name = nameRef.current;
    const subtitle = subtitleRef.current;
    const scroll = scrollRef.current;
    const line = lineRef.current;
    if (!name || !subtitle || !scroll) return;

    const tl = gsap.timeline({ delay: 3.5 });

    // Name reveal — split by characters
    const chars = name.querySelectorAll(".hero-char");
    tl.from(chars, {
      y: 120,
      opacity: 0,
      duration: 1,
      stagger: 0.03,
      ease: "power4.out",
    });

    // Subtitle fade in
    tl.from(
      subtitle,
      {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.4"
    );

    // Decorative line
    if (line) {
      tl.from(
        line,
        {
          scaleX: 0,
          duration: 0.8,
          ease: "power3.inOut",
        },
        "-=0.6"
      );
    }

    // Scroll indicator
    tl.from(
      scroll,
      {
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.2"
    );

    // Continuous scroll indicator animation
    gsap.to(scroll.querySelector(".scroll-line"), {
      scaleY: 0,
      transformOrigin: "top",
      duration: 1.5,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true,
    });

    // Parallax the hero name on scroll
    gsap.to(name, {
      yPercent: 30,
      opacity: 0.3,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  // Split name into first and last
  const firstName = "RYAN";
  const lastName = "KUMAR";

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center px-[clamp(1.5rem,5vw,6rem)]"
    >
      {/* Name */}
      <h1 ref={nameRef} className="text-center">
        <span className="block">
          {firstName.split("").map((char, i) => (
            <span key={`f-${i}`} className="inline-block overflow-hidden">
              <span className="hero-char inline-block font-display text-[clamp(3rem,13vw,11rem)] font-bold leading-[0.9] tracking-[-0.04em] text-dark">
                {char}
              </span>
            </span>
          ))}
        </span>
        <span className="block">
          {lastName.split("").map((char, i) => (
            <span key={`l-${i}`} className="inline-block overflow-hidden">
              <span className="hero-char inline-block font-display text-[clamp(3rem,13vw,11rem)] font-bold leading-[0.9] tracking-[-0.04em] text-dark">
                {char}
              </span>
            </span>
          ))}
        </span>
      </h1>

      {/* Decorative line */}
      <div
        ref={lineRef}
        className="mt-6 h-[1px] w-16 origin-left bg-dark/30"
      />

      {/* Subtitle */}
      <p
        ref={subtitleRef}
        className="mt-5 text-center font-body text-[clamp(0.875rem,1.5vw,1.125rem)] font-light tracking-[0.15em] uppercase text-muted"
      >
        {siteContent.personal.title} &mdash;{" "}
        {siteContent.personal.university}
      </p>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-12 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="label-uppercase text-muted">Scroll</span>
        <div className="scroll-line h-12 w-[1px] bg-dark/30" />
      </div>
    </section>
  );
}
