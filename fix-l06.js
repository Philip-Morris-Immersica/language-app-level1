const fs = require('fs');
let content = fs.readFileSync('src/content/lessons/lesson-06/exercises.ts', 'utf8');

const oldInstr = "instruction: '\u041f\u0440\u043e\u0447\u0435\u0442\u0435\u0442\u0435 \u0442\u0435\u043a\u0441\u0442\u0430.',";
const newInstr = "instruction: '\u0418\u0437\u0441\u043b\u0443\u0448\u0430\u0439\u0442\u0435 \u0442\u0435\u043a\u0441\u0442\u0430 \u0438 \u0441\u043b\u0435\u0434 \u0442\u043e\u0432\u0430 \u0433\u043e \u043f\u0440\u043e\u0447\u0435\u0442\u0435\u0442\u0435 \u0441\u0430\u043c\u0438.',";
const oldInstr2 = "instruction: '\u041f\u0440\u043e\u0447\u0435\u0442\u0435\u0442\u0435 \u0442\u0435\u043a\u0441\u0442\u043e\u0432\u0435\u0442\u0435.',";
const newInstr2 = "instruction: '\u0418\u0437\u0441\u043b\u0443\u0448\u0430\u0439\u0442\u0435 \u0442\u0435\u043a\u0441\u0442\u043e\u0432\u0435\u0442\u0435 \u0438 \u0441\u043b\u0435\u0434 \u0442\u043e\u0432\u0430 \u0433\u0438 \u043f\u0440\u043e\u0447\u0435\u0442\u0435\u0442\u0435 \u0441\u0430\u043c\u0438.',";

// Only replace for reading_text exercises in lesson 6
// We need to replace all occurrences of 'Прочетете текста.' that are reading_text exercises
let count = 0;
let pos = 0;
while (true) {
  const readingPos = content.indexOf("type: 'reading_text'", pos);
  if (readingPos < 0) break;
  const instrPos = content.indexOf(oldInstr, readingPos);
  const nextTypePos = content.indexOf("type: '", readingPos + 1);
  if (instrPos > 0 && instrPos < nextTypePos) {
    content = content.slice(0, instrPos) + newInstr + content.slice(instrPos + oldInstr.length);
    count++;
  }
  pos = readingPos + 1;
}

// Also fix 'Прочетете текстовете.'
let pos2 = 0;
while (true) {
  const readingPos = content.indexOf("type: 'reading_text'", pos2);
  if (readingPos < 0) break;
  const instrPos = content.indexOf(oldInstr2, readingPos);
  const nextTypePos = content.indexOf("type: '", readingPos + 1);
  if (instrPos > 0 && instrPos < nextTypePos) {
    content = content.slice(0, instrPos) + newInstr2 + content.slice(instrPos + oldInstr2.length);
    count++;
  }
  pos2 = readingPos + 1;
}

console.log('Replaced', count, 'instructions');
fs.writeFileSync('src/content/lessons/lesson-06/exercises.ts', content, 'utf8');
console.log('done');
