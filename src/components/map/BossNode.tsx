'use client'

import Link from 'next/link'
import type { BossNode as BossNodeType } from '../../store/types'

interface BossNodeProps {
  boss: BossNodeType
  defeated: boolean
  unlocked: boolean
}

export default function BossNode({ boss, defeated, unlocked }: BossNodeProps) {
  const stateStyle = defeated
    ? 'border-green-500 bg-green-950 text-green-400 opacity-70'
    : unlocked
    ? 'border-yellow-500 bg-yellow-950 text-yellow-300 hover:bg-yellow-900 cursor-pointer animate-pulse'
    : 'border-gray-700 bg-gray-950 text-gray-600 cursor-not-allowed'

  const label = defeated ? '✓' : unlocked ? '!' : '?'

  const inner = (
    <div className={`border-2 p-2 text-center font-pixel transition-all w-32 ${stateStyle}`}>
      <div className="text-xs mb-1">{label}</div>
      <div className="text-xs leading-tight truncate">{boss.name}</div>
      <div className="text-xs mt-1 opacity-60">+{boss.xpReward}XP</div>
    </div>
  )

  if (unlocked && !defeated) {
    return <Link href={`/fight/${boss.id}`}>{inner}</Link>
  }

  return inner
}
