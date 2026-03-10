#!/usr/bin/env bun

/**
 * YouTube transcript fetcher — bundled with the youtube-to-transcript skill.
 * Saves transcript to transcripts/ in the current working directory (run from project root).
 *
 * Usage:
 *   bun run scripts/fetch-transcript.ts <youtube-url-or-id> --output <name>
 *   bun run scripts/fetch-transcript.ts <url> --output <name> --lang ru
 *
 * Requires: youtube-transcript-plus (bun add youtube-transcript-plus or npm install)
 */

import { fetchTranscript } from 'youtube-transcript-plus';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

const args = process.argv.slice(2);

let videoIdOrUrl: string | null = null;
let lang: string = 'en';
let outputName: string | null = null;

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg === '--lang' && i + 1 < args.length) {
    lang = args[i + 1];
    i++;
  } else if (arg === '--output' && i + 1 < args.length) {
    outputName = args[i + 1];
    i++;
  } else if (!arg.startsWith('--')) {
    videoIdOrUrl = arg;
  }
}

if (!videoIdOrUrl) {
  console.error('Error: YouTube URL or video ID is required');
  console.log('\nUsage:');
  console.log('  bun run scripts/fetch-transcript.ts <youtube-url-or-id> --output <filename>');
  console.log('  bun run scripts/fetch-transcript.ts <url> --output <filename> --lang ru');
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

// Transcripts go to transcripts/ in the current working directory (run from project root)
const transcriptsDir = join(process.cwd(), 'transcripts');
const textFileName = outputName ? `${outputName}.txt` : `${videoId}.txt`;
const textPath = join(transcriptsDir, textFileName);

async function main() {
  try {
    console.log(`Fetching transcript for video: ${videoId}`);
    console.log(`Language: ${lang}`);

    const transcript = await fetchTranscript(videoId, { lang });
    console.log(`✓ Transcript fetched successfully (${transcript.length} segments)`);

    if (!existsSync(transcriptsDir)) {
      await mkdir(transcriptsDir, { recursive: true });
      console.log(`✓ Created transcripts directory: ${transcriptsDir}`);
    }

    const text = transcript.map((segment: { text: string }) => segment.text).join(' ');
    await writeFile(textPath, text, 'utf-8');
    console.log(`✓ Plain text saved to: ${textPath}`);
    console.log('\n✓ Done! You can add this transcript to a skill using the Add Knowledge skill.');
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
