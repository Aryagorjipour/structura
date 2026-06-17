'use client'
import { useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ALL_ZONES } from '@/data/index'
import { useGameStore } from '@/store/gameStore'
import ZoneIsland from './ZoneIsland'
import WorldConnections from './WorldConnections'

// Zone positions (% of container)
const ZONE_POSITIONS: Record<number, { x: number; y: number }> = {
  1:  { x: 50, y: 6  },
  2:  { x: 30, y: 18 },
  3:  { x: 70, y: 18 },
  4:  { x: 18, y: 32 },
  5:  { x: 82, y: 32 },
  6:  { x: 35, y: 46 },
  7:  { x: 65, y: 46 },
  8:  { x: 50, y: 58 },
  9:  { x: 28, y: 70 },
  10: { x: 72, y: 70 },
  11: { x: 50, y: 84 },
}

export { ZONE_POSITIONS }

export default function WorldMap() {
  const defeatedBosses = useGameStore((s) => s.player.defeatedBosses)
  const [parallax, setParallax] = useState({ x: 0, y: 0 })
  const [selectedZone, setSelectedZone] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const cx = (e.clientX - rect.left) / rect.width - 0.5
    const cy = (e.clientY - rect.top) / rect.height - 0.5
    setParallax({ x: cx * 12, y: cy * 8 })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setParallax({ x: 0, y: 0 })
  }, [])

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        width: '100%',
        height: 'calc(100vh - 56px)',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at 50% 40%, #0d1f2d 0%, #0a1520 40%, #050d14 100%)',
      }}
    >
      {/* Stars background */}
      <StarField parallax={parallax} />

      {/* Connection lines layer (slightly behind islands) */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `translate(${parallax.x * 0.3}px, ${parallax.y * 0.3}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        <WorldConnections defeatedBosses={defeatedBosses} positions={ZONE_POSITIONS} />
      </motion.div>

      {/* Zone islands layer */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `translate(${parallax.x}px, ${parallax.y}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        {ALL_ZONES.map((zone) => {
          const pos = ZONE_POSITIONS[zone.id]
          const isSelected = selectedZone === zone.id
          return (
            <ZoneIsland
              key={zone.id}
              zone={zone}
              position={pos}
              defeatedBosses={defeatedBosses}
              isSelected={isSelected}
              onSelect={() => setSelectedZone(isSelected ? null : zone.id)}
            />
          )
        })}
      </motion.div>

      {/* Map legend */}
      <div style={{
        position: 'absolute', bottom: '1.5rem', left: '1.5rem',
        display: 'flex', gap: '1.5rem', alignItems: 'center',
        fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--color-dim)',
      }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--color-gold)', display: 'inline-block', boxShadow: '0 0 8px var(--color-gold)' }} />
          Defeated
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--color-cyan)', display: 'inline-block', boxShadow: '0 0 8px var(--color-cyan)' }} />
          Available
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--color-dim)', display: 'inline-block' }} />
          Locked
        </span>
      </div>
    </div>
  )
}

// Starfield background
function StarField({ parallax }: { parallax: { x: number; y: number } }) {
  // Static stars — generate deterministically
  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: ((i * 137.508) % 100),
    y: ((i * 97.3) % 100),
    size: i % 5 === 0 ? 2 : 1,
    opacity: 0.2 + (i % 5) * 0.1,
  }))

  return (
    <div style={{
      position: 'absolute', inset: 0,
      transform: `translate(${parallax.x * 0.5}px, ${parallax.y * 0.5}px)`,
      transition: 'transform 0.15s ease-out',
    }}>
      {stars.map((s) => (
        <div
          key={s.id}
          style={{
            position: 'absolute',
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            borderRadius: '50%',
            background: '#eef2f7',
            opacity: s.opacity,
          }}
        />
      ))}
    </div>
  )
}
