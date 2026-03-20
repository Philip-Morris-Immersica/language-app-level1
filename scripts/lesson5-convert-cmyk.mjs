/**
 * One-off: convert all extracted lesson-5 images to sRGB JPEG via sharp.
 * Reads from extracted folder, writes to _srgb-sources mirror (preserves originals).
 */
import sharp from "sharp";
import fs from "fs/promises";
import path from "path";

const SRC_ROOT =
  "C:\\Users\\Work Account\\Desktop\\CURSOR\\a1-files\\lessons\\lesson-5\\extracted-exercises -images";
const OUT_ROOT =
  "C:\\Users\\Work Account\\Desktop\\CURSOR\\a1-files\\lessons\\lesson-5\\lesson-5-images-organized\\_srgb-sources";

async function walk(dir, acc = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) await walk(full, acc);
    else if (/\.(jpe?g|png)$/i.test(e.name)) acc.push(full);
  }
  return acc;
}

async function main() {
  const files = await walk(SRC_ROOT);
  const report = [];
  await fs.mkdir(OUT_ROOT, { recursive: true });

  for (const file of files) {
    const rel = path.relative(SRC_ROOT, file);
    const outFile = path.join(OUT_ROOT, rel.replace(/\\/g, path.sep));
    await fs.mkdir(path.dirname(outFile), { recursive: true });

    let meta;
    try {
      meta = await sharp(file).metadata();
    } catch (err) {
      report.push({ rel, error: String(err.message || err) });
      continue;
    }

    const wasCmyk =
      meta.space === "cmyk" ||
      (meta.channels === 4 && meta.space !== "srgb" && meta.hasAlpha !== true);

    try {
      await sharp(file)
        .toColorspace("srgb")
        .jpeg({ quality: 95 })
        .toFile(outFile);
      report.push({ rel, space: meta.space, channels: meta.channels, converted: true, cmyk: wasCmyk });
    } catch (err) {
      report.push({ rel, error: String(err.message || err), space: meta.space });
    }
  }

  console.log(JSON.stringify(report, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
