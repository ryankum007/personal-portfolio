# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Ryan Kumar Portfolio
**Generated:** 2026-03-30
**Category:** Portfolio/Personal — Awwwards SOTD-tier
**Reference:** olhalazarieva.com

---

## Global Rules

### Color Palette (Strict Monochrome)

| Role | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| Dark | `#101010` | `--color-dark` | Background (dark), text (light mode), borders |
| Light | `#F7F7F7` | `--color-light` | Background (light), text (dark mode) |
| Muted | `#999999` | `--color-muted` | Secondary text, captions, timestamps |
| Accent | `#101010` | `--color-accent` | CTA borders, links (no color accent — monochrome only) |

**Color Notes:** Strictly 2 colors — `#101010` and `#F7F7F7`. No blue, no gradients, no colored accents. Hierarchy is achieved through typography scale, weight, and spacing — not color.

### Typography

- **Display Font:** Playfair Display (serif, elegant editorial)
- **Body Font:** Inter (clean geometric sans-serif)
- **Mood:** editorial, luxury, sophisticated, timeless, premium, minimal
- **Best For:** High-end portfolios, editorial layouts, Awwwards-tier sites

**Google Fonts:**
```
Playfair Display: 400, 500, 600, 700
Inter: 300, 400, 500, 600
```

**Tailwind Config:**
```js
fontFamily: {
  display: ['var(--font-display)', 'serif'],
  body: ['var(--font-body)', 'sans-serif'],
}
```

**Fluid Typography Scale (clamp-based):**

| Element | Size | Weight | Font |
|---------|------|--------|------|
| H1 (Hero) | `clamp(3rem, 8vw, 8rem)` | 700 | Display |
| H2 (Section) | `clamp(2rem, 5vw, 4.5rem)` | 600 | Display |
| H3 (Subsection) | `clamp(1.5rem, 3vw, 2.5rem)` | 500 | Display |
| Body | `clamp(1rem, 1.2vw, 1.25rem)` | 400 | Body |
| Caption/Meta | `clamp(0.75rem, 1vw, 0.875rem)` | 400 | Body |
| Nav Links | `0.875rem` | 500 | Body |

**Line Heights:**
- Headings: `1.1` (tight, editorial)
- Body: `1.6` (comfortable reading)
- Captions: `1.4`

**Letter Spacing:**
- H1: `-0.03em` (tight)
- H2: `-0.02em`
- Body: `0em`
- Uppercase labels: `0.15em`

### Spacing System

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `0.5rem` (8px) | Inline gaps, icon spacing |
| `--space-sm` | `1rem` (16px) | Paragraph gaps |
| `--space-md` | `2rem` (32px) | Component padding |
| `--space-lg` | `4rem` (64px) | Section inner padding |
| `--space-xl` | `8rem` (128px) | Section vertical margins |
| `--space-2xl` | `12rem` (192px) | Hero padding, major breathing room |

---

## Style Guidelines

**Style:** Motion-Driven Editorial Minimal

**Keywords:** Scroll-triggered reveals, text split animations, parallax, smooth scroll, editorial typography, monochrome, bespoke, Awwwards-tier

**Key Techniques:**
- GSAP ScrollTrigger for all on-scroll animations
- SplitText for character/word/line reveals on headings
- Lenis for smooth scrolling (integrated with GSAP)
- Parallax on images (y offset at different scroll speeds)
- Custom cursor (circle dot, mix-blend-mode: difference, scales on hover)
- Preloader with name/counter animation
- Grain texture overlay on background

**Animation Specs:**

| Type | Duration | Easing | Properties |
|------|----------|--------|------------|
| Text reveal (char) | 0.8s | `power4.out` | `y: 100%, opacity: 0` with stagger 0.02 |
| Text reveal (line) | 0.6s | `power3.out` | `y: 30, opacity: 0` with stagger 0.1 |
| Image parallax | scroll-driven | linear | `y: -20%` to `y: 20%` within viewport |
| Section entrance | 0.8s | `power2.out` | `y: 60, opacity: 0` |
| Hover transitions | 0.3s | `ease` | `opacity, transform, color` |
| Cursor scale | 0.2s | `power2.out` | `scale: 1` to `scale: 3` on interactive |
| Preloader | 2-3s | orchestrated | counter 0-100, curtain reveal |
| Page load | 1.5s | `power4.inOut` | Sequential: preloader → hero text → nav |

### Layout Principles

- **Asymmetric layouts** with intentional negative space
- **Full-viewport hero** with large display typography
- **Editorial text blocks** — max-width 65ch for readability
- **Image/text interplay** — never center everything, offset intentionally
- **Grid:** CSS Grid for major layout, not Flexbox-everything
- **Max content width:** `1400px` with generous side padding (`clamp(1.5rem, 5vw, 6rem)`)

### Page Structure

| # | Section | Layout Notes |
|---|---------|-------------|
| 0 | Preloader | Full-screen overlay, counter/curtain animation |
| 1 | Hero | Full viewport, large "RYAN KUMAR" text, scroll indicator |
| 2 | About | Asymmetric: text left, photo right with parallax |
| 3 | Experience | Stacked cards or horizontal scroll, scroll-triggered |
| 4 | Projects | Grid/masonry, hover reveals, cursor change |
| 5 | Skills | Typographic list or marquee, no progress bars |
| 6 | Contact | Large CTA typography, magnetic button |
| 7 | Footer | Minimal: copyright, socials, back-to-top |

---

## Anti-Patterns (Do NOT Use)

- No component libraries (no shadcn, MUI, Chakra, Bootstrap)
- No progress bars for skills
- No standard grid template look
- No more than 2 colors
- No decorative elements without purpose
- No stock animations or default CSS transitions where GSAP should be used
- No template aesthetic — must feel bespoke
- No emojis anywhere on the final site
- No emojis as icons — use SVG only
- No missing cursor:pointer on clickable elements
- No layout-shifting hover states
- No low contrast text (4.5:1 minimum)
- No instant state changes — always use transitions
- No invisible focus states

---

## Pre-Delivery Checklist

- [ ] All content from ryankumar.net is present (no missing text or images)
- [ ] Every section has scroll-triggered GSAP animations
- [ ] Text reveal animations on all major headings
- [ ] Custom cursor works and reacts to interactive elements
- [ ] Smooth scrolling via Lenis is active
- [ ] Preloader animation plays on first load
- [ ] Mobile responsive at 375px, 768px, 1024px, 1440px, 1920px
- [ ] No horizontal scroll bugs
- [ ] Lighthouse Performance 90+
- [ ] All external links work (LinkedIn, etc.)
- [ ] Color palette stays within #101010 and #F7F7F7
- [ ] Typography is fluid (clamp-based)
- [ ] No generic AI aesthetic — looks human-designed
- [ ] `prefers-reduced-motion` respected
- [ ] Focus states visible for keyboard navigation
- [ ] `cursor-pointer` on all clickable elements
