/**
 * Lesson 8 — convert CMYK / unsupported 4-channel images to sRGB JPEG (quality 95) via sharp.
 * Run after placing extracted images under LESSON8_EXTRACTED (default below).
 *
 * Usage:
 *   node scripts/lesson8-convert-cmyk.mjs
 *   LESSON8_EXTRACTED="C:/path/to/extracted-exercises -images" node scripts/lesson8-convert-cmyk.mjs
 *
 * Writes .bak copy next to original, then overwrites the original path with JPEG.
 * For non-JPEG inputs, output is same basename with .jpg extension.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const DEFAULT_EXTRACTED = String.raw`C:\Users\Work Account\Desktop\CURSOR\a1-files\lessons\lesson-8\extracted-exercises -images`;

const ROOT = path.resolve(process.env.LESSON8_EXTRACTED || DEFAULT_EXTRACTED);

const EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff"]);

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (EXT.has(path.extname(name).toLowerCase())) out.push(p);
  }
  return out;
}

async function needsOrFailsRgb(file) {
  try {
    const m = await sharp(file).metadata();
    const space = (m.space || "").toLowerCase();
    if (space === "cmyk") return { convert: true, reason: "metadata.space=cmyk" };
    return { convert: false, reason: "ok" };
  } catch (e) {
    const msg = String(e && e.message ? e.message : e);
    if (/unsupported color mode|4 components|cmyk/i.test(msg)) return { convert: true, reason: msg };
    return { convert: true, reason: `metadata failed: ${msg}` };
  }
}

async function convertToSrgbJpeg(input, output) {
  await sharp(input).toColorspace("srgb").jpeg({ quality: 95 }).toFile(output);
}

async function main() {
  if (!fs.existsSync(ROOT)) {
    console.error("Missing folder:", ROOT);
    process.exit(1);
  }
  const files = walk(ROOT);
  console.log("Files found:", files.length, "under", ROOT);
  let converted = 0;
  let skipped = 0;
  for (const file of files) {
    const { convert, reason } = await needsOrFailsRgb(file);
    if (!convert) {
      skipped++;
      continue;
    }
    console.log("Convert:", path.relative(ROOT, file), "|", reason);
    const ext = path.extname(file).toLowerCase();
    const outPath = ext === ".jpg" || ext === ".jpeg" ? file : file.slice(0, -ext.length) + ".jpg";
    const tmp = outPath + ".tmp.jpg";
    const bak = file + ".bak";
    try {
      if (!fs.existsSync(bak)) fs.copyFileSync(file, bak);
      await convertToSrgbJpeg(file, tmp);
      fs.renameSync(tmp, outPath);
      if (outPath !== file && fs.existsSync(file)) fs.unlinkSync(file);
      converted++;
    } catch (e) {
      if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
      console.error("Failed:", file, e);
    }
  }
  console.log("Done. converted:", converted, "skipped (already ok):", skipped);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
