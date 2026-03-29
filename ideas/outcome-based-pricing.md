---
tags: [ai, pricing, business-model, saas, ai-native]
date: 2026-03-29
status: growing
related: [[ai-native-vs-bolted-on]], [[qa-monitor]], [[sessions/2026-03-29]]
---

# Outcome-Based Pricing

## The Core Idea

Charge for *results delivered*, not time, seats, or usage. Instead of "you pay $X/month for access," it's "you pay $X per outcome achieved."

Not a new concept — consulting firms and ad networks have done versions of this for years. But it was always hard to operationalize cleanly. AI-native apps change that.

## Why It Was Hard Before

- Hard to define "outcome" precisely enough to invoice on
- Human labor is fuzzy — did the vendor *cause* the result or did other factors?
- Customers resist paying for outcomes they can't audit or verify
- Misaligned incentives — the vendor might cherry-pick easy wins and avoid hard ones
- Revenue was unpredictable; hard to build a business on variable billing

## Why AI-Native Unlocks It

- The AI's work is **logged, reproducible, auditable** — every action traceable
- Outcomes *are* the product (a test passed, a ticket resolved, a lead qualified)
- Success criteria can be defined upfront and measured **by the system itself**
- Vendor cost scales with usage (compute/tokens), not headcount — so variable revenue doesn't crater margins the way it would for a human services firm
- You can run many more "jobs" simultaneously than any human team, so aggregate outcomes can be high even at low per-unit prices

## Who's Doing It Now

| Company | What They Sell | Outcome Unit |
|---|---|---|
| **Intercom (Fin)** | AI customer support | Per resolved conversation |
| **Sierra** (Benioff's AI CS co.) | AI customer service | Per resolution |
| **Harvey** | Legal AI | Moving toward matter-based pricing |
| **Cognition / Devin** | AI dev agent | Early signals toward per-task / per-PR |
| **Stripe** | Payments + AI products | Per transaction (OBP in DNA from day 1) |

Intercom is the clearest example: if Fin doesn't resolve the ticket and escalates to a human, **you don't pay**. The incentive is perfectly aligned — Intercom only gets paid when their AI actually works.

## How It Changes How You Build

### 1. Success criteria must be first-class
Not "did the AI respond" — "was the outcome achieved." This means evals, result tracking, and confidence scoring need to be core product features, not afterthoughts. You're building a measurement system as much as a product.

### 2. Better AI = higher margins, not just better product
If your model improves, costs drop while revenue holds. The incentive to invest in AI quality is directly tied to profitability — not just NPS. This is a fundamentally different R&D incentive than traditional SaaS.

### 3. Scope creep kills you
The harder the outcome to verify, the more edge cases appear. Be precise about what counts as success. Easy: "support ticket marked resolved." Dangerous: "customer didn't churn." The further from a direct system action, the harder to attribute and invoice.

### 4. Sales motion shifts dramatically
You're not selling software access — you're selling a **guarantee**. The motion becomes:
- Pilot → prove ROI → scale
- Much more like professional services than SaaS
- Longer sales cycles, higher ACV, stickier retention
- Customers need to trust you before they'll write a variable check

### 5. Pricing floor matters
You need a floor on what counts as a billable outcome. Otherwise edge cases (half-resolved tickets, partial completions) create disputes. Define it clearly, build it into the contract.

## The Margin Flywheel

```
Better AI → more outcomes per $ of compute
         → higher margins
         → reinvest in AI quality
         → better AI
```

This flywheel doesn't exist in traditional SaaS. It's unique to AI-native outcome businesses.

## Applied to QA Monitor

QA Monitor is already outcome-adjacent — a test run is a billable event. But there are higher-value outcome framings:

| Pricing Model | What You're Charging For |
|---|---|
| Per test run | Compute/execution (commoditizing fast) |
| Per failure caught | Value delivered to the customer |
| Per deployment protected | Insurance framing — highest perceived value |
| Per incident prevented | Hardest to attribute but highest ACV potential |

The "per failure caught" model is interesting — it aligns Wanderclaw's incentive with the customer's actual goal. The risk: customers with stable apps pay less, which might feel wrong but actually reflects the value correctly.

The **deployment protection** framing reframes QA Monitor from "automated testing tool" to "release insurance." That's a much stronger sales story.

## Open Questions

- How do you handle disputes? ("That wasn't really resolved.") — needs clear contract language + audit trail
- Does outcome pricing work for B2C or only B2B? Consumer trust in variable billing is lower.
- What's the right granularity — micro-outcomes (per ticket) or macro-outcomes (per quarter of churn reduction)?
- Does this model require a minimum commitment / floor MRR to be fundable/predictable?
- At what point does outcome pricing create adverse selection (customers with hard problems avoid you)?
