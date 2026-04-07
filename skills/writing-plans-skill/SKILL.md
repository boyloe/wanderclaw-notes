---
name: writing-plans-skill
description: >
  Activate when Bryan says "let's build this", "start building", "write a plan", or after a design
  doc has been approved via brainstorm-skill. Takes an approved design doc and breaks it into
  2-5 minute tasks with exact file paths, complete code, and verification steps. Enforces YAGNI,
  DRY, and TDD. Produces a plan doc ready for subagent execution. Do NOT activate before a
  design is approved.
---

# Writing Plans Skill

Convert approved designs into executable implementation plans.

## Announce at Start

Say: "I'm using the writing-plans-skill to create the implementation plan."

## Inputs Required

- Path to approved design doc (from brainstorm-skill)
- Project directory and stack context

## Scope Check (Do This First)

If the design covers multiple independent subsystems, say so and ask Bryan whether to split into
separate plans. Each plan should produce working, testable software on its own.

## File Structure Mapping

Before defining tasks, list every file that will be created or modified:

```markdown
## Files

| Action | Path | Responsibility |
|--------|------|----------------|
| Create | app/status/[slug]/page.tsx | Public status page component |
| Create | lib/status.ts | Data fetching for public status |
| Modify | prisma/schema.prisma | Add publicSlug field to Client |
| Create | app/api/status/[slug]/route.ts | Public API endpoint |
```

One clear responsibility per file. Smaller focused files over large catch-alls.

## Task Granularity

Each task = 2-5 minutes of work. Each step = one action.

```markdown
### Task N: [Component Name]

**Files:**
- Create: `exact/path/to/file.ts`
- Modify: `exact/path/to/existing.ts`
- Test: `__tests__/exact/path/file.test.ts`

- [ ] **Step 1: Write the failing test**

[Complete test code here — no pseudocode]

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test path/to/test.ts`
Expected: FAIL with "[exact error message]"

- [ ] **Step 3: Write minimal implementation**

[Complete implementation code — nothing extra]

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test path/to/test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

`git add [files] && git commit -m "feat: [description]"`
```

## Plan Document Header (Required)

Every plan must start with:

```markdown
# [Feature Name] Implementation Plan

> **For subagents:** Use test-driven-development-skill for each task.
> Use code-review-skill after each task completes.
> Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** [One sentence]
**Architecture:** [2-3 sentences]
**Tech Stack:** [Key technologies]
**Design Doc:** [Path to approved design]

---
```

## Guard Rails to Enforce

Pull from GUARD_RAILS_BRAINSTORM.md — apply these during planning:

**TypeScript:**
- No `any` types — explicit interfaces for all inputs/outputs
- All external inputs validated (zod or manual)
- Props interfaces per component: `interface ComponentProps { ... }`

**Next.js:**
- `"use client"` only when: event handlers, hooks, browser APIs
- API routes as route handlers: `app/api/[route]/route.ts`
- Server components for data fetching

**Database:**
- Migrations before schema changes
- Include indexes on frequently queried fields
- No N+1 queries — use `include`/`select`

**Error Handling:**
- Every async function has try/catch or error path
- Stripe errors caught specifically
- API routes return typed error responses

**Environment:**
- Secrets in `.env.local`, committed `.env.example` with placeholders
- `process.env.VAR` with fallback where safe

## YAGNI Enforcement

Before finalizing plan, scan for scope creep:
- Does the design mention this? If not, remove it
- Is this "nice to have" vs "required for the feature to work"?
- Flag anything that wasn't in the approved design

## No Placeholders Rule

These are plan failures — never write them:
- "TBD", "TODO", "fill in details"
- "Add appropriate error handling" (show the actual code)
- "Similar to Task N" (repeat the code)
- "Write tests for the above" without actual test code

## Output

Save to: `docs/plans/YYYY-MM-DD-[feature-slug].md`

## Chaining

After plan is reviewed by Bryan → subagents execute tasks using:
- **test-driven-development-skill** for implementation
- **code-review-skill** after each task

## Example Task (QA Monitor Stack)

```markdown
### Task 1: Add publicSlug to Client model

**Files:**
- Modify: `prisma/schema.prisma`
- Create: `prisma/migrations/[timestamp]_add_public_slug/migration.sql`

- [ ] **Step 1: Write the failing test**

```typescript
// __tests__/lib/status.test.ts
import { getClientBySlug } from '@/lib/status'

test('getClientBySlug returns null for unknown slug', async () => {
  const result = await getClientBySlug('nonexistent-slug')
  expect(result).toBeNull()
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test __tests__/lib/status.test.ts`
Expected: FAIL — "Cannot find module '@/lib/status'"

- [ ] **Step 3: Add field to schema**

In `prisma/schema.prisma`, add to Client model:
```prisma
publicSlug String? @unique
```

- [ ] **Step 4: Run migration**

```bash
pnpm prisma migrate dev --name add_public_slug
```

- [ ] **Step 5: Create lib/status.ts**

```typescript
import { db } from '@/lib/db'

export async function getClientBySlug(slug: string) {
  return db.client.findUnique({ where: { publicSlug: slug } })
}
```

- [ ] **Step 6: Run test to verify it passes**

Run: `pnpm test __tests__/lib/status.test.ts`
Expected: PASS

- [ ] **Step 7: Commit**

`git add prisma/ lib/status.ts __tests__/lib/status.test.ts && git commit -m "feat: add public slug to clients"`
```
