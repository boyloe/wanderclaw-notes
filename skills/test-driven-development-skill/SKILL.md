---
name: test-driven-development-skill
description: >
  Activate during implementation when executing tasks from a writing-plans-skill plan doc.
  Enforces RED-GREEN-REFACTOR: write failing test first, watch it fail, write minimal code
  to pass, refactor, commit. Delete any code written before tests exist. Use when Bryan says
  "implement this", "work on task N", or when a subagent begins executing a plan task.
  Anti-pattern enforcer: no code before tests, ever.
---

# Test-Driven Development Skill

Enforce RED → GREEN → REFACTOR. No exceptions.

## The Law

**Write the test first. Always.**

If code exists without a test: delete it. Start over with the test. This is not optional.
The plan is your contract. The test proves the contract is fulfilled.

## RED-GREEN-REFACTOR Cycle

### 🔴 RED — Write the failing test

1. Read the task from the plan doc carefully
2. Write a test that describes the expected behavior
3. Run it — **confirm it fails with the expected error**
4. If it passes immediately: the test is wrong. Fix it.

```bash
pnpm test path/to/test.ts --watch
# Expected: FAIL
```

**What a good failing test looks like:**
- Fails because the code doesn't exist yet (not because the test is broken)
- Error message says something useful: "Cannot find module" or "is not a function"
- Tests ONE behavior, not five

### 🟢 GREEN — Write minimal code to pass

1. Write the **minimum code** that makes the test pass
2. No extra features, no "while I'm here" additions
3. Run the test — confirm it passes
4. If it doesn't pass: fix the code, not the test

```bash
pnpm test path/to/test.ts
# Expected: PASS
```

**YAGNI check:** Does any line of this code exist solely to satisfy the test? Good.
Does any line of code do something the test doesn't verify? Delete it.

### 🔵 REFACTOR — Clean up (optional but encouraged)

1. Is the code readable? Rename variables if needed.
2. Is there duplication with existing code? Extract it.
3. Run tests again after refactor — still passing?
4. Keep refactor scope narrow: don't restructure unrelated files.

### ✅ COMMIT

```bash
git add [test file] [implementation file]
git commit -m "feat: [what was implemented]"
```

Commit test + implementation together. Never commit implementation without the test.

## Anti-Patterns (Enforce These)

| Anti-Pattern | Correct Action |
|-------------|----------------|
| Code written before test | Delete the code. Write the test first. |
| Test written to match existing code | Delete both. Start with intent. |
| `xtest()` / `it.skip()` | Not allowed. Fix or delete. |
| Test that always passes | Wrong test. It must fail first. |
| "I'll write tests later" | No. Test first. Always. |
| Testing implementation details | Test behavior, not internals |
| One massive test covering everything | One test per behavior |

## Test Patterns for Wanderclaw Stack

### Next.js API Route

```typescript
// __tests__/api/status.test.ts
import { GET } from '@/app/api/status/[slug]/route'
import { NextRequest } from 'next/server'

describe('GET /api/status/[slug]', () => {
  it('returns 404 for unknown slug', async () => {
    const req = new NextRequest('http://localhost/api/status/unknown')
    const res = await GET(req, { params: { slug: 'unknown' } })
    expect(res.status).toBe(404)
  })

  it('returns client data for valid slug', async () => {
    // seed test data first
    const req = new NextRequest('http://localhost/api/status/test-client')
    const res = await GET(req, { params: { slug: 'test-client' } })
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data).toHaveProperty('name')
  })
})
```

### Prisma / DB Function

```typescript
// __tests__/lib/status.test.ts
import { getClientBySlug } from '@/lib/status'

// Use test DB (set DATABASE_URL in jest.config)
describe('getClientBySlug', () => {
  it('returns null for unknown slug', async () => {
    const result = await getClientBySlug('nonexistent')
    expect(result).toBeNull()
  })
})
```

### React Component

```typescript
// __tests__/components/StatusBadge.test.tsx
import { render, screen } from '@testing-library/react'
import { StatusBadge } from '@/components/StatusBadge'

describe('StatusBadge', () => {
  it('shows "Healthy" for passing status', () => {
    render(<StatusBadge status="pass" />)
    expect(screen.getByText('Healthy')).toBeInTheDocument()
  })

  it('shows "Failing" for fail status', () => {
    render(<StatusBadge status="fail" />)
    expect(screen.getByText('Failing')).toBeInTheDocument()
  })
})
```

### Utility Function

```typescript
// __tests__/lib/format.test.ts
import { formatSlug } from '@/lib/format'

describe('formatSlug', () => {
  it('converts name to lowercase hyphenated slug', () => {
    expect(formatSlug('Acme Corp')).toBe('acme-corp')
  })

  it('strips special characters', () => {
    expect(formatSlug('Foo & Bar!')).toBe('foo-bar')
  })
})
```

## Verification Checklist Before Marking Task Complete

- [ ] Test was written before implementation (verifiable via git history)
- [ ] Test failed with expected error (not a phantom pass)
- [ ] Minimal code written — nothing extra beyond what test requires
- [ ] Tests pass: `pnpm test [path]`
- [ ] Build passes: `pnpm build` (TypeScript errors = not done)
- [ ] Committed: `git log --oneline -1` shows this work

## What to Report After Task

```markdown
## Task N Complete

**RED:** Test failed with "Cannot find module '@/lib/status'"
**GREEN:** Implemented `getClientBySlug` — test passes
**REFACTOR:** Extracted shared DB error handler (no test changes needed)
**COMMIT:** `a1b2c3d feat: add getClientBySlug with public slug lookup`

Tests: 3 passing, 0 failing
Build: ✅ pnpm build passes
```

## Chaining

After task completion → invoke **code-review-skill** to verify against plan spec.
