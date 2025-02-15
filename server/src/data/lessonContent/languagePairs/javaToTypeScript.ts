import { LanguagePairCurriculum } from '../curriculumTemplate';
import { generateLesson, commonConcepts } from '../lessonGenerator';
import { languageConfigs } from '../languagePairFactory';

const javaToTypeScriptSpecificConcepts = {
  'access-modifiers': {
    source: 'public class User {\n    private String name;\n    protected int age;\n    public String email;\n}',
    target: 'class User {\n    private name: string;\n    protected age: number;\n    public email: string;\n}',
    explanation: 'Java access modifiers map directly to TypeScript',
    examples: [
      {
        source: 'private static final int MAX_SIZE = 100;',
        target: 'private static readonly MAX_SIZE: number = 100;',
        explanation: 'final becomes readonly in TypeScript'
      }
    ]
  },
  'method-overloading': {
    source: 'public class Calculator {\n    public int add(int a, int b) {\n        return a + b;\n    }\n    public double add(double a, double b) {\n        return a + b;\n    }\n}',
    target: 'class Calculator {\n    add(a: number, b: number): number;\n    add(a: string, b: string): string;\n    add(a: any, b: any): any {\n        return a + b;\n    }\n}',
    explanation: 'Java method overloading becomes function overloading in TypeScript',
    examples: [
      {
        source: 'public String process(String s) {...}\npublic int process(int n) {...}',
        target: 'process(s: string): string;\nprocess(n: number): number;\nprocess(value: string | number): string | number {...}',
        explanation: 'Multiple overloads use union types in implementation'
      }
    ]
  },
  'checked-exceptions': {
    source: 'public void readFile() throws IOException {\n    // read file\n}',
    target: 'async readFile(): Promise<void> {\n    try {\n        // read file\n    } catch (error) {\n        throw new Error("IO Error: " + error.message);\n    }\n}',
    explanation: 'Java checked exceptions typically become async/await with try/catch in TypeScript',
    examples: [
      {
        source: 'throws SQLException',
        target: 'Promise<void> with try/catch',
        explanation: 'Database exceptions use async/await pattern'
      }
    ]
  }
};

export const javaToTypeScript: LanguagePairCurriculum = {
  sourceLanguage: 'Java',
  targetLanguage: 'TypeScript',
  sections: [
    {
      id: 'section_1_fundamentals',
      title: 'TypeScript Fundamentals for Java Developers',
      description: 'Learn TypeScript basics coming from Java',
      units: [
        {
          id: 'unit_1_1_syntax',
          title: 'Basic Syntax',
          description: 'Learn TypeScript syntax differences from Java',
          lessons: [
            generateLesson('java', 'typescript', 'print', commonConcepts.print),
            generateLesson('java', 'typescript', 'variables', commonConcepts.variables),
            generateLesson('java', 'typescript', 'functions', commonConcepts.functions),
            {
              id: 'lesson_1_1_4',
              title: 'Type System',
              content: {
                theory: 'TypeScript\'s type system is similar to Java\'s but more flexible with features like union types and type inference',
                difficulty: 'beginner',
                xpPoints: 15,
                examples: [
                  {
                    source: 'String name = "John";\nint age = 30;',
                    target: 'let name: string = "John";\nlet age: number = 30;',
                    explanation: 'TypeScript uses different type names and has type inference'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Java code to TypeScript',
                    code: 'public class Math {\n    public static double calculateArea(double radius) {\n        return Math.PI * radius * radius;\n    }\n}',
                    solution: 'class Math {\n    static calculateArea(radius: number): number {\n        return Math.PI * radius * radius;\n    }\n}',
                    hints: [
                      'Remove public modifier',
                      'Use number instead of double',
                      'Type annotations use colon syntax',
                      'Keep static keyword'
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
          title: 'Classes and Interfaces',
          description: 'Learn TypeScript classes compared to Java',
          lessons: [
            {
              id: 'lesson_1_2_1',
              title: 'Class Structure',
              content: {
                theory: 'TypeScript classes are similar to Java but with some syntactic differences and additional features',
                difficulty: 'beginner',
                xpPoints: 20,
                examples: [
                  {
                    source: 'public class User {\n    private String name;\n    private int age;\n    \n    public User(String name, int age) {\n        this.name = name;\n        this.age = age;\n    }\n}',
                    target: 'class User {\n    constructor(private name: string, private age: number) {}\n}',
                    explanation: 'TypeScript supports parameter properties in constructors'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Java class to TypeScript',
                    code: 'public class Point {\n    private final double x;\n    private final double y;\n    \n    public Point(double x, double y) {\n        this.x = x;\n        this.y = y;\n    }\n    \n    public double distanceFromOrigin() {\n        return Math.sqrt(this.x * this.x + this.y * this.y);\n    }\n}',
                    solution: 'class Point {\n    constructor(private readonly x: number, private readonly y: number) {}\n    \n    distanceFromOrigin(): number {\n        return Math.sqrt(this.x * this.x + this.y * this.y);\n    }\n}',
                    hints: [
                      'Use parameter properties',
                      'readonly for final fields',
                      'number instead of double',
                      'Remove public modifier'
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
      title: 'Advanced TypeScript Features',
      description: 'Learn TypeScript-specific concepts and patterns',
      units: [
        {
          id: 'unit_2_1_types',
          title: 'Advanced Types',
          description: 'Learn TypeScript\'s unique type features compared to Java',
          lessons: [
            {
              id: 'lesson_2_1_1',
              title: 'Union Types',
              content: {
                theory: 'TypeScript supports union types, which allow a variable to have multiple types',
                difficulty: 'intermediate',
                xpPoints: 30,
                examples: [
                  {
                    source: 'public class Result {\n    private final Object value;\n    public Result(String s) { value = s; }\n    public Result(Integer n) { value = n; }\n}',
                    target: 'type Result = string | number;\n\nfunction createResult(value: string | number): Result {\n    return value;\n}',
                    explanation: 'Java type hierarchies often become union types'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Java class hierarchy to TypeScript union type',
                    code: 'public interface Shape {}\npublic class Circle implements Shape {}\npublic class Square implements Shape {}\npublic class ShapeProcessor {\n    public void process(Shape shape) {...}\n}',
                    solution: 'interface Circle { kind: "circle"; radius: number; }\ninterface Square { kind: "square"; side: number; }\ntype Shape = Circle | Square;\n\nfunction processShape(shape: Shape) {\n    switch (shape.kind) {\n        case "circle": // handle circle\n        case "square": // handle square\n    }\n}',
                    hints: [
                      'Use discriminated unions',
                      'Add type property for runtime checks',
                      'Use type instead of interface for union',
                      'Switch on type property'
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
    prerequisites: ['Basic Java knowledge'],
    learningOutcomes: [
      'Write TypeScript code confidently',
      'Understand key differences between Java and TypeScript',
      'Use TypeScript\'s advanced type system',
      'Work with TypeScript classes and interfaces',
      'Handle TypeScript-specific patterns and idioms'
    ]
  }
};
