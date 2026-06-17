import type { Quest, QuestReward } from '@/store/types'
import { ZONE_META } from '@/data/zones'

const DAILY_TEMPLATES: Array<{ title: string; description: string; target: number; reward: QuestReward }> = [
  { title: 'Dungeon Crawler', description: 'Defeat 2 bosses today', target: 2, reward: { xp: 150 } },
  { title: 'Python Sorcerer', description: 'Win a Code Duel in Python', target: 1, reward: { xp: 200, items: ['Scroll of Insight'] } },
  { title: 'Go Warrior', description: 'Win a Code Duel in Go', target: 1, reward: { xp: 200, items: ['Scroll of Insight'] } },
  { title: 'Perfect Scholar', description: 'Achieve a perfect quiz (0 wrong answers)', target: 1, reward: { xp: 250, badge: 'perfect-quiz' } },
  { title: 'Phase Walker', description: 'Complete a Visual Trace phase on any boss', target: 1, reward: { xp: 100 } },
  { title: 'Hintless Hero', description: 'Defeat a boss without using any hints', target: 1, reward: { xp: 180, items: ['Tome of Clarity'] } },
]

const WEEKLY_TEMPLATES: Array<{ title: string; description: string; target: number; reward: QuestReward }> = [
  { title: 'Structura Veteran', description: 'Defeat 7 bosses this week', target: 7, reward: { xp: 800, items: ['Ancient Scroll', 'Rune Fragment'] } },
  { title: 'Zone Conqueror', description: 'Fully clear any zone', target: 1, reward: { xp: 600, badge: 'zone-conqueror' } },
  { title: 'Depths Explorer', description: 'Defeat a boss from Zone 6 or higher', target: 1, reward: { xp: 400, items: ['Scroll of Power'] } },
  { title: 'Rust Initiate', description: 'Win a Code Duel in Rust', target: 1, reward: { xp: 350, items: ['Iron Tome'] } },
]

function pickRandom<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, n)
}

export function generateDailyQuests(): Quest[] {
  const picked = pickRandom(DAILY_TEMPLATES, 3)
  const expiresAt = new Date()
  expiresAt.setUTCHours(24, 0, 0, 0)
  return picked.map((t, i) => ({
    id: `daily-${Date.now()}-${i}`,
    type: 'daily' as const,
    title: t.title,
    description: t.description,
    progress: 0,
    target: t.target,
    reward: t.reward,
    expiresAt: expiresAt.getTime(),
  }))
}

export function generateWeeklyQuests(): Quest[] {
  const picked = pickRandom(WEEKLY_TEMPLATES, 2)
  const nextMonday = new Date()
  nextMonday.setUTCDate(nextMonday.getUTCDate() + ((1 + 7 - nextMonday.getUTCDay()) % 7 || 7))
  nextMonday.setUTCHours(0, 0, 0, 0)
  return picked.map((t, i) => ({
    id: `weekly-${Date.now()}-${i}`,
    type: 'weekly' as const,
    title: t.title,
    description: t.description,
    progress: 0,
    target: t.target,
    reward: t.reward,
    expiresAt: nextMonday.getTime(),
  }))
}

export function generateStoryQuests(): Quest[] {
  return ZONE_META.map((zone) => ({
    id: `story-zone-${zone.id}`,
    type: 'story' as const,
    title: `Clear the ${zone.name}`,
    description: `Defeat all ${zone.bossCount} bosses in Zone ${zone.id}: ${zone.name}`,
    progress: 0,
    target: zone.bossCount,
    reward: {
      xp: zone.bossCount * 100,
      badge: `zone-${zone.id}-cleared`,
      items: ['Zone Completion Scroll'],
    },
    zoneId: zone.id,
  }))
}

export function updateStoryQuestProgress(quests: Quest[], defeatedBossIds: string[], allBosses: Array<{id: string; zone: number}>): Quest[] {
  return quests.map(q => {
    if (q.type !== 'story' || !q.zoneId || q.completedAt) return q
    const zoneDefeated = allBosses.filter(b => b.zone === q.zoneId && defeatedBossIds.includes(b.id)).length
    return { ...q, progress: zoneDefeated }
  })
}

export function checkSideQuestCompletion(
  questDef: { condition: string; conditionParam?: string },
  context: {
    quizPerfect: boolean
    durationMs: number
    selectedLanguage: string
    hintsUsed: number
  }
): boolean {
  switch (questDef.condition) {
    case 'perfect_quiz': return context.quizPerfect
    case 'speed_run': return context.durationMs < 90000  // under 90 seconds
    case 'language_challenge': return context.selectedLanguage === questDef.conditionParam
    case 'no_hints': return context.hintsUsed === 0
    default: return false
  }
}
