"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    // Hide on touch devices
    if ("ontouchstart" in window) {
      cursor.style.display = "none";
      follower.style.display = "none";
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseEnter = () => {
      gsap.to(follower, {
        scale: 3,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(cursor, {
        opacity: 0,
        duration: 0.2,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(follower, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(cursor, {
        opacity: 1,
        duration: 0.2,
      });
    };

    window.addEventListener("mousemove", moveCursor);

    const interactiveElements = document.querySelectorAll(
      "a, button, [data-cursor-hover]"
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    // Re-observe for dynamically added elements
    const observer = new MutationObserver(() => {
      const newElements = document.querySelectorAll(
        "a, button, [data-cursor-hover]"
      );
      newElements.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      observer.disconnect();
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-dark mix-blend-difference md:block"
        style={{ willChange: "transform" }}
      />
      <div
        ref={followerRef}
        className="pointer-events-none fixed top-0 left-0 z-[9997] hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dark mix-blend-difference md:block"
        style={{ willChange: "transform" }}
      />
    </>
  );
}
