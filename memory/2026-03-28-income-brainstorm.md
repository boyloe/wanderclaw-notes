# Income Brainstorm Session — 2026-03-28

**Time:** Fri 2026-03-27 20:33 UTC → Sat 2026-03-28 00:57 UTC

---

## Decision: AI QA Testing Service

Bryan wants to build an autonomous income stream using Wanderclaw. After brainstorming 10 ideas, we narrowed down to **four solid options** and selected **#1: AI QA Testing Service** to build first.

### Why This One

- **Fastest to revenue:** 40–50 hours setup, can start charging within 4–6 weeks
- **Lowest token burn:** Operational cost ~$1.20/mo (scales minimally with clients)
- **Highest leverage:** I handle 100% of daily work autonomously after setup
- **Better margins than alternatives:** 70–90% gross profit vs. dropshipping's razor-thin margins
- **Real customer value:** Genuinely useful compared to newsletters or content factories

---

## The Product Overview

**What clients get:**
- Dashboard to input website URL + critical user flows
- Daily/hourly automated testing of those flows
- Instant alerts on failure (email, Telegram, Slack)
- English-language incident reports ("Checkout page returned 500 error at 14:32 UTC")
- Public status page showing uptime %

**How I work:**
- Run browser tests on schedule using OpenClaw's `browser` tool
- Store snapshots, screenshots, logs in workspace
- Diff against previous runs to detect changes
- Generate incident reports automatically
- Send alerts + update status page
- No human intervention needed after setup

**Pricing tiers:**
- Starter: $29/mo (1 website, 3 flows, daily tests)
- Pro: $99/mo (3 websites, 10 flows, hourly tests, Slack)
- Enterprise: $299/mo (unlimited, custom, 15-min intervals)

**Revenue math:**
- 10 clients at $29/mo = $290/mo (covers tokens + hosting)
- 20 clients at avg $60/mo = $1,200/mo (real passive income)

---

## What We're Building

### Phase 1: MVP (40–50 hours total)

1. **Next.js Dashboard** (12–16 hours)
   - Client signup + login
   - Add website + test flows
   - Display uptime, incident history
   - Payment integration (Stripe)

2. **Test Runner** (8–12 hours)
   - Node.js cron jobs
   - Browser automation using OpenClaw's `browser` tool
   - Store results in workspace files
   - Diff detection + error handling

3. **Alert Pipeline** (3–4 hours)
   - Email alerts
   - Telegram integration
   - Slack webhooks (optional)

4. **Status Page** (4–6 hours)
   - Static HTML generated from test results
   - Deploy to Netlify
   - Public uptime display per client

5. **Landing Page + Docs** (4–6 hours)
   - Marketing copy
   - Setup guides for clients
   - Pricing display

### Phase 2: Beta Launch (Week 3–4)
- Polish MVP
- Recruit 1–2 beta clients (friends, reddit, communities)
- Iterate based on feedback

### Phase 3: Public Launch (Month 2)
- ProductHunt, indie hacker forums, Twitter
- Target: 20+ paying clients by end of month 2

---

## Model Choice: Sonnet vs Haiku

**Decision: Use Sonnet for the whole build.**

**Reasoning:**
- Haiku: $9–11 development cost, but +10–15 hours debugging = $300–750 opportunity cost
- Sonnet: $12–16 development cost, works right the first time
- Operational cost is identical either way (~$1.20/mo)
- Complex browser automation logic needs Sonnet's thinking capacity

**Total build cost:** $12–16 in tokens (negligible compared to your time)

**Monthly operational cost:** ~$1.20/mo (rock solid, doesn't scale much)

---

## Next Steps

When Bryan resumes:
1. Start building the Next.js dashboard scaffold (authentication, client CRUD, payment integration)
2. Wire up the test runner architecture (browser automation templates, cron scheduling)
3. Build alert pipeline (email, Telegram, Slack)
4. Create status page generator
5. Write landing page + docs

Ready to start on dashboard whenever Bryan says go.

---

## Other Ideas (Ranked, For Reference)

If this doesn't work out or Bryan wants alternatives:

1. **Niche AI Newsletter** (7/10 viability) — $500–5,000/mo at scale, slower growth
2. **Competitive Intelligence** (8/10 viability) — $500–3,000/mo, requires client hunting
3. **Podcast/Video Summaries** (7/10 viability) — $500–3,000/mo, white-label to production companies
4. **SEO Content Factory** (6/10 viability) — High token burn, saturated market
5. **Data Reports** (6/10 viability) — High setup risk, hard to validate niche demand
6. **Dropshipping** (not recommended) — Razor-thin margins, constant customer service, unpredictable ad spend

---

**Status:** Ready to start building. Awaiting Bryan's go-ahead.
