import fs from 'fs';
import path from 'path';

const dir = 'public/assets/lesson-08/03-novi-dumi-1-tsvetove';
fs.mkdirSync(dir, { recursive: true });

const colors = [
  { name: '01-rozov',    hex: '#E91E8C', stroke: '#C4156F' },
  { name: '02-cherven',  hex: '#D32F2F', stroke: '#B71C1C' },
  { name: '03-zhalt',    hex: '#FDD835', stroke: '#F9A825' },
  { name: '04-oranzhev', hex: '#F57C00', stroke: '#E65100' },
  { name: '05-lilav',    hex: '#7B1FA2', stroke: '#4A148C' },
  { name: '06-sin',      hex: '#1565C0', stroke: '#0D47A1' },
  { name: '07-zelen',    hex: '#2E7D32', stroke: '#1B5E20' },
  { name: '08-kafyav',   hex: '#6D4C41', stroke: '#4E342E' },
  { name: '09-cheren',   hex: '#212121', stroke: '#000000' },
  { name: '10-siv',      hex: '#757575', stroke: '#424242' },
  { name: '11-byal',     hex: '#FAFAFA', stroke: '#BDBDBD' },
];

for (const { name, hex, stroke } of colors) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="140" viewBox="0 0 200 140">
  <rect width="200" height="140" rx="16" ry="16" fill="${hex}" stroke="${stroke}" stroke-width="4"/>
</svg>`;
  fs.writeFileSync(path.join(dir, name + '.svg'), svg, 'utf8');
  console.log('Created:', name + '.svg');
}

console.log(`\nDone — ${colors.length} SVG files in ${dir}`);
