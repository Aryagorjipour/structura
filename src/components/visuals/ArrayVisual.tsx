'use client'

import { motion } from 'framer-motion'

interface ArrayVisualProps {
  values: (number | string)[]
  highlightIndices?: number[]
  label?: string
}

export default function ArrayVisual({ values, highlightIndices = [], label }: ArrayVisualProps) {
  return (
    <div className="my-2">
      {label && <div className="font-pixel text-xs text-gray-400 mb-1">{label}</div>}
      <div className="flex flex-wrap gap-1">
        {values.map((val, i) => {
          const highlighted = highlightIndices.includes(i)
          return (
            <motion.div
              key={i}
              animate={{
                backgroundColor: highlighted ? '#166534' : '#1f2937',
                borderColor: highlighted ? '#22c55e' : '#374151',
                scale: highlighted ? 1.1 : 1,
              }}
              transition={{ duration: 0.3 }}
              className="border-2 w-10 h-10 flex flex-col items-center justify-center font-pixel"
            >
              <span className="text-xs text-gray-200">{val}</span>
              <span className="text-xs text-gray-600">[{i}]</span>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
