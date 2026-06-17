'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '@/store/gameStore'
import { generateDailyQuests, generateWeeklyQuests, generateStoryQuests } from '@/lib/questSystem'
import QuestCard from './QuestCard'

export default function QuestBoard() {
  const { quests, addQuests, initQuests, completeQuest, checkAndResetTimedQuests } = useGameStore()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    checkAndResetTimedQuests()
    // Seed quests if empty
    const hasDaily = quests.some(q => q.type === 'daily')
    const hasWeekly = quests.some(q => q.type === 'weekly')
    const hasStory = quests.some(q => q.type === 'story')
    const toAdd = [
      ...(!hasDaily ? generateDailyQuests() : []),
      ...(!hasWeekly ? generateWeeklyQuests() : []),
      ...(!hasStory ? generateStoryQuests() : []),
    ]
    if (toAdd.length > 0) addQuests(toAdd)
    initQuests()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const activeQuests = quests.filter(q =>
    (q.type === 'daily' || q.type === 'weekly') && !q.completedAt
  )
  const claimableCount = activeQuests.filter(q => q.progress >= q.target).length

  return (
    <div style={{ position: 'fixed', right: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 50 }}>
      {/* Toggle tab */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        style={{
          position: 'absolute',
          right: open ? 'calc(100% - 2px)' : 0,
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'var(--color-surface)',
          border: '1px solid rgba(94,200,220,0.3)',
          borderRight: open ? 'none' : '1px solid rgba(94,200,220,0.3)',
          borderRadius: open ? '8px 0 0 8px' : '8px 0 0 8px',
          padding: '12px 8px',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
          transition: 'right 0.3s',
          zIndex: 51,
        }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--color-cyan)', writingMode: 'vertical-rl', textOrientation: 'mixed', letterSpacing: '0.12em' }}>
          QUESTS
        </span>
        {claimableCount > 0 && (
          <span style={{
            background: 'var(--color-gold)', color: 'var(--color-void)',
            borderRadius: '50%', width: 16, height: 16,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-mono)', fontSize: '0.5rem', fontWeight: 700,
          }}>
            {claimableCount}
          </span>
        )}
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: 320 }}
            animate={{ x: 0 }}
            exit={{ x: 320 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              width: 300,
              maxHeight: 'calc(80vh)',
              overflowY: 'auto',
              background: 'rgba(23,30,40,0.97)',
              backdropFilter: 'blur(12px)',
              borderLeft: '1px solid rgba(94,200,220,0.2)',
              padding: '16px 14px',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}
          >
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: '0.6rem',
              letterSpacing: '0.1em', color: 'var(--color-cyan)',
              marginBottom: 4, paddingBottom: 8,
              borderBottom: '1px solid rgba(94,200,220,0.1)',
            }}>
              Active Quests
            </div>
            {activeQuests.length === 0 ? (
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--color-dim)', textAlign: 'center', padding: '20px 0' }}>
                All quests completed! Check back tomorrow.
              </div>
            ) : (
              activeQuests.map(q => (
                <QuestCard key={q.id} quest={q} onClaim={completeQuest} />
              ))
            )}
            <a
              href="/quests"
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.1em',
                color: 'var(--color-cyan)', textAlign: 'center', textDecoration: 'none',
                padding: '8px', border: '1px solid rgba(94,200,220,0.2)', borderRadius: 6,
                transition: 'background 0.15s',
              }}
            >
              VIEW ALL QUESTS →
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
