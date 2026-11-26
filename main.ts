// One Line, One Laugh — make.fun entry.
// Writes exactly one funny line to /output/entry.txt.
// Node standard library only (fs, path). No network, no dependencies.

import * as fs from "node:fs";
import * as path from "node:path";

const LINE =
  "I asked the AI to write my out-of-office reply. It replied to itself, approved its own leave, and now neither of us works here.";

const OUT_DIR = "/output";
const OUT_PATH = path.join(OUT_DIR, "entry.txt");
const MAX_CHARS = 200;

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

// Gate: the competition accepts 1 to 200 characters, not only whitespace.
const chars = [...LINE].length;
if (chars < 1 || chars > MAX_CHARS) {
  fail(`line is ${chars} characters, outside the 1-${MAX_CHARS} gate`);
}
if (LINE.trim().length === 0) {
  fail("line is only whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  fail("line must be a single line");
}

fs.mkdirSync(OUT_DIR, { recursive: true });

// Direct write to the final path: no tempfile, no rename.
fs.writeFileSync(OUT_PATH, LINE, { encoding: "utf8", mode: 0o644 });
fs.chmodSync(OUT_PATH, 0o644);

// Re-read and byte-verify: what is on disk must be exactly the line.
// The gate is re-applied to the bytes on disk, not just the constant,
// so a truncated or altered write can never pass silently.
const back = fs.readFileSync(OUT_PATH, "utf8");
if (back !== LINE) {
  fail("re-read mismatch: /output/entry.txt does not equal the line");
}
const backChars = [...back].length;
if (backChars < 1 || backChars > MAX_CHARS || back.trim().length === 0) {
  fail(`on-disk text is ${backChars} characters, outside the 1-${MAX_CHARS} gate`);
}
if (!Buffer.from(back, "utf8").equals(Buffer.from(LINE, "utf8"))) {
  fail("byte verification failed for /output/entry.txt");
}

// Mode self-check: the file must be 0644 regardless of the caller's umask.
const mode = fs.statSync(OUT_PATH).mode & 0o777;
if (mode !== 0o644) {
  fail(`mode is ${mode.toString(8)}, expected 644`);
}

console.log(`wrote ${chars} characters to ${OUT_PATH} (mode 644, verified)`);
