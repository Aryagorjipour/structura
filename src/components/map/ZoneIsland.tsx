'use client'
import { motion, AnimatePresence } from 'framer-motion'
import type { Zone } from '@/store/types'
import { isBossUnlocked } from '@/data/index'
import BossOrb from './BossOrb'

const ZONE_COLORS: Record<string, string> = {
  green:  '#4ade80',
  cyan:   '#22d3ee',
  yellow: '#facc15',
  orange: '#fb923c',
  pink:   '#f472b6',
  teal:   '#2dd4bf',
  indigo: '#818cf8',
  violet: '#a78bfa',
  blue:   '#60a5fa',
  purple: '#c084fc',
  red:    '#f87171',
}

interface Props {
  zone: Zone
  position: { x: number; y: number }
  defeatedBosses: string[]
  isSelected: boolean
  onSelect: () => void
}

export default function ZoneIsland({ zone, position, defeatedBosses, isSelected, onSelect }: Props) {
  const color = ZONE_COLORS[zone.theme] ?? '#5ec8dc'
  const defeated = zone.bosses.filter(b => defeatedBosses.includes(b.id)).length
  const total = zone.bosses.length
  const completion = defeated / total

  // Island size based on boss count
  const islandWidth = 90 + zone.bosses.length * 4
  const islandHeight = 56 + zone.bosses.length * 2

  return (
    <div
      style={{
        position: 'absolute',
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
        zIndex: isSelected ? 20 : 10,
      }}
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: zone.id * 0.06, type: 'spring', stiffness: 200, damping: 20 }}
        whileHover={{ scale: 1.04 }}
        onClick={onSelect}
        style={{ cursor: 'pointer' }}
      >
        {/* Zone name label */}
        <div style={{
          textAlign: 'center',
          marginBottom: '6px',
          fontFamily: 'var(--font-display)',
          fontSize: '0.5rem',
          letterSpacing: '0.08em',
          color: color,
          textShadow: `0 0 10px ${color}88`,
          whiteSpace: 'nowrap',
        }}>
          {zone.name.toUpperCase()}
        </div>

        {/* Isometric island top face */}
        <div
          style={{
            width: islandWidth,
            height: islandHeight,
            background: `linear-gradient(135deg, ${color}12 0%, ${color}06 100%)`,
            border: `1px solid ${color}40`,
            borderRadius: '8px',
            boxShadow: isSelected
              ? `0 0 24px ${color}60, 0 0 48px ${color}30, inset 0 0 16px ${color}10`
              : `0 0 12px ${color}30, inset 0 0 8px ${color}06`,
            position: 'relative',
            transform: 'perspective(400px) rotateX(20deg)',
            transformStyle: 'preserve-3d',
            transition: 'box-shadow 0.2s',
          }}
        >
          {/* Bottom elevation face */}
          <div style={{
            position: 'absolute',
            bottom: -10,
            left: 4,
            right: 4,
            height: 10,
            background: `${color}15`,
            borderLeft: `1px solid ${color}20`,
            borderRight: `1px solid ${color}20`,
            borderBottom: `1px solid ${color}20`,
            borderRadius: '0 0 6px 6px',
          }} />

          {/* Progress bar at top of island */}
          <div style={{
            position: 'absolute',
            top: 6,
            left: 10,
            right: 10,
            height: 3,
            background: 'rgba(255,255,255,0.06)',
            borderRadius: 2,
          }}>
            <div style={{
              height: '100%',
              width: `${completion * 100}%`,
              background: completion === 1 ? 'var(--color-gold)' : color,
              borderRadius: 2,
              boxShadow: `0 0 6px ${color}`,
              transition: 'width 0.5s ease',
            }} />
          </div>

          {/* Boss count badge */}
          <div style={{
            position: 'absolute',
            top: 6,
            right: 8,
            fontFamily: 'var(--font-mono)',
            fontSize: '0.55rem',
            color: 'var(--color-muted)',
          }}>
            {defeated}/{total}
          </div>

          {/* Boss orbs grid */}
          <div style={{
            position: 'absolute',
            inset: '16px 8px 8px 8px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {zone.bosses.map((boss) => (
              <BossOrb
                key={boss.id}
                boss={boss}
                defeated={defeatedBosses.includes(boss.id)}
                unlocked={isBossUnlocked(boss.id, defeatedBosses)}
                zoneColor={color}
                showLabel={isSelected}
              />
            ))}
          </div>
        </div>

        {/* Zone number badge */}
        <div style={{
          textAlign: 'center',
          marginTop: '10px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.5rem',
          color: 'var(--color-dim)',
        }}>
          ZONE {zone.id}
        </div>
      </motion.div>

      {/* Expanded boss list on selection */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              marginTop: 12,
              background: 'var(--color-surface)',
              border: `1px solid ${color}40`,
              borderRadius: 8,
              padding: '10px 14px',
              minWidth: 200,
              maxWidth: 280,
              zIndex: 30,
              boxShadow: `0 8px 32px rgba(0,0,0,0.6), 0 0 16px ${color}20`,
            }}
          >
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.5rem',
              color: color,
              marginBottom: 8,
              letterSpacing: '0.06em',
            }}>
              {zone.name}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--color-muted)', marginBottom: 10 }}>
              {zone.description}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {zone.bosses.map((boss) => {
                const isDefeated = defeatedBosses.includes(boss.id)
                const isUnlocked = isBossUnlocked(boss.id, defeatedBosses)
                return (
                  <a
                    key={boss.id}
                    href={isUnlocked ? `/fight/${boss.id}` : undefined}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '4px 8px',
                      borderRadius: 4,
                      background: isDefeated ? 'rgba(226,196,106,0.08)' : isUnlocked ? `${color}10` : 'transparent',
                      border: `1px solid ${isDefeated ? 'rgba(226,196,106,0.2)' : isUnlocked ? `${color}25` : 'rgba(255,255,255,0.04)'}`,
                      cursor: isUnlocked ? 'pointer' : 'default',
                      textDecoration: 'none',
                      transition: 'background 0.15s',
                    }}
                  >
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.55rem',
                      color: isDefeated ? 'var(--color-gold)' : isUnlocked ? 'var(--color-text)' : 'var(--color-dim)',
                    }}>
                      {isDefeated ? '✓ ' : isUnlocked ? '⚔ ' : '? '}{boss.name}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.5rem',
                      color: 'var(--color-dim)',
                    }}>
                      {boss.xpReward}xp
                    </span>
                  </a>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
