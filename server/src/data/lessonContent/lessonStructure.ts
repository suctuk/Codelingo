export interface Exercise {
  id: string;
  type: 'multipleChoice' | 'codeComplete' | 'codeWrite' | 'matchCode' | 'bugFix' | 'translation';
  prompt: string;
  timeLimit: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  sourceCode?: string;
  targetCode?: string;
  options?: string[];
  correctAnswer: string | string[];
  hints: string[];
  explanation: string;
  xpReward: number;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  exercises: Exercise[];
  practiceExercises: Exercise[];
  requiredXp: number;
}

export interface Unit {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  quiz: Exercise[];
  requiredXp: number;
}

export interface Section {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  units: Unit[];
  finalProject?: {
    description: string;
    requirements: string[];
    template: string;
    testCases: Array<{
      input: string;
      expectedOutput: string;
    }>;
  };
}

export const SECTION_TEMPLATES = {
  BASICS: {
    id: 'section_basics',
    title: 'Getting Started',
    description: 'Learn the fundamental concepts and syntax',
    difficulty: 'beginner',
    unitCount: 20,
    topics: [
      'Hello World',
      'Variables & Data Types',
      'Basic Operators',
      'Strings',
      'Numbers & Math',
      'Booleans & Logic',
      'Comments',
      'Input/Output',
      'Type Conversion',
      'Basic Collections'
    ]
  },
  CONTROL_FLOW: {
    id: 'section_control_flow',
    title: 'Control Flow',
    description: 'Master program flow and decision making',
    difficulty: 'beginner',
    unitCount: 25,
    topics: [
      'If Statements',
      'Else/Elif',
      'Switch/Match',
      'While Loops',
      'For Loops',
      'Break & Continue',
      'Error Handling',
      'Nested Conditions',
      'Loop Patterns',
      'Control Flow Projects'
    ]
  },
  FUNCTIONS: {
    id: 'section_functions',
    title: 'Functions & Methods',
    description: 'Learn to organize code into reusable blocks',
    difficulty: 'intermediate',
    unitCount: 30,
    topics: [
      'Function Basics',
      'Parameters',
      'Return Values',
      'Default Arguments',
      'Named Arguments',
      'Variable Scope',
      'Lambda/Arrow Functions',
      'Higher Order Functions',
      'Recursion',
      'Function Projects'
    ]
  },
  DATA_STRUCTURES: {
    id: 'section_data_structures',
    title: 'Data Structures',
    description: 'Master complex data organization',
    difficulty: 'intermediate',
    unitCount: 35,
    topics: [
      'Lists/Arrays',
      'Dictionaries/Maps',
      'Sets',
      'Tuples',
      'Stacks & Queues',
      'Linked Lists',
      'Trees',
      'Graphs',
      'Custom Collections',
      'Data Structure Projects'
    ]
  },
  OBJECTS: {
    id: 'section_objects',
    title: 'Objects & Classes',
    description: 'Learn object-oriented programming',
    difficulty: 'intermediate',
    unitCount: 30,
    topics: [
      'Class Basics',
      'Constructors',
      'Methods',
      'Properties',
      'Inheritance',
      'Polymorphism',
      'Encapsulation',
      'Static Members',
      'Abstract Classes',
      'OOP Projects'
    ]
  },
  ADVANCED: {
    id: 'section_advanced',
    title: 'Advanced Concepts',
    description: 'Master advanced programming concepts',
    difficulty: 'advanced',
    unitCount: 40,
    topics: [
      'Async Programming',
      'Generators',
      'Decorators',
      'Memory Management',
      'Design Patterns',
      'Testing',
      'Debugging',
      'Performance',
      'Libraries & Modules',
      'Advanced Projects'
    ]
  },
  FRAMEWORKS: {
    id: 'section_frameworks',
    title: 'Practical Applications',
    description: 'Build real-world applications',
    difficulty: 'advanced',
    unitCount: 30,
    topics: [
      'Web Development',
      'APIs',
      'Databases',
      'GUI Applications',
      'File Handling',
      'Network Programming',
      'Data Processing',
      'Security',
      'Deployment',
      'Final Projects'
    ]
  }
};
