# Resume Notes — AI Engineer Positioning
_Ongoing log for building Bryan's AI-forward resume_
_Started: 2026-04-08_

---

## Purpose

Capture everything Bryan builds, learns, and ships — especially AI-related work — to use as raw material for a strong AI engineer resume. This includes:

- Projects built with/for AI
- Agentic workflows and tooling
- Architectural decisions and skills demonstrated
- Results and metrics where available

---

## Projects

### Failsafe — AI-Powered QA Testing SaaS
- **What it is:** SaaS platform where an AI agent (Wanderclaw) runs browser-based QA tests against client websites and alerts on failures
- **Stack:** Next.js 16, TypeScript, Tailwind v4, PostgreSQL (Supabase) + Prisma 7 + `@prisma/adapter-pg`, NextAuth v5, Stripe, Resend, Winston, Playwright, PM2
- **AI angle:** Agentic test runner; autonomous failure detection and alerting; designed as a portfolio piece for AI engineer positioning
- **Live clients:** Wanderlump (4 flows), Failsafe self-monitor (2 flows) — all passing on PRO hourly schedule
- **Shipped:**
  - PostgreSQL migration (945 results migrated)
  - Prisma 7 driver adapter pattern
  - Winston structured logging
  - /api/health endpoint
  - Resend transactional email
  - DB-backed alert queue with exponential backoff (5 max attempts)
- **In progress:** Playwright browser pool, Prometheus metrics, circuit breaker for flaky hosts

### Wanderclaw — Personal AI Familiar (OpenClaw)
- **What it is:** Bryan built and configured a persistent AI assistant running on a Hetzner VPS (Helsinki), connected via Telegram
- **Stack:** OpenClaw framework, Node.js, custom skills (brainstorm, TDD, code review, etc.)
- **AI angle:** Hands-on experience building agentic workflows, skill authoring, memory systems, heartbeat/cron automation, multi-session orchestration
- **Notable:** Wanderclaw has persistent memory across sessions, runs proactive heartbeat checks, manages multiple sub-agents, and integrates with external services

### Portfolio Site — bryanoyloe.com
- **Stack:** Next.js (App Router), TypeScript, Tailwind v4, Three.js/R3F, Framer Motion
- **Live:** https://bryan-portfolio-tan.vercel.app
- **AI angle:** Built to showcase AI engineer positioning; 3D interactive elements

### GitHub Profile README
- **Live:** https://github.com/boyloe/boyloe
- ASCII banner, terminal-style stack, career story narrative

---

## Skills Demonstrated

- Agentic AI development (OpenClaw, custom skill authoring, multi-agent orchestration)
- Full-stack: React, Next.js, TypeScript, Ruby on Rails
- AI tooling: Playwright automation, browser agent loops, failure detection
- Infrastructure: PostgreSQL, Prisma 7, PM2, Hetzner VPS, Supabase
- Integrations: Stripe, Resend, NextAuth v5, Winston logging

---

## Background / Career Story

- **Origin:** Petroleum Engineer → Flatiron School (2020) → Full Stack Dev
- **Current role:** Full Stack Dev II @ Whitelabel Collaborative (Feb 2021–present, remote)
- **Industries:** Healthcare (HIPAA), Real Estate, Construction
- **Stack depth:** React + Ruby on Rails, 5+ years

---

## Log

| Date | Activity |
|------|----------|
| 2026-04-08 | Started resume notes file. Decided to document all work with Wanderclaw for AI-forward resume. |
| 2026-04-08 | Diagnosed and fixed AI agent cost blowout — heartbeat runs on claude-sonnet with 53k token context were costing ~$0.50/check × 18 calls = ~$9/day. Fixed via openclaw.json: switched heartbeat model to Haiku, enabled lightContext + isolatedSession. Cost dropped ~500x. Demonstrates: AI infrastructure debugging, token optimization, cost observability. |
| 2026-04-08 | Used Browser.cash + Playwright to scrape Zillow listing data (anti-bot bypass). Researched Fremont County CO zoning rules for STRs and RV rentals. Pulled comparable sales data. Practical application of browser automation in a real-world research workflow. |
| 2026-04-08 | Built property-deals.md deal tracker for Cotopaxi CO property. Integrated due diligence checklist into HEARTBEAT.md for automated reminders. Shows proactive use of agent memory + automation for personal finance decisions. |

