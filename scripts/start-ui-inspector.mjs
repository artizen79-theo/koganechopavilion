import { spawn } from "node:child_process";
import { PreviewManager } from "/Users/kamc_han/.claude/mcp-servers/UI-Inspector/servers/preview/preview-manager.mjs";
import open from "/Users/kamc_han/.claude/mcp-servers/UI-Inspector/servers/node_modules/open/index.js";

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function checkPortReady(url, timeoutMs = 10000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok || res.status === 200 || res.status === 304 || res.status === 404) {
        return true;
      }
    } catch (_) {}
    await sleep(300);
  }
  return false;
}

async function main() {
  console.log("🚀 Starting Vite Dev Server on port 5173...");
  const vite = spawn("npx", ["vite", "--port", "5173", "--strictPort"], {
    cwd: "/Users/kamc_han/desktop/prpage",
    stdio: "inherit",
  });

  process.on("exit", () => vite.kill());
  process.on("SIGINT", () => {
    vite.kill();
    process.exit(0);
  });
  process.on("SIGTERM", () => {
    vite.kill();
    process.exit(0);
  });

  const ready = await checkPortReady("http://localhost:5173", 10000);
  if (!ready) {
    console.error("Vite server failed to become ready in time.");
    process.exit(1);
  }
  console.log("✅ Vite Dev Server ready at http://localhost:5173");

  console.log("🔗 Attaching UI Inspector proxy...");
  const pm = new PreviewManager();

  try {
    const result = await pm.attachSession({
      url: "http://localhost:5173",
      project_name: "Koganecho Pavilion",
      port: 5180,
    });

    console.log("\n=======================================================");
    console.log(`🎉 UI Inspector Connected Successfully!`);
    console.log(`👉 Inspector Web UI: \x1b[36m${result.preview_url}\x1b[0m`);
    console.log(`   (브라우저에서 이 주소로 접속하시면 인스펙터가 보입니다)`);
    console.log(`👉 Original Vite:    ${result.target_url}`);
    console.log("=======================================================\n");

    try {
      await open(result.preview_url);
    } catch (e) {
      console.log(`Could not automatically open browser: ${e.message}`);
    }
  } catch (err) {
    console.error("Failed to attach UI Inspector:", err);
    process.exit(1);
  }
}

main();
