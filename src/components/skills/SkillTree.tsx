'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '@/store/gameStore'

interface SkillDef {
  id: string
  name: string
  description: string
  tier: 1 | 2 | 3 | 4
  cost: number
  prerequisites: string[]
  x: number
  y: number
}

const SKILLS: SkillDef[] = [
  { id: 'iron-will', name: 'Iron Will', description: '+20 max HP', tier: 1, cost: 1, prerequisites: [], x: 150, y: 60 },
  { id: 'scholars-eye', name: "Scholar's Eye", description: 'See complexity table before fighting', tier: 1, cost: 1, prerequisites: [], x: 450, y: 60 },
  { id: 'veteran', name: 'Veteran', description: '+5 HP per level-up', tier: 2, cost: 2, prerequisites: ['iron-will'], x: 100, y: 170 },
  { id: 'tome-reader', name: 'Tome Reader', description: 'Hints cost 1 scroll instead of 2', tier: 2, cost: 2, prerequisites: ['scholars-eye'], x: 300, y: 170 },
  { id: 'dungeon-runner', name: 'Dungeon Runner', description: 'Unlock a bonus daily quest slot', tier: 2, cost: 2, prerequisites: ['scholars-eye'], x: 500, y: 170 },
  { id: 'fortress', name: 'Fortress', description: 'Start each fight at 110% HP', tier: 3, cost: 3, prerequisites: ['veteran'], x: 100, y: 300 },
  { id: 'code-savant', name: 'Code Savant', description: '+60s on the Code Duel timer', tier: 3, cost: 3, prerequisites: ['tome-reader'], x: 300, y: 300 },
  { id: 'pathfinder', name: 'Pathfinder', description: 'Reveal all zone connections on the map', tier: 3, cost: 3, prerequisites: ['dungeon-runner'], x: 500, y: 300 },
  { id: 'master', name: 'Master of the Catacombs', description: 'Legendary title + golden aura', tier: 4, cost: 5, prerequisites: ['fortress', 'code-savant', 'pathfinder'], x: 300, y: 420 },
]

const EDGES: [string, string][] = [
  ['iron-will', 'veteran'],
  ['scholars-eye', 'tome-reader'],
  ['scholars-eye', 'dungeon-runner'],
  ['veteran', 'fortress'],
  ['tome-reader', 'code-savant'],
  ['dungeon-runner', 'pathfinder'],
  ['fortress', 'master'],
  ['code-savant', 'master'],
  ['pathfinder', 'master'],
]

const TIER_COLORS = ['', 'var(--color-cyan)', 'var(--color-gold)', 'var(--color-magenta)', '#f0c040']

export default function SkillTree() {
  const { player, unlockSkill } = useGameStore()
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  function canUnlock(skill: SkillDef): boolean {
    if (player.unlockedSkills.includes(skill.id)) return false
    if (player.skillPoints < skill.cost) return false
    return skill.prerequisites.every(p => player.unlockedSkills.includes(p))
  }

  function getNodeState(skill: SkillDef): 'unlocked' | 'available' | 'locked' {
    if (player.unlockedSkills.includes(skill.id)) return 'unlocked'
    if (canUnlock(skill)) return 'available'
    return 'locked'
  }

  return (
    <div style={{ position: 'relative' }}>
      {/* Skill points display */}
      <div style={{
        textAlign: 'center', marginBottom: '1rem',
        fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
        color: 'var(--color-gold)',
      }}>
        ✦ {player.skillPoints} Skill Point{player.skillPoints !== 1 ? 's' : ''} Available ✦
      </div>

      <svg
        viewBox="0 0 600 500"
        style={{ width: '100%', maxWidth: 600, display: 'block', margin: '0 auto', overflow: 'visible' }}
      >
        {/* Edge lines */}
        {EDGES.map(([from, to]) => {
          const a = SKILLS.find(s => s.id === from)!
          const b = SKILLS.find(s => s.id === to)!
          const bothUnlocked = player.unlockedSkills.includes(from) && player.unlockedSkills.includes(to)
          const fromUnlocked = player.unlockedSkills.includes(from)
          return (
            <line
              key={`${from}-${to}`}
              x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              stroke={bothUnlocked ? 'rgba(94,200,220,0.5)' : fromUnlocked ? 'rgba(94,200,220,0.2)' : 'rgba(138,154,173,0.15)'}
              strokeWidth={bothUnlocked ? 2 : 1}
              strokeDasharray={fromUnlocked ? '0' : '4 3'}
              style={{ transition: 'stroke 0.3s, stroke-width 0.3s' }}
            />
          )
        })}

        {/* Skill nodes */}
        {SKILLS.map((skill) => {
          const state = getNodeState(skill)
          const tierColor = TIER_COLORS[skill.tier]
          const isHovered = hoveredSkill === skill.id
          const nodeColor = state === 'unlocked' ? 'var(--color-gold)'
            : state === 'available' ? tierColor
            : 'var(--color-dim)'
          const r = skill.tier === 4 ? 28 : 22

          return (
            <g key={skill.id}>
              {/* Glow ring for available/unlocked */}
              {state !== 'locked' && (
                <circle
                  cx={skill.x} cy={skill.y} r={r + 6}
                  fill="none"
                  stroke={nodeColor}
                  strokeWidth={0.5}
                  opacity={0.3}
                />
              )}

              {/* Main node circle */}
              <motion.circle
                cx={skill.x}
                cy={skill.y}
                r={isHovered ? r + 3 : r}
                fill={state === 'unlocked' ? 'rgba(226,196,106,0.2)' : state === 'available' ? `${tierColor}18` : 'rgba(138,154,173,0.08)'}
                stroke={nodeColor}
                strokeWidth={state === 'unlocked' ? 2 : 1}
                style={{ cursor: state === 'available' ? 'pointer' : 'default', transition: 'r 0.15s' }}
                onClick={() => {
                  if (state === 'available') {
                    unlockSkill(skill.id, skill.cost)
                  }
                }}
                onMouseEnter={() => setHoveredSkill(skill.id)}
                onMouseLeave={() => setHoveredSkill(null)}
              />

              {/* Checkmark for unlocked */}
              {state === 'unlocked' && (
                <text x={skill.x} y={skill.y + 5} textAnchor="middle"
                  fill="var(--color-gold)" fontSize={14} style={{ pointerEvents: 'none' }}>
                  ✓
                </text>
              )}

              {/* Cost badge for locked/available */}
              {state !== 'unlocked' && (
                <text x={skill.x} y={skill.y + 4} textAnchor="middle"
                  fill={nodeColor} fontSize={10} fontFamily="var(--font-mono)" style={{ pointerEvents: 'none' }}>
                  {skill.cost}pt
                </text>
              )}

              {/* Skill name label */}
              <text
                x={skill.x} y={skill.y + r + 14}
                textAnchor="middle"
                fill={state === 'locked' ? 'var(--color-dim)' : 'var(--color-muted)'}
                fontSize={skill.tier === 4 ? 9 : 8}
                fontFamily="var(--font-display)"
                style={{ pointerEvents: 'none' }}
              >
                {skill.name.length > 18 ? skill.name.substring(0, 16) + '…' : skill.name}
              </text>
            </g>
          )
        })}
      </svg>

      {/* Tooltip */}
      <AnimatePresence>
        {hoveredSkill && (() => {
          const skill = SKILLS.find(s => s.id === hoveredSkill)!
          const state = getNodeState(skill)
          return (
            <motion.div
              key={hoveredSkill}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'absolute',
                bottom: '105%',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'var(--color-raised)',
                border: '1px solid rgba(94,200,220,0.3)',
                borderRadius: 8,
                padding: '10px 14px',
                maxWidth: 240,
                pointerEvents: 'none',
                zIndex: 10,
              }}
            >
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.55rem', color: 'var(--color-cyan)', marginBottom: 4 }}>
                {skill.name}
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--color-text)', marginBottom: 6 }}>
                {skill.description}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: state === 'available' ? 'var(--color-gold)' : 'var(--color-dim)' }}>
                {state === 'unlocked' ? '✓ UNLOCKED'
                  : state === 'available' ? `Click to unlock — costs ${skill.cost} point${skill.cost !== 1 ? 's' : ''}`
                  : `Requires: ${skill.prerequisites.join(', ') || 'none'}`}
              </div>
            </motion.div>
          )
        })()}
      </AnimatePresence>
    </div>
  )
}
