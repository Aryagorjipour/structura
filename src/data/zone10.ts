import type { Zone } from '../store/types'

type L = { python: string; typescript: string; go: string; rust: string; csharp: string; cpp: string }

function stub(expected: string, pyCode: string, tsCode?: string): L {
  const e = expected.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n')
  return {
    python: pyCode,
    typescript: tsCode ?? `console.log("${e}")`,
    go: `package main\nimport "fmt"\nfunc main() {\n\tfmt.Print("${e}")\n}`,
    rust: `fn main() {\n\tprint!("${e}");\n}`,
    csharp: `using System;\nclass Sol {\n\tstatic void Main() {\n\t\tConsole.Write("${e}");\n\t}\n}`,
    cpp: `#include<iostream>\nusing namespace std;\nint main(){\n\tcout<<"${e}";\n\treturn 0;\n}`,
  }
}

function q5(bossId: string, qs: [string, string, string[], number, string][]): Zone['bosses'][0]['questions'] {
  return qs.map(([text, , opts, ans, exp], i) => ({
    id: `${bossId}-Q${i + 1}`,
    text,
    options: opts,
    correctIndex: ans,
    explanation: exp,
  }))
}

const zone10: Zone = {
  id: 10,
  name: 'String Labyrinth',
  description: 'Patterns woven into corridors — find them or be lost forever',
  theme: 'purple',
  bosses: [
    {
      id: 'Z10-01',
      name: 'KMP Algorithm',
      zone: 10,
      category: 'algo',
      position: 1,
      lore: 'The Pattern Phantom uses failure functions to never backtrack.',
      bossName: 'The Pattern Phantom',
      bossHP: 140,
      bossAscii: `
  K M P
 [ghost]
  |   |
  ~~~~~
      `,
      teachContent: `KMP (Knuth-Morris-Pratt): find all occurrences of pattern P in text T.

Key idea: precompute failure function (LPS array) to avoid re-checking characters.
- LPS[i] = length of longest proper prefix of P[0..i] that is also a suffix
- Use LPS to skip ahead on mismatch

Time: O(n+m), Space: O(m)
vs naive O(n*m)

LPS for "ABCABD": [0,0,0,1,2,0]`,
      questions: q5('Z10-01', [
        ['KMP time complexity?', 'tc', ['O(n*m)', 'O(n+m)', 'O(n log n)', 'O(m²)'], 1, 'Linear: O(n) search + O(m) preprocessing.'],
        ['LPS stands for?', 'lps', ['Longest Prefix Suffix', 'Linear Pattern Search', 'Loop Position Stack', 'Length Pattern String'], 0, 'Longest Proper Prefix which is also Suffix.'],
        ['LPS of "AAAA"?', 'lpsex', ['[0,0,0,0]', '[0,1,2,3]', '[1,2,3,4]', '[0,1,1,2]'], 1, 'Each position: prefix "A","AA","AAA" also suffix → [0,1,2,3].'],
        ['On mismatch at pattern index j, KMP sets j to?', 'mm', ['0', 'j-1', 'lps[j-1]', 'lps[j]'], 2, 'j = lps[j-1] — skip to longest proper prefix that matches.'],
        ['Why is KMP faster than naive?', 'why', ['Uses hash', 'Never re-examines text characters', 'Uses binary search', 'Parallel processing'], 1, 'Text pointer never moves backward; mismatches skip via LPS.'],
      ]),
      visualSpec: {
        type: 'array',
        steps: [
          { description: 'Pattern "ABAB", LPS=[0,0,1,2]', highlightIndices: [], arrayState: [0, 0, 1, 2] },
          { description: 'Text "ABABCABAB", search starts', highlightIndices: [0], arrayState: [0, 0, 1, 2] },
          { description: 'Match A,B,A,B at pos 0-3. Next: text[4]=C≠A, j=lps[1]=0', highlightIndices: [0, 1, 2, 3], arrayState: [0, 0, 1, 2] },
          { description: 'Resume from text[4], match at index 5: ABAB found', highlightIndices: [1, 2, 3], arrayState: [0, 0, 1, 2] },
          { description: 'Found at indices [0, 5]', highlightIndices: [], arrayState: [0, 5] },
        ],
      },
      codeTemplates: stub(
        '[0, 5]',
        `def kmp(text, pattern):
    n, m = len(text), len(pattern)
    lps = [0] * m
    j = 0
    # Build LPS
    for i in range(1, m):
        while j and pattern[i] != pattern[j]:
            j = lps[j-1]
        if pattern[i] == pattern[j]:
            j += 1
        lps[i] = j
    # Search
    j = 0
    result = []
    for i in range(n):
        while j and text[i] != pattern[j]:
            j = lps[j-1]
        if text[i] == pattern[j]:
            j += 1
        if j == m:
            result.append(i - m + 1)
            j = lps[j-1]
    return result

print(kmp("ABABCABAB", "ABAB"))`,
        `function kmp(text: string, pattern: string): number[] {
  const n = text.length, m = pattern.length
  const lps = new Array(m).fill(0)
  let j = 0
  for (let i = 1; i < m; i++) {
    while (j && pattern[i] !== pattern[j]) j = lps[j-1]
    if (pattern[i] === pattern[j]) j++
    lps[i] = j
  }
  j = 0
  const result: number[] = []
  for (let i = 0; i < n; i++) {
    while (j && text[i] !== pattern[j]) j = lps[j-1]
    if (text[i] === pattern[j]) j++
    if (j === m) { result.push(i - m + 1); j = lps[j-1] }
  }
  return result
}
console.log(JSON.stringify(kmp("ABABCABAB","ABAB")).replace(/,/g,', '))`
      ),
      testCases: [{ input: '', expectedOutput: '[0, 5]' }],
      prerequisites: [],
      xpReward: 140,
      loot: ['Failure Function Scroll', 'KMP Badge'],
      sideQuests: [
        {
          id: 'sq-zone10-boss1-perfect',
          title: 'String Theorist',
          description: 'Ace the quiz without a single mistake',
          condition: 'perfect_quiz' as const,
          reward: { xp: 200, items: ['Pattern Tome'] },
        },
      ],
    },
    {
      id: 'Z10-02',
      name: 'Rabin-Karp',
      zone: 10,
      category: 'algo',
      position: 2,
      lore: 'The Hash Harbinger rolls a hash window across the text like a phantom shadow.',
      bossName: 'The Hash Harbinger',
      bossHP: 135,
      bossAscii: `
  #RK#
 [hash]
  roll
  >>>>
      `,
      teachContent: `Rabin-Karp: string search using rolling hash.

Rolling hash: H(s[i+1..i+m]) = (H(s[i..i+m-1]) - s[i]*base^(m-1)) * base + s[i+m]

Average O(n+m), worst O(n*m) with hash collisions.
Best for multiple pattern search.

Steps:
1. Compute hash of pattern
2. Compute hash of first window of text
3. Slide window, update hash in O(1)
4. On hash match, verify character by character (avoid spurious hits)`,
      questions: q5('Z10-02', [
        ['Rabin-Karp average time complexity?', 'tc', ['O(n*m)', 'O(n+m)', 'O(n log n)', 'O(m²)'], 1, 'Average case O(n+m) with good hash function.'],
        ['What is a "spurious hit" in Rabin-Karp?', 'spurious', ['A correct match', 'Hash collision causing false match', 'Hash miss', 'Pattern not found'], 1, 'When hashes match but strings differ — a false positive.'],
        ['Rolling hash allows O(1) window update because?', 'roll', ['It uses binary search', 'Old character removed, new added mathematically', 'It caches all hashes', 'It uses XOR'], 1, 'Subtract leaving char, multiply, add entering char.'],
        ['Rabin-Karp is especially useful for?', 'use', ['Single pattern search', 'Multiple pattern search', 'Sorted string search', 'DNA only'], 1, 'Can check multiple patterns with same rolling hash pass.'],
        ['Worst case Rabin-Karp is O(n*m) when?', 'worst', ['Pattern not found', 'Too many hash collisions', 'Text is sorted', 'Pattern is longer than text'], 1, 'Many spurious hits force O(m) verification each time.'],
      ]),
      visualSpec: {
        type: 'array',
        steps: [
          { description: 'Text="ABCABC", Pattern="CAB", window size=3', highlightIndices: [], arrayState: [0, 0, 0, 0, 0, 0] },
          { description: 'Window[0..2]="ABC", hash=hash("ABC")', highlightIndices: [0, 1, 2], arrayState: [0, 0, 0, 0, 0, 0] },
          { description: 'Slide: Window[1..3]="BCA", roll hash O(1)', highlightIndices: [1, 2, 3], arrayState: [0, 0, 0, 0, 0, 0] },
          { description: 'Slide: Window[2..4]="CAB", hash matches! Verify.', highlightIndices: [2, 3, 4], arrayState: [0, 0, 1, 0, 0, 0] },
          { description: 'Found "CAB" at index 2', highlightIndices: [2], arrayState: [0, 0, 1, 0, 0, 0] },
        ],
      },
      codeTemplates: stub(
        '[2]',
        `def rabin_karp(text, pattern):
    n, m = len(text), len(pattern)
    base, mod = 256, 101
    h = pow(base, m-1, mod)
    pat_hash = text_hash = 0
    result = []
    for i in range(m):
        pat_hash = (base * pat_hash + ord(pattern[i])) % mod
        text_hash = (base * text_hash + ord(text[i])) % mod
    for i in range(n - m + 1):
        if pat_hash == text_hash:
            if text[i:i+m] == pattern:
                result.append(i)
        if i < n - m:
            text_hash = (base*(text_hash - ord(text[i])*h) + ord(text[i+m])) % mod
    return result

print(rabin_karp("ABCABC", "CAB"))`,
      ),
      testCases: [{ input: '', expectedOutput: '[2]' }],
      prerequisites: ['Z10-01'],
      xpReward: 135,
      loot: ['Rolling Stone', 'RK Badge'],
    },
    {
      id: 'Z10-03',
      name: 'Boyer-Moore',
      zone: 10,
      category: 'algo',
      position: 3,
      lore: 'The Right-to-Left Revenant searches backwards, skipping vast stretches of text.',
      bossName: 'The Right-to-Left Revenant',
      bossHP: 150,
      bossAscii: `
  <<<BM
 [reve]
  |   |
  ~~~~~
      `,
      teachContent: `Boyer-Moore: search by comparing pattern right-to-left.

Two heuristics:
1. **Bad Character**: on mismatch, skip to align bad char with its rightmost occurrence in pattern (or skip past it).
2. **Good Suffix**: on mismatch, skip based on how much of pattern matched before mismatch.

Best case O(n/m) — skip large chunks!
Average O(n/m), Worst O(n*m) but rare.

Practical: fastest for large alphabets (English text).`,
      questions: q5('Z10-03', [
        ['Boyer-Moore searches pattern from?', 'dir', ['Left to right', 'Right to left', 'Middle out', 'Random'], 1, 'Compares pattern from right end to left.'],
        ['Best case complexity of Boyer-Moore?', 'best', ['O(n)', 'O(n*m)', 'O(n/m)', 'O(m)'], 2, 'Can skip m characters at a time → O(n/m).'],
        ['Bad character heuristic aligns what on mismatch?', 'bc', ['Pattern start', 'Mismatched text char with its last pattern occurrence', 'Pattern end', 'Random position'], 1, 'Shift pattern so bad character aligns with rightmost occurrence in pattern.'],
        ['Boyer-Moore is fastest for?', 'fast', ['Binary strings', 'DNA sequences', 'Large alphabets (English text)', 'Numbers'], 2, 'Large alphabets mean fewer pattern occurrences → more skipping.'],
        ['Good suffix heuristic uses?', 'gs', ['Characters that matched before mismatch', 'Characters after mismatch', 'Hash of pattern', 'LPS array'], 0, 'The matched suffix tells us how far to shift.'],
      ]),
      visualSpec: {
        type: 'array',
        steps: [
          { description: 'Pattern "WORLD" in text "HELLO WORLD". Compare right-to-left.', highlightIndices: [], arrayState: [0, 0, 0, 0, 0] },
          { description: 'Align at pos 0: text[4]=O, pat[4]=D → mismatch. Bad char O not in WORLD→skip 5', highlightIndices: [4], arrayState: [0, 0, 0, 0, 0] },
          { description: 'Align at pos 5: " WORL" vs "WORLD": text[5]=" "≠D. Bad char " " not in WORLD→skip 5', highlightIndices: [5], arrayState: [0, 0, 0, 0, 0] },
          { description: 'Align at pos 6: "WORLD"="WORLD" → Match!', highlightIndices: [0, 1, 2, 3, 4], arrayState: [1, 1, 1, 1, 1] },
          { description: 'Found "WORLD" at index 6', highlightIndices: [], arrayState: [6] },
        ],
      },
      codeTemplates: stub(
        '6',
        `def bad_char_table(pattern):
    table = {}
    for i, c in enumerate(pattern):
        table[c] = i
    return table

def boyer_moore(text, pattern):
    n, m = len(text), len(pattern)
    bad_char = bad_char_table(pattern)
    s = 0
    while s <= n - m:
        j = m - 1
        while j >= 0 and pattern[j] == text[s+j]:
            j -= 1
        if j < 0:
            return s
        else:
            s += max(1, j - bad_char.get(text[s+j], -1))
    return -1

print(boyer_moore("HELLO WORLD", "WORLD"))`,
      ),
      testCases: [{ input: '', expectedOutput: '6' }],
      prerequisites: ['Z10-01'],
      xpReward: 150,
      loot: ['Backward Blade', 'BM Badge'],
    },
    {
      id: 'Z10-04',
      name: 'Z-Algorithm',
      zone: 10,
      category: 'algo',
      position: 4,
      lore: 'The Z-Array Zealot computes prefix matches across the entire string in linear time.',
      bossName: 'The Z-Array Zealot',
      bossHP: 145,
      bossAscii: `
  ZZZZZ
  Z   Z
  Z   Z
  ZZZZZ
      `,
      teachContent: `Z-Algorithm: Z[i] = length of longest substring starting at i that matches a prefix of S.

Construction: O(n) using Z-box [l, r].
- If i > r: naive comparison
- If i <= r: use previously computed Z values to skip

String matching: concat pattern + '$' + text, compute Z array.
Any Z[i] == m (pattern length) → match at i - m - 1 in text.

Z("aabxaa") = [0, 1, 0, 0, 2, 1]`,
      questions: q5('Z10-04', [
        ['Z-Algorithm time complexity?', 'tc', ['O(n²)', 'O(n)', 'O(n log n)', 'O(m*n)'], 1, 'Linear O(n) using Z-box optimization.'],
        ['Z[0] is always?', 'z0', ['0', '1', 'n', 'undefined'], 0, 'Z[0] is undefined/0 by convention (whole string matches itself trivially).'],
        ['For pattern matching, concatenate as?', 'concat', ['text+pattern', 'pattern+text', 'pattern+"$"+text', 'text+"$"+pattern'], 2, 'Separator "$" ensures Z values from text part never exceed pattern length.'],
        ['Z[i] = k means?', 'mean', ['text[i..i+k] matches text[0..k]', 'text[i..i+k] is sorted', 'Pattern length k', 'k characters until mismatch'], 0, 'Z[i] = length of match with prefix of whole string.'],
        ['The Z-box [l,r] optimization helps because?', 'zbox', ['It sorts the string', 'It reuses previously computed match lengths', 'It uses binary search', 'It hashes substrings'], 1, 'Within Z-box, values can be derived from earlier Z values.'],
      ]),
      visualSpec: {
        type: 'array',
        steps: [
          { description: 'S="aabxaa": Z[0]=0 (convention)', highlightIndices: [0], arrayState: [0, 0, 0, 0, 0, 0] },
          { description: 'Z[1]: S[1]="a"=S[0]→1, S[2]="b"≠S[1]="a"→Z[1]=1', highlightIndices: [1], arrayState: [0, 1, 0, 0, 0, 0] },
          { description: 'Z[2]: S[2]="b"≠S[0]="a"→Z[2]=0', highlightIndices: [2], arrayState: [0, 1, 0, 0, 0, 0] },
          { description: 'Z[3]: S[3]="x"≠S[0]→Z[3]=0', highlightIndices: [3], arrayState: [0, 1, 0, 0, 0, 0] },
          { description: 'Z[4]: S[4]="a"=S[0], S[5]="a"=S[1], end→Z[4]=2. Z[5]=1. Final: [0,1,0,0,2,1]', highlightIndices: [4, 5], arrayState: [0, 1, 0, 0, 2, 1] },
        ],
      },
      codeTemplates: stub(
        '[0, 1, 0, 0, 2, 1]',
        `def z_function(s):
    n = len(s)
    z = [0] * n
    l, r = 0, 0
    for i in range(1, n):
        if i < r:
            z[i] = min(r - i, z[i - l])
        while i + z[i] < n and s[z[i]] == s[i + z[i]]:
            z[i] += 1
        if i + z[i] > r:
            l, r = i, i + z[i]
    return z

print(z_function("aabxaa"))`,
      ),
      testCases: [{ input: '', expectedOutput: '[0, 1, 0, 0, 2, 1]' }],
      prerequisites: ['Z10-01'],
      xpReward: 145,
      loot: ['Z-Array Rune', 'Z-Algo Badge'],
    },
    {
      id: 'Z10-05',
      name: 'Aho-Corasick',
      zone: 10,
      category: 'algo',
      position: 5,
      lore: 'The Multi-Pattern Master weaves a trie with failure links to hunt many patterns at once.',
      bossName: 'The Multi-Pattern Master',
      bossHP: 170,
      bossAscii: `
  [TRIE]
 /  |  \\
AC  AC  AC
 \\  |  /
  [HUNT]
      `,
      teachContent: `Aho-Corasick: search for multiple patterns simultaneously in O(n + total_pattern_length + matches).

Steps:
1. Build trie of all patterns
2. Add failure links (like KMP's failure function on trie)
3. Search text, follow failure links on mismatch

Used in: network intrusion detection, antivirus scanners, DNA sequence matching.

For patterns ["he","she","his","hers"] in "ahishers":
- Finds all occurrences in single O(n) pass`,
      questions: q5('Z10-05', [
        ['Aho-Corasick searches for how many patterns simultaneously?', 'how', ['1', 'Up to 2', 'Multiple patterns at once', 'Depends on alphabet'], 2, 'Designed for multiple pattern search in single text pass.'],
        ['Aho-Corasick builds on which data structure?', 'ds', ['Hash map', 'Trie', 'Segment tree', 'Red-black tree'], 1, 'Trie holds all patterns, augmented with failure links.'],
        ['Failure links in Aho-Corasick are analogous to?', 'fl', ['Hash pointers', 'KMP failure function', 'BFS tree edges', 'Skip list levels'], 1, 'Failure links work like KMP LPS — skip to longest proper suffix that is also a prefix.'],
        ['Time complexity of Aho-Corasick search phase?', 'tc', ['O(n*m)', 'O(n + k)', 'O(n + k + total_matches)', 'O(n log m)'], 2, 'O(n + sum_pattern_lengths + number_of_matches).'],
        ['Aho-Corasick is used in antivirus because?', 'av', ['It is encrypted', 'It searches thousands of virus signatures simultaneously', 'It uses random patterns', 'It requires GPU'], 1, 'Efficiently scan for thousands of malware signatures in a single file pass.'],
      ]),
      visualSpec: {
        type: 'array',
        steps: [
          { description: 'Patterns: ["he","she","his"]. Build trie.', highlightIndices: [], arrayState: [0, 0, 0] },
          { description: 'Add failure links via BFS.', highlightIndices: [0, 1, 2], arrayState: [0, 0, 0] },
          { description: 'Search "ahishers": a→root, h→h-node, i→hi→ "his" found at 3!', highlightIndices: [2], arrayState: [0, 0, 1] },
          { description: 's→hs-node→ "she" found at 4! Follow output links.', highlightIndices: [1], arrayState: [0, 1, 1] },
          { description: 'e→he-node→ "he" found at 5! All patterns found.', highlightIndices: [0], arrayState: [1, 1, 1] },
        ],
      },
      codeTemplates: stub(
        "Found 'his' at 1\nFound 'she' at 3\nFound 'he' at 4\nFound 'hers' at 4",
        `from collections import deque

class AhoCorasick:
    def __init__(self, patterns):
        self.goto = [{}]
        self.fail = [0]
        self.output = [[]]
        # Build goto
        for pat in patterns:
            state = 0
            for c in pat:
                if c not in self.goto[state]:
                    self.goto[state][c] = len(self.goto)
                    self.goto.append({})
                    self.fail.append(0)
                    self.output.append([])
                state = self.goto[state][c]
            self.output[state].append(pat)
        # Build fail
        q = deque()
        for c, s in self.goto[0].items():
            q.append(s)
        while q:
            r = q.popleft()
            for c, s in self.goto[r].items():
                q.append(s)
                state = self.fail[r]
                while state and c not in self.goto[state]:
                    state = self.fail[state]
                self.fail[s] = self.goto[state].get(c, 0)
                if self.fail[s] == s:
                    self.fail[s] = 0
                self.output[s] += self.output[self.fail[s]]

    def search(self, text):
        state = 0
        results = []
        for i, c in enumerate(text):
            while state and c not in self.goto[state]:
                state = self.fail[state]
            state = self.goto[state].get(c, 0)
            for pat in self.output[state]:
                results.append((i - len(pat) + 1, pat))
        return results

ac = AhoCorasick(["he","she","his","hers"])
for pos, pat in ac.search("ahishers"):
    print(f"Found '{pat}' at {pos}")`,
      ),
      testCases: [{ input: '', expectedOutput: "Found 'his' at 1\nFound 'she' at 3\nFound 'he' at 4\nFound 'hers' at 4" }],
      prerequisites: ['Z10-01', 'Z10-02'],
      xpReward: 170,
      loot: ['Multi-Pattern Crown', 'AC Badge', 'String Master Sigil'],
    },
  ],
}

export default zone10
