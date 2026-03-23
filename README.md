# Japanese Conjugation Lab

An interactive web tool for exploring Japanese verb conjugation patterns. Select a verb, click through the hiragana chart, and watch conjugated forms build character by character.

![Screenshot](docs/screenshot.png)

## Credits & Inspiration

This project was heavily inspired by the Verb Lab tool created by George Trombley / Japanese From Zero!, as demonstrated in the YouTube video ["Ultimate Guide to Conjugating ANY JAPANESE VERB!"](https://www.youtube.com/watch?v=p4otUnLHcb4). This is an independent recreation for personal learning purposes and is not affiliated with Japanese From Zero! or YesJapan.com.

## Features

- Interactive hiragana chart showing the 5-step conjugation system for godan verbs
- Click-to-remove る interaction for ichidan verbs
- Full conjugation engine covering polite, negative, potential, passive, causative, causative-passive, conditional, progressive, imperative, te/ta forms
- Recursive drill-down into compound forms (potential, passive, causative produce new conjugatable verbs)
- 130+ verb database tagged with JLPT levels (N5-N1)
- Iru/eru godan exception verbs flagged for learners
- Search by kanji, kana, romaji, or English meaning
- JLPT level filtering
- Shareable URL state (every interaction updates the URL)
- No dependencies, no build step -- just open index.html

## Verb Types

- **Godan (5-step):** The verb ending cycles through all five vowel rows of the hiragana chart depending on the conjugation form. These are the most common Japanese verbs.
- **Ichidan (1-step):** The verb stem is formed by simply dropping the final る. All conjugation suffixes attach directly to the stem.
- **Irregular:** する (to do) and 来る (to come) follow unique conjugation patterns. Compound する verbs (e.g. 勉強する) share the same irregular pattern.

## Usage

No build step or dependencies required. To run locally:

1. Clone or download this repository
2. Open `index.html` in any modern web browser

Alternatively, serve the directory with any static file server:

```
python3 -m http.server 8000
```

Then visit `http://localhost:8000` in your browser.

## Roadmap

- Adjective conjugation support (い-adjectives, な-adjectives)

## License

MIT
