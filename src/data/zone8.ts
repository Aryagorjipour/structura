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
  qs.map(([text, options, correct, explanation], i) => ({ id: `${id}-Q${i+1}`, text, options, correct, explanation, damage: 24 }))

export const zone8: Zone = {
  id: 8,
  name: 'Graph Realm',
  subtitle: 'Connected Worlds',
  theme: 'rose',
  description: 'An interconnected realm of nodes and edges, where paths can be found, shortest routes calculated, and worlds connected.',
  bosses: [
    {
      id: 'Z8-01', name: 'Graph Basics', zone: 8, category: 'ds', position: 1,
      lore: 'The Connection Weaver binds all things with edges, creating a world where every node may reach every other.',
      bossName: 'The Connection Weaver', bossHP: 110,
      bossAscii: `
  ╔═══════════════╗
  ║    GRAPH      ║
  ║ (A)---(B)     ║
  ║  |  X  |     ║
  ║ (C)---(D)     ║
  ╚═══════════════╝`,
      what: 'A graph G=(V,E) has vertices (nodes) and edges (connections). Types: directed/undirected, weighted/unweighted, cyclic/acyclic. Representations: adjacency list (sparse), adjacency matrix (dense).',
      why: 'Models relationships: social networks, road maps, web links, dependencies, circuits. Most real-world optimization problems are graph problems.',
      when: 'Any relationship between entities: social networks, shortest paths, dependency resolution, network flow, game maps.',
      complexity: { time: { 'adj list space': 'O(V+E)', 'adj matrix space': 'O(V^2)', 'edge check matrix': 'O(1)', 'edge check list': 'O(degree)' }, space: 'O(V+E) for adj list', notes: 'Sparse graph: E << V^2, use adjacency list. Dense: E ≈ V^2, use matrix.' },
      realWorldUses: ['Social networks (V=users, E=friendships)', 'Road maps (V=intersections, E=roads)', 'Web (V=pages, E=links)', 'Dependency graphs (npm, Maven)'],
      questions: q5('Z8-01', [
        ['Adjacency list is preferred for sparse graphs because:', ['It is always faster', 'O(V+E) space vs O(V^2) for matrix', 'Easier to implement', 'Sorted order'], 1, 'If E << V^2, adjacency matrix wastes space. List uses only O(V+E).'],
        ['Directed graph vs undirected: key difference is:', ['Size', 'Directed edges go one way; undirected edges go both ways', 'Directed is slower', 'No difference in storage'], 1, 'Directed: edge (u,v) from u to v only. Undirected: (u,v) same as (v,u).'],
        ['A DAG (Directed Acyclic Graph) has no:', ['Directed edges', 'Cycles (no path from node back to itself)', 'Weighted edges', 'Vertices'], 1, 'DAG: directed, but no cycles. Used for dependencies, scheduling, expressions.'],
        ['Connected graph means:', ['All nodes have equal degree', 'There exists a path between every pair of vertices', 'Graph is sorted', 'No cycles'], 1, 'Connected: every vertex reachable from every other vertex. Disconnected graph has isolated components.'],
        ['Graph with V vertices and E=V-1 edges that is connected is a:', ['Complete graph', 'Tree', 'Cycle', 'Sparse graph'], 1, 'Any connected graph with V-1 edges is a tree. Minimum edges to connect V nodes.'],
      ]),
      visualization: { type: 'graph', title: 'Watch: Graph representations', initialState: { nodes: ['A','B','C','D'], edges: [['A','B'],['A','C'],['B','D'],['C','D']] }, steps: [
        { label: 'Graph: A-B, A-C, B-D, C-D. 4 nodes, 4 edges.', state: { nodes: ['A','B','C','D'], edges: [['A','B'],['A','C'],['B','D'],['C','D']] } },
        { label: 'Adjacency list: A:[B,C], B:[A,D], C:[A,D], D:[B,C]', state: { adjList: { A: ['B','C'], B: ['A','D'], C: ['A','D'], D: ['B','C'] } } },
        { label: 'Adjacency matrix: 4x4 grid, 1 where edge exists', state: { matrix: [[0,1,1,0],[1,0,0,1],[1,0,0,1],[0,1,1,0]] } },
      ]},
      codeTemplates: stub("Graph: {'A': ['B', 'C'], 'B': ['A', 'D'], 'C': ['A', 'D'], 'D': ['B', 'C']}", `from collections import defaultdict\n\ngraph = defaultdict(list)\nedges = [('A','B'),('A','C'),('B','D'),('C','D')]\nfor u, v in edges:\n    graph[u].append(v)\n    graph[v].append(u)  # undirected\n\nprint("Graph:", dict(graph))`, ['defaultdict(list) for adjacency list', 'Add both directions for undirected']),
      prerequisites: ['Z4-03'],
      xpReward: 110, loot: ['Connection Rune', 'Graph Badge'],
      sideQuests: [
        {
          id: 'sq-zone8-boss1-speed',
          title: 'Graph Sprinter',
          description: 'Complete the entire boss fight in under 90 seconds',
          condition: 'speed_run' as const,
          reward: { xp: 180, items: ['Scroll of Haste'] },
        },
      ],
    },
    {
      id: 'Z8-02', name: 'Union-Find', zone: 8, category: 'ds', position: 2,
      lore: 'The Alliance Tracker: finds whether two warriors belong to the same clan, and merges clans in near-constant time.',
      bossName: 'The Alliance Tracker', bossHP: 140,
      bossAscii: `
  ╔═══════════════╗
  ║  UNION-FIND   ║
  ║  DSU / UF     ║
  ║ find(x)->root ║
  ║  O(α) amort   ║
  ╚═══════════════╝`,
      what: 'Union-Find (Disjoint Set Union) tracks which elements belong to the same connected component. Operations: find(x) returns root/representative, union(x,y) merges components. O(α(n)) amortized with path compression + union by rank.',
      why: 'O(α(n)) ≈ O(1) practically (α is inverse Ackermann, grows < 5 for any practical n). Used in Kruskal\'s MST, detecting cycles, connected components, network connectivity.',
      when: 'Dynamic connectivity queries, Kruskal\'s MST, cycle detection in undirected graphs, grouping problems, friends-of-friends.',
      complexity: { time: { 'find (with path compression)': 'O(α(n)) ≈ O(1)', 'union (with rank)': 'O(α(n)) ≈ O(1)' }, space: 'O(n)', notes: 'α(n) = inverse Ackermann function. For all practical n (< 10^80), α(n) <= 4.' },
      realWorldUses: ["Kruskal's MST", 'Dynamic connectivity', 'Image segmentation', 'Social network friend groups', 'Compiler variable aliasing'],
      questions: q5('Z8-02', [
        ['Union-Find find(x) with path compression returns:', ['x itself', 'Root representative of x\'s component', 'Parent of x', 'Rank of x'], 1, 'find() follows parent pointers to root. Path compression flattens the tree for future queries.'],
        ['Path compression in find(x) works by:', ['Sorting elements', 'Making every node on path point directly to root', 'Deleting middle nodes', 'Merging trees'], 1, 'During find(): every node visited is pointed directly to root. Future finds are O(1).'],
        ['Union by rank merges trees by:', ['Alphabetical order', 'Attaching smaller-rank tree under larger-rank tree', 'Random order', 'Size of tree'], 1, 'Rank ≈ tree height. Smaller tree attached to larger to minimize depth growth.'],
        ['Kruskal\'s MST uses Union-Find to:', ['Sort edges', 'Check if adding edge creates cycle (same component = cycle)', 'Find shortest path', 'Count nodes'], 1, 'For each edge (u,v): if find(u) != find(v), add edge (no cycle). Then union(u,v).'],
        ['Union-Find cannot efficiently support:', ['Adding elements', 'Splitting components (reverse of union)', 'Finding component size', 'Merging components'], 1, 'Union is irreversible in standard UF. To support undo/split, need persistent or link-cut trees.'],
      ]),
      visualization: { type: 'generic', title: 'Watch: Union-Find with path compression', initialState: {}, steps: [
        { label: 'Init: parent=[0,1,2,3,4,5]. Each is own root.', state: { parent: [0,1,2,3,4,5] } },
        { label: 'union(0,1): rank same, make 0 parent of 1. parent[1]=0.', state: { parent: [0,0,2,3,4,5] } },
        { label: 'union(2,3): parent[3]=2. union(0,2): 0 becomes parent of 2.', state: { parent: [0,0,0,2,4,5] } },
        { label: 'find(3): 3->parent[3]=2->parent[2]=0. PATH COMPRESS: parent[3]=0', state: { parent: [0,0,0,0,4,5] } },
        { label: 'find(1): 1->parent[1]=0. Already direct. O(1)!', state: { parent: [0,0,0,0,4,5] } },
      ]},
      codeTemplates: stub('same: True\nsame: False', `class UnionFind:\n    def __init__(self, n):\n        self.parent = list(range(n))\n        self.rank = [0] * n\n    def find(self, x):\n        if self.parent[x] != x:\n            self.parent[x] = self.find(self.parent[x])  # path compression\n        return self.parent[x]\n    def union(self, x, y):\n        px, py = self.find(x), self.find(y)\n        if px == py: return False\n        if self.rank[px] < self.rank[py]: px, py = py, px\n        self.parent[py] = px\n        if self.rank[px] == self.rank[py]: self.rank[px] += 1\n        return True\n\nuf = UnionFind(6)\nuf.union(0, 1); uf.union(1, 2); uf.union(3, 4)\nprint("same:", uf.find(0) == uf.find(2))  # True: 0-1-2 connected\nprint("same:", uf.find(0) == uf.find(3))  # False: different components`, ['self.parent[x] = self.find(self.parent[x]) for path compression', 'Union by rank: attach smaller rank to larger']),
      prerequisites: ['Z8-01'],
      xpReward: 140, loot: ['Alliance Token', 'DSU Badge'],
    },
    {
      id: 'Z8-03', name: 'BFS', zone: 8, category: 'algo', position: 3,
      lore: 'The Breadth Seeker fans out in all directions simultaneously, finding shortest paths in unweighted realms.',
      bossName: 'The Breadth Seeker', bossHP: 130,
      bossAscii: `
  ╔═══════════════╗
  ║      BFS      ║
  ║   src=0       ║
  ║ lvl1: 1,2     ║
  ║ lvl2: 3,4,5   ║
  ╚═══════════════╝`,
      what: 'BFS explores graph level by level using a queue. Visits all neighbors at distance d before distance d+1. Finds shortest path in unweighted graphs. O(V+E).',
      why: 'Shortest path in unweighted graph, level-order traversal, checking bipartiteness, finding connected components.',
      when: 'Shortest path (unweighted), any level-by-level exploration, minimum steps to reach target, checking bipartite.',
      complexity: { time: { 'traversal': 'O(V+E)' }, space: 'O(V) for queue + visited', notes: 'BFS with distance tracking gives shortest path in O(V+E). For weighted: use Dijkstra.' },
      realWorldUses: ['Shortest path in unweighted graph', 'Social network degrees of separation', 'Web crawler', 'GPS routing (unweighted)', 'Network broadcast'],
      questions: q5('Z8-03', [
        ['BFS finds shortest path because:', ['It is faster', 'It explores by distance level — first time reaching node = shortest', 'It uses a stack', 'It sorts edges'], 1, 'BFS visits nodes in order of distance from source. First visit = shortest path.'],
        ['BFS uses a queue. This ensures:', ['DFS behavior', 'FIFO — nodes explored in order of discovery (= by distance)', 'Random order', 'Sorted order'], 1, 'Queue = FIFO. Nodes added in order of discovery maintain level-order exploration.'],
        ['BFS time complexity O(V+E) because:', ['It is slow', 'Each vertex dequeued once (O(V)), each edge examined once (O(E))', 'V and E are small', 'Queue is fast'], 1, 'Each node visited exactly once. Each edge examined at most twice (undirected). Total O(V+E).'],
        ['BFS vs DFS for shortest path in unweighted graph:', ['DFS is better', 'BFS guaranteed shortest; DFS may find longer path first', 'Same result', 'DFS is faster'], 1, 'BFS explores level by level = shortest path. DFS goes deep and may find a longer path first.'],
        ['For weighted graphs, BFS gives shortest path only when:', ['All weights are 1', 'Edges have equal weight', 'Graph is connected', 'Graph is a tree'], 0, 'BFS counts hops, not weights. Equal weights = same as unweighted. Use Dijkstra for general weights.'],
      ]),
      visualization: { type: 'graph', title: 'Watch: BFS from node 0', initialState: { nodes: [0,1,2,3,4,5], edges: [[0,1],[0,2],[1,3],[1,4],[2,5]] }, steps: [
        { label: 'BFS from 0. Queue: [0]. Visited: {0}', state: { queue: [0], visited: [0] } },
        { label: 'Dequeue 0. Enqueue neighbors 1,2. Queue: [1,2]. Visited: {0,1,2}', state: { queue: [1,2], visited: [0,1,2] }, highlight: [0] },
        { label: 'Dequeue 1. Enqueue neighbors 3,4. Queue: [2,3,4]. Visited: {0,1,2,3,4}', state: { queue: [2,3,4], visited: [0,1,2,3,4] }, highlight: [1] },
        { label: 'Dequeue 2. Enqueue neighbor 5. Queue: [3,4,5]. Visited: {0,1,2,3,4,5}', state: { queue: [3,4,5], visited: [0,1,2,3,4,5] }, highlight: [2] },
        { label: 'Dequeue 3,4,5. No new neighbors. BFS complete.', state: { visited: [0,1,2,3,4,5] } },
      ]},
      codeTemplates: stub('BFS: [0, 1, 2, 3, 4, 5]\nShortest path 0->5: 2', `from collections import deque\n\ndef bfs(graph, start):\n    visited = {start}\n    queue = deque([start])\n    order = []\n    while queue:\n        node = queue.popleft()\n        order.append(node)\n        for neighbor in graph[node]:\n            if neighbor not in visited:\n                visited.add(neighbor)\n                queue.append(neighbor)\n    return order\n\ndef shortest_path(graph, start, end):\n    visited = {start}\n    queue = deque([(start, 0)])\n    while queue:\n        node, dist = queue.popleft()\n        if node == end: return dist\n        for neighbor in graph[node]:\n            if neighbor not in visited:\n                visited.add(neighbor)\n                queue.append((neighbor, dist + 1))\n    return -1\n\ngraph = {0:[1,2], 1:[0,3,4], 2:[0,5], 3:[1], 4:[1], 5:[2]}\nprint("BFS:", bfs(graph, 0))\nprint("Shortest path 0->5:", shortest_path(graph, 0, 5))`, ['deque for O(1) popleft()', 'BFS tracks (node, distance) for shortest path']),
      prerequisites: ['Z8-01'],
      xpReward: 130, loot: ['Wave Stone', 'BFS Badge'],
    },
    {
      id: 'Z8-04', name: 'DFS', zone: 8, category: 'algo', position: 4,
      lore: 'The Depth Diver plunges into the deepest chambers before retreating, exploring every crevice before considering a neighbor.',
      bossName: 'The Depth Diver', bossHP: 130,
      bossAscii: `
  ╔═══════════════╗
  ║      DFS      ║
  ║  src -> deep  ║
  ║  backtrack    ║
  ║ cycle detect! ║
  ╚═══════════════╝`,
      what: 'DFS explores graph by going as deep as possible before backtracking. Uses stack (implicit via recursion or explicit). Useful for cycle detection, topological sort, connected components, path finding.',
      why: 'Explores entire paths. Detects cycles. Foundation for topological sort, SCC (Strongly Connected Components), articulation points.',
      when: 'Cycle detection, topological sort, finding all paths, maze solving, SCC, checking connectivity.',
      complexity: { time: { 'traversal': 'O(V+E)' }, space: 'O(V) call stack', notes: 'Iterative DFS uses explicit stack. Recursive DFS uses call stack (risk of stack overflow for large graphs).' },
      realWorldUses: ['Cycle detection in dependency graphs', 'Topological sort', 'Maze solving', 'Finding SCCs', 'Web crawling (depth-first)'],
      questions: q5('Z8-04', [
        ['DFS uses a stack (recursive or explicit) because:', ['Stacks are fast', 'LIFO explores depth-first: last discovered = first explored', 'BFS is wrong', 'Memory efficiency'], 1, 'LIFO = go deep before going wide. Last added neighbor explored first.'],
        ['DFS cycle detection in directed graph uses:', ['Two queues', 'Visited set + recursion stack (gray/white/black coloring)', 'Sorting', 'Union-Find'], 1, 'Gray (in stack) + white (unvisited) + black (done). Encountering gray node = back edge = cycle.'],
        ['DFS pre-order vs post-order:', ['Same thing', 'Pre: process node before children. Post: process after children (used for toposort).', 'Post is always better', 'No difference in graphs'], 1, 'Post-order DFS: all children of node processed before node itself. Reverse of post-order = topological sort.'],
        ['DFS on undirected graph finds connected components by:', ['Sorting', 'DFS from each unvisited node counts components', 'BFS', 'Union-Find only'], 1, 'Each DFS call visits one component. Unvisited nodes after a DFS = new component.'],
        ['Recursive DFS risk for large graphs:', ['Too slow', 'Stack overflow (call stack depth = graph depth)', 'Infinite loop', 'Memory error'], 1, 'Recursion depth = O(V) in worst case. Python default limit 1000. Use iterative DFS with explicit stack.'],
      ]),
      visualization: { type: 'graph', title: 'Watch: DFS from node 0', initialState: { nodes: [0,1,2,3,4,5] }, steps: [
        { label: 'DFS from 0. Visit 0, explore neighbor 1.', state: { visited: [0], stack: [0] }, highlight: [0] },
        { label: 'Visit 1, explore neighbor 3.', state: { visited: [0,1], stack: [0,1] }, highlight: [1] },
        { label: 'Visit 3. No unvisited neighbors. BACKTRACK to 1.', state: { visited: [0,1,3], stack: [0,1] }, highlight: [3] },
        { label: 'From 1: explore neighbor 4. Visit 4. Backtrack to 0.', state: { visited: [0,1,3,4], stack: [0] }, highlight: [4] },
        { label: 'From 0: explore 2. Visit 2, then 5. Complete.', state: { visited: [0,1,2,3,4,5], stack: [] } },
      ]},
      codeTemplates: stub('DFS: [0, 1, 3, 4, 2, 5]', `def dfs(graph, start, visited=None):\n    if visited is None: visited = set()\n    visited.add(start)\n    result = [start]\n    for neighbor in graph[start]:\n        if neighbor not in visited:\n            result.extend(dfs(graph, neighbor, visited))\n    return result\n\ngraph = {0:[1,2], 1:[0,3,4], 2:[0,5], 3:[1], 4:[1], 5:[2]}\nprint("DFS:", dfs(graph, 0))`, ['visited set prevents revisiting', 'Recursive DFS follows one path deep before backtracking']),
      prerequisites: ['Z8-01'],
      xpReward: 130, loot: ['Deep Torch', 'DFS Badge'],
    },
    {
      id: 'Z8-05', name: 'Topological Sort', zone: 8, category: 'algo', position: 5,
      lore: 'The Dependency Oracle arranges all tasks so no task begins before its prerequisites are complete.',
      bossName: 'The Dependency Oracle', bossHP: 140,
      bossAscii: `
  ╔═══════════════╗
  ║  TOPO SORT    ║
  ║  A->B->C      ║
  ║  A->D->C      ║
  ║  A,D,B,C OK   ║
  ╚═══════════════╝`,
      what: 'Topological sort orders nodes in a DAG so all directed edges go from earlier to later in the order. Two algorithms: DFS post-order (Tarjan), Kahn\'s BFS with in-degrees.',
      why: 'Build systems, package managers, course prerequisites, spreadsheet calculation order — all need valid ordering where dependencies come first.',
      when: 'Any dependency ordering problem on a DAG. Compile order, task scheduling, spreadsheet recalculation, class linearization.',
      complexity: { time: { 'DFS or Kahn\'s': 'O(V+E)' }, space: 'O(V)', notes: 'If graph has cycle: topological sort impossible. Kahn\'s can detect this (remaining nodes in queue = 0 if cycle).' },
      realWorldUses: ['GNU Make build system', 'npm/pip package dependency resolution', 'Course prerequisite ordering', 'Spreadsheet cell dependencies', 'Task scheduling'],
      questions: q5('Z8-05', [
        ['Topological sort only works on:', ['Any graph', 'DAGs (Directed Acyclic Graphs)', 'Undirected graphs', 'Weighted graphs'], 1, 'Cycles make topological ordering impossible: if A->B->A, which comes first?'],
        ['Kahn\'s algorithm uses in-degrees because:', ['Efficiency', 'Nodes with in-degree=0 have no prerequisites — can be processed first', 'Sorting', 'Memory'], 1, 'In-degree=0 means nothing must come before this node. Safe to schedule first.'],
        ['DFS-based topological sort uses:', ['Forward traversal', 'Reverse post-order: add to result AFTER all descendants processed', 'BFS queue', 'Pre-order'], 1, 'Post-order DFS: node added after all children. Reverse of this = topological order.'],
        ['If topological sort detects a cycle, it means:', ['Normal condition', 'Invalid DAG — dependency ordering is impossible', 'Need more nodes', 'Sort failed'], 1, 'Cycle = circular dependency. In Kahn\'s: if output has fewer than V nodes, cycle exists.'],
        ['Course prerequisite problem: take CS101 before CS201. Topological sort gives:', ['Alphabetical order', 'Valid course sequence where prerequisites come first', 'Random order', 'Reverse order'], 1, 'Topo sort ensures CS101 (no prereqs) comes before CS201 (requires CS101).'],
      ]),
      visualization: { type: 'graph', title: 'Watch: Kahn\'s algorithm', initialState: {}, steps: [
        { label: 'DAG: A->B, A->C, B->D, C->D. In-degrees: A=0,B=1,C=1,D=2', state: { indegree: { A:0,B:1,C:1,D:2 } } },
        { label: 'Queue: [A] (in-degree=0). Dequeue A, output A.', state: { queue: ['A'], output: ['A'] } },
        { label: 'Decrement B,C in-degrees. B=0, C=0. Enqueue B,C.', state: { queue: ['B','C'], output: ['A'], indegree: { B:0,C:0,D:2 } } },
        { label: 'Dequeue B, output B. Decrement D: D=1.', state: { queue: ['C'], output: ['A','B'], indegree: { D:1 } } },
        { label: 'Dequeue C, output C. Decrement D: D=0. Enqueue D.', state: { queue: ['D'], output: ['A','B','C'] } },
        { label: 'Dequeue D, output D. Done! Order: A,B,C,D', state: { output: ['A','B','C','D'] } },
      ]},
      codeTemplates: stub('Topo order: [0, 1, 2, 3]', `from collections import deque\n\ndef kahn_topo_sort(graph, n):\n    in_degree = [0] * n\n    for u in range(n):\n        for v in graph[u]:\n            in_degree[v] += 1\n    queue = deque([u for u in range(n) if in_degree[u] == 0])\n    result = []\n    while queue:\n        u = queue.popleft()\n        result.append(u)\n        for v in graph[u]:\n            in_degree[v] -= 1\n            if in_degree[v] == 0:\n                queue.append(v)\n    return result if len(result) == n else []  # empty = cycle\n\ngraph = {0:[1,2], 1:[3], 2:[3], 3:[]}\nprint("Topo order:", kahn_topo_sort(graph, 4))`, ['Compute in-degrees first', 'Start from nodes with in-degree=0', 'Decrement neighbors, enqueue when 0']),
      prerequisites: ['Z8-04'],
      xpReward: 140, loot: ['Order Scroll', 'DAG Badge'],
    },
    {
      id: 'Z8-06', name: "Dijkstra's Algorithm", zone: 8, category: 'algo', position: 6,
      lore: 'The Shortest Path Sage always expands the cheapest known frontier, never revisiting what has been settled.',
      bossName: 'The Shortest Path Sage', bossHP: 160,
      bossAscii: `
  ╔═══════════════╗
  ║  DIJKSTRA     ║
  ║  d[src]=0     ║
  ║  greedy min   ║
  ║  O((V+E)logV) ║
  ╚═══════════════╝`,
      what: "Dijkstra's finds shortest paths from source to all vertices in weighted graph with non-negative weights. Greedy: always process unvisited vertex with minimum known distance. Uses priority queue.",
      why: 'GPS navigation, network routing (OSPF), social network shortest connections. Standard algorithm for shortest path in non-negative weighted graphs.',
      when: 'Weighted graph, non-negative weights, single source. For negative weights: Bellman-Ford. For unweighted: BFS.',
      complexity: { time: { 'with binary heap': 'O((V+E) log V)', 'with Fibonacci heap': 'O(E + V log V)' }, space: 'O(V)', notes: 'Dijkstra fails with negative edge weights. A* extends Dijkstra with heuristic for faster target-specific search.' },
      realWorldUses: ['GPS/Google Maps routing', 'Network OSPF protocol', 'Airline route planning', 'Game pathfinding'],
      questions: q5('Z8-06', [
        ["Dijkstra's key greedy choice:", ['Random node', 'Always process unvisited node with minimum known distance', 'Closest to target', 'Alphabetical'], 1, 'Greedy invariant: once a node is "settled" (min distance finalized), it is never updated again.'],
        ["Dijkstra's fails with negative edges because:", ['It is slow', 'A settled node might need to be updated when negative edge found later', 'No reason', 'Queue breaks'], 1, 'Negative edge can create a shorter path to an already-settled node. Dijkstra\'s greedy assumption breaks.'],
        ["Dijkstra's uses priority queue (min-heap) to:", ['Sort edges', 'Always efficiently find minimum distance unvisited vertex in O(log V)', 'Store graph', 'Count paths'], 1, 'PQ gives O(log V) extract-min. Without PQ: O(V^2) for V vertex scans.'],
        ["Dijkstra's relaxation step: for edge (u,v,w), update when:", ['Always', 'd[u]+w < d[v]: update d[v] to shorter path via u', 'w < d[v]', 'u is visited'], 1, 'Relaxation: if going through u gives shorter path to v, update d[v] = d[u] + w.'],
        ["A* vs Dijkstra's difference:", ['A* is wrong', 'A* adds heuristic h(v) to guide towards target (D*=0)', 'A* is slower', 'Same algorithm'], 1, 'A* uses f(v) = g(v) + h(v). g=distance from source, h=heuristic to target. Explores less.'],
      ]),
      visualization: { type: 'graph', title: "Watch: Dijkstra's on weighted graph", initialState: { nodes: [0,1,2,3], edges: [[0,1,4],[0,2,1],[2,1,2],[1,3,1],[2,3,5]] }, steps: [
        { label: 'Weighted graph. d=[0,∞,∞,∞]. PQ: [(0,0)]', state: { dist: [0,'inf','inf','inf'], pq: [[0,0]] } },
        { label: 'Pop (0,0). Relax: d[1]=4, d[2]=1. PQ: [(1,2),(4,1)]', state: { dist: [0,4,1,'inf'], pq: [[1,2],[4,1]] } },
        { label: 'Pop (1,2). Relax: d[1]=min(4,1+2)=3, d[3]=1+5=6. PQ: [(3,1),(4,1 old),(6,3)]', state: { dist: [0,3,1,6], pq: [[3,1],[6,3]] } },
        { label: 'Pop (3,1). Relax: d[3]=min(6,3+1)=4. PQ: [(4,3),(6,3 old)]', state: { dist: [0,3,1,4], pq: [[4,3]] } },
        { label: 'Pop (4,3). Settled. Final: d=[0,3,1,4]. Shortest paths found!', state: { dist: [0,3,1,4] } },
      ]},
      codeTemplates: stub('Shortest distances: {0: 0, 1: 3, 2: 1, 3: 4}', `import heapq\n\ndef dijkstra(graph, src):\n    dist = {node: float('inf') for node in graph}\n    dist[src] = 0\n    pq = [(0, src)]\n    while pq:\n        d, u = heapq.heappop(pq)\n        if d > dist[u]: continue  # stale entry\n        for v, w in graph[u]:\n            if dist[u] + w < dist[v]:\n                dist[v] = dist[u] + w\n                heapq.heappush(pq, (dist[v], v))\n    return dist\n\ngraph = {0:[(1,4),(2,1)], 1:[(3,1)], 2:[(1,2),(3,5)], 3:[]}\nprint("Shortest distances:", dijkstra(graph, 0))`, ['heapq for priority queue', 'if d > dist[u]: continue skips stale entries', 'Relax: dist[u]+w < dist[v]']),
      prerequisites: ['Z8-03', 'Z6-05'],
      xpReward: 160, loot: ['Path Finder', "Dijkstra Badge"],
    },
    {
      id: 'Z8-07', name: 'Bellman-Ford', zone: 8, category: 'algo', position: 7,
      lore: 'The Negative Weight Tamer relaxes all edges V-1 times, unafraid of debt and negative cycles.',
      bossName: 'The Negative Weight Tamer', bossHP: 140,
      bossAscii: `
  ╔═══════════════╗
  ║  BELLMAN-FORD ║
  ║  V-1 rounds   ║
  ║  neg weights  ║
  ║  O(VE)        ║
  ╚═══════════════╝`,
      what: "Bellman-Ford finds shortest paths from source, handling negative weights. Relaxes all edges V-1 times. O(VE). Can detect negative cycles (V-th relaxation still improves = cycle).",
      why: "Unlike Dijkstra's, handles negative edge weights. Used in distance-vector routing protocols (RIP), currency arbitrage detection, difference constraints.",
      when: 'Negative edge weights present. Negative cycle detection needed. Distributed environments (each node runs independently). When Dijkstra fails.',
      complexity: { time: { 'main loop': 'O(VE)' }, space: 'O(V)', notes: 'V-1 iterations because longest shortest path has at most V-1 edges. If V-th iteration still relaxes: negative cycle.' },
      realWorldUses: ['Network routing with negative costs', 'Currency arbitrage detection', 'Distributed shortest path (BGP)', 'Difference constraint systems'],
      questions: q5('Z8-07', [
        ['Bellman-Ford does V-1 relaxation passes because:', ['V is small', 'Shortest path has at most V-1 edges, so V-1 passes guarantee all paths found', 'Tradition', 'Edge weight limit'], 1, 'Shortest path visits each node at most once = at most V-1 edges. V-1 passes guarantee convergence.'],
        ["Bellman-Ford vs Dijkstra's: Bellman-Ford handles:", ['Faster', 'Negative edge weights (Dijkstra fails with negatives)', 'More nodes', 'Unweighted graphs'], 1, "Dijkstra's greedy assumption fails with negatives. Bellman-Ford relaxes all edges repeatedly, correct with negatives."],
        ['Negative cycle detection: after V-1 passes, run one more. If still relaxing:', ['Normal', 'Negative cycle exists — path can decrease forever', 'Bug in code', 'Need more passes'], 1, 'If after V-1 passes an edge can still be relaxed, a V-edge path exists = cycle, and it\'s negative.'],
        ['Currency arbitrage uses Bellman-Ford by:', ['Sorting currencies', 'Converting exchange rates to -log (find negative cycle = arbitrage)', 'Random walk', 'BFS'], 1, 'Transform: w = -log(rate). Negative cycle in transformed graph = profitable currency loop.'],
        ['Bellman-Ford O(VE) vs Dijkstra O((V+E)logV): Bellman-Ford is used when:', ['V is large', 'Negative weights present, or graph is dense and Dijkstra brings no benefit', 'E is small', 'Always'], 1, 'For non-negative weights and sparse graphs, Dijkstra is much faster. Use Bellman-Ford only when needed.'],
      ]),
      visualization: { type: 'graph', title: 'Watch: Bellman-Ford with negative edge', initialState: {}, steps: [
        { label: 'Graph: 0->1 (weight 4), 0->2 (weight 5), 1->3 (weight -3), 2->3 (weight 2). src=0', state: { dist: [0,'inf','inf','inf'] } },
        { label: 'Pass 1: Relax all edges. d[1]=4, d[2]=5, d[3]=min(4-3,5+2)=1', state: { dist: [0,4,5,1] } },
        { label: 'Pass 2: d[3]=min(1, 4-3=1, 5+2=7)=1. No change.', state: { dist: [0,4,5,1] } },
        { label: 'V-1=3 passes done. No further relaxation. No negative cycle. Done!', state: { dist: [0,4,5,1], done: true } },
      ]},
      codeTemplates: stub('Shortest distances: {0: 0, 1: 4, 2: 5, 3: 1}', `def bellman_ford(vertices, edges, src):\n    dist = {v: float('inf') for v in vertices}\n    dist[src] = 0\n    for _ in range(len(vertices) - 1):\n        for u, v, w in edges:\n            if dist[u] + w < dist[v]:\n                dist[v] = dist[u] + w\n    # Check negative cycle\n    for u, v, w in edges:\n        if dist[u] + w < dist[v]:\n            return None  # negative cycle\n    return dist\n\nvertices = [0, 1, 2, 3]\nedges = [(0,1,4), (0,2,5), (1,3,-3), (2,3,2)]\nprint("Shortest distances:", bellman_ford(vertices, edges, 0))`, ['Relax all edges V-1 times', 'V-th relaxation possible = negative cycle']),
      prerequisites: ['Z8-06'],
      xpReward: 140, loot: ['Negative Compass', 'Bellman Badge'],
    },
    {
      id: 'Z8-08', name: 'Floyd-Warshall', zone: 8, category: 'algo', position: 8,
      lore: 'The All-Pairs Oracle knows the shortest path between every pair of nodes, considering every intermediate waypoint.',
      bossName: 'The All-Pairs Oracle', bossHP: 150,
      bossAscii: `
  ╔═══════════════╗
  ║ FLOYD-WARSHALL║
  ║ dist[i][j]=   ║
  ║ min via k     ║
  ║  O(V^3)       ║
  ╚═══════════════╝`,
      what: 'Floyd-Warshall computes all-pairs shortest paths in O(V^3). DP: dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]) for each intermediate node k. Works with negative weights (not negative cycles).',
      why: 'One algorithm gives all V^2 shortest paths. Simpler than running Dijkstra/Bellman-Ford V times. Handles negative weights. Detects negative cycles (dist[i][i] < 0).',
      when: 'All-pairs shortest paths, small V (V <= 500), dense graph, negative weights present, transitive closure problems.',
      complexity: { time: { 'all pairs': 'O(V^3)' }, space: 'O(V^2)', notes: 'For sparse graphs, run Dijkstra from each vertex: O(V*(V+E)logV) = better than O(V^3).' },
      realWorldUses: ['All-pairs reachability', 'Transitive closure', 'Network analysis (all pairwise distances)', 'Game theory (shortest strategy paths)'],
      questions: q5('Z8-08', [
        ['Floyd-Warshall recurrence: dist[i][j] via intermediate k:', ['max(dist[i][k]+dist[k][j])', 'min(dist[i][j], dist[i][k]+dist[k][j])', 'dist[i][k]*dist[k][j]', 'dist[i][k]-dist[k][j]'], 1, 'For each k: check if routing through k gives shorter path from i to j.'],
        ['Floyd-Warshall O(V^3) means for V=100:', ['100 ops', '100^3 = 1,000,000 ops', '100^2 = 10,000', '100 log 100'], 1, 'Three nested loops over V. For V=100: 10^6 operations. For V=1000: 10^9 (slow).'],
        ['Negative cycle detection in Floyd-Warshall:', ['V-th iteration', 'dist[i][i] < 0 for any vertex i', 'Extra pass needed', 'Cannot detect'], 1, 'After Floyd-Warshall, if dist[i][i] < 0 for any i, there is a negative cycle involving i.'],
        ['Floyd-Warshall vs running Dijkstra from each vertex:', ['Floyd-Warshall always better', 'For dense graphs: FW O(V^3) ≈ V*Dijkstra. For sparse: V*Dijkstra faster.', 'Dijkstra always better', 'Same always'], 1, 'FW: O(V^3). V*Dijkstra: O(V*(V+E)logV). For sparse E<<V^2, Dijkstra wins.'],
        ['Floyd-Warshall can find transitive closure by:', ['Extra memory', 'Replace min with OR: reach[i][j] |= reach[i][k] AND reach[k][j]', 'BFS', 'Sorting'], 1, 'Use boolean matrix. reach[i][j] = True if j reachable from i. Same triple loop with OR instead of min.'],
      ]),
      visualization: { type: 'generic', title: "Watch: Floyd-Warshall iteration", initialState: {}, steps: [
        { label: 'Initial dist matrix. 4 nodes. INF where no direct edge.', state: { dist: [[0,3,'inf',7],[8,0,2,'inf'],['inf','inf',0,1],[2,'inf','inf',0]] } },
        { label: 'k=0: route via node 0. dist[1][3]=min(inf,8+7)=15. dist[3][1]=min(inf,2+3)=5.', state: { k: 0 } },
        { label: 'k=1: route via node 1. dist[0][2]=min(inf,3+2)=5.', state: { k: 1 } },
        { label: 'k=2: route via node 2. dist[0][3]=min(7,5+1)=6. dist[1][3]=min(15,2+1)=3.', state: { k: 2 } },
        { label: 'k=3: route via node 3. Final all-pairs shortest paths computed.', state: { k: 3 } },
      ]},
      codeTemplates: stub('All-pairs shortest paths:\n0 -> 1: 3\n0 -> 2: 5\n0 -> 3: 6', `def floyd_warshall(n, edges):\n    INF = float('inf')\n    dist = [[INF]*n for _ in range(n)]\n    for i in range(n): dist[i][i] = 0\n    for u, v, w in edges: dist[u][v] = min(dist[u][v], w)\n    for k in range(n):\n        for i in range(n):\n            for j in range(n):\n                if dist[i][k] + dist[k][j] < dist[i][j]:\n                    dist[i][j] = dist[i][k] + dist[k][j]\n    return dist\n\nn = 4\nedges = [(0,1,3),(0,3,7),(1,2,2),(2,3,1),(3,0,2)]\ndist = floyd_warshall(n, edges)\nprint("All-pairs shortest paths:")\nfor j in range(1, n):\n    if dist[0][j] < float('inf'):\n        print(f"0 -> {j}: {dist[0][j]}")`, ['Triple nested loop: k, i, j', 'dist[i][k]+dist[k][j] = path via k']),
      prerequisites: ['Z8-07'],
      xpReward: 150, loot: ['All-Pairs Map', 'DP Graph Badge'],
    },
    {
      id: 'Z8-09', name: 'Minimum Spanning Tree', zone: 8, category: 'algo', position: 9,
      lore: 'The Connective Minimizer finds the cheapest web of roads that connects all cities without redundancy.',
      bossName: 'The Connective Minimizer', bossHP: 150,
      bossAscii: `
  ╔═══════════════╗
  ║     MST       ║
  ║ Kruskal+Prim  ║
  ║ V-1 edges     ║
  ║ min total wgt ║
  ╚═══════════════╝`,
      what: 'Minimum Spanning Tree connects all V vertices with V-1 edges of minimum total weight, no cycles. Two algorithms: Kruskal\'s (sort edges, greedy add if no cycle using Union-Find), Prim\'s (greedy grow from any node).',
      why: 'Network design: minimum cable to connect all offices. Road networks, electrical grids, computer networks. Approximation algorithms for NP-hard problems.',
      when: 'Connecting all nodes with minimum cost. Network infrastructure design. Cluster analysis. Approximation algorithms.',
      complexity: { time: { "Kruskal's": 'O(E log E)', "Prim's (binary heap)": 'O(E log V)' }, space: 'O(V+E)', notes: "Kruskal's: sort edges + Union-Find. Prim's: similar to Dijkstra but minimizes edge weight to MST, not path length." },
      realWorldUses: ['Network cable routing', 'Electrical grid design', 'Cluster analysis', 'Approximation for TSP', 'Image segmentation'],
      questions: q5('Z8-09', [
        ["Kruskal's algorithm builds MST by:", ['Starting from node', 'Sorting edges by weight, greedily adding if no cycle', 'BFS', 'Shortest path'], 1, "Sort edges ascending, add each if it doesn't create cycle (use Union-Find). Greedy by edge weight."],
        ["Prim's algorithm builds MST by:", ['Sorting edges', 'Greedily adding cheapest edge connecting MST to non-MST vertex', 'DFS', 'Random walk'], 1, "Prim's grows a tree: always add cheapest edge leaving the current MST subtree. Like Dijkstra but for MST."],
        ['MST has exactly V-1 edges because:', ['Design choice', 'V vertices in a connected acyclic graph = V-1 edges always', 'Greedy stops at V-1', 'Optimization'], 1, 'Spanning tree: connects all V vertices, no cycles. Any tree with V nodes has V-1 edges.'],
        ["Kruskal's uses Union-Find to:", ['Build MST', 'Check if adding edge (u,v) creates cycle (find(u)==find(v))', 'Sort edges', 'Count components'], 1, 'If find(u)==find(v), u and v are already connected: adding edge would create cycle.'],
        ['MST is not unique when:', ['Graph is sparse', 'Multiple edges have the same weight', 'Graph is disconnected', 'V is large'], 1, 'If multiple edges tie for minimum weight, different MSTs may be constructed but all have same total weight.'],
      ]),
      visualization: { type: 'graph', title: "Watch: Kruskal's MST", initialState: {}, steps: [
        { label: 'Graph with 4 nodes, edges: (0-1,1),(0-2,4),(1-2,2),(1-3,5),(2-3,3)', state: { edges: [[0,1,1],[1,2,2],[2,3,3],[0,2,4],[1,3,5]] } },
        { label: 'Sort by weight: [(0-1,1),(1-2,2),(2-3,3),(0-2,4),(1-3,5)]', state: { sorted: [[0,1,1],[1,2,2],[2,3,3],[0,2,4],[1,3,5]] } },
        { label: 'Add (0-1,w=1): no cycle. MST: {(0,1)}', state: { mst: [[0,1,1]] } },
        { label: 'Add (1-2,w=2): no cycle. MST: {(0,1),(1,2)}', state: { mst: [[0,1,1],[1,2,2]] } },
        { label: 'Add (2-3,w=3): no cycle. MST: {(0,1),(1,2),(2,3)}. 3=V-1 edges. Done!', state: { mst: [[0,1,1],[1,2,2],[2,3,3]], total: 6 } },
        { label: 'Skip (0-2,w=4): would create cycle (0-1-2). Skip (1-3,w=5): cycle. MST total=6', state: { total: 6, done: true } },
      ]},
      codeTemplates: stub('MST edges: [(0, 1, 1), (1, 2, 2), (2, 3, 3)]\nTotal weight: 6', `class UF:\n    def __init__(self,n): self.p=list(range(n));self.r=[0]*n\n    def find(self,x): self.p[x]=self.find(self.p[x]) if self.p[x]!=x else x; return self.p[x]\n    def union(self,x,y):\n        px,py=self.find(x),self.find(y)\n        if px==py: return False\n        if self.r[px]<self.r[py]: px,py=py,px\n        self.p[py]=px;\n        if self.r[px]==self.r[py]: self.r[px]+=1\n        return True\n\ndef kruskal(n, edges):\n    edges.sort(key=lambda e: e[2])\n    uf = UF(n)\n    mst = []\n    for u, v, w in edges:\n        if uf.union(u, v):\n            mst.append((u, v, w))\n    return mst\n\nedges = [(0,1,1),(0,2,4),(1,2,2),(1,3,5),(2,3,3)]\nmst = kruskal(4, edges)\nprint("MST edges:", mst)\nprint("Total weight:", sum(w for _,_,w in mst))`, ['Sort edges by weight', 'UF.union() returns False if cycle would be created']),
      prerequisites: ['Z8-02', 'Z8-06'],
      xpReward: 150, loot: ['Spanning Crystal', 'MST Badge'],
    },
    {
      id: 'Z8-10', name: 'A* Pathfinding', zone: 8, category: 'algo', position: 10,
      lore: 'The Heuristic Hunter — like Dijkstra but smarter. It leans toward the goal, guided by a heuristic estimate of remaining cost.',
      bossName: 'The Heuristic Hunter', bossHP: 160,
      bossAscii: `
  ╔═══════════════╗
  ║  A* SEARCH    ║
  ║ f(n)=g(n)+h(n)║
  ║  g: dist so far ║
  ║  h: heuristic  ║
  ╚═══════════════╝`,
      what: 'A* search finds shortest path from start to goal using f(n) = g(n) + h(n): g(n) = cost from start to n, h(n) = heuristic estimate of cost from n to goal. With admissible heuristic: optimal path guaranteed.',
      why: "Dijkstra's explores in all directions equally. A* guides exploration toward the goal via heuristic. Much faster for single-target pathfinding when good heuristic available.",
      when: 'Game pathfinding (tiles, grids), robot navigation, GPS with estimated distances, any single-target shortest path where heuristic is available.',
      complexity: { time: { 'depends on heuristic quality': 'O(b^d) where b=branching, d=depth', 'with perfect heuristic': 'O(path length)' }, space: 'O(b^d)', notes: 'Admissible heuristic: never overestimates true cost. Manhattan distance for grids, Euclidean for geometric.' },
      realWorldUses: ['Game AI pathfinding (Starcraft, Age of Empires)', 'Robot motion planning', 'GPS navigation optimization', 'Network packet routing'],
      questions: q5('Z8-10', [
        ['A* f(n) = g(n) + h(n). What is h(n)?', ['Cost from source to n', 'Heuristic estimate of cost from n to goal', 'Total cost', 'Depth of n'], 1, 'h(n) guides A* toward goal. g(n) = actual cost so far. f(n) = estimated total cost through n.'],
        ['Admissible heuristic means:', ['Always accurate', 'Never overestimates true cost to goal', 'Always underestimates', 'Can be any function'], 1, 'Admissible: h(n) <= true cost. Guarantees A* finds optimal path. Manhattan distance is admissible for grid.'],
        ['A* with h(n)=0 (no heuristic) becomes:', ['Useless', 'Dijkstra\'s algorithm', 'BFS', 'DFS'], 1, 'h(n)=0: f(n)=g(n) only, so A* explores by cost from source = Dijkstra\'s.'],
        ['A* with h(n) = true cost to goal would:', ['Fail', 'Only expand nodes on optimal path (perfect heuristic)', 'Be O(n^2)', 'Not terminate'], 1, 'Perfect heuristic: no wasted exploration, only expand nodes on actual optimal path.'],
        ['For grid pathfinding, admissible heuristic is:', ['Random', 'Manhattan distance (|Δx|+|Δy|) for 4-directional', 'Straight-line (overestimates with walls)', 'Diagonal distance always'], 0, 'Manhattan distance never overestimates for 4-directional grid movement (can\'t move diagonally to shortcut).'],
      ]),
      visualization: { type: 'generic', title: 'Watch: A* on grid, start=(0,0), goal=(2,2)', initialState: {}, steps: [
        { label: 'Grid 3x3. Start=(0,0), Goal=(2,2). h=Manhattan distance.', state: { grid: '3x3', start: [0,0], goal: [2,2] } },
        { label: 'Open: [(0,0)]. f(0,0)=g+h=0+4=4.', state: { open: [[4,0,0]], closed: [] } },
        { label: 'Pop (0,0). Explore neighbors (1,0) and (0,1). f(1,0)=1+3=4. f(0,1)=1+3=4.', state: { open: [[4,1,0],[4,0,1]], closed: [[0,0]] } },
        { label: 'Pop (1,0). Explore (2,0) and (1,1). f(1,1)=2+2=4. f(2,0)=2+2=4.', state: { open: [[4,0,1],[4,1,1],[4,2,0]], closed: [[0,0],[1,0]] } },
        { label: 'Eventually reach (2,2). Total cost: 4 moves. Optimal path found!', state: { path: [[0,0],[1,0],[2,0],[2,1],[2,2]] } },
      ]},
      codeTemplates: stub('Path: [(0, 0), (0, 1), (0, 2), (1, 2), (2, 2)]\nCost: 4', `import heapq\n\ndef astar(grid, start, goal):\n    rows, cols = len(grid), len(grid[0])\n    def h(pos): return abs(pos[0]-goal[0]) + abs(pos[1]-goal[1])  # Manhattan\n    open_set = [(h(start), 0, start, [start])]\n    visited = set()\n    while open_set:\n        f, g, pos, path = heapq.heappop(open_set)\n        if pos == goal: return path, g\n        if pos in visited: continue\n        visited.add(pos)\n        r, c = pos\n        for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:\n            nr, nc = r+dr, c+dc\n            if 0<=nr<rows and 0<=nc<cols and (nr,nc) not in visited and grid[nr][nc]==0:\n                new_g = g + 1\n                heapq.heappush(open_set, (new_g+h((nr,nc)), new_g, (nr,nc), path+[(nr,nc)]))\n    return None, float('inf')\n\ngrid = [[0,0,0],[0,0,0],[0,0,0]]  # 0=passable\npath, cost = astar(grid, (0,0), (2,2))\nprint("Path:", path)\nprint("Cost:", cost)`, ['h(pos) = Manhattan distance to goal', 'f = g + h pushed to heap', 'Skip if already visited']),
      prerequisites: ['Z8-06'],
      xpReward: 160, loot: ['Heuristic Crystal', 'A* Badge'],
    },
  ],
}
