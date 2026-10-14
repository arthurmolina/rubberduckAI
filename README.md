# RubberDuckAI

> Your most attentive listener. Completely useless. Absolutely essential.

**RubberDuckAI** is a mock AI chat interface where you talk to a rubber duck. The duck listens. The duck cares. The duck will never, under any circumstances, actually help you.

And yet — somehow — you'll solve your problem anyway.

---

## What is this?

This is a joke. A very useful joke.

It's based on [rubber duck debugging](https://en.wikipedia.org/wiki/Rubber_duck_debugging), a real technique used by programmers worldwide: you explain your code, line by line, to an inanimate object. The act of articulating the problem out loud forces your brain to process it differently, and you often find the bug before you finish explaining.

The duck doesn't need to understand. It just needs to exist.

RubberDuckAI takes this concept and dresses it up as a cutting-edge AI product, complete with multiple "models", thoughtful response patterns, and a very professional typing indicator. Under the hood, it's picking from a curated list of vague acknowledgements and gently reflective non-answers.

It works because *you* do the work.

---

## Features

- **7 duck models** to choose from, each with a distinct personality:
  - **ClaudeDuck** — Thoughtful. Philosophical. Mysteriously vague.
  - **DuckGPT** — Enthusiastic. Always positive. Absolutely useless.
  - **GeminiDuck** — Analytical. Sees patterns in everything. Especially where there are none.
  - **LlamaDuck** — Open source. Unfiltered. Very quack.
  - **GrokDuck** — Sarcastic. Irreverent. Definitely not helping.
  - **DeepSeekDuck** — Efficient. Precise. Some topics are best not discussed.
  - **QuackAI** — State of the art. The most advanced model. Quack.

- **Progressive response system** — the duck listens more at the start, reflects more as the conversation deepens
- **Anti-repetition logic** — no two consecutive identical responses
- **Bilingual** — PT-BR and EN-US, auto-detected from your browser
- **Dark / Light / System** theme
- **Unlimited tokens** — talk as long as you need

---

## Tech

Pure vanilla JavaScript. No frameworks. No build step. No dependencies. Runs directly on GitHub Pages.

```
index.html   — single page app
style.css    — styles + theming via CSS custom properties
app.js       — main logic
ducks.js     — duck definitions and response weight system
i18n.js      — translations (PT-BR / EN-US)
prompts.js   — suggested conversation starters per duck
```

---

## Live demo

[artz.to/rubberduckAI](http://artz.to/rubberduckAI/)

---

## Does it actually work?

Yes. Not the duck — the technique.

If you find yourself typing out your problem to a rubber duck chatbot and solving it halfway through the message, that's not a bug. That's the whole point.

---

*No ducks were harmed in the making of this project.*
