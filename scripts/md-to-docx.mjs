import fs from "fs";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  TableLayoutType,
  ShadingType,
  convertInchesToTwip,
} from "docx";

const md = fs.readFileSync("FEEDBACK-RESPONSE-FULL.md", "utf-8");
const lines = md.split("\n");

const BLUE = "1F4E79";
const DARK = "2D2D2D";
const GRAY = "555555";
const LIGHT_BG = "F2F7FB";
const WHITE = "FFFFFF";
const HEADER_BG = "D6E4F0";
const BORDER_COLOR = "B4C6E0";

function parseBold(text) {
  const parts = [];
  const regex = /\*\*(.*?)\*\*/g;
  let last = 0;
  let m;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) parts.push({ text: text.slice(last, m.index), bold: false });
    parts.push({ text: m[1], bold: true });
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push({ text: text.slice(last), bold: false });
  return parts;
}

function makeRuns(text, { bold: forceBold = false, color = DARK, size = 22, italic = false } = {}) {
  const parts = parseBold(text);
  return parts.map(
    (p) =>
      new TextRun({
        text: p.text,
        bold: p.bold || forceBold,
        color,
        size,
        font: "Calibri",
        italic,
      })
  );
}

function makeTableBorder(color = BORDER_COLOR) {
  const b = { style: BorderStyle.SINGLE, size: 1, color };
  return { top: b, bottom: b, left: b, right: b, insideHorizontal: b, insideVertical: b };
}

function parseTable(tableLines) {
  const rows = [];
  for (const line of tableLines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("|") && trimmed.includes("---")) continue;
    const cells = trimmed
      .split("|")
      .slice(1, -1)
      .map((c) => c.trim());
    rows.push(cells);
  }
  return rows;
}

function buildTable(rows) {
  if (rows.length === 0) return null;
  const colCount = rows[0].length;
  const isHeader = rows.length > 1;

  const tableRows = rows.map((cells, ri) => {
    const isFirst = ri === 0 && isHeader;
    return new TableRow({
      children: cells.map(
        (cell) =>
          new TableCell({
            children: [
              new Paragraph({
                children: makeRuns(cell, {
                  bold: isFirst,
                  color: isFirst ? BLUE : DARK,
                  size: isFirst ? 20 : 20,
                }),
                spacing: { before: 40, after: 40 },
              }),
            ],
            shading: isFirst
              ? { type: ShadingType.SOLID, color: HEADER_BG }
              : ri % 2 === 0
              ? { type: ShadingType.SOLID, color: LIGHT_BG }
              : { type: ShadingType.SOLID, color: WHITE },
            margins: {
              top: convertInchesToTwip(0.04),
              bottom: convertInchesToTwip(0.04),
              left: convertInchesToTwip(0.08),
              right: convertInchesToTwip(0.08),
            },
          })
      ),
    });
  });

  return new Table({
    rows: tableRows,
    width: { size: 100, type: WidthType.PERCENTAGE },
    layout: TableLayoutType.AUTOFIT,
    borders: makeTableBorder(),
  });
}

const children = [];

children.push(
  new Paragraph({ spacing: { after: 100 } }),
);

let i = 0;
let tableBuffer = [];
let inTable = false;

function flushTable() {
  if (tableBuffer.length > 0) {
    const rows = parseTable(tableBuffer);
    const table = buildTable(rows);
    if (table) {
      children.push(new Paragraph({ spacing: { before: 120 } }));
      children.push(table);
      children.push(new Paragraph({ spacing: { after: 120 } }));
    }
    tableBuffer = [];
  }
  inTable = false;
}

while (i < lines.length) {
  const line = lines[i];
  const trimmed = line.trim();

  if (trimmed.startsWith("|")) {
    inTable = true;
    tableBuffer.push(trimmed);
    i++;
    continue;
  }

  if (inTable) flushTable();

  if (trimmed === "---") {
    children.push(
      new Paragraph({
        spacing: { before: 200, after: 200 },
        border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: BORDER_COLOR, space: 8 } },
      })
    );
    i++;
    continue;
  }

  if (trimmed.startsWith("# ") && !trimmed.startsWith("## ")) {
    const text = trimmed.replace(/^# /, "");
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text, bold: true, color: BLUE, size: 36, font: "Calibri" }),
        ],
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 0, after: 80 },
        alignment: AlignmentType.CENTER,
      })
    );
    i++;
    continue;
  }

  if (trimmed.startsWith("## ") && !trimmed.startsWith("### ")) {
    const text = trimmed.replace(/^## /, "");
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text, bold: true, color: BLUE, size: 28, font: "Calibri" }),
        ],
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 300, after: 100 },
      })
    );
    i++;
    continue;
  }

  if (trimmed.startsWith("### ")) {
    const text = trimmed.replace(/^###+ /, "");
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text, bold: true, color: BLUE, size: 24, font: "Calibri" }),
        ],
        heading: HeadingLevel.HEADING_3,
        spacing: { before: 240, after: 80 },
      })
    );
    i++;
    continue;
  }

  if (trimmed.startsWith("#### ")) {
    const text = trimmed.replace(/^####+ /, "");
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text, bold: true, color: BLUE, size: 22, font: "Calibri" }),
        ],
        heading: HeadingLevel.HEADING_4,
        spacing: { before: 200, after: 60 },
      })
    );
    i++;
    continue;
  }

  if (trimmed.startsWith("- ")) {
    const text = trimmed.replace(/^- /, "");
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: "•  ", bold: true, color: BLUE, size: 22, font: "Calibri" }),
          ...makeRuns(text),
        ],
        spacing: { before: 40, after: 40 },
        indent: { left: convertInchesToTwip(0.3) },
      })
    );
    i++;
    continue;
  }

  if (/^[а-яА-Яa-zA-Z]\.\s/.test(trimmed)) {
    children.push(
      new Paragraph({
        children: makeRuns(trimmed),
        spacing: { before: 40, after: 40 },
        indent: { left: convertInchesToTwip(0.3) },
      })
    );
    i++;
    continue;
  }

  if (trimmed === "") {
    i++;
    continue;
  }

  children.push(
    new Paragraph({
      children: makeRuns(trimmed),
      spacing: { before: 60, after: 60 },
    })
  );
  i++;
}

if (inTable) flushTable();

const doc = new Document({
  sections: [
    {
      properties: {
        page: {
          margin: {
            top: convertInchesToTwip(0.8),
            bottom: convertInchesToTwip(0.8),
            left: convertInchesToTwip(1),
            right: convertInchesToTwip(1),
          },
        },
      },
      children,
    },
  ],
  styles: {
    default: {
      document: {
        run: { font: "Calibri", size: 22, color: DARK },
      },
    },
  },
});

const buffer = await Packer.toBuffer(doc);
const outPath = "FEEDBACK-RESPONSE-FULL.docx";
fs.writeFileSync(outPath, buffer);
console.log(`Created ${outPath} (${(buffer.length / 1024).toFixed(0)} KB)`);
