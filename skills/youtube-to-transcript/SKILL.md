---
name: youtube-to-transcript
description: >-
  Fetches a YouTube video transcript and returns the text to the user by default. Present the answer like a simple UI — short and substantive; avoid flags, paths, and stack talk unless something breaks or the user asks. Use when the user provides a YouTube link or video ID and wants the transcript; optional save-to-file or Add Knowledge. Triggers on "get transcript", "download transcript", "YouTube transcript", or a YouTube URL plus transcript intent.
license: MIT
compatibility: >-
  Bun or Node/npm. Bundled `scripts/fetch-transcript.ts`. Needs `youtube-transcript-plus`. Runtime: user hint (bun/npm) else auto-detect; if neither Bun nor Node+npm, ask what to install.
---

# YouTube to Transcript

**Default:** show the transcript in your reply (run script **without** `--file`; **stdout** = plain text only — use it for the user). **Do not** assume a project folder or `transcripts/` unless the user asked.

**Save to disk:** only if the user asked to save, download, or write a file — then run with `--file <path>` (any path they give or you agree on). If they want a file but not the path → **ask once** (path + format: usually `.txt`).

**Optional:** `--lang xx` (default `en`). **Add Knowledge** only if they want that next.

**How you talk to the user** — see §6 (brief, non-technical by default).

## Workflow

### 1. URL / ID

Missing → ask once.

### 2. Output intent

- **Only text in chat** (default) — no `--file`.
- **Save file** — need `--file <absolute-or-relative-path>`; resolve path with the user if unclear.
- **Ambiguous** ("get transcript" only) — you may ask briefly: "Reply here only, or save to a file (which path)?"

### 3. Runtime (Bun vs npm)

1. User said bun / npm / node / npx → use that (must be on PATH).
2. Else: `bun` → Bun; else `node`+`npm` → `npx --yes tsx`.
3. Neither → ask to install **Bun** or **Node.js (npm)**. Stop.

Both present, no hint → prefer **Bun**.

### 4. Dependency

Run the import check from the **cwd** you use for the script (often repo root).

| Runtime | Check (exit 0 = OK) |
|--------|--------|
| Bun | `bun -e "import('youtube-transcript-plus').then(()=>process.exit(0)).catch(()=>process.exit(1))"` |
| npm | `node --input-type=module -e "import('youtube-transcript-plus').then(()=>process.exit(0)).catch(()=>process.exit(1))"` |

**If missing — prefer global install** (do not add the package to the project unless global still fails or the user wants it local):

- **npm:** `npm install -g youtube-transcript-plus` — then re-check with **`NODE_PATH`** so `node` sees globals: PowerShell `$env:NODE_PATH = (npm root -g)` then the same `node -e` line; bash `NODE_PATH="$(npm root -g)" node --input-type=module -e "..."`.
- **bun:** `bun install -g youtube-transcript-plus` — then run the same `bun -e` check again.

**Last resort:** `bun add youtube-transcript-plus` / `npm install youtube-transcript-plus` in the project. Stop until a check passes.

### 5. Run script

`<path>` = this skill’s `scripts/fetch-transcript.ts` — **anchor paths to the directory containing this `SKILL.md`** (not the current project root). Pass that file’s path to `bun run` / `npx tsx` (absolute path is OK).

- **Chat only:** `bun run <path> "<url-or-id>" [--lang xx]` or `npx --yes tsx <path> "<url-or-id>" [--lang xx]`  
  Read **stdout** for the transcript text; stderr has progress/errors.

- **Save:** add `--file "<path>"` (same command).

### 6. Reply (user-facing)

**Tone:** like a **simple, pleasant UI** — short, plain language, only what matters. No lecture.

- **Deliver first:** summary or full transcript (whatever fits the request and length). That is the main “content.”
- **Do not** surface implementation by default: no flags (`--file`, `--lang`), paths to the skill script, bun vs npm, stdout/stderr, or “how I ran it” unless the user asked or something failed.
- **Technical detail** only when **needed**: missing dependency, runtime not found, error from the fetcher, or the user explicitly wants commands / save path / language switch.
- **Quirks:** YouTube may return HTML entities in text (e.g. `&amp;#39;` for apostrophe) — normalize to readable characters in what you show the user; mention the source only if they ask.
- **Saved file:** one short line where it went (human path). **Add Knowledge** only if they want that next.

## Edge cases

- **Explicit runtime missing** — report; offer the other stack if available.
- **No URL** — do not run.
- **Fetch errors** — relay; suggest another language/video.
- **Relative `--file`** — resolved vs **current working directory** of the command; use absolute path if the user needs a specific location.

## Summary

URL → output intent (default chat / file / ask) → runtime → dep check → run (no `--file` or with `--file`) → answer user.
