import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const root = process.cwd();

function sipsCompress(filePath, maxDimension, quality) {
  try {
    execSync(`sips -Z ${maxDimension} -s format jpeg -s formatOptions ${quality} "${filePath}" --out "${filePath}" > /dev/null 2>&1`);
  } catch (err) {
    console.error(`Error compressing ${filePath}:`, err.message);
  }
}

function scanAndCompress(dir) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    if (item.startsWith(".")) continue;
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanAndCompress(fullPath);
    } else if (/\.(jpg|jpeg|png)$/i.test(item)) {
      const isLarge = item.includes("large");
      const isBanner = fullPath.includes("banner");
      const isArtist = fullPath.includes("artists");

      const beforeSize = stat.size;

      if (isBanner) {
        // Banners: Max 1200px, 80% quality
        sipsCompress(fullPath, 1200, 80);
      } else if (isArtist) {
        // Artist profile: Max 600px, 75% quality
        sipsCompress(fullPath, 600, 75);
      } else if (isLarge) {
        // Large Lightbox: Max 1280px, 75% quality (sharp & fast)
        sipsCompress(fullPath, 1280, 75);
      } else {
        // Regular thumbnails: Max 640px, 72% quality (instant mobile loading)
        sipsCompress(fullPath, 640, 72);
      }

      const afterSize = fs.statSync(fullPath).size;
      const reduction = (((beforeSize - afterSize) / beforeSize) * 100).toFixed(0);
      if (beforeSize > 100 * 1024) {
        console.log(`Compressed: ${path.relative(root, fullPath)}: ${(beforeSize / 1024).toFixed(0)}KB -> ${(afterSize / 1024).toFixed(0)}KB (-${reduction}%)`);
      }
    }
  }
}

console.log("=== Starting Deep Image Compression for Fast Mobile Loading ===");
scanAndCompress(path.join(root, "images"));
console.log("=== Compression Complete ===");
