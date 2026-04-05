"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteContent } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      className="inline-block ml-1"
    >
      <path
        d="M1 11L11 1M11 1H3M11 1V9"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const est = now.toLocaleTimeString("en-US", {
        timeZone: "America/Chicago",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      setTime(est);
    };
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ta = "play none none none";

    // Staggered item reveals
    gsap.from(footer.querySelectorAll(".footer-reveal"), {
      y: 30,
      opacity: 0,
      duration: 0.7,
      stagger: 0.06,
      ease: "power3.out",
      immediateRender: false,
      scrollTrigger: {
        trigger: footer,
        start: "top 85%",
        end: "top 30%",
        toggleActions: ta,
        once: true,
      },
    });

    // Giant name letters — cinematic 3D sweep
    if (nameRef.current) {
      const letters = nameRef.current.querySelectorAll("span");
      gsap.from(letters, {
        y: "120%",
        rotateX: -60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.04,
        ease: "power4.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: nameRef.current,
          start: "top 92%",
          end: "top 30%",
          toggleActions: ta,
          once: true,
        },
      });
    }
  }, []);

  return (
    <footer
      ref={footerRef}
      id="footer"
      className="px-[clamp(1.5rem,4vw,3.5rem)] pb-8 pt-20"
    >
      {/* Contact info — large right-aligned */}
      <div className="footer-reveal flex flex-col items-end gap-2">
        <a
          href={`mailto:${siteContent.personal.email}`}
          className="font-display text-[clamp(1.5rem,4vw,3.5rem)] font-700 uppercase leading-none text-dark transition-opacity hover:opacity-60"
          data-cursor-hover
        >
          {siteContent.personal.email}
        </a>
      </div>

      {/* Social links with arrows */}
      <div className="footer-reveal mt-8 flex flex-wrap justify-end gap-8">
        <a
          href={siteContent.personal.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="font-body text-[0.8rem] uppercase tracking-wider text-dark underline underline-offset-4 transition-opacity hover:opacity-60"
          data-cursor-hover
        >
          linkedin <ArrowIcon />
        </a>
        <a
          href="https://github.com/ryankumar"
          target="_blank"
          rel="noopener noreferrer"
          className="font-body text-[0.8rem] uppercase tracking-wider text-dark underline underline-offset-4 transition-opacity hover:opacity-60"
          data-cursor-hover
        >
          github <ArrowIcon />
        </a>
      </div>

      {/* Middle row: nav links + location */}
      <div className="mt-16 grid gap-8 md:grid-cols-12">
        {/* Nav links */}
        <div className="footer-reveal flex flex-col gap-2 md:col-span-3">
          <a
            href="#about"
            className="font-body text-[0.8rem] uppercase tracking-wider text-dark transition-opacity hover:opacity-60"
          >
            about
          </a>
          <a
            href="#timeline"
            className="font-body text-[0.8rem] uppercase tracking-wider text-dark transition-opacity hover:opacity-60"
          >
            timeline
          </a>
          <a
            href="#projects"
            className="font-body text-[0.8rem] uppercase tracking-wider text-dark transition-opacity hover:opacity-60"
          >
            projects
          </a>
          <a
            href="#skills"
            className="font-body text-[0.8rem] uppercase tracking-wider text-dark transition-opacity hover:opacity-60"
          >
            skills
          </a>
          <a
            href="#experience"
            className="font-body text-[0.8rem] uppercase tracking-wider text-dark transition-opacity hover:opacity-60"
          >
            experience
          </a>
        </div>

        {/* Location */}
        <div className="footer-reveal md:col-span-4 md:col-start-9">
          <p className="font-body text-[0.7rem] uppercase tracking-wider text-muted">
            Location:
          </p>
          <p className="font-body text-[0.8rem] leading-relaxed text-dark">
            Hardin-Simmons University<br />
            Dallas, Texas
          </p>
        </div>
      </div>

      {/* Giant name — must span full width like reference */}
      <h2
        ref={nameRef}
        className="mt-10 w-full overflow-hidden font-display font-700 uppercase leading-[0.85] tracking-[-0.04em] text-dark"
        style={{ fontSize: "min(18vw, 20rem)", perspective: "800px" }}
      >
        {"RYAN KUMAR".split("").map((char, i) => (
          <span key={i} className="inline-block">
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h2>

      {/* Bottom bar */}
      <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="footer-reveal">
          <p className="font-body text-[0.7rem] uppercase tracking-wider text-muted">
            Dallas, Texas: (CST) {time}
          </p>
        </div>

        <p className="footer-reveal text-right font-body text-[0.6rem] uppercase tracking-wider text-muted">
          {new Date().getFullYear()} All rights reserved. Ryan Kumar
        </p>
      </div>
    </footer>
  );
}
