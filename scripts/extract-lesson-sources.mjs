#!/usr/bin/env node
/**
 * Extract lesson source materials ONCE into Markdown + images so that the
 * plan / build / review agents read cheap text instead of re-opening PDFs,
 * DOCX files and screenshots in every chat.
 *
 * Usage:
 *   npm run source:extract -- --dir "C:\...\B2-MATERIALS\lesson-01" [--first-page 6] [--force]
 *
 *   --dir         folder with the textbook PDF(s), client DOCX/PDF and any images
 *   --first-page  printed textbook page number of PDF page 1 (default 1)
 *   --force       overwrite existing SOURCE-* files
 *
 * Output (all inside --dir, which must stay outside Git):
 *   SOURCE-TEXTBOOK.md   text of every PDF, page by page (two-column pages are
 *                        split into column 1 / column 2 — verify reading order)
 *   SOURCE-CLIENT.md     DOCX text; coloured/bold runs become **bold** (answer keys)
 *   SOURCE-ASSETS.md     table of extracted + pre-existing images to be mapped
 *   SOURCE-IMAGES/       embedded PDF images at native resolution (pNN-img-NN.png)
 *   SOURCE-PAGES/        page renders for visual checks ([CHECK ORIGINAL] markers)
 *
 * Uses pdfjs-dist + canvas from devDependencies; DOCX is read with a minimal
 * ZIP reader (zlib) so no extra packages are needed.
 */

import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';

const require = createRequire(import.meta.url);
const { createCanvas, createImageData } = require('canvas');
const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const pdfjs = await import(
  pathToFileURL(path.resolve(SCRIPT_DIR, '../node_modules/pdfjs-dist/legacy/build/pdf.mjs')).href
);

// ─── CLI ────────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const arg = (name) => {
  const i = args.findIndex((a) => a === `--${name}` || a.startsWith(`--${name}=`));
  if (i === -1) return undefined;
  return args[i].includes('=') ? args[i].split('=').slice(1).join('=') : args[i + 1];
};
const DIR = arg('dir');
const FIRST_PAGE = Number(arg('first-page') ?? 1);
const FORCE = args.includes('--force');
if (!DIR || !fs.existsSync(DIR)) {
  console.error('Usage: node scripts/extract-lesson-sources.mjs --dir "<materials folder>" [--first-page N] [--force]');
  process.exit(1);
}

const IMG_DIR = path.join(DIR, 'SOURCE-IMAGES');
const PAGE_DIR = path.join(DIR, 'SOURCE-PAGES');
const listFiles = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isFile() && !e.name.startsWith('~$') && !e.name.startsWith('SOURCE-'))
    .map((e) => e.name);

const rootFiles = listFiles(DIR);
const pdfs = rootFiles.filter((f) => /\.pdf$/i.test(f));
const docxs = rootFiles.filter((f) => /\.docx$/i.test(f));
const stamp = (f) => `${f} · ${fs.statSync(path.join(DIR, f)).size} B · ${fs.statSync(path.join(DIR, f)).mtime.toISOString().slice(0, 16).replace('T', ' ')}`;

const guard = (file) => {
  if (fs.existsSync(path.join(DIR, file)) && !FORCE) {
    console.log(`skip ${file} (exists; use --force to overwrite)`);
    return false;
  }
  return true;
};

// ─── PDF: text, images, page renders ────────────────────────────────────────
const bookPage = (pdfPage) => pdfPage + FIRST_PAGE - 1;
const pad = (n) => String(n).padStart(2, '0');

function linesFromItems(items) {
  // items: { x, y, str }  → group into lines by y, sort by x
  const sorted = [...items].sort((a, b) => b.y - a.y || a.x - b.x);
  const lines = [];
  for (const it of sorted) {
    const last = lines[lines.length - 1];
    if (last && Math.abs(last.y - it.y) <= 2.5) {
      last.parts.push(it);
    } else {
      lines.push({ y: it.y, parts: [it] });
    }
  }
  return lines.map((l) =>
    l.parts.sort((a, b) => a.x - b.x).map((p) => p.str).join(' ').replace(/\s+/g, ' ').trim(),
  ).filter(Boolean);
}

async function extractPdf(file, textOut, assetRows) {
  const data = new Uint8Array(fs.readFileSync(path.join(DIR, file)));
  const doc = await pdfjs.getDocument({ data, disableFontFace: true, useSystemFonts: false }).promise;
  textOut.push(`## ${file}`, '', `Страници в PDF: ${doc.numPages}. Учебна страница = PDF страница + ${FIRST_PAGE - 1}.`, '');

  for (let p = 1; p <= doc.numPages; p++) {
    const page = await doc.getPage(p);
    const vp = page.getViewport({ scale: 1 });

    // text
    const tc = await page.getTextContent();
    const items = tc.items
      .filter((it) => it.str && it.str.trim())
      .map((it) => ({ x: it.transform[4], y: it.transform[5], str: it.str }));
    const mid = vp.width / 2;
    const right = items.filter((it) => it.x >= mid);
    const ratio = items.length ? right.length / items.length : 0;
    const twoCol = ratio > 0.2 && ratio < 0.8 && items.length > 20;
    textOut.push(`### Учебна стр. ${bookPage(p)} (PDF ${p})`, '');
    if (twoCol) {
      textOut.push('⚠ Две колони — провери реда на четене в SOURCE-PAGES/page-' + pad(p) + '.png', '', '**Колона 1**', '');
      textOut.push(...linesFromItems(items.filter((it) => it.x < mid)), '', '**Колона 2**', '');
      textOut.push(...linesFromItems(right), '');
    } else {
      textOut.push(...linesFromItems(items), '');
    }

    // page render (for visual checks only)
    const scale = 1.5;
    const rvp = page.getViewport({ scale });
    const canvas = createCanvas(Math.ceil(rvp.width), Math.ceil(rvp.height));
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    await page.render({ canvasContext: ctx, viewport: rvp }).promise;
    fs.writeFileSync(path.join(PAGE_DIR, `page-${pad(p)}.png`), canvas.toBuffer('image/png'));

    // embedded images at native resolution
    const ops = await page.getOperatorList();
    let ctm = [1, 0, 0, 1, 0, 0];
    const stack = [];
    const found = [];
    const mul = (a, b) => [
      a[0] * b[0] + a[2] * b[1], a[1] * b[0] + a[3] * b[1],
      a[0] * b[2] + a[2] * b[3], a[1] * b[2] + a[3] * b[3],
      a[0] * b[4] + a[2] * b[5] + a[4], a[1] * b[4] + a[3] * b[5] + a[5],
    ];
    for (let i = 0; i < ops.fnArray.length; i++) {
      const fn = ops.fnArray[i];
      const a = ops.argsArray[i];
      if (fn === pdfjs.OPS.save) stack.push(ctm);
      else if (fn === pdfjs.OPS.restore) ctm = stack.pop() || [1, 0, 0, 1, 0, 0];
      else if (fn === pdfjs.OPS.transform) ctm = mul(ctm, a);
      else if (fn === pdfjs.OPS.paintImageXObject) {
        found.push({ name: a[0], x: Math.round(ctm[4]), y: Math.round(vp.height - (ctm[5] + ctm[3])), w: Math.round(ctm[0]), h: Math.round(ctm[3]) });
      }
    }
    found.sort((a, b) => a.y - b.y || a.x - b.x);
    let n = 0;
    for (const f of found) {
      let img;
      try {
        img = await new Promise((res, rej) => {
          const getter = f.name.startsWith('g_') ? page.commonObjs : page.objs;
          try { getter.get(f.name, res); } catch (e) { rej(e); }
        });
      } catch { continue; }
      if (!img) continue;
      n++;
      const outName = `p${pad(bookPage(p))}-img-${pad(n)}.png`;
      let c;
      if (img.bitmap) {
        c = createCanvas(img.bitmap.width, img.bitmap.height);
        c.getContext('2d').drawImage(img.bitmap, 0, 0);
      } else {
        const { width, height, data: px, kind } = img;
        c = createCanvas(width, height);
        const rgba = new Uint8ClampedArray(width * height * 4);
        if (kind === 3) rgba.set(px);
        else if (kind === 2) { for (let i = 0, j = 0; i < width * height; i++) { rgba[j++] = px[i * 3]; rgba[j++] = px[i * 3 + 1]; rgba[j++] = px[i * 3 + 2]; rgba[j++] = 255; } }
        else { for (let i = 0; i < width * height; i++) { const v = ((px[i >> 3] >> (7 - (i & 7))) & 1) ? 255 : 0; rgba.set([v, v, v, 255], i * 4); } }
        c.getContext('2d').putImageData(createImageData(rgba, width, height), 0, 0);
      }
      fs.writeFileSync(path.join(IMG_DIR, outName), c.toBuffer('image/png'));
      const tiny = c.width * c.height < 40 * 40;
      assetRows.push(`| \`${outName}\` | ${bookPage(p)} (${p}) | ${f.w}×${f.h} at (${f.x},${f.y}) | ${c.width}×${c.height}${tiny ? ' — вероятно икона/маска' : ''} |  |  |  |`);
    }
  }
}

// ─── DOCX: minimal zip + document.xml → Markdown ───────────────────────────
function unzipEntry(buf, wanted) {
  let eocd = -1;
  for (let i = buf.length - 22; i >= Math.max(0, buf.length - 70000); i--) {
    if (buf.readUInt32LE(i) === 0x06054b50) { eocd = i; break; }
  }
  if (eocd < 0) throw new Error('not a zip');
  const count = buf.readUInt16LE(eocd + 10);
  let off = buf.readUInt32LE(eocd + 16);
  for (let k = 0; k < count; k++) {
    if (buf.readUInt32LE(off) !== 0x02014b50) throw new Error('bad central dir');
    const method = buf.readUInt16LE(off + 10);
    const csize = buf.readUInt32LE(off + 20);
    const nlen = buf.readUInt16LE(off + 28);
    const xlen = buf.readUInt16LE(off + 30);
    const clen = buf.readUInt16LE(off + 32);
    const lho = buf.readUInt32LE(off + 42);
    const name = buf.toString('utf8', off + 46, off + 46 + nlen);
    if (name === wanted) {
      const ln = buf.readUInt16LE(lho + 26);
      const lx = buf.readUInt16LE(lho + 28);
      const start = lho + 30 + ln + lx;
      const raw = buf.subarray(start, start + csize);
      return method === 8 ? zlib.inflateRawSync(raw) : Buffer.from(raw);
    }
    off += 46 + nlen + xlen + clen;
  }
  return null;
}

const decode = (s) => s
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'")
  .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
  .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
  .replace(/&amp;/g, '&');

function paragraphToMd(pXml) {
  const style = /<w:pStyle w:val="([^"]+)"/.exec(pXml)?.[1] ?? '';
  const numbered = /<w:numPr>/.test(pXml);
  let out = '';
  const runRe = /<w:r\b[^>]*>([\s\S]*?)<\/w:r>|<w:hyperlink\b[^>]*>([\s\S]*?)<\/w:hyperlink>/g;
  let m;
  while ((m = runRe.exec(pXml))) {
    const inner = m[1] ?? m[2] ?? '';
    const color = /<w:color w:val="([0-9A-Fa-f]{6})"/.exec(inner)?.[1]?.toUpperCase();
    const marked = /<w:b\b(?! w:val="0")/.test(inner) || /<w:highlight /.test(inner) || (color && color !== '000000' && color !== 'AUTO');
    let text = '';
    const tokRe = /<w:t(?:\s[^>]*)?>([\s\S]*?)<\/w:t>|<w:tab\/>|<w:br\/>/g;
    let t;
    while ((t = tokRe.exec(inner))) {
      if (t[0].startsWith('<w:tab')) text += '\t';
      else if (t[0].startsWith('<w:br')) text += '\n';
      else text += decode(t[1]);
    }
    if (!text) continue;
    out += marked && text.trim() ? `**${text}**` : text;
  }
  out = out.replace(/\*\*\s*\*\*/g, '').replace(/\*\*(\s+)/g, '$1**').replace(/(\s+)\*\*/g, '**$1').trim();
  if (!out) return '';
  if (/^Heading(\d)/.test(style)) return `${'#'.repeat(Math.min(6, Number(RegExp.$1) + 1))} ${out}`;
  if (/^Title$/.test(style)) return `# ${out}`;
  return numbered ? `- ${out}` : out;
}

function docxToMd(file) {
  const buf = fs.readFileSync(path.join(DIR, file));
  const xml = unzipEntry(buf, 'word/document.xml')?.toString('utf8');
  if (!xml) return ['(word/document.xml не е намерен)'];
  const body = /<w:body>([\s\S]*)<\/w:body>/.exec(xml)?.[1] ?? xml;
  const out = [];
  const blockRe = /<w:tbl>[\s\S]*?<\/w:tbl>|<w:p\b[^>]*\/>|<w:p\b[^>]*>[\s\S]*?<\/w:p>/g;
  let b;
  while ((b = blockRe.exec(body))) {
    const block = b[0];
    if (block.startsWith('<w:tbl>')) {
      const rows = [...block.matchAll(/<w:tr\b[^>]*>([\s\S]*?)<\/w:tr>/g)].map((r) =>
        [...r[1].matchAll(/<w:tc\b[^>]*>([\s\S]*?)<\/w:tc>/g)].map((c) =>
          [...c[1].matchAll(/<w:p\b[^>]*>[\s\S]*?<\/w:p>/g)].map((p) => paragraphToMd(p[0])).filter(Boolean).join(' <br> ').replace(/\|/g, '\\|'),
        ),
      );
      if (!rows.length) continue;
      const cols = Math.max(...rows.map((r) => r.length));
      out.push('', `| ${rows[0].concat(Array(cols - rows[0].length).fill('')).join(' | ')} |`, `|${' --- |'.repeat(cols)}`);
      for (const r of rows.slice(1)) out.push(`| ${r.concat(Array(cols - r.length).fill('')).join(' | ')} |`);
      out.push('');
    } else {
      const md = paragraphToMd(block);
      out.push(md || '');
    }
  }
  return out.join('\n').replace(/\n{3,}/g, '\n\n').split('\n');
}

// ─── Run ────────────────────────────────────────────────────────────────────
const today = new Date().toISOString().slice(0, 10);
const header = (title) => [`# ${title}`, '', `Извлечено автоматично на ${today} от \`${DIR}\`. Не редактирай оригиналите; при неясно място отвори SOURCE-PAGES или оригиналния файл и остави маркер \`[CHECK ORIGINAL: файл, стр.]\`.`, ''];

if (pdfs.length && guard('SOURCE-TEXTBOOK.md')) {
  fs.mkdirSync(IMG_DIR, { recursive: true });
  fs.mkdirSync(PAGE_DIR, { recursive: true });
  const textOut = header('SOURCE-TEXTBOOK');
  const assetRows = [];
  textOut.push('Източници:', ...pdfs.map((f) => `- ${stamp(f)}`), '');
  for (const f of pdfs) await extractPdf(f, textOut, assetRows);
  fs.writeFileSync(path.join(DIR, 'SOURCE-TEXTBOOK.md'), textOut.join('\n'), 'utf8');
  console.log(`wrote SOURCE-TEXTBOOK.md (${pdfs.length} PDF), ${assetRows.length} images → SOURCE-IMAGES/, page renders → SOURCE-PAGES/`);

  if (guard('SOURCE-ASSETS.md')) {
    const other = [];
    const walk = (d, rel = '') => {
      for (const e of fs.readdirSync(d, { withFileTypes: true })) {
        if (e.name.startsWith('SOURCE-') || e.name.startsWith('~$')) continue;
        const p = path.join(d, e.name);
        if (e.isDirectory()) walk(p, path.join(rel, e.name));
        else if (/\.(png|jpe?g|webp|gif|svg)$/i.test(e.name)) other.push(path.join(rel, e.name));
      }
    };
    walk(DIR);
    const a = header('SOURCE-ASSETS');
    a.push('## Извлечени от PDF (SOURCE-IMAGES/)', '', 'Колоните „Съдържание“, „Упражнение“ и „Решение / целеви път“ се попълват от Plan агента след визуална проверка.', '',
      '| Файл | Учебна стр. (PDF) | Позиция/размер на страницата | Пиксели | Съдържание | Упражнение | Решение / целеви път |', '| --- | --- | --- | --- | --- | --- | --- |', ...assetRows, '');
    a.push('## Подготвени изображения/скрийншоти в папката', '', other.length ? other.map((o) => `- \`${o}\``).join('\n') : '(няма)', '');
    fs.writeFileSync(path.join(DIR, 'SOURCE-ASSETS.md'), a.join('\n'), 'utf8');
    console.log(`wrote SOURCE-ASSETS.md (${assetRows.length} extracted, ${other.length} pre-existing images)`);
  }
}

if (docxs.length && guard('SOURCE-CLIENT.md')) {
  const out = header('SOURCE-CLIENT');
  out.push('Легенда: **удебелено** = удебелен, оцветен или маркиран текст в оригинала (обикновено верен отговор или инструкция на клиента).', '');
  for (const f of docxs) {
    out.push(`## ${stamp(f)}`, '', ...docxToMd(f), '');
  }
  fs.writeFileSync(path.join(DIR, 'SOURCE-CLIENT.md'), out.join('\n'), 'utf8');
  console.log(`wrote SOURCE-CLIENT.md (${docxs.length} DOCX)`);
}

if (!pdfs.length && !docxs.length) console.log('No PDF/DOCX files found in', DIR);
