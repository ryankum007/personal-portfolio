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

    // Divider line animate
    const divider = footer.querySelector(".footer-divider");
    if (divider) {
      gsap.from(divider, {
        scaleX: 0,
        transformOrigin: "left",
        duration: 0.8,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: footer,
          start: "top 95%",
        },
      });
    }

    gsap.from(footer.querySelectorAll(".footer-item"), {
      y: 15,
      opacity: 0,
      duration: 0.5,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: {
        trigger: footer,
        start: "top 92%",
      },
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer ref={footerRef} className="px-[clamp(1.5rem,5vw,6rem)] py-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="footer-divider mb-8 h-[1px] w-full bg-dark/10" />
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="footer-item font-body text-sm text-muted">
            &copy; {new Date().getFullYear()} Ryan Kumar
          </p>

          <div className="footer-item flex items-center gap-8">
            <a
              href="https://www.linkedin.com/in/ryan-kumar-4491291aa/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm text-muted transition-colors duration-300 hover:text-dark"
              data-cursor-hover
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/ryankumar"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm text-muted transition-colors duration-300 hover:text-dark"
              data-cursor-hover
            >
              GitHub
            </a>
            <a
              href="mailto:ryankumar@ryankumar.net"
              className="font-body text-sm text-muted transition-colors duration-300 hover:text-dark"
              data-cursor-hover
            >
              Email
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="footer-item cursor-pointer font-body text-sm text-muted transition-colors duration-300 hover:text-dark"
            aria-label="Back to top"
            data-cursor-hover
          >
            Back to top &uarr;
          </button>
        </div>
      </div>
    </footer>
  );
}
