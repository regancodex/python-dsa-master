import { Problem } from '../types/dsa';

export interface JargonTerm {
  term: string;
  pronunciation?: string;
  plainEnglish: string;
  realLifeAnalogy: string;
  whyItMatters: string;
}

export interface ProblemConceptGuide {
  realLifeAnalogy: {
    title: string;
    icon: string;
    story: string;
    takeaway: string;
  };
  jargonBreakdown: JargonTerm[];
  plainEnglishSummary: string;
  mentalModelQuestion: string;
}

export const COMMON_DSA_GLOSSARY: Record<string, JargonTerm> = {
  'hash-map': {
    term: 'Hash Map (Dictionary / Key-Value)',
    plainEnglish: 'A fast lookup table where you give a "Key" (like a name or number) and immediately get its "Value" in 1 step without searching.',
    realLifeAnalogy: '🧥 Coat Check at a Nightclub: You hand your coat to the attendant and get ticket #42. When leaving, you don\'t search through 500 coats — you hand them #42 and get your coat immediately.',
    whyItMatters: 'Turns slow O(N) searches (scanning every item) into instant O(1) lookups.'
  },
  'hash': {
    term: 'Hash / Hashing',
    plainEnglish: 'A math recipe that instantly converts any word or number into a specific memory address slot index.',
    realLifeAnalogy: '🏷️ Sorting Mail into P.O. Boxes: Taking the first letter of a last name ("S") and dropping it directly into the "S" box.',
    whyItMatters: 'Allows computers to find where data lives in memory without looking at any other data.'
  },
  'map': {
    term: 'Map / Mapping',
    plainEnglish: 'Connecting one piece of information (the Key) directly to another piece of information (the Value).',
    realLifeAnalogy: '📱 Contact List on your Phone: Searching "Mom" (Key) immediately connects to her phone number (Value).',
    whyItMatters: 'Associates data pairs together.'
  },
  'heap': {
    term: 'Heap (Priority Queue)',
    plainEnglish: 'A special tree structure where the most important item (the smallest or biggest) is ALWAYS sitting right at the very top.',
    realLifeAnalogy: '🏥 Hospital Emergency Room (ER): Patients aren\'t treated first-come-first-serve. The patient with the most urgent condition (highest priority) is always seen next.',
    whyItMatters: 'Gives you the min or max item in instant O(1) time without keeping the whole list sorted.'
  },
  'two-pointers': {
    term: 'Two Pointers',
    plainEnglish: 'Using two index markers that walk toward each other or slide in tandem across a list.',
    realLifeAnalogy: '📏 Calipers / Squeezing a sandwich: Two fingers pressing in from the outer crusts toward the center until they find the middle.',
    whyItMatters: 'Lets you inspect pairs or ranges in O(N) time with zero extra memory (O(1) space).'
  },
  'sliding-window': {
    term: 'Sliding Window',
    plainEnglish: 'A moving boundary (like a frame) that expands or contracts over contiguous elements.',
    realLifeAnalogy: '🔍 Moving a Magnifying Glass over a Sentence: You only read 4 words visible in the lens at a time as you slide it across the page.',
    whyItMatters: 'Avoids recalculating overlapping subarrays from scratch.'
  },
  'stack': {
    term: 'Stack (LIFO - Last In, First Out)',
    plainEnglish: 'A pile of items where you can only add to the top and only take from the top.',
    realLifeAnalogy: '🥞 Stack of Pancakes or Pringles Can: The last pancake put on top of the plate is the first one you eat.',
    whyItMatters: 'Perfect for matching pairs (like parentheses brackets) and tracking "undo" history.'
  },
  'memoization': {
    term: 'Memoization (Top-Down DP)',
    plainEnglish: 'Writing down the answers to subproblems on a notepad so if you ever get asked the exact same question again, you just read the note.',
    realLifeAnalogy: '📝 Sticky Note Cheat Sheet: If someone asks "What is 47 × 38?", you calculate 1,786 and write it on a sticky note. When asked 5 minutes later, you answer in 1 second by reading the note.',
    whyItMatters: 'Stops recursive functions from re-computing the same math millions of times.'
  },
  'tabulation': {
    term: 'Tabulation (Bottom-Up DP)',
    plainEnglish: 'Filling out a table or array step-by-step from the smallest base case up to the final answer.',
    realLifeAnalogy: '📊 Filling an Excel Sheet: You write Day 1 and Day 2 expenses, then compute Day 3 by adding the cells above it until you reach Day 30.',
    whyItMatters: 'Solves complex optimization problems iteratively with no stack overflow risks.'
  },
  'permutations': {
    term: 'Permutations vs Combinations',
    plainEnglish: 'Permutations = ORDER MATTERS (e.g. briefcase lock "1-2-3" is different from "3-2-1"). Combinations = ORDER DOES NOT MATTER (e.g. a fruit salad with apples and bananas is the same as bananas and apples).',
    realLifeAnalogy: '🔐 Briefcase Lock (Permutation) vs 🥗 Fruit Salad (Combination).',
    whyItMatters: 'Crucial for picking the right Backtracking or Math formula.'
  },
  'backtracking': {
    term: 'Backtracking',
    plainEnglish: 'Exploring all possible paths step-by-step. If you hit a dead end, you take one step backward and try a different path.',
    realLifeAnalogy: '🌿 Exploring a Corn Maze: You walk down path A until you hit a dead end, walk back to the crossroad, and try path B.',
    whyItMatters: 'Finds all valid solutions (Sudoku, Chess queens, Subsets) without wasting time in known dead ends.'
  },
  'monotonic-stack': {
    term: 'Monotonic Stack',
    plainEnglish: 'A stack whose elements are always strictly increasing or strictly decreasing.',
    realLifeAnalogy: '🌅 People watching a sunset in a line: If a 6\'5" person stands in front of a 5\'4" person, the shorter person can\'t see and is blocked out.',
    whyItMatters: 'Finds the "Next Greater Element" or "Previous Smaller Element" for every item in linear O(N) time.'
  },
  'bit-manipulation': {
    term: 'Bit Manipulation (XOR ^)',
    plainEnglish: 'Doing math directly on the 0s and 1s binary digits of numbers.',
    realLifeAnalogy: '💡 A Two-Way Light Switch: Flipping the switch once turns the light ON. Flipping it a second time turns it OFF (cancels out). Flipping twice restores the original state.',
    whyItMatters: 'XOR cancels duplicate pairs (a ^ a = 0) with zero memory overhead.'
  }
};

export function getConceptGuideForProblem(problem: Problem): ProblemConceptGuide {
  const id = problem.id;

  // DAY 1: Two Sum
  if (id === 'two-sum') {
    return {
      realLifeAnalogy: {
        title: 'The Missing Shoe & Coat Check',
        icon: '👞',
        story: 'Imagine you have a target budget of $9. You walk past items in a store. When you see an item costing $2, you ask: "What missing piece do I need to make $9?" Answer: $7. Instead of walking through the whole store again to find $7, you write down on a sticky note: "I saw $2 at Aisle 0". When you later reach the $7 item, you look at your note, see $2 immediately, and grab both in 1 second!',
        takeaway: 'Never scan twice. Calculate the missing piece (Complement) and check your memory note (Hash Map).'
      },
      jargonBreakdown: [
        COMMON_DSA_GLOSSARY['hash-map'],
        COMMON_DSA_GLOSSARY['hash'],
        COMMON_DSA_GLOSSARY['map'],
        {
          term: 'Complement',
          plainEnglish: 'The missing number required to reach the target sum.',
          realLifeAnalogy: '🧩 Missing Puzzle Piece: If the total target is 10 and you have 4, the complement is 6.',
          whyItMatters: 'Turns Two Sum into a simple 1-item search: target - current = complement.'
        }
      ],
      plainEnglishSummary: 'As you read through the numbers, ask: "What other number do I need to make the target?" If you already saw that number previously (stored in your dictionary), you found the pair. If not, remember the current number for later.',
      mentalModelQuestion: 'What single missing piece would complete my target right now, and did I already write it down?'
    };
  }

  // DAY 2: Contains Duplicate
  if (id === 'contains-duplicate') {
    return {
      realLifeAnalogy: {
        title: 'The Party Guest List',
        icon: '🎟️',
        story: 'You are the bouncer at a VIP club. Every time someone enters, you check if their name is already on your clipboard. If their name is already checked, you immediately yell: "Duplicate entry found!" You do not need to compare them to every person in the club one by one.',
        takeaway: 'A Hash Set lets you detect duplicates the exact millisecond they appear.'
      },
      jargonBreakdown: [
        {
          term: 'Hash Set (`set()`)',
          plainEnglish: 'A collection that only holds unique items and allows instant O(1) membership checks (`if item in seen`).',
          realLifeAnalogy: '📋 VIP Checklist: A list with no duplicate names.',
          whyItMatters: 'Finding if an item exists takes 1 step instead of scanning the whole array.'
        }
      ],
      plainEnglishSummary: 'Keep a set of seen numbers. For every number, if it is already in seen, return True. If you finish the list with no matches, return False.',
      mentalModelQuestion: 'Have I seen this exact item before on my checklist?'
    };
  }

  // DAY 3: Valid Anagram
  if (id === 'valid-anagram') {
    return {
      realLifeAnalogy: {
        title: 'Scrabble Tile Inventory',
        icon: '🔤',
        story: 'Imagine you have two bags of wooden Scrabble letter tiles: "silent" and "listen". To check if they are anagrams, you dump them on a table and count each letter. Bag 1 has 1 \'e\', 1 \'i\', 1 \'l\', 1 \'n\', 1 \'s\', 1 \'t\'. Bag 2 has the exact same counts. Because the letter recipe is identical, they are anagrams!',
        takeaway: 'Anagrams are identical ingredient lists rearranged in a different order.'
      },
      jargonBreakdown: [
        {
          term: 'Frequency Map (`Counter()`)',
          plainEnglish: 'A count of how many times each character or number appears.',
          realLifeAnalogy: '📊 Inventory Tally: Tally marks on a chalkboard for each letter.',
          whyItMatters: 'Compares contents regardless of word order in O(N) time.'
        }
      ],
      plainEnglishSummary: 'Count the frequency of each letter in word 1 and word 2. If both frequency counts match 100%, they are anagrams.',
      mentalModelQuestion: 'Do both words have the exact same recipe of letters and counts?'
    };
  }

  // DAY 4: Group Anagrams
  if (id === 'group-anagrams') {
    return {
      realLifeAnalogy: {
        title: 'Sorting Grocery Items by Category Bin',
        icon: '🧺',
        story: 'You have a mixed pile of words: "eat", "tea", "tan", "ate", "nat", "bat". For each word, sort its letters alphabetically to create its ID tag: "eat", "tea", and "ate" all get the tag "aet". You then toss each word into the bucket labeled "aet". When finished, every bucket contains grouped anagrams!',
        takeaway: 'Use a standardized fingerprint (like sorted letters or count tuple) as a dictionary key to group matching items.'
      },
      jargonBreakdown: [
        COMMON_DSA_GLOSSARY['hash-map'],
        {
          term: 'Signature / Canonical Key',
          plainEnglish: 'A unique fingerprint shared by all variations of an item.',
          realLifeAnalogy: '🏷️ Barcode: "eat", "tea", and "ate" all share the barcode "a-e-t".',
          whyItMatters: 'Enables grouping different items under a single shared bucket.'
        }
      ],
      plainEnglishSummary: 'Convert each word into its letter signature (sorted letters). Use that signature as a dictionary key, where the value is the list of words matching that signature.',
      mentalModelQuestion: 'What universal fingerprint do all words in this group share?'
    };
  }

  // DAY 5: Top K Frequent Elements
  if (id === 'top-k-frequent-elements') {
    return {
      realLifeAnalogy: {
        title: 'Leaderboard Buckets',
        icon: '🏆',
        story: '100 people vote for their favorite movie. Star Wars gets 50 votes, Inception gets 30 votes, Titanic gets 10 votes. Instead of sorting 1,000 movie titles, you create buckets labeled by vote counts (Bucket 50, Bucket 30, Bucket 10). You look in the highest-numbered buckets first to grab the top winners immediately!',
        takeaway: 'Bucket Sort uses the frequency as an array index, eliminating the need to sort all elements.'
      },
      jargonBreakdown: [
        {
          term: 'Bucket Sort',
          plainEnglish: 'Distributing items into indexed buckets based on their values or counts.',
          realLifeAnalogy: '🗄️ Sorting Coins by Value into 25¢, 10¢, 5¢, 1¢ slots.',
          whyItMatters: 'Runs in linear O(N) time without the O(N log N) sorting bottleneck.'
        },
        COMMON_DSA_GLOSSARY['heap']
      ],
      plainEnglishSummary: 'Count how often each number occurs. Place numbers into buckets indexed by their count. Walk backwards from the highest count bucket to collect the top K numbers.',
      mentalModelQuestion: 'If I group numbers by their popularity count, who is in the highest buckets?'
    };
  }

  // DAY 8: Valid Palindrome & Two Pointers
  if (id === 'valid-palindrome' || id === 'two-sum-ii-input-array-is-sorted' || id === 'container-with-most-water' || id === 'trapping-rain-water') {
    return {
      realLifeAnalogy: {
        title: 'Two People Walking from Opposite Ends of a Bridge',
        icon: '🌉',
        story: 'Imagine two inspectors starting at opposite ends of a 100-meter bridge walking toward the center. Inspector Left and Inspector Right compare structural points at each step. Because the bridge is sorted or symmetric, if the sum is too heavy, the right inspector takes a step inward; if too light, the left inspector steps forward.',
        takeaway: 'Two pointers eliminate nested loops by squeezing from the outer bounds inward in O(N) time.'
      },
      jargonBreakdown: [
        COMMON_DSA_GLOSSARY['two-pointers'],
        {
          term: 'In-Place / O(1) Space',
          plainEnglish: 'Solving the problem using only the existing input array without creating big copies in memory.',
          realLifeAnalogy: '✏️ Erasing and writing on the original paper instead of buying 10 new notebooks.',
          whyItMatters: 'Uses virtually zero computer memory.'
        }
      ],
      plainEnglishSummary: 'Start one pointer at the start (Left = 0) and one pointer at the end (Right = len - 1). Evaluate the condition and move one pointer inward based on the result.',
      mentalModelQuestion: 'Which pointer (Left or Right) is holding back our target condition?'
    };
  }

  // DAY 10: 3Sum
  if (id === '3sum') {
    return {
      realLifeAnalogy: {
        title: 'Locking One Person & Finding Their Two Partners',
        icon: '🤝',
        story: 'You need to form a team of 3 people whose total net score is exactly 0. First, line everyone up by score from lowest to highest. You pick Person #1 (the Pivot) and lock them in place. Now, you only need to find 2 remaining people whose scores cancel out Person #1! You use Two Pointers (Left and Right) on the remaining line to find the matching pair in seconds.',
        takeaway: '3Sum is just doing Two Sum repeatedly: lock one item in place, then 2-pointer scan the rest.'
      },
      jargonBreakdown: [
        COMMON_DSA_GLOSSARY['two-pointers'],
        {
          term: 'Pivot',
          plainEnglish: 'A fixed reference point around which other elements are compared or tested.',
          realLifeAnalogy: '📍 Anchor pin on a compass.',
          whyItMatters: 'Reduces a 3-variable problem into a simpler 2-variable problem.'
        }
      ],
      plainEnglishSummary: 'Sort the array. For each number i, fix it as a pivot. Run a Two Pointer scan on the numbers to the right of i to find pairs that sum to -nums[i]. Skip duplicates to avoid repeating triplets.',
      mentalModelQuestion: 'If I fix one number right now, what two numbers on the right will cancel it out to zero?'
    };
  }

  // DAY 15: Valid Parentheses & Min Stack
  if (id === 'valid-parentheses' || id === 'min-stack') {
    return {
      realLifeAnalogy: {
        title: 'Cafeteria Trays & Russian Nesting Dolls',
        icon: '🥞',
        story: 'When you open a parenthesis `(`, you place a tray onto the stack. When you open a curly brace `{`, you place that on top. When you see a closing brace `}`, you look at the TOP tray on the stack. If it doesn\'t match the brace you just saw, the syntax is broken! The last bracket opened must be the first bracket closed.',
        takeaway: 'Stacks enforce strict Last-In, First-Out (LIFO) pairing for nested hierarchies.'
      },
      jargonBreakdown: [
        COMMON_DSA_GLOSSARY['stack'],
        {
          term: 'LIFO (Last In, First Out)',
          plainEnglish: 'The newest item added is the first one that must be removed.',
          realLifeAnalogy: '🎾 Tennis balls in a tube: The last ball pushed in is the first ball you take out.',
          whyItMatters: 'Guarantees that innermost nested items are resolved before outer items.'
        }
      ],
      plainEnglishSummary: 'Push opening brackets onto a stack. When encountering a closing bracket, pop the top element from the stack and verify that it is the matching opening pair.',
      mentalModelQuestion: 'Does this closing tag match the most recent opening tag on top of my stack?'
    };
  }

  // DAY 19: Climbing Stairs & Coin Change & Unique Paths
  if (id === 'climbing-stairs' || id === 'coin-change' || id === 'unique-paths') {
    return {
      realLifeAnalogy: {
        title: 'Building a Pyramid from the Ground Up',
        icon: '🪜',
        story: 'If you want to know how many ways to reach Step 5, you realize: You can only step onto Step 5 from Step 4 (1 step jump) or Step 3 (2 step jump). So: Ways(5) = Ways(4) + Ways(3). Instead of guessing all paths from the top, you start at Step 1 and Step 2, and add them forward. You build the answer one brick at a time without redoing work!',
        takeaway: 'Dynamic Programming breaks a big impossible goal into smaller steps you already know the answer to.'
      },
      jargonBreakdown: [
        COMMON_DSA_GLOSSARY['tabulation'],
        COMMON_DSA_GLOSSARY['memoization'],
        {
          term: 'State Transition / Recurrence Relation',
          plainEnglish: 'The math rule that computes today\'s answer using yesterday\'s answers.',
          realLifeAnalogy: '🧱 Brick Rule: "Every new brick rests on top of the two bricks directly beneath it."',
          whyItMatters: 'Turns exponential brute force O(2^N) into lightning-fast linear O(N) execution.'
        }
      ],
      plainEnglishSummary: 'Identify the smallest base cases (e.g. 0 and 1). Use a loop to compute each subsequent step using the values of the previous steps stored in an array.',
      mentalModelQuestion: 'How can I calculate my current step using only the results from the previous 1 or 2 steps?'
    };
  }

  // DAY 26: Kth Largest Element & DAY 27 Subsets
  if (id === 'kth-largest-element-in-an-array') {
    return {
      realLifeAnalogy: {
        title: 'The Top-3 Leaderboard Bouncer',
        icon: '🥇',
        story: 'Imagine a VIP club with room for only K=3 top celebrities. A Min-Heap holds the current 3 biggest stars. When a new person arrives, you compare them to the *least famous* person in the VIP room (sitting at the root of the heap). If the new person is more famous, you kick out the smallest and let the new person in. At the end, the person at the door of the VIP room is the K-th largest!',
        takeaway: 'A Min-Heap of size K automatically discards smaller elements, keeping the top K values in O(N log K) time.'
      },
      jargonBreakdown: [
        COMMON_DSA_GLOSSARY['heap'],
        {
          term: 'Min-Heap Root',
          plainEnglish: 'The smallest element in the collection is always at index 0 (`heap[0]`).',
          realLifeAnalogy: '🚪 The shortest person in the room is always standing closest to the exit.',
          whyItMatters: 'Allows comparing against the lowest threshold in instant O(1) time.'
        }
      ],
      plainEnglishSummary: 'Push numbers into a min-heap. Whenever the heap grows larger than K, pop the smallest item. When done, the root of the heap is the K-th largest number.',
      mentalModelQuestion: 'If I only keep the top K winners in a room, who is the smallest person currently inside?'
    };
  }

  // DAY 27: Subsets (Power Set)
  if (id === 'subsets') {
    return {
      realLifeAnalogy: {
        title: 'Packing a Backpack (Yes or No for each item)',
        icon: '🎒',
        story: 'You have 3 items on your bed: an Apple, a Book, and a Camera. For each item, you have exactly 2 choices: (1) Put it in the backpack, OR (2) Leave it on the bed. You branch out for the Apple (In/Out), then the Book (In/Out), then the Camera (In/Out). This binary decision tree creates all 2³ = 8 possible packing combinations!',
        takeaway: 'Backtracking explores decisions by choosing an option, exploring deeper, and then undoing that choice (backtracking).'
      },
      jargonBreakdown: [
        COMMON_DSA_GLOSSARY['backtracking'],
        COMMON_DSA_GLOSSARY['permutations']
      ],
      plainEnglishSummary: 'Use recursion. At each index, branch into two decisions: include the current number in the subset, or skip it. When you reach the end of the array, add the subset to the answer list.',
      mentalModelQuestion: 'At this index, what happens if I INCLUDE this number vs if I EXCLUDE it?'
    };
  }

  // Default Fallback
  return {
    realLifeAnalogy: {
      title: 'Real-World Pattern Mental Model',
      icon: '💡',
      story: `Think of this ${problem.category} problem like an everyday sorting, filtering, or decision task. Instead of brute-forcing all possibilities, we identify the invariant (the rule that never changes) to bypass unnecessary work.`,
      takeaway: 'Focus on eliminating repetitive work using the right data structure.'
    },
    jargonBreakdown: [
      COMMON_DSA_GLOSSARY['hash-map'],
      COMMON_DSA_GLOSSARY['two-pointers'],
      COMMON_DSA_GLOSSARY['stack']
    ],
    plainEnglishSummary: problem.optimalIntuition,
    mentalModelQuestion: 'What invariant allows me to avoid checking redundant items?'
  };
}
