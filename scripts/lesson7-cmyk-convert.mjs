/**
 * Lesson 7 — Step 1: Convert CMYK images to sRGB JPEG via sharp (before visual review).
 * Usage: node scripts/lesson7-cmyk-convert.mjs
 * Env: EXTRACTED_ROOT — default: a1-files lesson-7 extracted-exercises -images
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";

const DEFAULT_ROOT = String.raw`C:\Users\Work Account\Desktop\CURSOR\a1-files\lessons\lesson-7\extracted-exercises -images`;
const EXTRACTED_ROOT = path.resolve(process.env.EXTRACTED_ROOT || DEFAULT_ROOT);
const IMAGE_EXT = /\.(jpe?g|png|webp|tif|tiff)$/i;

async function convertToSrgbJpeg(input, output) {
  await sharp(input).toColorspace("srgb").jpeg({ quality: 95 }).toFile(output);
}

async function processFile(absPath) {
  let meta;
  try {
    meta = await sharp(absPath).metadata();
  } catch (e) {
    const msg = String(e.message || e);
    if (
      msg.includes("Unsupported color mode") ||
      msg.includes("4 components") ||
      /cmyk/i.test(msg)
    ) {
      const outJpg = absPath.replace(/\.[^.]+$/, ".jpg");
      await convertToSrgbJpeg(absPath, outJpg + ".tmp");
      fs.renameSync(outJpg + ".tmp", outJpg);
      if (outJpg !== absPath) fs.unlinkSync(absPath);
      return "converted_cmyk";
    }
    console.warn("Unreadable:", absPath, msg);
    return "failed";
  }

  const isCmyk = meta.space === "cmyk";
  if (!isCmyk) return "skip";

  const outJpg = absPath.replace(/\.[^.]+$/, ".jpg");
  await convertToSrgbJpeg(absPath, outJpg + ".tmp");
  fs.renameSync(outJpg + ".tmp", outJpg);
  if (outJpg !== absPath) fs.unlinkSync(absPath);
  return "converted_cmyk";
}

async function walk(dir) {
  const out = [];
  if (!fs.existsSync(dir)) {
    console.warn("Missing directory:", dir);
    return out;
  }
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) out.push(...(await walk(p)));
    else if (IMAGE_EXT.test(name)) out.push(p);
  }
  return out;
}

async function main() {
  const files = await walk(EXTRACTED_ROOT);
  console.log("Files:", files.length, "under", EXTRACTED_ROOT);
  const summary = { converted: 0, skip: 0, failed: 0 };
  for (const f of files) {
    const r = await processFile(f);
    if (r === "converted_cmyk") summary.converted++;
    else if (r === "failed") summary.failed++;
    else summary.skip++;
  }
  console.log("Done.", summary);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
