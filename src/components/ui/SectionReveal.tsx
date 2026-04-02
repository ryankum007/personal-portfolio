"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down";
}

export default function SectionReveal({
  children,
  className = "",
  direction = "up",
}: SectionRevealProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const from =
      direction === "up"
        ? "inset(100% 0% 0% 0%)"
        : "inset(0% 0% 100% 0%)";

    gsap.fromTo(
      el,
      { clipPath: from },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.2,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        },
      }
    );
  }, [direction]);

  return (
    <div ref={wrapperRef} className={className} style={{ clipPath: "inset(100% 0% 0% 0%)" }}>
      {children}
    </div>
  );
}
