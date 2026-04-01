"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const tl = gsap.timeline({ delay: 0.3 });
    const elements = container.querySelectorAll(".reveal");

    tl.from(elements, {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power4.out",
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex min-h-screen flex-col items-center justify-center px-6"
    >
      <h1 className="reveal font-display text-[clamp(6rem,20vw,14rem)] font-bold leading-none text-dark">
        404
      </h1>
      <p className="reveal mt-4 font-body text-lg text-muted">
        This page doesn&apos;t exist.
      </p>
      <a
        href="/"
        className="reveal mt-10 rounded-full border-2 border-dark px-10 py-4 font-body text-sm font-medium tracking-wide text-dark transition-colors duration-300 hover:bg-dark hover:text-light"
      >
        Back to Home
      </a>
    </div>
  );
}
