# Algorithm Catacombs Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a dungeon-crawler RPG web game that teaches all 34 data structures + 46 algorithms through 3-phase boss fights (quiz → visual trace → code duel).

**Architecture:** Next.js 14 App Router with TypeScript. Game state in Zustand + localStorage. Boss content in typed JSON data files (one per zone). Code execution via Piston public API (supports all 6 languages in-browser).

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Zustand, @monaco-editor/react, framer-motion, Piston API (emkc.org)

---

## World Map

| Zone | Name | Nodes | Source |
|------|------|-------|--------|
| 1 | Foundation Vaults | 5 | Algo Tier 1 |
| 2 | Search Chambers | 3 | Algo Tier 2 |
| 3 | Sort Halls | 7 | Algo Tier 3 |
| 4 | Linear Crypts | 7 | DS Part 1 |
| 5 | Hash Sanctum | 7 | DS Part 2 + Algo Tier 4 |
| 6 | Tree Kingdom | 10 | DS Part 3 + Algo Tier 5 |
| 7 | Deep Roots | 5 | DS Part 4 |
| 8 | Graph Realm | 10 | DS Part 5 + Algo Tier 6 |
| 9 | DP Forge | 6 | Algo Tier 7 |
| 10 | String Labyrinth | 5 | Algo Tier 8 |
| 11 | Shadow Citadel | 15 | DS Parts 6+7 + Algo Tier 9 |

---

## File Map

```
src/
  app/
    layout.tsx                    # Root layout, pixel font, dark bg
    page.tsx                      # Title screen
    map/page.tsx                  # Dungeon map
    fight/[bossId]/page.tsx       # Boss fight
    inventory/page.tsx            # Stats + achievements
  components/
    ui/HPBar.tsx                  # Reusable HP/XP bar
    ui/PixelButton.tsx            # Styled button
    map/DungeonMap.tsx            # Full 11-zone map
    map/ZonePanel.tsx             # One zone row
    map/BossNode.tsx              # Single node (locked/available/defeated)
    fight/FightArena.tsx          # Orchestrates 3-phase fight
    fight/BossDisplay.tsx         # Boss ASCII art + HP
    fight/PlayerHUD.tsx           # Player HP/XP/level
    fight/Phase1Quiz.tsx          # 5 MCQ questions
    fight/Phase2Visual.tsx        # Routes to correct visual
    fight/Phase3Code.tsx          # Monaco editor + Piston submit
    fight/FightResult.tsx         # Victory/defeat + loot
    visuals/ArrayVisual.tsx       # Animated array boxes
    visuals/LinkedListVisual.tsx  # Node → arrow → node
    visuals/StackVisual.tsx       # Push/pop stack
    visuals/QueueVisual.tsx       # Enqueue/dequeue
    visuals/TreeVisual.tsx        # Generic tree (BST/heap)
    visuals/GraphVisual.tsx       # Nodes + edges + BFS/DFS wave
    visuals/HashTableVisual.tsx   # Buckets + chains
    visuals/SortingBarsVisual.tsx # Bar chart sorting animation
    visuals/GenericVisual.tsx     # Fallback text-based trace
  store/
    types.ts                      # All TypeScript interfaces
    gameStore.ts                  # Zustand store
  data/
    index.ts                      # Re-exports all zones
    zones.ts                      # Zone metadata
    zone1.ts  ... zone11.ts       # Boss node content
  lib/
    pistonApi.ts                  # execute(lang, code) → output
    xpSystem.ts                   # levelFromXP(), xpForLevel()
    storage.ts                    # saveProgress(), loadProgress()
  hooks/
    useFight.ts                   # Fight state machine hook
```

---

### Task 1: Project Scaffold

**Files:**
- Create: `package.json`, `next.config.ts`, `tailwind.config.ts`, `tsconfig.json`
- Create: `src/app/layout.tsx`, `src/app/globals.css`

- [ ] **Step 1: Init Next.js project**

```bash
cd /home/arysmart/Projects/Platforms/idea
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*" --yes
```

- [ ] **Step 2: Install dependencies**

```bash
npm install zustand @monaco-editor/react framer-motion
npm install -D @types/node
```

- [ ] **Step 3: Update `app/layout.tsx`**

```tsx
import type { Metadata } from 'next'
import { Press_Start_2P } from 'next/font/google'
import './globals.css'

const pixelFont = Press_Start_2P({ subsets: ['latin'], weight: '400', variable: '--font-pixel' })

export const metadata: Metadata = {
  title: 'Algorithm Catacombs',
  description: 'Master DSA through dungeon combat',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={pixelFont.variable}>
      <body className="bg-gray-950 text-green-400 font-pixel min-h-screen">{children}</body>
    </html>
  )
}
```

- [ ] **Step 4: Update `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root { --font-pixel: 'Press Start 2P'; }
}

.font-pixel { font-family: var(--font-pixel), monospace; }

/* Scanline effect */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px);
  pointer-events: none;
  z-index: 9999;
}
```

- [ ] **Step 5: Verify dev server starts**

```bash
npm run dev
```
Expected: Next.js starts on http://localhost:3000 with dark green-on-black screen.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: scaffold Next.js project with pixel font and dark theme"
```

---

### Task 2: TypeScript Types

**Files:**
- Create: `src/store/types.ts`

- [ ] **Step 1: Write `src/store/types.ts`**

```typescript
export type Language = 'python' | 'typescript' | 'go' | 'rust' | 'csharp' | 'cpp'
export type VisualType = 'array' | 'linkedlist' | 'stack' | 'queue' | 'tree' | 'graph' | 'hashtable' | 'sortingbars' | 'generic'
export type ZoneId = 1|2|3|4|5|6|7|8|9|10|11
export type Category = 'ds' | 'algo'

export interface Complexity {
  time: Record<string, string>   // { "access": "O(1)", "search": "O(n)" }
  space: string
  notes: string
}

export interface Question {
  id: string
  text: string
  options: string[]        // exactly 4
  correct: number          // 0-indexed
  explanation: string      // shown after answering
  damage: number           // HP dealt to boss on correct answer (10-25)
}

export interface TraceStep {
  label: string            // "Push 42 onto stack"
  state: Record<string, unknown>  // visual component reads this
  highlight?: number[]     // indices to highlight
  annotation?: string      // optional code line reference
}

export interface VisualizationSpec {
  type: VisualType
  title: string            // "Watch: BFS traversal on a graph"
  initialState: Record<string, unknown>
  steps: TraceStep[]
}

export interface CodeTemplate {
  language: Language
  starterCode: string      // code with ___ blanks
  solution: string         // complete solution
  testCases: Array<{ input: string; expected: string }>
  hints: string[]
}

export interface BossNode {
  id: string               // "Z1-01", "Z4-02", etc.
  name: string             // "Binary Search"
  zone: ZoneId
  category: Category
  position: number         // 1-indexed within zone

  // Lore
  lore: string             // RPG flavor text (2-3 sentences)
  bossName: string         // "The Binary Sentinel"
  bossAscii: string        // multi-line ASCII art (8-10 lines)
  bossHP: number           // total HP (100-200)

  // Teaching content
  what: string             // What is this? (3-5 sentences)
  why: string              // Why does it exist? Problem it solves
  when: string             // When to use it vs alternatives
  complexity: Complexity
  realWorldUses: string[]  // ["Python list()", "Go slice", "Rust Vec<T>"]

  // Fight phases
  questions: Question[]    // exactly 5 questions for Phase 1
  visualization: VisualizationSpec  // Phase 2
  codeTemplates: Record<Language, CodeTemplate>  // Phase 3 (all 6 langs)

  // Progression
  prerequisites: string[]  // boss IDs that must be defeated first
  xpReward: number
  loot: string[]           // badge names / item names
}

export interface Zone {
  id: ZoneId
  name: string
  subtitle: string
  theme: string            // tailwind color class e.g. "green"
  description: string
  bosses: BossNode[]
}

// Game state
export interface PlayerState {
  level: number
  xp: number
  hp: number
  maxHp: number
  inventory: string[]      // item/badge names
  defeatedBosses: string[] // boss IDs
  achievements: string[]
}

export interface FightState {
  bossId: string
  phase: 1 | 2 | 3 | 'victory' | 'defeat'
  playerHp: number
  bossHp: number
  currentQuestion: number
  answeredQuestions: boolean[]
  traceStep: number
  selectedLanguage: Language
  code: string
  codeOutput: string | null
  codeCorrect: boolean | null
}
```

- [ ] **Step 2: Commit**

```bash
git add src/store/types.ts && git commit -m "feat: add TypeScript types for all game entities"
```

---

### Task 3: Game Store

**Files:**
- Create: `src/lib/storage.ts`
- Create: `src/lib/xpSystem.ts`
- Create: `src/store/gameStore.ts`

- [ ] **Step 1: Write `src/lib/xpSystem.ts`**

```typescript
// XP required to reach level N: 100 * N^1.5
export function xpForLevel(level: number): number {
  return Math.floor(100 * Math.pow(level, 1.5))
}

export function levelFromXP(totalXP: number): number {
  let level = 1
  while (xpForLevel(level + 1) <= totalXP) level++
  return level
}

export function xpProgress(totalXP: number): { level: number; current: number; needed: number } {
  const level = levelFromXP(totalXP)
  const prev = level > 1 ? xpForLevel(level) : 0
  const next = xpForLevel(level + 1)
  return { level, current: totalXP - prev, needed: next - prev }
}
```

- [ ] **Step 2: Write `src/lib/storage.ts`**

```typescript
import type { PlayerState } from '@/store/types'

const KEY = 'algo-catacombs-save'

const DEFAULT_PLAYER: PlayerState = {
  level: 1, xp: 0, hp: 100, maxHp: 100,
  inventory: [], defeatedBosses: [], achievements: [],
}

export function saveProgress(state: PlayerState): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(KEY, JSON.stringify(state))
}

export function loadProgress(): PlayerState {
  if (typeof window === 'undefined') return DEFAULT_PLAYER
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? { ...DEFAULT_PLAYER, ...JSON.parse(raw) } : DEFAULT_PLAYER
  } catch {
    return DEFAULT_PLAYER
  }
}

export function resetProgress(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(KEY)
}
```

- [ ] **Step 3: Write `src/store/gameStore.ts`**

```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { PlayerState, FightState, Language } from './types'
import { levelFromXP, xpForLevel } from '@/lib/xpSystem'

interface GameStore {
  player: PlayerState
  fight: FightState | null

  // Player actions
  gainXP: (amount: number) => void
  defeatBoss: (bossId: string, xpReward: number, loot: string[]) => void
  resetGame: () => void

  // Fight actions
  startFight: (bossId: string, bossHP: number) => void
  answerQuestion: (correct: boolean, damage: number, playerDamage: number) => void
  advancePhase: () => void
  setTraceStep: (step: number) => void
  setLanguage: (lang: Language) => void
  setCode: (code: string) => void
  setCodeResult: (output: string, correct: boolean) => void
  endFight: (victory: boolean) => void
}

const DEFAULT_PLAYER: PlayerState = {
  level: 1, xp: 0, hp: 100, maxHp: 100,
  inventory: [], defeatedBosses: [], achievements: [],
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      player: DEFAULT_PLAYER,
      fight: null,

      gainXP: (amount) => set((s) => {
        const newXP = s.player.xp + amount
        const newLevel = levelFromXP(newXP)
        const hpBonus = newLevel > s.player.level ? 20 : 0
        return {
          player: {
            ...s.player,
            xp: newXP,
            level: newLevel,
            maxHp: s.player.maxHp + hpBonus,
            hp: Math.min(s.player.hp + hpBonus, s.player.maxHp + hpBonus),
          }
        }
      }),

      defeatBoss: (bossId, xpReward, loot) => set((s) => ({
        player: {
          ...s.player,
          defeatedBosses: [...s.player.defeatedBosses, bossId],
          inventory: [...s.player.inventory, ...loot],
        }
      })),

      resetGame: () => set({ player: DEFAULT_PLAYER, fight: null }),

      startFight: (bossId, bossHP) => set((s) => ({
        fight: {
          bossId, phase: 1,
          playerHp: s.player.hp, bossHp: bossHP,
          currentQuestion: 0, answeredQuestions: [],
          traceStep: 0, selectedLanguage: 'python',
          code: '', codeOutput: null, codeCorrect: null,
        }
      })),

      answerQuestion: (correct, damage, playerDamage) => set((s) => {
        if (!s.fight) return {}
        return {
          fight: {
            ...s.fight,
            bossHp: correct ? Math.max(0, s.fight.bossHp - damage) : s.fight.bossHp,
            playerHp: correct ? s.fight.playerHp : Math.max(0, s.fight.playerHp - playerDamage),
            currentQuestion: s.fight.currentQuestion + 1,
            answeredQuestions: [...s.fight.answeredQuestions, correct],
          }
        }
      }),

      advancePhase: () => set((s) => {
        if (!s.fight) return {}
        const next = s.fight.phase === 1 ? 2 : s.fight.phase === 2 ? 3 : 'victory'
        return { fight: { ...s.fight, phase: next as FightState['phase'] } }
      }),

      setTraceStep: (step) => set((s) => ({
        fight: s.fight ? { ...s.fight, traceStep: step } : null
      })),

      setLanguage: (lang) => set((s) => ({
        fight: s.fight ? { ...s.fight, selectedLanguage: lang, code: '', codeOutput: null, codeCorrect: null } : null
      })),

      setCode: (code) => set((s) => ({
        fight: s.fight ? { ...s.fight, code } : null
      })),

      setCodeResult: (output, correct) => set((s) => ({
        fight: s.fight ? { ...s.fight, codeOutput: output, codeCorrect: correct } : null
      })),

      endFight: (victory) => set((s) => ({
        fight: s.fight ? { ...s.fight, phase: victory ? 'victory' : 'defeat' } : null,
        player: victory ? s.player : { ...s.player, hp: Math.max(1, s.player.hp - 20) }
      })),
    }),
    { name: 'algo-catacombs' }
  )
)
```

- [ ] **Step 4: Commit**

```bash
git add src/ && git commit -m "feat: add game store, XP system, localStorage persistence"
```

---

### Task 4: Piston API Integration

**Files:**
- Create: `src/lib/pistonApi.ts`

- [ ] **Step 1: Write `src/lib/pistonApi.ts`**

```typescript
export type PistonLanguage = 'python' | 'typescript' | 'go' | 'rust' | 'csharp' | 'cpp'

const PISTON_URL = 'https://emkc.org/api/v2/piston/execute'

const LANG_MAP: Record<PistonLanguage, { language: string; version: string }> = {
  python:     { language: 'python',     version: '3.10.0' },
  typescript: { language: 'typescript', version: '5.0.3' },
  go:         { language: 'go',         version: '1.16.2' },
  rust:       { language: 'rust',       version: '1.50.0' },
  csharp:     { language: 'csharp',     version: '6.12.0' },
  cpp:        { language: 'c++',        version: '10.2.0' },
}

export interface ExecuteResult {
  stdout: string
  stderr: string
  exitCode: number
}

export async function executeCode(
  language: PistonLanguage,
  code: string,
  stdin = ''
): Promise<ExecuteResult> {
  const { language: lang, version } = LANG_MAP[language]
  const resp = await fetch(PISTON_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      language: lang,
      version,
      files: [{ content: code }],
      stdin,
    }),
  })
  if (!resp.ok) throw new Error(`Piston API error: ${resp.status}`)
  const data = await resp.json()
  return {
    stdout: data.run?.stdout ?? '',
    stderr: data.run?.stderr ?? '',
    exitCode: data.run?.code ?? 1,
  }
}

// Checks if output matches expected (trims whitespace)
export function checkOutput(actual: string, expected: string): boolean {
  return actual.trim() === expected.trim()
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/pistonApi.ts && git commit -m "feat: Piston API integration for 6-language code execution"
```

---

### Task 5: Zone 1 Data (Foundation Vaults — 5 nodes)

**Files:**
- Create: `src/data/zone1.ts`

- [ ] **Step 1: Write `src/data/zone1.ts` with all 5 boss nodes**

Each node fully populated: lore, what/why/when, complexity, realWorldUses, 5 questions, visualization spec, codeTemplates for all 6 languages.

```typescript
import type { Zone } from '@/store/types'

export const zone1: Zone = {
  id: 1,
  name: 'Foundation Vaults',
  subtitle: 'The Thinking Tools',
  theme: 'emerald',
  description: 'Ancient chambers where the laws of computation were first carved in stone.',
  bosses: [
    {
      id: 'Z1-01',
      name: 'Big-O Analysis',
      zone: 1, category: 'algo', position: 1,
      lore: 'Before the first algorithm was born, The Complexity Oracle set the laws. It watches every operation, every loop, every call — judging not by seconds, but by growth.',
      bossName: 'The Complexity Oracle',
      bossHP: 100,
      bossAscii: `
  ╔═══════════════╗
  ║   O(?)  BOSS  ║
  ║    👁️  👁️     ║
  ║      ___      ║
  ║   O(n²) !!    ║
  ║   /     \\    ║
  ╚═══════════════╝`,
      what: 'Big-O notation describes the upper bound of an algorithm\'s growth rate as input size n approaches infinity. It classifies algorithms by how their time or space requirements scale, ignoring constant factors and lower-order terms.',
      why: 'Without Big-O, you cannot compare algorithms objectively. A 1-second algorithm on 100 items might take 100 seconds on 1000 items (O(n²)) or only 2 seconds (O(n log n)). Big-O gives you a language to predict and justify performance.',
      when: 'Always. Every time you choose a data structure or algorithm, you are implicitly choosing a complexity class. Explicit Big-O analysis is most critical when n is large (>10,000) or performance is a constraint.',
      complexity: {
        time: { 'analysis itself': 'O(1) — reading the code' },
        space: 'O(1)',
        notes: 'Common classes in order: O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ) < O(n!)',
      },
      realWorldUses: ['Every code review discussion', 'System design interviews', 'Database query planning', 'Algorithm textbooks'],
      questions: [
        {
          id: 'Z1-01-Q1',
          text: 'What does O(n²) mean for an algorithm?',
          options: ['Runs in exactly n² milliseconds', 'Time grows quadratically with input size', 'Uses n² bytes of memory', 'Has n² recursive calls'],
          correct: 1,
          explanation: 'Big-O describes growth rate, not absolute time. O(n²) means if n doubles, runtime roughly quadruples.',
          damage: 20,
        },
        {
          id: 'Z1-01-Q2',
          text: 'Which is fastest for large n?',
          options: ['O(n log n)', 'O(n²)', 'O(2ⁿ)', 'O(n³)'],
          correct: 0,
          explanation: 'O(n log n) grows slowest. At n=1000: n log n ≈ 10,000 vs n² = 1,000,000.',
          damage: 20,
        },
        {
          id: 'Z1-01-Q3',
          text: 'What is the Big-O of: for i in range(n): for j in range(n): print(i,j)?',
          options: ['O(n)', 'O(log n)', 'O(n²)', 'O(2n)'],
          correct: 2,
          explanation: 'Two nested loops each running n times = n × n = O(n²).',
          damage: 20,
        },
        {
          id: 'Z1-01-Q4',
          text: 'O(3n² + 100n + 5) simplifies to?',
          options: ['O(3n²)', 'O(n² + n)', 'O(n²)', 'O(100n)'],
          correct: 2,
          explanation: 'Drop constants and lower-order terms. Dominant term is n², so O(n²).',
          damage: 20,
        },
        {
          id: 'Z1-01-Q5',
          text: 'Binary search on a sorted array is:',
          options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'],
          correct: 1,
          explanation: 'Binary search halves the search space each step. log₂(n) steps total = O(log n).',
          damage: 20,
        },
      ],
      visualization: {
        type: 'generic',
        title: 'Watch: How n² vs n log n diverge',
        initialState: { chart: [
          { n: 10,   nlogn: 33,    n2: 100 },
          { n: 100,  nlogn: 665,   n2: 10000 },
          { n: 1000, nlogn: 9966,  n2: 1000000 },
        ]},
        steps: [
          { label: 'At n=10: O(n log n)=33 ops, O(n²)=100 ops — close', state: { active: 0 } },
          { label: 'At n=100: O(n log n)=665, O(n²)=10,000 — 15× gap', state: { active: 1 } },
          { label: 'At n=1000: O(n log n)=9,966, O(n²)=1,000,000 — 100× gap!', state: { active: 2 } },
        ],
      },
      codeTemplates: {
        python: {
          language: 'python',
          starterCode: `# Count operations for each algorithm and print complexities
def linear_scan(arr):
    count = 0
    for item in arr:   # runs ___ times
        count += 1
    return count

def nested_scan(arr):
    count = 0
    for i in arr:
        for j in arr:  # total runs: ___
            count += 1
    return count

n = 10
arr = list(range(n))
print(f"Linear: {linear_scan(arr)} operations (O(___))") 
print(f"Nested: {nested_scan(arr)} operations (O(___))")`,
          solution: `def linear_scan(arr):
    count = 0
    for item in arr:
        count += 1
    return count

def nested_scan(arr):
    count = 0
    for i in arr:
        for j in arr:
            count += 1
    return count

n = 10
arr = list(range(n))
print(f"Linear: {linear_scan(arr)} operations (O(n))")
print(f"Nested: {nested_scan(arr)} operations (O(n^2))")`,
          testCases: [{ input: '', expected: 'Linear: 10 operations (O(n))\nNested: 100 operations (O(n^2))' }],
          hints: ['n=10 so linear loop runs 10 times', 'Nested loop runs n×n = 100 times'],
        },
        typescript: {
          language: 'typescript',
          starterCode: `function linearScan(arr: number[]): number {
  let count = 0
  for (const _ of arr) count++  // runs ___ times
  return count
}

function nestedScan(arr: number[]): number {
  let count = 0
  for (const i of arr)
    for (const j of arr) count++  // total: ___
  return count
}

const arr = Array.from({length: 10}, (_, i) => i)
console.log(\`Linear: \${linearScan(arr)} operations (O(___)))\`)
console.log(\`Nested: \${nestedScan(arr)} operations (O(___)))\`)`,
          solution: `function linearScan(arr: number[]): number {
  let count = 0
  for (const _ of arr) count++
  return count
}
function nestedScan(arr: number[]): number {
  let count = 0
  for (const i of arr) for (const j of arr) count++
  return count
}
const arr = Array.from({length: 10}, (_, i) => i)
console.log(\`Linear: \${linearScan(arr)} operations (O(n))\`)
console.log(\`Nested: \${nestedScan(arr)} operations (O(n^2))\`)`,
          testCases: [{ input: '', expected: 'Linear: 10 operations (O(n))\nNested: 100 operations (O(n^2))' }],
          hints: ['Fill the blanks with n and n*n', 'n=10 here'],
        },
        go: {
          language: 'go',
          starterCode: `package main
import "fmt"

func linearScan(arr []int) int {
  count := 0
  for range arr { count++ }  // ___ iterations
  return count
}

func nestedScan(arr []int) int {
  count := 0
  for range arr {
    for range arr { count++ }  // total: ___
  }
  return count
}

func main() {
  arr := make([]int, 10)
  fmt.Printf("Linear: %d operations (O(___)\\n", linearScan(arr))
  fmt.Printf("Nested: %d operations (O(___)\\n", nestedScan(arr))
}`,
          solution: `package main
import "fmt"
func linearScan(arr []int) int { count := 0; for range arr { count++ }; return count }
func nestedScan(arr []int) int { count := 0; for range arr { for range arr { count++ } }; return count }
func main() {
  arr := make([]int, 10)
  fmt.Printf("Linear: %d operations (O(n))\\n", linearScan(arr))
  fmt.Printf("Nested: %d operations (O(n^2))\\n", nestedScan(arr))
}`,
          testCases: [{ input: '', expected: 'Linear: 10 operations (O(n))\nNested: 100 operations (O(n^2))' }],
          hints: ['Replace ___ with n and n^2'],
        },
        rust: {
          language: 'rust',
          starterCode: `fn linear_scan(arr: &[i32]) -> usize {
    arr.iter().count()  // O(___)
}

fn nested_scan(arr: &[i32]) -> usize {
    let mut count = 0;
    for _ in arr { for _ in arr { count += 1; } }  // O(___)
    count
}

fn main() {
    let arr: Vec<i32> = (0..10).collect();
    println!("Linear: {} operations (O(___))", linear_scan(&arr));
    println!("Nested: {} operations (O(___))", nested_scan(&arr));
}`,
          solution: `fn linear_scan(arr: &[i32]) -> usize { arr.iter().count() }
fn nested_scan(arr: &[i32]) -> usize { let mut c=0; for _ in arr { for _ in arr { c+=1; } } c }
fn main() {
    let arr: Vec<i32> = (0..10).collect();
    println!("Linear: {} operations (O(n))", linear_scan(&arr));
    println!("Nested: {} operations (O(n^2))", nested_scan(&arr));
}`,
          testCases: [{ input: '', expected: 'Linear: 10 operations (O(n))\nNested: 100 operations (O(n^2))' }],
          hints: ['n=10, nested is n*n=100'],
        },
        csharp: {
          language: 'csharp',
          starterCode: `using System;
using System.Linq;

int LinearScan(int[] arr) => arr.Length;  // O(___)
int NestedScan(int[] arr) {
    int count = 0;
    foreach (var i in arr)
        foreach (var j in arr) count++;  // O(___)
    return count;
}

var arr = Enumerable.Range(0, 10).ToArray();
Console.WriteLine($"Linear: {LinearScan(arr)} operations (O(___))");
Console.WriteLine($"Nested: {NestedScan(arr)} operations (O(___))");`,
          solution: `using System; using System.Linq;
int LinearScan(int[] arr) => arr.Length;
int NestedScan(int[] arr) { int c=0; foreach(var i in arr) foreach(var j in arr) c++; return c; }
var arr = Enumerable.Range(0, 10).ToArray();
Console.WriteLine($"Linear: {LinearScan(arr)} operations (O(n))");
Console.WriteLine($"Nested: {NestedScan(arr)} operations (O(n^2))");`,
          testCases: [{ input: '', expected: 'Linear: 10 operations (O(n))\nNested: 100 operations (O(n^2))' }],
          hints: ['Fill blanks: n and n^2'],
        },
        cpp: {
          language: 'cpp',
          starterCode: `#include <iostream>
#include <vector>
using namespace std;

int linearScan(vector<int>& arr) { return arr.size(); }  // O(___)
int nestedScan(vector<int>& arr) {
    int count = 0;
    for (auto& i : arr) for (auto& j : arr) count++;  // O(___)
    return count;
}

int main() {
    vector<int> arr(10);
    cout << "Linear: " << linearScan(arr) << " operations (O(___))" << endl;
    cout << "Nested: " << nestedScan(arr) << " operations (O(___))" << endl;
}`,
          solution: `#include <iostream>
#include <vector>
using namespace std;
int linearScan(vector<int>& arr) { return arr.size(); }
int nestedScan(vector<int>& arr) { int c=0; for(auto&i:arr) for(auto&j:arr) c++; return c; }
int main() {
    vector<int> arr(10);
    cout << "Linear: " << linearScan(arr) << " operations (O(n))" << endl;
    cout << "Nested: " << nestedScan(arr) << " operations (O(n^2))" << endl;
}`,
          testCases: [{ input: '', expected: 'Linear: 10 operations (O(n))\nNested: 100 operations (O(n^2))' }],
          hints: ['n and n^2 fill the blanks'],
        },
      },
      prerequisites: [],
      xpReward: 100,
      loot: ['Complexity Scroll', 'Big-O Badge'],
    },
    // Z1-02 through Z1-05 follow same structure...
    // Recursion + Memoization, Divide & Conquer, Greedy, Two Pointers
  ],
}
```

> **NOTE:** Nodes Z1-02 through Z1-05 and all subsequent zones follow the EXACT same shape. The plan includes Z1-01 as the canonical template. All remaining 79 nodes must be populated in zone2.ts through zone11.ts with full content (lore, what/why/when, complexity, questions×5, visualization, codeTemplates×6). This is the largest content task — treat each zone file as its own sub-task.

- [ ] **Step 2: Commit**

```bash
git add src/data/ && git commit -m "feat: Zone 1 Foundation Vaults boss data"
```

---

### Task 6: Data Index + Zones Metadata

**Files:**
- Create: `src/data/zones.ts`
- Create: `src/data/index.ts`
- Create: `src/data/zone2.ts` through `src/data/zone11.ts` (stubs — populate incrementally)

- [ ] **Step 1: Write `src/data/zones.ts`**

```typescript
export const ZONE_META = [
  { id: 1,  name: 'Foundation Vaults',  subtitle: 'Thinking Tools',        theme: 'emerald', nodeCount: 5 },
  { id: 2,  name: 'Search Chambers',    subtitle: 'Finding the Way',       theme: 'cyan',    nodeCount: 3 },
  { id: 3,  name: 'Sort Halls',         subtitle: 'Order from Chaos',      theme: 'blue',    nodeCount: 7 },
  { id: 4,  name: 'Linear Crypts',      subtitle: 'Primitives',            theme: 'violet',  nodeCount: 7 },
  { id: 5,  name: 'Hash Sanctum',       subtitle: 'O(1) Temple',           theme: 'amber',   nodeCount: 7 },
  { id: 6,  name: 'Tree Kingdom',       subtitle: 'Hierarchical Dominion', theme: 'lime',    nodeCount: 10 },
  { id: 7,  name: 'Deep Roots',         subtitle: 'Advanced Trees',        theme: 'teal',    nodeCount: 5 },
  { id: 8,  name: 'Graph Realm',        subtitle: 'Connected Worlds',      theme: 'rose',    nodeCount: 10 },
  { id: 9,  name: 'DP Forge',           subtitle: 'Optimal Substructure',  theme: 'orange',  nodeCount: 6 },
  { id: 10, name: 'String Labyrinth',   subtitle: 'Pattern Matching',      theme: 'pink',    nodeCount: 5 },
  { id: 11, name: 'Shadow Citadel',     subtitle: 'The Arcane Finals',     theme: 'red',     nodeCount: 15 },
] as const
```

- [ ] **Step 2: Write `src/data/index.ts`**

```typescript
export { zone1 } from './zone1'
// export { zone2 } from './zone2'  // uncomment as zones are populated
// ... zones 3-11

import { zone1 } from './zone1'
import type { BossNode, Zone } from '@/store/types'

export const ALL_ZONES: Zone[] = [zone1]  // add zones as populated

export function getBoss(id: string): BossNode | undefined {
  for (const zone of ALL_ZONES) {
    const boss = zone.bosses.find(b => b.id === id)
    if (boss) return boss
  }
}

export function isBossUnlocked(bossId: string, defeatedBosses: string[]): boolean {
  const boss = getBoss(bossId)
  if (!boss) return false
  return boss.prerequisites.every(req => defeatedBosses.includes(req))
}
```

- [ ] **Step 3: Commit**

```bash
git add src/data/ && git commit -m "feat: zone metadata and data index with unlock logic"
```

---

### Task 7: UI Components — Base

**Files:**
- Create: `src/components/ui/HPBar.tsx`
- Create: `src/components/ui/PixelButton.tsx`

- [ ] **Step 1: Write `src/components/ui/HPBar.tsx`**

```tsx
interface HPBarProps {
  current: number
  max: number
  color?: 'green' | 'red' | 'blue' | 'yellow'
  label?: string
  showNumbers?: boolean
}

export function HPBar({ current, max, color = 'green', label, showNumbers = true }: HPBarProps) {
  const pct = Math.max(0, Math.min(100, (current / max) * 100))
  const colorMap = { green: 'bg-green-500', red: 'bg-red-500', blue: 'bg-blue-500', yellow: 'bg-yellow-500' }
  return (
    <div className="w-full">
      {(label || showNumbers) && (
        <div className="flex justify-between text-xs mb-1">
          {label && <span className="text-gray-400">{label}</span>}
          {showNumbers && <span className="text-white">{current}/{max}</span>}
        </div>
      )}
      <div className="w-full bg-gray-800 h-4 border border-gray-600 relative overflow-hidden">
        <div
          className={`h-full ${colorMap[color]} transition-all duration-500`}
          style={{ width: `${pct}%` }}
        />
        {/* Pixel tick marks */}
        {[25, 50, 75].map(tick => (
          <div key={tick} className="absolute top-0 bottom-0 w-px bg-black/30" style={{ left: `${tick}%` }} />
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Write `src/components/ui/PixelButton.tsx`**

```tsx
import { ButtonHTMLAttributes } from 'react'

interface PixelButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger' | 'ghost' | 'success'
  size?: 'sm' | 'md' | 'lg'
}

export function PixelButton({ children, variant = 'primary', size = 'md', className = '', ...props }: PixelButtonProps) {
  const variants = {
    primary: 'bg-green-800 hover:bg-green-700 border-green-500 text-green-300 hover:text-green-100',
    danger:  'bg-red-900 hover:bg-red-800 border-red-500 text-red-300 hover:text-red-100',
    ghost:   'bg-transparent hover:bg-gray-800 border-gray-600 text-gray-400 hover:text-gray-200',
    success: 'bg-emerald-800 hover:bg-emerald-700 border-emerald-400 text-emerald-200',
  }
  const sizes = { sm: 'px-2 py-1 text-xs', md: 'px-4 py-2 text-sm', lg: 'px-6 py-3 text-base' }
  return (
    <button
      className={`font-pixel border-2 transition-all duration-150 active:translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/ && git commit -m "feat: reusable HP bar and pixel button UI components"
```

---

### Task 8: Dungeon Map Screen

**Files:**
- Create: `src/components/map/BossNode.tsx`
- Create: `src/components/map/ZonePanel.tsx`
- Create: `src/components/map/DungeonMap.tsx`
- Create: `src/app/map/page.tsx`

- [ ] **Step 1: Write `src/components/map/BossNode.tsx`**

```tsx
import Link from 'next/link'
import type { BossNode as BossNodeType } from '@/store/types'

interface Props {
  boss: BossNodeType
  status: 'locked' | 'available' | 'defeated'
}

export function BossNode({ boss, status }: Props) {
  const icons = { locked: '🔒', available: '⚔️', defeated: '✅' }
  const borders = {
    locked:    'border-gray-700 text-gray-600 cursor-not-allowed',
    available: 'border-green-500 text-green-300 hover:border-green-300 hover:bg-green-950/50 cursor-pointer',
    defeated:  'border-gray-600 text-gray-500 cursor-pointer',
  }

  const inner = (
    <div className={`border-2 p-3 text-xs transition-all ${borders[status]}`}>
      <div className="text-lg mb-1">{icons[status]}</div>
      <div className="font-bold truncate">{boss.name}</div>
      <div className="text-gray-500 mt-1">{boss.id}</div>
      {status === 'available' && (
        <div className="text-yellow-400 mt-2">FIGHT →</div>
      )}
    </div>
  )

  if (status === 'locked') return inner
  return <Link href={`/fight/${boss.id}`}>{inner}</Link>
}
```

- [ ] **Step 2: Write `src/components/map/ZonePanel.tsx`**

```tsx
import type { Zone } from '@/store/types'
import { BossNode } from './BossNode'

interface Props {
  zone: Zone
  defeatedBosses: string[]
  allBossIds: string[]
}

export function ZonePanel({ zone, defeatedBosses, allBossIds }: Props) {
  function getStatus(boss: Zone['bosses'][0]): 'locked' | 'available' | 'defeated' {
    if (defeatedBosses.includes(boss.id)) return 'defeated'
    if (boss.prerequisites.every(p => defeatedBosses.includes(p))) return 'available'
    return 'locked'
  }

  const defeated = zone.bosses.filter(b => defeatedBosses.includes(b.id)).length
  const total = zone.bosses.length

  return (
    <div className="border border-gray-700 p-4 mb-4">
      <div className="flex justify-between items-center mb-3">
        <div>
          <h2 className="text-green-400 text-sm font-bold">ZONE {zone.id}: {zone.name}</h2>
          <p className="text-gray-500 text-xs mt-1">{zone.subtitle}</p>
        </div>
        <div className="text-xs text-gray-400">{defeated}/{total} cleared</div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
        {zone.bosses.map(boss => (
          <BossNode key={boss.id} boss={boss} status={getStatus(boss)} />
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Write `src/components/map/DungeonMap.tsx`**

```tsx
'use client'
import { useGameStore } from '@/store/gameStore'
import { ALL_ZONES } from '@/data/index'
import { ZonePanel } from './ZonePanel'
import { HPBar } from '@/components/ui/HPBar'
import { xpProgress } from '@/lib/xpSystem'

export function DungeonMap() {
  const player = useGameStore(s => s.player)
  const { level, current, needed } = xpProgress(player.xp)
  const allBossIds = ALL_ZONES.flatMap(z => z.bosses.map(b => b.id))

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Player HUD */}
      <div className="border border-green-800 p-4 mb-6 bg-gray-900/50">
        <div className="flex justify-between items-start mb-3">
          <div>
            <div className="text-green-400 font-bold">ALGORITHMANCER</div>
            <div className="text-xs text-gray-400">LEVEL {level}</div>
          </div>
          <div className="text-xs text-gray-400">
            {player.defeatedBosses.length}/{allBossIds.length} bosses defeated
          </div>
        </div>
        <div className="space-y-2">
          <HPBar current={player.hp} max={player.maxHp} color="green" label="HP" />
          <HPBar current={current} max={needed} color="blue" label="XP" showNumbers={false} />
        </div>
      </div>

      {/* Zone list */}
      <div className="text-green-600 text-xs mb-4">
        ═══════════ THE ALGORITHM CATACOMBS ═══════════
      </div>
      {ALL_ZONES.map(zone => (
        <ZonePanel
          key={zone.id}
          zone={zone}
          defeatedBosses={player.defeatedBosses}
          allBossIds={allBossIds}
        />
      ))}
    </div>
  )
}
```

- [ ] **Step 4: Write `src/app/map/page.tsx`**

```tsx
import { DungeonMap } from '@/components/map/DungeonMap'

export default function MapPage() {
  return (
    <main className="min-h-screen bg-gray-950 py-8">
      <DungeonMap />
    </main>
  )
}
```

- [ ] **Step 5: Commit**

```bash
git add src/components/map/ src/app/map/ && git commit -m "feat: dungeon map screen with zone panels and boss nodes"
```

---

### Task 9: Phase 1 — Quiz Component

**Files:**
- Create: `src/components/fight/Phase1Quiz.tsx`

- [ ] **Step 1: Write `src/components/fight/Phase1Quiz.tsx`**

```tsx
'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Question } from '@/store/types'
import { PixelButton } from '@/components/ui/PixelButton'

interface Props {
  questions: Question[]
  currentIndex: number
  onAnswer: (correct: boolean, damage: number, playerDamage: number) => void
  onComplete: () => void
}

export function Phase1Quiz({ questions, currentIndex, onAnswer, onComplete }: Props) {
  const [selected, setSelected] = useState<number | null>(null)
  const [revealed, setRevealed] = useState(false)

  const q = questions[currentIndex]
  if (!q) return null

  function choose(idx: number) {
    if (revealed) return
    setSelected(idx)
    setRevealed(true)
    const correct = idx === q.correct
    onAnswer(correct, q.damage, 15)
  }

  function next() {
    setSelected(null)
    setRevealed(false)
    if (currentIndex + 1 >= questions.length) onComplete()
    else onAnswer(false, 0, 0)  // triggers advance in parent
  }

  const optionStyle = (idx: number) => {
    if (!revealed) return 'border-gray-600 text-gray-300 hover:border-green-500 hover:text-green-300 cursor-pointer'
    if (idx === q.correct) return 'border-green-500 bg-green-950 text-green-300'
    if (idx === selected && idx !== q.correct) return 'border-red-500 bg-red-950 text-red-300'
    return 'border-gray-700 text-gray-600'
  }

  return (
    <div className="space-y-4">
      <div className="text-xs text-gray-400">PHASE 1: CONCEPT DUEL — Question {currentIndex + 1}/{questions.length}</div>

      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="border border-gray-700 p-4 bg-gray-900"
        >
          <p className="text-green-300 text-sm mb-4">{q.text}</p>
          <div className="grid grid-cols-1 gap-2">
            {q.options.map((opt, idx) => (
              <div
                key={idx}
                onClick={() => choose(idx)}
                className={`border-2 p-3 text-xs transition-all ${optionStyle(idx)}`}
              >
                <span className="text-gray-500 mr-2">[{String.fromCharCode(65 + idx)}]</span>
                {opt}
              </div>
            ))}
          </div>

          {revealed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 p-3 border text-xs ${selected === q.correct ? 'border-green-700 bg-green-950/50 text-green-300' : 'border-red-700 bg-red-950/50 text-red-300'}`}
            >
              {selected === q.correct ? '⚔️ CRITICAL HIT! ' : '💀 BOSS STRIKES! '}
              {q.explanation}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {revealed && (
        <PixelButton onClick={next} variant={currentIndex + 1 >= questions.length ? 'success' : 'primary'}>
          {currentIndex + 1 >= questions.length ? 'ENTER PHASE 2 →' : 'NEXT QUESTION →'}
        </PixelButton>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/fight/Phase1Quiz.tsx && git commit -m "feat: Phase 1 quiz combat component with reveal animations"
```

---

### Task 10: Phase 2 — Visual Trace Components

**Files:**
- Create: `src/components/visuals/ArrayVisual.tsx`
- Create: `src/components/visuals/StackVisual.tsx`
- Create: `src/components/visuals/TreeVisual.tsx`
- Create: `src/components/visuals/GenericVisual.tsx`
- Create: `src/components/fight/Phase2Visual.tsx`

- [ ] **Step 1: Write `src/components/visuals/ArrayVisual.tsx`**

```tsx
'use client'
import { motion } from 'framer-motion'

interface Props {
  values: (number | string | null)[]
  highlights?: number[]
  pointers?: Record<string, number>  // { "left": 0, "right": 4, "mid": 2 }
}

export function ArrayVisual({ values, highlights = [], pointers = {} }: Props) {
  const pointerAtIndex: Record<number, string[]> = {}
  Object.entries(pointers).forEach(([name, idx]) => {
    if (!pointerAtIndex[idx]) pointerAtIndex[idx] = []
    pointerAtIndex[idx].push(name)
  })

  return (
    <div className="space-y-3">
      {/* Pointer labels */}
      <div className="flex gap-1">
        {values.map((_, i) => (
          <div key={i} className="w-12 text-center text-xs text-yellow-400 h-4">
            {pointerAtIndex[i]?.join(',') ?? ''}
          </div>
        ))}
      </div>
      {/* Array cells */}
      <div className="flex gap-1">
        {values.map((val, i) => (
          <motion.div
            key={i}
            layout
            animate={{ scale: highlights.includes(i) ? 1.15 : 1 }}
            className={`w-12 h-12 border-2 flex items-center justify-center text-sm font-bold transition-colors
              ${highlights.includes(i) ? 'border-yellow-400 bg-yellow-950 text-yellow-300' : 'border-gray-600 bg-gray-900 text-gray-300'}
              ${val === null ? 'text-gray-700' : ''}`}
          >
            {val ?? '·'}
          </motion.div>
        ))}
      </div>
      {/* Index labels */}
      <div className="flex gap-1">
        {values.map((_, i) => (
          <div key={i} className="w-12 text-center text-xs text-gray-600">{i}</div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Write `src/components/visuals/GenericVisual.tsx`**

```tsx
interface Props {
  label: string
  annotation?: string
}

export function GenericVisual({ label, annotation }: Props) {
  return (
    <div className="border border-gray-700 p-6 bg-gray-900 text-center space-y-3">
      <div className="text-green-300 text-sm">{label}</div>
      {annotation && (
        <div className="text-xs text-gray-500 font-mono border border-gray-800 p-2 text-left">{annotation}</div>
      )}
    </div>
  )
}
```

- [ ] **Step 3: Write `src/components/fight/Phase2Visual.tsx`**

```tsx
'use client'
import type { VisualizationSpec, TraceStep } from '@/store/types'
import { ArrayVisual } from '@/components/visuals/ArrayVisual'
import { GenericVisual } from '@/components/visuals/GenericVisual'
import { PixelButton } from '@/components/ui/PixelButton'

interface Props {
  spec: VisualizationSpec
  currentStep: number
  onStepChange: (step: number) => void
  onComplete: () => void
}

export function Phase2Visual({ spec, currentStep, onStepChange, onComplete }: Props) {
  const step: TraceStep = spec.steps[currentStep]
  const isLast = currentStep >= spec.steps.length - 1

  function renderVisual() {
    const state = step.state as Record<string, unknown>
    switch (spec.type) {
      case 'array':
        return (
          <ArrayVisual
            values={(state.values as (number | string | null)[]) ?? []}
            highlights={(step.highlight ?? []) as number[]}
            pointers={(state.pointers as Record<string, number>) ?? {}}
          />
        )
      default:
        return <GenericVisual label={step.label} annotation={step.annotation} />
    }
  }

  return (
    <div className="space-y-4">
      <div className="text-xs text-gray-400">
        PHASE 2: VISUAL TRACE — Step {currentStep + 1}/{spec.steps.length}
      </div>
      <div className="text-sm text-cyan-400 border-b border-gray-700 pb-2">{spec.title}</div>

      <div className="min-h-32 border border-gray-700 p-4 bg-gray-900/50 flex items-center justify-center overflow-x-auto">
        {renderVisual()}
      </div>

      <div className="text-xs text-green-300 border border-green-900 bg-green-950/20 p-3">
        ▶ {step.label}
      </div>

      {/* Step scrubber */}
      <div className="flex gap-1 flex-wrap">
        {spec.steps.map((_, i) => (
          <button
            key={i}
            onClick={() => onStepChange(i)}
            className={`w-6 h-6 text-xs border transition-colors
              ${i === currentStep ? 'border-green-400 bg-green-900 text-green-300' : 'border-gray-700 text-gray-600 hover:border-gray-500'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        {currentStep > 0 && (
          <PixelButton variant="ghost" size="sm" onClick={() => onStepChange(currentStep - 1)}>← PREV</PixelButton>
        )}
        {!isLast ? (
          <PixelButton variant="primary" size="sm" onClick={() => onStepChange(currentStep + 1)}>NEXT →</PixelButton>
        ) : (
          <PixelButton variant="success" onClick={onComplete}>ENTER PHASE 3 →</PixelButton>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/visuals/ src/components/fight/Phase2Visual.tsx && git commit -m "feat: Phase 2 visual trace with array and generic visualizations"
```

---

### Task 11: Phase 3 — Code Duel

**Files:**
- Create: `src/components/fight/Phase3Code.tsx`

- [ ] **Step 1: Write `src/components/fight/Phase3Code.tsx`**

```tsx
'use client'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import type { CodeTemplate, Language } from '@/store/types'
import { executeCode, checkOutput } from '@/lib/pistonApi'
import { PixelButton } from '@/components/ui/PixelButton'

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false })

const LANG_MONACO: Record<Language, string> = {
  python: 'python', typescript: 'typescript', go: 'go',
  rust: 'rust', csharp: 'csharp', cpp: 'cpp',
}

const LANG_LABELS: Record<Language, string> = {
  python: 'Python', typescript: 'TypeScript', go: 'Go',
  rust: 'Rust', csharp: 'C#', cpp: 'C++',
}

interface Props {
  templates: Record<Language, CodeTemplate>
  selectedLanguage: Language
  code: string
  codeOutput: string | null
  codeCorrect: boolean | null
  onLanguageChange: (lang: Language) => void
  onCodeChange: (code: string) => void
  onResult: (output: string, correct: boolean) => void
  onComplete: () => void
}

export function Phase3Code({
  templates, selectedLanguage, code, codeOutput, codeCorrect,
  onLanguageChange, onCodeChange, onResult, onComplete,
}: Props) {
  const [running, setRunning] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const template = templates[selectedLanguage]
  const displayCode = code || template.starterCode

  async function runCode() {
    setRunning(true)
    setError(null)
    try {
      const result = await executeCode(selectedLanguage, displayCode)
      if (result.exitCode !== 0 && result.stderr) {
        setError(result.stderr)
        onResult(result.stderr, false)
      } else {
        const correct = template.testCases.every(tc =>
          checkOutput(result.stdout, tc.expected)
        )
        onResult(result.stdout, correct)
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Execution failed')
    } finally {
      setRunning(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="text-xs text-gray-400">PHASE 3: CODE DUEL</div>

      {/* Language selector */}
      <div className="flex gap-2 flex-wrap">
        {(Object.keys(LANG_LABELS) as Language[]).map(lang => (
          <button
            key={lang}
            onClick={() => onLanguageChange(lang)}
            className={`px-3 py-1 text-xs border transition-colors
              ${selectedLanguage === lang
                ? 'border-green-400 bg-green-900 text-green-200'
                : 'border-gray-700 text-gray-500 hover:border-gray-500'}`}
          >
            {LANG_LABELS[lang]}
          </button>
        ))}
      </div>

      {/* Task description */}
      <div className="text-xs text-gray-400 border border-gray-800 p-3 bg-gray-900/50">
        Fill in the blanks (<span className="text-yellow-400">___</span>) to complete the implementation.
        Your code will be tested against {template.testCases.length} test case(s).
      </div>

      {/* Monaco editor */}
      <div className="border border-gray-700 overflow-hidden" style={{ height: 300 }}>
        <MonacoEditor
          height="300px"
          language={LANG_MONACO[selectedLanguage]}
          value={displayCode}
          onChange={v => onCodeChange(v ?? '')}
          theme="vs-dark"
          options={{
            fontSize: 13,
            fontFamily: 'monospace',
            minimap: { enabled: false },
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            wordWrap: 'on',
          }}
        />
      </div>

      {/* Hints */}
      <details className="text-xs">
        <summary className="text-gray-500 cursor-pointer hover:text-gray-300">💡 Hints</summary>
        <ul className="mt-2 space-y-1 pl-4 text-gray-400">
          {template.hints.map((h, i) => <li key={i}>• {h}</li>)}
        </ul>
      </details>

      {/* Run button */}
      <div className="flex gap-3 items-center">
        <PixelButton onClick={runCode} disabled={running}>
          {running ? 'RUNNING...' : '▶ EXECUTE CODE'}
        </PixelButton>
        {codeCorrect === true && (
          <PixelButton variant="success" onClick={onComplete}>BOSS DEFEATED! →</PixelButton>
        )}
      </div>

      {/* Output */}
      {(codeOutput !== null || error) && (
        <div className={`border p-3 text-xs font-mono whitespace-pre-wrap
          ${codeCorrect === true ? 'border-green-600 bg-green-950/30 text-green-300' :
            codeCorrect === false ? 'border-red-700 bg-red-950/30 text-red-300' :
            'border-gray-700 bg-gray-900 text-gray-300'}`}>
          {codeCorrect === true && '✅ ALL TESTS PASS — BOSS DEFEATED!\n\n'}
          {codeCorrect === false && '❌ TESTS FAILED — TRY AGAIN\n\n'}
          {error ?? codeOutput}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/fight/Phase3Code.tsx && git commit -m "feat: Phase 3 code duel with Monaco editor and Piston API execution"
```

---

### Task 12: Fight Arena Orchestrator

**Files:**
- Create: `src/components/fight/BossDisplay.tsx`
- Create: `src/components/fight/PlayerHUD.tsx`
- Create: `src/components/fight/FightResult.tsx`
- Create: `src/components/fight/FightArena.tsx`
- Create: `src/app/fight/[bossId]/page.tsx`

- [ ] **Step 1: Write `src/components/fight/BossDisplay.tsx`**

```tsx
import { HPBar } from '@/components/ui/HPBar'

interface Props {
  bossName: string
  bossAscii: string
  hp: number
  maxHp: number
  phase: 1 | 2 | 3 | 'victory' | 'defeat'
}

export function BossDisplay({ bossName, bossAscii, hp, maxHp, phase }: Props) {
  const defeated = phase === 'victory'
  return (
    <div className="border border-red-900 bg-gray-900 p-4 text-center">
      <div className={`font-mono text-red-400 text-xs whitespace-pre leading-tight mb-3 ${defeated ? 'opacity-30 line-through' : ''}`}>
        {bossAscii}
      </div>
      <div className="text-red-300 font-bold text-sm mb-2">{bossName}</div>
      <HPBar current={hp} max={maxHp} color="red" label="BOSS HP" />
      {defeated && <div className="text-yellow-400 text-xs mt-2 animate-pulse">** DEFEATED **</div>}
    </div>
  )
}
```

- [ ] **Step 2: Write `src/components/fight/PlayerHUD.tsx`**

```tsx
import { HPBar } from '@/components/ui/HPBar'
import { xpProgress } from '@/lib/xpSystem'

interface Props { hp: number; maxHp: number; totalXP: number; phase: 1 | 2 | 3 | 'victory' | 'defeat' }

export function PlayerHUD({ hp, maxHp, totalXP, phase }: Props) {
  const { level, current, needed } = xpProgress(totalXP)
  return (
    <div className="border border-green-900 bg-gray-900 p-4">
      <div className="flex justify-between mb-2">
        <span className="text-green-400 font-bold text-sm">ALGORITHMANCER</span>
        <span className="text-xs text-gray-400">LVL {level}</span>
      </div>
      <div className="space-y-2">
        <HPBar current={hp} max={maxHp} color="green" label="HP" />
        <HPBar current={current} max={needed} color="blue" label="XP" showNumbers={false} />
      </div>
      <div className="text-xs text-gray-500 mt-2">
        PHASE {typeof phase === 'number' ? phase : phase.toUpperCase()} OF 3
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Write `src/components/fight/FightResult.tsx`**

```tsx
import { PixelButton } from '@/components/ui/PixelButton'
import Link from 'next/link'

interface Props {
  victory: boolean
  bossName: string
  xpGained: number
  loot: string[]
}

export function FightResult({ victory, bossName, xpGained, loot }: Props) {
  return (
    <div className={`border-2 p-8 text-center space-y-4 ${victory ? 'border-yellow-500 bg-yellow-950/20' : 'border-red-700 bg-red-950/20'}`}>
      <div className="text-2xl">{victory ? '🏆' : '💀'}</div>
      <div className={`font-bold text-lg ${victory ? 'text-yellow-400' : 'text-red-400'}`}>
        {victory ? `${bossName} DEFEATED!` : 'FALLEN IN BATTLE'}
      </div>
      {victory && (
        <>
          <div className="text-green-400 text-sm">+{xpGained} XP</div>
          <div className="text-xs text-gray-400 space-y-1">
            {loot.map(item => <div key={item}>🎁 {item}</div>)}
          </div>
        </>
      )}
      <Link href="/map">
        <PixelButton variant={victory ? 'success' : 'ghost'} className="mt-4">
          {victory ? 'RETURN TO MAP' : 'RETREAT TO MAP'}
        </PixelButton>
      </Link>
    </div>
  )
}
```

- [ ] **Step 4: Write `src/components/fight/FightArena.tsx`**

```tsx
'use client'
import { useEffect } from 'react'
import { useGameStore } from '@/store/gameStore'
import { getBoss } from '@/data/index'
import { BossDisplay } from './BossDisplay'
import { PlayerHUD } from './PlayerHUD'
import { Phase1Quiz } from './Phase1Quiz'
import { Phase2Visual } from './Phase2Visual'
import { Phase3Code } from './Phase3Code'
import { FightResult } from './FightResult'
import type { Language } from '@/store/types'

export function FightArena({ bossId }: { bossId: string }) {
  const boss = getBoss(bossId)
  const fight = useGameStore(s => s.fight)
  const player = useGameStore(s => s.player)
  const { startFight, answerQuestion, advancePhase, setTraceStep, setLanguage, setCode, setCodeResult, endFight, defeatBoss, gainXP } = useGameStore()

  useEffect(() => {
    if (!fight || fight.bossId !== bossId) {
      if (boss) startFight(bossId, boss.bossHP)
    }
  }, [bossId])

  if (!boss) return <div className="text-red-400 p-8">Boss not found: {bossId}</div>
  if (!fight || fight.bossId !== bossId) return <div className="text-gray-400 p-8">Loading fight...</div>

  const isVictory = fight.phase === 'victory'
  const isDefeat = fight.phase === 'defeat'

  function handlePhase1Answer(correct: boolean, damage: number, playerDamage: number) {
    answerQuestion(correct, damage, playerDamage)
  }

  function handlePhase1Complete() {
    if (fight!.playerHp <= 0) { endFight(false); return }
    advancePhase()
  }

  function handlePhase3Complete() {
    endFight(true)
    defeatBoss(bossId, boss!.xpReward, boss!.loot)
    gainXP(boss!.xpReward)
  }

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      {/* Boss info header */}
      <div className="text-xs text-gray-600 border-b border-gray-800 pb-2">
        {boss.id} — {boss.name}
      </div>

      {/* Boss display */}
      <BossDisplay
        bossName={boss.bossName}
        bossAscii={boss.bossAscii}
        hp={fight.bossHp}
        maxHp={boss.bossHP}
        phase={fight.phase}
      />

      {/* Player HUD */}
      <PlayerHUD hp={fight.playerHp} maxHp={player.maxHp} totalXP={player.xp} phase={fight.phase} />

      {/* Lore */}
      <div className="text-xs text-gray-500 italic border-l-2 border-gray-700 pl-3">{boss.lore}</div>

      {/* Phase content */}
      <div className="border border-gray-700 p-4 bg-gray-900/30">
        {fight.phase === 1 && (
          <Phase1Quiz
            questions={boss.questions}
            currentIndex={fight.currentQuestion}
            onAnswer={handlePhase1Answer}
            onComplete={handlePhase1Complete}
          />
        )}
        {fight.phase === 2 && (
          <Phase2Visual
            spec={boss.visualization}
            currentStep={fight.traceStep}
            onStepChange={setTraceStep}
            onComplete={advancePhase}
          />
        )}
        {fight.phase === 3 && (
          <Phase3Code
            templates={boss.codeTemplates}
            selectedLanguage={fight.selectedLanguage as Language}
            code={fight.code}
            codeOutput={fight.codeOutput}
            codeCorrect={fight.codeCorrect}
            onLanguageChange={setLanguage}
            onCodeChange={setCode}
            onResult={setCodeResult}
            onComplete={handlePhase3Complete}
          />
        )}
        {(isVictory || isDefeat) && (
          <FightResult
            victory={isVictory}
            bossName={boss.bossName}
            xpGained={boss.xpReward}
            loot={boss.loot}
          />
        )}
      </div>

      {/* Teaching content (always visible) */}
      <details className="border border-gray-800 bg-gray-900/20">
        <summary className="p-3 text-xs text-gray-400 cursor-pointer hover:text-gray-200">📖 Study Notes</summary>
        <div className="p-4 space-y-3 text-xs text-gray-300">
          <div><span className="text-green-400 font-bold">WHAT: </span>{boss.what}</div>
          <div><span className="text-blue-400 font-bold">WHY: </span>{boss.why}</div>
          <div><span className="text-yellow-400 font-bold">WHEN: </span>{boss.when}</div>
          <div>
            <span className="text-purple-400 font-bold">COMPLEXITY:</span>
            <div className="mt-1 pl-2 space-y-1">
              {Object.entries(boss.complexity.time).map(([op, c]) => (
                <div key={op}>{op}: <span className="text-cyan-400">{c}</span></div>
              ))}
              <div>Space: <span className="text-cyan-400">{boss.complexity.space}</span></div>
              <div className="text-gray-500 italic">{boss.complexity.notes}</div>
            </div>
          </div>
          <div>
            <span className="text-orange-400 font-bold">REAL WORLD: </span>
            {boss.realWorldUses.join(' • ')}
          </div>
        </div>
      </details>
    </div>
  )
}
```

- [ ] **Step 5: Write `src/app/fight/[bossId]/page.tsx`**

```tsx
import { FightArena } from '@/components/fight/FightArena'

export default function FightPage({ params }: { params: { bossId: string } }) {
  return (
    <main className="min-h-screen bg-gray-950 py-8">
      <FightArena bossId={params.bossId} />
    </main>
  )
}
```

- [ ] **Step 6: Commit**

```bash
git add src/components/fight/ src/app/fight/ && git commit -m "feat: complete fight arena with all 3 phases orchestrated"
```

---

### Task 13: Home Screen

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Write `src/app/page.tsx`**

```tsx
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="text-center space-y-8 max-w-lg">
        <pre className="text-green-400 text-xs leading-tight">
{`
  ╔═══════════════════════════════╗
  ║   A L G O R I T H M          ║
  ║     C A T A C O M B S        ║
  ╚═══════════════════════════════╝
      ⚔️  Master DSA or Die  ⚔️
`}
        </pre>

        <div className="text-xs text-gray-500 space-y-1">
          <div>34 Data Structures • 46 Algorithms</div>
          <div>80 Bosses • 11 Zones • 6 Languages</div>
        </div>

        <div className="space-y-3">
          <Link href="/map" className="block">
            <div className="border-2 border-green-500 bg-green-950/30 hover:bg-green-900/50 p-4 text-green-300 text-sm transition-all cursor-pointer">
              ▶ ENTER THE CATACOMBS
            </div>
          </Link>
          <div className="text-xs text-gray-600">
            Your progress is saved automatically
          </div>
        </div>

        <div className="text-xs text-gray-700 border-t border-gray-800 pt-4">
          Phase 1: Concept Quiz → Phase 2: Visual Trace → Phase 3: Code Duel
        </div>
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Commit + verify**

```bash
git add src/app/page.tsx && git commit -m "feat: home/title screen"
npm run dev
```

Expected: Title screen visible at localhost:3000, dungeon map at /map, fight works at /fight/Z1-01.

---

### Task 14: Remaining Content (Zones 2–11)

This is the largest task — populate all 79 remaining boss nodes across zones 2–11. Each file follows the exact same shape as `zone1.ts`.

**Boss list per zone:**

| Zone | File | Bosses |
|------|------|--------|
| 2 | `zone2.ts` | Linear Search, Binary Search, Exponential Search |
| 3 | `zone3.ts` | Insertion Sort, Merge Sort, Quicksort, Heapsort, Timsort, Counting Sort, Radix Sort |
| 4 | `zone4.ts` | Array, Dynamic Array, Linked List, Stack, Queue, Deque, Ring Buffer |
| 5 | `zone5.ts` | Hash Set, Hash Map, LRU Cache, LFU Cache, Hash Lookup (collision), Quickselect, Reservoir Sampling |
| 6 | `zone6.ts` | General Tree, BST, Red-Black Tree, Heap, Priority Queue, Trie, Tree Traversals, BST Ops, Self-balancing, Trie Ops |
| 7 | `zone7.ts` | B-Tree, Skip List, Segment Tree, Fenwick Tree, Merkle Tree |
| 8 | `zone8.ts` | Graph, Union-Find, BFS, DFS, Topological Sort, Dijkstra, Bellman-Ford, Floyd-Warshall, MST, A* |
| 9 | `zone9.ts` | DP Fundamentals, 0/1 Knapsack, LCS, Edit Distance, Matrix Chain, LIS |
| 10 | `zone10.ts` | KMP, Rabin-Karp, Boyer-Moore, Z-Algorithm, Aho-Corasick |
| 11 | `zone11.ts` | Bloom Filter, HyperLogLog, Count-Min Sketch, Cuckoo Filter, Rope, Gap Buffer, Suffix Array, Quadtree, KD-Tree, R-Tree, Backtracking, Bit Tricks, Bloom Filter Ops, Consistent Hashing, Rate Limiting |

Each boss requires:
- `lore` (2-3 sentences RPG flavor)
- `bossName` + `bossAscii` (8-line ASCII art)
- `bossHP` (100-200)
- `what` / `why` / `when` (teaching content)
- `complexity` (time table + space + notes)
- `realWorldUses` (3-5 examples)
- `questions` (exactly 5 MCQs with explanations)
- `visualization` (typed spec with steps)
- `codeTemplates` (all 6 languages with starter + solution + testCases + hints)
- `prerequisites` (boss IDs)
- `xpReward` + `loot`

- [ ] **Step 1: Populate zone2.ts** (3 bosses)
- [ ] **Step 2: Populate zone3.ts** (7 bosses)
- [ ] **Step 3: Populate zone4.ts** (7 bosses)
- [ ] **Step 4: Populate zone5.ts** (7 bosses)
- [ ] **Step 5: Populate zone6.ts** (10 bosses)
- [ ] **Step 6: Populate zone7.ts** (5 bosses)
- [ ] **Step 7: Populate zone8.ts** (10 bosses)
- [ ] **Step 8: Populate zone9.ts** (6 bosses)
- [ ] **Step 9: Populate zone10.ts** (5 bosses)
- [ ] **Step 10: Populate zone11.ts** (15 bosses)
- [ ] **Step 11: Update `src/data/index.ts`** to export all zones and add to ALL_ZONES

---

### Verification

After Task 13 (before full content):
```bash
npm run dev
# → localhost:3000 shows title screen
# → /map shows Zone 1 with 5 nodes
# → /fight/Z1-01 loads Big-O boss, all 3 phases work
# → defeating boss awards XP and marks node defeated on map
```

After Task 14:
```bash
npm run dev
# → all 11 zones visible on map
# → all 80 nodes accessible
# → code execution works in all 6 languages via Piston API
```

Build check:
```bash
npm run build
# → no TypeScript errors, no build failures
```
