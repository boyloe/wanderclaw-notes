# Portfolio Site — bryanoyloe.com

**Repo:** https://github.com/boyloe/bryan-portfolio  
**Live:** https://bryan-portfolio-tan.vercel.app  
**Stack:** Next.js 16 (App Router), TypeScript, Tailwind v4, Three.js/R3F, Framer Motion  
**VPS path:** `/home/boyloe/.openclaw/workspace/bryan-portfolio`

---

## Status

- [x] Initial scaffold + deploy to Vercel
- [x] Hero scene — open road (first-person POV, animated dashes, stars)
- [x] About, Experience, Skills, Contact, Blog sections
- [x] Design polish — card elevation, section backgrounds, breathing room
- [ ] Resume PDF in `public/resume/`
- [ ] Contact form wired up (Formspree or API route)
- [ ] Custom domain pointed to Vercel
- [ ] Real blog post URLs in `lib/constants.ts`
- [ ] Profile photo (optional)

---

## Design Decisions

- **Hero:** Went through 3 iterations — box trailer (bad), A/B test with globe/road map, landed on first-person open road
- **Colors:** Dark navy base (`#09090e`), cyan accent (`#00d4ff`), alternating section backgrounds for separation
- **Cards:** Elevated with `--bg-card` (`#1c1c30`) + cyan border + box shadow — visible against section backgrounds
- **Sections alternate:** Hero → About (`--bg-secondary`) → Experience (`--bg-tertiary`) → Skills (`--bg-tertiary`) → Blog (`--bg-primary`) → Contact (`--bg-secondary`)

---

## Session Log

| Date | Work Done |
|------|-----------|
| 2026-03-27 | Initial build, scaffold, Vercel deploy |
| 2026-03-28 | Design polish, hero scene overhaul (road) |
