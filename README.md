# Japanese Conjugation Lab

An interactive web tool for exploring Japanese conjugation patterns across verbs, adjectives, and nouns. Select a word, click through conjugation forms, and watch conjugated words build character by character.

Try it live: [https://mlongob.github.io/japanese-conjugation-lab/](https://mlongob.github.io/japanese-conjugation-lab/)

![Screenshot](docs/screenshot.png)

## Credits & Inspiration

This project was heavily inspired by the Verb Lab tool created by George Trombley / Japanese From Zero!, as demonstrated in the YouTube video ["Ultimate Guide to Conjugating ANY JAPANESE VERB!"](https://www.youtube.com/watch?v=p4otUnLHcb4). This is an independent recreation for personal learning purposes and is not affiliated with Japanese From Zero! or YesJapan.com.

## Features

- Tab-based navigation: Verbs, Adjectives, and Nouns + Copula
- Interactive hiragana chart showing the 5-step conjugation system for godan verbs
- Click-to-remove ending interaction for ichidan verbs and い-adjectives
- Full verb conjugation engine: polite, negative, potential, passive, causative, causative-passive, conditional, progressive, imperative, te/ta forms
- Adjective conjugation: present, past, negative, te form, conditional, adverbial, attributive for both い and な types
- Noun + copula conjugation: だ/です forms, negative, past, conditional
- Irregular handling: いい (よ stem), する/来る compounds
- Recursive drill-down into compound verb forms (potential, passive, causative produce new conjugatable verbs)
- 180+ words tagged with JLPT levels (N5-N1)
- Iru/eru godan exception verbs flagged for learners
- Search by kanji, kana, romaji, or English meaning
- JLPT level filtering
- Shareable URL state (every interaction updates the URL)
- No dependencies, no build step -- just open index.html

## Word Types

### Verbs
- **Godan (5-step):** The verb ending cycles through all five vowel rows of the hiragana chart depending on the conjugation form. These are the most common Japanese verbs.
- **Ichidan (1-step):** The verb stem is formed by simply dropping the final る. All conjugation suffixes attach directly to the stem.
- **Irregular:** する (to do) and 来る (to come) follow unique conjugation patterns. Compound する verbs (e.g. 勉強する) share the same irregular pattern.

### Adjectives
- **い-adjectives:** Drop the final い and add conjugation suffixes (かった, くない, くて, etc.). The irregular いい conjugates with a よ stem.
- **な-adjectives:** Add copula-based endings directly to the stem (だ, です, だった, じゃない, etc.).

### Nouns + Copula
- Nouns conjugate through the copula (だ/です) to express state of being, following the same pattern as な-adjectives but with の for attribution.

## Usage

No build step or dependencies required. To run locally:

1. Clone or download this repository
2. Open `index.html` in any modern web browser

Alternatively, serve the directory with any static file server:

```
python3 -m http.server 8000
```

Then visit `http://localhost:8000` in your browser.

## License

MIT
