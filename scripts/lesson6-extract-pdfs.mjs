/**
 * Lesson 6 — Phase 1 (mechanical): PDF extract, split, JPG @300dpi, embedded images.
 * Uses pdf-lib (no qpdf required). Uses Poppler (pdftoppm, pdfimages, pdftotext) when on PATH.
 *
 * Env:
 *   LESSON_ROOT — default: C:\Users\Work Account\Desktop\CURSOR\a1-files\lessons\lesson-6
 *   A1_FILES_ROOT — folder containing A1-MAIN-BOOK.pdf (default: parent of lessons)
 *   MAIN_BOOK, WORKBOOK_PDF, CULTURAL_PDF, DICTIONARY_PDF — override paths
 *   CULTURAL_PAGE_FROM, CULTURAL_PAGE_TO — if set + pdftotext → culturall-lesson-6/cultural-lesson-6.txt
 *   DICT_PAGE_FROM, DICT_PAGE_TO — if set + pdftotext → dictionary/dictionary-english-lesson-6.txt
 */
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { PDFDocument } from "pdf-lib";

const DEFAULT_LESSON =
  process.env.LESSON_ROOT ||
  String.raw`C:\Users\Work Account\Desktop\CURSOR\a1-files\lessons\lesson-6`;

function resolveA1FilesRoot(lessonRoot) {
  if (process.env.A1_FILES_ROOT) return path.resolve(process.env.A1_FILES_ROOT);
  return path.resolve(lessonRoot, "..", "..");
}

function which(cmd) {
  const r = spawnSync(
    process.platform === "win32" ? "where.exe" : "which",
    [cmd],
    { encoding: "utf8" }
  );
  if (r.status !== 0) return null;
  const line = String(r.stdout || "")
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean)[0];
  return line || null;
}

function run(cmd, args, opts = {}) {
  const r = spawnSync(cmd, args, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    ...opts,
  });
  if (r.status !== 0) {
    throw new Error(
      `${cmd} ${args.join(" ")} failed (${r.status}): ${r.stderr || r.stdout || ""}`
    );
  }
  return r.stdout;
}

async function main() {
  const lessonRoot = path.resolve(DEFAULT_LESSON);
  const a1Root = resolveA1FilesRoot(lessonRoot);

  const mainBookPath =
    process.env.MAIN_BOOK || path.join(a1Root, "A1-MAIN-BOOK.pdf");
  const workbookPath =
    process.env.WORKBOOK_PDF || path.join(a1Root, "a1-WORKBOOK-TESTS.pdf");
  const culturalPath =
    process.env.CULTURAL_PDF || path.join(a1Root, "cultural.pdf");
  const dictionaryPath =
    process.env.DICTIONARY_PDF ||
    path.join(a1Root, "dictionary-A1-English.pdf");

  const dirs = [
    path.join(lessonRoot, "whole-lesson-PDF"),
    path.join(lessonRoot, "pages-to-seperate-pdfs"),
    path.join(lessonRoot, "pdf-pages-to-images"),
    path.join(lessonRoot, "extracted-exercises -images"),
    path.join(lessonRoot, "Workbook-Lesson-exercises"),
    path.join(lessonRoot, "culturall-lesson-6"),
    path.join(lessonRoot, "dictionary"),
  ];
  for (const d of dirs) fs.mkdirSync(d, { recursive: true });

  if (!fs.existsSync(mainBookPath)) {
    console.error("Missing main book PDF:", mainBookPath);
    process.exit(1);
  }

  const mainBytes = fs.readFileSync(mainBookPath);
  const mainDoc = await PDFDocument.load(mainBytes);
  const pageCount = mainDoc.getPageCount();
  const firstPage = 56;
  const lastPage = 65;
  const startIdx = firstPage - 1;
  const endIdx = lastPage - 1;
  if (endIdx >= pageCount) {
    console.error(
      `Main book has only ${pageCount} pages; need ${lastPage} (1-based).`
    );
    process.exit(1);
  }

  // 1.1 — Lesson 6 PDF
  const lessonOut = await PDFDocument.create();
  const indices = [];
  for (let i = startIdx; i <= endIdx; i++) indices.push(i);
  const copied = await lessonOut.copyPages(mainDoc, indices);
  copied.forEach((p) => lessonOut.addPage(p));
  const lessonOutPath = path.join(
    lessonRoot,
    "whole-lesson-PDF",
    "Main-Book-Lesson-6.pdf"
  );
  fs.writeFileSync(lessonOutPath, await lessonOut.save());

  // 1.2 — split single-page PDFs
  const lessonPdf = await PDFDocument.load(fs.readFileSync(lessonOutPath));
  const n = lessonPdf.getPageCount();
  const splitDir = path.join(lessonRoot, "pages-to-seperate-pdfs");
  for (let i = 0; i < n; i++) {
    const one = await PDFDocument.create();
    const [p] = await one.copyPages(lessonPdf, [i]);
    one.addPage(p);
    const out = path.join(splitDir, `Main-Book-Lesson-6-${i + 1}.pdf`);
    fs.writeFileSync(out, await one.save());
  }

  const pdftoppm = which("pdftoppm");
  const pdfimages = which("pdfimages");
  const pdftotext = which("pdftotext");

  // 1.3 — full-page JPG 300 DPI
  if (pdftoppm) {
    const imgDir = path.join(lessonRoot, "pdf-pages-to-images");
    const prefix = path.join(imgDir, "A1-MAIN-BOOK-56-65-page");
    run(pdftoppm, [
      "-jpeg",
      "-r",
      "300",
      lessonOutPath,
      prefix,
    ]);
    for (let i = 1; i <= n; i++) {
      const padded = String(i).padStart(2, "0");
      const oldPath = `${prefix}-${padded}.jpg`;
      const newPath = path.join(
        imgDir,
        `A1-MAIN-BOOK-56-65-page-${i}.jpg`
      );
      if (fs.existsSync(oldPath)) {
        if (fs.existsSync(newPath)) fs.unlinkSync(newPath);
        fs.renameSync(oldPath, newPath);
      }
    }
    console.log("1.3 OK: page JPGs in pdf-pages-to-images/");
  } else {
    console.warn(
      "Skip 1.3: pdftoppm not in PATH. Install Poppler (e.g. choco install poppler) and re-run."
    );
  }

  // 1.4 — embedded images per page
  if (pdfimages) {
    const extRoot = path.join(lessonRoot, "extracted-exercises -images");
    const rawDir = path.join(extRoot, "_raw");
    fs.mkdirSync(rawDir, { recursive: true });
    const prefix = path.join(rawDir, "emb");
    try {
      run(pdfimages, ["-j", "-p", lessonOutPath, prefix]);
    } catch (e) {
      console.warn("pdfimages:", e.message);
    }
    const files = fs
      .readdirSync(rawDir)
      .filter((f) => /\.(jpe?g|png|ppm|pbm|pgm)$/i.test(f))
      .sort();
    /** @type {Map<number, string[]>} */
    const byPage = new Map();
    const re = /^emb-(\d+)-(\d+)\./i;
    for (const f of files) {
      const m = f.match(re);
      if (!m) continue;
      const pageNum = parseInt(m[1], 10);
      if (!byPage.has(pageNum)) byPage.set(pageNum, []);
      byPage.get(pageNum).push(f);
    }
    for (const [pageNum, arr] of byPage) {
      arr.sort((a, b) => {
        const ma = a.match(re);
        const mb = b.match(re);
        return parseInt(ma[2], 10) - parseInt(mb[2], 10);
      });
      const folder = path.join(extRoot, `page-${pageNum}`);
      fs.mkdirSync(folder, { recursive: true });
      let k = 1;
      for (const f of arr) {
        const ext = path.extname(f).toLowerCase() || ".jpg";
        const dest = path.join(
          folder,
          `img${String(k).padStart(2, "0")}${ext === ".jpeg" ? ".jpg" : ext}`
        );
        fs.renameSync(path.join(rawDir, f), dest);
        k++;
      }
    }
    fs.rmSync(rawDir, { recursive: true, force: true });
    console.log("1.4 OK: extracted-exercises -images/page-N/");
  } else {
    console.warn(
      "Skip 1.4: pdfimages not in PATH. Install Poppler and re-run."
    );
  }

  // 1.5 Workbook page 17
  if (!fs.existsSync(workbookPath)) {
    console.warn("Skip 1.5: workbook PDF not found:", workbookPath);
  } else {
    const wbBytes = fs.readFileSync(workbookPath);
    const wbDoc = await PDFDocument.load(wbBytes);
    const wbPage = 17;
    if (wbPage - 1 >= wbDoc.getPageCount()) {
      console.warn(
        `Workbook has only ${wbDoc.getPageCount()} pages; cannot take page ${wbPage}.`
      );
    } else {
      const wbOut = await PDFDocument.create();
      const [wp] = await wbOut.copyPages(wbDoc, [wbPage - 1]);
      wbOut.addPage(wp);
      const wbPdfPath = path.join(
        lessonRoot,
        "Workbook-Lesson-exercises",
        "Workbook-Lesson-6-page17.pdf"
      );
      fs.writeFileSync(wbPdfPath, await wbOut.save());
      if (pdftoppm) {
        const wbPrefix = path.join(
          lessonRoot,
          "Workbook-Lesson-exercises",
          "workbook-p17"
        );
        run(pdftoppm, ["-jpeg", "-r", "300", wbPdfPath, wbPrefix]);
        const wbJpg = `${wbPrefix}-01.jpg`;
        const finalWb = path.join(
          lessonRoot,
          "Workbook-Lesson-exercises",
          "workbook-lesson-6-p17.jpg"
        );
        if (fs.existsSync(wbJpg)) {
          if (fs.existsSync(finalWb)) fs.unlinkSync(finalWb);
          fs.renameSync(wbJpg, finalWb);
        }
        console.log("1.5 OK:", wbPdfPath, finalWb);
      }
    }
  }

  // 1.6 cultural (optional)
  const cf = process.env.CULTURAL_PAGE_FROM;
  const ct = process.env.CULTURAL_PAGE_TO;
  if (pdftotext && fs.existsSync(culturalPath) && cf && ct) {
    const outTxt = path.join(
      lessonRoot,
      "culturall-lesson-6",
      "cultural-lesson-6.txt"
    );
    run(pdftotext, [
      "-f",
      String(cf),
      "-l",
      String(ct),
      culturalPath,
      outTxt,
    ]);
    console.log("1.6 OK:", outTxt);
  } else {
    const note = path.join(
      lessonRoot,
      "culturall-lesson-6",
      "README.txt"
    );
    fs.writeFileSync(
      note,
      [
        "За 1.6: задайте страниците за Lesson 6 в cultural PDF и пуснете:",
        "  set CULTURAL_PAGE_FROM=...",
        "  set CULTURAL_PAGE_TO=...",
        "  npm run lesson6:pdf",
        "",
        "Или ръчно: pdftotext -f N -l M cultural.pdf cultural-lesson-6.txt",
        "",
        `Файлът е намерен на: ${culturalPath}`,
      ].join("\r\n"),
      "utf8"
    );
    console.log(
      "1.6: задайте CULTURAL_PAGE_FROM/TO или копирайте текст ръчно → culturall-lesson-6/cultural-lesson-6.txt"
    );
  }

  // 1.7 dictionary (optional)
  const df = process.env.DICT_PAGE_FROM;
  const dt = process.env.DICT_PAGE_TO;
  if (pdftotext && fs.existsSync(dictionaryPath) && df && dt) {
    const outDict = path.join(
      lessonRoot,
      "dictionary",
      "dictionary-english-lesson.txt"
    );
    run(pdftotext, [
      "-f",
      String(df),
      "-l",
      String(dt),
      dictionaryPath,
      outDict,
    ]);
    console.log("1.7 OK:", outDict);
  } else {
    fs.writeFileSync(
      path.join(lessonRoot, "dictionary", "README-dictionary.txt"),
      [
        "За 1.7: отворете dictionary PDF, намерете урок 6 и:",
        "  set DICT_PAGE_FROM=...",
        "  set DICT_PAGE_TO=...",
        "  npm run lesson6:pdf",
        "",
        "Или копирайте в dictionary-english-lesson.txt или dictionary-english-lesson-6.txt",
        "",
        `Файл: ${dictionaryPath}`,
      ].join("\r\n"),
      "utf8"
    );
    console.log(
      "1.7: задайте DICT_PAGE_FROM/TO или копирайте речника ръчно в dictionary/"
    );
  }

  console.log("Done. Main lesson PDF pages:", n, "→", lessonOutPath);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
