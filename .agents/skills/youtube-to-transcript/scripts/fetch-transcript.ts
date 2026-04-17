#!/usr/bin/env bun

/**
 * YouTube transcript fetcher — bundled with the youtube-to-transcript skill.
 *
 * Default: prints plain transcript text to stdout only (no file). Logs go to stderr.
 * Optional: --file <path> saves UTF-8 text to that path (any directory; parents created).
 *
 * Usage:
 *   bun run fetch-transcript.ts <youtube-url-or-id> [--lang xx]
 *   bun run fetch-transcript.ts <url> --file /path/to/out.txt [--lang xx]
 *   npx --yes tsx fetch-transcript.ts <url> [--file path]
 *
 * Requires: youtube-transcript-plus (prefer global: npm install -g / bun install -g; set NODE_PATH for node/tsx if import fails; local install last resort); npm path uses tsx for .ts
 */

import { fetchTranscript } from 'youtube-transcript-plus';
import { writeFile, mkdir } from 'fs/promises';
import { dirname } from 'path';
import { existsSync } from 'fs';

const args = process.argv.slice(2);

let videoIdOrUrl: string | null = null;
let lang: string = 'en';
/** If set, write transcript here; otherwise stdout only */
let filePath: string | null = null;

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg === '--lang' && i + 1 < args.length) {
    lang = args[i + 1];
    i++;
  } else if (arg === '--file' && i + 1 < args.length) {
    filePath = args[i + 1];
    i++;
  } else if (!arg.startsWith('--')) {
    videoIdOrUrl = arg;
  }
}

if (!videoIdOrUrl) {
  console.error('Error: YouTube URL or video ID is required');
  console.error('\nUsage:');
  console.error('  bun run fetch-transcript.ts <youtube-url-or-id> [--lang xx]');
  console.error('  bun run fetch-transcript.ts <url> --file <path-to-save.txt> [--lang xx]');
  console.error('  (npm: npx --yes tsx fetch-transcript.ts …)');
  console.error('\nDefault: transcript text to stdout. Use --file only when saving to disk.');
  process.exit(1);
}

function extractVideoId(input: string): string {
  if (/^[a-zA-Z0-9_-]{11}$/.test(input)) return input;
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = input.match(pattern);
    if (match?.[1]) return match[1];
  }
  return input;
}

const videoId = extractVideoId(videoIdOrUrl);

async function main() {
  try {
    console.error(`Fetching transcript for video: ${videoId} (lang: ${lang})`);

    const transcript = await fetchTranscript(videoId, { lang });
    const text = transcript.map((segment: { text: string }) => segment.text).join(' ');

    if (filePath) {
      const dir = dirname(filePath);
      if (dir && dir !== '.' && !existsSync(dir)) {
        await mkdir(dir, { recursive: true });
      }
      await writeFile(filePath, text, 'utf-8');
      console.error(`Saved: ${filePath}`);
    } else {
      process.stdout.write(`${text}\n`);
    }
  } catch (error: any) {
    console.error('\n✗ Error fetching transcript:');
    if (error.name === 'YoutubeTranscriptVideoUnavailableError') {
      console.error('  Video is unavailable or has been removed');
    } else if (error.name === 'YoutubeTranscriptDisabledError') {
      console.error('  Transcripts are disabled for this video');
    } else if (error.name === 'YoutubeTranscriptNotAvailableError') {
      console.error('  No transcript is available for this video');
    } else if (error.name === 'YoutubeTranscriptNotAvailableLanguageError') {
      console.error(`  Transcript is not available in language: ${lang}`);
    } else if (error.name === 'YoutubeTranscriptInvalidVideoIdError') {
      console.error('  Invalid video ID or URL');
    } else {
      console.error(`  ${error.message}`);
    }
    process.exit(1);
  }
}

main();
