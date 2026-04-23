const fs = require('fs');
let content = fs.readFileSync('src/content/lessons/lesson-05/exercises.ts', 'utf8');

const oldInstr = 'Прочетете текста.';
const newInstr = 'Изслушайте текста и след това го прочетете сами.';

// Replace in specific exercises: l05-ex-28, l05-ex-32, l05-ex-33
const exerciseIds = ['l05-ex-28', 'l05-ex-32', 'l05-ex-33'];

for (const id of exerciseIds) {
  const idStr = "id: '" + id + "'";
  const idPos = content.indexOf(idStr);
  if (idPos < 0) { console.log('NOT FOUND: ' + id); continue; }
  // Find the instruction line after this id
  const instrLabel = "instruction: '" + oldInstr + "'";
  const instrPos = content.indexOf(instrLabel, idPos);
  if (instrPos < 0) { console.log('INSTR NOT FOUND in ' + id); continue; }
  content = content.slice(0, instrPos) + "instruction: '" + newInstr + "'" + content.slice(instrPos + instrLabel.length);
  console.log('REPLACED: ' + id);
}

fs.writeFileSync('src/content/lessons/lesson-05/exercises.ts', content, 'utf8');
console.log('done');
