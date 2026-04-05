"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<((time: number) => void) | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Expose globally so other components can trigger resize
    (window as unknown as Record<string, unknown>).__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    rafRef.current = raf;

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Resize handling — only resize Lenis, never call ScrollTrigger.refresh()
    // as it causes scroll-triggered animations to replay on page load.
    // ScrollTrigger positions update naturally via the Lenis scroll listener.
    const wrapper = wrapperRef.current;
    let resizeTimer: ReturnType<typeof setTimeout>;

    const ro = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        lenis.resize();
      }, 300);
    });

    if (wrapper) {
      ro.observe(wrapper);
    }

    return () => {
      clearTimeout(resizeTimer);
      ro.disconnect();
      if (rafRef.current) gsap.ticker.remove(rafRef.current);
      lenis.destroy();
      delete (window as unknown as Record<string, unknown>).__lenis;
    };
  }, []);

  return <div ref={wrapperRef} id="smooth-wrapper">{children}</div>;
}
