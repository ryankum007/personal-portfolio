import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const fadeInUp = (
  element: gsap.TweenTarget,
  trigger: Element,
  options: {
    delay?: number;
    duration?: number;
    y?: number;
    start?: string;
    stagger?: number;
  } = {}
) => {
  const {
    delay = 0,
    duration = 0.8,
    y = 60,
    start = "top 85%",
    stagger = 0,
  } = options;

  return gsap.from(element, {
    y,
    opacity: 0,
    duration,
    delay,
    stagger,
    ease: "power3.out",
    scrollTrigger: {
      trigger,
      start,
      toggleActions: "play none none none",
    },
  });
};

export const revealFromBottom = (
  element: gsap.TweenTarget,
  trigger: Element,
  options: { delay?: number; duration?: number; start?: string } = {}
) => {
  const { delay = 0, duration = 0.8, start = "top 85%" } = options;

  return gsap.from(element, {
    clipPath: "inset(100% 0% 0% 0%)",
    duration,
    delay,
    ease: "power4.out",
    scrollTrigger: {
      trigger,
      start,
      toggleActions: "play none none none",
    },
  });
};

export const staggerChildren = (
  parent: Element,
  childSelector: string,
  options: {
    y?: number;
    duration?: number;
    stagger?: number;
    start?: string;
  } = {}
) => {
  const {
    y = 40,
    duration = 0.6,
    stagger = 0.1,
    start = "top 85%",
  } = options;

  const children = parent.querySelectorAll(childSelector);

  return gsap.from(children, {
    y,
    opacity: 0,
    duration,
    stagger,
    ease: "power3.out",
    scrollTrigger: {
      trigger: parent,
      start,
      toggleActions: "play none none none",
    },
  });
};

export const parallax = (
  element: gsap.TweenTarget,
  trigger: Element,
  speed: number = 0.2
) => {
  return gsap.to(element, {
    yPercent: speed * 100,
    ease: "none",
    scrollTrigger: {
      trigger,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
};
