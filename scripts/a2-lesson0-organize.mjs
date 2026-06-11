import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const SRC = 'D:/CURSOR/A2-files/Lessons/lesson-0/extracted-exercises-images';
const SRGB = 'D:/CURSOR/A2-files/Lessons/lesson-0/extracted-exercises-images-srgb';
const OUT = 'D:/CURSOR/A2-files/Lessons/lesson-0/images-organized';

const CMYK = new Set([
  'page-1/img39.jpg',
  'page-1/img40.jpg',
  'page-1/img41.jpg',
  'page-1/img44.jpg',
  'page-2/img10.jpg',
  'page-7/img33.jpg',
]);

function resolveSrc(rel) {
  if (CMYK.has(rel)) return path.join(SRGB, rel);
  return path.join(SRC, rel);
}

/** @type {{ folder: string, items: { src: string, dest: string }[] }[]} */
const PLAN = [
  {
    folder: '01-upr-01-pozdravi',
    items: [
      { src: 'page-1/img49.jpg', dest: '01-dobro-utro.jpg' },
      { src: 'page-1/img45.jpg', dest: '02-dobry-den.jpg' },
      { src: 'page-1/img47.jpg', dest: '03-dobry-vecher.jpg' },
      { src: 'page-1/img51.jpg', dest: '04-leka-nosht.jpg' },
    ],
  },
  {
    folder: '02-upr-02-darzhavi-nacionalnosti',
    items: [
      { src: 'page-1/img42.jpg', dest: '01-balgariya.jpg' },
      { src: 'page-1/img41.jpg', dest: '02-siriya.jpg' },
      { src: 'page-1/img40.jpg', dest: '03-irak.jpg' },
      { src: 'page-1/img39.jpg', dest: '04-iran.jpg' },
      { src: 'page-1/img44.jpg', dest: '05-ukrayna.jpg' },
    ],
  },
  {
    folder: '03-upr-04-plodove-zelenchuci',
    items: [
      { src: 'page-2/img89.jpg', dest: '01-yabalka.jpg' },
      { src: 'page-2/img87.jpg', dest: '02-krusha.jpg' },
      { src: 'page-2/img85.jpg', dest: '03-grozde.jpg' },
      { src: 'page-2/img83.jpg', dest: '04-limon.jpg' },
      { src: 'page-2/img81.jpg', dest: '05-portokal.jpg' },
      { src: 'page-2/img79.jpg', dest: '06-dinya.jpg' },
      { src: 'page-2/img77.jpg', dest: '07-domat.jpg' },
      { src: 'page-2/img75.jpg', dest: '08-chushka.jpg' },
      { src: 'page-2/img69.jpg', dest: '09-morkov.jpg' },
      { src: 'page-2/img71.jpg', dest: '10-krastavitsa.jpg' },
      { src: 'page-2/img73.jpg', dest: '11-kartof.jpg' },
      { src: 'page-2/img67.jpg', dest: '12-luk.jpg' },
    ],
  },
  {
    folder: '04-upr-05-hrani-produkti',
    items: [
      { src: 'page-2/img61.jpg', dest: '01-brashno.jpg' },
      { src: 'page-2/img59.jpg', dest: '02-bob.jpg' },
      { src: 'page-2/img63.jpg', dest: '03-oriz.jpg' },
      { src: 'page-2/img65.jpg', dest: '04-leshta.jpg' },
      { src: 'page-2/img57.jpg', dest: '05-biskviti.jpg' },
      { src: 'page-2/img55.jpg', dest: '06-olio.jpg' },
      { src: 'page-2/img53.jpg', dest: '07-riba.jpg' },
      { src: 'page-2/img51.jpg', dest: '08-pile.jpg' },
      { src: 'page-2/img49.jpg', dest: '09-sirene.jpg' },
      { src: 'page-2/img47.jpg', dest: '10-kashkaval.jpg' },
      { src: 'page-2/img45.jpg', dest: '11-pryasno-mlyako.jpg' },
      { src: 'page-2/img43.jpg', dest: '12-kiselo-mlyako.jpg' },
    ],
  },
  {
    folder: '05-upr-06-hrani-napitki',
    items: [
      { src: 'page-2/img27.jpg', dest: '01-salata.jpg' },
      { src: 'page-2/img29.jpg', dest: '02-kyufteta.jpg' },
      { src: 'page-2/img31.jpg', dest: '03-omlet.jpg' },
      { src: 'page-2/img33.jpg', dest: '04-supa.jpg' },
      { src: 'page-2/img25.jpg', dest: '05-pitsa.jpg' },
      { src: 'page-2/img23.jpg', dest: '06-spageti.jpg' },
      { src: 'page-2/img39.jpg', dest: '07-voda.jpg' },
      { src: 'page-2/img35.jpg', dest: '08-kafe.jpg' },
      { src: 'page-2/img41.jpg', dest: '09-chay.jpg' },
      { src: 'page-2/img37.jpg', dest: '10-sok.jpg' },
      { src: 'page-2/img21.jpg', dest: '11-kapuchino.jpg' },
      { src: 'page-2/img10.jpg', dest: '12-kola.jpg' },
    ],
  },
  {
    folder: '06-upr-07-sgradi',
    items: [
      { src: 'page-2/img19.jpg', dest: '01-uchilishte.jpg' },
      { src: 'page-2/img17.jpg', dest: '02-kashta.jpg' },
      { src: 'page-2/img15.jpg', dest: '03-bolnitsa.jpg' },
      { src: 'page-2/img13.jpg', dest: '04-magazin.jpg' },
      { src: 'page-2/img11.jpg', dest: '05-poshta.jpg' },
    ],
  },
  {
    folder: '07-upr-08a-semeystvo-dimitrovi',
    items: [{ src: 'page-3/img11.jpg', dest: '01-semeystvo-dimitrovi.jpg' }],
  },
  {
    folder: '08-upr-10-tsvetove',
    items: [
      { src: 'page-3/Screenshot 2026-06-08 140910.png', dest: '01-zeleno.jpg' },
      { src: 'page-3/Screenshot 2026-06-08 140955.png', dest: '02-cherveno.jpg' },
      { src: 'page-3/Screenshot 2026-06-08 141031.png', dest: '03-sinyo.jpg' },
      { src: 'page-3/Screenshot 2026-06-08 141059.png', dest: '04-zhalto.jpg' },
      { src: 'page-3/Screenshot 2026-06-08 141124.png', dest: '05-cherno.jpg' },
      { src: 'page-3/Screenshot 2026-06-08 141144.png', dest: '06-rozovo.jpg' },
      { src: 'page-3/Screenshot 2026-06-08 141201.png', dest: '07-sivo.jpg' },
      { src: 'page-3/Screenshot 2026-06-08 141215.png', dest: '08-oranzhevo.jpg' },
      { src: 'page-3/Screenshot 2026-06-08 141229.png', dest: '09-kafyavo.jpg' },
      { src: 'page-3/Screenshot 2026-06-08 141246.png', dest: '10-lilavo.jpg' },
    ],
  },
  {
    folder: '09-upr-11-drehi-obuvki',
    items: [
      { src: 'page-4/img68.jpg', dest: '01-roklya.jpg' },
      { src: 'page-4/img54.jpg', dest: '02-pulover.jpg' },
      { src: 'page-4/img58.jpg', dest: '03-pola.jpg' },
      { src: 'page-4/img50.jpg', dest: '04-shorti.jpg' },
      { src: 'page-4/img60.jpg', dest: '05-maratonki.jpg' },
      { src: 'page-4/img66.jpg', dest: '06-danki.jpg' },
      { src: 'page-4/img64.jpg', dest: '07-riza.jpg' },
      { src: 'page-4/img62.jpg', dest: '08-yake.jpg' },
      { src: 'page-4/img52.jpg', dest: '09-pulover-raye.jpg' },
      { src: 'page-4/img56.jpg', dest: '10-obuvki.jpg' },
    ],
  },
  {
    folder: '10-upr-12-meblei-uredi',
    items: [
      { src: 'page-4/img48.jpg', dest: '01-stol.jpg' },
      { src: 'page-4/img44.jpg', dest: '02-leglo.jpg' },
      { src: 'page-4/img42.jpg', dest: '03-divan.jpg' },
      { src: 'page-4/img40.jpg', dest: '04-leglo-dvoyno.jpg' },
      { src: 'page-4/img36.jpg', dest: '05-shkaf.jpg' },
      { src: 'page-4/img46.jpg', dest: '06-peralnya.jpg' },
      { src: 'page-4/img34.jpg', dest: '07-pechka.jpg' },
      { src: 'page-4/img38.jpg', dest: '08-hladilnik.jpg' },
      { src: 'page-4/img32.jpg', dest: '09-televizor.jpg' },
      { src: 'page-4/img30.jpg', dest: '10-kompyutar.jpg' },
    ],
  },
  {
    folder: '11-upr-13-prevozni-sredstva',
    items: [
      { src: 'page-4/img24.jpg', dest: '01-kola.jpg' },
      { src: 'page-4/img28.jpg', dest: '02-avtobus.jpg' },
      { src: 'page-4/img26.jpg', dest: '03-tramvay.jpg' },
      { src: 'page-4/img22.jpg', dest: '04-troleybus.jpg' },
      { src: 'page-4/img20.jpg', dest: '05-vlak.jpg' },
    ],
  },
  {
    folder: '12-upr-14-georgi-rutina',
    items: [
      { src: 'page-4/img19.jpg', dest: '01-stava-8ch.jpg' },
      { src: 'page-4/img18.jpg', dest: '02-dush.jpg' },
      { src: 'page-4/img17.jpg', dest: '03-zakuska.jpg' },
      { src: 'page-4/img16.jpg', dest: '04-restorant.jpg' },
      { src: 'page-4/img15.jpg', dest: '05-priyateli.jpg' },
      { src: 'page-4/img14.jpg', dest: '06-super.jpg' },
      { src: 'page-4/img13.jpg', dest: '07-televiziya.jpg' },
      { src: 'page-4/img12.jpg', dest: '08-imeyli.jpg' },
      { src: 'page-4/img11.jpg', dest: '09-lyaga-sled-23ch.jpg' },
      { src: 'page-4/img10.jpg', dest: '10-spi-do-8ch.jpg' },
    ],
  },
  {
    folder: '13-upr-23a-predlozi-shemi',
    items: [
      { src: 'page-7/img31.jpg', dest: '01-v.jpg' },
      { src: 'page-7/img15.jpg', dest: '02-na.jpg' },
      { src: 'page-7/img21.jpg', dest: '03-do.jpg' },
      { src: 'page-7/img17.jpg', dest: '04-pred.jpg' },
      { src: 'page-7/img19.jpg', dest: '05-zad.jpg' },
      { src: 'page-7/img29.jpg', dest: '06-mezhdu.jpg' },
      { src: 'page-7/img25.jpg', dest: '07-sreshtu.jpg' },
      { src: 'page-7/img23.jpg', dest: '08-blizo-do.jpg' },
      { src: 'page-7/img27.jpg', dest: '09-daleche-ot.jpg' },
      { src: 'page-7/img13.jpg', dest: '10-nad-pod.jpg' },
    ],
  },
  {
    folder: '14-upr-23a-kashta',
    items: [{ src: 'page-7/img33.jpg', dest: '01-kashta-shema.jpg' }],
  },
];

async function copyAsJpeg(srcFile, destFile) {
  await fs.mkdir(path.dirname(destFile), { recursive: true });
  if (/\.png$/i.test(srcFile)) {
    await sharp(srcFile).jpeg({ quality: 95 }).toFile(destFile);
  } else {
    await fs.copyFile(srcFile, destFile);
  }
}

let total = 0;
for (const { folder, items } of PLAN) {
  for (const { src, dest } of items) {
    const srcFile = resolveSrc(src);
    const destFile = path.join(OUT, folder, dest);
    await copyAsJpeg(srcFile, destFile);
    total++;
    console.log(`${folder}/${dest} ← ${src}`);
  }
}
console.log(`\nDone: ${total} files in ${PLAN.length} folders`);
