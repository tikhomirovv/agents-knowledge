---
name: youtube-to-transcript
description: >-
  Fetches a YouTube video transcript and returns the text to the user by default. Present the answer like a simple UI — short and substantive; avoid flags, paths, and stack talk unless something breaks or the user asks. Use when the user provides a YouTube link or video ID and wants the transcript; optional save-to-file or Add Knowledge. Triggers on "get transcript", "download transcript", "YouTube transcript", or a YouTube URL plus transcript intent.
license: MIT
compatibility: >-
  **Bun only.** Bundled `scripts/fetch-transcript.ts`. Missing `youtube-transcript-plus` → **only** `bun install -g youtube-transcript-plus` (never a local / project / skill-folder `bun add` or `bun install` without `-g` for this package). Not `npm install -g` either. No `package.json` in the skill. No Node.js / `npx` / `tsx`. If `bun` is not on PATH, fail clearly; do not install Bun in this flow.
---

# YouTube to Transcript

**Default:** transcript in the reply; run **without** `--file` (stdout = plain text for the user). **Do not** assume a project folder or `transcripts/` unless the user asked.

**Save to disk** only if the user asked: then `--file <path>`. No path for a save they want → **ask once**. Unclear request → default **chat only**; no extra "reply or file" question.

**Optional:** `--lang xx` (default `en`). **Add Knowledge** only if they want that next.

**How you talk to the user** — §6. **Do not** ask which package to use: always `youtube-transcript-plus` (see §4).

## Workflow

### 1. URL / ID

Missing → ask once.

### 2. Output intent

- **Chat** (default) — no `--file`.
- **Save** — user asked for a file: `--file <path>` (ask for `path` once if needed).
- **Unclear** — chat only, no `--file`.

### 3. Runtime (Bun only)

`bun` must be on PATH. If not → **stop with error** (the user must install Bun; you do not install it here).

Run the script with **`bun run`** only, never with `node` on the `.ts` file.

### 4. Dependency (`youtube-transcript-plus`)

1. **Check (exit 0 = ok):**
   `bun -e "import('youtube-transcript-plus').then(()=>process.exit(0)).catch(()=>process.exit(1))"`
2. If the check **fails** → install only with **`bun install -g youtube-transcript-plus`**. Do **not**: `bun add youtube-transcript-plus` in the skill, this repo, or any project; `bun install` (without `-g`) to pull this package into a folder. Do **not** use `npm install -g` (or pnpm/yarn global) for it. Re-run the check. Do **not** add a `package.json` to the skill.

`npm` / `npx` / `node` / `NODE_PATH` are not used for this skill.

If the import still fails after a successful global install, report the error to the user.

### 5. Run script

`<path>` = this skill’s `scripts/fetch-transcript.ts` — **anchor the path to the directory containing this `SKILL.md`**.

- **Chat:** `bun run <path> "<id-or-url>" [--lang xx]`
- **Save:** add `--file "<path>"`

Read **stdout** = transcript; stderr = progress/errors.

### 6. Reply (user-facing)

Short, plain language. **Do not** surface script paths, `--lang`/`--file`, or Bun by default. Technical detail when something failed or the user asked.

Normalize HTML entities in text if they appear in the source.

**Saved file:** one line, human path, if applicable.

## Edge cases

- **No `bun` on PATH** — error; do not run.
- **No URL** — do not run.
- **Fetch errors** — report; try another `lang` / video.
- **Relative `--file`** — resolved vs shell cwd; use an absolute path if the user needs a specific place.

## Summary

**Bun** on PATH, else error → URL/ID (ask if missing) → default chat (or `--file` if the user wanted a save) → `bun -e` import check → if needed, **`bun install -g youtube-transcript-plus` (not `npm -g`)** → `bun run <script>` → answer. One runtime only; no local package files inside the skill.
