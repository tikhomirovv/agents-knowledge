---
name: website-ai-discoverability-audit
description: Audits a public website for search crawlability, structured data, sitemaps, robots.txt, optional llms.txt, and major AI crawler policies; produces an evidence-backed report and only applies vendor-confirmed remediation guidance. Use when the user wants an AI/search discoverability audit, llms.txt review, robots.txt for GPTBot/OAI-SearchBot/Claude/Perplexity, sitemap quality, or “make my site work well with AI search + Google/Bing”.
---

# Website AI & Search Discoverability Audit

## Goal

Run a **practical, evidence-first audit** of a site’s discoverability for:

- Traditional search crawling/indexing (Google/Bing baseline)
- AI-related crawlers and AI-search surfacing (where vendors publish explicit rules)

Then output:

1. A **status per checklist item** with **URLs, HTTP status, and short evidence** (what was fetched/parsed).
2. **Recommendations** for gaps and risks.
3. A **“Authoritative fixes”** section containing **only** actions that are directly supported by official vendor/spec documentation (see [reference.md](reference.md)).

If something cannot be verified from the public web response or official docs, mark it **Unknown** and propose **how to verify**—do not guess implementation details for a specific framework.

## Preconditions (must clarify fast)

1. **Primary production origin(s)** to audit, e.g. `https://www.example.com` (include `www` vs apex if both exist).
2. Whether the intent is **maximize visibility**, **maximize privacy/opt-outs**, or **mixed** (common: allow search bots, disallow training crawlers).

If unclear, ask once, then proceed with the best default: audit the user-provided URL exactly as given.

## Audit method (how to gather evidence)

Prefer **live fetches** (same as real crawlers see):

- Fetch with normal browser-like headers where possible.
- Record: final URL after redirects, status code, content-type, obvious block pages (403/401/5xx), and caching headers if relevant.

Minimum fetches (adjust for redirects):

- `GET /robots.txt`
- `GET /sitemap.xml` **and** any `Sitemap:` targets discovered in `robots.txt`
- `GET /llms.txt` (optional signal; absence is not automatically a “failure”)

Spot-check **3–5 representative templates** (home + primary commercial page + docs/blog/contact or local equivalents):

- View HTML source for `<link rel="canonical">`, `hreflang`, JSON-LD blocks, title/description patterns
- Confirm **meaningful body content exists as HTML** (not only empty shell requiring client-only rendering for core facts)

If automated parsers are unreliable, still report raw findings and mark parser confidence.

## Checklist (what to audit)

Mark each row: **Pass / Fail / Partial / Unknown**.

### A. Robots & crawling policy

- **`/robots.txt` exists** at the correct host root and returns **200** with plausible text rules.
- **No accidental global disallow** for important user agents (especially `*`).
- **`Sitemap:` directives** are present, valid absolute URLs, and reachable.
- **AI crawler policy is intentional** (not accidental default):
  - OpenAI: `OAI-SearchBot`, `GPTBot`, `ChatGPT-User` (see [reference.md](reference.md))
  - Anthropic: `ClaudeBot`, `Claude-SearchBot`, `Claude-User`
  - Perplexity: `PerplexityBot`, `Perplexity-User`
- If using WAF/CDN bot management: flag risk of **silently blocking** verified crawler IP ranges (Perplexity explicitly calls this out).

### B. Sitemaps

- Sitemap(s) are **reachable**, parseable, and include the URLs that matter for discovery.
- For XML sitemaps: evaluate whether **`lastmod` exists and looks truthful** (Bing emphasizes honest `lastmod` as a freshness signal).
- Note sitemap scale limits per sitemap protocol (split/index when huge).

### C. HTML & on-page signals (baseline quality for humans + machines)

- Reasonable `<title>` + single clear `h1` pattern on audited templates.
- **Internal links are real `<a href>`** where navigation matters (crawlability).
- Canonicalization strategy is not obviously self-conflicting across duplicates (www/apex, trailing slashes, localized duplicates).

### D. Multilingual / multi-region (if applicable)

- `hreflang` consistency (reciprocal expectations), localized URLs resolve, no accidental `noindex` on one language variant.

### E. Structured data (Google-oriented baseline)

- If the site has content types eligible for rich results, check for **JSON-LD** presence on representative templates.
- Validate mental model against Google’s structured data policies: **mark up only what users can see**; avoid empty schema pages.

### F. `llms.txt` (optional curated “LLM map”)

- Fetch `/llms.txt` if present; if absent, treat as **optional** unless the user explicitly requires it.
- If present, sanity-check it matches the **documented shape** from the `llms.txt` proposal site (H1, blockquote summary, H2 sections with markdown links, optional `## Optional` section semantics).

### G. AI-search / indexing “freshness accelerators” (optional)

- If Bing ecosystem matters: consider **IndexNow** as an optional complement to sitemaps (not a replacement).

### H. Google quality gates (high-level)

- If content is heavily automated: align messaging with **Search Essentials** and spam/scaled-content policies (do not promise ranking outcomes).

## Output format (required)

Produce a report with these sections:

1. **Scope**: audited origins, date, and pages/templates sampled.
2. **Executive summary**: top 5 risks/opportunities in plain language.
3. **Findings table** (mandatory columns):
   - **Area** (A–H above)
   - **Check**
   - **Status**
   - **Evidence** (paths/headers/short quotes—keep quotes minimal and non-sensitive)
   - **User impact** (search visibility, AI surfacing, privacy)
   - **Recommendation** (what to do next)
4. **Authoritative fixes** (strict rules):
   - Only include items backed by [reference.md](reference.md).
   - Each bullet must name **the exact lever** (`robots.txt` group, bot user-agent, sitemap field, doc URL).
5. **Unknowns / follow-ups**: explicit verification steps (e.g., Search Console, server/WAF logs, template-level schema validation).

## Authoritative fixes you may state confidently (vendor-grounded)

These are safe to include as **concrete guidance** when relevant to the user’s intent:

- **OpenAI**: `OAI-SearchBot` vs `GPTBot` are **independent** `robots.txt` controls; `OAI-SearchBot` impacts ChatGPT search surfacing; changes may take ~**24 hours**; `ChatGPT-User` is user-initiated and is **not** the right lever for “Search opt-outs” (use `OAI-SearchBot` per OpenAI docs).
- **Anthropic**: separate bots for training vs user-directed retrieval vs search optimization; bots honor `robots.txt`; **avoid relying on IP blocking alone** as a durable opt-out mechanism; `Crawl-delay` is supported for throttling (non-standard extension).
- **Perplexity**: treat `PerplexityBot` vs `Perplexity-User` separately; Perplexity documents that the **user fetch** path **generally ignores `robots.txt`**; provide WAF guidance requiring **UA + published IP ranges**.
- **Google**: `robots.txt` must be at site root, UTF-8; `Sitemap:` directive is a standard discovery mechanism; structured data is for explicit semantics; **JSON-LD is generally recommended** when choosing a format; follow Search Essentials / spam policies for scaled/automated content.
- **Bing / Microsoft AI discovery**: treat XML sitemaps + truthful `lastmod` as important freshness signals; IndexNow is optional and complementary.
- **`llms.txt`**: follow the public proposal/spec site for format and intent; do not claim it is a Google ranking requirement.

Do **not** invent:

- Framework-specific code changes unless the repo is open and the user asked for implementation.
- “AI citation guarantees” or numeric lift claims without a measured experiment in that property.

## Progressive enhancement (how the user should evolve this skill)

When repeated audits reveal stable fixes for a stack (Astro/Next/WordPress/etc.), add a short subsection under **Stack playbooks** in a separate file (optional) — keep `SKILL.md` lean.

## Additional resources

- Official links and specs: [reference.md](reference.md)
