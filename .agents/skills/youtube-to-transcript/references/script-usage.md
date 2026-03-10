# Bundled script: fetch-transcript

This script is part of the **youtube-to-transcript** skill. It fetches a YouTube video transcript and saves it as a `.txt` file in `transcripts/` in the **current working directory**. Run it from your project root so that `transcripts/` is created there.

## Dependency

Install in the project where you run the script:

```bash
bun add youtube-transcript-plus
# or: npm install youtube-transcript-plus
```

## Usage

From the **directory where you want `transcripts/`** (e.g. project root):

```bash
bun run <path-to-this-skill>/scripts/fetch-transcript.ts "<youtube-url>" --output <filename>
```

With language:

```bash
bun run <path-to-this-skill>/scripts/fetch-transcript.ts "<url>" --output <filename> --lang ru
```

Example (skill in `.agents/skills/youtube-to-transcript`):

```bash
bun run .agents/skills/youtube-to-transcript/scripts/fetch-transcript.ts "https://youtube.com/watch?v=VIDEO_ID" --output my-video --lang ru
```

Output: `transcripts/<filename>.txt`.
