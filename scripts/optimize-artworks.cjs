#!/usr/bin/env node
/* Generates optimized artwork images (thumb + large) for all artists.
 * Usage: /usr/local/bin/node scripts/optimize-artworks.js
 * Output: images/works/<artist-id>/01.jpg (thumb, max 800px)
 *         images/works/<artist-id>/01-large.jpg (large, max 1920px)
 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const src = fs.readFileSync(path.join(ROOT, 'js/data.js'), 'utf8');
const ARTIST_ARTWORKS = new Function(src + '; return ARTIST_ARTWORKS;')();

const OUT = path.join(ROOT, 'images/works');
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

let okCount = 0, missCount = 0;
const result = {};

function sipsResize(inPath, outPath, maxDim, quality) {
  execFileSync('sips', [
    '-Z', String(maxDim),        // resample so longer edge = maxDim (proportional)
    '-s', 'format', 'jpeg',
    '-s', 'formatOptions', String(quality),
    inPath, '--out', outPath,
  ], { stdio: ['ignore', 'ignore', 'ignore'] });
}

for (const [artistId, list] of Object.entries(ARTIST_ARTWORKS)) {
  const dir = path.join(OUT, artistId);
  fs.mkdirSync(dir, { recursive: true });
  result[artistId] = [];
  list.forEach((origPath, i) => {
    const absIn = path.join(ROOT, origPath);
    const idx = String(i + 1).padStart(2, '0');
    const thumbRel = `images/works/${artistId}/${idx}.jpg`;
    const largeRel = `images/works/${artistId}/${idx}-large.jpg`;
    const thumbAbs = path.join(ROOT, thumbRel);
    const largeAbs = path.join(ROOT, largeRel);
    if (!fs.existsSync(absIn)) {
      console.error(`MISSING: ${origPath}`);
      missCount++;
      return;
    }
    try {
      sipsResize(absIn, thumbAbs, 800, 80);
      sipsResize(absIn, largeAbs, 1920, 82);
      result[artistId].push({ thumb: thumbRel, large: largeRel });
      okCount++;
    } catch (e) {
      console.error(`FAIL ${origPath}: ${e.message}`);
      missCount++;
    }
  });
}

// Write the new ARTIST_ARTWORKS JS object for easy copy into data.js
const jsBody = '{\n' + Object.entries(result).map(([id, arr]) => {
  const items = arr.length
    ? '[\n' + arr.map(o => `      { thumb: "${o.thumb}", large: "${o.large}" }`).join(',\n') + '\n    ]'
    : '[]';
  return `  "${id}": ${items}`;
}).join(',\n') + '\n}';
fs.writeFileSync(path.join(ROOT, 'scripts/_artworks.generated.js'),
  'const ARTIST_ARTWORKS = ' + jsBody + ';\n');

console.log(`\nDone. OK=${okCount} MISSING/FAIL=${missCount}`);
