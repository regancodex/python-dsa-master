import { Flashcard } from '../types/dsa';

export const FLASHCARDS_DATA: Flashcard[] = [
  {
    id: 'fc-1',
    category: 'Arrays & Hashing',
    topic: 'List vs Deque Popping',
    difficulty: 'Easy',
    question: 'What is the time complexity of `my_list.pop(0)` versus `my_deque.popleft()` in Python?',
    answer: '`my_list.pop(0)` is O(N) because all remaining elements must shift left in memory. `collections.deque.popleft()` is O(1) because deque is implemented as a doubly-linked block list.',
    codeSnippet: `from collections import deque
q = deque([1, 2, 3])
q.popleft()  # O(1) time complexity!`,
    keyTakeaway: 'Always use collections.deque when building queues or BFS to avoid O(N) shifts.'
  },
  {
    id: 'fc-2',
    category: 'Arrays & Hashing',
    topic: 'Hash Table Lookups',
    difficulty: 'Easy',
    question: 'What is the average and worst-case time complexity of `element in my_dict` or `element in my_set`?',
    answer: 'Average Case: O(1) due to hash indexing. Worst Case: O(N) when all keys hash to the same bucket (hash collision degradation).',
    codeSnippet: `seen = set()
if x in seen: # O(1) average lookup
    return True`,
    keyTakeaway: 'Hash sets and dicts provide O(1) lookups on average in Python.'
  },
  {
    id: 'fc-3',
    category: 'Two Pointers',
    topic: 'Two Pointers Pattern Trigger',
    difficulty: 'Medium',
    question: 'When should you choose the Two Pointers technique over a Hash Map for pair finding?',
    answer: 'Use Two Pointers when the input array is already sorted or can be sorted, and you require O(1) auxiliary space. Use a Hash Map when you need O(N) time on an unsorted array and extra O(N) space is permitted.',
    codeSnippet: `# Sorted input -> O(1) space Two Pointers
while left < right:
    curr = nums[left] + nums[right]
    if curr == target: return [left, right]
    elif curr < target: left += 1
    else: right -= 1`,
    keyTakeaway: 'Sorted + O(1) space = Two Pointers. Unsorted + O(1) time lookups = Hash Map.'
  },
  {
    id: 'fc-4',
    category: 'Sliding Window',
    topic: 'Fixed vs Dynamic Window',
    difficulty: 'Medium',
    question: 'What is the difference between a Fixed-Size Sliding Window and a Dynamic-Size Sliding Window?',
    answer: 'Fixed-Size: Window width `K` is constant (e.g. max sum subarray of size K). Advance both left and right simultaneously. Dynamic-Size: Window expands with `right` until an invariant is violated, then shrinks with `left` until valid again (e.g. longest substring without repeats).',
    codeSnippet: `# Dynamic Window Template
left = 0
for right in range(len(s)):
    # add s[right] to state
    while condition_violated:
        # remove s[left] from state
        left += 1
    res = max(res, right - left + 1)`,
    keyTakeaway: 'Expand right to explore, shrink left to restore the invariant.'
  },
  {
    id: 'fc-5',
    category: 'Stack',
    topic: 'Monotonic Stack Trigger',
    difficulty: 'Medium',
    question: 'What problem signals that a Monotonic Stack is the optimal approach?',
    answer: 'Any problem asking for the "Next Greater Element", "Previous Smaller Element", "Largest Rectangle in Histogram", or "Daily Temperatures" (first future day with higher value) in linear O(N) time.',
    codeSnippet: `stack = [] # stores (value, index) in decreasing order
for i, temp in enumerate(temps):
    while stack and temp > stack[-1][0]:
        val, idx = stack.pop()
        res[idx] = i - idx
    stack.append((temp, i))`,
    keyTakeaway: 'Monotonic Stack eliminates nested O(N^2) brute force loops for closest greater/smaller searches.'
  },
  {
    id: 'fc-6',
    category: 'Heap / Priority Queue',
    topic: 'Python heapq Default Behavior',
    difficulty: 'Easy',
    question: 'Is Python\'s `heapq` module a Min-Heap or Max-Heap by default? How do you create a Max-Heap?',
    answer: 'Python\'s `heapq` is a Min-Heap by default. To simulate a Max-Heap, multiply all values by `-1` before pushing, and negate them again upon popping, or use `heapq._heappush_max`.',
    codeSnippet: `import heapq
max_heap = []
heapq.heappush(max_heap, -val) # Push inverted
max_val = -heapq.heappop(max_heap) # Pop inverted`,
    keyTakeaway: 'Always invert signs with -1 when using heapq as a Max-Heap in Python.'
  },
  {
    id: 'fc-7',
    category: 'Binary Search',
    topic: 'Binary Search Template 1 vs Template 2',
    difficulty: 'Medium',
    question: 'When should you use `while left <= right:` versus `while left < right:`?',
    answer: 'Use `while left <= right:` when searching for an exact target value with `right = len(nums) - 1` and `right = mid - 1` upon mismatch. Use `while left < right:` when searching for a boundary/condition condition (e.g. minimum in rotated sorted array) with `right = mid`.',
    codeSnippet: `# Exact match
while left <= right:
    mid = (left + right) // 2
    if nums[mid] == target: return mid
    elif nums[mid] < target: left = mid + 1
    else: right = mid - 1`,
    keyTakeaway: 'left <= right checks the single remaining element; left < right converges on the boundary.'
  },
  {
    id: 'fc-8',
    category: 'Linked List',
    topic: 'Fast and Slow Pointers (Floyd\'s Cycle)',
    difficulty: 'Medium',
    question: 'How do you detect a cycle in a linked list and find the start of the loop with O(1) space?',
    answer: 'Phase 1: `slow` moves 1 step, `fast` moves 2 steps. If they meet, a cycle exists. Phase 2: Reset `slow = head` while keeping `fast` at meeting point. Move both 1 step at a time; where they collide is the cycle entry node!',
    codeSnippet: `slow = fast = head
while fast and fast.next:
    slow = slow.next
    fast = fast.next.next
    if slow == fast: break
else: return None # No cycle

slow = head
while slow != fast:
    slow = slow.next
    fast = fast.next
return slow # Cycle origin!`,
    keyTakeaway: 'Floyd\'s Cycle Finding algorithm runs in O(N) time with O(1) memory.'
  },
  {
    id: 'fc-9',
    category: 'Trees',
    topic: 'Tree Traversals Order',
    difficulty: 'Easy',
    question: 'What are the node visitation orders for Pre-order, In-order, and Post-order DFS traversals?',
    answer: 'Pre-order: [Root, Left, Right]\nIn-order: [Left, Root, Right] (yields sorted order in a BST!)\nPost-order: [Left, Right, Root] (used for bottom-up deletions/evaluations)',
    codeSnippet: `# In-order on BST gives ascending sorted list
def inorder(node):
    if not node: return []
    return inorder(node.left) + [node.val] + inorder(node.right)`,
    keyTakeaway: 'In-order traversal of a Binary Search Tree always produces sorted non-decreasing sequence.'
  },
  {
    id: 'fc-10',
    category: 'Graphs',
    topic: 'BFS vs DFS for Shortest Path',
    difficulty: 'Easy',
    question: 'Why does Breadth-First Search (BFS) guarantee the shortest path in unweighted graphs, but DFS does not?',
    answer: 'BFS explores all nodes layer by layer at distance d=1, then d=2, etc. The first time a destination node is popped, it is guaranteed to have been reached via the minimum number of edge steps. DFS explores deep paths first and might find a long path first.',
    codeSnippet: `from collections import deque
queue = deque([(start_node, 0)]) # (node, distance)
visited = {start_node}
while queue:
    curr, dist = queue.popleft()
    if curr == target: return dist
    for nxt in adj[curr]:
        if nxt not in visited:
            visited.add(nxt)
            queue.append((nxt, dist + 1))`,
    keyTakeaway: 'Use BFS for shortest path in unweighted graphs or matrices.'
  },
  {
    id: 'fc-11',
    category: '1-D Dynamic Programming',
    topic: 'Memoization vs Tabulation',
    difficulty: 'Medium',
    question: 'What is the key difference between Top-Down Memoization and Bottom-Up Tabulation in DP?',
    answer: 'Top-Down: Recursion from target problem down to base cases, caching results in `@cache` or dictionary. Bottom-Up: Iteration from base cases up to the target using an array/table, often allowing space optimization to O(1).',
    codeSnippet: `from functools import cache

# Top-Down with @cache
@cache
def fib(n):
    if n <= 1: return n
    return fib(n - 1) + fib(n - 2)`,
    keyTakeaway: 'Python\'s @cache decorator from functools provides instant O(1) top-down memoization.'
  },
  {
    id: 'fc-12',
    category: 'Intervals & Bit Manipulation',
    topic: 'Bitwise Brian Kernighan\'s Algorithm',
    difficulty: 'Medium',
    question: 'What does the bitwise operation `n & (n - 1)` do?',
    answer: '`n & (n - 1)` clears the lowest set bit (rightmost 1) of integer `n`. Repeating this until `n == 0` counts total set bits in O(number of 1s) time!',
    codeSnippet: `count = 0
while n:
    n &= (n - 1) # Drops the lowest set bit
    count += 1
return count`,
    keyTakeaway: '`n & (n - 1)` is the cleanest way to count set bits and check powers of 2 (`(n > 0) and (n & (n - 1)) == 0`).'
  }
];
