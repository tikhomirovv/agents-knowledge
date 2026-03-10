---
name: youtube-to-transcript
description: Fetches a YouTube video transcript and saves it as a text file in the project's transcripts/ folder. Use when the user provides a YouTube link or video ID and wants to get the transcript, save subtitles as text, or prepare video content for later use (e.g. adding to skill knowledge). Apply whenever the user says "get transcript", "download transcript", "YouTube transcript", or pastes a YouTube URL and wants the text.
license: MIT
compatibility: Requires bun. Use the skill's bundled script (scripts/fetch-transcript.ts); run it from the directory where you want transcripts/ (e.g. project root). The script needs youtube-transcript-plus (bun add youtube-transcript-plus).
---

# YouTube to Transcript

This skill uses its **bundled script** to fetch a YouTube transcript and save it as a `.txt` file in `transcripts/`. The script lives inside the skill (`scripts/fetch-transcript.ts`), so the skill works when copied to another project. Run the script from the directory where you want `transcripts/` (e.g. project root). Optionally suggest using the **Add Knowledge** skill next to turn that transcript into skill knowledge.

## What you need

- **YouTube URL or video ID** — from the user's message or ask for it.
- **Output filename** — must be resolved before running the script (see step 2). Either the user gives a name, or the video title, or you ask and then derive a short semantic name.
- **Language** (optional) — default is `en`. Use `--lang ru` (or other code) if the user wants another language.

## Workflow

### 1. Get the URL

- If the user already sent a YouTube link or video ID, use it.
- If not, ask: "Please send the YouTube video URL (or the video ID)."

### 2. Resolve the output filename

You must have a clear name for the transcript file before running the script. Do **not** run with only the video ID unless the user explicitly prefers that.

- **If the user gave an explicit filename** (e.g. "save as marketing-tips", "call it attention_traps") — use it, but **optimize**: short, lowercase, words with underscores or hyphens, no spaces or special characters. Example: "My Cool Video!!" → `my_cool_video`.
- **If the user gave the video title** (e.g. "Ловушка для внимания Бен Парр") — derive a **short semantic filename** from it: meaningful words, lowercase, underscores or hyphens. Example: "Ловушка для внимания Бен Парр" → `attention_trap_ben_parr` or `lovushka_vnimaniya`.
- **If the user gave nothing** — **ask**: "What should we name the transcript file? You can give a short name (e.g. for the topic) or the video title, and I'll use a suitable filename." Once they answer, apply the rules above (explicit filename → optimize; video title → derive short semantic name).

Use this name in `--output <name>` so the file is saved as `transcripts/<name>.txt`.

### 3. Check that the dependency is available

Before running the script, check that **youtube-transcript-plus** is available in the **directory from which the skill is run** (typically the project root). From that directory, run:

```bash
bun -e "import('youtube-transcript-plus').then(() => process.exit(0)).catch(() => process.exit(1))"
```

- **If the command exits with 0** — the dependency is present. Continue to step 4.
- **If the command exits with 1 (or fails)** — the dependency is missing. **Do not run the script.** Tell the user:

  **"To run this skill, the dependency `youtube-transcript-plus` is required. Install it in this project with:**
  **`bun add youtube-transcript-plus`**
  **(or `npm install youtube-transcript-plus`). Make sure it is installed, then run the skill again."**

  Then stop; do not run the transcript script until the user has installed the dependency and invoked the skill again.

### 4. Run the skill's bundled script

Use the script **inside this skill**: `scripts/fetch-transcript.ts`. Run it from the **directory where you want `transcripts/`** (e.g. project root). The script writes to `transcripts/` in the current working directory. For detailed usage and examples, see [references/script-usage.md](references/script-usage.md).

**If this skill is in `.agents/skills/youtube-to-transcript`** (or the same repo has a project script), you can use either:

- **Bundled script** (works when the skill is copied elsewhere):
  ```bash
  bun run .agents/skills/youtube-to-transcript/scripts/fetch-transcript.ts "<url-or-video-id>" --output <resolved-filename>
  ```
- **Project script** (if this repo has `package.json` and `scripts/fetch-transcript/`):
  ```bash
  bun run fetch-transcript "<url-or-video-id>" --output <resolved-filename>
  ```

With optional language (e.g. Russian), add `--lang ru`.

Output file: `transcripts/<resolved-filename>.txt`.

### 5. Confirm and suggest next step

- Tell the user where the file was saved (e.g. `transcripts/abc123.txt`).
- Suggest: **"If you want to add this transcript as knowledge to a skill (e.g. marketer or designer), use the Add Knowledge skill and point it to this file and the target skill."** So the user can either invoke Add Knowledge themselves or you can handle it in a follow-up.

## Edge cases

- **No URL given** — Ask once for the YouTube link or video ID; do not run without it.
- **No filename or title given** — Ask the user what to name the file (short name or video title); then derive or optimize the filename. Do not run with only the video ID unless the user explicitly says they want that.
- **Script fails** (e.g. video unavailable, no transcript) — Report the script’s error to the user and suggest checking the URL or trying another video.
- **Dependency missing** — After the check in step 3, if the dependency is not available, inform the user and give the install command; do not run the script. Ask them to install and run the skill again.
- **Wrong project / no script** — Use this skill's bundled script at `scripts/fetch-transcript.ts` from the directory where you want `transcripts/`. Ensure youtube-transcript-plus is installed there.

## Summary

1. Get YouTube URL (or ask).
2. Resolve output filename: if user gave a name → optimize it; if user gave video title → derive a short semantic filename; if neither → ask the user, then derive or optimize.
3. Check dependency in the run directory; if missing, tell the user to run `bun add youtube-transcript-plus` and run the skill again, then stop.
4. Run the skill's script from the target directory: `bun run <skill-path>/scripts/fetch-transcript.ts "<url>" --output <filename>` (add `--lang` if needed).
5. Confirm the path to the created `.txt` in `transcripts/`.
6. Optionally suggest using the **Add Knowledge** skill to turn that file into skill knowledge.
