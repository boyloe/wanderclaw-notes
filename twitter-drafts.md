# Twitter Drafts — Week 1 & 2

_Generated: 2026-04-07_
_Status: Ready for review_

---

## Week 1 (Apr 7-13)

### Post 1 — Monday, Apr 7 (Building)
```
just shipped exponential backoff to our alert queue. 

reduced false positives by 40%. took way longer than i thought to get right because the retry logic kept racing with the notification service.

the boring stuff is always the stuff that matters most.
```

### Post 2 — Wednesday, Apr 9 (RV Reality)
```
installed 400W of solar this past weekend.

our rv office now runs on sunlight. it's weird how much better you feel knowing your power is literally above your head instead of in a tank slowly draining.

also: the cats don't care. they still knocked over water everywhere.
```

### Post 3 — Friday, Apr 11 (AI Learning)
```
been building with AI agents for about 2 months now.

the biggest lesson: agents are great at orchestration, terrible at nuance. they will confidently do the wrong thing if you let them.

constraints > freedom when it comes to what an agent can do.
```

### Post 4 — Sunday, Apr 13 (Crossover)
```
wrote code for 6 hours from a campground in colorado. the wifi held up. the view was better than my usual office.

remote work is wild when your office moves every few weeks.
```

---

## Week 2 (Apr 14-20)

### Post 5 — Monday, Apr 14 (Building)
```
prisma 7 forced me to rethink our entire migration strategy.

the adapter pattern is actually solid once you understand it. but the docs are sparse if you're not using vercel postgres.

if you're migrating to 7: don't use `migrate dev` with existing dbs. use `db push`. saved me a whole day of debugging.
```

### Post 6 — Wednesday, Apr 16 (RV Reality)
```
full-time rv internet reality check:

starlink: fast, reliable, but expensive ($150/mo). good when you're remote.
verizon hotspot: slower but unlimited. better for backup.
campground wifi: laughable. don't count on it.

we run starlink + verizon. redundancy beats hoping.
```

### Post 7 — Thursday, Apr 17 (AI Learning)
```
built a browser automation agent today. it worked perfectly in my test. 

in production it broke immediately because the site changed its html structure.

agents need to be resilient or they're expensive rubber bands. learning this the hard way.
```

### Post 8 — Saturday, Apr 19 (Crossover)
```
my office this week: a travel trailer parked near moab, utah.

shipped a feature, fixed solar charging, and watched the sunset. 

this is the dream people talk about. it's also chaotic. both things are true.
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
