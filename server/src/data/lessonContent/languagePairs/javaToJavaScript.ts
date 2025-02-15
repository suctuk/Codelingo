import { LanguagePairCurriculum } from '../curriculumTemplate';
import { generateLesson, commonConcepts } from '../lessonGenerator';
import { languageConfigs } from '../languagePairFactory';

export const javaToJavaScript: LanguagePairCurriculum = {
  sourceLanguage: 'Java',
  targetLanguage: 'JavaScript',
  sections: [
    {
      id: 'section_1_basics',
      title: 'Getting Started with JavaScript',
      description: 'Learn the fundamental differences between Java and JavaScript syntax',
      units: [
        {
          id: 'unit_1_1_printing',
          title: 'Print Statements and Basic Output',
          description: 'Learn how to output text and values in JavaScript',
          lessons: [
            {
              id: 'lesson_1_1_1',
              title: 'Your First JavaScript Output',
              content: {
                theory: 'In Java, you use System.out.println(). In JavaScript, you use console.log().',
                difficulty: 'beginner',
                xpPoints: 10,
                examples: [
                  {
                    source: 'System.out.println("Hello, World!");',
                    target: 'console.log("Hello, World!");',
                    explanation: 'JavaScript uses console.log() instead of System.out.println()'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Java print statement to JavaScript',
                    code: 'System.out.println("I am learning JavaScript");',
                    solution: 'console.log("I am learning JavaScript");',
                    hints: ['Use console.log', 'Keep the semicolon'],
                    xpReward: 5
                  }
                ]
              },
              prerequisites: [],
              estimatedTime: 5
            },
            {
              id: 'lesson_1_1_2',
              title: 'Print Formatting',
              content: {
                theory: 'JavaScript uses template literals instead of Java\'s printf or String.format',
                difficulty: 'beginner',
                xpPoints: 15,
                examples: [
                  {
                    source: 'System.out.printf("Hello, %s!", name);',
                    target: 'console.log(`Hello, ${name}!`);',
                    explanation: 'JavaScript uses backticks and ${} for string interpolation'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Java formatted print to JavaScript',
                    code: 'System.out.printf("Age: %d, Name: %s", age, name);',
                    solution: 'console.log(`Age: ${age}, Name: ${name}`);',
                    hints: ['Use backticks for template literals', 'Use ${} for variables'],
                    xpReward: 10
                  }
                ]
              },
              prerequisites: ['lesson_1_1_1'],
              estimatedTime: 8
            }
          ],
          skillLevel: 'beginner',
          xpToUnlock: 0
        },
        {
          id: 'unit_1_2_variables',
          title: 'Variables and Data Types',
          description: 'Learn about JavaScript variables compared to Java',
          lessons: [
            {
              id: 'lesson_1_2_1',
              title: 'Variable Declaration',
              content: {
                theory: 'JavaScript uses let, const, or var instead of specific types like int or String',
                difficulty: 'beginner',
                xpPoints: 15,
                examples: [
                  {
                    source: 'String name = "John";\nint age = 25;',
                    target: 'let name = "John";\nlet age = 25;',
                    explanation: 'JavaScript uses let and infers types'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert these Java variables to JavaScript',
                    code: 'int count = 10;\nString message = "Hello";',
                    solution: 'let count = 10;\nlet message = "Hello";',
                    hints: ['Use let instead of type names', 'JavaScript infers types'],
                    xpReward: 10
                  }
                ]
              },
              prerequisites: [],
              estimatedTime: 8
            },
            {
              id: 'lesson_1_2_2',
              title: 'Constants',
              content: {
                theory: 'JavaScript uses const instead of Java\'s final',
                difficulty: 'beginner',
                xpPoints: 15,
                examples: [
                  {
                    source: 'final double PI = 3.14159;',
                    target: 'const PI = 3.14159;',
                    explanation: 'const replaces final, no type needed'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Java constant to JavaScript',
                    code: 'final int MAX_VALUE = 100;',
                    solution: 'const MAX_VALUE = 100;',
                    hints: ['Use const instead of final', 'Remove type declaration'],
                    xpReward: 10
                  }
                ]
              },
              prerequisites: ['lesson_1_2_1'],
              estimatedTime: 8
            }
          ],
          skillLevel: 'beginner',
          xpToUnlock: 50
        }
      ],
      requiredSections: []
    },
    {
      id: 'section_2_control_flow',
      title: 'Control Flow',
      description: 'Learn how JavaScript handles conditions and loops',
      units: [
        {
          id: 'unit_2_1_conditionals',
          title: 'If Statements and Conditions',
          description: 'Learn JavaScript conditional statements',
          lessons: [
            {
              id: 'lesson_2_1_1',
              title: 'Basic If Statements',
              content: {
                theory: 'JavaScript if statements are similar to Java but with looser type checking',
                difficulty: 'beginner',
                xpPoints: 20,
                examples: [
                  {
                    source: 'if (x > 0) {\n    System.out.println("Positive");\n}',
                    target: 'if (x > 0) {\n    console.log("Positive");\n}',
                    explanation: 'Structure is the same, just different print method'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Java if statement to JavaScript',
                    code: 'if (age >= 18) {\n    System.out.println("Adult");\n}',
                    solution: 'if (age >= 18) {\n    console.log("Adult");\n}',
                    hints: ['Keep the structure', 'Change println to console.log'],
                    xpReward: 15
                  }
                ]
              },
              prerequisites: [],
              estimatedTime: 10
            },
            {
              id: 'lesson_2_1_2',
              title: 'Equality Operators',
              content: {
                theory: 'JavaScript has both == and === operators, unlike Java\'s single =',
                difficulty: 'beginner',
                xpPoints: 20,
                examples: [
                  {
                    source: 'if (x == 5) {\n    System.out.println("Equal");\n}',
                    target: 'if (x === 5) {\n    console.log("Equal");\n}',
                    explanation: 'Use === for strict equality in JavaScript'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Java equality check to JavaScript',
                    code: 'if (value == null) {\n    System.out.println("Null");\n}',
                    solution: 'if (value === null) {\n    console.log("Null");\n}',
                    hints: ['Use === for null checks', 'Change println to console.log'],
                    xpReward: 15
                  }
                ]
              },
              prerequisites: ['lesson_2_1_1'],
              estimatedTime: 10
            }
          ],
          skillLevel: 'beginner',
          xpToUnlock: 100
        }
      ],
      requiredSections: ['section_1_basics']
    }
  ],
  metadata: {
    totalLessons: 300,
    estimatedHours: 40,
    difficulty: 'Beginner to Advanced',
    prerequisites: ['Basic Java knowledge'],
    learningOutcomes: [
      'Write JavaScript code confidently',
      'Understand key differences from Java',
      'Create basic JavaScript programs',
      'Use JavaScript\'s unique features effectively'
    ]
  }
};
