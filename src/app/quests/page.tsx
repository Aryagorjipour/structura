'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '@/store/gameStore'
import { generateDailyQuests, generateWeeklyQuests, generateStoryQuests } from '@/lib/questSystem'
import { ALL_BOSSES } from '@/data/index'
import QuestCard from '@/components/quests/QuestCard'

type Tab = 'daily' | 'weekly' | 'story' | 'side'

export default function QuestsPage() {
  const { quests, player, addQuests, completeQuest } = useGameStore()
  const [activeTab, setActiveTab] = useState<Tab>('daily')

  useEffect(() => {
    const hasDaily = quests.some(q => q.type === 'daily')
    const hasWeekly = quests.some(q => q.type === 'weekly')
    const hasStory = quests.some(q => q.type === 'story')
    const toAdd = [
      ...(!hasDaily ? generateDailyQuests() : []),
      ...(!hasWeekly ? generateWeeklyQuests() : []),
      ...(!hasStory ? generateStoryQuests() : []),
    ]
    if (toAdd.length > 0) addQuests(toAdd)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Compute updated story quest progress
  const displayQuests = quests.map(q => {
    if (q.type !== 'story' || !q.zoneId || q.completedAt) return q
    const zoneDefeated = ALL_BOSSES.filter(b => b.zone === q.zoneId && player.defeatedBosses.includes(b.id)).length
    return { ...q, progress: zoneDefeated }
  })

  const tabs: Tab[] = ['daily', 'weekly', 'story', 'side']
  const tabLabels: Record<Tab, string> = {
    daily: 'Daily', weekly: 'Weekly', story: 'Story Arcs', side: 'Side Quests',
  }
  const tabColors: Record<Tab, string> = {
    daily: 'var(--color-cyan)', weekly: 'var(--color-magenta)', story: 'var(--color-gold)', side: '#a78bfa',
  }

  const filtered = displayQuests.filter(q => q.type === activeTab)

  return (
    <div style={{
      minHeight: 'calc(100vh - 56px)',
      background: 'radial-gradient(ellipse at 30% 20%, #0d1f2d 0%, var(--color-void) 60%)',
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
          color: 'var(--color-gold)',
          textShadow: '0 0 20px rgba(226,196,106,0.4)',
          marginBottom: '0.5rem',
        }}
      >
        Quest Board
      </motion.h1>
      <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-muted)', marginBottom: '2rem' }}>
        Complete quests to earn bonus XP, scrolls, and legendary badges.
      </p>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {tabs.map(tab => (
          <motion.button
            key={tab}
            onClick={() => setActiveTab(tab)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.55rem',
              letterSpacing: '0.1em',
              color: activeTab === tab ? 'var(--color-void)' : tabColors[tab],
              background: activeTab === tab ? tabColors[tab] : 'transparent',
              border: `1px solid ${tabColors[tab]}`,
              borderRadius: 6,
              padding: '6px 14px',
              cursor: 'pointer',
              transition: 'all 0.15s',
              boxShadow: activeTab === tab ? `0 0 12px ${tabColors[tab]}50` : 'none',
            }}
          >
            {tabLabels[tab].toUpperCase()}
          </motion.button>
        ))}
      </div>

      {/* Quest cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '3rem',
            fontFamily: 'var(--font-body)', color: 'var(--color-dim)', fontSize: '0.85rem',
          }}>
            {activeTab === 'side' ? 'Defeat bosses to unlock side quest rewards.' : 'No quests here yet.'}
          </div>
        ) : (
          filtered.map(q => (
            <QuestCard key={q.id} quest={q} onClaim={completeQuest} />
          ))
        )}
      </div>

      {/* Player stats summary */}
      <div style={{
        marginTop: '2.5rem',
        padding: '16px 20px',
        background: 'var(--color-surface)',
        borderRadius: 10,
        border: '1px solid rgba(94,200,220,0.1)',
        display: 'flex',
        gap: '2rem',
        flexWrap: 'wrap',
      }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--color-dim)', marginBottom: 4 }}>LEVEL</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--color-gold)' }}>{player.level}</div>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--color-dim)', marginBottom: 4 }}>BOSSES SLAIN</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--color-cyan)' }}>{player.defeatedBosses.length}</div>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--color-dim)', marginBottom: 4 }}>QUESTS COMPLETED</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--color-text)' }}>{quests.filter(q => q.completedAt).length}</div>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--color-dim)', marginBottom: 4 }}>ACHIEVEMENTS</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: '#a78bfa' }}>{player.achievements.length}</div>
        </div>
      </div>
    </div>
  )
}
