"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Cinematic horizontal line wipe that animates between sections.
 * The line grows from left to right as it enters the viewport,
 * creating a premium transition between content blocks.
 */
export default function SectionDivider({
  dark = false,
  accent = false,
}: {
  dark?: boolean;
  accent?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || !lineRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          end: "top 30%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      tl.fromTo(
        lineRef.current!,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 1.2, ease: "power3.inOut" }
      );

      if (dotRef.current) {
        tl.fromTo(
          dotRef.current,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(3)" },
          "-=0.3"
        );
      }
    }, ref.current!);

    return () => ctx.revert();
  }, []);

  const lineColor = dark ? "bg-light/10" : "bg-dark/10";
  const dotColor = dark ? "bg-light/20" : "bg-dark/20";

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${accent ? "py-1" : "py-0"}`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center gap-3 px-[clamp(1.5rem,4vw,3.5rem)]">
        <div
          ref={dotRef}
          className={`h-1.5 w-1.5 shrink-0 rounded-full ${dotColor}`}
        />
        <div ref={lineRef} className={`h-[1px] w-full ${lineColor}`} />
      </div>
    </div>
  );
}
