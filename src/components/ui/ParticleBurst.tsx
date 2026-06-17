'use client'
import { useEffect, useState } from 'react'

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  life: number
  color: string
}

interface Props {
  active: boolean
  originX?: number
  originY?: number
}

export default function ParticleBurst({ active, originX = 50, originY = 50 }: Props) {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    if (!active) return
    const colors = ['#e2c46a', '#5ec8dc', '#d97ab8', '#eef2f7']
    const newParticles: Particle[] = Array.from({ length: 24 }, (_, i) => {
      const angle = (i / 24) * Math.PI * 2
      const speed = 2 + Math.random() * 4
      return {
        id: i,
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        life: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      }
    })
    setParticles(newParticles)

    let frame: number
    let prev = performance.now()

    const animate = (now: number) => {
      const dt = Math.min((now - prev) / 16, 3)
      prev = now
      setParticles((ps) => {
        const next = ps
          .map((p) => ({ ...p, x: p.x + p.vx * dt, y: p.y + p.vy * dt, vy: p.vy + 0.15 * dt, life: p.life - 0.025 * dt }))
          .filter((p) => p.life > 0)
        if (next.length === 0) return []
        return next
      })
      frame = requestAnimationFrame(animate)
    }

    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [active, originX, originY])

  if (particles.length === 0) return null

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9997 }}>
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: p.color,
            opacity: p.life,
            boxShadow: `0 0 6px ${p.color}`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </div>
  )
}
