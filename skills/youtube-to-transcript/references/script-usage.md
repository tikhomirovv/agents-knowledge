# Bundled script: fetch-transcript

**Default:** transcript text on **stdout** only (no file). Progress on **stderr**.

**Optional:** `--file <path>` writes UTF-8 text to that path (creates parent dirs). Not tied to any project folder unless the path says so.

## Dependency

If the import check fails in the project, **install globally** first:

```bash
npm install -g youtube-transcript-plus
# or
bun install -g youtube-transcript-plus
```

For **node** after a global npm install, the same shell may need `NODE_PATH` (e.g. `NODE_PATH="$(npm root -g)"` on bash, or PowerShell `$env:NODE_PATH = (npm root -g)`) so `import('youtube-transcript-plus')` resolves.

**Last resort:** install into the project (`npm install` / `bun add`).

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
