/**
 * Render Main-Book-Lesson-7.pdf pages to JPEG (for pdf-pages-to-images review).
 * Requires: canvas (npm). No Poppler.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createCanvas } from "canvas";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PDF_PATH =
  process.env.LESSON7_PDF ||
  String.raw`C:\Users\Work Account\Desktop\CURSOR\a1-files\lessons\lesson-7\whole-lesson-PDF\A1-MAIN-BOOK-lesson-7.pdf`;

const OUT_DIR =
  process.env.PDF_PAGES_OUT ||
  String.raw`C:\Users\Work Account\Desktop\CURSOR\a1-files\lessons\lesson-7\pdf-pages-to-images`;

const SCALE = parseFloat(process.env.PDF_RENDER_SCALE || "2", 10);

async function main() {
  const data = new Uint8Array(fs.readFileSync(PDF_PATH));
  const doc = await pdfjsLib.getDocument({ data, useSystemFonts: true }).promise;
  const n = doc.numPages;
  fs.mkdirSync(OUT_DIR, { recursive: true });
  for (let i = 1; i <= n; i++) {
    const page = await doc.getPage(i);
    const viewport = page.getViewport({ scale: SCALE });
    const canvas = createCanvas(viewport.width, viewport.height);
    const ctx = canvas.getContext("2d");
    await page.render({ canvasContext: ctx, viewport }).promise;
    const buf = canvas.toBuffer("image/jpeg", { quality: 0.92 });
    const out = path.join(OUT_DIR, `lesson-7-book-p${String(i).padStart(2, "0")}.jpg`);
    fs.writeFileSync(out, buf);
    console.log("Wrote", out);
  }
  console.log("Done,", n, "pages →", OUT_DIR);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
