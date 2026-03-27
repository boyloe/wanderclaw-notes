# MEMORY.md — Wanderclaw's Long-Term Memory

_Last updated: 2026-03-27_

---

## Who I Am

- **Name:** Wanderclaw 🐾
- **Running on:** Hetzner VPS, Helsinki (`ubuntu-4gb-hel1-1`), Ubuntu 24.04
- **Isolated from Bryan's local machine** — SSH tunnel on port 18789 for dashboard only
- **Channel:** Telegram (primary)

---

## About Bryan

- **Name:** Bryan Oyloe
- **Email:** boyloe@gmail.com
- **GitHub:** https://github.com/boyloe
- **LinkedIn:** https://linkedin.com/in/bryan-oyloe
- **Location:** Remote — living full-time in a travel trailer (Salem brand, white/gray) with his wife and two cats. Travels US & Canada.
- **Background:** Petroleum Engineer → Full Stack Developer (2020 career switch via Flatiron School)
- **Experience:** 5+ years full stack, primary stack is **React / Ruby on Rails**
- **Industries:** Healthcare (HIPAA), Real Estate, Construction
- **Current job:** Full Stack Developer II at Whitelabel Collaborative (Feb 2021–present, remote)
- **Learning:** Agentic AI development — setting up Wanderclaw is part of that journey
- **Job hunting:** Yes, remote-only positions
- **Education:** B.Sc. Petroleum Engineering (UND), Full Stack Web Dev (Flatiron School)

---

## Active Projects

### Portfolio Site — bryanoyloe.com
- **Repo:** https://github.com/boyloe/bryan-portfolio
- **Live:** https://bryan-portfolio-tan.vercel.app (also bryanoyloe.com)
- **Stack:** Next.js (App Router), TypeScript, Tailwind v4, Three.js/R3F, Framer Motion
- **Status:** Scaffolded and deployed. Needs:
  - [ ] Resume PDF added to `public/resume/`
  - [ ] Contact form wired up (Formspree or API route)
  - [ ] Custom domain pointed to Vercel
  - [ ] Real blog post URLs in `lib/constants.ts`
  - [ ] Profile photo (optional)
  - [ ] 3D hero scene still needs polish — blocky trailer, ongoing issue
- **Local path on VPS:** `/home/boyloe/.openclaw/workspace/bryan-portfolio`
- **Spec:** `/home/boyloe/.openclaw/workspace/portfolio-spec.md`

### GitHub Profile README
- **Repo:** https://github.com/boyloe/boyloe
- **Status:** Live. Has ASCII banner, terminal-style stack display, career story.
- **Local path:** `/home/boyloe/.openclaw/workspace/github-profile`

---

## Preferences & Style

- **Communication:** Direct, no fluff. Doesn't need hand-holding.
- **Code:** Prefers things that actually work over things that look clever
- **Design taste:** Bold/creative, dark themes, developer aesthetic
- **Token:** Don't store GitHub PATs — Bryan provides them per session and revokes after

---

## Important Technical Notes

- **Tailwind v4** requires `@source` directives in `globals.css` — utility classes won't compile without them
- **GitHub push workflow:** Bryan provides a fresh PAT per session, I push and immediately clear it from remote URL
- **Next.js blog page** must be `"use client"` if it uses hover handlers (event handlers can't be in server components)

---

## Lessons Learned

- 3D low-poly box geometry is hard to make readable — lean into stylized (glowing edges, holographic) rather than realistic
- Always run `pnpm build` before pushing to catch TypeScript/render errors
- Don't rely on Tailwind utility classes for critical layout — use explicit CSS for max-width/centering
