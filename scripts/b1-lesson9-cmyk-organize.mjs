import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const LESSON = 'C:/Users/Alexandra/Desktop/Client Work/Immersica/UNHCR/B1 Files/Lesson 9';
const SOURCES = [
  path.join(LESSON, 'extracted_exercises_images'),
  path.join(LESSON, 'images_organized'),
];
const CONVERTED = path.join(LESSON, '_cmyk_converted');

async function walk(dir) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const files = [];
    for (const e of entries) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) files.push(...(await walk(p)));
      else if (/\.(jpe?g|png|webp)$/i.test(e.name)) files.push(p);
    }
    return files;
  } catch {
    return [];
  }
}

async function convertFile(file, srcRoot) {
  const rel = path.relative(srcRoot, file);
  const outPath = path.join(CONVERTED, srcRoot.includes('extracted') ? 'extracted' : 'organized', rel);
  await fs.mkdir(path.dirname(outPath), { recursive: true });

  try {
    const meta = await sharp(file).metadata();
    const isCmyk = meta.space === 'cmyk' || (meta.channels === 4 && meta.space !== 'srgb');
    if (isCmyk) {
      await sharp(file).toColorspace('srgb').jpeg({ quality: 95 }).toFile(outPath);
      return { rel, status: 'cmyk_converted', space: meta.space, channels: meta.channels, outPath };
    }
    await fs.copyFile(file, outPath);
    return { rel, status: 'ok_copied', space: meta.space, channels: meta.channels, outPath };
  } catch (err) {
    const msg = err.message || String(err);
    if (msg.includes('Unsupported color mode') || msg.includes('4 components')) {
      await sharp(file).toColorspace('srgb').jpeg({ quality: 95 }).toFile(outPath);
      return { rel, status: 'cmyk_error_path', error: msg, outPath };
    }
    return { rel, status: 'error', error: msg };
  }
}

const allResults = [];
for (const src of SOURCES) {
  const files = await walk(src);
  for (const file of files) {
    allResults.push(await convertFile(file, src));
  }
}

console.log(JSON.stringify(allResults, null, 2));
console.log('\n--- Summary ---');
console.log('Total:', allResults.length);
console.log('CMYK converted:', allResults.filter((r) => r.status.startsWith('cmyk')).length);
console.log('OK copied:', allResults.filter((r) => r.status === 'ok_copied').length);
console.log('Errors:', allResults.filter((r) => r.status === 'error').length);
