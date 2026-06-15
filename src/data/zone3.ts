import type { Zone } from '@/store/types'

const pyTemplate = (name: string, code: string, expected: string, hints: string[]) => ({
  language: 'python' as const,
  starterCode: code, solution: code,
  testCases: [{ input: '', expected }],
  hints,
})
const tsTemplate = (name: string, code: string, expected: string, hints: string[]) => ({
  language: 'typescript' as const,
  starterCode: code, solution: code,
  testCases: [{ input: '', expected }],
  hints,
})
const goTemplate = (code: string, expected: string, hints: string[]) => ({
  language: 'go' as const,
  starterCode: code, solution: code,
  testCases: [{ input: '', expected }],
  hints,
})
const rustTemplate = (code: string, expected: string, hints: string[]) => ({
  language: 'rust' as const,
  starterCode: code, solution: code,
  testCases: [{ input: '', expected }],
  hints,
})
const csTemplate = (code: string, expected: string, hints: string[]) => ({
  language: 'csharp' as const,
  starterCode: code, solution: code,
  testCases: [{ input: '', expected }],
  hints,
})
const cppTemplate = (code: string, expected: string, hints: string[]) => ({
  language: 'cpp' as const,
  starterCode: code, solution: code,
  testCases: [{ input: '', expected }],
  hints,
})

export const zone3: Zone = {
  id: 3,
  name: 'Sort Halls',
  subtitle: 'Order from Chaos',
  theme: 'blue',
  description: 'Vast halls where chaos is tamed into order. Each sorting god demands tribute of understanding before granting passage.',
  bosses: [
    {
      id: 'Z3-01',
      name: 'Insertion Sort',
      zone: 3, category: 'algo', position: 1,
      lore: 'The Card Dealer sorts one card at a time, sliding each into its correct place in the growing hand.',
      bossName: 'The Card Dealer',
      bossHP: 100,
      bossAscii: `
  ╔═══════════════╗
  ║INSERT SORT    ║
  ║[1][3][5][2]   ║
  ║       <--2    ║
  ║[1][2][3][5]   ║
  ╚═══════════════╝`,
      what: 'Insertion sort builds the sorted array one element at a time by shifting elements rightward to insert each new element in its correct position.',
      why: 'Simple to implement and efficient for small or nearly-sorted arrays. Adaptive: O(n) on already-sorted input.',
      when: 'Best for small arrays (n<50), nearly sorted data, online sorting (sorting as data arrives), or as a subroutine in hybrid algorithms (Timsort uses it for small runs).',
      complexity: {
        time: { 'best (sorted)': 'O(n)', 'worst (reverse)': 'O(n^2)', 'average': 'O(n^2)' },
        space: 'O(1)',
        notes: 'Despite O(n^2) average, insertion sort outperforms quicksort for n<10 due to low overhead.',
      },
      realWorldUses: ['Python\'s Timsort (for small subarrays)', 'Card sorting by hand', 'Online sorting', 'Java\'s Arrays.sort for primitives (small n)'],
      questions: [
        { id: 'Z3-01-Q1', text: 'Insertion sort builds the result by:', options: ['Splitting in half', 'Selecting minimum each pass', 'Inserting each element into correct position in sorted prefix', 'Comparing all pairs'], correct: 2, explanation: 'Insertion sort maintains a sorted prefix and inserts each new element into it.', damage: 20 },
        { id: 'Z3-01-Q2', text: 'Insertion sort best case (already sorted) is:', options: ['O(n^2)', 'O(n log n)', 'O(n)', 'O(1)'], correct: 2, explanation: 'When sorted, each element is already in place — only n-1 comparisons, O(n).', damage: 20 },
        { id: 'Z3-01-Q3', text: 'Worst case for insertion sort:', options: ['Random array', 'Sorted array', 'Reverse-sorted array', 'Array with duplicates'], correct: 2, explanation: 'Reverse-sorted: every element must shift past all previous elements = O(n^2) shifts.', damage: 20 },
        { id: 'Z3-01-Q4', text: 'Insertion sort is "stable" meaning:', options: ['It never crashes', 'Equal elements maintain relative order', 'It uses O(1) space', 'It runs in O(n)'], correct: 1, explanation: 'Stable sort: equal elements keep their original relative order.', damage: 20 },
        { id: 'Z3-01-Q5', text: 'Timsort (Python default sort) uses insertion sort for:', options: ['Large arrays', 'Small runs (n<64)', 'Reverse-sorted data', 'When space is limited'], correct: 1, explanation: 'Timsort uses insertion sort for small runs because its overhead is minimal for small n.', damage: 20 },
      ],
      visualization: {
        type: 'array',
        title: 'Watch: Insertion Sort on [5,2,4,1,3]',
        initialState: { values: [5,2,4,1,3] },
        steps: [
          { label: 'Pass 1: Insert 2. Compare 2<5, shift 5 right. Place 2.', state: { values: [2,5,4,1,3] }, highlight: [0,1] },
          { label: 'Pass 2: Insert 4. Compare 4<5, shift. 4>2, stop. Place 4.', state: { values: [2,4,5,1,3] }, highlight: [1,2] },
          { label: 'Pass 3: Insert 1. Shift 5,4,2 right. Place 1 at front.', state: { values: [1,2,4,5,3] }, highlight: [0,1,2,3] },
          { label: 'Pass 4: Insert 3. Shift 5,4. 3>2, stop. Place 3.', state: { values: [1,2,3,4,5] }, highlight: [2,3,4] },
          { label: 'Sorted! [1,2,3,4,5]', state: { values: [1,2,3,4,5] }, highlight: [0,1,2,3,4] },
        ],
      },
      codeTemplates: {
        python: pyTemplate('insertion', `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j+1] = arr[j]
            j -= 1
        arr[j+1] = key
    return arr

print(insertion_sort([5, 2, 4, 1, 3]))`, '[1, 2, 3, 4, 5]', ['key = arr[i] saves current element', 'Shift right while arr[j] > key']),
        typescript: tsTemplate('insertion', `function insertionSort(arr: number[]): number[] {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i]
    let j = i - 1
    while (j >= 0 && arr[j] > key) { arr[j+1] = arr[j]; j--; }
    arr[j+1] = key
  }
  return arr
}
console.log(insertionSort([5,2,4,1,3]).join(', '))`, '1, 2, 3, 4, 5', ['const key = arr[i]', 'shift while arr[j] > key']),
        go: goTemplate(`package main
import "fmt"
func insertionSort(arr []int) []int {
  for i:=1;i<len(arr);i++ {
    key:=arr[i]; j:=i-1
    for j>=0&&arr[j]>key{arr[j+1]=arr[j];j--}
    arr[j+1]=key
  }
  return arr
}
func main(){fmt.Println(insertionSort([]int{5,2,4,1,3}))}`, '[1 2 3 4 5]', ['key:=arr[i]', 'for j>=0 && arr[j]>key']),
        rust: rustTemplate(`fn insertion_sort(arr: &mut Vec<i32>) {
    for i in 1..arr.len() {
        let key = arr[i];
        let mut j = i;
        while j > 0 && arr[j-1] > key { arr[j] = arr[j-1]; j -= 1; }
        arr[j] = key;
    }
}
fn main() {
    let mut arr = vec![5,2,4,1,3];
    insertion_sort(&mut arr);
    println!("{:?}", arr);
}`, '[1, 2, 3, 4, 5]', ['let key = arr[i]', 'while j > 0 && arr[j-1] > key']),
        csharp: csTemplate(`using System;
void InsertionSort(int[] arr) {
    for (int i=1;i<arr.Length;i++) {
        int key=arr[i]; int j=i-1;
        while(j>=0&&arr[j]>key){arr[j+1]=arr[j];j--;}
        arr[j+1]=key;
    }
}
int[] arr={5,2,4,1,3}; InsertionSort(arr);
Console.WriteLine(string.Join(", ",arr));`, '1, 2, 3, 4, 5', ['int key=arr[i]', 'while j>=0 && arr[j]>key']),
        cpp: cppTemplate(`#include<iostream>
#include<vector>
using namespace std;
void insertionSort(vector<int>&a){
  for(int i=1;i<(int)a.size();i++){int k=a[i];int j=i-1;while(j>=0&&a[j]>k){a[j+1]=a[j];j--;}a[j+1]=k;}
}
int main(){vector<int>a={5,2,4,1,3};insertionSort(a);for(int i=0;i<(int)a.size();i++)cout<<a[i]<<(i+1<(int)a.size()?", ":"");cout<<endl;}`, '1, 2, 3, 4, 5', ['int k=a[i]', 'while j>=0 && a[j]>k']),
      },
      prerequisites: ['Z1-01'],
      xpReward: 100,
      loot: ['Insertion Needle', 'Stability Badge'],
    },
    {
      id: 'Z3-02',
      name: 'Merge Sort',
      zone: 3, category: 'algo', position: 2,
      lore: 'The Great Divider splits kingdoms in two, conquers each half, then merges them into one orderly realm.',
      bossName: 'The Great Divider',
      bossHP: 150,
      bossAscii: `
  ╔═══════════════╗
  ║  MERGE SORT   ║
  ║ [8,3][5,1]    ║
  ║  [3,8][1,5]   ║
  ║  [1,3,5,8]    ║
  ╚═══════════════╝`,
      what: 'Merge sort divides the array in half recursively until single elements, then merges sorted halves back together. A classic divide-and-conquer algorithm.',
      why: 'Guaranteed O(n log n) in all cases. Stable. Works well for linked lists and external sorting (disk). Predictable performance unlike quicksort.',
      when: 'Use when: stability matters, data is too large for RAM (external sort), sorting linked lists, guaranteed O(n log n) needed. Avoid for in-place requirement (uses O(n) extra space).',
      complexity: {
        time: { 'all cases': 'O(n log n)' },
        space: 'O(n) for temp array',
        notes: 'Bottom-up merge sort can sort iteratively. Timsort optimizes by using natural runs.',
      },
      realWorldUses: ['Python sorted() and list.sort()', 'Java\'s Arrays.sort() for objects', 'External merge sort for huge datasets', 'Inversion count problems'],
      questions: [
        { id: 'Z3-02-Q1', text: 'Merge sort time complexity is:', options: ['O(n^2) always', 'O(n log n) always', 'O(n) best case', 'O(log n)'], correct: 1, explanation: 'Merge sort is O(n log n) in all cases — best, average, and worst.', damage: 30 },
        { id: 'Z3-02-Q2', text: 'Merge sort space complexity is:', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], correct: 2, explanation: 'Merge requires O(n) extra space for the temporary merged arrays.', damage: 30 },
        { id: 'Z3-02-Q3', text: 'Merge sort is stable because:', options: ['It uses recursion', 'Equal elements keep relative order during merge', 'It runs in O(n log n)', 'It divides in half'], correct: 1, explanation: 'When merging, if left[i] == right[j], we take left[i] first, preserving original order.', damage: 30 },
        { id: 'Z3-02-Q4', text: 'Why is merge sort preferred for linked lists?', options: ['Less recursion', 'No need for random access (sequential merge)', 'Faster than O(n log n)', 'Uses O(1) space'], correct: 1, explanation: 'Merging linked lists requires only sequential traversal — no array indexing needed.', damage: 30 },
        { id: 'Z3-02-Q5', text: 'The number of levels in merge sort recursion tree for n elements is:', options: ['n', 'n/2', 'log n', 'sqrt(n)'], correct: 2, explanation: 'We halve the array log2(n) times until we reach single elements. log n levels.', damage: 30 },
      ],
      visualization: {
        type: 'sortingbars',
        title: 'Watch: Merge Sort on [6,3,8,1,4]',
        initialState: { values: [6,3,8,1,4] },
        steps: [
          { label: 'DIVIDE: [6,3,8,1,4] -> [6,3] [8,1,4]', state: { groups: [[6,3],[8,1,4]] } },
          { label: 'DIVIDE: [6,3]->[6][3], [8,1,4]->[8][1,4]', state: { groups: [[6],[3],[8],[1,4]] } },
          { label: 'DIVIDE: [1,4]->[1][4]', state: { groups: [[6],[3],[8],[1],[4]] } },
          { label: 'MERGE: [6][3]->[3,6], [1][4]->[1,4]', state: { groups: [[3,6],[8],[1,4]] } },
          { label: 'MERGE: [8][1,4]->[1,4,8]', state: { groups: [[3,6],[1,4,8]] } },
          { label: 'MERGE: [3,6][1,4,8]->[1,3,4,6,8]', state: { values: [1,3,4,6,8] } },
        ],
      },
      codeTemplates: {
        python: pyTemplate('merge', `def merge_sort(arr):
    if len(arr) <= 1: return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]: result.append(left[i]); i+=1
        else: result.append(right[j]); j+=1
    result.extend(left[i:]); result.extend(right[j:])
    return result

print(merge_sort([6, 3, 8, 1, 4]))`, '[1, 3, 4, 6, 8]', ['Base case: len<=1 return arr', 'Take smaller front element when merging']),
        typescript: tsTemplate('merge', `function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr
  const mid = Math.floor(arr.length / 2)
  const left = mergeSort(arr.slice(0, mid))
  const right = mergeSort(arr.slice(mid))
  const result: number[] = []
  let i = 0, j = 0
  while (i < left.length && j < right.length)
    result.push(left[i] <= right[j] ? left[i++] : right[j++])
  return result.concat(left.slice(i), right.slice(j))
}
console.log(mergeSort([6,3,8,1,4]).join(', '))`, '1, 3, 4, 6, 8', ['arr.length <= 1 for base', 'concat remaining elements']),
        go: goTemplate(`package main
import "fmt"
func mergeSort(arr []int) []int {
  if len(arr)<=1{return arr}
  mid:=len(arr)/2
  left:=mergeSort(arr[:mid]); right:=mergeSort(arr[mid:])
  res:=[]int{}; i,j:=0,0
  for i<len(left)&&j<len(right){if left[i]<=right[j]{res=append(res,left[i]);i++}else{res=append(res,right[j]);j++}}
  res=append(append(res,left[i:]...),right[j:]...)
  return res
}
func main(){fmt.Println(mergeSort([]int{6,3,8,1,4}))}`, '[1 3 4 6 8]', ['len(arr)<=1 base case', 'append remaining left/right']),
        rust: rustTemplate(`fn merge_sort(arr: &[i32]) -> Vec<i32> {
    if arr.len()<=1{return arr.to_vec();}
    let mid=arr.len()/2;
    let left=merge_sort(&arr[..mid]); let right=merge_sort(&arr[mid..]);
    let mut res=Vec::new(); let(mut i,mut j)=(0,0);
    while i<left.len()&&j<right.len(){if left[i]<=right[j]{res.push(left[i]);i+=1;}else{res.push(right[j]);j+=1;}}
    res.extend_from_slice(&left[i..]); res.extend_from_slice(&right[j..]); res
}
fn main(){println!("{:?}",merge_sort(&[6,3,8,1,4]));}`, '[1, 3, 4, 6, 8]', ['arr.len()<=1 base case', 'extend_from_slice for remainder']),
        csharp: csTemplate(`using System; using System.Collections.Generic;
int[] MergeSort(int[] arr){
  if(arr.Length<=1)return arr;
  int mid=arr.Length/2;
  var left=MergeSort(arr[..mid]); var right=MergeSort(arr[mid..]);
  var res=new List<int>(); int i=0,j=0;
  while(i<left.Length&&j<right.Length)res.Add(left[i]<=right[j]?left[i++]:right[j++]);
  while(i<left.Length)res.Add(left[i++]); while(j<right.Length)res.Add(right[j++]);
  return res.ToArray();
}
Console.WriteLine(string.Join(", ",MergeSort(new[]{6,3,8,1,4})));`, '1, 3, 4, 6, 8', ['arr.Length<=1 base', 'arr[..mid] and arr[mid..] for halves']),
        cpp: cppTemplate(`#include<iostream>
#include<vector>
using namespace std;
vector<int> mergeSort(vector<int>a){
  if(a.size()<=1)return a;
  int mid=a.size()/2;
  auto l=mergeSort(vector<int>(a.begin(),a.begin()+mid));
  auto r=mergeSort(vector<int>(a.begin()+mid,a.end()));
  vector<int>res;int i=0,j=0;
  while(i<(int)l.size()&&j<(int)r.size())res.push_back(l[i]<=r[j]?l[i++]:r[j++]);
  while(i<(int)l.size())res.push_back(l[i++]); while(j<(int)r.size())res.push_back(r[j++]);
  return res;
}
int main(){auto s=mergeSort({6,3,8,1,4});for(int i=0;i<(int)s.size();i++)cout<<s[i]<<(i+1<(int)s.size()?", ":"");cout<<endl;}`, '1, 3, 4, 6, 8', ['a.size()<=1 base', 'push remaining elements']),
      },
      prerequisites: ['Z1-03', 'Z3-01'],
      xpReward: 150,
      loot: ['Merge Scroll', 'O(n log n) Badge'],
    },
    {
      id: 'Z3-03',
      name: 'Quicksort',
      zone: 3, category: 'algo', position: 3,
      lore: 'The Pivot Tyrant chooses one element as ruler, forcing lesser values left and greater values right. Divide and conquer with deadly speed.',
      bossName: 'The Pivot Tyrant',
      bossHP: 160,
      bossAscii: `
  ╔═══════════════╗
  ║   QUICKSORT   ║
  ║ <P [P] P>     ║
  ║ LEFT PIV RIGHT ║
  ║  O(n log n)   ║
  ╚═══════════════╝`,
      what: 'Quicksort picks a pivot element, partitions the array into elements smaller and larger than the pivot, then recursively sorts each partition. In-place, cache-efficient.',
      why: 'O(n log n) average with excellent cache performance. Often faster than merge sort in practice due to in-place operation and small constant factors. Default sort in many standard libraries.',
      when: 'General-purpose sorting when average-case matters more than worst-case. Avoid for: data with many duplicates (use 3-way quicksort), security-sensitive contexts (O(n^2) attacks), need for stability.',
      complexity: {
        time: { 'average': 'O(n log n)', 'worst (bad pivot)': 'O(n^2)', 'best': 'O(n log n)' },
        space: 'O(log n) stack space (average)',
        notes: 'Randomized quicksort avoids worst case. Introsort (C++ std::sort) falls back to heapsort if recursion depth exceeds 2*log(n).',
      },
      realWorldUses: ['C++ std::sort (introsort)', 'Java dual-pivot quicksort', 'Unix sort command', 'Database sorting engines'],
      questions: [
        { id: 'Z3-03-Q1', text: 'Quicksort pivot partitions array into:', options: ['Two equal halves', 'Elements < pivot (left) and > pivot (right)', 'Sorted and unsorted', 'Random groups'], correct: 1, explanation: 'After partition: left side < pivot, right side > pivot. Pivot is in final position.', damage: 32 },
        { id: 'Z3-03-Q2', text: 'Quicksort worst case O(n^2) occurs when:', options: ['Array is random', 'Pivot is always the median', 'Pivot is always min or max element', 'Array has duplicates'], correct: 2, explanation: 'If pivot is always min/max, one partition has n-1 elements = n recursive calls each O(n) = O(n^2).', damage: 32 },
        { id: 'Z3-03-Q3', text: 'Randomized quicksort mitigates worst case by:', options: ['Using merge sort as fallback', 'Choosing random pivot', 'Sorting small arrays with insertion sort', 'Using 3-way partition'], correct: 1, explanation: 'Random pivot makes it extremely unlikely to always pick the worst element. Expected O(n log n).', damage: 32 },
        { id: 'Z3-03-Q4', text: 'Is standard quicksort stable?', options: ['Yes always', 'No — equal elements may swap', 'Only with random pivot', 'Yes when array is sorted'], correct: 1, explanation: 'Standard quicksort is NOT stable. Equal elements can end up in any order.', damage: 32 },
        { id: 'Z3-03-Q5', text: 'Quicksort is faster than merge sort in practice because:', options: ['Better worst case', 'Better cache locality and no extra memory', 'It is O(n)', 'Merge sort is O(n^2)'], correct: 1, explanation: 'In-place = better cache behavior. No extra O(n) memory allocation. Constants are smaller.', damage: 32 },
      ],
      visualization: {
        type: 'sortingbars',
        title: 'Watch: Quicksort partition step on [3,1,4,1,5,9,2,6], pivot=6',
        initialState: { values: [3,1,4,1,5,9,2,6] },
        steps: [
          { label: 'Choose pivot=6 (last element). Set i=-1', state: { values: [3,1,4,1,5,9,2,6] } },
          { label: '3<6: i=0, swap arr[0] with arr[0]. Array unchanged.', state: { values: [3,1,4,1,5,9,2,6] }, highlight: [0] },
          { label: '1<6: i=1. 4<6: i=2. 1<6: i=3. 5<6: i=4.', state: { values: [3,1,4,1,5,9,2,6] }, highlight: [1,2,3,4] },
          { label: '9>6: skip. 2<6: i=5, swap arr[5]=9 with arr[6]=2.', state: { values: [3,1,4,1,5,2,9,6] }, highlight: [5,6] },
          { label: 'Place pivot: swap arr[6]=9 with arr[5+1=6]=9... swap with index i+1=6.', state: { values: [3,1,4,1,5,2,6,9] }, highlight: [6] },
          { label: 'Pivot 6 is now at index 6 (correct position). Left=[3,1,4,1,5,2], Right=[9]', state: { values: [3,1,4,1,5,2,6,9] }, highlight: [6] },
        ],
      },
      codeTemplates: {
        python: pyTemplate('quick', `import random

def quicksort(arr, low=0, high=None):
    if high is None: high = len(arr) - 1
    if low < high:
        p = partition(arr, low, high)
        quicksort(arr, low, p - 1)
        quicksort(arr, p + 1, high)

def partition(arr, low, high):
    # Randomize pivot to avoid worst case
    pivot_idx = random.randint(low, high)
    arr[pivot_idx], arr[high] = arr[high], arr[pivot_idx]
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i+1], arr[high] = arr[high], arr[i+1]
    return i + 1

arr = [3, 1, 4, 1, 5, 9, 2, 6]
quicksort(arr)
print(arr)`, '[1, 1, 2, 3, 4, 5, 6, 9]', ['Random pivot avoids worst case', 'Partition: i tracks boundary of < pivot elements']),
        typescript: tsTemplate('quick', `function quicksort(arr: number[], low = 0, high = arr.length - 1): void {
  if (low < high) {
    const p = partition(arr, low, high)
    quicksort(arr, low, p - 1)
    quicksort(arr, p + 1, high)
  }
}
function partition(arr: number[], low: number, high: number): number {
  const pivotIdx = low + Math.floor(Math.random() * (high - low + 1))
  ;[arr[pivotIdx], arr[high]] = [arr[high], arr[pivotIdx]]
  const pivot = arr[high]
  let i = low - 1
  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) { i++; [arr[i], arr[j]] = [arr[j], arr[i]]; }
  }
  ;[arr[i+1], arr[high]] = [arr[high], arr[i+1]]
  return i + 1
}
const arr = [3,1,4,1,5,9,2,6]
quicksort(arr)
console.log(arr.join(', '))`, '1, 1, 2, 3, 4, 5, 6, 9', ['Swap random pivot with last', 'i tracks < pivot boundary']),
        go: goTemplate(`package main
import ("fmt";"math/rand")
func partition(a[]int,low,high int)int{
  p:=low+rand.Intn(high-low+1); a[p],a[high]=a[high],a[p]
  pivot:=a[high]; i:=low-1
  for j:=low;j<high;j++{if a[j]<=pivot{i++;a[i],a[j]=a[j],a[i]}}
  a[i+1],a[high]=a[high],a[i+1]; return i+1
}
func quicksort(a[]int,low,high int){if low<high{p:=partition(a,low,high);quicksort(a,low,p-1);quicksort(a,p+1,high)}}
func main(){a:=[]int{3,1,4,1,5,9,2,6};quicksort(a,0,len(a)-1);fmt.Println(a)}`, '[1 1 2 3 4 5 6 9]', ['rand.Intn(high-low+1) for random pivot', 'swap pivot to end first']),
        rust: rustTemplate(`fn partition(arr: &mut Vec<i32>, low: usize, high: usize) -> usize {
    let pivot = arr[high]; let mut i = low;
    for j in low..high { if arr[j] <= pivot { arr.swap(i, j); i += 1; } }
    arr.swap(i, high); i
}
fn quicksort(arr: &mut Vec<i32>, low: usize, high: usize) {
    if low < high { let p = partition(arr, low, high); if p > 0 { quicksort(arr, low, p-1); } quicksort(arr, p+1, high); }
}
fn main() {
    let mut arr = vec![3,1,4,1,5,9,2,6];
    let n = arr.len()-1; quicksort(&mut arr, 0, n);
    println!("{:?}", arr);
}`, '[1, 1, 2, 3, 4, 5, 6, 9]', ['arr.swap(i, j) for swapping', 'arr.swap(i, high) places pivot']),
        csharp: csTemplate(`using System;
int Partition(int[]a,int low,int high){
  int pivot=a[high],i=low-1;
  for(int j=low;j<high;j++)if(a[j]<=pivot){i++;int t=a[i];a[i]=a[j];a[j]=t;}
  int tmp=a[i+1];a[i+1]=a[high];a[high]=tmp; return i+1;
}
void Quicksort(int[]a,int low,int high){if(low<high){int p=Partition(a,low,high);Quicksort(a,low,p-1);Quicksort(a,p+1,high);}}
int[]arr={3,1,4,1,5,9,2,6}; Quicksort(arr,0,arr.Length-1);
Console.WriteLine(string.Join(", ",arr));`, '1, 1, 2, 3, 4, 5, 6, 9', ['pivot=a[high]', 'i++ and swap when a[j]<=pivot']),
        cpp: cppTemplate(`#include<iostream>
#include<vector>
using namespace std;
int partition(vector<int>&a,int low,int high){
  int pivot=a[high],i=low-1;
  for(int j=low;j<high;j++)if(a[j]<=pivot){++i;swap(a[i],a[j]);}
  swap(a[i+1],a[high]); return i+1;
}
void quicksort(vector<int>&a,int low,int high){if(low<high){int p=partition(a,low,high);quicksort(a,low,p-1);quicksort(a,p+1,high);}}
int main(){vector<int>a={3,1,4,1,5,9,2,6};quicksort(a,0,a.size()-1);for(int i=0;i<(int)a.size();i++)cout<<a[i]<<(i+1<(int)a.size()?", ":"");cout<<endl;}`, '1, 1, 2, 3, 4, 5, 6, 9', ['pivot=a[high]', 'swap(a[i+1], a[high]) places pivot']),
      },
      prerequisites: ['Z1-03', 'Z3-01'],
      xpReward: 160,
      loot: ['Pivot Spear', 'In-Place Badge'],
    },
    {
      id: 'Z3-04',
      name: 'Heapsort',
      zone: 3, category: 'algo', position: 4,
      lore: 'The Heap Titan builds a great pyramid of order, then methodically extracts the maximum to build a sorted trail behind it.',
      bossName: 'The Heap Titan',
      bossHP: 140,
      bossAscii: `
  ╔═══════════════╗
  ║  HEAP SORT    ║
  ║      9        ║
  ║    7   8      ║
  ║  5  6 3  1    ║
  ║  EXTRACT!     ║
  ╚═══════════════╝`,
      what: 'Heapsort builds a max-heap from the array, then repeatedly extracts the maximum (swapping to end) and re-heapifies. Combines heap data structure with sorting.',
      why: 'O(n log n) worst case, O(1) extra space. Not affected by input order. Best of both worlds compared to merge sort (in-place) and quicksort (guaranteed O(n log n)).',
      when: 'When guaranteed O(n log n) and O(1) space both required. In practice, quicksort and merge sort usually outperform heapsort due to cache effects. Used in introsort as fallback.',
      complexity: {
        time: { 'all cases': 'O(n log n)', 'heapify': 'O(log n)', 'build heap': 'O(n)' },
        space: 'O(1) in-place',
        notes: 'Heapsort is NOT stable. Building heap is O(n), not O(n log n) — surprising but true via amortized analysis.',
      },
      realWorldUses: ['introsort fallback (C++ std::sort)', 'Priority queue implementation', 'K largest elements', 'Operating system scheduling'],
      questions: [
        { id: 'Z3-04-Q1', text: 'What is a max-heap property?', options: ['Root is smallest', 'Parent is always >= children', 'All leaves are at same level', 'Sorted array'], correct: 1, explanation: 'Max-heap: every parent node is >= its children. Root is the maximum.', damage: 28 },
        { id: 'Z3-04-Q2', text: 'Building a heap from n elements takes:', options: ['O(n log n)', 'O(n)', 'O(log n)', 'O(n^2)'], correct: 1, explanation: 'Build heap by heapifying from last non-leaf to root = O(n) amortized (not n*logn as expected).', damage: 28 },
        { id: 'Z3-04-Q3', text: 'In array representation, parent of node i is at:', options: ['i*2', 'i*2+1', '(i-1)//2', 'i+1'], correct: 2, explanation: 'For 0-indexed array: parent = (i-1)//2. Children: 2*i+1 (left), 2*i+2 (right).', damage: 28 },
        { id: 'Z3-04-Q4', text: 'Heapsort extracts maximum by:', options: ['Deleting from middle', 'Swapping root with last element, reducing heap size, heapifying root', 'Building new heap', 'Sorting first'], correct: 1, explanation: 'Swap root (max) with last, shrink heap size by 1, heapify root back down to maintain heap property.', damage: 28 },
        { id: 'Z3-04-Q5', text: 'Heapsort is NOT stable. This means:', options: ['It can be O(n^2)', 'Equal elements may not maintain original relative order', 'It requires extra space', 'It is slower'], correct: 1, explanation: 'Swap operations can change relative order of equal elements.', damage: 28 },
      ],
      visualization: {
        type: 'tree',
        title: 'Watch: Heapsort extracting max from heap',
        initialState: { values: [9,7,8,5,6,3,1] },
        steps: [
          { label: 'Max-heap built: [9,7,8,5,6,3,1]. Root=9 is max.', state: { values: [9,7,8,5,6,3,1] }, highlight: [0] },
          { label: 'Swap root(9) with last(1). Heap: [1,7,8,5,6,3], sorted: [9]', state: { values: [1,7,8,5,6,3,9] }, highlight: [0,6] },
          { label: 'Heapify: 1 sinks down. [8,7,3,5,6,1], sorted: [9]', state: { values: [8,7,3,5,6,1,9] }, highlight: [0] },
          { label: 'Swap root(8) with 6th(1). Heap: [1,7,3,5,6], sorted: [8,9]', state: { values: [1,7,3,5,6,8,9] }, highlight: [0,5] },
          { label: 'Heapify: 1 sinks. [7,6,3,5,1]. sorted: [8,9]', state: { values: [7,6,3,5,1,8,9] } },
          { label: 'Continue until all extracted. Final: [1,3,5,6,7,8,9]', state: { values: [1,3,5,6,7,8,9] }, highlight: [0,1,2,3,4,5,6] },
        ],
      },
      codeTemplates: {
        python: pyTemplate('heap', `def heapify(arr, n, i):
    largest = i
    left = 2*i + 1
    right = 2*i + 2
    if left < n and arr[left] > arr[largest]: largest = left
    if right < n and arr[right] > arr[largest]: largest = right
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)

def heapsort(arr):
    n = len(arr)
    for i in range(n//2 - 1, -1, -1):
        heapify(arr, n, i)
    for i in range(n-1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify(arr, i, 0)
    return arr

print(heapsort([9,7,8,5,6,3,1]))`, '[1, 3, 5, 6, 7, 8, 9]', ['Build heap: heapify from n//2-1 down to 0', 'Extract: swap root with last, heapify root']),
        typescript: tsTemplate('heap', `function heapify(arr: number[], n: number, i: number): void {
  let largest = i
  const left = 2*i+1, right = 2*i+2
  if (left < n && arr[left] > arr[largest]) largest = left
  if (right < n && arr[right] > arr[largest]) largest = right
  if (largest !== i) { [arr[i], arr[largest]] = [arr[largest], arr[i]]; heapify(arr, n, largest); }
}
function heapsort(arr: number[]): number[] {
  const n = arr.length
  for (let i = Math.floor(n/2)-1; i >= 0; i--) heapify(arr, n, i)
  for (let i = n-1; i > 0; i--) { [arr[0], arr[i]] = [arr[i], arr[0]]; heapify(arr, i, 0); }
  return arr
}
console.log(heapsort([9,7,8,5,6,3,1]).join(', '))`, '1, 3, 5, 6, 7, 8, 9', ['heapify from n/2-1 to 0', 'swap arr[0] and arr[i], heapify root']),
        go: goTemplate(`package main
import "fmt"
func heapify(a[]int,n,i int){
  largest:=i; l:=2*i+1; r:=2*i+2
  if l<n&&a[l]>a[largest]{largest=l}; if r<n&&a[r]>a[largest]{largest=r}
  if largest!=i{a[i],a[largest]=a[largest],a[i];heapify(a,n,largest)}
}
func heapsort(a[]int){
  n:=len(a); for i:=n/2-1;i>=0;i--{heapify(a,n,i)}
  for i:=n-1;i>0;i--{a[0],a[i]=a[i],a[0];heapify(a,i,0)}
}
func main(){a:=[]int{9,7,8,5,6,3,1};heapsort(a);fmt.Println(a)}`, '[1 3 5 6 7 8 9]', ['heapify from n/2-1', 'swap a[0],a[i] then heapify']),
        rust: rustTemplate(`fn heapify(arr: &mut Vec<i32>, n: usize, i: usize) {
    let mut largest=i; let l=2*i+1; let r=2*i+2;
    if l<n&&arr[l]>arr[largest]{largest=l;} if r<n&&arr[r]>arr[largest]{largest=r;}
    if largest!=i{arr.swap(i,largest);heapify(arr,n,largest);}
}
fn heapsort(arr: &mut Vec<i32>) {
    let n=arr.len();
    for i in (0..n/2).rev(){heapify(arr,n,i);}
    for i in (1..n).rev(){arr.swap(0,i);heapify(arr,i,0);}
}
fn main(){let mut a=vec![9,7,8,5,6,3,1];heapsort(&mut a);println!("{:?}",a);}`, '[1, 3, 5, 6, 7, 8, 9]', ['(0..n/2).rev() for build phase', 'arr.swap(0,i) then heapify']),
        csharp: csTemplate(`using System;
void Heapify(int[]a,int n,int i){
  int lg=i,l=2*i+1,r=2*i+2;
  if(l<n&&a[l]>a[lg])lg=l; if(r<n&&a[r]>a[lg])lg=r;
  if(lg!=i){int t=a[i];a[i]=a[lg];a[lg]=t;Heapify(a,n,lg);}
}
void Heapsort(int[]a){
  int n=a.Length; for(int i=n/2-1;i>=0;i--)Heapify(a,n,i);
  for(int i=n-1;i>0;i--){int t=a[0];a[0]=a[i];a[i]=t;Heapify(a,i,0);}
}
int[]arr={9,7,8,5,6,3,1}; Heapsort(arr);
Console.WriteLine(string.Join(", ",arr));`, '1, 3, 5, 6, 7, 8, 9', ['Heapify from n/2-1 down', 'Swap root with last, then heapify']),
        cpp: cppTemplate(`#include<iostream>
#include<vector>
using namespace std;
void heapify(vector<int>&a,int n,int i){
  int lg=i,l=2*i+1,r=2*i+2;
  if(l<n&&a[l]>a[lg])lg=l; if(r<n&&a[r]>a[lg])lg=r;
  if(lg!=i){swap(a[i],a[lg]);heapify(a,n,lg);}
}
void heapsort(vector<int>&a){
  int n=a.size(); for(int i=n/2-1;i>=0;i--)heapify(a,n,i);
  for(int i=n-1;i>0;i--){swap(a[0],a[i]);heapify(a,i,0);}
}
int main(){vector<int>a={9,7,8,5,6,3,1};heapsort(a);for(int i=0;i<(int)a.size();i++)cout<<a[i]<<(i+1<(int)a.size()?", ":"");cout<<endl;}`, '1, 3, 5, 6, 7, 8, 9', ['heapify from n/2-1 to 0', 'swap(a[0],a[i]) then heapify']),
      },
      prerequisites: ['Z3-02'],
      xpReward: 140,
      loot: ['Heap Crown', 'Priority Badge'],
    },
    {
      id: 'Z3-05',
      name: 'Timsort',
      zone: 3, category: 'algo', position: 5,
      lore: 'The Adaptive Sentinel observes real-world data patterns and combines insertion sort\'s efficiency for small runs with merge sort\'s power for large ones.',
      bossName: 'The Adaptive Sentinel',
      bossHP: 130,
      bossAscii: `
  ╔═══════════════╗
  ║   TIMSORT     ║
  ║ INS+MERGE=WIN ║
  ║ Real data >>>  ║
  ║ Python default ║
  ╚═══════════════╝`,
      what: 'Timsort is a hybrid sorting algorithm combining insertion sort (for small subarrays) and merge sort (for combining). It exploits existing runs (already-sorted sequences) in real data.',
      why: 'Python\'s default sort and Java\'s object sort. Adaptive: O(n) for already-sorted, O(n log n) worst case. Stable. Outperforms pure algorithms on real-world data with partial order.',
      when: 'This is what you get by default in Python (sorted(), list.sort()) and Java (Collections.sort). Understanding it helps optimize for nearly-sorted datasets.',
      complexity: {
        time: { 'best (sorted)': 'O(n)', 'average': 'O(n log n)', 'worst': 'O(n log n)' },
        space: 'O(n)',
        notes: 'Run size (MIN_RUN) is typically 32-64. Merges runs using a stack to ensure O(n log n).',
      },
      realWorldUses: ['Python list.sort() and sorted()', 'Java Collections.sort()', 'Android Java sort', 'Real-world datasets with partial ordering'],
      questions: [
        { id: 'Z3-05-Q1', text: 'Timsort is a hybrid of:', options: ['Quicksort + Heapsort', 'Insertion Sort + Merge Sort', 'Bubble + Selection', 'Counting + Radix'], correct: 1, explanation: 'Timsort uses insertion sort for small runs (MIN_RUN ~32-64) and merge sort to combine them.', damage: 26 },
        { id: 'Z3-05-Q2', text: 'A "run" in Timsort is:', options: ['A loop iteration', 'A maximal already-sorted (or reverse-sorted) subarray', 'A random partition', 'A single element'], correct: 1, explanation: 'Timsort finds natural runs — existing sorted sequences — to exploit real data structure.', damage: 26 },
        { id: 'Z3-05-Q3', text: 'Timsort best case on sorted array is:', options: ['O(n log n)', 'O(n)', 'O(n^2)', 'O(log n)'], correct: 1, explanation: 'If the entire array is one run, Timsort finds it in O(n) — no sorting needed.', damage: 26 },
        { id: 'Z3-05-Q4', text: 'Why is Timsort stable?', options: ['It never compares elements', 'Both insertion sort and merge sort (as used) are stable', 'It uses random pivot', 'It never swaps'], correct: 1, explanation: 'Both components maintain relative order of equal elements.', damage: 26 },
        { id: 'Z3-05-Q5', text: 'Timsort MIN_RUN of ~32 means:', options: ['Array must be 32 elements', 'Subarrays smaller than 32 use insertion sort', 'Merge happens every 32 elements', 'Recursion depth is 32'], correct: 1, explanation: 'MIN_RUN defines the threshold below which insertion sort is used instead of recursive splitting.', damage: 26 },
      ],
      visualization: {
        type: 'generic',
        title: 'Watch: Timsort identifying runs in [3,5,7,2,4,1,6,8]',
        initialState: {},
        steps: [
          { label: 'Scan: 3<5<7 — ascending run [3,5,7]', state: { runs: [[3,5,7]] } },
          { label: 'Next: 7>2, run break. 2<4 — new run starting at 2', state: { runs: [[3,5,7],[2,4]] } },
          { label: '4>1, run break. 1<6<8 — run [1,6,8]', state: { runs: [[3,5,7],[2,4],[1,6,8]] } },
          { label: 'Run [2,4] too small (MIN_RUN=3) — extend with insertion sort', state: { runs: [[3,5,7],[1,2,4],[1,6,8]] } },
          { label: 'Merge runs using merge sort: [3,5,7]+[1,2,4] -> [1,2,3,4,5,7]', state: { runs: [[1,2,3,4,5,7],[1,6,8]] } },
          { label: 'Final merge: [1,2,3,4,5,7]+[1,6,8] -> [1,1,2,3,4,5,6,7,8]', state: { values: [1,1,2,3,4,5,6,7,8] } },
        ],
      },
      codeTemplates: {
        python: pyTemplate('timsort', `# Simplified Timsort demonstration
MIN_RUN = 4

def insertion_sort(arr, left, right):
    for i in range(left + 1, right + 1):
        key = arr[i]
        j = i - 1
        while j >= left and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key

def merge(arr, l, m, r):
    left = arr[l:m+1]; right = arr[m+1:r+1]
    i = j = 0; k = l
    while i < len(left) and j < len(right):
        if left[i] <= right[j]: arr[k] = left[i]; i += 1
        else: arr[k] = right[j]; j += 1
        k += 1
    while i < len(left): arr[k] = left[i]; i += 1; k += 1
    while j < len(right): arr[k] = right[j]; j += 1; k += 1

def timsort(arr):
    n = len(arr)
    for i in range(0, n, MIN_RUN):
        insertion_sort(arr, i, min(i + MIN_RUN - 1, n - 1))
    size = MIN_RUN
    while size < n:
        for left in range(0, n, 2 * size):
            mid = min(n - 1, left + size - 1)
            right = min(left + 2 * size - 1, n - 1)
            if mid < right:
                merge(arr, left, mid, right)
        size *= 2
    return arr

print(timsort([3, 5, 7, 2, 4, 1, 6, 8]))`, '[1, 2, 3, 4, 5, 6, 7, 8]', ['MIN_RUN=4 means use insertion sort for subarrays of size 4', 'Then merge pairs of runs doubling size each time']),
        typescript: tsTemplate('timsort', `const MIN_RUN = 4

function insertionSort(arr: number[], left: number, right: number): void {
  for (let i = left+1; i <= right; i++) {
    const key = arr[i]; let j = i-1
    while (j >= left && arr[j] > key) { arr[j+1] = arr[j]; j--; }
    arr[j+1] = key
  }
}

function merge(arr: number[], l: number, m: number, r: number): void {
  const left = arr.slice(l, m+1), right = arr.slice(m+1, r+1)
  let i=0,j=0,k=l
  while(i<left.length&&j<right.length) arr[k++]=left[i]<=right[j]?left[i++]:right[j++]
  while(i<left.length) arr[k++]=left[i++]
  while(j<right.length) arr[k++]=right[j++]
}

function timsort(arr: number[]): number[] {
  const n = arr.length
  for (let i=0;i<n;i+=MIN_RUN) insertionSort(arr, i, Math.min(i+MIN_RUN-1,n-1))
  for (let size=MIN_RUN;size<n;size*=2) {
    for (let left=0;left<n;left+=2*size) {
      const mid=Math.min(n-1,left+size-1), right=Math.min(left+2*size-1,n-1)
      if(mid<right) merge(arr,left,mid,right)
    }
  }
  return arr
}
console.log(timsort([3,5,7,2,4,1,6,8]).join(', '))`, '1, 2, 3, 4, 5, 6, 7, 8', ['MIN_RUN=4', 'insertionSort each run, then merge doubling size']),
        go: goTemplate(`package main
import "fmt"
const MIN_RUN=4
func insSort(a[]int,l,r int){
  for i:=l+1;i<=r;i++{k:=a[i];j:=i-1;for j>=l&&a[j]>k{a[j+1]=a[j];j--};a[j+1]=k}
}
func mergeArr(a[]int,l,m,r int){
  left:=append([]int{},a[l:m+1]...);right:=append([]int{},a[m+1:r+1]...)
  i,j,k:=0,0,l
  for i<len(left)&&j<len(right){if left[i]<=right[j]{a[k]=left[i];i++}else{a[k]=right[j];j++};k++}
  for i<len(left){a[k]=left[i];i++;k++}; for j<len(right){a[k]=right[j];j++;k++}
}
func timsort(a[]int){
  n:=len(a); for i:=0;i<n;i+=MIN_RUN{insSort(a,i,min2(i+MIN_RUN-1,n-1))}
  for size:=MIN_RUN;size<n;size*=2{for left:=0;left<n;left+=2*size{mid:=min2(n-1,left+size-1);right:=min2(left+2*size-1,n-1);if mid<right{mergeArr(a,left,mid,right)}}}
}
func min2(a,b int)int{if a<b{return a};return b}
func main(){a:=[]int{3,5,7,2,4,1,6,8};timsort(a);fmt.Println(a)}`, '[1 2 3 4 5 6 7 8]', ['MIN_RUN=4', 'insSort each chunk, merge pairs']),
        rust: rustTemplate(`const MIN_RUN: usize = 4;
fn ins_sort(arr: &mut Vec<i32>, left: usize, right: usize) {
    for i in (left+1)..=right {
        let key=arr[i]; let mut j=i;
        while j>left&&arr[j-1]>key{arr[j]=arr[j-1];j-=1;} arr[j]=key;
    }
}
fn merge_arr(arr: &mut Vec<i32>, l: usize, m: usize, r: usize) {
    let left:Vec<i32>=arr[l..=m].to_vec(); let right:Vec<i32>=arr[m+1..=r].to_vec();
    let(mut i,mut j,mut k)=(0,0,l);
    while i<left.len()&&j<right.len(){arr[k]=if left[i]<=right[j]{let v=left[i];i+=1;v}else{let v=right[j];j+=1;v};k+=1;}
    while i<left.len(){arr[k]=left[i];i+=1;k+=1;} while j<right.len(){arr[k]=right[j];j+=1;k+=1;}
}
fn timsort(arr: &mut Vec<i32>) {
    let n=arr.len();
    let mut i=0;while i<n{ins_sort(arr,i,(i+MIN_RUN-1).min(n-1));i+=MIN_RUN;}
    let mut size=MIN_RUN;
    while size<n{let mut left=0;while left<n{let mid=(left+size-1).min(n-1);let right=(left+2*size-1).min(n-1);if mid<right{merge_arr(arr,left,mid,right);}left+=2*size;}size*=2;}
}
fn main(){let mut a=vec![3,5,7,2,4,1,6,8];timsort(&mut a);println!("{:?}",a);}`, '[1, 2, 3, 4, 5, 6, 7, 8]', ['MIN_RUN=4', 'ins_sort chunks, then merge_arr pairs']),
        csharp: csTemplate(`using System;
const int MIN_RUN=4;
void InsSort(int[]a,int l,int r){for(int i=l+1;i<=r;i++){int k=a[i];int j=i-1;while(j>=l&&a[j]>k){a[j+1]=a[j];j--;}a[j+1]=k;}}
void MergeArr(int[]a,int l,int m,int r){
  var left=new int[m-l+1];var right=new int[r-m];
  Array.Copy(a,l,left,0,m-l+1);Array.Copy(a,m+1,right,0,r-m);
  int i=0,j=0,k=l;
  while(i<left.Length&&j<right.Length)a[k++]=left[i]<=right[j]?left[i++]:right[j++];
  while(i<left.Length)a[k++]=left[i++];while(j<right.Length)a[k++]=right[j++];
}
void Timsort(int[]a){
  int n=a.Length;
  for(int i=0;i<n;i+=MIN_RUN)InsSort(a,i,Math.Min(i+MIN_RUN-1,n-1));
  for(int size=MIN_RUN;size<n;size*=2)
    for(int left=0;left<n;left+=2*size){int mid=Math.Min(n-1,left+size-1);int right=Math.Min(left+2*size-1,n-1);if(mid<right)MergeArr(a,left,mid,right);}
}
int[]arr={3,5,7,2,4,1,6,8};Timsort(arr);Console.WriteLine(string.Join(", ",arr));`, '1, 2, 3, 4, 5, 6, 7, 8', ['MIN_RUN=4', 'InsSort each chunk, MergeArr pairs']),
        cpp: cppTemplate(`#include<iostream>
#include<vector>
#include<algorithm>
using namespace std;
const int MIN_RUN=4;
void insSort(vector<int>&a,int l,int r){for(int i=l+1;i<=r;i++){int k=a[i];int j=i-1;while(j>=l&&a[j]>k){a[j+1]=a[j];j--;}a[j+1]=k;}}
void mergeArr(vector<int>&a,int l,int m,int r){
  vector<int>left(a.begin()+l,a.begin()+m+1),right(a.begin()+m+1,a.begin()+r+1);
  int i=0,j=0,k=l;
  while(i<(int)left.size()&&j<(int)right.size())a[k++]=left[i]<=right[j]?left[i++]:right[j++];
  while(i<(int)left.size())a[k++]=left[i++];while(j<(int)right.size())a[k++]=right[j++];
}
void timsort(vector<int>&a){
  int n=a.size();
  for(int i=0;i<n;i+=MIN_RUN)insSort(a,i,min(i+MIN_RUN-1,n-1));
  for(int size=MIN_RUN;size<n;size*=2)
    for(int left=0;left<n;left+=2*size){int mid=min(n-1,left+size-1);int right=min(left+2*size-1,n-1);if(mid<right)mergeArr(a,left,mid,right);}
}
int main(){vector<int>a={3,5,7,2,4,1,6,8};timsort(a);for(int i=0;i<(int)a.size();i++)cout<<a[i]<<(i+1<(int)a.size()?", ":"");cout<<endl;}`, '1, 2, 3, 4, 5, 6, 7, 8', ['MIN_RUN=4', 'insSort chunks, mergeArr pairs']),
      },
      prerequisites: ['Z3-01', 'Z3-02'],
      xpReward: 130,
      loot: ['Adaptive Armor', 'Python Sort Badge'],
    },
    {
      id: 'Z3-06',
      name: 'Counting Sort',
      zone: 3, category: 'algo', position: 6,
      lore: 'The Census Keeper tallies every value, then reconstructs the world in perfect order without a single comparison.',
      bossName: 'The Census Keeper',
      bossHP: 110,
      bossAscii: `
  ╔═══════════════╗
  ║ COUNTING SORT ║
  ║ [0:2][1:3][2:1]║
  ║ 0,0,1,1,1,2   ║
  ║  NO COMPARES! ║
  ╚═══════════════╝`,
      what: 'Counting sort counts the frequency of each value in a fixed range, then reconstructs the sorted array from the counts. No comparisons — beats O(n log n) lower bound for comparison sorts.',
      why: 'O(n+k) where k is the range of values. Extremely fast when k is small (e.g., sorting ages 0-150, grades 0-100). Stable with proper implementation.',
      when: 'Use when: values are integers in a known small range. Do NOT use when: range k >> n (wastes memory), values are not integers, or range is unknown.',
      complexity: {
        time: { 'counting and reconstruction': 'O(n+k)', 'k = range of values': '' },
        space: 'O(n+k)',
        notes: 'Counting sort beats the O(n log n) comparison-based lower bound because it does not compare elements.',
      },
      realWorldUses: ['Radix sort subroutine', 'Sorting bounded integers (ages, scores)', 'Frequency counting', 'Histogram computation'],
      questions: [
        { id: 'Z3-06-Q1', text: 'Counting sort achieves O(n+k) by:', options: ['Comparing cleverly', 'Counting frequencies, not comparing', 'Dividing like merge sort', 'Using a pivot'], correct: 1, explanation: 'Counting frequencies is O(n). Reconstruction is O(n+k). No comparisons needed!', damage: 22 },
        { id: 'Z3-06-Q2', text: 'Counting sort is inefficient when:', options: ['n is large', 'k (range) is much larger than n', 'Data is sorted', 'Data has duplicates'], correct: 1, explanation: 'If k=1,000,000 and n=10, we waste memory and time on an enormous count array.', damage: 22 },
        { id: 'Z3-06-Q3', text: 'Counting sort only works on:', options: ['Any data type', 'Integers (or mappable to integers)', 'Sorted arrays', 'Linked lists'], correct: 1, explanation: 'We need integer indices to count into the count array.', damage: 22 },
        { id: 'Z3-06-Q4', text: 'Is counting sort stable?', options: ['Never', 'Yes, with the right implementation (build output backwards)', 'Only for small k', 'Only if input is sorted'], correct: 1, explanation: 'Building the output array by scanning input backwards (and using prefix sums) makes counting sort stable.', damage: 22 },
        { id: 'Z3-06-Q5', text: 'Counting sort breaks the O(n log n) lower bound because:', options: ['It is faster than O(n log n)', 'It is NOT a comparison-based sort', 'It uses extra memory', 'It only works for small n'], correct: 1, explanation: 'The O(n log n) lower bound applies only to comparison-based algorithms. Counting sort uses counting, not comparisons.', damage: 22 },
      ],
      visualization: {
        type: 'array',
        title: 'Watch: Counting sort on [3,1,2,1,3,2,1]',
        initialState: { values: [3,1,2,1,3,2,1] },
        steps: [
          { label: 'Step 1: Count frequencies. count[1]=3, count[2]=2, count[3]=2', state: { count: [0,3,2,2] } },
          { label: 'Step 2: Prefix sums. count[1]=3, count[2]=5, count[3]=7', state: { count: [0,3,5,7] } },
          { label: 'Step 3: Reconstruct. Place each element at its prefix sum position.', state: { values: [1,1,1,2,2,3,3] } },
          { label: 'Sorted: [1,1,1,2,2,3,3]. O(n+k) without any comparison!', state: { values: [1,1,1,2,2,3,3] }, highlight: [0,1,2,3,4,5,6] },
        ],
      },
      codeTemplates: {
        python: pyTemplate('counting', `def counting_sort(arr):
    if not arr: return arr
    max_val = max(arr)
    count = [0] * (max_val + 1)
    for val in arr:
        count[val] += 1
    result = []
    for val, freq in enumerate(count):
        result.extend([val] * freq)
    return result

print(counting_sort([3, 1, 2, 1, 3, 2, 1]))`, '[1, 1, 1, 2, 2, 3, 3]', ['count[val] += 1 for each element', 'extend result by frequency of each value']),
        typescript: tsTemplate('counting', `function countingSort(arr: number[]): number[] {
  if (!arr.length) return arr
  const maxVal = Math.max(...arr)
  const count = new Array(maxVal + 1).fill(0)
  for (const val of arr) count[val]++
  const result: number[] = []
  count.forEach((freq, val) => { for (let i=0;i<freq;i++) result.push(val) })
  return result
}
console.log(countingSort([3,1,2,1,3,2,1]).join(', '))`, '1, 1, 1, 2, 2, 3, 3', ['count[val]++ for each val', 'push val freq times']),
        go: goTemplate(`package main
import "fmt"
func countingSort(arr []int) []int {
  if len(arr)==0{return arr}
  maxVal:=arr[0]; for _,v:=range arr{if v>maxVal{maxVal=v}}
  count:=make([]int,maxVal+1); for _,v:=range arr{count[v]++}
  result:=[]int{}; for v,freq:=range count{for i:=0;i<freq;i++{result=append(result,v)}}
  return result
}
func main(){fmt.Println(countingSort([]int{3,1,2,1,3,2,1}))}`, '[1 1 1 2 2 3 3]', ['make([]int, maxVal+1) for count array', 'nested loop: freq times append v']),
        rust: rustTemplate(`fn counting_sort(arr: &[usize]) -> Vec<usize> {
    if arr.is_empty(){return vec![];}
    let max_val=*arr.iter().max().unwrap();
    let mut count=vec![0usize;max_val+1];
    for &v in arr{count[v]+=1;}
    let mut result=Vec::new();
    for (v,&freq) in count.iter().enumerate(){for _ in 0..freq{result.push(v);}}
    result
}
fn main(){println!("{:?}",counting_sort(&[3,1,2,1,3,2,1]));}`, '[1, 1, 1, 2, 2, 3, 3]', ['count[v]+=1', 'enumerate count, push v freq times']),
        csharp: csTemplate(`using System;
using System.Collections.Generic;
int[] CountingSort(int[]arr){
  if(arr.Length==0)return arr;
  int max=arr[0];foreach(int v in arr)if(v>max)max=v;
  int[]count=new int[max+1];foreach(int v in arr)count[v]++;
  var res=new List<int>();for(int v=0;v<=max;v++)for(int i=0;i<count[v];i++)res.Add(v);
  return res.ToArray();
}
Console.WriteLine(string.Join(", ",CountingSort(new[]{3,1,2,1,3,2,1})));`, '1, 1, 1, 2, 2, 3, 3', ['count[v]++ for each v', 'for v from 0 to max, add count[v] times']),
        cpp: cppTemplate(`#include<iostream>
#include<vector>
#include<algorithm>
using namespace std;
vector<int> countingSort(vector<int>arr){
  if(arr.empty())return arr;
  int maxVal=*max_element(arr.begin(),arr.end());
  vector<int>count(maxVal+1,0);for(int v:arr)count[v]++;
  vector<int>res;for(int v=0;v<=maxVal;v++)for(int i=0;i<count[v];i++)res.push_back(v);
  return res;
}
int main(){auto s=countingSort({3,1,2,1,3,2,1});for(int i=0;i<(int)s.size();i++)cout<<s[i]<<(i+1<(int)s.size()?", ":"");cout<<endl;}`, '1, 1, 1, 2, 2, 3, 3', ['count[v]++ for each v', 'push_back v count[v] times']),
      },
      prerequisites: ['Z1-01'],
      xpReward: 110,
      loot: ['Census Tablet', 'Linear Sort Badge'],
    },
    {
      id: 'Z3-07',
      name: 'Radix Sort',
      zone: 3, category: 'algo', position: 7,
      lore: 'The Digit Sorcerer sorts by least significant digit first, then the next, building total order without ever comparing full numbers.',
      bossName: 'The Digit Sorcerer',
      bossHP: 120,
      bossAscii: `
  ╔═══════════════╗
  ║  RADIX SORT   ║
  ║  ONES: group  ║
  ║  TENS: group  ║
  ║  DONE! O(nk)  ║
  ╚═══════════════╝`,
      what: 'Radix sort sorts integers digit by digit (or byte by byte), from least significant to most significant, using a stable subroutine (counting sort) at each digit position.',
      why: 'O(nk) where k is the number of digits. For fixed-size integers (32-bit = 4 bytes), effectively O(n). Beats comparison sorts for large n with bounded integer values.',
      when: 'Use for large arrays of integers with bounded size. Common in systems programming. Avoid for variable-length strings (use MSD radix sort) or small n.',
      complexity: {
        time: { 'k passes of counting sort': 'O(nk)', 'for 32-bit integers': 'O(4n) = O(n)' },
        space: 'O(n+b) where b=base (usually 10 or 256)',
        notes: 'LSD (least significant digit first) works for integers. MSD for strings. Base 256 processes 1 byte at a time.',
      },
      realWorldUses: ['Sorting integers in systems programming', 'IP address sorting', 'String sorting in databases', 'Suffix array construction'],
      questions: [
        { id: 'Z3-07-Q1', text: 'Radix sort processes digits:', options: ['Most significant first', 'Least significant first (LSD)', 'Random order', 'Largest first'], correct: 1, explanation: 'LSD (Least Significant Digit) first is the standard. This ensures stability carries over correctly.', damage: 24 },
        { id: 'Z3-07-Q2', text: 'Why must the subroutine in radix sort be stable?', options: ['To save memory', 'To preserve relative order from previous digit passes', 'To run in O(n)', 'To handle duplicates'], correct: 1, explanation: 'Stability ensures that order established by digit i is preserved when sorting digit i+1.', damage: 24 },
        { id: 'Z3-07-Q3', text: 'Radix sort complexity O(nk) with base 10 on 3-digit numbers:', options: ['O(n)', 'O(3n) = O(n)', 'O(n^2)', 'O(n log n)'], correct: 1, explanation: 'k=3 digit passes, each O(n) counting sort = O(3n) = O(n) for fixed k.', damage: 24 },
        { id: 'Z3-07-Q4', text: 'For 32-bit integers with base 256, number of passes k =', options: ['32', '4', '8', '256'], correct: 1, explanation: '32 bits / 8 bits per byte = 4 bytes = 4 passes. Very efficient.', damage: 24 },
        { id: 'Z3-07-Q5', text: 'Radix sort vs counting sort: radix sort handles:', options: ['Smaller ranges', 'Larger values (e.g., 32-bit integers) by processing digit by digit', 'Unsorted arrays', 'Floating point'], correct: 1, explanation: 'Radix sort extends counting sort to handle large values by processing them in digit-sized chunks.', damage: 24 },
      ],
      visualization: {
        type: 'generic',
        title: 'Watch: Radix Sort (LSD) on [170,45,75,90,802,24,2,66]',
        initialState: {},
        steps: [
          { label: 'Original: [170,45,75,90,802,24,2,66]', state: { values: [170,45,75,90,802,24,2,66] } },
          { label: 'Pass 1 (ones digit): sort by last digit [0,0,2,2,4,5,5,6] -> [170,90,802,2,24,45,75,66]', state: { values: [170,90,802,2,24,45,75,66] } },
          { label: 'Pass 2 (tens digit): sort by 2nd digit [0,0,0,2,4,6,7,9] -> [802,2,24,45,66,170,75,90]', state: { values: [802,2,24,45,66,170,75,90] } },
          { label: 'Pass 3 (hundreds digit): sort by 3rd digit [0,0,0,0,0,0,1,8] -> [2,24,45,66,75,90,170,802]', state: { values: [2,24,45,66,75,90,170,802] } },
          { label: 'Sorted: [2,24,45,66,75,90,170,802]!', state: { values: [2,24,45,66,75,90,170,802] } },
        ],
      },
      codeTemplates: {
        python: pyTemplate('radix', `def counting_sort_digit(arr, exp):
    n = len(arr)
    output = [0] * n
    count = [0] * 10
    for i in arr:
        idx = (i // exp) % 10
        count[idx] += 1
    for i in range(1, 10):
        count[i] += count[i-1]
    for i in range(n-1, -1, -1):
        idx = (arr[i] // exp) % 10
        output[count[idx]-1] = arr[i]
        count[idx] -= 1
    return output

def radix_sort(arr):
    max_val = max(arr)
    exp = 1
    while max_val // exp > 0:
        arr = counting_sort_digit(arr, exp)
        exp *= 10
    return arr

print(radix_sort([170, 45, 75, 90, 802, 24, 2, 66]))`, '[2, 24, 45, 66, 75, 90, 170, 802]', ['(arr[i] // exp) % 10 extracts current digit', 'Scan backwards for stability']),
        typescript: tsTemplate('radix', `function countDigit(arr: number[], exp: number): number[] {
  const n = arr.length, output = new Array(n), count = new Array(10).fill(0)
  for (const v of arr) count[Math.floor(v/exp)%10]++
  for (let i=1;i<10;i++) count[i]+=count[i-1]
  for (let i=n-1;i>=0;i--) { const d=Math.floor(arr[i]/exp)%10; output[--count[d]]=arr[i]; }
  return output
}
function radixSort(arr: number[]): number[] {
  const maxVal=Math.max(...arr); let exp=1
  while(Math.floor(maxVal/exp)>0){arr=countDigit(arr,exp);exp*=10;}
  return arr
}
console.log(radixSort([170,45,75,90,802,24,2,66]).join(', '))`, '2, 24, 45, 66, 75, 90, 170, 802', ['Math.floor(v/exp)%10 for digit', 'scan backwards for stability']),
        go: goTemplate(`package main
import "fmt"
func countDigit(arr[]int,exp int)[]int{
  n:=len(arr);output:=make([]int,n);count:=make([]int,10)
  for _,v:=range arr{count[(v/exp)%10]++}
  for i:=1;i<10;i++{count[i]+=count[i-1]}
  for i:=n-1;i>=0;i--{d:=(arr[i]/exp)%10;count[d]--;output[count[d]]=arr[i]}
  return output
}
func radixSort(arr[]int)[]int{
  maxVal:=arr[0];for _,v:=range arr{if v>maxVal{maxVal=v}}
  for exp:=1;maxVal/exp>0;exp*=10{arr=countDigit(arr,exp)}
  return arr
}
func main(){fmt.Println(radixSort([]int{170,45,75,90,802,24,2,66}))}`, '[2 24 45 66 75 90 170 802]', ['(v/exp)%10 extracts digit', 'scan i backwards for stability']),
        rust: rustTemplate(`fn count_digit(arr: &[i32], exp: i32) -> Vec<i32> {
    let n=arr.len(); let mut output=vec![0;n]; let mut count=vec![0i32;10];
    for &v in arr{count[((v/exp)%10) as usize]+=1;}
    for i in 1..10{count[i]+=count[i-1];}
    for i in (0..n).rev(){let d=((arr[i]/exp)%10) as usize;count[d]-=1;output[count[d] as usize]=arr[i];}
    output
}
fn radix_sort(arr: &[i32]) -> Vec<i32> {
    let mut arr=arr.to_vec(); let max_val=*arr.iter().max().unwrap();
    let mut exp=1; while max_val/exp>0{arr=count_digit(&arr,exp);exp*=10;} arr
}
fn main(){println!("{:?}",radix_sort(&[170,45,75,90,802,24,2,66]));}`, '[2, 24, 45, 66, 75, 90, 170, 802]', ['(v/exp)%10 as usize for index', 'scan rev() for stability']),
        csharp: csTemplate(`using System;
int[]CountDigit(int[]arr,int exp){
  int n=arr.Length;var out2=new int[n];var count=new int[10];
  foreach(int v in arr)count[(v/exp)%10]++;
  for(int i=1;i<10;i++)count[i]+=count[i-1];
  for(int i=n-1;i>=0;i--){int d=(arr[i]/exp)%10;out2[--count[d]]=arr[i];}
  return out2;
}
int[]RadixSort(int[]arr){
  int maxVal=arr[0];foreach(int v in arr)if(v>maxVal)maxVal=v;
  for(int exp=1;maxVal/exp>0;exp*=10)arr=CountDigit(arr,exp);
  return arr;
}
Console.WriteLine(string.Join(", ",RadixSort(new[]{170,45,75,90,802,24,2,66})));`, '2, 24, 45, 66, 75, 90, 170, 802', ['(v/exp)%10 for digit', 'scan backwards for stability']),
        cpp: cppTemplate(`#include<iostream>
#include<vector>
using namespace std;
vector<int> countDigit(vector<int>&arr,int exp){
  int n=arr.size();vector<int>out(n);vector<int>count(10,0);
  for(int v:arr)count[(v/exp)%10]++;
  for(int i=1;i<10;i++)count[i]+=count[i-1];
  for(int i=n-1;i>=0;i--){int d=(arr[i]/exp)%10;out[--count[d]]=arr[i];}
  return out;
}
vector<int> radixSort(vector<int>arr){
  int maxVal=*max_element(arr.begin(),arr.end());
  for(int exp=1;maxVal/exp>0;exp*=10)arr=countDigit(arr,exp);
  return arr;
}
int main(){auto s=radixSort({170,45,75,90,802,24,2,66});for(int i=0;i<(int)s.size();i++)cout<<s[i]<<(i+1<(int)s.size()?", ":"");cout<<endl;}`, '2, 24, 45, 66, 75, 90, 170, 802', ['(v/exp)%10 for digit', 'scan backwards for stability']),
      },
      prerequisites: ['Z3-06'],
      xpReward: 120,
      loot: ['Radix Wand', 'Digit Badge'],
    },
  ],
}
