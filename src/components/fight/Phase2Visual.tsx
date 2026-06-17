'use client'

import { useState } from 'react'
import type { BossNode } from '../../store/types'
import ArrayVisual from '../visuals/ArrayVisual'
import GenericVisual from '../visuals/GenericVisual'
import PixelButton from '../ui/PixelButton'

interface Phase2VisualProps {
  boss: BossNode
  onComplete: () => void
}

export default function Phase2Visual({ boss, onComplete }: Phase2VisualProps) {
  const [stepIdx, setStepIdx] = useState(0)
  // Support both visualSpec (zones 9-11) and visualization (zones 1-8)
  const spec = boss.visualSpec ?? boss.visualization
  const steps = spec?.steps ?? []
  const step = steps[stepIdx]
  const isLast = stepIdx >= steps.length - 1

  // 'array' type with arrayState means we use ArrayVisual; otherwise GenericVisual
  const isArray = spec?.type === 'array' && step?.arrayState !== undefined

  // Step label: new schema uses 'description', old uses 'label'
  const stepLabel = step?.description ?? step?.label ?? ''
  const stepHighlight = step?.highlightIndices ?? step?.highlight ?? []
  const stepState = step?.arrayState

  if (!step) {
    return (
      <div className="border border-purple-800 p-4 font-pixel text-xs text-gray-400">
        No visualization available for this boss.
        <div className="mt-4">
          <PixelButton onClick={onComplete} variant="success">
            → PROCEED TO PHASE III
          </PixelButton>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="text-center mb-3">
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.55rem', letterSpacing: '0.1em', color: 'var(--color-cyan)', marginBottom: 4 }}>
          ▶ VISUAL TRACE — PHASE II
        </div>
        {spec?.title && (
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--color-muted)' }}>
            {spec.title}
          </div>
        )}
      </div>

      {isArray && stepState !== undefined ? (
        <div className="border border-purple-800 bg-gray-900 p-4">
          <div className="font-pixel text-xs text-gray-400 mb-3">
            STEP {stepIdx + 1}/{steps.length}: {stepLabel}
          </div>
          <ArrayVisual
            values={stepState}
            highlightIndices={stepHighlight}
          />
        </div>
      ) : (
        <GenericVisual step={step} stepIndex={stepIdx} total={steps.length} />
      )}

      <div className="flex gap-2">
        <PixelButton
          variant="ghost"
          onClick={() => setStepIdx(i => Math.max(0, i - 1))}
          disabled={stepIdx === 0}
          size="sm"
        >
          ← PREV
        </PixelButton>

        {!isLast ? (
          <PixelButton onClick={() => setStepIdx(i => i + 1)} size="sm">
            NEXT →
          </PixelButton>
        ) : (
          <PixelButton onClick={onComplete} variant="success">
            ✓ UNDERSTOOD → PHASE III
          </PixelButton>
        )}

        <span className="font-pixel text-xs text-gray-600 self-center ml-auto">
          {stepIdx + 1} / {steps.length}
        </span>
      </div>
    </div>
  )
}
