'use client'

import { useState } from 'react'
import { useGameStore } from '../../store/gameStore'
import type { BossNode } from '../../store/types'
import BossDisplay from './BossDisplay'
import PlayerHUD from './PlayerHUD'
import Phase1Quiz from './Phase1Quiz'
import Phase2Visual from './Phase2Visual'
import Phase3Code from './Phase3Code'
import FightResult from './FightResult'

interface FightArenaProps {
  boss: BossNode
}

type Phase = 1 | 2 | 3 | 'victory' | 'defeat'

export default function FightArena({ boss }: FightArenaProps) {
  const [phase, setPhase] = useState<Phase>(1)
  const [bossHP, setBossHP] = useState(boss.bossHP)
  const [shake, setShake] = useState(false)
  const player = useGameStore(s => s.player)
  const gainXP = useGameStore(s => s.gainXP)
  const defeatBoss = useGameStore(s => s.defeatBoss)

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
      setPhase('victory')
    } else {
      setPhase('defeat')
    }
  }

  function handleRetry() {
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
    <div className="min-h-screen bg-gray-950 p-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 font-pixel text-xs text-gray-500">
          <span>BOSS: {boss.bossName}</span>
          <span className="text-yellow-400">{PHASE_LABELS[phase]}</span>
        </div>

        {/* Boss display */}
        {phase !== 'victory' && phase !== 'defeat' && (
          <div className="mb-4">
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
            <Phase1Quiz boss={boss} onComplete={handlePhase1Complete} />
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
    </div>
  )
}
