# Project Instructions

## 🚨 CRITICAL: Mobile-First Responsive Design
**THIS IS A NON-NEGOTIABLE REQUIREMENT FOR THE ENTIRE SITE**

- **Design priority order**:
  1. **Smartphones FIRST** - 100% smartphone friendly (320px - 480px)
  2. **Tablets/iPads** - Full tablet support (481px - 1024px)
  3. **Desktop browsers** - Standard desktop experience (1025px+)
- **MUST use responsive design principles at ALL times**:
  - Flexible layouts (Flexbox, CSS Grid)
  - Responsive breakpoints for all screen sizes
  - Touch-friendly interactive elements (minimum 44x44px tap targets)
  - Readable font sizes on mobile (minimum 16px base)
  - No horizontal scrolling on any device
  - Test all components on mobile viewports FIRST
- **Material UI**: Use responsive props (`xs`, `sm`, `md`, `lg`, `xl`) on Grid and Container components
- **Tailwind CSS**: Use mobile-first utility classes (e.g., `text-base md:text-lg lg:text-xl`)
- **Every component MUST be verified for mobile usability before desktop optimization**

## TypeScript Import Rules
- **ALWAYS use `import type` for TypeScript interfaces and types**
- Example: `import type { VerbCategory } from '../types/verb.types'`
- This prevents Vite runtime errors about missing exports
- Never use regular `import { }` for type-only imports

## Text Direction Rules
- **English text**: ALWAYS left-to-right, left-aligned (`textAlign: 'left'`, no `direction` prop)
- **Arabic text**: ALWAYS right-to-left, right-aligned (`textAlign: 'right'`, `direction: 'rtl'`)
- **Default assumption**: English is left-to-right unless the content is purely Arabic
- **Mixed content**: If explanation/description is in English with Arabic words, keep left-to-right

## Project Location
The React project is located at: `D:\development\lnd\language\class\dev\arabiclearning`

## Project Setup
- React 19 with TypeScript
- Material UI v7 (with Emotion for styling)
- Tailwind CSS v4
- Vite as build tool

## Key Requirements
- Dark mode using Material UI theme
- Mobile-friendly and responsive design
- RTL (right-to-left) support for Arabic text
- Tree visualization with rounded corner bubbles/cards
- Click-through navigation for drilling into verb conjugations
- Multiple design variations for tree representation

## Component ID Requirements
- **ALL divs and container elements (Box, Card, etc.) MUST have unique `id` attributes**
- IDs should follow the naming convention: `{elementType}-{contextId}-{specificIdentifier}`
  - Example: `id="containerVerbCard-${data.id}"`
  - Example: `id="accordionSubCategory-${subCategory.id}"`
  - Example: `id="cellPronoun-${subCategory.id}-${index}"`
- This requirement ensures easy identification and communication with AI when discussing specific UI elements
- IDs must be descriptive and include relevant context from the data (category IDs, subcategory IDs, indices)

## Reference
- The HTML reference file is at: `D:\development\lnd\language\class\dev\arabic_verb_tree_interactive.html`
- This file contains the Arabic verb tree structure and conjugation data

## Data File Structure and Naming Conventions

### Folder Structure
All verb data follows a hierarchical structure mirroring the linguistic organization:
```
arabiclearning/src/data/
├── index.ts                          # Root barrel export
├── categories/
│   ├── index.ts                      # Category barrel export
│   └── {category}/                   # e.g., alsahih, hamzah, mudaaf, etc.
│       ├── index.ts                  # Category assembly (combines metadata + patterns)
│       ├── metadata.ts               # Category-level metadata only
│       └── patterns/
│           ├── index.ts              # Pattern barrel export
│           └── {category}.{pattern}.data.ts  # Pattern files
```

### File Naming Convention
- **Pattern files**: `{category}.{pattern}.data.ts`
  - Example: `alsahih.nasara.data.ts`, `alsahih.daraba.data.ts`
  - Rationale: Category prefix makes files identifiable when multiple categories are open in IDE
- **Metadata files**: `metadata.ts` (one per category folder)
- **Barrel exports**: `index.ts` (at each directory level)

### Pattern File Structure
Each pattern file (`{category}.{pattern}.data.ts`) should:
1. Import types: `import type { VerbSubCategory } from '../../../../types/verb.types'`
2. Export a single pattern constant: `export const {pattern}Pattern: VerbSubCategory = { ... }`
3. Include a comment header: `// {Arabic pattern name} pattern`
4. Contain all conjugations (14 per pattern) and example sentences

### Category Metadata File Structure
Each `metadata.ts` file should:
1. Import types: `import type { VerbCategory } from '../../../types/verb.types'`
2. Export metadata only (no subCategories): `export const {category}Metadata: Omit<VerbCategory, 'subCategories'> = { ... }`
3. Include: id, arabic, english, transliteration, explanation

### Adding New Data
1. **New pattern to existing category**:
   - Create: `patterns/{category}.{pattern}.data.ts`
   - Add export to: `patterns/index.ts`
   - Add to subCategories array in: `{category}/index.ts`

2. **New category**:
   - Create folder: `categories/{category}/`
   - Create: `{category}/metadata.ts`
   - Create: `{category}/patterns/` folder
   - Create pattern files following naming convention
   - Create: `{category}/patterns/index.ts`
   - Create: `{category}/index.ts` (assembles metadata + patterns)
   - Add export to: `categories/index.ts`

### Benefits of This Structure
- **Maintainability**: Each pattern in its own ~170 line file
- **Scalability**: Easy to add new categories and patterns
- **Type Safety**: Full TypeScript support throughout
- **IDE-Friendly**: Category prefix in filenames provides context
- **Git-Friendly**: Smaller files = clearer diffs, fewer merge conflicts
