/**
 * Extract plain text per page from Main-Book-Lesson-7.pdf (pdfjs-dist, no Poppler).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PDF_PATH =
  process.env.LESSON7_PDF ||
  String.raw`C:\Users\Work Account\Desktop\CURSOR\a1-files\lessons\lesson-7\whole-lesson-PDF\A1-MAIN-BOOK-lesson-7.pdf`;

async function main() {
  const data = new Uint8Array(fs.readFileSync(PDF_PATH));
  const doc = await pdfjsLib.getDocument({ data, useSystemFonts: true }).promise;
  const n = doc.numPages;
  console.log("Pages:", n, "\n");
  for (let i = 1; i <= n; i++) {
    const page = await doc.getPage(i);
    const tc = await page.getTextContent();
    const lines = tc.items.map((it) => ("str" in it ? it.str : "")).join(" ");
    console.log(`--- Page ${i} ---`);
    console.log(lines.replace(/\s+/g, " ").trim());
    console.log();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
