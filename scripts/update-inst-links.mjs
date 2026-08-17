import fs from "node:fs";

const instLinksData = {
  "koganecho": [
    { type: "website", url: "https://koganecho.net/", label: "koganecho.net" },
    { type: "instagram", url: "https://instagram.com/koganechoamc", label: "@koganechoamc" },
    { type: "instagram", url: "https://instagram.com/koganecho_bazaar", label: "@koganecho_bazaar" }
  ],
  "a4-art-museum": [
    { type: "website", url: "http://www.a4residency.com", label: "a4residency.com" },
    { type: "instagram", url: "https://instagram.com/a4_residency_art_center", label: "@a4_residency_art_center" }
  ],
  "absolute-space-air": [
    { type: "website", url: "https://absoluteartspace.wixsite.com/absolute-art-space", label: "absoluteartspace.wixsite.com" }
  ],
  "vietnam-air-network": [
    { type: "website", url: "https://airvine.info", label: "airvine.info" },
    { type: "facebook", url: "https://facebook.com/airvine.info", label: "facebook.com/airvine.info" },
    { type: "instagram", url: "https://instagram.com/airvine.info", label: "@airvine.info" }
  ],
  "bbongbbong-bridge": [
    { type: "instagram", url: "https://www.instagram.com/spaceppong/", label: "@spaceppong" }
  ],
  "totatoga": [
    { type: "website", url: "https://totatoga.com", label: "totatoga.com" },
    { type: "instagram", url: "https://instagram.com/totatoga.busan", label: "@totatoga.busan" }
  ],
  "daegu-art-factory": [
    { type: "website", url: "https://www.daeguartfactory.kr/", label: "daeguartfactory.kr" },
    { type: "instagram", url: "https://www.instagram.com/dafsym", label: "@dafsym" }
  ],
  "donggu-house-of-humanities": [
    { type: "website", url: "http://www.donggu.kr/homancity", label: "donggu.kr/homancity" },
    { type: "instagram", url: "https://instagram.com/dongu_inmun", label: "@dongu_inmun" },
    { type: "facebook", url: "https://facebook.com/inmundonggu", label: "@inmundonggu" },
    { type: "blog", url: "https://blog.naver.com/donggu_inmunhakdang", label: "blog.naver.com/donggu_inmunhakdang" }
  ],
  "xiamen-university-art": [],
  "yesul-sanghoe": []
};

let dataJs = fs.readFileSync("js/data.js", "utf-8");

for (const [id, links] of Object.entries(instLinksData)) {
  const targetId = `id: "${id}",`;
  if (dataJs.includes(targetId)) {
    // Check if links already exists
    const regex = new RegExp(`(id:\\s*"${id}",[\\s\\S]*?descriptionEn:\\s*\`[\\s\\S]*?\`)(,?\\n\\s*links:\\s*\\[[\\s\\S]*?\\])?`);
    const linksJson = JSON.stringify(links, null, 6).replace(/\n/g, "\n    ");
    dataJs = dataJs.replace(regex, `$1,\n    links: ${linksJson}`);
    console.log(`Updated links for ${id}`);
  }
}

fs.writeFileSync("js/data.js", dataJs, "utf-8");
console.log("Successfully updated all institution links in js/data.js!");
