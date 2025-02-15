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

// Standard section template for all language pairs
export const standardSections = [
  {
    id: 'section_1_basics',
    title: 'Language Basics',
    units: [
      { id: 'unit_1_output', title: 'Console Output', lessons: 10 },
      { id: 'unit_2_variables', title: 'Variables and Types', lessons: 10 },
      { id: 'unit_3_operators', title: 'Basic Operators', lessons: 10 },
      { id: 'unit_4_strings', title: 'String Operations', lessons: 10 },
      // ... more units
    ]
  },
  {
    id: 'section_2_control_flow',
    title: 'Control Flow',
    units: [
      { id: 'unit_1_conditionals', title: 'If Statements', lessons: 10 },
      { id: 'unit_2_loops', title: 'Loops and Iterations', lessons: 10 },
      { id: 'unit_3_switch', title: 'Switch and Pattern Matching', lessons: 10 },
      // ... more units
    ]
  },
  {
    id: 'section_3_functions',
    title: 'Functions and Methods',
    units: [
      { id: 'unit_1_basics', title: 'Function Basics', lessons: 10 },
      { id: 'unit_2_parameters', title: 'Parameters and Returns', lessons: 10 },
      { id: 'unit_3_advanced', title: 'Advanced Functions', lessons: 10 },
      // ... more units
    ]
  },
  {
    id: 'section_4_data_structures',
    title: 'Data Structures',
    units: [
      { id: 'unit_1_arrays', title: 'Arrays and Lists', lessons: 10 },
      { id: 'unit_2_maps', title: 'Maps and Dictionaries', lessons: 10 },
      { id: 'unit_3_sets', title: 'Sets', lessons: 10 },
      // ... more units
    ]
  },
  {
    id: 'section_5_oop',
    title: 'Object-Oriented Programming',
    units: [
      { id: 'unit_1_classes', title: 'Classes and Objects', lessons: 10 },
      { id: 'unit_2_inheritance', title: 'Inheritance', lessons: 10 },
      { id: 'unit_3_interfaces', title: 'Interfaces and Abstract Classes', lessons: 10 },
      // ... more units
    ]
  },
  {
    id: 'section_6_error_handling',
    title: 'Error Handling',
    units: [
      { id: 'unit_1_exceptions', title: 'Exceptions', lessons: 10 },
      { id: 'unit_2_try_catch', title: 'Try-Catch Blocks', lessons: 10 },
      { id: 'unit_3_custom', title: 'Custom Exceptions', lessons: 10 },
      // ... more units
    ]
  },
  {
    id: 'section_7_advanced',
    title: 'Advanced Topics',
    units: [
      { id: 'unit_1_generics', title: 'Generics', lessons: 10 },
      { id: 'unit_2_async', title: 'Asynchronous Programming', lessons: 10 },
      { id: 'unit_3_functional', title: 'Functional Programming', lessons: 10 },
      // ... more units
    ]
  },
  {
    id: 'section_8_projects',
    title: 'Practical Projects',
    units: [
      { id: 'unit_1_cli', title: 'Command Line App', lessons: 10 },
      { id: 'unit_2_api', title: 'API Development', lessons: 10 },
      { id: 'unit_3_gui', title: 'GUI Application', lessons: 10 },
      // ... more units
    ]
  }
];
