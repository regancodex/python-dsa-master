import { Problem } from '../types/dsa';

export const EXTENDED_BLIND75_PROBLEMS_PART2: Problem[] = [
  // DAY 46 - Trees
  {
    id: 'kth-smallest-element-in-a-bst',
    day: 46,
    isCore: false,
    title: 'Kth Smallest Element in a BST',
    category: 'Trees',
    difficulty: 'Medium',
    leetcodeNumber: 230,
    leetcodeUrl: 'https://leetcode.com/problems/kth-smallest-element-in-a-bst/',
    companies: ['Amazon', 'Uber', 'Meta', 'Google'],
    description: 'Given the `root` of a binary search tree, and an integer `k`, return the `k`-th smallest value (1-indexed) of all the values of the nodes in the tree.',
    examples: [
      { input: 'root = [3,1,4,null,2], k = 1', output: '1' },
      { input: 'root = [5,3,6,2,4,null,null,1], k = 3', output: '3' }
    ],
    constraints: ['The number of nodes in the tree is n', '1 <= k <= n <= 10^4', '0 <= Node.val <= 10^4'],
    starterCode: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def kth_smallest(root: TreeNode, k: int) -> int:
    # Write your iterative or recursive in-order traversal:
    pass`,
    solutionCode: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def kth_smallest(root: TreeNode, k: int) -> int:
    """
    Iterative Inorder Traversal using Stack
    Time Complexity: O(H + K) where H is tree height
    Space Complexity: O(H)
    """
    stack = []
    curr = root
    
    while curr or stack:
        while curr:
            stack.append(curr)
            curr = curr.left
            
        curr = stack.pop()
        k -= 1
        if k == 0:
            return curr.val
            
        curr = curr.right
        
    return -1`,
    optimalIntuition: 'An In-Order Traversal (Left -> Root -> Right) of a Binary Search Tree produces elements in strictly ascending sorted order. We can stop immediately as soon as we visit the k-th node!',
    stepByStepLogic: [
      'Use an explicit stack for iterative in-order traversal.',
      'Drift all the way to the leftmost node, pushing nodes onto the stack.',
      'Pop top node, decrement `k`.',
      'If `k == 0`, return `node.val`.',
      'Move to right child `curr = curr.right`.'
    ],
    complexity: {
      time: 'O(H + K)',
      space: 'O(H)',
      timeExplanation: 'Only traverses down to height H, then visits K nodes.',
      spaceExplanation: 'Stack holds at most H frames.'
    },
    commonPitfalls: ['Traversing the entire tree into a list and returning `arr[k-1]`, which wastes O(N) space and visits unnecessary nodes.'],
    pythonicTips: ['Using a generator `yield from inorder(node.left); yield node.val; yield from inorder(node.right)` allows elegant lazy evaluation.'],
    testCases: [
      { input: '[3, 1, 4, null, 2], 1', expected: '1' },
      { input: '[5, 3, 6, 2, 4, null, null, 1], 3', expected: '3' }
    ],
    tags: ['Trees', 'BST', 'Inorder Traversal', 'Medium']
  },

  // DAY 47 - Tries
  {
    id: 'implement-trie-prefix-tree',
    day: 47,
    isCore: false,
    title: 'Implement Trie (Prefix Tree)',
    category: 'Tries',
    difficulty: 'Medium',
    leetcodeNumber: 208,
    leetcodeUrl: 'https://leetcode.com/problems/implement-trie-prefix-tree/',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Twitter'],
    description: 'A Trie (pronounced "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. Implement the `Trie` class with `insert`, `search`, and `startsWith`.',
    examples: [
      { input: '["Trie", "insert", "search", "search", "startsWith", "insert", "search"]\n[[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]', output: '[null, null, true, false, true, null, true]' }
    ],
    constraints: ['1 <= word.length, prefix.length <= 2000', 'words consist only of lowercase English letters', 'At most 3 * 10^4 calls total'],
    starterCode: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end_of_word = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        pass

    def search(self, word: str) -> bool:
        pass

    def startsWith(self, prefix: str) -> bool:
        pass`,
    solutionCode: `class TrieNode:
    def __init__(self):
        self.children: dict[str, TrieNode] = {}
        self.is_end = False

class Trie:
    """
    Prefix Tree with dictionary-based children
    Time Complexity: O(L) for all operations where L is string length
    Space Complexity: O(N * L) for trie nodes
    """
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        curr = self.root
        for char in word:
            if char not in curr.children:
                curr.children[char] = TrieNode()
            curr = curr.children[char]
        curr.is_end = True

    def search(self, word: str) -> bool:
        curr = self.root
        for char in word:
            if char not in curr.children:
                return False
            curr = curr.children[char]
        return curr.is_end

    def startsWith(self, prefix: str) -> bool:
        curr = self.root
        for char in prefix:
            if char not in curr.children:
                return False
            curr = curr.children[char]
        return True`,
    optimalIntuition: 'A Trie links character nodes sequentially. `search` requires `curr.is_end == True`, while `startsWith` only requires navigating down the full prefix chain without needing `is_end`.',
    stepByStepLogic: [
      'Initialize `root = TrieNode()`.',
      'For `insert`: step through each character, instantiating `TrieNode` if missing; set `is_end = True` at the final node.',
      'For `search`: traverse character chain; return `False` if broken; return `curr.is_end` at the end.',
      'For `startsWith`: traverse prefix; return `False` if broken; return `True` if prefix chain completed.'
    ],
    complexity: {
      time: 'O(L)',
      space: 'O(Total Chars)',
      timeExplanation: 'Operations depend only on word length L, independent of total words stored.',
      spaceExplanation: 'Shared prefixes conserve memory.'
    },
    commonPitfalls: ['Forgetting `is_end` check in `search()` which causes it to mistakenly treat prefixes as complete words.'],
    pythonicTips: ['`dict` based children are dynamic and memory friendly in Python compared to fixed size 26 arrays.'],
    testCases: [
      { input: 'insert("apple"), search("apple"), search("app"), startsWith("app")', expected: '[True, False, True]' }
    ],
    tags: ['Tries', 'String', 'Design', 'Medium']
  },

  // DAY 48 - Tries
  {
    id: 'design-add-and-search-words-data-structure',
    day: 48,
    isCore: false,
    title: 'Design Add and Search Words Data Structure',
    category: 'Tries',
    difficulty: 'Medium',
    leetcodeNumber: 211,
    leetcodeUrl: 'https://leetcode.com/problems/design-add-and-search-words-data-structure/',
    companies: ['Meta', 'Amazon', 'Google'],
    description: 'Design a data structure that supports adding new words and finding if a string matches any previously added string. String may contain the dot character `.` to represent any letter.',
    examples: [
      { input: 'addWord("bad"), addWord("dad"), addWord("mad"), search("pad"), search("bad"), search(".ad"), search("b..")', output: '[false, true, true, true]' }
    ],
    constraints: ['1 <= word.length <= 25', 'word in addWord contains only lowercase English letters', 'word in search consists of \'.\' or lowercase English letters'],
    starterCode: `class WordDictionary:
    def __init__(self):
        pass

    def addWord(self, word: str) -> None:
        pass

    def search(self, word: str) -> bool:
        pass`,
    solutionCode: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class WordDictionary:
    def __init__(self):
        self.root = TrieNode()

    def addWord(self, word: str) -> None:
        curr = self.root
        for c in word:
            if c not in curr.children:
                curr.children[c] = TrieNode()
            curr = curr.children[c]
        curr.is_end = True

    def search(self, word: str) -> bool:
        def dfs(j: int, root: TrieNode) -> bool:
            curr = root
            for i in range(j, len(word)):
                c = word[i]
                if c == ".":
                    for child in curr.children.values():
                        if dfs(i + 1, child):
                            return True
                    return False
                else:
                    if c not in curr.children:
                        return False
                    curr = curr.children[c]
            return curr.is_end
            
        return dfs(0, self.root)`,
    optimalIntuition: 'When a wildcard `.` is encountered, branch DFS recursively into all child nodes in `curr.children.values()`. If any branch returns `True`, the word matches.',
    stepByStepLogic: [
      'Standard Trie insertion for `addWord`.',
      'For `search`, use recursive `dfs(index, node)`.',
      'If character is regular letter: traverse child.',
      'If character is `.`: loop through all child nodes and test `dfs(index + 1, child)`.',
      'Return `curr.is_end` at end of word.'
    ],
    complexity: {
      time: 'O(M) for words without dots; O(26^N) worst-case for all dots',
      space: 'O(N) recursion stack',
      timeExplanation: 'Wildcard branching checks each possibility.',
      spaceExplanation: 'Stack bounded by max word length.'
    },
    commonPitfalls: ['Not returning `False` if all children fail in the wildcard loop.'],
    pythonicTips: ['Iterating over `curr.children.values()` avoids iterating empty alphabet buckets.'],
    testCases: [
      { input: 'addWord("bad"), search(".ad")', expected: 'True' },
      { input: 'search("b.d")', expected: 'True' }
    ],
    tags: ['Tries', 'DFS', 'Backtracking', 'Medium']
  },

  // DAY 49 - Backtracking
  {
    id: 'word-search',
    day: 49,
    isCore: false,
    title: 'Word Search',
    category: 'Backtracking',
    difficulty: 'Medium',
    leetcodeNumber: 79,
    leetcodeUrl: 'https://leetcode.com/problems/word-search/',
    companies: ['Amazon', 'Bloomberg', 'Microsoft', 'Meta'],
    description: 'Given an `m x n` grid of characters `board` and a string `word`, return `true` if `word` exists in the grid. The word can be constructed from sequentially adjacent cells (horizontally or vertically). The same letter cell may not be used more than once.',
    examples: [
      { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"', output: 'true' },
      { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"', output: 'true' },
      { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"', output: 'false' }
    ],
    constraints: ['m == board.length', 'n == board[i].length', '1 <= m, n <= 6', '1 <= word.length <= 15'],
    starterCode: `def exist(board: list[list[str]], word: str) -> bool:
    # Write your DFS Backtracking solution:
    pass`,
    solutionCode: `def exist(board: list[list[str]], word: str) -> bool:
    """
    Backtracking DFS with in-place cell marking
    Time Complexity: O(M * N * 4^L) where L is word length
    Space Complexity: O(L) for recursion stack
    """
    ROWS, COLS = len(board), len(board[0])
    
    def dfs(r: int, c: int, i: int) -> bool:
        if i == len(word):
            return True
        if r < 0 or c < 0 or r >= ROWS or c >= COLS or board[r][c] != word[i]:
            return False
            
        temp = board[r][c]
        board[r][c] = "#"  # mark visited
        
        found = (
            dfs(r + 1, c, i + 1) or
            dfs(r - 1, c, i + 1) or
            dfs(r, c + 1, i + 1) or
            dfs(r, c - 1, i + 1)
        )
        
        board[r][c] = temp  # backtrack
        return found
        
    for r in range(ROWS):
        for c in range(COLS):
            if board[r][c] == word[0] and dfs(r, c, 0):
                return True
                
    return False`,
    optimalIntuition: 'Explore 4 directions recursively. Temporarily mutate `board[r][c] = "#"` to mark the cell visited in O(1) space, and restore it (`board[r][c] = temp`) upon returning to backtrack cleanly.',
    stepByStepLogic: [
      'Iterate over all cells `(r, c)` on the board.',
      'If `board[r][c] == word[0]`, initiate `dfs(r, c, 0)`.',
      'Base cases: if index `i == len(word)` return `True`. If out of bounds or `board[r][c] != word[i]`, return `False`.',
      'Mark cell `#`, branch into 4 directions, restore cell.',
      'Return `True` if any direction finds the word.'
    ],
    complexity: {
      time: 'O(M * N * 4^L)',
      space: 'O(L)',
      timeExplanation: 'Grid scan + 4-way branching up to word length L.',
      spaceExplanation: 'Recursion depth equal to word length.'
    },
    commonPitfalls: ['Creating a new `set()` for visited positions on each recursive frame leads to excessive allocations; in-place grid modification is fastest.'],
    pythonicTips: ['Pruning: check if board contains enough character counts before running DFS to fail-fast impossible words.'],
    testCases: [
      { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"', expected: 'True' },
      { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"', expected: 'False' }
    ],
    tags: ['Backtracking', 'Matrix', 'DFS', 'Medium']
  },

  // DAY 50 - Graphs
  {
    id: 'clone-graph',
    day: 50,
    isCore: false,
    title: 'Clone Graph',
    category: 'Graphs',
    difficulty: 'Medium',
    leetcodeNumber: 133,
    leetcodeUrl: 'https://leetcode.com/problems/clone-graph/',
    companies: ['Meta', 'Amazon', 'Google', 'Microsoft'],
    description: 'Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph.',
    examples: [
      { input: 'adjList = [[2,4],[1,3],[2,4],[1,3]]', output: '[[2,4],[1,3],[2,4],[1,3]]' }
    ],
    constraints: ['The number of nodes in the graph is in the range [0, 100]', '1 <= Node.val <= 100'],
    starterCode: `class Node:
    def __init__(self, val=0, neighbors=None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []

def clone_graph(node: 'Node') -> 'Node':
    # Write your DFS or BFS graph cloning:
    pass`,
    solutionCode: `class Node:
    def __init__(self, val=0, neighbors=None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []

def clone_graph(node: 'Node') -> 'Node':
    """
    Hash Map + DFS Graph Cloning
    Time Complexity: O(V + E)
    Space Complexity: O(V)
    """
    if not node:
        return None
        
    old_to_new = {}
    
    def dfs(curr: 'Node') -> 'Node':
        if curr in old_to_new:
            return old_to_new[curr]
            
        copy = Node(curr.val)
        old_to_new[curr] = copy
        
        for neighbor in curr.neighbors:
            copy.neighbors.append(dfs(neighbor))
            
        return copy
        
    return dfs(node)`,
    optimalIntuition: 'To make a deep copy and handle cycles, use a dictionary `old_to_new` mapping original nodes to cloned nodes. When visiting a node for the first time, clone it, store it in the map, and recursively clone its neighbors.',
    stepByStepLogic: [
      'Check if input `node is None`.',
      'Use `old_to_new = {}` to store cloned references.',
      'In `dfs(curr)`: if `curr in old_to_new`, return `old_to_new[curr]`.',
      'Create `copy = Node(curr.val)`, register in map.',
      'Iterate over neighbors: `copy.neighbors.append(dfs(neighbor))`.',
      'Return cloned node.'
    ],
    complexity: {
      time: 'O(V + E)',
      space: 'O(V)',
      timeExplanation: 'Visits each vertex and edge once.',
      spaceExplanation: 'Map stores all V vertices.'
    },
    commonPitfalls: ['Infinite recursion on cycles if you don\'t store `copy` in the map BEFORE recurring into neighbors.'],
    pythonicTips: ['Dictionary keys can be Python object instances (`Node`) directly because Python uses their memory address hash by default.'],
    testCases: [
      { input: 'adjList = [[2,4],[1,3],[2,4],[1,3]]', expected: 'Cloned deep copy graph' }
    ],
    tags: ['Graphs', 'DFS', 'Hash Table', 'Medium']
  },

  // DAY 51 - Graphs
  {
    id: 'course-schedule-ii',
    day: 51,
    isCore: false,
    title: 'Course Schedule II (Topological Sort / Kahn\'s)',
    category: 'Graphs',
    difficulty: 'Medium',
    leetcodeNumber: 210,
    leetcodeUrl: 'https://leetcode.com/problems/course-schedule-ii/',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'DoorDash'],
    description: 'There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [a_i, b_i]` indicates that you must take course `b_i` before `a_i`. Return the ordering of courses you should take to finish all courses. If impossible, return `[]`.',
    examples: [
      { input: 'numCourses = 2, prerequisites = [[1,0]]', output: '[0,1]' },
      { input: 'numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]', output: '[0,2,1,3]', explanation: '[0,1,2,3] is also valid.' }
    ],
    constraints: ['1 <= numCourses <= 2000', '0 <= prerequisites.length <= numCourses * (numCourses - 1)'],
    starterCode: `def find_order(numCourses: int, prerequisites: list[list[int]]) -> list[int]:
    # Write your Topological Sort / Kahn's algorithm:
    pass`,
    solutionCode: `from collections import deque, defaultdict

def find_order(numCourses: int, prerequisites: list[list[int]]) -> list[int]:
    """
    Kahn's Algorithm (BFS with In-degree Array)
    Time Complexity: O(V + E)
    Space Complexity: O(V + E)
    """
    adj = defaultdict(list)
    in_degree = [0] * numCourses
    
    for crs, pre in prerequisites:
        adj[pre].append(crs)
        in_degree[crs] += 1
        
    queue = deque([i for i in range(numCourses) if in_degree[i] == 0])
    order = []
    
    while queue:
        node = queue.popleft()
        order.append(node)
        
        for neighbor in adj[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
                
    return order if len(order) == numCourses else []`,
    optimalIntuition: 'Kahn\'s algorithm processes nodes with `in_degree == 0` (courses with no prerequisites remaining). As courses are completed, we decrement dependent courses\' in-degrees. If we complete all `numCourses`, we have a valid topological order!',
    stepByStepLogic: [
      'Build adjacency list `adj` and count incoming degrees `in_degree`.',
      'Queue all courses with `in_degree == 0`.',
      'Pop from queue, append to `order`.',
      'For each dependent neighbor, decrement in-degree; push to queue if in-degree becomes 0.',
      'Return `order` if `len(order) == numCourses` else `[]` (cycle detected).'
    ],
    complexity: {
      time: 'O(V + E)',
      space: 'O(V + E)',
      timeExplanation: 'Linear in vertices and edges.',
      spaceExplanation: 'Adjacency graph and queue storage.'
    },
    commonPitfalls: ['Returning partial order when a cycle exists instead of returning empty list `[]`.'],
    pythonicTips: ['`deque` popleft is O(1) compared to `list.pop(0)` which is O(N).'],
    testCases: [
      { input: '2, [[1, 0]]', expected: '[0, 1]' },
      { input: '4, [[1,0],[2,0],[3,1],[3,2]]', expected: '[0, 1, 2, 3]' }
    ],
    tags: ['Graphs', 'Topological Sort', 'BFS', 'Medium']
  },

  // DAY 52 - Graphs
  {
    id: 'graph-valid-tree',
    day: 52,
    isCore: false,
    title: 'Graph Valid Tree (Union-Find / Disjoint Set)',
    category: 'Graphs',
    difficulty: 'Medium',
    leetcodeNumber: 261,
    leetcodeUrl: 'https://leetcode.com/problems/graph-valid-tree/',
    companies: ['Google', 'Meta', 'Amazon', 'LinkedIn'],
    description: 'Given `n` nodes labeled from `0` to `n - 1` and a list of undirected edges, write a function to check whether these edges make up a valid tree. A valid tree has no cycles and is fully connected.',
    examples: [
      { input: 'n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]', output: 'true' },
      { input: 'n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]', output: 'false' }
    ],
    constraints: ['1 <= n <= 2000', '0 <= edges.length <= 5000'],
    starterCode: `def valid_tree(n: int, edges: list[list[int]]) -> bool:
    # Write your Union-Find or DFS cycle check:
    pass`,
    solutionCode: `def valid_tree(n: int, edges: list[list[int]]) -> bool:
    """
    Tree Property: Exactly n - 1 edges AND connected with no cycles
    Time Complexity: O(N * alpha(N)) via Union-Find with path compression
    Space Complexity: O(N)
    """
    if len(edges) != n - 1:
        return False
        
    parent = list(range(n))
    
    def find(x: int) -> int:
        if parent[x] != x:
            parent[x] = find(parent[x])  # Path compression
        return parent[x]
        
    def union(x: int, y: int) -> bool:
        root_x = find(x)
        root_y = find(y)
        if root_x == root_y:
            return False  # Cycle detected
        parent[root_x] = root_y
        return True
        
    for u, v in edges:
        if not union(u, v):
            return False
            
    return True`,
    optimalIntuition: 'A graph of `n` nodes is a valid tree if and only if it has exactly `n - 1` edges and contains no cycles. Union-Find checks cycle existence in near-constant time per edge!',
    stepByStepLogic: [
      'Early exit: if `len(edges) != n - 1`, it cannot be a tree.',
      'Initialize `parent = list(range(n))`.',
      'For each edge `(u, v)`: union their sets.',
      'If `find(u) == find(v)`, a cycle exists: return `False`.',
      'Return `True` if all unions succeed.'
    ],
    complexity: {
      time: 'O(N * alpha(N)) = O(N)',
      space: 'O(N)',
      timeExplanation: 'Inverse Ackermann function is practically O(1).',
      spaceExplanation: 'Parent array of size N.'
    },
    commonPitfalls: ['Checking only cycles without verifying connectivity (covered by `len(edges) == n - 1` check).'],
    pythonicTips: ['Path compression `parent[x] = find(parent[x])` flattens the tree dynamically on lookups.'],
    testCases: [
      { input: '5, [[0,1],[0,2],[0,3],[1,4]]', expected: 'True' },
      { input: '5, [[0,1],[1,2],[2,3],[1,3],[1,4]]', expected: 'False' }
    ],
    tags: ['Graphs', 'Union-Find', 'Tree', 'Medium']
  },

  // DAY 53 - 1-D Dynamic Programming
  {
    id: 'word-break',
    day: 53,
    isCore: false,
    title: 'Word Break',
    category: '1-D Dynamic Programming',
    difficulty: 'Medium',
    leetcodeNumber: 139,
    leetcodeUrl: 'https://leetcode.com/problems/word-break/',
    companies: ['Amazon', 'Meta', 'Google', 'Bloomberg', 'Apple'],
    description: 'Given a string `s` and a dictionary of strings `wordDict`, return `true` if `s` can be segmented into a space-separated sequence of one or more dictionary words.',
    examples: [
      { input: 's = "leetcode", wordDict = ["leet","code"]', output: 'true', explanation: 'Return true because "leetcode" can be segmented as "leet code".' },
      { input: 's = "applepenapple", wordDict = ["apple","pen"]', output: 'true' },
      { input: 's = "catsandog", wordDict = ["cats","dog","sand","and","cat"]', output: 'false' }
    ],
    constraints: ['1 <= s.length <= 300', '1 <= wordDict.length <= 1000', '1 <= wordDict[i].length <= 20'],
    starterCode: `def word_break(s: str, wordDict: list[str]) -> bool:
    # Write your bottom-up DP solution:
    pass`,
    solutionCode: `def word_break(s: str, wordDict: list[str]) -> bool:
    """
    Bottom-up 1-D DP from end of string
    dp[i] means s[i:] can be segmented into words from wordDict
    Time Complexity: O(N * M * K) where N = len(s), M = len(wordDict), K = word length
    Space Complexity: O(N)
    """
    dp = [False] * (len(s) + 1)
    dp[len(s)] = True  # Base case: empty suffix is valid
    
    for i in range(len(s) - 1, -1, -1):
        for w in wordDict:
            if (i + len(w)) <= len(s) and s[i : i + len(w)] == w:
                if dp[i + len(w)]:
                    dp[i] = True
                    break
                    
    return dp[0]`,
    optimalIntuition: 'Let `dp[i]` denote whether the suffix `s[i:]` can be segmented. If a word `w` matches `s[i : i + len(w)]` and `dp[i + len(w)] == True`, then `dp[i]` is also `True`!',
    stepByStepLogic: [
      'Create `dp = [False] * (len(s) + 1)` with `dp[len(s)] = True`.',
      'Iterate backwards from `i = len(s) - 1` down to 0.',
      'For each word in `wordDict`: if `s[i : i + len(w)] == w` and `dp[i + len(w)]`: set `dp[i] = True` and break.',
      'Return `dp[0]`.'
    ],
    complexity: {
      time: 'O(N * M * K)',
      space: 'O(N)',
      timeExplanation: 'Iterates through string length N checking M words.',
      spaceExplanation: '1D DP array of size N + 1.'
    },
    commonPitfalls: ['Iterating forwards without checking all possible matching word lengths.'],
    pythonicTips: ['`s[i : i + len(w)] == w` is concise and fast in CPython.'],
    testCases: [
      { input: '"leetcode", ["leet", "code"]', expected: 'True' },
      { input: '"catsandog", ["cats","dog","sand","and","cat"]', expected: 'False' }
    ],
    tags: ['Dynamic Programming', 'Tries', 'String', 'Medium']
  },

  // DAY 54 - 1-D Dynamic Programming
  {
    id: 'longest-increasing-subsequence',
    day: 54,
    isCore: false,
    title: 'Longest Increasing Subsequence (Patience Sorting)',
    category: '1-D Dynamic Programming',
    difficulty: 'Medium',
    leetcodeNumber: 300,
    leetcodeUrl: 'https://leetcode.com/problems/longest-increasing-subsequence/',
    companies: ['Google', 'Amazon', 'Microsoft', 'Meta'],
    description: 'Given an integer array `nums`, return the length of the longest strictly increasing subsequence. Can you solve it in `O(N log N)` time?',
    examples: [
      { input: 'nums = [10,9,2,5,3,7,101,18]', output: '4', explanation: 'The longest increasing subsequence is [2,5,7,101], therefore length is 4.' },
      { input: 'nums = [0,1,0,3,2,3]', output: '4' },
      { input: 'nums = [7,7,7,7,7,7,7]', output: '1' }
    ],
    constraints: ['1 <= nums.length <= 2500', '-10^4 <= nums[i] <= 10^4'],
    starterCode: `def length_of_lis(nums: list[int]) -> int:
    # Write your O(N log N) patience sort / bisect solution:
    pass`,
    solutionCode: `import bisect

def length_of_lis(nums: list[int]) -> int:
    """
    Patience Sorting with Binary Search (bisect_left)
    Time Complexity: O(N log N)
    Space Complexity: O(N)
    """
    tails = []
    
    for num in nums:
        idx = bisect.bisect_left(tails, num)
        if idx == len(tails):
            tails.append(num)
        else:
            tails[idx] = num  # Replace with smaller ending tail to greedily extend future subsequences
            
    return len(tails)`,
    optimalIntuition: 'Maintain an array `tails` where `tails[i]` stores the smallest tail of all increasing subsequences of length `i + 1`. Binary search (`bisect_left`) finds where `num` fits: either extending the longest sequence or making an existing sequence easier to extend!',
    stepByStepLogic: [
      'Initialize empty `tails = []`.',
      'For each `num` in `nums`:',
      '  Find insertion point `idx = bisect_left(tails, num)`.',
      '  If `idx == len(tails)`: append `num`.',
      '  Else: overwrite `tails[idx] = num`.',
      'Return `len(tails)`.'
    ],
    complexity: {
      time: 'O(N log N)',
      space: 'O(N)',
      timeExplanation: 'N elements, each binary searched in log N time.',
      spaceExplanation: 'Tails array of at most length N.'
    },
    commonPitfalls: ['Using `bisect_right` instead of `bisect_left` which permits non-strictly increasing duplicates.'],
    pythonicTips: ['`bisect.bisect_left` is implemented in C in standard library `_bisect` module for maximum speed.'],
    testCases: [
      { input: '[10,9,2,5,3,7,101,18]', expected: '4' },
      { input: '[0,1,0,3,2,3]', expected: '4' },
      { input: '[7,7,7,7]', expected: '1' }
    ],
    tags: ['Binary Search', 'Dynamic Programming', 'Medium']
  },

  // DAY 55 - 2-D Dynamic Programming
  {
    id: 'longest-common-subsequence',
    day: 55,
    isCore: false,
    title: 'Longest Common Subsequence',
    category: '2-D Dynamic Programming',
    difficulty: 'Medium',
    leetcodeNumber: 1143,
    leetcodeUrl: 'https://leetcode.com/problems/longest-common-subsequence/',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft'],
    description: 'Given two strings `text1` and `text2`, return the length of their longest common subsequence. If there is no common subsequence, return `0`.',
    examples: [
      { input: 'text1 = "abcde", text2 = "ace"', output: '3', explanation: 'The longest common subsequence is "ace" and its length is 3.' },
      { input: 'text1 = "abc", text2 = "abc"', output: '3' },
      { input: 'text1 = "abc", text2 = "def"', output: '0' }
    ],
    constraints: ['1 <= text1.length, text2.length <= 1000', 'text1 and text2 consist of only lowercase English characters'],
    starterCode: `def longest_common_subsequence(text1: str, text2: str) -> int:
    # Write your 2-D DP solution:
    pass`,
    solutionCode: `def longest_common_subsequence(text1: str, text2: str) -> int:
    """
    Bottom-up 2-D DP (Space optimized to O(min(M, N)))
    Time Complexity: O(M * N)
    Space Complexity: O(min(M, N))
    """
    if len(text1) < len(text2):
        text1, text2 = text2, text1
        
    dp = [0] * (len(text2) + 1)
    
    for i in range(len(text1) - 1, -1, -1):
        prev = 0
        for j in range(len(text2) - 1, -1, -1):
            temp = dp[j]
            if text1[i] == text2[j]:
                dp[j] = 1 + prev
            else:
                dp[j] = max(dp[j], dp[j + 1])
            prev = temp
            
    return dp[0]`,
    optimalIntuition: 'If `text1[i] == text2[j]`, the LCS is `1 + LCS(i+1, j+1)`. Otherwise, it is `max(LCS(i+1, j), LCS(i, j+1))`. We can compress the 2D grid down to 1D row array.',
    stepByStepLogic: [
      'Ensure `text2` is the shorter string for space optimization.',
      'Initialize 1D row `dp = [0] * (len(text2) + 1)`.',
      'Traverse backwards: if characters match, `dp[j] = 1 + diagonal`.',
      'Else `dp[j] = max(dp[j], dp[j+1])`.',
      'Return `dp[0]`.'
    ],
    complexity: {
      time: 'O(M * N)',
      space: 'O(min(M, N))',
      timeExplanation: 'Nested iterations over lengths of text1 and text2.',
      spaceExplanation: 'Single row array storage.'
    },
    commonPitfalls: ['Forgetting to store the diagonal value in a `prev` variable before updating `dp[j]`.'],
    pythonicTips: ['Swapping `text1, text2 = text2, text1` guarantees minimal memory allocation.'],
    testCases: [
      { input: '"abcde", "ace"', expected: '3' },
      { input: '"abc", "def"', expected: '0' }
    ],
    tags: ['Dynamic Programming', 'String', 'Medium']
  },

  // DAY 56 - 1-D Dynamic Programming
  {
    id: 'house-robber-ii',
    day: 56,
    isCore: false,
    title: 'House Robber II (Circular Street)',
    category: '1-D Dynamic Programming',
    difficulty: 'Medium',
    leetcodeNumber: 213,
    leetcodeUrl: 'https://leetcode.com/problems/house-robber-ii/',
    companies: ['Amazon', 'Microsoft', 'Google', 'Meta'],
    description: 'You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are arranged in a circle (the first house is the neighbor of the last one). Return the maximum amount of money you can rob tonight without alerting the police.',
    examples: [
      { input: 'nums = [2,3,2]', output: '3', explanation: 'You cannot rob house 1 (money = 2) and then rob house 3 (money = 2), because they are adjacent houses.' },
      { input: 'nums = [1,2,3,1]', output: '4', explanation: 'Rob house 1 (money = 1) and then rob house 3 (money = 3). Total = 1 + 3 = 4.' },
      { input: 'nums = [1,2,3]', output: '3' }
    ],
    constraints: ['1 <= nums.length <= 100', '0 <= nums[i] <= 1000'],
    starterCode: `def rob(nums: list[int]) -> int:
    # Write your circular DP solution:
    pass`,
    solutionCode: `def rob(nums: list[int]) -> int:
    """
    Split circle into two linear problems:
    1) nums[1:] (skip first house)
    2) nums[:-1] (skip last house)
    Time Complexity: O(N)
    Space Complexity: O(1)
    """
    if len(nums) == 1:
        return nums[0]
        
    def rob_linear(houses: list[int]) -> int:
        rob1, rob2 = 0, 0
        for n in houses:
            new_rob = max(rob1 + n, rob2)
            rob1 = rob2
            rob2 = new_rob
        return rob2
        
    return max(rob_linear(nums[1:]), rob_linear(nums[:-1]))`,
    optimalIntuition: 'Because house 0 and house N-1 are adjacent in the circle, we can never rob both. We solve two simple linear House Robber subproblems: one excluding the first house `nums[1:]`, and one excluding the last house `nums[:-1]`, and take the maximum!',
    stepByStepLogic: [
      'If `len(nums) == 1`, return `nums[0]`.',
      'Define linear helper `rob_linear(houses)` using O(1) space variables `rob1, rob2`.',
      'Compute `max(rob_linear(nums[1:]), rob_linear(nums[:-1]))`.',
      'Return answer.'
    ],
    complexity: {
      time: 'O(N)',
      space: 'O(1)',
      timeExplanation: 'Two linear passes.',
      spaceExplanation: 'O(1) auxiliary state variables.'
    },
    commonPitfalls: ['Forgetting the base case `len(nums) == 1`, where both slices `nums[1:]` and `nums[:-1]` would be empty.'],
    pythonicTips: ['Python list slicing `nums[1:]` and `nums[:-1]` provides clean expressive boundaries.'],
    testCases: [
      { input: '[2, 3, 2]', expected: '3' },
      { input: '[1, 2, 3, 1]', expected: '4' },
      { input: '[1]', expected: '1' }
    ],
    tags: ['Dynamic Programming', 'Array', 'Medium']
  },

  // DAY 57 - 1-D Dynamic Programming
  {
    id: 'decode-ways',
    day: 57,
    isCore: false,
    title: 'Decode Ways',
    category: '1-D Dynamic Programming',
    difficulty: 'Medium',
    leetcodeNumber: 91,
    leetcodeUrl: 'https://leetcode.com/problems/decode-ways/',
    companies: ['Amazon', 'Meta', 'Google', 'Uber'],
    description: 'A message containing letters from A-Z can be encoded into numbers using the mapping \'A\' -> "1", \'B\' -> "2", ..., \'Z\' -> "26". Given a string `s` containing only digits, return the number of ways to decode it.',
    examples: [
      { input: 's = "12"', output: '2', explanation: '"12" could be decoded as "AB" (1 2) or "L" (12).' },
      { input: 's = "226"', output: '3', explanation: '"226" could be decoded as "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).' },
      { input: 's = "06"', output: '0', explanation: '"06" cannot be mapped to "F" because "6" is different from "06".' }
    ],
    constraints: ['1 <= s.length <= 100', 's contains only digits and may contain leading zero(s)'],
    starterCode: `def num_decodings(s: str) -> int:
    # Write your O(N) DP solution:
    pass`,
    solutionCode: `def num_decodings(s: str) -> int:
    """
    Fibonacci-style DP with two-variable memory optimization
    Time Complexity: O(N)
    Space Complexity: O(1)
    """
    if not s or s[0] == "0":
        return 0
        
    prev2 = 1  # ways for dp[i-2]
    prev1 = 1  # ways for dp[i-1]
    
    for i in range(1, len(s)):
        curr = 0
        # Single digit decode (1-9)
        if s[i] != "0":
            curr += prev1
        # Two digit decode (10-26)
        two_digit = int(s[i - 1 : i + 1])
        if 10 <= two_digit <= 26:
            curr += prev2
            
        prev2 = prev1
        prev1 = curr
        
    return prev1`,
    optimalIntuition: 'At each digit `s[i]`, we can either decode it alone (if `s[i] != "0"`) or decode it paired with `s[i-1]` (if `10 <= int(s[i-1:i+1]) <= 26`). This is identical to climbing stairs with conditional validity!',
    stepByStepLogic: [
      'Early return `0` if `s[0] == "0"`.',
      'Track `prev2 = 1` and `prev1 = 1`.',
      'For `i` from 1 to `len(s)-1`:',
      '  `curr = 0`.',
      '  If `s[i] != "0"`, `curr += prev1`.',
      '  If `10 <= int(s[i-1:i+1]) <= 26`, `curr += prev2`.',
      '  Shift `prev2, prev1 = prev1, curr`.',
      'Return `prev1`.'
    ],
    complexity: {
      time: 'O(N)',
      space: 'O(1)',
      timeExplanation: 'Single linear pass.',
      spaceExplanation: 'O(1) state variables.'
    },
    commonPitfalls: ['Zeroes cannot be decoded individually (e.g. "0" has 0 ways, "30" has 0 ways).'],
    pythonicTips: ['`10 <= int(s[i-1:i+1]) <= 26` handles the 2-digit boundary cleanly.'],
    testCases: [
      { input: '"12"', expected: '2' },
      { input: '"226"', expected: '3' },
      { input: '"06"', expected: '0' }
    ],
    tags: ['Dynamic Programming', 'String', 'Medium']
  },

  // DAY 58 - Greedy
  {
    id: 'jump-game',
    day: 58,
    isCore: false,
    title: 'Jump Game',
    category: 'Greedy',
    difficulty: 'Medium',
    leetcodeNumber: 55,
    leetcodeUrl: 'https://leetcode.com/problems/jump-game/',
    companies: ['Amazon', 'Meta', 'Microsoft', 'Apple', 'Google'],
    description: 'You are given an integer array `nums`. You are initially positioned at the array\'s first index, and each element in the array represents your maximum jump length at that position. Return `true` if you can reach the last index, or `false` otherwise.',
    examples: [
      { input: 'nums = [2,3,1,1,4]', output: 'true', explanation: 'Jump 1 step from index 0 to 1, then 3 steps to the last index.' },
      { input: 'nums = [3,2,1,0,4]', output: 'false', explanation: 'You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.' }
    ],
    constraints: ['1 <= nums.length <= 10^4', '0 <= nums[i] <= 10^5'],
    starterCode: `def can_jump(nums: list[int]) -> bool:
    # Write your greedy forward/backward pass:
    pass`,
    solutionCode: `def can_jump(nums: list[int]) -> bool:
    """
    Greedy backwards goal post shift
    Time Complexity: O(N)
    Space Complexity: O(1)
    """
    goal = len(nums) - 1
    
    for i in range(len(nums) - 2, -1, -1):
        # If we can jump from i to the current goal, shift goal backwards to i
        if i + nums[i] >= goal:
            goal = i
            
    return goal == 0`,
    optimalIntuition: 'Start from the last index as the `goal`. Iterate backwards: if index `i` has enough jump power `i + nums[i] >= goal`, we can reach `goal` from `i`, so we move our `goal` to `i`. If `goal` reaches index 0, the path is guaranteed!',
    stepByStepLogic: [
      'Set `goal = len(nums) - 1`.',
      'Iterate backwards from `len(nums) - 2` down to 0.',
      'If `i + nums[i] >= goal`, set `goal = i`.',
      'Return `goal == 0`.'
    ],
    complexity: {
      time: 'O(N)',
      space: 'O(1)',
      timeExplanation: 'Single backwards pass.',
      spaceExplanation: 'Constant O(1) memory.'
    },
    commonPitfalls: ['Using O(N^2) dynamic programming or O(2^N) recursion; greedy backwards takes linear O(N) time.'],
    pythonicTips: ['`range(len(nums) - 2, -1, -1)` walks backwards smoothly.'],
    testCases: [
      { input: '[2, 3, 1, 1, 4]', expected: 'True' },
      { input: '[3, 2, 1, 0, 4]', expected: 'False' }
    ],
    tags: ['Greedy', 'Array', 'Medium']
  },

  // DAY 59 - Intervals
  {
    id: 'insert-interval',
    day: 59,
    isCore: false,
    title: 'Insert Interval',
    category: 'Intervals & Bit Manipulation',
    difficulty: 'Medium',
    leetcodeNumber: 57,
    leetcodeUrl: 'https://leetcode.com/problems/insert-interval/',
    companies: ['Google', 'Meta', 'Amazon', 'Microsoft', 'LinkedIn'],
    description: 'You are given an array of non-overlapping intervals `intervals` sorted in ascending order by `start_i` and a new interval `newInterval`. Insert `newInterval` into `intervals` such that `intervals` is still sorted and non-overlapping (merge overlapping intervals if necessary).',
    examples: [
      { input: 'intervals = [[1,3],[6,9]], newInterval = [2,5]', output: '[[1,5],[6,9]]' },
      { input: 'intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]', output: '[[1,2],[3,10],[12,16]]' }
    ],
    constraints: ['0 <= intervals.length <= 10^4', 'intervals[i].length == 2', 'intervals is sorted in ascending order by start'],
    starterCode: `def insert(intervals: list[list[int]], newInterval: list[int]) -> list[list[int]]:
    # Write your O(N) interval insertion:
    pass`,
    solutionCode: `def insert(intervals: list[list[int]], newInterval: list[int]) -> list[list[int]]:
    """
    Three-phase single pass: Left non-overlapping, Merging overlapping, Right non-overlapping
    Time Complexity: O(N)
    Space Complexity: O(N)
    """
    res = []
    i = 0
    n = len(intervals)
    
    # Phase 1: Add all intervals ending before newInterval starts
    while i < n and intervals[i][1] < newInterval[0]:
        res.append(intervals[i])
        i += 1
        
    # Phase 2: Merge all overlapping intervals
    while i < n and intervals[i][0] <= newInterval[1]:
        newInterval[0] = min(newInterval[0], intervals[i][0])
        newInterval[1] = max(newInterval[1], intervals[i][1])
        i += 1
    res.append(newInterval)
    
    # Phase 3: Add all remaining intervals starting after newInterval ends
    while i < n:
        res.append(intervals[i])
        i += 1
        
    return res`,
    optimalIntuition: 'Because intervals are already sorted, we split the process into 3 crisp steps: 1) add intervals before the overlap, 2) expand `newInterval` with all overlapping intervals, 3) add all remaining intervals after.',
    stepByStepLogic: [
      'Phase 1: While `intervals[i].end < newInterval.start`, append to `res`.',
      'Phase 2: While `intervals[i].start <= newInterval.end`, expand `newInterval` via `min` and `max`.',
      'Append expanded `newInterval` to `res`.',
      'Phase 3: Append remaining intervals to `res`.',
      'Return `res`.'
    ],
    complexity: {
      time: 'O(N)',
      space: 'O(N)',
      timeExplanation: 'Single linear pass.',
      spaceExplanation: 'Result array holding merged intervals.'
    },
    commonPitfalls: ['Sorting again after insertion is O(N log N); doing it in 3 phases is linear O(N).'],
    pythonicTips: ['Modifying `newInterval` in place while looping avoids helper objects.'],
    testCases: [
      { input: '[[1,3],[6,9]], [2,5]', expected: '[[1, 5], [6, 9]]' },
      { input: '[[1,2],[3,5],[6,7],[8,10],[12,16]], [4,8]', expected: '[[1, 2], [3, 10], [12, 16]]' }
    ],
    tags: ['Intervals', 'Array', 'Medium']
  },

  // DAY 60 - Intervals
  {
    id: 'non-overlapping-intervals',
    day: 60,
    isCore: false,
    title: 'Non-overlapping Intervals',
    category: 'Intervals & Bit Manipulation',
    difficulty: 'Medium',
    leetcodeNumber: 435,
    leetcodeUrl: 'https://leetcode.com/problems/non-overlapping-intervals/',
    companies: ['Amazon', 'Meta', 'Google', 'Microsoft'],
    description: 'Given an array of intervals `intervals` where `intervals[i] = [start_i, end_i]`, return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.',
    examples: [
      { input: 'intervals = [[1,2],[2,3],[3,4],[1,3]]', output: '1', explanation: '[1,3] can be removed and the rest of the intervals are non-overlapping.' },
      { input: 'intervals = [[1,2],[1,2],[1,2]]', output: '2' }
    ],
    constraints: ['1 <= intervals.length <= 10^5', 'intervals[i].length == 2', '-5 * 10^4 <= start_i < end_i <= 5 * 10^4'],
    starterCode: `def erase_overlap_intervals(intervals: list[list[int]]) -> int:
    # Write your greedy interval scheduling solution:
    pass`,
    solutionCode: `def erase_overlap_intervals(intervals: list[list[int]]) -> int:
    """
    Greedy Interval Scheduling (Keep interval with earlier end time)
    Time Complexity: O(N log N)
    Space Complexity: O(1)
    """
    intervals.sort(key=lambda x: x[0])
    
    count = 0
    prev_end = intervals[0][1]
    
    for start, end in intervals[1:]:
        if start < prev_end:
            # Overlap detected: greedily keep the interval with the smaller end time
            count += 1
            prev_end = min(prev_end, end)
        else:
            prev_end = end
            
    return count`,
    optimalIntuition: 'Classic interval scheduling: when two intervals overlap, we should always greedily remove the one that ends later (`min(prev_end, end)`), because an interval ending earlier leaves more room for future intervals!',
    stepByStepLogic: [
      'Sort intervals by start time `intervals.sort(key=lambda x: x[0])`.',
      'Track `prev_end = intervals[0][1]` and `count = 0`.',
      'For each subsequent interval:',
      '  If `start < prev_end`: increment `count`, set `prev_end = min(prev_end, end)`.',
      '  Else: update `prev_end = end`.',
      'Return `count`.'
    ],
    complexity: {
      time: 'O(N log N)',
      space: 'O(1)',
      timeExplanation: 'Sorting dominates the runtime.',
      spaceExplanation: 'In-place sort and pointers.'
    },
    commonPitfalls: ['Sorting by start time but forgetting to keep the smaller end time when overlap occurs.'],
    pythonicTips: ['Sorting in place with `intervals.sort()` saves memory.'],
    testCases: [
      { input: '[[1,2],[2,3],[3,4],[1,3]]', expected: '1' },
      { input: '[[1,2],[1,2],[1,2]]', expected: '2' }
    ],
    tags: ['Intervals', 'Greedy', 'Medium']
  },

  // DAY 61 - Bit Manipulation
  {
    id: 'counting-bits',
    day: 61,
    isCore: false,
    title: 'Counting Bits (Kernighan\'s & DP)',
    category: 'Intervals & Bit Manipulation',
    difficulty: 'Easy',
    leetcodeNumber: 338,
    leetcodeUrl: 'https://leetcode.com/problems/counting-bits/',
    companies: ['Amazon', 'Meta', 'Apple', 'Google'],
    description: 'Given an integer `n`, return an array `ans` of length `n + 1` such that for each `i` (`0 <= i <= n`), `ans[i]` is the number of `1`\'s in the binary representation of `i`. Can you solve it in linear time `O(N)` without using built-in popcount?',
    examples: [
      { input: 'n = 2', output: '[0,1,1]' },
      { input: 'n = 5', output: '[0,1,1,2,1,2]' }
    ],
    constraints: ['0 <= n <= 10^5'],
    starterCode: `def count_bits(n: int) -> list[int]:
    # Write your O(N) dynamic programming bit counting:
    pass`,
    solutionCode: `def count_bits(n: int) -> list[int]:
    """
    Bit-shift DP: ans[i] = ans[i >> 1] + (i & 1)
    Time Complexity: O(N)
    Space Complexity: O(N) for output
    """
    ans = [0] * (n + 1)
    
    for i in range(1, n + 1):
        # i >> 1 drops the lowest bit; (i & 1) checks if lowest bit was 1
        ans[i] = ans[i >> 1] + (i & 1)
        
    return ans`,
    optimalIntuition: 'Right-shifting `i >> 1` divides `i` by 2 and drops its last bit. The number of 1-bits in `i` is simply the number of 1-bits in `i >> 1` plus whether `i` is odd (`i & 1`)! This gives an instant O(1) step per integer.',
    stepByStepLogic: [
      'Initialize `ans = [0] * (n + 1)`.',
      'For `i` from 1 to `n`:',
      '  `ans[i] = ans[i >> 1] + (i & 1)`.',
      'Return `ans`.'
    ],
    complexity: {
      time: 'O(N)',
      space: 'O(N)',
      timeExplanation: 'Single O(1) bitwise step per number up to N.',
      spaceExplanation: 'Output array.'
    },
    commonPitfalls: ['Calling `bin(i).count("1")` in a loop costs O(N log N); DP bit-shift is true O(N).'],
    pythonicTips: ['Bit shifts `>> 1` and `& 1` are single CPU instructions.'],
    testCases: [
      { input: '2', expected: '[0, 1, 1]' },
      { input: '5', expected: '[0, 1, 1, 2, 1, 2]' }
    ],
    tags: ['Bit Manipulation', 'Dynamic Programming', 'Easy']
  },

  // DAY 62 - Bit Manipulation
  {
    id: 'number-of-1-bits',
    day: 62,
    isCore: false,
    title: 'Number of 1 Bits (Brian Kernighan\'s Algorithm)',
    category: 'Intervals & Bit Manipulation',
    difficulty: 'Easy',
    leetcodeNumber: 191,
    leetcodeUrl: 'https://leetcode.com/problems/number-of-1-bits/',
    companies: ['Amazon', 'Apple', 'Microsoft', 'Google'],
    description: 'Write a function that takes the binary representation of a positive integer and returns the number of set bits it has (also known as the Hamming weight).',
    examples: [
      { input: 'n = 11 (binary 00000000000000000000000000001011)', output: '3' },
      { input: 'n = 128 (binary 00000000000000000000000010000000)', output: '1' }
    ],
    constraints: ['1 <= n <= 2^31 - 1'],
    starterCode: `def hamming_weight(n: int) -> int:
    # Write your Brian Kernighan's algorithm:
    pass`,
    solutionCode: `def hamming_weight(n: int) -> int:
    """
    Brian Kernighan's Algorithm: n & (n - 1) clears the lowest set bit
    Time Complexity: O(Number of set bits) <= O(32)
    Space Complexity: O(1)
    """
    count = 0
    while n:
        n &= (n - 1)
        count += 1
    return count`,
    optimalIntuition: 'Subtracting 1 flips all bits up to the lowest set bit. Performing `n & (n - 1)` clears the lowest set bit in exactly one operation. Thus, the loop runs ONLY as many times as there are 1-bits!',
    stepByStepLogic: [
      'Initialize `count = 0`.',
      'While `n > 0`:',
      '  `n &= (n - 1)` (drop lowest set bit).',
      '  `count += 1`.',
      'Return `count`.'
    ],
    complexity: {
      time: 'O(k) where k <= 32 is number of 1-bits',
      space: 'O(1)',
      timeExplanation: 'Runs only for set bits.',
      spaceExplanation: 'O(1) memory.'
    },
    commonPitfalls: ['Shifting 32 times with `n >> 1` works but is slower than Kernighan\'s trick.'],
    pythonicTips: ['`n.bit_count()` is built-in in Python 3.10+.'],
    testCases: [
      { input: '11', expected: '3' },
      { input: '128', expected: '1' }
    ],
    tags: ['Bit Manipulation', 'Easy']
  },

  // DAY 63 - Bit Manipulation
  {
    id: 'reverse-bits',
    day: 63,
    isCore: false,
    title: 'Reverse Bits',
    category: 'Intervals & Bit Manipulation',
    difficulty: 'Easy',
    leetcodeNumber: 190,
    leetcodeUrl: 'https://leetcode.com/problems/reverse-bits/',
    companies: ['Apple', 'Amazon', 'Google', 'Microsoft'],
    description: 'Reverse bits of a given 32 bits unsigned integer.',
    examples: [
      { input: 'n = 00000010100101000001111010011100 (43261596)', output: '964176192 (00111001011110000010100101000000)' }
    ],
    constraints: ['The input must be a binary string of length 32'],
    starterCode: `def reverse_bits(n: int) -> int:
    # Write your 32-bit bit reversal:
    pass`,
    solutionCode: `def reverse_bits(n: int) -> int:
    """
    Bitwise shift and accumulate
    Time Complexity: O(32) = O(1)
    Space Complexity: O(1)
    """
    res = 0
    for _ in range(32):
        res = (res << 1) | (n & 1)
        n >>= 1
    return res`,
    optimalIntuition: 'Shift `res` left to make room, extract lowest bit of `n` with `n & 1`, append it to `res` via bitwise OR `|`, then shift `n` right.',
    stepByStepLogic: [
      'Initialize `res = 0`.',
      'Loop 32 times:',
      '  `res = (res << 1) | (n & 1)`.',
      '  `n >>= 1`.',
      'Return `res`.'
    ],
    complexity: {
      time: 'O(1)',
      space: 'O(1)',
      timeExplanation: 'Exactly 32 bitwise operations.',
      spaceExplanation: 'Constant space.'
    },
    commonPitfalls: ['Converting to string format without zero-padding to 32 bits causes wrong lengths.'],
    pythonicTips: ['Bitwise math `(res << 1) | (n & 1)` is instantaneous in Python.'],
    testCases: [
      { input: '43261596', expected: '964176192' }
    ],
    tags: ['Bit Manipulation', 'Easy']
  },

  // DAY 64 - Bit Manipulation / Math
  {
    id: 'missing-number',
    day: 64,
    isCore: false,
    title: 'Missing Number (Gauss / XOR)',
    category: 'Intervals & Bit Manipulation',
    difficulty: 'Easy',
    leetcodeNumber: 268,
    leetcodeUrl: 'https://leetcode.com/problems/missing-number/',
    companies: ['Amazon', 'Microsoft', 'Apple', 'Meta'],
    description: 'Given an array `nums` containing `n` distinct numbers in the range `[0, n]`, return the only number in the range that is missing from the array.',
    examples: [
      { input: 'nums = [3,0,1]', output: '2', explanation: 'n = 3 since there are 3 numbers, so all numbers are in the range [0,3]. 2 is the missing number.' },
      { input: 'nums = [0,1]', output: '2' },
      { input: 'nums = [9,6,4,2,3,5,7,0,1]', output: '8' }
    ],
    constraints: ['n == nums.length', '1 <= n <= 10^4', '0 <= nums[i] <= n', 'All numbers in nums are unique'],
    starterCode: `def missing_number(nums: list[int]) -> int:
    # Write your O(N) time O(1) space solution:
    pass`,
    solutionCode: `def missing_number(nums: list[int]) -> int:
    """
    Gauss Sum Formula: Total = n * (n + 1) // 2
    Time Complexity: O(N)
    Space Complexity: O(1)
    """
    n = len(nums)
    expected_sum = n * (n + 1) // 2
    actual_sum = sum(nums)
    return expected_sum - actual_sum`,
    optimalIntuition: 'The sum of numbers from `0` to `n` is `n * (n + 1) // 2`. Subtracting the actual sum of elements in `nums` immediately gives the missing number in O(N) time and O(1) space!',
    stepByStepLogic: [
      'Calculate `expected_sum = len(nums) * (len(nums) + 1) // 2`.',
      'Calculate `actual_sum = sum(nums)`.',
      'Return `expected_sum - actual_sum`.'
    ],
    complexity: {
      time: 'O(N)',
      space: 'O(1)',
      timeExplanation: 'Single sum pass.',
      spaceExplanation: 'Constant arithmetic variables.'
    },
    commonPitfalls: ['Sorting first takes O(N log N) which is suboptimal.'],
    pythonicTips: ['`n * (n + 1) // 2 - sum(nums)` solves the problem in a clean one-liner.'],
    testCases: [
      { input: '[3, 0, 1]', expected: '2' },
      { input: '[9,6,4,2,3,5,7,0,1]', expected: '8' }
    ],
    tags: ['Bit Manipulation', 'Math', 'Easy']
  },

  // DAY 65 - Matrix / Arrays
  {
    id: 'rotate-image',
    day: 65,
    isCore: false,
    title: 'Rotate Image (In-Place 90° Clockwise)',
    category: 'Arrays & Hashing',
    difficulty: 'Medium',
    leetcodeNumber: 48,
    leetcodeUrl: 'https://leetcode.com/problems/rotate-image/',
    companies: ['Amazon', 'Microsoft', 'Apple', 'Meta', 'Google'],
    description: 'You are given an `n x n` 2D matrix representing an image, rotate the image by 90 degrees (clockwise) in-place without allocating another 2D matrix.',
    examples: [
      { input: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]', output: '[[7,4,1],[8,5,2],[9,6,3]]' },
      { input: 'matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]', output: '[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]' }
    ],
    constraints: ['n == matrix.length == matrix[i].length', '1 <= n <= 20', '-1000 <= matrix[i][j] <= 1000'],
    starterCode: `def rotate(matrix: list[list[int]]) -> None:
    """
    Do not return anything, modify matrix in-place instead.
    """
    pass`,
    solutionCode: `def rotate(matrix: list[list[int]]) -> None:
    """
    Transpose Matrix + Reverse each row
    Time Complexity: O(N^2)
    Space Complexity: O(1) in-place
    """
    n = len(matrix)
    
    # Step 1: Transpose matrix (swap matrix[i][j] with matrix[j][i])
    for i in range(n):
        for j in range(i + 1, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
            
    # Step 2: Reverse each row
    for i in range(n):
        matrix[i].reverse()`,
    optimalIntuition: 'Rotating 90 degrees clockwise is mathematically equivalent to: 1) Transposing the matrix (swapping rows and columns along the main diagonal), then 2) Reversing each row horizontally!',
    stepByStepLogic: [
      'Transpose: loop `i` from 0 to `n-1`, `j` from `i+1` to `n-1`, swap `matrix[i][j]` and `matrix[j][i]`.',
      'Reverse each row: for each row `matrix[i]`, call `.reverse()`.',
      'Matrix is rotated 90 degrees clockwise in-place.'
    ],
    complexity: {
      time: 'O(N^2)',
      space: 'O(1)',
      timeExplanation: 'Visits each cell in the N x N grid once during transpose and once during row reversal.',
      spaceExplanation: 'Completely in-place modifications.'
    },
    commonPitfalls: ['Transposing from `j = 0` instead of `j = i + 1`, which double-swaps elements back to their original positions.'],
    pythonicTips: ['`matrix[i].reverse()` reverses list in C-speed.'],
    testCases: [
      { input: '[[1,2,3],[4,5,6],[7,8,9]]', expected: '[[7, 4, 1], [8, 5, 2], [9, 6, 3]]' }
    ],
    tags: ['Matrix', 'Array', 'In-Place', 'Medium']
  },

  // DAY 66 - Matrix / Arrays
  {
    id: 'set-matrix-zeroes',
    day: 66,
    isCore: false,
    title: 'Set Matrix Zeroes',
    category: 'Arrays & Hashing',
    difficulty: 'Medium',
    leetcodeNumber: 73,
    leetcodeUrl: 'https://leetcode.com/problems/set-matrix-zeroes/',
    companies: ['Amazon', 'Microsoft', 'Meta', 'Apple'],
    description: 'Given an `m x n` integer matrix `matrix`, if an element is 0, set its entire row and column to 0\'s. You must do it in place with `O(1)` extra space.',
    examples: [
      { input: 'matrix = [[1,1,1],[1,0,1],[1,1,1]]', output: '[[1,0,1],[0,0,0],[1,0,1]]' },
      { input: 'matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]', output: '[[0,0,0,0],[0,4,5,0],[0,3,1,0]]' }
    ],
    constraints: ['m == matrix.length', 'n == matrix[0].length', '1 <= m, n <= 200', '-2^31 <= matrix[i][j] <= 2^31 - 1'],
    starterCode: `def set_zeroes(matrix: list[list[int]]) -> None:
    # Do not return anything, modify matrix in-place in O(1) space.
    pass`,
    solutionCode: `def set_zeroes(matrix: list[list[int]]) -> None:
    """
    Use first row and first column as O(1) markers
    Time Complexity: O(M * N)
    Space Complexity: O(1)
    """
    ROWS, COLS = len(matrix), len(matrix[0])
    first_row_zero = False
    first_col_zero = False
    
    # Check if first column needs zeroing
    for r in range(ROWS):
        if matrix[r][0] == 0:
            first_col_zero = True
            break
            
    # Check if first row needs zeroing
    for c in range(COLS):
        if matrix[0][c] == 0:
            first_row_zero = True
            break
            
    # Use first row and column as flags for remaining inner grid
    for r in range(1, ROWS):
        for c in range(1, COLS):
            if matrix[r][c] == 0:
                matrix[r][0] = 0
                matrix[0][c] = 0
                
    # Zero out inner cells based on markers
    for r in range(1, ROWS):
        for c in range(1, COLS):
            if matrix[r][0] == 0 or matrix[0][c] == 0:
                matrix[r][c] = 0
                
    # Finally zero first row / col if flagged
    if first_col_zero:
        for r in range(ROWS):
            matrix[r][0] = 0
    if first_row_zero:
        for c in range(COLS):
            matrix[0][c] = 0`,
    optimalIntuition: 'Instead of creating separate marker arrays, reuse `matrix[r][0]` and `matrix[0][c]` (the first row and column) as our flags! We only need two boolean variables `first_row_zero` and `first_col_zero` for O(1) space.',
    stepByStepLogic: [
      'Check if first row or first col contains 0 initially.',
      'Scan inner grid `(1..ROWS, 1..COLS)`; if `matrix[r][c] == 0`, mark `matrix[r][0] = 0` and `matrix[0][c] = 0`.',
      'Iterate through inner grid again, setting `matrix[r][c] = 0` if marked.',
      'Zero first row and col if flags were True.'
    ],
    complexity: {
      time: 'O(M * N)',
      space: 'O(1)',
      timeExplanation: 'Linear scans through grid.',
      spaceExplanation: 'Only two booleans used.'
    },
    commonPitfalls: ['Zeroing the first row/column before scanning the rest of the matrix, which causes everything to turn to zeros.'],
    pythonicTips: ['Separating the inner grid scan `range(1, ROWS)` from edge row handling ensures crisp separation of concerns.'],
    testCases: [
      { input: '[[1,1,1],[1,0,1],[1,1,1]]', expected: '[[1, 0, 1], [0, 0, 0], [1, 0, 1]]' }
    ],
    tags: ['Matrix', 'Array', 'In-Place', 'Medium']
  },

  // DAY 67 - Matrix / Arrays
  {
    id: 'spiral-matrix',
    day: 67,
    isCore: false,
    title: 'Spiral Matrix',
    category: 'Arrays & Hashing',
    difficulty: 'Medium',
    leetcodeNumber: 54,
    leetcodeUrl: 'https://leetcode.com/problems/spiral-matrix/',
    companies: ['Microsoft', 'Amazon', 'Apple', 'Meta', 'Google'],
    description: 'Given an `m x n` matrix, return all elements of the matrix in spiral order.',
    examples: [
      { input: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]', output: '[1,2,3,6,9,8,7,4,5]' },
      { input: 'matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]', output: '[1,2,3,4,8,12,11,10,9,5,6,7]' }
    ],
    constraints: ['m == matrix.length', 'n == matrix[i].length', '1 <= m, n <= 10', '-100 <= matrix[i][j] <= 100'],
    starterCode: `def spiral_order(matrix: list[list[int]]) -> list[int]:
    # Write your boundary simulation solution:
    pass`,
    solutionCode: `def spiral_order(matrix: list[list[int]]) -> list[int]:
    """
    4 Boundary Pointers (top, bottom, left, right)
    Time Complexity: O(M * N)
    Space Complexity: O(1) auxiliary
    """
    res = []
    top, bottom = 0, len(matrix) - 1
    left, right = 0, len(matrix[0]) - 1
    
    while left <= right and top <= bottom:
        # Move Right across top boundary
        for c in range(left, right + 1):
            res.append(matrix[top][c])
        top += 1
        
        # Move Down across right boundary
        for r in range(top, bottom + 1):
            res.append(matrix[r][right])
        right -= 1
        
        if top <= bottom:
            # Move Left across bottom boundary
            for c in range(right, left - 1, -1):
                res.append(matrix[bottom][c])
            bottom -= 1
            
        if left <= right:
            # Move Up across left boundary
            for r in range(bottom, top - 1, -1):
                res.append(matrix[r][left])
            left += 1
            
    return res`,
    optimalIntuition: 'Maintain four boundaries: `top`, `bottom`, `left`, `right`. Traverse right across `top`, down along `right`, left across `bottom`, and up along `left`, contracting the boundaries on each pass until they cross!',
    stepByStepLogic: [
      'Initialize `top = 0, bottom = rows - 1, left = 0, right = cols - 1`.',
      'While `left <= right` and `top <= bottom`:',
      '  Traverse left to right on `top`, increment `top`.',
      '  Traverse top to bottom on `right`, decrement `right`.',
      '  If `top <= bottom`: traverse right to left on `bottom`, decrement `bottom`.',
      '  If `left <= right`: traverse bottom to top on `left`, increment `left`.',
      'Return `res`.'
    ],
    complexity: {
      time: 'O(M * N)',
      space: 'O(1)',
      timeExplanation: 'Visits every matrix cell once.',
      spaceExplanation: 'Boundary pointers.'
    },
    commonPitfalls: ['Forgetting the `if top <= bottom:` and `if left <= right:` checks before bottom and left sweeps in non-square matrices.'],
    pythonicTips: ['Checking boundaries explicitly avoids double-processing middle rows/cols.'],
    testCases: [
      { input: '[[1,2,3],[4,5,6],[7,8,9]]', expected: '[1, 2, 3, 6, 9, 8, 7, 4, 5]' }
    ],
    tags: ['Matrix', 'Array', 'Simulation', 'Medium']
  },

  // DAY 68 - Heap
  {
    id: 'find-median-from-data-stream',
    day: 68,
    isCore: false,
    title: 'Find Median from Data Stream (Two Heaps)',
    category: 'Heap / Priority Queue',
    difficulty: 'Hard',
    leetcodeNumber: 295,
    leetcodeUrl: 'https://leetcode.com/problems/find-median-from-data-stream/',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Apple'],
    description: 'The median is the middle value in an ordered integer list. Implement the `MedianFinder` class with `addNum(num)` and `findMedian()`.',
    examples: [
      { input: 'addNum(1), addNum(2), findMedian() -> 1.5, addNum(3), findMedian() -> 2.0', output: '[1.5, 2.0]' }
    ],
    constraints: ['-10^5 <= num <= 10^5', 'There will be at least one element in the data structure before calling findMedian', 'At most 5 * 10^4 calls total'],
    starterCode: `class MedianFinder:
    def __init__(self):
        pass

    def addNum(self, num: int) -> None:
        pass

    def findMedian(self) -> float:
        pass`,
    solutionCode: `import heapq

class MedianFinder:
    """
    Two Heaps Pattern:
    - small: Max-Heap (stores smaller half, negated values)
    - large: Min-Heap (stores larger half)
    Time Complexity: O(log N) for addNum, O(1) for findMedian
    Space Complexity: O(N)
    """
    def __init__(self):
        self.small = []  # max-heap (invert signs)
        self.large = []  # min-heap

    def addNum(self, num: int) -> None:
        # Push to small (max-heap) first
        heapq.heappush(self.small, -num)
        
        # Ensure every element in small <= every element in large
        if self.small and self.large and (-self.small[0] > self.large[0]):
            val = -heapq.heappop(self.small)
            heapq.heappush(self.large, val)
            
        # Balance sizes (small can have at most 1 more element than large)
        if len(self.small) > len(self.large) + 1:
            val = -heapq.heappop(self.small)
            heapq.heappush(self.large, val)
        elif len(self.large) > len(self.small):
            val = heapq.heappop(self.large)
            heapq.heappush(self.small, -val)

    def findMedian(self) -> float:
        if len(self.small) > len(self.large):
            return float(-self.small[0])
        return (-self.small[0] + self.large[0]) / 2.0`,
    optimalIntuition: 'Split the data into two halves: a Max-Heap for the smaller half and a Min-Heap for the larger half. The median is either the top of the larger heap, or the average of both tops!',
    stepByStepLogic: [
      'Initialize `small` (max-heap via negation) and `large` (min-heap).',
      'In `addNum(num)`: push to `small`. If `max(small) > min(large)`, balance tops. Keep size difference <= 1.',
      'In `findMedian()`: if odd size, return top of `small`. If even, return `(-small[0] + large[0]) / 2`.',
    ],
    complexity: {
      time: 'addNum: O(log N), findMedian: O(1)',
      space: 'O(N)',
      timeExplanation: 'Heap insertion takes log N.',
      spaceExplanation: 'Stores N stream elements.'
    },
    commonPitfalls: ['Python standard library `heapq` is a min-heap only; negate values `-num` to simulate a max-heap.'],
    pythonicTips: ['Negating numbers `heapq.heappush(self.small, -num)` provides a fast C-level max-heap.'],
    testCases: [
      { input: 'addNum(1), addNum(2), findMedian()', expected: '1.5' },
      { input: 'addNum(3), findMedian()', expected: '2.0' }
    ],
    tags: ['Heap', 'Design', 'Data Stream', 'Hard']
  },

  // DAY 69 - Graphs
  {
    id: 'pacific-atlantic-water-flow',
    day: 69,
    isCore: false,
    title: 'Pacific Atlantic Water Flow',
    category: 'Graphs',
    difficulty: 'Medium',
    leetcodeNumber: 417,
    leetcodeUrl: 'https://leetcode.com/problems/pacific-atlantic-water-flow/',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Bloomberg'],
    description: 'There is an `m x n` rectangular island that borders both the **Pacific Ocean** and **Atlantic Ocean**. The Pacific Ocean touches the island\'s top and left edges, and the Atlantic Ocean touches the island\'s right and bottom edges.\n\nThe island is partitioned into a grid of square cells. You are given an `m x n` integer matrix `heights` where `heights[r][c]` represents the height above sea level of the cell at coordinate `(r, c)`.\n\nThe island receives a lot of rain, and the rain water can flow to neighboring cells directly north, south, east, and west if the neighboring cell\'s height is **less than or equal to** the current cell\'s height. Water can flow from any cell adjacent to an ocean into the ocean.\n\nReturn a 2D list of grid coordinates `result` where `result[i] = [r_i, c_i]` denotes that rain water can flow from cell `(r_i, c_i)` to **both** the Pacific and Atlantic oceans.',
    examples: [
      { input: 'heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]', output: '[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]' },
      { input: 'heights = [[1]]', output: '[[0,0]]' }
    ],
    constraints: ['m == heights.length', 'n == heights[r].length', '1 <= m, n <= 200', '0 <= heights[r][c] <= 10^5'],
    starterCode: `def pacific_atlantic(heights: list[list[int]]) -> list[list[int]]:
    """
    Find all cells that can flow to both Pacific and Atlantic oceans.
    """
    # Write your multi-source BFS/DFS solution here:
    pass`,
    solutionCode: `def pacific_atlantic(heights: list[list[int]]) -> list[list[int]]:
    """
    Reverse DFS flowing uphill from ocean borders
    Time Complexity: O(M * N)
    Space Complexity: O(M * N)
    """
    if not heights or not heights[0]:
        return []
        
    ROWS, COLS = len(heights), len(heights[0])
    pac = set()
    atl = set()
    
    def dfs(r: int, c: int, visit: set, prev_height: int) -> None:
        if (
            (r, c) in visit 
            or r < 0 or c < 0 
            or r == ROWS or c == COLS 
            or heights[r][c] < prev_height
        ):
            return
            
        visit.add((r, c))
        dfs(r + 1, c, visit, heights[r][c])
        dfs(r - 1, c, visit, heights[r][c])
        dfs(r, c + 1, visit, heights[r][c])
        dfs(r, c - 1, visit, heights[r][c])
        
    for c in range(COLS):
        dfs(0, c, pac, heights[0][c])
        dfs(ROWS - 1, c, atl, heights[ROWS - 1][c])
        
    for r in range(ROWS):
        dfs(r, 0, pac, heights[r][0])
        dfs(r, COLS - 1, atl, heights[r][COLS - 1])
        
    return [[r, c] for (r, c) in (pac & atl)]`,
    optimalIntuition: 'Instead of starting from every interior cell and seeing if water can reach both oceans (which causes redundant repeated searches), we reverse the flow! Start from the Pacific and Atlantic borders and flow "uphill" (`heights[nr][nc] >= heights[r][c]`). The intersection of both visited sets (`pac & atl`) gives all valid cells in O(M * N) time!',
    stepByStepLogic: [
      'Create two sets `pac` and `atl` for cells reachable from the Pacific and Atlantic respectively.',
      'Run DFS from all Pacific border cells (top row and left column), moving to adjacent cells with height >= current cell.',
      'Run DFS from all Atlantic border cells (bottom row and right column), moving uphill.',
      'Compute the intersection `pac & atl` and return coordinates as a list of `[r, c]` pairs.'
    ],
    complexity: {
      time: 'O(M * N)',
      space: 'O(M * N)',
      timeExplanation: 'Each cell is visited at most twice (once for Pacific DFS and once for Atlantic DFS).',
      spaceExplanation: 'Visited sets pac and atl store at most M * N coordinates.'
    },
    commonPitfalls: ['Simulating flow downhill from every single cell causes O((M*N)^2) runtime.'],
    pythonicTips: ['Using set intersection `pac & atl` cleanly extracts common cells in O(K) time.'],
    testCases: [
      { input: '[[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]', expected: '[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]' },
      { input: '[[1]]', expected: '[[0,0]]' }
    ],
    tags: ['Graphs', 'DFS', 'BFS', 'Matrix', 'Blind 75', 'Medium']
  },

  // DAY 70 - Intervals
  {
    id: 'meeting-rooms',
    day: 70,
    isCore: false,
    title: 'Meeting Rooms',
    category: 'Intervals & Bit Manipulation',
    difficulty: 'Easy',
    leetcodeNumber: 252,
    leetcodeUrl: 'https://leetcode.com/problems/meeting-rooms/',
    companies: ['Amazon', 'Meta', 'Google', 'Microsoft'],
    description: 'Given an array of meeting time intervals where `intervals[i] = [start_i, end_i]`, determine if a person could attend all meetings.',
    examples: [
      { input: 'intervals = [[0,30],[5,10],[15,20]]', output: 'false' },
      { input: 'intervals = [[7,10],[2,4]]', output: 'true' }
    ],
    constraints: ['0 <= intervals.length <= 10^4', 'intervals[i].length == 2', '0 <= start_i < end_i <= 10^6'],
    starterCode: `def can_attend_meetings(intervals: list[list[int]]) -> bool:
    # Write your interval sorting solution:
    pass`,
    solutionCode: `def can_attend_meetings(intervals: list[list[int]]) -> bool:
    """
    Sort by start time and check adjacent interval overlap
    Time Complexity: O(N log N)
    Space Complexity: O(1)
    """
    intervals.sort(key=lambda x: x[0])
    
    for i in range(1, len(intervals)):
        # If current meeting starts before previous meeting ends, conflict!
        if intervals[i][0] < intervals[i - 1][1]:
            return False
            
    return True`,
    optimalIntuition: 'Sort meetings chronologically by start time. If any meeting begins before the previous meeting concludes (`intervals[i][0] < intervals[i-1][1]`), attendance is impossible.',
    stepByStepLogic: [
      'Sort `intervals` by `start` time.',
      'Iterate `i` from 1 to `len(intervals) - 1`.',
      'If `intervals[i][0] < intervals[i-1][1]`, return `False`.',
      'Return `True`.'
    ],
    complexity: {
      time: 'O(N log N)',
      space: 'O(1)',
      timeExplanation: 'Sorting dominates linear scan.',
      spaceExplanation: 'In-place sort.'
    },
    commonPitfalls: ['Checking `<=`: if one meeting ends at 10 and next starts at 10, that is valid (no conflict). Use `<`.'],
    pythonicTips: ['`intervals.sort(key=lambda x: x[0])` sorts in place with Timsort.'],
    testCases: [
      { input: '[[0,30],[5,10],[15,20]]', expected: 'False' },
      { input: '[[7,10],[2,4]]', expected: 'True' }
    ],
    tags: ['Intervals', 'Sorting', 'Easy']
  },

  // DAY 71 - Intervals
  {
    id: 'meeting-rooms-ii',
    day: 71,
    isCore: false,
    title: 'Meeting Rooms II (Min Conference Rooms / Min-Heap)',
    category: 'Intervals & Bit Manipulation',
    difficulty: 'Medium',
    leetcodeNumber: 253,
    leetcodeUrl: 'https://leetcode.com/problems/meeting-rooms-ii/',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Bloomberg'],
    description: 'Given an array of meeting time intervals where `intervals[i] = [start_i, end_i]`, return the minimum number of conference rooms required.',
    examples: [
      { input: 'intervals = [[0,30],[5,10],[15,20]]', output: '2' },
      { input: 'intervals = [[7,10],[2,4]]', output: '1' }
    ],
    constraints: ['1 <= intervals.length <= 10^4', '0 <= start_i < end_i <= 10^6'],
    starterCode: `def min_meeting_rooms(intervals: list[list[int]]) -> int:
    # Write your Min-Heap or Two-Pointer sweep solution:
    pass`,
    solutionCode: `import heapq

def min_meeting_rooms(intervals: list[list[int]]) -> int:
    """
    Min-Heap tracking ongoing meeting end times
    Time Complexity: O(N log N)
    Space Complexity: O(N)
    """
    if not intervals:
        return 0
        
    intervals.sort(key=lambda x: x[0])
    rooms = []  # stores end times of active meetings
    
    for start, end in intervals:
        # If the earliest ending meeting finishes before current starts, reuse room
        if rooms and rooms[0] <= start:
            heapq.heappop(rooms)
            
        heapq.heappush(rooms, end)
        
    return len(rooms)`,
    optimalIntuition: 'Store the end times of active meetings in a Min-Heap. For each new meeting, if `rooms[0] <= start`, a room has freed up and can be reused (`heappop`). Otherwise, a new room must be allocated (`heappush`). At the end, the heap size is the peak simultaneous rooms required!',
    stepByStepLogic: [
      'Sort intervals by start time.',
      'Initialize `rooms = []` (min-heap).',
      'For each `(start, end)`: if `rooms[0] <= start`, pop earliest finished room.',
      'Push current `end` time into heap.',
      'Return `len(rooms)`.'
    ],
    complexity: {
      time: 'O(N log N)',
      space: 'O(N)',
      timeExplanation: 'Sorting N elements + N heap operations.',
      spaceExplanation: 'Heap stores at most N end times.'
    },
    commonPitfalls: ['Sorting end times without maintaining heap priority order for early releases.'],
    pythonicTips: ['`heapq.heappush` and `heapq.heappop` manage room schedules efficiently.'],
    testCases: [
      { input: '[[0,30],[5,10],[15,20]]', expected: '2' },
      { input: '[[7,10],[2,4]]', expected: '1' }
    ],
    tags: ['Intervals', 'Heap', 'Greedy', 'Medium']
  },

  // DAY 72 - Strings
  {
    id: 'encode-and-decode-strings',
    day: 72,
    isCore: false,
    title: 'Encode and Decode Strings (Length Prefixing)',
    category: 'Arrays & Hashing',
    difficulty: 'Medium',
    leetcodeNumber: 271,
    leetcodeUrl: 'https://leetcode.com/problems/encode-and-decode-strings/',
    companies: ['Google', 'Meta', 'Amazon', 'Twitter'],
    description: 'Design an algorithm to encode a list of strings to a single string, and decode that string back to the original list of strings. The string can contain any of the 256 valid ASCII characters.',
    examples: [
      { input: 'strs = ["lint","code","love","you"]', output: '["lint","code","love","you"]' },
      { input: 'strs = ["we", "say", ":", "yes"]', output: '["we", "say", ":", "yes"]' }
    ],
    constraints: ['0 <= strs.length <= 200', '0 <= strs[i].length <= 200', 'strs[i] contains any ASCII characters'],
    starterCode: `class Codec:
    def encode(self, strs: list[str]) -> str:
        pass

    def decode(self, s: str) -> list[str]:
        pass`,
    solutionCode: `class Codec:
    """
    Length-Prefix Encoding Pattern: '<len>#<content>'
    Handles delimiters, empty strings, and special symbols flawlessly
    Time Complexity: O(N) for both encode and decode
    Space Complexity: O(N)
    """
    def encode(self, strs: list[str]) -> str:
        res = []
        for s in strs:
            res.append(f"{len(s)}#{s}")
        return "".join(res)

    def decode(self, s: str) -> list[str]:
        res = []
        i = 0
        while i < len(s):
            j = i
            while s[j] != "#":
                j += 1
            length = int(s[i:j])
            content = s[j + 1 : j + 1 + length]
            res.append(content)
            i = j + 1 + length
        return res`,
    optimalIntuition: 'Delimiters like commas `,` or `#` can appear inside user strings. By prefixing each string with its exact integer character length followed by `#` (`4#lint4#code`), the decoder knows precisely how many characters to slice without getting confused by internal symbols!',
    stepByStepLogic: [
      'Encode: for each string `s`, format as `f"{len(s)}#{s}"` and join together.',
      'Decode: find next `#`, parse length `L = int(s[i:j])`, slice `s[j+1 : j+1+L]`, advance pointer `i` past string.',
      'Return list of decoded strings.'
    ],
    complexity: {
      time: 'O(N)',
      space: 'O(N)',
      timeExplanation: 'Linear scan over all characters.',
      spaceExplanation: 'Encoded/decoded string arrays.'
    },
    commonPitfalls: ['Using a single delimiter (e.g. `s.split(",")`) which corrupts if user strings contain commas.'],
    pythonicTips: ['`"".join(res)` avoids quadratic string concatenation in Python.'],
    testCases: [
      { input: '["lint", "code", "love", "you"]', expected: '["lint", "code", "love", "you"]' },
      { input: '["we", "say", ":", "yes"]', expected: '["we", "say", ":", "yes"]' }
    ],
    tags: ['String', 'Design', 'Medium']
  },

  // DAY 73 - Bit Manipulation
  {
    id: 'sum-of-two-integers',
    day: 73,
    isCore: false,
    title: 'Sum of Two Integers (Bitwise Adder)',
    category: 'Intervals & Bit Manipulation',
    difficulty: 'Medium',
    leetcodeNumber: 371,
    leetcodeUrl: 'https://leetcode.com/problems/sum-of-two-integers/',
    companies: ['Facebook', 'Amazon', 'Google', 'Apple'],
    description: 'Given two integers `a` and `b`, return the sum of the two integers without using the operators `+` and `-`.',
    examples: [
      { input: 'a = 1, b = 2', output: '3' },
      { input: 'a = 2, b = 3', output: '5' }
    ],
    constraints: ['-1000 <= a, b <= 1000'],
    starterCode: `def get_sum(a: int, b: int) -> int:
    # Write your bitwise adder without + or -:
    pass`,
    solutionCode: `def get_sum(a: int, b: int) -> int:
    """
    Bitwise Half Adder with 32-bit integer masking for Python
    Sum without carry: a ^ b
    Carry: (a & b) << 1
    Time Complexity: O(1) bounded by 32 bits
    Space Complexity: O(1)
    """
    MASK = 0xFFFFFFFF
    MAX_INT = 0x7FFFFFFF
    
    while b & MASK != 0:
        carry = (a & b) << 1
        a = (a ^ b) & MASK
        b = carry & MASK
        
    return a if a <= MAX_INT else ~(a ^ MASK)`,
    optimalIntuition: 'XOR `a ^ b` computes addition without carry. AND shifted left `(a & b) << 1` computes carry bits. In Python (which has arbitrary precision integers), we apply a 32-bit mask `0xFFFFFFFF` to simulate 32-bit integer overflow and negative representation.',
    stepByStepLogic: [
      'Mask `0xFFFFFFFF` to clamp calculations to 32-bit integers.',
      'While `b & MASK != 0`:',
      '  `carry = (a & b) << 1`.',
      '  `a = (a ^ b) & MASK`.',
      '  `b = carry & MASK`.',
      'Handle negative 32-bit two\'s complement sign bit: return `a if a <= MAX_INT else ~(a ^ MASK)`.'
    ],
    complexity: {
      time: 'O(1)',
      space: 'O(1)',
      timeExplanation: 'Loop runs at most 32 times.',
      spaceExplanation: 'Constant space.'
    },
    commonPitfalls: ['In Python, integers do not overflow to 32 bits, causing infinite loops with negative numbers without 32-bit bitmasks (`0xFFFFFFFF`).'],
    pythonicTips: ['`0xFFFFFFFF` mask simulates C-style 32-bit uint behavior in Python.'],
    testCases: [
      { input: '1, 2', expected: '3' },
      { input: '2, 3', expected: '5' },
      { input: '-1, 1', expected: '0' }
    ],
    tags: ['Bit Manipulation', 'Medium']
  },

  // DAY 74 - Graphs
  {
    id: 'alien-dictionary',
    day: 74,
    isCore: false,
    title: 'Alien Dictionary (Topological Sort / DAG)',
    category: 'Advanced Graphs',
    difficulty: 'Hard',
    leetcodeNumber: 269,
    leetcodeUrl: 'https://leetcode.com/problems/alien-dictionary/',
    companies: ['Meta', 'Amazon', 'Google', 'Airbnb', 'Pinterest'],
    description: 'There is a new alien language that uses the English alphabet. You are given a list of words `words` sorted lexicographically by the rules of this new language. Return a string of the unique letters in the new alien language sorted in lexicographically increasing order. If the order is invalid, return `""`.',
    examples: [
      { input: 'words = ["wrt","wrf","er","ett","rftt"]', output: '"wertf"' },
      { input: 'words = ["z","x"]', output: '"zx"' },
      { input: 'words = ["z","x","z"]', output: '""', explanation: 'The order is invalid because z cannot come before and after x.' }
    ],
    constraints: ['1 <= words.length <= 100', '1 <= words[i].length <= 100', 'words[i] consists of only lowercase English letters'],
    starterCode: `def alien_order(words: list[str]) -> str:
    # Write your Topological Sort / Graph cycle check:
    pass`,
    solutionCode: `from collections import defaultdict, deque

def alien_order(words: list[str]) -> str:
    """
    Build directed graph of character precedence + Kahn's Topological Sort
    Time Complexity: O(Total characters in all words)
    Space Complexity: O(V + E) where V <= 26
    """
    adj = {c: set() for w in words for c in w}
    in_degree = {c: 0 for c in adj}
    
    for i in range(len(words) - 1):
        w1, w2 = words[i], words[i + 1]
        min_len = min(len(w1), len(w2))
        
        # Prefix rule violation: if w2 is prefix of w1 but shorter (e.g. "abc", "ab"), invalid!
        if len(w1) > len(w2) and w1[:min_len] == w2[:min_len]:
            return ""
            
        for j in range(min_len):
            if w1[j] != w2[j]:
                if w2[j] not in adj[w1[j]]:
                    adj[w1[j]].add(w2[j])
                    in_degree[w2[j]] += 1
                break
                
    queue = deque([c for c in in_degree if in_degree[c] == 0])
    res = []
    
    while queue:
        c = queue.popleft()
        res.append(c)
        for neighbor in adj[c]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
                
    return "".join(res) if len(res) == len(in_degree) else ""`,
    optimalIntuition: 'Compare adjacent words: the first mismatched letter `w1[j] != w2[j]` proves a directed edge `w1[j] -> w2[j]`. We then run Topological Sort to find a valid linear ordering or detect cycles!',
    stepByStepLogic: [
      'Initialize graph `adj` and `in_degree` for all unique characters.',
      'Compare pairs `(words[i], words[i+1])`. Check prefix violation (`len(w1) > len(w2)`).',
      'Find first differing character, create edge `w1[j] -> w2[j]`, update in-degree.',
      'Run Kahn\'s BFS topological sort starting from 0 in-degree letters.',
      'Return `"".join(res)` if DAG resolved completely, else `""`.'
    ],
    complexity: {
      time: 'O(C) where C is total characters',
      space: 'O(1) alphabet size <= 26',
      timeExplanation: 'Visits characters in words once.',
      spaceExplanation: 'Adjacency graph bounded by 26 English letters.'
    },
    commonPitfalls: ['Failing to detect invalid prefixes like `["abc", "ab"]` where a longer word appears before its prefix.'],
    pythonicTips: ['`adj = {c: set() for w in words for c in w}` initializes all unique characters in one line.'],
    testCases: [
      { input: '["wrt","wrf","er","ett","rftt"]', expected: '"wertf"' },
      { input: '["z","x","z"]', expected: '""' }
    ],
    tags: ['Graphs', 'Topological Sort', 'BFS', 'Hard']
  },

  // DAY 75 - Backtracking & Tries
  {
    id: 'word-search-ii',
    day: 75,
    isCore: false,
    title: 'Word Search II (Trie + 2D Matrix Backtracking)',
    category: 'Tries',
    difficulty: 'Hard',
    leetcodeNumber: 212,
    leetcodeUrl: 'https://leetcode.com/problems/word-search-ii/',
    companies: ['Amazon', 'Google', 'Microsoft', 'Meta', 'Uber', 'Apple'],
    description: 'Given an `m x n` `board` of characters and a list of strings `words`, return all words on the board. Each word must be constructed from sequentially adjacent cells.',
    examples: [
      { input: 'board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]', output: '["eat","oath"]' },
      { input: 'board = [["a","b"],["c","d"]], words = ["abcb"]', output: '[]' }
    ],
    constraints: ['m == board.length', 'n == board[i].length', '1 <= m, n <= 12', '1 <= words.length <= 3 * 10^4', '1 <= words[i].length <= 10'],
    starterCode: `def find_words(board: list[list[str]], words: list[str]) -> list[str]:
    # Write your Trie + Matrix DFS solution:
    pass`,
    solutionCode: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.word = None

def find_words(board: list[list[str]], words: list[str]) -> list[str]:
    """
    Trie + DFS Backtracking with Word Pruning
    Time Complexity: O(M * N * 4^L)
    Space Complexity: O(Total characters in words)
    """
    root = TrieNode()
    for w in words:
        curr = root
        for c in w:
            if c not in curr.children:
                curr.children[c] = TrieNode()
            curr = curr.children[c]
        curr.word = w  # store word at leaf node
        
    ROWS, COLS = len(board), len(board[0])
    res = []
    
    def dfs(r: int, c: int, parent_node: TrieNode):
        char = board[r][c]
        if char not in parent_node.children:
            return
            
        curr_node = parent_node.children[char]
        
        # Word found!
        if curr_node.word:
            res.append(curr_node.word)
            curr_node.word = None  # prevent duplicate additions
            
        board[r][c] = "#"  # mark visited
        
        for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            nr, nc = r + dr, c + dc
            if 0 <= nr < ROWS and 0 <= nc < COLS and board[nr][nc] != "#":
                dfs(nr, nc, curr_node)
                
        board[r][c] = char  # backtrack
        
        # Pruning optimization: remove leaf node if empty to speed up subsequent searches
        if not curr_node.children:
            parent_node.children.pop(char, None)
            
    for r in range(ROWS):
        for c in range(COLS):
            dfs(r, c, root)
            
    return res`,
    optimalIntuition: 'Searching each word individually runs Word Search 1 `len(words)` times (TLE). Instead, we insert all words into a single Trie and run DFS once across the matrix, pruning branches immediately whenever a prefix is not present in the Trie!',
    stepByStepLogic: [
      'Insert all `words` into a Trie, storing `node.word = w` at terminating leaves.',
      'Iterate over all cells in the board.',
      'In `dfs(r, c, node)`: if `board[r][c]` is in `node.children`, advance.',
      'If `curr_node.word` is found: add to `res` and set `curr_node.word = None`.',
      'Backtrack cell with `#`, explore 4 directions.',
      'Prune empty child branches: `if not curr_node.children: parent.children.pop(char)`.',
      'Return `res`.'
    ],
    complexity: {
      time: 'O(M * N * 4^L)',
      space: 'O(Total Chars)',
      timeExplanation: 'Grid traversal with fast Trie prefix pruning.',
      spaceExplanation: 'Trie stores all dictionary words.'
    },
    commonPitfalls: ['Not unsetting `curr_node.word = None` after match, which produces duplicate entries in the result.'],
    pythonicTips: ['Storing the full `word` at the Trie leaf node eliminates the need to track a running path string during recursion!'],
    testCases: [
      { input: 'board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]', expected: '["oath", "eat"]' }
    ],
    tags: ['Tries', 'Backtracking', 'Matrix', 'Hard']
  }
];
