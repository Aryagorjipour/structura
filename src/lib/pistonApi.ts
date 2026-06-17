// Code execution backends — all free, no billing:
//   Python     → Pyodide v0.26.4 (CPython 3.11 WASM, browser-native, no API)
//   TypeScript → typescript.js from CDN, transpile + run in browser
//   Go/Rust/C#/C++ → Wandbox API (free, no auth, CORS-enabled)

export type PistonLanguage = 'python' | 'typescript' | 'go' | 'rust' | 'csharp' | 'cpp'

export interface ExecuteResult {
  stdout: string
  stderr: string
  exitCode: number
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof document === 'undefined') { reject(new Error('SSR')); return }
    if (document.querySelector(`script[src="${src}"]`)) { resolve(); return }
    const s = document.createElement('script')
    s.src = src
    s.onload = () => resolve()
    s.onerror = () => reject(new Error(`Failed to load ${src}`))
    document.head.appendChild(s)
  })
}

// ─── Python via Pyodide ───────────────────────────────────────────────────────

let _pyodide: any = null
let _pyodideLoading: Promise<void> | null = null

export function isPyodideReady(): boolean {
  return _pyodide !== null
}

export async function warmupPyodide(): Promise<void> {
  if (_pyodide) return
  if (_pyodideLoading) { await _pyodideLoading; return }
  _pyodideLoading = (async () => {
    await loadScript('https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js')
    _pyodide = await (window as any).loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/',
    })
  })()
  await _pyodideLoading
}

async function executePython(code: string, stdin: string): Promise<ExecuteResult> {
  await warmupPyodide()
  try {
    _pyodide.runPython(`
import sys
from io import StringIO
_pyodide_buf = StringIO()
_pyodide_old_stdout = sys.stdout
sys.stdout = _pyodide_buf
`)
    if (stdin) {
      const lines = JSON.stringify(stdin.split('\n'))
      _pyodide.runPython(`
_pyodide_stdin = ${lines}
_pyodide_stdin_idx = 0
def _pyodide_input(prompt=''):
    global _pyodide_stdin_idx
    if _pyodide_stdin_idx < len(_pyodide_stdin):
        val = _pyodide_stdin[_pyodide_stdin_idx]
        _pyodide_stdin_idx += 1
        return val
    return ''
import builtins
builtins.input = _pyodide_input
`)
    }

    await _pyodide.runPythonAsync(code)

    const stdout: string = _pyodide.runPython(`
sys.stdout = _pyodide_old_stdout
_pyodide_buf.getvalue()
`)
    return { stdout, stderr: '', exitCode: 0 }
  } catch (err: any) {
    try { _pyodide.runPython(`sys.stdout = _pyodide_old_stdout`) } catch {}
    return { stdout: '', stderr: String(err), exitCode: 1 }
  }
}

// ─── TypeScript via in-browser transpile ─────────────────────────────────────

let _tsReady = false
let _tsLoading: Promise<void> | null = null

async function loadTypeScript(): Promise<void> {
  if (_tsReady) return
  if (_tsLoading) { await _tsLoading; return }
  _tsLoading = loadScript('https://cdn.jsdelivr.net/npm/typescript@5.3.3/lib/typescript.js')
  await _tsLoading
  _tsReady = true
}

async function executeTypeScript(code: string): Promise<ExecuteResult> {
  await loadTypeScript()
  const ts = (window as any).ts

  const result = ts.transpileModule(code, {
    compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.None },
    reportDiagnostics: true,
  })

  if (result.diagnostics?.length) {
    const errs: string = result.diagnostics
      .map((d: any) => ts.flattenDiagnosticMessageText(d.messageText, '\n'))
      .join('\n')
    return { stdout: '', stderr: errs, exitCode: 1 }
  }

  // Capture console output (player runs their own code in their own browser session)
  const lines: string[] = []
  const origLog = console.log
  const origError = console.error
  const origWarn = console.warn
  console.log = (...args: unknown[]) => lines.push(args.map(String).join(' '))
  console.error = (...args: unknown[]) => lines.push(args.map(String).join(' '))
  console.warn = (...args: unknown[]) => lines.push(args.map(String).join(' '))

  let stderr = ''
  try {
    // eslint-disable-next-line no-new-func
    Function(result.outputText)()
  } catch (err: any) {
    stderr = String(err)
  } finally {
    console.log = origLog
    console.error = origError
    console.warn = origWarn
  }

  return { stdout: lines.length ? lines.join('\n') + '\n' : '', stderr, exitCode: stderr ? 1 : 0 }
}

// ─── Go / Rust / C# / C++ via Wandbox ────────────────────────────────────────

const WANDBOX_COMPILER: Record<string, string> = {
  go:     'go-1.21.0',
  rust:   'rust-1.70.0',
  csharp: 'mono-6.12.0.122',
  cpp:    'gcc-13.2.0',
}

async function executeWandbox(language: string, code: string, stdin: string): Promise<ExecuteResult> {
  const compiler = WANDBOX_COMPILER[language]
  const resp = await fetch('https://wandbox.org/api/compile.json', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ compiler, code, stdin, save: false }),
  })
  if (!resp.ok) throw new Error(`Wandbox error: ${resp.status}`)
  const data = await resp.json()
  return {
    stdout: data.program_output ?? '',
    stderr: data.program_error ?? data.compiler_error ?? '',
    exitCode: parseInt(data.status ?? '0', 10),
  }
}

// ─── Public API (interface unchanged) ────────────────────────────────────────

export async function executeCode(
  language: PistonLanguage,
  code: string,
  stdin = ''
): Promise<ExecuteResult> {
  switch (language) {
    case 'python':     return executePython(code, stdin)
    case 'typescript': return executeTypeScript(code)
    default:           return executeWandbox(language, code, stdin)
  }
}

export function checkOutput(actual: string, expected: string): boolean {
  return actual.trim() === expected.trim()
}
