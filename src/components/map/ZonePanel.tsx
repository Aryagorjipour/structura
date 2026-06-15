'use client'

import type { Zone } from '../../store/types'
import { isBossUnlocked } from '../../data'
import BossNodeComponent from './BossNode'

interface ZonePanelProps {
  zone: Zone
  defeatedBosses: string[]
}

const THEME_COLORS: Record<string, string> = {
  green:  'border-green-700 bg-green-950/30',
  cyan:   'border-cyan-700 bg-cyan-950/30',
  yellow: 'border-yellow-700 bg-yellow-950/30',
  orange: 'border-orange-700 bg-orange-950/30',
  pink:   'border-pink-700 bg-pink-950/30',
  teal:   'border-teal-700 bg-teal-950/30',
  indigo: 'border-indigo-700 bg-indigo-950/30',
  violet: 'border-violet-700 bg-violet-950/30',
  blue:   'border-blue-700 bg-blue-950/30',
  purple: 'border-purple-700 bg-purple-950/30',
  red:    'border-red-700 bg-red-950/30',
}

export default function ZonePanel({ zone, defeatedBosses }: ZonePanelProps) {
  const themeClass = THEME_COLORS[zone.theme] ?? THEME_COLORS.green
  const defeatedCount = zone.bosses.filter(b => defeatedBosses.includes(b.id)).length

  return (
    <div className={`border p-4 mb-4 ${themeClass}`}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="font-pixel text-sm text-gray-200">
            Zone {zone.id}: {zone.name}
          </h2>
          <p className="text-xs text-gray-500 mt-1">{zone.description}</p>
        </div>
        <div className="font-pixel text-xs text-gray-400">
          {defeatedCount}/{zone.bosses.length}
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {zone.bosses.map(boss => (
          <BossNodeComponent
            key={boss.id}
            boss={boss}
            defeated={defeatedBosses.includes(boss.id)}
            unlocked={isBossUnlocked(boss.id, defeatedBosses)}
          />
        ))}
      </div>
    </div>
  )
}
