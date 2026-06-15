export type PistonLanguage = 'python' | 'typescript' | 'go' | 'rust' | 'csharp' | 'cpp'

const PISTON_URL = 'https://emkc.org/api/v2/piston/execute'

const LANG_MAP: Record<PistonLanguage, { language: string; version: string }> = {
  python:     { language: 'python',     version: '3.10.0' },
  typescript: { language: 'typescript', version: '5.0.3' },
  go:         { language: 'go',         version: '1.16.2' },
  rust:       { language: 'rust',       version: '1.50.0' },
  csharp:     { language: 'csharp',     version: '6.12.0' },
  cpp:        { language: 'c++',        version: '10.2.0' },
}

export interface ExecuteResult {
  stdout: string
  stderr: string
  exitCode: number
}

export async function executeCode(
  language: PistonLanguage,
  code: string,
  stdin = ''
): Promise<ExecuteResult> {
  const { language: lang, version } = LANG_MAP[language]
  const resp = await fetch(PISTON_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      language: lang,
      version,
      files: [{ content: code }],
      stdin,
    }),
  })
  if (!resp.ok) throw new Error(`Piston API error: ${resp.status}`)
  const data = await resp.json()
  return {
    stdout: data.run?.stdout ?? '',
    stderr: data.run?.stderr ?? '',
    exitCode: data.run?.code ?? 1,
  }
}

// Checks if output matches expected (trims whitespace)
export function checkOutput(actual: string, expected: string): boolean {
  return actual.trim() === expected.trim()
}
