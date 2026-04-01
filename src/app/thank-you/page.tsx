"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ThankYou() {
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
      className="flex min-h-screen flex-col items-center justify-center px-6 text-center"
    >
      <h1 className="reveal font-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.1] text-dark">
        Thank you
      </h1>
      <p className="reveal mt-4 max-w-[40ch] font-body text-lg text-muted">
        Your message has been received. I&apos;ll get back to you as soon as
        possible.
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
