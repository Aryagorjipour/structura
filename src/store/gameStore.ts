import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { PlayerState, FightState, Language, Quest } from './types'
import { levelFromXP } from '@/lib/xpSystem'

interface GameStore {
  player: PlayerState
  fight: FightState | null
  quests: Quest[]
  questResetTimestamps: { daily: number; weekly: number }

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

  // Quest actions
  initQuests: () => void
  completeQuest: (id: string) => void
  updateQuestProgress: (id: string, delta: number) => void
  checkAndResetTimedQuests: () => void
  addQuests: (quests: Quest[]) => void

  // Skill actions
  unlockSkill: (skillId: string, cost: number) => void
}

const DEFAULT_PLAYER: PlayerState = {
  level: 1, xp: 0, hp: 100, maxHp: 100,
  inventory: [], defeatedBosses: [], achievements: [],
  skillPoints: 0,
  unlockedSkills: [],
}

export const useGameStore = create<GameStore>()(
  persist(
    (set) => ({
      player: DEFAULT_PLAYER,
      fight: null,
      quests: [],
      questResetTimestamps: { daily: 0, weekly: 0 },

      gainXP: (amount) => set((s) => {
        const newXP = s.player.xp + amount
        const newLevel = levelFromXP(newXP)
        const leveledUp = newLevel > s.player.level
        const hpBonus = leveledUp ? 20 : 0
        return {
          player: {
            ...s.player,
            xp: newXP,
            level: newLevel,
            maxHp: s.player.maxHp + hpBonus,
            hp: Math.min(s.player.hp + hpBonus, s.player.maxHp + hpBonus),
            skillPoints: s.player.skillPoints + (leveledUp ? 1 : 0),
          }
        }
      }),

      defeatBoss: (bossId, _xpReward, loot) => set((s) => ({
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

      initQuests: () => set((s) => {
        const now = Date.now()
        const midnightUTC = new Date()
        midnightUTC.setUTCHours(24, 0, 0, 0)
        const nextMonday = new Date()
        nextMonday.setUTCDate(nextMonday.getUTCDate() + ((1 + 7 - nextMonday.getUTCDay()) % 7 || 7))
        nextMonday.setUTCHours(0, 0, 0, 0)
        const needsDaily = now > s.questResetTimestamps.daily
        const needsWeekly = now > s.questResetTimestamps.weekly
        return {
          questResetTimestamps: {
            daily: needsDaily ? midnightUTC.getTime() : s.questResetTimestamps.daily,
            weekly: needsWeekly ? nextMonday.getTime() : s.questResetTimestamps.weekly,
          }
        }
      }),

      completeQuest: (id) => set((s) => ({
        quests: s.quests.map(q =>
          q.id === id && !q.completedAt
            ? { ...q, completedAt: Date.now(), progress: q.target }
            : q
        ),
        player: (() => {
          const quest = s.quests.find(q => q.id === id)
          if (!quest || quest.completedAt) return s.player
          return {
            ...s.player,
            xp: s.player.xp + (quest.reward.xp ?? 0),
            inventory: [...s.player.inventory, ...(quest.reward.items ?? [])],
            achievements: quest.reward.badge ? [...s.player.achievements, quest.reward.badge] : s.player.achievements,
          }
        })(),
      })),

      updateQuestProgress: (id, delta) => set((s) => ({
        quests: s.quests.map(q => {
          if (q.id !== id || q.completedAt) return q
          const newProgress = Math.min(q.progress + delta, q.target)
          return { ...q, progress: newProgress }
        })
      })),

      checkAndResetTimedQuests: () => set((s) => {
        const now = Date.now()
        if (now > s.questResetTimestamps.daily) {
          return { quests: s.quests.filter(q => q.type !== 'daily') }
        }
        return {}
      }),

      addQuests: (newQuests) => set((s) => ({
        quests: [...s.quests, ...newQuests.filter(nq => !s.quests.find(q => q.id === nq.id))]
      })),

      unlockSkill: (skillId, cost) => set((s) => {
        if (s.player.skillPoints < cost) return {}
        if (s.player.unlockedSkills.includes(skillId)) return {}
        return {
          player: {
            ...s.player,
            skillPoints: s.player.skillPoints - cost,
            unlockedSkills: [...s.player.unlockedSkills, skillId],
          }
        }
      }),
    }),
    { name: 'algo-catacombs' }
  )
)
