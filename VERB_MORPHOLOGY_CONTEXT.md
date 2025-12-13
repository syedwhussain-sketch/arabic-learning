# Verb Morphology Color-Coding Implementation Context

## Project Overview
This document provides complete context for the verb morphology color-coding feature implemented in the Arabic Learning app. Use this when continuing work on additional columns (imperative, negation particles, etc.).

---

## What's Been Implemented ✅

### 1. Present Tense (المضارع) Column
- **Mudaria prefixes** (ي، ت، أ، ن) are color-coded
- **Suffixes** (ان، ون، ين، انِ، ونَ، ينَ، نَ) are color-coded
- **Root letters** with harakat remain default color

### 2. Past Tense (الماضي) Column
- **Suffixes** (ا، تَ، تْ، تِ، تُ، تَا، نَ، نَا، وا، تُمَا، تُمْ، تُنَّ) are color-coded
- **Root letters** with harakat remain default color

### 3. Theme Support
- **Light Mode**: Morphology parts display in **red** (#c62828)
- **Dark Mode**: Morphology parts display in **light blue** (#4fc3f7)
- Colors automatically switch with theme

---

## File Structure

### Key Files

#### 1. `src/utils/verbMorphologyUtils.tsx` (NEW)
Contains all morphology parsing and rendering functions.

```typescript
// Functions:
- renderColorCodedMudaria(text: string, prefixColor: string): React.ReactNode
- renderColorCodedMadi(text: string, suffixColor: string): React.ReactNode
- getMudariaPrefix(text: string): string | null
- getMudariaSuffix(text: string): string | null
- getMadiSuffix(text: string): string | null

// Constants:
- MUDARIA_PREFIXES: ['ي', 'ت', 'أ', 'ن']
- MUDARIA_SUFFIXES: ['انِ', 'ان', 'ونَ', 'ون', 'ينَ', 'ين', 'نَ']
- MADI_SUFFIXES: ['تُمَا', 'تُنَّ', 'تُمْ', 'وا', 'تَا', 'نَا', 'تْ', 'تَ', 'تِ', 'تُ', 'نَ', 'ا']
```

#### 2. `src/components/VerbCard.tsx` (MODIFIED)
Main component that displays verb conjugation tables.

**Key additions:**
```typescript
// Line 7: Import color constants
import { ARABIC_TEXT_DARK, ARABIC_TEXT_LIGHT } from '../constants/colors';

// Line 6: Import morphology functions
import { renderColorCodedMudaria, renderColorCodedMadi } from '../utils/verbMorphologyUtils';

// Line 22: Calculate theme-aware color
const morphologyColor = isDark ? ARABIC_TEXT_DARK : ARABIC_TEXT_LIGHT;

// Line 123: Desktop past tense (الماضي)
<div>{renderColorCodedMadi(conj.past, morphologyColor)}</div>

// Line 129: Desktop present tense (المضارع)
<div>{renderColorCodedMudaria(conj.present, morphologyColor)}</div>

// Line 72: Mobile past tense
{renderColorCodedMadi(conj.past, morphologyColor)}

// Line 73: Mobile present tense
{renderColorCodedMudaria(conj.present, morphologyColor)}
```

#### 3. `src/constants/colors.ts` (EXISTING)
Contains theme color definitions.

```typescript
// Lines 21-22: Arabic text colors used for morphology
export const ARABIC_TEXT_DARK = '#4fc3f7';  // Light cyan/blue for dark mode
export const ARABIC_TEXT_LIGHT = '#c62828'; // Deep red for light mode
```

#### 4. `src/data/categories/alsahih/patterns/alsahih.nasara.data.ts` (UNCHANGED)
Contains verb conjugation data. No modifications needed - works with plain strings.

---

## Implementation Pattern

### How It Works

1. **Data Structure**: Conjugations stored as plain Arabic strings (e.g., "يَنْصُرُ", "نَصَرَ")
2. **Parsing**: Functions in `verbMorphologyUtils.tsx` identify prefixes/suffixes using pattern matching
3. **Rendering**: Returns React fragments with colored `<span>` elements
4. **Theme Integration**: `VerbCard` passes theme-aware color to rendering functions

### Example Flow

```typescript
// Input
conj.present = "يَنْصُرَانِ"

// Processing in renderColorCodedMudaria()
prefix = "ي" (detected from MUDARIA_PREFIXES)
suffix = "انِ" (detected from MUDARIA_SUFFIXES)
root = "َنْصُرَ" (what's left)

// Output (React nodes)
<>
  <span style={{ color: morphologyColor }}>ي</span>  // Blue/Red based on theme
  <span>َنْصُرَ</span>                                 // Default color
  <span style={{ color: morphologyColor }}>انِ</span> // Blue/Red based on theme
</>
```

---

## Testing Reference

### Verified Examples (nasara verb: نَصَرَ)

#### Present Tense (المضارع)
| Form | Prefix (colored) | Root (default) | Suffix (colored) |
|------|------------------|----------------|------------------|
| يَنْصُرُ | ي | َنْصُرُ | - |
| يَنْصُرَانِ | ي | َنْصُرَ | انِ |
| يَنْصُرُونَ | ي | َنْصُرُ | ونَ |
| تَنْصُرُ | ت | َنْصُرُ | - |
| تَنْصُرِينَ | ت | َنْصُرِ | ينَ |
| أَنْصُرُ | أ | َنْصُرُ | - |
| نَنْصُرُ | ن | َنْصُرُ | - |

#### Past Tense (الماضي)
| Form | Root (default) | Suffix (colored) |
|------|----------------|------------------|
| نَصَرَ | نَصَرَ | - |
| نَصَرَا | نَصَرَ | ا |
| نَصَرُوا | نَصَرُ | وا |
| نَصَرَتْ | نَصَرَ | تْ |
| نَصَرْتَ | نَصَرْ | تَ |
| نَصَرْتُمَا | نَصَرْ | تُمَا |
| نَصَرْنَا | نَصَرْ | نَا |

---

## Next Steps: Implementing Additional Columns

### TODO: Imperative (الأمر) Column

The imperative column currently displays plain text. To add color-coding:

#### 1. Create Function in `verbMorphologyUtils.tsx`

```typescript
// Imperative prefixes (if any - usually starts with hamza)
const AMR_PREFIXES = ['ا', 'اُ'];

// Imperative suffixes
const AMR_SUFFIXES = [
  'ا',    // dual
  'وا',   // masculine plural
  'ي',    // feminine singular
  'نَ'    // feminine plural
];

function getAmrPrefix(text: string): string | null {
  // Check for initial hamza patterns
  if (text.startsWith('اُ')) return 'اُ';
  if (text.startsWith('ا') && text.length > 2) return 'ا';
  return null;
}

function getAmrSuffix(text: string): string | null {
  for (const suffix of AMR_SUFFIXES) {
    if (text.endsWith(suffix)) {
      return suffix;
    }
  }
  return null;
}

export function renderColorCodedAmr(
  text: string,
  color: string = '#3b82f6'
): React.ReactNode {
  const prefix = getAmrPrefix(text);
  const suffix = getAmrSuffix(text);

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
      {prefixPart && <span style={{ color }}>{prefixPart}</span>}
      <span>{rootPart}</span>
      {suffixPart && <span style={{ color }}>{suffixPart}</span>}
    </>
  );
}
```

#### 2. Update VerbCard.tsx

Import the function:
```typescript
import { renderColorCodedMudaria, renderColorCodedMadi, renderColorCodedAmr } from '../utils/verbMorphologyUtils';
```

Desktop view (around line 134):
```typescript
<div>{conj.imperative ? renderColorCodedAmr(conj.imperative, morphologyColor) : '-'}</div>
```

Mobile view (around line 74):
```typescript
{conj.imperative ? renderColorCodedAmr(conj.imperative, morphologyColor) : '-'}
```

#### 3. Test with nasara examples:
- اُنْصُرْ (help! singular)
- اُنْصُرَا (help! dual)
- اُنْصُرُوا (help! plural masculine)
- اُنْصُرِي (help! singular feminine)

---

### TODO: Negation Columns (لَمْ، لَنْ، لا)

These columns use mudaria forms but with negation particles prepended.

#### Approach 1: Extend Mudaria Function

Modify `renderColorCodedMudaria` to handle negation particles:

```typescript
const NEGATION_PARTICLES = ['لَمْ ', 'لَنْ ', 'لا '];

export function renderColorCodedMudariaWithNegation(
  text: string,
  prefixColor: string = '#3b82f6',
  negationColor: string = '#ef4444' // Red for negation
): React.ReactNode {
  // Check for negation particle
  let negationPart = '';
  let verbPart = text;

  for (const particle of NEGATION_PARTICLES) {
    if (text.startsWith(particle)) {
      negationPart = particle;
      verbPart = text.slice(particle.length);
      break;
    }
  }

  // Parse the verb part
  const prefix = getMudariaPrefix(verbPart);
  const suffix = getMudariaSuffix(verbPart);

  let prefixPart = '';
  let rootPart = verbPart;
  let suffixPart = '';

  if (prefix) {
    prefixPart = prefix;
    rootPart = verbPart.slice(prefix.length);
  }

  if (suffix && rootPart.endsWith(suffix)) {
    suffixPart = suffix;
    rootPart = rootPart.slice(0, -suffix.length);
  }

  return (
    <>
      {negationPart && <span style={{ color: negationColor }}>{negationPart}</span>}
      {prefixPart && <span style={{ color: prefixColor }}>{prefixPart}</span>}
      <span>{rootPart}</span>
      {suffixPart && <span style={{ color: prefixColor }}>{suffixPart}</span>}
    </>
  );
}
```

#### Approach 2: Separate Negation + Mudaria

Use two functions - one for negation particle, one for verb:

```typescript
export function renderColorCodedNegation(
  text: string,
  mudariaColor: string,
  negationColor: string = '#ef4444'
): React.ReactNode {
  // Extract negation particle and verb
  let negation = '';
  let verb = text;

  if (text.startsWith('لَمْ ')) {
    negation = 'لَمْ ';
    verb = text.slice(5);
  } else if (text.startsWith('لَنْ ')) {
    negation = 'لَنْ ';
    verb = text.slice(5);
  } else if (text.startsWith('لا ')) {
    negation = 'لا ';
    verb = text.slice(3);
  }

  return (
    <>
      {negation && <span style={{ color: negationColor }}>{negation}</span>}
      {renderColorCodedMudaria(verb, mudariaColor)}
    </>
  );
}
```

#### Update VerbCard.tsx for Negation Columns

Desktop view:
```typescript
// لَمْ column (line ~139)
<div>لَمْ {renderColorCodedMudaria(conj.negationPast, morphologyColor)}</div>

// لَنْ column (line ~145)
<div>لَنْ {renderColorCodedMudaria(conj.negationFuture, morphologyColor)}</div>

// لا column (line ~151)
<div>لا {renderColorCodedMudaria(conj.negationJussive, morphologyColor)}</div>
```

Mobile view (similar pattern around lines 75-77).

**Note**: According to user requirements, negation particles should be **RED** while mudaria prefixes/suffixes remain **theme-aware** (blue/red).

---

## Code Patterns to Follow

### Pattern 1: Adding a New Morphology Function

1. Define suffix/prefix constants (ordered by length, longest first)
2. Create helper functions to identify parts
3. Create main rendering function that:
   - Accepts text and color(s) as parameters
   - Extracts prefix, root, suffix
   - Returns React fragments with colored spans
4. Export the main function

### Pattern 2: Updating VerbCard for New Column

1. Import the new function from `verbMorphologyUtils`
2. Update desktop table cell (around line 120-160)
3. Update mobile card view (around line 70-78)
4. Pass `morphologyColor` for theme awareness
5. Test in both light and dark modes

### Pattern 3: Handling Optional Fields

```typescript
// For columns that might be empty/undefined
{conj.imperative ? renderColorCodedAmr(conj.imperative, morphologyColor) : '-'}
```

---

## Important Notes

### Suffix Ordering
**Always** order suffixes from longest to shortest in constant arrays. This prevents partial matches.

Example:
```typescript
// CORRECT
['تُمَا', 'تُنَّ', 'وا', 'تَ', 'ا']

// WRONG - 'ا' would match before 'تُمَا'
['ا', 'تَ', 'وا', 'تُنَّ', 'تُمَا']
```

### Harakat Handling
The current implementation treats vowel marks (harakat) as part of the characters they modify. No special handling needed - JavaScript string slicing preserves them correctly.

### Theme Integration
Always use `morphologyColor` from VerbCard rather than hardcoded colors. This ensures theme consistency.

```typescript
// CORRECT
<div>{renderColorCodedMudaria(conj.present, morphologyColor)}</div>

// WRONG
<div>{renderColorCodedMudaria(conj.present, '#3b82f6')}</div>
```

---

## Testing Checklist for New Columns

When implementing a new column, verify:

- [ ] Desktop table view renders correctly
- [ ] Mobile card view renders correctly
- [ ] Light mode shows red morphology parts
- [ ] Dark mode shows light blue morphology parts
- [ ] Root letters remain default color
- [ ] All conjugation forms are handled (singular, dual, plural, masculine, feminine)
- [ ] Empty/missing values show "-" instead of breaking
- [ ] No TypeScript errors
- [ ] Dev server compiles successfully

---

## Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Type check
npx tsc --noEmit
```

---

## Data Structure Reference

### VerbSubCategory Type
```typescript
{
  conjugations: [{
    pronounArabic: string;
    past: string;              // الماضي
    present: string;           // المضارع
    imperative?: string;       // الأمر (optional)
    negationPast: string;      // لَمْ
    negationFuture: string;    // لَنْ
    negationJussive: string;   // لا
    participle?: string;       // اسم الفاعل (optional)
    // ... English translations
  }]
}
```

---

## Future Enhancements

### Potential Improvements
1. **Participle (اسم الفاعل)**: Add color-coding for active participles
2. **Passive Voice**: Extend to passive conjugations if data exists
3. **Weak Verbs**: Verify patterns work for hollow/defective verbs
4. **Configuration**: Allow users to toggle color-coding on/off
5. **Color Customization**: Let users choose their own colors

### Performance Optimization
Currently, each conjugation parses morphology on render. For large datasets, consider:
- Memoizing results with React.memo
- Pre-parsing morphology in data files
- Using a morphology library for complex verbs

---

## Contact & References

### Files Modified
- ✅ Created: `src/utils/verbMorphologyUtils.tsx`
- ✅ Modified: `src/components/VerbCard.tsx`
- ✅ Used: `src/constants/colors.ts`

### Git Status
Clean working directory after implementation.

### Next Implementation Priority
1. Imperative (الأمر) column
2. Negation particle columns (لَمْ، لَنْ، لا)
3. Active participle (اسم الفاعل) column

---

**Document Version**: 1.0
**Last Updated**: 2025-12-13
**Implementation Status**: Present & Past tense complete ✅
