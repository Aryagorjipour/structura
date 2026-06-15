export interface ZoneMeta {
  id: number
  name: string
  description: string
  theme: string
  bossCount: number
}

export const ZONE_META: ZoneMeta[] = [
  { id: 1, name: 'Foundation Vaults', description: 'Big-O, recursion, divide & conquer, greedy, two pointers', theme: 'green', bossCount: 5 },
  { id: 2, name: 'Search Chambers', description: 'Linear search, binary search, exponential search', theme: 'cyan', bossCount: 3 },
  { id: 3, name: 'Sort Halls', description: 'Insertion, merge, quick, heap, tim, counting, radix sort', theme: 'yellow', bossCount: 7 },
  { id: 4, name: 'Linear Crypts', description: 'Arrays, linked lists, stacks, queues, deques, ring buffers', theme: 'orange', bossCount: 7 },
  { id: 5, name: 'Hash Sanctum', description: 'Hash sets, maps, LRU/LFU caches, quickselect, reservoir sampling', theme: 'pink', bossCount: 7 },
  { id: 6, name: 'Tree Kingdom', description: 'BST, Red-Black, Heap, Trie, AVL trees and operations', theme: 'teal', bossCount: 10 },
  { id: 7, name: 'Deep Roots', description: 'B-Tree, Skip List, Segment Tree, Fenwick Tree, Merkle Tree', theme: 'indigo', bossCount: 5 },
  { id: 8, name: 'Graph Realm', description: 'BFS, DFS, Union-Find, Dijkstra, Bellman-Ford, Floyd-Warshall, MST, A*', theme: 'violet', bossCount: 10 },
  { id: 9, name: 'DP Forge', description: 'Memoization, 0/1 Knapsack, LCS, Edit Distance, Matrix Chain, LIS', theme: 'blue', bossCount: 6 },
  { id: 10, name: 'String Labyrinth', description: 'KMP, Rabin-Karp, Boyer-Moore, Z-Algorithm, Aho-Corasick', theme: 'purple', bossCount: 5 },
  { id: 11, name: 'Shadow Citadel', description: 'Bloom Filter, HyperLogLog, CMS, Suffix Array, Backtracking, Bits, and more', theme: 'red', bossCount: 15 },
]

export const TOTAL_BOSSES = ZONE_META.reduce((sum, z) => sum + z.bossCount, 0)
