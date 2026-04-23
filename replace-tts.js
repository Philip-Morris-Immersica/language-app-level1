const fs = require('fs');
const content = fs.readFileSync('src/content/lessons/lesson-05/exercises.ts', 'utf8');

// Add ttsText to Gourko address line
const old1 = "{ text: '\u2014 \u0410\u0437 \u0436\u0438\u0432\u0435\u044f \u0432 \u0421\u043e\u0444\u0438\u044f, \u043d\u0430 \u0443\u043b\u0438\u0446\u0430 \u201e\u0413\u0443\u0440\u043a\u043e\u201c 25.' },";
const new1 = "{ text: '\u2014 \u0410\u0437 \u0436\u0438\u0432\u0435\u044f \u0432 \u0421\u043e\u0444\u0438\u044f, \u043d\u0430 \u0443\u043b\u0438\u0446\u0430 \u201e\u0413\u0443\u0440\u043a\u043e\u201c 25.', ttsText: '\u0410\u0437 \u0436\u0438\u0432\u0435\u044f \u0432 \u0421\u043e\u0444\u0438\u044f, \u043d\u0430 \u0443\u043b\u0438\u0446\u0430 \u0413\u0443\u0440\u043a\u043e \u0434\u0432\u0430\u0439\u0441\u0435\u0442 \u0438 \u043f\u0435\u0442.' },";

console.log('found old1:', content.includes(old1));
const updated = content.replace(old1, new1);
fs.writeFileSync('src/content/lessons/lesson-05/exercises.ts', updated, 'utf8');
console.log('done');
