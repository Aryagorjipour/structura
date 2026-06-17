'use client'

import { useState, useRef, useEffect } from 'react'
import { useGameStore } from '../../store/gameStore'
import type { BossNode, SideQuestDef } from '../../store/types'
import BossDisplay from './BossDisplay'
import PlayerHUD from './PlayerHUD'
import Phase1Quiz from './Phase1Quiz'
import Phase2Visual from './Phase2Visual'
import Phase3Code from './Phase3Code'
import FightResult from './FightResult'
import ParticleBurst from '@/components/ui/ParticleBurst'
import { checkSideQuestCompletion } from '@/lib/questSystem'

interface FightArenaProps {
  boss: BossNode
}

type Phase = 1 | 2 | 3 | 'victory' | 'defeat'

export default function FightArena({ boss }: FightArenaProps) {
  const [phase, setPhase] = useState<Phase>(1)
  const [bossHP, setBossHP] = useState(boss.bossHP)
  const [shake, setShake] = useState(false)
  const [particleActive, setParticleActive] = useState(false)
  const [sideQuestResults, setSideQuestResults] = useState<Array<{ quest: SideQuestDef; completed: boolean }>>([])
  const [showQuestResults, setShowQuestResults] = useState(false)
  const [showResumeBanner, setShowResumeBanner] = useState(false)
  const fightStartTime = useRef<number>(Date.now())
  const quizMistakes = useRef<number>(0)
  const hintsUsed = useRef<number>(0)
  const player = useGameStore(s => s.player)
  const fight = useGameStore(s => s.fight)
  const gainXP = useGameStore(s => s.gainXP)
  const defeatBoss = useGameStore(s => s.defeatBoss)
  const addQuests = useGameStore(s => s.addQuests)
  const activeFight = useGameStore(s => s.activeFight)
  const saveActiveFight = useGameStore(s => s.saveActiveFight)
  const clearActiveFight = useGameStore(s => s.clearActiveFight)

  // Resume from saved fight on mount
  useEffect(() => {
    if (activeFight && activeFight.bossId === boss.id) {
      setPhase(activeFight.phase)
      setBossHP(Math.round(boss.bossHP * activeFight.bossHpPercent))
      if (activeFight.phase > 1) {
        setShowResumeBanner(true)
        setTimeout(() => setShowResumeBanner(false), 2500)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Persist fight state whenever phase or bossHP changes
  useEffect(() => {
    if (phase === 'victory' || phase === 'defeat') return
    saveActiveFight({
      bossId: boss.id,
      phase: phase as 1 | 2 | 3,
      bossHpPercent: boss.bossHP > 0 ? bossHP / boss.bossHP : 0,
      savedQuizState: null,
      savedTraceStep: 0,
      savedLanguage: 'python',
      savedCode: '',
      startedAt: fightStartTime.current,
    })
  }, [phase, bossHP])

  function triggerShake() {
    setShake(true)
    setTimeout(() => setShake(false), 400)
  }

  function handlePhase1Complete(passed: boolean) {
    if (passed) {
      // Damage boss 33%
      setBossHP(h => Math.max(0, Math.floor(h - boss.bossHP * 0.33)))
      triggerShake()
      setPhase(2)
    } else {
      clearActiveFight()
      setPhase('defeat')
    }
  }

  function handlePhase2Complete() {
    // Damage boss another 33%
    setBossHP(h => Math.max(0, Math.floor(h - boss.bossHP * 0.33)))
    triggerShake()
    setPhase(3)
  }

  function handlePhase3Complete(passed: boolean) {
    if (passed) {
      setBossHP(0)
      defeatBoss(boss.id, boss.xpReward, boss.loot ?? [])
      gainXP(boss.xpReward)
      clearActiveFight()

      // Evaluate side quests
      const elapsed = Date.now() - fightStartTime.current
      const context = {
        quizPerfect: false, // TODO: track per-question answers via Phase1Quiz callback
        durationMs: elapsed,
        selectedLanguage: fight?.selectedLanguage ?? 'python',
        hintsUsed: hintsUsed.current,
      }

      if (boss.sideQuests) {
        const results = boss.sideQuests.map(sq => ({
          quest: sq,
          completed: checkSideQuestCompletion(sq, context),
        }))
        setSideQuestResults(results)
        setShowQuestResults(true)

        // Award completed side quests
        results.filter(r => r.completed).forEach(r => {
          const completedQuest = {
            id: r.quest.id,
            type: 'side' as const,
            title: r.quest.title,
            description: r.quest.description,
            progress: 1,
            target: 1,
            reward: r.quest.reward,
            completedAt: Date.now(),
            bossId: boss.id,
          }
          addQuests([completedQuest])
        })
      }

      // Trigger particles
      setParticleActive(true)
      setTimeout(() => setParticleActive(false), 2500)

      setPhase('victory')
    } else {
      clearActiveFight()
      setPhase('defeat')
    }
  }

  function handleRetry() {
    clearActiveFight()
    setBossHP(boss.bossHP)
    setPhase(1)
  }

  const PHASE_LABELS: Record<number | string, string> = {
    1: 'PHASE I: QUIZ',
    2: 'PHASE II: VISUAL TRACE',
    3: 'PHASE III: CODE DUEL',
    victory: 'VICTORY',
    defeat: 'DEFEAT',
  }

  return (
    <div className="min-h-screen p-4" style={{ backgroundColor: 'var(--color-void)' }}>
      <ParticleBurst active={particleActive} />

      {showResumeBanner && (
        <div style={{
          position: 'fixed', top: '4.5rem', left: '50%', transform: 'translateX(-50%)',
          background: 'var(--color-raised)',
          border: '1px solid rgba(94,200,220,0.3)',
          borderRadius: 8, padding: '8px 20px',
          fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--color-cyan)',
          zIndex: 300, letterSpacing: '0.1em',
          boxShadow: '0 0 20px rgba(94,200,220,0.2)',
        }}>
          ▶ RESUMING FIGHT FROM SAVE
        </div>
      )}

      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 text-xs">
          <span style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}>
            BOSS: {boss.bossName}
          </span>
          <span style={{
            fontFamily: 'var(--font-display)',
            color: phase === 3 ? 'var(--color-magenta)' : 'var(--color-gold)',
          }}>
            {PHASE_LABELS[phase]}
          </span>
        </div>

        {/* Boss display */}
        {phase !== 'victory' && phase !== 'defeat' && (
          <div className="mb-4" style={{
            border: '1px solid rgba(94,200,220,0.2)',
            borderRadius: 10,
            background: 'var(--color-surface)',
            padding: '0.5rem',
          }}>
            <BossDisplay boss={boss} currentHP={bossHP} shake={shake} />
          </div>
        )}

        {/* Player HUD */}
        {phase !== 'victory' && phase !== 'defeat' && (
          <div className="mb-4">
            <PlayerHUD player={player} />
          </div>
        )}

        {/* Phase content */}
        <div>
          {phase === 1 && (
            <Phase1Quiz
              boss={boss}
              onComplete={handlePhase1Complete}
              savedQuizState={activeFight?.bossId === boss.id ? activeFight?.savedQuizState ?? null : null}
              onQuizProgress={(quizState) => {
                if (phase !== 1) return
                saveActiveFight({
                  bossId: boss.id,
                  phase: 1,
                  bossHpPercent: boss.bossHP > 0 ? bossHP / boss.bossHP : 1,
                  savedQuizState: quizState,
                  savedTraceStep: 0,
                  savedLanguage: 'python',
                  savedCode: '',
                  startedAt: fightStartTime.current,
                })
              }}
            />
          )}
          {phase === 2 && (
            <Phase2Visual boss={boss} onComplete={handlePhase2Complete} />
          )}
          {phase === 3 && (
            <Phase3Code boss={boss} onComplete={handlePhase3Complete} />
          )}
          {phase === 'victory' && (
            <FightResult victory={true} boss={boss} xpGained={boss.xpReward} />
          )}
          {phase === 'defeat' && (
            <FightResult victory={false} boss={boss} xpGained={0} onRetry={handleRetry} />
          )}
        </div>
      </div>

      {/* Side quest results toast */}
      {showQuestResults && sideQuestResults.length > 0 && (
        <div style={{
          position: 'fixed', bottom: '5rem', right: '1.5rem',
          background: 'var(--color-surface)',
          border: '1px solid rgba(226,196,106,0.3)',
          borderRadius: 10,
          padding: '12px 16px',
          zIndex: 200,
          maxWidth: 260,
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.5rem', color: 'var(--color-gold)', marginBottom: 8 }}>
            Side Quest Results
          </div>
          {sideQuestResults.map(r => (
            <div key={r.quest.id} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: r.completed ? 'var(--color-gold)' : 'var(--color-dim)', marginBottom: 4 }}>
              {r.completed ? '✓' : '✗'} {r.quest.title}
              {r.completed && r.quest.reward.xp && <span style={{ color: 'var(--color-cyan)' }}> +{r.quest.reward.xp}xp</span>}
            </div>
          ))}
          <button
            onClick={() => setShowQuestResults(false)}
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--color-dim)', background: 'none', border: 'none', cursor: 'pointer', marginTop: 8 }}
          >
            DISMISS
          </button>
        </div>
      )}
    </div>
  )
}
