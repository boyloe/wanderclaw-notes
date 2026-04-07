---
name: brainstorm-skill
description: >
  Activate BEFORE writing any code when Bryan says "help me plan", "help me design",
  "help me build [feature]", "let's design", "what's the best way to build", or any
  request to create a new feature/project. Explores intent, surfaces requirements, proposes
  alternatives, and produces an approved design doc before implementation begins. Hard gate:
  do NOT write code until a design is approved. Chains to writing-plans-skill after approval.
---

# Brainstorm Skill

Turn rough ideas into approved design docs through collaborative dialogue.

## Hard Gate

**Do NOT write code, scaffold files, or invoke writing-plans-skill until Bryan has explicitly approved the design.** No exceptions, even for "simple" tasks — simple tasks are where unexamined assumptions cause the most wasted work.

## Workflow

1. **Explore project context** — read relevant files, MEMORY.md patterns, existing code structure
2. **Ask clarifying questions** — one at a time, never a wall of questions
   - What problem does this solve?
   - Who uses it and how?
   - Any constraints (time, stack, budget)?
   - What does "done" look like?
3. **Propose 2-3 approaches** — with trade-offs and your recommendation
4. **Present design in sections** — get approval after each section before continuing:
   - Overview & Goals
   - Architecture & Data Model
   - UI/UX (if applicable)
   - API surface
   - Open questions / risks
5. **Write design doc** — save to `docs/designs/YYYY-MM-DD-[feature].md`
6. **Self-review the doc** — check for placeholders, contradictions, scope creep
7. **Ask Bryan to review** — don't proceed until he says "looks good" or similar
8. **Transition** — invoke writing-plans-skill

## Guard Rails to Check

Before finalizing design, verify against Wanderclaw standards (from GUARD_RAILS_BRAINSTORM.md):

- **Stack fit:** App Router only, no Pages Router; TypeScript strict; Tailwind v4
- **Auth:** NextAuth magic link preferred
- **DB:** Prisma schema with migrations, no N+1
- **Scope:** Flag if design covers multiple independent subsystems → suggest splitting
- **YAGNI:** Call out anything in scope that won't be used in the first version

## Design Doc Template

Save to: `docs/designs/YYYY-MM-DD-[feature-slug].md`

```markdown
# [Feature Name] Design

**Date:** YYYY-MM-DD
**Status:** Approved

## Problem

[What pain does this solve?]

## Goals

- [Goal 1]
- [Goal 2]

## Non-Goals (explicitly out of scope)

- [Non-goal 1]

## Approach

[Chosen approach and why]

## Architecture

[Data model, component structure, API surface]

## Open Questions

- [Any unresolved decisions]

## Risks

- [Things that could go wrong]
```

## Anti-Patterns

- ❌ Jumping to implementation before design is approved
- ❌ Asking 5 clarifying questions at once
- ❌ Designing features Bryan didn't ask for
- ❌ Skipping design for "simple" requests
- ❌ Presenting an entire massive design without section-by-section approval

## Example Exchange

```
Bryan: "Help me build a public status page for QA Monitor"

Wanderclaw: "Before we build anything — what's the goal here? Is it for
Bryan to share uptime with clients, or for end users to self-serve check
status without logging in?"

Bryan: "Clients should be able to check if their flows are healthy without
logging in — just a public URL."

Wanderclaw: "Got it. A few questions one at a time:
1. Should each client get their own URL (e.g., /status/acme-corp), or one
   global page showing all clients?"
```

## Chaining

After design approval → invoke **writing-plans-skill**

Inputs to pass forward:
- Path to approved design doc
- Any constraints Bryan mentioned during discussion
- Stack context (project directory, tech stack from MEMORY.md)
