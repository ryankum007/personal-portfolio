"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const statement =
  "Building digital experiences that merge technical precision with human creativity";

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    if (!section || !text) return;

    const words = text.querySelectorAll(".phil-word");

    // Each word starts dim and reveals to full opacity as user scrolls
    gsap.set(words, { opacity: 0.08 });

    gsap.to(words, {
      opacity: 1,
      stagger: 0.08,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top 60%",
        end: "bottom 40%",
        scrub: true,
      },
    });

    // Decorative line that grows with scroll
    if (lineRef.current) {
      gsap.from(lineRef.current, {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1.2,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
        },
      });
    }
  }, []);

  const words = statement.split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative px-[clamp(1.5rem,5vw,6rem)] py-[clamp(10rem,25vw,24rem)]"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Decorative line */}
        <div
          ref={lineRef}
          className="mb-12 h-[1px] w-24 origin-left bg-dark/20"
        />

        <p
          ref={textRef}
          className="font-display text-[clamp(2rem,5.5vw,5rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-dark"
        >
          {words.map((word, i) => (
            <span key={i} className="phil-word inline-block mr-[0.3em]">
              {word}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
