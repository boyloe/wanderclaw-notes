# Guard Rails & Skill System Brainstorm

_Building a harness to ensure Wanderclaw outputs production-quality code efficiently._

---

## Goals

1. **Consistency** — Every piece of code follows the same patterns & practices
2. **Efficiency** — Minimize token burn, avoid redundant explanations, optimize for speed
3. **Quality** — No half-baked solutions; code that actually works
4. **Maintainability** — Future Bryan (or others) can understand what was built
5. **Best Practices** — TypeScript strictness, security, testing, etc. baked in

---

## Code Quality Guard Rails

### Stack-Specific Standards

#### Next.js Projects
- **App Router only** — no Pages Router (your standard)
- **"use client" rules** — understand when to use it (event handlers, hooks = client, data fetching/secrets = server)
- **API routes as route handlers** — `app/api/[route]/route.ts`
- **TypeScript strict mode** — no `any`, validate all external inputs
- **Environment variables** — `.env.local` for secrets, commit `.env.example` with placeholders
- **Tailwind v4** — must include `@source` directives in `globals.css`
- **File structure** — `/app`, `/lib`, `/components`, `/types`, `/public`, `/scripts`

#### React Components
- **Functional components only** — no class components
- **Props interface per component** — `interface ComponentProps { ... }`
- **Memoization** — use `React.memo` for expensive renders
- **Hook rules** — no conditional hooks, extract custom hooks when logic gets complex
- **Avoid prop drilling** — use context or state management for shared data

#### Database (Prisma + SQLite)
- **Schema validation** — explicit types, relationships, constraints
- **Migrations first** — never modify schema without migration
- **Transactions** — for multi-step operations that could fail mid-way
- **Indexes** — on frequently queried fields (email, user_id, timestamps)
- **No N+1 queries** — always use `include`/`select` to batch data

#### Authentication (NextAuth)
- **Magic link preferred** — over passwords when possible
- **Session validation** — check `session` exists before using `user` data
- **CSRF protection** — automatic with NextAuth but verify callbacks
- **Secure cookies** — `httpOnly`, `secure`, `sameSite` set correctly

#### Payments (Stripe)
- **Test mode during dev** — never commit live keys
- **Webhook validation** — verify `sig` header before processing
- **Idempotency keys** — for payment operations that retry
- **Error handling** — specific catch blocks for Stripe errors (3DS, declined, etc.)

#### Browser Automation (Playwright)
- **Headless Chromium** — tested configuration
- **Timeouts** — always set reasonable waits (30s default, shorter for user input)
- **Error recovery** — retry failed steps, log context for debugging
- **Screenshot on failure** — for debugging test flakes
- **Resource cleanup** — `browser.close()` in finally blocks

---

## Token Efficiency Guard Rails

### Output Structure

1. **Skip the preamble**
   - No "Great question!" or "I'll help you with that!"
   - No narration of obvious steps (unless complex/risky)
   - Just deliver the work

2. **Comments only where needed**
   - `// TODO: handle error case` ✅
   - `// fetch user from database` ❌ (obvious from code)
   - **Exception:** Complex algorithms, business logic, gotchas

3. **Inline documentation**
   - JSDoc for public functions/exports
   - Type annotations as docs (good naming > verbose comments)
   - README.md for setup/architecture (not code comments)

4. **DRY in explanations**
   - Reference existing patterns ("follows the auth middleware pattern from X")
   - Link to docs instead of explaining basics
   - Assume you know the stack

### Code Generation

1. **Use templates** — for boilerplate (API routes, components, migrations)
2. **Copy-paste ready** — code should be immediately usable, not pseudo-code
3. **No scaffolding scripts** — just give the files (you have `write` tool)
4. **Progressive enhancement** — start minimal, add features in layers

### Exploration vs. Output

| Task | Approach |
|------|----------|
| Debugging unknown bug | Verbose exploration, narrow down causes |
| Implementing known feature | Direct code, minimal explanation |
| Learning something new | Show examples + explain once |
| Optimizing existing code | Show before/after diff, explain trade-off |

---

## Skill System Structure

### Skill Categories

#### Code Generation Skills
- **next-app-setup** — scaffold a new Next.js project with your stack
- **component-factory** — generate React components (form, modal, table, etc.)
- **api-endpoint** — generate API routes with error handling
- **database-schema** — design Prisma schema + migrations
- **stripe-integration** — Stripe checkout, webhooks, billing
- **auth-setup** — NextAuth configuration for your auth strategy
- **playwright-test** — generate Playwright test suites

#### Refactoring/Improvement Skills
- **typescript-upgrade** — add/fix types, remove `any`
- **performance-audit** — find N+1 queries, inefficient renders, etc.
- **security-review** — check auth, env vars, API surface
- **test-coverage** — add unit/integration tests

#### Deployment & DevOps Skills
- **vercel-deploy** — Next.js deployment, env setup, custom domain
- **pm2-process** — manage background processes with PM2
- **vps-ops** — VPS maintenance, monitoring, backups

#### Documentation Skills
- **readme-gen** — generate READMEs with setup/architecture
- **schema-docs** — document database schema
- **api-docs** — generate OpenAPI/docs for API endpoints

---

## Execution Rules

### Before Writing Code

1. **Validate the request**
   - [ ] Is this the right approach? Suggest alternative if better
   - [ ] Do we have all the context? Ask if missing
   - [ ] Conflicts with existing code? Flag it

2. **Check existing patterns**
   - Is there a similar component/API already? Build on it
   - Does the stack have conventions? Follow them
   - Are there gotchas in MEMORY.md? Address them

3. **Plan before building**
   - Big changes? Write a brief outline first
   - Multiple files? List them out
   - Dependencies? Make sure they're available

### While Writing Code

1. **Type everything** — no implicit `any`
2. **Error handling** — try/catch or explicit error paths
3. **Testing mindset** — code that's easy to test = good code
4. **Environment safety** — use `process.env.VARIABLE || default`
5. **No secrets in code** — only in .env files

### After Writing Code

1. **Verify it compiles** — run `pnpm build` or equivalent
2. **Check for TODOs** — what's left for next time?
3. **Document new behavior** — update MEMORY.md or README
4. **Git-ready** — can Bryan just `git push` this?

---

## Tooling & Integration

### What Goes in Skills vs. Inline

**Skill files (SKILL.md):**
- Reusable across multiple projects
- Complex multi-step processes
- External integrations (Stripe API, Playwright, etc.)
- Things that need versioning/updates

**Inline in conversation:**
- One-off code generation
- Project-specific logic
- Quick fixes
- Exploratory work

### Skill Metadata (in SKILL.md)

```yaml
name: skill-name
description: What this skill does
version: 1.0.0
tags: [nextjs, react, typescript]
dependencies:
  - some-npm-package@^1.0.0
complexity: beginner|intermediate|advanced
estimatedTime: 5-10 minutes
```

---

## Measurement & Iteration

### Success Metrics

- [ ] Zero compilation errors on output
- [ ] Code runs first try (no "try this instead")
- [ ] Consistent with your existing projects
- [ ] Minimal back-and-forth to integrate
- [ ] Can explain decisions if asked

### Red Flags (Fix These)

- ❌ You have to ask clarifying questions
- ❌ Code needs edits before it works
- ❌ Inconsistent with project conventions
- ❌ Over-engineered for the task
- ❌ Missing error handling or type safety

---

## Automatic Workflow Triggers

Inspired by superpowers, certain patterns trigger automatic workflows:

### Trigger: "Help me plan / design / build [feature]"
→ **Brainstorm Skill** activates
- Ask clarifying questions
- Explore alternatives
- Present design doc in sections
- Get approval before proceeding
- Save design to `/docs/designs/[feature].md`

### Trigger: Approved design + "Let's build this"
→ **Writing Plans Skill** activates
- Break into 2–5 minute tasks
- Each task: exact file paths, complete code, verification steps
- No ambiguity — junior engineer could follow it
- Emphasize YAGNI (don't build what's not in the design)

### Trigger: Plan approved + "Go" or "Start building"
→ **Subagent-Driven Development** activates
- Fresh Sonnet subagent per task
- Two-stage review: spec compliance, then code quality
- Batch execution with human checkpoints
- Auto-commit after verification

### Trigger: During implementation
→ **Test-Driven Development** enforced
- RED-GREEN-REFACTOR cycle
- Write failing test first
- Watch it fail
- Minimal code to pass
- Refactor + commit
- Delete any code written before tests

### Trigger: Implementation complete
→ **Code Review Skill** activates
- Review against plan (did we deliver what we promised?)
- Check against guard rails (types, error handling, patterns)
- Report issues by severity
- Critical issues block merge

### Trigger: All tasks done
→ **Finishing the Branch** skill activates
- Verify all tests pass
- Show options: merge / PR / keep / discard
- Clean up workspace

---

## Workflow State Machine

```
[Request] 
  ↓
[Brainstorm] → Design Doc → Bryan Approves?
  ↓ (yes)
[Writing Plans] → Plan Doc → Bryan Reviews?
  ↓ (yes)
[Subagent Dev] → Task Execution → All Tasks Done?
  ↓ (yes)
[Code Review] → Issues Found?
  ├─ Critical → Block, iterate
  └─ Minor → Document, proceed
  ↓
[Finishing] → Merge / PR / Keep / Discard
```

---

## Questions for Bryan

1. ~~Model selection~~ **DECIDED:** Sonnet for skill work
2. ~~Skill ownership~~ **DECIDED:** Workspace-local for now
3. **Testing** — How much test code do you want? Unit/integration/both?
4. **Documentation** — Inline JSDoc, or fuller README docs?
5. **Code review depth** — Should I catch every style issue, or just critical problems?
6. **Iteration loops** — When something fails, fix it or show you first?

---

_This is a living doc. Update as patterns emerge._
