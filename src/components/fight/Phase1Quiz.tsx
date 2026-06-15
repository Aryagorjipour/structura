'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { BossNode } from '../../store/types'
import PixelButton from '../ui/PixelButton'

interface Phase1QuizProps {
  boss: BossNode
  onComplete: (passed: boolean) => void
}

export default function Phase1Quiz({ boss, onComplete }: Phase1QuizProps) {
  const [qIndex, setQIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [confirmed, setConfirmed] = useState(false)
  const [score, setScore] = useState(0)
  const [showExplain, setShowExplain] = useState(false)

  const question = boss.questions[qIndex]
  const correctIdx = question.correctIndex ?? question.correct ?? 0
  const isCorrect = selected === correctIdx
  const totalQ = boss.questions.length

  function handleSelect(idx: number) {
    if (confirmed) return
    setSelected(idx)
  }

  function handleConfirm() {
    if (selected === null) return
    const correct = selected === correctIdx
    setConfirmed(true)
    setShowExplain(true)
    if (correct) setScore(s => s + 1)
  }

  function handleNext() {
    if (qIndex + 1 >= totalQ) {
      // Need 3/5 to pass
      onComplete(score + (isCorrect ? 1 : 0) >= 3)
    } else {
      setQIndex(q => q + 1)
      setSelected(null)
      setConfirmed(false)
      setShowExplain(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Teach content */}
      <div className="border border-blue-800 bg-blue-950/30 p-3">
        <div className="font-pixel text-blue-400 text-xs mb-2">KNOWLEDGE TOME</div>
        <pre className="text-xs text-gray-300 whitespace-pre-wrap font-mono leading-relaxed">
          {boss.teachContent ?? [boss.what, boss.why, boss.when].filter(Boolean).join('\n\n')}
        </pre>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={qIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="border border-yellow-800 bg-gray-900 p-4"
        >
          <div className="font-pixel text-xs text-yellow-400 mb-3">
            QUESTION {qIndex + 1}/{totalQ}
          </div>
          <div className="font-pixel text-sm text-gray-200 mb-4 leading-relaxed">
            {question.text}
          </div>

          <div className="space-y-2">
            {question.options.map((opt, i) => {
              let style = 'border-gray-600 text-gray-300 hover:border-gray-400'
              if (confirmed) {
                if (i === correctIdx) style = 'border-green-500 bg-green-950 text-green-400'
                else if (i === selected) style = 'border-red-500 bg-red-950 text-red-400'
                else style = 'border-gray-700 text-gray-600'
              } else if (i === selected) {
                style = 'border-yellow-500 bg-yellow-950 text-yellow-300'
              }

              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  disabled={confirmed}
                  className={`w-full border p-2 text-left font-pixel text-xs transition-all ${style} ${confirmed ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  {String.fromCharCode(65 + i)}. {opt}
                </button>
              )
            })}
          </div>

          {showExplain && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-3 p-2 border text-xs font-pixel ${isCorrect ? 'border-green-700 text-green-400' : 'border-red-700 text-red-400'}`}
            >
              {isCorrect ? '✓ CORRECT! ' : '✗ WRONG. '}{question.explanation}
            </motion.div>
          )}

          <div className="flex gap-2 mt-4">
            {!confirmed ? (
              <PixelButton onClick={handleConfirm} disabled={selected === null}>
                CONFIRM
              </PixelButton>
            ) : (
              <PixelButton onClick={handleNext} variant="success">
                {qIndex + 1 >= totalQ ? 'FINISH' : 'NEXT →'}
              </PixelButton>
            )}
            <span className="font-pixel text-xs text-gray-500 self-center ml-auto">
              SCORE: {score}/{qIndex + (confirmed ? 1 : 0)}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
