/**
 * sync-domblocks: a createDOMBlocks helyi buildjének bemásolása a vendor/ mappába.
 *
 * Az oldal nem az npm csomagot használja, hanem a helyi könyvtár (alapból a ../createDOMBlocks) buildjét,
 * hogy `file://` alól és build nélkül is működjön (GitHub Pages). A vendor/ fájlokat verziókezelve tartjuk.
 *
 *   node scripts/sync-domblocks.mjs [--build] [--src <a createDOMBlocks mappája>]
 *
 *   --build   előtte lefuttatja a könyvtárban az `npm run build` parancsot
 *   --src     a könyvtár mappája (alapból: DOMBLOCKS_DIR környezeti változó vagy ../createDOMBlocks)
 */
import { copyFileSync, existsSync, mkdirSync, statSync } from "fs";
import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const srcArg = args.indexOf("--src") >= 0 ? args[args.indexOf("--src") + 1] : undefined;
const SRC = path.resolve(ROOT, srcArg || process.env.DOMBLOCKS_DIR || "../createDOMBlocks");

if (!existsSync(path.join(SRC, "package.json"))) {
  console.error(`Nem találom a createDOMBlocks könyvtárat: ${SRC}\nAdd meg: --src <mappa> vagy DOMBLOCKS_DIR.`);
  process.exit(1);
}
if (args.includes("--build")) {
  console.log(`Build: ${SRC}`);
  execSync("npm run build", { cwd: SRC, stdio: "inherit" });
}

const files = [
  ["dist/index.js", "vendor/createDOMBlocks.js"],
  ["dist/style.css", "vendor/createDOMBlocks.css"],
  ["assets/createDOMBlocks.schema.json", "vendor/createDOMBlocks.schema.json"],
];
mkdirSync(path.join(ROOT, "vendor"), { recursive: true });
for (const [from, to] of files) {
  const src = path.join(SRC, from);
  if (!existsSync(src)) {
    console.error(`Hiányzik: ${src} (futtasd a könyvtárban az npm run build parancsot, vagy használd a --build kapcsolót).`);
    process.exit(1);
  }
  copyFileSync(src, path.join(ROOT, to));
  console.log(`${to}  <-  ${src} (${Math.round(statSync(src).size / 1024)} KB)`);
}
