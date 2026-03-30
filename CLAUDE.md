# CLAUDE.md — Full Portfolio Rebuild: ryankumar.net → olhalazarieva.com Clone

## Mission

Rebuild ryankumar.net from scratch to be a near-identical clone of https://www.olhalazarieva.com — an Awwwards Site of the Day winning portfolio. Replace all of Olha's content with Ryan Kumar's content. Every animation, every scroll behavior, every layout pattern, every 3D element, every hover state must be replicated. This is not "inspired by" — this is a ditto copy with different content.

---

## Skills & Plugins — Usage Map

Use the following skills/plugins throughout this project. Read their SKILL.md files before first use.

| Skill/Plugin | When to Use |
|---|---|
| **ui-ux-pro-max** | CRITICAL: Run `python3 skills/ui-ux-pro-max/scripts/search.py "portfolio minimalism dark elegant" --design-system -p "Ryan Kumar Portfolio" --persist` FIRST to generate a master design system. Use it for every UI decision: color validation, font pairing, spacing, animation patterns, UX checklist before delivery. Run domain searches: `--domain style` for style recs, `--domain color` for palette validation, `--domain typography` for font pairings, `--domain ux` for animation/accessibility checks. |
| **ruflo** | Use for multi-agent swarm orchestration. Initialize a hierarchical swarm to parallelize Phase 1 scraping (agent: scraper-reference, scraper-ryan, asset-downloader) and Phase 5 section building (agent: hero-builder, about-builder, gallery-builder, etc.). Spawn specialized agents for concurrent work. |
| **playwright** | Scrape both websites, take screenshots, inspect DOM/fonts/animations, test responsive layouts |
| **firecrawl** | Deep crawl olhalazarieva.com and ryankumar.net for full HTML/CSS/JS/assets |
| **frontend-design** | Guide all aesthetic decisions, typography, layout, spatial composition, motion design |
| **superpowers** | Advanced file operations, batch automation, code generation utilities |
| **figma** | Reference design specs if available from the Figma source files |
| **vercel** | Deployment in Phase 10 |
| **code-review** | Audit code quality in Phase 9 |
| **code-simplifier** | Clean up bloat and dead code in Phase 9 |
| **security-guidance** | Vulnerability check in Phase 9 |
| **feature-dev** | Feature implementation across Phases 4-8 |
| **context7** | Look up latest docs for GSAP, Three.js, Lenis, Next.js, React Three Fiber |
| **ralph-loop** | Iterate and refine across phases, quality loops |
| **skill-creator** | Create custom skills if needed for reusable animation patterns |
| **claude-code-setup** | Ensure environment is properly configured |
| **claude-md-management** | Manage this CLAUDE.md file as project evolves |

---

## Step 0: Initialize Design System with ui-ux-pro-max

BEFORE any scraping or coding, generate the design system:

```bash
# Generate master design system for the portfolio
python3 skills/ui-ux-pro-max/scripts/search.py "portfolio website creative developer minimalism elegant monochrome" --design-system -p "Ryan Kumar Portfolio" --persist

# Search specific domains for targeted recommendations
python3 skills/ui-ux-pro-max/scripts/search.py "minimalism elegant monochrome portfolio" --domain style
python3 skills/ui-ux-pro-max/scripts/search.py "monochrome black white two-color" --domain color
python3 skills/ui-ux-pro-max/scripts/search.py "serif sans-serif elegant editorial" --domain typography
python3 skills/ui-ux-pro-max/scripts/search.py "scroll animation parallax text reveal" --domain ux
python3 skills/ui-ux-pro-max/scripts/search.py "GSAP Three.js React" --domain chart
```

Save the generated design system to `design-system/MASTER.md`. For each page/section built later, check: "I am building the [Section Name]. Please read design-system/MASTER.md and apply its rules."

IMPORTANT: The reference site uses ONLY `#101010` and `#F7F7F7`. Override any design system color suggestions with these two colors. The design system is for spacing, typography, animation patterns, and UX validation, not colors.

---

## Step 0.5: Initialize Ruflo Swarm for Parallel Execution

For complex phases, use ruflo's multi-agent orchestration:

```bash
# Initialize swarm for the project
npx ruflo swarm init --topology hierarchical --max-agents 8 --strategy specialized
```

Use swarm agents for:
- **Phase 1**: Parallel scraping (3 agents: reference-scraper, ryan-scraper, asset-downloader)
- **Phase 5**: Parallel section building (6 agents: hero, about, experience, projects, skills, contact)
- **Phase 9**: Parallel quality checks (3 agents: lighthouse, code-review, security-audit)

Spawn pattern:
```
Task("reference-scraper", "Scrape olhalazarieva.com using Firecrawl and Playwright. Extract all HTML, CSS, fonts, animations, 3D assets. Save to reference/")
Task("ryan-scraper", "Scrape all 5 pages of ryankumar.net. Extract all text content, images, skills, experience. Save to src/data/content.ts")
Task("asset-downloader", "Download all Behance screenshots and Ryan's photos to public/images/ and reference/")
```

---

## Step 1: Deep Scrape Both Websites with Firecrawl + Playwright

### Scrape the Reference Site (olhalazarieva.com)

Use Firecrawl to deep-crawl `https://www.olhalazarieva.com` and capture:
- Full HTML source of every page/route
- All CSS (inspect computed styles on every section)
- All JavaScript behavior patterns
- All font files and font-family declarations
- All image assets and their URLs
- All SVG graphics, icons, decorative elements
- All 3D model files (.glb, .gltf) if externally loaded
- The exact color values used everywhere
- All animation timing, easing, and duration values

Then use Playwright browser tools to:
1. Navigate to https://www.olhalazarieva.com
2. Wait for full page load (wait for all animations to finish)
3. Take full-page screenshots at 1440px width (desktop)
4. Take full-page screenshots at 375px width (mobile)
5. Take screenshots of each distinct section as you scroll
6. Record scroll behavior: note what animates, when, and how
7. Hover over every interactive element and screenshot the hover state
8. Open the navigation/menu and screenshot it
9. Inspect the DOM structure — document the exact HTML hierarchy of each section
10. Run in console: capture all font-family, font-size, font-weight, letter-spacing, line-height values from computed styles
11. Check Network tab for loaded 3D models (.glb, .gltf, .obj), animation libs, external assets
12. Check for `<canvas>` elements (Three.js / WebGL)
13. Document GSAP animation classes and ScrollTrigger data attributes
14. Check `<head>` for all loaded fonts
15. Note page transition behavior
16. Identify smooth scroll library (Lenis, Locomotive, or custom)
17. Check for custom cursor behavior

Also download Behance case study reference screenshots:
- `https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/d7b2b1233715179.68b5b1cd0ae31.png` (hero)
- `https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/40b75a233715179.68b5b1cd0c3b2.png` (section 2)
- `https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/83c075233715179.68b5b1cd0b906.png` (section 3)
- `https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/823686233715179.68b5b1cd0e91d.png` (creative idea)
- `https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/d68d96233715179.68b5b1cd0d2fe.png` (projects)
- `https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/a706c1233715179.68b5b1cd0cad7.png` (services)
- `https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/3b05de233715179.68b5b1cd0ddc6.png` (contact form)
- `https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/8c5aa6233715179.68b5b1cd0f5c6.png` (mobile)
- `https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/baf7b5233715179.68b5b965da045.png` (final)
Save all to `reference/`

### Scrape Ryan's Current Site (ryankumar.net)

Use Firecrawl + Playwright to scrape every page:
1. `https://ryankumar.net/Web-Pages/index.html`
2. `https://ryankumar.net/Web-Pages/about_me.html`
3. `https://ryankumar.net/Web-Pages/experience.html`
4. `https://ryankumar.net/Web-Pages/projects.html`
5. `https://ryankumar.net/Web-Pages/contact_me.html`

Extract ALL text, images (download from `https://ryankumar.net/Photos/`), social links, skills, experience, projects, education, contact info. Save to `src/data/content.ts`.

Document all findings in `DESIGN_SPEC.md`.

---

## Confirmed Reference Site Specs (Awwwards + Behance)

### Color Palette (EXACT)
- `#101010` (near-black) and `#F7F7F7` (off-white) — ONLY these two, no exceptions

### Tech Stack (Behance tags)
- React, SCSS, GSAP (ScrollTrigger, SplitText), Blender (3D), Three.js

### Sections (Behance screenshots)
1. Hero — massive typography, 3D element, text reveal
2. About — editorial layout, parallax images
3. Creative Philosophy — oversized typography statement
4. Projects Gallery — grid with hover effects
5. Services/Skills — clean typographic display
6. Contact Form — large CTA, form fields
7. 404 page, Thank You page

### Animation Patterns
- GSAP ScrollTrigger on every section
- Text split animations (char/line reveals)
- 3D elements (Three.js / R3F)
- Parallax images, smooth scrolling (Lenis)
- Custom cursor, preloader, hover states
- Motion design as core interface element

---

## Tech Stack Setup

```bash
npx create-next-app@latest . --typescript --tailwind --app --src-dir --no-eslint
npm install gsap @gsap/react @react-three/fiber @react-three/drei three lenis sass
npm install -D @types/three
```

---

## Section-by-Section Build Spec

Build each section to be pixel-identical to the Behance reference screenshots. Before building each section, run:
```bash
python3 skills/ui-ux-pro-max/scripts/search.py "relevant keywords" --domain ux
```
And reference `design-system/MASTER.md` for spacing/typography rules.

### 1. Preloader
- Full-screen #101010 overlay, counter 0-100% or name reveal letter-by-letter
- GSAP timeline: counter then overlay slides up then hero reveals
- Lock scroll during preloader

### 2. Hero
- 100vh, "RYAN KUMAR" in display font at `clamp(4rem, 10vw, 12rem)`
- Subtitle: "Software Engineer"
- GSAP SplitText char reveal (y from 100%, staggered, overflow-hidden mask)
- 3D element via React Three Fiber (abstract shape: distorted sphere, torus knot, or organic blob)
- Canvas behind text with `pointer-events: none`
- Scroll indicator at bottom
- 3D reacts to scroll position

### 3. About
- Asymmetric two-column (60/40), bio text + photo
- GSAP ScrollTrigger: lines fade up `y:40, opacity:0, stagger:0.1`
- Image parallax via scrub ScrollTrigger
- Character-split heading reveal

### 4. Philosophy Statement
- Full-width oversized typography
- "Building digital experiences that merge technical precision with human creativity"
- Words reveal one-by-one on scroll
- Maximum negative space

### 5. Experience
- Cards for each role: Wonderland, Coding Camp, Gore Mutual, Terry Fox
- Large serif company name, role + dates + description
- Staggered scroll reveals, hover lift effect
- Photos from current site

### 6. Projects Gallery
- 2-3 column grid, hover: scale 1.05, overlay with text, cursor changes
- Staggered fade-in on scroll
- All projects from ryankumar.net/projects

### 7. Skills (Services-style)
- Large typographic list, NOT progress bars
- Categories: Languages, Frameworks, Certifications
- Text reveal animations

### 8. Contact
- Large heading "Let's Connect"
- Minimal form: Name, Email, Message (underline inputs)
- Magnetic button on submit
- Social links

### 9. Footer
- Minimal, copyright + social icons, back-to-top

### 10. 404 + Thank You pages

---

## 3D Element (React Three Fiber)

```typescript
import { Canvas } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Environment } from '@react-three/drei'

function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh>
          <torusKnotGeometry args={[1, 0.3, 128, 32]} />
          <MeshDistortMaterial color="#F7F7F7" roughness={0.1} metalness={0.8} distort={0.3} speed={2} />
        </mesh>
      </Float>
      <Environment preset="studio" />
    </Canvas>
  )
}
```

- Monochrome material, subtle reflections
- Lazy loaded (dynamic import)
- Hidden on mobile, replaced with static gradient

---

## Animation System (GSAP)

```typescript
"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger, useGSAP);
```

**Text Reveal**: `gsap.from(chars, { y:"100%", opacity:0, duration:0.8, stagger:0.02, ease:"power4.out", scrollTrigger:{trigger:section, start:"top 80%"} })`

**Paragraph**: `gsap.from(lines, { y:40, opacity:0, duration:0.6, stagger:0.1, ease:"power3.out" })`

**Parallax**: `gsap.to(img, { y:"-20%", ease:"none", scrollTrigger:{scrub:true} })`

**Curtain wipe**: `gsap.to(overlay, { scaleY:0, transformOrigin:"top", duration:1, ease:"power4.inOut" })`

**Custom cursor**: 8px dot, GSAP lerp follow, scale 4x on hover, blend-mode difference

**Lenis**: duration 1.2, connect to ScrollTrigger via `lenis.on('scroll', ScrollTrigger.update)`

**Magnetic button**: button follows cursor within proximity using `gsap.to(ref, { x: dx*0.3, y: dy*0.3 })`

**Nav menu**: fullscreen overlay, clip-path circle reveal, staggered link animations

---

## File Structure

```
src/
├── app/
│   ├── layout.tsx, page.tsx, not-found.tsx, globals.scss
│   └── thank-you/page.tsx
├── components/
│   ├── layout/ (Navigation, Footer, CustomCursor, Preloader, SmoothScroll)
│   ├── sections/ (Hero, About, Philosophy, Experience, Projects, Skills, Contact)
│   ├── three/ (HeroScene, AbstractShape, SceneLoader)
│   └── ui/ (TextReveal, LineReveal, ParallaxImage, ImageReveal, MagneticButton, SplitText)
├── styles/ (_variables.scss, _typography.scss, section modules)
├── data/content.ts
├── hooks/ (useScrollTrigger, useSplitText, useLenis, useMediaQuery)
└── lib/ (gsapConfig, animations, utils)
public/
├── images/, models/, fonts/, reference/
design-system/
└── MASTER.md (generated by ui-ux-pro-max)
```

---

## Execution Phases

### Phase 1: Scrape Everything
- Initialize ruflo swarm with 3 parallel scraper agents
- Firecrawl + Playwright on both sites
- Download Behance screenshots + Ryan's photos
- Create content.ts and DESIGN_SPEC.md
- Generate design-system/MASTER.md via ui-ux-pro-max

### Phase 2: Project Setup
- Next.js + all deps
- SCSS architecture, fonts, tailwind config
- File structure
- `npm run dev` runs clean

### Phase 3: Global Layout
- Lenis smooth scroll, custom cursor, preloader, navigation, footer
- Wire into layout.tsx

### Phase 4: Hero + 3D
- Hero layout matching reference exactly
- React Three Fiber 3D element
- GSAP text reveals
- Use context7 to look up latest R3F and GSAP docs

### Phase 5: Content Sections
- Use ruflo swarm: spawn parallel agents for each section
- Build all 6 content sections with ScrollTrigger animations
- Each section must match Behance reference screenshots
- Before each section, reference design-system/MASTER.md
- Run ui-ux-pro-max domain searches for UX patterns

### Phase 6: Animation Polish
- Compare every section against Behance screenshots
- Fine-tune timing, easing, stagger
- Grain/noise overlay, cursor polish, hover states
- Use ralph-loop to iterate until matching

### Phase 7: Responsive
- 375px, 768px, 1024px, 1440px, 1920px
- Mobile nav overlay, stack columns, disable 3D on mobile
- Compare against Behance mobile screenshot
- Run ui-ux-pro-max UX checklist: `python3 skills/ui-ux-pro-max/scripts/search.py "responsive mobile touch" --domain ux`

### Phase 8: Special Pages + SEO
- 404 page, thank-you page
- Meta tags, OG image, JSON-LD, sitemap, robots.txt

### Phase 9: Quality (use ruflo swarm for parallel checks)
- Agent 1: Lighthouse audit (target 90+ perf, 95+ a11y, 100 SEO)
- Agent 2: code-review + code-simplifier
- Agent 3: security-guidance
- Run ui-ux-pro-max final checklist: all UX validation rules
- Lazy load images (next/image), lazy load Three.js
- No CLS, no scrollbar, no emoji

### Phase 10: Deploy
- `npm run build` clean
- Deploy via vercel plugin: `npx vercel --prod`
- Configure ryankumar.net domain
- Production verification

---

## Quality Checklist

- [ ] Preloader animation plays on load
- [ ] Custom cursor works (dot, hover scale, blend-mode)
- [ ] Smooth scroll via Lenis
- [ ] Hidden scrollbar
- [ ] 3D element in hero (Three.js canvas)
- [ ] 3D reacts to scroll/mouse
- [ ] Hero text GSAP split reveal
- [ ] EVERY section has ScrollTrigger animations
- [ ] ALL headings use split-text reveals
- [ ] ALL images have parallax or curtain wipe
- [ ] Gallery hover effects (scale, overlay, cursor)
- [ ] Fullscreen nav overlay with animated links
- [ ] Contact form styled and functional
- [ ] Magnetic button on CTA
- [ ] Colors ONLY #101010 and #F7F7F7
- [ ] Fluid typography (clamp-based)
- [ ] Serif + sans-serif font pairing
- [ ] Mobile responsive at all breakpoints
- [ ] 3D hidden on mobile
- [ ] 404 page exists
- [ ] Lighthouse 90+ performance
- [ ] NO emoji
- [ ] NO component libraries
- [ ] NO visible scrollbar
- [ ] NO default cursor on desktop
- [ ] Grain texture overlay (2-5% opacity)
- [ ] Layout matches Behance screenshots
- [ ] All Ryan's content present
- [ ] ui-ux-pro-max UX checklist passed
- [ ] code-review passed
- [ ] security-guidance passed

---

## What NOT to Do

- Do NOT skip the 3D element
- Do NOT use progress bars for skills
- Do NOT use more than 2 colors
- Do NOT use emoji (strip all from current site)
- Do NOT use CSS transitions where GSAP should be used
- Do NOT add features not in the reference
- Do NOT make preloader skippable
- Do NOT use placeholder content
- Do NOT use a visible scrollbar
- Do NOT load Three.js synchronously
- Do NOT forget mobile
- Do NOT use generic fonts (Inter, Roboto, Arial, system-ui)
- Do NOT leave Next.js starter boilerplate
- Do NOT use component libraries (shadcn, MUI, Chakra, Bootstrap)

---

## Reference Links
- Reference: https://www.olhalazarieva.com
- Behance: https://www.behance.net/gallery/233715179/Website-for-creative-designer
- Awwwards: https://www.awwwards.com/sites/olha-lazarieva
- Developer: https://max-milkin.com.ua / https://maxmilkin.com
- Current site: https://ryankumar.net
- GSAP React: https://gsap.com/resources/React/
- R3F: https://r3f.docs.pmnd.rs/
- Drei: https://drei.docs.pmnd.rs/
- Lenis: https://github.com/darkroomengineering/lenis
- Fontshare: https://www.fontshare.com
- ui-ux-pro-max: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
- ruflo: https://github.com/ruvnet/ruflo

---

## Start Command

Begin with Step 0: Generate the design system via ui-ux-pro-max. Then Step 0.5: Initialize ruflo swarm. Then Phase 1: Scrape everything. Show output after each phase before proceeding.
