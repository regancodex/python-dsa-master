import { VisualStep } from './pythonRunner';
import { Problem } from '../types/dsa';

export interface VisualDataPayload {
  steps: VisualStep[];
  arrayItems: (number | string)[];
  targetLabel?: string;
  targetValue?: string | number;
  dataStructureType: 'array' | 'hash-map' | 'two-pointers' | 'binary-search' | 'stack' | 'linked-list' | 'sliding-window' | 'three-sum' | 'tree' | 'graph' | 'dp' | 'heap' | 'backtracking';
  specialFormula?: {
    title: string;
    formula: string;
    description: string;
  };
}

export function getProblemVisualizerData(problem: Problem): VisualDataPayload {
  const problemId = problem.id;

  // DAY 1: Two Sum
  if (problemId === 'two-sum') {
    const nums = [2, 7, 11, 15];
    const target = 9;
    const seen: Record<string, number> = {};
    const steps: VisualStep[] = [
      {
        stepNumber: 1,
        description: 'Start: Empty Hash Map seen = {}',
        variables: { target: 9, seen: '{}', step: 'Initialization' },
        pointers: [{ name: 'i=0', index: 0, color: 'text-indigo-400 border-indigo-400' }],
        arrayHighlight: { indices: [0], type: 'active' },
        hashState: {},
        explanation: 'We iterate through nums. For each number, calculate complement = target - num and check if complement already exists in seen dictionary in O(1) time.'
      },
      {
        stepNumber: 2,
        description: 'i=0: num=2 -> Need complement: 9 - 2 = 7',
        variables: { current_num: 2, complement_needed: 7, 'in_seen?': 'No ❌', action: 'Store seen[2] = 0' },
        pointers: [{ name: 'num=2', index: 0, color: 'text-indigo-400 border-indigo-400' }],
        arrayHighlight: { indices: [0], type: 'active' },
        hashState: {},
        explanation: 'At index 0 (value 2), we calculate: 9 - 2 = 7. Is 7 in seen? No. So store seen[2] = 0.'
      },
      {
        stepNumber: 3,
        description: 'Hash Map updated: seen = { 2: 0 }',
        variables: { seen: '{ 2: 0 }', next: 'Move to index 1' },
        pointers: [{ name: 'stored', index: 0, color: 'text-slate-400 border-slate-500' }],
        arrayHighlight: { indices: [0], type: 'selected' },
        hashState: { '2': 0 },
        explanation: 'Number 2 is remembered at index 0. Moving to index 1 (value 7).'
      },
      {
        stepNumber: 4,
        description: 'i=1: num=7 -> Need complement: 9 - 7 = 2. Found in seen! 🎉',
        variables: { current_num: 7, complement_needed: 2, 'in_seen?': 'YES! ✅ (index 0)', solution: '[0, 1]' },
        pointers: [
          { name: 'seen[2]=0', index: 0, color: 'text-emerald-400 border-emerald-400' },
          { name: 'current=7', index: 1, color: 'text-amber-400 border-amber-400' }
        ],
        arrayHighlight: { indices: [0, 1], type: 'matched' },
        hashState: { '2': 0 },
        explanation: '🎯 MATCH FOUND! 9 - 7 = 2 exists in seen at index 0. Return [0, 1]. Solved in single pass O(N) time!'
      }
    ];

    return {
      steps,
      arrayItems: nums,
      targetLabel: 'Target Sum',
      targetValue: target,
      dataStructureType: 'hash-map',
      specialFormula: {
        title: 'Two Sum Complement Equation',
        formula: 'complement = target - num',
        description: 'For each number, calculate what other number is required to make 9. Dict lookup is instant O(1).'
      }
    };
  }

  // DAY 2: Contains Duplicate
  if (problemId === 'contains-duplicate') {
    const nums = [1, 2, 3, 1];
    const steps: VisualStep[] = [
      {
        stepNumber: 1,
        description: 'Seen set is empty: seen = set()',
        variables: { seen: '{}', current: 1 },
        pointers: [{ name: 'i=0 (1)', index: 0, color: 'text-indigo-400 border-indigo-400' }],
        arrayHighlight: { indices: [0], type: 'active' },
        hashState: {},
        explanation: 'Initialize an empty hash set. Add number 1 to the set.'
      },
      {
        stepNumber: 2,
        description: 'Process index 1 (val=2) & index 2 (val=3)',
        variables: { seen: '{1, 2, 3}', current: 3, duplicate: 'None yet' },
        pointers: [{ name: 'i=2 (3)', index: 2, color: 'text-indigo-400 border-indigo-400' }],
        arrayHighlight: { indices: [2], type: 'active' },
        hashState: { '1': 0, '2': 1, '3': 2 },
        explanation: 'Both 2 and 3 are unique and successfully added to seen set.'
      },
      {
        stepNumber: 3,
        description: 'i=3 (val=1): 1 already exists in seen! Duplicate detected! 🚨',
        variables: { current: 1, inSeen: 'YES! ✅', return: 'True' },
        pointers: [
          { name: '1st seen', index: 0, color: 'text-rose-400 border-rose-400' },
          { name: 'Duplicate', index: 3, color: 'text-rose-400 border-rose-400' }
        ],
        arrayHighlight: { indices: [0, 3], type: 'matched' },
        hashState: { '1': 0, '2': 1, '3': 2 },
        explanation: '🎯 Duplicate found in O(1) time! Return True immediately.'
      }
    ];

    return {
      steps,
      arrayItems: nums,
      targetLabel: 'Check Method',
      targetValue: 'len(nums) != len(set(nums))',
      dataStructureType: 'hash-map'
    };
  }

  // DAY 3: Valid Anagram
  if (problemId === 'valid-anagram') {
    const chars = ['a', 'n', 'a', 'g', 'r', 'a', 'm'];
    const steps: VisualStep[] = [
      {
        stepNumber: 1,
        description: 'Check lengths: len(s) == 7 and len(t) == 7. Lengths match!',
        variables: { 'len(s)': 7, 'len(t)': 7, status: 'Proceed to frequency count' },
        pointers: [{ name: 's[0]', index: 0, color: 'text-indigo-400 border-indigo-400' }],
        arrayHighlight: { indices: [0], type: 'active' },
        hashState: {},
        explanation: 'If string lengths differ, they can never be anagrams. Since 7 == 7, we count character frequencies.'
      },
      {
        stepNumber: 2,
        description: 'Count frequencies in s="anagram" -> Counter(s)',
        variables: { a: 3, n: 1, g: 1, r: 1, m: 1 },
        pointers: [{ name: 'all chars', index: 3, color: 'text-indigo-400 border-indigo-400' }],
        arrayHighlight: { indices: [0, 1, 2, 3, 4, 5, 6], type: 'active' },
        hashState: { 'a': 3, 'n': 1, 'g': 1, 'r': 1, 'm': 1 },
        explanation: 'Count character frequencies in s: {\'a\': 3, \'n\': 1, \'g\': 1, \'r\': 1, \'m\': 1}.'
      },
      {
        stepNumber: 3,
        description: 'Compare with t="nagaram" -> Counter(t) matches Counter(s)! 🎉',
        variables: { 'Counter(s) == Counter(t)': 'True', is_anagram: 'True ✅' },
        pointers: [{ name: 'Match', index: 0, color: 'text-emerald-400 border-emerald-400' }],
        arrayHighlight: { indices: [0, 1, 2, 3, 4, 5, 6], type: 'matched' },
        hashState: { 'a': 3, 'n': 1, 'g': 1, 'r': 1, 'm': 1 },
        explanation: '🎯 Exact frequency match! Both words use identical letters with identical counts. Return True.'
      }
    ];

    return {
      steps,
      arrayItems: chars,
      targetLabel: 'Target Match',
      targetValue: 't = "nagaram"',
      dataStructureType: 'hash-map',
      specialFormula: {
        title: 'Anagram Condition',
        formula: 'Counter(s) == Counter(t)',
        description: 'Anagrams must have identical 26-letter frequency maps in O(N) time.'
      }
    };
  }

  // DAY 4: Group Anagrams
  if (problemId === 'group-anagrams') {
    const words = ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'];
    const steps: VisualStep[] = [
      {
        stepNumber: 1,
        description: 'Process "eat" -> Sorted key: "aet". Map: {"aet": ["eat"]}',
        variables: { word: 'eat', key: 'aet', group: '["eat"]' },
        pointers: [{ name: 'i=0 ("eat")', index: 0, color: 'text-indigo-400 border-indigo-400' }],
        arrayHighlight: { indices: [0], type: 'active' },
        hashState: { 'aet': 1 },
        explanation: 'Sorted characters of "eat" produce signature "aet". Add to group list.'
      },
      {
        stepNumber: 2,
        description: 'Process "tea" and "ate" -> Both share key "aet"!',
        variables: { key_aet: '["eat", "tea", "ate"]', key_ant: '["tan", "nat"]', key_abt: '["bat"]' },
        pointers: [
          { name: 'eat', index: 0, color: 'text-emerald-400 border-emerald-400' },
          { name: 'tea', index: 1, color: 'text-emerald-400 border-emerald-400' },
          { name: 'ate', index: 3, color: 'text-emerald-400 border-emerald-400' }
        ],
        arrayHighlight: { indices: [0, 1, 3], type: 'matched' },
        hashState: { 'aet': 3, 'ant': 2, 'abt': 1 },
        explanation: '"eat", "tea", "ate" all hash to key "aet" and are grouped together in O(N * K) time.'
      },
      {
        stepNumber: 3,
        description: 'Final Result: [["eat","tea","ate"], ["tan","nat"], ["bat"]] 🎉',
        variables: { total_groups: 3, result: 'list(map.values())' },
        pointers: [{ name: '3 Groups', index: 2, color: 'text-purple-400 border-purple-400' }],
        arrayHighlight: { indices: [0, 1, 2, 3, 4, 5], type: 'matched' },
        hashState: { 'aet': 3, 'ant': 2, 'abt': 1 },
        explanation: '🎯 Return all grouped bucket lists from the dictionary values!'
      }
    ];

    return {
      steps,
      arrayItems: words,
      targetLabel: 'Grouping Key',
      targetValue: 'tuple(count) or sorted(word)',
      dataStructureType: 'hash-map'
    };
  }

  // DAY 5: Top K Frequent Elements
  if (problemId === 'top-k-frequent-elements') {
    const nums = [1, 1, 1, 2, 2, 3];
    const steps: VisualStep[] = [
      {
        stepNumber: 1,
        description: 'Count frequencies: {1: 3, 2: 2, 3: 1}',
        variables: { count_1: 3, count_2: 2, count_3: 1, k: 2 },
        pointers: [{ name: 'freq count', index: 0, color: 'text-indigo-400 border-indigo-400' }],
        arrayHighlight: { indices: [0, 1, 2], type: 'active' },
        hashState: { '1': 3, '2': 2, '3': 1 },
        explanation: '1 appears 3 times, 2 appears 2 times, 3 appears 1 time.'
      },
      {
        stepNumber: 2,
        description: 'Bucket Sort: buckets[freq] -> bucket[3]=[1], bucket[2]=[2], bucket[1]=[3]',
        variables: { 'bucket[3]': '[1]', 'bucket[2]': '[2]', 'bucket[1]': '[3]' },
        pointers: [
          { name: 'freq=3 (val=1)', index: 0, color: 'text-emerald-400 border-emerald-400' },
          { name: 'freq=2 (val=2)', index: 3, color: 'text-amber-400 border-amber-400' }
        ],
        arrayHighlight: { indices: [0, 1, 2, 3, 4], type: 'matched' },
        hashState: { 'freq_3': 1, 'freq_2': 2, 'freq_1': 3 },
        explanation: 'Using frequency as array indices achieves strict O(N) time without sorting!'
      },
      {
        stepNumber: 3,
        description: 'Scan buckets backwards from freq=3 down: Collect top k=2 -> [1, 2] 🎉',
        variables: { result: '[1, 2]', target_k: 2, status: 'Complete' },
        pointers: [{ name: 'Top 2', index: 0, color: 'text-emerald-400 border-emerald-400' }],
        arrayHighlight: { indices: [0, 3], type: 'matched' },
        explanation: '🎯 Collected [1, 2] in O(N) time!'
      }
    ];

    return {
      steps,
      arrayItems: nums,
      targetLabel: 'Top K Elements',
      targetValue: 'k = 2',
      dataStructureType: 'array',
      specialFormula: {
        title: 'Bucket Sort by Frequency',
        formula: 'buckets[freq].append(num)',
        description: 'Indexing by count eliminates the O(N log N) sorting overhead.'
      }
    };
  }

  // DAY 6: Product of Array Except Self
  if (problemId === 'product-of-array-except-self') {
    const nums = [1, 2, 3, 4];
    const steps: VisualStep[] = [
      {
        stepNumber: 1,
        description: 'Pass 1 (Prefix Products): res = [1, 1, 2, 6]',
        variables: { prefix: 6, 'res[0]': 1, 'res[1]': 1, 'res[2]': 2, 'res[3]': 6 },
        pointers: [{ name: 'prefix=6', index: 3, color: 'text-indigo-400 border-indigo-400' }],
        arrayHighlight: { indices: [0, 1, 2, 3], type: 'active' },
        explanation: 'Forward pass stores product of all elements to the left of each index.'
      },
      {
        stepNumber: 2,
        description: 'Pass 2 (Suffix Multiply backwards): multiply by postfix running products',
        variables: { postfix: 24, 'res[3]': '6*1=6', 'res[2]': '2*4=8', 'res[1]': '1*12=12', 'res[0]': '1*24=24' },
        pointers: [{ name: 'postfix pass', index: 0, color: 'text-emerald-400 border-emerald-400' }],
        arrayHighlight: { indices: [0, 1, 2, 3], type: 'matched' },
        explanation: 'Backward pass multiplies each cell by product of all elements to its right.'
      },
      {
        stepNumber: 3,
        description: 'Final Result: [24, 12, 8, 6] computed in O(N) time with O(1) extra space! 🎉',
        variables: { answer: '[24, 12, 8, 6]', division_used: 'None ❌ (0 division)' },
        pointers: [{ name: 'Result', index: 0, color: 'text-emerald-400 border-emerald-400' }],
        arrayHighlight: { indices: [0, 1, 2, 3], type: 'matched' },
        explanation: '🎯 Prefix * Suffix gives exact answer for every element without division.'
      }
    ];

    return {
      steps,
      arrayItems: nums,
      targetLabel: 'Product Formula',
      targetValue: 'prefix[i] * suffix[i]',
      dataStructureType: 'array'
    };
  }

  // DAY 7: Longest Consecutive Sequence
  if (problemId === 'longest-consecutive-sequence') {
    const nums = [100, 4, 200, 1, 3, 2];
    const steps: VisualStep[] = [
      {
        stepNumber: 1,
        description: 'Build Hash Set: num_set = {100, 4, 200, 1, 3, 2}',
        variables: { num_set_size: 6, max_streak: 0 },
        pointers: [{ name: 'Set lookup', index: 0, color: 'text-indigo-400 border-indigo-400' }],
        arrayHighlight: { indices: [0, 1, 2, 3, 4, 5], type: 'active' },
        explanation: 'Convert array to set for O(1) neighbor lookups.'
      },
      {
        stepNumber: 2,
        description: 'Check sequence roots (x - 1 not in set): 100 (len 1), 200 (len 1), 1 (root!)',
        variables: { '1-1 in set?': 'No (1 is a Root!)', checking: '1 -> 2 -> 3 -> 4' },
        pointers: [{ name: 'Root: 1', index: 3, color: 'text-emerald-400 border-emerald-400' }],
        arrayHighlight: { indices: [1, 3, 4, 5], type: 'matched' },
        explanation: 'Number 1 has no 0 in set, so it is the beginning of consecutive sequence [1, 2, 3, 4].'
      },
      {
        stepNumber: 3,
        description: 'Chain length for 1: 1 -> 2 -> 3 -> 4 (Length = 4). Max streak = 4! 🎉',
        variables: { sequence: '[1, 2, 3, 4]', length: 4, max_streak: 4 },
        pointers: [{ name: 'Streak=4', index: 1, color: 'text-emerald-400 border-emerald-400' }],
        arrayHighlight: { indices: [1, 3, 4, 5], type: 'matched' },
        explanation: '🎯 Longest consecutive sequence has length 4, solved in O(N) time.'
      }
    ];

    return {
      steps,
      arrayItems: nums,
      targetLabel: 'Longest Streak',
      targetValue: '4',
      dataStructureType: 'array',
      specialFormula: {
        title: 'Sequence Root Test',
        formula: 'if (num - 1) not in num_set:',
        description: 'Only expand when num is a sequence start. Each number visited at most twice.'
      }
    };
  }

  // DAY 8: Valid Palindrome
  if (problemId === 'valid-palindrome') {
    const chars = ['r', 'a', 'c', 'e', 'c', 'a', 'r'];
    const steps: VisualStep[] = [
      {
        stepNumber: 1,
        description: 'Initialize left=0 (\'r\'), right=6 (\'r\')',
        variables: { left_char: 'r', right_char: 'r', matches: 'Yes ✅' },
        pointers: [
          { name: 'L', index: 0, color: 'text-emerald-400 border-emerald-400' },
          { name: 'R', index: 6, color: 'text-amber-400 border-amber-400' }
        ],
        arrayHighlight: { indices: [0, 6], type: 'matched' },
        explanation: 'Symmetric characters match (\'r\' == \'r\'). Move pointers inward.'
      },
      {
        stepNumber: 2,
        description: 'Check left=1 (\'a\'), right=5 (\'a\')',
        variables: { left_char: 'a', right_char: 'a', matches: 'Yes ✅' },
        pointers: [
          { name: 'L', index: 1, color: 'text-emerald-400 border-emerald-400' },
          { name: 'R', index: 5, color: 'text-amber-400 border-amber-400' }
        ],
        arrayHighlight: { indices: [1, 5], type: 'matched' },
        explanation: 'Characters match (\'a\' == \'a\'). Move pointers inward.'
      },
      {
        stepNumber: 3,
        description: 'Pointers meet at center (index 3, \'e\') -> Valid Palindrome! 🎉',
        variables: { center: 'e', result: 'True ✅' },
        pointers: [{ name: 'center', index: 3, color: 'text-purple-400 border-purple-400' }],
        arrayHighlight: { indices: [3], type: 'matched' },
        explanation: 'All characters match symmetrically. Return True.'
      }
    ];

    return {
      steps,
      arrayItems: chars,
      targetLabel: 'Palindrome Check',
      targetValue: 's == s[::-1]',
      dataStructureType: 'two-pointers'
    };
  }

  // DAY 9: Two Sum II - Input Array Is Sorted
  if (problemId === 'two-sum-ii-input-array-is-sorted') {
    const nums = [2, 7, 11, 15];
    const steps: VisualStep[] = [
      {
        stepNumber: 1,
        description: 'Initialize Two Pointers: left=0 (2), right=3 (15)',
        variables: { left: 0, right: 3, sum: '2+15 = 17', target: 9, action: 'Sum > target -> right -= 1' },
        pointers: [
          { name: 'left (2)', index: 0, color: 'text-emerald-400 border-emerald-400' },
          { name: 'right (15)', index: 3, color: 'text-amber-400 border-amber-400' }
        ],
        arrayHighlight: { indices: [0, 3], type: 'active' },
        explanation: 'Array is sorted. Sum 17 > 9, so decrement right pointer to reduce sum.'
      },
      {
        stepNumber: 2,
        description: 'Move right to index 1: left=0 (2), right=1 (7) -> 2 + 7 = 9! 🎉',
        variables: { left: 0, right: 1, sum: '2+7 = 9', target: 9, match: 'YES! ✅ (1-indexed [1, 2])' },
        pointers: [
          { name: 'left=1', index: 0, color: 'text-emerald-400 border-emerald-400' },
          { name: 'right=2', index: 1, color: 'text-amber-400 border-amber-400' }
        ],
        arrayHighlight: { indices: [0, 1], type: 'matched' },
        explanation: '🎯 Target found! Return 1-indexed [1, 2] in O(N) time with O(1) extra space.'
      }
    ];

    return {
      steps,
      arrayItems: nums,
      targetLabel: 'Target Sum',
      targetValue: 9,
      dataStructureType: 'two-pointers'
    };
  }

  // DAY 10: 3Sum
  if (problemId === '3sum') {
    const nums = [-4, -1, -1, 0, 1, 2];
    const steps: VisualStep[] = [
      {
        stepNumber: 1,
        description: 'Step 1: Sort the array -> [-4, -1, -1, 0, 1, 2]',
        variables: { sorted: '[-4, -1, -1, 0, 1, 2]', targetSum: 0 },
        pointers: [{ name: 'i=0 (-4)', index: 0, color: 'text-purple-400 border-purple-400' }],
        arrayHighlight: { indices: [0, 1, 2, 3, 4, 5], type: 'active' },
        explanation: 'Sorting in O(N log N) allows fixing pivot i and running Two Pointers (L and R) for remaining pair.'
      },
      {
        stepNumber: 2,
        description: 'Pivot i=0 (-4), L=1 (-1), R=5 (2) -> Sum = -3 < 0 (Advance L)',
        variables: { 'nums[i]': -4, 'nums[L]': -1, 'nums[R]': 2, sum: -3, target: 0 },
        pointers: [
          { name: 'i', index: 0, color: 'text-purple-400 border-purple-400' },
          { name: 'L', index: 1, color: 'text-emerald-400 border-emerald-400' },
          { name: 'R', index: 5, color: 'text-amber-400 border-amber-400' }
        ],
        arrayHighlight: { indices: [0, 1, 5], type: 'active' },
        explanation: 'Sum is negative, so increment left pointer L += 1 to increase sum.'
      },
      {
        stepNumber: 3,
        description: 'Pivot i=1 (-1), L=2 (-1), R=5 (2) -> Sum = 0! Triplet 1 Found! 🎉',
        variables: { triplet_1: '[-1, -1, 2]', sum: 0, target: 0, match: 'YES! ✅' },
        pointers: [
          { name: 'i', index: 1, color: 'text-purple-400 border-purple-400' },
          { name: 'L', index: 2, color: 'text-emerald-400 border-emerald-400' },
          { name: 'R', index: 5, color: 'text-amber-400 border-amber-400' }
        ],
        arrayHighlight: { indices: [1, 2, 5], type: 'matched' },
        explanation: '🎯 First triplet: [-1, -1, 2] = 0. Append to result, then advance L and decrement R skipping duplicates.'
      },
      {
        stepNumber: 4,
        description: 'Pivot i=1 (-1), L=3 (0), R=4 (1) -> Sum = 0! Triplet 2 Found! 🎉',
        variables: { triplet_2: '[-1, 0, 1]', result: '[[-1,-1,2], [-1,0,1]]' },
        pointers: [
          { name: 'i', index: 1, color: 'text-purple-400 border-purple-400' },
          { name: 'L', index: 3, color: 'text-emerald-400 border-emerald-400' },
          { name: 'R', index: 4, color: 'text-amber-400 border-amber-400' }
        ],
        arrayHighlight: { indices: [1, 3, 4], type: 'matched' },
        explanation: '🎯 Second triplet: [-1, 0, 1] = 0. All triplets found in O(N²) time without duplicate sets.'
      }
    ];

    return {
      steps,
      arrayItems: nums,
      targetLabel: 'Target 3Sum',
      targetValue: 0,
      dataStructureType: 'three-sum',
      specialFormula: {
        title: '3Sum Core Invariant',
        formula: 'nums[i] + nums[L] + nums[R] == 0',
        description: 'Fixing pivot i reduces 3Sum to N Two Sum subproblems.'
      }
    };
  }

  // DAY 11: Container With Most Water
  if (problemId === 'container-with-most-water') {
    const heights = [1, 8, 6, 2, 5, 4, 8, 3, 7];
    const steps: VisualStep[] = [
      {
        stepNumber: 1,
        description: 'Start at max width: L=0 (h=1), R=8 (h=7). Area = (8 - 0) * min(1, 7) = 8',
        variables: { L: 0, R: 8, width: 8, height: 1, area: 8, max_water: 8 },
        pointers: [
          { name: 'L (h=1)', index: 0, color: 'text-emerald-400 border-emerald-400' },
          { name: 'R (h=7)', index: 8, color: 'text-amber-400 border-amber-400' }
        ],
        arrayHighlight: { indices: [0, 8], type: 'active' },
        explanation: 'h[L] < h[R], so the left wall is the bottleneck. Greedily advance L += 1.'
      },
      {
        stepNumber: 2,
        description: 'L=1 (h=8), R=8 (h=7). Area = (8 - 1) * min(8, 7) = 7 * 7 = 49! 🚀',
        variables: { L: 1, R: 8, width: 7, height: 7, area: 49, max_water: 49 },
        pointers: [
          { name: 'L (h=8)', index: 1, color: 'text-emerald-400 border-emerald-400' },
          { name: 'R (h=7)', index: 8, color: 'text-amber-400 border-amber-400' }
        ],
        arrayHighlight: { indices: [1, 8], type: 'matched' },
        explanation: 'New maximum water trapped is 49! Now h[R] (7) < h[L] (8), so decrement R -= 1.'
      },
      {
        stepNumber: 3,
        description: 'Converge remaining pointers -> Max water capacity remains 49! 🎉',
        variables: { max_water: 49, time_complexity: 'O(N)', space: 'O(1)' },
        pointers: [
          { name: 'Peak L', index: 1, color: 'text-emerald-400 border-emerald-400' },
          { name: 'Peak R', index: 8, color: 'text-emerald-400 border-emerald-400' }
        ],
        arrayHighlight: { indices: [1, 8], type: 'matched' },
        explanation: '🎯 Maximum water trapped is 49 between wall index 1 and wall index 8.'
      }
    ];

    return {
      steps,
      arrayItems: heights,
      targetLabel: 'Max Capacity',
      targetValue: '49 units',
      dataStructureType: 'two-pointers',
      specialFormula: {
        title: 'Area Formula & Greedy Choice',
        formula: 'Area = (R - L) * min(height[L], height[R])',
        description: 'Always move the shorter wall inward because the shorter wall is the limiting bottleneck.'
      }
    };
  }

  // DAY 12: Trapping Rain Water
  if (problemId === 'trapping-rain-water') {
    const elevations = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
    const steps: VisualStep[] = [
      {
        stepNumber: 1,
        description: 'Initialize Two Pointers: L=0, R=11. left_max=0, right_max=1, trapped=0',
        variables: { L: 0, R: 11, left_max: 0, right_max: 1, trapped: 0 },
        pointers: [
          { name: 'L', index: 0, color: 'text-emerald-400 border-emerald-400' },
          { name: 'R', index: 11, color: 'text-amber-400 border-amber-400' }
        ],
        arrayHighlight: { indices: [0, 11], type: 'active' },
        explanation: 'Whichever side has the smaller max determines water bounded above each bar.'
      },
      {
        stepNumber: 2,
        description: 'Trapping at index 2 (h=0): left_max=1 -> Trapped += 1 - 0 = 1 unit',
        variables: { L: 2, 'height[L]': 0, left_max: 1, trapped_water: 1 },
        pointers: [{ name: 'L=2 (+1 water)', index: 2, color: 'text-emerald-400 border-emerald-400' }],
        arrayHighlight: { indices: [2], type: 'matched' },
        explanation: 'Water level = left_max - height[2] = 1 - 0 = 1 unit.'
      },
      {
        stepNumber: 3,
        description: 'Trapping at index 4 & 5: trapped += 1 + 2 = 3 units -> Total = 6 units! 🌊',
        variables: { total_trapped: 6, time: 'O(N)', space: 'O(1)' },
        pointers: [{ name: 'Total: 6', index: 7, color: 'text-emerald-400 border-emerald-400' }],
        arrayHighlight: { indices: [2, 4, 5, 6, 9], type: 'matched' },
        explanation: '🎯 Total rain water trapped = 6 units in single O(N) pass with O(1) memory!'
      }
    ];

    return {
      steps,
      arrayItems: elevations,
      targetLabel: 'Total Water',
      targetValue: '6 units',
      dataStructureType: 'two-pointers'
    };
  }

  // DAY 13: Best Time to Buy and Sell Stock
  if (problemId === 'best-time-to-buy-and-sell-stock') {
    const prices = [7, 1, 5, 3, 6, 4];
    const steps: VisualStep[] = [
      {
        stepNumber: 1,
        description: 'Day 1: Price = 7. min_price = 7, max_profit = 0',
        variables: { currentPrice: 7, minPrice: 7, maxProfit: 0 },
        pointers: [{ name: 'Buy candidate', index: 0, color: 'text-indigo-400 border-indigo-400' }],
        arrayHighlight: { indices: [0], type: 'active' },
        explanation: 'Initialize min_price = 7.'
      },
      {
        stepNumber: 2,
        description: 'Day 2: Price = 1. New lowest buy price found! min_price = 1',
        variables: { currentPrice: 1, minPrice: 1, maxProfit: 0 },
        pointers: [{ name: 'Lowest Buy (1)', index: 1, color: 'text-emerald-400 border-emerald-400' }],
        arrayHighlight: { indices: [1], type: 'matched' },
        explanation: '1 < 7 -> Update lowest buy day min_price = 1.'
      },
      {
        stepNumber: 3,
        description: 'Day 5: Price = 6. Potential profit: 6 - 1 = 5! Max Profit = 5! 🚀',
        variables: { currentPrice: 6, minPrice: 1, profit: 5, maxProfit: 5 },
        pointers: [
          { name: 'Buy (1)', index: 1, color: 'text-emerald-400 border-emerald-400' },
          { name: 'Sell (6)', index: 4, color: 'text-emerald-400 border-emerald-400' }
        ],
        arrayHighlight: { indices: [1, 4], type: 'matched' },
        explanation: '🎯 MAX PROFIT: Buy on Day 2 ($1) and Sell on Day 5 ($6) -> Profit = 5.'
      }
    ];

    return {
      steps,
      arrayItems: prices,
      targetLabel: 'Max Profit',
      targetValue: '$5',
      dataStructureType: 'sliding-window'
    };
  }

  // DAY 14: Longest Substring Without Repeating Characters
  if (problemId === 'longest-substring-without-repeating-characters') {
    const chars = ['a', 'b', 'c', 'a', 'b', 'c', 'b', 'b'];
    const steps: VisualStep[] = [
      {
        stepNumber: 1,
        description: 'Window [0..2]: "abc". last_seen = {a:0, b:1, c:2}, max_len = 3',
        variables: { window: '"abc"', left: 0, right: 2, max_len: 3 },
        pointers: [
          { name: 'L=0', index: 0, color: 'text-emerald-400 border-emerald-400' },
          { name: 'R=2', index: 2, color: 'text-amber-400 border-amber-400' }
        ],
        arrayHighlight: { indices: [0, 1, 2], type: 'active' },
        hashState: { 'a': 0, 'b': 1, 'c': 2 },
        explanation: 'Characters \'a\', \'b\', \'c\' are distinct. Current max length is 3.'
      },
      {
        stepNumber: 2,
        description: 'Right=3 (\'a\'): Duplicate \'a\' found at index 0! Jump left to 0 + 1 = 1',
        variables: { duplicate: '\'a\'', jump_left_to: 1, window: '"bca"', max_len: 3 },
        pointers: [
          { name: 'L=1', index: 1, color: 'text-emerald-400 border-emerald-400' },
          { name: 'R=3', index: 3, color: 'text-amber-400 border-amber-400' }
        ],
        arrayHighlight: { indices: [1, 2, 3], type: 'matched' },
        hashState: { 'a': 3, 'b': 1, 'c': 2 },
        explanation: 'Using last_seen dictionary avoids shrinking left one step at a time.'
      },
      {
        stepNumber: 3,
        description: 'Final Result: Longest non-repeating substring length is 3 ("abc")! 🎉',
        variables: { max_length: 3, substring: '"abc"', complexity: 'O(N)' },
        pointers: [{ name: 'Max Len=3', index: 2, color: 'text-emerald-400 border-emerald-400' }],
        arrayHighlight: { indices: [0, 1, 2], type: 'matched' },
        explanation: '🎯 Longest unique substring length = 3 in single linear scan.'
      }
    ];

    return {
      steps,
      arrayItems: chars,
      targetLabel: 'Longest Length',
      targetValue: '3 ("abc")',
      dataStructureType: 'sliding-window'
    };
  }

  // DAY 15: Valid Parentheses
  if (problemId === 'valid-parentheses') {
    const brackets = ['(', '{', '}', ')'];
    const steps: VisualStep[] = [
      {
        stepNumber: 1,
        description: 'Read \'(\' & \'{\' -> Push opening brackets to Stack',
        variables: { stack: '[\'(\', \'{\']', current: '{' },
        pointers: [{ name: 'i=1 (\'{\')', index: 1, color: 'text-indigo-400 border-indigo-400' }],
        arrayHighlight: { indices: [0, 1], type: 'active' },
        stackState: ['(', '{'],
        explanation: 'Opening brackets are pushed onto the LIFO stack.'
      },
      {
        stepNumber: 2,
        description: 'Read \'}\' -> Matches top bracket \'{\'. Pop from Stack!',
        variables: { popped: '{', match: 'Match! ✅', stack: '[\'(\']' },
        pointers: [{ name: 'i=2 (\'}\')', index: 2, color: 'text-emerald-400 border-emerald-400' }],
        arrayHighlight: { indices: [2], type: 'matched' },
        stackState: ['('],
        explanation: 'Closing bracket matches stack top. Pop \'{\'.'
      },
      {
        stepNumber: 3,
        description: 'Read \')\' -> Matches top bracket \'(\'. Stack is now empty -> Valid! 🎉',
        variables: { stack: '[] (empty)', valid: 'True ✅' },
        pointers: [{ name: 'i=3 (\')\')', index: 3, color: 'text-emerald-400 border-emerald-400' }],
        arrayHighlight: { indices: [3], type: 'matched' },
        stackState: [],
        explanation: '🎯 All brackets matched cleanly and stack is empty. Return True.'
      }
    ];

    return {
      steps,
      arrayItems: brackets,
      targetLabel: 'Bracket Result',
      targetValue: 'Valid (True)',
      dataStructureType: 'stack'
    };
  }

  // DAY 16: Binary Search
  if (problemId === 'binary-search') {
    const nums = [-1, 0, 3, 5, 9, 12];
    const steps: VisualStep[] = [
      {
        stepNumber: 1,
        description: 'Search bounds: L=0 (-1), R=5 (12). mid=2 (val=3). 3 < 9 -> Search right half!',
        variables: { L: 0, R: 5, mid: 2, 'nums[mid]': 3, target: 9 },
        pointers: [
          { name: 'L', index: 0, color: 'text-blue-400 border-blue-400' },
          { name: 'mid', index: 2, color: 'text-purple-400 border-purple-400' },
          { name: 'R', index: 5, color: 'text-rose-400 border-rose-400' }
        ],
        arrayHighlight: { indices: [2], type: 'active' },
        explanation: '3 is less than target 9. Discard left half by setting L = mid + 1 (index 3).'
      },
      {
        stepNumber: 2,
        description: 'New bounds: L=3 (5), R=5 (12). mid=4 (val=9). Target matched! 🎉',
        variables: { L: 3, R: 5, mid: 4, 'nums[mid]': 9, target: 9, match: 'FOUND! ✅' },
        pointers: [
          { name: 'L', index: 3, color: 'text-blue-400 border-blue-400' },
          { name: 'mid (Target!)', index: 4, color: 'text-emerald-400 border-emerald-400' },
          { name: 'R', index: 5, color: 'text-rose-400 border-rose-400' }
        ],
        arrayHighlight: { indices: [4], type: 'matched' },
        explanation: '🎯 TARGET FOUND at index 4 in O(log N) time!'
      }
    ];

    return {
      steps,
      arrayItems: nums,
      targetLabel: 'Target Value',
      targetValue: 9,
      dataStructureType: 'binary-search'
    };
  }

  // DAY 17: Reverse Linked List
  if (problemId === 'reverse-linked-list') {
    const nodes = [1, 2, 3, 4, 5];
    const steps: VisualStep[] = [
      {
        stepNumber: 1,
        description: 'Start: prev = None, curr = Node(1). Next node saved: nxt = Node(2)',
        variables: { prev: 'None', curr: '1', nxt: '2' },
        pointers: [
          { name: 'prev=None', index: 0, color: 'text-slate-400 border-slate-400' },
          { name: 'curr=1', index: 0, color: 'text-indigo-400 border-indigo-400' }
        ],
        arrayHighlight: { indices: [0], type: 'active' },
        explanation: 'Before modifying pointers, always preserve reference to nxt = curr.next.'
      },
      {
        stepNumber: 2,
        description: 'Reverse pointer: curr.next = prev. Advance prev=1, curr=2',
        variables: { '1.next': 'None', prev: '1', curr: '2' },
        pointers: [
          { name: 'prev=1', index: 0, color: 'text-emerald-400 border-emerald-400' },
          { name: 'curr=2', index: 1, color: 'text-indigo-400 border-indigo-400' }
        ],
        arrayHighlight: { indices: [0, 1], type: 'active' },
        explanation: 'Node 1 now points to None. Pointer successfully reversed!'
      },
      {
        stepNumber: 3,
        description: 'All pointers reversed: 5 -> 4 -> 3 -> 2 -> 1 -> None. Return prev (5)! 🎉',
        variables: { new_head: '5', order: '[5, 4, 3, 2, 1]', space: 'O(1)' },
        pointers: [{ name: 'New Head (5)', index: 4, color: 'text-emerald-400 border-emerald-400' }],
        arrayHighlight: { indices: [0, 1, 2, 3, 4], type: 'matched' },
        explanation: '🎯 Linked list reversed in-place with zero memory allocation.'
      }
    ];

    return {
      steps,
      arrayItems: nodes,
      targetLabel: 'Reversed Head',
      targetValue: 'Node(5)',
      dataStructureType: 'linked-list',
      specialFormula: {
        title: '4-Step Pointer Reversal',
        formula: 'nxt = curr.next; curr.next = prev; prev = curr; curr = nxt',
        description: 'In-place linked list reversal in O(N) time with O(1) space.'
      }
    };
  }

  // DAY 18: Invert Binary Tree
  if (problemId === 'invert-binary-tree') {
    const treeNodes = [4, 2, 7, 1, 3, 6, 9];
    const steps: VisualStep[] = [
      {
        stepNumber: 1,
        description: 'Root=4: Swap left child (2) and right child (7)',
        variables: { root: 4, old_left: 2, old_right: 7, action: 'Swap children' },
        pointers: [{ name: 'Root (4)', index: 0, color: 'text-purple-400 border-purple-400' }],
        arrayHighlight: { indices: [0, 1, 2], type: 'active' },
        explanation: 'Swap left and right subtrees: root.left, root.right = root.right, root.left.'
      },
      {
        stepNumber: 2,
        description: 'Recursively invert subtrees at 7 (leaves 6 & 9) and 2 (leaves 1 & 3)',
        variables: { '7.children': '[9, 6]', '2.children': '[3, 1]' },
        pointers: [
          { name: 'Left Subtree', index: 2, color: 'text-emerald-400 border-emerald-400' },
          { name: 'Right Subtree', index: 1, color: 'text-amber-400 border-amber-400' }
        ],
        arrayHighlight: { indices: [1, 2, 3, 4, 5, 6], type: 'matched' },
        explanation: 'Recursive DFS inverts every level down to leaf base cases.'
      },
      {
        stepNumber: 3,
        description: 'Final Inverted Tree: [4, 7, 2, 9, 6, 3, 1]! 🎉',
        variables: { inverted_root: 4, status: 'Complete ✅' },
        pointers: [{ name: 'Inverted Root', index: 0, color: 'text-emerald-400 border-emerald-400' }],
        arrayHighlight: { indices: [0, 1, 2, 3, 4, 5, 6], type: 'matched' },
        explanation: '🎯 Binary tree inverted completely in O(N) time.'
      }
    ];

    return {
      steps,
      arrayItems: [4, 7, 2, 9, 6, 3, 1],
      targetLabel: 'Inverted Root',
      targetValue: 'Node(4)',
      dataStructureType: 'array'
    };
  }

  // DAY 19: Climbing Stairs
  if (problemId === 'climbing-stairs') {
    const stepsData = [1, 2, 3, 5, 8];
    const steps: VisualStep[] = [
      {
        stepNumber: 1,
        description: 'Base Cases: Step 1 = 1 way, Step 2 = 2 ways',
        variables: { 'ways[1]': 1, 'ways[2]': 2 },
        pointers: [
          { name: 'Step 1 (1)', index: 0, color: 'text-indigo-400 border-indigo-400' },
          { name: 'Step 2 (2)', index: 1, color: 'text-indigo-400 border-indigo-400' }
        ],
        arrayHighlight: { indices: [0, 1], type: 'active' },
        explanation: 'To reach step 1: [1]. To reach step 2: [1+1, 2].'
      },
      {
        stepNumber: 2,
        description: 'Step 3: ways(3) = ways(2) + ways(1) = 2 + 1 = 3 ways',
        variables: { 'ways[3]': 3, formula: 'dp[i] = dp[i-1] + dp[i-2]' },
        pointers: [{ name: 'Step 3 (3)', index: 2, color: 'text-amber-400 border-amber-400' }],
        arrayHighlight: { indices: [2], type: 'active' },
        explanation: 'You can arrive at step 3 either from step 2 (1 step) or step 1 (2 steps).'
      },
      {
        stepNumber: 3,
        description: 'Step 5: ways(5) = ways(4) + ways(3) = 5 + 3 = 8 ways! 🎉',
        variables: { 'ways[5]': 8, time: 'O(N)', space: 'O(1)' },
        pointers: [{ name: 'Step 5 (8)', index: 4, color: 'text-emerald-400 border-emerald-400' }],
        arrayHighlight: { indices: [4], type: 'matched' },
        explanation: '🎯 Fibonacci state transitions compute total ways in O(N) time with O(1) space.'
      }
    ];

    return {
      steps,
      arrayItems: stepsData,
      targetLabel: 'Ways for N=5',
      targetValue: '8 ways',
      dataStructureType: 'array',
      specialFormula: {
        title: 'Fibonacci State Transition',
        formula: 'ways[i] = ways[i - 1] + ways[i - 2]',
        description: 'Only 2 previous state integers needed in O(1) space.'
      }
    };
  }

  // DAY 20: Coin Change
  if (problemId === 'coin-change') {
    const dpTable = [0, 1, 1, 2, 2, 1, 2, 2, 3, 3, 2, 3];
    const steps: VisualStep[] = [
      {
        stepNumber: 1,
        description: 'Initialize DP table: dp[0]=0, dp[1..11]=inf. Coins = [1, 2, 5]',
        variables: { 'dp[0]': 0, coins: '[1, 2, 5]', target_amount: 11 },
        pointers: [{ name: 'dp[0]=0', index: 0, color: 'text-indigo-400 border-indigo-400' }],
        arrayHighlight: { indices: [0], type: 'active' },
        explanation: '0 coins needed to make amount 0.'
      },
      {
        stepNumber: 2,
        description: 'Compute amounts 1 to 5: dp[5] = min(dp[5-1]+1, dp[5-2]+1, dp[5-5]+1) = 1 coin (one 5¢ coin)!',
        variables: { 'dp[5]': 1, 'dp[2]': 1, 'dp[1]': 1 },
        pointers: [{ name: 'dp[5]=1', index: 5, color: 'text-emerald-400 border-emerald-400' }],
        arrayHighlight: { indices: [1, 2, 5], type: 'matched' },
        explanation: 'Amount 5 is solved with 1 coin (denomination 5).'
      },
      {
        stepNumber: 3,
        description: 'Compute dp[11] = 1 + dp[11 - 5] = 1 + dp[6] = 1 + 2 = 3 coins (5 + 5 + 1)! 🎉',
        variables: { 'dp[11]': 3, combination: '5 + 5 + 1', min_coins: 3 },
        pointers: [{ name: 'dp[11] = 3', index: 11, color: 'text-emerald-400 border-emerald-400' }],
        arrayHighlight: { indices: [11], type: 'matched' },
        explanation: '🎯 Minimum coins for amount 11 is 3 coins in O(amount * len(coins)) time.'
      }
    ];

    return {
      steps,
      arrayItems: dpTable,
      targetLabel: 'Min Coins for 11',
      targetValue: '3 coins',
      dataStructureType: 'array'
    };
  }

  // DAY 21: Number of Islands
  if (problemId === 'number-of-islands') {
    const gridFlat = ['1', '1', '0', '0', '1', '1', '0', '1'];
    const steps: VisualStep[] = [
      {
        stepNumber: 1,
        description: 'Scan grid: Hit land "1" at (0, 0) -> Island count = 1. Launch DFS!',
        variables: { island_count: 1, current_cell: '(0,0)' },
        pointers: [{ name: 'Island #1 Start', index: 0, color: 'text-indigo-400 border-indigo-400' }],
        arrayHighlight: { indices: [0, 1, 4, 5], type: 'active' },
        explanation: 'DFS traverses all 4 orthogonal connected land cells and sinks them to "0".'
      },
      {
        stepNumber: 2,
        description: 'Sink connected land cells to "0" to prevent duplicate visits',
        variables: { island_count: 1, 'sunk_cells': 4 },
        pointers: [{ name: 'Sunk to 0', index: 1, color: 'text-emerald-400 border-emerald-400' }],
        arrayHighlight: { indices: [0, 1, 4, 5], type: 'matched' },
        explanation: 'In-place sinking avoids maintaining an extra O(M*N) visited set.'
      },
      {
        stepNumber: 3,
        description: 'Hit isolated land at (1, 3) -> Island count = 2! Total islands = 2 🎉',
        variables: { total_islands: 2, complexity: 'O(M * N)' },
        pointers: [{ name: 'Island #2', index: 7, color: 'text-purple-400 border-purple-400' }],
        arrayHighlight: { indices: [7], type: 'matched' },
        explanation: '🎯 All connected components counted in O(M * N) time.'
      }
    ];

    return {
      steps,
      arrayItems: gridFlat,
      targetLabel: 'Island Count',
      targetValue: '2 islands',
      dataStructureType: 'array'
    };
  }

  // DAY 22: Min Stack
  if (problemId === 'min-stack') {
    const stackItems = [-2, 0, -3];
    const steps: VisualStep[] = [
      {
        stepNumber: 1,
        description: 'push(-2) -> stack: [-2], min_stack: [-2]. getMin() = -2',
        variables: { stack: '[-2]', min_stack: '[-2]', min: -2 },
        pointers: [{ name: 'min=-2', index: 0, color: 'text-emerald-400 border-emerald-400' }],
        arrayHighlight: { indices: [0], type: 'active' },
        stackState: ['-2'],
        explanation: 'min_stack records current minimum element at every push.'
      },
      {
        stepNumber: 2,
        description: 'push(0) -> min_stack: [-2, -2]. push(-3) -> min_stack: [-2, -2, -3]. getMin() = -3',
        variables: { stack: '[-2, 0, -3]', min_stack: '[-2, -2, -3]', min: -3 },
        pointers: [{ name: 'min=-3', index: 2, color: 'text-emerald-400 border-emerald-400' }],
        arrayHighlight: { indices: [2], type: 'matched' },
        stackState: ['-2', '0', '-3'],
        explanation: 'New minimum -3 is recorded at stack top.'
      },
      {
        stepNumber: 3,
        description: 'pop() removes -3 -> min_stack pops -3 -> getMin() instantly returns -2 in O(1)! 🎉',
        variables: { popped: -3, current_min: -2, time: 'O(1)' },
        pointers: [{ name: 'min=-2', index: 0, color: 'text-emerald-400 border-emerald-400' }],
        arrayHighlight: { indices: [0, 1], type: 'matched' },
        stackState: ['-2', '0'],
        explanation: '🎯 All operations push, pop, top, getMin run in strict O(1) time.'
      }
    ];

    return {
      steps,
      arrayItems: stackItems,
      targetLabel: 'Current Min',
      targetValue: '-2',
      dataStructureType: 'stack'
    };
  }

  // DAY 23: Search in Rotated Sorted Array
  if (problemId === 'search-in-rotated-sorted-array') {
    const nums = [4, 5, 6, 7, 0, 1, 2];
    const steps: VisualStep[] = [
      {
        stepNumber: 1,
        description: 'L=0 (4), R=6 (2), mid=3 (7). Left half [4..7] is sorted! Target 0 is in right half!',
        variables: { L: 0, R: 6, mid: 3, 'nums[mid]': 7, target: 0, sorted_half: 'Left [4,5,6,7]' },
        pointers: [
          { name: 'L', index: 0, color: 'text-blue-400 border-blue-400' },
          { name: 'mid (7)', index: 3, color: 'text-purple-400 border-purple-400' },
          { name: 'R', index: 6, color: 'text-rose-400 border-rose-400' }
        ],
        arrayHighlight: { indices: [0, 1, 2, 3], type: 'active' },
        explanation: 'Since nums[L] <= nums[mid], the left half is sorted. Target 0 is NOT in [4..7], so search right half: L = mid + 1.'
      },
      {
        stepNumber: 2,
        description: 'New bounds: L=4 (0), R=6 (2). mid=4 (0). Target found! 🎉',
        variables: { L: 4, R: 6, mid: 4, 'nums[mid]': 0, target: 0, match: 'YES! ✅ (index 4)' },
        pointers: [
          { name: 'Target (0)', index: 4, color: 'text-emerald-400 border-emerald-400' },
          { name: 'R', index: 6, color: 'text-rose-400 border-rose-400' }
        ],
        arrayHighlight: { indices: [4], type: 'matched' },
        explanation: '🎯 Target 0 found at index 4 in O(log N) runtime.'
      }
    ];

    return {
      steps,
      arrayItems: nums,
      targetLabel: 'Target Index',
      targetValue: '4',
      dataStructureType: 'binary-search'
    };
  }

  // DAY 24: Merge Two Sorted Lists
  if (problemId === 'merge-two-sorted-lists') {
    const list1 = [1, 2, 4];
    const list2 = [1, 3, 4];
    const steps: VisualStep[] = [
      {
        stepNumber: 1,
        description: 'Create dummy head. Compare list1 (1) vs list2 (1) -> attach 1',
        variables: { tail: 'dummy -> 1', 'list1.val': 1, 'list2.val': 1 },
        pointers: [
          { name: 'list1', index: 0, color: 'text-indigo-400 border-indigo-400' },
          { name: 'list2', index: 0, color: 'text-amber-400 border-amber-400' }
        ],
        arrayHighlight: { indices: [0], type: 'active' },
        explanation: 'Dummy anchor node eliminates boundary edge cases.'
      },
      {
        stepNumber: 2,
        description: 'Splice nodes in order: 1 -> 1 -> 2 -> 3 -> 4 -> 4',
        variables: { merged_list: '[1, 1, 2, 3, 4, 4]' },
        pointers: [{ name: 'Merged', index: 2, color: 'text-emerald-400 border-emerald-400' }],
        arrayHighlight: { indices: [0, 1, 2], type: 'matched' },
        explanation: 'Advance pointers and attach remaining nodes in O(N + M) time with O(1) space.'
      }
    ];

    return {
      steps,
      arrayItems: [1, 1, 2, 3, 4, 4],
      targetLabel: 'Merged Output',
      targetValue: '[1, 1, 2, 3, 4, 4]',
      dataStructureType: 'linked-list'
    };
  }

  // DAY 25: Maximum Depth of Binary Tree
  if (problemId === 'maximum-depth-of-binary-tree') {
    const tree = [3, 9, 20, 15, 7];
    const steps: VisualStep[] = [
      {
        stepNumber: 1,
        description: 'Root=3: max_depth = 1 + max(depth(9), depth(20))',
        variables: { root: 3, left_child: 9, right_child: 20 },
        pointers: [{ name: 'Root (3)', index: 0, color: 'text-purple-400 border-purple-400' }],
        arrayHighlight: { indices: [0], type: 'active' },
        explanation: 'Compute depths recursively.'
      },
      {
        stepNumber: 2,
        description: 'Node 20 has children 15 & 7 (Depth = 2). Root adds 1 -> Max Depth = 3! 🎉',
        variables: { left_depth: 1, right_depth: 2, max_depth: '1 + 2 = 3' },
        pointers: [{ name: 'Leaves (15, 7)', index: 3, color: 'text-emerald-400 border-emerald-400' }],
        arrayHighlight: { indices: [0, 2, 3, 4], type: 'matched' },
        explanation: '🎯 Maximum depth is 3 in O(N) DFS traversal.'
      }
    ];

    return {
      steps,
      arrayItems: tree,
      targetLabel: 'Max Depth',
      targetValue: '3 levels',
      dataStructureType: 'array'
    };
  }

  // DAY 26: Kth Largest Element in an Array
  if (problemId === 'kth-largest-element-in-an-array') {
    const nums = [3, 2, 1, 5, 6, 4];
    const steps: VisualStep[] = [
      {
        stepNumber: 1,
        description: 'Maintain Min-Heap of size k=2: Push 3, 2, 1 -> Heap exceeds k, pop smallest',
        variables: { min_heap: '[2, 3]', k: 2 },
        pointers: [{ name: 'Heap size=2', index: 0, color: 'text-indigo-400 border-indigo-400' }],
        arrayHighlight: { indices: [0, 1], type: 'active' },
        explanation: 'Min-Heap keeps the k largest elements seen so far.'
      },
      {
        stepNumber: 2,
        description: 'Push 5, 6, 4 -> Min-heap retains top 2 elements: [5, 6]! Root is 5! 🎉',
        variables: { min_heap: '[5, 6]', '2nd_largest': 5, time: 'O(N log K)' },
        pointers: [{ name: '2nd Largest (5)', index: 3, color: 'text-emerald-400 border-emerald-400' }],
        arrayHighlight: { indices: [3, 4], type: 'matched' },
        explanation: '🎯 Top of min_heap min_heap[0] = 5 is the 2nd largest element in O(N log K) time.'
      }
    ];

    return {
      steps,
      arrayItems: nums,
      targetLabel: '2nd Largest',
      targetValue: '5',
      dataStructureType: 'heap'
    };
  }

  // DAY 27: Subsets (Power Set)
  if (problemId === 'subsets') {
    const nums = [1, 2, 3];
    const steps: VisualStep[] = [
      {
        stepNumber: 1,
        description: 'Decision Tree at index 0 (val=1): Branch 1 (Include 1), Branch 2 (Exclude 1)',
        variables: { current_subset: '[]', decisions: 'Include vs Exclude' },
        pointers: [{ name: 'i=0 (1)', index: 0, color: 'text-indigo-400 border-indigo-400' }],
        arrayHighlight: { indices: [0], type: 'active' },
        explanation: 'Binary decision tree generates all 2^N subsets.'
      },
      {
        stepNumber: 2,
        description: 'Backtrack collects all 2³ = 8 subsets: [[], [1], [2], [1,2], [3], [1,3], [2,3], [1,2,3]]! 🎉',
        variables: { total_subsets: 8, complexity: 'O(N * 2^N)' },
        pointers: [{ name: 'All 8 Subsets', index: 2, color: 'text-emerald-400 border-emerald-400' }],
        arrayHighlight: { indices: [0, 1, 2], type: 'matched' },
        explanation: '🎯 Generated complete power set without duplicates.'
      }
    ];

    return {
      steps,
      arrayItems: nums,
      targetLabel: 'Total Subsets',
      targetValue: '2³ = 8 subsets',
      dataStructureType: 'backtracking'
    };
  }

  // DAY 28: Merge Intervals
  if (problemId === 'merge-intervals') {
    const intervals = ['[1,3]', '[2,6]', '[8,10]', '[15,18]'];
    const steps: VisualStep[] = [
      {
        stepNumber: 1,
        description: 'Sort intervals by start time: [[1,3], [2,6], [8,10], [15,18]]',
        variables: { current: '[1,3]', next: '[2,6]', overlap: '2 <= 3 (Overlap! ✅)' },
        pointers: [
          { name: '[1,3]', index: 0, color: 'text-indigo-400 border-indigo-400' },
          { name: '[2,6]', index: 1, color: 'text-amber-400 border-amber-400' }
        ],
        arrayHighlight: { indices: [0, 1], type: 'active' },
        explanation: 'Start time 2 is <= previous end time 3. Merge into [1, max(3, 6)] = [1,6].'
      },
      {
        stepNumber: 2,
        description: 'Merged Result: [[1,6], [8,10], [15,18]] in O(N log N) time! 🎉',
        variables: { result: '[[1,6], [8,10], [15,18]]' },
        pointers: [{ name: 'Merged [1,6]', index: 0, color: 'text-emerald-400 border-emerald-400' }],
        arrayHighlight: { indices: [0, 1, 2, 3], type: 'matched' },
        explanation: '🎯 Disjoint non-overlapping intervals returned.'
      }
    ];

    return {
      steps,
      arrayItems: intervals,
      targetLabel: 'Merged Intervals',
      targetValue: '[[1,6], [8,10], [15,18]]',
      dataStructureType: 'array'
    };
  }

  // DAY 29: Single Number
  if (problemId === 'single-number') {
    const nums = [4, 1, 2, 1, 2];
    const steps: VisualStep[] = [
      {
        stepNumber: 1,
        description: 'Bitwise XOR properties: x ^ x = 0 and x ^ 0 = x',
        variables: { res: 0, operation: '4 ^ 1 ^ 2 ^ 1 ^ 2' },
        pointers: [{ name: 'i=0 (4)', index: 0, color: 'text-indigo-400 border-indigo-400' }],
        arrayHighlight: { indices: [0], type: 'active' },
        explanation: 'XORing duplicate numbers cancels them out to 0.'
      },
      {
        stepNumber: 2,
        description: 'Pairs (1^1=0) and (2^2=0) cancel out -> 4 ^ 0 = 4! Single Number is 4! 🎉',
        variables: { single_number: 4, space: 'O(1)', time: 'O(N)' },
        pointers: [{ name: 'Unique (4)', index: 0, color: 'text-emerald-400 border-emerald-400' }],
        arrayHighlight: { indices: [0], type: 'matched' },
        explanation: '🎯 Found unique number in single pass with 0 extra memory allocations!'
      }
    ];

    return {
      steps,
      arrayItems: nums,
      targetLabel: 'Single Number',
      targetValue: '4',
      dataStructureType: 'array',
      specialFormula: {
        title: 'XOR Algebraic Invariant',
        formula: 'a ^ a = 0  and  a ^ 0 = a',
        description: 'All duplicate pairs vanish to 0, leaving only the unique element in O(1) space.'
      }
    };
  }

  // DAY 30: Unique Paths
  if (problemId === 'unique-paths') {
    const gridSample = [1, 1, 1, 1, 1, 1, 1];
    const steps: VisualStep[] = [
      {
        stepNumber: 1,
        description: 'Initialize row of size n=7 with 1s: row = [1, 1, 1, 1, 1, 1, 1]',
        variables: { m: 3, n: 7, row_1: '[1, 1, 1, 1, 1, 1, 1]' },
        pointers: [{ name: 'Start (0,0)', index: 0, color: 'text-indigo-400 border-indigo-400' }],
        arrayHighlight: { indices: [0, 1, 2, 3, 4, 5, 6], type: 'active' },
        explanation: 'There is exactly 1 way to reach any cell in the first row (moving strictly right).'
      },
      {
        stepNumber: 2,
        description: 'Process rows 2 & 3: new_row[c] = row[c] (from above) + new_row[c-1] (from left)',
        variables: { row_2: '[1, 2, 3, 4, 5, 6, 7]', row_3: '[1, 3, 6, 10, 15, 21, 28]' },
        pointers: [{ name: 'Bottom-Right', index: 6, color: 'text-emerald-400 border-emerald-400' }],
        arrayHighlight: { indices: [6], type: 'matched' },
        explanation: 'Row compression compresses 2D grid DP into a single 1D array of size N.'
      },
      {
        stepNumber: 3,
        description: 'Final Result: 28 unique paths to bottom-right corner! 🎉',
        variables: { unique_paths: 28, space: 'O(N)', time: 'O(M * N)' },
        pointers: [{ name: '28 Paths', index: 6, color: 'text-emerald-400 border-emerald-400' }],
        arrayHighlight: { indices: [6], type: 'matched' },
        explanation: '🎯 Computed 28 unique paths in O(M * N) time with O(N) space.'
      }
    ];

    return {
      steps,
      arrayItems: [1, 3, 6, 10, 15, 21, 28],
      targetLabel: 'Total Unique Paths',
      targetValue: '28 paths',
      dataStructureType: 'dp',
      specialFormula: {
        title: 'Path Transition Formula',
        formula: 'dp[r][c] = dp[r - 1][c] + dp[r][c - 1]',
        description: 'Paths from above + paths from left.'
      }
    };
  }

  // Generic fallback for any other day
  const defaultArr = [10, 20, 30, 40, 50];
  const steps: VisualStep[] = [
    {
      stepNumber: 1,
      description: `Exploring problem algorithm: ${problem.title}`,
      variables: { day: problem.day, category: problem.category },
      pointers: [{ name: 'start', index: 0, color: 'text-indigo-400 border-indigo-400' }],
      arrayHighlight: { indices: [0], type: 'active' },
      explanation: problem.optimalIntuition || 'Traverse the structure with optimal algorithmic complexity.'
    },
    {
      stepNumber: 2,
      description: `Applying optimal pattern: ${problem.category}`,
      variables: { time: problem.complexity.time, space: problem.complexity.space },
      pointers: [{ name: 'process', index: Math.floor(defaultArr.length / 2), color: 'text-emerald-400 border-emerald-400' }],
      arrayHighlight: { indices: [1, 2, 3], type: 'matched' },
      explanation: problem.stepByStepLogic ? problem.stepByStepLogic[0] : 'Processing elements efficiently.'
    }
  ];

  return {
    steps,
    arrayItems: defaultArr,
    targetLabel: 'Optimal Time',
    targetValue: problem.complexity.time,
    dataStructureType: 'array'
  };
}
