"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  splitBy?: "chars" | "words" | "lines";
  delay?: number;
  duration?: number;
  stagger?: number;
  start?: string;
}

export default function TextReveal({
  children,
  as: Tag = "h2",
  className = "",
  splitBy = "words",
  delay = 0,
  duration = 0.8,
  stagger = 0.04,
  start = "top 85%",
}: TextRevealProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const containerRef = useRef<any>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll(".split-item");

    gsap.set(elements, { y: "100%", opacity: 0 });

    gsap.to(elements, {
      y: "0%",
      opacity: 1,
      duration,
      stagger,
      delay,
      ease: "power4.out",
      scrollTrigger: {
        trigger: container,
        start,
        toggleActions: "play none none none",
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === container) st.kill();
      });
    };
  }, [delay, duration, stagger, start]);

  const splitContent = () => {
    if (splitBy === "chars") {
      return children.split("").map((char, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <span
            className="split-item inline-block"
            style={{ whiteSpace: char === " " ? "pre" : undefined }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        </span>
      ));
    }
    if (splitBy === "words") {
      return children.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <span className="split-item inline-block">{word}</span>
          {i < children.split(" ").length - 1 && "\u00A0"}
        </span>
      ));
    }
    // lines — treat the entire string as one block
    return (
      <span className="inline-block overflow-hidden">
        <span className="split-item inline-block">{children}</span>
      </span>
    );
  };

  return (
    <Tag ref={containerRef} className={className}>
      {splitContent()}
    </Tag>
  );
}
