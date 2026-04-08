# Twitter Drafts — Week 1 & 2

_Generated: 2026-04-07_
_Status: Ready for review_

---

## Week 1 (Apr 7-13)

### Post 1 — Monday, Apr 7 (Building)
```
shipped exponential backoff to our alert queue today. finally.

spent way too long debugging a race condition between the retry logic and the notification service. the fix was small, but finding it was painful. 

this is the stuff nobody talks about but it's what actually keeps things running.
```

### Post 2 — Wednesday, Apr 9 (AI Learning)
```
Learned something the hard way today with @openclaw

My AI agent runs heartbeat checks every 30 min to stay on top of tasks. Didn't realize it was using the full model + entire conversation history each time.

Woke up to $9 in charges before I touched my keyboard.

Here's what I didn't know:
• You can set a separate model just for heartbeats
• lightContext: true loads only your checklist file instead of everything
• isolatedSession: true drops the chat history entirely

53k tokens per heartbeat → ~2k
~$0.50 per check → ~$0.001

The agent still works exactly the same. Just doesn't cost a small fortune to check in.

Always check your defaults. The cheap path usually exists — you just have to find it.
```

### Post 3 — Friday, Apr 11 (AI Learning)
```
two months in with agents and i'm learning they're way better at orchestration than nuance.

they'll confidently do the wrong thing if you don't constrain them properly. which means the interesting problem isn't "how do i make it smarter" but "how do i make it safer."
```

### Post 4 — Sunday, Apr 13 (Crossover)
```
worked from a campground in colorado today. wifi actually held. sky was better than my monitor.

you don't realize how much of remote work is just "your office has the same view every day" until it doesn't.
```

---

## Week 2 (Apr 14-20)

### Post 5 — Monday, Apr 14 (Building)
```
migrating to prisma 7 was annoying. the adapter pattern makes sense once you're in it, but the docs don't really cover the non-vercel path.

if you're doing this: skip `migrate dev` with existing dbs, just use `db push`. would've saved me like 8 hours.
```

### Post 6 — Wednesday, Apr 16 (RV Reality)
```
internet while full-time RVing:

starlink works, $150/mo, actually fast. verizon hotspot is our backup, slower but unlimited. campground wifi is a joke.

we do both. redundancy > hope.
```

### Post 7 — Thursday, Apr 17 (AI Learning)
```
built a browser automation agent. worked great in testing. immediately fell apart in production because the site changed its html.

agents break in new ways. they're confident about it too, which is the fun part.
```

### Post 8 — Saturday, Apr 19 (Crossover)
```
this week my office is near moab. shipped code, fixed solar stuff, watched the sunset.

it's the dream. it's also chaotic. weirdly both things are true at the same time.
```

---

## Thread Ideas (Ready to Expand)

### Thread A: "What I've Learned Shipping AI Products" (3-5 parts)
1. Agents are orchestrators, not thinkers
2. Constraints > features
3. Observability is critical (you can't debug what you can't see)
4. Test failures cascade faster than code failures
5. The boring stuff (retry logic, alerting) matters more than the cool stuff

### Thread B: "Full-Time RV Dev Setup: The Real Costs" (4-5 parts)
1. Internet: $150-200/mo (Starlink + backup)
2. Power: $8k-12k upfront (solar + batteries), $0 ongoing
3. The hidden costs (repairs, breakdown time)
4. Working while traveling is possible, not seamless
5. The trade-off: freedom vs. stability

### Thread C: "Building Failsafe: Month 1 Lessons" (4-6 parts)
1. Started with a rough architecture
2. PostgreSQL migration was messier than expected
3. Logging changes everything (you see problems before they're problems)
4. Alert delivery is harder than it looks
5. Your first clients teach you what actually matters

---

## Notes

- All posts avoid promotion language. They describe what happened, what broke, what you learned.
- Mix is roughly: 2 building, 1 RV, 1 AI per week (rotate slightly).
- Crossover posts naturally emerge from the mix — don't force them.
- Engagement hooks are subtle: ask a question, share a surprising stat, admit a mistake.
- Ready for you to review, edit, and ship. No approval needed unless you want to tweak tone.
