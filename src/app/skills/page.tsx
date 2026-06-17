'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '@/store/gameStore'
import SkillTree from '@/components/skills/SkillTree'
import KnowledgeAtlas from '@/components/skills/KnowledgeAtlas'

type Tab = 'tree' | 'atlas'

export default function SkillsPage() {
  const player = useGameStore(s => s.player)
  const [tab, setTab] = useState<Tab>('tree')

  return (
    <div style={{
      minHeight: 'calc(100vh - 56px)',
      background: 'radial-gradient(ellipse at 70% 10%, #0d1f2d 0%, var(--color-void) 60%)',
      padding: '2rem 1.5rem',
      maxWidth: 900,
      margin: '0 auto',
    }}>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.2rem',
          letterSpacing: '0.08em',
          color: 'var(--color-cyan)',
          textShadow: '0 0 20px rgba(94,200,220,0.4)',
          marginBottom: '0.5rem',
        }}
      >
        Skill Map
      </motion.h1>
      <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-muted)', marginBottom: '1.5rem' }}>
        Spend skill points to unlock passive upgrades. Explore your knowledge through the Atlas.
      </p>

      {/* Stat row */}
      <div style={{ display: 'flex', gap: '2rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--color-dim)', marginBottom: 3 }}>SKILL POINTS</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--color-gold)' }}>✦ {player.skillPoints}</div>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--color-dim)', marginBottom: 3 }}>SKILLS UNLOCKED</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--color-cyan)' }}>{player.unlockedSkills.length} / 9</div>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--color-dim)', marginBottom: 3 }}>LEVEL</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--color-text)' }}>{player.level}</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: '1.5rem' }}>
        {(['tree', 'atlas'] as Tab[]).map(t => (
          <motion.button
            key={t}
            onClick={() => setTab(t)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.55rem',
              letterSpacing: '0.1em',
              color: tab === t ? 'var(--color-void)' : 'var(--color-cyan)',
              background: tab === t ? 'var(--color-cyan)' : 'transparent',
              border: '1px solid var(--color-cyan)',
              borderRadius: 6,
              padding: '6px 16px',
              cursor: 'pointer',
              transition: 'all 0.15s',
              boxShadow: tab === t ? '0 0 12px rgba(94,200,220,0.4)' : 'none',
            }}
          >
            {t === 'tree' ? 'UPGRADE TREE' : 'KNOWLEDGE ATLAS'}
          </motion.button>
        ))}
      </div>

      {/* Content */}
      <motion.div
        key={tab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {tab === 'tree' ? (
          <div style={{
            background: 'var(--color-surface)',
            borderRadius: 12,
            border: '1px solid rgba(94,200,220,0.1)',
            padding: '1.5rem',
            position: 'relative',
          }}>
            <SkillTree />
          </div>
        ) : (
          <div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '1rem' }}>
              All 80 bosses mapped by zone. Gold = defeated. Cyan pulse = available to fight.
              Lines show prerequisite relationships.
            </p>
            <KnowledgeAtlas />
          </div>
        )}
      </motion.div>

      {/* Master skill special display */}
      {player.unlockedSkills.includes('master') && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            marginTop: '2rem',
            textAlign: 'center',
            padding: '1.5rem',
            background: 'linear-gradient(135deg, rgba(226,196,106,0.1), rgba(226,196,106,0.05))',
            border: '1px solid rgba(226,196,106,0.3)',
            borderRadius: 12,
            boxShadow: '0 0 32px rgba(226,196,106,0.2)',
          }}
        >
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', color: 'var(--color-gold)', letterSpacing: '0.1em' }}>
            ✦ Master of the Catacombs ✦
          </div>
          <div style={{ fontFamily: 'var(--font-body)', color: 'var(--color-muted)', marginTop: 6, fontSize: '0.8rem' }}>
            You have conquered all skills and earned the ultimate title.
          </div>
        </motion.div>
      )}
    </div>
  )
}
