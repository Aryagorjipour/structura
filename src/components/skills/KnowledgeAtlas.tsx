'use client'
import { useRef, useState, useCallback, useEffect } from 'react'
import { ALL_ZONES, ALL_BOSSES } from '@/data/index'
import { useGameStore } from '@/store/gameStore'

const ZONE_COLORS: Record<string, string> = {
  green: '#4ade80', cyan: '#22d3ee', yellow: '#facc15', orange: '#fb923c',
  pink: '#f472b6', teal: '#2dd4bf', indigo: '#818cf8', violet: '#a78bfa',
  blue: '#60a5fa', purple: '#c084fc', red: '#f87171',
}

// Pre-compute positions: zones in a large ring, bosses in sub-rings
function computePositions() {
  const positions: Record<string, { x: number; y: number }> = {}
  const cx = 500, cy = 420  // center of SVG
  const zoneR = 300          // radius of zone ring
  const bossR = 65           // radius of boss sub-ring

  ALL_ZONES.forEach((zone, zi) => {
    const zoneAngle = (zi / ALL_ZONES.length) * Math.PI * 2 - Math.PI / 2
    const zx = cx + Math.cos(zoneAngle) * zoneR
    const zy = cy + Math.sin(zoneAngle) * zoneR

    zone.bosses.forEach((boss, bi) => {
      const bossAngle = (bi / zone.bosses.length) * Math.PI * 2 - Math.PI / 2
      const bx = zx + Math.cos(bossAngle) * bossR
      const by = zy + Math.sin(bossAngle) * bossR
      positions[boss.id] = { x: Math.round(bx), y: Math.round(by) }
    })
  })

  return positions
}

const POSITIONS = computePositions()

export default function KnowledgeAtlas() {
  const defeatedBosses = useGameStore(s => s.player.defeatedBosses)
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 0.75 })
  const [dragging, setDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, tx: 0, ty: 0 })
  const [tooltip, setTooltip] = useState<{ boss: typeof ALL_BOSSES[0]; sx: number; sy: number } | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? 0.9 : 1.1
    setTransform(t => ({ ...t, scale: Math.max(0.3, Math.min(3, t.scale * delta)) }))
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    el.addEventListener('wheel', handleWheel, { passive: false })
    return () => el.removeEventListener('wheel', handleWheel)
  }, [handleWheel])

  function onMouseDown(e: React.MouseEvent) {
    setDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY, tx: transform.x, ty: transform.y })
    setTooltip(null)
  }

  function onMouseMove(e: React.MouseEvent) {
    if (!dragging) return
    setTransform(t => ({
      ...t,
      x: dragStart.tx + (e.clientX - dragStart.x),
      y: dragStart.ty + (e.clientY - dragStart.y),
    }))
  }

  function onMouseUp() { setDragging(false) }

  // Get zone color for a boss
  function zoneColor(bossId: string) {
    const zone = ALL_ZONES.find(z => z.bosses.some(b => b.id === bossId))
    return zone ? ZONE_COLORS[zone.theme] ?? '#5ec8dc' : '#5ec8dc'
  }

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: 520,
        background: 'var(--color-void)',
        border: '1px solid rgba(94,200,220,0.1)',
        borderRadius: 10,
        position: 'relative',
        overflow: 'hidden',
        cursor: dragging ? 'grabbing' : 'grab',
        userSelect: 'none',
      }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      <svg
        ref={svgRef}
        viewBox="0 0 1000 840"
        style={{
          width: '100%',
          height: '100%',
          transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
          transformOrigin: 'center center',
          transition: dragging ? 'none' : 'transform 0.1s ease-out',
        }}
      >
        {/* Zone label rings */}
        {ALL_ZONES.map((zone, zi) => {
          const cx = 500, cy = 420, zoneR = 300
          const zoneAngle = (zi / ALL_ZONES.length) * Math.PI * 2 - Math.PI / 2
          const zx = cx + Math.cos(zoneAngle) * zoneR
          const zy = cy + Math.sin(zoneAngle) * zoneR
          const color = ZONE_COLORS[zone.theme] ?? '#5ec8dc'
          return (
            <g key={zone.id}>
              <circle cx={zx} cy={zy} r={55} fill={`${color}06`} stroke={`${color}20`} strokeWidth={1} />
              <text x={zx} y={zy - 68} textAnchor="middle" fill={color} fontSize={7} fontFamily="var(--font-display)" opacity={0.8}>
                {zone.name.substring(0, 14)}
              </text>
            </g>
          )
        })}

        {/* Prerequisite edges */}
        {ALL_BOSSES.map(boss => {
          if (!boss.prerequisites?.length) return null
          const pos = POSITIONS[boss.id]
          if (!pos) return null
          return boss.prerequisites.map(preId => {
            const prePos = POSITIONS[preId]
            if (!prePos) return null
            return (
              <line
                key={`${preId}-${boss.id}`}
                x1={prePos.x} y1={prePos.y}
                x2={pos.x} y2={pos.y}
                stroke="rgba(94,200,220,0.15)"
                strokeWidth={0.8}
              />
            )
          })
        })}

        {/* Boss nodes */}
        {ALL_BOSSES.map(boss => {
          const pos = POSITIONS[boss.id]
          if (!pos) return null
          const defeated = defeatedBosses.includes(boss.id)
          const color = defeated ? 'var(--color-gold)' : zoneColor(boss.id)
          const fill = defeated
            ? 'rgba(226,196,106,0.6)'
            : `${zoneColor(boss.id)}40`

          return (
            <g key={boss.id}>
              <circle
                cx={pos.x} cy={pos.y} r={8}
                fill={fill}
                stroke={color}
                strokeWidth={defeated ? 2 : 1}
                style={{ cursor: 'pointer' }}
                onMouseEnter={(e) => {
                  if (!dragging) {
                    const rect = containerRef.current?.getBoundingClientRect()
                    if (rect) setTooltip({ boss, sx: e.clientX - rect.left, sy: e.clientY - rect.top })
                  }
                }}
                onMouseLeave={() => setTooltip(null)}
                onClick={() => { window.location.href = `/fight/${boss.id}` }}
              />
              {defeated && (
                <text x={pos.x} y={pos.y + 3} textAnchor="middle"
                  fill="var(--color-gold)" fontSize={6} style={{ pointerEvents: 'none' }}>✓</text>
              )}
            </g>
          )
        })}
      </svg>

      {/* Tooltip */}
      {tooltip && (
        <div
          style={{
            position: 'absolute',
            left: Math.min(tooltip.sx + 12, (containerRef.current?.clientWidth ?? 400) - 200),
            top: Math.max(tooltip.sy - 60, 8),
            background: 'var(--color-raised)',
            border: '1px solid rgba(94,200,220,0.3)',
            borderRadius: 6,
            padding: '8px 12px',
            maxWidth: 190,
            pointerEvents: 'none',
            zIndex: 10,
          }}
        >
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.5rem', color: 'var(--color-cyan)', marginBottom: 3 }}>
            {tooltip.boss.name}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--color-muted)' }}>
            Zone {tooltip.boss.zone} · {tooltip.boss.xpReward} XP
          </div>
          {defeatedBosses.includes(tooltip.boss.id) && (
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--color-gold)', marginTop: 3 }}>✓ Defeated</div>
          )}
        </div>
      )}

      {/* Controls hint */}
      <div style={{
        position: 'absolute', bottom: 10, right: 14,
        fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--color-dim)',
        pointerEvents: 'none',
      }}>
        Scroll to zoom · Drag to pan · Click to fight
      </div>
    </div>
  )
}
