const PII_PATTERNS = [
  /\b[\w.+-]+@[\w-]+\.[a-z]{2,}\b/gi,
  /\b(\+?\d[\d\s\-().]{7,}\d)\b/g,
  /\b(казвам се|my name is|je m'appelle|меня зовут|мене звати|اسمي|نام من)\s+\S+/gi,
  /\b(живея на|адрес|address|adresse)\s+.{0,60}/gi,
];

export function redactPII(text: string): { text: string; wasRedacted: boolean } {
  let result = text;
  let wasRedacted = false;

  for (const pattern of PII_PATTERNS) {
    const replaced = result.replace(pattern, '[REDACTED]');
    if (replaced !== result) {
      wasRedacted = true;
      result = replaced;
    }
  }

  return { text: result, wasRedacted };
}
