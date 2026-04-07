---
name: token-budget-skill
description: >
  Activate for ANY task that doesn't need full conversation history or workspace context:
  web research, price lookups, market data, comparisons, quick factual questions, summarization
  of external content, data gathering, or any contained investigation. Spawn a Haiku subagent
  with only the information it needs — return a clean summary. Cost is ~20x lower than running
  in the main session. Trigger phrases: "look up", "research", "find me", "what does X cost",
  "compare", "check the price", "gather data", "what are the options for", "search for".
  Do NOT use for tasks that need workspace files, memory context, or active project knowledge.
---

# Token Budget Skill

## Why This Exists

Every tool call in the main session re-sends the full conversation + injected workspace files as input tokens. Research tasks don't need any of that — they just need a search query and a browser. Spawning a Haiku subagent gives a clean ~5k token context instead of 150k+.

**Rule of thumb:** If the task could be answered by a fresh agent with just a one-sentence briefing, use this skill.

## When to Use

✅ Web research, price lookups, market comparisons  
✅ Fetching and summarizing external URLs or docs  
✅ Data gathering (real estate listings, job postings, product specs)  
✅ Quick factual questions that require search  
✅ Any contained investigation with no need for Bryan's history  

❌ Don't use for: coding tasks, tasks needing MEMORY.md context, multi-session projects

## How to Execute

### 1. Write a tight task brief

Include only what the subagent needs:
- The specific question or data to gather
- Any constraints (location, budget, format preference)
- What to return (bullet points, table, raw URLs, etc.)

Do NOT include conversation history, Bryan's background, or project context unless directly relevant.

### 2. Spawn on Haiku

```
sessions_spawn(
  task: "<tight brief>",
  model: "haiku",
  mode: "run",
  runtime: "subagent"
)
```

### 3. Return a clean summary

Don't dump raw subagent output. Extract what's useful, format it for Bryan, and discard the rest.

## Cost Reference

| Session type | Approx input tokens | Approx cost per call |
|---|---|---|
| Main session (mid-convo) | 100k–200k | $0.30–$0.60 |
| Haiku subagent (clean) | 3k–10k | $0.001–$0.003 |

For a 10-search research session: ~$5+ in main vs ~$0.02 in subagent.

## Example Brief Format

```
Research task: Find RV parks for sale in Colorado under $500k.
Sources to check: BizBuySell, Loopnet, Crexi.
Return: Name, price, number of sites, URL for each listing found.
Limit to 5-10 results.
```

## Fallback

If the task turns out to need project context mid-way, pull the result back to the main session and continue there. Don't stuff MEMORY.md into the subagent retroactively.
