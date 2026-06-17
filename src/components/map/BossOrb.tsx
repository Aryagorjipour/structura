'use client'
import { motion } from 'framer-motion'
import type { BossNode } from '@/store/types'

interface Props {
  boss: BossNode
  defeated: boolean
  unlocked: boolean
  zoneColor: string
  showLabel?: boolean
}

export default function BossOrb({ boss, defeated, unlocked, zoneColor, showLabel }: Props) {
  const color = defeated ? 'var(--color-gold)' : unlocked ? zoneColor : 'var(--color-dim)'
  const glow = defeated
    ? '0 0 8px rgba(226,196,106,0.8), 0 0 16px rgba(226,196,106,0.4)'
    : unlocked
    ? `0 0 8px ${zoneColor}80, 0 0 16px ${zoneColor}40`
    : 'none'

  return (
    <motion.div
      title={boss.name}
      style={{ position: 'relative' }}
      whileHover={unlocked ? { scale: 1.3 } : undefined}
    >
      <motion.div
        style={{
          width: 12,
          height: 12,
          borderRadius: '50%',
          background: defeated
            ? 'radial-gradient(circle at 35% 35%, #f0d878, var(--color-gold))'
            : unlocked
            ? `radial-gradient(circle at 35% 35%, white, ${zoneColor})`
            : `radial-gradient(circle at 35% 35%, #4a5568, var(--color-dim))`,
          boxShadow: glow,
          cursor: unlocked ? 'pointer' : 'default',
        }}
        animate={unlocked && !defeated ? {
          boxShadow: [
            `0 0 6px ${zoneColor}60`,
            `0 0 12px ${zoneColor}90, 0 0 24px ${zoneColor}40`,
            `0 0 6px ${zoneColor}60`,
          ]
        } : undefined}
        transition={unlocked && !defeated ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : undefined}
        onClick={unlocked ? () => { window.location.href = `/fight/${boss.id}` } : undefined}
      />
      {showLabel && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          whiteSpace: 'nowrap',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.4rem',
          color: 'var(--color-muted)',
          marginTop: 3,
          pointerEvents: 'none',
        }}>
          {boss.name.substring(0, 12)}
        </div>
      )}
    </motion.div>
  )
}
