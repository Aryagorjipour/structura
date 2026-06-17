'use client'

import { motion } from 'framer-motion'
import type { TraceStep } from '../../store/types'

interface GenericVisualProps {
  step: TraceStep
  stepIndex: number
  total: number
}

export default function GenericVisual({ step, stepIndex, total }: GenericVisualProps) {
  return (
    <motion.div
      key={stepIndex}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        border: '1px solid rgba(94,200,220,0.2)',
        background: 'var(--color-surface)',
        borderRadius: 8,
        padding: '1rem',
      }}
    >
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.12em', color: 'var(--color-cyan)', marginBottom: 8 }}>
        STEP {stepIndex + 1} / {total}
      </div>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--color-text)', lineHeight: 1.7 }}>
        {step.description ?? step.label ?? ''}
      </div>
      {step.arrayState && step.arrayState.length > 0 && (
        <div style={{ marginTop: '0.75rem', display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
          {step.arrayState.map((val, i) => (
            <div
              key={i}
              style={{
                border: step.highlightIndices?.includes(i)
                  ? '2px solid #22c55e'
                  : '2px solid #4b5563',
                background: step.highlightIndices?.includes(i)
                  ? '#052e16'
                  : '#111827',
                color: step.highlightIndices?.includes(i)
                  ? '#4ade80'
                  : '#d1d5db',
                width: '2.5rem',
                height: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-mono)',
                transition: 'all 0.2s',
              }}
            >
              <span style={{ fontSize: '0.75rem' }}>{val}</span>
              <span style={{ fontSize: '0.75rem', color: '#4b5563' }}>[{i}]</span>
            </div>
          ))}
        </div>
      )}
      {step.state && typeof step.state === 'object' && !Array.isArray(step.state) && Object.keys(step.state).length > 0 && (
        <div style={{ marginTop: '0.75rem', padding: '0.5rem', border: '1px solid rgba(20,184,166,0.4)', background: 'rgba(19,78,74,0.2)', borderRadius: 4 }}>
          {Object.entries(step.state).map(([k, v]) => (
            <div key={k} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#5eead4', display: 'flex', gap: '0.5rem' }}>
              <span style={{ color: '#14b8a6' }}>{k}:</span>
              <span>{String(v)}</span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}
