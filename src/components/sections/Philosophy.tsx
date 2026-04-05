"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PhilosophyScene = dynamic(
  () => import("@/components/three/PhilosophyScene"),
  { ssr: false }
);

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const q1Ref = useRef<HTMLDivElement>(null);
  const q2Ref = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const attrRef = useRef<HTMLDivElement>(null);
  const [showScene, setShowScene] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    setIsMobile(mobile);
    if (!mobile) {
      const timer = setTimeout(() => setShowScene(true), 300);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Gather word elements
    const q1Words = q1Ref.current
      ? (Array.from(q1Ref.current.querySelectorAll(".pw")) as HTMLElement[])
      : [];
    const q2Words = q2Ref.current
      ? (Array.from(q2Ref.current.querySelectorAll(".pw")) as HTMLElement[])
      : [];

    const labelLine = labelRef.current?.querySelector(
      ".label-line"
    ) as HTMLElement | null;
    const labelText = labelRef.current?.querySelector(
      ".label-text"
    ) as HTMLElement | null;
    const divider = dividerRef.current;
    const attr = attrRef.current;

    // ── Initial hidden state ──
    [...q1Words, ...q2Words].forEach((el) => {
      el.style.opacity = "0";
      el.style.filter = "blur(6px)";
      el.style.transform = "translateY(6px)";
      el.style.transition =
        "opacity 0.12s ease-out, filter 0.12s ease-out, transform 0.12s ease-out";
    });
    if (labelLine) {
      labelLine.style.transformOrigin = "left";
      labelLine.style.transform = "scaleX(0)";
    }
    if (labelText) {
      labelText.style.opacity = "0";
      labelText.style.transform = "translateX(-20px)";
    }
    if (divider) {
      divider.style.transformOrigin = "left";
      divider.style.transform = "scaleX(0)";
    }
    if (attr) {
      attr.style.opacity = "0";
      attr.style.transform = "translateY(20px)";
    }

    // ── All words as one continuous sequence — even scroll-per-word ──
    const allWords = [...q1Words, ...q2Words];
    const total = allWords.length;
    // Q1 ends at this fraction of total words
    const q1Boundary = q1Words.length / total; // ~0.63

    // ── Master scroll-linked update — smooth continuous, no gaps ──
    const update = (progress: number) => {
      const p = progress;

      // Label: 0% → 3%
      const lp = clamp01(p / 0.03);
      if (labelLine) labelLine.style.transform = `scaleX(${lp})`;
      if (labelText) {
        labelText.style.opacity = String(lp);
        labelText.style.transform = `translateX(${(1 - lp) * -20}px)`;
      }

      // All words: 3% → 95% — continuous, no pauses
      const wp = clamp01((p - 0.03) / 0.92);
      const count = Math.ceil(wp * total);
      allWords.forEach((el, i) => {
        const show = i < count;
        el.style.opacity = show ? "1" : "0";
        el.style.filter = show ? "blur(0px)" : "blur(6px)";
        el.style.transform = show ? "translateY(0)" : "translateY(6px)";
      });

      // Divider: appears when Q1 words finish (overlaps with word reveal)
      const divStart = 0.03 + q1Boundary * 0.92;
      const dp = clamp01((p - divStart) / 0.02);
      if (divider) divider.style.transform = `scaleX(${dp})`;

      // Attribution: 93% → 98% (overlaps with last few words)
      const ap = clamp01((p - 0.93) / 0.05);
      if (attr) {
        attr.style.opacity = String(ap);
        attr.style.transform = `translateY(${(1 - ap) * 10}px)`;
      }
    };

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => update(self.progress),
    });

    // Apply initial state for current scroll position (handles HMR / refresh)
    update(st.progress);

    return () => st.kill();
  }, []);

  const renderWords = (text: string) =>
    text.split(" ").map((word, i) => (
      <span key={i} className="pw inline-block mr-[0.3em]">
        {word}
      </span>
    ));

  return (
    <section ref={sectionRef} className="relative min-h-[320vh]">
      {/* Sticky container — text stays pinned while you scroll through the section */}
      <div className="sticky top-[12vh]">
        {showScene && !isMobile && <PhilosophyScene />}

        <div className="relative z-10 mx-auto max-w-[1400px] px-[clamp(1.5rem,4vw,4rem)]">
          {/* Section label */}
          <div
            ref={labelRef}
            className="mb-[clamp(3rem,6vw,5rem)] flex items-center gap-5"
          >
            <div className="label-line h-[2px] w-[clamp(40px,8vw,100px)] bg-dark/30" />
            <span className="label-text font-body text-[clamp(2.2rem,4vw,4rem)] uppercase tracking-[0.3em] text-dark/40">
              // words I live by
            </span>
          </div>

          {/* Quote 1 */}
          <div ref={q1Ref}>
            <p className="font-body text-[clamp(2rem,3.7vw,3.7rem)] font-[400] leading-[1.4] tracking-[0.01em] text-dark">
              {renderWords(
                "I do not want a life that only looks impressive on paper. I want to build one where discipline, curiosity, and action compound into something undeniable."
              )}
              <span className="tw-cursor inline-block w-[0.55em] h-[1.1em] bg-dark/80 ml-[0.05em] align-middle translate-y-[0.05em] animate-[blink_1s_steps(1)_infinite]" />
            </p>
          </div>

          {/* Divider */}
          <div
            ref={dividerRef}
            className="my-[clamp(3.5rem,7vw,6rem)] h-[1px] w-[clamp(60px,10vw,140px)] bg-dark/15"
          />

          {/* Quote 2 */}
          <div ref={q2Ref}>
            <p className="font-body text-[clamp(2rem,3.7vw,3.7rem)] font-[400] leading-[1.4] tracking-[0.01em] text-dark">
              {renderWords(
                "Chasing a dream is really choosing who you are willing to become to deserve it."
              )}
              <span className="tw-cursor inline-block w-[0.55em] h-[1.1em] bg-dark/80 ml-[0.05em] align-middle translate-y-[0.05em] animate-[blink_1s_steps(1)_infinite_0.5s]" />
            </p>
          </div>

          {/* Attribution */}
          <div
            ref={attrRef}
            className="mt-[clamp(2rem,4vw,3rem)] flex items-center justify-end gap-4"
          >
            <div className="h-[1px] w-[clamp(30px,5vw,60px)] bg-dark/20" />
            <span className="font-body text-[clamp(1.2rem,2vw,1.65rem)] font-[400] uppercase tracking-[0.3em] text-dark/50">
              Ryan Kumar
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
