import React from 'react';

// Mudaria prefixes: ي، ت، أ، ن
const MUDARIA_PREFIXES = ['ي', 'ت', 'أ', 'ن'];

// Common mudaria suffixes (ordered by length for proper matching)
const MUDARIA_SUFFIXES = [
  'انِ', 'ان',   // Dual
  'ونَ', 'ون',   // Masculine plural
  'ينَ', 'ين',   // Feminine singular (2nd person)
  'نَ'           // Feminine plural
];

function getMudariaPrefix(text: string): string | null {
  const firstChar = text[0];
  return MUDARIA_PREFIXES.includes(firstChar) ? firstChar : null;
}

function getMudariaSuffix(text: string): string | null {
  // Check longest suffixes first to avoid partial matches
  for (const suffix of MUDARIA_SUFFIXES) {
    if (text.endsWith(suffix)) {
      return suffix;
    }
  }
  return null;
}

/**
 * Renders a mudaria (present tense) verb form with color-coded morphology:
 * - Prefix (ي، ت، أ، ن) in specified color (default blue)
 * - Root letters with harakat in default color
 * - Suffix (dual/plural markers) in specified color
 *
 * @param text - The mudaria verb form (e.g., "يَنْصُرُ", "يَنْصُرَانِ")
 * @param prefixColor - Color for prefix and suffix (default: #3b82f6)
 * @returns React nodes with colored spans
 */
export function renderColorCodedMudaria(
  text: string,
  prefixColor: string = '#3b82f6'
): React.ReactNode {
  const prefix = getMudariaPrefix(text);
  const suffix = getMudariaSuffix(text);

  let prefixPart = '';
  let rootPart = text;
  let suffixPart = '';

  if (prefix) {
    prefixPart = prefix;
    rootPart = text.slice(prefix.length);
  }

  if (suffix && rootPart.endsWith(suffix)) {
    suffixPart = suffix;
    rootPart = rootPart.slice(0, -suffix.length);
  }

  return (
    <>
      {prefixPart && <span style={{ color: prefixColor }}>{prefixPart}</span>}
      <span>{rootPart}</span>
      {suffixPart && <span style={{ color: prefixColor }}>{suffixPart}</span>}
    </>
  );
}

// Past tense (madi) suffixes for pronouns
const MADI_SUFFIXES = [
  'تُمَا',  // you two (antumaa)
  'تُنَّ',  // you (f.pl)
  'تُمْ',   // you (m.pl)
  'وا',    // they (m)
  'تَا',   // she two / they two (f)
  'نَا',   // we
  'تْ',    // she
  'تَ',    // you (m)
  'تِ',    // you (f)
  'تُ',    // I
  'نَ',    // they (f)
  'ا'      // they two (m) - check this last to avoid partial matches
];

function getMadiSuffix(text: string): string | null {
  // Check longest suffixes first to avoid partial matches
  for (const suffix of MADI_SUFFIXES) {
    if (text.endsWith(suffix)) {
      return suffix;
    }
  }
  return null;
}

/**
 * Renders a madi (past tense) verb form with color-coded morphology:
 * - Root letters with harakat in default color
 * - Suffix (pronoun endings) in specified color
 *
 * @param text - The madi verb form (e.g., "نَصَرَ", "نَصَرَا", "نَصَرْتُمَا")
 * @param suffixColor - Color for suffix (default: #3b82f6)
 * @returns React nodes with colored spans
 */
export function renderColorCodedMadi(
  text: string,
  suffixColor: string = '#3b82f6'
): React.ReactNode {
  const suffix = getMadiSuffix(text);

  let rootPart = text;
  let suffixPart = '';

  if (suffix) {
    suffixPart = suffix;
    rootPart = text.slice(0, -suffix.length);
  }

  return (
    <>
      <span>{rootPart}</span>
      {suffixPart && <span style={{ color: suffixColor }}>{suffixPart}</span>}
    </>
  );
}
