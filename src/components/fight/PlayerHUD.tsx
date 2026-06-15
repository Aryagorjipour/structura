'use client'

import type { PlayerState } from '../../store/types'
import { xpProgress } from '../../lib/xpSystem'
import HPBar from '../ui/HPBar'

interface PlayerHUDProps {
  player: PlayerState
}

export default function PlayerHUD({ player }: PlayerHUDProps) {
  const { level, current, needed } = xpProgress(player.xp)

  return (
    <div className="border border-green-800 bg-gray-900 p-3 font-pixel">
      <div className="flex justify-between text-xs mb-2">
        <span className="text-green-400">PLAYER</span>
        <span className="text-yellow-400">LV {level}</span>
      </div>
      <div className="space-y-2">
        <HPBar current={player.hp} max={player.maxHp} color="red" label="HP" />
        <HPBar current={current} max={needed} color="blue" label="XP" />
      </div>
    </div>
  )
}
