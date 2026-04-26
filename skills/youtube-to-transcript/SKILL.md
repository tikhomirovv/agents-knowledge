---
name: youtube-to-transcript
description: >-
  Fetches a YouTube video transcript and returns the text to the user by default. Present the answer like a simple UI — short and substantive; avoid flags, paths, and stack talk unless something breaks or the user asks. Use when the user provides a YouTube link or video ID and wants the transcript; optional save-to-file or Add Knowledge. Triggers on "get transcript", "download transcript", "YouTube transcript", or a YouTube URL plus transcript intent.
license: MIT
compatibility: >-
  Bun or Node/npm. Bundled `scripts/fetch-transcript.ts` and `youtube-transcript-plus`. The agent auto-detects the runtime; no user choice. If neither Bun nor Node+npm is on PATH, fail with a clear error (do not install runtimes in this flow). Missing package: install globally for the active stack, then re-check; project-local is last resort.
---

# YouTube to Transcript

**Default:** transcript in the reply; run **without** `--file` (stdout = plain text for the user). **Do not** assume a project folder or `transcripts/` unless the user asked.

**Save to disk** only if the user asked: then `--file <path>`. No path for a save they want → **ask once**. Unclear request → default **chat only**; no extra "reply or file" question.

**Optional:** `--lang xx` (default `en`). **Add Knowledge** only if they want that next.

**How you talk to the user** — §6. **Do not** ask which runtime, package, or “bun vs npm” — always `youtube-transcript-plus`; pick the tool by detection below.

## Workflow

### 1. URL / ID

Missing → ask once.

### 2. Output intent

- **Chat** (default) — no `--file`.
- **Save** — user asked for a file: `--file <path>` (ask for `path` once if needed).
- **Unclear** — chat only, no `--file`.

### 3. Runtime (auto — no user questions)

1. `bun` on PATH → `bun run <path> …`. If `bun` and `node`+`npm` are both on PATH, **use Bun** (this branch).
2. Else if `node` and `npm` on PATH → `npx --yes tsx <path> …` (never `node` on a `.ts` file; only `bun run` or `npx --yes tsx`).

3. If **neither** Bun nor (Node+npm) on PATH → **stop with error**: need Bun or Node.js+npm on PATH. Do not install a runtime in this step.

### 4. Dependency (`youtube-transcript-plus` — fixed; no choice)

If the import check fails, **install that package globally** for the stack you are using, then re-check. Project-local only if global fails or the user insists.

Run the check from the **cwd** you use for the script (often repo root).

| Active stack | Check (0 = ok) |
|--------|--------|
| Bun | `bun -e "import('youtube-transcript-plus').then(()=>process.exit(0)).catch(()=>process.exit(1))"` |
| npm | `node --input-type=module -e "import('youtube-transcript-plus').then(()=>process.exit(0)).catch(()=>process.exit(1))"` |

- **npm:** `npm install -g youtube-transcript-plus` then re-check with `NODE_PATH` if needed: PowerShell `$env:NODE_PATH = (npm root -g)`; bash `NODE_PATH="$(npm root -g)"` …
- **bun:** `bun install -g youtube-transcript-plus` — re-run `bun -e` check.

**Last resort:** `bun add` / `npm install` in the project. Re-run check until it passes or you report failure.

### 5. Run script

`<path>` = this skill’s `scripts/fetch-transcript.ts` — path relative to the directory with this `SKILL.md`. `bun run <path> …` or `npx --yes tsx <path> …` only.

- **Chat:** `bun run <path> "<id-or-url>" [--lang xx]` or `npx --yes tsx <path> "<id-or-url>" …`
- **Save:** add `--file "<path>"`.

Read **stdout** = transcript; stderr = progress/errors.

### 6. Reply (user-facing)

Short, plain language. **Do not** surface script paths, runtimes, or flags by default. Technical detail when something failed or the user asked.

Normalize HTML entities in text if they appear in the source.

**Saved file:** one line, human path, if applicable.

## Edge cases

- **No Bun and no Node+npm** — error; do not run.
- **No URL** — do not run.
- **Fetch errors** — report; try another `lang` / video.
- **Relative `--file`** — vs shell cwd; use an absolute path if the user needs a specific place.

## Summary

URL/ID (ask if missing) → output (default chat) → **detect runtime** (Bun preferred, else npx+tsx) → import check + **global** package install if needed → run → answer.
