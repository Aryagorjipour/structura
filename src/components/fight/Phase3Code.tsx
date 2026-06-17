'use client'

import { useState, useCallback, useEffect } from 'react'
import dynamic from 'next/dynamic'
import type { BossNode, Language, CodeTemplate } from '../../store/types'
import { executeCode, warmupPyodide, isPyodideReady } from '../../lib/pistonApi'
import PixelButton from '../ui/PixelButton'

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false })

const LANGUAGES: Language[] = ['python', 'typescript', 'go', 'rust', 'csharp', 'cpp']

const MONACO_LANG: Record<Language, string> = {
  python: 'python',
  typescript: 'typescript',
  go: 'go',
  rust: 'rust',
  csharp: 'csharp',
  cpp: 'cpp',
}

function getCode(boss: BossNode, lang: Language): string {
  const tpl = boss.codeTemplates[lang]
  if (!tpl) return `// No template for ${lang}`
  if (typeof tpl === 'string') return tpl
  // CodeTemplate object (zones 1-8)
  return (tpl as CodeTemplate).starterCode ?? (tpl as CodeTemplate).solution ?? ''
}

function getExpected(boss: BossNode, lang: Language): string {
  // Zones 9-11: testCases at BossNode level
  if (boss.testCases && boss.testCases.length > 0) {
    return boss.testCases[0].expectedOutput
  }
  // Zones 1-8: testCases inside CodeTemplate
  const tpl = boss.codeTemplates[lang]
  if (tpl && typeof tpl !== 'string') {
    const ct = tpl as CodeTemplate
    if (ct.testCases && ct.testCases.length > 0) {
      return ct.testCases[0].expected ?? ''
    }
  }
  return ''
}

interface Phase3CodeProps {
  boss: BossNode
  onComplete: (passed: boolean) => void
}

export default function Phase3Code({ boss, onComplete }: Phase3CodeProps) {
  const [lang, setLang] = useState<Language>('python')
  const [code, setCode] = useState(() => getCode(boss, 'python'))
  const [output, setOutput] = useState('')
  const [running, setRunning] = useState(false)
  const [result, setResult] = useState<'pass' | 'fail' | null>(null)
  const [attempts, setAttempts] = useState(0)
  const [pyodideLoading, setPyodideLoading] = useState(false)

  // Warm up Pyodide in background when component mounts
  useEffect(() => {
    if (!isPyodideReady()) {
      setPyodideLoading(true)
      warmupPyodide().finally(() => setPyodideLoading(false))
    }
  }, [])

  function handleLangChange(newLang: Language) {
    setLang(newLang)
    setCode(getCode(boss, newLang))
    setOutput('')
    setResult(null)
  }

  const expectedOutput = getExpected(boss, lang)

  const run = useCallback(async () => {
    setRunning(true)
    setResult(null)
    setAttempts(a => a + 1)

    try {
      const stdin = boss.testCases?.[0]?.input ?? ''
      const res = await executeCode(lang, code, stdin)
      const actual = res.stdout.trim()
      const expected = expectedOutput.trim()
      const passed = actual === expected

      setOutput(res.stdout || res.stderr || '(no output)')
      setResult(passed ? 'pass' : 'fail')

      if (passed) {
        setTimeout(() => onComplete(true), 1500)
      }
    } catch (e) {
      setOutput(`Error: ${e instanceof Error ? e.message : String(e)}`)
      setResult('fail')
    } finally {
      setRunning(false)
    }
  }, [lang, code, boss, expectedOutput, onComplete])

  return (
    <div className="space-y-3">
      <div className="font-pixel text-xs text-orange-400 text-center">
        ⚔ CODE DUEL — PHASE III
      </div>

      {/* Language selector */}
      <div className="flex flex-wrap gap-1">
        {LANGUAGES.map(l => (
          <button
            key={l}
            onClick={() => handleLangChange(l)}
            className={`font-pixel text-xs px-2 py-1 border transition-all cursor-pointer ${
              l === lang
                ? 'border-orange-500 bg-orange-950 text-orange-400'
                : 'border-gray-600 text-gray-500 hover:border-gray-400'
            }`}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Challenge description */}
      {expectedOutput && (
        <div className="border border-gray-700 bg-gray-900 p-3 font-pixel text-xs">
          <div className="text-yellow-400 mb-1">CHALLENGE:</div>
          <div className="text-gray-300">
            Make the program output:{' '}
            <code className="text-green-400 whitespace-pre">{expectedOutput}</code>
          </div>
        </div>
      )}

      {/* Editor */}
      <div className="border border-gray-700" style={{ height: '300px' }}>
        <MonacoEditor
          height="300px"
          language={MONACO_LANG[lang]}
          value={code}
          onChange={v => setCode(v ?? '')}
          theme="vs-dark"
          options={{
            fontSize: 12,
            minimap: { enabled: false },
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            fontFamily: 'monospace',
          }}
        />
      </div>

      {/* Pyodide loading notice */}
      {lang === 'python' && pyodideLoading && (
        <div className="font-pixel text-xs text-cyan-600 text-center py-1">
          ⟳ Loading Python runtime (~10 MB)...
        </div>
      )}

      {/* Controls */}
      <div className="flex gap-2 items-center">
        <PixelButton onClick={run} disabled={running || (lang === 'python' && pyodideLoading)} variant="primary">
          {running ? 'RUNNING...' : lang === 'python' && pyodideLoading ? 'LOADING PYTHON...' : '▶ RUN CODE'}
        </PixelButton>
        {attempts > 2 && result === 'fail' && (
          <PixelButton onClick={() => onComplete(false)} variant="danger" size="sm">
            RETREAT
          </PixelButton>
        )}
        <span className="font-pixel text-xs text-gray-600 ml-auto">
          ATTEMPTS: {attempts}
        </span>
      </div>

      {/* Output */}
      {output && (
        <div className={`border p-3 font-mono text-xs ${
          result === 'pass'
            ? 'border-green-700 bg-green-950/30 text-green-400'
            : result === 'fail'
            ? 'border-red-700 bg-red-950/30 text-red-400'
            : 'border-gray-700 bg-gray-900 text-gray-300'
        }`}>
          <div className="font-pixel text-xs mb-1 opacity-70">OUTPUT:</div>
          <pre className="whitespace-pre-wrap">{output}</pre>
          {result === 'pass' && (
            <div className="font-pixel text-green-400 mt-2">✓ BOSS DEFEATED!</div>
          )}
          {result === 'fail' && expectedOutput && (
            <div className="font-pixel text-red-400 mt-2">
              ✗ WRONG. Expected: <code className="whitespace-pre">{expectedOutput}</code>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
