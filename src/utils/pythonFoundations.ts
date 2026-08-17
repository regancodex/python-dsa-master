import { Problem } from '../types/dsa';

export interface PythonPrimer {
  title: string;
  badge: string;
  underTheHood: string;
  pythonicSnippet: string;
  whyItMattersInInterviews: string;
  commonMistake: string;
}

export function getPythonPrimerForProblem(problem: Problem): PythonPrimer {
  const cat = problem.category;
  const id = problem.id;

  // 1. Arrays & Hashing / Frequency
  if (cat === 'Arrays & Hashing') {
    if (id === 'valid-anagram' || id === 'group-anagrams' || id === 'top-k-frequent-elements') {
      return {
        title: 'Python Superpower: collections.Counter & defaultdict',
        badge: 'Zero-to-Hero Python Primitive',
        underTheHood: 'Python dictionaries and Counter objects are built in C as sparse hash tables with open addressing (perturbation probing). Looking up or inserting a key computes hash(key) in O(1) average time.',
        pythonicSnippet: `from collections import Counter, defaultdict

# 1. Instant Frequency Counter O(N)
counts = Counter("anagram")  # {'a': 3, 'n': 1, 'g': 1, 'r': 1}

# 2. defaultdict eliminates 'if key not in dict' checks:
groups = defaultdict(list)
groups[tuple(sorted("cat"))].append("cat")`,
        whyItMattersInInterviews: 'Writing `counts = Counter(s)` proves Pythonic fluency in 5 seconds compared to writing 6 lines of manual `if char not in map` checks.',
        commonMistake: 'Using `list.count(x)` inside a loop. `[nums.count(x) for x in nums]` runs in O(N²) quadratic time! Always build a Counter once in O(N).'
      };
    }

    return {
      title: 'Python Memory Model: list vs dict & Hash Tables',
      badge: 'Zero-to-Hero Python Primitive',
      underTheHood: 'Python lists are dynamic arrays with contiguous memory. `x in my_list` takes O(N) linear search. Python dicts and sets use hash table lookups `x in my_dict` in O(1) average time by computing hash(x).',
      pythonicSnippet: `# ❌ Slow O(N) lookup in list:
seen_list = []
if target - num in seen_list: ...  # O(N) scan -> Total O(N^2)

# ✅ Fast O(1) lookup in dict / set:
seen_set = set()
if target - num in seen_set: ...   # O(1) lookup -> Total O(N)`,
      whyItMattersInInterviews: 'Trading O(N) auxiliary space (hash table) to drop time complexity from O(N²) to O(N) is the #1 most common interview optimization.',
      commonMistake: 'Assuming `in` is always O(1). In a `list` or `string`, `item in collection` is O(N). In a `dict` or `set`, `item in collection` is O(1).'
    };
  }

  // 2. Two Pointers
  if (cat === 'Two Pointers') {
    return {
      title: 'Python Memory & Slicing: Pointers vs Slices',
      badge: 'Zero-to-Hero Python Primitive',
      underTheHood: 'In Python, slice operations like `s[left:right]` or `s[::-1]` allocate a brand new string/list in memory, taking O(K) time and O(K) space. Two Pointers with integer indices use O(1) auxiliary memory.',
      pythonicSnippet: `# ❌ Slicing creates new objects in memory O(N) space:
is_pal = (s == s[::-1])

# ✅ In-place Two Pointers (O(1) memory, interview preferred):
left, right = 0, len(s) - 1
while left < right:
    if s[left] != s[right]: return False
    left += 1; right -= 1`,
      whyItMattersInInterviews: 'When asked to solve in O(1) extra space or avoid memory allocations on large streams, two pointers is the mandatory technique.',
      commonMistake: 'Modifying array length during two-pointer traversal (`nums.pop(i)` inside loop shifts all remaining elements in O(N) time). Use pointer overwriting instead.'
    };
  }

  // 3. Sliding Window
  if (cat === 'Sliding Window') {
    return {
      title: 'Sliding Window Invariant: State Maintenance',
      badge: 'Zero-to-Hero Python Primitive',
      underTheHood: 'Sliding window converts nested loop subarray searches (O(N²)) into linear single passes (O(N)) by adding new elements on the right and shrinking invalid elements from the left.',
      pythonicSnippet: `left = 0
window_state = {}  # or integer sum

for right in range(len(nums)):
    # 1. Expand: include nums[right] into window
    window_state[nums[right]] = window_state.get(nums[right], 0) + 1
    
    # 2. Shrink: while window violates condition
    while window_is_invalid():
        window_state[nums[left]] -= 1
        left += 1
        
    # 3. Record valid result
    max_len = max(max_len, right - left + 1)`,
      whyItMattersInInterviews: 'Both `left` and `right` pointers traverse the array at most once. Total operations: 2N -> O(N) linear time.',
      commonMistake: 'Recalculating the entire window sum or character set from scratch with `sum(nums[left:right])` (which turns O(N) back into O(N²)). Always update state incrementally!'
    };
  }

  // 4. Stack
  if (cat === 'Stack') {
    return {
      title: 'Python Stack & Queue Performance: list vs deque',
      badge: 'Zero-to-Hero Python Primitive',
      underTheHood: 'Python lists work perfectly as LIFO stacks (`append()` and `pop()` run in amortized O(1) at the end). For FIFO queues, NEVER use `list.pop(0)` (which shifts all N elements in O(N) time); always use `collections.deque.popleft()` (O(1)).',
      pythonicSnippet: `from collections import deque

# LIFO Stack (Last In, First Out)
stack = []
stack.append(10)   # O(1) push
top = stack.pop()  # O(1) pop

# FIFO Queue (First In, First Out)
queue = deque()
queue.append(10)
first = queue.popleft()  # O(1) pop from front!`,
      whyItMattersInInterviews: 'Using `list.pop(0)` in BFS or queues is a red flag for interviewers because it makes the algorithm O(N²). Using `deque` shows production-grade Python knowledge.',
      commonMistake: 'Checking `len(stack) > 0` instead of Pythonic truthiness `if stack:`. In Python, an empty list or stack evaluates to `False` automatically.'
    };
  }

  // 5. Binary Search
  if (cat === 'Binary Search') {
    return {
      title: 'Python Binary Search & Integer Overflow',
      badge: 'Zero-to-Hero Python Primitive',
      underTheHood: 'Binary search splits the search range in half each step, cutting N -> N/2 -> N/4 -> 1 in O(log N) iterations. In Python 3, integers have arbitrary precision (no 32-bit overflow), but `mid = left + (right - left) // 2` is standard best practice.',
      pythonicSnippet: `import bisect

# Manual Binary Search Pattern:
left, right = 0, len(nums) - 1
while left <= right:
    mid = (left + right) // 2
    if nums[mid] == target: return mid
    elif nums[mid] < target: left = mid + 1
    else: right = mid - 1

# Built-in Python C-speed bisection:
idx = bisect.bisect_left(nums, target)  # O(log N)`,
      whyItMattersInInterviews: 'Knowing both the manual `while left <= right` loop and the standard `bisect` library demonstrates deep algorithmic mastery.',
      commonMistake: 'Using `while left < right` and getting trapped in an infinite loop due to integer division truncation. Ensure your loop condition matches your pointer update logic.'
    };
  }

  // 6. Linked List
  if (cat === 'Linked List') {
    return {
      title: 'Sentinel / Dummy Head Technique & Pointer Swaps',
      badge: 'Zero-to-Hero Python Primitive',
      underTheHood: 'Python uses object references. A `ListNode` holds `val` and a reference to `next`. A Dummy/Sentinel node eliminates 90% of edge cases (like modifying the head node or empty lists).',
      pythonicSnippet: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

# Dummy node pattern:
dummy = ListNode(0)
dummy.next = head
curr = dummy

# Simultaneous Python pointer swap:
curr.next, prev, curr = prev, curr, curr.next`,
      whyItMattersInInterviews: 'Using `dummy = ListNode(0)` prevents tricky null-pointer crashes and simplifies interview code down to 50% fewer lines.',
      commonMistake: 'Losing reference to the rest of the list before repointing `curr.next`. Always save `next_temp = curr.next` or use simultaneous assignment.'
    };
  }

  // 7. Trees & Tries
  if (cat === 'Trees' || cat === 'Tries') {
    return {
      title: 'Tree Traversal: DFS Recursion vs BFS Level-Order',
      badge: 'Zero-to-Hero Python Primitive',
      underTheHood: 'DFS utilizes Python call stack (depth-first) taking O(H) call stack memory where H is tree height. BFS uses `collections.deque` (breadth-first) to explore node by node level-by-level.',
      pythonicSnippet: `from collections import deque

# BFS Level-Order Traversal
def level_order(root):
    if not root: return []
    queue = deque([root])
    levels = []
    
    while queue:
        level = []
        for _ in range(len(queue)):  # snapshot current level size
            node = queue.popleft()
            level.append(node.val)
            if node.left: queue.append(node.left)
            if node.right: queue.append(node.right)
        levels.append(level)
    return levels`,
      whyItMattersInInterviews: 'Knowing how to snapshot `for _ in range(len(queue)):` inside BFS guarantees you can group nodes by depth/level easily.',
      commonMistake: 'Forgetting the base case `if not root: return ...` which causes `AttributeError: \'NoneType\' object has no attribute \'left\'`.'
    };
  }

  // 8. Heap / Priority Queue
  if (cat === 'Heap / Priority Queue') {
    return {
      title: 'Python heapq: Min-Heap vs Max-Heap Tricks',
      badge: 'Zero-to-Hero Python Primitive',
      underTheHood: 'Python `heapq` module implements a binary Min-Heap on top of a standard list in-place. `heapq.heappop(heap)` returns smallest element in O(log N). To simulate a Max-Heap, multiply values by -1.',
      pythonicSnippet: `import heapq

# 1. Transform list into heap in O(N) linear time:
nums = [5, 1, 8, 3]
heapq.heapify(nums)  # O(N)

# 2. Push & Pop in O(log N):
heapq.heappush(nums, 2)
smallest = heapq.heappop(nums)  # 1

# 3. Max-Heap trick: negate values
max_heap = [-x for x in nums]
heapq.heapify(max_heap)
largest = -heapq.heappop(max_heap)`,
      whyItMattersInInterviews: 'Finding "Top K elements" with a heap of size K runs in O(N log K) time and O(K) space, outperforming O(N log N) sorting on large data streams.',
      commonMistake: 'Assuming `heapq` is a class with `.push()`. It is a module operating on standard lists: `heapq.heappush(my_list, val)`.'
    };
  }

  // 9. Backtracking & Graphs
  if (cat === 'Backtracking' || cat === 'Graphs' || cat === 'Advanced Graphs') {
    return {
      title: 'Graph Adjacency Lists & DFS State Backtracking',
      badge: 'Zero-to-Hero Python Primitive',
      underTheHood: 'Represent graphs with `defaultdict(list)` for adjacency lists. For backtracking, choose -> explore -> unchoose (pop state) to prune invalid search branches.',
      pythonicSnippet: `from collections import defaultdict

# 1. Graph Adjacency List:
adj = defaultdict(list)
for u, v in edges:
    adj[u].append(v)
    adj[v].append(u)

# 2. Backtracking Pattern (Permutations/Subsets):
def backtrack(start, path):
    result.append(path[:])  # copy current path!
    for i in range(start, len(nums)):
        path.append(nums[i])        # 1. Choose
        backtrack(i + 1, path)       # 2. Explore
        path.pop()                   # 3. Unchoose (Backtrack)`,
      whyItMattersInInterviews: 'Backtracking is the foundation for combinatorial search (Sudoku, N-Queens, Subsets, Word Search).',
      commonMistake: 'Writing `result.append(path)` without copying. Since lists are mutable references in Python, modifying `path` later mutates all previously saved paths! Always use `path[:]` or `list(path)`.'
    };
  }

  // 10. Dynamic Programming
  if (cat === '1-D Dynamic Programming' || cat === '2-D Dynamic Programming') {
    return {
      title: 'Python DP: Memoization with @cache vs Tabulation',
      badge: 'Zero-to-Hero Python Primitive',
      underTheHood: 'Dynamic programming eliminates redundant overlapping subproblems. Top-down recursion with `@functools.cache` stores results in a hidden hash table. Bottom-up tabulation fills a 1D/2D array iteratively.',
      pythonicSnippet: `from functools import cache

# 1. Top-Down with automatic Memoization (O(1) setup):
@cache
def dp(i):
    if i <= 1: return i
    return dp(i - 1) + dp(i - 2)

# 2. Bottom-Up Tabulation (O(1) space optimization):
def fib(n):
    if n <= 1: return n
    prev2, prev1 = 0, 1
    for _ in range(2, n + 1):
        prev2, prev1 = prev1, prev2 + prev1
    return prev1`,
      whyItMattersInInterviews: 'Start by explaining the recursive relation with memoization (`@cache`), then demonstrate space optimization with bottom-up tabulation.',
      commonMistake: 'Forgetting base cases in memoization or creating 2D grids incorrectly with `[[0] * cols] * rows` (which duplicates the same inner row reference). Always use `[[0] * cols for _ in range(rows)]`.'
    };
  }

  // 11. Intervals & Bit Manipulation
  if (cat === 'Intervals & Bit Manipulation') {
    const isBitProblem = problem.tags.some(t => t.toLowerCase().includes('bit')) || 
                         id.includes('bit') || id.includes('single-number');
    
    if (isBitProblem) {
      return {
        title: 'Bitwise Tricks: XOR Cancellation & Brian Kernighan',
        badge: 'Zero-to-Hero Python Primitive',
        underTheHood: 'Bitwise operations operate directly on binary bits at the CPU level in 1 CPU cycle (O(1)). Key properties: `x ^ x = 0`, `x ^ 0 = x`, and `x & (x - 1)` clears the lowest set bit.',
        pythonicSnippet: `# 1. Single Number (Find unique item among pairs):
res = 0
for n in nums:
    res ^= n  # duplicates cancel to 0, leaves unique item

# 2. Count 1-bits (Brian Kernighan's O(set_bits) algorithm):
def count_bits(n: int) -> int:
    count = 0
    while n:
        n &= (n - 1)  # clears lowest set 1-bit
        count += 1
    return count`,
        whyItMattersInInterviews: 'Bitwise tricks achieve true O(1) auxiliary memory where normal hash sets would require O(N) auxiliary space.',
        commonMistake: 'Operator precedence in Python: `==` has higher precedence than `&` or `^`. Always wrap bit operations in parentheses: `if (n & 1) == 1:`.'
      };
    }

    return {
      title: 'Intervals & Sorting: Lambda Sort Keys & Overlap Invariant',
      badge: 'Zero-to-Hero Python Primitive',
      underTheHood: 'Interval problems almost always require sorting by start time `intervals.sort(key=lambda x: x[0])` in O(N log N). Once sorted, two adjacent intervals `[s1, e1]` and `[s2, e2]` overlap if and only if `s2 <= e1`.',
      pythonicSnippet: `# 1. In-place sorting by start time:
intervals.sort(key=lambda x: x[0])

# 2. Linear merge scan:
merged = [intervals[0]]
for start, end in intervals[1:]:
    prev_start, prev_end = merged[-1]
    if start <= prev_end:  # Overlap detected!
        merged[-1][1] = max(prev_end, end)
    else:
        merged.append([start, end])`,
      whyItMattersInInterviews: 'Sorting converts what looks like an O(N²) all-pairs overlap comparison into a single clean O(N) linear scan.',
      commonMistake: 'Forgetting to take `max(prev_end, end)` when merging (e.g. `[1, 5]` and `[2, 3]` should remain `[1, 5]`, not `[1, 3]`).'
    };
  }

  // 12. Greedy
  if (cat === 'Greedy') {
    return {
      title: 'Greedy Strategy: Local Optimal Choice to Global Maximum',
      badge: 'Zero-to-Hero Python Primitive',
      underTheHood: 'Greedy algorithms make the best local decision at each step without backtracking. Proving correctness requires showing that a greedy choice never closes off an optimal global solution.',
      pythonicSnippet: `# Kadane's Algorithm for Maximum Subarray (O(N) Greedy):
def max_sub_array(nums: list[int]) -> int:
    curr_sum = max_sum = nums[0]
    for num in nums[1:]:
        # Greedy decision: start fresh at num or extend previous sum
        curr_sum = max(num, curr_sum + num)
        max_sum = max(max_sum, curr_sum)
    return max_sum`,
      whyItMattersInInterviews: 'Greedy algorithms achieve O(N) time and O(1) space, dramatically outperforming O(2^N) recursion or O(N²) dynamic programming when the greedy choice property holds.',
      commonMistake: 'Applying greedy when future choices depend on past decisions without optimal substructure (in such cases, DP is required).'
    };
  }

  // Default Fallback
  return {
    title: 'Pythonic Algorithmic Optimization',
    badge: 'Zero-to-Hero Python Primitive',
    underTheHood: 'Writing clean Python DSA code involves choosing the right built-in data structure (lists, dicts, sets, deques, heaps) to achieve optimal Big-O time and memory efficiency.',
    pythonicSnippet: `# Clean Python unpacking & idiomatic checks:
for i, val in enumerate(nums):
    # Process with instant O(1) hash lookups
    pass`,
    whyItMattersInInterviews: 'Demonstrating clean Pythonic idioms communicates senior engineering caliber to interviewers.',
    commonMistake: 'Using nested loops when hash sets or two pointers can reduce complexity from O(N²) to O(N).'
  };
}
