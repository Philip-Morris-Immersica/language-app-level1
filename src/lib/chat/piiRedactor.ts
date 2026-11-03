// Removes direct identifiers from free chat text before it is stored or sent
// to the AI provider. Covers: emails, IBANs, street addresses with a number,
// document/registration numbers, long numbers (phones, ЕГН/ЛНЧ, ID cards) and
// names introduced with a phrase ("казвам се", "my name is", "меня зовут", …)
// in the platform's languages (bg, en, ru, uk, ar, fa, fr, de).
// It cannot catch every name or indirect detail in free text; the chat notice
// asks users not to share personal data.
//
// Unicode-aware boundaries are used instead of \b, which only knows ASCII
// letters and silently never matches before Cyrillic or Arabic words.

const L = String.raw`\p{L}\p{M}`;
const NB = String.raw`(?<![${L}\p{N}_])`; // not preceded by a letter/digit
const NA = String.raw`(?![${L}\p{N}_])`; // not followed by a letter/digit

const URL_RE = /(https?:\/\/\S+|www\.\S+)/giu;

// Every pattern starts at a boundary and has bounded repeats, so a very long
// word cannot make a regex rescan it from every position.
const EMAIL_RE = new RegExp(
  String.raw`(?<![${L}\p{N}._%+-])[${L}\p{N}._%+-]{1,64}@[${L}\p{N}-]{1,63}(?:\.[${L}\p{N}-]{1,63}){1,5}`,
  'gu',
);

const IBAN_RE = new RegExp(String.raw`${NB}[A-Z]{2}\d{2}(?: ?[A-Z0-9]{4}){3,7}(?: ?[A-Z0-9]{1,4})?${NA}`, 'gu');

// Street markers: redacted together with the street name when a number follows
// in the same clause, so "живея в София" or "ул. Витоша" alone stay untouched.
const STREET_MARKERS = [
  'ул\\.', 'улица', 'бул\\.', 'булевард', 'ж\\.?\\s?к\\.?', 'кв\\.(?!\\s?м)', 'квартал', 'кв-л',
  'вул\\.', 'вулиця', 'просп\\.', 'проспект',
  'str\\.', 'street', 'st\\.', 'blvd\\.?', 'boulevard', 'avenue', 'ave\\.', 'rue', 'straße', 'strasse',
  'شارع', 'خیابان', 'کوچه',
];
// Building / flat markers: only when the number comes right after ("бл. 307",
// "етаж 3"), so "апартамент от 80 кв.м" stays untouched.
const UNIT_MARKERS = [
  'бл\\.', 'блок', 'вх\\.', 'ет\\.', 'етаж', 'ап\\.', 'апартамент', 'дом',
  'apt\\.?', 'apartment', 'flat', 'پلاک',
];
const markerRe = (markers: string[], span: string) =>
  new RegExp(
    String.raw`${NB}(?:${markers.join('|')})(?:(?<=\.)|${NA})${span}\d+[${L}]?${NA}`,
    'giu',
  );
// A full stop ends the street name unless it follows an initial ("ул. Г. С. Раковски 5").
const STREET_RE = markerRe(
  STREET_MARKERS,
  String.raw`(?:[^\n,;!?.]|\.(?!\s)|(?<=${NB}\p{Lu})\.){0,40}?`,
);
const UNIT_RE = markerRe(UNIT_MARKERS, '\\s*(?:№\\s*)?');
const ADDRESS_LABEL_RE = /(?<![\p{L}\p{M}])(?:адрес|address|adresse|адреса|адресою|آدرس|عنوان)\s*:\s*[^\n]{1,80}/giu;

// "№ 123456", "номер на документ: 4567…", "passport no. AB123456"
const DOC_KEYWORD_RE = new RegExp(
  String.raw`${NB}(?:№|no\.|nr\.|номер|number|рег\.\s?№)\s*:?\s*[${L}\p{N}/-]*\d{4,}[${L}\p{N}/-]*`,
  'giu',
);
// Tokens mixing letters with 5+ digits: passports, residence permits, case numbers.
const DOC_TOKEN_RE = new RegExp(
  String.raw`${NB}(?=[${L}\p{N}-]{0,19}[${L}])(?=(?:[${L}-]{0,19}\d){5})[${L}\p{N}][${L}\p{N}-]{4,18}[${L}\p{N}]${NA}`,
  'gu',
);

// Phones, ЕГН/ЛНЧ, ID card numbers: 8+ digits, optionally with separators.
const NUMBER_RE = new RegExp(String.raw`${NB}\+?\d[\d \-().\/]{6,}\d${NA}`, 'gu');
const DATE_RE = /\d{1,2}[./]\d{1,2}[./]\d{2,4}|\d{4}-\d{2}-\d{2}/;
const THOUSANDS_RE = /^\d{1,3}(?: \d{3})+$/; // "1 000 000" is an amount, not a phone

// Phrases that always introduce a name (the next word is redacted whatever its case).
const STRONG_NAME_PHRASES = [
  'казвам се', 'наричам се', 'името ми е', 'фамилията ми е', 'презимето ми е', 'викат ми',
  'my name is', 'my first name is', 'my last name is', 'my surname is', 'my full name is',
  'his name is', 'her name is',
  'меня зовут', 'моё имя', 'мое имя', 'моя фамилия',
  'мене звати', "моє ім'я", 'моє імʼя', 'моє прізвище',
  "je m'appelle", 'je m’appelle', 'mon nom est',
  'ich heiße', 'ich heisse', 'mein name ist',
  'اسمي', 'إسمي', 'اسم من', 'نام من',
];
// Phrases that introduce a name only when a capitalised word follows ("аз съм Иван",
// but not "аз съм от Сирия", "I am Syrian" or the learner's "Как се казва това?").
const WEAK_NAME_PHRASES = [
  'аз съм', 'се казва', 'казва се', 'зовут', 'звати',
  'i am', "i'm", 'i’m', 'я', 'je suis', 'ich bin',
];
const NOT_NAMES = new Set([
  'syrian', 'ukrainian', 'afghan', 'iraqi', 'iranian', 'turkish', 'kurdish', 'palestinian',
  'moroccan', 'algerian', 'pakistani', 'bangladeshi', 'russian', 'belarusian', 'somali',
  'sudanese', 'eritrean', 'ethiopian', 'yemeni', 'lebanese', 'egyptian', 'libyan', 'tunisian',
  'nigerian', 'cameroonian', 'congolese', 'georgian', 'armenian', 'azerbaijani', 'bulgarian',
  'european', 'african', 'arab', 'muslim', 'christian', 'stateless', 'sorry', 'fine', 'okay',
  'here', 'not', 'also', 'very', 'still', 'so', 'from', 'married', 'single', 'pregnant',
]);
const QUESTION_BEFORE_RE = /(?:как|як|what|how)\s+$/iu;
const CASELESS_STOPWORDS =new Set(['و', 'من', 'في', 'از', 'هستم', 'است', 'هو', 'هي']);

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const phraseRe = (phrases: string[]) =>
  new RegExp(String.raw`${NB}(?:${phrases.map(escapeRe).join('|')})\s+`, 'giu');
const STRONG_NAME_RE = phraseRe(STRONG_NAME_PHRASES);
const WEAK_NAME_RE = phraseRe(WEAK_NAME_PHRASES);

const WORD_RE = new RegExp(String.raw`^[${L}][${L}'’-]*`, 'u');
const isTitleCase = (w: string) => /^\p{Lu}\p{Ll}/u.test(w);
const isCaseless = (w: string) => !/\p{Lu}|\p{Ll}/u.test(w);

/** Takes up to 3 name words from the start of `rest`; returns how many chars they span. */
function nameSpan(rest: string, strong: boolean): number {
  let pos = 0;
  for (let i = 0; i < 3; i++) {
    const gap = i === 0 ? '' : (rest.slice(pos).match(/^ +/)?.[0] ?? null);
    if (gap === null) break;
    const word = rest.slice(pos + gap.length).match(WORD_RE)?.[0];
    if (!word) break;
    const first = i === 0;
    const accept = first
      ? strong
        ? true
        : isTitleCase(word) && !NOT_NAMES.has(word.toLowerCase())
      : isTitleCase(word) || (isCaseless(word) && !CASELESS_STOPWORDS.has(word));
    if (!accept) break;
    pos += gap.length + word.length;
  }
  return pos;
}

function redactNames(text: string, re: RegExp, strong: boolean): string {
  let out = '';
  let last = 0;
  for (const m of text.matchAll(re)) {
    const nameStart = m.index! + m[0].length;
    if (nameStart <= last) continue;
    // "Как се казва Софийският университет?" asks for a word, it does not name a person.
    if (!strong && QUESTION_BEFORE_RE.test(text.slice(0, m.index))) continue;
    const span = nameSpan(text.slice(nameStart), strong);
    if (span === 0) continue;
    out += text.slice(last, nameStart) + '[NAME]';
    last = nameStart + span;
  }
  return out + text.slice(last);
}

function redactSegment(text: string): string {
  let t = text;
  t = t.replace(EMAIL_RE, '[EMAIL]');
  t = t.replace(IBAN_RE, '[IBAN]');
  t = t.replace(ADDRESS_LABEL_RE, '[ADDRESS]');
  t = t.replace(STREET_RE, '[ADDRESS]');
  t = t.replace(UNIT_RE, '[ADDRESS]');
  t = t.replace(DOC_TOKEN_RE, '[DOCUMENT]');
  t = t.replace(NUMBER_RE, (m) => {
    const digits = m.replace(/\D/g, '').length;
    if (digits < 8 || DATE_RE.test(m) || THOUSANDS_RE.test(m)) return m;
    return '[NUMBER]';
  });
  t = t.replace(DOC_KEYWORD_RE, '[DOCUMENT]');
  t = redactNames(t, STRONG_NAME_RE, true);
  t = redactNames(t, WEAK_NAME_RE, false);
  return t;
}

export function redactPII(text: string): { text: string; wasRedacted: boolean } {
  // Links are left as they are: their paths contain digits and words that
  // would otherwise look like document numbers.
  const result = text
    .split(URL_RE)
    .map((part, i) => (i % 2 === 1 ? part : redactSegment(part)))
    .join('');
  return { text: result, wasRedacted: result !== text };
}
