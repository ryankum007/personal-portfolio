"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const boundElements = useRef(new WeakSet<Element>());

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    const textEl = textRef.current;
    if (!cursor || !follower || !textEl) return;

    // Hide on touch devices
    if (
      "ontouchstart" in window ||
      window.matchMedia("(pointer: coarse)").matches
    ) {
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
      // Reset text cursor
      textEl.textContent = "";
      gsap.to(textEl, { opacity: 0, duration: 0.15 });
    };

    const handleTextEnter = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      const label = target.getAttribute("data-cursor-text");
      if (!label) return;

      textEl.textContent = label;
      gsap.to(follower, {
        scale: 5,
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(cursor, { opacity: 0, duration: 0.2 });
      gsap.to(textEl, { opacity: 1, duration: 0.25 });
    };

    const handleTextLeave = () => {
      textEl.textContent = "";
      gsap.to(textEl, { opacity: 0, duration: 0.15 });
      gsap.to(follower, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(cursor, { opacity: 1, duration: 0.2 });
    };

    const bindInteractiveElements = () => {
      // Bind text-cursor elements (e.g. project cards with data-cursor-text="View")
      const textElements = document.querySelectorAll("[data-cursor-text]");
      textElements.forEach((el) => {
        if (boundElements.current.has(el)) return;
        boundElements.current.add(el);
        el.addEventListener("mouseenter", handleTextEnter);
        el.addEventListener("mouseleave", handleTextLeave);
      });

      // Bind standard hover elements
      const elements = document.querySelectorAll(
        "a, button, [data-cursor-hover]"
      );
      elements.forEach((el) => {
        if (boundElements.current.has(el)) return;
        boundElements.current.add(el);
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
      });
    };

    window.addEventListener("mousemove", moveCursor);
    bindInteractiveElements();

    const observer = new MutationObserver(bindInteractiveElements);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      observer.disconnect();
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
      >
        <span
          ref={textRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-body text-[0.2rem] font-medium tracking-widest text-dark uppercase opacity-0"
        >
        </span>
      </div>
    </>
  );
}
