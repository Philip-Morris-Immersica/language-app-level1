/**
 * One-off helper: dump text layer per page from lesson-8 main book PDF (structure discovery).
 * Run: node scripts/lesson8-pdf-outline.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { pathToFileURL } from "node:url";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist/legacy/build/pdf.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, "..");
const workerPath = path.join(
  REPO,
  "node_modules",
  "pdfjs-dist",
  "legacy",
  "build",
  "pdf.worker.mjs"
);
GlobalWorkerOptions.workerSrc = pathToFileURL(workerPath).href;

const pdfPath =
  process.env.LESSON8_PDF ||
  String.raw`C:\Users\Work Account\Desktop\CURSOR\a1-files\lessons\lesson-8\whole-lesson-PDF\A1-MAIN-BOOK-lesson-8.pdf`;

async function main() {
  const buf = fs.readFileSync(pdfPath);
  const pdf = await getDocument({ data: new Uint8Array(buf) }).promise;
  console.log("pages", pdf.numPages);
  const patterns = [
    [/Упр\.\s*\d+/gi, "upr"],
    [/УПР\.\s*\d+/gi, "upr_caps"],
    [/НОВИ\s+ДУМИ\s*\d*/gi, "novi_dumi"],
    [/ГРАМАТИКА\s*\d*/gi, "gramatika"],
    [/Диалог/gi, "dialog"],
    [/Текст/gi, "tekst"],
    [/От\s+първо\s+лице/gi, "parvo_litse"],
    [/Допълнителни\s+упражнения/gi, "dop"],
  ];
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const tc = await page.getTextContent();
    const t = tc.items.map((it) => ("str" in it ? it.str : "")).join(" ");
    const hits = [];
    for (const [re] of patterns) {
      const m = t.match(re);
      if (m) hits.push(...m);
    }
    console.log("\n--- page", i, "---");
    console.log(hits.length ? [...new Set(hits)].join(" | ") : "(no known section markers)");
    console.log(t.replace(/\s+/g, " ").slice(0, 2200));
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
