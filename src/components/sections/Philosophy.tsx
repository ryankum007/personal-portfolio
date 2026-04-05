"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PhilosophyScene = dynamic(
  () => import("@/components/three/PhilosophyScene"),
  { ssr: false }
);

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const [showScene, setShowScene] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowScene(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const els = section.querySelectorAll(".phil-reveal");
    gsap.set(els, { opacity: 0, y: 30 });

    const ctx = gsap.context(() => {
      els.forEach((el, i) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          delay: i * 0.08,
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-[clamp(6rem,12vw,10rem)]">
      {showScene && <PhilosophyScene />}

      <div className="relative z-10 mx-auto max-w-[1400px] px-[clamp(1.5rem,4vw,4rem)]">
        {/* Section label */}
        <div className="phil-reveal mb-[clamp(3rem,6vw,5rem)] flex items-center gap-5">
          <div className="h-[2px] w-[clamp(40px,8vw,100px)] bg-dark/30" />
          <span className="font-body text-[clamp(0.75rem,1.2vw,1rem)] uppercase tracking-[0.3em] text-dark/40">
            // words I live by
          </span>
        </div>

        {/* Quote 1 */}
        <div className="phil-reveal">
          <p className="font-body text-[clamp(1.5rem,3.2vw,3.2rem)] font-[400] leading-[1.45] tracking-[0.01em] text-dark">
            &ldquo;I do not want a life that only looks impressive on paper. I want to
            build one where discipline, curiosity, and action compound into
            something undeniable.&rdquo;
          </p>
        </div>

        {/* Divider */}
        <div className="phil-reveal my-[clamp(2.5rem,5vw,4rem)] h-[1px] w-[clamp(60px,10vw,140px)] bg-dark/15" />

        {/* Quote 2 */}
        <div className="phil-reveal">
          <p className="font-body text-[clamp(1.5rem,3.2vw,3.2rem)] font-[400] leading-[1.45] tracking-[0.01em] text-dark">
            &ldquo;Chasing a dream is really choosing who you are willing to become
            to deserve it.&rdquo;
          </p>
        </div>

        {/* Attribution */}
        <div className="phil-reveal mt-[clamp(2rem,4vw,3rem)] flex items-center justify-end gap-4">
          <div className="h-[1px] w-[clamp(30px,5vw,60px)] bg-dark/20" />
          <span className="font-body text-[clamp(1rem,1.6vw,1.4rem)] font-[400] uppercase tracking-[0.3em] text-dark/50">
            Ryan Kumar
          </span>
        </div>
      </div>
    </section>
  );
}
