import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const SRC = 'D:/CURSOR/A2-files/Lessons/lesson-0/extracted-exercises-images';
const OUT = 'D:/CURSOR/A2-files/Lessons/lesson-0/extracted-exercises-images-srgb';

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walk(p)));
    else if (/\.(jpe?g|png|webp)$/i.test(e.name)) files.push(p);
  }
  return files;
}

const files = await walk(SRC);
const results = { ok: [], cmyk: [], error: [] };

for (const file of files) {
  const rel = path.relative(SRC, file);
  const outPath = path.join(OUT, rel.replace(/\.png$/i, '.jpg'));
  try {
    const meta = await sharp(file).metadata();
    const isCmyk = meta.space === 'cmyk' || (meta.channels === 4 && meta.space !== 'srgb');
    if (isCmyk) {
      await fs.mkdir(path.dirname(outPath), { recursive: true });
      await sharp(file).toColorspace('srgb').jpeg({ quality: 95 }).toFile(outPath);
      results.cmyk.push({ rel, space: meta.space, channels: meta.channels });
      console.log('CMYK converted:', rel);
    } else {
      results.ok.push({ rel, space: meta.space, channels: meta.channels });
    }
  } catch (err) {
    const msg = err.message || String(err);
    if (msg.includes('Unsupported color mode') || msg.includes('4 components')) {
      try {
        await fs.mkdir(path.dirname(outPath), { recursive: true });
        await sharp(file).toColorspace('srgb').jpeg({ quality: 95 }).toFile(outPath);
        results.cmyk.push({ rel, error: msg });
        console.log('CMYK (error path) converted:', rel);
      } catch (e2) {
        results.error.push({ rel, error: e2.message });
      }
    } else {
      results.error.push({ rel, error: msg });
    }
  }
}

console.log('\n--- Summary ---');
console.log('OK:', results.ok.length);
console.log('CMYK converted:', results.cmyk.length);
console.log('Errors:', results.error.length);
if (results.cmyk.length) console.log('Converted:', results.cmyk.map((x) => x.rel).join(', '));
if (results.error.length) console.log('Failed:', JSON.stringify(results.error, null, 2));
