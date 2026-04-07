#!/usr/bin/env node
/**
 * next-app-scaffold — Bryan's standard Next.js starter
 *
 * Usage:
 *   node scaffold.mjs --name my-app --dir /path/to/my-app [--description "..." --port 3000]
 */

import { execSync } from "child_process";
import { mkdirSync, writeFileSync, existsSync } from "fs";
import { join } from "path";
import { parseArgs } from "util";

// ── Args ─────────────────────────────────────────────────────────────────────
const { values: args } = parseArgs({
  options: {
    name: { type: "string" },
    dir: { type: "string" },
    description: { type: "string", default: "A Next.js application" },
    port: { type: "string", default: "3000" },
  },
});

if (!args.name || !args.dir) {
  console.error("Usage: scaffold.mjs --name <app-name> --dir <output-dir> [--description '...' --port 3000]");
  process.exit(1);
}

const NAME = args.name;
const DIR = args.dir;
const DESC = args.description;
const PORT = args.port;

// ── Helpers ───────────────────────────────────────────────────────────────────
function dir(...parts) {
  return join(DIR, ...parts);
}

function write(relPath, content) {
  const full = dir(relPath);
  writeFileSync(full, content, "utf8");
}

function mkdir(...parts) {
  mkdirSync(dir(...parts), { recursive: true });
}

// ── Scaffold ──────────────────────────────────────────────────────────────────
console.log(`\n🐾 Scaffolding ${NAME} → ${DIR}\n`);

if (existsSync(DIR)) {
  console.error(`❌ Directory already exists: ${DIR}`);
  process.exit(1);
}

// Directories
for (const d of ["app", "components", "lib", "types", "public", "scripts"]) {
  mkdir(d);
}

// ── package.json ──────────────────────────────────────────────────────────────
write("package.json", JSON.stringify({
  name: NAME,
  version: "0.1.0",
  description: DESC,
  private: true,
  scripts: {
    dev: `next dev --port ${PORT}`,
    build: "next build",
    start: `next start --port ${PORT}`,
    lint: "next lint",
    typecheck: "tsc --noEmit",
  },
  dependencies: {
    next: "^15.0.0",
    react: "^19.0.0",
    "react-dom": "^19.0.0",
    clsx: "^2.1.1",
    "tailwind-merge": "^2.5.4",
  },
  devDependencies: {
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    typescript: "^5.6.0",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/postcss": "^4.0.0",
  },
}, null, 2) + "\n");

// ── tsconfig.json ─────────────────────────────────────────────────────────────
write("tsconfig.json", JSON.stringify({
  compilerOptions: {
    target: "ES2017",
    lib: ["dom", "dom.iterable", "esnext"],
    allowJs: true,
    skipLibCheck: true,
    strict: true,
    noUncheckedIndexedAccess: true,
    exactOptionalPropertyTypes: true,
    noEmit: true,
    esModuleInterop: true,
    module: "esnext",
    moduleResolution: "bundler",
    resolveJsonModule: true,
    isolatedModules: true,
    jsx: "preserve",
    incremental: true,
    plugins: [{ name: "next" }],
    paths: {
      "@/*": ["./*"],
    },
  },
  include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  exclude: ["node_modules"],
}, null, 2) + "\n");

// ── next.config.ts ────────────────────────────────────────────────────────────
write("next.config.ts", `import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Add config here as integrations are layered in
};

export default nextConfig;
`);

// ── tailwind.config.ts ────────────────────────────────────────────────────────
write("tailwind.config.ts", `import type { Config } from "tailwindcss";

const config: Config = {
  // v4: content scanning is handled via @source directives in globals.css
  // Add theme extensions here as needed
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
`);

// ── postcss.config.mjs ────────────────────────────────────────────────────────
write("postcss.config.mjs", `/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
`);

// ── app/globals.css ───────────────────────────────────────────────────────────
write("app/globals.css", `@import "tailwindcss";

/* Tailwind v4: explicit @source directives required for utility scanning */
@source "../app/**/*.{ts,tsx}";
@source "../components/**/*.{ts,tsx}";
@source "../lib/**/*.{ts,tsx}";

/* CSS custom properties / design tokens */
:root {
  --background: #ffffff;
  --foreground: #171717;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: Arial, Helvetica, sans-serif;
}
`);

// ── app/layout.tsx ────────────────────────────────────────────────────────────
write("app/layout.tsx", `import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "${NAME}",
  description: "${DESC}",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background antialiased">
        {children}
      </body>
    </html>
  );
}
`);

// ── app/page.tsx ──────────────────────────────────────────────────────────────
write("app/page.tsx", `export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">${NAME}</h1>
        <p className="mt-4 text-lg text-gray-500">${DESC}</p>
        <p className="mt-8 text-sm text-gray-400">
          Ready to build. Layer in auth, database, and payments as needed.
        </p>
      </div>
    </main>
  );
}
`);

// ── lib/utils.ts ──────────────────────────────────────────────────────────────
write("lib/utils.ts", `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes safely (handles conflicts + conditional classes).
 * Usage: cn("px-4 py-2", isActive && "bg-blue-500", className)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
`);

// ── types/index.ts ────────────────────────────────────────────────────────────
write("types/index.ts", `// Global type exports
// Add shared types here as the project grows.

export type Optional<T> = T | null | undefined;

export type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string };
`);

// ── .env.example ─────────────────────────────────────────────────────────────
write(".env.example", `# App
NEXT_PUBLIC_APP_URL=http://localhost:${PORT}
NODE_ENV=development

# Database (add when using next-prisma-setup)
# DATABASE_URL=file:./dev.db

# Auth (add when using next-auth-integration)
# NEXTAUTH_URL=http://localhost:${PORT}
# AUTH_SECRET=  # generate with: openssl rand -base64 32

# Email (for magic link auth)
# EMAIL_SERVER_HOST=smtp.example.com
# EMAIL_SERVER_PORT=587
# EMAIL_SERVER_USER=
# EMAIL_SERVER_PASSWORD=
# EMAIL_FROM=noreply@example.com

# Stripe (add when using stripe-integration)
# STRIPE_SECRET_KEY=sk_test_...
# STRIPE_WEBHOOK_SECRET=whsec_...
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
`);

// ── .env.local (git-ignored copy to fill in) ──────────────────────────────────
write(".env.local", `# Copy of .env.example — fill in real values. Never commit this file.
NEXT_PUBLIC_APP_URL=http://localhost:${PORT}
NODE_ENV=development
`);

// ── .gitignore ────────────────────────────────────────────────────────────────
write(".gitignore", `# dependencies
/node_modules
/.pnp
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/releases
!.yarn/versions

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# env files (never commit secrets)
.env*.local
.env

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# typescript
*.tsbuildinfo
next-env.d.ts
`);

// ── Install dependencies ──────────────────────────────────────────────────────
console.log("📦 Installing dependencies with pnpm...");
try {
  execSync("pnpm install", { cwd: DIR, stdio: "inherit" });
} catch {
  console.error("❌ pnpm install failed. Make sure pnpm is installed: npm i -g pnpm");
  process.exit(1);
}

console.log(`
✅ Done! ${NAME} is ready.

  cd ${DIR}
  pnpm dev        → http://localhost:${PORT}
  pnpm build      → production build
  pnpm typecheck  → TypeScript check

Next steps:
  • Add database:  next-prisma-setup skill
  • Add auth:      next-auth-integration skill
  • Add payments:  stripe-integration skill
  • Deploy:        vercel-deploy skill
`);
