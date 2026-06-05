import fs from 'fs/promises';
import path from 'path';

const SRC = 'D:/CURSOR/A2-files/Lessons/lesson-1/extracted-exercises-images';
const SRGB = 'D:/CURSOR/A2-files/Lessons/lesson-1/extracted-exercises-images-srgb';
const OUT = 'D:/CURSOR/A2-files/Lessons/lesson-1/images-organized';

function src(rel) {
  const srgbPath = path.join(SRGB, rel);
  const normalPath = path.join(SRC, rel);
  return fs.access(srgbPath).then(() => srgbPath).catch(() => normalPath);
}

const plan = [
  {
    folder: '01-upr-01-telefoni',
    files: [
      ['page-1/img71.jpg', '01-telefon.jpg'],
      ['page-1/img75.jpg', '02-mobilen-telefon.jpg'],
      ['page-1/img77.jpg', '03-smartfon.jpg'],
      ['page-1/img73.jpg', '04-sim-karta.jpg'],
    ],
  },
  {
    folder: '02-dialozi-1',
    files: [['page-1/img79.jpg', '01-mazh-dialog.jpg']],
  },
  {
    folder: '03-glagoli-s-preki-dopulnienia',
    files: [
      ['page-3/img58.jpg', '01-gledam-filma.jpg'],
      ['page-3/img56.jpg', '02-vizhdam-momcheto.jpg'],
      ['page-3/img54.jpg', '03-slusham-radioto.jpg'],
      ['page-3/img52.jpg', '04-chuvam-telefona.jpg'],
      ['page-3/img50.jpg', '05-razbiram-uchitelya.jpg'],
      ['page-3/img48.jpg', '06-pitam-uchitelya.jpg'],
      ['page-3/img46.jpg', '07-poznavam-bezhantsite.jpg'],
      ['page-3/img44.jpg', '08-kanyam-decata.jpg'],
      ['page-3/img42.jpg', '09-obicham-tsvetyata.jpg'],
      ['page-3/img40.jpg', '10-haresvam-parka.jpg'],
      ['page-3/img38.jpg', '11-celuvam-bebe.jpg'],
      ['page-3/img36.jpg', '12-pregryashtam-deteto.jpg'],
    ],
  },
  {
    folder: '04-gramatika-2-vinitelni-mestoimenia',
    files: [
      ['page-4/img57.jpg', '01-pomnya-datata.jpg'],
      ['page-4/img55.jpg', '02-zabravyam-klyuchovete.jpg'],
      ['page-4/img53.jpg', '03-tarsya-telefona.jpg'],
      ['page-4/img51.jpg', '04-namiram-telefona.jpg'],
      ['page-4/img49.jpg', '05-iskam-igrachkata.jpg'],
      ['page-4/img47.jpg', '06-chakam-avtobusa.jpg'],
      ['page-4/img45.jpg', '07-vklyuchvam-lampata.jpg'],
      ['page-4/img43.jpg', '08-izklyuchvam-lampata.jpg'],
      ['page-4/img41.jpg', '09-otvaryam-prozoretsa.jpg'],
      ['page-4/img39.jpg', '10-zatvaryam-prozoretsa.jpg'],
      ['page-4/img37.jpg', '11-otklyuchvam-vratata.jpg'],
      ['page-4/img35.jpg', '12-zaklyuchvam-vratata.jpg'],
    ],
  },
  {
    folder: '05-dopalnitelni-upr-14-telefon-dialog',
    files: [['page-6/img59.jpg', '01-telefonen-razgovor.jpg']],
  },
  {
    folder: '06-dopalnitelni-upr-15-margaritka',
    files: [['page-6/img55.jpg', '01-margaritka-obicha-me.jpg']],
  },
  {
    folder: '07-dopalnitelni-upr-16-margaritka-prazna',
    files: [['page-6/img53.jpg', '01-margaritka-prazna.jpg']],
  },
  {
    folder: '08-upr-17-18-telefoni',
    files: [
      ['page-7/img10.jpg', '01-tri-dushi-telefoni.jpg'],
      ['page-7/img12.jpg', '02-biznesmen-kufar.jpg'],
    ],
  },
  {
    folder: '09-tekst-maria',
    files: [['page-8/img22.jpg', '01-maria-telefon.jpg']],
  },
];

for (const { folder, files } of plan) {
  const dir = path.join(OUT, folder);
  await fs.mkdir(dir, { recursive: true });
  for (const [rel, dest] of files) {
    const from = await src(rel);
    await fs.copyFile(from, path.join(dir, dest));
    console.log('OK', folder, dest, '<-', rel);
  }
}

console.log('\nDone:', OUT);
