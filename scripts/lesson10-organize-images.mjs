/**
 * Lesson 10 — copy extracted textbook images into images-organized with transliterated names.
 * Source folder on disk uses literal name: extracted-exercises -images (space before hyphen).
 *
 * Usage: node scripts/lesson10-organize-images.mjs
 */
import fs from "fs";
import path from "path";

const LESSON_ROOT = String.raw`C:\Users\Work Account\Desktop\CURSOR\a1-files\lessons\lesson-10`;
const SRC_EXTRACTED = path.join(LESSON_ROOT, "extracted-exercises -images");
const DEST_ORG = path.join(LESSON_ROOT, "images-organized");

/** @type {{ folder: string; copies: { dest: string; src: string }[] }[]} */
const PLAN = [
  {
    folder: "01-upr-01-sgradi",
    copies: [
      { dest: "01-teatar.jpg", src: "page-1/img59.jpg" },
      { dest: "02-muzej.jpg", src: "page-1/img57.jpg" },
      { dest: "03-obshtina.jpg", src: "page-1/img55.jpg" },
      { dest: "04-uchilishte.jpg", src: "page-1/img53.jpg" },
      { dest: "05-bolnitsa.jpg", src: "page-1/img51.jpg" },
    ],
  },
  {
    folder: "02-novi-dumi-1-transport",
    copies: [
      { dest: "01-avtobus.jpg", src: "page-1/img49.jpg" },
      { dest: "02-tramvay.jpg", src: "page-1/img47.jpg" },
      { dest: "03-troleybus.jpg", src: "page-1/img45.jpg" },
      { dest: "04-taksi.jpg", src: "page-1/img43.jpg" },
      { dest: "05-kola.jpg", src: "page-1/img41.jpg" },
      { dest: "06-spirka.jpg", src: "page-1/img39.jpg" },
      { dest: "07-karta.jpg", src: "page-1/img37.jpg" },
    ],
  },
  {
    folder: "03-novi-dumi-2-avtogara-bagazh",
    copies: [
      { dest: "01-avtogara.jpg", src: "page-3/img103.jpg" },
      { dest: "02-kasa-za-bileti.jpg", src: "page-3/img101.jpg" },
      { dest: "03-sektor.jpg", src: "page-3/img99.jpg" },
      { dest: "04-kufar.jpg", src: "page-3/img97.jpg" },
      { dest: "05-ranitsa.jpg", src: "page-3/img95.jpg" },
    ],
  },
  {
    folder: "04-dialozi-2-patuvane-s-avtobus",
    copies: [
      { dest: "01-bagaj-avtobus.jpg", src: "page-4/img52.jpg" },
      { dest: "02-patnitsi-v-avtobus.jpg", src: "page-4/img48.jpg" },
      { dest: "03-razgovor-v-kafe.jpg", src: "page-4/img50.jpg" },
    ],
  },
  {
    folder: "05-novi-dumi-3-zhelezopat",
    copies: [
      { dest: "01-gara.jpg", src: "page-5/img51.jpg" },
      { dest: "02-kolovoz.jpg", src: "page-5/img49.jpg" },
      { dest: "03-vlak.jpg", src: "page-5/img47.jpg" },
      { dest: "04-vagon.jpg", src: "page-5/img45.jpg" },
    ],
  },
  {
    folder: "06-dialozi-3-gara-vlak",
    copies: [
      { dest: "01-informatsiya-lenta.jpg", src: "page-6/img49.jpg" },
      { dest: "02-patnitsi-v-vlak.jpg", src: "page-6/img51.jpg" },
    ],
  },
  {
    folder: "07-novi-dumi-4-metro-karta-taksi",
    copies: [
      { dest: "01-metro.jpg", src: "page-8/img63.jpg" },
      { dest: "02-metrostantsiya.jpg", src: "page-8/img59.jpg" },
      { dest: "03-kasova-belezhka.jpg", src: "page-8/img61.jpg" },
    ],
  },
  {
    folder: "08-dialozi-4-v-taksito",
    copies: [{ dest: "01-patnik-i-shofyor.jpg", src: "page-8/img65.jpg" }],
  },
  {
    folder: "09-upr-28-metro-shema-sofia",
    copies: [{ dest: "01-generalna-shema-metro-sofia.jpg", src: "page-9/img54.jpg" }],
  },
  {
    folder: "10-novi-dumi-5-samolet-korab",
    copies: [
      { dest: "01-samolet.jpg", src: "page-9/img52.jpg" },
      { dest: "02-korab.jpg", src: "page-9/img44.jpg" },
    ],
  },
  {
    folder: "11-upr-29-transport-thumb",
    copies: [
      { dest: "01-metro-thumb.jpg", src: "page-9/img48.jpg" },
      { dest: "02-samolet-thumb.jpg", src: "page-9/img46.jpg" },
      { dest: "03-korab-thumb.jpg", src: "page-9/img50.jpg" },
      { dest: "04-vlak-thumb.jpg", src: "page-9/img42.jpg" },
      { dest: "05-troleybus-thumb.jpg", src: "page-9/img40.jpg" },
      { dest: "06-avtobus-thumb.jpg", src: "page-9/img38.jpg" },
    ],
  },
  {
    folder: "12-dopalnitelni-upr-30-orlov-most",
    copies: [
      { dest: "01-karta-orlov-most.jpg", src: "page-10/img36.jpg" },
      { dest: "02-narodno-sabranie-snimka.jpg", src: "page-10/img35.jpg" },
    ],
  },
  {
    folder: "13-dopalnitelni-upr-31-lavov-most",
    copies: [{ dest: "01-karta-lavov-most-tsentralna-gara.jpg", src: "page-10/img34.jpg" }],
  },
  {
    folder: "14-tekst-upr-32-razhodka-sofia",
    copies: [
      { dest: "01-katedrala-aleksandar-nevski.jpg", src: "page-11/img23.jpg" },
      { dest: "02-statuya-sveta-sofia.jpg", src: "page-11/img22.jpg" },
    ],
  },
];

function ensureDir(d) {
  fs.mkdirSync(d, { recursive: true });
}

function main() {
  if (!fs.existsSync(SRC_EXTRACTED)) {
    console.error("Missing source:", SRC_EXTRACTED);
    process.exit(1);
  }
  ensureDir(DEST_ORG);

  for (const block of PLAN) {
    const dir = path.join(DEST_ORG, block.folder);
    ensureDir(dir);
    for (const { dest, src } of block.copies) {
      const from = path.join(SRC_EXTRACTED, src);
      const to = path.join(dir, dest);
      if (!fs.existsSync(from)) {
        console.error("Missing source file:", from);
        process.exit(1);
      }
      fs.copyFileSync(from, to);
    }
  }
  console.log("Copied", PLAN.length, "folders into", DEST_ORG);
}

main();
