export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type DSACategory =
  | 'Arrays & Hashing'
  | 'Two Pointers'
  | 'Sliding Window'
  | 'Stack'
  | 'Binary Search'
  | 'Linked List'
  | 'Trees'
  | 'Tries'
  | 'Heap / Priority Queue'
  | 'Backtracking'
  | 'Graphs'
  | 'Advanced Graphs'
  | '1-D Dynamic Programming'
  | '2-D Dynamic Programming'
  | 'Greedy'
  | 'Intervals & Bit Manipulation';

export interface TestCase {
  input: string;
  expected: string;
  explanation?: string;
}

export type CurriculumTrack = 'core30' | 'blind75';

export interface Problem {
  id: string;
  day: number;
  isCore?: boolean;
  title: string;
  category: DSACategory;
  difficulty: Difficulty;
  leetcodeNumber?: number;
  leetcodeUrl: string;
  companies: string[];
  description: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints: string[];
  starterCode: string;
  solutionCode: string;
  bruteForceCode?: string;
  optimalIntuition: string;
  stepByStepLogic: string[];
  complexity: {
    time: string;
    space: string;
    timeExplanation: string;
    spaceExplanation: string;
  };
  commonPitfalls: string[];
  pythonicTips: string[];
  visualizerType?: 'two-pointers' | 'sliding-window' | 'stack' | 'binary-search' | 'linked-list' | 'tree' | 'hash-map';
  testCases: TestCase[];
  tags: string[];
}

export interface UserProgress {
  solvedIds: string[];
  bookmarkedIds: string[];
  revisionIds: string[];
  notes: Record<string, string>;
  userCodes: Record<string, string>;
  streakCount: number;
  lastActiveDate: string;
  flashcardScores: Record<string, 'easy' | 'good' | 'hard'>;
  fontSize: 'small' | 'normal' | 'large' | 'xlarge';
  theme: 'dark' | 'light' | 'midnight';
}

export interface Flashcard {
  id: string;
  category: string;
  topic: string;
  difficulty: Difficulty;
  question: string;
  answer: string;
  codeSnippet?: string;
  keyTakeaway: string;
}

export interface CheatsheetItem {
  id: string;
  category: string;
  title: string;
  summary: string;
  timeComplexity: string;
  spaceComplexity: string;
  pythonSyntax: string;
  patternTemplate?: string;
  whenToUse: string[];
  goodFor?: string[];
  badFor?: string[];
  goodProblemExamples?: string[];
  badProblemExamples?: string[];
  pitfalls: string[];
}

export type ActiveTab = 'concept' | 'practice' | 'roadmap' | 'tricks';
