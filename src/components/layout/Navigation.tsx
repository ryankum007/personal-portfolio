"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const navLinks = [
  { label: "about me", href: "#about" },
  { label: "works", href: "#projects" },
  { label: "skills", href: "#skills" },
  { label: "connect", href: "#contact" },
];

function SpacedText({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split("").map((char, i) => (
        <span key={i} className="inline-block">
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    gsap.set(nav, { opacity: 0 });
    gsap.to(nav, {
      opacity: 1,
      duration: 0.8,
      delay: 3.2,
      ease: "power2.out",
    });
  }, []);

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
      <nav
        ref={navRef}
        className="fixed top-0 left-0 z-[100] flex w-full items-center justify-between px-[clamp(1.5rem,4vw,3.5rem)] py-5"
        style={{ mixBlendMode: "difference" }}
      >
        {/* Logo — stacked name */}
        <a
          href="#"
          className="font-display text-[clamp(0.75rem,1.2vw,1rem)] font-700 uppercase leading-[1] tracking-[0.02em] text-light"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <span className="block">RYAN</span>
          <span className="block">KUMAR</span>
        </a>

        {/* Desktop nav links — bracket style */}
        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group font-body text-[0.8rem] tracking-[0.05em] text-light transition-opacity duration-300 hover:opacity-60"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.href);
              }}
            >
              <span className="mr-1">[</span>
              <SpacedText
                text={link.label}
                className="inline-flex gap-[0.18em] uppercase"
              />
              <span className="ml-1">]</span>
            </a>
          ))}
        </nav>

        {/* Contact CTA — right side */}
        <a
          href="#contact"
          className="hidden items-center gap-2 font-body text-[0.8rem] font-medium uppercase tracking-[0.05em] text-light underline underline-offset-4 transition-opacity duration-300 hover:opacity-60 lg:flex"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick("#contact");
          }}
        >
          contact me
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className="inline-block"
          >
            <path
              d="M1 11L11 1M11 1H3M11 1V9"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </a>

        {/* Mobile hamburger */}
        <button
          className="relative z-[102] flex h-8 w-8 flex-col items-end justify-center gap-1.5 lg:hidden"
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
        className="fixed inset-0 z-[101] flex flex-col items-center justify-center bg-dark lg:hidden"
        style={{ clipPath: "inset(0% 0% 100% 0%)" }}
      >
        {navLinks.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            className="mobile-link block py-4 font-display text-[clamp(2rem,8vw,4rem)] font-bold uppercase text-light transition-opacity duration-300 hover:opacity-60"
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
