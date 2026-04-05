"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteContent } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

const TimelineTree = dynamic(
  () => import("@/components/three/TimelineTree"),
  { ssr: false }
);

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [showTree, setShowTree] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const timeline = siteContent.timeline;

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    setIsMobile(mobile);
    if (!mobile) {
      const timer = setTimeout(() => setShowTree(true), 500);
      return () => clearTimeout(timer);
    } else {
      setShowTree(true);
    }
  }, []);

  // GSAP animations
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading chars
      if (headingRef.current) {
        const chars = headingRef.current.querySelectorAll(".tl-char");
        gsap.from(chars, {
          y: "120%",
          rotateX: -60,
          opacity: 0,
          duration: 1,
          stagger: 0.03,
          ease: "power4.out",
          immediateRender: false,
          scrollTrigger: { trigger: headingRef.current, start: "top 85%", once: true },
        });
      }

      // Subtext
      const sub = section.querySelector(".tl-sub");
      if (sub) {
        gsap.from(sub, {
          y: 20,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: { trigger: sub, start: "top 90%", once: true },
        });
      }

      // Tree container fade in
      const treeContainer = section.querySelector(".tl-tree");
      if (treeContainer) {
        gsap.from(treeContainer, {
          opacity: 0,
          y: 40,
          duration: 1,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: { trigger: treeContainer, start: "top 85%", once: true },
        });
      }

      // Mobile cards
      const cards = section.querySelectorAll(".tl-mobile-card");
      if (cards.length) {
        gsap.from(cards, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.06,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: { trigger: cards[0], start: "top 90%", once: true },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="relative overflow-hidden px-[clamp(1.5rem,4vw,3.5rem)] py-[clamp(6rem,12vw,14rem)]"
    >
      <div className="relative z-10 mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="font-body text-[0.65rem] uppercase tracking-[0.35em] text-dark/50">
              // the journey so far
            </span>
            <h2
              ref={headingRef}
              className="mt-3 overflow-hidden font-display text-[clamp(2.5rem,8vw,7rem)] font-bold uppercase leading-[0.95] text-dark"
              style={{ perspective: "600px" }}
            >
              {("Timeline").split("").map((char, i) => (
                <span key={i} className="tl-char inline-block" style={{ transformOrigin: "bottom center" }}>
                  {char}
                </span>
              ))}
            </h2>
          </div>

          {/* Year range */}
          <div className="flex items-center gap-4">
            <span className="font-display text-[1.2rem] font-bold text-dark/15">2002</span>
            <div className="h-[1px] w-12 bg-dark/10" />
            <span className="font-display text-[1.2rem] font-bold text-dark/15">2026</span>
          </div>
        </div>

        {/* Description */}
        <p className="tl-sub mb-8 max-w-[500px] font-body text-[clamp(0.8rem,1vw,0.9rem)] leading-relaxed text-dark/50">
          Click any node on the tree to explore a milestone. Each branch represents a chapter in my journey across three continents.
        </p>

        {/* 3D Tree — desktop */}
        {!isMobile && (
          <div className="tl-tree">
            {showTree && <TimelineTree events={timeline} />}
          </div>
        )}

        {/* Mobile fallback — simple list */}
        {isMobile && (
          <div className="space-y-3">
            {timeline.map((event, i) => (
              <div
                key={i}
                className="tl-mobile-card border border-dark/8 p-4 transition-all duration-300 hover:border-dark/15"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-body text-[0.5rem] uppercase tracking-[0.2em] text-dark/35">
                    {event.type}
                  </span>
                  <span className="ml-auto font-display text-[0.7rem] font-bold text-dark/20">
                    {event.year}
                  </span>
                </div>
                <h3 className="font-display text-[0.95rem] font-semibold leading-snug text-dark">
                  {event.title}
                </h3>
                <span className="mt-0.5 block font-body text-[0.55rem] text-dark/35">
                  {event.location}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Bottom */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="h-[1px] w-12 bg-dark/8" />
          <span className="font-body text-[0.55rem] uppercase tracking-[0.3em] text-dark/25">
            {timeline.length} milestones
          </span>
          <div className="h-[1px] w-12 bg-dark/8" />
        </div>
      </div>
    </section>
  );
}
