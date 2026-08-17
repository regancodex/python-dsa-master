import { Problem, CurriculumTrack } from '../types/dsa';
import { EXTENDED_BLIND75_PROBLEMS } from './extendedBlind75Data';
import { EXTENDED_BLIND75_PROBLEMS_PART2 } from './extendedBlind75Part2';

export const CORE_30_PROBLEMS: Problem[] = [
  // DAY 1 - Arrays & Hashing
  {
    id: 'two-sum',
    day: 1,
    title: 'Two Sum',
    category: 'Arrays & Hashing',
    difficulty: 'Easy',
    leetcodeNumber: 1,
    leetcodeUrl: 'https://leetcode.com/problems/two-sum/',
    companies: ['Google', 'Amazon', 'Meta', 'Apple', 'Microsoft', 'Uber', 'Bloomberg'],
    description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have **exactly one solution**, and you may not use the same element twice. You can return the answer in any order.',
    examples: [
      {
        input: 'nums = [2, 7, 11, 15], target = 9',
        output: '[0, 1]',
        explanation: 'Because nums[0] + nums[1] == 2 + 7 == 9, we return indices [0, 1].'
      },
      {
        input: 'nums = [3, 2, 4], target = 6',
        output: '[1, 2]',
        explanation: 'nums[1] + nums[2] == 2 + 4 == 6, so we return [1, 2].'
      },
      {
        input: 'nums = [3, 3], target = 6',
        output: '[0, 1]',
        explanation: 'nums[0] + nums[3] == 3 + 3 == 6, indices [0, 1].'
      }
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.'
    ],
    starterCode: `def two_sum(nums: list[int], target: int) -> list[int]:
    """
    Find indices of the two numbers that add up to target.
    
    Time Constraint: O(N) single pass
    Space Constraint: O(N) hash map
    """
    # Write your optimal solution here:
    pass`,
    solutionCode: `def two_sum(nums: list[int], target: int) -> list[int]:
    """
    Optimal One-Pass Hash Map approach
    Time Complexity: O(N) - single pass scan through nums
    Space Complexity: O(N) - stores at most N elements in dictionary
    """
    seen: dict[int, int] = {}  # maps value -> index in nums
    
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
        
    return []`,
    bruteForceCode: `def two_sum_bruteforce(nums: list[int], target: int) -> list[int]:
    """
    Brute Force checking all pairs
    Time Complexity: O(N^2) - Nested loops (TLE on large arrays)
    Space Complexity: O(1)
    """
    n = len(nums)
    for i in range(n):
        for j in range(i + 1, n):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []`,
    optimalIntuition: 'The core mathematical insight is solving for the missing piece: `complement = target - num`. Instead of scanning the entire array again for the complement (which causes O(N^2) brute force), we store each visited number and its index in a Hash Map (`seen = {}`). Checking `if complement in seen` takes instant average O(1) time, slashing total runtime down to linear O(N)!',
    stepByStepLogic: [
      'Initialize an empty dictionary `seen = {}` to map each visited number to its index.',
      'Iterate through the array using `enumerate(nums)` to obtain both current index `i` and number `num`.',
      'Calculate the exact complement required: `complement = target - num`.',
      'Perform an instant O(1) lookup: `if complement in seen:`.',
      'If found: immediately return `[seen[complement], i]`. We are done!',
      'If not found: store current number and its index `seen[num] = i` so future elements can match with it.',
      'One pass guarantees all pairs are tested with no duplicate self-pairing.'
    ],
    complexity: {
      time: 'O(N)',
      space: 'O(N)',
      timeExplanation: 'We traverse the array of length N exactly once. Dictionary lookups and insertions in Python run in average O(1) time via optimized hash tables.',
      spaceExplanation: 'The hash map stores at most N key-value pairs in memory before finding the matching pair.'
    },
    commonPitfalls: [
      'Using the same element twice (e.g., if target is 6 and nums[0]=3, checking nums[0] against itself instead of ensuring distinct indices). One-pass check-before-insert prevents this cleanly!',
      'Building the complete map in pass 1 and searching in pass 2: when duplicate values exist (e.g., [3, 3] target 6), the second 3 overwrites the first 3 in the map. Single-pass handles duplicates effortlessly.',
      'Attempting Two-Pointers without sorting: Two-pointers from both ends only works on sorted arrays. Sorting unsorted arrays scrambles original indices and costs O(N log N).'
    ],
    pythonicTips: [
      'Use `enumerate(nums)` instead of `range(len(nums))` for cleaner Pythonic unpacking of index and value.',
      'In Python, `dict` lookups `val in seen` use fast open-addressing C-level hashing.',
      'Type hints like `seen: dict[int, int] = {}` make your code interview-grade for top tech companies.'
    ],
    visualizerType: 'hash-map',
    testCases: [
      { input: '[2, 7, 11, 15], 9', expected: '[0, 1]', explanation: '2 + 7 = 9 at indices [0, 1]' },
      { input: '[3, 2, 4], 6', expected: '[1, 2]', explanation: '2 + 4 = 6 at indices [1, 2]' },
      { input: '[3, 3], 6', expected: '[0, 1]', explanation: '3 + 3 = 6 at indices [0, 1]' },
      { input: '[1, 5, 8, 3], 8', expected: '[1, 3]', explanation: '5 + 3 = 8 at indices [1, 3]' }
    ],
    tags: ['Hash Map', 'Array', 'Easy', 'Blind 75', 'FAANG Classic']
  },

  // DAY 2 - Arrays & Hashing
  {
    id: 'contains-duplicate',
    day: 2,
    title: 'Contains Duplicate',
    category: 'Arrays & Hashing',
    difficulty: 'Easy',
    leetcodeNumber: 217,
    leetcodeUrl: 'https://leetcode.com/problems/contains-duplicate/',
    companies: ['Amazon', 'Apple', 'Adobe', 'Microsoft'],
    description: 'Given an integer array `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.',
    examples: [
      { input: 'nums = [1,2,3,1]', output: 'true' },
      { input: 'nums = [1,2,3,4]', output: 'false' },
      { input: 'nums = [1,1,1,3,3,4,3,2,4,2]', output: 'true' }
    ],
    constraints: [
      '1 <= nums.length <= 10^5',
      '-10^9 <= nums[i] <= 10^9'
    ],
    starterCode: `def contains_duplicate(nums: list[int]) -> bool:
    # Write your solution here
    pass`,
    solutionCode: `def contains_duplicate(nums: list[int]) -> bool:
    """
    Pythonic Set Length Comparison or Early-Exit Set
    Time Complexity: O(N)
    Space Complexity: O(N)
    """
    # Approach 1: Ultra-Pythonic one-liner
    # return len(nums) != len(set(nums))

    # Approach 2: Early exit with seen set
    seen = set()
    for num in nums:
        if num in seen:
            return True
        seen.add(num)
    return False`,
    optimalIntuition: 'A hash set only stores unique values. If we find a number already in our `seen` set, we can immediately return `True`. Alternatively, converting the list to `set(nums)` strips duplicates, so `len(nums) != len(set(nums))` proves duplicates exist.',
    stepByStepLogic: [
      'Initialize an empty set `seen`.',
      'Loop through each integer in `nums`.',
      'If the integer is present in `seen`, return `True` (early termination).',
      'Add the integer into `seen`.',
      'If the loop completes with no duplicates found, return `False`.'
    ],
    complexity: {
      time: 'O(N)',
      space: 'O(N)',
      timeExplanation: 'Iterating through N items with O(1) set lookups gives linear time.',
      spaceExplanation: 'The set stores up to N distinct elements in memory.'
    },
    commonPitfalls: [
      'Sorting the array first takes O(N log N) time; using a set is strictly faster O(N).'
    ],
    pythonicTips: [
      '`len(nums) != len(set(nums))` is idiomatic and implemented in C in CPython for fast execution.'
    ],
    visualizerType: 'hash-map',
    testCases: [
      { input: '[1, 2, 3, 1]', expected: 'True' },
      { input: '[1, 2, 3, 4]', expected: 'False' },
      { input: '[1, 1, 1, 3, 3, 4]', expected: 'True' }
    ],
    tags: ['Set', 'Hash Table', 'Array', 'Easy']
  },

  // DAY 3 - Arrays & Hashing
  {
    id: 'valid-anagram',
    day: 3,
    title: 'Valid Anagram',
    category: 'Arrays & Hashing',
    difficulty: 'Easy',
    leetcodeNumber: 242,
    leetcodeUrl: 'https://leetcode.com/problems/valid-anagram/',
    companies: ['Meta', 'Uber', 'Google', 'Bloomberg'],
    description: 'Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise. An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.',
    examples: [
      { input: 's = "anagram", t = "nagaram"', output: 'true' },
      { input: 's = "rat", t = "car"', output: 'false' }
    ],
    constraints: [
      '1 <= s.length, t.length <= 5 * 10^4',
      's and t consist of lowercase English letters.'
    ],
    starterCode: `def is_anagram(s: str, t: str) -> bool:
    # Write your solution here
    pass`,
    solutionCode: `from collections import Counter

def is_anagram(s: str, t: str) -> bool:
    """
    Frequency Count via collections.Counter or Fixed Array
    Time Complexity: O(N)
    Space Complexity: O(1) (since English alphabet is fixed 26 letters)
    """
    if len(s) != len(t):
        return False
        
    return Counter(s) == Counter(t)`,
    optimalIntuition: 'An anagram requires exact matching character frequency counts. First check if lengths differ (immediate `False`). Then use Python\'s built-in `Counter` or a frequency map to verify counts match in O(N) time.',
    stepByStepLogic: [
      'If `len(s) != len(t)`, return `False` immediately.',
      'Count the frequency of each character in `s` and in `t`.',
      'Compare both frequency mappings. If identical, return `True`, else `False`.'
    ],
    complexity: {
      time: 'O(N)',
      space: 'O(1)',
      timeExplanation: 'We count characters across string length N. Counter runs in linear time.',
      spaceExplanation: 'Max 26 lowercase English keys in the dictionary, so space is O(1).'
    },
    commonPitfalls: [
      'Sorting both strings `sorted(s) == sorted(t)` takes O(N log N) time, which is slower than frequency counting.'
    ],
    pythonicTips: [
      '`collections.Counter` from the standard library is highly optimized in C.'
    ],
    testCases: [
      { input: '"anagram", "nagaram"', expected: 'True' },
      { input: '"rat", "car"', expected: 'False' },
      { input: '"a", "ab"', expected: 'False' }
    ],
    tags: ['String', 'Hash Table', 'Counter', 'Easy']
  },

  // DAY 4 - Arrays & Hashing
  {
    id: 'group-anagrams',
    day: 4,
    title: 'Group Anagrams',
    category: 'Arrays & Hashing',
    difficulty: 'Medium',
    leetcodeNumber: 49,
    leetcodeUrl: 'https://leetcode.com/problems/group-anagrams/',
    companies: ['Amazon', 'Apple', 'Meta', 'Netflix', 'Salesforce'],
    description: 'Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.',
    examples: [
      {
        input: 'strs = ["eat","tea","tan","ate","nat","bat"]',
        output: '[["bat"],["nat","tan"],["ate","eat","tea"]]'
      },
      {
        input: 'strs = [""]',
        output: '[[""]]'
      },
      {
        input: 'strs = ["a"]',
        output: '[["a"]]'
      }
    ],
    constraints: [
      '1 <= strs.length <= 10^4',
      '0 <= strs[i].length <= 100',
      'strs[i] consists of lowercase English letters.'
    ],
    starterCode: `def group_anagrams(strs: list[str]) -> list[list[str]]:
    # Write your solution here
    pass`,
    solutionCode: `from collections import defaultdict

def group_anagrams(strs: list[str]) -> list[list[str]]:
    """
    Hash map with tuple of character count or sorted word as key
    Time Complexity: O(N * K) where K is max string length
    Space Complexity: O(N * K)
    """
    anagram_map = defaultdict(list)
    
    for s in strs:
        # Create a 26-element character count tuple as immutable hashable key
        count = [0] * 26
        for char in s:
            count[ord(char) - ord('a')] += 1
        anagram_map[tuple(count)].append(s)
        
    return list(anagram_map.values())`,
    optimalIntuition: 'All anagrams have the exact same character counts. A 26-element tuple of counts `(1, 0, 0, 1, ...)` or a sorted string `tuple(sorted(s))` can serve as a hash map key. Appending each word to its key groups them automatically in O(N * K) time!',
    stepByStepLogic: [
      'Create a `defaultdict(list)` named `anagram_map`.',
      'For each word `s` in `strs`, construct its character frequency signature `count = [0] * 26`.',
      'Convert `count` to an immutable `tuple` so it can be hashed as a dict key.',
      'Append `s` into `anagram_map[tuple(count)]`.',
      'Return `list(anagram_map.values())`.'
    ],
    complexity: {
      time: 'O(N * K)',
      space: 'O(N * K)',
      timeExplanation: 'N is the number of strings, and K is max string length. Counting 26 characters takes O(K) for each of the N words.',
      spaceExplanation: 'Storing all strings in the dictionary requires O(N * K) space.'
    },
    commonPitfalls: [
      'Lists cannot be dictionary keys in Python because lists are mutable; you must cast to `tuple(count)`.'
    ],
    pythonicTips: [
      '`collections.defaultdict(list)` eliminates manual checking `if key not in map`.'
    ],
    testCases: [
      { input: '["eat","tea","tan","ate","nat","bat"]', expected: '[["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]' }
    ],
    tags: ['Hash Table', 'String', 'Sorting', 'Medium']
  },

  // DAY 5 - Arrays & Hashing
  {
    id: 'top-k-frequent-elements',
    day: 5,
    title: 'Top K Frequent Elements',
    category: 'Arrays & Hashing',
    difficulty: 'Medium',
    leetcodeNumber: 347,
    leetcodeUrl: 'https://leetcode.com/problems/top-k-frequent-elements/',
    companies: ['Meta', 'Amazon', 'Microsoft', 'Bloomberg'],
    description: 'Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. You may return the answer in any order.',
    examples: [
      { input: 'nums = [1,1,1,2,2,3], k = 2', output: '[1,2]' },
      { input: 'nums = [1], k = 1', output: '[1]' }
    ],
    constraints: [
      '1 <= nums.length <= 10^5',
      'k is in the range [1, the number of unique elements in the array].',
      'It is guaranteed that the answer is unique.'
    ],
    starterCode: `def top_k_frequent(nums: list[int], k: int) -> list[int]:
    # Write your solution here
    pass`,
    solutionCode: `from collections import Counter

def top_k_frequent(nums: list[int], k: int) -> list[int]:
    """
    Bucket Sort Approach
    Time Complexity: O(N)
    Space Complexity: O(N)
    """
    count = Counter(nums)
    # buckets[f] contains all numbers with frequency f
    # max possible frequency is len(nums)
    buckets: list[list[int]] = [[] for _ in range(len(nums) + 1)]
    
    for num, freq in count.items():
        buckets[freq].append(num)
        
    result = []
    # Traverse buckets in descending order of frequency
    for freq in range(len(buckets) - 1, 0, -1):
        for num in buckets[freq]:
            result.append(num)
            if len(result) == k:
                return result
                
    return result`,
    optimalIntuition: 'Instead of sorting with O(N log N) or Min-Heap with O(N log K), we can use Bucket Sort! The maximum frequency of any number is bounded by `len(nums)`. We index buckets by frequency and collect numbers from highest frequency down to lowest until we have `k` elements in strict O(N) time.',
    stepByStepLogic: [
      'Count frequencies using `Counter(nums)`.',
      'Initialize an array of empty lists `buckets` of size `len(nums) + 1`.',
      'For each `(num, freq)`, append `num` into `buckets[freq]`.',
      'Iterate backwards from highest frequency bucket (`len(nums)`) to 1.',
      'Add numbers to `result` until `len(result) == k`.'
    ],
    complexity: {
      time: 'O(N)',
      space: 'O(N)',
      timeExplanation: 'Counting takes O(N). Populating buckets and scanning backwards takes O(N) total.',
      spaceExplanation: 'The frequency map and bucket lists take O(N) space.'
    },
    commonPitfalls: [
      'Forgetting that bucket size must be `len(nums) + 1` since frequency 0 to N are possible indices.'
    ],
    pythonicTips: [
      '`Counter(nums).most_common(k)` is a great built-in for quick scripts, but bucket sort provides true O(N) interview mastery.'
    ],
    testCases: [
      { input: '[1,1,1,2,2,3], 2', expected: '[1, 2]' },
      { input: '[1], 1', expected: '[1]' }
    ],
    tags: ['Bucket Sort', 'Hash Table', 'Heap', 'Medium']
  },

  // DAY 6 - Arrays & Hashing
  {
    id: 'product-of-array-except-self',
    day: 6,
    title: 'Product of Array Except Self',
    category: 'Arrays & Hashing',
    difficulty: 'Medium',
    leetcodeNumber: 238,
    leetcodeUrl: 'https://leetcode.com/problems/product-of-array-except-self/',
    companies: ['Amazon', 'Apple', 'Meta', 'Microsoft', 'Google', 'Asana'],
    description: 'Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`. The product of any prefix or suffix of `nums` is guaranteed to fit in a 32-bit integer. You must write an algorithm that runs in `O(N)` time and without using the division operation.',
    examples: [
      { input: 'nums = [1,2,3,4]', output: '[24,12,8,6]' },
      { input: 'nums = [-1,1,0,-3,3]', output: '[0,0,9,0,0]' }
    ],
    constraints: [
      '2 <= nums.length <= 10^5',
      '-30 <= nums[i] <= 30'
    ],
    starterCode: `def product_except_self(nums: list[int]) -> list[int]:
    # Write your O(N) solution with O(1) extra space (excluding output)
    pass`,
    solutionCode: `def product_except_self(nums: list[int]) -> list[int]:
    """
    Prefix and Suffix Running Products in O(1) Extra Space
    Time Complexity: O(N)
    Space Complexity: O(1) (excluding output array)
    """
    n = len(nums)
    res = [1] * n
    
    # Pass 1: compute prefix products
    prefix = 1
    for i in range(n):
        res[i] = prefix
        prefix *= nums[i]
        
    # Pass 2: multiply with suffix products backwards
    postfix = 1
    for i in range(n - 1, -1, -1):
        res[i] *= postfix
        postfix *= nums[i]
        
    return res`,
    optimalIntuition: 'For any index `i`, the product of all elements except `nums[i]` equals `(product of elements before i) * (product of elements after i)`. We do a forward pass to store running prefix products in `res`, then a backward pass to multiply by running postfix products, avoiding division and extra array allocations!',
    stepByStepLogic: [
      'Initialize `res` array of size `n` with 1s.',
      'Maintain `prefix = 1`. In forward loop `i` from `0` to `n-1`, set `res[i] = prefix`, then update `prefix *= nums[i]`.',
      'Maintain `postfix = 1`. In backward loop `i` from `n-1` down to `0`, multiply `res[i] *= postfix`, then update `postfix *= nums[i]`.',
      'Return `res`.'
    ],
    complexity: {
      time: 'O(N)',
      space: 'O(1)',
      timeExplanation: 'Two sequential passes over array of size N takes 2N = O(N) time.',
      spaceExplanation: 'Output array does not count toward auxiliary space complexity.'
    },
    commonPitfalls: [
      'Using division `total_product // nums[i]` fails when array contains zeros.'
    ],
    pythonicTips: [
      'Range step `-1` in `range(n - 1, -1, -1)` traverses backwards efficiently without creating reversed copies.'
    ],
    testCases: [
      { input: '[1, 2, 3, 4]', expected: '[24, 12, 8, 6]' },
      { input: '[-1, 1, 0, -3, 3]', expected: '[0, 0, 9, 0, 0]' }
    ],
    tags: ['Array', 'Prefix Product', 'Medium']
  },

  // DAY 7 - Arrays & Hashing
  {
    id: 'longest-consecutive-sequence',
    day: 7,
    title: 'Longest Consecutive Sequence',
    category: 'Arrays & Hashing',
    difficulty: 'Medium',
    leetcodeNumber: 128,
    leetcodeUrl: 'https://leetcode.com/problems/longest-consecutive-sequence/',
    companies: ['Google', 'Meta', 'Amazon', 'Spotify', 'Tiktok'],
    description: 'Given an unsorted array of integers `nums`, return the length of the longest consecutive elements sequence. You must write an algorithm that runs in `O(N)` time.',
    examples: [
      {
        input: 'nums = [100,4,200,1,3,2]',
        output: '4',
        explanation: 'The longest consecutive elements sequence is [1, 2, 3, 4]. Its length is 4.'
      },
      {
        input: 'nums = [0,3,7,2,5,8,4,6,0,1]',
        output: '9'
      }
    ],
    constraints: [
      '0 <= nums.length <= 10^5',
      '-10^9 <= nums[i] <= 10^9'
    ],
    starterCode: `def longest_consecutive(nums: list[int]) -> int:
    # Must run in O(N) time
    pass`,
    solutionCode: `def longest_consecutive(nums: list[int]) -> int:
    """
    Hash Set Sequence Starting Point Detection
    Time Complexity: O(N)
    Space Complexity: O(N)
    """
    num_set = set(nums)
    longest_streak = 0
    
    for num in num_set:
        # Check if num is the start of a consecutive sequence
        # If (num - 1) is in set, num cannot be the start!
        if (num - 1) not in num_set:
            current_num = num
            current_streak = 1
            
            while (current_num + 1) in num_set:
                current_num += 1
                current_streak += 1
                
            longest_streak = max(longest_streak, current_streak)
            
    return longest_streak`,
    optimalIntuition: 'Store all numbers in a hash set. A number `x` is the beginning of a consecutive chain ONLY IF `x - 1` is NOT in the set! When we identify a sequence start, we count consecutive numbers `x+1, x+2, ...`. Because we only expand from sequence beginnings, each element is visited at most twice -> O(N) total time.',
    stepByStepLogic: [
      'Convert `nums` to `num_set = set(nums)` for O(1) lookups.',
      'Initialize `longest_streak = 0`.',
      'Iterate through each `num` in `num_set`.',
      'If `(num - 1)` is NOT in `num_set`, `num` is a sequence root.',
      'Count how long the chain extends with `(current_num + 1) in num_set`.',
      'Update `longest_streak = max(longest_streak, current_streak)`.',
      'Return `longest_streak`.'
    ],
    complexity: {
      time: 'O(N)',
      space: 'O(N)',
      timeExplanation: 'While there is a nested while loop, it only executes for sequence starting numbers. Each number in the array is examined at most twice.',
      spaceExplanation: 'The hash set stores at most N unique integers.'
    },
    commonPitfalls: [
      'Iterating through original `nums` with duplicates instead of `num_set` can trigger redundant checks.',
      'Forgetting the `(num - 1) not in num_set` check downgrades time complexity to O(N^2).'
    ],
    pythonicTips: [
      'Always loop over `num_set` directly to avoid redundant duplicate processing.'
    ],
    testCases: [
      { input: '[100, 4, 200, 1, 3, 2]', expected: '4' },
      { input: '[0, 3, 7, 2, 5, 8, 4, 6, 0, 1]', expected: '9' },
      { input: '[]', expected: '0' }
    ],
    tags: ['Hash Set', 'Array', 'Sequence', 'Medium']
  },

  // DAY 8 - Two Pointers
  {
    id: 'valid-palindrome',
    day: 8,
    title: 'Valid Palindrome',
    category: 'Two Pointers',
    difficulty: 'Easy',
    leetcodeNumber: 125,
    leetcodeUrl: 'https://leetcode.com/problems/valid-palindrome/',
    companies: ['Meta', 'Microsoft', 'Amazon', 'Apple'],
    description: 'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers. Given a string `s`, return `true` if it is a palindrome, or `false` otherwise.',
    examples: [
      {
        input: 's = "A man, a plan, a canal: Panama"',
        output: 'true',
        explanation: '"amanaplanacanalpanama" is a palindrome.'
      },
      {
        input: 's = "race a car"',
        output: 'false',
        explanation: '"raceacar" is not a palindrome.'
      },
      {
        input: 's = " "',
        output: 'true',
        explanation: 's is an empty string "" after removing non-alphanumerics, which reads the same backward and forward.'
      }
    ],
    constraints: [
      '1 <= s.length <= 2 * 10^5',
      's consists only of printable ASCII characters.'
    ],
    starterCode: `def is_palindrome(s: str) -> bool:
    # Write your solution here
    pass`,
    solutionCode: `def is_palindrome(s: str) -> bool:
    """
    Two Pointers with O(1) Space
    Time Complexity: O(N)
    Space Complexity: O(1)
    """
    left, right = 0, len(s) - 1
    
    while left < right:
        while left < right and not s[left].isalnum():
            left += 1
        while left < right and not s[right].isalnum():
            right -= 1
            
        if s[left].lower() != s[right].lower():
            return False
            
        left += 1
        right -= 1
        
    return True`,
    optimalIntuition: 'Use two pointers `left` starting at 0 and `right` starting at `len(s)-1`. Skip non-alphanumeric characters with `isalnum()`. Compare characters in lowercase. If they mismatch, return `False`. If pointers meet, return `True`!',
    stepByStepLogic: [
      'Set `left = 0` and `right = len(s) - 1`.',
      'While `left < right`:',
      '  Advance `left` while `left < right and not s[left].isalnum()`.',
      '  Decrement `right` while `left < right and not s[right].isalnum()`.',
      '  Compare `s[left].lower() != s[right].lower()`. If unequal, return `False`.',
      '  Move `left += 1` and `right -= 1`.',
      'Return `True` if no mismatches found.'
    ],
    complexity: {
      time: 'O(N)',
      space: 'O(1)',
      timeExplanation: 'Each character is visited at most once by left and right pointers.',
      spaceExplanation: 'Only two pointer variables are used, no new string allocated.'
    },
    commonPitfalls: [
      'Creating a filtered string `filtered = [c.lower() for c in s if c.isalnum()]` takes O(N) extra space. Two pointers is O(1) space.'
    ],
    pythonicTips: [
      '`char.isalnum()` checks both letters and numbers efficiently in Python.'
    ],
    visualizerType: 'two-pointers',
    testCases: [
      { input: '"A man, a plan, a canal: Panama"', expected: 'True' },
      { input: '"race a car"', expected: 'False' },
      { input: '" "', expected: 'True' }
    ],
    tags: ['Two Pointers', 'String', 'Easy']
  },

  // DAY 9 - Two Pointers
  {
    id: 'two-sum-ii-input-array-is-sorted',
    day: 9,
    title: 'Two Sum II - Input Array Is Sorted',
    category: 'Two Pointers',
    difficulty: 'Medium',
    leetcodeNumber: 167,
    leetcodeUrl: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/',
    companies: ['Amazon', 'Google', 'Apple'],
    description: 'Given a 1-indexed array of integers `numbers` that is already sorted in non-decreasing order, find two numbers such that they add up to a specific `target` number. Return the indices of the two numbers, `index1` and `index2`, added by one as an integer array `[index1, index2]` of length 2. Your solution must use only constant `O(1)` extra space.',
    examples: [
      { input: 'numbers = [2,7,11,15], target = 9', output: '[1,2]' },
      { input: 'numbers = [2,3,4], target = 6', output: '[1,3]' },
      { input: 'numbers = [-1,0], target = -1', output: '[1,2]' }
    ],
    constraints: [
      '2 <= numbers.length <= 3 * 10^4',
      '-1000 <= numbers[i] <= 1000',
      'numbers is sorted in non-decreasing order.',
      '-1000 <= target <= 1000',
      'The tests are generated such that there is exactly one solution.'
    ],
    starterCode: `def two_sum_sorted(numbers: list[int], target: int) -> list[int]:
    # Must use O(1) extra space
    pass`,
    solutionCode: `def two_sum_sorted(numbers: list[int], target: int) -> list[int]:
    """
    Two Pointers on Sorted Array
    Time Complexity: O(N)
    Space Complexity: O(1)
    """
    left, right = 0, len(numbers) - 1
    
    while left < right:
        current_sum = numbers[left] + numbers[right]
        
        if current_sum == target:
            # 1-indexed response required
            return [left + 1, right + 1]
        elif current_sum < target:
            left += 1   # Need a larger sum
        else:
            right -= 1  # Need a smaller sum
            
    return []`,
    optimalIntuition: 'Because the array is already sorted, if `numbers[left] + numbers[right] < target`, the only way to increase the sum is by incrementing `left`. Conversely, if the sum > target, decrement `right`. This converges on the target in O(N) time with O(1) space!',
    stepByStepLogic: [
      'Place `left = 0` at the smallest element and `right = len(numbers) - 1` at the largest.',
      'Check `current_sum = numbers[left] + numbers[right]`.',
      'If equal, return 1-indexed `[left + 1, right + 1]`.',
      'If `current_sum < target`, advance `left += 1`.',
      'If `current_sum > target`, decrement `right -= 1`.'
    ],
    complexity: {
      time: 'O(N)',
      space: 'O(1)',
      timeExplanation: 'Pointers move toward each other at least once per iteration.',
      spaceExplanation: 'Only two integer index variables are used.'
    },
    commonPitfalls: [
      'Forgetting that LeetCode 167 asks for 1-indexed array result (`[left + 1, right + 1]`).'
    ],
    pythonicTips: [
      'Two pointers on sorted arrays is the foundational building block for 3Sum and 4Sum.'
    ],
    visualizerType: 'two-pointers',
    testCases: [
      { input: '[2, 7, 11, 15], 9', expected: '[1, 2]' },
      { input: '[2, 3, 4], 6', expected: '[1, 3]' },
      { input: '[-1, 0], -1', expected: '[1, 2]' }
    ],
    tags: ['Two Pointers', 'Binary Search', 'Array', 'Medium']
  },

  // DAY 10 - Two Pointers
  {
    id: '3sum',
    day: 10,
    title: '3Sum',
    category: 'Two Pointers',
    difficulty: 'Medium',
    leetcodeNumber: 15,
    leetcodeUrl: 'https://leetcode.com/problems/3sum/',
    companies: ['Meta', 'Amazon', 'Apple', 'Google', 'Microsoft', 'Bloomberg'],
    description: 'Given an integer array nums, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`. Notice that the solution set must not contain duplicate triplets.',
    examples: [
      {
        input: 'nums = [-1,0,1,2,-1,-4]',
        output: '[[-1,-1,2],[-1,0,1]]',
        explanation: 'nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0. nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0. nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.'
      },
      { input: 'nums = [0,1,1]', output: '[]' },
      { input: 'nums = [0,0,0]', output: '[[0,0,0]]' }
    ],
    constraints: [
      '3 <= nums.length <= 3000',
      '-10^5 <= nums[i] <= 10^5'
    ],
    starterCode: `def three_sum(nums: list[int]) -> list[list[int]]:
    # Write your solution here
    pass`,
    solutionCode: `def three_sum(nums: list[int]) -> list[list[int]]:
    """
    Sort + Fixed Pivot with Two Pointers
    Time Complexity: O(N^2)
    Space Complexity: O(1) or O(N) depending on sorting implementation
    """
    nums.sort()
    res: list[list[int]] = []
    n = len(nums)
    
    for i in range(n - 2):
        # If smallest value > 0, three positive numbers cannot sum to 0
        if nums[i] > 0:
            break
            
        # Skip duplicate values for the first element
        if i > 0 and nums[i] == nums[i - 1]:
            continue
            
        left, right = i + 1, n - 1
        while left < right:
            total = nums[i] + nums[left] + nums[right]
            
            if total == 0:
                res.append([nums[i], nums[left], nums[right]])
                left += 1
                right -= 1
                # Skip duplicate left values
                while left < right and nums[left] == nums[left - 1]:
                    left += 1
                # Skip duplicate right values
                while left < right and nums[right] == nums[right + 1]:
                    right -= 1
            elif total < 0:
                left += 1
            else:
                right -= 1
                
    return res`,
    optimalIntuition: 'Sort the array first. Fix each number `nums[i]` as the pivot, then use standard Two Pointers on the subarray to the right to find pairs where `nums[left] + nums[right] == -nums[i]`. Skip adjacent duplicates to avoid duplicate triplets in the output!',
    stepByStepLogic: [
      'Sort `nums` in ascending order.',
      'Loop `i` from `0` to `len(nums) - 3`.',
      'Skip duplicate pivot elements: `if i > 0 and nums[i] == nums[i-1]: continue`.',
      'Set `left = i + 1` and `right = len(nums) - 1`.',
      'While `left < right`:',
      '  If sum is 0, append `[nums[i], nums[left], nums[right]]`, increment `left`, decrement `right`, and skip duplicates on both sides.',
      '  If sum < 0, `left += 1`.',
      '  If sum > 0, `right -= 1`.'
    ],
    complexity: {
      time: 'O(N^2)',
      space: 'O(1) to O(N)',
      timeExplanation: 'Sorting takes O(N log N). For each of N elements, two pointer scan takes O(N). Total is O(N^2).',
      spaceExplanation: 'In-place sort `nums.sort()` uses O(log N) to O(N) auxiliary space in Python (Timsort).'
    },
    commonPitfalls: [
      'Not skipping duplicates after finding a triplet, resulting in duplicate entries in output.',
      'Forgetting to break early when `nums[i] > 0`.'
    ],
    pythonicTips: [
      '`nums.sort()` sorts in-place in CPython using Timsort.'
    ],
    visualizerType: 'two-pointers',
    testCases: [
      { input: '[-1,0,1,2,-1,-4]', expected: '[[-1, -1, 2], [-1, 0, 1]]' },
      { input: '[0, 0, 0]', expected: '[[0, 0, 0]]' },
      { input: '[0, 1, 1]', expected: '[]' }
    ],
    tags: ['Two Pointers', 'Sorting', 'Array', 'Medium']
  },

  // DAY 11 - Two Pointers
  {
    id: 'container-with-most-water',
    day: 11,
    title: 'Container With Most Water',
    category: 'Two Pointers',
    difficulty: 'Medium',
    leetcodeNumber: 11,
    leetcodeUrl: 'https://leetcode.com/problems/container-with-most-water/',
    companies: ['Amazon', 'Google', 'Meta', 'Adobe', 'Apple'],
    description: 'You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `i-th` line are `(i, 0)` and `(i, height[i])`. Find two lines that together with the x-axis form a container, such that the container contains the most water. Return the maximum amount of water a container can store.',
    examples: [
      {
        input: 'height = [1,8,6,2,5,4,8,3,7]',
        output: '49',
        explanation: 'The vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. The max area is between index 1 (height 8) and index 8 (height 7) -> min(8, 7) * (8 - 1) = 7 * 7 = 49.'
      },
      {
        input: 'height = [1,1]',
        output: '1'
      }
    ],
    constraints: [
      'n == height.length',
      '2 <= n <= 10^5',
      '0 <= height[i] <= 10^4'
    ],
    starterCode: `def max_area(height: list[int]) -> int:
    # Write your solution here
    pass`,
    solutionCode: `def max_area(height: list[int]) -> int:
    """
    Two Pointers Greedy Squeeze
    Time Complexity: O(N)
    Space Complexity: O(1)
    """
    left, right = 0, len(height) - 1
    max_water = 0
    
    while left < right:
        width = right - left
        h = min(height[left], height[right])
        max_water = max(max_water, width * h)
        
        # Always advance the shorter wall because area is constrained by the bottleneck
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
            
    return max_water`,
    optimalIntuition: 'The area is bounded by `min(height[left], height[right]) * (right - left)`. Starting at maximum width (`left = 0`, `right = len-1`), moving the taller wall inward can ONLY decrease area (since width shrinks and height is still limited by the shorter wall). Therefore, we greedily shift the shorter wall inward!',
    stepByStepLogic: [
      'Initialize `left = 0`, `right = len(height) - 1`, and `max_water = 0`.',
      'While `left < right`:',
      '  Calculate `current_area = (right - left) * min(height[left], height[right])`.',
      '  Update `max_water = max(max_water, current_area)`.',
      '  If `height[left] < height[right]`, increment `left`. Else decrement `right`.',
      'Return `max_water`.'
    ],
    complexity: {
      time: 'O(N)',
      space: 'O(1)',
      timeExplanation: 'Pointers start at opposite ends and move toward each other, inspecting each wall once.',
      spaceExplanation: 'Constant O(1) extra space.'
    },
    commonPitfalls: [
      'Moving both pointers or moving the taller pointer instead of the shorter bottleneck.'
    ],
    pythonicTips: [
      'Simple, clean variable names keep greedy pointer code readable during live coding.'
    ],
    visualizerType: 'two-pointers',
    testCases: [
      { input: '[1,8,6,2,5,4,8,3,7]', expected: '49' },
      { input: '[1, 1]', expected: '1' }
    ],
    tags: ['Two Pointers', 'Greedy', 'Array', 'Medium']
  },

  // DAY 12 - Two Pointers
  {
    id: 'trapping-rain-water',
    day: 12,
    title: 'Trapping Rain Water',
    category: 'Two Pointers',
    difficulty: 'Hard',
    leetcodeNumber: 42,
    leetcodeUrl: 'https://leetcode.com/problems/trapping-rain-water/',
    companies: ['Amazon', 'Google', 'Meta', 'Goldman Sachs', 'Microsoft', 'Bloomberg'],
    description: 'Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
    examples: [
      {
        input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]',
        output: '6',
        explanation: 'The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water are being trapped.'
      },
      {
        input: 'height = [4,2,0,3,2,5]',
        output: '9'
      }
    ],
    constraints: [
      'n == height.length',
      '1 <= n <= 2 * 10^4',
      '0 <= height[i] <= 10^5'
    ],
    starterCode: `def trap(height: list[int]) -> int:
    # Write your optimal O(N) time O(1) space solution
    pass`,
    solutionCode: `def trap(height: list[int]) -> int:
    """
    Two Pointers with Running Max Heights
    Time Complexity: O(N)
    Space Complexity: O(1)
    """
    if not height:
        return 0
        
    left, right = 0, len(height) - 1
    left_max, right_max = height[left], height[right]
    trapped_water = 0
    
    while left < right:
        if left_max < right_max:
            left += 1
            left_max = max(left_max, height[left])
            trapped_water += left_max - height[left]
        else:
            right -= 1
            right_max = max(right_max, height[right])
            trapped_water += right_max - height[right]
            
    return trapped_water`,
    optimalIntuition: 'Water trapped above index `i` is determined by `min(max_left, max_right) - height[i]`. By keeping `left_max` and `right_max`, whichever side has the smaller max is guaranteed to be the limiting bottleneck, so we can immediately compute trapped water for that side without knowing the exact max on the other side!',
    stepByStepLogic: [
      'If `height` is empty, return 0.',
      'Initialize `left = 0`, `right = len(height) - 1`.',
      'Set `left_max = height[0]`, `right_max = height[-1]`, and `trapped_water = 0`.',
      'While `left < right`:',
      '  If `left_max < right_max`: move `left += 1`, update `left_max`, add `left_max - height[left]` to `trapped_water`.',
      '  Else: move `right -= 1`, update `right_max`, add `right_max - height[right]` to `trapped_water`.',
      'Return `trapped_water`.'
    ],
    complexity: {
      time: 'O(N)',
      space: 'O(1)',
      timeExplanation: 'Single pass over array of length N.',
      spaceExplanation: 'Only scalar pointer and max height variables are used.'
    },
    commonPitfalls: [
      'Precomputing prefix and suffix max arrays takes O(N) space; Two Pointers achieves O(1) space.'
    ],
    pythonicTips: [
      'The Two Pointers approach is preferred in FAANG interviews over the Monotonic Stack approach for its O(1) memory footprint.'
    ],
    visualizerType: 'two-pointers',
    testCases: [
      { input: '[0,1,0,2,1,0,1,3,2,1,2,1]', expected: '6' },
      { input: '[4,2,0,3,2,5]', expected: '9' }
    ],
    tags: ['Two Pointers', 'Dynamic Programming', 'Monotonic Stack', 'Hard']
  },

  // DAY 13 - Sliding Window
  {
    id: 'best-time-to-buy-and-sell-stock',
    day: 13,
    title: 'Best Time to Buy and Sell Stock',
    category: 'Sliding Window',
    difficulty: 'Easy',
    leetcodeNumber: 121,
    leetcodeUrl: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',
    companies: ['Amazon', 'Microsoft', 'Google', 'Meta', 'Apple'],
    description: 'You are given an array `prices` where `prices[i]` is the price of a given stock on the `i-th` day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.',
    examples: [
      {
        input: 'prices = [7,1,5,3,6,4]',
        output: '5',
        explanation: 'Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5.'
      },
      {
        input: 'prices = [7,6,4,3,1]',
        output: '0',
        explanation: 'In this case, no transactions are done and max profit = 0.'
      }
    ],
    constraints: [
      '1 <= prices.length <= 10^5',
      '0 <= prices[i] <= 10^4'
    ],
    starterCode: `def max_profit(prices: list[int]) -> int:
    # Write your solution here
    pass`,
    solutionCode: `def max_profit(prices: list[int]) -> int:
    """
    Sliding Window / Single Pass Min-Price Tracking
    Time Complexity: O(N)
    Space Complexity: O(1)
    """
    min_price = float('inf')
    max_profit_val = 0
    
    for price in prices:
        if price < min_price:
            min_price = price
        else:
            max_profit_val = max(max_profit_val, price - min_price)
            
    return max_profit_val`,
    optimalIntuition: 'As we iterate through the days, we maintain the lowest price observed so far (`min_price`). If today\'s price is higher, our profit if selling today is `price - min_price`. We track the maximum such profit.',
    stepByStepLogic: [
      'Set `min_price = float(\'inf\')` and `max_profit_val = 0`.',
      'Iterate through each `price` in `prices`:',
      '  If `price < min_price`, update `min_price = price`.',
      '  Else, update `max_profit_val = max(max_profit_val, price - min_price)`.',
      'Return `max_profit_val`.'
    ],
    complexity: {
      time: 'O(N)',
      space: 'O(1)',
      timeExplanation: 'Single loop through prices list of length N.',
      spaceExplanation: 'Only two float/int tracking variables.'
    },
    commonPitfalls: [
      'Selling before buying (e.g. buying at lowest price that appears AFTER the highest price).'
    ],
    pythonicTips: [
      '`float(\'inf\')` is Python standard for positive infinity.'
    ],
    visualizerType: 'sliding-window',
    testCases: [
      { input: '[7,1,5,3,6,4]', expected: '5' },
      { input: '[7,6,4,3,1]', expected: '0' }
    ],
    tags: ['Sliding Window', 'Array', 'Easy']
  },

  // DAY 14 - Sliding Window
  {
    id: 'longest-substring-without-repeating-characters',
    day: 14,
    title: 'Longest Substring Without Repeating Characters',
    category: 'Sliding Window',
    difficulty: 'Medium',
    leetcodeNumber: 3,
    leetcodeUrl: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
    companies: ['Meta', 'Amazon', 'Google', 'Microsoft', 'Bloomberg', 'Apple'],
    description: 'Given a string `s`, find the length of the longest substring without repeating characters.',
    examples: [
      {
        input: 's = "abcabcbb"',
        output: '3',
        explanation: 'The answer is "abc", with the length of 3.'
      },
      {
        input: 's = "bbbbb"',
        output: '1',
        explanation: 'The answer is "b", with the length of 1.'
      },
      {
        input: 's = "pwwkew"',
        output: '3',
        explanation: 'The answer is "wke", with the length of 3.'
      }
    ],
    constraints: [
      '0 <= s.length <= 5 * 10^4',
      's consists of English letters, digits, symbols and spaces.'
    ],
    starterCode: `def length_of_longest_substring(s: str) -> int:
    # Write your solution here
    pass`,
    solutionCode: `def length_of_longest_substring(s: str) -> int:
    """
    Sliding Window with Last-Seen Index Map
    Time Complexity: O(N)
    Space Complexity: O(min(N, M)) where M is character set size
    """
    last_seen: dict[str, int] = {}
    left = 0
    max_len = 0
    
    for right, char in enumerate(s):
        # If char was seen and is within current window [left, right]
        if char in last_seen and last_seen[char] >= left:
            left = last_seen[char] + 1
            
        last_seen[char] = right
        max_len = max(max_len, right - left + 1)
        
    return max_len`,
    optimalIntuition: 'Maintain a sliding window `[left, right]`. Store the last index where each character was seen in a hash map. When we encounter a duplicate character that is inside our current window (`last_seen[char] >= left`), jump `left` directly to `last_seen[char] + 1` in O(1) time!',
    stepByStepLogic: [
      'Initialize `last_seen = {}`, `left = 0`, and `max_len = 0`.',
      'Iterate `right, char` with `enumerate(s)`.',
      'If `char in last_seen and last_seen[char] >= left`, update `left = last_seen[char] + 1`.',
      'Record `last_seen[char] = right`.',
      'Update `max_len = max(max_len, right - left + 1)`.',
      'Return `max_len`.'
    ],
    complexity: {
      time: 'O(N)',
      space: 'O(min(N, M))',
      timeExplanation: 'Each character is processed once; jump pointer avoids O(N) shrink steps.',
      spaceExplanation: 'Hash map stores at most the number of distinct characters M (e.g. 128 ASCII).'
    },
    commonPitfalls: [
      'Forgetting the condition `last_seen[char] >= left` — if a character was seen way before `left`, we must not move `left` backwards!'
    ],
    pythonicTips: [
      'Tracking index in `last_seen` allows O(1) jump instead of a while loop set deletion.'
    ],
    visualizerType: 'sliding-window',
    testCases: [
      { input: '"abcabcbb"', expected: '3' },
      { input: '"bbbbb"', expected: '1' },
      { input: '"pwwkew"', expected: '3' }
    ],
    tags: ['Sliding Window', 'Hash Table', 'String', 'Medium']
  },

  // DAY 15 - Stack
  {
    id: 'valid-parentheses',
    day: 15,
    title: 'Valid Parentheses',
    category: 'Stack',
    difficulty: 'Easy',
    leetcodeNumber: 20,
    leetcodeUrl: 'https://leetcode.com/problems/valid-parentheses/',
    companies: ['Meta', 'Amazon', 'Google', 'Microsoft', 'Bloomberg'],
    description: 'Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid. An input string is valid if: Open brackets must be closed by the same type of brackets, and open brackets must be closed in the correct order.',
    examples: [
      { input: 's = "()"', output: 'true' },
      { input: 's = "()[]{}"', output: 'true' },
      { input: 's = "(]"', output: 'false' },
      { input: 's = "([])"', output: 'true' }
    ],
    constraints: [
      '1 <= s.length <= 10^4',
      's consists of parentheses only \'()[]{}\'.'
    ],
    starterCode: `def is_valid(s: str) -> bool:
    # Write your solution here
    pass`,
    solutionCode: `def is_valid(s: str) -> bool:
    """
    Stack with Closing-to-Opening Mapping
    Time Complexity: O(N)
    Space Complexity: O(N)
    """
    # Mapping each closing bracket to its corresponding opening bracket
    close_to_open = {')': '(', '}': '{', ']': '['}
    stack: list[str] = []
    
    for char in s:
        if char in close_to_open:
            # Closing bracket encountered
            if stack and stack[-1] == close_to_open[char]:
                stack.pop()
            else:
                return False
        else:
            # Opening bracket encountered
            stack.append(char)
            
    # Valid only if stack is completely empty
    return len(stack) == 0`,
    optimalIntuition: 'LIFO (Last-In First-Out) nature of bracket matching matches a Stack. When seeing an opening bracket, push it onto the stack. When seeing a closing bracket, the top of the stack MUST be the matching opening bracket. If it mismatches or the stack is empty, it\'s invalid.',
    stepByStepLogic: [
      'Create dict `close_to_open = {\')\': \'(\', \'}\': \'{\', \']\': \'[\'}`.',
      'Initialize an empty `stack = []`.',
      'Loop over each `char` in `s`:',
      '  If `char` is in `close_to_open`: check if `stack` is non-empty and `stack[-1] == close_to_open[char]`. Pop if match, else return `False`.',
      '  Else: push `char` to `stack`.',
      'Return `True` if `len(stack) == 0` else `False`.'
    ],
    complexity: {
      time: 'O(N)',
      space: 'O(N)',
      timeExplanation: 'Single scan of string with O(1) push and pop operations.',
      spaceExplanation: 'Stack holds at most N characters in worst case (e.g. "(((((").'
    },
    commonPitfalls: [
      'Not checking if stack is empty before popping `stack[-1]`.',
      'Forgetting to verify `len(stack) == 0` at the end (e.g. dangling opening brackets like `"("`).'
    ],
    pythonicTips: [
      'In Python, `list.append()` and `list.pop()` serve as an efficient O(1) stack.'
    ],
    visualizerType: 'stack',
    testCases: [
      { input: '"()"', expected: 'True' },
      { input: '"()[]{}"', expected: 'True' },
      { input: '"(]"', expected: 'False' },
      { input: '"([])"', expected: 'True' }
    ],
    tags: ['Stack', 'String', 'Easy']
  },

  // DAY 16 - Binary Search
  {
    id: 'binary-search',
    day: 16,
    title: 'Binary Search',
    category: 'Binary Search',
    difficulty: 'Easy',
    leetcodeNumber: 704,
    leetcodeUrl: 'https://leetcode.com/problems/binary-search/',
    companies: ['Apple', 'Amazon', 'Google', 'Microsoft'],
    description: 'Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, then return its index. Otherwise, return -1. You must write an algorithm with `O(log n)` runtime complexity.',
    examples: [
      {
        input: 'nums = [-1,0,3,5,9,12], target = 9',
        output: '4',
        explanation: '9 exists in nums and its index is 4'
      },
      {
        input: 'nums = [-1,0,3,5,9,12], target = 2',
        output: '-1',
        explanation: '2 does not exist in nums so return -1'
      }
    ],
    constraints: [
      '1 <= nums.length <= 10^4',
      '-10^4 < nums[i], target < 10^4',
      'All the integers in nums are unique.',
      'nums is sorted in ascending order.'
    ],
    starterCode: `def search(nums: list[int], target: int) -> int:
    # Must be O(log N)
    pass`,
    solutionCode: `def search(nums: list[int], target: int) -> int:
    """
    Standard Binary Search
    Time Complexity: O(log N)
    Space Complexity: O(1)
    """
    left, right = 0, len(nums) - 1
    
    while left <= right:
        # Avoid potential integer overflow in other languages: left + (right - left) // 2
        mid = (left + right) // 2
        
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
            
    return -1`,
    optimalIntuition: 'In a sorted array, comparing the middle element `nums[mid]` with `target` cuts the search space in half each step. If `nums[mid] < target`, the target must reside in the right half (`left = mid + 1`). If `nums[mid] > target`, it resides in the left half (`right = mid - 1`).',
    stepByStepLogic: [
      'Set `left = 0` and `right = len(nums) - 1`.',
      'While `left <= right`:',
      '  Calculate `mid = (left + right) // 2`.',
      '  If `nums[mid] == target`, return `mid`.',
      '  If `nums[mid] < target`, discard left half: `left = mid + 1`.',
      '  If `nums[mid] > target`, discard right half: `right = mid - 1`.',
      'If not found, return `-1`.'
    ],
    complexity: {
      time: 'O(log N)',
      space: 'O(1)',
      timeExplanation: 'Halves the search space at each iteration: N -> N/2 -> N/4 -> ... -> 1 = log2(N) steps.',
      spaceExplanation: 'Constant O(1) auxiliary space.'
    },
    commonPitfalls: [
      'Using `while left < right` instead of `while left <= right` (misses single-element target checks).'
    ],
    pythonicTips: [
      'Python\'s `bisect.bisect_left(nums, target)` implements binary search under the hood.'
    ],
    visualizerType: 'binary-search',
    testCases: [
      { input: '[-1,0,3,5,9,12], 9', expected: '4' },
      { input: '[-1,0,3,5,9,12], 2', expected: '-1' }
    ],
    tags: ['Binary Search', 'Array', 'Easy']
  },

  // DAY 17 - Linked List
  {
    id: 'reverse-linked-list',
    day: 17,
    title: 'Reverse Linked List',
    category: 'Linked List',
    difficulty: 'Easy',
    leetcodeNumber: 206,
    leetcodeUrl: 'https://leetcode.com/problems/reverse-linked-list/',
    companies: ['Amazon', 'Apple', 'Google', 'Meta', 'Microsoft', 'Bloomberg'],
    description: 'Given the `head` of a singly linked list, reverse the list, and return the reversed list.',
    examples: [
      {
        input: 'head = [1,2,3,4,5]',
        output: '[5,4,3,2,1]'
      },
      {
        input: 'head = [1,2]',
        output: '[2,1]'
      },
      {
        input: 'head = []',
        output: '[]'
      }
    ],
    constraints: [
      'The number of nodes in the list is the range [0, 5000].',
      '-5000 <= Node.val <= 5000'
    ],
    starterCode: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverse_list(head: ListNode | None) -> ListNode | None:
    # Write your solution here
    pass`,
    solutionCode: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverse_list(head: ListNode | None) -> ListNode | None:
    """
    Iterative In-Place Pointer Reversal
    Time Complexity: O(N)
    Space Complexity: O(1)
    """
    prev = None
    curr = head
    
    while curr:
        nxt = curr.next     # 1. Save next node
        curr.next = prev    # 2. Reverse pointer direction
        prev = curr         # 3. Advance prev
        curr = nxt          # 4. Advance curr
        
    return prev  # prev is now the new head of the reversed list`,
    optimalIntuition: 'Iterate through the linked list with two pointers `prev` (starts at None) and `curr` (starts at head). At each node, save `nxt = curr.next`, point `curr.next` back to `prev`, then shift `prev` and `curr` one step forward. When `curr` reaches None, `prev` is the new head!',
    stepByStepLogic: [
      'Initialize `prev = None` and `curr = head`.',
      'While `curr` is not None:',
      '  Store temporary reference `nxt = curr.next`.',
      '  Point `curr.next = prev`.',
      '  Move `prev = curr`.',
      '  Move `curr = nxt`.',
      'Return `prev`.'
    ],
    complexity: {
      time: 'O(N)',
      space: 'O(1)',
      timeExplanation: 'Visits all N nodes exactly once.',
      spaceExplanation: 'In-place pointer manipulation without allocating new nodes.'
    },
    commonPitfalls: [
      'Losing the reference to `curr.next` before mutating `curr.next = prev`.'
    ],
    pythonicTips: [
      'You can also write multiple assignment: `curr.next, prev, curr = prev, curr, curr.next` in Python, though the 4-step explicit style is preferred for clarity in interviews.'
    ],
    visualizerType: 'linked-list',
    testCases: [
      { input: '[1, 2, 3, 4, 5]', expected: '[5, 4, 3, 2, 1]' },
      { input: '[1, 2]', expected: '[2, 1]' },
      { input: '[]', expected: '[]' }
    ],
    tags: ['Linked List', 'Recursion', 'Easy']
  },

  // DAY 18 - Trees
  {
    id: 'invert-binary-tree',
    day: 18,
    title: 'Invert Binary Tree',
    category: 'Trees',
    difficulty: 'Easy',
    leetcodeNumber: 226,
    leetcodeUrl: 'https://leetcode.com/problems/invert-binary-tree/',
    companies: ['Google', 'Meta', 'Amazon', 'Apple', 'Twitter'],
    description: 'Given the `root` of a binary tree, invert the tree, and return its root. (Famous for Max Howell\'s Google tweet: "Google: 90% of our engineers use the software you wrote (Homebrew), but you can’t invert a binary tree on a whiteboard so fuck off.")',
    examples: [
      {
        input: 'root = [4,2,7,1,3,6,9]',
        output: '[4,7,2,9,6,3,1]'
      },
      {
        input: 'root = [2,1,3]',
        output: '[2,3,1]'
      },
      {
        input: 'root = []',
        output: '[]'
      }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [0, 100].',
      '-100 <= Node.val <= 100'
    ],
    starterCode: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def invert_tree(root: TreeNode | None) -> TreeNode | None:
    # Write your recursive solution here
    pass`,
    solutionCode: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def invert_tree(root: TreeNode | None) -> TreeNode | None:
    """
    Recursive DFS Tree Inversion
    Time Complexity: O(N)
    Space Complexity: O(H) where H is tree height
    """
    if not root:
        return None
        
    # Swap left and right children
    root.left, root.right = root.right, root.left
    
    # Recursively invert both subtrees
    invert_tree(root.left)
    invert_tree(root.right)
    
    return root`,
    optimalIntuition: 'To invert a binary tree, swap the left and right children of the current node, then recursively invert the left and right subtrees until reaching the leaf base cases (`None`).',
    stepByStepLogic: [
      'Base Case: If `root is None`, return `None`.',
      'Swap children: `root.left, root.right = root.right, root.left`.',
      'Recurse on `root.left` and `root.right`.',
      'Return `root`.'
    ],
    complexity: {
      time: 'O(N)',
      space: 'O(H)',
      timeExplanation: 'Visits every node in the tree of size N once.',
      spaceExplanation: 'Call stack reaches max depth equal to tree height H (O(log N) for balanced, O(N) for skewed).'
    },
    commonPitfalls: [
      'Swapping after recursion without saving references or forgetting base case.'
    ],
    pythonicTips: [
      'Tuple assignment `root.left, root.right = root.right, root.left` swaps cleanly without a temporary variable.'
    ],
    visualizerType: 'tree',
    testCases: [
      { input: '[4, 2, 7, 1, 3, 6, 9]', expected: '[4, 7, 2, 9, 6, 3, 1]' },
      { input: '[2, 1, 3]', expected: '[2, 3, 1]' }
    ],
    tags: ['Tree', 'DFS', 'Recursion', 'Easy']
  },

  // DAY 19 - Dynamic Programming (1-D)
  {
    id: 'climbing-stairs',
    day: 19,
    title: 'Climbing Stairs',
    category: '1-D Dynamic Programming',
    difficulty: 'Easy',
    leetcodeNumber: 70,
    leetcodeUrl: 'https://leetcode.com/problems/climbing-stairs/',
    companies: ['Amazon', 'Google', 'Apple', 'Adobe', 'Meta'],
    description: 'You are climbing a staircase. It takes `n` steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
    examples: [
      {
        input: 'n = 2',
        output: '2',
        explanation: 'There are two ways to climb to the top: 1. 1 step + 1 step, 2. 2 steps'
      },
      {
        input: 'n = 3',
        output: '3',
        explanation: 'There are three ways: 1. 1 + 1 + 1, 2. 1 + 2, 3. 2 + 1'
      }
    ],
    constraints: ['1 <= n <= 45'],
    starterCode: `def climb_stairs(n: int) -> int:
    # Write your optimal O(N) time O(1) space solution
    pass`,
    solutionCode: `def climb_stairs(n: int) -> int:
    """
    Bottom-Up DP with Fibonacci State Space Optimization
    Time Complexity: O(N)
    Space Complexity: O(1)
    """
    if n <= 2:
        return n
        
    one_step_before = 2  # ways to reach step 2
    two_steps_before = 1 # ways to reach step 1
    
    for _ in range(3, n + 1):
        current = one_step_before + two_steps_before
        two_steps_before = one_step_before
        one_step_before = current
        
    return one_step_before`,
    optimalIntuition: 'To reach step `i`, you must come from step `i-1` (by taking 1 step) or from step `i-2` (by taking 2 steps). Thus, `ways(i) = ways(i-1) + ways(i-2)`. This is identical to the Fibonacci recurrence, computed in O(N) time and O(1) memory!',
    stepByStepLogic: [
      'If `n <= 2`, return `n`.',
      'Initialize `two_steps_before = 1` and `one_step_before = 2`.',
      'For step from 3 to `n`:',
      '  `current = one_step_before + two_steps_before`',
      '  `two_steps_before = one_step_before`',
      '  `one_step_before = current`',
      'Return `one_step_before`.'
    ],
    complexity: {
      time: 'O(N)',
      space: 'O(1)',
      timeExplanation: 'Single loop from 3 to N.',
      spaceExplanation: 'Only two previous state integers maintained.'
    },
    commonPitfalls: [
      'Naive recursion without memoization takes O(2^N) and times out on N=45.'
    ],
    pythonicTips: [
      '`a, b = b, a + b` computes Fibonacci state transitions in one clean line in Python.'
    ],
    testCases: [
      { input: '2', expected: '2' },
      { input: '3', expected: '3' },
      { input: '5', expected: '8' }
    ],
    tags: ['Dynamic Programming', 'Math', 'Memoization', 'Easy']
  },

  // DAY 20 - Dynamic Programming (1-D)
  {
    id: 'coin-change',
    day: 20,
    title: 'Coin Change',
    category: '1-D Dynamic Programming',
    difficulty: 'Medium',
    leetcodeNumber: 322,
    leetcodeUrl: 'https://leetcode.com/problems/coin-change/',
    companies: ['Amazon', 'Meta', 'Google', 'Microsoft', 'Bloomberg', 'Goldman Sachs'],
    description: 'You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return `-1`. You may assume that you have an infinite number of each kind of coin.',
    examples: [
      {
        input: 'coins = [1,2,5], amount = 11',
        output: '3',
        explanation: '11 = 5 + 5 + 1 (3 coins)'
      },
      {
        input: 'coins = [2], amount = 3',
        output: '-1'
      },
      {
        input: 'coins = [1], amount = 0',
        output: '0'
      }
    ],
    constraints: [
      '1 <= coins.length <= 12',
      '1 <= coins[i] <= 2^31 - 1',
      '0 <= amount <= 10^4'
    ],
    starterCode: `def coin_change(coins: list[int], amount: int) -> int:
    # Write your bottom-up DP solution here
    pass`,
    solutionCode: `def coin_change(coins: list[int], amount: int) -> int:
    """
    Bottom-Up 1D Dynamic Programming
    dp[a] represents minimum coins to make amount a
    Time Complexity: O(amount * len(coins))
    Space Complexity: O(amount)
    """
    # Initialize DP array with amount + 1 (representing infinity)
    dp = [amount + 1] * (amount + 1)
    dp[0] = 0  # 0 coins needed for amount 0
    
    for a in range(1, amount + 1):
        for coin in coins:
            if a - coin >= 0:
                dp[a] = min(dp[a], 1 + dp[a - coin])
                
    return dp[amount] if dp[amount] != amount + 1 else -1`,
    optimalIntuition: 'Let `dp[a]` be the minimum coins to make amount `a`. For every amount from 1 to `amount`, try subtracting each coin denomination: `dp[a] = min(dp[a], 1 + dp[a - coin])`. If `dp[amount]` remains infinity, it is impossible -> return -1.',
    stepByStepLogic: [
      'Create `dp` array of size `amount + 1` filled with `amount + 1`.',
      'Set `dp[0] = 0`.',
      'Loop `a` from 1 to `amount`:',
      '  For each `coin` in `coins`:',
      '    If `a - coin >= 0`, update `dp[a] = min(dp[a], 1 + dp[a - coin])`.',
      'Return `dp[amount]` if it was updated, otherwise `-1`.'
    ],
    complexity: {
      time: 'O(amount * len(coins))',
      space: 'O(amount)',
      timeExplanation: 'Outer loop runs `amount` times, inner loop runs `len(coins)` times.',
      spaceExplanation: '1D DP array of size `amount + 1`.'
    },
    commonPitfalls: [
      'Trying a greedy approach (picking largest coin first). Greedy FAILS for coin sets like `coins=[1, 3, 4, 5], amount=7` (Greedy picks 5+1+1=3 coins, optimal is 3+4=2 coins).'
    ],
    pythonicTips: [
      'Using `amount + 1` as sentinel value is cleaner than `float(\'inf\')` and fits in integer arrays.'
    ],
    testCases: [
      { input: '[1,2,5], 11', expected: '3' },
      { input: '[2], 3', expected: '-1' },
      { input: '[1], 0', expected: '0' }
    ],
    tags: ['Dynamic Programming', 'Knapsack', 'Medium']
  },

  // DAY 21 - Graphs
  {
    id: 'number-of-islands',
    day: 21,
    title: 'Number of Islands',
    category: 'Graphs',
    difficulty: 'Medium',
    leetcodeNumber: 200,
    leetcodeUrl: 'https://leetcode.com/problems/number-of-islands/',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Bloomberg', 'Apple'],
    description: 'Given an `m x n` 2D binary grid `grid` which represents a map of `\'1\'`s (land) and `\'0\'`s (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.',
    examples: [
      {
        input: 'grid = [\n  ["1","1","1","1","0"],\n  ["1","1","0","1","0"],\n  ["1","1","0","0","0"],\n  ["0","0","0","0","0"]\n]',
        output: '1'
      },
      {
        input: 'grid = [\n  ["1","1","0","0","0"],\n  ["1","1","0","0","0"],\n  ["0","0","1","0","0"],\n  ["0","0","0","1","1"]\n]',
        output: '3'
      }
    ],
    constraints: [
      'm == grid.length',
      'n == grid[i].length',
      '1 <= m, n <= 300',
      'grid[i][j] is \'0\' or \'1\'.'
    ],
    starterCode: `def num_islands(grid: list[list[str]]) -> int:
    # Write your BFS or DFS solution here
    pass`,
    solutionCode: `def num_islands(grid: list[list[str]]) -> int:
    """
    Connected Components via In-Place Grid DFS/BFS
    Time Complexity: O(M * N)
    Space Complexity: O(M * N) worst case recursion stack
    """
    if not grid or not grid[0]:
        return 0
        
    rows, cols = len(grid), len(grid[0])
    island_count = 0
    
    def dfs(r: int, c: int) -> None:
        # Check boundary conditions and water
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] != '1':
            return
            
        # Sink the visited land to '0' to avoid revisiting
        grid[r][c] = '0'
        
        # Explore 4 orthogonal neighbors (up, down, left, right)
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)
        
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                island_count += 1
                dfs(r, c)
                
    return island_count`,
    optimalIntuition: 'Iterate through every cell `(r, c)`. When you hit unvisited land `\'1\'`, increment `island_count` and launch a DFS/BFS traversal to "sink" all connected land cells by setting `grid[r][c] = \'0\'`. Each connected component is counted once.',
    stepByStepLogic: [
      'Check if grid is valid.',
      'Define recursive `dfs(r, c)` that returns if out of bounds or `grid[r][c] != \'1\'`.',
      'Inside `dfs`, mark `grid[r][c] = \'0\'` (sinking the island) and call `dfs` on 4 cardinal neighbors.',
      'Iterate through rows `0..m-1` and cols `0..n-1`.',
      'Whenever `grid[r][c] == \'1\'`: increment `island_count += 1` and execute `dfs(r, c)`.',
      'Return `island_count`.'
    ],
    complexity: {
      time: 'O(M * N)',
      space: 'O(M * N)',
      timeExplanation: 'Every cell in the M x N grid is visited at most a constant number of times.',
      spaceExplanation: 'Recursive call stack can reach O(M * N) if the entire grid is one giant island.'
    },
    commonPitfalls: [
      'Mutating grid values vs using a separate visited set. Sinking `grid[r][c] = "0"` is optimal if mutation is allowed; otherwise use a `set((r, c))`.'
    ],
    pythonicTips: [
      'Python recursion limit default is 1000. For large grids in production, use iterative BFS with `collections.deque` or increase `sys.setrecursionlimit`.'
    ],
    testCases: [
      { input: '[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', expected: '1' },
      { input: '[["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]', expected: '3' }
    ],
    tags: ['Graph', 'DFS', 'BFS', 'Matrix', 'Medium']
  },

  // DAY 22 - Stack
  {
    id: 'min-stack',
    day: 22,
    title: 'Min Stack',
    category: 'Stack',
    difficulty: 'Medium',
    leetcodeNumber: 155,
    leetcodeUrl: 'https://leetcode.com/problems/min-stack/',
    companies: ['Amazon', 'Bloomberg', 'Google', 'Microsoft'],
    description: 'Design a stack that supports push, pop, top, and retrieving the minimum element in constant time `O(1)`. Implement the `MinStack` class.',
    examples: [
      {
        input: '["MinStack","push","push","push","getMin","pop","top","getMin"]\n[[],[-2],[0],[-3],[],[],[],[]]',
        output: '[null,null,null,null,-3,null,0,-2]',
        explanation: 'MinStack minStack = new MinStack();\nminStack.push(-2);\nminStack.push(0);\nminStack.push(-3);\nminStack.getMin(); // return -3\nminStack.pop();\nminStack.top();    // return 0\nminStack.getMin(); // return -2'
      }
    ],
    constraints: [
      '-2^31 <= val <= 2^31 - 1',
      'Methods pop, top and getMin will always be called on non-empty stacks.',
      'At most 3 * 10^4 calls will be made to push, pop, top, and getMin.'
    ],
    starterCode: `class MinStack:
    def __init__(self):
        pass

    def push(self, val: int) -> None:
        pass

    def pop(self) -> None:
        pass

    def top(self) -> int:
        pass

    def getMin(self) -> int:
        pass`,
    solutionCode: `class MinStack:
    """
    Two Stacks Approach or Value-Min Pair Stack
    Time Complexity: O(1) for all operations
    Space Complexity: O(N)
    """
    def __init__(self):
        self.stack: list[int] = []
        self.min_stack: list[int] = []

    def push(self, val: int) -> None:
        self.stack.append(val)
        # Push to min_stack the minimum between val and current min
        current_min = min(val, self.min_stack[-1] if self.min_stack else val)
        self.min_stack.append(current_min)

    def pop(self) -> None:
        self.stack.pop()
        self.min_stack.pop()

    def top(self) -> int:
        return self.stack[-1]

    def getMin(self) -> int:
        return self.min_stack[-1]`,
    optimalIntuition: 'Maintain a parallel `min_stack` where `min_stack[i]` stores the minimum value in the stack from index 0 up to index `i`. Every `push` records the new minimum, and every `pop` removes the corresponding min state in O(1) time.',
    stepByStepLogic: [
      'Initialize `stack = []` and `min_stack = []`.',
      'In `push(val)`: push `val` to `stack`. Determine `current_min = min(val, min_stack[-1] if min_stack else val)` and push to `min_stack`.',
      'In `pop()`: pop from both `stack` and `min_stack`.',
      'In `top()`: return `stack[-1]`.',
      'In `getMin()`: return `min_stack[-1]`.'
    ],
    complexity: {
      time: 'O(1)',
      space: 'O(N)',
      timeExplanation: 'All operations push, pop, top, getMin are direct array indexing/appends.',
      spaceExplanation: 'Two stacks of size N.'
    },
    commonPitfalls: ['Attempting to scan the stack for min during getMin() which is O(N) instead of required O(1).'],
    pythonicTips: ['Tracking `(val, current_min)` tuple in a single stack is another Pythonic alternative.'],
    visualizerType: 'stack',
    testCases: [{ input: 'push(-2), push(0), push(-3), getMin()', expected: '-3' }],
    tags: ['Stack', 'Design', 'Medium']
  },

  // DAY 23 - Binary Search
  {
    id: 'search-in-rotated-sorted-array',
    day: 23,
    title: 'Search in Rotated Sorted Array',
    category: 'Binary Search',
    difficulty: 'Medium',
    leetcodeNumber: 33,
    leetcodeUrl: 'https://leetcode.com/problems/search-in-rotated-sorted-array/',
    companies: ['Meta', 'Amazon', 'Google', 'Apple', 'Microsoft'],
    description: 'There is an integer array `nums` sorted in ascending order (with distinct values), rotated at an unknown pivot index. Given the array `nums` after the possible rotation and an integer `target`, return the index of `target` if it is in `nums`, or `-1` if it is not in `nums`. Must achieve `O(log n)` runtime.',
    examples: [
      { input: 'nums = [4,5,6,7,0,1,2], target = 0', output: '4' },
      { input: 'nums = [4,5,6,7,0,1,2], target = 3', output: '-1' }
    ],
    constraints: ['1 <= nums.length <= 5000', '-10^4 <= nums[i], target <= 10^4'],
    starterCode: `def search_rotated(nums: list[int], target: int) -> int:
    # Write your O(log N) solution
    pass`,
    solutionCode: `def search_rotated(nums: list[int], target: int) -> int:
    """
    Modified Binary Search identifying the sorted half
    Time Complexity: O(log N)
    Space Complexity: O(1)
    """
    left, right = 0, len(nums) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if nums[mid] == target:
            return mid
            
        # Check if left half is normally sorted
        if nums[left] <= nums[mid]:
            if nums[left] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        # Otherwise, right half must be sorted
        else:
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1
                
    return -1`,
    optimalIntuition: 'In any rotated sorted array, at least one half (`[left..mid]` or `[mid..right]`) is guaranteed to be strictly sorted. Determine which half is sorted, check if `target` falls within its range, and binary search accordingly!',
    stepByStepLogic: [
      'Initialize `left = 0`, `right = len(nums) - 1`.',
      'Compute `mid = (left + right) // 2`. If `nums[mid] == target`, return `mid`.',
      'If `nums[left] <= nums[mid]`: left half is sorted. If `target` is in range `[nums[left], nums[mid])`, `right = mid - 1`; else `left = mid + 1`.',
      'Else: right half is sorted. If `target` is in range `(nums[mid], nums[right]]`, `left = mid + 1`; else `right = mid - 1`.',
      'Return -1 if not found.'
    ],
    complexity: {
      time: 'O(log N)',
      space: 'O(1)',
      timeExplanation: 'Halves the search range each step.',
      spaceExplanation: 'Constant extra variables.'
    },
    commonPitfalls: ['Using `<` instead of `<=` when comparing `nums[left] <= nums[mid]`.'],
    pythonicTips: ['Mastering the sorted-half check makes all rotated binary search problems trivial.'],
    visualizerType: 'binary-search',
    testCases: [
      { input: '[4,5,6,7,0,1,2], 0', expected: '4' },
      { input: '[4,5,6,7,0,1,2], 3', expected: '-1' }
    ],
    tags: ['Binary Search', 'Array', 'Medium']
  },

  // DAY 24 - Linked List
  {
    id: 'merge-two-sorted-lists',
    day: 24,
    title: 'Merge Two Sorted Lists',
    category: 'Linked List',
    difficulty: 'Easy',
    leetcodeNumber: 21,
    leetcodeUrl: 'https://leetcode.com/problems/merge-two-sorted-lists/',
    companies: ['Amazon', 'Apple', 'Google', 'Microsoft', 'Meta'],
    description: 'You are given the heads of two sorted linked lists `list1` and `list2`. Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists. Return the head of the merged linked list.',
    examples: [
      { input: 'list1 = [1,2,4], list2 = [1,3,4]', output: '[1,1,2,3,4,4]' },
      { input: 'list1 = [], list2 = []', output: '[]' }
    ],
    constraints: ['The number of nodes in both lists is in the range [0, 50].', '-100 <= Node.val <= 100'],
    starterCode: `def merge_two_lists(list1, list2):
    # Write your solution here
    pass`,
    solutionCode: `def merge_two_lists(list1, list2):
    """
    Dummy Head + Pointer Splicing
    Time Complexity: O(N + M)
    Space Complexity: O(1)
    """
    dummy = ListNode(0)
    tail = dummy
    
    while list1 and list2:
        if list1.val <= list2.val:
            tail.next = list1
            list1 = list1.next
        else:
            tail.next = list2
            list2 = list2.next
        tail = tail.next
        
    # Attach whichever list has remaining nodes
    tail.next = list1 if list1 else list2
    
    return dummy.next`,
    optimalIntuition: 'Use a dummy node to anchor the result head. Compare values at `list1` and `list2`, attach the smaller node to `tail.next`, and advance `tail`. Once one list is exhausted, attach the remainder of the other list in O(1).',
    stepByStepLogic: [
      'Create `dummy = ListNode(0)` and `tail = dummy`.',
      'While both `list1` and `list2` are non-null:',
      '  If `list1.val <= list2.val`: `tail.next = list1`, advance `list1`.',
      '  Else: `tail.next = list2`, advance `list2`.',
      '  Advance `tail = tail.next`.',
      'Attach `tail.next = list1 or list2`.',
      'Return `dummy.next`.'
    ],
    complexity: {
      time: 'O(N + M)',
      space: 'O(1)',
      timeExplanation: 'Traverses each node in both lists once.',
      spaceExplanation: 'Rearranges existing pointers with zero new node allocations.'
    },
    commonPitfalls: ['Creating new ListNode instances instead of reusing existing node pointers.'],
    pythonicTips: ['A dummy head pattern eliminates edge cases for initializing the head of a linked list.'],
    visualizerType: 'linked-list',
    testCases: [
      { input: '[1,2,4], [1,3,4]', expected: '[1,1,2,3,4,4]' }
    ],
    tags: ['Linked List', 'Recursion', 'Easy']
  },

  // DAY 25 - Trees
  {
    id: 'maximum-depth-of-binary-tree',
    day: 25,
    title: 'Maximum Depth of Binary Tree',
    category: 'Trees',
    difficulty: 'Easy',
    leetcodeNumber: 104,
    leetcodeUrl: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Spotify'],
    description: 'Given the `root` of a binary tree, return its maximum depth. A binary tree\'s maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.',
    examples: [
      { input: 'root = [3,9,20,null,null,15,7]', output: '3' },
      { input: 'root = [1,null,2]', output: '2' }
    ],
    constraints: ['The number of nodes in the tree is in the range [0, 10^4].', '-100 <= Node.val <= 100'],
    starterCode: `def max_depth(root) -> int:
    # Write your solution here
    pass`,
    solutionCode: `def max_depth(root) -> int:
    """
    Recursive DFS Depth Calculation
    Time Complexity: O(N)
    Space Complexity: O(H)
    """
    if not root:
        return 0
        
    return 1 + max(max_depth(root.left), max_depth(root.right))`,
    optimalIntuition: 'The maximum depth of any tree rooted at `root` is `1 + max(depth(left_child), depth(right_child))`. Base case: an empty tree (`None`) has depth 0.',
    stepByStepLogic: [
      'If `root is None`, return `0`.',
      'Recursively compute left subtree depth: `max_depth(root.left)`.',
      'Recursively compute right subtree depth: `max_depth(root.right)`.',
      'Return `1 + max(left_depth, right_depth)`.'
    ],
    complexity: {
      time: 'O(N)',
      space: 'O(H)',
      timeExplanation: 'Visits every node once.',
      spaceExplanation: 'Max recursion stack equals tree height H.'
    },
    commonPitfalls: ['Forgetting the base case for empty root.'],
    pythonicTips: ['Clean 2-line recursive DFS is standard Pythonic practice.'],
    visualizerType: 'tree',
    testCases: [{ input: '[3,9,20,null,null,15,7]', expected: '3' }],
    tags: ['Tree', 'DFS', 'BFS', 'Easy']
  },

  // DAY 26 - Heap / Priority Queue
  {
    id: 'kth-largest-element-in-an-array',
    day: 26,
    title: 'Kth Largest Element in an Array',
    category: 'Heap / Priority Queue',
    difficulty: 'Medium',
    leetcodeNumber: 215,
    leetcodeUrl: 'https://leetcode.com/problems/kth-largest-element-in-an-array/',
    companies: ['Meta', 'Amazon', 'Google', 'Microsoft', 'Apple'],
    description: 'Given an integer array `nums` and an integer `k`, return the `k-th` largest element in the array. Can you solve it in better than `O(N log N)` time?',
    examples: [
      { input: 'nums = [3,2,1,5,6,4], k = 2', output: '5' },
      { input: 'nums = [3,2,3,1,2,4,5,5,6], k = 4', output: '4' }
    ],
    constraints: ['1 <= k <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
    starterCode: `def find_kth_largest(nums: list[int], k: int) -> int:
    # Write your Min-Heap O(N log K) solution
    pass`,
    solutionCode: `import heapq

def find_kth_largest(nums: list[int], k: int) -> int:
    """
    Min-Heap of size K
    Time Complexity: O(N log K)
    Space Complexity: O(K)
    """
    min_heap: list[int] = []
    
    for num in nums:
        heapq.heappush(min_heap, num)
        if len(min_heap) > k:
            heapq.heappop(min_heap)
            
    # Top of min_heap is the kth largest element
    return min_heap[0]`,
    optimalIntuition: 'Keep a Min-Heap containing the `k` largest elements seen so far. For each number, push it in; if heap size exceeds `k`, pop the smallest. At the end, the root of the heap is the smallest of the top-k, which is precisely the k-th largest!',
    stepByStepLogic: [
      'Initialize an empty `min_heap = []`.',
      'Iterate through each `num` in `nums`:',
      '  `heapq.heappush(min_heap, num)`',
      '  If `len(min_heap) > k`: `heapq.heappop(min_heap)`.',
      'Return `min_heap[0]`.'
    ],
    complexity: {
      time: 'O(N log K)',
      space: 'O(K)',
      timeExplanation: 'Pushing/popping in a heap of size K takes O(log K) for N elements.',
      spaceExplanation: 'Min-heap retains only K elements.'
    },
    commonPitfalls: ['Using a Max-Heap with all N elements takes O(N + K log N) and O(N) space instead of O(K) space.'],
    pythonicTips: ['Python\'s `heapq` module provides a Min-Heap by default. `heapq.nlargest(k, nums)[-1]` is a convenient built-in.'],
    testCases: [
      { input: '[3,2,1,5,6,4], 2', expected: '5' },
      { input: '[3,2,3,1,2,4,5,5,6], 4', expected: '4' }
    ],
    tags: ['Heap', 'Priority Queue', 'Quickselect', 'Medium']
  },

  // DAY 27 - Backtracking
  {
    id: 'subsets',
    day: 27,
    title: 'Subsets (Power Set)',
    category: 'Backtracking',
    difficulty: 'Medium',
    leetcodeNumber: 78,
    leetcodeUrl: 'https://leetcode.com/problems/subsets/',
    companies: ['Meta', 'Amazon', 'Google', 'Bloomberg', 'Uber'],
    description: 'Given an integer array `nums` of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets. Return the solution in any order.',
    examples: [
      { input: 'nums = [1,2,3]', output: '[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]' },
      { input: 'nums = [0]', output: '[[],[0]]' }
    ],
    constraints: ['1 <= nums.length <= 10', '-10 <= nums[i] <= 10', 'All the numbers of nums are unique.'],
    starterCode: `def subsets(nums: list[int]) -> list[list[int]]:
    # Write your backtracking solution here
    pass`,
    solutionCode: `def subsets(nums: list[int]) -> list[list[int]]:
    """
    Backtracking / Decision Tree (Include / Exclude)
    Time Complexity: O(N * 2^N)
    Space Complexity: O(N) auxiliary recursion stack
    """
    res: list[list[int]] = []
    subset: list[int] = []
    
    def backtrack(i: int) -> None:
        if i >= len(nums):
            res.append(subset.copy())
            return
            
        # Decision 1: Include nums[i]
        subset.append(nums[i])
        backtrack(i + 1)
        
        # Decision 2: Exclude nums[i] (backtrack)
        subset.pop()
        backtrack(i + 1)
        
    backtrack(0)
    return res`,
    optimalIntuition: 'For each element at index `i`, we make two branch decisions: either include `nums[i]` in the current subset, or exclude it. This explores all 2^N combinations in a binary decision tree.',
    stepByStepLogic: [
      'Initialize `res = []` and `subset = []`.',
      'Define `backtrack(i)`:',
      '  If `i == len(nums)`: append `subset.copy()` to `res` and return.',
      '  Include `nums[i]`: `subset.append(nums[i])`, call `backtrack(i + 1)`.',
      '  Backtrack: `subset.pop()`, call `backtrack(i + 1)`.',
      'Call `backtrack(0)` and return `res`.'
    ],
    complexity: {
      time: 'O(N * 2^N)',
      space: 'O(N)',
      timeExplanation: 'There are 2^N subsets, each taking O(N) to copy into result.',
      spaceExplanation: 'Recursion tree depth is N.'
    },
    commonPitfalls: ['Appending `subset` instead of `subset.copy()` or `subset[:]` — will store mutated references!'],
    pythonicTips: ['Always copy lists before saving to output accumulator in Python backtracking.'],
    testCases: [{ input: '[1, 2, 3]', expected: '[[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]' }],
    tags: ['Backtracking', 'Bit Manipulation', 'Medium']
  },

  // DAY 28 - Intervals & Bit Manipulation
  {
    id: 'merge-intervals',
    day: 28,
    title: 'Merge Intervals',
    category: 'Intervals & Bit Manipulation',
    difficulty: 'Medium',
    leetcodeNumber: 56,
    leetcodeUrl: 'https://leetcode.com/problems/merge-intervals/',
    companies: ['Google', 'Meta', 'Amazon', 'Apple', 'Microsoft', 'Bloomberg'],
    description: 'Given an array of `intervals` where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.',
    examples: [
      { input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]', output: '[[1,6],[8,10],[15,18]]', explanation: 'Since intervals [1,3] and [2,6] overlap, merge them into [1,6].' },
      { input: 'intervals = [[1,4],[4,5]]', output: '[[1,5]]' }
    ],
    constraints: ['1 <= intervals.length <= 10^4', 'intervals[i].length == 2', '0 <= start_i <= end_i <= 10^4'],
    starterCode: `def merge_intervals(intervals: list[list[int]]) -> list[list[int]]:
    # Write your solution here
    pass`,
    solutionCode: `def merge_intervals(intervals: list[list[int]]) -> list[list[int]]:
    """
    Sort by Start Time + Single Pass Merge
    Time Complexity: O(N log N)
    Space Complexity: O(N) for sorting / output
    """
    # Sort intervals by their start time
    intervals.sort(key=lambda x: x[0])
    
    merged: list[list[int]] = [intervals[0]]
    
    for start, end in intervals[1:]:
        last_end = merged[-1][1]
        
        if start <= last_end:
            # Overlap detected! Merge by taking maximum end time
            merged[-1][1] = max(last_end, end)
        else:
            # Disjoint interval
            merged.append([start, end])
            
    return merged`,
    optimalIntuition: 'Sort intervals by start time. Iterate through the intervals: if current interval `start <= merged[-1].end`, they overlap, so expand `merged[-1].end = max(merged[-1].end, end)`. Otherwise, add it as a new interval.',
    stepByStepLogic: [
      'Sort `intervals` by `start` using `key=lambda x: x[0]`.',
      'Initialize `merged = [intervals[0]]`.',
      'For `start, end` in `intervals[1:]`:',
      '  If `start <= merged[-1][1]`: `merged[-1][1] = max(merged[-1][1], end)`.',
      '  Else: `merged.append([start, end])`.',
      'Return `merged`.'
    ],
    complexity: {
      time: 'O(N log N)',
      space: 'O(N)',
      timeExplanation: 'Sorting N intervals takes O(N log N), followed by a linear O(N) scan.',
      spaceExplanation: 'Result list storage.'
    },
    commonPitfalls: ['Forgetting `max(last_end, end)` when an interval is completely engulfed by the previous one (e.g. `[1, 5]` and `[2, 3]`).'],
    pythonicTips: ['`intervals.sort(key=lambda x: x[0])` sorts in place efficiently.'],
    testCases: [
      { input: '[[1,3],[2,6],[8,10],[15,18]]', expected: '[[1,6],[8,10],[15,18]]' },
      { input: '[[1,4],[4,5]]', expected: '[[1,5]]' }
    ],
    tags: ['Intervals', 'Sorting', 'Array', 'Medium']
  },

  // DAY 29 - Bit Manipulation
  {
    id: 'single-number',
    day: 29,
    title: 'Single Number',
    category: 'Intervals & Bit Manipulation',
    difficulty: 'Easy',
    leetcodeNumber: 136,
    leetcodeUrl: 'https://leetcode.com/problems/single-number/',
    companies: ['Amazon', 'Google', 'Apple', 'Meta'],
    description: 'Given a non-empty array of integers `nums`, every element appears twice except for one. Find that single one. You must implement a solution with linear runtime complexity `O(N)` and use only constant `O(1)` extra space.',
    examples: [
      { input: 'nums = [2,2,1]', output: '1' },
      { input: 'nums = [4,1,2,1,2]', output: '4' },
      { input: 'nums = [1]', output: '1' }
    ],
    constraints: ['1 <= nums.length <= 3 * 10^4', '-3 * 10^4 <= nums[i] <= 3 * 10^4', 'Each element appears twice except for one which appears once.'],
    starterCode: `def single_number(nums: list[int]) -> int:
    # Write your O(N) time O(1) space XOR solution
    pass`,
    solutionCode: `from functools import reduce
import operator

def single_number(nums: list[int]) -> int:
    """
    Bitwise XOR properties:
    a ^ a = 0
    a ^ 0 = a
    XOR is commutative and associative
    Time Complexity: O(N)
    Space Complexity: O(1)
    """
    res = 0
    for num in nums:
        res ^= num
    return res`,
    optimalIntuition: 'XOR has two magical algebraic properties: `x ^ x = 0` (any number XORed with itself cancels out to 0) and `x ^ 0 = x`. XORing all elements together cancels every duplicate pair, leaving only the unique single number!',
    stepByStepLogic: [
      'Initialize `res = 0`.',
      'For each `num` in `nums`: `res ^= num`.',
      'Return `res`.'
    ],
    complexity: {
      time: 'O(N)',
      space: 'O(1)',
      timeExplanation: 'Single pass XOR accumulation.',
      spaceExplanation: 'Only one integer variable.'
    },
    commonPitfalls: ['Using a hash set or dictionary which consumes O(N) memory violating the constant space constraint.'],
    pythonicTips: ['`reduce(operator.xor, nums)` expresses this in a functional one-liner.'],
    testCases: [
      { input: '[2, 2, 1]', expected: '1' },
      { input: '[4, 1, 2, 1, 2]', expected: '4' }
    ],
    tags: ['Bit Manipulation', 'Array', 'Easy']
  },

  // DAY 30 - Dynamic Programming (2-D)
  {
    id: 'unique-paths',
    day: 30,
    title: 'Unique Paths',
    category: '2-D Dynamic Programming',
    difficulty: 'Medium',
    leetcodeNumber: 62,
    leetcodeUrl: 'https://leetcode.com/problems/unique-paths/',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Apple'],
    description: 'There is a robot on an `m x n` grid. The robot is initially located at the top-left corner `(0, 0)` and tries to move to the bottom-right corner `(m - 1, n - 1)`. The robot can only move either down or right at any point in time. Given the two integers `m` and `n`, return the number of possible unique paths.',
    examples: [
      { input: 'm = 3, n = 7', output: '28' },
      { input: 'm = 3, n = 2', output: '3' }
    ],
    constraints: ['1 <= m, n <= 100'],
    starterCode: `def unique_paths(m: int, n: int) -> int:
    # Write your DP solution here
    pass`,
    solutionCode: `def unique_paths(m: int, n: int) -> int:
    """
    Space-Optimized 1D Row DP
    Time Complexity: O(M * N)
    Space Complexity: O(N)
    """
    # row represents the number of paths to each column in the previous row
    row = [1] * n
    
    # Process from second row to m-th row
    for _ in range(m - 1):
        new_row = [1] * n
        for c in range(1, n):
            # paths = paths from above (row[c]) + paths from left (new_row[c-1])
            new_row[c] = row[c] + new_row[c - 1]
        row = new_row
        
    return row[-1]`,
    optimalIntuition: 'To reach cell `(r, c)`, the robot could only have come from `(r-1, c)` (from above) or `(r, c-1)` (from the left). Thus `dp[r][c] = dp[r-1][c] + dp[r][c-1]`. We can compress the 2D matrix into a single 1D row array of size `n`!',
    stepByStepLogic: [
      'Initialize `row = [1] * n` (first row all 1s).',
      'Loop `m - 1` times for subsequent rows:',
      '  Initialize `new_row = [1] * n`.',
      '  For `c` from 1 to `n-1`: `new_row[c] = row[c] + new_row[c-1]`.',
      '  Update `row = new_row`.',
      'Return `row[-1]`.'
    ],
    complexity: {
      time: 'O(M * N)',
      space: 'O(N)',
      timeExplanation: 'Nested loops visit each cell in M x N grid.',
      spaceExplanation: 'Optimized from O(M*N) down to a single row of size N.'
    },
    commonPitfalls: ['Combinatorics `comb(m+n-2, m-1)` is also O(min(M, N)), but DP formulation is standard interview practice.'],
    pythonicTips: ['`math.comb(m + n - 2, m - 1)` from standard library computes this in O(min(M, N)) time!'],
    testCases: [
      { input: '3, 7', expected: '28' },
      { input: '3, 2', expected: '3' }
    ],
    tags: ['Dynamic Programming', 'Matrix', 'Combinatorics', 'Medium']
  }
];

// Mark all core problems with isCore: true
CORE_30_PROBLEMS.forEach((p) => {
  p.isCore = true;
});

export const BLIND_75_PROBLEMS: Problem[] = [
  ...CORE_30_PROBLEMS,
  ...EXTENDED_BLIND75_PROBLEMS,
  ...EXTENDED_BLIND75_PROBLEMS_PART2
];

export const PROBLEMS_DATA: Problem[] = BLIND_75_PROBLEMS;

export function getProblemsByTrack(track: CurriculumTrack): Problem[] {
  if (track === 'core30') {
    return CORE_30_PROBLEMS;
  }
  return BLIND_75_PROBLEMS;
}

export const CATEGORIES_LIST = [
  'Arrays & Hashing',
  'Two Pointers',
  'Sliding Window',
  'Stack',
  'Binary Search',
  'Linked List',
  'Trees',
  'Tries',
  'Heap / Priority Queue',
  'Backtracking',
  'Graphs',
  'Advanced Graphs',
  '1-D Dynamic Programming',
  '2-D Dynamic Programming',
  'Greedy',
  'Intervals & Bit Manipulation'
] as const;
