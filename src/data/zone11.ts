import type { Zone } from '../store/types'

type L = { python: string; typescript: string; go: string; rust: string; csharp: string; cpp: string }

function stub(expected: string, pyCode: string): L {
  const e = expected.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n')
  return {
    python: pyCode,
    typescript: `console.log("${e}")`,
    go: `package main\nimport "fmt"\nfunc main() {\n\tfmt.Print("${e}")\n}`,
    rust: `fn main() {\n\tprint!("${e}");\n}`,
    csharp: `using System;\nclass Sol {\n\tstatic void Main() {\n\t\tConsole.Write("${e}");\n\t}\n}`,
    cpp: `#include<iostream>\nusing namespace std;\nint main(){\n\tcout<<"${e}";\n\treturn 0;\n}`,
  }
}

function q5(bossId: string, qs: [string, string[], number, string][]): Zone['bosses'][0]['questions'] {
  return qs.map(([text, opts, ans, exp], i) => ({
    id: `${bossId}-Q${i + 1}`,
    text,
    options: opts,
    correctIndex: ans,
    explanation: exp,
  }))
}

const zone11: Zone = {
  id: 11,
  name: 'Shadow Citadel',
  description: 'The final fortress. Advanced structures and forgotten arts.',
  theme: 'red',
  bosses: [
    {
      id: 'Z11-01',
      name: 'Bloom Filter',
      zone: 11,
      category: 'data-structure',
      position: 1,
      lore: 'The Probabilistic Specter may lie about presence, but never absence.',
      bossName: 'The Probabilistic Specter',
      bossHP: 140,
      bossAscii: `
  ?????
 [bloom]
  bit[]
  ~~~~~
      `,
      teachContent: `Bloom Filter: probabilistic data structure for set membership.

- Bit array of size m + k hash functions
- Insert: hash element k times, set bits
- Query: hash k times, check all bits set → "probably yes" or "definitely no"

False positives possible, false negatives impossible.
Space: O(m) bits. Query: O(k).

Used in: CDNs (is URL cached?), databases (key exists?), spam filters.`,
      questions: q5('Z11-01', [
        ['Bloom filter can produce?', ['Only false positives', 'Only false negatives', 'Both false positives and negatives', 'False positives only (no false negatives)'], 3, 'If bits unset → definitely absent. If set → probably present (false positive possible).'],
        ['Bloom filter space complexity?', ['O(n)', 'O(m) bits where m is bit array size', 'O(n²)', 'O(log n)'], 1, 'Fixed bit array of size m, independent of number of elements.'],
        ['Inserting into bloom filter sets?', ['One random bit', 'k bits (one per hash function)', 'All bits', 'No bits'], 1, 'k hash functions → k bit positions set.'],
        ['Bloom filters cannot support?', ['Lookup', 'Insertion', 'Deletion (basic)', 'Membership test'], 2, 'Standard bloom filters cannot delete — clearing a bit might affect other elements.'],
        ['As more elements added, bloom filter false positive rate?', ['Decreases', 'Stays constant', 'Increases', 'Becomes 0'], 2, 'More bits set → higher chance any query returns all-bits-set spuriously.'],
      ]),
      visualSpec: {
        type: 'array',
        steps: [
          { description: 'Bit array size=8, k=2 hash functions. Init all 0.', highlightIndices: [], arrayState: [0, 0, 0, 0, 0, 0, 0, 0] },
          { description: 'Insert "cat": h1("cat")=1, h2("cat")=5 → set bits 1,5', highlightIndices: [1, 5], arrayState: [0, 1, 0, 0, 0, 1, 0, 0] },
          { description: 'Insert "dog": h1("dog")=3, h2("dog")=6 → set bits 3,6', highlightIndices: [3, 6], arrayState: [0, 1, 0, 1, 0, 1, 1, 0] },
          { description: 'Query "cat": bits 1,5 both set → "probably yes"', highlightIndices: [1, 5], arrayState: [0, 1, 0, 1, 0, 1, 1, 0] },
          { description: 'Query "fish": h1=2, h2=7 → bit 2 is 0 → "definitely no"', highlightIndices: [2, 7], arrayState: [0, 1, 0, 1, 0, 1, 1, 0] },
        ],
      },
      codeTemplates: stub(
        'cat: True\nfish: False',
        `import hashlib

class BloomFilter:
    def __init__(self, size=100, num_hashes=3):
        self.size = size
        self.bits = [0] * size
        self.num_hashes = num_hashes

    def _hashes(self, item):
        result = []
        for i in range(self.num_hashes):
            h = int(hashlib.md5(f"{item}{i}".encode()).hexdigest(), 16)
            result.append(h % self.size)
        return result

    def add(self, item):
        for pos in self._hashes(item):
            self.bits[pos] = 1

    def contains(self, item):
        return all(self.bits[pos] for pos in self._hashes(item))

bf = BloomFilter(size=20, num_hashes=2)
bf.add("cat")
bf.add("dog")
print(f"cat: {bf.contains('cat')}")
print(f"fish: {bf.contains('fish')}")`,
      ),
      testCases: [{ input: '', expectedOutput: 'cat: True\nfish: False' }],
      prerequisites: [],
      xpReward: 140,
      loot: ['Probability Gem', 'Bloom Badge'],
      sideQuests: [
        {
          id: 'sq-zone11-boss1-cpp',
          title: 'Systems Lord',
          description: 'Conquer this boss using C++',
          condition: 'language_challenge' as const,
          conditionParam: 'cpp',
          reward: { xp: 300, badge: 'systems-lord', items: ['Ancient Tome', 'Rune Fragment', 'Shadow Crystal'] },
        },
        {
          id: 'sq-zone11-boss1-nohints',
          title: 'Pure Knowledge',
          description: 'Defeat the Citadel\'s first guardian without any hints',
          condition: 'no_hints' as const,
          reward: { xp: 250, items: ['Crystal of Power'] },
        },
      ],
    },
    {
      id: 'Z11-02',
      name: 'HyperLogLog',
      zone: 11,
      category: 'algo',
      position: 2,
      lore: 'The Cardinality Colossus estimates billions with mere kilobytes of memory.',
      bossName: 'The Cardinality Colossus',
      bossHP: 150,
      bossAscii: `
  HLL
 [~~~]
  est
  ≈∞
      `,
      teachContent: `HyperLogLog: estimate cardinality (distinct count) of a multiset.

Key insight: if we hash elements uniformly, the max "leading zeros" in hashes correlates with cardinality.
- More distinct elements → higher chance of long leading-zero hash

Uses m registers (buckets) to reduce variance.
Error: 1.04/√m

Space: O(m) ≈ kilobytes vs O(n) for exact count.

Redis uses HLL for PFCOUNT command.`,
      questions: q5('Z11-02', [
        ['HyperLogLog estimates?', ['Exact count', 'Approximate distinct count', 'Sum of elements', 'Maximum value'], 1, 'Cardinality estimation with small error margin.'],
        ['HLL error rate with m registers is approximately?', ['O(1/m)', '1.04/√m', 'O(m)', 'O(log m)'], 1, 'Standard error ~1.04/√m for HyperLogLog.'],
        ['HLL uses which mathematical property?', ['Prime numbers', 'Max leading zeros in hashed values', 'Fibonacci sequence', 'Magic constants'], 1, 'Longer leading zero run → larger estimated cardinality.'],
        ['Redis PFCOUNT uses which algorithm?', ['Bloom filter', 'Count-Min Sketch', 'HyperLogLog', 'MinHash'], 2, 'Redis implements HyperLogLog for distinct count.'],
        ['HLL space is O(m) where m is?', ['Number of distinct elements', 'Number of registers/buckets', 'Total elements', 'Hash length'], 1, 'm registers, each storing max leading zeros seen.'],
      ]),
      visualSpec: {
        type: 'array',
        steps: [
          { description: 'Hash elements, look at leading zeros in binary.', highlightIndices: [], arrayState: [0, 0, 0, 0] },
          { description: 'hash("a")=0b0001... → 3 leading zeros. Register 0 = max(0,3)=3', highlightIndices: [0], arrayState: [3, 0, 0, 0] },
          { description: 'hash("b")=0b0110... → 1 leading zero. Register 1 = max(0,1)=1', highlightIndices: [1], arrayState: [3, 1, 0, 0] },
          { description: 'hash("c")=0b0011... → 2 leading zeros. Register 2 = max(0,2)=2', highlightIndices: [2], arrayState: [3, 1, 2, 0] },
          { description: 'Estimate = α*m²*HarmonicMean(2^regs) ≈ 3 distinct elements', highlightIndices: [0, 1, 2, 3], arrayState: [3, 1, 2, 0] },
        ],
      },
      codeTemplates: stub(
        'Estimated distinct: ~3',
        `import hashlib
import math

class HyperLogLog:
    def __init__(self, b=4):
        self.m = 2 ** b
        self.regs = [0] * self.m

    def add(self, item):
        h = int(hashlib.sha256(str(item).encode()).hexdigest(), 16)
        reg = h % self.m
        remainder = h >> 4
        leading = 0
        while remainder and not (remainder & (1 << 63)):
            leading += 1
            remainder <<= 1
        self.regs[reg] = max(self.regs[reg], leading + 1)

    def count(self):
        m = self.m
        alpha = 0.7213 / (1 + 1.079 / m)
        Z = sum(2**(-r) for r in self.regs)
        return int(alpha * m * m / Z)

hll = HyperLogLog(b=4)
for item in ["a", "b", "c", "a", "b"]:
    hll.add(item)
print(f"Estimated distinct: ~{hll.count()}")`,
      ),
      testCases: [{ input: '', expectedOutput: 'Estimated distinct: ~3' }],
      prerequisites: ['Z11-01'],
      xpReward: 150,
      loot: ['Cardinality Stone', 'HLL Badge'],
    },
    {
      id: 'Z11-03',
      name: 'Count-Min Sketch',
      zone: 11,
      category: 'data-structure',
      position: 3,
      lore: 'The Frequency Phantom counts with bounded error using a tiny matrix.',
      bossName: 'The Frequency Phantom',
      bossHP: 145,
      bossAscii: `
  [d x w]
  [CMS!]
  count
      `,
      teachContent: `Count-Min Sketch: approximate frequency counting.

- d hash functions, w counters each → d×w matrix
- Add(x): increment cms[i][h_i(x)] for all i
- Query(x): return min(cms[i][h_i(x)]) for all i

Never underestimates (only overestimates due to hash collisions).
Error: ε with probability δ = (1-e^(-d))^w

Space: O(d*w) vs O(n) for exact.

Used in: network traffic monitoring, trending topics.`,
      questions: q5('Z11-03', [
        ['Count-Min Sketch frequency estimate can be?', ['Exact or undercount', 'Exact or overcount', 'Only exact', 'Random'], 1, 'Collisions inflate counts → estimates overcount, never undercount.'],
        ['CMS uses a?', ['1D array', '2D matrix d×w', 'Linked list', 'Binary tree'], 1, 'd rows (hash functions) × w columns (counters).'],
        ['Query returns which value across d hash functions?', ['Sum', 'Average', 'Maximum', 'Minimum'], 3, 'Min across all hash functions minimizes collision impact.'],
        ['Increasing d (rows) in CMS?', ['Reduces error', 'Increases error', 'Reduces failure probability', 'Both reduces error and failure prob'], 2, 'More rows → lower probability of all rows having collision.'],
        ['CMS is used for?', ['Exact counts only', 'Approximate frequency in data streams', 'Sorting elements', 'Finding medians'], 1, 'Streaming approximate frequency — space-efficient.'],
      ]),
      visualSpec: {
        type: 'array',
        steps: [
          { description: 'CMS: 2 rows, 4 cols. Init all 0.', highlightIndices: [], arrayState: [0, 0, 0, 0, 0, 0, 0, 0] },
          { description: 'Add "a": h1("a")=1→row0[1]++, h2("a")=3→row1[3]++', highlightIndices: [1, 7], arrayState: [0, 1, 0, 0, 0, 0, 0, 1] },
          { description: 'Add "b": h1("b")=2→row0[2]++, h2("b")=1→row1[1]++', highlightIndices: [2, 5], arrayState: [0, 1, 1, 0, 0, 1, 0, 1] },
          { description: 'Add "a": h1("a")=1→row0[1]++, h2("a")=3→row1[3]++', highlightIndices: [1, 7], arrayState: [0, 2, 1, 0, 0, 1, 0, 2] },
          { description: 'Query "a": min(row0[1]=2, row1[3]=2)=2. Correct!', highlightIndices: [1, 7], arrayState: [0, 2, 1, 0, 0, 1, 0, 2] },
        ],
      },
      codeTemplates: stub(
        'a: 2\nb: 1',
        `import hashlib

class CountMinSketch:
    def __init__(self, d=3, w=16):
        self.d = d
        self.w = w
        self.table = [[0]*w for _ in range(d)]

    def _hashes(self, item):
        result = []
        for i in range(self.d):
            h = int(hashlib.md5(f"{item}{i}".encode()).hexdigest(), 16)
            result.append(h % self.w)
        return result

    def add(self, item):
        for row, col in enumerate(self._hashes(item)):
            self.table[row][col] += 1

    def query(self, item):
        return min(self.table[row][col] for row, col in enumerate(self._hashes(item)))

cms = CountMinSketch(d=2, w=8)
for x in ["a", "b", "a"]:
    cms.add(x)
print(f"a: {cms.query('a')}")
print(f"b: {cms.query('b')}")`,
      ),
      testCases: [{ input: '', expectedOutput: 'a: 2\nb: 1' }],
      prerequisites: ['Z11-01'],
      xpReward: 145,
      loot: ['Frequency Orb', 'CMS Badge'],
    },
    {
      id: 'Z11-04',
      name: 'Suffix Array',
      zone: 11,
      category: 'data-structure',
      position: 4,
      lore: 'The Suffix Sovereign sorts all suffixes, enabling blazing string search.',
      bossName: 'The Suffix Sovereign',
      bossHP: 155,
      bossAscii: `
  SA[]
 [sort]
  suf
  fix
      `,
      teachContent: `Suffix Array: sorted array of all suffixes of a string.

"banana" suffixes sorted: ["a","ana","anana","banana","na","nana"]
SA = [5,3,1,0,4,2]

Construction: O(n log² n) naive, O(n log n) with DC3/SA-IS.
Combined with LCP array → O(n) substring search.

Applications: compressed text, bioinformatics, full-text search.
More space-efficient than suffix tree.`,
      questions: q5('Z11-04', [
        ['Suffix array of "ab" (0-indexed)?', ['[0,1]', '[1,0]', '[0]', '[1]'], 0, '"a"<"ab"... wait, suffixes: "ab","b". Sorted: "ab"<"b" → SA=[0,1].'],
        ['Space of suffix array?', ['O(n²)', 'O(n)', 'O(n log n)', 'O(1)'], 1, 'O(n) integers for n suffixes.'],
        ['LCP array stores?', ['Lengths of suffixes', 'Longest common prefix between adjacent sorted suffixes', 'Hash values', 'Suffix positions'], 1, 'LCP[i] = length of longest common prefix of SA[i] and SA[i-1].'],
        ['Suffix array is more practical than suffix tree because?', ['Faster construction', 'Less space (constant factor)', 'Better worst case', 'Supports deletion'], 1, 'Suffix arrays use ~4x less memory than suffix trees.'],
        ['Pattern search with suffix array is?', ['O(n)', 'O(m log n)', 'O(m²)', 'O(n*m)'], 1, 'Binary search on sorted suffixes → O(m log n) per query.'],
      ]),
      visualSpec: {
        type: 'array',
        steps: [
          { description: '"banana" has 6 suffixes. List all.', highlightIndices: [], arrayState: [0, 1, 2, 3, 4, 5] },
          { description: 'Suffixes: 0=banana,1=anana,2=nana,3=ana,4=na,5=a', highlightIndices: [0, 1, 2, 3, 4, 5], arrayState: [0, 1, 2, 3, 4, 5] },
          { description: 'Sort: a<ana<anana<banana<na<nana', highlightIndices: [], arrayState: [5, 3, 1, 0, 4, 2] },
          { description: 'SA=[5,3,1,0,4,2]', highlightIndices: [0, 1, 2, 3, 4, 5], arrayState: [5, 3, 1, 0, 4, 2] },
          { description: 'Search "ana": binary search finds positions 1,3', highlightIndices: [1, 2], arrayState: [5, 3, 1, 0, 4, 2] },
        ],
      },
      codeTemplates: stub(
        '[5, 3, 1, 0, 4, 2]',
        `def build_suffix_array(s):
    n = len(s)
    suffixes = sorted(range(n), key=lambda i: s[i:])
    return suffixes

sa = build_suffix_array("banana")
print(sa)`,
      ),
      testCases: [{ input: '', expectedOutput: '[5, 3, 1, 0, 4, 2]' }],
      prerequisites: ['Z10-01'],
      xpReward: 155,
      loot: ['Suffix Crown', 'SA Badge'],
    },
    {
      id: 'Z11-05',
      name: 'Backtracking',
      zone: 11,
      category: 'algo',
      position: 5,
      lore: 'The Constraint Crawler explores all paths, pruning dead ends with ruthless efficiency.',
      bossName: 'The Constraint Crawler',
      bossHP: 145,
      bossAscii: `
  /\\
 /  \\
X    X
 \\  /
  \\/
      `,
      teachContent: `Backtracking: systematic search by building candidate solutions incrementally, abandoning (pruning) when constraints violated.

Pattern:
1. Choose a candidate
2. Check constraint
3. If valid: recurse
4. Undo choice (backtrack)

Classic problems: N-Queens, Sudoku, permutations, subset sum.

N-Queens: place N queens on N×N board, no two attack each other.
Pruning: skip column/diagonal conflicts immediately.`,
      questions: q5('Z11-05', [
        ['Backtracking differs from brute force because?', ['It is faster always', 'It prunes invalid branches early', 'It uses memoization', 'It is greedy'], 1, 'Early pruning avoids exploring invalid subtrees.'],
        ['N-Queens on 4×4 board has how many solutions?', ['1', '2', '4', '8'], 1, '4-Queens has exactly 2 distinct solutions.'],
        ['After placing a queen in row r, col c, we must exclude?', ['Only row r', 'Only col c', 'Row, col, and both diagonals', 'Nothing'], 2, 'Queens attack along rows, columns, and diagonals.'],
        ['Backtracking time complexity for N-Queens?', ['O(N!)', 'O(N²)', 'O(2^N)', 'O(N^N) reduced by pruning'], 0, 'Without pruning O(N^N), with pruning effectively O(N!).'],
        ['The "undo choice" step in backtracking is essential because?', ['It saves memory', 'The same variable is used for different recursive branches', 'It is faster', 'It avoids stack overflow'], 1, 'Choices must be undone so parent state is clean for other branches.'],
      ]),
      visualSpec: {
        type: 'array',
        steps: [
          { description: 'N-Queens N=4. Row 0: try col 0. Board=[0,-,-,-]', highlightIndices: [0], arrayState: [0, -1, -1, -1] },
          { description: 'Row 1: col 0 conflicts. col 1 conflicts. col 2: OK. Board=[0,-,2,-]', highlightIndices: [2], arrayState: [0, -1, 2, -1] },
          { description: 'Row 2: all cols conflict! Backtrack. Row 1 col 3: OK. Board=[0,-,-,3]', highlightIndices: [3], arrayState: [0, -1, -1, 3] },
          { description: 'Row 2: col 1 OK. Board=[0,-,1,3]', highlightIndices: [1], arrayState: [0, 1, -1, 3] },
          { description: 'Row 3: col 2 conflicts, others conflict too. Solution: [0,2,... nope. Found [1,3,0,2]', highlightIndices: [0, 1, 2, 3], arrayState: [1, 3, 0, 2] },
        ],
      },
      codeTemplates: stub(
        '[[1, 3, 0, 2], [2, 0, 3, 1]]',
        `def solve_n_queens(n):
    solutions = []
    queens = []

    def is_valid(row, col):
        for r, c in enumerate(queens):
            if c == col or abs(r - row) == abs(c - col):
                return False
        return True

    def backtrack(row):
        if row == n:
            solutions.append(queens[:])
            return
        for col in range(n):
            if is_valid(row, col):
                queens.append(col)
                backtrack(row + 1)
                queens.pop()

    backtrack(0)
    return solutions

print(solve_n_queens(4))`,
      ),
      testCases: [{ input: '', expectedOutput: '[[1, 3, 0, 2], [2, 0, 3, 1]]' }],
      prerequisites: [],
      xpReward: 145,
      loot: ['Pruning Shears', 'Backtrack Badge'],
    },
    {
      id: 'Z11-06',
      name: 'Bit Manipulation',
      zone: 11,
      category: 'algo',
      position: 6,
      lore: 'The Binary Berserker wields AND, OR, XOR to bend numbers to their will.',
      bossName: 'The Binary Berserker',
      bossHP: 130,
      bossAscii: `
  10110
  01001
  &|^~
  BITS
      `,
      teachContent: `Bit Manipulation: operate on binary representations directly.

Key tricks:
- n & (n-1): remove lowest set bit (check power of 2: n&(n-1)==0)
- n & (-n): isolate lowest set bit
- n ^ n = 0, n ^ 0 = n: XOR self-cancels
- n >> 1: divide by 2
- n << 1: multiply by 2
- Count set bits: Brian Kernighan's algorithm O(set bits)
- XOR trick: find single non-duplicate in array

Find single number in [4,1,2,1,2]: 4^1^2^1^2 = 4`,
      questions: q5('Z11-06', [
        ['n & (n-1) removes?', ['Highest bit', 'Lowest set bit', 'All bits', 'Sign bit'], 1, 'Subtracting 1 flips lowest set bit and all below → AND clears it.'],
        ['Is n a power of 2 if n & (n-1) ==?', ['1', 'n', '0', '-1'], 2, 'Powers of 2 have exactly one set bit → n&(n-1)=0.'],
        ['XOR of a number with itself?', ['Doubles it', '0', 'The number', '-1'], 1, 'a^a=0 always.'],
        ['Find single non-duplicate in [2,3,2]: XOR all?', ['2', '3', '0', '5'], 1, '2^3^2 = 3. Duplicates cancel via XOR.'],
        ['n >> k is equivalent to?', ['n * 2^k', 'n / 2^k (integer)', 'n mod k', 'n + k'], 1, 'Right shift k = divide by 2^k (integer division).'],
      ]),
      visualSpec: {
        type: 'array',
        steps: [
          { description: 'Array [4,1,2,1,2]. Find single. XOR all.', highlightIndices: [], arrayState: [4, 1, 2, 1, 2] },
          { description: '4 = 100, 1 = 001, XOR = 101 = 5', highlightIndices: [0, 1], arrayState: [5, 2, 1, 2, 0] },
          { description: '5 ^ 2 = 101^010 = 111 = 7', highlightIndices: [0, 1], arrayState: [7, 1, 2, 0, 0] },
          { description: '7 ^ 1 = 111^001 = 110 = 6', highlightIndices: [0, 1], arrayState: [6, 2, 0, 0, 0] },
          { description: '6 ^ 2 = 110^010 = 100 = 4. Single element = 4', highlightIndices: [0], arrayState: [4, 0, 0, 0, 0] },
        ],
      },
      codeTemplates: stub(
        '4',
        `def single_number(nums):
    result = 0
    for n in nums:
        result ^= n
    return result

print(single_number([4, 1, 2, 1, 2]))`,
      ),
      testCases: [{ input: '', expectedOutput: '4' }],
      prerequisites: [],
      xpReward: 130,
      loot: ['XOR Crystal', 'Bit Badge'],
    },
    {
      id: 'Z11-07',
      name: 'Consistent Hashing',
      zone: 11,
      category: 'algo',
      position: 7,
      lore: 'The Ring Keeper distributes load across nodes with minimal redistribution on change.',
      bossName: 'The Ring Keeper',
      bossHP: 160,
      bossAscii: `
   N1
  /  \\
N4    N2
  \\  /
   N3
      `,
      teachContent: `Consistent Hashing: distribute keys across nodes on a "ring" (mod 2^32).

- Each node placed at hash(node) on ring
- Key assigned to first node clockwise
- Adding/removing node: only ~K/N keys remapped (vs all keys in naive)

Virtual nodes: each physical node has multiple ring positions → better balance.

Used in: Cassandra, Dynamo, Redis Cluster, CDNs.`,
      questions: q5('Z11-07', [
        ['In consistent hashing, a key is assigned to?', ['Random node', 'First node clockwise on ring', 'Node with most space', 'Hash mod N directly'], 1, 'Walk clockwise on ring, first node encountered owns the key.'],
        ['Adding 1 node in consistent hashing remaps approximately?', ['All keys', 'K/N keys', 'N keys', '0 keys'], 1, 'Only ~K/N keys move from adjacent node to new node.'],
        ['Virtual nodes solve?', ['Ring collisions', 'Uneven key distribution', 'Hash collisions', 'Node failures'], 1, 'Physical nodes get multiple ring positions → more uniform distribution.'],
        ['Consistent hashing is used in distributed systems because?', ['It is simpler than mod-N', 'Minimal key redistribution when nodes join/leave', 'It guarantees even split', 'It uses less memory'], 1, 'Scaling cluster without full rebalance is critical.'],
        ['Without consistent hashing, adding a node to N-node cluster remaps?', ['K/N keys', 'All K keys potentially', 'No keys', 'N keys'], 1, 'Naive mod-N hashing: every key might go to a different node.'],
      ]),
      visualSpec: {
        type: 'array',
        steps: [
          { description: 'Ring with nodes N1(0), N2(90), N3(180), N4(270). Key at pos 45→N2', highlightIndices: [1], arrayState: [0, 90, 180, 270] },
          { description: 'Key at pos 200→N4 (next clockwise after 180)', highlightIndices: [3], arrayState: [0, 90, 180, 270] },
          { description: 'Add N5 at position 100. Keys 91-100 move from N3 to N5.', highlightIndices: [2], arrayState: [0, 90, 100, 180, 270] },
          { description: 'Only ~25% of N3\'s keys moved. Others unchanged.', highlightIndices: [2], arrayState: [0, 90, 100, 180, 270] },
          { description: 'Remove N2: its keys (1-90) move to N5 (next clockwise)', highlightIndices: [2], arrayState: [0, 100, 180, 270] },
        ],
      },
      codeTemplates: stub(
        'Key key1 -> Node node2\nKey key2 -> Node node3\nKey key3 -> Node node1',
        `import hashlib
import bisect

class ConsistentHashRing:
    def __init__(self, virtual_nodes=3):
        self.virtual_nodes = virtual_nodes
        self.ring = {}
        self.sorted_keys = []

    def _hash(self, key):
        return int(hashlib.md5(key.encode()).hexdigest(), 16) % 360

    def add_node(self, node):
        for i in range(self.virtual_nodes):
            h = self._hash(f"{node}-{i}")
            self.ring[h] = node
            bisect.insort(self.sorted_keys, h)

    def get_node(self, key):
        if not self.ring:
            return None
        h = self._hash(key)
        idx = bisect.bisect(self.sorted_keys, h) % len(self.sorted_keys)
        return self.ring[self.sorted_keys[idx]]

ring = ConsistentHashRing(virtual_nodes=3)
for n in ["node1", "node2", "node3"]:
    ring.add_node(n)

for key in ["key1", "key2", "key3"]:
    print(f"Key {key} -> Node {ring.get_node(key)}")`,
      ),
      testCases: [{ input: '', expectedOutput: 'Key key1 -> Node node2\nKey key2 -> Node node3\nKey key3 -> Node node1' }],
      prerequisites: [],
      xpReward: 160,
      loot: ['Ring Token', 'CH Badge'],
    },
    {
      id: 'Z11-08',
      name: 'Quadtree',
      zone: 11,
      category: 'data-structure',
      position: 8,
      lore: 'The Spatial Sorcerer divides 2D space into four quadrants recursively.',
      bossName: 'The Spatial Sorcerer',
      bossHP: 155,
      bossAscii: `
  NW|NE
  --+--
  SW|SE
      `,
      teachContent: `Quadtree: tree where each node has 4 children (NW, NE, SW, SE).

Each node represents a rectangular region.
Subdivide when too many points in region.

Operations:
- Insert: O(log n) average
- Search region: O(√n + k) where k=results
- Delete: O(log n)

Applications: spatial indexing, collision detection, image compression, geographical data.`,
      questions: q5('Z11-08', [
        ['Quadtree nodes each have how many children?', ['2', '3', '4', '8'], 2, 'Four quadrants: NW, NE, SW, SE.'],
        ['Quadtree is used for?', ['Sorting numbers', '2D spatial indexing', 'Graph traversal', 'String search'], 1, 'Efficiently query 2D spatial data.'],
        ['When does a quadtree node subdivide?', ['Always', 'When it has too many points (threshold)', 'Never', 'Every insertion'], 1, 'Subdivide when point count exceeds threshold.'],
        ['Quadtree insert time complexity?', ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], 1, 'O(log n) average with balanced subdivision.'],
        ['Octree is to 3D as Quadtree is to?', ['1D', '2D', '4D', '5D'], 1, 'Quadtree for 2D, Octree for 3D.'],
      ]),
      visualSpec: {
        type: 'array',
        steps: [
          { description: 'Region [0,0,100,100]. Insert points: (25,25),(75,25),(25,75),(75,75),(50,50)', highlightIndices: [], arrayState: [0, 0, 100, 100] },
          { description: 'Node has 5 points (threshold=4). Subdivide into 4 quadrants.', highlightIndices: [0, 1, 2, 3], arrayState: [0, 0, 100, 100] },
          { description: 'NW[0,0,50,50]: (25,25),(50,50). NE[50,0,100,50]: (75,25)', highlightIndices: [0], arrayState: [1, 2, 1, 1] },
          { description: 'SW[0,50,50,100]: (25,75). SE[50,50,100,100]: (75,75)', highlightIndices: [2, 3], arrayState: [1, 2, 1, 1] },
          { description: 'Search region [0,0,60,60]: check NW(match) and NE(partial) → finds (25,25),(50,50),(75,25)', highlightIndices: [0, 1], arrayState: [1, 2, 1, 1] },
        ],
      },
      codeTemplates: stub(
        'Points in NW quadrant: [(25, 25)]',
        `class QuadTree:
    def __init__(self, x, y, w, h, capacity=4):
        self.bounds = (x, y, w, h)
        self.capacity = capacity
        self.points = []
        self.children = None

    def subdivide(self):
        x, y, w, h = self.bounds
        hw, hh = w//2, h//2
        self.children = [
            QuadTree(x, y, hw, hh, self.capacity),        # NW
            QuadTree(x+hw, y, hw, hh, self.capacity),     # NE
            QuadTree(x, y+hh, hw, hh, self.capacity),     # SW
            QuadTree(x+hw, y+hh, hw, hh, self.capacity),  # SE
        ]

    def insert(self, point):
        x, y, w, h = self.bounds
        px, py = point
        if not (x <= px < x+w and y <= py < y+h):
            return False
        if self.children is None:
            self.points.append(point)
            if len(self.points) > self.capacity:
                self.subdivide()
                for p in self.points:
                    for child in self.children:
                        child.insert(p)
                self.points = []
            return True
        return any(child.insert(point) for child in self.children)

    def query(self, rx, ry, rw, rh):
        x, y, w, h = self.bounds
        if x+w < rx or rx+rw < x or y+h < ry or ry+rh < y:
            return []
        found = [p for p in self.points if rx <= p[0] < rx+rw and ry <= p[1] < ry+rh]
        if self.children:
            for child in self.children:
                found += child.query(rx, ry, rw, rh)
        return found

qt = QuadTree(0, 0, 100, 100, capacity=4)
for pt in [(25,25),(75,25),(25,75),(75,75),(50,50)]:
    qt.insert(pt)
result = qt.query(0, 0, 50, 50)
print(f"Points in NW quadrant: {result}")`,
      ),
      testCases: [{ input: '', expectedOutput: 'Points in NW quadrant: [(25, 25)]' }],
      prerequisites: [],
      xpReward: 155,
      loot: ['Spatial Lens', 'Quadtree Badge'],
    },
    {
      id: 'Z11-09',
      name: 'Rate Limiting',
      zone: 11,
      category: 'algo',
      position: 9,
      lore: 'The Throttle Tyrant controls the flow of requests with iron-fisted algorithms.',
      bossName: 'The Throttle Tyrant',
      bossHP: 150,
      bossAscii: `
  RATE
  ||||
  LIMIT
  ||||
      `,
      teachContent: `Rate Limiting algorithms:

1. **Token Bucket**: bucket fills at rate r. Each request consumes 1 token. Allows bursting.
2. **Leaky Bucket**: requests queue, drain at constant rate. Smooths traffic.
3. **Fixed Window**: count requests in fixed time window.
4. **Sliding Window Log**: track timestamps of requests in a log.
5. **Sliding Window Counter**: interpolate between two fixed windows.

Token Bucket vs Leaky Bucket:
- Token Bucket allows bursting up to bucket size
- Leaky Bucket output rate is always constant`,
      questions: q5('Z11-09', [
        ['Token bucket allows what that leaky bucket doesn\'t?', ['Constant rate output', 'Burst traffic up to bucket capacity', 'Infinite requests', 'Zero latency'], 1, 'Token bucket can serve bursts if tokens accumulated.'],
        ['Fixed window rate limiter problem?', ['Too slow', 'Boundary burst: 2x rate at window edge', 'Uses too much memory', 'Too complex'], 1, 'Requests pile up at end/start of window → burst of 2x limit.'],
        ['Sliding window log tracks?', ['Counter per window', 'Timestamps of all recent requests', 'Token count', 'Queue length'], 1, 'Exact timestamps → precise rate limiting, but O(N) memory.'],
        ['Token bucket refill rate r with capacity b: max burst is?', ['r', 'b tokens', 'r*b', 'Unlimited'], 1, 'Burst up to b tokens (full bucket), then rate-limited to r.'],
        ['Leaky bucket output is always?', ['Bursty', 'At constant rate', 'Variable', 'Zero when idle'], 1, 'Leaky bucket smooths traffic to constant drain rate.'],
      ]),
      visualSpec: {
        type: 'array',
        steps: [
          { description: 'Token Bucket: capacity=5, refill=1/sec. Start full: [5 tokens]', highlightIndices: [0], arrayState: [5, 0, 0, 0, 0] },
          { description: 'Request 1: consume 1 token → 4 remaining', highlightIndices: [0], arrayState: [4, 0, 0, 0, 0] },
          { description: 'Burst: 3 requests at once. 4-3=1 token left. All served.', highlightIndices: [0, 1, 2, 3], arrayState: [1, 0, 0, 0, 0] },
          { description: '1 sec passes: refill 1 token → 2 tokens', highlightIndices: [0, 1], arrayState: [2, 0, 0, 0, 0] },
          { description: 'Request exceeds bucket: rejected! RATE LIMITED.', highlightIndices: [], arrayState: [2, 0, 0, 0, 0] },
        ],
      },
      codeTemplates: stub(
        'Request 1: ALLOWED (tokens: 4)\nRequest 2: ALLOWED (tokens: 3)\nRequest 3: ALLOWED (tokens: 2)\nRequest 4: ALLOWED (tokens: 1)\nRequest 5: ALLOWED (tokens: 0)\nRequest 6: DENIED',
        `import time

class TokenBucket:
    def __init__(self, capacity, refill_rate):
        self.capacity = capacity
        self.tokens = capacity
        self.refill_rate = refill_rate
        self.last_refill = time.time()

    def _refill(self):
        now = time.time()
        elapsed = now - self.last_refill
        self.tokens = min(self.capacity, self.tokens + elapsed * self.refill_rate)
        self.last_refill = now

    def allow(self):
        self._refill()
        if self.tokens >= 1:
            self.tokens -= 1
            return True
        return False

bucket = TokenBucket(capacity=5, refill_rate=1)
for i in range(1, 7):
    if bucket.allow():
        print(f"Request {i}: ALLOWED (tokens: {int(bucket.tokens)})")
    else:
        print(f"Request {i}: DENIED")`,
      ),
      testCases: [{ input: '', expectedOutput: 'Request 1: ALLOWED (tokens: 4)\nRequest 2: ALLOWED (tokens: 3)\nRequest 3: ALLOWED (tokens: 2)\nRequest 4: ALLOWED (tokens: 1)\nRequest 5: ALLOWED (tokens: 0)\nRequest 6: DENIED' }],
      prerequisites: [],
      xpReward: 150,
      loot: ['Throttle Valve', 'Rate Badge'],
    },
    {
      id: 'Z11-10',
      name: 'KD-Tree',
      zone: 11,
      category: 'data-structure',
      position: 10,
      lore: 'The Dimension Demon slices k-dimensional space into recursive half-planes.',
      bossName: 'The Dimension Demon',
      bossHP: 160,
      bossAscii: `
  k-D
 /   \\
k/2  k/2
 |    |
leaf leaf
      `,
      teachContent: `KD-Tree: binary tree for k-dimensional spatial data.

Build: alternately split on each dimension at median.
- Root splits on dimension 0 (x)
- Depth 1 splits on dimension 1 (y)
- ...

Nearest Neighbor Search: O(log n) average, O(n) worst.
Range Search: O(√n + k) for k results.

Applications: nearest neighbor, collision detection, machine learning (k-NN classifier).`,
      questions: q5('Z11-10', [
        ['KD-Tree splits space along which dimension at depth d?', ['Always x', 'Always y', 'd mod k (cycling through dimensions)', 'Random'], 2, 'Cycling through dimensions: depth 0 → x, depth 1 → y, etc.'],
        ['KD-Tree nearest neighbor search average complexity?', ['O(1)', 'O(log n)', 'O(n)', 'O(k)'], 1, 'O(log n) average with balanced tree and good data.'],
        ['KD-Tree worst case degrades because?', ['Bad pivot selection (sorted data)', 'Too many dimensions', 'Memory limits', 'Floating point errors'], 0, 'Poor splits on sorted/clustered data → unbalanced tree.'],
        ['KD-Tree is used in machine learning for?', ['Decision trees', 'k-NN classification', 'Linear regression', 'Neural networks'], 1, 'Efficient k-nearest neighbor queries for classification.'],
        ['For 2D data, KD-Tree alternates between splitting on?', ['x and y alternately', 'Only x', 'Only y', 'Random dimension'], 0, '2D KD-tree: split on x, then y, then x...'],
      ]),
      visualSpec: {
        type: 'array',
        steps: [
          { description: '2D points: (2,3),(5,4),(9,6),(4,7),(8,1),(7,2). Build KD-tree.', highlightIndices: [], arrayState: [2, 5, 9, 4, 8, 7] },
          { description: 'Depth 0 (split on x): median x=7. Root=(7,2). Left: x<7, Right: x>=7', highlightIndices: [5], arrayState: [2, 5, 9, 4, 8, 7] },
          { description: 'Left subtree [(2,3),(5,4),(4,7)]: depth1 split on y. Median y=4. Node=(5,4)', highlightIndices: [1, 0, 3], arrayState: [2, 5, 9, 4, 8, 7] },
          { description: 'Right subtree [(9,6),(8,1)]: depth1 split on y. Median y=6. Node=(9,6)', highlightIndices: [2, 4], arrayState: [2, 5, 9, 4, 8, 7] },
          { description: 'Nearest to (6,5): search left subtree first (closer), find (5,4). dist=√2', highlightIndices: [1], arrayState: [2, 5, 9, 4, 8, 7] },
        ],
      },
      codeTemplates: stub(
        'Nearest to (6, 5): (5, 4)',
        `class KDNode:
    def __init__(self, point, left=None, right=None):
        self.point = point
        self.left = left
        self.right = right

def build_kd_tree(points, depth=0):
    if not points:
        return None
    k = len(points[0])
    axis = depth % k
    sorted_pts = sorted(points, key=lambda p: p[axis])
    mid = len(sorted_pts) // 2
    return KDNode(
        sorted_pts[mid],
        build_kd_tree(sorted_pts[:mid], depth+1),
        build_kd_tree(sorted_pts[mid+1:], depth+1)
    )

def nearest_neighbor(node, target, depth=0, best=None):
    if node is None:
        return best
    k = len(target)
    dist = sum((a-b)**2 for a,b in zip(node.point, target))**0.5
    if best is None or dist < nearest_neighbor.best_dist:
        best = node.point
        nearest_neighbor.best_dist = dist
    axis = depth % k
    if target[axis] < node.point[axis]:
        near, far = node.left, node.right
    else:
        near, far = node.right, node.left
    best = nearest_neighbor(near, target, depth+1, best)
    if abs(target[axis] - node.point[axis]) < nearest_neighbor.best_dist:
        best = nearest_neighbor(far, target, depth+1, best)
    return best

nearest_neighbor.best_dist = float('inf')
points = [(2,3),(5,4),(9,6),(4,7),(8,1),(7,2)]
tree = build_kd_tree(points)
result = nearest_neighbor(tree, (6,5))
print(f"Nearest to (6, 5): {result}")`,
      ),
      testCases: [{ input: '', expectedOutput: 'Nearest to (6, 5): (5, 4)' }],
      prerequisites: ['Z11-08'],
      xpReward: 160,
      loot: ['Dimension Shard', 'KD Badge'],
    },
    {
      id: 'Z11-11',
      name: 'Rope Data Structure',
      zone: 11,
      category: 'data-structure',
      position: 11,
      lore: 'The String Weaver concatenates and splits massive texts in logarithmic time.',
      bossName: 'The String Weaver',
      bossHP: 145,
      bossAscii: `
  /rope\\
 /      \\
cat    enate
      `,
      teachContent: `Rope: binary tree where leaves hold string fragments, internal nodes store total weight (length of left subtree).

Operations:
- Concat: O(log n) — just link trees
- Split at index i: O(log n)
- Index access: O(log n)
- Insert/delete substring: O(log n)

vs regular string:
- String concat: O(n)
- String insert at i: O(n)

Used in: text editors (vim, emacs), version control diffs, XML editors.`,
      questions: q5('Z11-11', [
        ['Rope concatenation is O(log n) because?', ['It copies all strings', 'It just links two tree roots', 'It sorts characters', 'It uses hashing'], 1, 'No copying needed — create new root node pointing to both trees.'],
        ['Rope index access is O(log n) because?', ['Binary search on sorted array', 'Tree traversal using weight metadata', 'Hash lookup', 'Linear scan'], 1, 'Use weight at each node to navigate left/right.'],
        ['String insert at index i with Rope is?', ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], 1, 'Split at i, concat new string, concat right part → 3×O(log n).'],
        ['Internal rope nodes store?', ['Characters', 'String fragments', 'Weight (left subtree length)', 'Hash values'], 2, 'Weight metadata enables O(log n) navigation.'],
        ['Rope is preferred over string for?', ['Small strings', 'Frequent insert/delete in large texts', 'Read-only data', 'Sorted data'], 1, 'Text editors need efficient mid-string insertion and deletion.'],
      ]),
      visualSpec: {
        type: 'array',
        steps: [
          { description: 'Rope for "Hello World". Leaves: "Hello " (6), "World" (5).', highlightIndices: [], arrayState: [6, 5] },
          { description: 'Root weight=6. Left="Hello ", Right="World"', highlightIndices: [0], arrayState: [6, 5] },
          { description: 'Index(7): 7>=6 → go right, index 7-6=1 in "World" → "o"', highlightIndices: [1], arrayState: [6, 5] },
          { description: 'Concat " Goodbye": new root weight=11. Right=concat("World"," Goodbye")', highlightIndices: [], arrayState: [6, 5, 8] },
          { description: 'Final rope: "Hello World Goodbye"', highlightIndices: [0, 1, 2], arrayState: [6, 5, 8] },
        ],
      },
      codeTemplates: stub(
        'Hello World\nChar at 7: o\nAfter insert: Hello WoX rld',
        `class RopeNode:
    def __init__(self, value=None, left=None, right=None, weight=0):
        self.value = value  # leaf only
        self.left = left
        self.right = right
        self.weight = weight  # length of left subtree

class Rope:
    def __init__(self, s=''):
        if s:
            self.root = RopeNode(value=s, weight=len(s))
        else:
            self.root = None

    def _to_string(self, node):
        if node is None: return ''
        if node.value is not None: return node.value
        return self._to_string(node.left) + self._to_string(node.right)

    def __str__(self):
        return self._to_string(self.root)

    def index(self, node, i):
        if node is None: return ''
        if node.value is not None: return node.value[i]
        if i < node.weight:
            return self.index(node.left, i)
        return self.index(node.right, i - node.weight)

    def char_at(self, i):
        return self.index(self.root, i)

    def concat(self, other):
        new_rope = Rope()
        wt = len(self._to_string(self.root)) if self.root else 0
        new_rope.root = RopeNode(left=self.root, right=other.root, weight=wt)
        return new_rope

r1 = Rope("Hello World")
print(r1)
print(f"Char at 7: {r1.char_at(7)}")
r2 = Rope("Hello Wo")
r3 = Rope("X ")
r4 = Rope("rld")
result = r2.concat(r3).concat(r4)
print(f"After insert: {result}")`,
      ),
      testCases: [{ input: '', expectedOutput: 'Hello World\nChar at 7: o\nAfter insert: Hello WoX rld' }],
      prerequisites: [],
      xpReward: 145,
      loot: ['Rope Fiber', 'Rope Badge'],
    },
    {
      id: 'Z11-12',
      name: 'Cuckoo Hashing',
      zone: 11,
      category: 'data-structure',
      position: 12,
      lore: 'The Nest Thief evicts occupants with two hash tables, guaranteeing O(1) lookup.',
      bossName: 'The Nest Thief',
      bossHP: 140,
      bossAscii: `
  T1 | T2
  [k] [k]
  cuck-oo
      `,
      teachContent: `Cuckoo Hashing: hash table with O(1) worst-case lookup.

Two tables T1, T2. Two hash functions h1, h2.

Insert x:
1. Put x in T1[h1(x)]
2. If occupied: evict occupant y, try to place y in its alternate table
3. Repeat until all placed or cycle detected (rehash)

Lookup: O(1) worst case — check T1[h1(k)] or T2[h2(k)]
Delete: O(1) — find in T1 or T2, remove

Load factor must stay < 50% per table to avoid cycles.`,
      questions: q5('Z11-12', [
        ['Cuckoo hashing lookup is?', ['O(1) worst case', 'O(log n)', 'O(n)', 'O(√n)'], 0, 'Key is in one of exactly 2 positions — O(1) guaranteed.'],
        ['Cuckoo hashing uses how many hash functions?', ['1', '2', '3', 'k'], 1, 'Two functions h1 and h2, one per table.'],
        ['When inserting causes a cycle in cuckoo hashing?', ['Give up', 'Rehash all elements with new hash functions', 'Use chaining', 'Double table size immediately'], 1, 'Cycle means tables are too full or hash functions unlucky → rehash.'],
        ['Maximum load factor per table in cuckoo hashing?', ['100%', '75%', 'Below 50%', '25%'], 2, 'Above 50% load, cycle probability increases dramatically.'],
        ['Cuckoo hashing delete is?', ['O(log n)', 'O(1)', 'O(n)', 'O(√n)'], 1, 'Check two positions, remove in O(1).'],
      ]),
      visualSpec: {
        type: 'array',
        steps: [
          { description: 'Two tables size 4. Insert 10: h1(10)=2→T1[2]=10', highlightIndices: [2], arrayState: [0, 0, 10, 0, 0, 0, 0, 0] },
          { description: 'Insert 20: h1(20)=2→T1[2] occupied! Evict 10. h2(10)=1→T2[1]=10', highlightIndices: [1], arrayState: [0, 0, 20, 0, 0, 10, 0, 0] },
          { description: 'Insert 30: h1(30)=0→T1[0]=30. No conflict.', highlightIndices: [0], arrayState: [30, 0, 20, 0, 0, 10, 0, 0] },
          { description: 'Lookup 10: T1[h1(10)]=T1[2]=20≠10. T2[h2(10)]=T2[1]=10. Found!', highlightIndices: [5], arrayState: [30, 0, 20, 0, 0, 10, 0, 0] },
          { description: 'O(1) lookup: at most 2 checks.', highlightIndices: [2, 5], arrayState: [30, 0, 20, 0, 0, 10, 0, 0] },
        ],
      },
      codeTemplates: stub(
        'Contains 10: True\nContains 40: False',
        `class CuckooHash:
    def __init__(self, size=8):
        self.size = size
        self.t1 = [None] * size
        self.t2 = [None] * size

    def h1(self, k): return k % self.size
    def h2(self, k): return (k // self.size) % self.size

    def insert(self, k, limit=10):
        for _ in range(limit):
            pos1 = self.h1(k)
            if self.t1[pos1] is None:
                self.t1[pos1] = k
                return
            k, self.t1[pos1] = self.t1[pos1], k
            pos2 = self.h2(k)
            if self.t2[pos2] is None:
                self.t2[pos2] = k
                return
            k, self.t2[pos2] = self.t2[pos2], k
        raise Exception("Cycle detected! Rehash needed.")

    def contains(self, k):
        return self.t1[self.h1(k)] == k or self.t2[self.h2(k)] == k

ch = CuckooHash(size=7)
for n in [10, 20, 30, 15]:
    ch.insert(n)
print(f"Contains 10: {ch.contains(10)}")
print(f"Contains 40: {ch.contains(40)}")`,
      ),
      testCases: [{ input: '', expectedOutput: 'Contains 10: True\nContains 40: False' }],
      prerequisites: ['Z11-01'],
      xpReward: 140,
      loot: ['Cuckoo Feather', 'Cuckoo Badge'],
    },
    {
      id: 'Z11-13',
      name: 'Skip List',
      zone: 11,
      category: 'data-structure',
      position: 13,
      lore: 'The Layered Leaper builds express lanes above a sorted linked list.',
      bossName: 'The Layered Leaper',
      bossHP: 150,
      bossAscii: `
L3: ---3---------17
L2: ---3----9----17
L1: ---3--7-9-12-17
L0: 1-3-5-7-9-12-17
      `,
      teachContent: `Skip List: probabilistic data structure with O(log n) expected search/insert/delete.

Layers of sorted linked lists:
- Level 0: all elements
- Level k: random subset (probability p=0.5 each element promoted)

Search: start at top, go right until too big, drop down.
Insert: flip coins to determine height, insert at each level.

Advantages over BST:
- Simpler implementation
- Lock-free concurrent versions
- Predictable space O(n)

Used in: Redis sorted sets, LevelDB, CockroachDB.`,
      questions: q5('Z11-13', [
        ['Skip list expected search complexity?', ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], 1, 'Expected O(log n) with p=0.5 promotion probability.'],
        ['Skip list uses which technique to decide node height?', ['Always log n levels', 'Random coin flips', 'Sorted order', 'BST rotation'], 1, 'Each element promoted with probability p (usually 0.5).'],
        ['Redis sorted sets are implemented with?', ['AVL tree', 'Red-Black tree', 'Skip list', 'Heap'], 2, 'Redis uses skip lists for sorted set operations.'],
        ['Compared to balanced BST, skip lists are?', ['Slower', 'More complex', 'Simpler to implement correctly', 'Deterministic'], 2, 'Skip lists avoid complex rebalancing rotations.'],
        ['Skip list space complexity?', ['O(1)', 'O(n)', 'O(n log n)', 'O(n²)'], 1, 'Expected O(n) space total across all levels.'],
      ]),
      visualSpec: {
        type: 'array',
        steps: [
          { description: 'Skip list with elements [3,7,9,12,17]. Level 0 = all.', highlightIndices: [0, 1, 2, 3, 4], arrayState: [3, 7, 9, 12, 17] },
          { description: 'Level 1 (50% promoted): [3,9,17]', highlightIndices: [0, 2, 4], arrayState: [3, 9, 17] },
          { description: 'Level 2 (50% again): [3,17]', highlightIndices: [0, 2], arrayState: [3, 17] },
          { description: 'Search 12: L2: 3<12, 17>12→down. L1: 9<12, 17>12→down. L0: 12=12 found!', highlightIndices: [3], arrayState: [3, 7, 9, 12, 17] },
          { description: 'O(log n) hops. No rebalancing needed.', highlightIndices: [3], arrayState: [3, 7, 9, 12, 17] },
        ],
      },
      codeTemplates: stub(
        'Search 9: True\nSearch 10: False',
        `import random

class SkipNode:
    def __init__(self, key, level):
        self.key = key
        self.next = [None] * (level + 1)

class SkipList:
    def __init__(self, max_level=4, p=0.5):
        self.max_level = max_level
        self.p = p
        self.header = SkipNode(-float('inf'), max_level)
        self.level = 0

    def _rand_level(self):
        lvl = 0
        while random.random() < self.p and lvl < self.max_level:
            lvl += 1
        return lvl

    def insert(self, key):
        update = [None] * (self.max_level + 1)
        cur = self.header
        for i in range(self.level, -1, -1):
            while cur.next[i] and cur.next[i].key < key:
                cur = cur.next[i]
            update[i] = cur
        lvl = self._rand_level()
        if lvl > self.level:
            for i in range(self.level + 1, lvl + 1):
                update[i] = self.header
            self.level = lvl
        node = SkipNode(key, lvl)
        for i in range(lvl + 1):
            node.next[i] = update[i].next[i]
            update[i].next[i] = node

    def search(self, key):
        cur = self.header
        for i in range(self.level, -1, -1):
            while cur.next[i] and cur.next[i].key < key:
                cur = cur.next[i]
        cur = cur.next[0]
        return cur is not None and cur.key == key

random.seed(42)
sl = SkipList()
for n in [3, 7, 9, 12, 17]:
    sl.insert(n)
print(f"Search 9: {sl.search(9)}")
print(f"Search 10: {sl.search(10)}")`,
      ),
      testCases: [{ input: '', expectedOutput: 'Search 9: True\nSearch 10: False' }],
      prerequisites: [],
      xpReward: 150,
      loot: ['Express Lane Pass', 'Skip Badge'],
    },
    {
      id: 'Z11-14',
      name: 'Segment Tree',
      zone: 11,
      category: 'data-structure',
      position: 14,
      lore: 'The Range Ruler answers interval queries and updates in logarithmic time.',
      bossName: 'The Range Ruler',
      bossHP: 165,
      bossAscii: `
     [0,7]
    /      \\
  [0,3]  [4,7]
  /  \\    /  \\
[0,1][2,3][4,5][6,7]
      `,
      teachContent: `Segment Tree: tree for range queries with point/range updates.

Build: O(n)
Query [l,r]: O(log n)
Update point: O(log n)
Update range (lazy propagation): O(log n)

Supports: range sum, range min/max, range GCD, etc.

With lazy propagation: defer range updates — mark node "lazy", push down when needed.

Space: O(4n) for array-based implementation.`,
      questions: q5('Z11-14', [
        ['Segment tree range query is?', ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], 1, 'Visit O(log n) nodes to answer range query.'],
        ['Lazy propagation in segment trees allows?', ['O(1) build', 'O(log n) range updates', 'O(1) queries', 'O(n) space reduction'], 1, 'Defer applying range updates → O(log n) instead of O(n).'],
        ['Segment tree array-based space is?', ['O(n)', 'O(2n)', 'O(4n)', 'O(n log n)'], 2, 'O(4n) to be safe for any n.'],
        ['Segment tree vs Fenwick tree: segment tree supports?', ['Only prefix queries', 'Range min/max queries (Fenwick cannot)', 'Only point updates', 'Only sums'], 1, 'Segment tree handles arbitrary range operations including min/max.'],
        ['Build time of segment tree?', ['O(log n)', 'O(n)', 'O(n log n)', 'O(n²)'], 1, 'Build by filling leaves and computing parents: O(n).'],
      ]),
      visualSpec: {
        type: 'array',
        steps: [
          { description: 'Array [1,3,5,7,9,11]. Build sum segment tree.', highlightIndices: [], arrayState: [1, 3, 5, 7, 9, 11] },
          { description: 'Leaves: [1,3,5,7,9,11]', highlightIndices: [0, 1, 2, 3, 4, 5], arrayState: [1, 3, 5, 7, 9, 11] },
          { description: 'Level 1: [4,12,20] (sums of pairs)', highlightIndices: [0, 1, 2], arrayState: [4, 12, 20] },
          { description: 'Level 2: [16,20], Root: [36]', highlightIndices: [0, 1], arrayState: [16, 20, 36] },
          { description: 'Query sum[1..4]: [1]+[3+5+7]=16. O(log n) nodes visited.', highlightIndices: [0], arrayState: [16] },
        ],
      },
      codeTemplates: stub(
        'Sum[1,4]: 24\nAfter update: Sum[1,4]: 27',
        `class SegTree:
    def __init__(self, arr):
        self.n = len(arr)
        self.tree = [0] * (4 * self.n)
        self._build(arr, 1, 0, self.n - 1)

    def _build(self, arr, node, l, r):
        if l == r:
            self.tree[node] = arr[l]
        else:
            mid = (l + r) // 2
            self._build(arr, 2*node, l, mid)
            self._build(arr, 2*node+1, mid+1, r)
            self.tree[node] = self.tree[2*node] + self.tree[2*node+1]

    def update(self, idx, val, node=1, l=0, r=None):
        if r is None: r = self.n - 1
        if l == r:
            self.tree[node] = val
            return
        mid = (l + r) // 2
        if idx <= mid: self.update(idx, val, 2*node, l, mid)
        else: self.update(idx, val, 2*node+1, mid+1, r)
        self.tree[node] = self.tree[2*node] + self.tree[2*node+1]

    def query(self, ql, qr, node=1, l=0, r=None):
        if r is None: r = self.n - 1
        if ql <= l and r <= qr: return self.tree[node]
        if qr < l or r < ql: return 0
        mid = (l + r) // 2
        return self.query(ql, qr, 2*node, l, mid) + self.query(ql, qr, 2*node+1, mid+1, r)

arr = [1, 3, 5, 7, 9, 11]
st = SegTree(arr)
print(f"Sum[1,4]: {st.query(1, 4)}")
st.update(2, 8)  # arr[2] = 8 (was 5)
print(f"After update: Sum[1,4]: {st.query(1, 4)}")`,
      ),
      testCases: [{ input: '', expectedOutput: 'Sum[1,4]: 24\nAfter update: Sum[1,4]: 27' }],
      prerequisites: ['Z7-03'],
      xpReward: 165,
      loot: ['Range Crystal', 'Segment Badge'],
    },
    {
      id: 'Z11-15',
      name: 'Final Boss: The Algorithm Overlord',
      zone: 11,
      category: 'algo',
      position: 15,
      lore: 'All algorithms converge. The Overlord wields every technique in an ultimate gauntlet.',
      bossName: 'The Algorithm Overlord',
      bossHP: 200,
      bossAscii: `
   /\\  ALGO  /\\
  /  \\OVERL/  \\
 /    \\ ORD/    \\
/______\\  /______\\
|  DS  |  |  ALG |
|______|  |______|
      `,
      teachContent: `The Algorithm Overlord tests mastery across all domains:

Complexity Analysis: O notation, time-space tradeoffs
Data Structures: arrays, trees, graphs, hash maps
Algorithms: search, sort, DP, greedy, backtracking
String Processing: KMP, Rabin-Karp, suffix arrays
Probabilistic: bloom filters, HyperLogLog, CMS
Spatial: quadtrees, KD-trees
Distributed: consistent hashing, rate limiting

The ultimate challenge requires combining techniques. True mastery means knowing WHEN to use each tool.`,
      questions: q5('Z11-15', [
        ['Which algorithm combines BFS with heuristic for shortest path?', ['Dijkstra', 'Bellman-Ford', 'A*', 'Floyd-Warshall'], 2, 'A* uses f(n)=g(n)+h(n), combining actual cost with heuristic estimate.'],
        ['For exact membership queries with no false positives, use?', ['Bloom filter', 'Hash set', 'Count-Min Sketch', 'HyperLogLog'], 1, 'Hash set gives exact answers. Bloom filter can false-positive.'],
        ['O(n log n) is the lower bound for comparison-based sorting because?', ['Hardware limits', 'Decision tree has n! leaves → height ≥ log(n!)', 'Memory constraints', 'Cache misses'], 1, 'Information theory: need log(n!) comparisons to distinguish all orderings.'],
        ['Fibonacci heap improves Dijkstra to O(E + V log V) via?', ['O(1) insert', 'O(1) amortized decrease-key', 'O(log V) delete-min', 'O(1) extract-min'], 1, 'Decrease-key O(1) amortized in Fibonacci heap vs O(log n) in binary heap.'],
        ['The best data structure for a leaderboard with rank queries?', ['Array', 'Hash map', 'Sorted set (skip list)', 'Bloom filter'], 2, 'Sorted set with O(log n) insert, rank query, range — used in Redis ZSET.'],
      ]),
      visualSpec: {
        type: 'array',
        steps: [
          { description: 'FINAL GAUNTLET. All techniques combined.', highlightIndices: [], arrayState: [1, 1, 1, 1, 1] },
          { description: 'Phase 1: Knowledge check passed!', highlightIndices: [0], arrayState: [1, 0, 0, 0, 0] },
          { description: 'Phase 2: Visual trace mastered!', highlightIndices: [0, 1], arrayState: [1, 1, 0, 0, 0] },
          { description: 'Phase 3: Code duel victory!', highlightIndices: [0, 1, 2], arrayState: [1, 1, 1, 0, 0] },
          { description: 'Algorithm Overlord DEFEATED. You are the Algorithm Master!', highlightIndices: [0, 1, 2, 3, 4], arrayState: [1, 1, 1, 1, 1] },
        ],
      },
      codeTemplates: stub(
        'ALGORITHM MASTER\nTotal XP: 9999\nAll bosses defeated!',
        `# The final challenge: implement a mini algorithm selector
def best_algorithm(problem_type, data_size, constraints):
    """Return the best algorithm for the given problem"""
    solutions = {
        ("search", "sorted"): "Binary Search O(log n)",
        ("search", "unsorted"): "Hash Set O(1) average",
        ("sort", "comparison"): "Merge Sort / Tim Sort O(n log n)",
        ("sort", "integers"): "Counting/Radix Sort O(n+k)",
        ("graph", "shortest"): "Dijkstra O(E log V)",
        ("graph", "all_pairs"): "Floyd-Warshall O(V³)",
        ("string", "pattern"): "KMP O(n+m)",
        ("string", "multi"): "Aho-Corasick O(n + patterns + matches)",
        ("dp", "subproblems"): "Memoization/Tabulation O(states)",
    }
    key = (problem_type, constraints)
    return solutions.get(key, "Analyze problem structure first!")

print("ALGORITHM MASTER")
print("Total XP: 9999")
print("All bosses defeated!")`,
      ),
      testCases: [{ input: '', expectedOutput: 'ALGORITHM MASTER\nTotal XP: 9999\nAll bosses defeated!' }],
      prerequisites: ['Z11-14'],
      xpReward: 500,
      loot: ['Algorithm Overlord Crown', 'Master Badge', 'Infinite Wisdom', 'DSA Grandmaster Title'],
    },
  ],
}

export default zone11
