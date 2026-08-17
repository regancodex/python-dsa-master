import { Problem } from '../types/dsa';

export interface ProblemPatternAnalysis {
  bestToolTitle: string;
  bestToolWhy: string;
  alternativeTitle: string;
  alternativeWhy: string;
  wrongTool1Title: string;
  wrongTool1Why: string;
  wrongTool2Title: string;
  wrongTool2Why: string;
}

export function getPatternAnalysisForProblem(problem: Problem): ProblemPatternAnalysis {
  const id = problem.id;
  const cat = problem.category;

  // DAY 1: Two Sum
  if (id === 'two-sum') {
    return {
      bestToolTitle: '⭐ Best Tool: Hash Map (O(N) time, O(N) space)',
      bestToolWhy: 'Single pass with `seen = {}`. Instant O(1) complement lookup (`target - num`). Retains original indices on unsorted arrays.',
      alternativeTitle: '⚠️ Sorting + Two Pointers (O(N log N))',
      alternativeWhy: 'Requires sorting first (O(N log N)). Scrambles original indices, needing `(val, original_idx)` tuples.',
      wrongTool1Title: '❌ Sliding Window (Wrong Tool)',
      wrongTool1Why: 'Fails because pairs can be anywhere in the array. Sliding Window is strictly for contiguous subarrays.',
      wrongTool2Title: '❌ Backtracking / Nested Loops (O(N²))',
      wrongTool2Why: 'Checking all pairs takes quadratic time, causing TLE on large arrays.'
    };
  }

  // DAY 2: Contains Duplicate
  if (id === 'contains-duplicate') {
    return {
      bestToolTitle: '⭐ Best Tool: Hash Set (O(N) time, O(N) space)',
      bestToolWhy: 'One-pass `seen = set()`. Returns True on the first duplicate encountered in average O(1) time.',
      alternativeTitle: '⚠️ Sorting (O(N log N) time, O(1) space)',
      alternativeWhy: 'Sorts adjacent duplicates together. Saves memory if in-place mutation is permitted, but slower than Hash Set.',
      wrongTool1Title: '❌ Nested Loops (O(N²))',
      wrongTool1Why: 'Comparing every pair against every other element is too slow for 100,000 items.',
      wrongTool2Title: '❌ Sliding Window',
      wrongTool2Why: 'Duplicates are not restricted to adjacent or contiguous windows.'
    };
  }

  // DAY 3: Valid Anagram
  if (id === 'valid-anagram') {
    return {
      bestToolTitle: '⭐ Best Tool: Frequency Map / Counter (O(N) time, O(1) space)',
      bestToolWhy: 'Direct character counting via `Counter(s) == Counter(t)`. Fixed 26-character English alphabet guarantees O(1) auxiliary space.',
      alternativeTitle: '⚠️ Sorting `sorted(s) == sorted(t)` (O(N log N))',
      alternativeWhy: 'Clean one-liner in Python, but sorting takes O(N log N) time and allocates new sorted strings.',
      wrongTool1Title: '❌ Two Pointers Squeeze',
      wrongTool1Why: 'Letters in anagrams can appear in arbitrary permutations, not symmetric mirrored positions.',
      wrongTool2Title: '❌ Bitwise XOR',
      wrongTool2Why: 'XOR cancels out duplicate characters within the same word (e.g. "aa" ^ "bb" fails).'
    };
  }

  // DAY 4: Group Anagrams
  if (id === 'group-anagrams') {
    return {
      bestToolTitle: '⭐ Best Tool: Hash Map with Frequency Tuple Key (O(N * K))',
      bestToolWhy: 'Build a 26-element tuple of counts for each word. Immutable tuple serves as a hashable dictionary key in O(N * K) time.',
      alternativeTitle: '⚠️ Sorted Word as Hash Key `tuple(sorted(word))` (O(N * K log K))',
      alternativeWhy: 'Sorting each word takes K log K time. Fast enough for short strings, but tuple count is strictly linear.',
      wrongTool1Title: '❌ Brute Force Pairwise Anagram Check (O(N² * K))',
      wrongTool1Why: 'Comparing every word against every group causes quadratic O(N²) time limit exceeded.',
      wrongTool2Title: '❌ Sliding Window',
      wrongTool2Why: 'Words are distinct array entries, not contiguous substrings.'
    };
  }

  // DAY 5: Top K Frequent Elements
  if (id === 'top-k-frequent-elements') {
    return {
      bestToolTitle: '⭐ Best Tool: Bucket Sort by Frequency (O(N) time, O(N) space)',
      bestToolWhy: 'Count frequencies with `Counter(nums)`. Index buckets by frequency (0 to N). Iterate backwards to collect top k in strict linear O(N) time!',
      alternativeTitle: '⚠️ Min-Heap of Size K (O(N log K))',
      alternativeWhy: 'Maintain a heap of k elements. Fast and optimal if k << N, but slightly slower than Bucket Sort.',
      wrongTool1Title: '❌ Full Array Sorting (O(N log N))',
      wrongTool1Why: 'Sorting all distinct frequencies takes O(N log N) which does not meet the better-than-O(N log N) requirement.',
      wrongTool2Title: '❌ Dynamic Programming',
      wrongTool2Why: 'This is a counting/selection problem with no optimal substructure or overlapping subproblems.'
    };
  }

  // DAY 6: Product of Array Except Self
  if (id === 'product-of-array-except-self') {
    return {
      bestToolTitle: '⭐ Best Tool: Prefix & Suffix Running Products (O(N) time, O(1) space)',
      bestToolWhy: 'Forward pass accumulates prefix products; backward pass multiplies by postfix products in-place in output array.',
      alternativeTitle: '⚠️ Two Separate Prefix & Suffix Arrays (O(N) space)',
      alternativeWhy: 'Allocating `prefix = [1]*N` and `suffix = [1]*N` is intuitive but uses 2N auxiliary memory instead of O(1).',
      wrongTool1Title: '❌ Total Product Division `total // nums[i]`',
      wrongTool1Why: 'Explicitly forbidden by problem statement, and crashes with `ZeroDivisionError` when array contains zeros.',
      wrongTool2Title: '❌ Nested Loops (O(N²))',
      wrongTool2Why: 'Multiplying all other elements for each index takes quadratic time.'
    };
  }

  // DAY 7: Longest Consecutive Sequence
  if (id === 'longest-consecutive-sequence') {
    return {
      bestToolTitle: '⭐ Best Tool: Hash Set Sequence Root Detection (O(N) time)',
      bestToolWhy: 'Store numbers in a set. Only count streaks if `num - 1 not in set` (sequence start). Each number visited at most twice -> O(N) total!',
      alternativeTitle: '⚠️ Sorting `nums.sort()` (O(N log N))',
      alternativeWhy: 'Sorting clusters consecutive numbers together, but sorting violates the strict O(N) time constraint.',
      wrongTool1Title: '❌ Union-Find (Disjoint Set)',
      wrongTool1Why: 'Union-Find works but adds extra pointer overhead and runs in O(N * α(N)), which is slower than a direct Hash Set.',
      wrongTool2Title: '❌ Brute Force Search for num+1 (O(N²))',
      wrongTool2Why: 'Searching without the `num - 1` root check causes redundant iterations and quadratic time.'
    };
  }

  // DAY 8: Valid Palindrome
  if (id === 'valid-palindrome') {
    return {
      bestToolTitle: '⭐ Best Tool: Two Pointers from Ends (O(N) time, O(1) space)',
      bestToolWhy: 'Left and right pointers advance inward, skipping non-alphanumeric chars with `isalnum()`. Compares symmetry in O(1) space.',
      alternativeTitle: '⚠️ Filtered String Reverse `s == s[::-1]` (O(N) space)',
      alternativeWhy: 'Clean Python one-liner, but allocates a brand new reversed string in memory.',
      wrongTool1Title: '❌ Hash Map / Frequency Count',
      wrongTool1Why: 'Character counts do not verify mirrored symmetry (e.g. "aabb" has matching counts but is not a palindrome).',
      wrongTool2Title: '❌ Binary Search',
      wrongTool2Why: 'String characters are not monotonically sorted.'
    };
  }

  // DAY 9: Two Sum II - Input Array Is Sorted
  if (id === 'two-sum-ii-input-array-is-sorted') {
    return {
      bestToolTitle: '⭐ Best Tool: Two Pointers (O(N) time, O(1) space)',
      bestToolWhy: 'Array is ALREADY sorted. If `sum < target`, advance `left += 1`; if `sum > target`, decrement `right -= 1`. 0 extra memory!',
      alternativeTitle: '⚠️ Hash Map (O(N) time, O(N) space)',
      alternativeWhy: 'Hash Map works in O(N), but wastes O(N) extra memory when sorted structure enables O(1) space.',
      wrongTool1Title: '❌ Sliding Window',
      wrongTool1Why: 'Two Sum II is a 2-element pair match across ends, not a contiguous subarray.',
      wrongTool2Title: '❌ Backtracking',
      wrongTool2Why: 'Exponential recursion is unnecessary for a linear 2-pointer scan.'
    };
  }

  // DAY 10: 3Sum
  if (id === '3sum') {
    return {
      bestToolTitle: '⭐ Best Tool: Sort + Fixed Pivot + Two Pointers (O(N²))',
      bestToolWhy: 'Sort first. For each pivot `nums[i]`, two pointers squeeze inward on remaining array in O(N) time. Skips adjacent duplicates effortlessly!',
      alternativeTitle: '⚠️ Hash Set per Pivot (O(N²))',
      alternativeWhy: 'Can use a hash set for the inner pair, but handling duplicate triplets without sorting becomes messy and requires O(N) extra space.',
      wrongTool1Title: '❌ 3-Nested Loops (O(N³))',
      wrongTool1Why: 'Brute force checks all triplets in O(N³), causing immediate TLE on LeetCode for N = 3,000.',
      wrongTool2Title: '❌ Sliding Window / Stack',
      wrongTool2Why: 'Triplets are non-contiguous and non-monotonic.'
    };
  }

  // DAY 11: Container With Most Water
  if (id === 'container-with-most-water') {
    return {
      bestToolTitle: '⭐ Best Tool: Two Pointers Greedy Squeeze (O(N) time, O(1) space)',
      bestToolWhy: 'Start at maximum width (ends). The area is constrained by the shorter wall. Greedily move the shorter wall inward!',
      alternativeTitle: '⚠️ Brute Force (O(N²))',
      alternativeWhy: 'Checking all pairs of lines takes O(N²) quadratic time, causing TLE on N = 100,000.',
      wrongTool1Title: '❌ Dynamic Programming',
      wrongTool1Why: 'No overlapping subproblems exist; the optimal choice is entirely dictated by boundary heights.',
      wrongTool2Title: '❌ Monotonic Stack',
      wrongTool2Why: 'Stack is for next greater element, not maximum rectangle between arbitrary outer bounds.'
    };
  }

  // DAY 12: Trapping Rain Water
  if (id === 'trapping-rain-water') {
    return {
      bestToolTitle: '⭐ Best Tool: Two Pointers with Running Max (O(N) time, O(1) space)',
      bestToolWhy: 'Water is bounded by `min(left_max, right_max) - height[i]`. Whichever side has smaller max can be resolved immediately in O(1) memory!',
      alternativeTitle: '⚠️ Prefix Max & Suffix Max Arrays (O(N) time, O(N) space)',
      alternativeWhy: 'Precomputing left and right max arrays takes O(N) memory, which is less optimal than Two Pointers.',
      wrongTool1Title: '❌ Sliding Window',
      wrongTool1Why: 'Water reservoirs can span multiple valleys between distant peaks, not fixed-size windows.',
      wrongTool2Title: '❌ Binary Search',
      wrongTool2Why: 'Elevation bars are not sorted.'
    };
  }

  // DAY 13: Best Time to Buy and Sell Stock
  if (id === 'best-time-to-buy-and-sell-stock') {
    return {
      bestToolTitle: '⭐ Best Tool: Single-Pass Greedy / Min-Tracking (O(N))',
      bestToolWhy: 'Track lowest price seen so far (`min_price`) and compute potential profit `price - min_price`. Update `max_profit` on the fly.',
      alternativeTitle: '⚠️ Kadane\'s Algorithm on Daily Differences (O(N))',
      alternativeWhy: 'Transform prices into daily price differences and find max subarray sum, but tracking min_price is simpler.',
      wrongTool1Title: '❌ Nested Loops (O(N²))',
      wrongTool1Why: 'Comparing every buy day with every future sell day takes O(N²) quadratic time.',
      wrongTool2Title: '❌ Binary Search',
      wrongTool2Why: 'Stock prices fluctuate non-monotonically.'
    };
  }

  // DAY 14: Longest Substring Without Repeating Characters
  if (id === 'longest-substring-without-repeating-characters') {
    return {
      bestToolTitle: '⭐ Best Tool: Sliding Window with Last-Seen Map (O(N))',
      bestToolWhy: 'Expand right pointer. When encountering a duplicate inside the window, jump left pointer directly to `last_seen[char] + 1` in O(1).',
      alternativeTitle: '⚠️ Sliding Window with Set & While Loop (O(2N))',
      alternativeWhy: 'Shrinking left pointer one step at a time with a set is valid, but index jumping is faster.',
      wrongTool1Title: '❌ Substring Brute Force (O(N³))',
      wrongTool1Why: 'Checking all substrings for uniqueness takes cubic time.',
      wrongTool2Title: '❌ Dynamic Programming Table',
      wrongTool2Why: '2D DP table uses O(N²) memory for a problem that is cleanly solved in O(1) space.'
    };
  }

  // DAY 15: Valid Parentheses
  if (id === 'valid-parentheses') {
    return {
      bestToolTitle: '⭐ Best Tool: LIFO Stack (O(N) time, O(N) space)',
      bestToolWhy: 'Opening brackets pushed to stack; closing brackets must match top opening bracket. Valid only if stack empty at end.',
      alternativeTitle: '⚠️ Recursion Call Stack',
      alternativeWhy: 'Recursion simulates stack implicitly, but explicit list `.append()` / `.pop()` avoids recursion limits.',
      wrongTool1Title: '❌ Simple Integer Balance Counter',
      wrongTool1Why: 'A single counter fails on mixed bracket types like "([)]" because it does not verify bracket ordering.',
      wrongTool2Title: '❌ Two Pointers from Ends',
      wrongTool2Why: 'Parentheses can be sequential "()[]{}" or deeply nested "((()))", not just mirrored from outer ends.'
    };
  }

  // DAY 16: Binary Search
  if (id === 'binary-search') {
    return {
      bestToolTitle: '⭐ Best Tool: Standard Binary Search (O(log N) time, O(1) space)',
      bestToolWhy: 'Array is sorted. Compare target with `nums[mid]`. Halves search space each iteration in logarithmic time.',
      alternativeTitle: '⚠️ Recursive Binary Search (O(log N) time, O(log N) space)',
      alternativeWhy: 'Recursive approach adds call stack frames, whereas iterative `while left <= right:` uses O(1) memory.',
      wrongTool1Title: '❌ Linear Scan (O(N))',
      wrongTool1Why: 'Linear scan visits every element, failing the mandatory O(log N) time constraint.',
      wrongTool2Title: '❌ Hash Map',
      wrongTool2Why: 'Building a hash map takes O(N) time and memory, which is worse than direct O(log N) binary search on sorted array.'
    };
  }

  // DAY 17: Reverse Linked List
  if (id === 'reverse-linked-list') {
    return {
      bestToolTitle: '⭐ Best Tool: Iterative 3-Pointer In-Place Reversal (O(N) time, O(1) space)',
      bestToolWhy: 'Maintain `prev`, `curr`, `nxt`. Reverses pointers in a single pass with zero memory allocation.',
      alternativeTitle: '⚠️ Recursive Reversal (O(N) time, O(N) stack space)',
      alternativeWhy: 'Elegant recursion, but uses O(N) call stack memory.',
      wrongTool1Title: '❌ Array Conversion & Node Reconstruction (O(N) space)',
      wrongTool1Why: 'Extracting node values into a list and creating new nodes wastes memory and violates in-place requirement.',
      wrongTool2Title: '❌ Two Pointers Swapping Values',
      wrongTool2Why: 'Singly linked lists have no backward pointers (`prev`), making two-pointer indexing slow O(N²).'
    };
  }

  // DAY 18: Invert Binary Tree
  if (id === 'invert-binary-tree') {
    return {
      bestToolTitle: '⭐ Best Tool: Recursive DFS (O(N) time, O(H) space)',
      bestToolWhy: 'Swap left and right children at current node: `root.left, root.right = root.right, root.left`, then recurse on both subtrees.',
      alternativeTitle: '⚠️ Iterative BFS with Queue (O(N) time, O(W) space)',
      alternativeWhy: 'Queue level-order traversal also swaps children, useful if tree is very deep to prevent stack overflow.',
      wrongTool1Title: '❌ Binary Search',
      wrongTool1Why: 'Inverting changes structure globally, not a search problem.',
      wrongTool2Title: '❌ Dynamic Programming Table',
      wrongTool2Why: 'Tree nodes are mutated directly with no subproblem overlapping table needed.'
    };
  }

  // DAY 19: Climbing Stairs
  if (id === 'climbing-stairs') {
    return {
      bestToolTitle: '⭐ Best Tool: Fibonacci Space-Optimized DP (O(N) time, O(1) space)',
      bestToolWhy: 'To reach step i, you come from step i-1 or i-2: `dp[i] = dp[i-1] + dp[i-2]`. Only 2 previous integers needed!',
      alternativeTitle: '⚠️ Top-Down Memoization (O(N) time, O(N) space)',
      alternativeWhy: 'Recursion with `@functools.cache` works, but bottom-up iteration uses O(1) space.',
      wrongTool1Title: '❌ Naive Recursion (O(2^N))',
      wrongTool1Why: 'Without memoization, explores redundant branches causing exponential timeout on N = 45.',
      wrongTool2Title: '❌ Greedy Algorithm',
      wrongTool2Why: 'Greedy cannot count total distinct combinations.'
    };
  }

  // DAY 20: Coin Change
  if (id === 'coin-change') {
    return {
      bestToolTitle: '⭐ Best Tool: Bottom-Up 1D DP (O(amount * coins))',
      bestToolWhy: '`dp[a] = min(dp[a], 1 + dp[a - coin])` for every amount from 1 to `amount`. Computes exact fewest coins required.',
      alternativeTitle: '⚠️ Top-Down Memoized DFS (O(amount * coins))',
      alternativeWhy: 'Valid with memoization, but bottom-up iterative DP avoids recursion stack overhead.',
      wrongTool1Title: '❌ Greedy Algorithm (Pick Largest Coin First)',
      wrongTool1Why: 'Greedy FAILS for coin sets like [1, 3, 4, 5] for amount 7 (Greedy gives 5+1+1=3 coins, optimal is 3+4=2 coins).',
      wrongTool2Title: '❌ Backtracking without Memoization (O(len(coins)^amount))',
      wrongTool2Why: 'Explodes exponentially on large amounts.'
    };
  }

  // DAY 21: Number of Islands
  if (id === 'number-of-islands') {
    return {
      bestToolTitle: '⭐ Best Tool: In-Place Grid DFS / BFS (O(M * N))',
      bestToolWhy: 'When hitting land \'1\', increment count and sink connected land to \'0\' with DFS/BFS. Avoids extra visited sets.',
      alternativeTitle: '⚠️ Disjoint Set / Union-Find (O(M * N * α(M*N)))',
      alternativeWhy: 'Union-find connects adjacent land cells, but has higher constant factor overhead than direct DFS.',
      wrongTool1Title: '❌ Topological Sort',
      wrongTool1Why: 'Grid connectivity is undirected with no dependencies or cycles.',
      wrongTool2Title: '❌ Dynamic Programming',
      wrongTool2Why: 'Islands can form complex cyclic shapes in all 4 directions, lacking unidirectional DAG ordering.'
    };
  }

  // DAY 22: Min Stack
  if (id === 'min-stack') {
    return {
      bestToolTitle: '⭐ Best Tool: Dual Stack or (val, min) Tuple Stack (O(1) time)',
      bestToolWhy: 'Parallel `min_stack` records the minimum element present at every push. All operations push, pop, top, getMin run in O(1).',
      alternativeTitle: '⚠️ Single Stack with Encoded Difference (O(1) space trick)',
      alternativeWhy: 'Storing difference `2*val - min` saves space, but is prone to integer overflow in statically typed languages.',
      wrongTool1Title: '❌ Min-Heap / Priority Queue for Min',
      wrongTool1Why: 'Heap gives O(1) getMin, but `pop()` takes O(N) or O(log N) to find and remove arbitrary stack elements.',
      wrongTool2Title: '❌ Scanning Stack on getMin() (O(N))',
      wrongTool2Why: 'Scanning violates the strict O(1) time requirement.'
    };
  }

  // DAY 23: Search in Rotated Sorted Array
  if (id === 'search-in-rotated-sorted-array') {
    return {
      bestToolTitle: '⭐ Best Tool: Modified Binary Search on Sorted Half (O(log N))',
      bestToolWhy: 'At least one half (`left..mid` or `mid..right`) is guaranteed strictly sorted. Check if target lies within sorted half.',
      alternativeTitle: '⚠️ Find Pivot Index + Binary Search (2-Pass O(log N))',
      alternativeWhy: 'Find minimum element first, then binary search the target half. Works, but single-pass check is cleaner.',
      wrongTool1Title: '❌ Linear Scan (O(N))',
      wrongTool1Why: 'Fails the required O(log N) time constraint.',
      wrongTool2Title: '❌ Two Pointers Converging',
      wrongTool2Why: 'Two pointers take O(N) time without halving the search space.'
    };
  }

  // DAY 24: Merge Two Sorted Lists
  if (id === 'merge-two-sorted-lists') {
    return {
      bestToolTitle: '⭐ Best Tool: Dummy Head + Iterative Pointer Splicing (O(N + M))',
      bestToolWhy: 'Dummy anchor node standardizes head initialization. Splicing pointers runs in O(N+M) with O(1) extra memory.',
      alternativeTitle: '⚠️ Recursive Merge (O(N + M) time, O(N + M) call stack)',
      alternativeWhy: 'Recursively return smaller head with its `.next` set to remaining merge. Uses call stack memory.',
      wrongTool1Title: '❌ Array Extraction + Sort + Reconstruct (O(K log K))',
      wrongTool1Why: 'Allocating new nodes wastes memory when existing node pointers can simply be re-linked.',
      wrongTool2Title: '❌ Binary Search',
      wrongTool2Why: 'Linked lists do not allow O(1) random access indexing.'
    };
  }

  // DAY 25: Maximum Depth of Binary Tree
  if (id === 'maximum-depth-of-binary-tree') {
    return {
      bestToolTitle: '⭐ Best Tool: Recursive DFS `1 + max(left, right)` (O(N))',
      bestToolWhy: 'Base case `if not root: return 0`. Traverses each node once and computes height directly.',
      alternativeTitle: '⚠️ Iterative BFS Level-Order with Queue (O(N))',
      alternativeWhy: 'Count the number of levels using a queue. Great if the tree is unbalanced to avoid recursion depth limits.',
      wrongTool1Title: '❌ Dynamic Programming Table',
      wrongTool1Why: 'No subproblem overlap; simple tree traversal solves it.',
      wrongTool2Title: '❌ Binary Search',
      wrongTool2Why: 'Tree depth calculation visits all nodes, not a search problem.'
    };
  }

  // DAY 26: Kth Largest Element in an Array
  if (id === 'kth-largest-element-in-an-array') {
    return {
      bestToolTitle: '⭐ Best Tool: Min-Heap of Size K (O(N log K) time, O(K) space)',
      bestToolWhy: 'Keep k elements in a Min-Heap. Pop smallest when size exceeds k. Top of heap is the k-th largest element.',
      alternativeTitle: '⚠️ Quickselect (O(N) average time, O(1) space)',
      alternativeWhy: 'Partition-based Quickselect achieves O(N) average, but has O(N²) worst case if pivots are chosen poorly.',
      wrongTool1Title: '❌ Full Array Sort `nums.sort()` (O(N log N))',
      wrongTool1Why: 'Sorting entire array is slower when k << N and does not meet the better-than-O(N log N) design goal.',
      wrongTool2Title: '❌ Max-Heap with all N elements (O(N + K log N))',
      wrongTool2Why: 'Uses O(N) space instead of O(K) space.'
    };
  }

  // DAY 27: Subsets (Power Set)
  if (id === 'subsets') {
    return {
      bestToolTitle: '⭐ Best Tool: Backtracking Binary Decision Tree (O(N * 2^N))',
      bestToolWhy: 'For each element, make 2 choices: Include or Exclude. Generates all 2^N subsets systematically without duplicates.',
      alternativeTitle: '⚠️ Cascading Iterative Generation (O(N * 2^N))',
      alternativeWhy: 'Start with `[[]]`, for each num add it to existing subsets. Iterative and Pythonic.',
      wrongTool1Title: '❌ Bitmask Iteration `1 << n`',
      wrongTool1Why: 'Bitmasking works for N <= 30, but recursive backtracking generalizes cleanly to Subsets II (with duplicates).',
      wrongTool2Title: '❌ Dynamic Programming',
      wrongTool2Why: 'Subsets generation requires outputting all 2^N combinations, not finding a single optimal scalar.'
    };
  }

  // DAY 28: Merge Intervals
  if (id === 'merge-intervals') {
    return {
      bestToolTitle: '⭐ Best Tool: Sort by Start Time + Single Pass Merge (O(N log N))',
      bestToolWhy: 'Sort intervals by `start`. If `current.start <= last_merged.end`, merge by expanding `last_merged.end = max(last.end, current.end)`.',
      alternativeTitle: '⚠️ Interval Tree',
      alternativeWhy: 'Overkill for static intervals; sorting + linear scan is simpler and faster.',
      wrongTool1Title: '❌ Nested Brute Force Comparison (O(N²))',
      wrongTool1Why: 'Pairwise merging without sorting requires multiple passes until convergence.',
      wrongTool2Title: '❌ Sliding Window',
      wrongTool2Why: 'Intervals have varying lengths and overlaps, not fixed windows.'
    };
  }

  // DAY 29: Single Number
  if (id === 'single-number') {
    return {
      bestToolTitle: '⭐ Best Tool: Bitwise XOR Accumulator (O(N) time, O(1) space)',
      bestToolWhy: 'XOR cancels out duplicate pairs (`x ^ x = 0`) and `x ^ 0 = x`. XORing all numbers leaves only the unique element with 0 memory.',
      alternativeTitle: '⚠️ Math Formula `2*sum(set(nums)) - sum(nums)` (O(N) space)',
      alternativeWhy: 'Clever math trick, but requires creating a set which consumes O(N) memory.',
      wrongTool1Title: '❌ Hash Map / Counter (O(N) space)',
      wrongTool1Why: 'Counts frequency but violates the strict O(1) auxiliary space requirement.',
      wrongTool2Title: '❌ Sorting nums.sort() (O(N log N))',
      wrongTool2Why: 'Sorting takes O(N log N) time, violating the linear O(N) requirement.'
    };
  }

  // DAY 30: Unique Paths
  if (id === 'unique-paths') {
    return {
      bestToolTitle: '⭐ Best Tool: Space-Optimized 1D Row DP (O(M * N) time, O(N) space)',
      bestToolWhy: '`new_row[c] = row[c] + new_row[c-1]`. Compresses 2D grid into a single row of size N.',
      alternativeTitle: '⚠️ Combinatorics `comb(m+n-2, m-1)` (O(min(M, N)))',
      alternativeWhy: 'Mathematical formula is fastest, but DP formulation is essential for grid problems with obstacles (Unique Paths II).',
      wrongTool1Title: '❌ Naive Recursion (O(2^(M+N)))',
      wrongTool1Why: 'Without memoization, explores exponential paths and times out on 100x100 grids.',
      wrongTool2Title: '❌ Dijkstra / BFS',
      wrongTool2Why: 'No edge weights or shortest paths needed; standard DP recurrence is strictly faster.'
    };
  }

  // Category based fallback
  return {
    bestToolTitle: `⭐ Best Tool: ${cat} Standard Approach`,
    bestToolWhy: `Optimized for ${cat} patterns with strict time and space complexity guarantees.`,
    alternativeTitle: '⚠️ Alternative Pattern',
    alternativeWhy: 'A valid secondary approach that trades time for memory or vice-versa.',
    wrongTool1Title: '❌ Brute Force Nested Search',
    wrongTool1Why: 'Fails to exploit problem invariants, leading to quadratic or exponential time complexity.',
    wrongTool2Title: '❌ Incompatible Data Structure',
    wrongTool2Why: 'Does not match the problem constraints or structural requirements.'
  };
}
