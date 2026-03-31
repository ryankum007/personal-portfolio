"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    gsap.from(footer.querySelectorAll(".footer-item"), {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: footer,
        start: "top 90%",
      },
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      ref={footerRef}
      className="border-t border-dark/10 px-[clamp(1.5rem,5vw,6rem)] py-8"
    >
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 md:flex-row">
        <p className="footer-item font-body text-sm text-muted">
          &copy; {new Date().getFullYear()} Ryan Kumar. All rights reserved.
        </p>

        <div className="footer-item flex items-center gap-6">
          <a
            href="https://www.linkedin.com/in/ryan-kumar-4491291aa/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-sm text-muted transition-colors duration-300 hover:text-dark"
          >
            LinkedIn
          </a>
          <a
            href="mailto:ryankumar@ryankumar.net"
            className="font-body text-sm text-muted transition-colors duration-300 hover:text-dark"
          >
            Email
          </a>
        </div>

        <button
          onClick={scrollToTop}
          className="footer-item cursor-pointer font-body text-sm text-muted transition-colors duration-300 hover:text-dark"
          aria-label="Back to top"
        >
          Back to top
        </button>
      </div>
    </footer>
  );
}
