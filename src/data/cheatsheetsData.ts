import { CheatsheetItem } from '../types/dsa';

export interface ComplexityRow {
  structure: string;
  access: string;
  search: string;
  insertion: string;
  deletion: string;
  notes: string;
}

export const DATA_STRUCTURE_COMPLEXITIES: ComplexityRow[] = [
  {
    structure: 'Python List (Dynamic Array)',
    access: 'O(1)',
    search: 'O(N)',
    insertion: 'O(1) amortized append, O(N) insert(0, x)',
    deletion: 'O(1) pop(), O(N) pop(0)',
    notes: 'Contiguous memory array. pop(0) or insert(0) causes O(N) element shift.'
  },
  {
    structure: 'collections.deque (Double-ended Queue)',
    access: 'O(N)',
    search: 'O(N)',
    insertion: 'O(1) append & appendleft',
    deletion: 'O(1) pop & popleft',
    notes: 'Block-linked list. Essential for O(1) queue/BFS operations.'
  },
  {
    structure: 'Python Dict (Hash Map)',
    access: 'O(1) avg, O(N) worst',
    search: 'O(1) avg, O(N) worst',
    insertion: 'O(1) avg, O(N) worst',
    deletion: 'O(1) avg, O(N) worst',
    notes: 'Preserves insertion order in Python 3.7+. Key must be immutable.'
  },
  {
    structure: 'Python Set (Hash Set)',
    access: 'N/A',
    search: 'O(1) avg, O(N) worst',
    insertion: 'O(1) avg, O(N) worst',
    deletion: 'O(1) avg, O(N) worst',
    notes: 'Unique items only. Set union `|`, intersection `&`, difference `-`.'
  },
  {
    structure: 'heapq (Binary Min-Heap)',
    access: 'O(1) heap[0]',
    search: 'O(N)',
    insertion: 'O(log N) heappush',
    deletion: 'O(log N) heappop',
    notes: 'heapify(list) runs in linear O(N) time!'
  },
  {
    structure: 'Binary Search Tree (Balanced)',
    access: 'O(log N)',
    search: 'O(log N)',
    insertion: 'O(log N)',
    deletion: 'O(log N)',
    notes: 'Degrades to O(N) if skewed without self-balancing (AVL / Red-Black).'
  }
];

export const CHEATSHEET_PATTERNS: CheatsheetItem[] = [
  {
    id: 'pattern-hash-map',
    category: 'Arrays & Hashing',
    title: 'Hash Map (O(1) Lookup & Complement Matching)',
    summary: 'Store visited elements in a dictionary {val: index} to achieve instant O(1) lookups for complements or frequencies.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    pythonSyntax: `seen = {}
for i, num in enumerate(nums):
    complement = target - num
    if complement in seen:
        return [seen[complement], i]
    seen[num] = i`,
    patternTemplate: `def two_sum_hash_map(nums: list[int], target: int) -> list[int]:
    # Single-pass Hash Map
    seen = {} # map value -> index
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
    whenToUse: [
      'Unsorted array where you need to find a pair adding up to target',
      'Counting item frequencies or tracking elements already seen',
      'Grouping anagrams or finding longest consecutive sequence'
    ],
    goodFor: [
      'Unsorted inputs where sorting is prohibited or too slow (O(N log N))',
      'Need to preserve and return original array indices',
      'Instant O(1) frequency & presence queries'
    ],
    badFor: [
      'Contiguous ranges/subarrays where values must be adjacent (use Sliding Window)',
      'When O(1) auxiliary space is strictly required (use Two Pointers on sorted array)'
    ],
    goodProblemExamples: ['Two Sum', 'Group Anagrams', 'Contains Duplicate', 'Longest Consecutive Sequence'],
    badProblemExamples: ['Longest Substring Without Repeating', 'Valid Palindrome', 'Two Sum II (Already Sorted)'],
    pitfalls: [
      'Using elements as dictionary keys when they are mutable lists or unhashable types.',
      'Assuming hash map lookups are ordered without relying on insertion order.'
    ]
  },
  {
    id: 'pattern-two-pointers',
    category: 'Two Pointers',
    title: 'Two Pointers (Converging & Squeeze)',
    summary: 'Two pointers moving towards each other from opposite ends (left & right) to find pairs or scan palindromes.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    pythonSyntax: `left, right = 0, len(nums) - 1
while left < right:
    curr = nums[left] + nums[right]
    if curr == target: return [left, right]
    elif curr < target: left += 1
    else: right -= 1`,
    patternTemplate: `def two_pointers_template(nums: list[int], target: int) -> list[int]:
    # Prerequisite: nums must be sorted
    left, right = 0, len(nums) - 1
    while left < right:
        curr_sum = nums[left] + nums[right]
        if curr_sum == target:
            return [left, right]
        elif curr_sum < target:
            left += 1
        else:
            right -= 1
    return []`,
    whenToUse: [
      'Input array is ALREADY sorted and you need pair target matching',
      'Palindrome checking and string reversal',
      'Container with Most Water / Trapping Rain Water',
      'Merging two sorted arrays in-place with O(1) extra space'
    ],
    goodFor: [
      'Sorted arrays seeking pair sums or triplets (3Sum)',
      'Symmetric scanning (Palindromes)',
      'O(1) strict extra memory constraints'
    ],
    badFor: [
      'Unsorted arrays if you need to keep original indices (sorting scrambles index positions)',
      'Arbitrary element searches in non-linear structures'
    ],
    goodProblemExamples: ['Two Sum II (Input Sorted)', 'Valid Palindrome', 'Container With Most Water', '3Sum'],
    badProblemExamples: ['Two Sum (Unsorted array where original index required)', 'Subarray Sum Equals K'],
    pitfalls: [
      'Forgetting to sort the array first if unsorted',
      'Off-by-one errors in `while left < right` vs `while left <= right`'
    ]
  },
  {
    id: 'pattern-fast-slow',
    category: 'Linked List',
    title: 'Fast & Slow Pointers (Floyd\'s Cycle Detection)',
    summary: 'Two pointers moving at different speeds (slow moves 1 step, fast moves 2 steps) to detect cycles or find middle nodes.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    pythonSyntax: `slow = fast = head
while fast and fast.next:
    slow = slow.next
    fast = fast.next.next
    if slow == fast: return True # Cycle detected`,
    patternTemplate: `def has_cycle_floyd(head) -> bool:
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False`,
    whenToUse: [
      'Detecting loops/cycles in linked lists or state sequences',
      'Finding the middle node of a linked list in one pass',
      'Find the Duplicate Number (Floyd on array indices)'
    ],
    goodFor: [
      'Linked lists with unknown length without allocating extra Set/Hash memory',
      'Cycle detection in state transitions in O(1) space'
    ],
    badFor: [
      'Pair sum lookups or random-access searching (use Hash Map or Binary Search)',
      'Subarray contiguous calculations (use Sliding Window)'
    ],
    goodProblemExamples: ['Linked List Cycle', 'Middle of Linked List', 'Find Duplicate Number'],
    badProblemExamples: ['Two Sum', 'Reverse Words in String'],
    pitfalls: [
      'Failing to check `fast and fast.next` before doing `fast.next.next` causing AttributeError: NoneType.'
    ]
  },
  {
    id: 'pattern-sliding-window',
    category: 'Sliding Window',
    title: 'Sliding Window (Contiguous Subarray & Substring)',
    summary: 'Maintain a contiguous sub-segment [left, right] over an array or string to track running sum or character counts.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(K) or O(1)',
    pythonSyntax: `window = {}
left = 0
for right, char in enumerate(s):
    # 1. Expand right
    # 2. While condition invalid, shrink left
    # 3. Record max/min answer`,
    patternTemplate: `def sliding_window_template(s: str) -> int:
    from collections import defaultdict
    counts = defaultdict(int)
    left = 0
    max_len = 0
    
    for right, char in enumerate(s):
        counts[char] += 1
        
        # While condition violated, shrink window from left
        while counts[char] > 1: # e.g. duplicate found
            counts[s[left]] -= 1
            left += 1
            
        max_len = max(max_len, right - left + 1)
        
    return max_len`,
    whenToUse: [
      'Substrings/subarrays with longest, shortest, or target sum properties',
      'At most K distinct elements, anagram substrings, maximum average subarray'
    ],
    goodFor: [
      'Strictly contiguous segments of arrays or strings',
      'Dynamic window resizing to find optimal subarray lengths'
    ],
    badFor: [
      'Finding ANY two non-contiguous elements across array (Two Sum is NOT contiguous!)',
      'Non-linear structures like trees or disconnected graph nodes'
    ],
    goodProblemExamples: ['Longest Substring Without Repeating', 'Minimum Window Substring', 'Max Consecutive Ones III'],
    badProblemExamples: ['Two Sum (Pairs can be anywhere)', 'Valid Parentheses', '3Sum'],
    pitfalls: [
      'Forgetting to remove or decrement the character at `left` before advancing `left += 1`'
    ]
  },
  {
    id: 'pattern-monotonic-stack',
    category: 'Stack',
    title: 'Monotonic Stack',
    summary: 'Maintains elements in strictly increasing or decreasing order to find next/previous greater/smaller elements in O(N).',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    pythonSyntax: `stack = [] # stores indices
for i, num in enumerate(nums):
    while stack and num > nums[stack[-1]]:
        prev_idx = stack.pop()
        res[prev_idx] = num
    stack.append(i)`,
    patternTemplate: `def next_greater_element(nums: list[int]) -> list[int]:
    res = [-1] * len(nums)
    stack = []  # stores indices of elements
    
    for i, num in enumerate(nums):
        while stack and num > nums[stack[-1]]:
            idx = stack.pop()
            res[idx] = num
        stack.append(i)
        
    return res`,
    whenToUse: [
      'Next Greater / Previous Greater element queries',
      'Daily Temperatures, 739 LeetCode',
      'Largest Rectangle in Histogram, 84 LeetCode',
      'Online Stock Span, 901 LeetCode'
    ],
    goodFor: [
      'Finding nearest larger or smaller numbers in sequence in linear O(N) time',
      'Histogram span calculations & boundary trapping'
    ],
    badFor: [
      'Searching for target sums across arbitrary pair indices (use Hash Map)',
      'Finding shortest paths in graphs (use BFS)'
    ],
    goodProblemExamples: ['Daily Temperatures', 'Next Greater Element', 'Largest Rectangle in Histogram'],
    badProblemExamples: ['Two Sum', 'Subtree of Another Tree', 'Word Break'],
    pitfalls: [
      'Storing values instead of indices when distances are required in the answer.'
    ]
  },
  {
    id: 'pattern-binary-search',
    category: 'Binary Search',
    title: 'Binary Search (Exact & Search on Answer)',
    summary: 'Efficient O(log N) search by halving monotonic search spaces.',
    timeComplexity: 'O(log N)',
    spaceComplexity: 'O(1)',
    pythonSyntax: `left, right = 0, len(nums) - 1
while left <= right:
    mid = (left + right) // 2
    if nums[mid] == target: return mid
    elif nums[mid] < target: left = mid + 1
    else: right = mid - 1`,
    patternTemplate: `def binary_search_condition(low: int, high: int) -> int:
    # Binary Search on Answer / Predicate
    def is_valid(mid: int) -> bool:
        # returns True if mid satisfies feasibility criteria
        return True
        
    left, right = low, high
    while left < right:
        mid = (left + right) // 2
        if is_valid(mid):
            right = mid  # search left for minimum valid
        else:
            left = mid + 1
    return left`,
    whenToUse: [
      'Sorted arrays & matrices',
      'Binary Search on Answer (Koko Eating Bananas, Capacity To Ship Packages)',
      'Finding peak elements and rotated array pivot points'
    ],
    goodFor: [
      'Sorted inputs with logarithmic O(log N) lookup requirement',
      'Monotonic feasibility functions ("Can we do this in X speed?")'
    ],
    badFor: [
      'Unsorted array without sorting permission (O(N) scan or Hash Map is better)',
      'Unbounded graphs or unindexed linked lists'
    ],
    goodProblemExamples: ['Binary Search', 'Search in Rotated Sorted Array', 'Koko Eating Bananas'],
    badProblemExamples: ['Two Sum (Unsorted)', 'Valid Anagram'],
    pitfalls: [
      'Infinite loop caused by integer division rounding when updating `left = mid` without +1.'
    ]
  },
  {
    id: 'pattern-heap',
    category: 'Heap / Priority Queue',
    title: 'Min / Max Heap (Top-K & Streaming Medians)',
    summary: 'Maintain priority ordering for top K largest/smallest elements in O(N log K) time with heapq.',
    timeComplexity: 'O(N log K)',
    spaceComplexity: 'O(K)',
    pythonSyntax: `import heapq
min_heap = []
for num in nums:
    heapq.heappush(min_heap, num)
    if len(min_heap) > k:
        heapq.heappop(min_heap)`,
    patternTemplate: `def find_kth_largest(nums: list[int], k: int) -> int:
    import heapq
    min_heap = []
    for num in nums:
        heapq.heappush(min_heap, num)
        if len(min_heap) > k:
            heapq.heappop(min_heap)
    return min_heap[0]`,
    whenToUse: [
      'Find Kth Largest / Kth Smallest element',
      'Top K Frequent Elements',
      'Merge K Sorted Lists',
      'Find Median from Data Stream (Two Heaps: max_heap + min_heap)'
    ],
    goodFor: [
      'Tracking dynamic minimums or maximums in real-time streams',
      'Keeping top-K elements in O(N log K) time instead of O(N log N) sorting'
    ],
    badFor: [
      'Arbitrary key lookups (searching a heap takes O(N) time)',
      'Simple pair complement checks (use Hash Map)'
    ],
    goodProblemExamples: ['Kth Largest Element in Array', 'Top K Frequent Elements', 'Merge K Sorted Lists'],
    badProblemExamples: ['Two Sum', 'Valid Palindrome', 'Climbing Stairs'],
    pitfalls: [
      'Python\'s `heapq` is a MIN-heap by default. For max-heap, push `-val` or use `_heapify_max`.'
    ]
  },
  {
    id: 'pattern-bfs-dfs-graph',
    category: 'Graphs',
    title: 'Graph BFS & DFS Traversal',
    summary: 'Standard queue-based layer exploration (BFS) and recursive path exploration (DFS).',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    pythonSyntax: `from collections import deque
# BFS
q = deque([start])
visited = {start}
while q:
    node = q.popleft()
    for neighbor in adj[node]:
        if neighbor not in visited:
            visited.add(neighbor)
            q.append(neighbor)`,
    patternTemplate: `def graph_traversals(adj: dict[int, list[int]], start: int):
    # BFS Template
    from collections import deque
    queue = deque([(start, 0)]) # (node, distance)
    visited = {start}
    
    while queue:
        node, dist = queue.popleft()
        for neighbor in adj.get(node, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, dist + 1))
                
    # DFS Template
    visited_dfs = set()
    def dfs(curr: int):
        visited_dfs.add(curr)
        for neighbor in adj.get(curr, []):
            if neighbor not in visited_dfs:
                dfs(neighbor)`,
    whenToUse: [
      'Shortest path in unweighted graphs (BFS)',
      'Connected components & Island counting (BFS/DFS)',
      'Cycle detection & Topological sorting (DFS/Kahn\'s BFS)',
      'Word Ladder, Clone Graph'
    ],
    goodFor: [
      'Networks, 2D grid mazes, state transition trees, dependency orders',
      'Finding the shortest path in unweighted step graphs (BFS)'
    ],
    badFor: [
      'Pure array pair lookups or arithmetic calculations (Two Sum is NOT a graph problem!)',
      'String matching without state jumps'
    ],
    goodProblemExamples: ['Number of Islands', 'Clone Graph', 'Word Ladder', 'Course Schedule'],
    badProblemExamples: ['Two Sum', 'Longest Common Subsequence', 'Best Time to Buy & Sell Stock'],
    pitfalls: [
      'Adding to `visited` when POPPING instead of when PUSHING into queue — this causes duplicate node queueing!'
    ]
  },
  {
    id: 'pattern-backtracking',
    category: 'Backtracking',
    title: 'Backtracking (Combinations, Permutations, Subsets)',
    summary: 'Systematic depth-first search exploring decision trees with state restoration upon return.',
    timeComplexity: 'O(N!) or O(2^N)',
    spaceComplexity: 'O(N)',
    pythonSyntax: `def backtrack(start, path):
    if is_solution(path):
        res.append(path.copy())
        return
    for i in range(start, len(nums)):
        path.append(nums[i])
        backtrack(i + 1, path)
        path.pop() # Undo choice`,
    patternTemplate: `def combination_sum_template(candidates: list[int], target: int) -> list[list[int]]:
    res = []
    
    def backtrack(start_idx: int, current_path: list[int], current_sum: int):
        if current_sum == target:
            res.append(current_path.copy())
            return
        if current_sum > target:
            return
            
        for i in range(start_idx, len(candidates)):
            current_path.append(candidates[i])
            backtrack(i, current_path, current_sum + candidates[i])
            current_path.pop()
            
    backtrack(0, [], 0)
    return res`,
    whenToUse: [
      'Generating all permutations, combinations, subsets, or partitions',
      'N-Queens, Sudoku Solver, Word Search on Matrix'
    ],
    goodFor: [
      'Exhaustive search where all possible valid configurations must be returned',
      'Combinatorial decision trees (Subsets, Permutations)'
    ],
    badFor: [
      'Finding a single pair of numbers (Backtracking on Two Sum is exponential O(2^N) and will TLE!)',
      'Optimization problems with overlapping subproblems (use Dynamic Programming instead)'
    ],
    goodProblemExamples: ['Subsets', 'Permutations', 'Combination Sum', 'N-Queens'],
    badProblemExamples: ['Two Sum (Exponential O(2^N) waste)', 'Coin Change (use DP)', 'House Robber'],
    pitfalls: [
      'Forgetting to make a shallow copy `path.copy()` when appending to results.'
    ]
  },
  {
    id: 'pattern-dynamic-programming',
    category: 'Dynamic Programming',
    title: 'Dynamic Programming (Memoization & Tabulation)',
    summary: 'Break problems into overlapping subproblems, store intermediate solutions in a DP array or memo dictionary.',
    timeComplexity: 'O(N) or O(N*W)',
    spaceComplexity: 'O(N) or O(1)',
    pythonSyntax: `from functools import cache
@cache
def dp(i):
    if i <= 1: return i
    return dp(i - 1) + dp(i - 2)`,
    patternTemplate: `def coin_change(coins: list[int], amount: int) -> int:
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    
    for a in range(1, amount + 1):
        for c in coins:
            if a - c >= 0:
                dp[a] = min(dp[a], 1 + dp[a - c])
                
    return dp[amount] if dp[amount] != float('inf') else -1`,
    whenToUse: [
      'Optimal substructure & overlapping subproblems',
      'Minimizing cost, maximizing profit, or counting total distinct ways',
      'Knapsack, Longest Common Subsequence, Edit Distance'
    ],
    goodFor: [
      'Optimization questions where future decisions depend on previous state outcomes',
      'Replacing exponential O(2^N) recursion with polynomial O(N) or O(N^2) runtime'
    ],
    badFor: [
      'Simple greedy choices that do not have overlapping subproblems',
      'Direct index lookup pairs (Two Sum uses a simple Hash Map, not DP)'
    ],
    goodProblemExamples: ['Climbing Stairs', 'Coin Change', 'Longest Increasing Subsequence', 'House Robber'],
    badProblemExamples: ['Two Sum', 'Valid Palindrome', 'Binary Search'],
    pitfalls: [
      'Failing to initialize the base cases correctly in the DP array.'
    ]
  }
];

export const PYTHON_DSA_TIPS = [
  {
    title: 'Arbitrary Precision Integers',
    description: 'In Python 3, integers have unbounded precision (no 32-bit integer overflow like Java/C++). However, to simulate 32-bit overflow in bit manipulation questions, use bitmasks: `val & 0xFFFFFFFF`.'
  },
  {
    title: 'Collections Counter & Defaultdict',
    description: '`from collections import Counter, defaultdict` eliminates boilerplate dictionary key initialization and runs in high-performance C.'
  },
  {
    title: 'Recursion Limit in Python',
    description: 'Python\'s default recursion limit is 1,000. In deep tree or graph DFS problems, use `import sys; sys.setrecursionlimit(200000)` or convert to iterative DFS/BFS with an explicit stack/deque.'
  },
  {
    title: 'Built-in Binary Search with `bisect`',
    description: '`import bisect`: `bisect.bisect_left(arr, x)` finds the first index where x can be inserted to maintain sorted order ($O(\\log N)$).'
  },
  {
    title: 'List Matrix Transpose with `zip(*matrix)`',
    description: 'To transpose a 2D matrix in one line: `transposed = [list(col) for col in zip(*matrix)]`.'
  },
  {
    title: 'Memoization with `@cache` / `@lru_cache`',
    description: '`from functools import cache` added before any recursive function will automatically memoize results with zero manual hash map bookkeeping!'
  }
];
