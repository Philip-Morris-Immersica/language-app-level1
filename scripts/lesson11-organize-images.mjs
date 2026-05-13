/**
 * Lesson 11 — copy extracted textbook images into images-organized with transliterated names.
 * Source folder name on disk: extracted-exercises -images (space before hyphen).
 *
 * Usage: node scripts/lesson11-organize-images.mjs
 */
import fs from "fs";
import path from "path";

const LESSON_ROOT = String.raw`C:\Users\Work Account\Desktop\CURSOR\a1-files\lessons\lesson-11`;
const SRC_EXTRACTED = path.join(LESSON_ROOT, "extracted-exercises -images");
const DEST_ORG = path.join(LESSON_ROOT, "images-organized");

/** @type {{ folder: string; copies: { dest: string; src: string }[] }[]} */
const PLAN = [
  {
    folder: "01-upr-01-mesetsi-i-dni",
    copies: [
      { dest: "01-yanuari-mesetsi-1-6.jpg", src: "page-1/ianuari.JPG" },
      { dest: "02-mesetsi-7-12.jpg", src: "page-1/12.JPG" },
      { dest: "03-dni-na-sedmitsata.jpg", src: "page-1/22.JPG" },
    ],
  },
  {
    folder: "02-novi-dumi-1-dnevna-rutina",
    copies: [
      { dest: "01-georgi-stane.jpg", src: "page-1/img68.jpg" },
      { dest: "02-stavam-sedem-chasa.jpg", src: "page-1/img77.jpg" },
      { dest: "03-vlezam-v-banya-vrata.jpg", src: "page-1/img75.jpg" },
      { dest: "04-vzemam-dush.jpg", src: "page-1/img74.jpg" },
      { dest: "05-pravya-zakuska.jpg", src: "page-1/img73.jpg" },
      { dest: "06-zakusvam-v-osem-chasa.jpg", src: "page-1/img72.jpg" },
      { dest: "07-gledam-chasovnik-izlizam.jpg", src: "page-1/img64.jpg" },
      { dest: "08-zapochvam-rabota-v-devet.jpg", src: "page-1/img71.jpg" },
      { dest: "09-obyadvam-restorant.jpg", src: "page-1/img70.jpg" },
      { dest: "10-svarshvam-rabota-magazin.jpg", src: "page-1/img67.jpg" },
      { dest: "11-zatvaryam-magazin.jpg", src: "page-1/img66.jpg" },
      { dest: "12-sreshtam-priyateli.jpg", src: "page-1/img65.jpg" },
      { dest: "13-pazaruvam-v-supera.jpg", src: "page-2/img15.jpg" },
      { dest: "14-vrashtam-se-vkushti.jpg", src: "page-2/img23.jpg" },
      { dest: "15-vecheryam-sandvich-chay.jpg", src: "page-2/img21.jpg" },
      { dest: "16-gledam-televiziya.jpg", src: "page-2/img20.jpg" },
      { dest: "17-cheta-kniga.jpg", src: "page-2/img14.jpg" },
      { dest: "18-pisha-imeyli-laptop.jpg", src: "page-2/img17.jpg" },
      { dest: "19-lyagam-si-sled-dvadeset-dva.jpg", src: "page-2/img16.jpg" },
      { dest: "20-spya-do-sedem-sutrinta.jpg", src: "page-2/img13.jpg" },
      { dest: "21-ikona-yabalka-dekor.jpg", src: "page-2/img18.jpg" },
    ],
  },
  {
    folder: "03-gramatika-5-vazvratni-glagoli",
    copies: [
      { dest: "01-miya-deteto.jpg", src: "page-6/img37.jpg" },
      { dest: "02-miya-se.jpg", src: "page-6/img39.jpg" },
    ],
  },
  {
    folder: "04-dopalnitelno-uprazhnenie-klas",
    copies: [{ dest: "01-zanimanie-s-uchenitsi.jpg", src: "page-7/img50.jpg" }],
  },
  {
    folder: "05-tekstove-ivan-ivanov-piknik",
    copies: [{ dest: "01-semeen-piknik-navyn.jpg", src: "page-8/img22.jpg" }],
  },
  {
    folder: "06-upr-31-prazkazka-bogdanka",
    copies: [{ dest: "01-bogdanka-nosiya-metla.jpg", src: "page-9/img21 (1).jpg" }],
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
