"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ContactScene = dynamic(
  () => import("@/components/three/ContactScene"),
  { ssr: false }
);

function SpacedHeading({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, wi) => (
        <span key={wi} className={wi > 0 ? "ml-[0.5em]" : ""}>
          {word.split("").map((char, ci) => (
            <span key={ci} className="inline-block">
              {char}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [showScene, setShowScene] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    setIsMobile(mobile);
    if (!mobile) {
      const timer = setTimeout(() => setShowScene(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Section entrance
    gsap.fromTo(
      section,
      { clipPath: "inset(4% 0% 0% 0%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 92%" },
      }
    );

    // Heading reveals
    const headings = section.querySelectorAll(".contact-heading");
    headings.forEach((h) => {
      const letters = h.querySelectorAll("span");
      gsap.from(letters, {
        y: "100%",
        opacity: 0,
        duration: 0.8,
        stagger: 0.02,
        ease: "power4.out",
        scrollTrigger: { trigger: h, start: "top 85%" },
      });
    });

    // Form fields
    const fields = section.querySelectorAll(".form-field");
    gsap.from(fields, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: { trigger: formRef.current, start: "top 80%" },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative px-[clamp(1.5rem,4vw,3.5rem)] py-[clamp(6rem,14vw,16rem)]"
    >
      {showScene && !isMobile && <ContactScene />}

      <div className="relative z-10 mx-auto max-w-[1400px]">
        {/* Heading block */}
        <div className="mb-20">
          <h3 className="contact-heading overflow-hidden font-display text-[clamp(1rem,1.8vw,1.5rem)] font-600 text-dark">
            <SpacedHeading text="Let's start the conversation" />
          </h3>

          <h2 className="contact-heading mt-4 overflow-hidden font-display text-[clamp(2.5rem,7vw,6rem)] font-700 uppercase leading-[0.95] text-dark">
            <SpacedHeading text="Great work" />
          </h2>

          <h3 className="contact-heading overflow-hidden font-display text-[clamp(1.2rem,2.2vw,1.8rem)] font-500 text-dark">
            starts with
          </h3>

          <h2 className="contact-heading mt-2 overflow-hidden font-display text-[clamp(1.8rem,5vw,4rem)] font-700 uppercase leading-[0.95] tracking-[0.15em] text-dark">
            <SpacedHeading text="great collaboration" />
          </h2>
        </div>

        {/* Form */}
        <div className="grid gap-16 md:grid-cols-2">
          <form
            ref={formRef}
            className="space-y-10"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="form-field">
              <input
                type="text"
                placeholder="your name*"
                required
                className="w-full border-b border-dark/20 bg-transparent py-3 font-body text-sm text-dark placeholder:text-dark/40 focus:border-dark focus:outline-none"
              />
            </div>

            <div className="form-field">
              <input
                type="email"
                placeholder="your email*"
                required
                className="w-full border-b border-dark/20 bg-transparent py-3 font-body text-sm text-dark placeholder:text-dark/40 focus:border-dark focus:outline-none"
              />
            </div>

            <div className="form-field">
              <input
                type="text"
                placeholder="How can I help you"
                className="w-full border-b border-dark/20 bg-transparent py-3 font-body text-sm text-dark placeholder:text-dark/40 focus:border-dark focus:outline-none"
              />
            </div>

            <div className="form-field">
              <h4 className="mb-4 font-body text-xs uppercase tracking-wider text-muted">
                project type
              </h4>
              <div className="flex flex-wrap gap-3">
                {["Full-Stack", "AI/ML", "Mobile", "Other"].map((type) => (
                  <label
                    key={type}
                    className="cursor-pointer font-body text-[0.75rem] tracking-[0.1em] text-dark transition-opacity hover:opacity-60"
                  >
                    <span>[ </span>
                    <input
                      type="radio"
                      name="projectType"
                      value={type}
                      className="sr-only"
                    />
                    <span>{type}</span>
                    <span> ]</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="group mt-4 flex cursor-pointer items-center gap-3 font-body text-sm uppercase tracking-wider text-dark transition-opacity hover:opacity-60"
              data-cursor-hover
            >
              Discuss the project
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M1 11L11 1M11 1H3M11 1V9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </button>
          </form>

          {/* Textarea / message */}
          <div className="form-field">
            <textarea
              placeholder="Tell me about your project..."
              rows={8}
              className="w-full resize-none border-b border-dark/20 bg-transparent py-3 font-body text-sm text-dark placeholder:text-dark/40 focus:border-dark focus:outline-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
