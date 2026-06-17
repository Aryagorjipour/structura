'use client'

import { useGameStore } from '../../store/gameStore'
import { ALL_ZONES } from '../../data'
import { levelFromXP, xpProgress } from '../../lib/xpSystem'
import HPBar from '../ui/HPBar'
import ZonePanel from './ZonePanel'

export default function DungeonMap() {
  const player = useGameStore(s => s.player)
  const { level, current, needed } = xpProgress(player.xp)

  return (
    <div className="min-h-screen bg-gray-950 p-4">
      {/* Player HUD */}
      <div className="border border-green-800 bg-gray-900 p-4 mb-6 font-pixel">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-green-400 text-sm">ADVENTURER</div>
            <div className="text-yellow-400 text-xs mt-1">LV {level}</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-400">BOSSES SLAIN</div>
            <div className="text-green-400 text-sm">{player.defeatedBosses.length}</div>
          </div>
        </div>
        <div className="space-y-2">
          <HPBar current={player.hp} max={player.maxHp} color="red" label="HP" />
          <HPBar current={current} max={needed} color="blue" label="XP" />
        </div>
      </div>

      {/* Title */}
      <div className="text-center mb-6">
        <h1 className="font-pixel text-green-400 text-lg">STRUCTURA</h1>
        <p className="text-gray-500 text-xs mt-2 font-pixel">SELECT A BOSS TO FIGHT</p>
      </div>

      {/* Zone list */}
      <div className="max-w-4xl mx-auto">
        {ALL_ZONES.map(zone => (
          <ZonePanel
            key={zone.id}
            zone={zone}
            defeatedBosses={player.defeatedBosses}
          />
        ))}
      </div>
    </div>
  )
}
