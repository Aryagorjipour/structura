# ⚔ Structura

**Master Data Structures & Algorithms through dungeon combat.**

Structura is a dark-fantasy RPG where every boss is an algorithm. Fight your way through 11 zones and 80 bosses — answer quiz questions to deal damage, trace through visualizations, then write the code to finish them off.

🎮 **[Play Live →](https://aryagorjipour.github.io/structura/)**

---

## How It Works

Each boss fight has three phases:

| Phase | Name | What You Do |
|-------|------|-------------|
| I | **Quiz Duel** | Answer MCQs about the algorithm — correct answers deal damage |
| II | **Visual Trace** | Step through an animated visualization of the data structure |
| III | **Code Duel** | Write a working implementation in your language of choice |

Defeat bosses to earn XP, level up, and unlock the next zone.

---

## Features

- **80 Bosses across 11 Zones** — Arrays, Linked Lists, Stacks, Queues, Trees, Graphs, Sorting, Searching, Dynamic Programming, Greedy, and Advanced Algorithms
- **6 Languages** — Python, TypeScript, Go, Rust, C#, C++
- **In-browser code execution** — Python runs via Pyodide (WASM), TypeScript runs natively, compiled languages via Wandbox — no server required
- **2.5D Isometric World Map** — CSS perspective zones with mouse parallax, boss orbs, and connection paths
- **Quest System** — Daily, weekly, story, and side quests with XP rewards
- **Skill Tree** — Spend skill points on RPG upgrades (Iron Will, Code Savant, Pathfinder…)
- **Knowledge Atlas** — Pan/zoom SVG graph of all 80 bosses
- **Persistent Progress** — Zustand + localStorage, resume mid-fight where you left off
- **Profile & Save System** — Custom username, 24 avatar choices, JSON export/import

---

## Tech Stack

- **Next.js 16** (static export) · **React 19** · **TypeScript**
- **Zustand 5** (state + persistence) · **Framer Motion** (animations)
- **Monaco Editor** (VS Code editor in-browser)
- **Pyodide** (CPython 3.11 in WebAssembly)
- **Tailwind CSS 4** · **Cinzel Decorative** / **Source Serif 4** / **JetBrains Mono**

---

## Run Locally

```bash
git clone https://github.com/Aryagorjipour/structura.git
cd structura
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deploy

Pushes to `main` automatically deploy to GitHub Pages via the included workflow (`.github/workflows/deploy.yml`). Enable Pages in your repo: **Settings → Pages → Source: gh-pages branch**.

---

## Contributing

PRs welcome. New boss ideas, additional languages, visual trace improvements, or bug fixes — open an issue first to discuss.

---

Built by [ArySmart](https://github.com/aryagorjipour) · Dark fantasy aesthetic inspired by [structura.aryagorjipour.github.io](https://aryagorjipour.github.io/structura/)
