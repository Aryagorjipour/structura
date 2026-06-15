'use client'

interface HPBarProps {
  current: number
  max: number
  color?: 'green' | 'red' | 'blue' | 'yellow'
  label?: string
  showNumbers?: boolean
}

const COLOR_MAP = {
  green: 'bg-green-500',
  red: 'bg-red-500',
  blue: 'bg-blue-500',
  yellow: 'bg-yellow-500',
}

export default function HPBar({ current, max, color = 'green', label, showNumbers = true }: HPBarProps) {
  const pct = Math.max(0, Math.min(100, (current / max) * 100))
  const barColor = COLOR_MAP[color]

  return (
    <div className="w-full">
      {(label || showNumbers) && (
        <div className="flex justify-between text-xs mb-1 font-pixel">
          {label && <span className="text-gray-400">{label}</span>}
          {showNumbers && (
            <span className="text-gray-300">
              {current}/{max}
            </span>
          )}
        </div>
      )}
      <div className="w-full bg-gray-800 border border-gray-600 h-4 relative overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${barColor}`}
          style={{ width: `${pct}%` }}
        />
        {/* Scanline effect on bar */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
      </div>
    </div>
  )
}
