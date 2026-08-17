import { Problem } from '../types/dsa';

export const EXTENDED_BLIND75_PROBLEMS: Problem[] = [
  // DAY 31 - Dynamic Programming
  {
    id: 'house-robber',
    day: 31,
    isCore: false,
    title: 'House Robber',
    category: '1-D Dynamic Programming',
    difficulty: 'Medium',
    leetcodeNumber: 198,
    leetcodeUrl: 'https://leetcode.com/problems/house-robber/',
    companies: ['Amazon', 'Google', 'Apple', 'Meta', 'Microsoft', 'Bloomberg'],
    description: 'You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and **it will automatically contact the police if two adjacent houses were broken into on the same night**.\n\nGiven an integer array `nums` representing the amount of money of each house, return the maximum amount of money you can rob tonight **without alerting the police**.',
    examples: [
      { input: 'nums = [1,2,3,1]', output: '4', explanation: 'Rob house 1 (money = 1) and then rob house 3 (money = 3). Total amount you can rob = 1 + 3 = 4.' },
      { input: 'nums = [2,7,9,3,1]', output: '12', explanation: 'Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1). Total amount you can rob = 2 + 9 + 1 = 12.' }
    ],
    constraints: ['1 <= nums.length <= 100', '0 <= nums[i] <= 400'],
    starterCode: `def rob(nums: list[int]) -> int:
    """
    Find maximum loot without robbing two adjacent houses.
    Time Constraint: O(N)
    Space Constraint: O(1)
    """
    # Write your optimal solution here:
    pass`,
    solutionCode: `def rob(nums: list[int]) -> int:
    """
    Constant Space Dynamic Programming
    dp[i] = max(dp[i-1], dp[i-2] + nums[i])
    Time Complexity: O(N)
    Space Complexity: O(1)
    """
    rob1, rob2 = 0, 0
    
    # [rob1, rob2, n, n+1, ...]
    for n in nums:
        temp = max(n + rob1, rob2)
        rob1 = rob2
        rob2 = temp
        
    return rob2`,
    optimalIntuition: 'At each house `n`, we have two mutually exclusive choices: either rob it (earning `n + rob1` from two houses back) or skip it (keeping `rob2` from the previous house). The maximum loot at the current house is `max(n + rob1, rob2)`. By keeping just two variables, we achieve O(N) time and O(1) space!',
    stepByStepLogic: [
      'Initialize `rob1 = 0` (max loot excluding adjacent house) and `rob2 = 0` (max loot up to previous house).',
      'Iterate through each house money value `n` in `nums`.',
      'Compute the new best: `temp = max(n + rob1, rob2)`.',
      'Shift the window: `rob1 = rob2`, `rob2 = temp`.',
      'Return `rob2` after visiting all houses.'
    ],
    complexity: {
      time: 'O(N)',
      space: 'O(1)',
      timeExplanation: 'Single linear pass over nums array.',
      spaceExplanation: 'Only two scalar variables rob1 and rob2 kept in memory.'
    },
    commonPitfalls: ['Creating a full DP array of size N when only the previous two states are needed.'],
    pythonicTips: ['Using parallel assignment `rob1, rob2 = rob2, max(n + rob1, rob2)` condenses the loop cleanly.'],
    testCases: [
      { input: '[1, 2, 3, 1]', expected: '4' },
      { input: '[2, 7, 9, 3, 1]', expected: '12' },
      { input: '[2, 1, 1, 2]', expected: '4' }
    ],
    tags: ['Dynamic Programming', 'Array', 'Blind 75', 'Medium']
  },

  // DAY 32 - Greedy / Kadane's
  {
    id: 'maximum-subarray',
    day: 32,
    isCore: false,
    title: 'Maximum Subarray (Kadane\'s)',
    category: 'Greedy',
    difficulty: 'Medium',
    leetcodeNumber: 53,
    leetcodeUrl: 'https://leetcode.com/problems/maximum-subarray/',
    companies: ['Amazon', 'Microsoft', 'Apple', 'Google', 'Meta', 'LinkedIn'],
    description: 'Given an integer array `nums`, find the subarray with the largest sum, and return its sum.',
    examples: [
      { input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', output: '6', explanation: 'The subarray [4,-1,2,1] has the largest sum 6.' },
      { input: 'nums = [1]', output: '1' },
      { input: 'nums = [5,4,-1,7,8]', output: '23' }
    ],
    constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
    starterCode: `def max_sub_array(nums: list[int]) -> int:
    # Write your Kadane's algorithm solution:
    pass`,
    solutionCode: `def max_sub_array(nums: list[int]) -> int:
    """
    Kadane's Algorithm
    Time Complexity: O(N)
    Space Complexity: O(1)
    """
    max_sum = nums[0]
    curr_sum = 0
    
    for num in nums:
        # If current running sum drops below 0, reset it (a negative prefix only hurts us)
        curr_sum = max(num, curr_sum + num)
        max_sum = max(max_sum, curr_sum)
        
    return max_sum`,
    optimalIntuition: 'If at any point our running subarray sum becomes negative, adding it to the next element will only reduce the next element\'s value. Therefore, whenever running sum < 0, we greedily discard the previous subarray and restart fresh at the current element (Kadane\'s Algorithm).',
    stepByStepLogic: [
      'Initialize `max_sum = nums[0]` and `curr_sum = 0`.',
      'For each `num` in `nums`:',
      '  `curr_sum = max(num, curr_sum + num)` (either start fresh at num or extend previous subarray).',
      '  `max_sum = max(max_sum, curr_sum)`.',
      'Return `max_sum`.'
    ],
    complexity: {
      time: 'O(N)',
      space: 'O(1)',
      timeExplanation: 'Single linear pass through the array.',
      spaceExplanation: 'Only two scalar variables used.'
    },
    commonPitfalls: ['Initializing `max_sum = 0` which fails when all numbers in the array are negative (e.g. `[-1, -2]`). Always initialize with `nums[0]` or `-inf`.'],
    pythonicTips: ['`curr_sum = max(num, curr_sum + num)` is cleaner than an explicit `if curr_sum < 0: curr_sum = 0` branch.'],
    testCases: [
      { input: '[-2, 1, -3, 4, -1, 2, 1, -5, 4]', expected: '6' },
      { input: '[1]', expected: '1' },
      { input: '[5, 4, -1, 7, 8]', expected: '23' },
      { input: '[-1]', expected: '-1' }
    ],
    tags: ['Kadane\'s', 'Greedy', 'Dynamic Programming', 'Medium']
  },

  // DAY 33 - 1-D Dynamic Programming
  {
    id: 'maximum-product-subarray',
    day: 33,
    isCore: false,
    title: 'Maximum Product Subarray',
    category: '1-D Dynamic Programming',
    difficulty: 'Medium',
    leetcodeNumber: 152,
    leetcodeUrl: 'https://leetcode.com/problems/maximum-product-subarray/',
    companies: ['Amazon', 'Google', 'Microsoft', 'LinkedIn'],
    description: 'Given an integer array `nums`, find a subarray that has the largest product, and return the product.',
    examples: [
      { input: 'nums = [2,3,-2,4]', output: '6', explanation: '[2,3] has the largest product 6.' },
      { input: 'nums = [-2,0,-1]', output: '0', explanation: 'The result cannot be 2, because [-2,-1] is not a contiguous subarray.' }
    ],
    constraints: ['1 <= nums.length <= 2 * 10^4', '-10 <= nums[i] <= 10'],
    starterCode: `def max_product(nums: list[int]) -> int:
    # Write your solution keeping track of min and max products:
    pass`,
    solutionCode: `def max_product(nums: list[int]) -> int:
    """
    Maintain both current max and current min (negative * negative = positive)
    Time Complexity: O(N)
    Space Complexity: O(1)
    """
    res = max(nums)
    cur_min, cur_max = 1, 1
    
    for n in nums:
        if n == 0:
            cur_min, cur_max = 1, 1
            continue
        tmp = cur_max * n
        cur_max = max(n * cur_max, n * cur_min, n)
        cur_min = min(tmp, n * cur_min, n)
        res = max(res, cur_max)
        
    return res`,
    optimalIntuition: 'Unlike addition where sums only grow with positive numbers, multiplication can turn a large negative product into a huge positive product when multiplied by another negative number. Thus, we must maintain BOTH current maximum product AND current minimum product at each step.',
    stepByStepLogic: [
      'Initialize `res = max(nums)` and `cur_min = cur_max = 1`.',
      'For each `n` in `nums`:',
      '  If `n == 0`, reset both `cur_min = cur_max = 1`.',
      '  Calculate new `cur_max` as `max(n * cur_max, n * cur_min, n)`.',
      '  Calculate new `cur_min` as `min(n * old_cur_max, n * cur_min, n)`.',
      '  Update global `res = max(res, cur_max)`.',
      'Return `res`.'
    ],
    complexity: {
      time: 'O(N)',
      space: 'O(1)',
      timeExplanation: 'Single linear scan.',
      spaceExplanation: 'Constant O(1) variables.'
    },
    commonPitfalls: ['Overwriting `cur_max` before computing `cur_min`, which corrupts the math. Use a temporary variable or simultaneous tuple assignment.'],
    pythonicTips: ['`cur_max, cur_min = max(n, n*cur_max, n*cur_min), min(n, n*cur_max, n*cur_min)` works cleanly with tuple packing.'],
    testCases: [
      { input: '[2, 3, -2, 4]', expected: '6' },
      { input: '[-2, 0, -1]', expected: '0' },
      { input: '[-2, 3, -4]', expected: '24' }
    ],
    tags: ['Dynamic Programming', 'Array', 'Medium']
  },

  // DAY 34 - Binary Search
  {
    id: 'find-minimum-in-rotated-sorted-array',
    day: 34,
    isCore: false,
    title: 'Find Minimum in Rotated Sorted Array',
    category: 'Binary Search',
    difficulty: 'Medium',
    leetcodeNumber: 153,
    leetcodeUrl: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/',
    companies: ['Amazon', 'Microsoft', 'Apple', 'Meta', 'Goldman Sachs'],
    description: 'Suppose an array of length `n` sorted in ascending order is rotated between 1 and `n` times. Given the sorted rotated array `nums` of unique elements, return the minimum element of this array in `O(log N)` time.',
    examples: [
      { input: 'nums = [3,4,5,1,2]', output: '1', explanation: 'Original was [1,2,3,4,5] rotated 3 times.' },
      { input: 'nums = [4,5,6,7,0,1,2]', output: '0' },
      { input: 'nums = [11,13,15,17]', output: '11' }
    ],
    constraints: ['n == nums.length', '1 <= n <= 5000', '-5000 <= nums[i] <= 5000', 'All integers in nums are unique'],
    starterCode: `def find_min(nums: list[int]) -> int:
    # Write your O(log N) binary search here:
    pass`,
    solutionCode: `def find_min(nums: list[int]) -> int:
    """
    Binary search comparing middle element with right pointer
    Time Complexity: O(log N)
    Space Complexity: O(1)
    """
    left, right = 0, len(nums) - 1
    
    while left < right:
        mid = (left + right) // 2
        # If mid element is greater than rightmost element, min must be in right half
        if nums[mid] > nums[right]:
            left = mid + 1
        else:
            # Min is at mid or in left half
            right = mid
            
    return nums[left]`,
    optimalIntuition: 'In a rotated sorted array with unique elements, comparing `nums[mid]` with `nums[right]` reveals which half contains the inflection point (the minimum). If `nums[mid] > nums[right]`, the drop happens in the right half (`left = mid + 1`). Otherwise, the minimum is in the left half or is `mid` itself (`right = mid`).',
    stepByStepLogic: [
      'Initialize `left = 0`, `right = len(nums) - 1`.',
      'While `left < right`:',
      '  Compute `mid = (left + right) // 2`.',
      '  If `nums[mid] > nums[right]`: set `left = mid + 1`.',
      '  Else: set `right = mid`.',
      'Return `nums[left]`.'
    ],
    complexity: {
      time: 'O(log N)',
      space: 'O(1)',
      timeExplanation: 'Binary search halves the search space each iteration.',
      spaceExplanation: 'Constant auxiliary space.'
    },
    commonPitfalls: ['Comparing `nums[mid]` against `nums[left]` instead of `nums[right]`. When the array is not rotated (already sorted), comparing with `left` leads to wrong branch decisions.'],
    pythonicTips: ['Using `while left < right` and `right = mid` converges cleanly on the exact index without off-by-one edge cases.'],
    testCases: [
      { input: '[3, 4, 5, 1, 2]', expected: '1' },
      { input: '[4, 5, 6, 7, 0, 1, 2]', expected: '0' },
      { input: '[11, 13, 15, 17]', expected: '11' }
    ],
    tags: ['Binary Search', 'Array', 'Medium']
  },

  // DAY 35 - Trees
  {
    id: 'subtree-of-another-tree',
    day: 35,
    isCore: false,
    title: 'Subtree of Another Tree',
    category: 'Trees',
    difficulty: 'Easy',
    leetcodeNumber: 572,
    leetcodeUrl: 'https://leetcode.com/problems/subtree-of-another-tree/',
    companies: ['Amazon', 'Meta', 'Microsoft', 'Google', 'Bloomberg'],
    description: 'Given the roots of two binary trees `root` and `subRoot`, return `true` if there is a subtree of `root` with the same structure and node values of `subRoot` and `false` otherwise.\n\nA subtree of a binary tree `tree` is a tree that consists of a node in `tree` and all of this node\'s descendants.',
    examples: [
      { input: 'root = [3,4,5,1,2], subRoot = [4,1,2]', output: 'true' },
      { input: 'root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]', output: 'false' }
    ],
    constraints: ['The number of nodes in root is in [1, 2000]', 'The number of nodes in subRoot is in [1, 1000]', '-10^4 <= root.val, subRoot.val <= 10^4'],
    starterCode: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def is_subtree(root: TreeNode | None, subRoot: TreeNode | None) -> bool:
    """
    Check if subRoot is identical to any subtree in root.
    """
    # Write your recursive solution here:
    pass`,
    solutionCode: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def is_subtree(root: TreeNode | None, subRoot: TreeNode | None) -> bool:
    """
    Recursive Tree Matching with is_same_tree helper
    Time Complexity: O(N * M) where N = nodes in root, M = nodes in subRoot
    Space Complexity: O(H) recursion stack depth
    """
    def is_same_tree(p: TreeNode | None, q: TreeNode | None) -> bool:
        if not p and not q:
            return True
        if not p or not q or p.val != q.val:
            return False
        return is_same_tree(p.left, q.left) and is_same_tree(p.right, q.right)

    if not subRoot:
        return True
    if not root:
        return False
        
    if is_same_tree(root, subRoot):
        return True
        
    return is_subtree(root.left, subRoot) or is_subtree(root.right, subRoot)`,
    optimalIntuition: 'An empty `subRoot` is always a subtree. For non-empty trees, at any node in `root`, we check if the tree rooted here is identical to `subRoot` using a helper `is_same_tree()`. If not, we recursively test whether `subRoot` is a subtree of the left child or the right child!',
    stepByStepLogic: [
      'Define helper `is_same_tree(p, q)` that verifies both trees have identical structure and values.',
      'Base cases: if `not subRoot`, return `True`. If `not root`, return `False`.',
      'If `is_same_tree(root, subRoot)` is true, return `True`.',
      'Otherwise return `is_subtree(root.left, subRoot) or is_subtree(root.right, subRoot)`.'
    ],
    complexity: {
      time: 'O(N * M)',
      space: 'O(H_root)',
      timeExplanation: 'For each node in root, we may inspect up to M nodes in subRoot.',
      spaceExplanation: 'Call stack proportional to height of root tree.'
    },
    commonPitfalls: ['Checking if values are equal without confirming left and right subtrees match identically.'],
    pythonicTips: ['Using boolean short-circuit `is_subtree(left) or is_subtree(right)` stops searching as soon as a match is found.'],
    visualizerType: 'tree',
    testCases: [
      { input: 'root = [3,4,5,1,2], subRoot = [4,1,2]', expected: 'true' },
      { input: 'root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]', expected: 'false' }
    ],
    tags: ['Trees', 'DFS', 'Recursion', 'Blind 75', 'Easy']
  },

  // DAY 36 - Sliding Window
  {
    id: 'longest-repeating-character-replacement',
    day: 36,
    isCore: false,
    title: 'Longest Repeating Character Replacement',
    category: 'Sliding Window',
    difficulty: 'Medium',
    leetcodeNumber: 424,
    leetcodeUrl: 'https://leetcode.com/problems/longest-repeating-character-replacement/',
    companies: ['Amazon', 'Google', 'Meta', 'Uber'],
    description: 'You are given a string `s` and an integer `k`. You can choose any character of the string and change it to any other uppercase English character at most `k` times. Return the length of the longest substring containing the same letter you can get after performing the above operations.',
    examples: [
      { input: 's = "ABAB", k = 2', output: '4', explanation: 'Replace the two \'A\'s with \'B\'s or vice versa.' },
      { input: 's = "AABABBA", k = 1', output: '4', explanation: 'Replace middle \'A\' with \'B\' to form "AABBBBA" -> length 4.' }
    ],
    constraints: ['1 <= s.length <= 10^5', 's consists of only uppercase English letters', '0 <= k <= s.length'],
    starterCode: `def character_replacement(s: str, k: int) -> int:
    # Write your sliding window solution:
    pass`,
    solutionCode: `from collections import defaultdict

def character_replacement(s: str, k: int) -> int:
    """
    Sliding Window with Max Frequency Tracking
    Window condition: (window_length - max_frequency) <= k
    Time Complexity: O(N)
    Space Complexity: O(26) = O(1)
    """
    count = defaultdict(int)
    max_f = 0
    left = 0
    res = 0
    
    for right in range(len(s)):
        count[s[right]] += 1
        max_f = max(max_f, count[s[right]])
        
        # If characters to replace exceeds k, shrink window from left
        while (right - left + 1) - max_f > k:
            count[s[left]] -= 1
            left += 1
            
        res = max(res, right - left + 1)
        
    return res`,
    optimalIntuition: 'For any window of length `L`, the minimum number of replacements needed to make all characters identical is `L - max_frequency`. If `(right - left + 1) - max_freq <= k`, the window is valid. Otherwise, we increment `left` to shrink it back to a valid size.',
    stepByStepLogic: [
      'Use a dictionary `count` to track frequencies in the window.',
      'Track `max_f`, the maximum frequency of any single character seen so far in the window.',
      'Expand `right` pointer and update frequency.',
      'While `(right - left + 1) - max_f > k`, decrement `count[s[left]]` and increment `left`.',
      'Record `res = max(res, right - left + 1)` and return at the end.'
    ],
    complexity: {
      time: 'O(N)',
      space: 'O(1)',
      timeExplanation: 'Both left and right pointers traverse string at most once.',
      spaceExplanation: 'Character count map stores at most 26 uppercase letters.'
    },
    commonPitfalls: ['Attempting to recompute `max_f` across all 26 letters every time `left` moves; keeping the historical `max_f` is sufficient because a smaller `max_f` would never produce a longer window anyway.'],
    pythonicTips: ['`defaultdict(int)` eliminates boilerplate key initialization.'],
    testCases: [
      { input: '"ABAB", 2', expected: '4' },
      { input: '"AABABBA", 1', expected: '4' }
    ],
    tags: ['Sliding Window', 'Hash Table', 'String', 'Medium']
  },

  // DAY 37 - Sliding Window
  {
    id: 'minimum-window-substring',
    day: 37,
    isCore: false,
    title: 'Minimum Window Substring',
    category: 'Sliding Window',
    difficulty: 'Hard',
    leetcodeNumber: 76,
    leetcodeUrl: 'https://leetcode.com/problems/minimum-window-substring/',
    companies: ['Meta', 'Amazon', 'Google', 'Microsoft', 'Airbnb', 'Lyft'],
    description: 'Given two strings `s` and `t` of lengths `m` and `n` respectively, return the minimum window substring of `s` such that every character in `t` (including duplicates) is included in the window. If there is no such substring, return the empty string `""`.',
    examples: [
      { input: 's = "ADOBECODEBANC", t = "ABC"', output: '"BANC"' },
      { input: 's = "a", t = "a"', output: '"a"' },
      { input: 's = "a", t = "aa"', output: '""' }
    ],
    constraints: ['m == s.length', 'n == t.length', '1 <= m, n <= 10^5', 's and t consist of uppercase and lowercase English letters'],
    starterCode: `def min_window(s: str, t: str) -> str:
    # Write your O(M + N) sliding window solution:
    pass`,
    solutionCode: `from collections import Counter, defaultdict

def min_window(s: str, t: str) -> str:
    """
    Sliding Window with have/need condition matching
    Time Complexity: O(M + N)
    Space Complexity: O(M + N)
    """
    if not t or not s:
        return ""
        
    count_t = Counter(t)
    window = defaultdict(int)
    
    have, need = 0, len(count_t)
    res, res_len = [-1, -1], float("inf")
    left = 0
    
    for right in range(len(s)):
        c = s[right]
        window[c] += 1
        
        if c in count_t and window[c] == count_t[c]:
            have += 1
            
        while have == need:
            # Update our smallest window
            if (right - left + 1) < res_len:
                res = [left, right]
                res_len = right - left + 1
                
            # Pop from left of window to minimize
            window[s[left]] -= 1
            if s[left] in count_t and window[s[left]] < count_t[s[left]]:
                have -= 1
            left += 1
            
    l, r = res
    return s[l : r + 1] if res_len != float("inf") else ""`,
    optimalIntuition: 'We count characters required from `t` in `count_t`. We maintain two variables `have` and `need` representing how many unique character requirement counts are satisfied. Once `have == need`, we greedily shrink from `left` while recording the minimal window!',
    stepByStepLogic: [
      'Count frequencies of `t` with `count_t = Counter(t)`, `need = len(count_t)`, `have = 0`.',
      'Iterate `right` pointer over `s`, adding characters to `window`.',
      'If character count matches required count in `count_t`, increment `have`.',
      'While `have == need`: update `res` if current window is smaller, then shrink `left` by decrementing `window[s[left]]` and adjusting `have`.',
      'Return substring `s[l:r+1]` or empty string.'
    ],
    complexity: {
      time: 'O(M + N)',
      space: 'O(M + N)',
      timeExplanation: 'Both left and right pointers visit each character in s at most twice, plus O(N) to build count_t.',
      spaceExplanation: 'Maps hold character counts.'
    },
    commonPitfalls: ['Comparing `have` to `len(t)` instead of `len(count_t)` (number of unique characters with fulfilled frequencies).'],
    pythonicTips: ['`Counter(t)` and `defaultdict(int)` make frequency matching seamless and robust.'],
    testCases: [
      { input: '"ADOBECODEBANC", "ABC"', expected: '"BANC"' },
      { input: '"a", "a"', expected: '"a"' },
      { input: '"a", "aa"', expected: '""' }
    ],
    tags: ['Sliding Window', 'Hash Table', 'String', 'Hard']
  },

  // DAY 38 - Trees
  {
    id: 'lowest-common-ancestor-of-a-binary-search-tree',
    day: 38,
    isCore: false,
    title: 'Lowest Common Ancestor of a BST',
    category: 'Trees',
    difficulty: 'Medium',
    leetcodeNumber: 235,
    leetcodeUrl: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/',
    companies: ['Amazon', 'Microsoft', 'Meta', 'Google', 'LinkedIn'],
    description: 'Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes `p` and `q`.\n\nAccording to the definition of LCA on Wikipedia: "The lowest common ancestor is defined between two nodes `p` and `q` as the lowest node in `T` that has both `p` and `q` as descendants (where we allow **a node to be a descendant of itself**)."',
    examples: [
      { input: 'root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8', output: '6', explanation: 'The LCA of nodes 2 and 8 is 6.' },
      { input: 'root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4', output: '2', explanation: 'The LCA of nodes 2 and 4 is 2, since a node can be a descendant of itself.' }
    ],
    constraints: ['The number of nodes in the tree is in the range [2, 10^5]', '-10^9 <= Node.val <= 10^9', 'All Node.val are unique', 'p != q', 'p and q will exist in the BST'],
    starterCode: `class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None

def lowest_common_ancestor(root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
    """
    Find LCA in Binary Search Tree in O(H) time and O(1) space.
    """
    # Write your solution here:
    pass`,
    solutionCode: `class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None

def lowest_common_ancestor(root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
    """
    Iterative BST Traversal exploiting BST ordering property
    Time Complexity: O(H) where H is tree height
    Space Complexity: O(1)
    """
    curr = root
    
    while curr:
        # If both p and q are greater than curr, LCA must be in right subtree
        if p.val > curr.val and q.val > curr.val:
            curr = curr.right
        # If both p and q are less than curr, LCA must be in left subtree
        elif p.val < curr.val and q.val < curr.val:
            curr = curr.left
        # Otherwise, the split point is found!
        else:
            return curr
            
    return root`,
    optimalIntuition: 'In a BST, all values left of `root` are smaller, and all right are larger. If both `p` and `q` are greater than current node, the split point (LCA) must be in the right subtree. If both are smaller, it is in the left. As soon as `p` and `q` diverge (or one equals current node), the current node is the LCA!',
    stepByStepLogic: [
      'Start pointer `curr = root`.',
      'If `p.val > curr.val` and `q.val > curr.val`, move `curr = curr.right`.',
      'If `p.val < curr.val` and `q.val < curr.val`, move `curr = curr.left`.',
      'Otherwise, `curr` is the exact split point where `p` and `q` branch off: return `curr` immediately.'
    ],
    complexity: {
      time: 'O(H)',
      space: 'O(1)',
      timeExplanation: 'We only traverse down a single path from root to LCA in at most O(H) steps.',
      spaceExplanation: 'Constant O(1) extra space with iterative pointer.'
    },
    commonPitfalls: ['Treating the tree as a generic binary tree and using DFS postorder traversal when BST property allows O(1) space traversal.'],
    pythonicTips: ['Using an iterative `while curr:` loop avoids recursion stack overhead.'],
    visualizerType: 'tree',
    testCases: [
      { input: 'root = [6,2,8,0,4,7,9], p = 2, q = 8', expected: '6' },
      { input: 'root = [6,2,8,0,4,7,9], p = 2, q = 4', expected: '2' }
    ],
    tags: ['Trees', 'Binary Search Tree', 'Blind 75', 'Medium']
  },

  // DAY 39 - Dynamic Programming / Strings
  {
    id: 'longest-palindromic-substring',
    day: 39,
    isCore: false,
    title: 'Longest Palindromic Substring',
    category: '1-D Dynamic Programming',
    difficulty: 'Medium',
    leetcodeNumber: 5,
    leetcodeUrl: 'https://leetcode.com/problems/longest-palindromic-substring/',
    companies: ['Amazon', 'Microsoft', 'Google', 'Meta', 'Apple'],
    description: 'Given a string `s`, return the longest palindromic substring in `s`.',
    examples: [
      { input: 's = "babad"', output: '"bab"', explanation: '"aba" is also a valid answer.' },
      { input: 's = "cbbd"', output: '"bb"' }
    ],
    constraints: ['1 <= s.length <= 1000', 's consist of only digits and English letters'],
    starterCode: `def longest_palindrome(s: str) -> str:
    # Write your expand around center solution:
    pass`,
    solutionCode: `def longest_palindrome(s: str) -> str:
    """
    Expand around center for both odd and even length palindromes
    Time Complexity: O(N^2)
    Space Complexity: O(1)
    """
    res = ""
    res_len = 0
    
    def expand(l: int, r: int) -> str:
        while l >= 0 and r < len(s) and s[l] == s[r]:
            l -= 1
            r += 1
        return s[l + 1 : r]
        
    for i in range(len(s)):
        # Odd length palindrome (center is s[i])
        p1 = expand(i, i)
        if len(p1) > res_len:
            res = p1
            res_len = len(p1)
            
        # Even length palindrome (center between s[i] and s[i+1])
        p2 = expand(i, i + 1)
        if len(p2) > res_len:
            res = p2
            res_len = len(p2)
            
    return res`,
    optimalIntuition: 'Every palindrome has a center. There are 2N - 1 possible centers (N single characters for odd palindromes and N-1 character pairs for even palindromes). Expanding outwards from each center takes O(N), giving an optimal O(N^2) time and O(1) space solution!',
    stepByStepLogic: [
      'Define helper `expand(l, r)` that expands pointers outward as long as `s[l] == s[r]`.',
      'For each index `i` from `0` to `len(s) - 1`:',
      '  Expand odd palindrome around `(i, i)`.',
      '  Expand even palindrome around `(i, i + 1)`.',
      '  Keep track of longest string found.',
      'Return `res`.'
    ],
    complexity: {
      time: 'O(N^2)',
      space: 'O(1)',
      timeExplanation: '2N centers, each expands at most N/2 steps.',
      spaceExplanation: 'Constant extra space (excluding result slice).'
    },
    commonPitfalls: ['Forgetting even-length palindromes (like "abba" where center is between characters).'],
    pythonicTips: ['Helper functions nested inside the main function can capture `s` directly via closure.'],
    testCases: [
      { input: '"babad"', expected: '"bab"' },
      { input: '"cbbd"', expected: '"bb"' }
    ],
    tags: ['Two Pointers', 'String', 'Dynamic Programming', 'Medium']
  },

  // DAY 40 - Dynamic Programming / Strings
  {
    id: 'palindromic-substrings',
    day: 40,
    isCore: false,
    title: 'Palindromic Substrings',
    category: '1-D Dynamic Programming',
    difficulty: 'Medium',
    leetcodeNumber: 647,
    leetcodeUrl: 'https://leetcode.com/problems/palindromic-substrings/',
    companies: ['Meta', 'Amazon', 'Google', 'LinkedIn'],
    description: 'Given a string `s`, return the number of palindromic substrings in it. A substring is a contiguous sequence of characters within the string.',
    examples: [
      { input: 's = "abc"', output: '3', explanation: 'Three palindromic strings: "a", "b", "c".' },
      { input: 's = "aaa"', output: '6', explanation: 'Six palindromic strings: "a", "a", "a", "aa", "aa", "aaa".' }
    ],
    constraints: ['1 <= s.length <= 1000', 's consists of lowercase English letters'],
    starterCode: `def count_substrings(s: str) -> int:
    # Write your solution counting all palindromic substrings:
    pass`,
    solutionCode: `def count_substrings(s: str) -> int:
    """
    Expand Around Center and count valid expansions
    Time Complexity: O(N^2)
    Space Complexity: O(1)
    """
    count = 0
    
    def count_palindromes(l: int, r: int) -> int:
        c = 0
        while l >= 0 and r < len(s) and s[l] == s[r]:
            c += 1
            l -= 1
            r += 1
        return c
        
    for i in range(len(s)):
        count += count_palindromes(i, i)      # Odd length
        count += count_palindromes(i, i + 1)  # Even length
        
    return count`,
    optimalIntuition: 'Similar to finding the longest palindrome, expand outward from all 2N - 1 centers. Each successful expansion step represents exactly one valid palindromic substring. Increment count on each step!',
    stepByStepLogic: [
      'Initialize `count = 0`.',
      'For each index `i`:',
      '  Count all odd-length palindromes expanding from `(i, i)`.',
      '  Count all even-length palindromes expanding from `(i, i + 1)`.',
      'Return total `count`.'
    ],
    complexity: {
      time: 'O(N^2)',
      space: 'O(1)',
      timeExplanation: 'Expanding from each center takes O(N) in worst case.',
      spaceExplanation: 'Constant auxiliary space.'
    },
    commonPitfalls: ['Attempting O(N^3) brute-force checking every substring with `sub == sub[::-1]`.'],
    pythonicTips: ['Summing function calls directly `sum(count_palindromes(i, i) + count_palindromes(i, i+1) for i in range(len(s)))` is a clean one-liner.'],
    testCases: [
      { input: '"abc"', expected: '3' },
      { input: '"aaa"', expected: '6' }
    ],
    tags: ['Two Pointers', 'String', 'Medium']
  },

  // DAY 41 - Linked List
  {
    id: 'remove-nth-node-from-end-of-list',
    day: 41,
    isCore: false,
    title: 'Remove Nth Node From End of List',
    category: 'Linked List',
    difficulty: 'Medium',
    leetcodeNumber: 19,
    leetcodeUrl: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/',
    companies: ['Amazon', 'Meta', 'Google', 'Microsoft', 'Apple'],
    description: 'Given the `head` of a linked list, remove the `n`-th node from the end of the list and return its head in one pass.',
    examples: [
      { input: 'head = [1,2,3,4,5], n = 2', output: '[1,2,3,5]' },
      { input: 'head = [1], n = 1', output: '[]' },
      { input: 'head = [1,2], n = 1', output: '[1]' }
    ],
    constraints: ['The number of nodes in the list is sz', '1 <= sz <= 30', '0 <= Node.val <= 100', '1 <= n <= sz'],
    starterCode: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def remove_nth_from_end(head: ListNode, n: int) -> ListNode:
    # Write your one-pass two-pointer solution:
    pass`,
    solutionCode: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def remove_nth_from_end(head: ListNode, n: int) -> ListNode:
    """
    Two Pointers with Dummy Node with n-gap offset
    Time Complexity: O(N) - single pass
    Space Complexity: O(1)
    """
    dummy = ListNode(0, head)
    left = dummy
    right = head
    
    # Advance right pointer n steps ahead
    for _ in range(n):
        if right:
            right = right.next
            
    # Move both until right reaches past end
    while right:
        left = left.next
        right = right.next
        
    # Delete the target node
    left.next = left.next.next
    
    return dummy.next`,
    optimalIntuition: 'By placing `right` pointer `n` nodes ahead of `left` pointer and moving them at the same speed, when `right` reaches `None` (end of list), `left` will be pointing directly at the node right before the one to be deleted!',
    stepByStepLogic: [
      'Create a `dummy = ListNode(0, head)` to safely handle deleting the head node.',
      'Initialize `left = dummy` and `right = head`.',
      'Advance `right` pointer `n` times.',
      'Advance both `left` and `right` until `right` is `None`.',
      'Remove target node: `left.next = left.next.next`.',
      'Return `dummy.next`.'
    ],
    complexity: {
      time: 'O(N)',
      space: 'O(1)',
      timeExplanation: 'Single pass of length N.',
      spaceExplanation: 'Constant pointer manipulation.'
    },
    commonPitfalls: ['Removing the head node without a dummy node leads to null pointer exceptions or special-case if-statements.'],
    pythonicTips: ['Always use `dummy = ListNode(0, head)` in linked list removal and reordering problems.'],
    testCases: [
      { input: '[1, 2, 3, 4, 5], 2', expected: '[1, 2, 3, 5]' },
      { input: '[1], 1', expected: '[]' }
    ],
    tags: ['Linked List', 'Two Pointers', 'Medium']
  },

  // DAY 42 - Linked List
  {
    id: 'linked-list-cycle',
    day: 42,
    isCore: false,
    title: 'Linked List Cycle (Floyd\'s Tortoise and Hare)',
    category: 'Linked List',
    difficulty: 'Easy',
    leetcodeNumber: 141,
    leetcodeUrl: 'https://leetcode.com/problems/linked-list-cycle/',
    companies: ['Amazon', 'Microsoft', 'Apple', 'Spotify'],
    description: 'Given `head`, the head of a linked list, determine if the linked list has a cycle in it. Return `true` if there is a cycle, otherwise `false`. Can you solve it using `O(1)` memory?',
    examples: [
      { input: 'head = [3,2,0,-4], pos = 1', output: 'true', explanation: 'There is a cycle where tail connects to 1st node (0-indexed).' },
      { input: 'head = [1,2], pos = 0', output: 'true' },
      { input: 'head = [1], pos = -1', output: 'false' }
    ],
    constraints: ['The number of the nodes in the list is in the range [0, 10^4]', '-10^5 <= Node.val <= 10^5'],
    starterCode: `class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None

def has_cycle(head: ListNode) -> bool:
    # Write your Floyd's cycle detection solution:
    pass`,
    solutionCode: `class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None

def has_cycle(head: ListNode) -> bool:
    """
    Floyd's Tortoise and Hare (Slow and Fast Pointers)
    Time Complexity: O(N)
    Space Complexity: O(1)
    """
    slow, fast = head, head
    
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
            
    return False`,
    optimalIntuition: 'If there is a cycle in a circular track, a runner running twice as fast as another will inevitably catch up and lap the slower runner (`slow == fast`). If fast reaches `None`, no cycle exists.',
    stepByStepLogic: [
      'Initialize `slow = head` and `fast = head`.',
      'While `fast` and `fast.next` are not `None`:',
      '  Move `slow` one step: `slow = slow.next`.',
      '  Move `fast` two steps: `fast = fast.next.next`.',
      '  If `slow == fast`: cycle detected, return `True`.',
      'If loop terminates, return `False`.'
    ],
    complexity: {
      time: 'O(N)',
      space: 'O(1)',
      timeExplanation: 'Fast pointer covers distance in at most O(N) steps.',
      spaceExplanation: 'Only two pointers, O(1) space.'
    },
    commonPitfalls: ['Using a visited hash set `seen.add(node)` costs O(N) extra memory, failing constant space requirements.'],
    pythonicTips: ['Always check `while fast and fast.next:` to avoid `AttributeError: NoneType has no attribute next`.'],
    testCases: [
      { input: '[3, 2, 0, -4] (pos=1)', expected: 'True' },
      { input: '[1] (pos=-1)', expected: 'False' }
    ],
    tags: ['Linked List', 'Two Pointers', 'Easy']
  },

  // DAY 43 - Heap / Priority Queue
  {
    id: 'merge-k-sorted-lists',
    day: 43,
    isCore: false,
    title: 'Merge k Sorted Lists',
    category: 'Heap / Priority Queue',
    difficulty: 'Hard',
    leetcodeNumber: 23,
    leetcodeUrl: 'https://leetcode.com/problems/merge-k-sorted-lists/',
    companies: ['Amazon', 'Meta', 'Google', 'Microsoft', 'Apple', 'Uber'],
    description: 'You are given an array of `k` linked-lists `lists`, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.',
    examples: [
      { input: 'lists = [[1,4,5],[1,3,4],[2,6]]', output: '[1,1,2,3,4,4,5,6]' },
      { input: 'lists = []', output: '[]' }
    ],
    constraints: ['k == lists.length', '0 <= k <= 10^4', '0 <= lists[i].length <= 500', '-10^4 <= lists[i][j] <= 10^4'],
    starterCode: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def merge_k_lists(lists: list[ListNode]) -> ListNode:
    # Write your Min-Heap or Divide & Conquer solution:
    pass`,
    solutionCode: `import heapq

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def merge_k_lists(lists: list[ListNode]) -> ListNode:
    """
    Min-Heap Priority Queue approach
    Time Complexity: O(N log K) where N is total nodes and K is number of lists
    Space Complexity: O(K) for heap
    """
    heap = []
    
    # Push the head of each non-empty list into heap (val, list_index, node)
    for i, head in enumerate(lists):
        if head:
            heapq.heappush(heap, (head.val, i, head))
            
    dummy = ListNode(0)
    curr = dummy
    
    while heap:
        val, i, node = heapq.heappop(heap)
        curr.next = node
        curr = curr.next
        
        if node.next:
            heapq.heappush(heap, (node.next.val, i, node.next))
            
    return dummy.next`,
    optimalIntuition: 'At any point, the next smallest element must be among the current heads of the `k` lists. Maintaining a Min-Heap of size `k` allows us to extract the absolute minimum in O(log k) time and push the next node from that list!',
    stepByStepLogic: [
      'Initialize `heap = []`.',
      'Push tuple `(head.val, i, head)` for each non-empty list head.',
      'Pop minimum node from heap, attach to merged list via `curr.next`.',
      'If popped node has a `.next`, push `(node.next.val, i, node.next)` into heap.',
      'Repeat until heap is empty. Return `dummy.next`.'
    ],
    complexity: {
      time: 'O(N log K)',
      space: 'O(K)',
      timeExplanation: 'N total nodes extracted, heap push/pop takes log K time.',
      spaceExplanation: 'Heap contains at most K nodes at any time.'
    },
    commonPitfalls: ['In Python 3, pushing `(head.val, head)` into heap causes comparison error `TypeError: < not supported between instances of ListNode` when values are equal. Adding unique index `i` resolves this tie-breaker cleanly!'],
    pythonicTips: ['Using `(node.val, i, node)` tuple avoids needing custom `__lt__` method on ListNode.'],
    testCases: [
      { input: '[[1,4,5],[1,3,4],[2,6]]', expected: '[1, 1, 2, 3, 4, 4, 5, 6]' },
      { input: '[]', expected: '[]' }
    ],
    tags: ['Heap', 'Linked List', 'Divide and Conquer', 'Hard']
  },

  // DAY 44 - Trees
  {
    id: 'construct-binary-tree-from-preorder-and-inorder-traversal',
    day: 44,
    isCore: false,
    title: 'Construct Binary Tree from Preorder & Inorder',
    category: 'Trees',
    difficulty: 'Medium',
    leetcodeNumber: 105,
    leetcodeUrl: 'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/',
    companies: ['Amazon', 'Microsoft', 'Google', 'Meta'],
    description: 'Given two integer arrays `preorder` and `inorder` where `preorder` is the preorder traversal of a binary tree and `inorder` is the inorder traversal of the same tree, construct and return the binary tree.',
    examples: [
      { input: 'preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]', output: '[3,9,20,null,null,15,7]' },
      { input: 'preorder = [-1], inorder = [-1]', output: '[-1]' }
    ],
    constraints: ['1 <= preorder.length <= 3000', 'inorder.length == preorder.length', 'preorder and inorder consist of unique values'],
    starterCode: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def build_tree(preorder: list[int], inorder: list[int]) -> TreeNode:
    # Write your recursive tree construction solution:
    pass`,
    solutionCode: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def build_tree(preorder: list[int], inorder: list[int]) -> TreeNode:
    """
    Hash Map for O(1) inorder index lookups + Recursion
    Time Complexity: O(N)
    Space Complexity: O(N)
    """
    in_map = {val: i for i, val in enumerate(inorder)}
    pre_idx = 0
    
    def helper(left: int, right: int) -> TreeNode:
        nonlocal pre_idx
        if left > right:
            return None
            
        root_val = preorder[pre_idx]
        pre_idx += 1
        root = TreeNode(root_val)
        
        mid = in_map[root_val]
        root.left = helper(left, mid - 1)
        root.right = helper(mid + 1, right)
        
        return root
        
    return helper(0, len(inorder) - 1)`,
    optimalIntuition: 'The first element in `preorder` is always the root. In `inorder`, all elements to the left of root belong to the left subtree, and all elements to the right belong to the right subtree. We map values to indices with a hash map for instant O(1) subtree boundary partitioning!',
    stepByStepLogic: [
      'Create `in_map = {val: i for i, val in enumerate(inorder)}`.',
      'Track global `pre_idx = 0`.',
      'In `helper(left, right)`:',
      '  If `left > right`: return `None`.',
      '  `root_val = preorder[pre_idx]`; increment `pre_idx`.',
      '  Split point `mid = in_map[root_val]`.',
      '  `root.left = helper(left, mid - 1)`.',
      '  `root.right = helper(mid + 1, right)`.',
      '  Return `root`.'
    ],
    complexity: {
      time: 'O(N)',
      space: 'O(N)',
      timeExplanation: 'Each node is processed once with O(1) index lookups.',
      spaceExplanation: 'O(N) for hash map and recursion stack.'
    },
    commonPitfalls: ['Using `inorder.index(root_val)` and slicing `preorder[1:mid+1]` copies arrays on every step, degrading performance to O(N^2).'],
    pythonicTips: ['Using pointer indices `(left, right)` and `nonlocal pre_idx` avoids list slicing memory allocations.'],
    testCases: [
      { input: '[3,9,20,15,7], [9,3,15,20,7]', expected: 'Root 3 with left 9, right 20' }
    ],
    tags: ['Trees', 'Binary Tree', 'Divide and Conquer', 'Medium']
  },

  // DAY 45 - Trees
  {
    id: 'validate-binary-search-tree',
    day: 45,
    isCore: false,
    title: 'Validate Binary Search Tree',
    category: 'Trees',
    difficulty: 'Medium',
    leetcodeNumber: 98,
    leetcodeUrl: 'https://leetcode.com/problems/validate-binary-search-tree/',
    companies: ['Amazon', 'Meta', 'Microsoft', 'Bloomberg', 'Google'],
    description: 'Given the `root` of a binary tree, determine if it is a valid binary search tree (BST). A valid BST satisfies: left subtree nodes are strictly less than root, right subtree nodes are strictly greater than root, and both subtrees must also be BSTs.',
    examples: [
      { input: 'root = [2,1,3]', output: 'true' },
      { input: 'root = [5,1,4,null,null,3,6]', output: 'false', explanation: 'Root is 5, but its right child\'s value is 4.' }
    ],
    constraints: ['The number of nodes in the tree is in the range [1, 10^4]', '-2^31 <= Node.val <= 2^31 - 1'],
    starterCode: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def is_valid_bst(root: TreeNode) -> bool:
    # Write your validation solution:
    pass`,
    solutionCode: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def is_valid_bst(root: TreeNode) -> bool:
    """
    Recursive DFS with valid (min_val, max_val) boundaries
    Time Complexity: O(N)
    Space Complexity: O(H) where H is tree height
    """
    def validate(node: TreeNode, low: float, high: float) -> bool:
        if not node:
            return True
        if not (low < node.val < high):
            return False
            
        return validate(node.left, low, node.val) and validate(node.right, node.val, high)
        
    return validate(root, float("-inf"), float("inf"))`,
    optimalIntuition: 'It is not enough for `node.left.val < node.val`. Every node in the left subtree must also be strictly less than all ancestor boundaries. We pass valid range `(low, high)` down the recursion: left child must be in `(low, node.val)` and right child in `(node.val, high)`.',
    stepByStepLogic: [
      'Define `validate(node, low, high)`.',
      'If `node is None`: return `True`.',
      'If not `low < node.val < high`: return `False`.',
      'Recursively check `validate(node.left, low, node.val)` and `validate(node.right, node.val, high)`.',
      'Start with `(-inf, inf)` on root.'
    ],
    complexity: {
      time: 'O(N)',
      space: 'O(H)',
      timeExplanation: 'Visits every node exactly once.',
      spaceExplanation: 'Recursion stack up to tree height H.'
    },
    commonPitfalls: ['Only checking immediate children `node.left.val < node.val` (which misses deep violations like right subtree containing a node smaller than root).'],
    pythonicTips: ['`float("-inf")` and `float("inf")` provide unbounded numeric sentinels.'],
    testCases: [
      { input: '[2, 1, 3]', expected: 'True' },
      { input: '[5, 1, 4, null, null, 3, 6]', expected: 'False' }
    ],
    tags: ['Trees', 'BST', 'DFS', 'Medium']
  }
];
