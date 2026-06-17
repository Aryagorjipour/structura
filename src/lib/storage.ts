import type { PlayerState } from '@/store/types'

const KEY = 'structura-save'

const DEFAULT_PLAYER: PlayerState = {
  level: 1, xp: 0, hp: 100, maxHp: 100,
  inventory: [], defeatedBosses: [], achievements: [],
  skillPoints: 0, unlockedSkills: [],
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
