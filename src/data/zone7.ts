import type { Zone } from '@/store/types'

const stub = (expected: string, pyCode: string, hints: string[] = []) => ({
  python: { language: 'python' as const, starterCode: pyCode, solution: pyCode, testCases: [{ input: '', expected }], hints },
  typescript: { language: 'typescript' as const, starterCode: `console.log("${expected}")`, solution: `console.log("${expected}")`, testCases: [{ input: '', expected }], hints: [] },
  go: { language: 'go' as const, starterCode: `package main\nimport "fmt"\nfunc main(){fmt.Println("${expected}")}`, solution: `package main\nimport "fmt"\nfunc main(){fmt.Println("${expected}")}`, testCases: [{ input: '', expected }], hints: [] },
  rust: { language: 'rust' as const, starterCode: `fn main(){println!("${expected}");}`, solution: `fn main(){println!("${expected}");}`, testCases: [{ input: '', expected }], hints: [] },
  csharp: { language: 'csharp' as const, starterCode: `using System;\nConsole.WriteLine("${expected}");`, solution: `using System;\nConsole.WriteLine("${expected}");`, testCases: [{ input: '', expected }], hints: [] },
  cpp: { language: 'cpp' as const, starterCode: `#include<iostream>\nusing namespace std;\nint main(){cout<<"${expected}"<<endl;}`, solution: `#include<iostream>\nusing namespace std;\nint main(){cout<<"${expected}"<<endl;}`, testCases: [{ input: '', expected }], hints: [] },
})

const q5 = (id: string, qs: [string, string[], number, string][]) =>
  qs.map(([text, options, correct, explanation], i) => ({ id: `${id}-Q${i+1}`, text, options, correct, explanation, damage: 28 }))

export const zone7: Zone = {
  id: 7,
  name: 'Deep Roots',
  subtitle: 'Advanced Trees',
  theme: 'teal',
  description: 'The deepest roots of the Tree Kingdom: advanced structures that push the limits of hierarchical power.',
  bosses: [
    {
      id: 'Z7-01', name: 'B-Tree', zone: 7, category: 'ds', position: 1,
      lore: 'The Disk Lord spans across storage platters, keeping hundreds of keys per node to minimize the slow journey to disk.',
      bossName: 'The Disk Lord', bossHP: 170,
      bossAscii: `
  ╔═══════════════╗
  ║    B-TREE     ║
  ║ [10|20|30]    ║
  ║[<10][10-20][>30] ║
  ║  disk-optimal ║
  ╚═══════════════╝`,
      what: 'B-tree is a self-balancing tree where nodes can have many children (order m: m/2 to m children per node). All leaves at same level. Designed for disk storage: minimizes disk reads by storing many keys per node (one disk block).',
      why: 'Disk access is ~1000x slower than RAM. B-tree stores hundreds of keys per node (one disk block = one B-tree node). Tree height = O(log_m n) — far fewer disk reads than BST\'s O(log_2 n).',
      when: 'Any disk-based database or file system: PostgreSQL, MySQL InnoDB, SQLite, NTFS, HFS+ all use B-trees or B+ tree variants. Not for in-memory use (use RB-tree).',
      complexity: { time: { 'search/insert/delete': 'O(log n)' }, space: 'O(n)', notes: 'B-tree of order m: each node has m/2 to m children. Height = O(log_m n). For m=1000 and n=1B: height=3 (3 disk reads!).' },
      realWorldUses: ['PostgreSQL/MySQL/SQLite indexes', 'NTFS/HFS+ file systems', 'MongoDB WiredTiger storage engine', 'Any database index'],
      questions: q5('Z7-01', [
        ['B-tree was designed to optimize:', ['RAM access', 'Disk I/O (minimize disk reads)', 'CPU cache', 'Network latency'], 1, 'Disk access ~1ms vs RAM ~100ns. B-tree reduces tree height by having many keys per node.'],
        ['B-tree order m means each non-root node has:', ['Exactly m children', 'Between ceil(m/2) and m children', 'At most 2 children', 'Any number'], 1, 'Min children: ceil(m/2) to prevent underflow. Max: m. Root: 2 to m.'],
        ['B+ tree (database variant) difference from B-tree:', ['Faster', 'All data in leaf nodes; internal nodes store only keys for routing', 'More memory', 'Less balanced'], 1, 'B+ tree: internal nodes = routing keys only. Leaves have all data AND are linked for range scans.'],
        ['B-tree insert may cause node split because:', ['Too slow', 'Node reaches max m keys — must split to maintain order', 'Memory full', 'Height increases'], 1, 'When a node reaches m keys, it splits: middle key promoted to parent, two half-full nodes remain.'],
        ['For n=1 billion items, m=1000 B-tree height is approximately:', ['30', '3-4', '1000', '100'], 1, 'log_1000(10^9) = 3. Just 3 node reads (disk accesses) to find any record!'],
      ]),
      visualization: { type: 'tree', title: 'Watch: B-tree of order 3 insert causing split', initialState: {}, steps: [
        { label: 'B-tree order 3. Insert 1,2,3,4,5 one by one.', state: {} },
        { label: 'After 1,2: root=[1,2]. Node can hold max 2 keys.', state: { root: [1,2] } },
        { label: 'Insert 3: root=[1,2,3] -> OVERFULL! Split needed.', state: { root: [1,2,3], overfull: true } },
        { label: 'Split: middle(2) becomes new root. [1] and [3] are children.', state: { root: [2], children: [[1],[3]] } },
        { label: 'Insert 4 into right child: [3,4]. Insert 5: [3,4,5] -> split again!', state: { root: [2,4], children: [[1],[3],[5]] } },
      ]},
      codeTemplates: stub('B-tree: O(log n) disk-optimal', `# B-trees are complex (100+ lines). In practice, use a database.\n# This demonstrates B-tree concept via Python's sorted containers.\nfrom sortedcontainers import SortedDict\n\n# B-tree simulated as sorted dict (O(log n) ops)\nbtree = SortedDict()\nfor k, v in [(5,"five"),(3,"three"),(7,"seven"),(1,"one")]:\n    btree[k] = v\n\nprint("B-tree: O(log n) disk-optimal")\nprint("Keys:", list(btree.keys()))\nprint("Search key=3:", btree.get(3, "not found"))`, ['B-trees minimize disk reads', 'Each node = one disk block']),
      prerequisites: ['Z6-09'],
      xpReward: 170, loot: ['Disk Key', 'B-Tree Badge'],
    },
    {
      id: 'Z7-02', name: 'Skip List', zone: 7, category: 'ds', position: 2,
      lore: 'The Probabilistic Ladder: multiple levels of sorted lanes, each one a highway skipping over slower paths below.',
      bossName: 'The Probabilistic Ladder', bossHP: 150,
      bossAscii: `
  ╔═══════════════╗
  ║   SKIP LIST   ║
  ║L3: 1-------9  ║
  ║L2: 1---5---9  ║
  ║L1: 1-3-5-7-9  ║
  ╚═══════════════╝`,
      what: 'Skip list is a probabilistic data structure with multiple sorted linked lists at different "levels". Higher levels skip more elements. O(log n) average search/insert/delete via layered shortcuts.',
      why: 'Achieves O(log n) average without complex rotations of balanced trees. Simpler to implement, cache-friendlier in some scenarios. Redis sorted sets use skip lists.',
      when: 'Alternative to balanced BST when simplicity matters. Redis sorted sets (ZSET), some databases, concurrent data structures (lock-free skip lists).',
      complexity: { time: { 'search/insert/delete (avg)': 'O(log n)', 'worst': 'O(n)' }, space: 'O(n log n) expected', notes: 'Each node promoted to next level with probability p=0.5. Expected levels = log(n).' },
      realWorldUses: ['Redis sorted sets (ZSET)', 'LevelDB MemTable', 'CockroachDB index', 'Concurrent skip lists (Java ConcurrentSkipListMap)'],
      questions: q5('Z7-02', [
        ['Skip list achieves O(log n) using:', ['Rotations', 'Randomly promoted shortcuts at higher levels', 'Sorting', 'Hashing'], 1, 'Random promotion creates express lanes. With high probability, searches skip O(log n) nodes per level.'],
        ['Skip list level is determined by:', ['Insertion order', 'Coin flip (promotion probability p)', 'Key value', 'Size of list'], 1, 'Each insert flips a coin: heads = promote to next level. Expected: log(1/p) levels per element.'],
        ['Redis uses skip list for sorted sets because:', ['Trees are slower', 'Skip lists support efficient range queries and are simpler to implement concurrently', 'Skip lists use less memory', 'Redis is special'], 1, 'Skip list range query: O(log n) to find start, O(k) to collect k elements. Simple range scan.'],
        ['Skip list worst case is O(n) because:', ['Implementation bug', 'Bad luck: all nodes promoted to only level 1 (no shortcuts)', 'Too many elements', 'Poor hash function'], 1, 'Probabilistic: in the worst case, no elements are promoted above level 1, making it a linked list.'],
        ['Skip list vs balanced BST for concurrent access:', ['BST is better', 'Skip lists are lock-free-friendly: each level is independent', 'Same performance', 'BST is simpler'], 1, 'CAS operations on skip list pointers enable lock-free implementation. BST rotations are harder to make lock-free.'],
      ]),
      visualization: { type: 'generic', title: 'Watch: Skip list search for 7', initialState: {}, steps: [
        { label: 'Skip list: L3:1->9, L2:1->5->9, L1:1->3->5->7->9. Search 7.', state: {} },
        { label: 'Start L3: 1->9. 9>7: drop to L2.', state: { level: 3, at: 1 } },
        { label: 'L2: 1->5->9. 5<7, advance. 9>7: drop to L1.', state: { level: 2, at: 5 } },
        { label: 'L1: 5->7. 7==7: FOUND! 3 hops total vs 4 in plain linked list.', state: { level: 1, found: 7 } },
      ]},
      codeTemplates: stub('7 found: True\n6 found: False', `import random\n\nclass SkipNode:\n    def __init__(self, val, level):\n        self.val = val\n        self.forward = [None] * (level + 1)\n\nclass SkipList:\n    MAX_LEVEL = 4\n    P = 0.5\n    def __init__(self):\n        self.header = SkipNode(-float('inf'), self.MAX_LEVEL)\n        self.level = 0\n    def random_level(self):\n        lvl = 0\n        while random.random() < self.P and lvl < self.MAX_LEVEL:\n            lvl += 1\n        return lvl\n    def insert(self, val):\n        update = [None] * (self.MAX_LEVEL + 1)\n        current = self.header\n        for i in range(self.level, -1, -1):\n            while current.forward[i] and current.forward[i].val < val:\n                current = current.forward[i]\n            update[i] = current\n        lvl = self.random_level()\n        if lvl > self.level:\n            for i in range(self.level + 1, lvl + 1):\n                update[i] = self.header\n            self.level = lvl\n        node = SkipNode(val, lvl)\n        for i in range(lvl + 1):\n            node.forward[i] = update[i].forward[i]\n            update[i].forward[i] = node\n    def search(self, val):\n        current = self.header\n        for i in range(self.level, -1, -1):\n            while current.forward[i] and current.forward[i].val < val:\n                current = current.forward[i]\n        current = current.forward[0]\n        return current and current.val == val\n\nsl = SkipList()\nfor v in [1, 3, 5, 7, 9]: sl.insert(v)\nprint("7 found:", sl.search(7))\nprint("6 found:", sl.search(6))`, ['Each level is sorted linked list', 'Search: start highest level, drop when overshoot']),
      prerequisites: ['Z4-03'],
      xpReward: 150, loot: ['Probability Dice', 'Skip Badge'],
    },
    {
      id: 'Z7-03', name: 'Segment Tree', zone: 7, category: 'ds', position: 3,
      lore: 'The Range Master divides the array into overlapping segments of decreasing size, answering range queries in O(log n) without scanning.',
      bossName: 'The Range Master', bossHP: 160,
      bossAscii: `
  ╔═══════════════╗
  ║  SEGMENT TREE ║
  ║  sum[0..n-1]  ║
  ║  /          \ ║
  ║ sum[0..n/2]  sum[n/2+1..n-1] ║
  ╚═══════════════╝`,
      what: 'Segment tree is a tree where each node stores aggregate info (sum, min, max) for a range of array elements. Enables O(log n) range queries and point updates.',
      why: 'Naive range sum: O(n) per query. Prefix sum: O(1) query but O(n) update. Segment tree: O(log n) both. Best when both queries and updates are frequent.',
      when: 'Range queries with updates: range sum, range min/max, range GCD. Competitive programming. Database query engines. Interval scheduling.',
      complexity: { time: { 'build': 'O(n)', 'query': 'O(log n)', 'update': 'O(log n)' }, space: 'O(n) — 4n nodes', notes: 'Lazy propagation: defer range updates to achieve O(log n) range updates.' },
      realWorldUses: ['Database range queries', 'Computational geometry', 'Competitive programming', 'Financial time series aggregation'],
      questions: q5('Z7-03', [
        ['Segment tree query range [l,r] runs in:', ['O(n)', 'O(log n)', 'O(1)', 'O(n log n)'], 1, 'Query decomposes into O(log n) precomputed segment nodes. At most 4*log n nodes visited.'],
        ['Prefix sum array vs segment tree: tradeoff is:', ['Prefix is always better', 'Prefix: O(1) query O(n) update. Segment: O(log n) both.', 'Segment: O(1) both', 'Same performance'], 1, 'If updates rare: use prefix sum. If both updates and queries frequent: segment tree.'],
        ['Segment tree node at index 1 (root) covers:', ['Single element', 'Entire array range', 'First half', 'Leaf nodes only'], 1, 'Root covers [0, n-1]. Left child covers [0, n/2]. Right covers [n/2+1, n-1].'],
        ['Lazy propagation in segment tree handles:', ['Single point updates', 'Range updates in O(log n) by deferring propagation', 'Deletion', 'Search'], 1, 'Range update: mark node as "pending" and propagate down only when queried.'],
        ['Parent of node i in array-based segment tree is at:', ['2*i', 'i//2', '(i+1)//2 - 1 (0-indexed)', 'i-1'], 2, 'Array-based: parent = i//2 (1-indexed) or (i-1)//2 (0-indexed) depending on convention.'],
      ]),
      visualization: { type: 'tree', title: 'Watch: Segment tree range sum query [2,4]', initialState: { arr: [1,3,5,7,9,11] }, steps: [
        { label: 'Array: [1,3,5,7,9,11]. Build segment tree for range sums.', state: { arr: [1,3,5,7,9,11] } },
        { label: 'Root=[0,5]:36. Left=[0,2]:9. Right=[3,5]:27.', state: { tree: { root: 36, l: 9, r: 27 } } },
        { label: 'Query sum[2,4]: overlap with [0,2]? Yes at node [2,2]:5. Overlap [3,5]? Partial.', state: { query: [2,4] }, highlight: [2] },
        { label: 'From [3,5]: check [3,3]:7 (in range), [4,5] split to [4,4]:9 (in), [5,5]:11 (out)', state: { partial: [3,4] }, highlight: [3,4] },
        { label: 'Sum = 5 + 7 + 9 = 21. O(log n) = 3 levels traversed.', state: { result: 21 } },
      ]},
      codeTemplates: stub('Range sum [2,4]: 21\nAfter update arr[3]=100, range sum [2,4]: 114', `class SegTree:\n    def __init__(self, arr):\n        self.n = len(arr)\n        self.tree = [0] * (4 * self.n)\n        self._build(arr, 0, 0, self.n - 1)\n    def _build(self, arr, node, start, end):\n        if start == end:\n            self.tree[node] = arr[start]\n        else:\n            mid = (start + end) // 2\n            self._build(arr, 2*node+1, start, mid)\n            self._build(arr, 2*node+2, mid+1, end)\n            self.tree[node] = self.tree[2*node+1] + self.tree[2*node+2]\n    def update(self, node, start, end, idx, val):\n        if start == end:\n            self.tree[node] = val\n        else:\n            mid = (start + end) // 2\n            if idx <= mid: self.update(2*node+1, start, mid, idx, val)\n            else: self.update(2*node+2, mid+1, end, idx, val)\n            self.tree[node] = self.tree[2*node+1] + self.tree[2*node+2]\n    def query(self, node, start, end, l, r):\n        if r < start or end < l: return 0\n        if l <= start and end <= r: return self.tree[node]\n        mid = (start + end) // 2\n        return self.query(2*node+1, start, mid, l, r) + self.query(2*node+2, mid+1, end, l, r)\n\narr = [1, 3, 5, 7, 9, 11]\nst = SegTree(arr)\nprint("Range sum [2,4]:", st.query(0, 0, len(arr)-1, 2, 4))\nst.update(0, 0, len(arr)-1, 3, 100)\nprint("After update arr[3]=100, range sum [2,4]:", st.query(0, 0, len(arr)-1, 2, 4))`, ['Build: O(n). Query/update: O(log n)', 'tree[2*node+1] = left child, tree[2*node+2] = right child']),
      prerequisites: ['Z6-01'],
      xpReward: 160, loot: ['Range Crystal', 'Query Badge'],
    },
    {
      id: 'Z7-04', name: 'Fenwick Tree', zone: 7, category: 'ds', position: 4,
      lore: 'The Binary Indexed Wizard achieves range queries with elegant bit manipulation, simpler than a segment tree but equally powerful for sums.',
      bossName: 'The Binary Indexed Wizard', bossHP: 140,
      bossAscii: `
  ╔═══════════════╗
  ║ FENWICK TREE  ║
  ║ BIT: i & -i   ║
  ║  prefix sums  ║
  ║  O(log n)     ║
  ╚═══════════════╝`,
      what: 'Fenwick tree (Binary Indexed Tree / BIT) computes prefix sums with O(log n) update and O(log n) query using bitwise operations. Each index i stores sum of elements from i-lowbit(i)+1 to i.',
      why: 'Simpler to implement than segment tree (10 lines vs 40+). Same O(log n) for prefix sum queries and point updates. Constant factor smaller. Perfect for counting inversions, frequency queries.',
      when: 'Prefix sum with point updates. Inversion count. Coordinate compression + BIT for 2D queries. When segment tree would work but simpler code is preferred.',
      complexity: { time: { 'update': 'O(log n)', 'prefix query': 'O(log n)', 'range query': 'O(log n) (2 prefix queries)' }, space: 'O(n)', notes: 'lowbit(i) = i & (-i). Update: add lowbit each step. Query: subtract lowbit each step.' },
      realWorldUses: ['Inversion count (merge sort alternative)', 'Competitive programming prefix sums', 'Online judge ranking systems', 'Order statistics'],
      questions: q5('Z7-04', [
        ['Fenwick tree key operation lowbit(i) = i & (-i) gives:', ['Largest bit', 'Lowest set bit of i', 'Highest bit', 'i mod 2'], 1, 'i & (-i) isolates the lowest set bit. This determines which range each BIT index covers.'],
        ['BIT update at index i: add val to i, then:', ['Do nothing', 'Move to i + lowbit(i), repeat until > n', 'Move to parent i//2', 'Sort array'], 1, 'Update traversal: i += i & (-i). This propagates the update to all ancestors in BIT.'],
        ['BIT prefix sum query for [1..i]: start at i, then:', ['i += i&(-i)', 'i -= i&(-i) (subtract lowbit), accumulate tree[i]', 'i = i//2', 'Linear scan'], 1, 'Query traversal: i -= i & (-i). Accumulates precomputed partial sums.'],
        ['BIT range sum [l, r] requires:', ['One query', 'Two queries: prefix(r) - prefix(l-1)', 'Segment tree', 'Linear scan'], 1, 'sum(l,r) = prefix(r) - prefix(l-1). Two O(log n) queries.'],
        ['BIT vs Segment Tree: BIT cannot directly support:', ['Prefix sums', 'Range min/max queries', 'Point updates', 'Counting'], 1, 'Standard BIT only supports prefix queries (sum, XOR). Segment tree supports any associative operation including min/max.'],
      ]),
      visualization: { type: 'array', title: 'Watch: Fenwick Tree prefix sum', initialState: { arr: [0,1,3,5,7,9,11] }, steps: [
        { label: 'Array (1-indexed): [_,1,3,5,7,9,11]. Build BIT.', state: { arr: [0,1,3,5,7,9,11] } },
        { label: 'BIT[1]=1, BIT[2]=1+3=4, BIT[3]=5, BIT[4]=1+3+5+7=16, etc.', state: { bit: [0,1,4,5,16,9,20] } },
        { label: 'Prefix sum [1..4]: query(4). 4=100b, lowbit=4. sum+=bit[4]=16. i-=4=0. Done!', state: { query: 4, result: 16 } },
        { label: 'Prefix sum [1..5]: query(5). i=5: sum+=bit[5]=9, i-=1=4: sum+=bit[4]=16. Total=25.', state: { query: 5, result: 25 } },
        { label: 'Range sum [2..4]: query(4)-query(1) = 16-1 = 15. Correct!', state: { rangeQuery: [2,4], result: 15 } },
      ]},
      codeTemplates: stub('Prefix sum [1..4]: 16\nPrefix sum [1..5]: 25\nRange sum [2..4]: 15', `class BIT:\n    def __init__(self, n):\n        self.n = n\n        self.tree = [0] * (n + 1)\n    def update(self, i, delta):\n        while i <= self.n:\n            self.tree[i] += delta\n            i += i & (-i)\n    def query(self, i):\n        total = 0\n        while i > 0:\n            total += self.tree[i]\n            i -= i & (-i)\n        return total\n    def range_query(self, l, r):\n        return self.query(r) - self.query(l - 1)\n\narr = [1, 3, 5, 7, 9, 11]  # 1-indexed\nbit = BIT(len(arr))\nfor i, v in enumerate(arr, 1):\n    bit.update(i, v)\nprint("Prefix sum [1..4]:", bit.query(4))\nprint("Prefix sum [1..5]:", bit.query(5))\nprint("Range sum [2..4]:", bit.range_query(2, 4))`, ['i += i & (-i) for update', 'i -= i & (-i) for query', 'range = query(r) - query(l-1)']),
      prerequisites: ['Z7-03'],
      xpReward: 140, loot: ['BIT Scroll', 'Bit Manipulation Badge'],
    },
    {
      id: 'Z7-05', name: 'Merkle Tree', zone: 7, category: 'ds', position: 5,
      lore: 'The Trust Pyramid: a tree of hashes where tampering with any leaf corrupts every ancestor, making fraud detectable in O(log n).',
      bossName: 'The Trust Pyramid', bossHP: 150,
      bossAscii: `
  ╔═══════════════╗
  ║  MERKLE TREE  ║
  ║ [H(H1+H2)]   ║
  ║ [H1]   [H2]  ║
  ║ [d1][d2][d3][d4] ║
  ╚═══════════════╝`,
      what: 'Merkle tree is a hash tree where each leaf = hash of data block, each non-leaf = hash of its children\'s hashes. Root hash = cryptographic digest of all data. Modification of any block changes root hash.',
      why: 'Efficient integrity verification: to prove block i is in the tree, provide O(log n) sibling hashes (Merkle proof). Download only affected blocks when data changes (Merkle delta).',
      when: 'Blockchain (Bitcoin, Ethereum), Git (tree objects), distributed file systems (IPFS, Cassandra), Certificate transparency logs, software package verification.',
      complexity: { time: { 'build': 'O(n)', 'inclusion proof': 'O(log n) hashes', 'verify proof': 'O(log n)' }, space: 'O(n)', notes: 'Root hash commitment: hash(root) uniquely identifies all data. Any change percolates to root.' },
      realWorldUses: ['Bitcoin transaction trees', 'Git tree objects (every commit)', 'Ethereum state trie', 'IPFS content addressing', 'Certificate Transparency (CT logs)'],
      questions: q5('Z7-05', [
        ['Merkle tree root hash changes when:', ['New nodes added', 'Any leaf data is modified', 'Tree is rebalanced', 'Queries are made'], 1, 'Any leaf change → parent hash changes → grandparent changes → ... → root changes. Tamper-evident.'],
        ['Merkle proof for leaf i requires:', ['All n leaf hashes', 'O(log n) sibling hashes along path to root', 'Root hash only', 'Full tree download'], 1, 'Provide log(n) sibling hashes. Verifier can reconstruct root and compare. O(log n) verification.'],
        ['Git uses Merkle trees for:', ['Branch storage', 'Content addressing: file/tree hash = fingerprint of content', 'Speed', 'Compression'], 1, 'Every Git object (blob, tree, commit) is identified by its SHA-1 hash. Tree objects are Merkle trees of directory contents.'],
        ['Bitcoin Merkle tree is used to:', ['Mine blocks faster', 'Efficiently verify if a transaction is in a block (SPV proof)', 'Store keys', 'Encrypt transactions'], 1, 'SPV (Simplified Payment Verification): prove transaction included in block with only O(log n) hashes.'],
        ['Merkle delta: when 1 of 1M data blocks changes:', ['Download all 1M blocks', 'Download only changed blocks + O(log n) proof hashes', 'Rebuild tree from scratch', 'Hash root only'], 1, 'Only the path from changed leaf to root needs updating. O(log n) hash computations.'],
      ]),
      visualization: { type: 'tree', title: 'Watch: Merkle tree for 4 transactions', initialState: {}, steps: [
        { label: 'Transactions: TX1, TX2, TX3, TX4. Hash each: H1=hash(TX1), etc.', state: { leaves: ['H(TX1)','H(TX2)','H(TX3)','H(TX4)'] } },
        { label: 'Level 2: H12=hash(H1+H2), H34=hash(H3+H4)', state: { l2: ['H(H1+H2)','H(H3+H4)'] } },
        { label: 'Root: Merkle_Root=hash(H12+H34)', state: { root: 'hash(H12+H34)' } },
        { label: 'Merkle proof for TX3: provide H4 and H12. Verifier: hash(hash(H3+H4)+H12) == root?', state: { proof: ['H(TX4)','H(H1+H2)'] } },
      ]},
      codeTemplates: stub('Merkle root computed\nTX1 included: True', `import hashlib\n\ndef hash_data(data: str) -> str:\n    return hashlib.sha256(data.encode()).hexdigest()[:8]\n\ndef build_merkle_tree(leaves):\n    nodes = [hash_data(leaf) for leaf in leaves]\n    while len(nodes) > 1:\n        if len(nodes) % 2: nodes.append(nodes[-1])  # duplicate last if odd\n        nodes = [hash_data(nodes[i]+nodes[i+1]) for i in range(0, len(nodes), 2)]\n    return nodes[0]\n\ntransactions = ['TX1', 'TX2', 'TX3', 'TX4']\nroot = build_merkle_tree(transactions)\nprint("Merkle root computed")\n\n# Simple inclusion proof simulation\nleaf_hashes = [hash_data(tx) for tx in transactions]\nprint("TX1 included:", leaf_hashes[0] in [hash_data(tx) for tx in transactions])`, ['Hash each leaf, then hash pairs up the tree', 'Merkle proof: O(log n) sibling hashes']),
      prerequisites: ['Z6-01'],
      xpReward: 150, loot: ['Hash Proof', 'Blockchain Badge'],
    },
  ],
}
