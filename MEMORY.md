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

## Failsafe — SaaS Project (Formerly QA Monitor)

**Renamed from "QA Monitor"** → "Failsafe" (friendly but serious branding)

### Overview
AI-powered QA testing SaaS. Wanderclaw runs browser tests autonomously, alerts on failure. **Strategic portfolio project for AI engineer career positioning.**

### Stack
- **Frontend:** Next.js 16 (App Router), TypeScript, Tailwind v4
- **DB:** SQLite via Prisma 7 + better-sqlite3 adapter
- **Auth:** NextAuth v5 (magic link email)
- **Payments:** Stripe (subscriptions)
- **Browser automation:** Playwright (Chromium headless)
- **Process manager:** PM2

### Location
`/home/boyloe/.openclaw/workspace/qa-dashboard`

### Running on VPS
- **Dashboard:** PM2 `qa-dashboard` → port 3001 → http://204.168.184.80:3001
- **Test runner:** PM2 `qa-runner` → runs scheduler every 15 min

### Pricing
- Starter: $29/mo (price_1TFojQ0ULb7nswUsHq2fLnUU)
- Pro: $99/mo (price_1TFojR0ULb7nswUsK5jsWxhN)
- Enterprise: $299/mo (price_1TFojR0ULb7nswUswB1Z1hzv)

### Stripe
- Webhook: we_1TFoja0ULb7nswUsd0TUDgEE → http://204.168.184.80:3001/api/stripe/webhook
- Test mode (need to go live before launch)

### Telegram Alerts
- Bot token in .env
- Alert config in DB points to Bryan's chat ID (8633287384)
- Sends on FAIL and RECOVERED events

### Dev session cookie (for bypassing auth in browser)
- Name: `authjs.session-token`
- Value: `dev-session-bryan-1774669923195`
- Expires: 2026-04-27

### Status (2026-03-28)
✅ DB schema + migrations
✅ NextAuth magic link auth
✅ Landing page + pricing
✅ Dashboard overview, clients, client detail + flows
✅ Seed data (3 clients, 7 flows, 51 results, 2 incidents)
✅ Playwright test runner (headless Chromium)
✅ Step executor (plain English → browser actions)
✅ Cron scheduler (per-plan intervals)
✅ Telegram alerts (fail + recovery)
✅ Stripe payments (checkout, webhooks, billing portal)
✅ Settings page (plan cards + alert config)
✅ PM2 process manager (both processes running)

### Critical Gaps (System Design Audit, 2026-04-02)

**Database bottleneck 🔴**
- SQLite has single-writer lock; fails at 50-100 concurrent users
- Needs: PostgreSQL migration + connection pooling

**No observability 🔴**
- Processes run blind; silent failures invisible
- Needs: Structured logging, health checks, metrics

**Alert delivery not guaranteed 🟠**
- Email SMTP not wired up; alert failures silent
- Needs: Queue + retry logic with exponential backoff

**Playwright process memory leaks 🟠**
- Browser pool not implemented; each test spawns fresh Chromium
- Needs: Browser pool + memory limits per process

**No rate limit handling 🟠**
- Test runner retries forever on flaky hosts
- Needs: Circuit breaker, exponential backoff

**No backup / DR 🟠**
- Single copy of data on VPS disk
- Needs: Automated S3 backups, tested restore procedure

### 90-Day Execution Plan — Progress (Apr 3, 2026)

**Week 1-2: Database + Logging**

✅ **COMPLETED (Apr 3):**
- [x] PostgreSQL setup (Supabase)
- [x] Data migration: 945 test results + metadata
- [x] Schema pushed to PostgreSQL
- [x] Prisma schema updated
- [x] .env configured
- [x] SSH deploy keys working

⚠️ **CURRENT BLOCKER:**
- Prisma 7 build issue: "requires adapter or accelerateUrl"
- Solution: Add `export const dynamic = 'force-dynamic'` to API routes
- ETA to fix: ~15 min with Sonnet

📋 **NEXT (Fresh Session):**
- [ ] Fix Prisma build issue
- [ ] Verify `npm run build` succeeds
- [ ] Test runner with PostgreSQL
- [ ] Deploy runner to VPS
- [ ] Add structured logging (Winston)
- [ ] Add health check endpoint
- [ ] Setup email SMTP

**Week 3-4: Observability + Reliability**
- [ ] Metrics collection (Prometheus-compatible)
- [ ] Alert delivery queue + retry logic
- [ ] Playwright browser pool
- [ ] Circuit breaker for flaky hosts

**Week 5-6: Infrastructure + Portfolio**
- [ ] S3 backups + restore procedure
- [ ] TypeScript on frontend (already there)
- [ ] Add Python backend for extensibility
- [ ] Vector database integration for test matching (portfolio flex)
- [ ] Deploy to Vercel (dashboard) + keep runner on VPS

**Week 7-8: Launch + Polish**
- [ ] Stripe go-live (test → live)
- [ ] First paid beta customer
- [ ] Blog post: "Building AI-native SaaS" (system design + agentic features)
- [ ] Resume showcase ready

### Portfolio Value
This project demonstrates: full-stack ownership, system design, DevOps, agentic AI, production observability, SaaS business acumen. **Worth more than 10 theoretical portfolio projects.**

### Still To Do
- [ ] Deploy to production (Vercel for dashboard, keep runner on VPS)
- [ ] Wire up real email SMTP
- [ ] Public status page per client
- [ ] Landing page polish + custom domain
- [ ] Stripe go-live (switch from test mode)
- [ ] First real beta client
- [ ] PostgreSQL migration (critical for scale)
- [ ] Observability (logging, metrics, monitoring)
- [ ] TypeScript + Python backend polish
- [ ] Vector database integration (for differentiation)

## Investment Strategy — RV Park Acquisition

### Overview
Bryan is exploring buying a small RV park as first step toward building passive income streams. Goal: replace W2 income with investment income over 3-5 years.

### Capital Available
- **Down payment:** $50k
- **Emergency reserve:** $20k
- **Potential additional funding:** $30-50k (family loan/gift)
- **Total possible purchase price:** $250-500k (20% down on SBA financing)

### Investment Thesis
- **Location:** West of Nebraska (CO, UT, ID, MT, WY, OR, WA, AZ, NM preferred)
- **Timeline:** Cash flow within 12-18 months
- **Strategy:** Buy underperforming park, apply tech + operational improvements, automate, step back
- **Target return:** 15%+ annual ROI (cap rate 8-12% + value-add upside)
- **Long-term:** Build multiple passive streams, exit W2 work

### Competitive Advantages
- **RV industry insider:** Travels full-time in trailer, knows what works/fails in RV parks
- **Tech skills:** Can modernize old booking systems, implement dynamic pricing, build guest apps
- **Service background:** Years as server/bartender, understands ops and customer experience
- **Lifestyle flexibility:** Can be on-site initially, transition to remote ops

### Deal Tracker
File: `/home/boyloe/.openclaw/workspace/rv-park-deals.md`
- Marketplace research started (BizBuySell, Realmo, Parks and Places, etc.)
- Broker contacts compiled (Campground Brokers 800-648-1624, Parks and Places, etc.)
- Next: Register on marketplaces, contact brokers, join owner communities

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

## GitHub Access — SSH Deploy Keys (Apr 3, 2026)

**Setup Complete:** Two SSH keys, one per repo (deploy keys are repo-specific)

**Failsafe Repo:**
- Private key: `~/.ssh/github_failsafe`
- Remote: `git@github.com:boyloe/failsafe.git`
- SSH config host: `github.com`

**Portfolio Repo:**
- Private key: `~/.ssh/github_portfolio`
- Remote: `git@github.com-portfolio:boyloe/bryan-portfolio.git`
- SSH config host: `github.com-portfolio`

**Workflow:** I can `git push`, `git pull`, commit without tokens
**Commands:** `cd <repo> && git push` — just works, no extra steps

---

## Important Technical Notes

- **Tailwind v4** requires `@source` directives in `globals.css` — utility classes won't compile without them
- **GitHub push workflow:** Bryan provides a fresh PAT per session, I push and immediately clear it from remote URL
- **Next.js blog page** must be `"use client"` if it uses hover handlers (event handlers can't be in server components)

---

## Session History

### Apr 3, 2026 (17:00-21:11 UTC) — AI Engineer Upskilling + PostgreSQL Migration
**Accomplishments:**
- Analyzed 6 remote senior AI engineer roles → identified skill gaps
- Created AI-native resume highlighting LLM integration work
- Designed 90-day upskilling + Failsafe launch plan (detailed breakdown)
- Set up SSH deploy keys for failsafe + portfolio repos
- Migrated 945 test results from SQLite to Supabase PostgreSQL
- Data verified: all row counts match

**Key Learnings:**
- Job market wants: React + TypeScript + Python + LLM APIs + vector databases
- Your gap: Specific LLM shipping examples (Failsafe will fix this)
- Failsafe = portfolio project that proves AI capability
- Prisma 7 requires different config for PostgreSQL (lesson for next build)

**Blocker:** Prisma 7 build issue with Stripe API route. Fix in next session.

## Lessons Learned

- 3D low-poly box geometry is hard to make readable — lean into stylized (glowing edges, holographic) rather than realistic
- Always run `pnpm build` before pushing to catch TypeScript/render errors
- Don't rely on Tailwind utility classes for critical layout — use explicit CSS for max-width/centering
- Prisma 7 requires special handling for PostgreSQL (no adapter needed, but API routes need dynamic export)
