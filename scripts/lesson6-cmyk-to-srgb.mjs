/**
 * One-off: convert extracted lesson-6 JPEGs from CMYK to sRGB (sharp).
 * Usage: node scripts/lesson6-cmyk-to-srgb.mjs
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT =
  "C:\\Users\\Work Account\\Desktop\\CURSOR\\a1-files\\lessons\\lesson-6\\extracted-exercises -images";

async function walk(dir) {
  const out = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (/\.(jpe?g|jpeg)$/i.test(e.name)) out.push(p);
  }
  return out;
}

async function main() {
  const files = await walk(ROOT);
  console.log(`Found ${files.length} JPEG(s) under ${ROOT}`);
  let ok = 0;
  let err = 0;
  for (const input of files) {
    const tmp = input + ".srgb-tmp.jpg";
    try {
      await sharp(input).toColorspace("srgb").jpeg({ quality: 95 }).toFile(tmp);
      await fs.rename(tmp, input);
      ok++;
      console.log("OK", path.relative(ROOT, input));
    } catch (e) {
      err++;
      console.error("FAIL", path.relative(ROOT, input), e.message);
      try {
        await fs.unlink(tmp);
      } catch {
        /* ignore */
      }
    }
  }
  console.log(`Done: ${ok} converted, ${err} errors`);
  process.exit(err ? 1 : 0);
}

main();
