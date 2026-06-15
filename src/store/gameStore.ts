import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { PlayerState, FightState, Language } from './types'
import { levelFromXP } from '@/lib/xpSystem'

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
    (set) => ({
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
    }),
    { name: 'algo-catacombs' }
  )
)
