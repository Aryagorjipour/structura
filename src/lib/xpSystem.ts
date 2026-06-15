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
