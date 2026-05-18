# Admin Analytics & Cost Tracking — Implementation Plan

**Goal:** Fix broken cost/token tracking, add per-user lesson progress, give UNHCR & IT
real visibility into platform usage.

**Status:** Plan only — no code changes yet.
**Created:** May 2026, from chat about chatbot fixes.

---

## Context — Bugs to Fix (THIS IS WHY THE COST REPORT IS WRONG)

Found in `src/app/api/chat/route.ts` (lines 183–207) and `src/app/api/admin/analytics/route.ts` (line 58):

1. **`totalTokensOut++`** counts STREAM CHUNKS, not tokens. A chunk can be many tokens.
2. **`totalTokensIn = systemPrompt.length / 4`** is a rough chars/4 estimate, not the real token count from OpenAI.
3. **`chatConversationsTable.totalTokensIn`** is OVERWRITTEN (`.set(...)`) on every message. So a conversation with 5 messages stores only the LAST message's tokens. Conversation totals are massively undercounted.
4. **Cost calc** uses ONE flat rate (`* 0.15`) for input AND output regardless of model.
   - GPT-5.5: $5 input / $30 output
   - GPT-4o: $2.50 input / $10 output
   - GPT-4o-mini: $0.15 input / $0.60 output
   - Current code treats them all the same.

**The $5 the user sees in OpenAI dashboard is likely the truth; our admin report shows a wrong (lower) number.** Fixing this is Phase 1, priority #1.

---

## Phase 1 — MUST FIX (token & cost bugs)

### 1.1 Use OpenAI's real token usage

**File:** `src/lib/chat/llmClient.ts`

- Pass `stream_options: { include_usage: true }` to `chat.completions.create({...})`. The last chunk of the stream then contains `usage: { prompt_tokens, completion_tokens, total_tokens }` from OpenAI directly.
- Change the `stream()` async generator signature: instead of yielding only strings, yield discriminated objects: `{ type: 'text', value: string } | { type: 'usage', value: { promptTokens, completionTokens } }`. Or return a `(usage callback)` argument the caller can read after stream end.
- Cleanest pattern: return both a stream AND a `usage` promise that resolves at end-of-stream.

### 1.2 Store per-message cost correctly + SUM at conversation level

**Files:** `src/db/schema.ts`, `src/app/api/chat/route.ts`

- Add columns to `chatMessagesTable`:
  - `costMicroUsd: integer` (cost of this message in micro-USD; 1 USD = 1,000,000 micro)
  - Already has `tokensIn`, `tokensOut`, `model` — keep, but populate with REAL values.
- In `chat/route.ts`:
  - Wait for OpenAI usage chunk before inserting the assistant message.
  - Compute cost from `AVAILABLE_MODELS.find(m => m.id === config.model)` using new `costPer1MInputUsd` + `costPer1MOutputUsd` fields.
  - Store `tokensIn`, `tokensOut`, `costMicroUsd` per message.
  - For conversation totals: use **SQL aggregate** in analytics — don't denormalize. OR keep `chatConversationsTable.totalTokensIn/Out/Cost` but use `+=` via a SQL UPDATE: `set: { totalTokensIn: sql\`total_tokens_in + ${...}\` }`. Pick one and be consistent.
- Run `npm run db:push` after schema change. Existing rows: backfill `costMicroUsd = 0` (data before fix is unreliable anyway).

### 1.3 Update model list with real prices for May 2026

**File:** `src/lib/chat/availableModels.ts`

Replace the existing list with:

```ts
export interface ModelOption {
  id: string;
  label: string;
  costPer1MInputUsd: number;
  costPer1MOutputUsd: number;
  notes?: string;
}

export const AVAILABLE_MODELS: ModelOption[] = [
  // GPT-5.x family (May 2026 prices, verified via web search)
  { id: 'gpt-5.5', label: 'GPT-5.5 (best, $5/$30 per 1M)', costPer1MInputUsd: 5.00, costPer1MOutputUsd: 30.00, notes: 'Highest quality, most expensive' },
  { id: 'gpt-5.4', label: 'GPT-5.4 ($2.50/$15 per 1M)', costPer1MInputUsd: 2.50, costPer1MOutputUsd: 15.00 },
  { id: 'gpt-5.3', label: 'GPT-5.3 ($1.75/$14 per 1M)', costPer1MInputUsd: 1.75, costPer1MOutputUsd: 14.00 },
  // GPT-4 family
  { id: 'gpt-4o', label: 'GPT-4o ($2.50/$10 per 1M)', costPer1MInputUsd: 2.50, costPer1MOutputUsd: 10.00 },
  { id: 'gpt-4o-mini', label: 'GPT-4o Mini ($0.15/$0.60 per 1M) — recommended', costPer1MInputUsd: 0.15, costPer1MOutputUsd: 0.60 },
  { id: 'gpt-4-turbo', label: 'GPT-4 Turbo ($10/$30 per 1M)', costPer1MInputUsd: 10.00, costPer1MOutputUsd: 30.00 },
];

export const DEFAULT_MODEL = 'gpt-4o-mini';
```

Note: model id strings — verify against actual OpenAI API docs (https://developers.openai.com/api/docs/models/) before saving; if `gpt-5.4` doesn't work, try `gpt-5-4` or `gpt-5.4-2026-XX-XX` etc.

### 1.4 Rewrite analytics endpoint using real per-message data

**File:** `src/app/api/admin/analytics/route.ts`

- Drop the `(totals.totalTokensIn + totals.totalTokensOut) * 0.15` formula entirely.
- Compute totals from `chatMessagesTable` directly:
  ```sql
  SELECT
    SUM(tokens_in) as totalIn,
    SUM(tokens_out) as totalOut,
    SUM(cost_micro_usd) / 1000000.0 as totalCostUsd
  FROM chat_messages
  WHERE created_at BETWEEN ? AND ?
  ```
- Add a breakdown by model:
  ```sql
  SELECT model, COUNT(*) as messages, SUM(tokens_in) as inT, SUM(tokens_out) as outT, SUM(cost_micro_usd)/1000000 as costUsd
  FROM chat_messages
  WHERE role = 'assistant' AND created_at BETWEEN ? AND ?
  GROUP BY model
  ```
- Return `byModel: Array<{ model, messages, tokensIn, tokensOut, costUsd }>` in the JSON response.

### 1.5 Temperature presets in admin

**File:** `src/app/admin/prompts/page.tsx`

Above the existing temperature slider, add 3 quick-set buttons:
- "Precise (0.2)" — for strict grammar Q&A
- "Balanced (0.7)" — default
- "Creative (1.2)" — for conversational warmth

Clicking sets the slider to that value.

---

## Phase 2 — MUST ADD (user progress visibility)

### 2.1 Per-user lesson progress helper

**New file:** `src/lib/admin/userProgress.ts`

```ts
export interface UserLessonProgress {
  lessonId: string;
  level: string;
  attemptedCount: number;
  totalCount: number;
  pct: number;  // 0-100
}

export interface UserProgressSummary {
  userId: number;
  totalLessonsAttempted: number;
  byLevel: { a1: number; a2: number; b1: number; b2: number }; // avg pct per level
  perLesson: UserLessonProgress[];
}

export async function getUserProgressSummary(userId: number): Promise<UserProgressSummary> {
  // 1. Get all distinct lessonIds + count attempted exercises per lesson from exerciseStatesTable
  // 2. For each lesson, load total exercise count (use cached LESSON_LEVEL_MAP + total counts from registry)
  // 3. Compute % per lesson + average per level
}
```

Use `ALL_LESSON_IDS` and `loadLesson(id)` from `@/content` to get total counts. Cache lesson exercise counts in a Map at module load (cheap — just a Map<string, number>).

### 2.2 Dashboard upgrade

**File:** `src/app/admin/page.tsx`

Replace the 4 stat cards with:

Row 1 — Platform usage:
- Total users (with delta from last week)
- Active users last 7 days (≥1 exercise saved or chat sent)
- Total chat conversations
- Total chat cost this month ($X.XX) — real, from per-message data

Row 2 — Learning progress:
- Avg A1 completion % (across all users with any A1 activity)
- Avg A2 completion %
- A1 completion histogram (mini bar chart: 0-10% / 10-30% / 30-50% / 50-70% / 70-100% buckets)
- Most popular lesson (lesson ID + active user count)

Use existing `getStats()` pattern with new queries.

### 2.3 Users list with progress column

**Files:** `src/app/api/admin/users/route.ts`, `src/app/admin/users/page.tsx`

- API: extend the response with per-user `progressPct` (highest level the user has worked on + that level's avg %) and `costUsdMonth` (last 30 days).
- UI: replace "Chats" column with two columns: "Progress" (e.g. "A1: 45%") and "Cost / 30d" (e.g. "$0.12").
- Add sort: by name / progress / cost.

### 2.4 User detail page — full breakdown

**File:** `src/app/admin/users/[id]/page.tsx`

After the existing "AI Learning Summary" card, add:
- "Learning progress" card with per-lesson progress bars: `lesson-01 70%`, `lesson-02 12%`, ...
- "Chat usage" card: total messages, total tokens (in/out), total cost — also broken down by model.
- Use new endpoint `/api/admin/users/[id]/progress` that wraps `getUserProgressSummary`.

### 2.5 Reports page upgrade

**File:** `src/app/admin/reports/page.tsx`

- Add period quick-buttons next to the date pickers: "Today", "7d", "30d", "All time".
- Add a new card "By model" — table of model / messages / tokens / cost.
- Update "Est. cost" card to read directly from the new analytics endpoint.

---

## Phase 3 — RECOMMENDED FEATURES

Implement these AFTER Phase 1+2 are stable. Each is an independent task.

### 3.B — Hardest exercises (TIER 1, low effort)

**Why:** Content quality signal. "Exercise X has 70% wrong-rate across all users — needs rework."

**Files:** new endpoint `/api/admin/analytics/hardest-exercises`, new page `/admin/reports/exercises`.

**Implementation:**
- Query `exerciseStatesTable`: for each `(lessonId, exerciseId)`, parse `state.validation` JSON, count users with at least one wrong, divide by users who attempted.
- Sort by wrong-rate descending, limit 30.
- Show table: exercise ID / lesson / type / attempts / wrong rate %.

### 3.D — Cost budget alerts (TIER 1, medium effort)

**Why:** Prevent OpenAI bill shock. If something goes wrong (loop bug, abuse), get email and auto-disable.

**Files:** new table `admin_budget_settings`, new endpoint `/api/admin/budget`, cron-friendly check in `getActiveConfig` (or middleware).

**Implementation:**
- Admin sets monthly cap (e.g. $100). UI in admin sidebar.
- On every chat request, before calling OpenAI: SUM cost from current month, if ≥ cap → return 503 with "Monthly budget reached".
- At 80% of cap: send email to admin (use a simple SMTP or Resend). Requires `RESEND_API_KEY` or similar in `.env.local`.

### 3.H — Lesson popularity (TIER 1, low effort)

**Why:** Tells UNHCR which content is being used.

**Files:** new card on `/admin/page.tsx` + endpoint.

**Implementation:**
- Query: for each lessonId, count distinct users with any saved exercise state in the last 7 days.
- Sort descending, show top 10.

### 3.A — Drop-off analysis (TIER 2, medium-high effort)

**Why:** Biggest insight for UNHCR — shows where in the content learners abandon.

**Files:** new endpoint `/api/admin/analytics/drop-off`, new chart on `/admin/reports/page.tsx`.

**Implementation:**
- For each level: count users who started lesson 1, 2, 3, ..., 11.
- Compute % drop between consecutive lessons.
- Show line chart with the level's progression curve, highlight steepest drops.

### 3.F — Stuck-user detector (TIER 2, medium effort)

**Why:** For UNHCR re-engagement — "send a nudge email to users who haven't progressed in 14 days".

**Files:** new endpoint `/api/admin/users/stuck`, new section on `/admin/users/page.tsx`.

**Implementation:**
- Query: users whose latest `exerciseStatesTable.updatedAt` is ≥ 14 days old AND they have at least one lesson at <100%.
- Show: name, email, last active, where they stopped (lessonId + %).

### 3.J — GDPR export per user (TIER 2, low-medium effort)

**Why:** EU compliance (right of access). UNHCR will be asked for this eventually.

**Files:** new endpoint `/api/admin/users/[id]/export`, button on user detail page.

**Implementation:**
- Returns ZIP/JSON with: user profile, all chat conversations + messages, all exercise states, all lesson progress.
- Trigger via a button "Export user data (GDPR)" → downloads `user-<id>-export.json`.

### 3.B/C/E/G/I/K — Other ideas (TIER 3)

- **C — Active hours heatmap:** SQL group by hour-of-day × day-of-week from `chat_messages.created_at` and `exercise_states.updated_at`. Chart with recharts/simple SVG grid.
- **E — Per-user cost cap:** Same plumbing as 3.D but per-user limit. Could use `admin_budget_settings` table with optional `userId` column.
- **G — PII detection log:** Add `pii_detection_log` table, write a row every time `redactPII` returns `wasRedacted: true`. Show count + types on admin dashboard.
- **I — Conversation quality score:** Run a periodic LLM job that scores each conversation 1-5 on "did the bot help?" and flags low scores. Expensive — needs sampling.
- **K — UI language breakdown:** Track which UI languages users use (via API call from layout or analytics events). Show pie chart on dashboard.

---

## Migration notes

- `chatMessagesTable.costMicroUsd` — new column. Run `npm run db:push` after schema change. Old rows: backfill `0` (data was unreliable anyway).
- Drop or keep `chatConversationsTable.totalTokensIn/Out/CostUsdMicro` — your call. Recommendation: KEEP them but populate via SQL `+=` in chat/route.ts so we have fast aggregate access. Backfill via one-time script that SUMs from messages.
- No migration needed for Phase 2.1 — uses existing tables.
- Phase 3.D needs new `admin_budget_settings` table.

---

## File touch summary

Phase 1 (~8 files):
- `src/lib/chat/llmClient.ts`
- `src/lib/chat/availableModels.ts`
- `src/app/api/chat/route.ts`
- `src/app/api/admin/analytics/route.ts`
- `src/app/admin/prompts/page.tsx` (temperature presets)
- `src/db/schema.ts` (+ `npm run db:push`)
- `src/app/admin/reports/page.tsx`

Phase 2 (~6 files):
- `src/lib/admin/userProgress.ts` (NEW)
- `src/app/admin/page.tsx`
- `src/app/api/admin/users/route.ts`
- `src/app/admin/users/page.tsx`
- `src/app/api/admin/users/[id]/progress/route.ts` (NEW)
- `src/app/admin/users/[id]/page.tsx`

Total: ~14 files, est. 1200–1500 lines of TS/TSX.

---

## Acceptance criteria

After Phase 1 + 2:
- [ ] Total cost on /admin/reports matches OpenAI bill within ±5%
- [ ] Per-model cost breakdown visible (e.g. "gpt-5.4: $3.20, gpt-4o-mini: $0.05")
- [ ] Each user in /admin/users shows their progress % + 30-day cost
- [ ] /admin/users/[id] shows per-lesson progress bars
- [ ] Dashboard shows: total users, active users last 7d, avg completion %, popular lesson
- [ ] Temperature presets work in /admin/prompts
- [ ] All 5+ new models selectable in /admin/prompts

After Phase 3 (recommended order: B → H → D → A → F → J):
- [ ] Hardest-exercises report works
- [ ] Lesson popularity card on dashboard
- [ ] Budget alerts trigger email at 80% and block at 100%
- [ ] Drop-off chart on reports page
- [ ] Stuck users section on /admin/users
- [ ] GDPR export button on user detail page
