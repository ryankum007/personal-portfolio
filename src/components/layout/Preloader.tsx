"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const preloader = preloaderRef.current;
    const counter = counterRef.current;
    if (!preloader || !counter) return;

    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        setIsComplete(true);
      },
    });

    // Counter 0 → 100% (reference style)
    tl.to(
      { val: 0 },
      {
        val: 100,
        duration: 2.2,
        ease: "power2.inOut",
        onUpdate: function () {
          if (counter) {
            counter.textContent =
              Math.round(this.targets()[0].val).toString() + "%";
          }
        },
      }
    );

    // Brief hold
    tl.to({}, { duration: 0.4 });

    // Curtain slide up
    tl.to(preloader, {
      yPercent: -100,
      duration: 1,
      ease: "power4.inOut",
    });
  }, []);

  if (isComplete) return null;

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-dark"
    >
      <span
        ref={counterRef}
        className="font-display text-[clamp(4rem,15vw,12rem)] font-bold uppercase leading-none text-light"
      >
        0%
      </span>
    </div>
  );
}
