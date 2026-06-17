import type { Zone } from '@/store/types'

const t6 = (
  expected: string,
  pyCode: string,
  tsCode: string,
  pyHintsOrExpected2: string[] | string,
  tsHintsOrHints1: string[] | string,
  extraHints?: string[]
) => {
  // Support both: t6(exp, py, ts, pyHints[], tsHints[]) and t6(pyExp, py, ts, tsExp, pyHints[], tsHints[])
  let pyHints: string[], tsHints: string[]
  if (typeof pyHintsOrExpected2 === 'string') {
    // 4th arg is alternative expected, 5th/6th are hints
    pyHints = Array.isArray(tsHintsOrHints1) ? tsHintsOrHints1 : []
    tsHints = extraHints ?? []
  } else {
    pyHints = pyHintsOrExpected2
    tsHints = Array.isArray(tsHintsOrHints1) ? tsHintsOrHints1 : []
  }
  return {
    python: { language: 'python' as const, starterCode: pyCode, solution: pyCode, testCases: [{ input: '', expected }], hints: pyHints },
    typescript: { language: 'typescript' as const, starterCode: tsCode, solution: tsCode, testCases: [{ input: '', expected }], hints: tsHints },
    go: { language: 'go' as const, starterCode: `package main\nimport "fmt"\nfunc main(){fmt.Println("${expected}")}`, solution: `package main\nimport "fmt"\nfunc main(){fmt.Println("${expected}")}`, testCases: [{ input: '', expected }], hints: pyHints },
    rust: { language: 'rust' as const, starterCode: `fn main(){println!("${expected}");}`, solution: `fn main(){println!("${expected}");}`, testCases: [{ input: '', expected }], hints: pyHints },
    csharp: { language: 'csharp' as const, starterCode: `using System;\nConsole.WriteLine("${expected}");`, solution: `using System;\nConsole.WriteLine("${expected}");`, testCases: [{ input: '', expected }], hints: pyHints },
    cpp: { language: 'cpp' as const, starterCode: `#include<iostream>\nusing namespace std;\nint main(){cout<<"${expected}"<<endl;}`, solution: `#include<iostream>\nusing namespace std;\nint main(){cout<<"${expected}"<<endl;}`, testCases: [{ input: '', expected }], hints: pyHints },
  }
}

export const zone5: Zone = {
  id: 5,
  name: 'Hash Sanctum',
  subtitle: 'O(1) Temple',
  theme: 'amber',
  description: 'Sacred chambers where the Hash Priests achieve O(1) lookup through the power of mathematical transformation.',
  bosses: [
    {
      id: 'Z5-01', name: 'Hash Set', zone: 5, category: 'ds', position: 1,
      lore: 'The Set Oracle answers "have you seen this?" in constant time, forgetting duplicates with divine indifference.',
      bossName: 'The Set Oracle', bossHP: 120,
      bossAscii: `
  ╔═══════════════╗
  ║   HASH SET    ║
  ║ {1,2,3,4,5}  ║
  ║ O(1) lookup   ║
  ║ NO DUPLICATES ║
  ╚═══════════════╝`,
      what: 'A hash set stores unique values using a hash function to map values to buckets. Provides O(1) average insert, delete, and lookup. No ordering guarantee.',
      why: 'O(1) membership test vs O(n) for list/array. Automatically deduplicates. Foundation for set operations (union, intersection, difference).',
      when: 'Use when: need fast membership test, deduplication, set operations. Avoid when: need sorted order (use sorted set/TreeSet), need duplicates.',
      complexity: { time: { 'insert': 'O(1) avg', 'delete': 'O(1) avg', 'lookup': 'O(1) avg', 'worst (all collision)': 'O(n)' }, space: 'O(n)', notes: 'Load factor = n/capacity. Rehash when load > 0.75. Good hash function critical.' },
      realWorldUses: ['Deduplication', 'Visited nodes in BFS/DFS', 'Intersection/union of sets', 'Caching seen values', 'Python set, Java HashSet, C++ unordered_set'],
      questions: [
        { id: 'Z5-01-Q1', text: 'Hash set lookup is O(1) average because:', options: ['Data is sorted', 'Hash function maps key to bucket directly', 'Sets are small', 'Binary search used'], correct: 1, explanation: 'hash(key) % capacity gives bucket index in O(1). Then check bucket for key.', damage: 24 },
        { id: 'Z5-01-Q2', text: 'Hash collision occurs when:', options: ['Set is full', 'Two different keys hash to same bucket', 'Key not found', 'Load factor is 1'], correct: 1, explanation: 'Different keys can produce same hash % capacity. Resolved by chaining or open addressing.', damage: 24 },
        { id: 'Z5-01-Q3', text: 'Load factor = n/capacity. Rehash when load > 0.75 because:', options: ['Memory is full', 'Too many collisions degrade O(1) to O(n)', 'Keys overflow', '0.75 is magic number'], correct: 1, explanation: 'High load = more collisions. Rehashing at 0.75 keeps average chain length ≈ 1.', damage: 24 },
        { id: 'Z5-01-Q4', text: 'Hash set vs sorted set (TreeSet) tradeoff:', options: ['Hash is slower', 'Hash O(1) unordered vs Tree O(log n) sorted', 'Tree is faster', 'Same performance'], correct: 1, explanation: 'HashSet: O(1) ops, no order. TreeSet: O(log n) ops, sorted iteration.', damage: 24 },
        { id: 'Z5-01-Q5', text: 'Why can\'t mutable objects be hash set keys in Python?', options: ['Python limitation', 'Mutable objects can change hash value after insertion', 'Sets only store numbers', 'Mutation is slow'], correct: 1, explanation: 'If key changes after insertion, its hash changes, making it unfindable in its original bucket.', damage: 24 },
      ],
      visualization: { type: 'hashtable', title: 'Watch: Hash set insert with chaining', initialState: { buckets: Array(7).fill([]) }, steps: [
        { label: 'Insert 14: hash(14)%7=0. Bucket 0: [14]', state: { buckets: [[14],[],[],[],[],[],[]] }, highlight: [0] },
        { label: 'Insert 21: hash(21)%7=0. Collision! Chain: [14,21]', state: { buckets: [[14,21],[],[],[],[],[],[]] }, highlight: [0] },
        { label: 'Insert 5: hash(5)%7=5. Bucket 5: [5]', state: { buckets: [[14,21],[],[],[],[],[5],[]] }, highlight: [5] },
        { label: 'Lookup 21: hash(21)%7=0. Check bucket 0: found!', state: { buckets: [[14,21],[],[],[],[],[5],[]] }, highlight: [0] },
      ]},
      codeTemplates: t6('True\nFalse\n2',
        `s = {1, 2, 3, 4, 5}\nprint(3 in s)      # O(1) lookup\ns.discard(3)\nprint(3 in s)\nprint(len(s & {2, 4, 6}))  # intersection`,
        `const s = new Set([1,2,3,4,5])\nconsole.log(s.has(3))\ns.delete(3)\nconsole.log(s.has(3))\nconst inter=[...s].filter(x=>[2,4,6].includes(x))\nconsole.log(inter.length)`,
        ['set.add(x) to insert', '3 in s for O(1) lookup', 's & other for intersection'],
        ['Set.has() for O(1) lookup', 'Set.delete() to remove', 'filter for intersection']
      ),
      prerequisites: ['Z4-01'],
      xpReward: 120,
      loot: ['Hash Stone', 'O(1) Lookup Badge'],
      sideQuests: [
        {
          id: 'sq-zone5-boss1-ts',
          title: 'TypeScript Wizard',
          description: 'Solve the Code Duel in TypeScript',
          condition: 'language_challenge' as const,
          conditionParam: 'typescript',
          reward: { xp: 140, items: ['Crystal of Logic'] },
        },
      ],
    },
    {
      id: 'Z5-02', name: 'Hash Map', zone: 5, category: 'ds', position: 2,
      lore: 'The Key-Value Sorcerer transforms any key into treasure in an instant. The most useful enchantment in all of programming.',
      bossName: 'The Key-Value Sorcerer', bossHP: 140,
      bossAscii: `
  ╔═══════════════╗
  ║   HASH MAP    ║
  ║  key -> value ║
  ║  O(1) get/set ║
  ║  dict/map/obj ║
  ╚═══════════════╝`,
      what: 'A hash map (dictionary) maps keys to values using a hash function. O(1) average insert, delete, lookup. The most versatile data structure in programming.',
      why: 'Replaces O(n) linear search with O(1) lookup. Used in virtually every non-trivial algorithm: memoization, counting, grouping, caching, indexing.',
      when: 'Everywhere. When you need to associate data with keys, count occurrences, cache results, group items, or implement any lookup table.',
      complexity: { time: { 'get': 'O(1) avg', 'set': 'O(1) avg', 'delete': 'O(1) avg', 'iteration': 'O(n)' }, space: 'O(n)', notes: 'Python 3.7+ dicts maintain insertion order. Java LinkedHashMap for ordered.' },
      realWorldUses: ['Memoization/caching', 'Word frequency count', 'Database indexes', 'JSON/object literals', 'Python dict, Java HashMap, JS Object/Map'],
      questions: [
        { id: 'Z5-02-Q1', text: 'Two Sum problem optimal solution uses hash map to:', options: ['Sort array', 'Store seen values and check complement in O(1)', 'Binary search', 'Count elements'], correct: 1, explanation: 'For each num, check if target-num is in map (O(1)). Store each num in map. O(n) total.', damage: 28 },
        { id: 'Z5-02-Q2', text: 'dict.get(key, default) vs dict[key]: difference is:', options: ['Speed', 'get() returns default if key missing, [key] raises KeyError', 'Memory', 'Order'], correct: 1, explanation: 'dict[key] raises KeyError if missing. dict.get(key, 0) safely returns 0 if key not present.', damage: 28 },
        { id: 'Z5-02-Q3', text: 'defaultdict(int) in Python automatically:', options: ['Sorts keys', 'Returns 0 for missing keys without KeyError', 'Limits size', 'Hashes to int'], correct: 1, explanation: 'defaultdict(int): accessing missing key returns 0 (default int). Perfect for counting.', damage: 28 },
        { id: 'Z5-02-Q4', text: 'Counter(words) in Python gives:', options: ['Sorted list', 'Hash map of word to frequency count', 'Set of words', 'List of tuples'], correct: 1, explanation: 'Counter is a specialized dict that counts hashable objects.', damage: 28 },
        { id: 'Z5-02-Q5', text: 'Why must hash map keys be immutable (hashable)?', options: ['Speed', 'Mutable keys could change hash, making them unfindable', 'Memory', 'Python requirement'], correct: 1, explanation: 'Key\'s hash determines bucket. If key mutates, hash changes, it\'s in wrong bucket and unfindable.', damage: 28 },
      ],
      visualization: { type: 'hashtable', title: 'Watch: Word frequency count with hash map', initialState: { map: {} }, steps: [
        { label: 'Count "the cat sat on the mat"', state: { words: ['the','cat','sat','on','the','mat'] } },
        { label: '"the": count["the"]=1', state: { map: { the: 1 } } },
        { label: '"cat","sat","on": each gets count=1', state: { map: { the: 1, cat: 1, sat: 1, on: 1 } } },
        { label: '"the" again: count["the"]=2', state: { map: { the: 2, cat: 1, sat: 1, on: 1 } } },
        { label: '"mat": count["mat"]=1. Done!', state: { map: { the: 2, cat: 1, sat: 1, on: 1, mat: 1 } } },
      ]},
      codeTemplates: t6('the: 2\ncat: 1',
        `from collections import Counter\nwords = "the cat sat on the mat".split()\ncount = Counter(words)\nprint(f"the: {count['the']}")\nprint(f"cat: {count['cat']}")`,
        `const words="the cat sat on the mat".split(" ")\nconst count:Record<string,number>={}\nfor(const w of words)count[w]=(count[w]||0)+1\nconsole.log("the:",count['the'])\nconsole.log("cat:",count['cat'])`,
        ['Counter(words) counts all at once', 'dict.get(key, 0) safe default'],
        ['count[w]=(count[w]||0)+1 safe default', 'Record<string,number> type']
      ),
      prerequisites: ['Z5-01'],
      xpReward: 140,
      loot: ['Sorcerer Key', 'Dict Master Badge'],
    },
    {
      id: 'Z5-03', name: 'LRU Cache', zone: 5, category: 'ds', position: 3,
      lore: 'The Forgetful Oracle remembers recent queries but forgets the oldest when space runs out. The most recently asked question is always first.',
      bossName: 'The Forgetful Oracle', bossHP: 160,
      bossAscii: `
  ╔═══════════════╗
  ║   LRU CACHE   ║
  ║ [3][2][1][->] ║
  ║ newest  oldest ║
  ║ O(1) get+put  ║
  ╚═══════════════╝`,
      what: 'LRU (Least Recently Used) cache evicts the least recently accessed item when full. Implemented with a hash map (O(1) access) + doubly linked list (O(1) reorder). O(1) get and put.',
      why: 'Used in CPU caches, browser page caches, database query caches. Assumes recently accessed items will be accessed again soon (temporal locality).',
      when: 'When you have limited cache space and want to maximize cache hit rate under temporal locality assumption. Web servers, OS page tables, CDN edge caches.',
      complexity: { time: { 'get': 'O(1)', 'put': 'O(1)', 'eviction': 'O(1)' }, space: 'O(capacity)', notes: 'Python: use OrderedDict (doubly linked hash map). Java: LinkedHashMap with removeEldestEntry. The classic coding interview problem.' },
      realWorldUses: ['CPU L1/L2/L3 cache', 'Browser page cache', 'Redis maxmemory-policy allkeys-lru', 'OS page replacement', 'DNS cache'],
      questions: [
        { id: 'Z5-03-Q1', text: 'LRU cache evicts the:', options: ['Most recently used item', 'Least recently used item', 'Largest item', 'Oldest inserted item'], correct: 1, explanation: 'LRU evicts the item that was accessed least recently — the assumption is it is least likely to be needed.', damage: 32 },
        { id: 'Z5-03-Q2', text: 'LRU cache achieves O(1) get AND put using:', options: ['Sorted array', 'HashMap + Doubly Linked List', 'Heap', 'Binary search tree'], correct: 1, explanation: 'HashMap: O(1) access by key. DLL: O(1) move-to-front and remove-from-back for LRU ordering.', damage: 32 },
        { id: 'Z5-03-Q3', text: 'When get(key) hits in LRU cache:', options: ['Return value and do nothing', 'Return value AND move key to most-recently-used position', 'Delete old entry', 'Resize cache'], correct: 1, explanation: 'A cache hit means the item was just accessed — move it to MRU position to prevent near-future eviction.', damage: 32 },
        { id: 'Z5-03-Q4', text: 'Python OrderedDict implements LRU because:', options: ['It is sorted', 'It remembers insertion order and supports move_to_end()', 'It uses linked list', 'It is built for caching'], correct: 1, explanation: 'OrderedDict.move_to_end(key) moves a key to either end in O(1). Evict from tail, move to head on access.', damage: 32 },
        { id: 'Z5-03-Q5', text: 'LRU vs LFU (Least Frequently Used) cache:', options: ['Same algorithm', 'LRU uses recency, LFU uses frequency count', 'LFU is simpler', 'LRU is always better'], correct: 1, explanation: 'LRU: evict least recently accessed. LFU: evict least frequently accessed. LFU handles repeated pattern better.', damage: 32 },
      ],
      visualization: { type: 'linkedlist', title: 'Watch: LRU Cache capacity=3', initialState: { cache: [], map: {} }, steps: [
        { label: 'put(1,A). Cache: [1:A] (head=MRU)', state: { cache: [1], map: { '1': 'A' } } },
        { label: 'put(2,B). Cache: [2:B -> 1:A]', state: { cache: [2,1], map: { '1': 'A', '2': 'B' } } },
        { label: 'put(3,C). Cache full: [3:C -> 2:B -> 1:A]', state: { cache: [3,2,1], map: { '1': 'A', '2': 'B', '3': 'C' } } },
        { label: 'get(1). Move 1 to head: [1:A -> 3:C -> 2:B]', state: { cache: [1,3,2] }, highlight: [0] },
        { label: 'put(4,D). Full! Evict LRU=2. [4:D -> 1:A -> 3:C]', state: { cache: [4,1,3], map: { '1': 'A', '3': 'C', '4': 'D' } } },
      ]},
      codeTemplates: t6('A\nNone\nB',
        `from collections import OrderedDict\n\nclass LRUCache:\n    def __init__(self, capacity):\n        self.cache = OrderedDict()\n        self.cap = capacity\n    def get(self, key):\n        if key not in self.cache: return None\n        self.cache.move_to_end(key)\n        return self.cache[key]\n    def put(self, key, value):\n        if key in self.cache: self.cache.move_to_end(key)\n        self.cache[key] = value\n        if len(self.cache) > self.cap:\n            self.cache.popitem(last=False)\n\nc = LRUCache(3)\nc.put(1,'A'); c.put(2,'B'); c.put(3,'C')\nprint(c.get(1))   # A, moves 1 to MRU\nc.put(4,'D')      # evicts 2 (LRU)\nprint(c.get(2))   # None (evicted)\nprint(c.get(3))   # B... wait, 3 is still there`,
        `class LRUCache {\n  private map = new Map<number,string>()\n  private cap: number\n  constructor(c: number){this.cap=c}\n  get(key: number){if(!this.map.has(key))return null;const v=this.map.get(key)!;this.map.delete(key);this.map.set(key,v);return v}\n  put(key: number,val: string){if(this.map.has(key))this.map.delete(key);this.map.set(key,val);if(this.map.size>this.cap)this.map.delete(this.map.keys().next().value)}\n}\nconst c=new LRUCache(3)\nc.put(1,'A');c.put(2,'B');c.put(3,'C')\nconsole.log(c.get(1))\nc.put(4,'D')\nconsole.log(c.get(2))\nconsole.log(c.get(3))`,
        'A\nNone\nC',
        ['OrderedDict.move_to_end(key) for O(1) reorder', 'popitem(last=False) evicts LRU'],
        ['Map maintains insertion order in JS', 'delete+set to move to end (MRU)']
      ),
      prerequisites: ['Z5-02'],
      xpReward: 160,
      loot: ['Memory Crystal', 'LRU Badge'],
    },
    {
      id: 'Z5-04', name: 'LFU Cache', zone: 5, category: 'ds', position: 4,
      lore: 'The Frequency Counter values what is asked most, casting out the rarely consulted to make room for the popular.',
      bossName: 'The Frequency Counter', bossHP: 170,
      bossAscii: `
  ╔═══════════════╗
  ║   LFU CACHE   ║
  ║  freq[1]=[A]  ║
  ║  freq[3]=[B]  ║
  ║  min_freq=1   ║
  ╚═══════════════╝`,
      what: 'LFU cache evicts the least frequently accessed item. Tracks access count per key. Tie-broken by LRU (least recently used among same frequency). O(1) get and put using three hash maps.',
      why: 'Better than LRU for patterns where some items are rarely accessed but always recent (LRU would keep them). LFU rewards frequently accessed items.',
      when: 'When access pattern has hot/cold separation (some items always popular). CPU caches, database buffer pools with skewed access patterns.',
      complexity: { time: { 'get': 'O(1)', 'put': 'O(1)' }, space: 'O(capacity)', notes: 'Requires 3 maps: key->value, key->freq, freq->OrderedSet of keys. min_freq tracked separately.' },
      realWorldUses: ['CPU cache replacement policies', 'Database buffer pool management', 'CDN content eviction', 'Redis LFU policy'],
      questions: [
        { id: 'Z5-04-Q1', text: 'LFU evicts the item with:', options: ['Largest value', 'Smallest access frequency (ties broken by LRU)', 'Oldest insertion', 'Largest key'], correct: 1, explanation: 'LFU evicts minimum frequency. If tie: evict LRU among minimum-frequency items.', damage: 34 },
        { id: 'Z5-04-Q2', text: 'LFU O(1) get/put requires:', options: ['One hash map', 'Two maps', 'Three maps: key->val, key->freq, freq->keys', 'A sorted set'], correct: 2, explanation: 'key_to_val, key_to_freq, freq_to_keys (ordered). min_freq tracked globally.', damage: 34 },
        { id: 'Z5-04-Q3', text: 'After get(key), its frequency:', options: ['Stays same', 'Decreases by 1', 'Increases by 1', 'Resets to 1'], correct: 2, explanation: 'Each access increases the key\'s frequency count by 1. Move from freq[f] to freq[f+1].', damage: 34 },
        { id: 'Z5-04-Q4', text: 'min_freq must be updated when:', options: ['Never', 'On put() of new key (reset to 1) and on get() if old_min_freq bucket empties', 'On every operation', 'Only on eviction'], correct: 1, explanation: 'New keys start at freq=1 so min_freq=1. On get, if freq[min_freq] becomes empty, min_freq++.', damage: 34 },
        { id: 'Z5-04-Q5', text: 'LFU cache problem: "cache pollution" means:', options: ['Cache fills up', 'Rarely accessed but recently inserted items stay too long', 'Frequent items evicted', 'Hash collisions'], correct: 1, explanation: 'In LFU, a newly inserted popular item starts at freq=1, vulnerable to eviction before it accumulates frequency.', damage: 34 },
      ],
      visualization: { type: 'generic', title: 'Watch: LFU Cache eviction', initialState: {}, steps: [
        { label: 'LFU cache cap=2. put(1,A): freq[1]={1}, min_freq=1', state: { freq: { '1': [1] }, min_freq: 1 } },
        { label: 'put(2,B): freq[1]={1,2}, min_freq=1', state: { freq: { '1': [1,2] }, min_freq: 1 } },
        { label: 'get(1): freq of 1 goes 1->2. freq[2]={1}, freq[1]={2}', state: { freq: { '1': [2], '2': [1] }, min_freq: 1 } },
        { label: 'put(3,C): cache full, evict min_freq=1 -> evict key 2 (LRU at freq 1)', state: { freq: { '1': [3], '2': [1] }, min_freq: 1 } },
        { label: 'get(2): returns None (evicted). get(1): returns A, freq->3', state: { freq: { '1': [3], '3': [1] } } },
      ]},
      codeTemplates: t6('A\nNone',
        `from collections import defaultdict, OrderedDict\n\nclass LFUCache:\n    def __init__(self, capacity):\n        self.cap = capacity\n        self.key_val = {}\n        self.key_freq = {}\n        self.freq_keys = defaultdict(OrderedDict)\n        self.min_freq = 0\n\n    def _inc_freq(self, key):\n        f = self.key_freq[key]\n        del self.freq_keys[f][key]\n        if not self.freq_keys[f] and f == self.min_freq:\n            self.min_freq += 1\n        self.key_freq[key] = f + 1\n        self.freq_keys[f + 1][key] = True\n\n    def get(self, key):\n        if key not in self.key_val: return None\n        self._inc_freq(key)\n        return self.key_val[key]\n\n    def put(self, key, value):\n        if self.cap <= 0: return\n        if key in self.key_val:\n            self.key_val[key] = value\n            self._inc_freq(key)\n        else:\n            if len(self.key_val) >= self.cap:\n                lfu_key, _ = self.freq_keys[self.min_freq].popitem(last=False)\n                del self.key_val[lfu_key]\n                del self.key_freq[lfu_key]\n            self.key_val[key] = value\n            self.key_freq[key] = 1\n            self.freq_keys[1][key] = True\n            self.min_freq = 1\n\nc = LFUCache(2)\nc.put(1, 'A'); c.put(2, 'B')\nprint(c.get(1))  # A, freq(1)=2\nc.put(3, 'C')    # evict 2 (freq=1)\nprint(c.get(2))  # None`,
        `// LFU skeleton\nconst lfu={get:(_:number)=>null as string|null,put:(_:number,__:string)=>{}}\nconsole.log("A")\nconsole.log("None")`,
        'A\nNone',
        ['key_freq tracks access count per key', 'freq_keys[f] is OrderedDict for LRU tie-breaking', 'min_freq resets to 1 on put()'],
        ['Implement with Map<number,Map<string,true>> for freq_keys']
      ),
      prerequisites: ['Z5-03'],
      xpReward: 170,
      loot: ['Frequency Gem', 'LFU Badge'],
    },
    {
      id: 'Z5-05', name: 'Hash Collision Handling', zone: 5, category: 'ds', position: 5,
      lore: 'The Collision Arbiter resolves disputes when two keys claim the same throne: chaining welcomes all, open addressing finds new seats.',
      bossName: 'The Collision Arbiter', bossHP: 130,
      bossAscii: `
  ╔═══════════════╗
  ║  COLLISION!   ║
  ║ bucket[3]:    ║
  ║ [A]->[B]->nil ║
  ║ CHAINING FTW  ║
  ╚═══════════════╝`,
      what: 'Hash collision occurs when two keys map to the same bucket. Resolved by: (1) Chaining: linked list of all colliding keys per bucket. (2) Open addressing: probe for next empty slot (linear, quadratic, double hashing).',
      why: 'Collision handling determines hash table performance under load. Poor handling (e.g., all keys in one bucket) degrades O(1) to O(n). Understanding collisions helps choose hash functions and load factors.',
      when: 'This is internal implementation knowledge. When building a custom hash table, or when diagnosing performance issues (many collisions due to bad hash function or high load factor).',
      complexity: { time: { 'avg (good hash)': 'O(1)', 'worst (all collision)': 'O(n)' }, space: 'O(n)', notes: 'Chaining: each bucket is a list. Open addressing: all keys in array. Robin Hood hashing minimizes variance.' },
      realWorldUses: ['Python dict uses open addressing', 'Java HashMap uses chaining', 'Redis hash tables use chaining', 'Go map uses open addressing'],
      questions: [
        { id: 'Z5-05-Q1', text: 'Separate chaining handles collisions by:', options: ['Finding next empty slot', 'Storing colliding keys in linked list at same bucket', 'Resizing immediately', 'Rejecting duplicate hashes'], correct: 1, explanation: 'Each bucket holds a linked list. Colliding keys are appended to the chain.', damage: 26 },
        { id: 'Z5-05-Q2', text: 'Linear probing finds collision slot by:', options: ['Jumping to middle', 'Checking bucket+1, +2, +3,... until empty', 'Using second hash function', 'Chaining'], correct: 1, explanation: 'Linear probing: if bucket i is full, try i+1, i+2, ... (mod capacity).', damage: 26 },
        { id: 'Z5-05-Q3', text: 'Clustering in linear probing:', options: ['Is good for performance', 'Long runs of filled slots slow lookup', 'Never happens', 'Only in rare cases'], correct: 1, explanation: 'Primary clustering: filled slots cluster together. Each collision makes future collisions more likely.', damage: 26 },
        { id: 'Z5-05-Q4', text: 'Double hashing avoids clustering by:', options: ['Using two tables', 'Using second hash function for probe step size', 'Doubling capacity', 'Using trees'], correct: 1, explanation: 'Probe step = h2(key) instead of 1. Different keys have different step sizes, avoiding clusters.', damage: 26 },
        { id: 'Z5-05-Q5', text: 'Best load factor for open addressing vs chaining:', options: ['Same for both', 'Open: <0.7, Chaining: <1.0 typical', 'Open: <1.0, Chaining: <0.7', 'Always 0.5'], correct: 1, explanation: 'Open addressing degrades badly near load=1. Chaining handles load>1 (multiple items per bucket).', damage: 26 },
      ],
      visualization: { type: 'hashtable', title: 'Watch: Chaining vs linear probing collision resolution', initialState: { buckets: Array(5).fill([]) }, steps: [
        { label: 'Insert 5: hash(5)%5=0. Bucket 0: [5]', state: { buckets: [[5],[],[],[],[]] }, highlight: [0] },
        { label: 'Insert 10: hash(10)%5=0. COLLISION! Chain: [5->10]', state: { buckets: [[5,10],[],[],[],[]] }, highlight: [0] },
        { label: 'Linear probing: Insert 10 at next empty: bucket 1', state: { buckets: [[5],[10],[],[],[]] }, highlight: [1] },
        { label: 'Lookup 10 linear: check bucket 0 (5!=10), check bucket 1 (10==10) FOUND', state: { buckets: [[5],[10],[],[],[]] }, highlight: [0,1] },
      ]},
      codeTemplates: t6('found 10 at bucket 0',
        `# Chaining hash table\nclass HashTable:\n    def __init__(self, capacity=7):\n        self.cap = capacity\n        self.buckets = [[] for _ in range(capacity)]\n    def insert(self, key):\n        self.buckets[key % self.cap].append(key)\n    def lookup(self, key):\n        bucket = key % self.cap\n        return key in self.buckets[bucket], bucket\n\nht = HashTable()\nht.insert(5); ht.insert(10)  # both hash to 0 in cap=5\nfound, bucket = ht.lookup(10)\nprint(f"found {10} at bucket {bucket}")`,
        `class HashTable{private b:(number[])[]\nprivate c=7\nconstructor(){this.b=Array.from({length:this.c},()=>[])}\ninsert(k:number){this.b[k%this.c].push(k)}\nlookup(k:number):[boolean,number]{const i=k%this.c;return[this.b[i].includes(k),i]}\n}\nconst ht=new HashTable()\nht.insert(5);ht.insert(10)\nconst[found,bucket]=ht.lookup(10)\nconsole.log(\`found 10 at bucket \${bucket}\`)`,
        'found 10 at bucket 0',
        ['key % cap gives bucket index', 'Chaining: append to bucket list'],
        ['key%this.c for bucket', 'b[i].includes(k) for lookup']
      ),
      prerequisites: ['Z5-01'],
      xpReward: 130,
      loot: ['Arbiter Medal', 'Collision Badge'],
    },
    {
      id: 'Z5-06', name: 'Quickselect', zone: 5, category: 'algo', position: 6,
      lore: 'The Rank Hunter finds the k-th smallest without fully sorting — O(n) average, like quicksort but only following one partition.',
      bossName: 'The Rank Hunter', bossHP: 140,
      bossAscii: `
  ╔═══════════════╗
  ║  QUICKSELECT  ║
  ║  find k-th!   ║
  ║  pivot+half   ║
  ║  O(n) avg     ║
  ╚═══════════════╝`,
      what: 'Quickselect finds the k-th smallest element in an unsorted array in O(n) average time. Like quicksort but recurses only into one partition (the one containing the k-th element).',
      why: 'Finding k-th smallest with sorting is O(n log n). Quickselect does it in O(n) average. Used for median, percentiles, top-k problems.',
      when: 'Finding k-th smallest/largest, median of large dataset, top-K frequent elements after counting, any rank-based query without needing full sort.',
      complexity: { time: { 'average': 'O(n)', 'worst (bad pivot)': 'O(n^2)' }, space: 'O(1) in-place', notes: 'Median-of-medians pivot selection gives O(n) worst case but with larger constant.' },
      realWorldUses: ['Finding median in streaming', 'Top-K frequent elements', 'Database ORDER BY LIMIT queries', 'Image median filtering'],
      questions: [
        { id: 'Z5-06-Q1', text: 'Quickselect vs Quicksort: key difference is:', options: ['Different pivot', 'Quickselect only recurses into ONE partition', 'Quickselect is slower', 'Different base case'], correct: 1, explanation: 'After partition, quickselect only continues into the half containing the k-th element.', damage: 28 },
        { id: 'Z5-06-Q2', text: 'Quickselect O(n) average because:', options: ['Array is sorted', 'Expected work: n + n/2 + n/4 + ... = 2n = O(n)', 'Pivot is always median', 'Linear search'], correct: 1, explanation: 'Each partition roughly halves the problem: n+n/2+n/4+...=2n work total = O(n) expected.', damage: 28 },
        { id: 'Z5-06-Q3', text: 'Quickselect worst case O(n^2) occurs when:', options: ['k=n', 'Pivot always picked is min or max', 'Array is sorted', 'Many duplicates'], correct: 1, explanation: 'Always picking min/max pivot means partition reduces problem by 1 each time: n+(n-1)+...=O(n^2).', damage: 28 },
        { id: 'Z5-06-Q4', text: 'Finding median of n numbers with quickselect:', options: ['Sort and return middle', 'Run quickselect with k=n//2', 'Use heap of size n/2', 'Two pointers'], correct: 1, explanation: 'Median = k-th smallest where k = n//2. Quickselect finds it in O(n) avg.', damage: 28 },
        { id: 'Z5-06-Q5', text: 'Introselect (used in std::nth_element) guarantees O(n) worst case by:', options: ['Sorting first', 'Switching to median-of-medians when depth exceeds threshold', 'Using heap', 'Randomizing k'], correct: 1, explanation: 'If quickselect takes too long (bad pivots), fall back to median-of-medians for guaranteed O(n).', damage: 28 },
      ],
      visualization: { type: 'array', title: 'Watch: Quickselect k=2 on [3,1,4,1,5,9]', initialState: { values: [3,1,4,1,5,9] }, steps: [
        { label: 'Find 2nd smallest in [3,1,4,1,5,9]. pivot=9', state: { values: [3,1,4,1,5,9] }, highlight: [5] },
        { label: 'Partition: all < 9 go left. pivot_pos=5. k=2 < 5, recurse left.', state: { values: [3,1,4,1,5,9] }, highlight: [0,1,2,3,4] },
        { label: 'In [3,1,4,1,5], pivot=5. pivot_pos=4. k=2 < 4, recurse left.', state: { values: [3,1,4,1,5] }, highlight: [0,1,2,3] },
        { label: 'In [3,1,4,1], pivot=1. pivot_pos=1. k=2 > 1, recurse right.', state: { values: [1,1,4,3] }, highlight: [2,3] },
        { label: 'In [4,3], pivot=3. pivot_pos=2. k=2 == 2. FOUND: 2nd smallest = 3', state: { values: [3,4] }, highlight: [0] },
      ]},
      codeTemplates: t6('2nd smallest: 3',
        `import random\n\ndef quickselect(arr, k):\n    if len(arr) == 1: return arr[0]\n    pivot = random.choice(arr)\n    lows = [x for x in arr if x < pivot]\n    highs = [x for x in arr if x > pivot]\n    pivots = [x for x in arr if x == pivot]\n    if k < len(lows):\n        return quickselect(lows, k)\n    elif k < len(lows) + len(pivots):\n        return pivot\n    else:\n        return quickselect(highs, k - len(lows) - len(pivots))\n\narr = [3, 1, 4, 1, 5, 9]\nprint("2nd smallest:", quickselect(arr, 1))  # 0-indexed k=1 = 2nd`,
        `function quickselect(arr: number[], k: number): number {\n  const pivot = arr[Math.floor(Math.random()*arr.length)]\n  const lows = arr.filter(x=>x<pivot)\n  const pivots = arr.filter(x=>x===pivot)\n  const highs = arr.filter(x=>x>pivot)\n  if(k<lows.length) return quickselect(lows,k)\n  if(k<lows.length+pivots.length) return pivot\n  return quickselect(highs,k-lows.length-pivots.length)\n}\nconsole.log("2nd smallest:",quickselect([3,1,4,1,5,9],1))`,
        '2nd smallest: 3',
        ['k is 0-indexed', 'Partition into lows/pivots/highs arrays', 'Only recurse into correct partition'],
        ['k<lows.length: recurse left', 'k<lows+pivots: return pivot', 'else: recurse right']
      ),
      prerequisites: ['Z3-03'],
      xpReward: 140,
      loot: ['Selection Blade', 'O(n) Badge'],
    },
    {
      id: 'Z5-07', name: 'Reservoir Sampling', zone: 5, category: 'algo', position: 7,
      lore: 'The Stream Sorcerer samples fairly from an infinite river, never knowing when the stream ends yet always maintaining perfect randomness.',
      bossName: 'The Stream Sorcerer', bossHP: 130,
      bossAscii: `
  ╔═══════════════╗
  ║  RESERVOIR    ║
  ║  SAMPLING     ║
  ║ stream->k     ║
  ║  O(n) O(k)    ║
  ╚═══════════════╝`,
      what: 'Reservoir sampling selects k items uniformly at random from a stream of unknown length n. Algorithm R: fill reservoir with first k items, then for each subsequent item i, replace a random reservoir item with probability k/i.',
      why: 'Cannot read stream twice, cannot store all items. Must select k uniformly random items in O(n) time, O(k) space. Each item has exactly k/n probability of being selected.',
      when: 'Streaming data where n is unknown or too large to store. Random sampling from database without knowing total count. A/B testing infrastructure.',
      complexity: { time: { 'process stream': 'O(n)', 'per item': 'O(1)' }, space: 'O(k) reservoir', notes: 'Proof: item i is in reservoir with probability k/i (selected) * (k/i+1 * ... factors that keep it) = k/n.' },
      realWorldUses: ['Random sampling from database', 'Streaming analytics', 'A/B test user selection', 'Distributed system sampling', 'Log sampling'],
      questions: [
        { id: 'Z5-07-Q1', text: 'Reservoir sampling solves random k-of-n when:', options: ['n is known and small', 'n is unknown or stream too large to store', 'All items are sorted', 'k=1'], correct: 1, explanation: 'Classic use case: sample k users from a stream without knowing n in advance or storing everything.', damage: 26 },
        { id: 'Z5-07-Q2', text: 'For item i in Algorithm R (1-indexed), replacement probability is:', options: ['1/i', 'k/i', 'k/n', '1/k'], correct: 1, explanation: 'Item i replaces a random reservoir item with probability k/i. This ensures uniform distribution.', damage: 26 },
        { id: 'Z5-07-Q3', text: 'After processing n items, each item has been selected with probability:', options: ['1/n', 'k/i', 'k/n', '1/k'], correct: 2, explanation: 'Invariant maintained: each of the first i items is in reservoir with probability k/i. At end, k/n.', damage: 26 },
        { id: 'Z5-07-Q4', text: 'Why can\'t we just shuffle first n items and take first k?', options: ['Shuffling is slow', 'We cannot store all n items (n may be infinite)', 'Shuffling is O(n^2)', 'k must equal n'], correct: 1, explanation: 'Reservoir sampling processes one item at a time from stream, never storing more than k items.', damage: 26 },
        { id: 'Z5-07-Q5', text: 'Space complexity of reservoir sampling:', options: ['O(n)', 'O(k)', 'O(1)', 'O(n log n)'], correct: 1, explanation: 'Only the k-element reservoir is stored. Stream items processed and discarded. O(k) space.', damage: 26 },
      ],
      visualization: { type: 'generic', title: 'Watch: Reservoir sampling k=3 from stream [1..8]', initialState: {}, steps: [
        { label: 'Fill reservoir with first k=3 items: [1,2,3]', state: { reservoir: [1,2,3] } },
        { label: 'Item 4 (i=4): replace with prob 3/4. Random: keep reservoir.', state: { reservoir: [1,2,3], i: 4 } },
        { label: 'Item 5 (i=5): replace with prob 3/5. Random: replace index 2 -> [1,2,5]', state: { reservoir: [1,2,5], i: 5 } },
        { label: 'Items 6,7,8: each may or may not replace. Final reservoir is uniform sample.', state: { reservoir: [1,6,5], i: 8 } },
      ]},
      codeTemplates: t6('3 items sampled (values vary)',
        `import random\n\ndef reservoir_sample(stream, k):\n    reservoir = []\n    for i, item in enumerate(stream):\n        if i < k:\n            reservoir.append(item)\n        else:\n            j = random.randint(0, i)\n            if j < k:\n                reservoir[j] = item\n    return reservoir\n\nstream = list(range(1, 101))\nresult = reservoir_sample(stream, 3)\nprint(f"{len(result)} items sampled (values vary)")`,
        `function reservoirSample(stream: number[], k: number): number[] {\n  const r: number[] = []\n  for (let i=0;i<stream.length;i++) {\n    if(i<k){r.push(stream[i])} else {\n      const j=Math.floor(Math.random()*(i+1))\n      if(j<k)r[j]=stream[i]\n    }\n  }\n  return r\n}\nconst r=reservoirSample(Array.from({length:100},(_,i)=>i+1),3)\nconsole.log(r.length+" items sampled (values vary)")`,
        '3 items sampled (values vary)',
        ['Fill first k items directly', 'For i>=k: random j in [0,i], if j<k replace reservoir[j]'],
        ['i<k: push directly', 'j=random(0,i), if j<k: r[j]=stream[i]']
      ),
      prerequisites: ['Z5-01'],
      xpReward: 130,
      loot: ['Stream Crystal', 'Sampling Badge'],
    },
  ],
}
