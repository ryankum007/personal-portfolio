"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "@/components/ui/TextReveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { siteContent } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const elements = section.querySelectorAll(".contact-reveal");
    gsap.from(elements, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 60%",
      },
    });

    // Decorative line expand
    if (lineRef.current) {
      gsap.from(lineRef.current, {
        scaleX: 0,
        duration: 1,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: section,
          start: "top 65%",
        },
      });
    }

    // Email parallax effect
    if (emailRef.current) {
      gsap.to(emailRef.current, {
        y: -20,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="px-[clamp(1.5rem,5vw,6rem)] py-[clamp(8rem,18vw,18rem)]"
    >
      <div className="mx-auto max-w-[1400px] text-center">
        <TextReveal
          as="span"
          className="label-uppercase text-muted"
          splitBy="chars"
          stagger={0.02}
        >
          Get in Touch
        </TextReveal>

        <div
          ref={lineRef}
          className="mx-auto mt-6 h-[1px] w-20 origin-center bg-dark/30"
        />

        <TextReveal
          as="h2"
          className="mx-auto mt-10 max-w-[1000px] font-display text-[clamp(2.5rem,7vw,6rem)] font-bold leading-[1.05] tracking-[-0.02em] text-dark"
          splitBy="words"
          stagger={0.05}
        >
          Let&apos;s build something together
        </TextReveal>

        <p className="contact-reveal mx-auto mt-8 max-w-[50ch] font-body text-[clamp(1rem,1.2vw,1.15rem)] leading-relaxed text-dark/60">
          Currently open to new opportunities. Whether you have a project in
          mind or just want to connect, I&apos;d love to hear from you.
        </p>

        <div
          ref={emailRef}
          className="contact-reveal mt-14 flex flex-col items-center gap-6 sm:flex-row sm:justify-center"
        >
          <MagneticButton
            href={`mailto:${siteContent.personal.email}`}
            className="rounded-full border-2 border-dark px-12 py-5 font-body text-sm font-medium tracking-wide text-dark transition-colors duration-300 hover:bg-dark hover:text-light"
          >
            {siteContent.personal.email}
          </MagneticButton>

          <MagneticButton
            href={siteContent.personal.linkedin}
            className="rounded-full border-2 border-dark/20 px-12 py-5 font-body text-sm font-medium tracking-wide text-dark/60 transition-colors duration-300 hover:border-dark hover:text-dark"
          >
            LinkedIn
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
