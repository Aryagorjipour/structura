'use client'
import { motion } from 'framer-motion'
import type { Quest } from '@/store/types'

interface Props {
  quest: Quest
  onClaim?: (id: string) => void
}

const TYPE_CONFIG = {
  daily:   { label: 'DAILY',   color: 'var(--color-cyan)',    border: 'rgba(94,200,220,0.3)' },
  weekly:  { label: 'WEEKLY',  color: 'var(--color-magenta)', border: 'rgba(217,122,184,0.3)' },
  story:   { label: 'STORY',   color: 'var(--color-gold)',    border: 'rgba(226,196,106,0.3)' },
  side:    { label: 'SIDE',    color: '#a78bfa',              border: 'rgba(167,139,250,0.3)' },
}

function formatTimeLeft(ms: number): string {
  if (ms <= 0) return 'Expired'
  const hours = Math.floor(ms / 3600000)
  const mins = Math.floor((ms % 3600000) / 60000)
  if (hours > 24) return `${Math.floor(hours / 24)}d`
  if (hours > 0) return `${hours}h ${mins}m`
  return `${mins}m`
}

export default function QuestCard({ quest, onClaim }: Props) {
  const config = TYPE_CONFIG[quest.type]
  const pct = quest.target > 0 ? Math.min(quest.progress / quest.target, 1) : 0
  const isComplete = pct >= 1 && !quest.completedAt
  const isClaimed = !!quest.completedAt
  const timeLeft = quest.expiresAt ? quest.expiresAt - Date.now() : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: 'var(--color-surface)',
        border: `1px solid ${config.border}`,
        borderRadius: 10,
        padding: '14px 16px',
        position: 'relative',
        opacity: isClaimed ? 0.5 : 1,
        boxShadow: isComplete ? `0 0 16px ${config.color}30` : '0 2px 8px rgba(0,0,0,0.3)',
        transition: 'box-shadow 0.2s',
      }}
    >
      {/* Type badge */}
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.5rem',
        letterSpacing: '0.12em',
        color: config.color,
        background: `${config.color}15`,
        border: `1px solid ${config.border}`,
        borderRadius: 4,
        padding: '2px 6px',
        marginBottom: 8,
        display: 'inline-block',
      }}>
        {config.label}
      </span>

      {/* Claimed check */}
      {isClaimed && (
        <span style={{
          position: 'absolute', top: 12, right: 14,
          fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
          color: 'var(--color-gold)',
        }}>✓ CLAIMED</span>
      )}

      {/* Title */}
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '0.6rem',
        letterSpacing: '0.06em',
        color: isClaimed ? 'var(--color-dim)' : 'var(--color-text)',
        marginBottom: 4,
      }}>
        {quest.title}
      </div>

      {/* Description */}
      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.75rem',
        color: 'var(--color-muted)',
        marginBottom: 10,
        lineHeight: 1.5,
      }}>
        {quest.description}
      </div>

      {/* Progress bar */}
      {quest.target > 1 && (
        <div style={{ marginBottom: 8 }}>
          <div style={{
            height: 4,
            background: 'rgba(255,255,255,0.06)',
            borderRadius: 2,
            overflow: 'hidden',
          }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pct * 100}%` }}
              style={{
                height: '100%',
                background: isComplete ? 'var(--color-gold)' : config.color,
                borderRadius: 2,
                boxShadow: `0 0 6px ${config.color}`,
              }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.5rem',
            color: 'var(--color-dim)', marginTop: 4, textAlign: 'right',
          }}>
            {quest.progress}/{quest.target}
          </div>
        </div>
      )}

      {/* Reward row */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: 6,
      }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          {quest.reward.xp && (
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--color-gold)' }}>
              +{quest.reward.xp} XP
            </span>
          )}
          {quest.reward.badge && (
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: '#a78bfa' }}>
              🏅 {quest.reward.badge}
            </span>
          )}
          {quest.reward.items?.map(item => (
            <span key={item} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--color-cyan)' }}>
              📜 {item}
            </span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {timeLeft !== null && !isClaimed && (
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--color-dim)' }}>
              ⏱ {formatTimeLeft(timeLeft)}
            </span>
          )}
          {isComplete && onClaim && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onClaim(quest.id)}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.5rem',
                letterSpacing: '0.08em',
                color: 'var(--color-void)',
                background: 'var(--color-gold)',
                border: 'none',
                borderRadius: 4,
                padding: '4px 10px',
                cursor: 'pointer',
                boxShadow: '0 0 10px rgba(226,196,106,0.4)',
              }}
            >
              CLAIM
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
