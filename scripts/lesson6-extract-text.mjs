/**
 * Lesson 6 — extract 1.6 cultural + 1.7 dictionary text from PDFs (pdfjs, no Poppler).
 * Searches page-by-page for lesson 6 boundaries.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { pathToFileURL } from "node:url";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist/legacy/build/pdf.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");

const A1_ROOT = path.resolve(
  process.env.A1_FILES_ROOT ||
    String.raw`C:\Users\Work Account\Desktop\CURSOR\a1-files`
);
const LESSON_ROOT = path.resolve(
  process.env.LESSON_ROOT || path.join(A1_ROOT, "lessons", "lesson-6")
);

const culturalPdf =
  process.env.CULTURAL_PDF || path.join(A1_ROOT, "cultural.pdf");
const dictionaryPdf =
  process.env.DICTIONARY_PDF ||
  path.join(A1_ROOT, "dictionary-A1-English.pdf");

const workerPath = path.join(
  REPO_ROOT,
  "node_modules",
  "pdfjs-dist",
  "legacy",
  "build",
  "pdf.worker.mjs"
);
GlobalWorkerOptions.workerSrc = pathToFileURL(workerPath).href;

async function pageText(pdf, i) {
  const page = await pdf.getPage(i);
  const tc = await page.getTextContent();
  return tc.items.map((it) => ("str" in it ? it.str : "")).join("\n");
}

async function extractBetween(pdfPath, startRe, endRe) {
  const buf = fs.readFileSync(pdfPath);
  const data = new Uint8Array(buf);
  const pdf = await getDocument({ data }).promise;
  const n = pdf.numPages;
  const chunks = [];
  let capturing = false;
  for (let i = 1; i <= n; i++) {
    const t = await pageText(pdf, i);
    if (!capturing) {
      if (startRe.test(t)) {
        capturing = true;
        chunks.push(t);
      }
      continue;
    }
    if (endRe.test(t)) {
      break;
    }
    chunks.push(t);
  }
  return chunks.join("\n\n").replace(/\n{3,}/g, "\n\n").trim();
}

async function main() {
  const cultOut = path.join(
    LESSON_ROOT,
    "culturall-lesson-6",
    "cultural-lesson-6.txt"
  );
  const dictOut = path.join(
    LESSON_ROOT,
    "dictionary",
    "dictionary-english-lesson-6.txt"
  );
  const dictOutAlt = path.join(
    LESSON_ROOT,
    "dictionary",
    "dictionary-english-lesson.txt"
  );
  fs.mkdirSync(path.dirname(cultOut), { recursive: true });
  fs.mkdirSync(path.dirname(dictOut), { recursive: true });

  // cultural.pdf uses English headings like "6. MY FAMILY" (see page headers)
  const startC =
    /Урок\s*6|УРОК\s*6|Урок\s*VI|Lesson\s*6|LESSON\s*6|6\.\s*MY\s+FAMILY|6\.\s*МОЕТО\s+СЕМЕЙСТВО/i;
  const endC =
    /Урок\s*7|УРОК\s*7|Lesson\s*7|LESSON\s*7|7\.\s+[A-ZА-Я]/i;

  if (fs.existsSync(culturalPdf)) {
    const text = await extractBetween(culturalPdf, startC, endC);
    fs.writeFileSync(
      cultOut,
      text || "(no text matched — edit script or copy manually)\n",
      "utf8"
    );
    console.log("1.6 wrote:", cultOut, "chars:", text.length);
  } else {
    console.warn("Missing cultural PDF:", culturalPdf);
  }

  const startD =
    /Урок\s*6|УРОК\s*6|Lesson\s*6|LESSON\s*6|^\s*6\s*[\.\)]/im;
  const endD =
    /Урок\s*7|УРОК\s*7|Lesson\s*7|LESSON\s*7|^\s*7\s*[\.\)]/im;

  if (fs.existsSync(dictionaryPdf)) {
    const text = await extractBetween(dictionaryPdf, startD, endD);
    fs.writeFileSync(
      dictOut,
      text || "(no text matched)\n",
      "utf8"
    );
    fs.writeFileSync(dictOutAlt, text || "(no text matched)\n", "utf8");
    console.log("1.7 wrote:", dictOut, "and", dictOutAlt, "chars:", text.length);
  } else {
    console.warn("Missing dictionary PDF:", dictionaryPdf);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
