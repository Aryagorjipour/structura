'use client'
import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useProfileStore } from '@/store/profileStore'
import { useGameStore } from '@/store/gameStore'
import { AVATARS } from '@/lib/avatars'
import AvatarDisplay from '@/components/ui/AvatarDisplay'

export default function ProfilePage() {
  const router = useRouter()
  const profile = useProfileStore()
  const { player, quests, questResetTimestamps, activeFight, resetGame, addQuests, restorePlayer } = useGameStore()

  const [editingName, setEditingName] = useState(false)
  const [newName, setNewName] = useState(profile.username)
  const [showAvatarPicker, setShowAvatarPicker] = useState(false)
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [importMsg, setImportMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const importRef = useRef<HTMLInputElement>(null)

  // ── Export Save ──────────────────────────────────────────────────────────────
  function handleExport() {
    const saveData = {
      version: '2.0',
      exportedAt: new Date().toISOString(),
      profile: {
        username: profile.username,
        avatarId: profile.avatarId,
      },
      player,
      quests,
      questResetTimestamps,
    }
    const blob = new Blob([JSON.stringify(saveData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `structura-save-${profile.username || 'adventurer'}-${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // ── Import Save ──────────────────────────────────────────────────────────────
  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result as string)
        if (!data.player) throw new Error('Invalid save file — missing player data')
        restorePlayer(data.player)
        if (data.quests?.length) addQuests(data.quests)
        if (data.profile?.username) profile.setUsername(data.profile.username)
        if (data.profile?.avatarId) profile.setAvatar(data.profile.avatarId)
        setImportMsg({ type: 'success', text: `Save restored! Welcome back, ${data.profile?.username ?? 'Adventurer'}.` })
      } catch (err) {
        setImportMsg({ type: 'error', text: err instanceof Error ? err.message : 'Import failed.' })
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  // ── Reset Game ───────────────────────────────────────────────────────────────
  function handleReset() {
    resetGame()
    profile.resetProfile()
    setShowResetConfirm(false)
    router.push('/onboarding')
  }

  // ── Stats ────────────────────────────────────────────────────────────────────
  const completedQuests = quests.filter(q => q.completedAt).length
  const joinedDate = profile.joinedAt ? new Date(profile.joinedAt).toLocaleDateString() : 'Unknown'

  return (
    <div style={{
      minHeight: 'calc(100vh - 56px)',
      background: 'radial-gradient(ellipse at 40% 20%, #0d1f2d 0%, var(--color-void) 60%)',
      padding: '2rem 1.5rem',
      maxWidth: 760,
      margin: '0 auto',
    }}>
      <motion.h1
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', letterSpacing: '0.08em', color: 'var(--color-gold)', marginBottom: '2rem' }}
      >
        Adventurer Profile
      </motion.h1>

      {/* ── Hero card ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          display: 'flex', alignItems: 'center', gap: '1.5rem',
          background: 'var(--color-surface)',
          border: '1px solid rgba(94,200,220,0.15)',
          borderRadius: 14, padding: '1.5rem 2rem',
          marginBottom: '1.5rem',
        }}
      >
        {/* Avatar */}
        <div style={{ position: 'relative' }}>
          <AvatarDisplay avatarId={profile.avatarId} size={80} />
          <button
            onClick={() => setShowAvatarPicker(true)}
            style={{
              position: 'absolute', bottom: -4, right: -4,
              width: 24, height: 24, borderRadius: '50%',
              background: 'var(--color-cyan)', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, color: 'var(--color-void)',
            }}
            title="Change avatar"
          >
            ✏️
          </button>
        </div>

        {/* Name + title */}
        <div style={{ flex: 1 }}>
          {editingName ? (
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
              <input
                autoFocus
                value={newName}
                onChange={e => setNewName(e.target.value)}
                maxLength={20}
                onKeyDown={e => {
                  if (e.key === 'Enter') { profile.setUsername(newName.trim()); setEditingName(false) }
                  if (e.key === 'Escape') { setNewName(profile.username); setEditingName(false) }
                }}
                style={{
                  background: 'var(--color-raised)', border: '1px solid var(--color-cyan)',
                  borderRadius: 6, color: 'var(--color-text)', fontFamily: 'var(--font-display)',
                  fontSize: '0.75rem', padding: '6px 10px', outline: 'none',
                }}
              />
              <button onClick={() => { profile.setUsername(newName.trim()); setEditingName(false) }}
                style={{ background: 'var(--color-cyan)', border: 'none', borderRadius: 4, padding: '6px 10px', cursor: 'pointer', color: 'var(--color-void)', fontFamily: 'var(--font-mono)', fontSize: '0.5rem' }}>
                SAVE
              </button>
              <button onClick={() => { setNewName(profile.username); setEditingName(false) }}
                style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4, padding: '6px 10px', cursor: 'pointer', color: 'var(--color-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.5rem' }}>
                CANCEL
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--color-text)' }}>
                {profile.username || 'Adventurer'}
              </span>
              <button onClick={() => { setNewName(profile.username); setEditingName(true) }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-dim)', fontSize: '0.7rem' }}>
                ✏️
              </button>
            </div>
          )}
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--color-cyan)' }}>
            {AVATARS.find(a => a.id === profile.avatarId)?.label ?? 'Adventurer'}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--color-dim)', marginTop: 4 }}>
            Joined {joinedDate}
          </div>
        </div>

        {/* Level badge */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--color-gold)', textShadow: '0 0 16px rgba(226,196,106,0.4)' }}>
            {player.level}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--color-dim)', letterSpacing: '0.12em' }}>LEVEL</div>
        </div>
      </motion.div>

      {/* ── Stats grid ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12, marginBottom: '1.5rem' }}>
        {[
          { label: 'Bosses Slain', value: player.defeatedBosses.length, color: 'var(--color-cyan)' },
          { label: 'Total XP', value: player.xp.toLocaleString(), color: 'var(--color-gold)' },
          { label: 'Quests Done', value: completedQuests, color: '#a78bfa' },
          { label: 'Skills Unlocked', value: player.unlockedSkills.length, color: 'var(--color-magenta)' },
          { label: 'HP', value: `${player.hp}/${player.maxHp}`, color: '#f87171' },
          { label: 'Skill Points', value: player.skillPoints, color: 'var(--color-gold)' },
        ].map(({ label, value, color }) => (
          <div key={label} style={{
            background: 'var(--color-surface)', borderRadius: 10,
            border: '1px solid rgba(255,255,255,0.06)', padding: '14px 16px',
          }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: 'var(--color-dim)', letterSpacing: '0.12em', marginBottom: 6 }}>
              {label.toUpperCase()}
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color }}>{value}</div>
          </div>
        ))}
      </div>

      {/* ── Inventory ── */}
      {player.inventory.length > 0 && (
        <div style={{ background: 'var(--color-surface)', borderRadius: 12, border: '1px solid rgba(94,200,220,0.1)', padding: '1rem 1.2rem', marginBottom: '1.5rem' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: 'var(--color-cyan)', letterSpacing: '0.1em', marginBottom: 10 }}>Inventory</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {player.inventory.map((item, i) => (
              <span key={i} style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--color-text)',
                background: 'var(--color-raised)', borderRadius: 4, padding: '4px 10px',
                border: '1px solid rgba(94,200,220,0.15)',
              }}>
                📜 {item}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ── Achievements ── */}
      {player.achievements.length > 0 && (
        <div style={{ background: 'var(--color-surface)', borderRadius: 12, border: '1px solid rgba(226,196,106,0.15)', padding: '1rem 1.2rem', marginBottom: '1.5rem' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: 'var(--color-gold)', letterSpacing: '0.1em', marginBottom: 10 }}>Achievements</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {player.achievements.map((ach, i) => (
              <span key={i} style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--color-gold)',
                background: 'rgba(226,196,106,0.08)', borderRadius: 4, padding: '4px 10px',
                border: '1px solid rgba(226,196,106,0.2)',
              }}>
                🏅 {ach}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ── Save controls ── */}
      <div style={{ background: 'var(--color-surface)', borderRadius: 12, border: '1px solid rgba(94,200,220,0.1)', padding: '1.2rem 1.5rem', marginBottom: '1.5rem' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: 'var(--color-cyan)', letterSpacing: '0.1em', marginBottom: 14 }}>
          Save Data
        </div>

        <AnimatePresence>
          {importMsg && (
            <motion.div
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                color: importMsg.type === 'success' ? 'var(--color-gold)' : 'var(--color-magenta)',
                background: importMsg.type === 'success' ? 'rgba(226,196,106,0.08)' : 'rgba(217,122,184,0.08)',
                border: `1px solid ${importMsg.type === 'success' ? 'rgba(226,196,106,0.2)' : 'rgba(217,122,184,0.2)'}`,
                borderRadius: 6, padding: '8px 12px', marginBottom: 12,
              }}
            >
              {importMsg.type === 'success' ? '✓' : '✗'} {importMsg.text}
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button onClick={handleExport} style={actionBtnStyle('#5ec8dc')}>
            ⬇ Export Save
          </button>
          <button onClick={() => importRef.current?.click()} style={actionBtnStyle('#a78bfa')}>
            ⬆ Import Save
          </button>
          <input ref={importRef} type="file" accept=".json" onChange={handleImport} style={{ display: 'none' }} />
        </div>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'var(--color-dim)', marginTop: 10 }}>
          Export saves your progress as a JSON file. Import restores from a previously exported file.
        </p>
      </div>

      {/* ── Danger zone ── */}
      <div style={{ background: 'rgba(248,113,113,0.04)', borderRadius: 12, border: '1px solid rgba(248,113,113,0.15)', padding: '1.2rem 1.5rem' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: '#f87171', letterSpacing: '0.1em', marginBottom: 14 }}>
          Danger Zone
        </div>
        {showResetConfirm ? (
          <div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: 12 }}>
              This will erase ALL progress — bosses, quests, skills, and your profile. This cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={handleReset} style={actionBtnStyle('#f87171')}>⚠ Confirm Reset</button>
              <button onClick={() => setShowResetConfirm(false)} style={actionBtnStyle('#8a9aad')}>Cancel</button>
            </div>
          </div>
        ) : (
          <button onClick={() => setShowResetConfirm(true)} style={actionBtnStyle('#f87171')}>
            ↺ Reset All Progress
          </button>
        )}
      </div>

      {/* ── Avatar picker modal ── */}
      <AnimatePresence>
        {showAvatarPicker && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, background: 'rgba(5,13,20,0.85)',
              backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 200, padding: '1rem',
            }}
            onClick={() => setShowAvatarPicker(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: 'var(--color-surface)', borderRadius: 16,
                border: '1px solid rgba(94,200,220,0.2)', padding: '1.5rem',
                maxWidth: 480, width: '100%', maxHeight: '80vh', overflowY: 'auto',
              }}
            >
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.7rem', color: 'var(--color-cyan)', marginBottom: '1rem' }}>
                Choose Your Avatar
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 10 }}>
                {AVATARS.map(av => (
                  <div key={av.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    <AvatarDisplay
                      avatarId={av.id} size={52}
                      selected={profile.avatarId === av.id}
                      onClick={() => { profile.setAvatar(av.id); setShowAvatarPicker(false) }}
                    />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.38rem', color: 'var(--color-dim)', textAlign: 'center' }}>
                      {av.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function actionBtnStyle(color: string): React.CSSProperties {
  return {
    fontFamily: 'var(--font-display)', fontSize: '0.55rem', letterSpacing: '0.1em',
    color, background: 'transparent', border: `1px solid ${color}50`,
    borderRadius: 6, padding: '8px 16px', cursor: 'pointer',
    transition: 'background 0.15s',
  }
}
