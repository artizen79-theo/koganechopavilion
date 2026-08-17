import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const root = process.cwd();

function sipsOptimize(inputPath, outputPath, maxDimension = 1600, quality = 85) {
  try {
    // Convert/resize using sips
    execSync(`sips -Z ${maxDimension} -s format jpeg -s formatOptions ${quality} "${inputPath}" --out "${outputPath}" > /dev/null 2>&1`);
  } catch (err) {
    console.error(`Error optimizing ${inputPath}:`, err.message);
  }
}

// 1. Optimize Artists profile images
console.log("=== 1. Optimizing Artist Profile Images ===");
const artistDir = path.join(root, "images/artists");
if (fs.existsSync(artistDir)) {
  const files = fs.readdirSync(artistDir);
  for (const f of files) {
    if (f.startsWith(".")) continue;
    const fullPath = path.join(artistDir, f);
    if (fs.statSync(fullPath).isFile()) {
      const beforeSize = fs.statSync(fullPath).size;
      sipsOptimize(fullPath, fullPath, 1000, 85);
      const afterSize = fs.statSync(fullPath).size;
      console.log(`Optimized artist: ${f} (${(beforeSize / 1024).toFixed(0)}KB -> ${(afterSize / 1024).toFixed(0)}KB)`);
    }
  }
}

// 2. Optimize Artist Artworks (images/works/*)
console.log("\n=== 2. Optimizing Artwork Images ===");
const worksDir = path.join(root, "images/works");
if (fs.existsSync(worksDir)) {
  const artistWorksFolders = fs.readdirSync(worksDir);
  for (const folder of artistWorksFolders) {
    const artistPath = path.join(worksDir, folder);
    if (fs.statSync(artistPath).isDirectory()) {
      const files = fs.readdirSync(artistPath);
      for (const file of files) {
        if (file.startsWith(".")) continue;
        const filePath = path.join(artistPath, file);
        const beforeSize = fs.statSync(filePath).size;
        const isLarge = file.includes("large");
        sipsOptimize(filePath, filePath, isLarge ? 1600 : 800, isLarge ? 85 : 80);
        const afterSize = fs.statSync(filePath).size;
        console.log(`Optimized artwork [${folder}/${file}]: ${(beforeSize / 1024).toFixed(0)}KB -> ${(afterSize / 1024).toFixed(0)}KB`);
      }
    }
  }
}

// 3. Standardize and Optimize Institution Images
console.log("\n=== 3. Standardizing & Optimizing Institution Images ===");
const instMapping = {
  "koganecho": "001_Koganecho",
  "a4-art-museum": "002_A4 Residency",
  "absolute-space-air": "003_Absolute_Space",
  "vietnam-air-network": "004_AiRViNe",
  "bbongbbong-bridge": "005_Bbongbbong_Bridge",
  "totatoga": "006_TOTATOGA",
  "daegu-art-factory": "007_Daegu_Art_Factory",
  "donggu-house-of-humanities": "008_Donggu_House_of_Humanities",
  "xiamen-university-art": "009_Xiamen_University_Art",
  "yesul-sanghoe": "010_653_Yesul_Sanghoe"
};

const newInstitutionImages = {};

for (const [instId, folderName] of Object.entries(instMapping)) {
  const folderPath = path.join(root, "images/institutions", folderName);
  if (!fs.existsSync(folderPath)) continue;

  const rawFiles = fs.readdirSync(folderPath).filter(f => !f.startsWith("."));
  // Sort stably
  rawFiles.sort((a, b) => a.localeCompare(b, "ko", { numeric: true }));

  const cleanList = [];
  let index = 1;

  for (const rawFile of rawFiles) {
    const rawFilePath = path.join(folderPath, rawFile);
    if (!fs.statSync(rawFilePath).isFile()) continue;

    const numStr = String(index).padStart(2, "0");
    const newThumbName = `${numStr}.jpg`;
    const newLargeName = `${numStr}-large.jpg`;
    const newThumbPath = path.join(folderPath, newThumbName);
    const newLargePath = path.join(folderPath, newLargeName);

    // Create optimized thumb (800px) and large (1600px) in a temp location
    const tempThumb = path.join(folderPath, `temp_thumb_${index}.jpg`);
    const tempLarge = path.join(folderPath, `temp_large_${index}.jpg`);

    sipsOptimize(rawFilePath, tempThumb, 800, 80);
    sipsOptimize(rawFilePath, tempLarge, 1600, 85);

    cleanList.push({
      tempThumb,
      tempLarge,
      finalThumb: newThumbPath,
      finalLarge: newLargePath,
      relThumb: `images/institutions/${folderName}/${newThumbName}`,
      relLarge: `images/institutions/${folderName}/${newLargeName}`,
      origFile: rawFilePath
    });

    index++;
  }

  // Delete old files and rename clean files
  for (const item of cleanList) {
    try { fs.unlinkSync(item.origFile); } catch (_) {}
  }
  for (const item of cleanList) {
    fs.renameSync(item.tempThumb, item.finalThumb);
    fs.renameSync(item.tempLarge, item.finalLarge);
  }

  newInstitutionImages[instId] = cleanList.map(item => ({
    thumb: item.relThumb,
    large: item.relLarge
  }));

  console.log(`Institutions [${instId}]: processed ${cleanList.length} images.`);
}

// 4. Update js/data.js with clean INSTITUTION_IMAGES
console.log("\n=== 4. Updating js/data.js ===");
const dataJsPath = path.join(root, "js/data.js");
let dataJsContent = fs.readFileSync(dataJsPath, "utf-8");

const instImgJson = JSON.stringify(newInstitutionImages, null, 2);
const regex = /const INSTITUTION_IMAGES = \{[\s\S]*?\};/;
if (regex.test(dataJsContent)) {
  dataJsContent = dataJsContent.replace(regex, `const INSTITUTION_IMAGES = ${instImgJson};`);
  fs.writeFileSync(dataJsPath, dataJsContent, "utf-8");
  console.log("✅ js/data.js updated with new clean institution image paths!");
} else {
  console.error("❌ Could not match INSTITUTION_IMAGES in js/data.js");
}

console.log("\n🎉 Image optimization & standardization complete!");
