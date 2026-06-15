'use client'

import { motion } from 'framer-motion'
import type { BossNode } from '../../store/types'
import HPBar from '../ui/HPBar'

interface BossDisplayProps {
  boss: BossNode
  currentHP: number
  shake?: boolean
}

export default function BossDisplay({ boss, currentHP, shake }: BossDisplayProps) {
  return (
    <motion.div
      animate={shake ? { x: [-8, 8, -8, 8, 0] } : { x: 0 }}
      transition={{ duration: 0.3 }}
      className="border border-red-800 bg-gray-900 p-4 text-center"
    >
      <div className="text-red-400 font-pixel text-sm mb-2">{boss.bossName}</div>
      <pre className="text-red-300 text-xs leading-tight font-mono mb-3 inline-block text-left">
        {boss.bossAscii}
      </pre>
      <HPBar current={currentHP} max={boss.bossHP} color="red" label="BOSS HP" />
    </motion.div>
  )
}
