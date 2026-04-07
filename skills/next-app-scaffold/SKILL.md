---
name: next-app-scaffold
description: Scaffold a new Next.js project using Bryan's standard stack (App Router, TypeScript strict mode, Tailwind v4). Use when starting a new Next.js project from scratch. Creates the full directory structure (/app, /lib, /components, /types, /public, /scripts), configures globals.css with @source directives for Tailwind v4, generates layout.tsx + page.tsx, and produces .env.example. No external integrations — chain with next-auth-integration, next-prisma-setup, or stripe-integration after scaffolding.
---

# next-app-scaffold

Scaffolds Bryan's standard Next.js starter. Run the script, then layer integrations on top.

## Prerequisites

- Node.js 20+
- pnpm (`npm i -g pnpm`)
- Git initialized in parent directory (or skip)

## Usage

Provide:
- **Project name** (kebab-case, e.g. `my-app`)
- **Project directory** (absolute path or relative to cwd)
- **Description** (one-liner for package.json)
- **Port** (default: 3000)

Then run the scaffold script:

```bash
node /home/boyloe/.openclaw/workspace/skills/next-app-scaffold/scripts/scaffold.mjs \
  --name my-app \
  --dir /path/to/projects/my-app \
  --description "What this app does" \
  --port 3000
```

The script creates the full project and installs dependencies. When done, `cd` into the project and run `pnpm dev`.

## What Gets Created

```
<project-name>/
├── app/
│   ├── layout.tsx          # Root layout with metadata + font
│   ├── page.tsx            # Landing stub
│   └── globals.css         # Tailwind v4 @import + @source directives
├── components/             # Shared UI components (empty, ready to populate)
├── lib/
│   └── utils.ts            # cn() helper (clsx + tailwind-merge)
├── types/
│   └── index.ts            # Global type exports stub
├── public/                 # Static assets
├── scripts/                # Project-level scripts (migrations, seeds, etc.)
├── .env.example            # Env var placeholders
├── .env.local              # Git-ignored; copy of .env.example to fill in
├── .gitignore
├── next.config.ts
├── tailwind.config.ts      # Minimal v4 config
├── tsconfig.json           # strict mode enabled
└── package.json
```

## Tailwind v4 Note

Tailwind v4 requires explicit `@source` directives — utilities won't compile without them. The `globals.css` includes:

```css
@import "tailwindcss";
@source "../app/**/*.{ts,tsx}";
@source "../components/**/*.{ts,tsx}";
@source "../lib/**/*.{ts,tsx}";
```

## TypeScript

`tsconfig.json` has `strict: true` plus:
- `noUncheckedIndexedAccess: true`
- `exactOptionalPropertyTypes: true`

No `any` — use `unknown` + type guards for external inputs.

## Environment Variables

`.env.example` ships with common placeholders (app URL, optional DB, optional auth secret). Copy to `.env.local` and fill in before running.

## After Scaffolding — Next Skills to Layer

| Integration | Skill |
|---|---|
| Database (Prisma + SQLite) | `next-prisma-setup` |
| Auth (NextAuth v5 magic link) | `next-auth-integration` |
| Payments (Stripe) | `stripe-integration` |
| Browser automation (Playwright) | `playwright-setup` |
| Deploy to Vercel | `vercel-deploy` |

## Chaining Example

```bash
# 1. Scaffold base
node .../next-app-scaffold/scripts/scaffold.mjs --name my-app --dir ~/projects/my-app

# 2. Add database
# → run next-prisma-setup skill

# 3. Add auth
# → run next-auth-integration skill

# 4. Deploy
# → run vercel-deploy skill
```
