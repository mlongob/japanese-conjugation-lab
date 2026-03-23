# Japanese Conjugation Lab

## Project Overview
Interactive web-based Japanese verb conjugation learning tool. Single-page app with no build step or dependencies - just HTML, CSS, and vanilla JS.

## Structure
- `index.html` - Main HTML structure
- `css/style.css` - All styles
- `js/app.js` - Application logic, verb database, conjugation engine, and UI rendering

## Key Architecture
- Verb data is in the `VERBS` array with kanji, reading, meaning, type (godan/ichidan/irregular), JLPT level, and exception flags
- Conjugation engine: `getConjParts()` dispatches to `partsGodan()`, `partsIchidan()`, `partsIrr()` which return `{full, root, stemKana, suffix}`
- Drill-down system: drillable conjugations (potential, passive, causative, causative-passive, progressive) produce ichidan-like sub-verbs
- UI state is encoded in URL hash for shareable links
- Search supports kanji, kana, romaji, and English

## Development
No build step needed. Open `index.html` in a browser or serve with any static file server.
