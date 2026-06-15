import type { Zone, BossNode } from '../store/types'
import { zone1 } from './zone1'
import { zone2 } from './zone2'
import { zone3 } from './zone3'
import { zone4 } from './zone4'
import { zone5 } from './zone5'
import { zone6 } from './zone6'
import { zone7 } from './zone7'
import { zone8 } from './zone8'
import zone9 from './zone9'
import zone10 from './zone10'
import zone11 from './zone11'

export { ZONE_META, TOTAL_BOSSES } from './zones'
export type { ZoneMeta } from './zones'

export const ALL_ZONES: Zone[] = [
  zone1, zone2, zone3, zone4, zone5,
  zone6, zone7, zone8, zone9, zone10, zone11,
]

export const ALL_BOSSES: BossNode[] = ALL_ZONES.flatMap(z => z.bosses)

export function getBoss(id: string): BossNode | undefined {
  return ALL_BOSSES.find(b => b.id === id)
}

export function getZone(id: number): Zone | undefined {
  return ALL_ZONES.find(z => z.id === id)
}

export function isBossUnlocked(bossId: string, defeatedBosses: string[]): boolean {
  const boss = getBoss(bossId)
  if (!boss) return false
  if (!boss.prerequisites || boss.prerequisites.length === 0) return true
  return boss.prerequisites.every(preId => defeatedBosses.includes(preId))
}

export function getNextBoss(zoneId: number, defeatedBosses: string[]): BossNode | undefined {
  const zone = getZone(zoneId)
  if (!zone) return undefined
  return zone.bosses.find(
    b => !defeatedBosses.includes(b.id) && isBossUnlocked(b.id, defeatedBosses)
  )
}
