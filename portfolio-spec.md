# Portfolio Site Build Prompt — Bryan Oyloe

## Overview & Objective

Build a personal portfolio website for **Bryan Oyloe**, a Full Stack Software Engineer with 5+ years of experience. This site is Bryan's primary forward-facing asset for job interviews and professional networking. It must communicate technical credibility, design taste, and personality — fast. The site should feel like it was built by someone who *deeply understands* the modern web, not generated from a template.

**Inspiration reference:** [bruno-simon.com](https://bruno-simon.com/) — specifically the immersive use of 3D, the sense of playfulness, and the way interaction drives exploration. We are NOT copying this site, but we want that same feeling of "this person clearly knows what they're doing" that hits you in the first 3 seconds.

---

## Tech Stack

- **Framework:** Next.js (App Router, React 18+)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4+
- **3D / Animation:** Three.js via `@react-three/fiber` and `@react-three/drei`
- **Motion / Transitions:** Framer Motion for UI transitions, scroll-triggered reveals, and page transitions
- **Deployment target:** Vercel
- **Package manager:** pnpm preferred

---

## Site Architecture

**Hybrid scroll + multi-page layout:**

```
/                → Main scroll page (hero, about, experience, skills, blog preview, contact)
/blog            → Blog index page (links to external posts on Medium, Dev.to, etc.)
```

### Navigation
- Fixed top nav bar, semi-transparent with backdrop blur over the dark background
- Nav items: `Home` | `About` | `Experience` | `Skills` | `Blog` | `Contact`
- On the main page, nav links smooth-scroll to sections; `Blog` routes to `/blog`
- Mobile: hamburger menu with full-screen overlay, staggered link animations
- Active section indicator (highlight/underline shifts as user scrolls)
- Name/logo on the left: "Bryan Oyloe" in a monospace or technical display font

---

## Visual Design System

### Aesthetic: Dark & Bold — Developer/Hacker Vibe
This is NOT a generic dark theme. Think: the feeling of a well-configured terminal in a dimly lit room, crossed with a high-end tech product launch page. Premium, confident, technical.

### Color Palette

| Token             | Value                | Usage                                      |
|--------------------|----------------------|---------------------------------------------|
| `--bg-primary`     | `#0a0a0f`           | Main background — near-black with blue undertone |
| `--bg-secondary`   | `#12121a`           | Card/section backgrounds                    |
| `--bg-tertiary`    | `#1a1a2e`           | Hover states, elevated surfaces             |
| `--accent-primary` | `#00d4ff`           | Primary cyan accent — links, highlights, glows |
| `--accent-glow`    | `rgba(0,212,255,0.15)` | Subtle glow effects behind accent elements |
| `--text-primary`   | `#e4e4e7`           | Main body text — warm off-white             |
| `--text-secondary` | `#8888a0`           | Muted labels, dates, secondary info         |
| `--text-accent`    | `#00d4ff`           | Accent-colored text for emphasis            |
| `--border`         | `rgba(255,255,255,0.06)` | Subtle dividers and card borders       |
| `--gradient-accent` | `linear-gradient(135deg, #00d4ff, #0066ff)` | Buttons, progress bars, highlights |

### Typography
- **Display / Headings:** `JetBrains Mono` or `Space Mono` — monospaced, technical feel
- **Body text:** `Inter` or `Satoshi` — clean, highly readable sans-serif
- **Code snippets / accents:** `Fira Code` with ligatures enabled
- Font loading via `next/font` for zero layout shift
- Type scale: use `clamp()` for fluid sizing across breakpoints

### Background & Atmosphere
- Subtle animated noise/grain overlay at very low opacity (2-4%) for texture
- Faint grid pattern or dot matrix on the background (like graph paper in the dark)
- Occasional subtle scanline effect or CRT-style vignette on hero section
- Floating particles or a starfield in the deep background (Three.js, very subtle)

### Spacing & Layout
- Max content width: `1200px`, centered
- Generous vertical padding between sections (`120px–160px`)
- Cards and containers: subtle border (`1px solid var(--border)`), slight glow on hover
- Asymmetric layouts where appropriate — avoid everything being perfectly centered grids

---

## Section-by-Section Specification

### 1. HERO SECTION (viewport height, first thing visitors see)

**This is the most important section. It must be unforgettable.**

#### 3D Element (Three.js via react-three-fiber)
Create an immersive 3D scene that serves as the hero background. Ideas (pick one or combine):
- **Option A — Interactive terrain/landscape:** A low-poly or wireframe terrain that the user can gently rotate/pan by moving their mouse. Represents Bryan's nomadic, travel-based lifestyle. The terrain could have subtle elevation changes, glowing grid lines in cyan, and a distant horizon. Think: a digital map of the journey.
- **Option B — Floating code/tech constellation:** Abstract 3D scene with floating geometric shapes (cubes, spheres, icosahedrons) connected by thin glowing lines — like a neural network or constellation. Shapes gently rotate and drift. Mouse movement causes parallax. Represents the interconnected systems Bryan builds.
- **Option C — Travel trailer on a road:** A stylized, low-poly 3D model of a travel trailer on an open road stretching into the distance, with a starry sky. This is the most personal and memorable option — it tells Bryan's story immediately.

Whichever option is chosen:
- The 3D scene should be in the BACKGROUND, not blocking text
- Performance must be excellent — target 60fps, use `drei` helpers like `useFrame` efficiently
- Fallback to a static gradient + CSS animation for devices that can't handle WebGL
- Mouse/pointer interaction should feel buttery smooth with lerped easing
- On mobile: use device orientation or simplified scene (fewer objects, no pointer tracking)

#### Text Overlay on Hero
- Large heading: `Bryan Oyloe` — bold, monospace display font, large (clamp between 48px–80px)
- Subtitle with typing animation: cycle through phrases like:
  - `Full Stack Engineer`
  - `React & Rails Specialist`
  - `Building from the road`
  - `5+ years shipping production software`
- The typing animation should use a blinking cursor in `--accent-primary` color
- Below subtitle: two CTA buttons
  - **Primary:** `View My Work` → scrolls to Experience section (filled button with gradient)
  - **Secondary:** `Get in Touch` → scrolls to Contact section (outlined button with glow hover)
- Social links row: GitHub, LinkedIn, Email — minimal icons with hover glow effect
- Subtle scroll-down indicator at bottom of hero (animated chevron or mouse icon)

#### Hero Animation Choreography
Everything should animate in on load with staggered timing:
1. 3D scene fades in (0ms)
2. Name appears with a reveal animation (300ms)
3. Subtitle typing begins (600ms)
4. CTAs fade up (900ms)
5. Social links fade up (1100ms)
6. Scroll indicator pulses in (1400ms)

---

### 2. ABOUT ME SECTION

**The hook: Bryan isn't just a developer — he's been living on the road full-time for 5 years.**

#### Content
- Section heading: `About Me` (with a subtle accent line or glow)
- A conversational but professional bio. Suggested tone/content:

> I'm a full stack engineer who builds reliable, production-grade web applications — and I do it from a travel trailer somewhere in North America. For the past 5+ years, my wife, our two cats, and I have been living on the road full-time, working remotely while exploring the US and Canada. I've shipped healthcare portals, real estate platforms, construction tools, and AI-powered developer workflows — all from wherever we've parked. I bring the same adaptability to my code that I bring to life on the road: pragmatic, resourceful, and always moving forward.

- This text should feel personal and warm but still professional
- Include a note about engineering background: "Before software, I was a Petroleum Engineer — I understand complex systems, high-stakes problem solving, and working under pressure."

#### Layout
- Two-column on desktop: text on the left, visual element on the right
- The right column could contain:
  - A stylized map visualization showing travel routes (SVG or canvas-based)
  - OR a photo placeholder with a styled frame (glowing border, slight tilt)
  - OR an interactive element: a mini 3D globe with pins on places visited
- On mobile: stacks vertically, visual above text

#### Animation
- Scroll-triggered: text slides in from left, visual from right (Framer Motion, `whileInView`)
- Stagger paragraph reveals for readability

---

### 3. WORK EXPERIENCE TIMELINE

#### Content (from resume)

**Job 1: Full Stack Developer II — Whitelabel Collaborative**
- Duration: Feb 2021 – Present (5+ years)
- Location: Remote
- Key highlights:
  - Built and maintained large-scale Ruby on Rails applications for healthcare, pharmaceutical, and real estate clients
  - Developed a HIPAA-compliant digital prescription portal for secure physician-to-enterprise prescription transmission
  - Designed and enhanced RESTful APIs improving reliability and response times for internal tools and external integrations
  - Created data-driven dashboards and reporting tools for client financial analysis and historical trend tracking
  - Implemented dynamic, performant React interfaces across multiple applications
  - Maintained a complex Rails backend helping users compare healthcare providers and reduce costs
  - Integrated custom AI agents using LangChain and AutoGen for automated code review, bug detection, and dataset summarization
  - Collaborated closely with product managers and designers on feature scoping and delivery

**Job 2: Full Stack Mobile Development Intern — Igedla LLC**
- Duration: Dec 2020 – Apr 2021
- Location: Denver, CO
- Key highlights:
  - Developed a symptom-checker chatbot using React Native
  - Integrated the Merck Manual search API for medical information retrieval
  - Built multiple mobile app screens and contributed to frontend architecture decisions
  - Designed and launched the company website from scratch using Gatsby and React

**Job 3: Drilling Fluids Specialist II — Newpark Drilling Fluids**
- Duration: Jul 2018 – Feb 2020
- Location: Denver, CO
- Key highlights:
  - Supported active drilling operations with fluid analysis and cost-effective treatment recommendations
  - Produced daily technical reports for rig personnel and engineering teams
  - Contributed to a stuck-pipe remediation that saved a client approximately $3M

#### Layout & Design
- Vertical timeline with a glowing cyan accent line running down the center (desktop) or left edge (mobile)
- Each role is a card that alternates left/right on desktop
- Cards have: role title, company name, date range, location, and expandable bullet points
- The timeline line should have animated dots/pulses at each node
- The earliest role (Newpark) should have a subtle visual distinction — maybe labeled "Previous Career" or styled slightly differently to show the career transition

#### Animation
- Timeline line draws itself as user scrolls
- Cards reveal with staggered fade-in + slide as they enter viewport
- Timeline dots pulse with a glow effect when their card is in view

---

### 4. SKILLS / TECH STACK VISUALIZATION

#### Content (from resume)

**Languages & Frameworks:** Ruby on Rails, React, TypeScript, JavaScript, Python, Node.js
**Frontend:** React, Next.js, Tailwind CSS, Gatsby, React Native
**Backend:** REST APIs, ActiveRecord, Background Jobs, Authentication & Authorization
**Databases:** PostgreSQL
**Practices:** Test-driven development, Performance Optimization, Code Reviews
**AI & Automation:** LangChain, AutoGen, AI-assisted workflows
**Other:** HIPAA-compliant systems, Third-party API integrations

#### Layout & Design
Do NOT just make a grid of logos with progress bars. That's boring and says nothing. Instead, choose ONE of these more interesting approaches:

- **Option A — Interactive constellation:** A Three.js or SVG-based node graph where each skill is a floating node. Related skills are connected by glowing lines. Hovering a node highlights its connections and shows a tooltip with context (e.g., "React — 5 years, primary frontend framework"). Nodes are sized by proficiency/experience.

- **Option B — Terminal/CLI aesthetic:** Style the section like a terminal window. Show skills as if the user is running a command: `$ bryan --skills --verbose` and the output lists categorized skills with ASCII-style formatting, typing animation, and color-coded categories.

- **Option C — Bento grid:** A masonry/bento-style grid where each skill category is a card of varying size. Primary skills get larger cards with icons and brief context. Cards have subtle hover animations (lift, glow, border color shift). Group by: Frontend, Backend, Database, DevOps/Practices, AI/Automation.

Whichever option: make it interactive and give it personality. The skills section should feel like a product showcase, not a checklist.

#### Animation
- Scroll-triggered entry with staggered reveals
- Hover interactions on each skill element
- If using the constellation: gentle ambient floating motion

---

### 5. BLOG SECTION (on main page — preview only)

#### Content
- Section heading: `Writing & Thinking` or `From the Blog`
- Display 3-4 cards linking to external blog posts (Medium, Dev.to, personal blog, etc.)
- Each card: title, short excerpt/description, publication date, platform tag (Medium/Dev.to), and external link icon
- Use placeholder content if no real posts exist yet:
  - "Integrating AI Agents into Legacy Rails Apps"
  - "Living on the Road as a Remote Engineer"
  - "Why I Switched from Petroleum Engineering to Software"
  - "Building HIPAA-Compliant Systems: Lessons Learned"
- CTA at bottom: `Read more on the blog →` linking to `/blog`

#### Layout
- Horizontal scrolling card row on mobile
- 2-column or 3-column grid on desktop
- Cards: dark bg, border, subtle gradient overlay at bottom for text readability
- Hover: card lifts slightly, border glows cyan, external link icon animates

---

### 6. BLOG PAGE (`/blog`)

- Full page with the same nav and dark aesthetic
- List of all blog post links — each is an external link card
- Filterable by platform tag if multiple platforms are used
- Page transition animation when navigating from main page (Framer Motion `AnimatePresence` + Next.js layout transitions)
- Simple, clean, scannable — this is a utility page, not a showpiece

---

### 7. CONTACT SECTION

#### Content
- Section heading: `Let's Connect` or `Get in Touch`
- Brief text: "I'm always open to discussing new opportunities, interesting projects, or just talking shop. Currently open to remote-first roles."
- Contact form with fields: Name, Email, Message, Submit button
- Form should use a service like Formspree, Resend, or Next.js API route + email service
- Alternative contact methods displayed alongside the form:
  - Email: boyloe@gmail.com (with copy-to-clipboard interaction)
  - LinkedIn: link
  - GitHub: link
  - Phone: 561-315-6778 (optional — Bryan can decide to include or not)

#### Layout
- Two-column: form on left, contact info + social links on right
- Or: centered single-column form with contact info below

#### Design Details
- Form inputs: dark background, subtle border, cyan focus ring/glow
- Submit button: gradient fill matching `--gradient-accent`, with loading state
- Success state: animated checkmark with "Message sent!" confirmation
- Error state: red accent with retry option

#### Animation
- Form fields reveal with stagger on scroll
- Submit button has a subtle pulse or shimmer idle animation
- Success checkmark draws itself (SVG path animation)

---

## Global Animation & Motion Guidelines

### Philosophy
Motion should feel **purposeful and premium**, not chaotic. Every animation should either:
1. Guide the user's eye to important content
2. Provide feedback on interaction
3. Create a sense of depth and immersion

### Specific Guidelines
- **Scroll reveals:** Use Framer Motion `whileInView` with `once: true` (don't re-animate on scroll back up). Threshold: `0.2`. Use `fadeInUp` as the default entrance — elements fade in while translating 20-30px upward.
- **Stagger timing:** 80-120ms between staggered elements. Never more than 150ms — it starts to feel sluggish.
- **Easing:** Use `[0.25, 0.1, 0.25, 1]` (cubic-bezier) for most entrances. Use spring physics (`type: "spring", stiffness: 100, damping: 15`) for interactive elements.
- **Duration:** Entrance animations: 500-700ms. Hover transitions: 200-300ms. Page transitions: 400ms.
- **3D elements:** Always use `lerp` for mouse-tracking to prevent jitter. Target 60fps. Implement `useFrame` with delta time for consistent speed across refresh rates.
- **Reduce motion:** Respect `prefers-reduced-motion` media query. Disable all non-essential animations. Keep content accessible.
- **Page transitions:** Use Framer Motion `AnimatePresence` with `mode="wait"` for route changes. Fade + slight slide.

---

## Performance Requirements

- **Lighthouse scores:** Target 90+ on Performance, 100 on Accessibility, 100 on Best Practices, 100 on SEO
- **Core Web Vitals:** LCP < 2.5s, FID < 100ms, CLS < 0.1
- **3D performance:** Lazy-load the Three.js scene. Use `Suspense` with a loading fallback. Implement LOD (level of detail) reduction on mobile. Cap at 60fps with `useFrame`.
- **Images:** Use `next/image` with WebP/AVIF. Lazy load below-the-fold images.
- **Fonts:** Use `next/font` for self-hosted fonts. Subset to Latin characters. Display swap.
- **Bundle:** Code-split aggressively. Dynamic import Three.js components. Tree-shake unused `drei` helpers.
- **SEO:** Full meta tags, Open Graph tags, Twitter cards. Structured data (JSON-LD) for Person schema. Sitemap. Robots.txt.

---

## Responsive Behavior

- **Breakpoints:** Tailwind defaults — `sm:640px`, `md:768px`, `lg:1024px`, `xl:1280px`
- **Mobile-first:** All styles start mobile and scale up
- **3D on mobile:** Simplified scene, fewer objects, no mouse tracking (use gentle auto-rotation instead), consider disabling on very low-end devices
- **Touch interactions:** Larger tap targets (min 44px), swipeable blog cards, no hover-dependent functionality
- **Navigation:** Collapses to hamburger at `md` breakpoint

---

## Accessibility

- Full keyboard navigation support
- Visible focus indicators (cyan outline matching accent)
- ARIA labels on all interactive elements
- Alt text on all images
- Color contrast: all text meets WCAG AA minimum (4.5:1 for body, 3:1 for large text)
- Screen reader: logical heading hierarchy (h1 → h2 → h3), skip-to-content link
- 3D scene: decorative only, marked with `aria-hidden="true"`

---

## Project Structure

```
bryan-portfolio/
├── app/
│   ├── layout.tsx              # Root layout with nav, fonts, metadata
│   ├── page.tsx                # Main scroll page
│   ├── blog/
│   │   └── page.tsx            # Blog index page
│   └── globals.css             # Tailwind imports + CSS variables + global styles
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── PageTransition.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Experience.tsx
│   │   ├── Skills.tsx
│   │   ├── BlogPreview.tsx
│   │   └── Contact.tsx
│   ├── three/
│   │   ├── HeroScene.tsx       # Main 3D hero scene
│   │   ├── SceneFallback.tsx   # Non-WebGL fallback
│   │   └── [other 3D components]
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── SectionHeading.tsx
│       ├── TypingAnimation.tsx
│       └── TimelineItem.tsx
├── lib/
│   ├── constants.ts            # Colors, links, resume data
│   ├── animations.ts           # Reusable Framer Motion variants
│   └── utils.ts
├── public/
│   ├── fonts/
│   ├── images/
│   └── resume/
│       └── Bryan_Oyloe_Resume.pdf
├── tailwind.config.ts
├── tsconfig.json
├── next.config.ts
└── package.json
```

---

## Data & Content Constants

Store all personal data in `lib/constants.ts` so it's easy to update:

```typescript
export const PERSONAL = {
  name: "Bryan Oyloe",
  title: "Full Stack Software Engineer",
  email: "boyloe@gmail.com",
  phone: "561-315-6778",
  location: "Remote — currently traveling the US & Canada",
  github: "https://github.com/boyloe",
  linkedin: "https://linkedin.com/in/bryan-oyloe",
  resumeUrl: "/resume/Bryan_Oyloe_Resume.pdf",
};

export const EXPERIENCE = [
  {
    title: "Full Stack Developer II",
    company: "Whitelabel Collaborative",
    period: "Feb 2021 – Present",
    location: "Remote",
    highlights: [
      "Built and maintained large-scale Ruby on Rails applications for healthcare, pharmaceutical, and real estate clients",
      "Developed a HIPAA-compliant digital prescription portal for secure physician-to-enterprise prescription transmission",
      "Designed and enhanced RESTful APIs improving reliability and response times",
      "Created data-driven dashboards and reporting tools for client financial analysis",
      "Implemented dynamic React interfaces improving performance across multiple applications",
      "Integrated AI agents using LangChain and AutoGen for automated code review and bug detection",
      "Collaborated closely with product managers and designers on feature scoping and delivery",
    ],
  },
  {
    title: "Full Stack Mobile Development Intern",
    company: "Igedla LLC",
    period: "Dec 2020 – Apr 2021",
    location: "Denver, CO",
    highlights: [
      "Developed a symptom-checker chatbot using React Native with Merck Manual API integration",
      "Built multiple mobile app screens and contributed to frontend architecture decisions",
      "Designed and launched the company website using Gatsby and React",
    ],
  },
  {
    title: "Drilling Fluids Specialist II",
    company: "Newpark Drilling Fluids",
    period: "Jul 2018 – Feb 2020",
    location: "Denver, CO",
    highlights: [
      "Supported active drilling operations with fluid analysis and treatment recommendations",
      "Contributed to stuck-pipe remediation saving a client approximately $3M",
      "Produced daily technical reports for rig personnel and engineering teams",
    ],
    note: "Previous Career — Engineering Background",
  },
];

export const EDUCATION = [
  { degree: "B.Sc. in Petroleum Engineering", school: "University of North Dakota" },
  { degree: "Full Stack Web Development Program", school: "Flatiron School" },
];

export const SKILLS = {
  "Languages & Frameworks": ["Ruby on Rails", "React", "TypeScript", "JavaScript", "Python", "Node.js"],
  "Frontend": ["React", "Next.js", "Tailwind CSS", "Gatsby", "React Native"],
  "Backend": ["REST APIs", "ActiveRecord", "Background Jobs", "Auth & Authorization"],
  "Database": ["PostgreSQL"],
  "Practices": ["Test-Driven Development", "Performance Optimization", "Code Reviews"],
  "AI & Automation": ["LangChain", "AutoGen", "AI-Assisted Workflows"],
  "Domain Expertise": ["HIPAA-Compliant Systems", "Third-Party API Integrations"],
};

export const BLOG_POSTS = [
  // Replace with real posts — these are placeholders
  {
    title: "Integrating AI Agents into Legacy Rails Apps",
    excerpt: "How I used LangChain and AutoGen to add AI-powered code review to an existing Rails monolith.",
    date: "2025-12-15",
    platform: "Medium",
    url: "#",
  },
  {
    title: "Living on the Road as a Remote Engineer",
    excerpt: "5 years of full-time travel, 2 cats, and a career in software — here's what I've learned.",
    date: "2025-10-22",
    platform: "Dev.to",
    url: "#",
  },
  {
    title: "Why I Switched from Petroleum Engineering to Software",
    excerpt: "From drilling rigs to deployment pipelines — my unconventional path into tech.",
    date: "2025-08-05",
    platform: "Medium",
    url: "#",
  },
  {
    title: "Building HIPAA-Compliant Systems: Lessons Learned",
    excerpt: "Practical advice for developers working in healthcare software for the first time.",
    date: "2025-06-18",
    platform: "Dev.to",
    url: "#",
  },
];
```

---

## Key Personality & Differentiators to Communicate

The site should subtly convey these themes throughout its design and copy:

1. **Nomadic lifestyle is a strength, not a quirk.** Bryan has been remote and productive for 5+ years while living on the road. This shows adaptability, self-discipline, and resourcefulness. Weave travel motifs into the design (terrain, maps, roads, horizons) without making it kitschy.

2. **Career transition shows range.** Going from Petroleum Engineering to software engineering demonstrates analytical thinking, comfort with complex systems, and the ability to learn deeply and quickly. The $3M save at Newpark is a concrete proof point.

3. **AI-forward developer.** Bryan doesn't just use AI — he integrates it into production systems (LangChain, AutoGen). This is a major selling point in 2025-2026 and should be highlighted prominently.

4. **Ships real software in regulated environments.** HIPAA compliance, healthcare, pharma — this isn't hobby project territory. Bryan builds software that has to work, securely, at scale.

5. **Full stack means full stack.** React frontends, Rails backends, mobile with React Native, API design, database work, AI integration — Bryan genuinely covers the whole stack.

---

## Placeholder Content & Tokens

The following items need Bryan to fill in with real values. They are marked throughout this prompt with bracket notation:

- Blog post URLs — replace placeholder `#` links with real article URLs once posts are published
- Profile photo — add to `/public/images/` if desired
- Any additional projects or case studies to showcase

---

## Final Quality Checklist

Before considering the build complete, verify:

- [ ] Site loads in under 2 seconds on 4G connection
- [ ] 3D scene runs at 60fps on mid-range hardware (test on a 2-3 year old laptop)
- [ ] All text is readable — contrast ratios meet WCAG AA
- [ ] Navigation works flawlessly on mobile (thumb-friendly, no broken scroll)
- [ ] Contact form sends successfully (test end-to-end)
- [ ] All external links open in new tabs with `rel="noopener noreferrer"`
- [ ] Resume PDF is downloadable
- [ ] `prefers-reduced-motion` disables all non-essential animations
- [ ] No layout shift on load (CLS < 0.1)
- [ ] Meta tags, OG tags, and structured data are present and valid
- [ ] Favicon and app icons are set
- [ ] 404 page exists with consistent styling
- [ ] All placeholder content has been replaced with real data
- [ ] Site looks great on: iPhone SE, iPhone 14 Pro, iPad, 1440p desktop, ultrawide
