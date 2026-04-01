"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const preloader = preloaderRef.current;
    const counter = counterRef.current;
    const name = nameRef.current;
    if (!preloader || !counter || !name) return;

    // Prevent scroll during preloader
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        setIsComplete(true);
      },
    });

    // Counter animation 0 → 100
    tl.to(
      { val: 0 },
      {
        val: 100,
        duration: 2,
        ease: "power2.inOut",
        onUpdate: function () {
          if (counter) {
            counter.textContent = Math.round(this.targets()[0].val).toString();
          }
        },
      }
    );

    // Name reveal — each letter staggers in
    const chars = name.querySelectorAll(".preloader-char");
    tl.from(
      chars,
      {
        y: 80,
        opacity: 0,
        duration: 0.6,
        stagger: 0.04,
        ease: "power4.out",
      },
      "-=0.5"
    );

    // Hold briefly
    tl.to({}, { duration: 0.3 });

    // Curtain reveal — slide up
    tl.to(preloader, {
      yPercent: -100,
      duration: 1,
      ease: "power4.inOut",
    });
  }, []);

  if (isComplete) return null;

  const nameChars = "RYAN KUMAR".split("");

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-dark"
    >
      {/* Counter */}
      <div className="absolute bottom-8 right-8 font-body text-[clamp(1rem,2vw,1.5rem)] tabular-nums text-light/40">
        <span ref={counterRef}>0</span>
        <span>%</span>
      </div>

      {/* Name */}
      <div ref={nameRef} className="overflow-hidden">
        <div className="flex">
          {nameChars.map((char, i) => (
            <span
              key={i}
              className="preloader-char inline-block font-display text-[clamp(3rem,10vw,8rem)] font-bold text-light"
              style={{ whiteSpace: char === " " ? "pre" : undefined }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
