# Japanese Conjugation Lab

## Project Overview
Interactive web-based Japanese conjugation learning tool covering verbs, adjectives, and nouns. Single-page app with no build step or dependencies -- just HTML, CSS, and vanilla JS. Hosted on GitHub Pages.

## Structure
- `index.html` - HTML structure with tab bar, tile slots, kana chart, conjugation panel, search/filter, verb selector
- `css/style.css` - All styles (~310 lines). Dark theme, multi-column masonry conjugation layout, tab bar, compact tile system for long words
- `js/app.js` - All application logic (~1600 lines). Verb/adjective/noun database, conjugation engine, drill-down system, rendering, URL state

## Key Architecture

### Data
- `WORDS` array: 215+ entries with `{k, r, m, t, jlpt, exc}`. Types: godan, ichidan, irregular, i-adj, na-adj, noun
- `TE_COMPOUNDS` array: 12 て form compounds (drillable verbs + fixed phrases)
- Romaji cache computed on load via `kanaToRomaji()` for search

### Conjugation Engine
- `getConjParts(word, conjId)` dispatches to type-specific functions:
  - `partsGodan()` - vowel-row stem changes via ST lookup table
  - `partsIchidan()` - drop る, add suffix
  - `partsIrr()` - handles する, くる, ある and their compounds (endsWith matching + prefix extraction)
  - `partsIAdj()` - drop い, add suffix. Special case: いい uses よ stem, よさ for そう
  - `partsNaAdj()` - stem + copula particles
  - `partsNoun()` - same as な-adj but with の for attribution
- All return normalized `{full, root, stemKana, suffix}` for tile display
- `CONJS()`, `CONJS_ADJ()`, `CONJS_NOUN()` define available conjugation sections per word type

### Drill-Down System
- `DRILLABLE` set: eru, passive, causative, causepass, teiru, te, adj_sugiru, adj_naru, adj_suru
- `drillInto(cid)` pushes state onto `drillStack`, creates new verb from conjugated form
- て form has special handling: opens `teCompoundMode` compound selection panel instead of single drill
- `drillTeCompound()` selects compound, `drillSelectedTeCompound()` does actual drill
- Drilled verbs can be godan, ichidan (drilled), or irregular depending on `drillType`
- Breadcrumb navigation via `drillBack(toIndex)` with て form mode restoration

### State
- `cur` - current word, `activeTab` - verb/adj/noun, `selVowel` - selected kana row
- `selConj` - selected conjugation, `endingRemoved` - る/い removed, `teCompoundMode`
- `drillStack` - array of drill history entries
- All state encoded in URL hash via `pushState()`/`loadFromURL()`

### Tab System
- Three tabs: Verbs, Adjectives, Nouns + Copula
- `switchTab()` resets all state, `getFilteredWords()` filters by tab type
- Kana chart shown for verbs, reference card for adjectives/nouns

## Development
No build step needed. Open `index.html` in a browser or serve with `python3 -m http.server 8000`.

GitHub repo: https://github.com/mlongob/japanese-conjugation-lab
Live site: https://mlongob.github.io/japanese-conjugation-lab/

## Known Patterns
- Compound irregular verbs (compound する, compound くる, compound ある) use endsWith matching in `partsIrr()` with prefix extraction
- `endingRemoved` is shared between ichidan る removal and い-adjective い removal
- Sections with all-null conjugations are auto-hidden in `renderConj()` via `anyReal` check
- Tiles use compact/very-compact CSS classes when word exceeds 7/10 characters
