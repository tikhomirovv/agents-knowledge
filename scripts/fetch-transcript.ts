#!/usr/bin/env bun

/**
 * Script for fetching YouTube video transcripts
 *
 * Usage:
 *   bun run fetch-transcript <youtube-url-or-id>
 *   bun run fetch-transcript <youtube-url-or-id> --lang en
 *   bun run fetch-transcript <youtube-url-or-id> --output custom-name
 *
 * The transcript will be saved to transcripts/ directory as a TXT file
 * (JSON saving is currently disabled but code is commented out)
 */

import { fetchTranscript } from 'youtube-transcript-plus';
import { writeFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { existsSync } from 'fs';

// Get command line arguments
const args = process.argv.slice(2);

// Parse arguments
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

// Validate input
if (!videoIdOrUrl) {
  console.error('Error: YouTube URL or video ID is required');
  console.log('\nUsage:');
  console.log('  bun run fetch-transcript <youtube-url-or-id>');
  console.log('  bun run fetch-transcript <youtube-url-or-id> --lang en');
  console.log('  bun run fetch-transcript <youtube-url-or-id> --output custom-name');
  process.exit(1);
}

// Extract video ID from URL if needed
function extractVideoId(input: string): string {
  // If it's already just an ID (11 characters, alphanumeric)
  if (/^[a-zA-Z0-9_-]{11}$/.test(input)) {
    return input;
  }

  // Try to extract from various YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = input.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  // If no pattern matches, return as is (might be invalid, but let the library handle it)
  return input;
}

const videoId = extractVideoId(videoIdOrUrl);

// Determine output filename
// JSON saving is disabled, only TXT is saved
// const outputFileName = outputName
//   ? `${outputName}.json`
//   : `${videoId}.json`;

// Path to transcripts directory (from project root)
// Script runs from project root, so transcripts/ is at the same level
const transcriptsDir = join(import.meta.dir, '..', 'transcripts');
// const outputPath = join(transcriptsDir, outputFileName);

// Determine TXT filename
const textFileName = outputName
  ? `${outputName}.txt`
  : `${videoId}.txt`;
const textPath = join(transcriptsDir, textFileName);

async function main() {
  try {
    console.log(`Fetching transcript for video: ${videoId}`);
    console.log(`Language: ${lang}`);

    // Fetch transcript
    const transcript = await fetchTranscript(videoId, {
      lang: lang,
    });

    console.log(`✓ Transcript fetched successfully (${transcript.length} segments)`);

    // Create transcripts directory if it doesn't exist
    if (!existsSync(transcriptsDir)) {
      await mkdir(transcriptsDir, { recursive: true });
      console.log(`✓ Created transcripts directory: ${transcriptsDir}`);
    }

    // Prepare data to save (commented out - JSON saving is disabled)
    // const dataToSave = {
    //   videoId: videoId,
    //   videoUrl: videoIdOrUrl,
    //   lang: lang,
    //   fetchedAt: new Date().toISOString(),
    //   segments: transcript,
    //   // Also create a plain text version for easy reading
    //   text: transcript.map(segment => segment.text).join(' '),
    // };

    // Save as JSON (commented out)
    // await writeFile(outputPath, JSON.stringify(dataToSave, null, 2), 'utf-8');
    // console.log(`✓ Transcript saved to: ${outputPath}`);

    // Save as plain text
    const text = transcript.map(segment => segment.text).join(' ');
    await writeFile(textPath, text, 'utf-8');
    console.log(`✓ Plain text version saved to: ${textPath}`);

    console.log('\n✓ Done! You can now process this transcript using the LLM instruction.');

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
      console.error('  Try a different language with --lang flag');
    } else if (error.name === 'YoutubeTranscriptInvalidVideoIdError') {
      console.error('  Invalid video ID or URL');
    } else {
      console.error(`  ${error.message}`);
    }

    process.exit(1);
  }
}

main();
