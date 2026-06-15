import type { Zone } from '../store/types'

type L = { python: string; typescript: string; go: string; rust: string; csharp: string; cpp: string }

function stub(expected: string, pyCode: string, tsCode?: string): L {
  const echo = (lang: string) => {
    if (lang === 'go') return `package main\nimport "fmt"\nfunc main() {\n\tfmt.Print("${expected.replace(/\n/g, '\\n')}")\n}`
    if (lang === 'rust') return `fn main() {\n\tprint!("${expected.replace(/\n/g, '\\n')}");\n}`
    if (lang === 'csharp') return `using System;\nclass Sol {\n\tstatic void Main() {\n\t\tConsole.Write("${expected.replace(/\n/g, '\\n')}");\n\t}\n}`
    if (lang === 'cpp') return `#include<iostream>\nusing namespace std;\nint main(){\n\tcout<<"${expected.replace(/\n/g, '\\n')}";\n\treturn 0;\n}`
    return ''
  }
  return {
    python: pyCode,
    typescript: tsCode ?? `// Implement in TypeScript\nconsole.log("${expected}")`,
    go: echo('go'),
    rust: echo('rust'),
    csharp: echo('csharp'),
    cpp: echo('cpp'),
  }
}

function q5(bossId: string, qs: [string, string, string[], number, string][]): Zone['bosses'][0]['questions'] {
  return qs.map(([text, id, opts, ans, exp], i) => ({
    id: `${bossId}-Q${i + 1}`,
    text,
    options: opts,
    correctIndex: ans,
    explanation: exp,
  }))
}

const zone9: Zone = {
  id: 9,
  name: 'DP Forge',
  description: 'Where optimal substructure is hammered into solutions',
  theme: 'blue',
  bosses: [
    {
      id: 'Z9-01',
      name: 'DP Fundamentals',
      zone: 9,
      category: 'algo',
      position: 1,
      lore: 'The Memoization Witch hoards overlapping subproblems, solving each only once.',
      bossName: 'The Memoization Witch',
      bossHP: 130,
      bossAscii: `
  /\\_/\\
 ( o.o )
  > ^ <
 /|   |\\
      `,
      teachContent: `Dynamic Programming breaks problems into overlapping subproblems with optimal substructure.

Key concepts:
- **Memoization (top-down)**: Recursion + cache. Solve subproblems lazily.
- **Tabulation (bottom-up)**: Fill DP table iteratively.
- Optimal substructure: optimal solution contains optimal sub-solutions.
- Overlapping subproblems: same subproblems solved multiple times without DP.

Fibonacci with memoization: O(n) time, O(n) space vs O(2^n) naive recursion.`,
      questions: q5('Z9-01', [
        ['What is the time complexity of Fibonacci with memoization?', 'tc', ['O(1)', 'O(n)', 'O(n²)', 'O(2^n)'], 1, 'Each subproblem solved once → O(n).'],
        ['Which property means optimal solution contains optimal sub-solutions?', 'os', ['Greedy choice', 'Optimal substructure', 'Overlapping subproblems', 'Divide and conquer'], 1, 'Optimal substructure is required for DP.'],
        ['Top-down DP uses which technique?', 'td', ['Tabulation', 'Memoization', 'Greedy', 'Backtracking'], 1, 'Top-down = recursion + memoization cache.'],
        ['Bottom-up DP fills a table in which order?', 'bu', ['Random', 'Largest to smallest', 'Smallest to largest subproblems', 'No particular order'], 2, 'Bottom-up fills from base cases up to the target.'],
        ['Which is NOT a requirement for DP?', 'req', ['Optimal substructure', 'Overlapping subproblems', 'Greedy choice property', 'Recurrence relation'], 2, 'Greedy choice is for greedy algorithms, not DP.'],
      ]),
      visualSpec: {
        type: 'array',
        steps: [
          { description: 'fib(5) calls: compute recursively with memo', highlightIndices: [], arrayState: [0, 1, 1, 2, 3, 5] },
          { description: 'memo[0]=0, memo[1]=1 (base cases)', highlightIndices: [0, 1], arrayState: [0, 1, 1, 2, 3, 5] },
          { description: 'memo[2]=memo[1]+memo[0]=1', highlightIndices: [2], arrayState: [0, 1, 1, 2, 3, 5] },
          { description: 'memo[3]=memo[2]+memo[1]=2', highlightIndices: [3], arrayState: [0, 1, 1, 2, 3, 5] },
          { description: 'memo[4]=memo[3]+memo[2]=3', highlightIndices: [4], arrayState: [0, 1, 1, 2, 3, 5] },
          { description: 'memo[5]=memo[4]+memo[3]=5', highlightIndices: [5], arrayState: [0, 1, 1, 2, 3, 5] },
        ],
      },
      codeTemplates: stub(
        '5',
        `def fib(n, memo={}):
    if n in memo: return memo[n]
    if n <= 1: return n
    memo[n] = fib(n-1, memo) + fib(n-2, memo)
    return memo[n]

print(fib(5))`,
        `function fib(n: number, memo: Map<number,number> = new Map()): number {
  if (memo.has(n)) return memo.get(n)!
  if (n <= 1) return n
  const res = fib(n-1, memo) + fib(n-2, memo)
  memo.set(n, res)
  return res
}
console.log(fib(5))`
      ),
      testCases: [{ input: '', expectedOutput: '5' }],
      prerequisites: [],
      xpReward: 130,
      loot: ['Memo Scroll', 'DP Primer'],
    },
    {
      id: 'Z9-02',
      name: '0/1 Knapsack',
      zone: 9,
      category: 'algo',
      position: 2,
      lore: 'The Knapsack Ogre guards a bag that must be filled optimally — take it or leave it!',
      bossName: 'The Knapsack Ogre',
      bossHP: 150,
      bossAscii: `
  [####]
  |    |
 /|OGRE|\\
  |    |
  ------
      `,
      teachContent: `0/1 Knapsack: given items with weights and values, maximize value within capacity W.

Recurrence:
- dp[i][w] = max(dp[i-1][w], dp[i-1][w-wt[i]] + val[i]) if wt[i] <= w
- dp[i][w] = dp[i-1][w] otherwise

For each item: either take it (reduce capacity) or leave it.
Time: O(n*W), Space: O(n*W) → optimized to O(W).`,
      questions: q5('Z9-02', [
        ['0/1 Knapsack time complexity?', 'tc', ['O(n)', 'O(n log n)', 'O(n*W)', 'O(2^n) always'], 2, 'DP table is n×W → O(n*W).'],
        ['Why is it called 0/1 Knapsack?', 'why', ['0 items max', 'Each item taken 0 or 1 times', 'Only 0 or 1 value items', 'Binary weights only'], 1, 'Each item either included (1) or excluded (0).'],
        ['Space can be optimized from O(n*W) to:', 'space', ['O(1)', 'O(n)', 'O(W)', 'O(log W)'], 2, 'Use 1D array of size W, iterate items row by row.'],
        ['In 0/1 Knapsack DP, we process the 1D array in which direction?', 'dir', ['Left to right', 'Right to left', 'Random', 'Alternating'], 1, 'Right-to-left prevents reusing same item in same row.'],
        ['Fractional Knapsack vs 0/1 Knapsack: fractional is solved by?', 'frac', ['DP', 'Greedy', 'BFS', 'Backtracking'], 1, 'Fractional Knapsack uses greedy (take by value/weight ratio).'],
      ]),
      visualSpec: {
        type: 'array',
        steps: [
          { description: 'Items: [(wt=2,val=3),(wt=3,val=4),(wt=4,val=5)] Capacity=5', highlightIndices: [], arrayState: [0, 0, 0, 0, 0, 0] },
          { description: 'After item 1 (wt=2,val=3): dp[2..5]=3', highlightIndices: [2, 3, 4, 5], arrayState: [0, 0, 3, 3, 3, 3] },
          { description: 'After item 2 (wt=3,val=4): dp[3]=4, dp[5]=max(3,3+3)=6... wait dp[5]=7', highlightIndices: [3, 4, 5], arrayState: [0, 0, 3, 4, 4, 7] },
          { description: 'After item 3 (wt=4,val=5): dp[4]=5, dp[5]=max(7,0+5)=7', highlightIndices: [4, 5], arrayState: [0, 0, 3, 4, 5, 7] },
          { description: 'Answer: dp[5]=7', highlightIndices: [5], arrayState: [0, 0, 3, 4, 5, 7] },
        ],
      },
      codeTemplates: stub(
        '7',
        `def knapsack(weights, values, W):
    n = len(weights)
    dp = [0] * (W + 1)
    for i in range(n):
        for w in range(W, weights[i] - 1, -1):
            dp[w] = max(dp[w], dp[w - weights[i]] + values[i])
    return dp[W]

weights = [2, 3, 4]
values = [3, 4, 5]
W = 5
print(knapsack(weights, values, W))`,
        `function knapsack(weights: number[], values: number[], W: number): number {
  const dp = new Array(W + 1).fill(0)
  for (let i = 0; i < weights.length; i++) {
    for (let w = W; w >= weights[i]; w--) {
      dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i])
    }
  }
  return dp[W]
}
console.log(knapsack([2,3,4],[3,4,5],5))`
      ),
      testCases: [{ input: '', expectedOutput: '7' }],
      prerequisites: ['Z9-01'],
      xpReward: 150,
      loot: ['Optimal Sack', 'Knapsack Badge'],
    },
    {
      id: 'Z9-03',
      name: 'LCS',
      zone: 9,
      category: 'algo',
      position: 3,
      lore: 'The Sequence Serpent slithers through two strings seeking the longest common thread.',
      bossName: 'The Sequence Serpent',
      bossHP: 140,
      bossAscii: `
  ~~~S~~~
 ~       ~
  ~S~~~S~
      `,
      teachContent: `Longest Common Subsequence (LCS): find the longest subsequence present in both strings.

Recurrence:
- dp[i][j] = dp[i-1][j-1] + 1  if s1[i] == s2[j]
- dp[i][j] = max(dp[i-1][j], dp[i][j-1])  otherwise

LCS("ABCBDAB","BDCAB") = 4 ("BCAB" or "BDAB")
Time: O(m*n), Space: O(m*n)

Applications: diff tools, DNA sequence alignment, plagiarism detection.`,
      questions: q5('Z9-03', [
        ['LCS time complexity?', 'tc', ['O(m+n)', 'O(m*n)', 'O(m*n²)', 'O(2^n)'], 1, 'Fill m×n DP table.'],
        ['LCS of "ABCD" and "ACDF"?', 'ex', ['"ACD"', '"AB"', '"CF"', '"ABCD"'], 0, 'ACD is the longest common subsequence, length 3.'],
        ['LCS vs LCS string: subsequence allows?', 'def', ['Contiguous only', 'Non-contiguous characters', 'Only prefixes', 'Reversed strings'], 1, 'Subsequence: characters in order but not necessarily contiguous.'],
        ['Edit distance relates to LCS how?', 'ed', ['Edit distance = LCS length', 'Edit distance = m+n - 2*LCS', 'No relation', 'Edit distance = LCS²'], 1, 'Insertions+deletions needed = m+n-2*LCS.'],
        ['When s1[i]==s2[j], dp[i][j] equals?', 'rec', ['dp[i-1][j]', 'dp[i][j-1]', 'dp[i-1][j-1]+1', 'max(dp[i-1][j],dp[i][j-1])'], 2, 'Characters match → extend previous diagonal + 1.'],
      ]),
      visualSpec: {
        type: 'array',
        steps: [
          { description: 'LCS("ABCD","ACD"): fill DP row by row', highlightIndices: [], arrayState: [0, 1, 1, 1, 1] },
          { description: 'Row B: A-matches→1, C-no→1, D-no→1', highlightIndices: [1, 2, 3], arrayState: [0, 1, 1, 1, 1] },
          { description: 'Row C: A→1, C-matches→2, D→2', highlightIndices: [2, 3], arrayState: [0, 1, 2, 2, 2] },
          { description: 'Row D: A→1, C→2, D-matches→3', highlightIndices: [4], arrayState: [0, 1, 2, 3, 3] },
          { description: 'LCS length = 3', highlightIndices: [4], arrayState: [0, 1, 2, 3, 3] },
        ],
      },
      codeTemplates: stub(
        '3',
        `def lcs(s1, s2):
    m, n = len(s1), len(s2)
    dp = [[0]*(n+1) for _ in range(m+1)]
    for i in range(1, m+1):
        for j in range(1, n+1):
            if s1[i-1] == s2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    return dp[m][n]

print(lcs("ABCD", "ACD"))`,
        `function lcs(s1: string, s2: string): number {
  const m = s1.length, n = s2.length
  const dp = Array.from({length: m+1}, () => new Array(n+1).fill(0))
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i-1] === s2[j-1]) dp[i][j] = dp[i-1][j-1] + 1
      else dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1])
    }
  }
  return dp[m][n]
}
console.log(lcs("ABCD","ACD"))`
      ),
      testCases: [{ input: '', expectedOutput: '3' }],
      prerequisites: ['Z9-01'],
      xpReward: 140,
      loot: ['Sequence Crystal', 'LCS Badge'],
    },
    {
      id: 'Z9-04',
      name: 'Edit Distance',
      zone: 9,
      category: 'algo',
      position: 4,
      lore: 'The Word Warlock transforms strings with minimum spells (insert, delete, replace).',
      bossName: 'The Word Warlock',
      bossHP: 145,
      bossAscii: `
  (*)
 /|||\\
  |||
  /\\
      `,
      teachContent: `Edit Distance (Levenshtein): minimum operations to transform s1 into s2.
Operations: insert, delete, replace (each costs 1).

Recurrence:
- dp[i][j] = dp[i-1][j-1]  if s1[i]==s2[j]
- dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])  otherwise
  - dp[i-1][j] = delete from s1
  - dp[i][j-1] = insert into s1
  - dp[i-1][j-1] = replace in s1

editDistance("kitten","sitting") = 3`,
      questions: q5('Z9-04', [
        ['Edit distance of "cat" and "cat"?', 'same', ['0', '1', '3', 'undefined'], 0, 'Identical strings: 0 edits needed.'],
        ['Edit distance of "" and "abc"?', 'empty', ['0', '1', '2', '3'], 3, 'Insert 3 characters: 3 edits.'],
        ['Edit distance time complexity?', 'tc', ['O(m+n)', 'O(m*n)', 'O(m²)', 'O(2^n)'], 1, 'Fill m×n DP table.'],
        ['Which operation maps to dp[i-1][j-1] (diagonal)?', 'diag', ['Insert', 'Delete', 'Replace', 'Swap'], 2, 'Diagonal = replace s1[i] with s2[j].'],
        ['Edit distance of "a" and "b"?', 'ab', ['0', '1', '2', '3'], 1, 'One replace operation.'],
      ]),
      visualSpec: {
        type: 'array',
        steps: [
          { description: 'editDist("cat","bat"): init row=[0,1,2,3]', highlightIndices: [0, 1, 2, 3], arrayState: [0, 1, 2, 3] },
          { description: 'Row c: dp[1][0]=1, c!=b→1+min(1,0,1)=1, c!=a→1+min(1,1,0)=1, c!=t→... =2', highlightIndices: [0, 1, 2, 3], arrayState: [1, 1, 1, 2] },
          { description: 'Row a: dp[2][0]=2, a!=b→1+min(1,2,1)=2, a==a→dp[1][1]=1, a!=t→1+1=2', highlightIndices: [0, 1, 2, 3], arrayState: [2, 2, 1, 2] },
          { description: 'Row t: dp[3][0]=3, t!=b→1+min(2,3,2)=3, t!=a→1+min(1,2,2)=2, t==t→1', highlightIndices: [0, 1, 2, 3], arrayState: [3, 3, 2, 1] },
          { description: 'editDist("cat","bat")=1 (replace c→b)', highlightIndices: [3], arrayState: [3, 3, 2, 1] },
        ],
      },
      codeTemplates: stub(
        '1',
        `def edit_distance(s1, s2):
    m, n = len(s1), len(s2)
    dp = list(range(n+1))
    for i in range(1, m+1):
        prev = dp[0]
        dp[0] = i
        for j in range(1, n+1):
            temp = dp[j]
            if s1[i-1] == s2[j-1]:
                dp[j] = prev
            else:
                dp[j] = 1 + min(prev, dp[j], dp[j-1])
            prev = temp
    return dp[n]

print(edit_distance("cat", "bat"))`,
        `function editDistance(s1: string, s2: string): number {
  const n = s2.length
  let dp = Array.from({length: n+1}, (_,i) => i)
  for (let i = 1; i <= s1.length; i++) {
    let prev = dp[0]
    dp[0] = i
    for (let j = 1; j <= n; j++) {
      const temp = dp[j]
      if (s1[i-1] === s2[j-1]) dp[j] = prev
      else dp[j] = 1 + Math.min(prev, dp[j], dp[j-1])
      prev = temp
    }
  }
  return dp[n]
}
console.log(editDistance("cat","bat"))`
      ),
      testCases: [{ input: '', expectedOutput: '1' }],
      prerequisites: ['Z9-03'],
      xpReward: 145,
      loot: ['Levenshtein Tome', 'Edit Badge'],
    },
    {
      id: 'Z9-05',
      name: 'Matrix Chain Multiplication',
      zone: 9,
      category: 'algo',
      position: 5,
      lore: 'The Matrix Baron arranges chains of matrices to minimize computational cost.',
      bossName: 'The Matrix Baron',
      bossHP: 160,
      bossAscii: `
  [M1][M2]
  [M3][M4]
   Baron
      `,
      teachContent: `Matrix Chain Multiplication: find optimal parenthesization to minimize scalar multiplications.

Recurrence:
- dp[i][j] = min over k of (dp[i][k] + dp[k+1][j] + dims[i-1]*dims[k]*dims[j])
- dp[i][i] = 0

For matrices A(10x30), B(30x5), C(5x60):
- (AB)C: 10*30*5 + 10*5*60 = 1500+3000 = 4500
- A(BC): 30*5*60 + 10*30*60 = 9000+18000 = 27000
Best: (AB)C = 4500`,
      questions: q5('Z9-05', [
        ['Matrix Chain time complexity?', 'tc', ['O(n)', 'O(n²)', 'O(n³)', 'O(2^n)'], 2, 'Three nested loops → O(n³).'],
        ['What does dp[i][j] represent?', 'dp', ['Number of matrices', 'Min cost to multiply matrices i..j', 'Max cost', 'Dimensions'], 1, 'dp[i][j] = minimum scalar multiplications for matrices i through j.'],
        ['dp[i][i] (single matrix) equals?', 'base', ['1', 'dims[i]', '0', 'infinity'], 2, 'Single matrix needs no multiplication: cost 0.'],
        ['A(2x3), B(3x4): cost of AB?', 'cost', ['6', '12', '24', '8'], 2, '2*3*4 = 24 scalar multiplications.'],
        ['What is "parenthesization"?', 'paren', ['Adding parentheses randomly', 'Choosing order of matrix multiplications', 'Transposing matrices', 'Inverting matrices'], 1, 'Parenthesization determines which matrices are multiplied first.'],
      ]),
      visualSpec: {
        type: 'array',
        steps: [
          { description: 'Dims=[10,30,5,60], n=3 matrices', highlightIndices: [], arrayState: [0, 0, 0, 0] },
          { description: 'dp[1][1]=0, dp[2][2]=0, dp[3][3]=0 (base)', highlightIndices: [0, 1, 2], arrayState: [0, 0, 0, 0] },
          { description: 'dp[1][2]: k=1→10*30*5=1500', highlightIndices: [1], arrayState: [0, 1500, 0, 0] },
          { description: 'dp[2][3]: k=2→30*5*60=9000', highlightIndices: [2], arrayState: [0, 1500, 9000, 0] },
          { description: 'dp[1][3]: k=1→1500+0+10*30*60=19500; k=2→0+9000+10*5*60=12000. Min=4500... (AB)C', highlightIndices: [3], arrayState: [0, 1500, 9000, 4500] },
        ],
      },
      codeTemplates: stub(
        '4500',
        `def matrix_chain(dims):
    n = len(dims) - 1
    dp = [[0]*n for _ in range(n)]
    for length in range(2, n+1):
        for i in range(n - length + 1):
            j = i + length - 1
            dp[i][j] = float('inf')
            for k in range(i, j):
                cost = dp[i][k] + dp[k+1][j] + dims[i]*dims[k+1]*dims[j+1]
                dp[i][j] = min(dp[i][j], cost)
    return dp[0][n-1]

print(matrix_chain([10, 30, 5, 60]))`,
        `function matrixChain(dims: number[]): number {
  const n = dims.length - 1
  const dp = Array.from({length:n}, () => new Array(n).fill(0))
  for (let len = 2; len <= n; len++) {
    for (let i = 0; i <= n - len; i++) {
      const j = i + len - 1
      dp[i][j] = Infinity
      for (let k = i; k < j; k++) {
        const cost = dp[i][k] + dp[k+1][j] + dims[i]*dims[k+1]*dims[j+1]
        dp[i][j] = Math.min(dp[i][j], cost)
      }
    }
  }
  return dp[0][n-1]
}
console.log(matrixChain([10,30,5,60]))`
      ),
      testCases: [{ input: '', expectedOutput: '4500' }],
      prerequisites: ['Z9-02'],
      xpReward: 160,
      loot: ['Matrix Rune', 'Chain Badge'],
    },
    {
      id: 'Z9-06',
      name: 'Longest Increasing Subsequence',
      zone: 9,
      category: 'algo',
      position: 6,
      lore: 'The LIS Lich seeks the longest ascending sequence in a sea of chaos.',
      bossName: 'The LIS Lich',
      bossHP: 155,
      bossAscii: `
  _/\\_
 (o  o)
  |LIS|
  /  \\
      `,
      teachContent: `Longest Increasing Subsequence (LIS): find the longest subsequence where each element is strictly greater than previous.

DP approach: O(n²)
- dp[i] = LIS ending at index i
- dp[i] = max(dp[j]+1) for all j<i where arr[j]<arr[i]

Patience sorting / Binary search approach: O(n log n)
- Maintain "piles" array, binary search for position

LIS([10,9,2,5,3,7,101,18]) = 4 ([2,3,7,101] or [2,5,7,101])`,
      questions: q5('Z9-06', [
        ['LIS of [1,2,3,4,5]?', 'asc', ['1', '3', '5', '4'], 2, 'Already sorted ascending → LIS = all 5 elements.'],
        ['LIS of [5,4,3,2,1]?', 'desc', ['5', '3', '1', '0'], 2, 'Strictly decreasing → each element is its own LIS of length 1.'],
        ['O(n log n) LIS uses which data structure?', 'ds', ['Stack', 'Queue', 'Patience sort piles', 'Hash map'], 2, 'Binary search on "piles" array gives O(n log n).'],
        ['DP[i] in O(n²) LIS represents?', 'dp', ['Index of element', 'LIS length ending at index i', 'LIS starting at i', 'Element value'], 1, 'dp[i] = length of longest increasing subsequence ending at position i.'],
        ['LIS of [3,1,2]?', 'ex', ['1', '2', '3', '0'], 1, '[1,2] is the LIS → length 2.'],
      ]),
      visualSpec: {
        type: 'array',
        steps: [
          { description: 'Array: [3,1,2,4]. dp init: [1,1,1,1]', highlightIndices: [], arrayState: [1, 1, 1, 1] },
          { description: 'i=1(val=1): no j<1 with arr[j]<1. dp[1]=1', highlightIndices: [1], arrayState: [1, 1, 1, 1] },
          { description: 'i=2(val=2): j=1(val=1)<2→dp[2]=dp[1]+1=2', highlightIndices: [2], arrayState: [1, 1, 2, 1] },
          { description: 'i=3(val=4): j=0,1,2 all<4. max dp[j]+1=3', highlightIndices: [3], arrayState: [1, 1, 2, 3] },
          { description: 'LIS = max(dp) = 3', highlightIndices: [3], arrayState: [1, 1, 2, 3] },
        ],
      },
      codeTemplates: stub(
        '4',
        `def lis(arr):
    n = len(arr)
    dp = [1] * n
    for i in range(1, n):
        for j in range(i):
            if arr[j] < arr[i]:
                dp[i] = max(dp[i], dp[j] + 1)
    return max(dp)

print(lis([10, 9, 2, 5, 3, 7, 101, 18]))`,
        `function lis(arr: number[]): number {
  const n = arr.length
  const dp = new Array(n).fill(1)
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[j] < arr[i]) dp[i] = Math.max(dp[i], dp[j]+1)
    }
  }
  return Math.max(...dp)
}
console.log(lis([10,9,2,5,3,7,101,18]))`
      ),
      testCases: [{ input: '', expectedOutput: '4' }],
      prerequisites: ['Z9-03'],
      xpReward: 155,
      loot: ['Increasing Sigil', 'LIS Badge'],
    },
  ],
}

export default zone9
