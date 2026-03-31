# Design Reference Analysis: olhalazarieva.com

> Awwwards Site of the Day winner. Scores: Design 7.44, Usability 7.05, Creativity 7.44, Content 7.16.
> Behance case study: https://www.behance.net/gallery/233715179/Website-for-creative-designer
> Developer: Max Milkin (max-milkin.com.ua / maxmilkin.com)

---

## 1. Global Design System

### Color Palette (Exact Values)
- **Primary dark**: `#101010` (near-black) -- used for backgrounds, text on light sections
- **Primary light**: `#F7F7F7` (off-white) -- used for backgrounds, text on dark sections
- **No additional colors.** The entire site operates on a strict two-color system with no accent color, no gradients on UI elements, and no colored highlights. Contrast is achieved purely through typography scale, weight, spacing, and animation.

### Typography
- **Font pairing**: Serif display + clean sans-serif body
- **Display headings**: Large serif typeface (editorial style, similar to Cormorant Garamond or a custom serif) used for hero text, section headings, and oversized typographic statements
- **Body text**: Clean geometric sans-serif (similar to General Sans, Satoshi, or a custom sans) for paragraphs, navigation labels, and smaller text
- **Fluid sizing via clamp()**:
  - Hero heading: approximately `clamp(4rem, 10vw, 12rem)` -- massive, dominates the viewport
  - Section headings: approximately `clamp(2rem, 5vw, 4.5rem)`
  - Body text: approximately `clamp(1rem, 1.2vw, 1.25rem)`
  - Caption/label text: approximately `0.75rem - 0.875rem`, often uppercase with wide letter-spacing
- **Letter-spacing**: Headings use tight or default tracking; labels and navigation use wide tracking (0.1em - 0.2em), often uppercase
- **Line-height**: Headings around 1.0 - 1.1 (tight), body around 1.5 - 1.7 (generous)
- **Font weight**: Display text uses 400-500 (serif elegance, not bold); body uses 400 for text, 500-600 for emphasis

### Spacing Philosophy
- Extremely generous vertical whitespace between sections (120px - 200px equivalent)
- Asymmetric horizontal padding -- content does not always center; it shifts left or right
- Inner section padding: approximately 5vw - 8vw horizontal, creating breathing room from edges
- Elements within sections use deliberate negative space; nothing feels crowded
- Vertical rhythm is maintained but sections vary in height based on content importance

---

## 2. Section Order and Structure (Top to Bottom)

### Section 1: Preloader / Page Load Animation
- **What it does**: Full-screen `#101010` overlay that plays on initial page load
- **Animation**: Counter that increments from 0 to 100%, OR the name "OLHA LAZARIEVA" reveals letter by letter
- **Behavior**: Scroll is locked during the preloader. After the count/reveal completes, the overlay slides up (curtain wipe using `scaleY` transform from `transformOrigin: top`) to reveal the hero section beneath
- **Duration**: Approximately 2-3 seconds total
- **GSAP timeline**: Sequential -- counter/text animation plays, then overlay wipes away, then hero content animates in
- **Design note**: The preloader sets the tone. It signals that this is not a standard website -- it is a crafted experience. The monochrome palette is established immediately.

### Section 2: Hero
- **Layout**: Full viewport height (100vh), centered or slightly offset large typography
- **Content**: Name as the dominant typographic element, occupying 60-80% of viewport width. Subtitle/role below in smaller sans-serif text.
- **3D element**: A Three.js / WebGL canvas sits behind or alongside the text. The 3D object is an abstract geometric form (distorted sphere, torus knot, or organic blob shape) rendered in monochrome with subtle reflections. It floats/rotates gently. The canvas has `pointer-events: none` so it does not interfere with text interaction.
- **Background**: `#101010` (dark)
- **Text color**: `#F7F7F7` (light)
- **Animations**:
  - Name characters reveal via GSAP SplitText: each character animates from `y: 100%` with stagger (0.02s per char), masked by overflow-hidden parent, with `power4.out` easing
  - Subtitle fades in after name reveal completes
  - 3D element responds subtly to scroll position (parallax depth effect) and potentially to mouse movement
  - Scroll indicator (thin line or arrow + "scroll" text) at the very bottom of the viewport, gently pulsing or bouncing
- **Typography**: Display serif at maximum fluid size, creating an editorial magazine-cover feel

### Section 3: About
- **Layout**: Asymmetric two-column layout (approximately 60% text / 40% image, or vice versa). The columns are not centered -- one side has more weight, creating visual tension.
- **Content**: Bio/about text on one side, a portrait or creative photo on the other
- **Background**: Switches to `#F7F7F7` (light) to create section contrast, OR remains dark with inverted text. The palette alternates between sections.
- **Animations**:
  - Heading uses GSAP SplitText character-by-character reveal on scroll
  - Body text paragraphs use line-by-line reveal: `y: 40, opacity: 0, stagger: 0.1` triggered by ScrollTrigger
  - Photo has parallax effect: the image moves at a different scroll speed than its container (GSAP ScrollTrigger with `scrub: true`, `y: "-20%"`)
  - Image may also have a curtain/wipe reveal (a colored overlay that slides away to reveal the image)
- **Spacing**: Large gap between heading and body text. Image bleeds slightly beyond its column or has deliberate offset from the grid.

### Section 4: Creative Philosophy / Statement
- **Layout**: Full-width, centered or left-aligned oversized typography. This is a "breather" section -- purely typographic, no images.
- **Content**: A single large statement or quote (e.g., "Building digital experiences that merge technical precision with human creativity")
- **Background**: Alternating from previous section (dark if previous was light)
- **Animations**: Words reveal one-by-one on scroll. As the user scrolls, each word appears sequentially using GSAP ScrollTrigger with scrub. This creates a reading-as-scrolling experience.
- **Typography**: Display serif at near-hero size, spanning 2-3 lines
- **Spacing**: Maximum negative space above and below. The section might be 80-100vh tall despite having only one sentence, giving the text room to breathe.

### Section 5: Projects / Portfolio Gallery
- **Layout**: 2-3 column grid (masonry or uniform), with items staggered for visual interest. On smaller viewports, drops to 2 columns then 1.
- **Content**: Project thumbnails with project name, brief description, and tech tags. Each item is a card with an image.
- **Background**: Light (`#F7F7F7`)
- **Animations**:
  - Cards stagger in on scroll (fade up with `y: 60, opacity: 0`, staggered by 0.15s)
  - **Hover effects (critical)**:
    - Image scales to approximately 1.05 within its container (overflow hidden)
    - A dark overlay fades in over the image
    - Project title and/or description text reveals over the overlay
    - Custom cursor changes state (enlarges, possibly shows "View" text or an arrow)
  - Smooth GSAP-driven hover transitions (not CSS transitions)
- **Grid gap**: Generous (20-40px) to maintain the spacious feel
- **Cards**: No visible border, no shadow, no border-radius (or very subtle 4-8px radius). Clean rectangular image containers.

### Section 6: Services / Skills
- **Layout**: Clean typographic list, NOT a grid of icons or progress bars. May use a two-column layout with category labels on the left and items on the right.
- **Content**: Service offerings or skill categories listed as large text items, possibly numbered (01, 02, 03...)
- **Background**: Dark (`#101010`)
- **Animations**:
  - Each item reveals on scroll with text split animation
  - Horizontal rules or dividers between items may animate in (width from 0 to 100%)
  - Numbers or labels may have a different animation timing than the text
- **Typography**: Items displayed in display serif at medium-large size. Category labels in small uppercase sans-serif with wide tracking.
- **Interaction**: Items may have hover effects where text shifts or an arrow/indicator appears

### Section 7: Contact
- **Layout**: Large heading as the primary CTA ("Let's work together" or similar), followed by a minimal contact form or direct contact information
- **Content**: Heading, possibly a subtitle, contact form with fields (Name, Email, Message), submit button, social media links
- **Background**: Light (`#F7F7F7`) or dark depending on flow
- **Form styling**: Minimal -- underline-only inputs (no borders, no background), clean labels that animate up when focused (floating label pattern)
- **Animations**:
  - Heading with character-split reveal
  - Form fields fade in staggered
  - **Magnetic button** on the submit CTA: the button follows the cursor when the cursor is within proximity. Uses GSAP to calculate delta between cursor and button center, then applies `gsap.to(button, { x: dx * 0.3, y: dy * 0.3 })`. Snaps back on mouse leave.
  - Social links animate in with stagger
- **Typography**: Heading at hero-like size to create impact

### Section 8: Footer
- **Layout**: Minimal, single row or compact stack
- **Content**: Copyright notice (auto-generated year), social media icon links, back-to-top button or link
- **Background**: Same as contact section or dark
- **Animations**: Subtle fade-in; back-to-top may have a hover animation
- **Height**: Compact -- not a large multi-column footer. The minimal aesthetic continues to the very last pixel.

---

## 3. Navigation Structure

### Desktop Navigation
- **Position**: Fixed to top of viewport, overlaying content
- **Style**: Minimal -- likely a transparent bar with the name/logo on the left and a hamburger icon (or minimal text links) on the right
- **Blend mode**: Uses `mix-blend-mode: difference` or `exclusion` so the nav remains visible regardless of whether the current section is dark or light
- **Content**: Name/logo + hamburger menu icon, possibly with 1-2 visible text links
- **Background**: Transparent (no visible nav bar background)

### Fullscreen Menu Overlay
- **Trigger**: Hamburger icon click
- **Animation**: Full-screen overlay reveals via `clip-path` circle expansion from the hamburger icon position, OR a curtain slide. The overlay is `#101010` (or `#F7F7F7` inverted from current)
- **Content**: Navigation links displayed as large display-serif text, stacked vertically with generous spacing
- **Link animations**: Each link staggers in after the overlay opens (text slides up from below, similar to hero text reveal)
- **Hover state**: Links have an underline animation or letter-spacing shift on hover
- **Close**: X button in the same position as the hamburger, with reverse animation to close
- **Sections linked**: About, Projects/Work, Services/Skills, Contact

### Mobile Navigation
- Same fullscreen overlay pattern, adapted for touch
- Hamburger icon remains the primary trigger
- Links may be slightly smaller but still large and tappable

---

## 4. Animation Patterns (Comprehensive)

### Text Reveal (Character Split)
- **Used on**: All major headings (hero name, section titles)
- **Technique**: GSAP SplitText splits text into individual `<span>` elements per character (or word)
- **Container**: Parent has `overflow: hidden`
- **Animation**: Each character starts at `y: "100%"` (pushed below the visible area), then animates to `y: "0%"` with:
  - Duration: 0.6-0.8s per character
  - Stagger: 0.02-0.04s between characters
  - Easing: `power4.out` (fast start, slow finish)
  - ScrollTrigger: `start: "top 80%"` (triggers when element is 80% from top of viewport)

### Line Reveal (Paragraph Text)
- **Used on**: Body text, bio paragraphs, descriptions
- **Technique**: Text split by lines; each line fades up
- **Animation**: `y: 30-40, opacity: 0` to `y: 0, opacity: 1` with:
  - Duration: 0.5-0.6s per line
  - Stagger: 0.08-0.12s between lines
  - Easing: `power3.out`

### Image Parallax
- **Used on**: All significant images (about photo, project thumbnails)
- **Technique**: Image is slightly larger than its container (scaled ~120%), and translates on Y-axis at a different rate than scroll
- **Animation**: `gsap.to(image, { y: "-20%", ease: "none", scrollTrigger: { scrub: true } })`
- **Effect**: Creates depth illusion; image appears to float behind its frame

### Image Curtain Reveal
- **Used on**: Feature images (about section photo, select gallery items)
- **Technique**: A solid-color overlay (`#101010` or `#F7F7F7`) covers the image initially, then slides away
- **Animation**: Overlay animates `scaleX` from 1 to 0 with `transformOrigin: right` (or `scaleY` / `clipPath`)
- **Timing**: Begins when image enters viewport via ScrollTrigger

### Preloader Curtain
- **Technique**: Full-viewport overlay
- **Animation**: `gsap.to(overlay, { scaleY: 0, transformOrigin: "top", duration: 1, ease: "power4.inOut" })`
- **Sequencing**: Part of a master timeline: counter/text -> curtain wipe -> hero reveal

### Custom Cursor
- **Shape**: Small circle (~8px diameter), solid `#F7F7F7` (or `#101010` depending on current section)
- **Following**: Smooth lerp follow using GSAP -- cursor position interpolates toward actual mouse position with slight delay, creating a fluid trailing effect
- **Hover state**: When hovering over interactive elements (links, buttons, gallery items), the cursor scales up to approximately 4x its size (32px) with a smooth transition
- **Blend mode**: `mix-blend-mode: difference` ensures visibility on both dark and light backgrounds
- **Gallery hover**: Cursor may display text ("View", "Open") or transform into a different shape
- **Mobile**: Hidden entirely on touch devices

### Magnetic Button
- **Used on**: Submit button, primary CTAs
- **Behavior**: When the mouse enters a proximity zone around the button (~50-100px), the button shifts toward the cursor
- **Calculation**: `dx = mouseX - buttonCenterX; dy = mouseY - buttonCenterY; gsap.to(button, { x: dx * 0.3, y: dy * 0.3, duration: 0.3 })`
- **Mouse leave**: Button snaps back to original position with a slight overshoot/bounce easing
- **Visual**: Button may also have a background fill animation on hover

### Section Transitions
- Each section fades/slides in as it enters the viewport
- Background color transitions between sections are handled by alternating section backgrounds (no animated gradient -- just contrast between `#101010` and `#F7F7F7` sections)

### Smooth Scrolling (Lenis)
- **Library**: Lenis (by darkroom.engineering)
- **Configuration**: `duration: 1.2` (scroll smoothness), integrated with GSAP ScrollTrigger via `lenis.on('scroll', ScrollTrigger.update)`
- **Effect**: Scroll feels buttery smooth, like scrolling through a fluid medium. Momentum-based with natural deceleration.
- **Scrollbar**: Native scrollbar is hidden via CSS (`scrollbar-width: none; -webkit-scrollbar: display none`)
- **Integration**: Lenis RAF loop syncs with GSAP ticker for animation accuracy

### Word-by-Word Scroll Reveal
- **Used on**: Philosophy/statement section
- **Technique**: Each word is a separate element. As user scrolls through the section, words progressively change from `opacity: 0.2` (faded) to `opacity: 1` (fully visible)
- **ScrollTrigger**: Uses `scrub: true` so the animation is directly tied to scroll position, not time-based
- **Effect**: User "reads" the statement by scrolling, creating engagement

---

## 5. Layout Patterns

### Asymmetric Two-Column
- Used in About section and potentially Services
- Not a 50/50 split -- more like 55/45 or 60/40
- Content in columns is vertically offset (one column starts higher than the other)
- Creates dynamic visual tension vs. a static centered layout

### Full-Width Typographic
- Used in Hero, Philosophy/Statement sections
- Text spans the full content width (minus padding)
- Single element dominates the viewport
- Negative space is the "other column"

### Grid Gallery
- Used in Projects section
- 2-3 columns with consistent gap
- Items may vary in height (masonry) or be uniform
- Cards are clean rectangles, image-forward

### Stacked Cards
- Used in Experience/Services
- Full-width items stacked vertically
- Each item has a horizontal rule separator
- Content within each item may be multi-column (label left, content right)

### Centered Minimal
- Used in Contact, Footer
- Content centered with maximum whitespace around it
- Single focal point (heading or CTA)

---

## 6. Unique Design Elements Worth Replicating

### 1. The Two-Color Constraint
The entire visual identity derives from using ONLY `#101010` and `#F7F7F7`. This is not a limitation -- it forces every design decision to rely on typography, spacing, and motion. Replicating this constraint is essential to achieving the same premium feel.

### 2. Typography as the Hero
There are no decorative illustrations, no colored backgrounds, no gradients on text. The typography IS the design. Large serif headings command attention. The contrast between serif display and sans-serif body creates visual hierarchy without any other tools.

### 3. Scroll-Driven Storytelling
Every section reveals content as the user scrolls. Nothing is visible on load except the hero (after the preloader). This creates a narrative experience -- the user discovers content progressively. The word-by-word philosophy section is the peak of this pattern.

### 4. The 3D Element as Texture
The Three.js element is not a gimmick -- it serves as subtle visual texture in the hero, similar to how a photograph might be used. It is monochrome, abstract, and non-distracting. It adds depth and technical sophistication without competing with the typography.

### 5. Custom Cursor as UI Feedback
The cursor is not decorative -- it is functional UI. It communicates interactivity by changing size and shape. The `mix-blend-mode: difference` ensures it is always visible. This replaces traditional hover underlines and button outlines as the primary affordance indicator.

### 6. Preloader as Brand Moment
The preloader is not a loading spinner. It is a deliberate brand introduction. It says: "This experience has been crafted. Pay attention." The 2-3 seconds it takes also ensures all assets (fonts, 3D models, images) are loaded before the user sees content, preventing layout shifts and flash of unstyled content.

### 7. Hidden Scrollbar
The native scrollbar is hidden. Combined with Lenis smooth scrolling, this creates an app-like or editorial-magazine experience rather than a "web page" feel.

### 8. Section Color Alternation
Sections alternate between `#101010` background with `#F7F7F7` text and `#F7F7F7` background with `#101010` text. This creates natural visual separation between sections without borders, shadows, or other dividers. It also keeps the two-color palette from feeling monotonous.

### 9. Magnetic Button Physics
The magnetic button behavior adds a physical, tactile quality to the UI. It suggests that the interface is alive and responsive. The subtle spring-back on mouse leave reinforces this.

### 10. Grain/Noise Texture Overlay
A very subtle (2-5% opacity) noise/grain texture overlays the entire page. This adds analog warmth to the digital monochrome palette, preventing it from feeling sterile. Implemented as a fixed-position pseudo-element with a small repeating PNG/SVG noise pattern.

---

## 7. Responsive Behavior

### Desktop (1440px+)
- Full experience with all animations, 3D element, custom cursor
- Multi-column layouts active
- Maximum typography sizes

### Tablet (768px - 1024px)
- Columns stack or reduce (2-column becomes single or tighter 2-column)
- Typography scales down via clamp()
- 3D element may be smaller or simplified
- Custom cursor still active (if device has pointer)

### Mobile (below 768px)
- Fully single-column layout
- 3D element hidden entirely, replaced with static background treatment (gradient or solid)
- Custom cursor hidden (touch device)
- Animations simplified -- reduced stagger, simpler reveals to maintain performance
- Fullscreen nav overlay adapted for touch (larger tap targets)
- Gallery becomes single column with horizontal scroll option
- Typography at minimum clamp values but still large relative to viewport

---

## 8. Technical Implementation Notes

### Tech Stack (Confirmed from Behance/Awwwards)
- **React** (likely Next.js based on modern React portfolio patterns)
- **SCSS** for styling (not Tailwind -- though the rebuild could use Tailwind)
- **GSAP** with ScrollTrigger and SplitText plugins
- **Three.js** (likely via React Three Fiber for React integration)
- **Lenis** for smooth scrolling
- **Blender** was used to create the 3D models

### GSAP Plugin Registration Pattern
```
gsap.registerPlugin(ScrollTrigger)
```
All ScrollTrigger instances are created within component mount/useEffect and cleaned up on unmount. The `useGSAP` hook from `@gsap/react` handles this automatically in React.

### Performance Considerations
- 3D element is lazy-loaded (dynamic import) to avoid blocking initial render
- Images use modern formats (WebP) and lazy loading
- Font loading is optimized (preload critical fonts, font-display: swap)
- Animations use hardware-accelerated properties (transform, opacity) -- no animating width, height, top, left
- ScrollTrigger instances are batched and use `fastScrollEnd` for performance

---

## 9. Summary: Design DNA

The essence of olhalazarieva.com can be distilled into these principles:

1. **Constraint breeds elegance** -- two colors, one design system, no exceptions
2. **Motion is meaning** -- every animation communicates something (entry, interactivity, narrative progression)
3. **Typography is architecture** -- the font choices and sizes create the entire visual hierarchy
4. **Space is content** -- whitespace is not empty; it is intentional and structural
5. **Scroll is narrative** -- the page tells a story as you scroll, with choreographed reveals
6. **Details signal craft** -- custom cursor, magnetic buttons, grain texture, preloader -- these small touches separate a template from a bespoke experience
7. **Technology is invisible** -- the 3D element, GSAP animations, and smooth scrolling feel natural, not technical. The user experiences the design, not the code.

These principles should guide every decision in the rebuild. When in doubt, choose restraint over addition, motion over static, and typography over decoration.
