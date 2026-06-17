'use client'

const CONNECTIONS: [number, number][] = [
  [1, 2], [1, 3], [2, 4], [3, 5],
  [4, 6], [5, 6], [6, 7], [6, 8],
  [7, 9], [8, 10], [9, 11], [10, 11],
]

interface Props {
  defeatedBosses: string[]
  positions: Record<number, { x: number; y: number }>
}

export default function WorldConnections({ positions }: Props) {
  return (
    <svg
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <defs>
        <filter id="glow-line">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {CONNECTIONS.map(([from, to]) => {
        const a = positions[from]
        const b = positions[to]
        if (!a || !b) return null
        return (
          <g key={`${from}-${to}`}>
            {/* Glow line */}
            <line
              x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              stroke="rgba(94,200,220,0.15)"
              strokeWidth="0.4"
              filter="url(#glow-line)"
            />
            {/* Core line */}
            <line
              x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              stroke="rgba(94,200,220,0.25)"
              strokeWidth="0.15"
              strokeDasharray="1 0.5"
            />
          </g>
        )
      })}
    </svg>
  )
}
