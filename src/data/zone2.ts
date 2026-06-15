import type { Zone } from '@/store/types'

export const zone2: Zone = {
  id: 2,
  name: 'Search Chambers',
  subtitle: 'Finding the Way',
  theme: 'cyan',
  description: 'Maze-like chambers where seekers must find the needle in the haystack — or prove it does not exist.',
  bosses: [
    {
      id: 'Z2-01',
      name: 'Linear Search',
      zone: 2, category: 'algo', position: 1,
      lore: 'The Relentless Crawler checks every stone, every corner, never skipping. Slow, but it never misses what it seeks.',
      bossName: 'The Relentless Crawler',
      bossHP: 100,
      bossAscii: `
  ╔═══════════════╗
  ║ LINEAR SEARCH ║
  ║  [?][?][?][T] ║
  ║  -->-->-->!!! ║
  ║  O(n) beast   ║
  ╚═══════════════╝`,
      what: 'Linear search scans every element of a list in order until the target is found or the list is exhausted. No preprocessing required.',
      why: 'Works on any collection, sorted or unsorted. The simplest possible search algorithm. When the list is small or unsorted, it may be the best choice.',
      when: 'Use for small arrays, unsorted data, or when you need to find all occurrences. For large sorted data, binary search is far superior.',
      complexity: {
        time: { 'best': 'O(1)', 'worst': 'O(n)', 'average': 'O(n)' },
        space: 'O(1)',
        notes: 'Every element may need to be checked. No assumptions about data order.',
      },
      realWorldUses: ['Unsorted list search', 'Finding all matching elements', 'Small datasets', 'Searching linked lists'],
      questions: [
        {
          id: 'Z2-01-Q1',
          text: 'Linear search worst case is O(n) because:',
          options: ['It uses loops', 'Target may be the last element or absent', 'It is recursive', 'Arrays are slow'],
          correct: 1,
          explanation: 'In the worst case, the target is the last element or not present — requiring n comparisons.',
          damage: 20,
        },
        {
          id: 'Z2-01-Q2',
          text: 'Linear search requires the array to be:',
          options: ['Sorted ascending', 'Sorted descending', 'No requirement', 'Distinct values'],
          correct: 2,
          explanation: 'Linear search works on any collection — sorted or unsorted, with or without duplicates.',
          damage: 20,
        },
        {
          id: 'Z2-01-Q3',
          text: 'What is the best case for linear search?',
          options: ['O(n)', 'O(log n)', 'O(1)', 'O(n^2)'],
          correct: 2,
          explanation: 'Best case: target is the first element. Only 1 comparison needed = O(1).',
          damage: 20,
        },
        {
          id: 'Z2-01-Q4',
          text: 'Linear search on a linked list vs array: time complexity is:',
          options: ['O(1) for linked list', 'Same O(n) for both', 'O(log n) for array', 'O(n^2) for linked list'],
          correct: 1,
          explanation: 'Both require up to n comparisons. Linear time for both structures.',
          damage: 20,
        },
        {
          id: 'Z2-01-Q5',
          text: 'When is linear search better than binary search?',
          options: ['Always for large data', 'When data is unsorted or array is very small', 'When memory is limited', 'When O(log n) is needed'],
          correct: 1,
          explanation: 'Binary search requires sorted data. For unsorted data, linear search is the only option (without preprocessing).',
          damage: 20,
        },
      ],
      visualization: {
        type: 'array',
        title: 'Watch: Linear search for target=7 in [3,1,4,1,5,9,2,7]',
        initialState: { values: [3,1,4,1,5,9,2,7], pointers: { i: 0 } },
        steps: [
          { label: 'Check index 0: value=3, not 7', state: { values: [3,1,4,1,5,9,2,7], pointers: { i: 0 } }, highlight: [0] },
          { label: 'Check index 1: value=1, not 7', state: { values: [3,1,4,1,5,9,2,7], pointers: { i: 1 } }, highlight: [1] },
          { label: 'Check index 2: value=4, not 7', state: { values: [3,1,4,1,5,9,2,7], pointers: { i: 2 } }, highlight: [2] },
          { label: 'Check index 3-6: values 1,5,9,2 not 7', state: { values: [3,1,4,1,5,9,2,7], pointers: { i: 6 } }, highlight: [3,4,5,6] },
          { label: 'Check index 7: value=7, FOUND! Return 7', state: { values: [3,1,4,1,5,9,2,7], pointers: { i: 7 } }, highlight: [7] },
        ],
      },
      codeTemplates: {
        python: {
          language: 'python',
          starterCode: `def linear_search(arr, target):
    for i, val in enumerate(arr):
        if val == target:
            return i
    return -1

arr = [3, 1, 4, 1, 5, 9, 2, 7]
print(linear_search(arr, 7))
print(linear_search(arr, 6))`,
          solution: `def linear_search(arr, target):
    for i, val in enumerate(arr):
        if val == target:
            return i
    return -1

arr = [3, 1, 4, 1, 5, 9, 2, 7]
print(linear_search(arr, 7))
print(linear_search(arr, 6))`,
          testCases: [{ input: '', expected: '7\n-1' }],
          hints: ['Use enumerate to get index and value', 'Return -1 if not found'],
        },
        typescript: {
          language: 'typescript',
          starterCode: `function linearSearch(arr: number[], target: number): number {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i
  }
  return -1
}
const arr = [3, 1, 4, 1, 5, 9, 2, 7]
console.log(linearSearch(arr, 7))
console.log(linearSearch(arr, 6))`,
          solution: `function linearSearch(arr: number[], target: number): number {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i
  }
  return -1
}
const arr = [3, 1, 4, 1, 5, 9, 2, 7]
console.log(linearSearch(arr, 7))
console.log(linearSearch(arr, 6))`,
          testCases: [{ input: '', expected: '7\n-1' }],
          hints: ['Loop from 0 to arr.length', 'Return i when found, -1 at end'],
        },
        go: {
          language: 'go',
          starterCode: `package main
import "fmt"
func linearSearch(arr []int, target int) int {
  for i, v := range arr {
    if v == target { return i }
  }
  return -1
}
func main() {
  arr := []int{3,1,4,1,5,9,2,7}
  fmt.Println(linearSearch(arr, 7))
  fmt.Println(linearSearch(arr, 6))
}`,
          solution: `package main
import "fmt"
func linearSearch(arr []int, target int) int {
  for i, v := range arr { if v == target { return i } }
  return -1
}
func main() {
  arr := []int{3,1,4,1,5,9,2,7}
  fmt.Println(linearSearch(arr, 7)); fmt.Println(linearSearch(arr, 6))
}`,
          testCases: [{ input: '', expected: '7\n-1' }],
          hints: ['for i, v := range arr', 'return -1 at end'],
        },
        rust: {
          language: 'rust',
          starterCode: `fn linear_search(arr: &[i32], target: i32) -> i32 {
    for (i, &v) in arr.iter().enumerate() {
        if v == target { return i as i32; }
    }
    -1
}
fn main() {
    let arr = [3,1,4,1,5,9,2,7];
    println!("{}", linear_search(&arr, 7));
    println!("{}", linear_search(&arr, 6));
}`,
          solution: `fn linear_search(arr: &[i32], target: i32) -> i32 {
    arr.iter().enumerate().find(|&(_, &v)| v == target).map(|(i, _)| i as i32).unwrap_or(-1)
}
fn main() {
    let arr = [3,1,4,1,5,9,2,7];
    println!("{}", linear_search(&arr, 7));
    println!("{}", linear_search(&arr, 6));
}`,
          testCases: [{ input: '', expected: '7\n-1' }],
          hints: ['iter().enumerate() gives index and value', '.unwrap_or(-1) for not found'],
        },
        csharp: {
          language: 'csharp',
          starterCode: `using System;
int LinearSearch(int[] arr, int target) {
    for (int i = 0; i < arr.Length; i++)
        if (arr[i] == target) return i;
    return -1;
}
int[] arr = {3,1,4,1,5,9,2,7};
Console.WriteLine(LinearSearch(arr, 7));
Console.WriteLine(LinearSearch(arr, 6));`,
          solution: `using System;
int LinearSearch(int[] arr, int target) {
    for (int i = 0; i < arr.Length; i++) if (arr[i] == target) return i;
    return -1;
}
int[] arr = {3,1,4,1,5,9,2,7};
Console.WriteLine(LinearSearch(arr, 7)); Console.WriteLine(LinearSearch(arr, 6));`,
          testCases: [{ input: '', expected: '7\n-1' }],
          hints: ['for i < arr.Length', 'return -1 after loop'],
        },
        cpp: {
          language: 'cpp',
          starterCode: `#include <iostream>
#include <vector>
using namespace std;
int linearSearch(vector<int>& arr, int target) {
    for (int i = 0; i < (int)arr.size(); i++)
        if (arr[i] == target) return i;
    return -1;
}
int main() {
    vector<int> arr = {3,1,4,1,5,9,2,7};
    cout << linearSearch(arr, 7) << endl;
    cout << linearSearch(arr, 6) << endl;
}`,
          solution: `#include <iostream>
#include <vector>
using namespace std;
int linearSearch(vector<int>& arr, int target) {
    for(int i=0;i<(int)arr.size();i++) if(arr[i]==target) return i;
    return -1;
}
int main() {
    vector<int> arr={3,1,4,1,5,9,2,7};
    cout<<linearSearch(arr,7)<<endl; cout<<linearSearch(arr,6)<<endl;
}`,
          testCases: [{ input: '', expected: '7\n-1' }],
          hints: ['i < arr.size()', 'return -1 at end'],
        },
      },
      prerequisites: ['Z1-01'],
      xpReward: 100,
      loot: ['Search Lantern', 'Linear Badge'],
    },
    {
      id: 'Z2-02',
      name: 'Binary Search',
      zone: 2, category: 'algo', position: 2,
      lore: 'The Binary Sentinel guards the sorted realm. It divides the kingdom in half with every question — finding the target in log steps or declaring it absent.',
      bossName: 'The Binary Sentinel',
      bossHP: 140,
      bossAscii: `
  ╔═══════════════╗
  ║ BINARY SEARCH ║
  ║ L   MID   R   ║
  ║ |----+----!   ║
  ║ HALVE HALVE!  ║
  ╚═══════════════╝`,
      what: 'Binary search finds an element in a sorted array by repeatedly halving the search space. Compare the middle element to the target: if equal, done; if less, search right half; if greater, search left half.',
      why: 'Instead of checking n elements (linear), binary search checks only log2(n). For n=1,000,000, that\'s just 20 checks. Essential for any large sorted dataset.',
      when: 'Requires sorted data. Use when: searching sorted arrays, finding insertion points, problems where you can test "is X possible?" with a monotonic condition (binary search on answer).',
      complexity: {
        time: { 'search': 'O(log n)', 'insertion point': 'O(log n)' },
        space: 'O(1) iterative, O(log n) recursive',
        notes: 'The key insight: if the array is sorted, we can eliminate half the search space with one comparison.',
      },
      realWorldUses: ['Database index lookups', 'Git bisect', 'Python bisect module', 'Standard library search functions', 'Finding insertion position'],
      questions: [
        {
          id: 'Z2-02-Q1',
          text: 'Binary search requires data to be:',
          options: ['Distinct values only', 'Sorted', 'Stored in a tree', 'Less than 1000 elements'],
          correct: 1,
          explanation: 'Binary search works by comparing the middle element. This only gives useful information if the data is sorted.',
          damage: 28,
        },
        {
          id: 'Z2-02-Q2',
          text: 'Binary search on 1,000,000 elements needs at most how many comparisons?',
          options: ['1,000,000', '1,000', '20', '100'],
          correct: 2,
          explanation: 'log2(1,000,000) ≈ 20. Binary search needs at most 20 comparisons.',
          damage: 28,
        },
        {
          id: 'Z2-02-Q3',
          text: 'In binary search, mid = left + (right - left) // 2 instead of (left+right)//2 to avoid:',
          options: ['Division errors', 'Integer overflow', 'Off-by-one errors', 'Stack overflow'],
          correct: 1,
          explanation: '(left+right) can overflow when both are large integers. left + (right-left)//2 is safe.',
          damage: 28,
        },
        {
          id: 'Z2-02-Q4',
          text: 'When should we move left pointer to mid+1?',
          options: ['arr[mid] > target', 'arr[mid] < target', 'arr[mid] == target', 'Always'],
          correct: 1,
          explanation: 'When arr[mid] < target, the target must be in the right half, so left = mid + 1.',
          damage: 28,
        },
        {
          id: 'Z2-02-Q5',
          text: '"Binary search on the answer" means:',
          options: ['Searching twice', 'Using binary search to find a value X satisfying some condition', 'Binary search on sorted answers', 'Guessing the answer'],
          correct: 1,
          explanation: 'When the condition is monotonic (true for all X > threshold), binary search finds the threshold efficiently.',
          damage: 28,
        },
      ],
      visualization: {
        type: 'array',
        title: 'Watch: Binary search for 7 in [1,2,4,7,11,15,18,22]',
        initialState: { values: [1,2,4,7,11,15,18,22], pointers: { L: 0, R: 7 } },
        steps: [
          { label: 'L=0, R=7, mid=3 (value=7): target=7, CHECK MID', state: { values: [1,2,4,7,11,15,18,22], pointers: { L: 0, R: 7, mid: 3 } }, highlight: [3] },
          { label: 'arr[mid]=7 == target=7, FOUND at index 3!', state: { values: [1,2,4,7,11,15,18,22], pointers: { L: 0, R: 7, mid: 3 } }, highlight: [3] },
        ],
      },
      codeTemplates: {
        python: {
          language: 'python',
          starterCode: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = left + (right - left) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1

arr = [1, 2, 4, 7, 11, 15, 18, 22]
print(binary_search(arr, 7))
print(binary_search(arr, 6))`,
          solution: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = left + (right - left) // 2
        if arr[mid] == target: return mid
        elif arr[mid] < target: left = mid + 1
        else: right = mid - 1
    return -1

arr = [1, 2, 4, 7, 11, 15, 18, 22]
print(binary_search(arr, 7))
print(binary_search(arr, 6))`,
          testCases: [{ input: '', expected: '3\n-1' }],
          hints: ['mid = left + (right - left) // 2', 'left = mid+1 when arr[mid] < target'],
        },
        typescript: {
          language: 'typescript',
          starterCode: `function binarySearch(arr: number[], target: number): number {
  let left = 0, right = arr.length - 1
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2)
    if (arr[mid] === target) return mid
    else if (arr[mid] < target) left = mid + 1
    else right = mid - 1
  }
  return -1
}
const arr = [1, 2, 4, 7, 11, 15, 18, 22]
console.log(binarySearch(arr, 7))
console.log(binarySearch(arr, 6))`,
          solution: `function binarySearch(arr: number[], target: number): number {
  let l = 0, r = arr.length - 1
  while (l <= r) {
    const mid = l + Math.floor((r - l) / 2)
    if (arr[mid] === target) return mid
    if (arr[mid] < target) l = mid + 1
    else r = mid - 1
  }
  return -1
}
console.log(binarySearch([1,2,4,7,11,15,18,22], 7))
console.log(binarySearch([1,2,4,7,11,15,18,22], 6))`,
          testCases: [{ input: '', expected: '3\n-1' }],
          hints: ['Math.floor((r-l)/2)', 'l = mid+1 or r = mid-1'],
        },
        go: {
          language: 'go',
          starterCode: `package main
import "fmt"
func binarySearch(arr []int, target int) int {
  left, right := 0, len(arr)-1
  for left <= right {
    mid := left + (right-left)/2
    if arr[mid] == target { return mid }
    if arr[mid] < target { left = mid + 1 } else { right = mid - 1 }
  }
  return -1
}
func main() {
  arr := []int{1,2,4,7,11,15,18,22}
  fmt.Println(binarySearch(arr, 7))
  fmt.Println(binarySearch(arr, 6))
}`,
          solution: `package main
import "fmt"
func binarySearch(arr []int, target int) int {
  l, r := 0, len(arr)-1
  for l <= r {
    mid := l+(r-l)/2
    if arr[mid]==target { return mid }
    if arr[mid]<target { l=mid+1 } else { r=mid-1 }
  }
  return -1
}
func main() {
  a:=[]int{1,2,4,7,11,15,18,22}; fmt.Println(binarySearch(a,7)); fmt.Println(binarySearch(a,6))
}`,
          testCases: [{ input: '', expected: '3\n-1' }],
          hints: ['l+(r-l)/2 for safe mid', 'for l <= r'],
        },
        rust: {
          language: 'rust',
          starterCode: `fn binary_search(arr: &[i32], target: i32) -> i32 {
    let (mut left, mut right) = (0i32, arr.len() as i32 - 1);
    while left <= right {
        let mid = left + (right - left) / 2;
        if arr[mid as usize] == target { return mid; }
        if arr[mid as usize] < target { left = mid + 1; } else { right = mid - 1; }
    }
    -1
}
fn main() {
    let arr = [1,2,4,7,11,15,18,22];
    println!("{}", binary_search(&arr, 7));
    println!("{}", binary_search(&arr, 6));
}`,
          solution: `fn binary_search(arr: &[i32], target: i32) -> i32 {
    let (mut l, mut r) = (0i32, arr.len() as i32 - 1);
    while l <= r {
        let mid = l + (r - l) / 2;
        match arr[mid as usize].cmp(&target) {
            std::cmp::Ordering::Equal => return mid,
            std::cmp::Ordering::Less => l = mid + 1,
            std::cmp::Ordering::Greater => r = mid - 1,
        }
    }
    -1
}
fn main() {
    println!("{}", binary_search(&[1,2,4,7,11,15,18,22], 7));
    println!("{}", binary_search(&[1,2,4,7,11,15,18,22], 6));
}`,
          testCases: [{ input: '', expected: '3\n-1' }],
          hints: ['0i32 for signed index', 'arr[mid as usize] for indexing'],
        },
        csharp: {
          language: 'csharp',
          starterCode: `using System;
int BinarySearch(int[] arr, int target) {
    int left = 0, right = arr.Length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1; else right = mid - 1;
    }
    return -1;
}
int[] arr = {1,2,4,7,11,15,18,22};
Console.WriteLine(BinarySearch(arr, 7));
Console.WriteLine(BinarySearch(arr, 6));`,
          solution: `using System;
int BinarySearch(int[] arr, int target) {
    int l=0, r=arr.Length-1;
    while(l<=r){ int mid=l+(r-l)/2; if(arr[mid]==target) return mid; if(arr[mid]<target) l=mid+1; else r=mid-1; }
    return -1;
}
int[] arr={1,2,4,7,11,15,18,22};
Console.WriteLine(BinarySearch(arr,7)); Console.WriteLine(BinarySearch(arr,6));`,
          testCases: [{ input: '', expected: '3\n-1' }],
          hints: ['left + (right-left)/2 for safe mid'],
        },
        cpp: {
          language: 'cpp',
          starterCode: `#include <iostream>
#include <vector>
using namespace std;
int binarySearch(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1; else right = mid - 1;
    }
    return -1;
}
int main() {
    vector<int> arr = {1,2,4,7,11,15,18,22};
    cout << binarySearch(arr, 7) << endl;
    cout << binarySearch(arr, 6) << endl;
}`,
          solution: `#include <iostream>
#include <vector>
using namespace std;
int binarySearch(vector<int>& arr, int target) {
    int l=0, r=arr.size()-1;
    while(l<=r){ int mid=l+(r-l)/2; if(arr[mid]==target) return mid; if(arr[mid]<target) l=mid+1; else r=mid-1; }
    return -1;
}
int main() {
    vector<int> arr={1,2,4,7,11,15,18,22};
    cout<<binarySearch(arr,7)<<endl; cout<<binarySearch(arr,6)<<endl;
}`,
          testCases: [{ input: '', expected: '3\n-1' }],
          hints: ['left + (right-left)/2', 'while left <= right'],
        },
      },
      prerequisites: ['Z2-01', 'Z1-02'],
      xpReward: 140,
      loot: ['Binary Compass', 'O(log n) Badge'],
    },
    {
      id: 'Z2-03',
      name: 'Exponential Search',
      zone: 2, category: 'algo', position: 3,
      lore: 'The Exponential Leaper bounds forward with doubled strides, then calls its binary twin to finish the job.',
      bossName: 'The Exponential Leaper',
      bossHP: 120,
      bossAscii: `
  ╔═══════════════╗
  ║  EXP SEARCH   ║
  ║  1,2,4,8,16.. ║
  ║  LEAP!BINARY! ║
  ║  O(log n)     ║
  ╚═══════════════╝`,
      what: 'Exponential search finds the range where an element may be present by doubling the index (1, 2, 4, 8, ...) until the value exceeds the target. Then applies binary search in that range.',
      why: 'Better than binary search when the target is near the beginning of a large or infinite sorted array. Worst case same as binary search: O(log n).',
      when: 'Use for unbounded/infinite sorted arrays or when the target is likely near the start. For normal finite arrays, binary search is simpler.',
      complexity: {
        time: { 'search': 'O(log n)', 'range finding': 'O(log i) where i is target position' },
        space: 'O(1)',
        notes: 'When target is near position i, total complexity is O(log i), which can be much better than O(log n).',
      },
      realWorldUses: ['Searching infinite sorted streams', 'Finger search trees', 'Self-adjusting data structures', 'Unbounded binary search problems'],
      questions: [
        {
          id: 'Z2-03-Q1',
          text: 'Exponential search first phase doubles i to find:',
          options: ['The target', 'A range [i/2, i] containing the target', 'The sorted order', 'The array length'],
          correct: 1,
          explanation: 'Phase 1 doubles i until arr[i] > target. Target must be in range [i/2, i].',
          damage: 24,
        },
        {
          id: 'Z2-03-Q2',
          text: 'After finding the range, exponential search uses:',
          options: ['Linear search', 'Binary search', 'Another exponential search', 'Sorting'],
          correct: 1,
          explanation: 'Binary search is applied to the narrowed range [i/2, min(i, n-1)].',
          damage: 24,
        },
        {
          id: 'Z2-03-Q3',
          text: 'Exponential search advantage over binary search when:',
          options: ['Data is unsorted', 'Target is near the beginning', 'Array is small', 'Data has duplicates'],
          correct: 1,
          explanation: 'When target is at position i, exponential search takes O(log i) vs O(log n) for binary search.',
          damage: 24,
        },
        {
          id: 'Z2-03-Q4',
          text: 'Exponential search requires the array to be:',
          options: ['Unsorted', 'Sorted', 'Distinct values', 'Fixed size'],
          correct: 1,
          explanation: 'Like binary search, exponential search requires sorted data to work correctly.',
          damage: 24,
        },
        {
          id: 'Z2-03-Q5',
          text: 'What is the worst case time complexity of exponential search?',
          options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'],
          correct: 1,
          explanation: 'Worst case: O(log n), same as binary search. But average case can be O(log i) where i is the answer position.',
          damage: 24,
        },
      ],
      visualization: {
        type: 'array',
        title: 'Watch: Exponential search for 55 in sorted array',
        initialState: { values: [1,3,5,7,11,15,22,35,55,77,100], pointers: { i: 1 } },
        steps: [
          { label: 'i=1: arr[1]=3 < 55, double i', state: { values: [1,3,5,7,11,15,22,35,55,77,100], pointers: { i: 1 } }, highlight: [1] },
          { label: 'i=2: arr[2]=5 < 55, double i', state: { values: [1,3,5,7,11,15,22,35,55,77,100], pointers: { i: 2 } }, highlight: [2] },
          { label: 'i=4: arr[4]=11 < 55, double i', state: { values: [1,3,5,7,11,15,22,35,55,77,100], pointers: { i: 4 } }, highlight: [4] },
          { label: 'i=8: arr[8]=55 == 55, range found [4,8]', state: { values: [1,3,5,7,11,15,22,35,55,77,100], pointers: { i: 8 } }, highlight: [8] },
          { label: 'Binary search in [4,8]: mid=6, arr[6]=22 < 55, left=7', state: { values: [1,3,5,7,11,15,22,35,55,77,100], pointers: { L: 4, R: 8, mid: 6 } }, highlight: [6] },
          { label: 'Binary search: mid=7, arr[7]=35 < 55, left=8', state: { values: [1,3,5,7,11,15,22,35,55,77,100], pointers: { L: 7, R: 8, mid: 7 } }, highlight: [7] },
          { label: 'Binary search: mid=8, arr[8]=55 == 55, FOUND at index 8!', state: { values: [1,3,5,7,11,15,22,35,55,77,100], pointers: { L: 8, R: 8, mid: 8 } }, highlight: [8] },
        ],
      },
      codeTemplates: {
        python: {
          language: 'python',
          starterCode: `def binary_search(arr, left, right, target):
    while left <= right:
        mid = left + (right - left) // 2
        if arr[mid] == target: return mid
        elif arr[mid] < target: left = mid + 1
        else: right = mid - 1
    return -1

def exponential_search(arr, target):
    if arr[0] == target: return 0
    i = 1
    while i < len(arr) and arr[i] <= target:
        i *= 2
    return binary_search(arr, i // 2, min(i, len(arr) - 1), target)

arr = [1,3,5,7,11,15,22,35,55,77,100]
print(exponential_search(arr, 55))
print(exponential_search(arr, 50))`,
          solution: `def binary_search(arr, left, right, target):
    while left <= right:
        mid = left + (right - left) // 2
        if arr[mid] == target: return mid
        elif arr[mid] < target: left = mid + 1
        else: right = mid - 1
    return -1

def exponential_search(arr, target):
    if arr[0] == target: return 0
    i = 1
    while i < len(arr) and arr[i] <= target:
        i *= 2
    return binary_search(arr, i // 2, min(i, len(arr) - 1), target)

arr = [1,3,5,7,11,15,22,35,55,77,100]
print(exponential_search(arr, 55))
print(exponential_search(arr, 50))`,
          testCases: [{ input: '', expected: '8\n-1' }],
          hints: ['Double i until arr[i] > target', 'Binary search in [i//2, min(i, n-1)]'],
        },
        typescript: {
          language: 'typescript',
          starterCode: `function binarySearch(arr: number[], left: number, right: number, target: number): number {
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2)
    if (arr[mid] === target) return mid
    if (arr[mid] < target) left = mid + 1; else right = mid - 1
  }
  return -1
}

function exponentialSearch(arr: number[], target: number): number {
  if (arr[0] === target) return 0
  let i = 1
  while (i < arr.length && arr[i] <= target) i *= 2
  return binarySearch(arr, i >> 1, Math.min(i, arr.length - 1), target)
}

const arr = [1,3,5,7,11,15,22,35,55,77,100]
console.log(exponentialSearch(arr, 55))
console.log(exponentialSearch(arr, 50))`,
          solution: `function binarySearch(arr: number[], l: number, r: number, t: number): number {
  while(l<=r){const m=l+Math.floor((r-l)/2);if(arr[m]===t)return m;if(arr[m]<t)l=m+1;else r=m-1;}return -1
}
function exponentialSearch(arr: number[], target: number): number {
  if(arr[0]===target)return 0;let i=1;while(i<arr.length&&arr[i]<=target)i*=2;return binarySearch(arr,i>>1,Math.min(i,arr.length-1),target)
}
const arr=[1,3,5,7,11,15,22,35,55,77,100]
console.log(exponentialSearch(arr,55));console.log(exponentialSearch(arr,50))`,
          testCases: [{ input: '', expected: '8\n-1' }],
          hints: ['i *= 2 doubles', 'i >> 1 is i/2'],
        },
        go: {
          language: 'go',
          starterCode: `package main
import "fmt"
func bSearch(arr []int, l, r, target int) int {
  for l <= r {
    mid := l + (r-l)/2
    if arr[mid] == target { return mid }
    if arr[mid] < target { l = mid+1 } else { r = mid-1 }
  }
  return -1
}
func expSearch(arr []int, target int) int {
  if arr[0] == target { return 0 }
  i := 1
  for i < len(arr) && arr[i] <= target { i *= 2 }
  if i >= len(arr) { i = len(arr) - 1 }
  return bSearch(arr, i/2, i, target)
}
func main() {
  arr := []int{1,3,5,7,11,15,22,35,55,77,100}
  fmt.Println(expSearch(arr, 55)); fmt.Println(expSearch(arr, 50))
}`,
          solution: `package main
import "fmt"
func bSearch(arr []int, l,r,target int) int {
  for l<=r{mid:=l+(r-l)/2;if arr[mid]==target{return mid};if arr[mid]<target{l=mid+1}else{r=mid-1}};return -1
}
func expSearch(arr []int, target int) int {
  if arr[0]==target{return 0};i:=1;for i<len(arr)&&arr[i]<=target{i*=2};if i>=len(arr){i=len(arr)-1};return bSearch(arr,i/2,i,target)
}
func main(){arr:=[]int{1,3,5,7,11,15,22,35,55,77,100};fmt.Println(expSearch(arr,55));fmt.Println(expSearch(arr,50))}`,
          testCases: [{ input: '', expected: '8\n-1' }],
          hints: ['i*=2 to double', 'cap i at len(arr)-1'],
        },
        rust: {
          language: 'rust',
          starterCode: `fn b_search(arr: &[i32], mut l: usize, mut r: usize, target: i32) -> i32 {
    while l <= r {
        let mid = l + (r - l) / 2;
        if arr[mid] == target { return mid as i32; }
        if arr[mid] < target { l = mid + 1; } else { if mid == 0 { break; } r = mid - 1; }
    }
    -1
}
fn exp_search(arr: &[i32], target: i32) -> i32 {
    if arr[0] == target { return 0; }
    let mut i = 1;
    while i < arr.len() && arr[i] <= target { i *= 2; }
    b_search(arr, i/2, (i).min(arr.len()-1), target)
}
fn main() {
    let arr = [1,3,5,7,11,15,22,35,55,77,100];
    println!("{}", exp_search(&arr, 55));
    println!("{}", exp_search(&arr, 50));
}`,
          solution: `fn b_search(arr: &[i32], mut l: usize, mut r: usize, target: i32) -> i32 {
    loop {
        let mid = l + (r - l) / 2;
        if arr[mid] == target { return mid as i32; }
        if arr[mid] < target { l = mid + 1; } else { if mid == 0 { break; } r = mid - 1; }
        if l > r { break; }
    }
    -1
}
fn exp_search(arr: &[i32], target: i32) -> i32 {
    if arr[0]==target { return 0; }
    let mut i=1; while i<arr.len()&&arr[i]<=target{i*=2;} b_search(arr,i/2,(i).min(arr.len()-1),target)
}
fn main(){let a=[1,3,5,7,11,15,22,35,55,77,100];println!("{}",exp_search(&a,55));println!("{}",exp_search(&a,50));}`,
          testCases: [{ input: '', expected: '8\n-1' }],
          hints: ['i *= 2 to double', '.min(arr.len()-1) to cap range'],
        },
        csharp: {
          language: 'csharp',
          starterCode: `using System;
int BSearch(int[] arr, int l, int r, int target) {
    while (l <= r) {
        int mid = l + (r-l)/2;
        if (arr[mid]==target) return mid;
        if (arr[mid]<target) l=mid+1; else r=mid-1;
    }
    return -1;
}
int ExpSearch(int[] arr, int target) {
    if (arr[0]==target) return 0;
    int i=1;
    while (i<arr.Length && arr[i]<=target) i*=2;
    return BSearch(arr, i/2, Math.Min(i, arr.Length-1), target);
}
int[] arr={1,3,5,7,11,15,22,35,55,77,100};
Console.WriteLine(ExpSearch(arr,55));
Console.WriteLine(ExpSearch(arr,50));`,
          solution: `using System;
int BSearch(int[] arr,int l,int r,int t){while(l<=r){int m=l+(r-l)/2;if(arr[m]==t)return m;if(arr[m]<t)l=m+1;else r=m-1;}return -1;}
int ExpSearch(int[] arr,int t){if(arr[0]==t)return 0;int i=1;while(i<arr.Length&&arr[i]<=t)i*=2;return BSearch(arr,i/2,Math.Min(i,arr.Length-1),t);}
int[] arr={1,3,5,7,11,15,22,35,55,77,100};
Console.WriteLine(ExpSearch(arr,55));Console.WriteLine(ExpSearch(arr,50));`,
          testCases: [{ input: '', expected: '8\n-1' }],
          hints: ['i*=2 to double', 'Math.Min(i, arr.Length-1)'],
        },
        cpp: {
          language: 'cpp',
          starterCode: `#include <iostream>
#include <vector>
using namespace std;
int bSearch(vector<int>& arr, int l, int r, int target) {
    while(l<=r){int mid=l+(r-l)/2;if(arr[mid]==target)return mid;if(arr[mid]<target)l=mid+1;else r=mid-1;}
    return -1;
}
int expSearch(vector<int>& arr, int target) {
    if(arr[0]==target) return 0;
    int i=1;
    while(i<(int)arr.size()&&arr[i]<=target) i*=2;
    return bSearch(arr, i/2, min(i,(int)arr.size()-1), target);
}
int main(){
    vector<int> arr={1,3,5,7,11,15,22,35,55,77,100};
    cout<<expSearch(arr,55)<<endl; cout<<expSearch(arr,50)<<endl;
}`,
          solution: `#include <iostream>
#include <vector>
using namespace std;
int bSearch(vector<int>&a,int l,int r,int t){while(l<=r){int m=l+(r-l)/2;if(a[m]==t)return m;if(a[m]<t)l=m+1;else r=m-1;}return -1;}
int expSearch(vector<int>&a,int t){if(a[0]==t)return 0;int i=1;while(i<(int)a.size()&&a[i]<=t)i*=2;return bSearch(a,i/2,min(i,(int)a.size()-1),t);}
int main(){vector<int>a={1,3,5,7,11,15,22,35,55,77,100};cout<<expSearch(a,55)<<endl;cout<<expSearch(a,50)<<endl;}`,
          testCases: [{ input: '', expected: '8\n-1' }],
          hints: ['i*=2', 'min(i, (int)arr.size()-1)'],
        },
      },
      prerequisites: ['Z2-02'],
      xpReward: 120,
      loot: ['Exponential Boots', 'Range Finder Badge'],
    },
  ],
}
