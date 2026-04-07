---
name: code-review-skill
description: >
  Activate after a subagent completes a task or a block of tasks. Reviews implemented code
  against the plan (did we deliver what we promised?) and checks guard rails (types, error
  handling, patterns, security). Reports issues by severity. Critical issues block progress.
  Also use when Bryan asks "review this", "check my code", or "did we miss anything".
  Chains back to subagent execution or forward to finishing-a-branch after approval.
---

# Code Review Skill

Two-stage review: spec compliance first, then code quality.

## Announce at Start

Say: "Running code-review-skill — checking spec compliance then code quality."

## Inputs Required

- Path to the plan doc (from writing-plans-skill)
- Task number(s) being reviewed
- Files changed (or run `git diff HEAD~1` to get them)

## Stage 1: Spec Compliance

Answer each question explicitly:

- [ ] Does the implementation match what the plan task specified?
- [ ] Are all files listed in the plan's Files section present?
- [ ] Did the task add anything NOT in the plan? (scope creep)
- [ ] Were all verification steps run? (tests passed, build verified)
- [ ] Is the commit message present and descriptive?

**Outcome:** If any NO → Critical issue. Block progress. Subagent must fix before proceeding.

## Stage 2: Code Quality Guard Rails

Check against Wanderclaw standards from GUARD_RAILS_BRAINSTORM.md:

### TypeScript
- [ ] No `any` types (explicit interfaces everywhere)
- [ ] External inputs validated (API route bodies, form data, env vars)
- [ ] Props interfaces defined per component

### Next.js
- [ ] `"use client"` used only when necessary (hooks, event handlers, browser APIs)
- [ ] Server components used for data fetching
- [ ] API routes typed: `NextRequest` → `NextResponse<ResponseType>`

### Database
- [ ] No N+1 queries (check `include`/`select` usage)
- [ ] Migrations present for schema changes
- [ ] Transactions used for multi-step operations

### Error Handling
- [ ] Every async function has error handling
- [ ] API routes return typed error responses
- [ ] External service calls (Stripe, email) have specific error catches

### Security
- [ ] No secrets in code (only `process.env.*`)
- [ ] Auth checked before returning user data
- [ ] Input sanitized before DB writes

### Testing
- [ ] Tests written BEFORE implementation (TDD — check git history)
- [ ] Tests cover happy path AND error cases
- [ ] No tests skipped or `xtest`/`xit` used

## Severity Levels

### 🔴 Critical — Blocks progress
- Missing functionality from plan
- Type safety violations (`any`, unchecked inputs)
- Security issues (exposed secrets, missing auth)
- No tests, or tests written after code
- Build fails

### 🟡 Minor — Document, do not block
- Inconsistent naming conventions
- Missing JSDoc on public exports
- Verbose code that could be simplified
- Commit message quality

### 🟢 Approved
- All critical checks pass
- Minor issues documented for future cleanup

## Review Doc Output

Save to: `docs/reviews/YYYY-MM-DD-[feature]-task-N.md`

```markdown
# Code Review: [Feature] Task N

**Date:** YYYY-MM-DD
**Plan:** [path to plan doc]
**Files Reviewed:** [list]
**Reviewer:** Wanderclaw

## Stage 1: Spec Compliance

- [x] Implementation matches plan spec
- [x] All planned files present
- [ ] ❌ Scope creep: `lib/utils/formatDate.ts` added but not in plan

## Stage 2: Code Quality

### Critical Issues

1. **Missing error handling in `/api/status/[slug]/route.ts`**
   Line 12: DB query not wrapped in try/catch
   Fix: Add try/catch, return 500 on DB error

### Minor Issues

1. Missing JSDoc on `getClientBySlug()` export

## Verdict

🔴 BLOCKED — Fix critical issues before proceeding to Task 2.
```

## Verdicts

- **🔴 BLOCKED** — Return to subagent with specific fixes required
- **🟡 APPROVED WITH NOTES** — Proceed, track minor issues
- **🟢 APPROVED** — Proceed to next task

## Chaining

- Critical issues → return task to subagent with fixes list
- All tasks approved → invoke finishing-a-branch checklist

## Anti-Patterns

- ❌ Approving code that wasn't in the plan spec
- ❌ Blocking on stylistic preferences when the code works
- ❌ Reviewing without a plan doc reference
- ❌ Skipping Stage 1 (spec compliance) and jumping to style
