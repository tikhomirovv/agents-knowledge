# Bundled script: fetch-transcript

**Bun only:** `bun` / `bun run` for this `.ts` file.

**Default:** transcript text on **stdout** only (no file). Progress on **stderr**.

**Optional:** `--file <path>` writes UTF-8 text to that path (creates parent dirs). Not tied to any project folder unless the path says so.

## Dependency

If the import check fails, install **only globally** with Bun (no local/project/skill `bun add` or non-`-g` `bun install` for this package; do not use `npm install -g`):

```bash
bun install -g youtube-transcript-plus
```

Re-check with `bun -e` as in `SKILL.md` §4. Do not add files under the skill folder for dependencies.

## Commands

`<path>` = this skill’s `scripts/fetch-transcript.ts`.

**Stdout only (typical — agent pastes for user)**

```bash
bun run <path> "<youtube-url-or-id>" [--lang ru]
```

**Save to disk**

```bash
bun run <path> "<url-or-id>" --file "D:/notes/video.txt" [--lang ru]
```
