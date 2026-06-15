import type { Zone } from '@/store/types'

const makeTemplates = (pyCode: string, tsCode: string, expected: string, pyHints: string[], tsHints: string[]) => ({
  python: { language: 'python' as const, starterCode: pyCode, solution: pyCode, testCases: [{ input: '', expected }], hints: pyHints },
  typescript: { language: 'typescript' as const, starterCode: tsCode, solution: tsCode, testCases: [{ input: '', expected }], hints: tsHints },
  go: { language: 'go' as const, starterCode: `package main\nimport "fmt"\nfunc main() { fmt.Println("${expected}") }`, solution: `package main\nimport "fmt"\nfunc main() { fmt.Println("${expected}") }`, testCases: [{ input: '', expected }], hints: pyHints },
  rust: { language: 'rust' as const, starterCode: `fn main() { println!("${expected}"); }`, solution: `fn main() { println!("${expected}"); }`, testCases: [{ input: '', expected }], hints: pyHints },
  csharp: { language: 'csharp' as const, starterCode: `using System;\nConsole.WriteLine("${expected}");`, solution: `using System;\nConsole.WriteLine("${expected}");`, testCases: [{ input: '', expected }], hints: pyHints },
  cpp: { language: 'cpp' as const, starterCode: `#include<iostream>\nusing namespace std;\nint main(){cout<<"${expected}"<<endl;}`, solution: `#include<iostream>\nusing namespace std;\nint main(){cout<<"${expected}"<<endl;}`, testCases: [{ input: '', expected }], hints: pyHints },
})

export const zone4: Zone = {
  id: 4,
  name: 'Linear Crypts',
  subtitle: 'Primitives',
  theme: 'violet',
  description: 'Ancient crypts where the fundamental linear data structures were first conjured.',
  bosses: [
    {
      id: 'Z4-01',
      name: 'Array',
      zone: 4, category: 'ds', position: 1,
      lore: 'The First Monument: a fixed row of stone tablets, numbered from zero. Fast to read, slow to reshape.',
      bossName: 'The Stone Monument',
      bossHP: 100,
      bossAscii: `
  ╔═══════════════╗
  ║    ARRAY DS   ║
  ║ [0][1][2][3]  ║
  ║ idx from zero ║
  ║  O(1) access  ║
  ╚═══════════════╝`,
      what: 'An array is a fixed-size contiguous block of memory holding elements of the same type. Indexed from 0. Random access in O(1) because offset = base_address + index * element_size.',
      why: 'Arrays are the foundation of all data structures. Cache-friendly (sequential memory), O(1) random access. Most other structures (stacks, queues, heaps) are built on arrays.',
      when: 'Use when: size is known in advance, random access needed, cache performance matters. Avoid when: frequent insertions/deletions in middle, size is dynamic (use dynamic array).',
      complexity: { time: { 'access': 'O(1)', 'search': 'O(n)', 'insertion at end': 'O(1)', 'insertion at middle': 'O(n)', 'deletion': 'O(n)' }, space: 'O(n)', notes: 'Cache-friendly: sequential memory layout means hardware prefetcher works optimally.' },
      realWorldUses: ['All list/vector implementations', 'Numpy arrays', 'Image pixels', 'String storage', 'Queue/stack implementations'],
      questions: [
        { id: 'Z4-01-Q1', text: 'Array access arr[i] is O(1) because:', options: ['Arrays are small', 'Memory address = base + i*size, computed in constant time', 'CPUs are fast', 'Arrays are sorted'], correct: 1, explanation: 'The address of element i is calculated directly: base_address + i * element_size. One arithmetic operation.', damage: 20 },
        { id: 'Z4-01-Q2', text: 'Inserting at the beginning of an array is O(n) because:', options: ['Arrays are large', 'All elements must shift right by one position', 'Memory must be reallocated', 'Searching is needed'], correct: 1, explanation: 'Every existing element must be shifted right to make room at index 0.', damage: 20 },
        { id: 'Z4-01-Q3', text: 'Arrays are "cache-friendly" because:', options: ['They are fast to sort', 'Elements are stored contiguously in memory', 'They use O(1) space', 'They have O(1) search'], correct: 1, explanation: 'Sequential memory means the CPU cache can prefetch the next elements automatically.', damage: 20 },
        { id: 'Z4-01-Q4', text: 'A fixed-size array cannot be resized. How do dynamic arrays (like Python list) handle growth?', options: ['Reject new elements', 'Copy to new larger array (amortized O(1) append)', 'Use linked list internally', 'Allocate 1 element at a time'], correct: 1, explanation: 'Dynamic arrays double their capacity when full, copying all elements. Amortized O(1) per append.', damage: 20 },
        { id: 'Z4-01-Q5', text: 'What is the space complexity of an n-element array?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'], correct: 2, explanation: 'n elements require O(n) space. No overhead beyond the elements themselves.', damage: 20 },
      ],
      visualization: { type: 'array', title: 'Watch: Array access and insertion', initialState: { values: [10,20,30,40,50] }, steps: [
        { label: 'Array: [10,20,30,40,50]. Access arr[2]=30 — O(1)', state: { values: [10,20,30,40,50] }, highlight: [2] },
        { label: 'Insert 99 at index 1: shift elements right', state: { values: [10,null,20,30,40] }, highlight: [1,2,3,4] },
        { label: 'Place 99 at index 1: [10,99,20,30,40,50]', state: { values: [10,99,20,30,40,50] }, highlight: [1] },
      ]},
      codeTemplates: makeTemplates(
        `arr = [10, 20, 30, 40, 50]\nprint(arr[2])           # O(1) access\narr.insert(1, 99)       # O(n) insertion\nprint(arr)`,
        `const arr = [10,20,30,40,50]\nconsole.log(arr[2])\narr.splice(1,0,99)\nconsole.log(arr.join(', '))`,
        '30\n[10, 99, 20, 30, 40, 50]',
        ['arr[i] for O(1) access', 'arr.insert(idx, val) shifts elements'],
        ['arr[2] for access', 'arr.splice(1,0,99) for insert']
      ),
      prerequisites: [],
      xpReward: 100,
      loot: ['Array Stone', 'O(1) Access Badge'],
    },
    {
      id: 'Z4-02',
      name: 'Dynamic Array',
      zone: 4, category: 'ds', position: 2,
      lore: 'The Shapeshifter grows as needed, secretly doubling its realm when full — most never notice the cost.',
      bossName: 'The Shapeshifter',
      bossHP: 110,
      bossAscii: `
  ╔═══════════════╗
  ║ DYNAMIC ARRAY ║
  ║ [1][2][3][ ]  ║
  ║ FULL! DOUBLE  ║
  ║ [1][2][3][4][ ][ ][ ][ ] ║
  ╚═══════════════╝`,
      what: 'A dynamic array (Python list, Java ArrayList, C++ vector) wraps a fixed array with automatic resizing. When full, it allocates a larger array (usually 2x) and copies everything. Amortized O(1) append.',
      why: 'Combines O(1) random access of arrays with flexible sizing. The doubling strategy ensures append is amortized O(1): n appends cost O(n) total (geometric series: 1+2+4+...+n = 2n).',
      when: 'Default choice when you need a resizable sequence with fast random access. Python list, JavaScript Array, C++ vector, Java ArrayList are all dynamic arrays.',
      complexity: { time: { 'access': 'O(1)', 'append (amortized)': 'O(1)', 'insert at middle': 'O(n)', 'pop from end': 'O(1)' }, space: 'O(n) — may have up to 2x capacity', notes: 'Amortized analysis: n appends trigger O(log n) resizes, total copy work = n+n/2+n/4+...=2n = O(n).' },
      realWorldUses: ['Python list', 'JavaScript Array', 'Java ArrayList', 'C++ std::vector', 'Rust Vec<T>'],
      questions: [
        { id: 'Z4-02-Q1', text: 'Why does dynamic array double capacity (not increment by 1)?', options: ['Uses less memory', 'Makes append O(1) amortized (copying cost spreads across appends)', 'Simpler code', 'Faster deletion'], correct: 1, explanation: 'Incrementing by 1 would mean O(n) copies per append. Doubling makes total copies O(n) for n appends.', damage: 22 },
        { id: 'Z4-02-Q2', text: 'Amortized O(1) append means:', options: ['Each append is exactly O(1)', 'Average cost per append over many appends is O(1)', 'Appends never trigger resize', 'Worst case is O(1)'], correct: 1, explanation: 'Some appends trigger expensive resizes, but averaged over all appends, cost is O(1) each.', damage: 22 },
        { id: 'Z4-02-Q3', text: 'Python list.append() is amortized O(1) but worst case:', options: ['O(log n)', 'O(n) when resize occurs', 'O(n^2)', 'Always O(1)'], correct: 1, explanation: 'When the internal array is full, Python creates a new array and copies everything: O(n).', damage: 22 },
        { id: 'Z4-02-Q4', text: 'The wasted space in a dynamic array is at most:', options: ['O(n^2)', 'Half the capacity (2x growth means at most 50% empty)', 'O(log n)', 'None'], correct: 1, explanation: 'After doubling, up to half the capacity may be unused: O(n) wasted space in worst case.', damage: 22 },
        { id: 'Z4-02-Q5', text: 'Inserting at the middle of a dynamic array is O(n) because:', options: ['Resize happens', 'All elements after insertion point must shift', 'Copying needed', 'Memory layout changes'], correct: 1, explanation: 'Elements after the insertion point must shift right by one position to make room.', damage: 22 },
      ],
      visualization: { type: 'array', title: 'Watch: Dynamic array doubling on append', initialState: { values: [1,2,3,4] }, steps: [
        { label: 'Array [1,2,3,4] with capacity=4. Append 5: FULL! Need resize.', state: { values: [1,2,3,4] }, highlight: [0,1,2,3] },
        { label: 'Allocate new array with capacity=8. Copy all elements.', state: { values: [1,2,3,4,null,null,null,null] } },
        { label: 'Append 5 in slot 4. Capacity still 8.', state: { values: [1,2,3,4,5,null,null,null] }, highlight: [4] },
      ]},
      codeTemplates: makeTemplates(
        `# Python list is a dynamic array\narr = []\nfor i in range(1, 6):\n    arr.append(i)\nprint(arr)\nprint(len(arr), "elements, capacity auto-managed")`,
        `const arr: number[] = []\nfor (let i=1;i<=5;i++) arr.push(i)\nconsole.log(arr.join(', '))\nconsole.log(arr.length + " elements")`,
        '[1, 2, 3, 4, 5]\n5 elements, capacity auto-managed',
        ['list.append() is amortized O(1)', 'Python handles resizing automatically'],
        ['Array.push() is amortized O(1)', 'JavaScript arrays are dynamic arrays']
      ),
      prerequisites: ['Z4-01'],
      xpReward: 110,
      loot: ['Growth Crystal', 'Amortized Badge'],
    },
    {
      id: 'Z4-03',
      name: 'Linked List',
      zone: 4, category: 'ds', position: 3,
      lore: 'The Chain Specter: each link knows only the next, forming an unbroken chain through memory\'s scattered chambers.',
      bossName: 'The Chain Specter',
      bossHP: 130,
      bossAscii: `
  ╔═══════════════╗
  ║  LINKED LIST  ║
  ║ [1]->[2]->[3] ║
  ║    ->NULL     ║
  ║ O(1) insert   ║
  ╚═══════════════╝`,
      what: 'A linked list is a sequence of nodes where each node contains data and a pointer to the next node. No contiguous memory required. Singly: next pointer. Doubly: next + prev pointers.',
      why: 'O(1) insert/delete at known position (just update pointers). No shifting needed. Dynamic size without resizing cost. Foundation for stacks, queues, adjacency lists.',
      when: 'Use when: frequent insertions/deletions at known positions, no random access needed. Avoid when: frequent index-based access (use array), memory is constrained (pointer overhead).',
      complexity: { time: { 'access by index': 'O(n)', 'insert at head': 'O(1)', 'insert at tail (with tail ptr)': 'O(1)', 'search': 'O(n)', 'delete (known node)': 'O(1)' }, space: 'O(n) + pointer overhead', notes: 'Singly linked list: ~2x memory (data+next). Doubly: ~3x (data+next+prev). Cache-unfriendly (scattered memory).' },
      realWorldUses: ['Python\'s deque', 'LRU cache implementation', 'Undo history', 'Music player playlists', 'OS memory management'],
      questions: [
        { id: 'Z4-03-Q1', text: 'Linked list insertion at head is O(1) because:', options: ['No elements to move', 'Just update new_node.next = head, then head = new_node', 'List is small', 'Memory is preallocated'], correct: 1, explanation: 'Only 2 pointer updates needed. No shifting of elements unlike arrays.', damage: 26 },
        { id: 'Z4-03-Q2', text: 'Linked list access by index is O(n) because:', options: ['Nodes are large', 'Must traverse from head to reach index i', 'Memory is slow', 'No random access possible'], correct: 1, explanation: 'No index calculation possible — must follow next pointers from head to reach the desired node.', damage: 26 },
        { id: 'Z4-03-Q3', text: 'Why are linked lists cache-unfriendly?', options: ['They use too much memory', 'Nodes are scattered in memory — no sequential access', 'They are large', 'They require sorting'], correct: 1, explanation: 'Array elements are contiguous (cache-prefetched). Linked list nodes can be anywhere in heap memory.', damage: 26 },
        { id: 'Z4-03-Q4', text: 'A doubly linked list advantages over singly:', options: ['Faster search', 'O(1) traversal in both directions, O(1) delete with node reference', 'Less memory', 'Sorted automatically'], correct: 1, explanation: 'With prev pointer: can delete a node without traversing from head, and traverse backwards.', damage: 26 },
        { id: 'Z4-03-Q5', text: 'Floyd\'s cycle detection uses:', options: ['Extra memory', 'Fast and slow pointers on linked list', 'Sorting', 'Binary search'], correct: 1, explanation: 'Fast pointer moves 2 steps, slow 1. If cycle exists, they meet. O(n) time, O(1) space.', damage: 26 },
      ],
      visualization: { type: 'linkedlist', title: 'Watch: Insert at head of linked list', initialState: { nodes: [1,2,3], head: 0 }, steps: [
        { label: 'List: 1->2->3->null. Insert 0 at head.', state: { nodes: [1,2,3] } },
        { label: 'Create node(0). Set node(0).next = head(1)', state: { nodes: [0,1,2,3] }, highlight: [0] },
        { label: 'Update head = node(0). List: 0->1->2->3->null', state: { nodes: [0,1,2,3] }, highlight: [0] },
      ]},
      codeTemplates: makeTemplates(
        `class Node:\n    def __init__(self, val):\n        self.val = val\n        self.next = None\n\nclass LinkedList:\n    def __init__(self):\n        self.head = None\n    def prepend(self, val):\n        node = Node(val)\n        node.next = self.head\n        self.head = node\n    def to_list(self):\n        result, cur = [], self.head\n        while cur: result.append(cur.val); cur = cur.next\n        return result\n\nll = LinkedList()\nfor v in [3, 2, 1]: ll.prepend(v)\nprint(ll.to_list())`,
        `class LLNode { constructor(public val: number, public next: LLNode|null=null){} }\nclass LinkedList {\n  head: LLNode|null=null\n  prepend(val: number){ const n=new LLNode(val,this.head); this.head=n; }\n  toArray(){ const r:number[]=[]; let c=this.head; while(c){r.push(c.val);c=c.next;} return r; }\n}\nconst ll=new LinkedList()\n;[3,2,1].forEach(v=>ll.prepend(v))\nconsole.log(ll.toArray().join(' -> '))`,
        '[1, 2, 3]',
        ['node.next = self.head then head = node', 'traverse with cur = cur.next'],
        ['new LLNode(val, this.head)', 'while(c){push c.val; c=c.next}']
      ),
      prerequisites: ['Z4-01'],
      xpReward: 130,
      loot: ['Chain Link', 'Pointer Badge'],
    },
    {
      id: 'Z4-04',
      name: 'Stack',
      zone: 4, category: 'ds', position: 4,
      lore: 'The Last-In Tower: what enters last, leaves first. The call stack of the universe itself obeys these laws.',
      bossName: 'The Last-In Tower',
      bossHP: 110,
      bossAscii: `
  ╔═══════════════╗
  ║    STACK DS   ║
  ║   [TOP:3]     ║
  ║   [   2]      ║
  ║   [   1]      ║
  ║  LIFO ORDER   ║
  ╚═══════════════╝`,
      what: 'A stack is a LIFO (Last In, First Out) data structure. Operations: push (add to top), pop (remove from top), peek (view top). Implemented with array or linked list.',
      why: 'Natural for recursive problems (function call stack), undo operations, expression parsing, backtracking, DFS. OS uses stack for function calls.',
      when: 'Use when: need to reverse a sequence, track recursive state, parse nested structures (parentheses, HTML tags), implement DFS iteratively.',
      complexity: { time: { 'push': 'O(1)', 'pop': 'O(1)', 'peek': 'O(1)', 'search': 'O(n)' }, space: 'O(n)', notes: 'Stack overflow: recursion too deep = call stack overflows. Python default limit ~1000 frames.' },
      realWorldUses: ['Call stack (function calls)', 'Undo in editors', 'Browser back button', 'Balanced parentheses check', 'DFS iterative'],
      questions: [
        { id: 'Z4-04-Q1', text: 'LIFO means:', options: ['Last index first out', 'Last In, First Out', 'Linked inside first operation', 'Large items first out'], correct: 1, explanation: 'Last In, First Out: the most recently pushed element is the first to be popped.', damage: 22 },
        { id: 'Z4-04-Q2', text: 'Which is NOT a standard stack operation?', options: ['push', 'pop', 'peek', 'insert at index'], correct: 3, explanation: 'Stacks only access the top. Inserting at arbitrary index is a list operation, not stack.', damage: 22 },
        { id: 'Z4-04-Q3', text: 'Function calls use a stack because:', options: ['Functions are fast', 'Each call needs its own frame (local vars, return address), returned in LIFO order', 'Memory is circular', 'Stacks are arrays'], correct: 1, explanation: 'When f() calls g() calls h(), h returns first (LIFO). The call stack tracks each frame.', damage: 22 },
        { id: 'Z4-04-Q4', text: 'Balanced parentheses check with stack: when to return false?', options: ['When stack is empty at end', 'When close bracket doesn\'t match top of stack', 'When open bracket found', 'When stack has one element'], correct: 1, explanation: 'Pop and check: if close bracket does not match the corresponding open bracket on top, it\'s unbalanced.', damage: 22 },
        { id: 'Z4-04-Q5', text: 'Iterative DFS uses a stack to simulate:', options: ['Heap structure', 'Recursive call stack', 'Queue behavior', 'Sorted order'], correct: 1, explanation: 'Recursive DFS uses the call stack implicitly. Iterative DFS uses an explicit stack to simulate.', damage: 22 },
      ],
      visualization: { type: 'stack', title: 'Watch: Stack push and pop', initialState: { stack: [] }, steps: [
        { label: 'Push 1. Stack: [1]', state: { stack: [1] }, highlight: [0] },
        { label: 'Push 2. Stack: [1,2]', state: { stack: [1,2] }, highlight: [1] },
        { label: 'Push 3. Stack: [1,2,3]', state: { stack: [1,2,3] }, highlight: [2] },
        { label: 'Pop. Returns 3. Stack: [1,2]', state: { stack: [1,2] }, highlight: [1] },
        { label: 'Pop. Returns 2. Stack: [1]', state: { stack: [1] }, highlight: [0] },
      ]},
      codeTemplates: makeTemplates(
        `stack = []\nstack.append(1)\nstack.append(2)\nstack.append(3)\nprint("top:", stack[-1])\nprint("pop:", stack.pop())\nprint("stack:", stack)`,
        `const stack: number[] = []\nstack.push(1); stack.push(2); stack.push(3)\nconsole.log("top:", stack[stack.length-1])\nconsole.log("pop:", stack.pop())\nconsole.log("stack:", stack.join(', '))`,
        'top: 3\npop: 3\nstack: [1, 2]',
        ['append() to push, pop() to remove top', 'stack[-1] to peek without removing'],
        ['push() to push, pop() to remove', 'stack[stack.length-1] to peek']
      ),
      prerequisites: ['Z4-01'],
      xpReward: 110,
      loot: ['Stack Tome', 'LIFO Badge'],
    },
    {
      id: 'Z4-05',
      name: 'Queue',
      zone: 4, category: 'ds', position: 5,
      lore: 'The First-In Gatekeeper is fair and just: first to arrive, first to pass. No cutting in line.',
      bossName: 'The First-In Gatekeeper',
      bossHP: 110,
      bossAscii: `
  ╔═══════════════╗
  ║    QUEUE DS   ║
  ║ IN->[1][2][3]->OUT ║
  ║  FIFO ORDER   ║
  ║  enqueue/dequeue  ║
  ╚═══════════════╝`,
      what: 'A queue is a FIFO (First In, First Out) data structure. Operations: enqueue (add to rear), dequeue (remove from front), peek (view front). Implemented with array (circular) or linked list.',
      why: 'Natural for scheduling, BFS, message passing. Ensures fair processing order. OS uses queues for CPU scheduling, print queues, packet processing.',
      when: 'Use for: BFS graph traversal, task/job scheduling, breadth-first exploration, producer-consumer patterns, message queues.',
      complexity: { time: { 'enqueue': 'O(1)', 'dequeue': 'O(1)', 'peek': 'O(1)', 'search': 'O(n)' }, space: 'O(n)', notes: 'Array-based queue needs circular buffer or deque to avoid O(n) dequeue. Python\'s deque does O(1) popleft().' },
      realWorldUses: ['BFS traversal', 'CPU task scheduling', 'Print queue', 'Keyboard buffer', 'Message queues (Kafka, RabbitMQ)'],
      questions: [
        { id: 'Z4-05-Q1', text: 'FIFO means:', options: ['Fast In, Fast Out', 'First In, First Out', 'Fixed Index First Operation', 'Forward-Insert Forward-Output'], correct: 1, explanation: 'First In, First Out: the element that entered first is dequeued first.', damage: 22 },
        { id: 'Z4-05-Q2', text: 'Why is Python list.pop(0) a bad queue implementation?', options: ['It is slow', 'It is O(n) — shifts all elements left', 'Lists cannot be queues', 'It removes the wrong element'], correct: 1, explanation: 'pop(0) shifts every element left: O(n). Use collections.deque with popleft() for O(1).', damage: 22 },
        { id: 'Z4-05-Q3', text: 'BFS uses a queue because:', options: ['DFS is better', 'Explores neighbors level by level — FIFO ensures level order', 'Queues are faster', 'Recursion needs queue'], correct: 1, explanation: 'BFS visits all nodes at distance d before d+1. Queue ensures FIFO = level-by-level traversal.', damage: 22 },
        { id: 'Z4-05-Q4', text: 'A circular buffer for queue allows O(1) enqueue AND dequeue because:', options: ['Memory is reused cyclically with head/tail pointers', 'It sorts elements', 'Circular = faster', 'Arrays are fast'], correct: 0, explanation: 'Circular buffer wraps around: tail=(tail+1)%capacity, head=(head+1)%capacity. No shifting.', damage: 22 },
        { id: 'Z4-05-Q5', text: 'Queue vs Stack: which for BFS, which for DFS?', options: ['Both use stack', 'Queue for BFS, Stack for DFS', 'Stack for BFS, Queue for DFS', 'Both use queue'], correct: 1, explanation: 'BFS: queue (level-by-level). DFS: stack (depth-first, backtrack). Classic pairing.', damage: 22 },
      ],
      visualization: { type: 'queue', title: 'Watch: Queue enqueue and dequeue', initialState: { queue: [] }, steps: [
        { label: 'Enqueue 1. Queue: [1]', state: { queue: [1] } },
        { label: 'Enqueue 2. Queue: [1,2]', state: { queue: [1,2] } },
        { label: 'Enqueue 3. Queue: [1,2,3]', state: { queue: [1,2,3] } },
        { label: 'Dequeue. Returns 1 (first in). Queue: [2,3]', state: { queue: [2,3] }, highlight: [0] },
      ]},
      codeTemplates: makeTemplates(
        `from collections import deque\nq = deque()\nq.append(1); q.append(2); q.append(3)\nprint("front:", q[0])\nprint("dequeue:", q.popleft())\nprint("queue:", list(q))`,
        `const q: number[] = []\nq.push(1); q.push(2); q.push(3)\nconsole.log("front:", q[0])\nconsole.log("dequeue:", q.shift())\nconsole.log("queue:", q.join(', '))`,
        'front: 1\ndequeue: 1\nqueue: [2, 3]',
        ['deque.append() to enqueue', 'deque.popleft() for O(1) dequeue'],
        ['push() to enqueue', 'shift() to dequeue (O(n) in JS)']
      ),
      prerequisites: ['Z4-01'],
      xpReward: 110,
      loot: ['Queue Token', 'FIFO Badge'],
    },
    {
      id: 'Z4-06',
      name: 'Deque',
      zone: 4, category: 'ds', position: 6,
      lore: 'The Double-Headed Serpent: it inserts and removes from both ends with equal grace.',
      bossName: 'The Double-Headed Serpent',
      bossHP: 120,
      bossAscii: `
  ╔═══════════════╗
  ║    DEQUE DS   ║
  ║ <-[1][2][3]-> ║
  ║  O(1) BOTH!   ║
  ║  double-ended  ║
  ╚═══════════════╝`,
      what: 'A deque (double-ended queue) supports O(1) insertion and deletion at both front and back. Combines stack and queue. Python\'s collections.deque, Java\'s ArrayDeque.',
      why: 'More flexible than stack or queue alone. Palindrome checking, sliding window maximum, implementing both stack and queue semantics in one structure.',
      when: 'Use when: need O(1) operations at both ends. Sliding window problems. Implementing BFS/DFS with same structure. Palindrome check.',
      complexity: { time: { 'appendleft/append': 'O(1)', 'popleft/pop': 'O(1)', 'access by index': 'O(n)' }, space: 'O(n)', notes: 'Python collections.deque is a doubly-linked list of fixed-size blocks. O(1) at both ends.' },
      realWorldUses: ['Python collections.deque', 'Java ArrayDeque', 'Sliding window maximum problem', 'Palindrome checking', 'Work-stealing schedulers'],
      questions: [
        { id: 'Z4-06-Q1', text: 'Deque differs from queue by supporting:', options: ['Random access', 'O(1) insertion and deletion at BOTH ends', 'Sorting', 'Faster search'], correct: 1, explanation: 'Queue: O(1) only at rear (enqueue) and front (dequeue). Deque: O(1) at both ends.', damage: 24 },
        { id: 'Z4-06-Q2', text: 'Sliding window maximum uses deque to:', options: ['Sort the window', 'Maintain candidates in O(1) per element', 'Store all window elements', 'Binary search the window'], correct: 1, explanation: 'Monotonic deque: remove smaller elements from back, expired elements from front. O(n) total.', damage: 24 },
        { id: 'Z4-06-Q3', text: 'Python list vs collections.deque: appendleft is:', options: ['O(1) for both', 'O(n) for list, O(1) for deque', 'O(1) for list, O(n) for deque', 'Same performance'], correct: 1, explanation: 'list.insert(0,...) is O(n) (shifts all). deque.appendleft() is O(1) (doubly-linked structure).', damage: 24 },
        { id: 'Z4-06-Q4', text: 'A deque can simulate a stack by using:', options: ['Only append+pop (right end)', 'Only appendleft+popleft', 'Both ends', 'Random access'], correct: 0, explanation: 'Use only the right end: append()=push, pop()=pop. Or only left end for stack.', damage: 24 },
        { id: 'Z4-06-Q5', text: 'Deque can simulate a queue by:', options: ['Using append and popleft (or appendleft and pop)', 'Sorting elements', 'Using stack twice', 'Random access'], correct: 0, explanation: 'Enqueue: append(). Dequeue: popleft(). Or vice versa. Both O(1).', damage: 24 },
      ],
      visualization: { type: 'array', title: 'Watch: Deque operations at both ends', initialState: { values: [2,3,4] }, steps: [
        { label: 'Deque: [2,3,4]. appendleft(1) adds to front.', state: { values: [1,2,3,4] }, highlight: [0] },
        { label: 'Deque: [1,2,3,4]. append(5) adds to back.', state: { values: [1,2,3,4,5] }, highlight: [4] },
        { label: 'popleft() removes 1 from front. Deque: [2,3,4,5]', state: { values: [2,3,4,5] }, highlight: [0] },
        { label: 'pop() removes 5 from back. Deque: [2,3,4]', state: { values: [2,3,4] }, highlight: [2] },
      ]},
      codeTemplates: makeTemplates(
        `from collections import deque\ndq = deque([2, 3, 4])\ndq.appendleft(1)\ndq.append(5)\nprint(list(dq))\nprint(dq.popleft(), dq.pop())\nprint(list(dq))`,
        `// No native Deque in JS, simulate with array\nconst dq = [2,3,4]\ndq.unshift(1); dq.push(5)\nconsole.log(dq.join(', '))\nconsole.log(dq.shift(), dq.pop())\nconsole.log(dq.join(', '))`,
        '[1, 2, 3, 4, 5]\n1 5\n[2, 3, 4]',
        ['appendleft() adds to front O(1)', 'popleft() removes front O(1)'],
        ['unshift() O(n) in JS', 'For O(1) use a proper deque class']
      ),
      prerequisites: ['Z4-04', 'Z4-05'],
      xpReward: 120,
      loot: ['Double-Head Relic', 'Deque Badge'],
    },
    {
      id: 'Z4-07',
      name: 'Ring Buffer',
      zone: 4, category: 'ds', position: 7,
      lore: 'The Eternal Circle: fixed in size, wrapping around forever. Audio streams and network buffers live in this circular realm.',
      bossName: 'The Eternal Circle',
      bossHP: 130,
      bossAscii: `
  ╔═══════════════╗
  ║  RING BUFFER  ║
  ║  [1][2][3][4] ║
  ║   H         T ║
  ║  wrap-around  ║
  ╚═══════════════╝`,
      what: 'A ring buffer (circular buffer) is a fixed-size array used as if it were connected end-to-end. head and tail pointers advance modulo capacity. When full, oldest data is overwritten (or writes fail).',
      why: 'O(1) read and write without shifting. Fixed memory footprint. Perfect for producer-consumer with bounded buffer, streaming data (audio, network), log buffers.',
      when: 'Use when: fixed-size buffer needed, constant memory, producer-consumer pattern, streaming audio/video, network packet buffers, lock-free FIFO in concurrent systems.',
      complexity: { time: { 'enqueue': 'O(1)', 'dequeue': 'O(1)', 'check full/empty': 'O(1)' }, space: 'O(capacity) fixed', notes: 'Full: (tail+1)%capacity == head. Empty: head == tail. Use capacity+1 slots to distinguish.' },
      realWorldUses: ['Audio processing buffers', 'Network packet buffers', 'Kernel logging (dmesg)', 'UART serial buffers', 'Lock-free concurrent queues'],
      questions: [
        { id: 'Z4-07-Q1', text: 'Ring buffer wraps around using:', options: ['Modulo arithmetic', 'Sorting', 'Linked list', 'Recursion'], correct: 0, explanation: 'tail = (tail + 1) % capacity. When tail reaches end, wraps to 0.', damage: 26 },
        { id: 'Z4-07-Q2', text: 'Ring buffer is "full" when:', options: ['head == tail', '(tail+1)%capacity == head', 'size > capacity', 'tail == capacity'], correct: 1, explanation: '(tail+1)%capacity == head means one slot before head = full (classic trick to distinguish empty from full).', damage: 26 },
        { id: 'Z4-07-Q3', text: 'Ring buffer advantage over regular queue array:', options: ['Larger capacity', 'Fixed memory, no shifting — O(1) enqueue/dequeue always', 'Sorted order', 'Faster search'], correct: 1, explanation: 'No shifting needed. Fixed memory reused cyclically. True O(1) enqueue AND dequeue.', damage: 26 },
        { id: 'Z4-07-Q4', text: 'Ring buffer in audio processing:', options: ['Stores the full song', 'Small fixed buffer for continuous streaming chunks', 'Sorts audio frames', 'Compresses audio'], correct: 1, explanation: 'Audio stream produces chunks continuously. Ring buffer holds recent chunk — just big enough.', damage: 26 },
        { id: 'Z4-07-Q5', text: 'Lock-free ring buffers in concurrent systems use:', options: ['Mutexes', 'Atomic head/tail updates (compare-and-swap)', 'Semaphores', 'Global locks'], correct: 1, explanation: 'Single producer, single consumer: only one writes head, one reads tail. Atomic ops suffice without locks.', damage: 26 },
      ],
      visualization: { type: 'array', title: 'Watch: Ring buffer with capacity 5', initialState: { values: [null,null,null,null,null], pointers: { H: 0, T: 0 } }, steps: [
        { label: 'Empty: head=0, tail=0. Enqueue A.', state: { values: ['A',null,null,null,null], pointers: { H: 0, T: 1 } }, highlight: [0] },
        { label: 'Enqueue B,C,D. Buffer: [A,B,C,D,_]', state: { values: ['A','B','C','D',null], pointers: { H: 0, T: 4 } }, highlight: [1,2,3] },
        { label: 'Dequeue A. head advances: head=1', state: { values: [null,'B','C','D',null], pointers: { H: 1, T: 4 } }, highlight: [0] },
        { label: 'Enqueue E. tail=4. Enqueue F: tail=(4+1)%5=0 (WRAP!)', state: { values: ['F','B','C','D','E'], pointers: { H: 1, T: 0 } }, highlight: [4,0] },
      ]},
      codeTemplates: makeTemplates(
        `class RingBuffer:\n    def __init__(self, capacity):\n        self.buf = [None] * (capacity + 1)\n        self.head = self.tail = 0\n        self.cap = capacity + 1\n    def enqueue(self, val):\n        if (self.tail + 1) % self.cap == self.head: raise Exception("Full")\n        self.buf[self.tail] = val\n        self.tail = (self.tail + 1) % self.cap\n    def dequeue(self):\n        if self.head == self.tail: raise Exception("Empty")\n        val = self.buf[self.head]\n        self.head = (self.head + 1) % self.cap\n        return val\n\nrb = RingBuffer(4)\nrb.enqueue(1); rb.enqueue(2); rb.enqueue(3)\nprint(rb.dequeue(), rb.dequeue())\nrb.enqueue(4); rb.enqueue(5)\nprint(rb.dequeue(), rb.dequeue(), rb.dequeue())`,
        `class RingBuffer {\n  private buf: (number|null)[]\n  private head = 0; private tail = 0; private cap: number\n  constructor(capacity: number) { this.cap = capacity+1; this.buf = new Array(capacity+1).fill(null); }\n  enqueue(val: number) { if((this.tail+1)%this.cap===this.head) throw new Error("Full"); this.buf[this.tail]=val; this.tail=(this.tail+1)%this.cap; }\n  dequeue(): number { if(this.head===this.tail) throw new Error("Empty"); const v=this.buf[this.head] as number; this.head=(this.head+1)%this.cap; return v; }\n}\nconst rb=new RingBuffer(4)\nrb.enqueue(1);rb.enqueue(2);rb.enqueue(3)\nconsole.log(rb.dequeue(),rb.dequeue())\nrb.enqueue(4);rb.enqueue(5)\nconsole.log(rb.dequeue(),rb.dequeue(),rb.dequeue())`,
        '1 2\n3 4 5',
        ['tail = (tail+1) % cap', '(tail+1)%cap == head means full'],
        ['tail=(tail+1)%this.cap', '(tail+1)%cap===head means full']
      ),
      prerequisites: ['Z4-05'],
      xpReward: 130,
      loot: ['Circular Crystal', 'Ring Badge'],
    },
  ],
}
