"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteContent } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

const AboutScene = dynamic(() => import("@/components/three/AboutScene"), {
  ssr: false,
});

/* ─── Stat counter that animates on scroll ─── */
function AnimatedStat({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!numRef.current || !ref.current) return;
    const el = numRef.current;

    gsap.from(el, {
      textContent: 0,
      duration: 2.5,
      snap: { textContent: 1 },
      ease: "power2.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 85%",
        once: true,
      },
    });
  }, []);

  return (
    <div ref={ref} className="about-stat">
      <div className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-none text-dark">
        <span ref={numRef}>{value}</span>
        {suffix}
      </div>
      <span className="mt-2 block font-body text-[0.6rem] uppercase tracking-[0.3em] text-dark/50">
        {label}
      </span>
    </div>
  );
}

/* ─── Elegant 3D Polaroid Photo ─── */
function PolaroidPhoto({ image }: { image: string }) {
  const polaroidRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = polaroidRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const rotateY = (x - 0.5) * 18;
    const rotateX = (0.5 - y) * 12;

    gsap.to(el, {
      rotateY,
      rotateX,
      duration: 0.5,
      ease: "power2.out",
      overwrite: true,
    });

    // Glare follows cursor
    if (glareRef.current) {
      gsap.to(glareRef.current, {
        opacity: 0.18,
        x: `${x * 100}%`,
        y: `${y * 100}%`,
        duration: 0.3,
        overwrite: true,
      });
    }

    // Shadow shifts opposite to tilt
    if (shadowRef.current) {
      gsap.to(shadowRef.current, {
        x: -rotateY * 1.5,
        y: rotateX * 1.5 + 12,
        duration: 0.5,
        ease: "power2.out",
        overwrite: true,
      });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = polaroidRef.current;
    if (!el) return;
    gsap.to(el, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.5)",
    });
    if (glareRef.current) {
      gsap.to(glareRef.current, { opacity: 0, duration: 0.5 });
    }
    if (shadowRef.current) {
      gsap.to(shadowRef.current, { x: 0, y: 12, duration: 0.6, ease: "power3.out" });
    }
  }, []);

  return (
    <div className="relative" style={{ perspective: "1000px" }}>
      {/* Dynamic shadow under polaroid */}
      <div
        ref={shadowRef}
        className="absolute left-6 right-6 -bottom-3 h-12 -z-10"
        style={{
          background: "radial-gradient(ellipse, rgba(16,16,16,0.14) 0%, transparent 70%)",
          filter: "blur(8px)",
          transform: "translateY(12px)",
        }}
      />

      {/* Polaroid frame with 3D tilt */}
      <div
        ref={polaroidRef}
        className="about-reveal relative z-10 mx-auto w-full max-w-[420px]"
        style={{
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="relative overflow-hidden bg-[#FAFAFA] p-3 pb-16 md:p-4 md:pb-20"
          style={{
            boxShadow: "0 12px 50px rgba(16,16,16,0.12), 0 4px 12px rgba(16,16,16,0.06)",
            transform: "translateZ(30px)",
          }}
        >
          {/* Photo — 3:4 aspect, no cutoff */}
          <div className="relative aspect-[3/4] overflow-hidden bg-dark/5">
            <img
              src={image}
              alt="Ryan Kumar"
              className="h-full w-full object-cover object-top"
              style={{ filter: "contrast(1.02) saturate(0.95)" }}
            />

            {/* Vignette */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: "radial-gradient(ellipse at center, transparent 55%, rgba(16,16,16,0.12) 100%)",
              }}
            />

            {/* Film grain */}
            <div
              className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-[0.04]"
              style={{
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
                backgroundSize: "100px 100px",
              }}
            />
          </div>

          {/* Polaroid caption */}
          <div className="mt-4 flex items-end justify-between px-1 md:mt-5">
            <div>
              <span className="font-display text-[0.95rem] font-semibold text-dark/75">
                Ryan Kumar
              </span>
              <span className="mt-1 block font-body text-[0.55rem] uppercase tracking-[0.25em] text-dark/30">
                Software Engineer / Dallas, TX
              </span>
            </div>
            <span className="font-body text-[0.5rem] tracking-wider text-dark/20">
              2026
            </span>
          </div>

          {/* Light glare that follows cursor */}
          <div
            ref={glareRef}
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 h-[200%] w-[200%] rounded-full opacity-0"
            style={{
              background: "radial-gradient(circle, rgba(255,255,255,0.35) 0%, transparent 50%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showScene, setShowScene] = useState(false);

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

    const ctx = gsap.context(() => {
      const ta = "play none none none";

      // ── Heading char sweep with 3D perspective ──
      if (headingRef.current) {
        const chars = headingRef.current.querySelectorAll(".about-char");
        gsap.from(chars, {
          y: "130%",
          rotateX: -90,
          opacity: 0,
          duration: 1.2,
          stagger: 0.03,
          ease: "power4.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 82%",
            end: "top 20%",
            toggleActions: ta,
            once: true,
          },
        });
      }

      // ── Photo curtain wipe + parallax zoom ──
      const photoWrap = section.querySelector(".about-reveal");
      if (photoWrap) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: photoWrap,
            start: "top 78%",
            end: "top 20%",
            toggleActions: ta,
            once: true,
          },
        });

        tl.from(photoWrap, {
          clipPath: "inset(100% 0% 0% 0%)",
          duration: 1.4,
          ease: "power4.inOut",
        }).from(
          photoWrap.querySelector("img"),
          {
            scale: 1.35,
            duration: 1.8,
            ease: "power3.out",
          },
          "-=1.2"
        );

        // Parallax on photo image
        gsap.to(photoWrap.querySelector("img"), {
          yPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: photoWrap,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // ── Text blocks — dramatic stagger ──
      const blocks = section.querySelectorAll(".about-text-reveal");
      blocks.forEach((block) => {
        gsap.from(block, {
          y: 80,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: block,
            start: "top 90%",
            end: "top 30%",
            toggleActions: ta,
            once: true,
          },
        });
      });

      // ── Individual lines slide from left ──
      const lineGroups = section.querySelectorAll(".about-line-group");
      lineGroups.forEach((group) => {
        const lines = group.querySelectorAll(".about-line");
        gsap.from(lines, {
          x: -60,
          opacity: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: group,
            start: "top 88%",
            end: "top 30%",
            toggleActions: ta,
            once: true,
          },
        });
      });

      // ── Section headings — slide in with line ──
      const sectionHeadings = section.querySelectorAll(
        ".about-section-heading"
      );
      sectionHeadings.forEach((heading) => {
        gsap.from(heading, {
          x: -40,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: heading,
            start: "top 90%",
            end: "top 30%",
            toggleActions: ta,
            once: true,
          },
        });
        const line = heading.querySelector("span:first-child");
        if (line) {
          gsap.from(line, {
            scaleX: 0,
            transformOrigin: "left",
            duration: 0.8,
            ease: "power3.inOut",
            immediateRender: false,
            scrollTrigger: {
              trigger: heading,
              start: "top 90%",
              end: "top 30%",
              toggleActions: ta,
              once: true,
            },
          });
        }
      });

      // ── Dividers animate width ──
      const dividers = section.querySelectorAll(".about-divider");
      dividers.forEach((div) => {
        gsap.from(div, {
          scaleX: 0,
          transformOrigin: "left",
          duration: 1.2,
          ease: "power3.inOut",
          immediateRender: false,
          scrollTrigger: {
            trigger: div,
            start: "top 90%",
            end: "top 30%",
            toggleActions: ta,
            once: true,
          },
        });
      });

      // ── Stats pop in with scale ──
      const stats = section.querySelectorAll(".about-stat");
      if (stats.length) {
        gsap.from(stats, {
          y: 50,
          opacity: 0,
          scale: 0.85,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: stats[0],
            start: "top 85%",
            end: "top 30%",
            toggleActions: ta,
            once: true,
          },
        });
      }

      // ── Tags pop with bounce ──
      const tags = section.querySelectorAll(".about-tag");
      if (tags.length) {
        gsap.from(tags, {
          scale: 0.6,
          opacity: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: "back.out(3)",
          immediateRender: false,
          scrollTrigger: {
            trigger: tags[0],
            start: "top 88%",
            end: "top 30%",
            toggleActions: ta,
            once: true,
          },
        });
      }

      // ── Floating decorative shapes parallax ──
      const floaters = section.querySelectorAll(".about-floater");
      floaters.forEach((el, i) => {
        gsap.to(el, {
          yPercent: -80 - i * 30,
          rotate: 15 + i * 10,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // ── Horizontal marquee divider ──
      if (marqueeRef.current) {
        const inner = marqueeRef.current.querySelector(
          ".about-marquee-inner"
        ) as HTMLElement;
        if (inner) {
          const tween = gsap.to(inner, {
            xPercent: -50,
            duration: 20,
            ease: "none",
            repeat: -1,
          });

          ScrollTrigger.create({
            trigger: marqueeRef.current,
            start: "top bottom",
            end: "bottom top",
            onUpdate: (self) => {
              const v = Math.abs(self.getVelocity());
              tween.timeScale(Math.min(1 + v / 2500, 3));
            },
          });
        }
      }

      // ── CTA link animation ──
      const ctaLink = section.querySelector(".about-cta");
      if (ctaLink) {
        gsap.from(ctaLink, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: { trigger: ctaLink, start: "top 92%", once: true },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden px-[clamp(1.5rem,4vw,3.5rem)] py-[clamp(6rem,12vw,14rem)]"
    >
      {/* 3D planes flying in background — desktop only */}
      {showScene && !isMobile && <AboutScene />}

      {/* Floating decorative shapes — parallax on scroll */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className="about-floater absolute right-[8%] top-[15%] h-24 w-24 rounded-full border border-dark/[0.04]"
        />
        <div
          className="about-floater absolute left-[5%] top-[45%] h-[1px] w-16 bg-dark/[0.06] rotate-12"
        />
        <div
          className="about-floater absolute right-[15%] bottom-[25%] h-16 w-16 border border-dark/[0.03]"
          style={{ transform: "rotate(45deg)" }}
        />
        <div
          className="about-floater absolute left-[12%] bottom-[10%] h-2 w-2 rounded-full bg-dark/[0.06]"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px]">
        {/* ── Header row ── */}
        <div className="mb-16 flex flex-col gap-6 md:mb-24 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="about-text-reveal font-body text-[0.65rem] uppercase tracking-[0.35em] text-dark/50">
              Get to know me
            </span>
            <h2
              ref={headingRef}
              className="mt-3 overflow-hidden font-display text-[clamp(2.5rem,7vw,6rem)] font-bold uppercase leading-[0.85] text-dark"
              style={{ perspective: "600px" }}
            >
              {"About Me".split("").map((char, i) => (
                <span
                  key={i}
                  className="about-char inline-block"
                  style={{ transformOrigin: "bottom center" }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h2>
          </div>

          {/* Stats row */}
          <div className="flex gap-10 md:gap-14">
            <AnimatedStat value={5} suffix="+" label="Years Exp" />
            <AnimatedStat value={12} suffix="" label="Projects" />
            <AnimatedStat value={9} suffix="" label="Roles" />
          </div>
        </div>

        {/* ── Main content — asymmetric two-column ── */}
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          {/* Left: Photo + identity */}
          <div className="md:col-span-5">
            {/* Photo with 3D tilt + curtain wipe + zoom */}
            <PolaroidPhoto image="/Pics/ED38160B-8097-4853-BED9-8CBE12DE88F7_1_105_c.jpeg" />

            {/* Quick tags under photo */}
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "HSU CS + Business",
                "McMaster Engineering",
                "Full-Stack",
                "Analytics",
                "Glider Pilot",
                "Air Cadets",
              ].map((tag) => (
                <span
                  key={tag}
                  className="about-tag rounded-full border border-dark/10 px-3 py-1.5 font-body text-[0.6rem] uppercase tracking-[0.15em] text-dark/60 transition-all duration-300 hover:border-dark/30 hover:text-dark/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Story content */}
          <div className="space-y-14 md:col-span-6 md:col-start-7">
            {/* Intro block */}
            <div className="about-text-reveal">
              <h3 className="about-section-heading mb-5 flex items-center gap-3 font-body text-[0.65rem] uppercase tracking-[0.3em] text-dark/50">
                <span className="h-[1px] w-8 bg-dark/20" />
                Who I Am
              </h3>
              <div className="about-line-group">
                <p className="about-line font-body text-[clamp(0.85rem,1.1vw,1rem)] leading-[1.85] text-dark/75">
                  Born in India, raised in Melbourne, and shaped by Toronto
                  &mdash; I&apos;ve lived across three continents before
                  turning 23. I&apos;m currently finishing my B.S. in Computer
                  Science with a Business minor at Hardin-Simmons University
                  in Texas (4.0 GPA, Presidential Scholar), having transferred
                  from McMaster University&apos;s Software Engineering program
                  (3.5 GPA, Dean&apos;s List 4x, Engineering Scholar).
                </p>
              </div>
            </div>

            <div className="about-divider h-[1px] bg-dark/8" />

            {/* Education */}
            <div className="about-text-reveal">
              <h3 className="about-section-heading mb-5 flex items-center gap-3 font-body text-[0.65rem] uppercase tracking-[0.3em] text-dark/50">
                <span className="h-[1px] w-8 bg-dark/20" />
                Education
              </h3>
              <div className="about-line-group space-y-3">
                <p className="about-line font-body text-[clamp(0.85rem,1.1vw,1rem)] leading-[1.85] text-dark/75">
                  My academic path spans two universities and two countries.
                  At McMaster, I studied Software Engineering and made the
                  Dean&apos;s List four times while serving as a First Year
                  Representative on the Engineering Society. At HSU, I&apos;m
                  combining CS with business coursework in corporate finance,
                  M&A, and analytics &mdash; bridging the gap between
                  technical execution and strategic thinking.
                </p>
              </div>
            </div>

            <div className="about-divider h-[1px] bg-dark/8" />

            {/* Beyond the code */}
            <div className="about-text-reveal">
              <h3 className="about-section-heading mb-5 flex items-center gap-3 font-body text-[0.65rem] uppercase tracking-[0.3em] text-dark/50">
                <span className="h-[1px] w-8 bg-dark/20" />
                Beyond the Code
              </h3>
              <div className="about-line-group">
                <p className="about-line font-body text-[clamp(0.85rem,1.1vw,1rem)] leading-[1.85] text-dark/75">
                  I hold a Glider Pilot License from the Royal Canadian Air
                  Cadets, where I spent five years rising to Flight Sergeant
                  and Level 5 Senior Mentor. I led multi-day expeditions,
                  taught bushcraft survival and aerial navigation, and
                  delivered speeches at Remembrance Day ceremonies. Aviation
                  taught me discipline, spatial awareness, and making
                  decisions under pressure &mdash; skills that carry into
                  every system I build.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="about-cta pt-4">
              <a
                href={siteContent.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 font-body text-[0.85rem] text-dark transition-all duration-300 hover:gap-5"
              >
                <span className="relative">
                  Let&apos;s connect
                  <span className="absolute -bottom-1 left-0 h-[1px] w-full origin-left scale-x-100 bg-dark/30 transition-all duration-300 group-hover:scale-x-0" />
                  <span className="absolute -bottom-1 left-0 h-[1px] w-full origin-right scale-x-0 bg-dark transition-all duration-300 group-hover:scale-x-100" />
                </span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                >
                  <path
                    d="M1 13L13 1M13 1H5M13 1V9"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* ── Horizontal marquee divider ── */}
        <div
          ref={marqueeRef}
          className="mt-24 overflow-hidden border-y border-dark/6 py-5 md:mt-32"
        >
          <div className="about-marquee-inner flex w-max gap-16 whitespace-nowrap">
            {[
              "Software Engineer",
              "Glider Pilot",
              "Analytics",
              "McMaster Engineering",
              "HSU Presidential Scholar",
              "Air Cadets",
              "Software Engineer",
              "Glider Pilot",
              "Analytics",
              "McMaster Engineering",
              "HSU Presidential Scholar",
              "Air Cadets",
            ].map((text, i) => (
              <span
                key={i}
                className="font-display text-[clamp(1.2rem,2.5vw,2rem)] font-semibold uppercase text-dark/20"
              >
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
