---
tags: [ai, product-thinking, philosophy, saas, design-principles]
date: 2026-03-29
status: seedling
related: [[qa-monitor]], [[sessions/2026-03-29]]
---

# What Makes an App AI-Native?

## The Core Distinction

"Bolted on" AI is a feature. AI-native means the app *couldn't exist* without AI — or would be so fundamentally worse it would be a different product entirely.

## The 2018 Test

> *Could this have been built in 2018?*

If yes, and you're just swapping a rules engine for an LLM — it's bolted on.  
If the whole concept only became possible because of capable AI — it's native.

## Bolted-On Signals

- There's an "AI" button or tab you click to invoke it
- AI summarizes or decorates things the user already did
- You could swap it out for a simpler rule or a human and the app still works
- It's a wrapper around a chat completion API with context stuffed in
- The AI is **reactive** — only acts when explicitly asked

## AI-Native Signals

- The AI is in the critical path, not a sidebar
- The product *generates* the user's work rather than *assisting* with it
- Removing the AI means the product doesn't exist, not just "works worse"
- The AI acts **autonomously** on the user's behalf — it *does* things, not just says things
- The feedback loop between user intent and AI output **is** the UX

## Comparison Table

| Bolted On | AI Native |
|---|---|
| Notion AI (summarize your notes) | Cursor (the editor IS the AI loop) |
| Gmail Smart Compose | Devin / coding agents |
| Grammarly | v0 / Bolt (generate the app) |
| Chatbot on a support page | Intercom Fin (replaces the queue) |
| AI image filter in Lightroom | Midjourney (creation, not enhancement) |

## The Real Line

AI-native isn't about the technology — it's about **who does the work**.

- **Bolted on:** Human does the work, AI assists
- **AI native:** AI does the work, human directs, reviews, approves

The shift from *assist* to *delegate* is the real distinction.

## Applied to QA Monitor

QA Monitor is closer to AI-native than it might seem — the whole premise is "AI runs your tests so you don't have to." The autonomy *is* the product.

To push it fully native: have the AI *write* the test steps from a plain English description of what the app should do — not just execute steps a human defined. That closes the loop.

## Open Questions

- Where does "agentic" end and "AI-native" begin? Are they the same?
- Can a B2C app be truly AI-native or does it only work for knowledge work / dev tools?
- What's the monetization model difference? (AI-native can charge on outcomes, not seats)
