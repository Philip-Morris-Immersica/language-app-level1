// Generator for the B1 lesson 11 physical (relief) map of Bulgaria.
//
//   node src/content/b1/lessons/b1-lesson-11/bulgaria-map.gen.mjs
//
// Run from the repo root. Country outlines are downloaded once from geoBoundaries
// into node_modules/.cache/ (already git-ignored) and reused afterwards.
//
// The relief is a stylised hypsometric tint: each mountain range is described by a
// ridge line of [lon, lat, peakElevation, halfWidth] vertices, and every elevation
// band is drawn as a variable-width band along that ridge. A single blur pass
// blends the bands into a continuous relief.
import fs from 'node:fs';
import path from 'node:path';

const REF = 'node_modules/.cache/bg-map-outlines';
const OUT = 'public/assets/b1-lesson-11/bulgaria-map-relief.svg';
const COUNTRIES = ['BGR', 'ROU', 'SRB', 'MKD', 'GRC', 'TUR'];
const GB = 'https://github.com/wmgeolab/geoBoundaries/raw/9469f09/releaseData/gbOpen';

async function ensureOutlines() {
  fs.mkdirSync(REF, { recursive: true });
  for (const c of COUNTRIES) {
    const file = path.join(REF, `hi-${c}.json`);
    if (fs.existsSync(file)) continue;
    const url = `${GB}/${c}/ADM0/geoBoundaries-${c}-ADM0_simplified.geojson`;
    process.stdout.write(`downloading ${c}... `);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${c}: HTTP ${res.status}`);
    fs.writeFileSync(file, Buffer.from(await res.arrayBuffer()));
    console.log('ok');
  }
}
await ensureOutlines();

// ---------------------------------------------------------------- projection
const LON0 = 21.0, LON1 = 29.9, LAT0 = 40.5, LAT1 = 44.9;
const PHI0 = (42.5 * Math.PI) / 180;
const COSP = Math.cos(PHI0);
const W = 1600;
const K = W / ((LON1 - LON0) * COSP);
const H = Math.round((LAT1 - LAT0) * K);

const px = (lon) => (lon - LON0) * COSP * K;
const py = (lat) => (LAT1 - lat) * K;
const r1 = (n) => Math.round(n * 10) / 10;

// ---------------------------------------------------------------- geojson
function readRings(code) {
  const raw = JSON.parse(fs.readFileSync(path.join(REF, `hi-${code}.json`), 'utf8'));
  const rings = [];
  for (const f of raw.features) {
    const g = f.geometry;
    const polys = g.type === 'Polygon' ? [g.coordinates] : g.coordinates;
    for (const poly of polys) for (const ring of poly) rings.push(ring);
  }
  return rings;
}

/** Projects a ring, drops sub-pixel detail and skips islets too small to see. */
function simplifyRing(ring, minStep, minSpan) {
  const p = ring.map(([lon, lat]) => [px(lon), py(lat)]);
  const xs = p.map((q) => q[0]);
  const ys = p.map((q) => q[1]);
  const span = Math.max(Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys));
  if (span < minSpan) return null;
  const out = [p[0]];
  for (let i = 1; i < p.length - 1; i++) {
    const [lx, ly] = out[out.length - 1];
    if (Math.hypot(p[i][0] - lx, p[i][1] - ly) >= minStep) out.push(p[i]);
  }
  out.push(p[p.length - 1]);
  return out.length >= 4 ? out : null;
}

function ringsToPath(rings, { minStep = 2, minSpan = 8 } = {}) {
  let d = '';
  for (const ring of rings) {
    if (ring.length < 4) continue;
    const s = simplifyRing(ring, minStep, minSpan);
    if (!s) continue;
    d += `M${s.map(([x, y]) => `${r1(x)},${r1(y)}`).join('L')}Z`;
  }
  return d;
}

/** Longest contiguous run of ring vertices satisfying `keep` (ring treated as cyclic). */
function ringRun(ring, keep) {
  const n = ring.length;
  let best = [];
  for (let start = 0; start < n; start++) {
    if (keep(ring[start]) && !keep(ring[(start - 1 + n) % n])) {
      const run = [];
      for (let i = 0; i < n; i++) {
        const v = ring[(start + i) % n];
        if (!keep(v)) break;
        run.push(v);
      }
      if (run.length > best.length) best = run;
    }
  }
  return best;
}

// ---------------------------------------------------------------- relief data
// Each massif is a list of chains; each chain is a ridge line of
// [lon, lat, peakElevation(m), halfWidth(degrees)] vertices.
const MASSIFS = [
  // Рило-Родопски масив — широка висока основа под отделните хребети
  [
    [[23.15, 42.25, 1300, 0.34], [23.45, 42.18, 1600, 0.40], [23.55, 41.95, 1500, 0.34],
      [23.48, 41.72, 1500, 0.32], [23.60, 41.52, 1250, 0.28]],
    [[23.90, 41.90, 1400, 0.34], [24.30, 41.72, 1600, 0.38], [24.75, 41.70, 1400, 0.36],
      [25.15, 41.75, 1150, 0.34], [25.60, 41.75, 950, 0.30], [25.95, 41.65, 800, 0.26]],
  ],
  // Стара планина (Балкан) — west to Cape Emine
  [[
    [22.68, 43.40, 2168, 0.30], [22.90, 43.22, 1650, 0.28], [23.05, 42.98, 2016, 0.30],
    [23.35, 42.92, 1700, 0.28], [23.70, 42.88, 1550, 0.28], [24.05, 42.85, 1800, 0.30],
    [24.45, 42.78, 2050, 0.31], [24.92, 42.71, 2376, 0.33], [25.32, 42.76, 1550, 0.30],
    [25.75, 42.80, 1450, 0.27], [26.20, 42.82, 1250, 0.25], [26.70, 42.85, 1150, 0.23],
    [27.20, 42.82, 950, 0.20], [27.65, 42.75, 750, 0.17], [27.92, 42.70, 550, 0.13],
  ]],
  // Предбалкан (foothills north of the Balkan)
  [[
    [22.85, 43.45, 700, 0.20], [23.30, 43.25, 750, 0.20], [23.80, 43.15, 700, 0.20],
    [24.30, 43.10, 650, 0.20], [24.85, 43.02, 700, 0.20], [25.35, 43.05, 750, 0.20],
    [25.85, 43.05, 700, 0.20], [26.35, 43.10, 600, 0.20], [26.90, 43.15, 550, 0.20],
  ]],
  // Средна гора + Сърнена гора
  [[
    [23.55, 42.52, 1250, 0.22], [23.95, 42.55, 1350, 0.22], [24.30, 42.60, 1604, 0.24],
    [24.70, 42.50, 1400, 0.23], [25.10, 42.45, 1050, 0.21], [25.50, 42.42, 950, 0.21],
    [25.95, 42.42, 850, 0.19], [26.35, 42.35, 750, 0.16],
  ]],
  // Витоша / Люлин / Плана / Верила
  [[[23.10, 42.60, 1256, 0.11]], [[23.28, 42.57, 2290, 0.14]], [[23.38, 42.38, 1415, 0.12]], [[23.18, 42.30, 1400, 0.12]]],
  // Рила
  [
    [[23.28, 42.22, 2250, 0.19], [23.45, 42.23, 2650, 0.22], [23.58, 42.18, 2925, 0.25], [23.74, 42.13, 2600, 0.22], [23.88, 42.10, 2200, 0.19]],
    [[23.33, 42.08, 2050, 0.18], [23.55, 42.04, 2350, 0.19], [23.74, 42.13, 2600, 0.22]],
  ],
  // Пирин
  [[
    [23.42, 41.92, 2450, 0.16], [23.40, 41.76, 2914, 0.18], [23.49, 41.64, 2500, 0.16],
    [23.56, 41.52, 1900, 0.14], [23.63, 41.42, 1500, 0.12],
  ]],
  // Славянка / Беласица (южна граница)
  [[[23.15, 41.36, 1900, 0.12]], [[23.78, 41.35, 1800, 0.12]]],
  // Осогово / Влахина / Малешевска (югозапад)
  [[[22.88, 42.22, 1800, 0.18], [22.95, 41.96, 1700, 0.17], [23.05, 41.72, 1600, 0.15]]],
  // Родопи — главен хребет + северни склонове
  [
    [[23.92, 41.96, 1650, 0.23], [24.15, 41.80, 1950, 0.25], [24.35, 41.62, 2191, 0.28],
      [24.62, 41.68, 1850, 0.26], [24.88, 41.58, 1650, 0.25], [25.12, 41.70, 1400, 0.24],
      [25.40, 41.60, 1200, 0.22], [25.68, 41.68, 950, 0.20], [25.98, 41.58, 800, 0.18]],
    [[24.05, 42.06, 1250, 0.18], [24.55, 42.00, 1150, 0.18], [25.05, 41.98, 950, 0.18], [25.55, 41.95, 800, 0.17]],
  ],
  // Сакар / Дервентски възвишения
  [[[26.28, 41.95, 900, 0.11], [26.58, 41.78, 650, 0.11]]],
  // Странджа
  [[[27.30, 42.12, 750, 0.16], [27.70, 42.02, 650, 0.15]]],
  // Дунавска равнина / Лудогорие / Добруджа — широк, много слаб плата wash
  [[
    [23.40, 43.60, 320, 0.45], [24.40, 43.50, 340, 0.45], [25.40, 43.48, 360, 0.45],
    [26.40, 43.55, 380, 0.45], [27.30, 43.70, 400, 0.45], [27.90, 43.60, 380, 0.42],
  ]],
  // Софийско поле (~550 m)
  [[[23.34, 42.71, 640, 0.19], [23.62, 42.60, 620, 0.14]]],
];

// hypsometric ramp, drawn low -> high
const LEVELS = [
  { m: 200, color: '#a8c96c' },
  { m: 400, color: '#d3d178' },
  { m: 600, color: '#e2bd6d' },
  { m: 900, color: '#d9954f' },
  { m: 1300, color: '#c9663c' },
  { m: 1800, color: '#b0472b' },
  { m: 2300, color: '#93321f' },
  { m: 2600, color: '#eae3d5' },
];
const BASE_GREEN = '#83bb6a';

// Exponent < 1 widens the high-elevation bands so summits read as massifs, not lines.
const radAt = (peak, halfWidth, level) => halfWidth * Math.pow(1 - level / peak, 0.6) * K;

function reliefLayer(level) {
  const circles = [];
  const bands = [];
  for (const massif of MASSIFS) {
    for (const chain of massif) {
      const pts = chain.map((v) => ({ x: px(v[0]), y: py(v[1]), r: v[2] > level.m ? radAt(v[2], v[3], level.m) : 0 }));
      for (const p of pts) {
        if (p.r >= 1.5) circles.push(`<circle cx="${r1(p.x)}" cy="${r1(p.y)}" r="${r1(p.r)}"/>`);
      }
      for (let i = 0; i < pts.length - 1; i++) {
        const a = pts[i], b = pts[i + 1];
        const w = 2 * Math.min(a.r, b.r);
        if (w < 3) continue;
        bands.push(`<line x1="${r1(a.x)}" y1="${r1(a.y)}" x2="${r1(b.x)}" y2="${r1(b.y)}" stroke-width="${r1(w)}"/>`);
      }
    }
  }
  return `<g fill="${level.color}">${circles.join('')}</g>`
    + `<g stroke="${level.color}" stroke-linecap="round">${bands.join('')}</g>`;
}

// ---------------------------------------------------------------- rivers
const RIVERS = {
  iskar: [[23.55, 42.10], [23.50, 42.25], [23.45, 42.40], [23.42, 42.55], [23.38, 42.70],
    [23.33, 42.85], [23.35, 42.98], [23.50, 43.10], [23.65, 43.25], [23.85, 43.40],
    [24.05, 43.55], [24.20, 43.65], [24.32, 43.74]],
  maritsa: [[23.60, 42.20], [23.85, 42.25], [24.10, 42.28], [24.35, 42.22], [24.60, 42.18],
    [24.78, 42.13], [25.05, 42.09], [25.35, 42.04], [25.65, 41.97], [25.95, 41.89],
    [26.20, 41.82], [26.38, 41.70]],
  tundzha: [[26.05, 42.62], [26.10, 42.45], [26.20, 42.30], [26.30, 42.10], [26.40, 41.95], [26.37, 41.73]],
  struma: [[23.05, 42.36], [22.98, 42.20], [23.00, 42.05], [23.05, 41.90], [23.10, 41.75],
    [23.15, 41.60], [23.20, 41.45], [23.27, 41.30]],
  mesta: [[23.75, 42.02], [23.72, 41.90], [23.75, 41.75], [23.80, 41.60], [23.85, 41.45], [23.91, 41.29]],
  yantra: [[25.60, 42.72], [25.60, 42.90], [25.62, 43.08], [25.55, 43.25], [25.45, 43.40],
    [25.40, 43.55], [25.38, 43.66]],
  osam: [[24.72, 42.88], [24.68, 43.10], [24.72, 43.30], [24.85, 43.50], [24.90, 43.72]],
  vit: [[24.35, 42.93], [24.30, 43.15], [24.40, 43.35], [24.50, 43.55], [24.57, 43.74]],
  ogosta: [[23.08, 43.20], [23.25, 43.40], [23.45, 43.60], [23.65, 43.75], [23.78, 43.84]],
  kamchia: [[26.85, 42.95], [27.20, 42.95], [27.50, 42.95], [27.80, 42.98], [28.05, 43.03]],
  rusenskiLom: [[25.95, 43.48], [26.00, 43.68], [25.98, 43.86]],
  arda: [[24.90, 41.85], [25.15, 41.75], [25.40, 41.68], [25.70, 41.62], [26.00, 41.55], [26.15, 41.45]],
};

/** Catmull-Rom -> cubic bezier, for smooth natural river courses. */
function smoothPath(pts, projected = false) {
  const p = projected ? pts : pts.map(([lon, lat]) => [px(lon), py(lat)]);
  if (p.length < 3) return `M${p.map(([x, y]) => `${r1(x)},${r1(y)}`).join('L')}`;
  let d = `M${r1(p[0][0])},${r1(p[0][1])}`;
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] ?? p[i];
    const p1 = p[i];
    const p2 = p[i + 1];
    const p3 = p[i + 2] ?? p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${r1(c1[0])},${r1(c1[1])} ${r1(c2[0])},${r1(c2[1])} ${r1(p2[0])},${r1(p2[1])}`;
  }
  return d;
}

// ---------------------------------------------------------------- labels
const COUNTRY_LABELS = [
  { text: 'Румъния', lon: 25.55, lat: 44.58 },
  { text: 'Сърбия', lon: 21.70, lat: 43.35 },
  { text: 'Северна', lon: 21.60, lat: 41.66 },
  { text: 'Македония', lon: 21.60, lat: 41.46 },
  { text: 'Гърция', lon: 23.72, lat: 40.86 },
  { text: 'Турция', lon: 27.72, lat: 41.24 },
];
const SEA_LABELS = [
  { text: 'Черно', lon: 29.20, lat: 43.00 },
  { text: 'море', lon: 29.20, lat: 42.80 },
  { text: 'Егейско море', lon: 25.45, lat: 40.68 },
];

// ---------------------------------------------------------------- assemble
const bgrRings = readRings('BGR');
const bgrPath = ringsToPath(bgrRings, { minStep: 1.6, minSpan: 6 });
const outer = bgrRings.reduce((a, b) => (b.length > a.length ? b : a), bgrRings[0]);
const danube = ringRun(outer, ([lon, lat]) => lat >= 43.58 && lon >= 22.55 && lon <= 27.45);
console.log(`Danube vertices from border: ${danube.length}`);

const neighbours = ['ROU', 'SRB', 'MKD', 'GRC', 'TUR'].map((c) => ringsToPath(readRings(c), { minStep: 3, minSpan: 14 }));
const relief = LEVELS.map(reliefLayer).join('\n    ');
const riverPaths = Object.values(RIVERS).map((pts) => `<path d="${smoothPath(pts)}"/>`).join('');
const danubePath = smoothPath(danube.map(([lon, lat]) => [px(lon), py(lat)]), true);

const FONT = "system-ui,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif";
const sofiaX = r1(px(23.32));
const sofiaY = r1(py(42.70));
const lgW = 264, lgH = 140, lgX = 26, lgY = H - lgH - 26;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Физическа карта на България">
  <defs>
    <filter id="soft" x="-6%" y="-6%" width="112%" height="112%" color-interpolation-filters="sRGB">
      <feGaussianBlur stdDeviation="4"/>
    </filter>
    <clipPath id="bgClip"><path d="${bgrPath}"/></clipPath>
    <linearGradient id="ramp" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${BASE_GREEN}"/>
      <stop offset="0.26" stop-color="#d3d178"/>
      <stop offset="0.5" stop-color="#d9954f"/>
      <stop offset="0.78" stop-color="#b0472b"/>
      <stop offset="1" stop-color="#eae3d5"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="#bcdcef"/>

  <g fill="#e6e8e6" stroke="#e6e8e6" stroke-width="5">
    ${neighbours.map((d) => `<path d="${d}"/>`).join('\n    ')}
  </g>
  <g fill="none" stroke="#c4c8c2" stroke-width="1.8">
    ${neighbours.map((d) => `<path d="${d}"/>`).join('\n    ')}
  </g>

  <g clip-path="url(#bgClip)" filter="url(#soft)">
    <path d="${bgrPath}" fill="${BASE_GREEN}" stroke="${BASE_GREEN}" stroke-width="40"/>
    ${relief}
  </g>

  <g clip-path="url(#bgClip)" fill="none" stroke="#3f8bc9" stroke-width="4.2" stroke-linecap="round" stroke-linejoin="round">
    ${riverPaths}
  </g>

  <path d="${bgrPath}" fill="none" stroke="#6f7369" stroke-width="3.2"/>
  <path d="${danubePath}" fill="none" stroke="#3f8bc9" stroke-width="6" stroke-linecap="round"/>

  <g fill="#12385c" font-family="${FONT}" font-weight="700" font-size="34" text-anchor="middle">
    ${COUNTRY_LABELS.map((l) => `<text x="${r1(px(l.lon))}" y="${r1(py(l.lat))}">${l.text}</text>`).join('\n    ')}
  </g>
  <g fill="#1f6ba8" font-family="${FONT}" font-weight="700" font-size="34" text-anchor="middle">
    ${SEA_LABELS.map((l) => `<text x="${r1(px(l.lon))}" y="${r1(py(l.lat))}">${l.text}</text>`).join('\n    ')}
  </g>

  <g>
    <path d="M${sofiaX} ${sofiaY - 13}l3.9 8.4 9.2 1-6.9 6.3 1.9 9.1-8.1-4.6-8.1 4.6 1.9-9.1-6.9-6.3 9.2-1z" fill="#1a1a1a" stroke="#ffffff" stroke-width="1.6"/>
    <text x="${sofiaX + 20}" y="${sofiaY + 8}" font-family="${FONT}" font-size="30" font-weight="700" fill="#12385c" stroke="#ffffff" stroke-width="4" paint-order="stroke">София</text>
  </g>

  <g>
    <rect x="${lgX}" y="${lgY}" width="${lgW}" height="${lgH}" rx="10" fill="#ffffff" fill-opacity="0.95" stroke="#9aa09a" stroke-width="2"/>
    <text x="${lgX + lgW / 2}" y="${lgY + 34}" text-anchor="middle" font-family="${FONT}" font-size="28" font-weight="700" fill="#12385c">Легенда</text>
    <line x1="${lgX + 20}" y1="${lgY + 48}" x2="${lgX + lgW - 20}" y2="${lgY + 48}" stroke="#c3c8c3" stroke-width="2"/>
    <rect x="${lgX + 20}" y="${lgY + 64}" width="84" height="26" rx="4" fill="url(#ramp)" stroke="#9aa09a" stroke-width="1.4"/>
    <text x="${lgX + 118}" y="${lgY + 85}" font-family="${FONT}" font-size="26" fill="#333333">планини</text>
    <path d="M${lgX + 20} ${lgY + 116}c10-10 20 10 30 0s20 10 30 0s10 5 24 0" fill="none" stroke="#3f8bc9" stroke-width="5.5" stroke-linecap="round"/>
    <text x="${lgX + 118}" y="${lgY + 125}" font-family="${FONT}" font-size="26" fill="#333333">реки</text>
  </g>
</svg>
`;

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, svg, 'utf8');
console.log(`wrote ${OUT} (${W}x${H}, ${(svg.length / 1024).toFixed(1)} kB)`);
