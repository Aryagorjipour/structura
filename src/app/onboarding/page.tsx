'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useProfileStore } from '@/store/profileStore'
import { AVATARS } from '@/lib/avatars'
import AvatarDisplay from '@/components/ui/AvatarDisplay'

const STEPS = ['Welcome', 'Name', 'Avatar']

export default function OnboardingPage() {
  const router = useRouter()
  const { setUsername, setAvatar, completeOnboarding } = useProfileStore()
  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [selectedAvatar, setSelectedAvatar] = useState('wizard')
  const [nameError, setNameError] = useState('')

  function handleNameNext() {
    const trimmed = name.trim()
    if (trimmed.length < 2) { setNameError('Name must be at least 2 characters'); return }
    if (trimmed.length > 20) { setNameError('Name must be 20 characters or less'); return }
    setNameError('')
    setUsername(trimmed)
    setStep(2)
  }

  function handleComplete() {
    setAvatar(selectedAvatar)
    completeOnboarding()
    router.push('/map')
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at 50% 30%, #0d1f2d 0%, #050d14 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem',
    }}>
      {/* Progress dots */}
      <div style={{ display: 'flex', gap: 8, marginBottom: '2.5rem' }}>
        {STEPS.map((s, i) => (
          <div key={s} style={{
            width: i === step ? 28 : 10,
            height: 10,
            borderRadius: 5,
            background: i <= step ? 'var(--color-cyan)' : 'rgba(94,200,220,0.2)',
            transition: 'all 0.3s',
            boxShadow: i === step ? '0 0 8px var(--color-cyan)' : 'none',
          }} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* STEP 0: WELCOME */}
        {step === 0 && (
          <motion.div key="welcome"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            style={{ textAlign: 'center', maxWidth: 480 }}
          >
            <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>⚔️</div>
            <h1 style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(1.2rem, 4vw, 2rem)',
              color: 'var(--color-cyan)', textShadow: '0 0 24px rgba(94,200,220,0.5)',
              marginBottom: '1rem', letterSpacing: '0.06em',
            }}>
              Welcome to Structura
            </h1>
            <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-muted)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '0.8rem' }}>
              80 algorithmic bosses await in the catacombs below.
            </p>
            <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-muted)', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '2rem' }}>
              Quiz their weaknesses. Trace their patterns. Defeat them with code.
            </p>
            <button
              onClick={() => setStep(1)}
              style={{
                fontFamily: 'var(--font-display)', fontSize: '0.65rem', letterSpacing: '0.15em',
                color: 'var(--color-void)', background: 'linear-gradient(135deg, var(--color-cyan), #3ab4cc)',
                border: 'none', borderRadius: 8, padding: '14px 40px', cursor: 'pointer',
                boxShadow: '0 0 24px rgba(94,200,220,0.4)',
              }}
            >
              BEGIN YOUR JOURNEY
            </button>
          </motion.div>
        )}

        {/* STEP 1: NAME */}
        {step === 1 && (
          <motion.div key="name"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            style={{ textAlign: 'center', maxWidth: 400, width: '100%' }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📜</div>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontSize: '1rem', letterSpacing: '0.08em',
              color: 'var(--color-gold)', marginBottom: '0.5rem',
            }}>
              What shall we call you?
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
              Choose your adventurer name.
            </p>
            <input
              autoFocus
              value={name}
              onChange={e => { setName(e.target.value); setNameError('') }}
              onKeyDown={e => e.key === 'Enter' && handleNameNext()}
              maxLength={20}
              placeholder="Enter your name..."
              style={{
                width: '100%', padding: '14px 16px',
                background: 'var(--color-surface)',
                border: nameError ? '1px solid var(--color-magenta)' : '1px solid rgba(94,200,220,0.3)',
                borderRadius: 8, color: 'var(--color-text)',
                fontFamily: 'var(--font-body)', fontSize: '1rem',
                outline: 'none', marginBottom: 8,
                boxSizing: 'border-box',
              }}
            />
            {nameError && (
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--color-magenta)', marginBottom: 12 }}>
                {nameError}
              </div>
            )}
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--color-dim)', marginBottom: '1.5rem', textAlign: 'right' }}>
              {name.length}/20
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              <button onClick={() => setStep(0)} style={ghostBtnStyle}>← BACK</button>
              <button onClick={handleNameNext} style={primaryBtnStyle}>CONTINUE →</button>
            </div>
          </motion.div>
        )}

        {/* STEP 2: AVATAR */}
        {step === 2 && (
          <motion.div key="avatar"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            style={{ textAlign: 'center', maxWidth: 560, width: '100%' }}
          >
            <h2 style={{
              fontFamily: 'var(--font-display)', fontSize: '1rem', letterSpacing: '0.08em',
              color: 'var(--color-gold)', marginBottom: '0.5rem',
            }}>
              Choose Your Form
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
              Select the spirit that will guide you through Structura.
            </p>

            {/* Selected preview */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: '1.5rem',
              padding: '12px 24px', background: 'var(--color-surface)', borderRadius: 12,
              border: '1px solid rgba(94,200,220,0.2)',
            }}>
              <AvatarDisplay avatarId={selectedAvatar} size={56} selected />
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', color: 'var(--color-text)' }}>
                  {name}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--color-cyan)', marginTop: 4 }}>
                  the {AVATARS.find(a => a.id === selectedAvatar)?.label ?? ''}
                </div>
              </div>
            </div>

            {/* Avatar grid */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)',
              gap: 10, marginBottom: '1.5rem',
            }}>
              {AVATARS.map(av => (
                <div key={av.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <AvatarDisplay
                    avatarId={av.id}
                    size={52}
                    selected={selectedAvatar === av.id}
                    onClick={() => setSelectedAvatar(av.id)}
                  />
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.38rem',
                    color: selectedAvatar === av.id ? 'var(--color-cyan)' : 'var(--color-dim)',
                    textAlign: 'center',
                  }}>
                    {av.label}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              <button onClick={() => setStep(1)} style={ghostBtnStyle}>← BACK</button>
              <button onClick={handleComplete} style={primaryBtnStyle}>ENTER STRUCTURA →</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const primaryBtnStyle: React.CSSProperties = {
  fontFamily: 'var(--font-display)', fontSize: '0.6rem', letterSpacing: '0.12em',
  color: 'var(--color-void)', background: 'linear-gradient(135deg, var(--color-cyan), #3ab4cc)',
  border: 'none', borderRadius: 8, padding: '12px 28px', cursor: 'pointer',
  boxShadow: '0 0 16px rgba(94,200,220,0.35)',
}

const ghostBtnStyle: React.CSSProperties = {
  fontFamily: 'var(--font-display)', fontSize: '0.6rem', letterSpacing: '0.12em',
  color: 'var(--color-muted)', background: 'transparent',
  border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '12px 20px', cursor: 'pointer',
}
