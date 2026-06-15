'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import type { BossNode } from '../../store/types'
import PixelButton from '../ui/PixelButton'

interface FightResultProps {
  victory: boolean
  boss: BossNode
  xpGained: number
  onRetry?: () => void
}

export default function FightResult({ victory, boss, xpGained, onRetry }: FightResultProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`border-4 p-8 text-center font-pixel ${
        victory
          ? 'border-green-500 bg-green-950/50'
          : 'border-red-700 bg-red-950/50'
      }`}
    >
      {victory ? (
        <>
          <div className="text-green-400 text-xl mb-4">VICTORY!</div>
          <div className="text-gray-300 text-sm mb-2">{boss.bossName} has been defeated!</div>
          <div className="text-yellow-400 text-sm mb-4">+{xpGained} XP</div>
          {boss.loot && boss.loot.length > 0 && (
            <div className="border border-yellow-700 bg-yellow-950/30 p-3 mb-4">
              <div className="text-yellow-400 text-xs mb-1">LOOT:</div>
              {boss.loot.map(item => (
                <div key={item} className="text-yellow-300 text-xs">• {item}</div>
              ))}
            </div>
          )}
          <Link href="/map">
            <PixelButton variant="success">← RETURN TO MAP</PixelButton>
          </Link>
        </>
      ) : (
        <>
          <div className="text-red-400 text-xl mb-4">DEFEATED!</div>
          <div className="text-gray-300 text-sm mb-6">{boss.bossName} proved too powerful...</div>
          <div className="flex gap-3 justify-center">
            {onRetry && (
              <PixelButton onClick={onRetry} variant="primary">
                RETRY FIGHT
              </PixelButton>
            )}
            <Link href="/map">
              <PixelButton variant="ghost">← MAP</PixelButton>
            </Link>
          </div>
        </>
      )}
    </motion.div>
  )
}
