# Bundled script: fetch-transcript

**Default:** transcript text on **stdout** only (no file). Progress on **stderr**.

**Optional:** `--file <path>` writes UTF-8 text to that path (creates parent dirs). Not tied to any project folder unless the path says so.

## Dependency

```bash
bun add youtube-transcript-plus
# or
npm install youtube-transcript-plus
```

## Commands

`<path>` = this skill’s `scripts/fetch-transcript.ts`.

**Stdout only (typical — agent pastes for user)**

```bash
bun run <path> "<youtube-url-or-id>" [--lang ru]
npx --yes tsx <path> "<youtube-url-or-id>" [--lang ru]
```

**Save to disk**

```bash
bun run <path> "<url-or-id>" --file "D:/notes/video.txt" [--lang ru]
npx --yes tsx <path> "<url-or-id>" --file ./out.txt
```
