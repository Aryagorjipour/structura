export type Language = 'python' | 'typescript' | 'go' | 'rust' | 'csharp' | 'cpp'
export type VisualType = 'array' | 'linkedlist' | 'stack' | 'queue' | 'tree' | 'graph' | 'hashtable' | 'sortingbars' | 'generic'
export type ZoneId = 1|2|3|4|5|6|7|8|9|10|11
export type Category = 'ds' | 'algo' | 'data-structure'

export interface Complexity {
  time: Record<string, string>
  space: string
  notes: string
}

// Question type that works with both old (correct) and new (correctIndex) schemas
export interface Question {
  id: string
  text: string
  options: string[]
  correct?: number         // 0-indexed (zones 1-8)
  correctIndex?: number    // 0-indexed (zones 9-11)
  explanation: string
  damage?: number          // HP dealt to boss on correct answer (zones 1-8)
}

// TraceStep works with both old (label/state) and new (description/arrayState) schemas
export interface TraceStep {
  label?: string
  description?: string
  state?: Record<string, unknown>
  arrayState?: number[]
  highlight?: number[]
  highlightIndices?: number[]
  annotation?: string
}

export interface VisualizationSpec {
  type: VisualType
  title?: string
  initialState?: Record<string, unknown>
  steps: TraceStep[]
}

export interface CodeTemplate {
  language?: Language
  starterCode?: string
  solution?: string
  testCases?: Array<{ input: string; expected: string }>
  hints?: string[]
}

export interface BossNode {
  id: string
  name: string
  zone: ZoneId
  category: Category
  position: number

  // Lore
  lore: string
  bossName: string
  bossAscii: string
  bossHP: number

  // Teaching content — zones 1-8 use what/why/when/complexity/realWorldUses
  what?: string
  why?: string
  when?: string
  complexity?: Complexity
  realWorldUses?: string[]
  // zones 9-11 use teachContent
  teachContent?: string

  // Fight phases
  questions: Question[]
  // zones 1-8 use visualization, zones 9-11 use visualSpec
  visualization?: VisualizationSpec
  visualSpec?: VisualizationSpec
  // zones 1-8: Record<Language, CodeTemplate>, zones 9-11: Record<Language, string>
  codeTemplates: Record<Language, CodeTemplate | string>

  // zones 9-11 testCases at BossNode level
  testCases?: Array<{ input: string; expectedOutput: string }>

  prerequisites: string[]
  xpReward: number
  loot?: string[]
  sideQuests?: SideQuestDef[]
}

export interface Zone {
  id: ZoneId
  name: string
  subtitle?: string
  theme: string
  description: string
  bosses: BossNode[]
}

export interface PlayerState {
  level: number
  xp: number
  hp: number
  maxHp: number
  inventory: string[]
  defeatedBosses: string[]
  achievements: string[]
  skillPoints: number
  unlockedSkills: string[]
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

// ===== QUEST SYSTEM =====
export type QuestType = 'story' | 'side' | 'daily' | 'weekly'

export interface QuestReward {
  xp?: number
  items?: string[]
  badge?: string
}

export interface SideQuestDef {
  id: string
  title: string
  description: string
  condition: 'perfect_quiz' | 'speed_run' | 'language_challenge' | 'no_hints'
  conditionParam?: string   // e.g. 'rust' for language_challenge
  reward: QuestReward
}

export interface Quest {
  id: string
  type: QuestType
  title: string
  description: string
  progress: number
  target: number
  reward: QuestReward
  expiresAt?: number
  completedAt?: number
  zoneId?: number
  bossId?: string
}

// ===== SKILL SYSTEM =====
export interface SkillNode {
  id: string
  name: string
  description: string
  tier: 1 | 2 | 3 | 4
  cost: number
  prerequisites: string[]  // skill ids
  effect: string           // human-readable effect key
}

// ===== PROFILE SYSTEM =====
export interface ProfileState {
  username: string
  avatarId: string  // one of the AVATAR_IDS
  hasCompletedOnboarding: boolean
  joinedAt: number  // timestamp
}

// ===== ACTIVE FIGHT PERSISTENCE =====
export interface SavedQuizState {
  answers: Array<{ selected: number; wasCorrect: boolean }>
  score: number
}

export interface ActiveFight {
  bossId: string
  phase: 1 | 2 | 3
  bossHpPercent: number  // 0 to 1 (fraction of original bossHP remaining)
  savedQuizState: SavedQuizState | null
  savedTraceStep: number
  savedLanguage: Language
  savedCode: string
  startedAt: number
}
