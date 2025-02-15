export interface LessonContent {
  theory: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  xpPoints: number;
  examples: Array<{
    source: string;
    target: string;
    explanation: string;
  }>;
  exercises: Array<{
    type: 'code_completion' | 'multiple_choice' | 'fill_in_blanks' | 'code_conversion';
    question: string;
    code?: string;
    solution: string;
    hints: string[];
    xpReward: number;
  }>;
  practice?: {
    type: 'interactive_terminal' | 'code_project';
    instructions: string;
    testCases: Array<{
      input: string;
      expectedOutput: string;
      code: string;
    }>;
    xpReward: number;
  };
  achievements?: {
    id: string;
    title: string;
    description: string;
    xpReward: number;
    gemReward?: number;
  }[];
}

export interface Lesson {
  id: string;
  title: string;
  content: LessonContent;
  prerequisites?: string[];
  estimatedTime: number; // in minutes
}

export interface Unit {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  xpToUnlock: number;
}

export interface Section {
  id: string;
  title: string;
  description: string;
  units: Unit[];
  requiredSections?: string[];
}

export interface LanguagePairCurriculum {
  sourceLanguage: string;
  targetLanguage: string;
  sections: Section[];
  metadata: {
    totalLessons: number;
    estimatedHours: number;
    difficulty: string;
    prerequisites: string[];
    learningOutcomes: string[];
  };
}

// Comprehensive curriculum sections for all language pairs
export const standardSections = [
  {
    id: 'section_1_fundamentals',
    title: 'Programming Fundamentals',
    description: 'Learn the basic building blocks of programming',
    units: [
      { 
        id: 'unit_1_1_output',
        title: 'Console Output',
        description: 'Learn to display text and values',
        lessons: [
          'Hello World',
          'Print Multiple Lines',
          'Print Variables',
          'String Formatting',
          'Special Characters',
          'Print Numbers',
          'Print Boolean Values',
          'Print Arrays/Lists',
          'Error Messages',
          'Debug Output'
        ]
      },
      {
        id: 'unit_1_2_comments',
        title: 'Comments and Documentation',
        description: 'Document your code effectively',
        lessons: [
          'Single Line Comments',
          'Multi-line Comments',
          'Documentation Comments',
          'Code Organization',
          'Best Practices',
          'Commenting Style',
          'Documentation Standards',
          'TODO Comments',
          'Function Documentation',
          'Class Documentation'
        ]
      },
      {
        id: 'unit_1_3_variables',
        title: 'Variables and Data Types',
        description: 'Store and manipulate different types of data',
        lessons: [
          'Variable Declaration',
          'Numbers and Math',
          'Text and Strings',
          'Boolean Logic',
          'Constants',
          'Type Conversion',
          'Multiple Variables',
          'Naming Conventions',
          'Scope Rules',
          'Memory Management'
        ]
      }
    ]
  },
  {
    id: 'section_2_operations',
    title: 'Basic Operations',
    description: 'Master fundamental programming operations',
    units: [
      {
        id: 'unit_2_1_arithmetic',
        title: 'Arithmetic Operations',
        description: 'Perform mathematical calculations',
        lessons: [
          'Basic Math',
          'Order of Operations',
          'Integer Division',
          'Floating Point Math',
          'Math Functions',
          'Random Numbers',
          'Number Systems',
          'Bitwise Operations',
          'Complex Numbers',
          'Scientific Notation'
        ]
      },
      {
        id: 'unit_2_2_strings',
        title: 'String Operations',
        description: 'Manipulate text and strings',
        lessons: [
          'String Concatenation',
          'String Methods',
          'Substrings',
          'String Search',
          'Case Manipulation',
          'String Validation',
          'Regular Expressions',
          'String Formatting',
          'Unicode Handling',
          'Template Strings'
        ]
      }
    ]
  },
  {
    id: 'section_3_control',
    title: 'Control Flow',
    description: 'Control program execution flow',
    units: [
      {
        id: 'unit_3_1_conditionals',
        title: 'Conditional Statements',
        description: 'Make decisions in your code',
        lessons: [
          'If Statements',
          'Else Clauses',
          'Multiple Conditions',
          'Switch Statements',
          'Pattern Matching',
          'Ternary Operators',
          'Nested Conditions',
          'Short Circuit Logic',
          'Guard Clauses',
          'Best Practices'
        ]
      },
      {
        id: 'unit_3_2_loops',
        title: 'Loops and Iterations',
        description: 'Repeat actions efficiently',
        lessons: [
          'For Loops',
          'While Loops',
          'Loop Control',
          'Nested Loops',
          'Iterators',
          'List Comprehension',
          'Loop Optimization',
          'Infinite Loops',
          'Break and Continue',
          'Loop Patterns'
        ]
      }
    ]
  },
  {
    id: 'section_4_functions',
    title: 'Functions and Methods',
    description: 'Create reusable code blocks',
    units: [
      {
        id: 'unit_4_1_basics',
        title: 'Function Basics',
        description: 'Learn to create and use functions',
        lessons: [
          'Function Declaration',
          'Parameters',
          'Return Values',
          'Default Arguments',
          'Named Arguments',
          'Variable Arguments',
          'Scope Rules',
          'Pure Functions',
          'Side Effects',
          'Documentation'
        ]
      },
      {
        id: 'unit_4_2_advanced',
        title: 'Advanced Functions',
        description: 'Master advanced function concepts',
        lessons: [
          'Anonymous Functions',
          'Higher Order Functions',
          'Closures',
          'Decorators',
          'Generators',
          'Async Functions',
          'Recursion',
          'Memoization',
          'Function Composition',
          'Error Handling'
        ]
      }
    ]
  },
  {
    id: 'section_5_data_structures',
    title: 'Data Structures',
    description: 'Organize and manage data efficiently',
    units: [
      {
        id: 'unit_5_1_arrays',
        title: 'Arrays and Lists',
        description: 'Work with sequential data',
        lessons: [
          'Array Basics',
          'List Operations',
          'Sorting',
          'Searching',
          'Filtering',
          'Mapping',
          'Reducing',
          'Multi-dimensional Arrays',
          'Array Methods',
          'Performance'
        ]
      },
      {
        id: 'unit_5_2_collections',
        title: 'Collections',
        description: 'Use specialized data structures',
        lessons: [
          'Sets',
          'Dictionaries',
          'Tuples',
          'Queues',
          'Stacks',
          'Hash Tables',
          'Linked Lists',
          'Trees',
          'Graphs',
          'Custom Collections'
        ]
      }
    ]
  },
  {
    id: 'section_6_oop',
    title: 'Object-Oriented Programming',
    description: 'Design with classes and objects',
    units: [
      {
        id: 'unit_6_1_classes',
        title: 'Classes and Objects',
        description: 'Create object-oriented code',
        lessons: [
          'Class Definition',
          'Constructor Methods',
          'Instance Variables',
          'Class Methods',
          'Static Methods',
          'Properties',
          'Access Control',
          'Method Overloading',
          'Operator Overloading',
          'Class Composition'
        ]
      },
      {
        id: 'unit_6_2_inheritance',
        title: 'Inheritance and Polymorphism',
        description: 'Extend and modify class behavior',
        lessons: [
          'Basic Inheritance',
          'Method Override',
          'Abstract Classes',
          'Interfaces',
          'Multiple Inheritance',
          'Mixins',
          'Method Resolution',
          'Duck Typing',
          'Design Patterns',
          'Best Practices'
        ]
      }
    ]
  },
  {
    id: 'section_7_advanced',
    title: 'Advanced Topics',
    description: 'Master advanced programming concepts',
    units: [
      {
        id: 'unit_7_1_async',
        title: 'Asynchronous Programming',
        description: 'Handle concurrent operations',
        lessons: [
          'Callbacks',
          'Promises',
          'Async/Await',
          'Event Loop',
          'Concurrency',
          'Parallel Processing',
          'Workers',
          'Race Conditions',
          'Error Handling',
          'Best Practices'
        ]
      },
      {
        id: 'unit_7_2_modules',
        title: 'Modules and Packages',
        description: 'Organize and share code',
        lessons: [
          'Module Basics',
          'Import/Export',
          'Package Management',
          'Dependency Handling',
          'Module Patterns',
          'Circular Dependencies',
          'Module Loading',
          'Package Creation',
          'Distribution',
          'Version Control'
        ]
      }
    ]
  },
  {
    id: 'section_8_projects',
    title: 'Real-World Projects',
    description: 'Apply your skills to practical projects',
    units: [
      {
        id: 'unit_8_1_cli',
        title: 'Command Line Applications',
        description: 'Build CLI tools and utilities',
        lessons: [
          'Project Setup',
          'Argument Parsing',
          'File Operations',
          'User Input',
          'Progress Indicators',
          'Error Handling',
          'Configuration',
          'Logging',
          'Testing',
          'Distribution'
        ]
      },
      {
        id: 'unit_8_2_web',
        title: 'Web Applications',
        description: 'Create web-based projects',
        lessons: [
          'HTTP Basics',
          'API Design',
          'Data Storage',
          'Authentication',
          'Request Handling',
          'Response Formatting',
          'Error Handling',
          'Security',
          'Performance',
          'Deployment'
        ]
      }
    ]
  }
];
