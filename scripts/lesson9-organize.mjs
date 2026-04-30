/**
 * Lesson 9 — Step 4: Copy extracted images to images-organized with transliterated names.
 * Follows the order of elements as they appear in the textbook (pages 82-88).
 * Usage: node scripts/lesson9-organize.mjs
 */
import fs from "fs";
import path from "path";

const ROOT = String.raw`C:\Users\Work Account\Desktop\CURSOR\a1-files\lessons\lesson-9`;
const SRC = path.join(ROOT, "extracted-exercises -images");
const DST = path.join(ROOT, "images-organized");

/** @type {Array<{ folder: string; files: [string, string][] }>} */
const MAP = [
  // ── Page 82 ─────────────────────────────────────────────────────────────
  {
    // Упр. 1 — Напишете думите под картинките (4 картинки: телевизор, блок, компютър, къща)
    folder: "01-upr-01-kashta-blok",
    files: [
      ["page-1/img86.jpg", "01-televizor.jpg"],
      ["page-1/img84.jpg", "02-blok.jpg"],
      ["page-1/img38.jpg", "03-kompyutar.jpg"],
      ["page-1/img82.jpg", "04-kashta.jpg"],
    ],
  },
  {
    // НОВИ ДУМИ 1 — 20 думи за дома (стол → прозорец); студена/топла вода = 2 отделни картинки
    folder: "02-novi-dumi-1-mebeli",
    files: [
      ["page-1/img40.jpg", "01-stol.jpg"],
      ["page-1/img72.jpg", "02-masa.jpg"],
      ["page-1/img56.jpg", "03-shkaf.jpg"],
      ["page-1/img54.jpg", "04-pechka.jpg"],
      ["page-1/img64.jpg", "05-hladilnik.jpg"],
      ["page-1/img80.jpg", "06-peralnya.jpg"],
      ["page-1/img78.jpg", "07-leglo.jpg"],
      ["page-1/img76.jpg", "08-divan.jpg"],
      ["page-1/img66.jpg", "09-spalnya-leglo.jpg"],
      ["page-1/img68.jpg", "10-garderob.jpg"],
      ["page-1/img60.jpg", "11-lampa.jpg"],
      ["page-1/img58.jpg", "12-kilim.jpg"],
      ["page-1/img70.jpg", "13-tsvete.jpg"],
      ["page-1/img74.jpg", "14-vana.jpg"],
      ["page-1/img62.jpg", "15-mivka.jpg"],
      ["page-1/img46.jpg", "16-dush.jpg"],
      ["page-1/img42.jpg", "17-studena-voda.jpg"],
      ["page-1/img44.jpg", "18-topla-voda.jpg"],
      ["page-1/img50.jpg", "19-sapun.jpg"],
      ["page-1/img52.jpg", "20-vrata.jpg"],
      ["page-1/img48.jpg", "21-prozorets.jpg"],
    ],
  },

  // ── Page 83 ─────────────────────────────────────────────────────────────
  {
    // НОВИ ДУМИ 2 + Упр. 2 (напишете номерата) + Упр. 3 (предлози за място)
    // Голямата илюстрация на разрез на къща + схема над/под
    folder: "03-novi-dumi-2-upr-02-03-kashta",
    files: [
      ["page-2/img40.jpg", "01-kashta-razorez.jpg"],
      ["page-2/img38.jpg", "02-nad-pod-diagram.jpg"],
    ],
  },

  // ── Page 84 ─────────────────────────────────────────────────────────────
  {
    // НОВИ ДУМИ 3 — Прибори за хранене (вилица, лъжица, нож, чаша, чиния)
    folder: "04-novi-dumi-3-pribori",
    files: [["page-3/img48.jpg", "01-masa-pribori.jpg"]],
  },
  {
    // Упр. 5 — Дорисувайте картината (план на стая отгоре)
    folder: "05-upr-05-staya-plan",
    files: [["page-3/img46.jpg", "01-prazna-staya.jpg"]],
  },

  // ── Page 85 ─────────────────────────────────────────────────────────────
  {
    // Упр. 9 — Блок с етажи и портрети на хора
    folder: "06-upr-09-etazhi",
    files: [["page-4/img53.jpg", "01-blok-etazhi-hora.jpg"]],
  },
  {
    // Упр. 12 — Сравнете двете къщи (Къща А скъпа, Къща Б евтина)
    folder: "07-upr-12-sravnenie-kashti",
    files: [
      ["page-4/img51.jpg", "01-kashta-b-25000.jpg"],
      ["page-4/img52.jpg", "02-kashta-a-200000.jpg"],
    ],
  },

  // ── Page 86 ─────────────────────────────────────────────────────────────
  {
    // Упр. 13 — Сравнете времето в София и Пловдив (таблица с 4 сезона)
    folder: "08-upr-13-vreme-sofia-plovdiv",
    files: [["page-5/Capture.JPG", "01-vreme-tablitsa.jpg"]],
  },

  // ── Page 87 ─────────────────────────────────────────────────────────────
  {
    // ТЕКСТОВЕ — Упр. 18 „Имам нов апартамент" (снимка на хол)
    folder: "09-tekstove-upr-18-19-hol",
    files: [["page-6/img23.jpg", "01-hol-apartament.jpg"]],
  },

  // ── Page 88 ─────────────────────────────────────────────────────────────
  {
    // Упр. 20-22 — „Къщата на Ани" (снимка на градина с хортензии)
    folder: "10-upr-20-22-kashtata-na-ani",
    files: [["page-7/img19.jpg", "01-gradina-kashta-ani.jpg"]],
  },
];

function main() {
  let copied = 0;
  let missing = 0;

  for (const block of MAP) {
    const dir = path.join(DST, block.folder);
    fs.mkdirSync(dir, { recursive: true });

    for (const [rel, name] of block.files) {
      const from = path.join(SRC, rel);
      const to = path.join(dir, name);
      if (!fs.existsSync(from)) {
        console.warn("⚠  MISSING:", from);
        missing++;
        continue;
      }
      fs.copyFileSync(from, to);
      console.log("✓", path.relative(DST, to));
      copied++;
    }
  }

  console.log(`\nДонe. Копирани: ${copied} файла.${missing ? `  Липсващи: ${missing}` : ""}`);
}

main();
