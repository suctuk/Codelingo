import { LanguagePairCurriculum } from '../curriculumTemplate';
import { generateLesson, commonConcepts } from '../lessonGenerator';
import { languageConfigs } from '../languagePairFactory';

const javascriptToJavaSpecificConcepts = {
  'arrow-functions': {
    source: 'const add = (a, b) => a + b;',
    target: 'public class Calculator {\n    public static int add(int a, int b) {\n        return a + b;\n    }\n}',
    explanation: 'JavaScript arrow functions typically become static methods in Java',
    examples: [
      {
        source: 'const square = x => x * x;',
        target: 'public static int square(int x) {\n    return x * x;\n}',
        explanation: 'Single parameter arrow functions need explicit types'
      }
    ]
  },
  'object-literals': {
    source: 'const person = {\n    name: "John",\n    age: 30\n};',
    target: 'public class Person {\n    private String name;\n    private int age;\n    \n    public Person(String name, int age) {\n        this.name = name;\n        this.age = age;\n    }\n}',
    explanation: 'JavaScript object literals become proper classes in Java',
    examples: [
      {
        source: 'const point = { x: 0, y: 0 };',
        target: 'public class Point {\n    private int x;\n    private int y;\n    \n    public Point(int x, int y) {\n        this.x = x;\n        this.y = y;\n    }\n}',
        explanation: 'Simple objects become classes with constructors'
      }
    ]
  },
  'dynamic-typing': {
    source: 'let value = "hello";\nvalue = 42;',
    target: 'String textValue = "hello";\nint numValue = 42;',
    explanation: 'JavaScript\'s dynamic typing must be converted to Java\'s static typing',
    examples: [
      {
        source: 'function process(value) {\n    console.log(value);\n}',
        target: 'public class Processor {\n    public void processString(String value) {\n        System.out.println(value);\n    }\n    \n    public void processInt(int value) {\n        System.out.println(value);\n    }\n}',
        explanation: 'Dynamic parameters often need method overloading in Java'
      }
    ]
  }
};

export const javaScriptToJava: LanguagePairCurriculum = {
  sourceLanguage: 'JavaScript',
  targetLanguage: 'Java',
  sections: [
    {
      id: 'section_1_fundamentals',
      title: 'Java Fundamentals for JavaScript Developers',
      description: 'Learn Java basics coming from JavaScript',
      units: [
        {
          id: 'unit_1_1_syntax',
          title: 'Basic Syntax',
          description: 'Learn Java syntax differences from JavaScript',
          lessons: [
            generateLesson('javascript', 'java', 'print', commonConcepts.print),
            generateLesson('javascript', 'java', 'variables', commonConcepts.variables),
            generateLesson('javascript', 'java', 'functions', commonConcepts.functions),
            {
              id: 'lesson_1_1_4',
              title: 'Static Typing',
              content: {
                theory: 'Unlike JavaScript, Java requires explicit type declarations for all variables and methods',
                difficulty: 'beginner',
                xpPoints: 15,
                examples: [
                  {
                    source: 'let name = "John";\nlet age = 30;',
                    target: 'String name = "John";\nint age = 30;',
                    explanation: 'Java requires explicit type declarations'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this JavaScript code to Java with proper types',
                    code: 'function calculateArea(radius) {\n    return Math.PI * radius * radius;\n}',
                    solution: 'public class Circle {\n    public static double calculateArea(double radius) {\n        return Math.PI * radius * radius;\n    }\n}',
                    hints: [
                      'Add return type',
                      'Add parameter type',
                      'Wrap in class',
                      'Consider making static'
                    ],
                    xpReward: 10
                  }
                ]
              },
              prerequisites: [],
              estimatedTime: 10
            }
          ],
          skillLevel: 'beginner',
          xpToUnlock: 0
        },
        {
          id: 'unit_1_2_classes',
          title: 'Classes and Objects',
          description: 'Learn Java classes compared to JavaScript objects and classes',
          lessons: [
            {
              id: 'lesson_1_2_1',
              title: 'Class Structure',
              content: {
                theory: 'Java classes are more formal than JavaScript classes, requiring access modifiers and explicit typing',
                difficulty: 'beginner',
                xpPoints: 20,
                examples: [
                  {
                    source: 'class User {\n    constructor(name) {\n        this.name = name;\n    }\n}',
                    target: 'public class User {\n    private String name;\n    \n    public User(String name) {\n        this.name = name;\n    }\n}',
                    explanation: 'Java requires access modifiers and field declarations'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this JavaScript class to Java',
                    code: 'class Counter {\n    constructor() {\n        this.count = 0;\n    }\n    increment() {\n        this.count++;\n    }\n}',
                    solution: 'public class Counter {\n    private int count;\n    \n    public Counter() {\n        this.count = 0;\n    }\n    \n    public void increment() {\n        this.count++;\n    }\n}',
                    hints: [
                      'Add access modifiers',
                      'Declare fields explicitly',
                      'Add return types to methods',
                      'Make constructor public'
                    ],
                    xpReward: 15
                  }
                ]
              },
              prerequisites: [],
              estimatedTime: 15
            }
          ],
          skillLevel: 'beginner',
          xpToUnlock: 30
        }
      ],
      requiredSections: []
    },
    {
      id: 'section_2_advanced',
      title: 'Advanced Java Features',
      description: 'Learn Java-specific concepts and patterns',
      units: [
        {
          id: 'unit_2_1_collections',
          title: 'Collections Framework',
          description: 'Learn Java collections compared to JavaScript arrays and objects',
          lessons: [
            {
              id: 'lesson_2_1_1',
              title: 'Lists and Arrays',
              content: {
                theory: 'Java has a rich Collections Framework with type-safe containers',
                difficulty: 'intermediate',
                xpPoints: 30,
                examples: [
                  {
                    source: 'const numbers = [1, 2, 3];\nnumbers.push(4);',
                    target: 'List<Integer> numbers = new ArrayList<>();\nnumbers.add(1);\nnumbers.add(2);\nnumbers.add(3);\nnumbers.add(4);',
                    explanation: 'JavaScript arrays become Java Lists with explicit types'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this JavaScript array manipulation to Java',
                    code: 'const items = [1, 2, 3];\nitems.push(4);\nitems.pop();\nconsole.log(items.length);',
                    solution: 'List<Integer> items = new ArrayList<>();\nitems.add(1);\nitems.add(2);\nitems.add(3);\nitems.add(4);\nitems.remove(items.size() - 1);\nSystem.out.println(items.size());',
                    hints: [
                      'Use ArrayList implementation',
                      'Use add() instead of push()',
                      'Use remove() instead of pop()',
                      'Use size() instead of length'
                    ],
                    xpReward: 20
                  }
                ]
              },
              prerequisites: [],
              estimatedTime: 20
            }
          ],
          skillLevel: 'intermediate',
          xpToUnlock: 100
        }
      ],
      requiredSections: ['section_1_fundamentals']
    }
  ],
  metadata: {
    totalLessons: 300,
    estimatedHours: 40,
    difficulty: 'Beginner to Advanced',
    prerequisites: ['Basic JavaScript knowledge'],
    learningOutcomes: [
      'Write Java code confidently',
      'Understand key differences between JavaScript and Java',
      'Build Java applications using JavaScript knowledge',
      'Work with Java\'s type system',
      'Handle Java-specific patterns and idioms'
    ]
  }
};
