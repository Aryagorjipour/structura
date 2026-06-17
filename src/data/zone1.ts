import type { Zone } from '@/store/types'

export const zone1: Zone = {
  id: 1,
  name: 'Foundation Vaults',
  subtitle: 'The Thinking Tools',
  theme: 'emerald',
  description: 'Ancient chambers where the laws of computation were first carved in stone.',
  bosses: [
    {
      id: 'Z1-01',
      name: 'Big-O Analysis',
      zone: 1, category: 'algo', position: 1,
      lore: 'Before the first algorithm was born, The Complexity Oracle set the laws. It watches every operation, every loop, every call — judging not by seconds, but by growth.',
      bossName: 'The Complexity Oracle',
      bossHP: 100,
      bossAscii: `
  ╔═══════════════╗
  ║   O(?)  BOSS  ║
  ║    @  @       ║
  ║      ___      ║
  ║   O(n2) !!    ║
  ║   /     \\    ║
  ╚═══════════════╝`,
      what: 'Big-O notation describes the upper bound of an algorithm\'s growth rate as input size n approaches infinity. It classifies algorithms by how their time or space requirements scale, ignoring constant factors and lower-order terms.',
      why: 'Without Big-O, you cannot compare algorithms objectively. A 1-second algorithm on 100 items might take 100 seconds on 1000 items (O(n^2)) or only 2 seconds (O(n log n)). Big-O gives you a language to predict and justify performance.',
      when: 'Always. Every time you choose a data structure or algorithm, you are implicitly choosing a complexity class. Explicit Big-O analysis is most critical when n is large (>10,000) or performance is a constraint.',
      complexity: {
        time: { 'analysis itself': 'O(1)' },
        space: 'O(1)',
        notes: 'Common classes in order: O(1) < O(log n) < O(n) < O(n log n) < O(n^2) < O(2^n) < O(n!)',
      },
      realWorldUses: ['Every code review discussion', 'System design interviews', 'Database query planning', 'Algorithm textbooks'],
      questions: [
        {
          id: 'Z1-01-Q1',
          text: 'What does O(n^2) mean for an algorithm?',
          options: ['Runs in exactly n^2 milliseconds', 'Time grows quadratically with input size', 'Uses n^2 bytes of memory', 'Has n^2 recursive calls'],
          correct: 1,
          explanation: 'Big-O describes growth rate, not absolute time. O(n^2) means if n doubles, runtime roughly quadruples.',
          damage: 20,
        },
        {
          id: 'Z1-01-Q2',
          text: 'Which is fastest for large n?',
          options: ['O(n log n)', 'O(n^2)', 'O(2^n)', 'O(n^3)'],
          correct: 0,
          explanation: 'O(n log n) grows slowest. At n=1000: n log n ~10,000 vs n^2 = 1,000,000.',
          damage: 20,
        },
        {
          id: 'Z1-01-Q3',
          text: 'What is the Big-O of: for i in range(n): for j in range(n): print(i,j)?',
          options: ['O(n)', 'O(log n)', 'O(n^2)', 'O(2n)'],
          correct: 2,
          explanation: 'Two nested loops each running n times = n x n = O(n^2).',
          damage: 20,
        },
        {
          id: 'Z1-01-Q4',
          text: 'O(3n^2 + 100n + 5) simplifies to?',
          options: ['O(3n^2)', 'O(n^2 + n)', 'O(n^2)', 'O(100n)'],
          correct: 2,
          explanation: 'Drop constants and lower-order terms. Dominant term is n^2, so O(n^2).',
          damage: 20,
        },
        {
          id: 'Z1-01-Q5',
          text: 'Binary search on a sorted array is:',
          options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'],
          correct: 1,
          explanation: 'Binary search halves the search space each step. log2(n) steps total = O(log n).',
          damage: 20,
        },
      ],
      visualization: {
        type: 'generic',
        title: 'Watch: How n^2 vs n log n diverge',
        initialState: { chart: [
          { n: 10,   nlogn: 33,    n2: 100 },
          { n: 100,  nlogn: 665,   n2: 10000 },
          { n: 1000, nlogn: 9966,  n2: 1000000 },
        ]},
        steps: [
          { label: 'At n=10: O(n log n)=33 ops, O(n^2)=100 ops — close', state: { active: 0 } },
          { label: 'At n=100: O(n log n)=665, O(n^2)=10,000 — 15x gap', state: { active: 1 } },
          { label: 'At n=1000: O(n log n)=9,966, O(n^2)=1,000,000 — 100x gap!', state: { active: 2 } },
        ],
      },
      codeTemplates: {
        python: {
          language: 'python',
          starterCode: `def linear_scan(arr):
    count = 0
    for item in arr:
        count += 1
    return count

def nested_scan(arr):
    count = 0
    for i in arr:
        for j in arr:
            count += 1
    return count

n = 10
arr = list(range(n))
print(f"Linear: {linear_scan(arr)} operations (O(n))")
print(f"Nested: {nested_scan(arr)} operations (O(n^2))")`,
          solution: `def linear_scan(arr):
    count = 0
    for item in arr:
        count += 1
    return count

def nested_scan(arr):
    count = 0
    for i in arr:
        for j in arr:
            count += 1
    return count

n = 10
arr = list(range(n))
print(f"Linear: {linear_scan(arr)} operations (O(n))")
print(f"Nested: {nested_scan(arr)} operations (O(n^2))")`,
          testCases: [{ input: '', expected: 'Linear: 10 operations (O(n))\nNested: 100 operations (O(n^2))' }],
          hints: ['n=10 so linear loop runs 10 times', 'Nested loop runs n*n = 100 times'],
        },
        typescript: {
          language: 'typescript',
          starterCode: `function linearScan(arr: number[]): number {
  let count = 0
  for (const _ of arr) count++
  return count
}

function nestedScan(arr: number[]): number {
  let count = 0
  for (const i of arr)
    for (const j of arr) count++
  return count
}

const arr = Array.from({length: 10}, (_, i) => i)
console.log(\`Linear: \${linearScan(arr)} operations (O(n))\`)
console.log(\`Nested: \${nestedScan(arr)} operations (O(n^2))\`)`,
          solution: `function linearScan(arr: number[]): number {
  let count = 0
  for (const _ of arr) count++
  return count
}
function nestedScan(arr: number[]): number {
  let count = 0
  for (const i of arr) for (const j of arr) count++
  return count
}
const arr = Array.from({length: 10}, (_, i) => i)
console.log(\`Linear: \${linearScan(arr)} operations (O(n))\`)
console.log(\`Nested: \${nestedScan(arr)} operations (O(n^2))\`)`,
          testCases: [{ input: '', expected: 'Linear: 10 operations (O(n))\nNested: 100 operations (O(n^2))' }],
          hints: ['Fill the blanks with n and n*n', 'n=10 here'],
        },
        go: {
          language: 'go',
          starterCode: `package main
import "fmt"

func linearScan(arr []int) int {
  count := 0
  for range arr { count++ }
  return count
}

func nestedScan(arr []int) int {
  count := 0
  for range arr {
    for range arr { count++ }
  }
  return count
}

func main() {
  arr := make([]int, 10)
  fmt.Printf("Linear: %d operations (O(n))\\n", linearScan(arr))
  fmt.Printf("Nested: %d operations (O(n^2))\\n", nestedScan(arr))
}`,
          solution: `package main
import "fmt"
func linearScan(arr []int) int { count := 0; for range arr { count++ }; return count }
func nestedScan(arr []int) int { count := 0; for range arr { for range arr { count++ } }; return count }
func main() {
  arr := make([]int, 10)
  fmt.Printf("Linear: %d operations (O(n))\\n", linearScan(arr))
  fmt.Printf("Nested: %d operations (O(n^2))\\n", nestedScan(arr))
}`,
          testCases: [{ input: '', expected: 'Linear: 10 operations (O(n))\nNested: 100 operations (O(n^2))' }],
          hints: ['Replace ___ with n and n^2'],
        },
        rust: {
          language: 'rust',
          starterCode: `fn linear_scan(arr: &[i32]) -> usize {
    arr.iter().count()
}

fn nested_scan(arr: &[i32]) -> usize {
    let mut count = 0;
    for _ in arr { for _ in arr { count += 1; } }
    count
}

fn main() {
    let arr: Vec<i32> = (0..10).collect();
    println!("Linear: {} operations (O(n))", linear_scan(&arr));
    println!("Nested: {} operations (O(n^2))", nested_scan(&arr));
}`,
          solution: `fn linear_scan(arr: &[i32]) -> usize { arr.iter().count() }
fn nested_scan(arr: &[i32]) -> usize { let mut c=0; for _ in arr { for _ in arr { c+=1; } } c }
fn main() {
    let arr: Vec<i32> = (0..10).collect();
    println!("Linear: {} operations (O(n))", linear_scan(&arr));
    println!("Nested: {} operations (O(n^2))", nested_scan(&arr));
}`,
          testCases: [{ input: '', expected: 'Linear: 10 operations (O(n))\nNested: 100 operations (O(n^2))' }],
          hints: ['n=10, nested is n*n=100'],
        },
        csharp: {
          language: 'csharp',
          starterCode: `using System;
using System.Linq;

int LinearScan(int[] arr) => arr.Length;
int NestedScan(int[] arr) {
    int count = 0;
    foreach (var i in arr)
        foreach (var j in arr) count++;
    return count;
}

var arr = Enumerable.Range(0, 10).ToArray();
Console.WriteLine($"Linear: {LinearScan(arr)} operations (O(n))");
Console.WriteLine($"Nested: {NestedScan(arr)} operations (O(n^2))");`,
          solution: `using System; using System.Linq;
int LinearScan(int[] arr) => arr.Length;
int NestedScan(int[] arr) { int c=0; foreach(var i in arr) foreach(var j in arr) c++; return c; }
var arr = Enumerable.Range(0, 10).ToArray();
Console.WriteLine($"Linear: {LinearScan(arr)} operations (O(n))");
Console.WriteLine($"Nested: {NestedScan(arr)} operations (O(n^2))");`,
          testCases: [{ input: '', expected: 'Linear: 10 operations (O(n))\nNested: 100 operations (O(n^2))' }],
          hints: ['Fill blanks: n and n^2'],
        },
        cpp: {
          language: 'cpp',
          starterCode: `#include <iostream>
#include <vector>
using namespace std;

int linearScan(vector<int>& arr) { return arr.size(); }
int nestedScan(vector<int>& arr) {
    int count = 0;
    for (auto& i : arr) for (auto& j : arr) count++;
    return count;
}

int main() {
    vector<int> arr(10);
    cout << "Linear: " << linearScan(arr) << " operations (O(n))" << endl;
    cout << "Nested: " << nestedScan(arr) << " operations (O(n^2))" << endl;
}`,
          solution: `#include <iostream>
#include <vector>
using namespace std;
int linearScan(vector<int>& arr) { return arr.size(); }
int nestedScan(vector<int>& arr) { int c=0; for(auto&i:arr) for(auto&j:arr) c++; return c; }
int main() {
    vector<int> arr(10);
    cout << "Linear: " << linearScan(arr) << " operations (O(n))" << endl;
    cout << "Nested: " << nestedScan(arr) << " operations (O(n^2))" << endl;
}`,
          testCases: [{ input: '', expected: 'Linear: 10 operations (O(n))\nNested: 100 operations (O(n^2))' }],
          hints: ['n and n^2 fill the blanks'],
        },
      },
      prerequisites: [],
      xpReward: 100,
      loot: ['Complexity Scroll', 'Big-O Badge'],
      sideQuests: [
        {
          id: 'sq-zone1-boss1-perfect',
          title: 'Flawless Scholar',
          description: 'Defeat this boss with a perfect quiz score',
          condition: 'perfect_quiz' as const,
          reward: { xp: 100, items: ['Scroll of Clarity'] },
        },
        {
          id: 'sq-zone1-boss1-speed',
          title: 'Speed Runner',
          description: 'Defeat this boss in under 90 seconds',
          condition: 'speed_run' as const,
          reward: { xp: 80 },
        },
      ],
    },
    {
      id: 'Z1-02',
      name: 'Recursion',
      zone: 1, category: 'algo', position: 2,
      lore: 'Deep in the vaults lives The Recursive Specter — it calls itself endlessly, each echo smaller than the last, until it reaches the base of all things.',
      bossName: 'The Recursive Specter',
      bossHP: 120,
      bossAscii: `
  ╔═══════════════╗
  ║  RECURSION    ║
  ║  f(n)=f(n-1) ║
  ║   [ghost]     ║
  ║  ...f(1)=1    ║
  ╚═══════════════╝`,
      what: 'Recursion is a technique where a function solves a problem by calling itself with a smaller input. Every recursive solution needs a base case (stopping condition) and a recursive case that reduces toward the base.',
      why: 'Many problems have naturally recursive structure: trees, graphs, divide-and-conquer. Recursion makes these solutions elegant and readable. It trades code simplicity for call stack space.',
      when: 'Use recursion when the problem decomposes into smaller identical subproblems: tree traversals, DFS, backtracking, mathematical sequences. Avoid when iteration is simpler or stack depth is a concern.',
      complexity: {
        time: { 'fibonacci naive': 'O(2^n)', 'factorial': 'O(n)', 'tree traversal': 'O(n)' },
        space: 'O(d) where d = recursion depth (call stack)',
        notes: 'Tail recursion can be optimized by some compilers to O(1) space. Python has a default recursion limit of 1000.',
      },
      realWorldUses: ['JSON parsing', 'File system traversal', 'DOM traversal', 'Quicksort/Mergesort', 'Compiler expression evaluation'],
      questions: [
        {
          id: 'Z1-02-Q1',
          text: 'What is the base case in recursion?',
          options: ['The first recursive call', 'The condition that stops recursion', 'The largest subproblem', 'The return type'],
          correct: 1,
          explanation: 'The base case is the stopping condition. Without it, recursion is infinite and causes stack overflow.',
          damage: 24,
        },
        {
          id: 'Z1-02-Q2',
          text: 'What happens without a base case?',
          options: ['Runs in O(1)', 'Returns None/null', 'Stack overflow error', 'Infinite loop on heap'],
          correct: 2,
          explanation: 'Without a base case, the function calls itself forever, exhausting the call stack.',
          damage: 24,
        },
        {
          id: 'Z1-02-Q3',
          text: 'What is the time complexity of naive recursive Fibonacci?',
          options: ['O(n)', 'O(n log n)', 'O(2^n)', 'O(n^2)'],
          correct: 2,
          explanation: 'Each call branches into 2 more, creating an exponential tree of calls.',
          damage: 24,
        },
        {
          id: 'Z1-02-Q4',
          text: 'What is the call stack space of factorial(n)?',
          options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'],
          correct: 2,
          explanation: 'factorial(n) calls factorial(n-1) ... factorial(1): n frames on the stack = O(n).',
          damage: 24,
        },
        {
          id: 'Z1-02-Q5',
          text: 'Memoization converts O(2^n) Fibonacci to:',
          options: ['O(log n)', 'O(n)', 'O(n log n)', 'O(1)'],
          correct: 1,
          explanation: 'Memoization caches each fib(k) result. Each of n values computed once = O(n) total.',
          damage: 24,
        },
      ],
      visualization: {
        type: 'generic',
        title: 'Watch: factorial(4) call stack',
        initialState: {},
        steps: [
          { label: 'Call factorial(4) — pushes frame onto stack', state: { stack: ['factorial(4)'] } },
          { label: 'factorial(4) calls factorial(3)', state: { stack: ['factorial(4)', 'factorial(3)'] } },
          { label: 'factorial(3) calls factorial(2)', state: { stack: ['factorial(4)', 'factorial(3)', 'factorial(2)'] } },
          { label: 'factorial(2) calls factorial(1)', state: { stack: ['factorial(4)', 'factorial(3)', 'factorial(2)', 'factorial(1)'] } },
          { label: 'BASE CASE: factorial(1) returns 1', state: { stack: ['factorial(4)', 'factorial(3)', 'factorial(2)'], returning: 1 } },
          { label: 'factorial(2) returns 2*1=2, stack shrinks', state: { stack: ['factorial(4)', 'factorial(3)'], returning: 2 } },
          { label: 'factorial(3) returns 3*2=6', state: { stack: ['factorial(4)'], returning: 6 } },
          { label: 'factorial(4) returns 4*6=24 — done!', state: { stack: [], returning: 24 } },
        ],
      },
      codeTemplates: {
        python: {
          language: 'python',
          starterCode: `def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

print(factorial(5))
print(factorial(0))`,
          solution: `def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

print(factorial(5))
print(factorial(0))`,
          testCases: [{ input: '', expected: '120\n1' }],
          hints: ['Base case: n<=1 returns 1', 'Recursive case: n * factorial(n-1)'],
        },
        typescript: {
          language: 'typescript',
          starterCode: `function factorial(n: number): number {
  if (n <= 1) return 1
  return n * factorial(n - 1)
}
console.log(factorial(5))
console.log(factorial(0))`,
          solution: `function factorial(n: number): number {
  if (n <= 1) return 1
  return n * factorial(n - 1)
}
console.log(factorial(5))
console.log(factorial(0))`,
          testCases: [{ input: '', expected: '120\n1' }],
          hints: ['Base case n<=1 returns 1', 'Multiply n by recursive result'],
        },
        go: {
          language: 'go',
          starterCode: `package main
import "fmt"
func factorial(n int) int {
  if n <= 1 { return 1 }
  return n * factorial(n-1)
}
func main() {
  fmt.Println(factorial(5))
  fmt.Println(factorial(0))
}`,
          solution: `package main
import "fmt"
func factorial(n int) int {
  if n <= 1 { return 1 }
  return n * factorial(n-1)
}
func main() {
  fmt.Println(factorial(5))
  fmt.Println(factorial(0))
}`,
          testCases: [{ input: '', expected: '120\n1' }],
          hints: ['if n <= 1 return 1', 'return n * factorial(n-1)'],
        },
        rust: {
          language: 'rust',
          starterCode: `fn factorial(n: u64) -> u64 {
    if n <= 1 { return 1; }
    n * factorial(n - 1)
}
fn main() {
    println!("{}", factorial(5));
    println!("{}", factorial(0));
}`,
          solution: `fn factorial(n: u64) -> u64 {
    if n <= 1 { return 1; }
    n * factorial(n - 1)
}
fn main() {
    println!("{}", factorial(5));
    println!("{}", factorial(0));
}`,
          testCases: [{ input: '', expected: '120\n1' }],
          hints: ['Base: n<=1 return 1', 'Recursive: n * factorial(n-1)'],
        },
        csharp: {
          language: 'csharp',
          starterCode: `using System;
long Factorial(long n) {
  if (n <= 1) return 1;
  return n * Factorial(n - 1);
}
Console.WriteLine(Factorial(5));
Console.WriteLine(Factorial(0));`,
          solution: `using System;
long Factorial(long n) {
  if (n <= 1) return 1;
  return n * Factorial(n - 1);
}
Console.WriteLine(Factorial(5));
Console.WriteLine(Factorial(0));`,
          testCases: [{ input: '', expected: '120\n1' }],
          hints: ['Base case: n<=1 return 1'],
        },
        cpp: {
          language: 'cpp',
          starterCode: `#include <iostream>
using namespace std;
long long factorial(long long n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}
int main() {
    cout << factorial(5) << endl;
    cout << factorial(0) << endl;
}`,
          solution: `#include <iostream>
using namespace std;
long long factorial(long long n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}
int main() {
    cout << factorial(5) << endl;
    cout << factorial(0) << endl;
}`,
          testCases: [{ input: '', expected: '120\n1' }],
          hints: ['if (n <= 1) return 1;', 'return n * factorial(n-1);'],
        },
      },
      prerequisites: ['Z1-01'],
      xpReward: 120,
      loot: ['Recursion Rune', 'Stack Trace Badge'],
    },
    {
      id: 'Z1-03',
      name: 'Divide & Conquer',
      zone: 1, category: 'algo', position: 3,
      lore: 'The Splitter King rules by breaking all problems in two. No challenge survives its bisection — it divides, conquers each half, then merges the spoils.',
      bossName: 'The Splitter King',
      bossHP: 130,
      bossAscii: `
  ╔═══════════════╗
  ║  D&C  BOSS   ║
  ║  [arr]-->[   ║
  ║    |-->[ ]   ║
  ║  SPLIT+MERGE  ║
  ╚═══════════════╝`,
      what: 'Divide and Conquer is an algorithm design paradigm: split the problem into smaller subproblems, solve each recursively, then combine their solutions. Classic examples are Merge Sort, Quick Sort, and Binary Search.',
      why: 'Many problems that are O(n^2) with brute force become O(n log n) with divide and conquer because splitting halves the work at each level, and log(n) levels means total work is n * log(n).',
      when: 'Use when the problem can be split into non-overlapping subproblems of the same type. If subproblems overlap (shared state), use Dynamic Programming instead.',
      complexity: {
        time: { 'merge sort': 'O(n log n)', 'binary search': 'O(log n)', 'matrix multiply (naive)': 'O(n^3)' },
        space: 'O(log n) to O(n) depending on implementation',
        notes: 'Master theorem: T(n) = aT(n/b) + f(n) determines recurrence complexity.',
      },
      realWorldUses: ['Merge Sort in standard libraries', 'MapReduce (divide work across machines)', 'FFT (Fast Fourier Transform)', 'Closest pair of points'],
      questions: [
        {
          id: 'Z1-03-Q1',
          text: 'Divide & Conquer consists of which 3 steps?',
          options: ['Loop, recurse, return', 'Divide, conquer, combine', 'Split, sort, join', 'Read, process, write'],
          correct: 1,
          explanation: 'The 3 steps are: Divide (split), Conquer (solve recursively), Combine (merge results).',
          damage: 26,
        },
        {
          id: 'Z1-03-Q2',
          text: 'Why is Merge Sort O(n log n) not O(n^2)?',
          options: ['It uses extra memory', 'It splits in half each level — log n levels, each O(n) work', 'It avoids comparisons', 'It runs in parallel'],
          correct: 1,
          explanation: 'log(n) split levels, each requiring O(n) merge work = O(n log n) total.',
          damage: 26,
        },
        {
          id: 'Z1-03-Q3',
          text: 'When should you use DP instead of D&C?',
          options: ['When input is sorted', 'When subproblems overlap and share state', 'When n is small', 'When memory is limited'],
          correct: 1,
          explanation: 'Overlapping subproblems (same subproblem computed multiple times) call for memoization/DP. D&C is for non-overlapping subproblems.',
          damage: 26,
        },
        {
          id: 'Z1-03-Q4',
          text: 'Binary search is Divide & Conquer because:',
          options: ['It uses recursion', 'It divides the array in half each step', 'It is fast', 'It requires sorted input'],
          correct: 1,
          explanation: 'Binary search divides the search space in half each step — the classic D&C operation.',
          damage: 26,
        },
        {
          id: 'Z1-03-Q5',
          text: 'The "combine" step of Merge Sort is:',
          options: ['The split', 'The recursive call', 'Merging two sorted halves', 'Choosing pivot'],
          correct: 2,
          explanation: 'After recursively sorting both halves, Merge Sort merges them into one sorted array — that is the combine step.',
          damage: 26,
        },
      ],
      visualization: {
        type: 'sortingbars',
        title: 'Watch: Merge Sort splitting and merging',
        initialState: { values: [8, 3, 5, 1, 9, 2, 7, 4] },
        steps: [
          { label: 'Start: [8,3,5,1,9,2,7,4]', state: { values: [8,3,5,1,9,2,7,4] } },
          { label: 'DIVIDE: split into [8,3,5,1] and [9,2,7,4]', state: { left: [8,3,5,1], right: [9,2,7,4] } },
          { label: 'DIVIDE: [8,3] | [5,1] | [9,2] | [7,4]', state: { groups: [[8,3],[5,1],[9,2],[7,4]] } },
          { label: 'DIVIDE: single elements (base case)', state: { groups: [[8],[3],[5],[1],[9],[2],[7],[4]] } },
          { label: 'COMBINE: merge [8],[3] -> [3,8]', state: { groups: [[3,8],[1,5],[2,9],[4,7]] } },
          { label: 'COMBINE: merge [3,8],[1,5] -> [1,3,5,8]', state: { groups: [[1,3,5,8],[2,4,7,9]] } },
          { label: 'COMBINE: final merge -> [1,2,3,4,5,7,8,9]', state: { values: [1,2,3,4,5,7,8,9] } },
        ],
      },
      codeTemplates: {
        python: {
          language: 'python',
          starterCode: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result

print(merge_sort([8, 3, 5, 1, 9, 2, 7, 4]))`,
          solution: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result

print(merge_sort([8, 3, 5, 1, 9, 2, 7, 4]))`,
          testCases: [{ input: '', expected: '[1, 2, 3, 4, 5, 7, 8, 9]' }],
          hints: ['Base case: array of 0 or 1 elements is already sorted', 'mid = len(arr) // 2', 'merge two sorted arrays by comparing front elements'],
        },
        typescript: {
          language: 'typescript',
          starterCode: `function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr
  const mid = Math.floor(arr.length / 2)
  const left = mergeSort(arr.slice(0, mid))
  const right = mergeSort(arr.slice(mid))
  return merge(left, right)
}

function merge(left: number[], right: number[]): number[] {
  const result: number[] = []
  let i = 0, j = 0
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) result.push(left[i++])
    else result.push(right[j++])
  }
  return result.concat(left.slice(i), right.slice(j))
}

console.log(mergeSort([8, 3, 5, 1, 9, 2, 7, 4]).join(', '))`,
          solution: `function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr
  const mid = Math.floor(arr.length / 2)
  return merge(mergeSort(arr.slice(0, mid)), mergeSort(arr.slice(mid)))
}
function merge(left: number[], right: number[]): number[] {
  const result: number[] = []
  let i = 0, j = 0
  while (i < left.length && j < right.length)
    result.push(left[i] <= right[j] ? left[i++] : right[j++])
  return result.concat(left.slice(i), right.slice(j))
}
console.log(mergeSort([8, 3, 5, 1, 9, 2, 7, 4]).join(', '))`,
          testCases: [{ input: '', expected: '1, 2, 3, 4, 5, 7, 8, 9' }],
          hints: ['Split at midpoint', 'Compare left[i] vs right[j] when merging'],
        },
        go: {
          language: 'go',
          starterCode: `package main
import "fmt"

func mergeSort(arr []int) []int {
  if len(arr) <= 1 { return arr }
  mid := len(arr) / 2
  left := mergeSort(arr[:mid])
  right := mergeSort(arr[mid:])
  return merge(left, right)
}

func merge(left, right []int) []int {
  result := []int{}
  i, j := 0, 0
  for i < len(left) && j < len(right) {
    if left[i] <= right[j] { result = append(result, left[i]); i++ } else { result = append(result, right[j]); j++ }
  }
  result = append(result, left[i:]...)
  result = append(result, right[j:]...)
  return result
}

func main() { fmt.Println(mergeSort([]int{8,3,5,1,9,2,7,4})) }`,
          solution: `package main
import "fmt"
func mergeSort(arr []int) []int {
  if len(arr) <= 1 { return arr }
  mid := len(arr) / 2
  return merge(mergeSort(arr[:mid]), mergeSort(arr[mid:]))
}
func merge(left, right []int) []int {
  result := []int{}
  i, j := 0, 0
  for i < len(left) && j < len(right) {
    if left[i] <= right[j] { result = append(result, left[i]); i++ } else { result = append(result, right[j]); j++ }
  }
  return append(append(result, left[i:]...), right[j:]...)
}
func main() { fmt.Println(mergeSort([]int{8,3,5,1,9,2,7,4})) }`,
          testCases: [{ input: '', expected: '[1 2 3 4 5 7 8 9]' }],
          hints: ['len(arr)/2 for midpoint', 'append remaining elements after merge loop'],
        },
        rust: {
          language: 'rust',
          starterCode: `fn merge_sort(arr: &[i32]) -> Vec<i32> {
    if arr.len() <= 1 { return arr.to_vec(); }
    let mid = arr.len() / 2;
    let left = merge_sort(&arr[..mid]);
    let right = merge_sort(&arr[mid..]);
    merge(&left, &right)
}

fn merge(left: &[i32], right: &[i32]) -> Vec<i32> {
    let mut result = Vec::new();
    let (mut i, mut j) = (0, 0);
    while i < left.len() && j < right.len() {
        if left[i] <= right[j] { result.push(left[i]); i += 1; }
        else { result.push(right[j]); j += 1; }
    }
    result.extend_from_slice(&left[i..]);
    result.extend_from_slice(&right[j..]);
    result
}

fn main() {
    println!("{:?}", merge_sort(&[8,3,5,1,9,2,7,4]));
}`,
          solution: `fn merge_sort(arr: &[i32]) -> Vec<i32> {
    if arr.len() <= 1 { return arr.to_vec(); }
    let mid = arr.len() / 2;
    merge(&merge_sort(&arr[..mid]), &merge_sort(&arr[mid..]))
}
fn merge(left: &[i32], right: &[i32]) -> Vec<i32> {
    let mut result = Vec::new();
    let (mut i, mut j) = (0, 0);
    while i < left.len() && j < right.len() {
        if left[i] <= right[j] { result.push(left[i]); i += 1; }
        else { result.push(right[j]); j += 1; }
    }
    result.extend_from_slice(&left[i..]); result.extend_from_slice(&right[j..]); result
}
fn main() { println!("{:?}", merge_sort(&[8,3,5,1,9,2,7,4])); }`,
          testCases: [{ input: '', expected: '[1, 2, 3, 4, 5, 7, 8, 9]' }],
          hints: ['arr.len()/2 for mid', 'extend_from_slice for remaining elements'],
        },
        csharp: {
          language: 'csharp',
          starterCode: `using System;
using System.Collections.Generic;

int[] MergeSort(int[] arr) {
    if (arr.Length <= 1) return arr;
    int mid = arr.Length / 2;
    var left = MergeSort(arr[..mid]);
    var right = MergeSort(arr[mid..]);
    return Merge(left, right);
}

int[] Merge(int[] left, int[] right) {
    var result = new List<int>();
    int i = 0, j = 0;
    while (i < left.Length && j < right.Length)
        result.Add(left[i] <= right[j] ? left[i++] : right[j++]);
    while (i < left.Length) result.Add(left[i++]);
    while (j < right.Length) result.Add(right[j++]);
    return result.ToArray();
}

Console.WriteLine(string.Join(", ", MergeSort(new[]{8,3,5,1,9,2,7,4})));`,
          solution: `using System;
using System.Collections.Generic;
int[] MergeSort(int[] arr) {
    if (arr.Length <= 1) return arr;
    int mid = arr.Length / 2;
    return Merge(MergeSort(arr[..mid]), MergeSort(arr[mid..]));
}
int[] Merge(int[] left, int[] right) {
    var result = new List<int>(); int i=0,j=0;
    while(i<left.Length&&j<right.Length) result.Add(left[i]<=right[j]?left[i++]:right[j++]);
    while(i<left.Length) result.Add(left[i++]);
    while(j<right.Length) result.Add(right[j++]);
    return result.ToArray();
}
Console.WriteLine(string.Join(", ", MergeSort(new[]{8,3,5,1,9,2,7,4})));`,
          testCases: [{ input: '', expected: '1, 2, 3, 4, 5, 7, 8, 9' }],
          hints: ['arr.Length/2 for mid', 'arr[..mid] and arr[mid..] for slicing'],
        },
        cpp: {
          language: 'cpp',
          starterCode: `#include <iostream>
#include <vector>
using namespace std;

vector<int> merge_vecs(vector<int>& left, vector<int>& right) {
    vector<int> result;
    int i=0, j=0;
    while (i<(int)left.size() && j<(int)right.size())
        result.push_back(left[i]<=right[j] ? left[i++] : right[j++]);
    while (i<(int)left.size()) result.push_back(left[i++]);
    while (j<(int)right.size()) result.push_back(right[j++]);
    return result;
}

vector<int> merge_sort(vector<int> arr) {
    if (arr.size() <= 1) return arr;
    int mid = arr.size()/2;
    vector<int> left(arr.begin(), arr.begin()+mid);
    vector<int> right(arr.begin()+mid, arr.end());
    left = merge_sort(left); right = merge_sort(right);
    return merge_vecs(left, right);
}

int main() {
    vector<int> arr = {8,3,5,1,9,2,7,4};
    auto sorted = merge_sort(arr);
    for (int i=0;i<(int)sorted.size();i++) cout << sorted[i] << (i+1<(int)sorted.size()?", ":"");
    cout << endl;
}`,
          solution: `#include <iostream>
#include <vector>
using namespace std;
vector<int> merge_vecs(vector<int>& l, vector<int>& r) {
    vector<int> res; int i=0,j=0;
    while(i<(int)l.size()&&j<(int)r.size()) res.push_back(l[i]<=r[j]?l[i++]:r[j++]);
    while(i<(int)l.size()) res.push_back(l[i++]);
    while(j<(int)r.size()) res.push_back(r[j++]);
    return res;
}
vector<int> merge_sort(vector<int> arr) {
    if(arr.size()<=1) return arr;
    int mid=arr.size()/2;
    vector<int> l(arr.begin(),arr.begin()+mid), r(arr.begin()+mid,arr.end());
    l=merge_sort(l); r=merge_sort(r); return merge_vecs(l,r);
}
int main() {
    auto s=merge_sort({8,3,5,1,9,2,7,4});
    for(int i=0;i<(int)s.size();i++) cout<<s[i]<<(i+1<(int)s.size()?", ":"");
    cout<<endl;
}`,
          testCases: [{ input: '', expected: '1, 2, 3, 4, 5, 7, 8, 9' }],
          hints: ['arr.size()/2 for midpoint', 'vector<int>(arr.begin(), arr.begin()+mid) for slice'],
        },
      },
      prerequisites: ['Z1-02'],
      xpReward: 130,
      loot: ['Splitter Sword', 'D&C Badge'],
    },
    {
      id: 'Z1-04',
      name: 'Greedy Algorithms',
      zone: 1, category: 'algo', position: 4,
      lore: 'The Greedy Goblin takes the best coin it sees right now, never looking ahead. Sometimes this leads to the treasure room — sometimes to a dead end.',
      bossName: 'The Greedy Goblin',
      bossHP: 120,
      bossAscii: `
  ╔═══════════════╗
  ║ GREEDY BOSS   ║
  ║  [goblin]     ║
  ║  $$$$$$$      ║
  ║  TAKE NOW!    ║
  ╚═══════════════╝`,
      what: 'A greedy algorithm makes the locally optimal choice at each step, hoping these local optima lead to a global optimum. It never reconsiders past decisions.',
      why: 'Greedy is simpler and faster than exhaustive search or DP. When the problem has the "greedy choice property" and "optimal substructure," greedy finds the optimal solution efficiently.',
      when: 'Use greedy for: activity selection, Huffman coding, Dijkstra\'s (non-negative weights), Kruskal\'s/Prim\'s MST, coin change (specific denominations). Do NOT use when local optima don\'t lead to global optimum (e.g., general coin change).',
      complexity: {
        time: { 'interval scheduling': 'O(n log n)', 'Huffman coding': 'O(n log n)', 'fractional knapsack': 'O(n log n)' },
        space: 'O(1) to O(n)',
        notes: 'Proof technique: exchange argument — show greedy solution can be converted to optimal without loss.',
      },
      realWorldUses: ['Dijkstra shortest path', 'Huffman compression (JPEG, ZIP)', 'Task scheduling', 'Network routing', 'Cashier making change (US coins)'],
      questions: [
        {
          id: 'Z1-04-Q1',
          text: 'Greedy algorithms make decisions based on:',
          options: ['Future states', 'Past choices', 'Current best option only', 'Random selection'],
          correct: 2,
          explanation: 'Greedy selects the locally optimal choice at each step without considering future consequences.',
          damage: 24,
        },
        {
          id: 'Z1-04-Q2',
          text: 'Greedy coin change with US coins [1,5,10,25] for amount 30 gives:',
          options: ['3 coins (10+10+10)', '1 coin (25+5)', '2 coins (25+5)', 'Fails'],
          correct: 2,
          explanation: 'Greedy picks 25 first (largest ≤30), then 5. Result: 2 coins. Works for US denominations.',
          damage: 24,
        },
        {
          id: 'Z1-04-Q3',
          text: 'For coins [1,3,4] and amount 6, greedy gives ___ coins but optimal is ___:',
          options: ['2 coins, 2 coins', '3 coins (4+1+1), 2 coins (3+3)', '2 coins, 3 coins', '1 coin, 1 coin'],
          correct: 1,
          explanation: 'Greedy picks 4 then 1+1 = 3 coins. But 3+3 = 2 coins is optimal. Greedy fails here!',
          damage: 24,
        },
        {
          id: 'Z1-04-Q4',
          text: 'Which problem is NOT solvable optimally with greedy?',
          options: ['Interval scheduling', '0/1 Knapsack', 'Fractional Knapsack', 'Minimum Spanning Tree'],
          correct: 1,
          explanation: '0/1 Knapsack requires DP. Fractional Knapsack (where you can split items) IS solvable greedily.',
          damage: 24,
        },
        {
          id: 'Z1-04-Q5',
          text: 'The "greedy choice property" means:',
          options: ['Greedy is always fastest', 'A globally optimal solution can include the greedy choice', 'You should always be greedy', 'Greedy uses O(1) space'],
          correct: 1,
          explanation: 'The greedy choice property guarantees that making the locally optimal choice leads to a globally optimal solution.',
          damage: 24,
        },
      ],
      visualization: {
        type: 'generic',
        title: 'Watch: Activity Selection (greedy by earliest finish time)',
        initialState: {},
        steps: [
          { label: 'Activities sorted by finish time: A(0-3), B(1-4), C(2-5), D(4-7), E(3-6)', state: {} },
          { label: 'Select A(0-3) — earliest finish, room is free', state: { selected: ['A(0-3)'] } },
          { label: 'B(1-4) conflicts with A (starts at 1 < A ends at 3) — SKIP', state: { selected: ['A(0-3)'], skipped: ['B'] } },
          { label: 'C(2-5) conflicts with A — SKIP', state: { selected: ['A(0-3)'], skipped: ['B','C'] } },
          { label: 'D(4-7) starts after A ends (4 >= 3) — SELECT', state: { selected: ['A(0-3)', 'D(4-7)'] } },
          { label: 'E(3-6) conflicts with D (3 < 7) — SKIP', state: { selected: ['A(0-3)', 'D(4-7)'], skipped: ['B','C','E'] } },
          { label: 'Result: 2 non-overlapping activities (maximum possible)', state: { selected: ['A(0-3)', 'D(4-7)'] } },
        ],
      },
      codeTemplates: {
        python: {
          language: 'python',
          starterCode: `def activity_selection(activities):
    # Sort by finish time (greedy choice)
    activities.sort(key=lambda x: x[1])
    selected = [activities[0]]
    last_end = activities[0][1]
    for start, end in activities[1:]:
        if start >= last_end:  # no overlap
            selected.append((start, end))
            last_end = end
    return len(selected)

activities = [(0,3),(1,4),(2,5),(4,7),(3,6)]
print(activity_selection(activities))`,
          solution: `def activity_selection(activities):
    activities.sort(key=lambda x: x[1])
    selected = [activities[0]]
    last_end = activities[0][1]
    for start, end in activities[1:]:
        if start >= last_end:
            selected.append((start, end))
            last_end = end
    return len(selected)

activities = [(0,3),(1,4),(2,5),(4,7),(3,6)]
print(activity_selection(activities))`,
          testCases: [{ input: '', expected: '2' }],
          hints: ['Sort by finish time', 'Select if start >= last selected finish time'],
        },
        typescript: {
          language: 'typescript',
          starterCode: `function activitySelection(activities: [number, number][]): number {
  activities.sort((a, b) => a[1] - b[1])
  let count = 1, lastEnd = activities[0][1]
  for (let i = 1; i < activities.length; i++) {
    if (activities[i][0] >= lastEnd) {
      count++
      lastEnd = activities[i][1]
    }
  }
  return count
}
console.log(activitySelection([[0,3],[1,4],[2,5],[4,7],[3,6]]))`,
          solution: `function activitySelection(activities: [number, number][]): number {
  activities.sort((a, b) => a[1] - b[1])
  let count = 1, lastEnd = activities[0][1]
  for (let i = 1; i < activities.length; i++) {
    if (activities[i][0] >= lastEnd) { count++; lastEnd = activities[i][1]; }
  }
  return count
}
console.log(activitySelection([[0,3],[1,4],[2,5],[4,7],[3,6]]))`,
          testCases: [{ input: '', expected: '2' }],
          hints: ['Sort by finish time a[1]', 'activities[i][0] >= lastEnd means no overlap'],
        },
        go: {
          language: 'go',
          starterCode: `package main
import (
  "fmt"
  "sort"
)
func activitySelection(acts [][2]int) int {
  sort.Slice(acts, func(i, j int) bool { return acts[i][1] < acts[j][1] })
  count, lastEnd := 1, acts[0][1]
  for i := 1; i < len(acts); i++ {
    if acts[i][0] >= lastEnd { count++; lastEnd = acts[i][1] }
  }
  return count
}
func main() {
  acts := [][2]int{{0,3},{1,4},{2,5},{4,7},{3,6}}
  fmt.Println(activitySelection(acts))
}`,
          solution: `package main
import ("fmt";"sort")
func activitySelection(acts [][2]int) int {
  sort.Slice(acts, func(i, j int) bool { return acts[i][1] < acts[j][1] })
  count, lastEnd := 1, acts[0][1]
  for i := 1; i < len(acts); i++ {
    if acts[i][0] >= lastEnd { count++; lastEnd = acts[i][1] }
  }
  return count
}
func main() { fmt.Println(activitySelection([][2]int{{0,3},{1,4},{2,5},{4,7},{3,6}})) }`,
          testCases: [{ input: '', expected: '2' }],
          hints: ['sort.Slice by finish time acts[i][1]'],
        },
        rust: {
          language: 'rust',
          starterCode: `fn activity_selection(mut acts: Vec<(i32, i32)>) -> usize {
    acts.sort_by_key(|a| a.1);
    let mut count = 1;
    let mut last_end = acts[0].1;
    for &(start, end) in &acts[1..] {
        if start >= last_end { count += 1; last_end = end; }
    }
    count
}
fn main() {
    let acts = vec![(0,3),(1,4),(2,5),(4,7),(3,6)];
    println!("{}", activity_selection(acts));
}`,
          solution: `fn activity_selection(mut acts: Vec<(i32, i32)>) -> usize {
    acts.sort_by_key(|a| a.1);
    let mut count = 1;
    let mut last_end = acts[0].1;
    for &(start, end) in &acts[1..] {
        if start >= last_end { count += 1; last_end = end; }
    }
    count
}
fn main() { println!("{}", activity_selection(vec![(0,3),(1,4),(2,5),(4,7),(3,6)])); }`,
          testCases: [{ input: '', expected: '2' }],
          hints: ['sort_by_key(|a| a.1) sorts by finish time'],
        },
        csharp: {
          language: 'csharp',
          starterCode: `using System;
using System.Collections.Generic;

int ActivitySelection(List<(int start, int end)> acts) {
    acts.Sort((a, b) => a.end.CompareTo(b.end));
    int count = 1, lastEnd = acts[0].end;
    for (int i = 1; i < acts.Count; i++) {
        if (acts[i].start >= lastEnd) { count++; lastEnd = acts[i].end; }
    }
    return count;
}

var acts = new List<(int,int)>{(0,3),(1,4),(2,5),(4,7),(3,6)};
Console.WriteLine(ActivitySelection(acts));`,
          solution: `using System;
using System.Collections.Generic;
int ActivitySelection(List<(int start, int end)> acts) {
    acts.Sort((a, b) => a.end.CompareTo(b.end));
    int count = 1, lastEnd = acts[0].end;
    for (int i = 1; i < acts.Count; i++)
        if (acts[i].start >= lastEnd) { count++; lastEnd = acts[i].end; }
    return count;
}
Console.WriteLine(ActivitySelection(new List<(int,int)>{(0,3),(1,4),(2,5),(4,7),(3,6)}));`,
          testCases: [{ input: '', expected: '2' }],
          hints: ['Sort by .end property', 'acts[i].start >= lastEnd = no overlap'],
        },
        cpp: {
          language: 'cpp',
          starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int activitySelection(vector<pair<int,int>> acts) {
    sort(acts.begin(), acts.end(), [](auto& a, auto& b){ return a.second < b.second; });
    int count = 1, lastEnd = acts[0].second;
    for (int i = 1; i < (int)acts.size(); i++)
        if (acts[i].first >= lastEnd) { count++; lastEnd = acts[i].second; }
    return count;
}
int main() {
    cout << activitySelection({{0,3},{1,4},{2,5},{4,7},{3,6}}) << endl;
}`,
          solution: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int activitySelection(vector<pair<int,int>> acts) {
    sort(acts.begin(), acts.end(), [](auto& a, auto& b){ return a.second < b.second; });
    int count = 1, lastEnd = acts[0].second;
    for (int i = 1; i < (int)acts.size(); i++)
        if (acts[i].first >= lastEnd) { count++; lastEnd = acts[i].second; }
    return count;
}
int main() { cout << activitySelection({{0,3},{1,4},{2,5},{4,7},{3,6}}) << endl; }`,
          testCases: [{ input: '', expected: '2' }],
          hints: ['Sort by .second (finish time)', '.first >= lastEnd means compatible'],
        },
      },
      prerequisites: ['Z1-01'],
      xpReward: 120,
      loot: ['Greedy Coin', 'Local Optima Badge'],
    },
    {
      id: 'Z1-05',
      name: 'Two Pointers',
      zone: 1, category: 'algo', position: 5,
      lore: 'The Twin Blades guard the gates — one moves left, one right, closing in on the truth. Together they slay O(n^2) problems in O(n) time.',
      bossName: 'The Twin Blades',
      bossHP: 110,
      bossAscii: `
  ╔═══════════════╗
  ║  TWO POINTER  ║
  ║  L-->   <--R  ║
  ║  [arr array]  ║
  ║   CONVERGE!   ║
  ╚═══════════════╝`,
      what: 'Two pointers is a technique where you maintain two indices into an array or string, moving them based on conditions to solve problems in O(n) instead of O(n^2). Common patterns: converging (start+end), sliding window, fast+slow.',
      why: 'Many pair-finding or subarray problems require O(n^2) with brute force. Two pointers exploit sorted order or monotonic properties to reduce this to O(n) by eliminating impossible pairs in bulk.',
      when: 'Use when: finding pairs with a target sum in sorted array, reversing in-place, detecting cycles (fast/slow), removing duplicates in-place, sliding window problems. Array usually needs to be sorted for converging variant.',
      complexity: {
        time: { 'two sum (sorted)': 'O(n)', 'reverse array': 'O(n)', 'sliding window': 'O(n)' },
        space: 'O(1) — in-place manipulation',
        notes: 'Sliding window is a variant: expand right pointer, shrink left pointer to maintain invariant.',
      },
      realWorldUses: ['Two Sum (LeetCode #1)', 'Container With Most Water', 'Palindrome check', 'Remove duplicates from sorted array', 'Linked list cycle detection'],
      questions: [
        {
          id: 'Z1-05-Q1',
          text: 'Two pointers on a sorted array for two-sum target T: you move right pointer left when:',
          options: ['sum < T', 'sum > T', 'sum == T', 'Never'],
          correct: 1,
          explanation: 'If sum > target, we need smaller values, so move right pointer left to decrease the sum.',
          damage: 22,
        },
        {
          id: 'Z1-05-Q2',
          text: 'Two pointers reduces two-sum from ___ to ___:',
          options: ['O(n^2) to O(n)', 'O(n) to O(log n)', 'O(n^2) to O(n log n)', 'O(n) to O(1)'],
          correct: 0,
          explanation: 'Brute force checks all pairs: O(n^2). Two pointers makes one pass: O(n). Requires sorted array.',
          damage: 22,
        },
        {
          id: 'Z1-05-Q3',
          text: 'Fast/slow pointer technique detects:',
          options: ['Sorted order', 'Duplicate values', 'Cycles in linked lists', 'Maximum subarray'],
          correct: 2,
          explanation: 'Floyd\'s cycle detection: fast moves 2 steps, slow moves 1. If there is a cycle, they meet.',
          damage: 22,
        },
        {
          id: 'Z1-05-Q4',
          text: 'Sliding window is a two-pointer variant for:',
          options: ['Finding a pair sum', 'Problems with contiguous subarrays/substrings', 'Sorting arrays', 'Binary search'],
          correct: 1,
          explanation: 'Sliding window maintains a window [left, right] and slides it to find optimal subarrays/substrings.',
          damage: 22,
        },
        {
          id: 'Z1-05-Q5',
          text: 'To check if a string is a palindrome using two pointers:',
          options: ['Compare left[i] with right[i-1]', 'Start L at 0, R at end, compare and move inward', 'Sort the string first', 'Use a stack'],
          correct: 1,
          explanation: 'L starts at 0, R starts at len-1. Compare chars, move L right and R left until they meet.',
          damage: 22,
        },
      ],
      visualization: {
        type: 'array',
        title: 'Watch: Two Sum on sorted array [1,2,4,7,11,15], target=9',
        initialState: { values: [1,2,4,7,11,15], pointers: { L: 0, R: 5 } },
        steps: [
          { label: 'L=0(1), R=5(15): sum=16 > 9, move R left', state: { values: [1,2,4,7,11,15], pointers: { L: 0, R: 5 } }, highlight: [0,5] },
          { label: 'L=0(1), R=4(11): sum=12 > 9, move R left', state: { values: [1,2,4,7,11,15], pointers: { L: 0, R: 4 } }, highlight: [0,4] },
          { label: 'L=0(1), R=3(7): sum=8 < 9, move L right', state: { values: [1,2,4,7,11,15], pointers: { L: 0, R: 3 } }, highlight: [0,3] },
          { label: 'L=1(2), R=3(7): sum=9 == 9, FOUND! Pair (2,7)', state: { values: [1,2,4,7,11,15], pointers: { L: 1, R: 3 } }, highlight: [1,3] },
        ],
      },
      codeTemplates: {
        python: {
          language: 'python',
          starterCode: `def two_sum_sorted(arr, target):
    left, right = 0, len(arr) - 1
    while left < right:
        total = arr[left] + arr[right]
        if total == target:
            return (arr[left], arr[right])
        elif total < target:
            left += 1
        else:
            right -= 1
    return None

arr = [1, 2, 4, 7, 11, 15]
print(two_sum_sorted(arr, 9))`,
          solution: `def two_sum_sorted(arr, target):
    left, right = 0, len(arr) - 1
    while left < right:
        total = arr[left] + arr[right]
        if total == target:
            return (arr[left], arr[right])
        elif total < target:
            left += 1
        else:
            right -= 1
    return None

arr = [1, 2, 4, 7, 11, 15]
print(two_sum_sorted(arr, 9))`,
          testCases: [{ input: '', expected: '(2, 7)' }],
          hints: ['Move left right when sum < target', 'Move right left when sum > target'],
        },
        typescript: {
          language: 'typescript',
          starterCode: `function twoSumSorted(arr: number[], target: number): [number, number] | null {
  let left = 0, right = arr.length - 1
  while (left < right) {
    const sum = arr[left] + arr[right]
    if (sum === target) return [arr[left], arr[right]]
    else if (sum < target) left++
    else right--
  }
  return null
}
const result = twoSumSorted([1, 2, 4, 7, 11, 15], 9)
console.log(result ? \`(\${result[0]}, \${result[1]})\` : 'null')`,
          solution: `function twoSumSorted(arr: number[], target: number): [number, number] | null {
  let left = 0, right = arr.length - 1
  while (left < right) {
    const sum = arr[left] + arr[right]
    if (sum === target) return [arr[left], arr[right]]
    else if (sum < target) left++
    else right--
  }
  return null
}
const result = twoSumSorted([1, 2, 4, 7, 11, 15], 9)
console.log(result ? \`(\${result[0]}, \${result[1]})\` : 'null')`,
          testCases: [{ input: '', expected: '(2, 7)' }],
          hints: ['sum < target: left++', 'sum > target: right--'],
        },
        go: {
          language: 'go',
          starterCode: `package main
import "fmt"
func twoSumSorted(arr []int, target int) (int, int, bool) {
  left, right := 0, len(arr)-1
  for left < right {
    sum := arr[left] + arr[right]
    if sum == target { return arr[left], arr[right], true }
    if sum < target { left++ } else { right-- }
  }
  return 0, 0, false
}
func main() {
  a, b, ok := twoSumSorted([]int{1,2,4,7,11,15}, 9)
  if ok { fmt.Printf("(%d, %d)\\n", a, b) }
}`,
          solution: `package main
import "fmt"
func twoSumSorted(arr []int, target int) (int, int, bool) {
  l, r := 0, len(arr)-1
  for l < r {
    s := arr[l] + arr[r]
    if s == target { return arr[l], arr[r], true }
    if s < target { l++ } else { r-- }
  }
  return 0, 0, false
}
func main() {
  a, b, ok := twoSumSorted([]int{1,2,4,7,11,15}, 9)
  if ok { fmt.Printf("(%d, %d)\\n", a, b) }
}`,
          testCases: [{ input: '', expected: '(2, 7)' }],
          hints: ['l, r := 0, len(arr)-1', 'l++ when sum too small, r-- when too large'],
        },
        rust: {
          language: 'rust',
          starterCode: `fn two_sum_sorted(arr: &[i32], target: i32) -> Option<(i32, i32)> {
    let (mut left, mut right) = (0, arr.len() - 1);
    while left < right {
        let sum = arr[left] + arr[right];
        if sum == target { return Some((arr[left], arr[right])); }
        if sum < target { left += 1; } else { right -= 1; }
    }
    None
}
fn main() {
    let arr = [1, 2, 4, 7, 11, 15];
    if let Some((a, b)) = two_sum_sorted(&arr, 9) {
        println!("({}, {})", a, b);
    }
}`,
          solution: `fn two_sum_sorted(arr: &[i32], target: i32) -> Option<(i32, i32)> {
    let (mut l, mut r) = (0, arr.len() - 1);
    while l < r {
        let s = arr[l] + arr[r];
        if s == target { return Some((arr[l], arr[r])); }
        if s < target { l += 1; } else { r -= 1; }
    }
    None
}
fn main() {
    if let Some((a, b)) = two_sum_sorted(&[1,2,4,7,11,15], 9) { println!("({}, {})", a, b); }
}`,
          testCases: [{ input: '', expected: '(2, 7)' }],
          hints: ['(0, arr.len()-1) for initial pointers', 'Option<(i32,i32)> return type'],
        },
        csharp: {
          language: 'csharp',
          starterCode: `using System;
(int, int)? TwoSumSorted(int[] arr, int target) {
    int left = 0, right = arr.Length - 1;
    while (left < right) {
        int sum = arr[left] + arr[right];
        if (sum == target) return (arr[left], arr[right]);
        if (sum < target) left++; else right--;
    }
    return null;
}
var result = TwoSumSorted(new[]{1,2,4,7,11,15}, 9);
if (result.HasValue) Console.WriteLine($"({result.Value.Item1}, {result.Value.Item2})");`,
          solution: `using System;
(int, int)? TwoSumSorted(int[] arr, int target) {
    int l = 0, r = arr.Length - 1;
    while (l < r) {
        int s = arr[l] + arr[r];
        if (s == target) return (arr[l], arr[r]);
        if (s < target) l++; else r--;
    }
    return null;
}
var res = TwoSumSorted(new[]{1,2,4,7,11,15}, 9);
if (res.HasValue) Console.WriteLine($"({res.Value.Item1}, {res.Value.Item2})");`,
          testCases: [{ input: '', expected: '(2, 7)' }],
          hints: ['int left=0, right=arr.Length-1', 'left++/right-- based on sum comparison'],
        },
        cpp: {
          language: 'cpp',
          starterCode: `#include <iostream>
#include <vector>
#include <optional>
using namespace std;
optional<pair<int,int>> twoSumSorted(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    while (left < right) {
        int sum = arr[left] + arr[right];
        if (sum == target) return make_pair(arr[left], arr[right]);
        if (sum < target) left++; else right--;
    }
    return nullopt;
}
int main() {
    vector<int> arr = {1,2,4,7,11,15};
    auto res = twoSumSorted(arr, 9);
    if (res) cout << "(" << res->first << ", " << res->second << ")" << endl;
}`,
          solution: `#include <iostream>
#include <vector>
#include <optional>
using namespace std;
optional<pair<int,int>> twoSumSorted(vector<int>& arr, int target) {
    int l=0, r=arr.size()-1;
    while(l<r) {
        int s=arr[l]+arr[r];
        if(s==target) return make_pair(arr[l],arr[r]);
        if(s<target) l++; else r--;
    }
    return nullopt;
}
int main() {
    vector<int> arr={1,2,4,7,11,15};
    auto res=twoSumSorted(arr,9);
    if(res) cout<<"("<<res->first<<", "<<res->second<<")"<<endl;
}`,
          testCases: [{ input: '', expected: '(2, 7)' }],
          hints: ['int left=0, right=arr.size()-1', 'optional<pair<int,int>> return type'],
        },
      },
      prerequisites: ['Z1-01'],
      xpReward: 110,
      loot: ['Twin Blade Relic', 'Two-Pointer Badge'],
    },
  ],
}
