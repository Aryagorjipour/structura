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
      className="border border-teal-800 bg-teal-950/30 p-4"
    >
      <div className="font-pixel text-xs text-teal-400 mb-2">
        STEP {stepIndex + 1} / {total}
      </div>
      <div className="font-pixel text-sm text-gray-200 leading-relaxed">
        {step.description}
      </div>
      {step.arrayState && step.arrayState.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {step.arrayState.map((val, i) => (
            <div
              key={i}
              className={`border-2 w-10 h-10 flex flex-col items-center justify-center font-pixel transition-all ${
                step.highlightIndices?.includes(i)
                  ? 'border-green-500 bg-green-950 text-green-400'
                  : 'border-gray-600 bg-gray-900 text-gray-300'
              }`}
            >
              <span className="text-xs">{val}</span>
              <span className="text-xs text-gray-600">[{i}]</span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}
