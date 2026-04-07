# MEMORY.md — Wanderclaw's Long-Term Memory

_Last updated: 2026-04-07_

---

## Who I Am

- **Name:** Wanderclaw 🐾
- **Running on:** Hetzner VPS, Helsinki (`ubuntu-4gb-hel1-1`), Ubuntu 24.04
- **Channel:** Telegram (primary)

---

## About Bryan

- **Name:** Bryan Oyloe | **Email:** boyloe@gmail.com
- **GitHub:** https://github.com/boyloe | **LinkedIn:** https://linkedin.com/in/bryan-oyloe
- **Location:** Full-time travel trailer (Salem, white/gray) with wife + two cats. US & Canada.
- **Background:** Petroleum Engineer → Full Stack Dev (Flatiron School, 2020)
- **Stack:** React / Ruby on Rails (5+ yrs). Industries: Healthcare (HIPAA), Real Estate, Construction
- **Job:** Full Stack Dev II @ Whitelabel Collaborative (Feb 2021–present, remote)
- **Goals:** Job hunting (remote AI-engineer roles), passive income via investments, learning agentic AI dev

---

## Failsafe — SaaS Project

AI-powered QA testing SaaS. Wanderclaw runs browser tests, alerts on failure. Portfolio project for AI engineer positioning.

**Stack:** Next.js 16, TypeScript, Tailwind v4, PostgreSQL (Supabase) + Prisma 7 + `@prisma/adapter-pg`, NextAuth v5, Stripe, Resend, Winston, Playwright, PM2
**Location:** `/home/boyloe/.openclaw/workspace/qa-dashboard`
**Running:** PM2 `qa-dashboard` → port 3001 → http://204.168.184.80:3001 | PM2 `qa-runner` → 15min cron

**Pricing:** Starter $29 (`price_1TFojQ0ULb7nswUsHq2fLnUU`) | Pro $99 (`price_1TFojR0ULb7nswUsK5jsWxhN`) | Enterprise $299 (`price_1TFojR0ULb7nswUswB1Z1hzv`)
**Stripe webhook:** `we_1TFoja0ULb7nswUsd0TUDgEE` → `/api/stripe/webhook` (test mode — not live yet)
**Resend key:** `re_h4P2EZsq_Mh12JD9JqZW2FLt3263Uf9y5`
**Dev session cookie:** `authjs.session-token` = `dev-session-bryan-1774669923195` (expires 2026-04-27)

**Live Clients:**
- Wanderlump (`client_wanderlump`) — https://wanderlump.com (4 flows)
- Failsafe self-monitor (`client_failsafe_self`) — http://204.168.184.80:3001 (2 flows)
- All 6 flows passing. Running on PRO schedule (hourly).

**Completed (Week 1-2):** PostgreSQL migration (945 results), Prisma 7 adapter, Winston logging, /api/health, Resend email, DB-backed alert queue (exponential backoff, 5 max attempts)

**Next Up (Week 3-4):**
- [ ] Playwright browser pool (currently spawns fresh Chromium per test)
- [ ] Prometheus-compatible metrics
- [ ] Circuit breaker for flaky hosts

**Later:**
- [ ] S3 backups, Stripe go-live, Vercel deploy, public status page, custom domain, first beta client

---

## Investment Strategy — RV Park Acquisition

- **Capital:** $50k down + $20k reserve + possible $30-50k family → target $250-500k purchase price (SBA 20% down)
- **Location preference:** West of Nebraska (CO, UT, ID, MT, WY, OR, WA, AZ, NM)
- **Strategy:** Buy underperforming park, apply tech + automation, transition to remote ops
- **Target return:** 15%+ ROI (cap rate 8-12% + value-add)
- **Deal tracker:** `/home/boyloe/.openclaw/workspace/rv-park-deals.md`
- **Next:** Register on marketplaces (BizBuySell, Realmo), contact brokers, join owner communities

---

## Active Projects

### Portfolio Site — bryanoyloe.com
- **Repo:** https://github.com/boyloe/bryan-portfolio | **Live:** https://bryan-portfolio-tan.vercel.app
- **Stack:** Next.js (App Router), TypeScript, Tailwind v4, Three.js/R3F, Framer Motion
- **Local:** `/home/boyloe/.openclaw/workspace/bryan-portfolio`
- **TODO:** Resume PDF, contact form, custom domain, real blog URLs, 3D hero polish

### GitHub Profile README
- **Repo:** https://github.com/boyloe/boyloe | **Local:** `/home/boyloe/.openclaw/workspace/github-profile`
- Status: Live. ASCII banner, terminal-style stack, career story.

---

## GitHub SSH Deploy Keys

- **Failsafe:** `~/.ssh/github_failsafe` → host `github.com` → `git@github.com:boyloe/failsafe.git`
- **Portfolio:** `~/.ssh/github_portfolio` → host `github.com-portfolio` → `git@github.com-portfolio:boyloe/bryan-portfolio.git`
- Just `git push` — no tokens needed.

---

## Preferences & Technical Notes

- **Style:** Direct, no fluff. Prefers working code over clever code. Dark/bold design aesthetic.
- **Tailwind v4:** Requires `@source` directives in `globals.css` — no directives = no utility classes
- **Prisma 7:** `url` removed from schema datasource — must use driver adapter pattern; use `db push` not `migrate dev` with existing DBs
- **Next.js:** Blog/interactive pages must be `"use client"` if they use event handlers
- **Resend > nodemailer** for transactional email
- **Alert delivery:** Always queue with retry — fire-and-forget = silent failures
- **3D scenes:** Lean stylized (glowing edges, holographic) not realistic — low-poly box geometry is illegible
