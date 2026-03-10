---
name: youtube-to-transcript
description: Fetches a YouTube video transcript and saves it as a text file in the project's transcripts/ folder. Use when the user provides a YouTube link or video ID and wants to get the transcript, save subtitles as text, or prepare video content for later use (e.g. adding to skill knowledge). Apply whenever the user says "get transcript", "download transcript", "YouTube transcript", or pastes a YouTube URL and wants the text.
license: MIT
compatibility: Runs from the project root. Requires bun and the project's fetch-transcript script (scripts/fetch-transcript/). The transcripts/ directory will be created if missing.
---

# YouTube to Transcript

This skill runs the project's transcript fetcher: you get a YouTube URL (or the user provides one), run the script, and a `.txt` file appears in `transcripts/`. Optionally suggest using the **Add Knowledge** skill next to turn that transcript into skill knowledge.

## What you need

- **YouTube URL or video ID** — from the user's message or ask: "Please paste the YouTube video link."
- **Language** (optional) — default is `en`. Use `--lang ru` (or other code) if the user wants another language.
- **Output filename** (optional) — use `--output my-name` to get `transcripts/my-name.txt` instead of `transcripts/<video-id>.txt`.

## Workflow

### 1. Get the URL

- If the user already sent a YouTube link or video ID, use it.
- If not, ask: "Please send the YouTube video URL (or the video ID)."

### 2. Run the script from the project root

From the **project root** (the repository where `package.json` and `scripts/fetch-transcript/` live), run:

```bash
bun run fetch-transcript "<url-or-video-id>"
```

With optional language (e.g. Russian):

```bash
bun run fetch-transcript "<url-or-video-id>" --lang ru
```

With a custom output name (e.g. for a readable filename):

```bash
bun run fetch-transcript "<url-or-video-id>" --output my-video-name
```

The script writes to **`transcripts/`** (created if missing). Output file: `transcripts/<video-id>.txt` or `transcripts/<output-name>.txt`.

### 3. Confirm and suggest next step

- Tell the user where the file was saved (e.g. `transcripts/abc123.txt`).
- Suggest: **"If you want to add this transcript as knowledge to a skill (e.g. marketer or designer), use the Add Knowledge skill and point it to this file and the target skill."** So the user can either invoke Add Knowledge themselves or you can handle it in a follow-up.

## Edge cases

- **No URL given** — Ask once for the YouTube link or video ID; do not run without it.
- **Script fails** (e.g. video unavailable, no transcript) — Report the script’s error to the user and suggest checking the URL or trying another video.
- **Wrong project / no script** — The script must be run from the repository that contains `package.json` and `scripts/fetch-transcript/`. If you're elsewhere, say that this skill is for the project that has the fetch-transcript script.

## Summary

1. Get YouTube URL (or ask).
2. From project root: `bun run fetch-transcript "<url>"` (add `--lang` or `--output` if needed).
3. Confirm the path to the created `.txt` in `transcripts/`.
4. Optionally suggest using the **Add Knowledge** skill to turn that file into skill knowledge.
