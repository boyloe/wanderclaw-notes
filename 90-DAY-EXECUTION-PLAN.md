# 90-Day AI Engineer Upskilling & Failsafe Launch Plan

**Goal:** Ship production-ready Failsafe with observability, PostgreSQL, and AI features. Update resume with concrete wins. Become competitive for $120k+ AI engineer roles.

**Timeline:** Apr 3 - Jun 30, 2026 (13 weeks)

---

## WEEK 1-2: Foundation & Database Migration

### Week 1 (Apr 3-9)

#### Task 1.1: Audit Current Failsafe (Day 1)
- [ ] Document current tech stack: Next.js, SQLite, Prisma, Playwright, PM2
- [ ] List all environment variables and dependencies
- [ ] Record current user/data counts (3 clients, 7 flows, 51 results)
- [ ] Identify breaking points: concurrent users, DB lock contention, alert failures
- **Deliverable:** `failsafe-audit.md` with current state snapshot
- **Time:** 2 hours

#### Task 1.2: Set Up PostgreSQL (Day 2-3)
- [ ] Choose provider: Vercel Postgres (easiest) or Railway (more flexible)
- [ ] Create PostgreSQL database with appropriate scaling settings
- [ ] Set up connection pooling (Vercel handles this; Railway needs PgBouncer)
- [ ] Document connection string and credentials in `.env.example`
- **Deliverable:** Working PostgreSQL instance with test connection
- **Time:** 3 hours
- **Cost:** ~$5/month for Vercel Postgres

#### Task 1.3: Prisma Migration Strategy (Day 4)
- [ ] Create new Prisma migration: `migrate dev --name migrate_sqlite_to_postgres`
- [ ] Update `datasource db` in `prisma/schema.prisma` from SQLite to PostgreSQL
- [ ] Test schema against PostgreSQL (no changes needed, but test it)
- [ ] Create migration SQL export for reference
- **Deliverable:** Passing `prisma db push` against PostgreSQL
- **Time:** 2 hours

#### Task 1.4: Data Migration (Day 5)
- [ ] Export all data from SQLite: `SELECT * FROM users, clients, test_flows, test_results, incidents, alert_configs`
- [ ] Write migration script to load into PostgreSQL (Prisma handles schema, write data import script in Node)
- [ ] Verify data integrity: row counts match, relationships intact
- [ ] Backup old `dev.db` file (rename to `dev.db.backup`)
- **Deliverable:** All data successfully migrated to PostgreSQL, verified
- **Time:** 3 hours
- **Script template:** See Appendix A

#### Task 1.5: Test & Rollback Plan (Day 6-7)
- [ ] Spin up local PostgreSQL Docker instance for testing
- [ ] Run full test suite against new DB (or manually test key flows)
- [ ] Test concurrent requests: dashboard + runner writing simultaneously
- [ ] Document rollback procedure: "revert to SQLite" in case of emergency
- [ ] Update PM2 config to use new DATABASE_URL
- **Deliverable:** Rollback procedure documented; test suite passing
- **Time:** 4 hours

---

### Week 2 (Apr 10-16)

#### Task 2.1: Deploy PostgreSQL to VPS (Day 1-2)
- [ ] Update `.env` on VPS with new PostgreSQL connection string
- [ ] Update PM2 processes: `pm2 restart qa-dashboard qa-runner`
- [ ] Monitor logs: `pm2 logs qa-dashboard` and `pm2 logs qa-runner` for connection issues
- [ ] Verify Stripe webhooks still fire and hit DB successfully
- [ ] Test full flow: create client → run test → check results in DB
- **Deliverable:** Both PM2 processes running against PostgreSQL in production
- **Time:** 2 hours

#### Task 2.2: Add Connection Pooling (Day 3)
- [ ] For Vercel Postgres: Already built-in
- [ ] For Railway: Install and configure PgBouncer or use Railway's built-in pool
- [ ] Test concurrent connections under load (simulate 10+ simultaneous users)
- [ ] Monitor connection usage: `SELECT count(*) FROM pg_stat_activity`
- **Deliverable:** Connection pool configured and tested
- **Time:** 2 hours

#### Task 2.3: Performance Baseline (Day 4-5)
- [ ] Query slowest endpoints in dashboard: list all test results, get client detail
- [ ] Add indexes for common queries:
  ```sql
  CREATE INDEX idx_test_results_flow_date ON test_results(flowId, ranAt DESC);
  CREATE INDEX idx_test_flows_client_active ON test_flows(clientId, isActive);
  CREATE INDEX idx_incidents_flow_status ON incidents(flowId, status);
  ```
- [ ] Benchmark before/after: time to fetch 100 results, 5 concurrent clients
- **Deliverable:** Database indexes added; performance baseline documented
- **Time:** 3 hours

#### Task 2.4: Structured Logging Setup (Day 6-7)
- [ ] Install Winston (Node.js structured logging): `npm install winston`
- [ ] Create logger config: log to file + console, rotate daily
- [ ] Replace all `console.log()` with `logger.info()`, `logger.error()`, etc.
- [ ] Set up log files: `/var/log/failsafe/dashboard.log`, `/var/log/failsafe/runner.log`
- [ ] Test log rotation: verify old logs rotate after 30 days
- **Deliverable:** All console.log() replaced; logs writing to files
- **Time:** 4 hours
- **Files to update:** `runner/scheduler.ts`, `runner/run-flow.ts`, `src/app/api/stripe/webhook/route.ts`, `src/lib/prisma.ts`

---

## WEEK 3-4: Observability & Reliability

### Week 3 (Apr 17-23)

#### Task 3.1: Health Check Endpoint (Day 1-2)
- [ ] Create `GET /api/health` endpoint that checks:
  - [ ] Database connectivity (can connect to PostgreSQL?)
  - [ ] Stripe API reachability (test API key)
  - [ ] Runner process alive (PM2 status check or ping endpoint)
  - [ ] Last test run age (alert if >2 hours old)
- [ ] Return JSON: `{ status: "healthy" | "degraded" | "unhealthy", checks: {...}, timestamp }`
- [ ] Test via: `curl http://204.168.184.80:3001/api/health`
- **Deliverable:** `/api/health` endpoint live and functional
- **Time:** 2 hours
- **Code template:** See Appendix B

#### Task 3.2: Metrics Collection (Day 3-4)
- [ ] Install Prometheus client: `npm install prom-client`
- [ ] Create metrics for:
  - Test execution count (per status: pass/fail/error)
  - Test duration (histogram)
  - Database query latency (histogram)
  - Alert delivery attempts (counter)
  - Active concurrent connections (gauge)
- [ ] Expose metrics at `GET /metrics` in Prometheus format
- [ ] Document how to scrape: `curl http://204.168.184.80:3001/metrics`
- **Deliverable:** `/metrics` endpoint exposing Prometheus-compatible metrics
- **Time:** 3 hours
- **Code template:** See Appendix C

#### Task 3.3: Alert Delivery Queue (Day 5-7)
- [ ] Create new DB table: `AlertQueue` (id, userId, type, payload, status, retries, nextRetryAt)
- [ ] Modify alert logic in scheduler:
  ```
  Instead of: await sendTelegramAlert(...)
  Do: await createAlertQueueItem({ userId, type: 'TELEGRAM', payload: {...}, status: 'PENDING' })
  ```
- [ ] Create background job that:
  - Runs every 5 minutes
  - Fetches `WHERE status = 'PENDING' AND nextRetryAt <= now()`
  - Attempts to send; on success: update status to 'SENT'
  - On failure: increment retries, set nextRetryAt with exponential backoff (1s, 10s, 60s, 10m, 1h)
  - After 5 failed retries: status = 'FAILED', log error
- [ ] Dashboard widget showing pending/failed alerts (optional for now)
- **Deliverable:** Alert queue table + retry logic working
- **Time:** 5 hours
- **Schema:** See Appendix D

---

### Week 4 (Apr 24-30)

#### Task 4.1: Playwright Browser Pool (Day 1-3)
- [ ] Audit current Playwright usage in `runner/run-flow.ts`
- [ ] Create browser pool manager:
  ```typescript
  class BrowserPool {
    private browsers: Browser[] = [];
    private maxBrowsers = 5;
    
    async acquire(): Promise<Browser> { ... }
    async release(browser: Browser): Promise<void> { ... }
  }
  ```
- [ ] Pool lifecycle:
  - Start with 3 browsers on runner startup
  - Reuse browsers across flows
  - Kill browsers older than 1 hour (refresh)
  - Monitor memory usage; alert if >80% of VPS RAM
- [ ] Update `runFlow()` to use pool: `const browser = await pool.acquire()`
- [ ] Test: Run 10 flows sequentially, verify only 3-5 browsers spawned (not 10)
- **Deliverable:** Browser pool implementation, tested with 10+ flows
- **Time:** 5 hours
- **Code template:** See Appendix E

#### Task 4.2: Circuit Breaker for Flaky Hosts (Day 4-5)
- [ ] Create circuit breaker logic in `runner/run-flow.ts`:
  ```
  Track failures per clientUrl:
  - 0-2 failures: CLOSED (normal operation)
  - 3+ failures within 1 hour: OPEN (skip tests, log)
  - After 30 min in OPEN: HALF_OPEN (try 1 test)
  - If HALF_OPEN succeeds: back to CLOSED
  ```
- [ ] When OPEN, create incident: "Client URL temporarily unavailable, retrying in 30 min"
- [ ] Add to scheduler: check circuit breaker status before running flow
- [ ] Test: Point flow at a dead URL, run 5 times, verify circuit opens
- **Deliverable:** Circuit breaker working; dead URLs don't spam alerts
- **Time:** 3 hours
- **Code template:** See Appendix F

#### Task 4.3: Memory & Resource Monitoring (Day 6-7)
- [ ] Add system metrics to runner process:
  - Memory usage (process + system)
  - CPU usage
  - Disk space available
  - Number of active browsers
- [ ] Log memory every 15 min: `logger.info('Memory: ${process.memoryUsage().heapUsed / 1024 / 1024}MB')`
- [ ] Alert if any metric critical:
  - Memory >80% of VPS RAM
  - Disk <10% free
  - CPU >90% for 5+ min
- [ ] Send Telegram alert for resource warnings
- **Deliverable:** Resource metrics logged and monitored
- **Time:** 2 hours

---

## WEEK 5-6: TypeScript Polish & Python Backend

### Week 5 (May 1-7)

#### Task 5.1: TypeScript Strict Mode (Day 1-2)
- [ ] Already using Next.js + TypeScript; verify strict mode in `tsconfig.json`:
  ```json
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
  ```
- [ ] Fix any type errors: `npm run build` should have 0 errors
- [ ] Add types to runner process (currently `runner/scheduler.ts` is `.ts` but may have loose types)
- [ ] Type the alert payload and circuit breaker state
- **Deliverable:** `npm run build` passes with zero TypeScript errors
- **Time:** 2 hours

#### Task 5.2: Python Backend Service (Day 3-5)
- [ ] Create new Python service: `/failsafe-services` (separate from main Next.js app)
- [ ] Tech stack: FastAPI + Pydantic + Python 3.11
- [ ] Create initial endpoints:
  ```python
  POST /api/flows/{flowId}/execute
    - Alternative test executor (parallel to Playwright)
    - For future LLM-based test generation
  
  GET /api/models/available
    - List available LLM models (OpenAI, Anthropic, etc.)
  
  POST /api/analyze/test-results
    - Takes test results, uses LLM to generate insights
    - E.g., "This failure is similar to 3 previous failures in checkout flow"
  ```
- [ ] Deploy on separate port (e.g., 3002) on VPS
- [ ] Add to PM2: `pm2 start failsafe-services/main.py --name qa-services`
- **Deliverable:** Python service running; callable from Next.js
- **Time:** 5 hours
- **Template:** See Appendix G

#### Task 5.3: Next.js ↔ Python Integration (Day 6-7)
- [ ] From dashboard, call Python service for test analysis
- [ ] Example: On test failure detail page, show "Insights" tab:
  - Call `/api/analyze/test-results` with test result ID
  - Parse LLM response: "This failure matches X previous incidents"
  - Display in dashboard
- [ ] Error handling: if Python service down, gracefully hide Insights tab
- **Deliverable:** Dashboard can call Python service and display results
- **Time:** 3 hours

---

### Week 6 (May 8-14)

#### Task 6.1: Vector Database Setup (Day 1-3)
- [ ] Choose: Pinecone (managed, easiest) or Weaviate (self-hosted, flexible)
- [ ] For startup: **Use Pinecone** (free tier supports 100K vectors)
- [ ] Set up Pinecone index: `test-results-index` with dimension 1536 (OpenAI embeddings)
- [ ] Create `src/lib/vector.ts`:
  ```typescript
  import { Pinecone } from '@pinecone-database/pinecone';
  
  const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
  const index = pinecone.Index('test-results-index');
  
  export async function vectorizeTestResult(result: TestResult): Promise<void> {
    const embedding = await getEmbedding(result.error); // Use OpenAI API
    await index.upsert({
      vectors: [{
        id: result.id,
        values: embedding,
        metadata: { flowId: result.flowId, status: result.status }
      }]
    });
  }
  ```
- [ ] Integrate into `runner/scheduler.ts`: after saving test result, vectorize it
- **Deliverable:** Test results being vectorized and stored in Pinecone
- **Time:** 4 hours
- **Cost:** Free tier included

#### Task 6.2: Test Result Similarity Search (Day 4-5)
- [ ] In Python service, add endpoint:
  ```python
  POST /api/similarity/find-similar-failures
    Input: testResultId
    Output: [list of similar test results with similarity scores]
  ```
- [ ] Implementation:
  - Fetch the test result's vector from Pinecone
  - Query for top 5 similar vectors
  - Return with similarity scores and details
- [ ] Test: Create intentional failures in same flow, verify similarity ranking
- **Deliverable:** Similarity search working; tested with real data
- **Time:** 3 hours

#### Task 6.3: Dashboard Integration (Day 6-7)
- [ ] On test result detail page, add "Similar Failures" section
- [ ] Shows top 3 similar failures with:
  - Similarity score (%)
  - Date and flow name
  - Error message excerpt
  - Link to detailed comparison
- [ ] Use this for portfolio: "Implemented vector similarity search for faster debugging"
- **Deliverable:** "Similar Failures" section live on dashboard
- **Time:** 2 hours

---

## WEEK 7-8: Launch & Portfolio Polish

### Week 7 (May 15-21)

#### Task 7.1: Stripe Go-Live (Day 1-2)
- [ ] In Stripe dashboard: Create live account and live API keys
- [ ] Update `.env`: Replace test keys with live keys
- [ ] In `src/lib/stripe.ts`: Update mode from test to live
- [ ] Test: Subscribe to plan in staging, verify charge on live Stripe account
- [ ] Set up live webhook: Test webhook delivery and signature verification
- [ ] Update email/Telegram alerts to mention "subscription active" vs. "test mode"
- **Deliverable:** Live Stripe integration working; can accept real payments
- **Time:** 2 hours

#### Task 7.2: Landing Page Polish (Day 3-4)
- [ ] Current landing: basic pricing + sign-up
- [ ] Improvements:
  - Add social proof: "Used by [X] teams to monitor [Y] flows"
  - Add case study section: "How [Company] caught production bugs before users"
  - Add feature list with icons: Autonomous testing, Real-time alerts, Smart debugging
  - Add CTA: "Start free trial" (7-day free, no credit card)
- [ ] SEO basics: meta tags, og:image, structured data
- [ ] Test responsiveness on mobile
- **Deliverable:** Landing page polished and deployed
- **Time:** 4 hours

#### Task 7.3: Documentation (Day 5-7)
- [ ] Create docs site (simple: Markdown on GitHub or use Mintlify)
- [ ] Sections:
  - Getting started: signup → create client → add flow
  - Writing test steps (natural language examples)
  - Alert config (Telegram, Slack, Email)
  - API docs (for future integrations)
  - Troubleshooting: common errors
- [ ] README updates: Link to docs, quick start, architecture overview
- **Deliverable:** Documentation site live and accessible
- **Time:** 3 hours

---

### Week 8 (May 22-28)

#### Task 8.1: Security & Compliance Audit (Day 1-2)
- [ ] Review `.env` secrets: no keys in code ✓
- [ ] Test: Can unauthenticated user access `/api/stripe/webhook`? (should be signature verified)
- [ ] Test: Can user A see user B's data? (should be forbidden)
- [ ] Add rate limiting on auth endpoints (prevent brute force)
  ```typescript
  import rateLimit from 'express-rate-limit';
  const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 5 }); // 5 requests per 15 min
  ```
- [ ] Review CORS settings: allow only your domain
- [ ] Create security.md: how you handle passwords, data, secrets
- **Deliverable:** Security audit completed; no critical issues
- **Time:** 2 hours

#### Task 8.2: Deploy to Vercel (Day 3-4)
- [ ] Prerequisite: Vercel account + connect GitHub repo
- [ ] Set environment variables in Vercel:
  - DATABASE_URL (PostgreSQL connection string)
  - STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET
  - TELEGRAM_BOT_TOKEN
  - OPENAI_API_KEY
  - PINECONE_API_KEY
- [ ] Deploy: `git push` → Vercel auto-deploys
- [ ] Update PM2 on VPS: runner and services stay on VPS; dashboard now on Vercel
- [ ] Update DNS: point failsafe.com or custom domain to Vercel
- [ ] Test: Access dashboard at new URL; verify Stripe webhooks still work
- **Deliverable:** Dashboard live on Vercel with custom domain
- **Time:** 2 hours

#### Task 8.3: Keep Runner on VPS (Day 5-6)
- [ ] Verify PM2 processes still running: `pm2 list`
- [ ] Update `.env` on VPS if needed (new DATABASE_URL, API keys)
- [ ] Test full flow: Dashboard on Vercel → trigger test → runner on VPS executes → results back to Vercel
- [ ] Set up cron job for log cleanup: `find /var/log/failsafe -mtime +30 -delete` (delete logs older than 30 days)
- [ ] Backup procedure: Daily S3 backup of PostgreSQL
  ```bash
  0 2 * * * pg_dump $DATABASE_URL | gzip > /tmp/backup-$(date +%Y%m%d).sql.gz && aws s3 cp /tmp/backup-*.sql.gz s3://failsafe-backups/
  ```
- **Deliverable:** Runner stable on VPS; backups automated
- **Time:** 2 hours

#### Task 8.4: First Paid Customer (Day 7)
- [ ] Ask 3-5 people to use Failsafe free for 7 days
- [ ] One person signs up for Pro plan ($99/mo)
- [ ] Document their workflow + pain points
- [ ] Send case study email: "How [Customer] caught bugs with Failsafe"
- [ ] Update landing page: "Trusted by [Customer Name]"
- **Deliverable:** First paying customer; documented case study
- **Time:** 2 hours (ongoing)

---

## WEEK 9-13: Resume Update & Job Prep

### Week 9 (May 29 - Jun 4)

#### Task 9.1: Quantify Failsafe Impact (Day 1-3)
- [ ] Collect metrics:
  - Number of users (target: 5+)
  - Monthly recurring revenue (target: $200-500)
  - Test flows running (target: 20+)
  - Average test execution time
  - Alert accuracy (how many alerts caught real issues vs. false positives?)
- [ ] Calculate: "Reduced test execution time from manual (2 hours/day) to automated (5 minutes per flow)"
- [ ] Write blog post: "Building Failsafe: System Design & Agentic Test Execution"
  - Link: Post architecture decisions
  - Discuss: How autonomous test agents work
  - Share: Observability lessons learned
- **Deliverable:** Metrics documented + blog post published
- **Time:** 4 hours

#### Task 9.2: Update Resume (Day 4-7)
- [ ] Use template from `Bryan_Oyloe_Resume_AI_Native.md`
- [ ] Add Failsafe section with real numbers:
  ```
  Failsafe — AI-Native QA SaaS (2026, shipping)
  Built autonomous test execution platform using agentic AI and Playwright.
  - Migrated from SQLite to PostgreSQL; scaled to handle 10+ concurrent users
  - Implemented browser pool reducing test latency by 60% and memory usage by 40%
  - Built vector similarity search for test result matching; reduced debugging time by 35%
  - 5+ beta users, $200/month MRR, 50+ test flows monitored
  ```
- [ ] Add AI wins with Failsafe metrics
- [ ] Remove vague bullets; everything quantified
- [ ] Save as PDF: `Bryan_Oyloe_Resume_FINAL_Jun2026.pdf`
- **Deliverable:** Resume updated and saved as PDF
- **Time:** 2 hours

---

### Week 10-13 (Jun 5-30): Job Search & Interview Prep

#### Task 10.1: GitHub Portfolio (Week 10, Day 1-2)
- [ ] Polish Failsafe GitHub repo:
  - Comprehensive README with architecture diagram
  - Deployment instructions
  - API docs
  - Contributing guide
- [ ] Create `ARCHITECTURE.md`: explain system design decisions
  - Why PostgreSQL over SQLite?
  - Why browser pool?
  - How vector search improves UX?
- [ ] Star count target: 50+ (share on Reddit r/webdev, indie hacker communities)
- **Deliverable:** GitHub repo looking production-ready
- **Time:** 3 hours

#### Task 10.2: LinkedIn Profile Update (Week 10, Day 3-4)
- [ ] Add Failsafe to featured section
- [ ] Write post about AI integration journey:
  - "Learned X in the last 90 days"
  - "Ship AI features by focusing on user value, not hype"
  - Link to blog post
- [ ] Target 500+ connections in AI space
- **Deliverable:** LinkedIn updated; 1 viral post published
- **Time:** 2 hours

#### Task 10.3: Job Applications (Week 11-13)
- [ ] Target roles: "Senior AI Engineer," "AI Product Engineer," "Full Stack AI Engineer"
- [ ] Apply to 50+ remote positions matching the job analysis
- [ ] Customize cover letter for each: mention Failsafe, explain why you fit their stack
- [ ] Track applications in spreadsheet: Company, Date, Role, Status, Interview Date
- [ ] Target response rate: 10-20% (5-10 interviews)
- **Deliverable:** 50+ applications submitted
- **Time:** 5 hours

#### Task 10.4: Interview Prep (Week 12-13)
- [ ] Prepare answers for:
  - "Tell me about Failsafe"
  - "How do you approach system design?"
  - "Give an example of shipping an AI feature"
  - "What's your biggest learning in the last 3 months?"
- [ ] Technical interview prep: LeetCode medium problems (30 min/day)
- [ ] System design prep: Failsafe architecture walkthrough (know every decision)
- [ ] Mock interviews: 2-3 with friends or paid service
- **Deliverable:** Interview confidence high; prepared for 3+ rounds
- **Time:** 10 hours (spread over 2 weeks)

---

## Success Criteria

By end of Week 13 (Jun 30):

✅ **Technical:**
- [ ] PostgreSQL migration complete; no SQLite dependency
- [ ] Observability: logging, metrics, health checks live
- [ ] Alert queue with retry logic working
- [ ] Browser pool reducing memory usage by 40%+
- [ ] Vector similarity search for test results
- [ ] Stripe live; accepting real payments
- [ ] Dashboard on Vercel; runner on VPS
- [ ] 5+ beta users; $200-500/month revenue

✅ **Resume & Portfolio:**
- [ ] Resume updated with quantified AI shipping examples
- [ ] Failsafe GitHub repo with 50+ stars
- [ ] Blog post published explaining AI integration approach
- [ ] LinkedIn active with 500+ connections in AI space

✅ **Job Search:**
- [ ] 50+ applications submitted to target roles
- [ ] 5-10 first-round interviews scheduled
- [ ] 1-2 offers pending (target $120k+)

---

## Appendices

### Appendix A: Data Migration Script

```typescript
// runner/migrate-sqlite-to-postgres.ts
import { PrismaClient } from "@prisma/client";
import Database from "better-sqlite3";

const newPrisma = new PrismaClient(); // Connected to PostgreSQL
const oldDb = new Database("./dev.db"); // SQLite

async function migrate() {
  console.log("Starting migration...");

  // Migrate users
  const users = oldDb.prepare("SELECT * FROM users").all();
  for (const user of users) {
    await newPrisma.user.create({ data: user });
  }
  console.log(`Migrated ${users.length} users`);

  // Migrate clients
  const clients = oldDb.prepare("SELECT * FROM clients").all();
  for (const client of clients) {
    await newPrisma.client.create({ data: client });
  }
  console.log(`Migrated ${clients.length} clients`);

  // ... repeat for flows, results, incidents, alerts

  console.log("Migration complete!");
  await newPrisma.$disconnect();
  oldDb.close();
}

migrate().catch(console.error);
```

### Appendix B: Health Check Endpoint

```typescript
// src/app/api/health/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const checks: Record<string, boolean | string> = {};

  // Check database
  try {
    await prisma.$queryRaw`SELECT 1`;
    checks.database = true;
  } catch (err) {
    checks.database = false;
  }

  // Check last test run age
  try {
    const lastRun = await prisma.testResult.findFirst({
      orderBy: { ranAt: "desc" },
    });
    const ageMinutes = lastRun ? (Date.now() - lastRun.ranAt.getTime()) / 60000 : null;
    checks.lastTestRunAge = ageMinutes ? `${Math.round(ageMinutes)}m` : "never";
    checks.runner = ageMinutes && ageMinutes < 120 ? true : false;
  } catch (err) {
    checks.runner = false;
  }

  const healthy = checks.database && checks.runner;
  const status = healthy ? "healthy" : "degraded";

  return NextResponse.json({
    status,
    checks,
    timestamp: new Date().toISOString(),
  });
}
```

### Appendix C: Metrics Endpoint

```typescript
// src/app/api/metrics/route.ts
import { NextRequest, NextResponse } from "next/server";
import { register, Counter, Histogram, Gauge } from "prom-client";
import { prisma } from "@/lib/prisma";

// Create metrics
const testExecutionCounter = new Counter({
  name: "test_executions_total",
  help: "Total test executions",
  labelNames: ["status"],
});

const testDurationHistogram = new Histogram({
  name: "test_duration_seconds",
  help: "Test duration in seconds",
  buckets: [0.1, 0.5, 1, 5, 10, 30],
});

const activeConnectionsGauge = new Gauge({
  name: "active_connections",
  help: "Active database connections",
});

export async function GET(req: NextRequest) {
  // Update metrics
  const passCount = await prisma.testResult.count({
    where: { status: "PASS" },
  });
  const failCount = await prisma.testResult.count({
    where: { status: "FAIL" },
  });

  return NextResponse.json({
    metrics: {
      testsPassed: passCount,
      testsFailed: failCount,
    },
    timestamp: new Date().toISOString(),
  });
}
```

### Appendix D: Alert Queue Schema

```prisma
// prisma/schema.prisma
model AlertQueue {
  id        String   @id @default(cuid())
  userId    String
  type      String   // "TELEGRAM" | "EMAIL" | "SLACK"
  payload   String   // JSON-stringified alert data
  status    String   @default("PENDING") // "PENDING" | "SENT" | "FAILED"
  retries   Int      @default(0)
  nextRetryAt DateTime @default(now())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([status, nextRetryAt])
  @@map("alert_queues")
}
```

### Appendix E: Browser Pool Implementation

```typescript
// runner/browser-pool.ts
import { Browser, chromium } from "playwright";

export class BrowserPool {
  private browsers: Browser[] = [];
  private available: boolean[] = [];
  private maxBrowsers = 5;

  async initialize() {
    console.log("Initializing browser pool...");
    for (let i = 0; i < this.maxBrowsers; i++) {
      const browser = await chromium.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
      this.browsers.push(browser);
      this.available.push(true);
    }
    console.log(`Browser pool ready: ${this.browsers.length} browsers`);
  }

  async acquire(): Promise<Browser> {
    let attempts = 0;
    while (attempts < 60) {
      const idx = this.available.findIndex((a) => a);
      if (idx !== -1) {
        this.available[idx] = false;
        return this.browsers[idx];
      }
      await new Promise((r) => setTimeout(r, 1000));
      attempts++;
    }
    throw new Error("No browsers available in pool");
  }

  async release(browser: Browser) {
    const idx = this.browsers.indexOf(browser);
    if (idx !== -1) {
      this.available[idx] = true;
    }
  }

  async shutdown() {
    for (const browser of this.browsers) {
      await browser.close();
    }
  }
}
```

### Appendix F: Circuit Breaker Implementation

```typescript
// runner/circuit-breaker.ts
interface CircuitState {
  url: string;
  status: "CLOSED" | "OPEN" | "HALF_OPEN";
  failures: number;
  lastFailureTime: number;
  lastAttemptTime: number;
}

const circuits = new Map<string, CircuitState>();

export function checkCircuit(url: string): boolean {
  const circuit = circuits.get(url) || {
    url,
    status: "CLOSED",
    failures: 0,
    lastFailureTime: 0,
    lastAttemptTime: Date.now(),
  };

  if (circuit.status === "CLOSED") {
    return true; // Allow
  }

  if (circuit.status === "OPEN") {
    const timeSinceFailure = Date.now() - circuit.lastFailureTime;
    if (timeSinceFailure > 30 * 60 * 1000) {
      // 30 min passed
      circuit.status = "HALF_OPEN";
      return true; // Allow one test
    }
    return false; // Reject
  }

  if (circuit.status === "HALF_OPEN") {
    return true; // Allow one test
  }

  return false;
}

export function recordFailure(url: string) {
  const circuit = circuits.get(url) || {
    url,
    status: "CLOSED",
    failures: 0,
    lastFailureTime: Date.now(),
    lastAttemptTime: Date.now(),
  };

  circuit.failures++;
  circuit.lastFailureTime = Date.now();

  if (circuit.failures >= 3) {
    circuit.status = "OPEN";
    console.log(`Circuit OPEN for ${url} (${circuit.failures} failures)`);
  }

  circuits.set(url, circuit);
}

export function recordSuccess(url: string) {
  const circuit = circuits.get(url);
  if (circuit) {
    circuit.status = "CLOSED";
    circuit.failures = 0;
    circuits.set(url, circuit);
  }
}
```

### Appendix G: Python Backend Template

```python
# failsafe-services/main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import openai

app = FastAPI()

class AnalyzeResultsRequest(BaseModel):
    testResultId: str
    errorMessage: str
    flowName: str

@app.post("/api/analyze/test-results")
async def analyze_test_results(req: AnalyzeResultsRequest):
    """Use LLM to analyze test failures and find patterns"""
    
    prompt = f"""
    Test Flow: {req.flowName}
    Error: {req.errorMessage}
    
    Provide:
    1. Root cause hypothesis
    2. Similar failures you've seen
    3. Recommended fix
    
    Be concise, actionable, and technical.
    """
    
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7,
    )
    
    return {
        "analysis": response.choices[0].message.content,
        "testResultId": req.testResultId,
    }

@app.get("/api/models/available")
async def list_available_models():
    return {
        "models": [
            {"name": "gpt-4", "provider": "openai"},
            {"name": "claude-3-opus", "provider": "anthropic"},
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3002)
```

---

## Notes

- **Dates are flexible:** If a task takes longer, shift subsequent tasks forward. Quality > speed.
- **Cost:** Estimate $50-100/month for PostgreSQL, Pinecone, Vercel, Stripe fees.
- **Backup plan:** If any blocker (e.g., Stripe delay), move on to next task and revisit.
- **Celebrate wins:** After each week, update MEMORY.md with progress.

