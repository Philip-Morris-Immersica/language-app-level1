/**
 * One-off: copy extracted lesson-7 images into images-organized with transliterated names.
 */
import fs from "fs";
import path from "path";

const ROOT = String.raw`C:\Users\Work Account\Desktop\CURSOR\a1-files\lessons\lesson-7`;
const SRC = path.join(ROOT, "extracted-exercises -images");
const DST = path.join(ROOT, "images-organized");

/** @type {Array<{ folder: string; files: [string, string][] }>} */
const MAP = [
  {
    folder: "01-upr-01-pozdravi-pod-kartinki",
    files: [
      ["page-1/img41.jpg", "01-dobro-utro.jpg"],
      ["page-1/img43.jpg", "02-dobru-den.jpg"],
      ["page-1/img47.jpg", "03-dobru-vecher.jpg"],
      ["page-1/img45.jpg", "04-leka-nosht.jpg"],
    ],
  },
  {
    folder: "02-novi-dumi-1-kalendar-dni",
    files: [["page-1/img40.jpg", "01-kalendar-yanuari.jpg"]],
  },
  {
    folder: "07-novi-dumi-3-mesetsi",
    files: [["page-2/mesetsi.JPG", "01-lenta-mesetsi.jpg"]],
  },
  {
    folder: "15-novi-dumi-4-vreme-gradus",
    files: [["page-3/img302.jpg", "01-ikona-magla.jpg"]],
  },
  {
    folder: "17-upr-11-kartinki-vreme",
    files: [
      ["page-3/img316.jpg", "01-slantse-pateka.jpg"],
      ["page-3/img314.jpg", "02-dazhd-vyatur.jpg"],
      ["page-3/img312.jpg", "03-snyag-snezhen-chovek.jpg"],
    ],
  },
  {
    folder: "18-novi-dumi-5-sezoni-darva",
    files: [
      ["page-3/img310.jpg", "01-prolet-darvo.jpg"],
      ["page-3/img308.jpg", "02-lyato-darvo.jpg"],
      ["page-3/img306.jpg", "03-esen-darvo.jpg"],
      ["page-3/img304.jpg", "04-zima-darvo.jpg"],
    ],
  },
  {
    folder: "23-upr-15-gradove-vreme",
    files: [["page-4/wremeto.JPG", "01-tablitsa-gradove.jpg"]],
  },
  {
    folder: "25-gramatika-3-chasovnik",
    files: [
      ["page-5/img69.jpg", "01-dvanadeset-chasa.jpg"],
      ["page-5/img53.jpg", "02-bez-i.jpg"],
      ["page-5/img52.jpg", "03-polovina.jpg"],
      ["page-5/img50.jpg", "04-chetvurt.jpg"],
    ],
  },
  {
    folder: "26-upr-17-napishite-chasa",
    files: [
      ["page-5/img38.jpg", "01-chas-01-55.jpg"],
      ["page-5/img40.jpg", "02-chas-01-50.jpg"],
      ["page-5/img41.jpg", "03-chas-01-45.jpg"],
      ["page-5/img42.jpg", "04-chas-01-40.jpg"],
      ["page-5/img43.jpg", "05-chas-01-35.jpg"],
      ["page-5/img44.jpg", "06-chas-01-30.jpg"],
      ["page-5/img45.jpg", "07-chas-01-25.jpg"],
      ["page-5/img46.jpg", "08-chas-01-20.jpg"],
      ["page-5/img47.jpg", "09-chas-01-15.jpg"],
      ["page-5/img48.jpg", "10-chas-01-10.jpg"],
      ["page-5/img49.jpg", "11-chas-01-05.jpg"],
      ["page-5/img68.jpg", "12-chas-01-00.jpg"],
    ],
  },
  {
    folder: "27-gramatika-4-den-sutrin-obed",
    files: [
      ["page-5/img66.jpg", "01-prez-denya-rabotnik.jpg"],
      ["page-5/img64.jpg", "02-prez-noshta-syam.jpg"],
      ["page-5/img62.jpg", "03-sutrinta-zakuska.jpg"],
      ["page-5/img60.jpg", "04-na-obed-salata.jpg"],
      ["page-5/img58.jpg", "05-vecher-tv.jpg"],
      ["page-5/img56.jpg", "06-den-peyzazh.jpg"],
      ["page-5/img54.jpg", "07-nosht-peyzazh.jpg"],
    ],
  },
  {
    folder: "28-upr-18-narisuvayte-strelki",
    files: [["page-6/22.JPG", "01-chasovnik-bez-strelki.jpg"]],
  },
  {
    folder: "34-gramatika-5-ot-do-predi-sled",
    files: [
      ["page-6/img90.jpg", "01-ot-do-chasove.jpg"],
      ["page-6/img92.jpg", "02-predi-chas.jpg"],
      ["page-6/img93.jpg", "03-sled-chas.jpg"],
    ],
  },
  {
    folder: "38-novi-dumi-6-posoki-svyat",
    files: [],
  },
  {
    folder: "39-upr-26-posoki-kartinki",
    files: [
      ["page-7/img143.jpg", "01-sever-iglu.jpg"],
      ["page-7/img145.jpg", "02-yug-plazh.jpg"],
      ["page-7/img144.jpg", "03-iztok-izgrev.jpg"],
      ["page-7/img141.jpg", "04-zapad-zalez.jpg"],
    ],
  },
  {
    folder: "41-gramatika-6-planina-more",
    files: [
      ["page-7/img139.jpg", "01-planina-zima.jpg"],
      ["page-7/img178.jpg", "02-more-lyato.jpg"],
    ],
  },
  {
    folder: "48-upr-33-vreme-sezoni",
    files: [
      ["page-8/prolet.JPG", "01-prez-proletta.jpg"],
      ["page-8/liato.JPG", "02-prez-lyatoto.jpg"],
      ["page-8/esen.JPG", "03-prez-esenta.jpg"],
      ["page-8/zima.JPG", "04-prez-zimata.jpg"],
    ],
  },
  {
    folder: "49-tekst-ibrahim-vitosha",
    files: [["page-9/img23.jpg", "01-gora-esen.jpg"]],
  },
];

function main() {
  let n = 0;
  for (const block of MAP) {
    const dir = path.join(DST, block.folder);
    fs.mkdirSync(dir, { recursive: true });
    for (const [rel, name] of block.files) {
      const from = path.join(SRC, rel);
      const to = path.join(dir, name);
      if (!fs.existsSync(from)) {
        console.warn("Missing:", from);
        continue;
      }
      fs.copyFileSync(from, to);
      n++;
      console.log(to);
    }
  }
  console.log("Copied", n, "files.");
}

main();
