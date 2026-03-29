# QA Monitor

**AI-powered website QA testing SaaS**  
**VPS path:** `/home/boyloe/.openclaw/workspace/qa-dashboard`  
**Live (VPS):** http://204.168.184.80:3001

---

## Stack

- Next.js 16, TypeScript, Tailwind v4
- SQLite via Prisma 7 + better-sqlite3
- NextAuth v5 (magic link)
- Stripe (subscriptions)
- Playwright (headless Chromium)
- PM2 (process manager)

---

## Status

- [x] DB schema + migrations
- [x] Auth (magic link)
- [x] Dashboard — clients, flows, results, incidents
- [x] Playwright test runner
- [x] Cron scheduler
- [x] Telegram alerts
- [x] Stripe payments
- [x] PM2 (both processes running, systemd startup)
- [ ] Real SMTP (Resend.com recommended)
- [ ] Custom domain + nginx
- [ ] Stripe go-live
- [ ] Public status page per client
- [ ] First beta client

---

## Pricing

| Plan | Price | Stripe Price ID |
|------|-------|----------------|
| Starter | $29/mo | price_1TFojQ0ULb7nswUsHq2fLnUU |
| Pro | $99/mo | price_1TFojR0ULb7nswUsK5jsWxhN |
| Enterprise | $299/mo | price_1TFojR0ULb7nswUswB1Z1hzv |

---

## Dev Auth Cookie

```
Name:    authjs.session-token
Value:   dev-session-bryan-1774669923195
Expires: 2026-04-27
```

---

## Session Log

| Date | Work Done |
|------|-----------|
| 2026-03-28 | Full MVP built in one session (~4 hours) |
