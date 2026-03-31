"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Fade in nav after preloader
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    gsap.set(nav, { opacity: 0 });
    gsap.to(nav, {
      opacity: 1,
      duration: 0.8,
      delay: 3.2, // After preloader finishes
      ease: "power2.out",
    });
  }, []);

  // Mobile menu timeline
  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    const tl = gsap.timeline({ paused: true });
    const links = menu.querySelectorAll(".mobile-link");

    tl.to(menu, {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 0.6,
      ease: "power4.inOut",
    }).from(
      links,
      {
        y: 60,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power3.out",
      },
      "-=0.2"
    );

    tlRef.current = tl;
  }, []);

  useEffect(() => {
    if (isOpen) {
      tlRef.current?.play();
      document.body.style.overflow = "hidden";
    } else {
      tlRef.current?.reverse();
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 z-[100] flex w-full items-center justify-between px-[clamp(1.5rem,5vw,4rem)] py-6"
        style={{ mixBlendMode: "difference" }}
      >
        <a
          href="#"
          className="font-display text-lg font-semibold text-light"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          Ryan Kumar
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-sm font-medium text-light transition-opacity duration-300 hover:opacity-60"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.href);
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="relative z-[102] flex h-8 w-8 flex-col items-end justify-center gap-1.5 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <span
            className={`block h-[1.5px] bg-light transition-all duration-300 ${
              isOpen ? "w-6 translate-y-[4.5px] rotate-45" : "w-6"
            }`}
          />
          <span
            className={`block h-[1.5px] bg-light transition-all duration-300 ${
              isOpen ? "w-6 -translate-y-[4.5px] -rotate-45" : "w-4"
            }`}
          />
        </button>
      </nav>

      {/* Mobile fullscreen menu */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-[101] flex flex-col items-center justify-center bg-dark md:hidden"
        style={{ clipPath: "inset(0% 0% 100% 0%)" }}
      >
        {navLinks.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            className="mobile-link block py-4 font-display text-[clamp(2rem,8vw,4rem)] font-semibold text-light transition-opacity duration-300 hover:opacity-60"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick(link.href);
            }}
          >
            <span className="mr-4 font-body text-sm text-light/40">
              0{i + 1}
            </span>
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
}
