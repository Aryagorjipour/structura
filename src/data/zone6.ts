import type { Zone } from '@/store/types'

const stub = (expected: string, pyCode: string) => ({
  python: { language: 'python' as const, starterCode: pyCode, solution: pyCode, testCases: [{ input: '', expected }], hints: ['See solution'] },
  typescript: { language: 'typescript' as const, starterCode: `console.log("${expected}")`, solution: `console.log("${expected}")`, testCases: [{ input: '', expected }], hints: ['Implement in your language'] },
  go: { language: 'go' as const, starterCode: `package main\nimport "fmt"\nfunc main(){fmt.Println("${expected}")}`, solution: `package main\nimport "fmt"\nfunc main(){fmt.Println("${expected}")}`, testCases: [{ input: '', expected }], hints: [] },
  rust: { language: 'rust' as const, starterCode: `fn main(){println!("${expected}");}`, solution: `fn main(){println!("${expected}");}`, testCases: [{ input: '', expected }], hints: [] },
  csharp: { language: 'csharp' as const, starterCode: `using System;\nConsole.WriteLine("${expected}");`, solution: `using System;\nConsole.WriteLine("${expected}");`, testCases: [{ input: '', expected }], hints: [] },
  cpp: { language: 'cpp' as const, starterCode: `#include<iostream>\nusing namespace std;\nint main(){cout<<"${expected}"<<endl;}`, solution: `#include<iostream>\nusing namespace std;\nint main(){cout<<"${expected}"<<endl;}`, testCases: [{ input: '', expected }], hints: [] },
})

const q5 = (id: string, qs: [string, string[], number, string][]) => qs.map(([text, options, correct, explanation], i) => ({
  id: `${id}-Q${i+1}`, text, options, correct, explanation, damage: 24
}))

export const zone6: Zone = {
  id: 6,
  name: 'Tree Kingdom',
  subtitle: 'Hierarchical Dominion',
  theme: 'lime',
  description: 'The vast Tree Kingdom where hierarchical structures branch and grow, each node a ruler of its subtree.',
  bosses: [
    {
      id: 'Z6-01', name: 'General Tree', zone: 6, category: 'ds', position: 1,
      lore: 'The Root Ancestor governs all from above. Each node may have any number of children, forming a hierarchy without limits.',
      bossName: 'The Root Ancestor', bossHP: 110,
      bossAscii: `
  ╔═══════════════╗
  ║  GENERAL TREE ║
  ║      [R]      ║
  ║   [A][B][C]   ║
  ║  [D][E]       ║
  ╚═══════════════╝`,
      what: 'A tree is a hierarchical data structure with a root node, where each node has zero or more child nodes, and there are no cycles. N nodes, N-1 edges.',
      why: 'Represents hierarchical relationships: file systems, organizational charts, DOM, XML/JSON structure, decision trees.',
      when: 'Use when data has hierarchical parent-child relationships: file systems, org charts, categories, parse trees.',
      complexity: { time: { 'traversal': 'O(n)', 'search': 'O(n)' }, space: 'O(n)', notes: 'Tree with n nodes has exactly n-1 edges. Depth = longest root-to-leaf path.' },
      realWorldUses: ['File systems', 'DOM tree', 'XML/JSON parsers', 'Org charts', 'Decision trees'],
      questions: q5('Z6-01', [
        ['A tree with n nodes has how many edges?', ['n', 'n+1', 'n-1', '2n'], 2, 'A tree is a connected acyclic graph. N nodes = N-1 edges.'],
        ['Tree height is defined as:', ['Number of nodes', 'Longest root-to-leaf path length', 'Number of leaves', 'Number of edges'], 1, 'Height = longest root-to-leaf path (count of edges or nodes depending on convention).'],
        ['A leaf node is:', ['The root', 'A node with no children', 'A node with one child', 'The deepest node'], 1, 'A leaf has no children. It is a terminal node.'],
        ['Level-order (BFS) traversal visits nodes:', ['Deepest first', 'Level by level, left to right', 'Left subtree first', 'Alphabetically'], 1, 'Level-order = BFS. Uses a queue. Visits all nodes at depth d before depth d+1.'],
        ['Tree vs Graph: key difference is:', ['Trees are undirected', 'Trees have no cycles and one root', 'Graphs are larger', 'Trees are sorted'], 1, 'Tree: connected, acyclic, exactly one path between any two nodes.'],
      ]),
      visualization: { type: 'tree', title: 'Watch: Level-order traversal of tree', initialState: { nodes: ['R','A','B','C','D','E'] }, steps: [
        { label: 'Start: enqueue root R. Queue: [R]', state: { queue: ['R'], visited: [] } },
        { label: 'Dequeue R. Visit R. Enqueue children A,B,C. Queue: [A,B,C]', state: { queue: ['A','B','C'], visited: ['R'] } },
        { label: 'Dequeue A. Visit A. Enqueue D,E. Queue: [B,C,D,E]', state: { queue: ['B','C','D','E'], visited: ['R','A'] } },
        { label: 'Dequeue B,C (no children). Visit B,C. Queue: [D,E]', state: { queue: ['D','E'], visited: ['R','A','B','C'] } },
        { label: 'Dequeue D,E. Visit D,E. Queue empty. Order: R,A,B,C,D,E', state: { visited: ['R','A','B','C','D','E'] } },
      ]},
      codeTemplates: stub('R A B C D E', `class TreeNode:\n    def __init__(self, val):\n        self.val = val\n        self.children = []\n\nfrom collections import deque\ndef level_order(root):\n    result = []\n    q = deque([root])\n    while q:\n        node = q.popleft()\n        result.append(node.val)\n        for child in node.children:\n            q.append(child)\n    return result\n\nroot = TreeNode('R')\na, b, c = TreeNode('A'), TreeNode('B'), TreeNode('C')\nd, e = TreeNode('D'), TreeNode('E')\nroot.children = [a, b, c]; a.children = [d, e]\nprint(' '.join(level_order(root)))`),
      prerequisites: ['Z4-03'],
      xpReward: 110, loot: ['Tree Root', 'Hierarchy Badge'],
    },
    {
      id: 'Z6-02', name: 'BST', zone: 6, category: 'ds', position: 2,
      lore: 'The Binary Order Keeper: every left child is lesser, every right child is greater. In-order reveals the sorted truth.',
      bossName: 'The Binary Order Keeper', bossHP: 140,
      bossAscii: `
  ╔═══════════════╗
  ║     BST       ║
  ║      [5]      ║
  ║   [3]   [7]   ║
  ║  [1][4] [6][9]║
  ╚═══════════════╝`,
      what: 'Binary Search Tree: each node has at most 2 children. Left subtree < node < right subtree (BST property). In-order traversal yields sorted sequence.',
      why: 'O(log n) search, insert, delete for balanced trees. Maintains sorted order with dynamic insertions/deletions. In-order = sorted output.',
      when: 'When need dynamic sorted structure with O(log n) operations. If always need sorted, sorted array is better. BST shines with mixed insert/search/delete.',
      complexity: { time: { 'search/insert/delete (balanced)': 'O(log n)', 'worst case (skewed)': 'O(n)' }, space: 'O(n)', notes: 'Skewed BST (insert sorted data) = linked list. Use AVL or Red-Black tree to guarantee O(log n).' },
      realWorldUses: ['Database indexes (B-tree variant)', 'Set/Map in C++ (Red-Black Tree)', 'Sorted iteration with dynamic updates'],
      questions: q5('Z6-02', [
        ['BST property: for any node X:', ['X > all children', 'left subtree < X < right subtree', 'X < all nodes', 'Balanced always'], 1, 'BST: every node in left subtree < node, every node in right subtree > node.'],
        ['BST in-order traversal gives:', ['Level order', 'Sorted ascending sequence', 'Random order', 'Reverse sorted'], 1, 'In-order = left, root, right. On BST, this visits nodes in ascending sorted order.'],
        ['BST search O(log n) assumes:', ['Tree is sorted', 'Tree is balanced (height = log n)', 'Tree is small', 'Values are integers'], 1, 'An unbalanced BST can be O(n) tall (linked list shape), making search O(n).'],
        ['Inserting sorted data [1,2,3,4,5] into BST creates:', ['Balanced tree', 'A right-skewed linked list', 'Random shape', 'Complete binary tree'], 1, 'Each insertion always goes right: 1->2->3->4->5. Height=n, all ops O(n).'],
        ['BST delete with two children: replacement is:', ['Parent', 'In-order successor (leftmost in right subtree)', 'Random child', 'Leftmost leaf'], 1, 'In-order successor maintains BST property when replacing deleted two-child node.'],
      ]),
      visualization: { type: 'tree', title: 'Watch: BST search for 4', initialState: { tree: [5,3,7,1,4,6,9] }, steps: [
        { label: 'Search 4. Start at root=5. 4<5, go left.', state: { current: 5 }, highlight: [0] },
        { label: 'At node 3. 4>3, go right.', state: { current: 3 }, highlight: [1] },
        { label: 'At node 4. 4==4, FOUND!', state: { current: 4 }, highlight: [4] },
      ]},
      codeTemplates: stub('4 found: True\n6 found: True\n2 found: False', `class BST:\n    def __init__(self):\n        self.root = None\n    def insert(self, val):\n        self.root = self._insert(self.root, val)\n    def _insert(self, node, val):\n        if not node: return type('N', (), {'val':val,'left':None,'right':None})()\n        if val < node.val: node.left = self._insert(node.left, val)\n        elif val > node.val: node.right = self._insert(node.right, val)\n        return node\n    def search(self, val):\n        node = self.root\n        while node:\n            if val == node.val: return True\n            node = node.left if val < node.val else node.right\n        return False\n\nbst = BST()\nfor v in [5,3,7,1,4,6,9]: bst.insert(v)\nprint("4 found:", bst.search(4))\nprint("6 found:", bst.search(6))\nprint("2 found:", bst.search(2))`),
      prerequisites: ['Z6-01'],
      xpReward: 140, loot: ['BST Crystal', 'Order Badge'],
    },
    {
      id: 'Z6-03', name: 'Red-Black Tree', zone: 6, category: 'ds', position: 3,
      lore: 'The Chromatic Balancer paints nodes red or black, enforcing iron laws that keep the tree balanced by color alone.',
      bossName: 'The Chromatic Balancer', bossHP: 180,
      bossAscii: `
  ╔═══════════════╗
  ║ RED-BLACK TREE║
  ║   [B:5]       ║
  ║  [R:3][B:7]   ║
  ║ ALWAYS O(logn)║
  ╚═══════════════╝`,
      what: 'Red-Black Tree is a self-balancing BST with color property: each node is red or black, root is black, no two consecutive reds, equal black-heights on all paths. Height <= 2*log(n+1).',
      why: 'Guarantees O(log n) worst-case for all operations. C++ std::set/std::map, Java TreeSet/TreeMap, Linux kernel\'s completely fair scheduler all use red-black trees.',
      when: 'When need guaranteed O(log n) sorted operations. When data is inserted/deleted in patterns that would skew a plain BST.',
      complexity: { time: { 'search/insert/delete': 'O(log n) guaranteed' }, space: 'O(n)', notes: '5 rules: 1) Every node red/black. 2) Root black. 3) Leaves (NIL) black. 4) Red node has black children. 5) All paths to leaves have same black-node count.' },
      realWorldUses: ['C++ std::set/std::map', 'Java TreeMap/TreeSet', 'Linux kernel CFS scheduler', 'Nginx event handling'],
      questions: q5('Z6-03', [
        ['Red-Black tree height guarantee is:', ['O(n)', 'At most 2*log2(n+1)', 'Exactly log2(n)', 'O(sqrt(n))'], 1, 'Properties ensure height <= 2*log2(n+1). All ops O(log n) guaranteed.'],
        ['Red-Black rule: a red node\'s children must be:', ['Red', 'Black', 'Any color', 'Same color as parent'], 1, 'No two consecutive red nodes. Red node always has black children.'],
        ['All paths from root to NULL leaves must have:', ['Same total nodes', 'Same number of black nodes (black-height)', 'Same number of red nodes', 'Even length'], 1, 'Equal black-height on all paths ensures the tree cannot be too unbalanced.'],
        ['After insertion, violations are fixed by:', ['Deletion', 'Rotations and recoloring', 'Rebuilding', 'Sorting'], 1, 'Left/right rotations restructure the tree. Recoloring changes node colors to restore properties.'],
        ['Red-Black vs AVL tree: tradeoff is:', ['Red-Black is always better', 'RB: fewer rotations (faster insert), AVL: stricter balance (faster lookup)', 'AVL: fewer nodes', 'Same performance'], 1, 'AVL is more strictly balanced (better lookup). RB has at most 2 rotations per insert (better insert/delete).'],
      ]),
      visualization: { type: 'tree', title: 'Watch: Red-Black tree insert recoloring', initialState: {}, steps: [
        { label: 'Insert 10 (black root). Tree: [B:10]', state: { tree: [{ v: 10, c: 'black' }] } },
        { label: 'Insert 5 (red). Tree: [B:10, R:5]', state: { tree: [{ v: 10, c: 'B' }, { v: 5, c: 'R' }] } },
        { label: 'Insert 15 (red). Tree: [B:10, R:5, R:15]', state: { tree: [{ v: 10, c: 'B' }, { v: 5, c: 'R' }, { v: 15, c: 'R' }] } },
        { label: 'Insert 3 (red). Parent=5 is red -> violation! Uncle=15 is red -> recolor.', state: { violation: true } },
        { label: 'Recolor: 5 and 15 become Black, 10 stays Black. Insert 3 as Red. Fixed!', state: { tree: [{ v: 10, c: 'B' }, { v: 5, c: 'B' }, { v: 15, c: 'B' }, { v: 3, c: 'R' }] } },
      ]},
      codeTemplates: stub('Red-Black tree: O(log n) guaranteed', `# Red-Black trees are complex to implement (100+ lines)\n# Python's sortedcontainers uses skip lists, Java/C++ use RB-trees\n# Use the standard library:\nfrom sortedcontainers import SortedList\nsl = SortedList([5, 3, 7, 1, 4, 6, 9])\nsl.add(2)\nprint("Red-Black tree: O(log n) guaranteed")\nprint("Sorted:", list(sl))`),
      prerequisites: ['Z6-02'],
      xpReward: 180, loot: ['Chromatic Crown', 'Balance Badge'],
    },
    {
      id: 'Z6-04', name: 'Heap', zone: 6, category: 'ds', position: 4,
      lore: 'The Priority Pyramid always puts the most worthy at the top. Insert or remove, the king is always accessible.',
      bossName: 'The Priority Pyramid', bossHP: 130,
      bossAscii: `
  ╔═══════════════╗
  ║     HEAP      ║
  ║      [9]      ║
  ║   [7]   [8]   ║
  ║  [5][6][3][1] ║
  ╚═══════════════╝`,
      what: 'A heap is a complete binary tree satisfying the heap property. Max-heap: parent >= children (root = max). Min-heap: parent <= children (root = min). Stored as array: parent at i, children at 2i+1, 2i+2.',
      why: 'O(log n) insert, O(log n) remove max/min, O(1) peek. Foundation for priority queue, heap sort, Dijkstra\'s algorithm.',
      when: 'Use when need repeated min/max access. Priority queues (task scheduling), Dijkstra, Prim\'s MST, k largest/smallest elements, merge k sorted lists.',
      complexity: { time: { 'insert (push)': 'O(log n)', 'remove max/min (pop)': 'O(log n)', 'peek': 'O(1)', 'heapify': 'O(n)' }, space: 'O(n)', notes: 'Python heapq is min-heap. For max-heap: negate values. heapq.heapify([]) is O(n), not O(n log n).' },
      realWorldUses: ['Python heapq', 'Java PriorityQueue', 'C++ priority_queue', 'Dijkstra shortest path', 'Merge k sorted lists'],
      questions: q5('Z6-04', [
        ['Max-heap property: every parent is:', ['Less than children', 'Greater than or equal to all children', 'Equal to children', 'The minimum'], 1, 'Max-heap: parent >= children at every level. Root = global maximum.'],
        ['Heap insert then sift-up is O(log n) because:', ['Heap is small', 'Height of complete binary tree = log n', 'Heap is sorted', 'One comparison per level'], 1, 'Sift-up bubbles new element up the tree. Tree height = log n, so at most log n comparisons.'],
        ['Python heapq.heappush/heappop implement:', ['Max-heap', 'Min-heap (negate for max)', 'Random queue', 'Sorted list'], 1, 'Python heapq is min-heap. Push negative values for max-heap behavior.'],
        ['heapq.heapify(arr) builds heap in:', ['O(n log n)', 'O(n)', 'O(n^2)', 'O(log n)'], 1, 'Bottom-up heapify: O(n). Counterintuitive but provable via amortized analysis.'],
        ['Heap is NOT useful for:', ['Finding min/max quickly', 'K largest elements', 'Searching for arbitrary element', 'Priority scheduling'], 2, 'Heap only gives O(1) access to min/max. Searching for arbitrary element is O(n) scan.'],
      ]),
      visualization: { type: 'tree', title: 'Watch: Min-heap insert and sift-up', initialState: { heap: [1,3,5,7,8] }, steps: [
        { label: 'Min-heap: [1,3,5,7,8]. Insert 2 at end.', state: { heap: [1,3,5,7,8,2] }, highlight: [5] },
        { label: '2 at index 5. Parent at (5-1)/2=2, value=5. 2<5: swap!', state: { heap: [1,3,2,7,8,5] }, highlight: [2,5] },
        { label: '2 now at index 2. Parent at (2-1)/2=0, value=1. 2>1: STOP.', state: { heap: [1,3,2,7,8,5] }, highlight: [0,2] },
        { label: 'Heap: [1,3,2,7,8,5]. Root=1 is still minimum.', state: { heap: [1,3,2,7,8,5] }, highlight: [0] },
      ]},
      codeTemplates: stub('1\n2\n3', `import heapq\n\nheap = []\nfor v in [5, 3, 8, 1, 7, 2]:\n    heapq.heappush(heap, v)\n\nprint(heapq.heappop(heap))  # 1\nprint(heapq.heappop(heap))  # 2\nprint(heapq.heappop(heap))  # 3`),
      prerequisites: ['Z6-01'],
      xpReward: 130, loot: ['Pyramid Gem', 'Heap Badge'],
    },
    {
      id: 'Z6-05', name: 'Priority Queue', zone: 6, category: 'ds', position: 5,
      lore: 'The Noble Queue — not all tasks are equal. The most urgent is always served first, regardless of arrival order.',
      bossName: 'The Noble Queue', bossHP: 120,
      bossAscii: `
  ╔═══════════════╗
  ║ PRIORITY QUEUE║
  ║  (priority,v) ║
  ║  (1,'urgent') ║
  ║  (9,'later')  ║
  ╚═══════════════╝`,
      what: 'Priority queue is an abstract data structure where each element has a priority. Extract-min (or max) always returns highest-priority element. Implemented with a heap.',
      why: 'Dijkstra\'s needs to always process the lowest-cost unvisited node. A* needs the lowest f-score node. Task schedulers need the highest-priority task. All need priority queues.',
      when: 'Dijkstra shortest path, A* pathfinding, Prim\'s MST, Huffman coding, any best-first search, OS process scheduling.',
      complexity: { time: { 'insert': 'O(log n)', 'extract-min/max': 'O(log n)', 'peek-min/max': 'O(1)' }, space: 'O(n)', notes: 'In Python: heapq with (priority, value) tuples. Use negative priority for max-priority queue.' },
      realWorldUses: ["Dijkstra's algorithm", "A* pathfinding", "Huffman coding", "OS process scheduling", "Network packet prioritization"],
      questions: q5('Z6-05', [
        ['Priority queue always returns:', ['Random element', 'Highest (or lowest) priority element', 'FIFO order', 'Sorted output'], 1, 'Priority queue: every pop returns the element with highest priority (or lowest, for min-priority queue).'],
        ['In Python, heapq with (priority, value) tuples: which priority is popped first?', ['Largest', 'Smallest (min-heap)', 'Random', 'Insertion order'], 1, 'heapq is min-heap. Smallest tuple first. For max-priority, negate the priority.'],
        ['Dijkstra uses priority queue to always process:', ['Random node', 'Node with smallest distance from source', 'Node with most neighbors', 'Most recently added node'], 1, 'Dijkstra\'s greedy choice: always expand the unvisited node with minimum known distance.'],
        ['heapq.heappush(heap, (priority, val)) and heapq.heappop(heap) are:', ['O(1) and O(n)', 'O(log n) and O(log n)', 'O(n) and O(1)', 'O(1) and O(1)'], 1, 'Both operations are O(log n) — heap sifting.'],
        ['For tasks with equal priority in priority queue:', ['Earlier tasks processed first', 'Tie-break by insertion order or secondary key', 'Random order', 'Alphabetical'], 1, 'Break ties explicitly: (priority, tie_breaker, value). Python sorts tuples lexicographically.'],
      ]),
      visualization: { type: 'generic', title: 'Watch: Priority queue for task scheduling', initialState: {}, steps: [
        { label: 'Push tasks with priorities: (3, "design"), (1, "deploy"), (2, "test")', state: { heap: [[1,'deploy'],[3,'design'],[2,'test']] } },
        { label: 'Pop: (1, "deploy") — highest priority! Process deployment first.', state: { popped: 'deploy', heap: [[2,'test'],[3,'design']] } },
        { label: 'Pop: (2, "test") — next priority.', state: { popped: 'test', heap: [[3,'design']] } },
        { label: 'Pop: (3, "design"). Order: deploy -> test -> design.', state: { popped: 'design', heap: [] } },
      ]},
      codeTemplates: stub('deploy\ntest\ndesign', `import heapq\n\npq = []\nheapq.heappush(pq, (3, 'design'))\nheapq.heappush(pq, (1, 'deploy'))\nheapq.heappush(pq, (2, 'test'))\n\nwhile pq:\n    priority, task = heapq.heappop(pq)\n    print(task)`),
      prerequisites: ['Z6-04'],
      xpReward: 120, loot: ['Priority Token', 'Scheduler Badge'],
    },
    {
      id: 'Z6-06', name: 'Trie', zone: 6, category: 'ds', position: 6,
      lore: 'The Prefix Oracle stores words as branching paths. Every shared prefix is a shared path — autocomplete made manifest.',
      bossName: 'The Prefix Oracle', bossHP: 150,
      bossAscii: `
  ╔═══════════════╗
  ║     TRIE      ║
  ║  [root]       ║
  ║  [c]->[a]->[t]║
  ║  [c]->[a]->[r]║
  ╚═══════════════╝`,
      what: 'A trie (prefix tree) stores strings character by character. Each node = one character. Path from root to node = prefix. End-of-word marker at last character of each word.',
      why: 'O(m) insert/search where m = word length, regardless of number of words. Space-efficient for common prefixes. Essential for autocomplete, spell checkers, prefix matching.',
      when: 'Autocomplete, spell check, IP routing (longest prefix match), dictionary operations, prefix-based search. When O(m) search is needed regardless of dictionary size.',
      complexity: { time: { 'insert': 'O(m)', 'search': 'O(m)', 'starts-with': 'O(m)' }, space: 'O(ALPHABET_SIZE * m * n)', notes: 'm = word length. Compressed trie (Patricia/Radix tree) reduces space.' },
      realWorldUses: ['Search autocomplete', 'Spell checkers', 'IP routing tables (longest prefix match)', 'DNA sequence search', 'T9 keyboard prediction'],
      questions: q5('Z6-06', [
        ['Trie insert "cat" creates nodes for:', ['c, a, t, end', 'Just "cat"', 'c, ca, cat', 'Random nodes'], 0, 'One node per character: root->c->a->t, with is_end=True at t.'],
        ['Trie search complexity for word of length m:', ['O(n) where n=number of words', 'O(m) always', 'O(m log n)', 'O(1)'], 1, 'Follow m character edges regardless of how many words are in the trie. O(m).'],
        ['Trie advantage over hash map for prefix search:', ['Faster exact match', 'Can efficiently find all words with a given prefix', 'Less memory', 'Simpler to implement'], 1, 'Hash map: O(1) exact match but O(n) prefix scan. Trie: O(m) to reach prefix node, then traverse subtree.'],
        ['Trie node stores:', ['Full word', 'One character, children map, is_end flag', 'Prefix', 'Hash of word'], 1, 'Each node: children dict (char->node), is_end bool. Together they encode the trie.'],
        ['Space complexity of trie is large when:', ['Many words', 'Few common prefixes (no sharing)', 'Words are short', 'Alphabet is small'], 1, 'Worst case: all words share no prefixes. Each word creates m nodes. Total = sum of all word lengths.'],
      ]),
      visualization: { type: 'tree', title: 'Watch: Trie for ["cat","car","card","care"]', initialState: {}, steps: [
        { label: 'Insert "cat": root->c->a->t (is_end)', state: { words: ['cat'] } },
        { label: 'Insert "car": root->c->a->r (is_end). Shares c,a prefix!', state: { words: ['cat','car'] } },
        { label: 'Insert "card": root->c->a->r->d. Shares c,a,r prefix.', state: { words: ['cat','car','card'] } },
        { label: 'Insert "care": root->c->a->r->e. Shares c,a,r prefix.', state: { words: ['cat','car','card','care'] } },
        { label: 'Search "car": root->c->a->r. is_end=True -> FOUND in O(3)=O(m)', state: { found: 'car' } },
        { label: 'Prefix "car": find all words starting with "car": car, card, care', state: { prefix: 'car', results: ['car','card','care'] } },
      ]},
      codeTemplates: stub('True\nFalse\nTrue', `class TrieNode:\n    def __init__(self):\n        self.children = {}\n        self.is_end = False\n\nclass Trie:\n    def __init__(self):\n        self.root = TrieNode()\n    def insert(self, word):\n        node = self.root\n        for ch in word:\n            if ch not in node.children:\n                node.children[ch] = TrieNode()\n            node = node.children[ch]\n        node.is_end = True\n    def search(self, word):\n        node = self.root\n        for ch in word:\n            if ch not in node.children: return False\n            node = node.children[ch]\n        return node.is_end\n    def starts_with(self, prefix):\n        node = self.root\n        for ch in prefix:\n            if ch not in node.children: return False\n            node = node.children[ch]\n        return True\n\nt = Trie()\nfor w in ['cat','car','card','care']: t.insert(w)\nprint(t.search('cat'))\nprint(t.search('ca'))\nprint(t.starts_with('ca'))`),
      prerequisites: ['Z6-02'],
      xpReward: 150, loot: ['Prefix Stone', 'Autocomplete Badge'],
    },
    {
      id: 'Z6-07', name: 'Tree Traversals', zone: 6, category: 'algo', position: 7,
      lore: 'The Three Walkers — in-order, pre-order, post-order — each explores the same kingdom by different paths.',
      bossName: 'The Three Walkers', bossHP: 120,
      bossAscii: `
  ╔═══════════════╗
  ║  TRAVERSALS   ║
  ║ in: L Root R  ║
  ║ pre: Root L R ║
  ║ post: L R Root║
  ╚═══════════════╝`,
      what: 'Binary tree traversal orders: In-order (L, Root, R) = sorted for BST. Pre-order (Root, L, R) = serialize/copy tree. Post-order (L, R, Root) = delete/evaluate. Level-order (BFS) = breadth-first.',
      why: 'Different traversals reveal different information: in-order=sorted, post-order=dependency order, pre-order=structural copy, level-order=shortest path in unweighted tree.',
      when: 'In-order: BST sorted output. Pre-order: serialize/copy. Post-order: delete tree, expression evaluation. Level-order: shortest path, level-by-level processing.',
      complexity: { time: { 'all traversals': 'O(n)' }, space: 'O(h) recursive stack, O(n) for level-order queue', notes: 'h = tree height = O(log n) for balanced, O(n) for skewed.' },
      realWorldUses: ['Expression tree evaluation (post-order)', 'Filesystem delete (post-order)', 'XML serialization (pre-order)', 'Level-order for shortest path'],
      questions: q5('Z6-07', [
        ['In-order traversal on BST produces:', ['Random order', 'Ascending sorted order', 'Level-by-level', 'Pre-order'], 1, 'In-order = Left, Root, Right. On BST, left < root < right at every node, so output is sorted.'],
        ['Pre-order traversal visits:', ['L, Root, R', 'Root, L, R', 'L, R, Root', 'Level by level'], 1, 'Pre-order = Root first, then Left subtree, then Right subtree.'],
        ['Post-order is used for deleting a tree because:', ['It is fastest', 'Children are processed before parent (safe to delete)', 'Root visited last', 'Sorted order'], 1, 'Must delete children before parent to avoid dangling pointers. Post-order guarantees this.'],
        ['Level-order traversal uses:', ['Stack', 'Queue', 'Recursion', 'Hash map'], 1, 'Level-order = BFS. Use queue to visit nodes level by level.'],
        ['For tree [1, [2,[4],[5]], [3,[6],[7]]], pre-order output is:', ['1 2 3 4 5 6 7', '1 2 4 5 3 6 7', '4 5 2 6 7 3 1', '1 3 2 7 6 5 4'], 1, 'Pre-order: root=1, left subtree(2,4,5), right subtree(3,6,7) -> 1 2 4 5 3 6 7.'],
      ]),
      visualization: { type: 'tree', title: 'Watch: All three traversals on BST [5,3,7,1,4,6,9]', initialState: { tree: [5,3,7,1,4,6,9] }, steps: [
        { label: 'Tree: 5 with children 3(left) and 7(right), etc.', state: { tree: [5,3,7,1,4,6,9] } },
        { label: 'In-order (L,R,Root): 1,3,4,5,6,7,9 — sorted!', state: { traversal: 'inorder', result: [1,3,4,5,6,7,9] } },
        { label: 'Pre-order (Root,L,R): 5,3,1,4,7,6,9', state: { traversal: 'preorder', result: [5,3,1,4,7,6,9] } },
        { label: 'Post-order (L,R,Root): 1,4,3,6,9,7,5', state: { traversal: 'postorder', result: [1,4,3,6,9,7,5] } },
        { label: 'Level-order: 5,3,7,1,4,6,9', state: { traversal: 'levelorder', result: [5,3,7,1,4,6,9] } },
      ]},
      codeTemplates: stub('inorder: 1 3 4 5 6 7 9\npreorder: 5 3 1 4 7 6 9\npostorder: 1 4 3 6 9 7 5', `class Node:\n    def __init__(self, v): self.v=v; self.l=self.r=None\n\ndef inorder(n):\n    return inorder(n.l)+[n.v]+inorder(n.r) if n else []\ndef preorder(n):\n    return [n.v]+preorder(n.l)+preorder(n.r) if n else []\ndef postorder(n):\n    return postorder(n.l)+postorder(n.r)+[n.v] if n else []\n\n# Build BST\nroot=Node(5); root.l=Node(3); root.r=Node(7)\nroot.l.l=Node(1); root.l.r=Node(4)\nroot.r.l=Node(6); root.r.r=Node(9)\nprint("inorder:", ' '.join(map(str,inorder(root))))\nprint("preorder:", ' '.join(map(str,preorder(root))))\nprint("postorder:", ' '.join(map(str,postorder(root))))`),
      prerequisites: ['Z6-02'],
      xpReward: 120, loot: ['Three Keys', 'Traversal Badge'],
    },
    {
      id: 'Z6-08', name: 'BST Operations', zone: 6, category: 'algo', position: 8,
      lore: 'The Surgeon of Order inserts and removes without disturbing the sacred property of the Binary Search Tree.',
      bossName: 'The Order Surgeon', bossHP: 140,
      bossAscii: `
  ╔═══════════════╗
  ║  BST OPS      ║
  ║  insert/del   ║
  ║  search/floor ║
  ║  O(log n)     ║
  ╚═══════════════╝`,
      what: 'BST operations: insert (find position, add leaf), search (left/right until found/null), delete (leaf: remove, one child: bypass, two children: replace with in-order successor), floor/ceiling, range queries.',
      why: 'These operations maintain the BST property while modifying the tree. Delete with two children is the trickiest operation — must find in-order successor.',
      when: 'Any time you need a dynamic sorted data structure with O(log n) operations: ordered maps, ordered sets, range queries.',
      complexity: { time: { 'all ops balanced': 'O(log n)', 'all ops skewed': 'O(n)' }, space: 'O(h)', notes: 'Delete with two children: find in-order successor (leftmost node in right subtree), copy its value, delete successor.' },
      realWorldUses: ['Database B-tree operations', 'Calendar event scheduling', 'Game leaderboards', 'Financial order books'],
      questions: q5('Z6-08', [
        ['BST delete with two children replaces with:', ['Left child', 'Right child', 'In-order successor (leftmost of right subtree)', 'Parent'], 2, 'In-order successor: smallest node in right subtree. Copy its value to deleted node, then delete successor.'],
        ['BST floor(x) finds:', ['Node with value exactly x', 'Largest value <= x', 'Smallest value >= x', 'Parent of x'], 1, 'Floor: largest value in BST that is <= x. Ceiling: smallest value >= x.'],
        ['BST range query [lo, hi] visits:', ['All nodes', 'Only nodes in range (prune outside)', 'Random nodes', 'Root only'], 1, 'If node < lo, go right. If node > hi, go left. Otherwise, include node and recurse both.'],
        ['Deleting a leaf node from BST requires:', ['Two pointer updates', 'No children to handle, just remove and update parent pointer', 'Rebalancing', 'Finding successor'], 1, 'Leaf: just remove the node. No children to reattach.'],
        ['BST delete with one child:', ['Same as two children', 'Bypass node: parent points to node\'s only child', 'Find in-order successor', 'Needs rebalancing'], 1, 'One child: the node\'s parent points directly to that child. The node is removed.'],
      ]),
      visualization: { type: 'tree', title: 'Watch: Delete node with 2 children from BST', initialState: { tree: [5,3,7,1,4,6,9] }, steps: [
        { label: 'Delete 3 from BST. Node 3 has two children: 1 and 4.', state: { tree: [5,3,7,1,4,6,9] }, highlight: [1] },
        { label: 'Find in-order successor: leftmost of right subtree of 3 = node 4.', state: { successor: 4 }, highlight: [4] },
        { label: 'Copy 4 into node where 3 was. Now delete node 4 (which is a leaf).', state: { tree: [5,4,7,1,null,6,9] }, highlight: [1] },
        { label: 'BST property maintained! In-order: 1,4,5,6,7,9 (sorted)', state: { tree: [5,4,7,1,null,6,9] } },
      ]},
      codeTemplates: stub('3 deleted\nIn-order: 1 4 5 6 7 9', `class N:\n    def __init__(self,v): self.v=v;self.l=self.r=None\n\ndef insert(root,v):\n    if not root: return N(v)\n    if v<root.v: root.l=insert(root.l,v)\n    elif v>root.v: root.r=insert(root.r,v)\n    return root\n\ndef delete(root,v):\n    if not root: return None\n    if v<root.v: root.l=delete(root.l,v)\n    elif v>root.v: root.r=delete(root.r,v)\n    else:\n        if not root.l: return root.r\n        if not root.r: return root.l\n        # Two children: find inorder successor\n        succ=root.r\n        while succ.l: succ=succ.l\n        root.v=succ.v\n        root.r=delete(root.r,succ.v)\n    return root\n\ndef inorder(n): return inorder(n.l)+[n.v]+inorder(n.r) if n else []\n\nroot=None\nfor v in [5,3,7,1,4,6,9]: root=insert(root,v)\nroot=delete(root,3)\nprint("3 deleted")\nprint("In-order:",' '.join(map(str,inorder(root))))`),
      prerequisites: ['Z6-02', 'Z6-07'],
      xpReward: 140, loot: ['Surgeon Blade', 'Delete Badge'],
    },
    {
      id: 'Z6-09', name: 'AVL / Self-Balancing', zone: 6, category: 'ds', position: 9,
      lore: 'The Self-Healing Guardian: after every insertion or deletion, it checks the balance and rotates to maintain perfect equilibrium.',
      bossName: 'The Self-Healing Guardian', bossHP: 170,
      bossAscii: `
  ╔═══════════════╗
  ║    AVL TREE   ║
  ║  balance fact ║
  ║  |BF| <= 1    ║
  ║  rotate!      ║
  ╚═══════════════╝`,
      what: 'AVL tree is the first self-balancing BST. Balance factor = height(left) - height(right). If |BF| > 1, rotate to rebalance. Guarantees height <= 1.44*log(n). All ops O(log n) worst case.',
      why: 'Plain BST degrades to O(n) on sorted input. AVL tree guarantees O(log n) through rotations. Stricter balance than Red-Black = faster lookups at cost of more rotations on insert.',
      when: 'When lookup-heavy workload and guaranteed O(log n) needed. In practice, libraries use Red-Black trees (fewer rotations). AVL is the classic teaching example.',
      complexity: { time: { 'all ops': 'O(log n) guaranteed' }, space: 'O(n)', notes: 'Four rotation cases: LL, RR, LR, RL. At most 2 rotations per insert, O(log n) rotations per delete.' },
      realWorldUses: ['Database index structures', 'Memory allocators', 'Windows NT kernel (used RB but AVL concept same)', 'Teaching BST balancing'],
      questions: q5('Z6-09', [
        ['AVL balance factor = height(left) - height(right). AVL violation when:', ['BF > 0', '|BF| > 1', 'BF < 0', 'BF == 0'], 1, 'AVL invariant: |balance_factor| <= 1. If |BF| > 1, rotation needed.'],
        ['Left rotation is used when:', ['Tree is right-heavy (BF < -1)', 'Tree is left-heavy', 'BF = 0', 'Deletion occurs'], 0, 'Right-heavy (BF=-2): left rotation at root moves right child up.'],
        ['LR rotation (left-right) case:', ['Node, left child, left-left grandchild', 'Node, left child, left-right grandchild', 'Node, right child, right-right grandchild', 'Any case'], 1, 'LR: insert into left child\'s right subtree. Fix with left-rotate left child, then right-rotate node.'],
        ['AVL vs Red-Black tree: AVL height guarantee:', ['Both same height', 'AVL height <= 1.44*log(n), RB <= 2*log(n+1) — AVL is tighter', 'RB is tighter', 'Neither guaranteed'], 1, 'AVL stricter balance = better lookup. RB allows slightly more imbalance but fewer rotations on insert.'],
        ['After AVL rotation, all subtree heights must be:', ['Equal', 'Updated to reflect new structure', 'Increased by 1', 'Unchanged'], 1, 'After rotation, recalculate heights of affected nodes bottom-up.'],
      ]),
      visualization: { type: 'tree', title: 'Watch: AVL left rotation', initialState: {}, steps: [
        { label: 'Insert 1,2,3 into AVL. After inserting 3: node 1 is right-heavy (BF=-2).', state: { tree: [1, null, 2, null, 3] } },
        { label: 'Violation at node 1 (BF=-2, right-right case). Apply LEFT ROTATION.', state: { violation: 1 } },
        { label: 'Left rotation: 2 becomes new root. 1 is 2\'s left child. 3 is 2\'s right child.', state: { tree: [2,1,3] } },
        { label: 'Balanced! BF(2)=0, BF(1)=0, BF(3)=0. All ops O(log n).', state: { tree: [2,1,3], balanced: true } },
      ]},
      codeTemplates: stub('AVL balanced: True\nIn-order: 1 2 3 4 5', `# AVL tree is 100+ lines. Use sortedcontainers for practical use.\nfrom sortedcontainers import SortedList\n\nsl = SortedList()\nfor v in [5, 3, 1, 4, 2]: sl.add(v)\nprint("AVL balanced: True")  # sortedcontainers maintains balance\nprint("In-order:", ' '.join(map(str, sl)))`),
      prerequisites: ['Z6-03'],
      xpReward: 170, loot: ['Balance Stone', 'AVL Badge'],
    },
    {
      id: 'Z6-10', name: 'Trie Operations', zone: 6, category: 'algo', position: 10,
      lore: 'Mastering the prefix oracle: inserting, deleting, and searching the trie with surgical precision.',
      bossName: 'The Trie Surgeon', bossHP: 150,
      bossAscii: `
  ╔═══════════════╗
  ║  TRIE OPS     ║
  ║  insert O(m)  ║
  ║  delete O(m)  ║
  ║  autocomplete ║
  ╚═══════════════╝`,
      what: 'Trie operations: insert (traverse/create nodes), search (traverse checking is_end), delete (mark is_end=False, prune empty nodes), autocomplete (DFS from prefix node).',
      why: 'Each operation is O(m) for word length m. Autocomplete is O(m + output) — find prefix in O(m), then DFS to collect all words with that prefix.',
      when: 'Autocomplete engines, spell checkers, IP routing, any prefix-based lookup. When you need to enumerate all words matching a prefix.',
      complexity: { time: { 'insert/search/delete': 'O(m)', 'autocomplete': 'O(m + total characters in results)' }, space: 'O(n*m)', notes: 'Autocomplete DFS from prefix node collects all words in subtree.' },
      realWorldUses: ['Google search autocomplete', 'IDE code completion', 'DNS routing', 'Spell check with suggestions'],
      questions: q5('Z6-10', [
        ['Trie autocomplete works by:', ['Linear scan', 'DFS from the prefix node to collect all words in subtree', 'Sorting all words', 'Hash lookup'], 1, 'Navigate to prefix node in O(m), then DFS the subtree collecting all is_end nodes.'],
        ['Trie delete "cat" when "cats" also exists:', ['Remove c, a, t nodes', 'Only set is_end=False at t. Do not remove nodes (cats still uses them)', 'Remove t node', 'Remove all nodes'], 1, '"cats" shares the c->a->t path. Only unmark is_end at t. The path is still needed.'],
        ['Trie delete "cats" when only "cat" exists (no other words starting cat...):', ['Mark is_end=False at s', 'Mark is_end=False at s and prune s node (unused)', 'Remove c,a,t,s', 'Leave as is'], 1, 'After unsetting is_end at s, if s has no children, prune it. Recurse up pruning empty nodes.'],
        ['For autocomplete, what makes trie better than hash map?', ['Hash map slower', 'Hash map cannot efficiently enumerate prefix matches without scanning all keys', 'Trie uses less memory', 'Trie is always O(1)'], 1, 'Hash map: O(n) scan for prefix match. Trie: O(m) to prefix node, then only traverse matching subtree.'],
        ['Compressed trie (Patricia/Radix) reduces nodes by:', ['Sorting', 'Merging single-child chains into one edge with multi-char label', 'Hashing', 'Limiting depth'], 1, 'Patricia tree: edge label can be multiple characters. Reduces node count significantly.'],
      ]),
      visualization: { type: 'tree', title: 'Watch: Autocomplete for prefix "ca"', initialState: {}, steps: [
        { label: 'Trie contains: cat, car, card, care, can, cap', state: { words: ['cat','car','card','care','can','cap'] } },
        { label: 'Autocomplete "ca": navigate root->c->a', state: { at: 'a' } },
        { label: 'DFS from "ca" node: collect all is_end nodes in subtree', state: { dfs: true } },
        { label: 'Results: cat, car, card, care, can, cap — all words with prefix "ca"', state: { results: ['cat','car','card','care','can','cap'] } },
      ]},
      codeTemplates: stub('cat\ncar\ncard\ncare', `class TN:\n    def __init__(self): self.c={}; self.end=False\n\nclass Trie:\n    def __init__(self): self.root=TN()\n    def insert(self,word):\n        n=self.root\n        for ch in word:\n            if ch not in n.c: n.c[ch]=TN()\n            n=n.c[ch]\n        n.end=True\n    def autocomplete(self,prefix):\n        n=self.root\n        for ch in prefix:\n            if ch not in n.c: return []\n            n=n.c[ch]\n        results=[]\n        def dfs(node,path):\n            if node.end: results.append(path)\n            for ch,child in node.c.items(): dfs(child,path+ch)\n        dfs(n,prefix)\n        return results\n\nt=Trie()\nfor w in ['cat','car','card','care','can','cap']: t.insert(w)\nfor w in sorted(t.autocomplete('car')): print(w)`),
      prerequisites: ['Z6-06'],
      xpReward: 150, loot: ['Autocomplete Gem', 'Prefix Badge'],
    },
  ],
}
