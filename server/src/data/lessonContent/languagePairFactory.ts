import { LanguagePairCurriculum } from './curriculumTemplate';
import { generateLesson, commonConcepts } from './lessonGenerator';

export interface LanguageConfig {
  name: string;
  fileExtension: string;
  printStatement: string;
  variableDeclaration: string;
  functionDeclaration: string;
  classDeclaration: string;
  commentStyle: {
    single: string;
    multi: {
      start: string;
      end: string;
    };
  };
  conceptMappings?: {
    [key: string]: {
      syntax: string;
      example: string;
      notes: string[];
    };
  };
}

export const languageConfigs: { [key: string]: LanguageConfig } = {
  python: {
    name: 'Python',
    fileExtension: '.py',
    printStatement: 'print("Hello World")',
    variableDeclaration: 'x = 42',
    functionDeclaration: 'def function_name():',
    classDeclaration: 'class ClassName:',
    commentStyle: {
      single: '#',
      multi: {
        start: '"""',
        end: '"""'
      }
    },
    conceptMappings: {
      arrays: {
        syntax: 'list_name = [1, 2, 3]',
        example: 'numbers = [1, 2, 3]\nnumbers.append(4)',
        notes: ['Lists are mutable', 'Zero-based indexing', 'Dynamic sizing']
      },
      loops: {
        syntax: 'for item in items:\n    print(item)',
        example: 'for i in range(5):\n    print(i)',
        notes: ['No C-style for loops', 'range() for numeric loops', 'Enumerate() for index access']
      }
    }
  },
  javascript: {
    name: 'JavaScript',
    fileExtension: '.js',
    printStatement: 'console.log("Hello World");',
    variableDeclaration: 'let x = 42;',
    functionDeclaration: 'function functionName() {',
    classDeclaration: 'class ClassName {',
    commentStyle: {
      single: '//',
      multi: {
        start: '/*',
        end: '*/'
      }
    },
    conceptMappings: {
      arrays: {
        syntax: 'const array = [1, 2, 3];',
        example: 'const numbers = [1, 2, 3];\nnumbers.push(4);',
        notes: ['Arrays are objects', 'Zero-based indexing', 'Dynamic sizing']
      },
      loops: {
        syntax: 'for (let item of items) {\n    console.log(item);\n}',
        example: 'for (let i = 0; i < 5; i++) {\n    console.log(i);\n}',
        notes: ['C-style for loops available', 'for...of for iteration', 'forEach for functional approach']
      }
    }
  },
  java: {
    name: 'Java',
    fileExtension: '.java',
    printStatement: 'System.out.println("Hello World");',
    variableDeclaration: 'int x = 42;',
    functionDeclaration: 'public void functionName() {',
    classDeclaration: 'public class ClassName {',
    commentStyle: {
      single: '//',
      multi: {
        start: '/*',
        end: '*/'
      }
    },
    conceptMappings: {
      arrays: {
        syntax: 'int[] array = {1, 2, 3};',
        example: 'ArrayList<Integer> numbers = new ArrayList<>();\nnumbers.add(4);',
        notes: ['Fixed-size arrays', 'ArrayList for dynamic sizing', 'Type safety']
      },
      loops: {
        syntax: 'for (int item : items) {\n    System.out.println(item);\n}',
        example: 'for (int i = 0; i < 5; i++) {\n    System.out.println(i);\n}',
        notes: ['C-style for loops', 'Enhanced for loop', 'Iterator interface']
      }
    }
  },
  typescript: {
    name: 'TypeScript',
    fileExtension: '.ts',
    printStatement: 'console.log("Hello World");',
    variableDeclaration: 'let x: number = 42;',
    functionDeclaration: 'function functionName(): void {',
    classDeclaration: 'class ClassName {',
    commentStyle: {
      single: '//',
      multi: {
        start: '/*',
        end: '*/'
      }
    },
    conceptMappings: {
      arrays: {
        syntax: 'const array: number[] = [1, 2, 3];',
        example: 'const numbers: Array<number> = [1, 2, 3];\nnumbers.push(4);',
        notes: ['Type annotations', 'Generics support', 'Tuple types']
      },
      loops: {
        syntax: 'for (const item of items) {\n    console.log(item);\n}',
        example: 'for (let i: number = 0; i < 5; i++) {\n    console.log(i);\n}',
        notes: ['Type-safe iterations', 'for...of with type inference', 'Array methods with types']
      }
    }
  },
  rust: {
    name: 'Rust',
    fileExtension: '.rs',
    printStatement: 'println!("Hello World");',
    variableDeclaration: 'let x = 42;',
    functionDeclaration: 'fn function_name() {',
    classDeclaration: 'struct ClassName {',
    commentStyle: {
      single: '//',
      multi: {
        start: '/*',
        end: '*/'
      }
    },
    conceptMappings: {
      arrays: {
        syntax: 'let array = [1, 2, 3];',
        example: 'let mut numbers = Vec::new();\nnumbers.push(4);',
        notes: ['Fixed-size arrays', 'Vec for dynamic sizing', 'Ownership rules']
      },
      loops: {
        syntax: 'for item in items {\n    println!("{}", item);\n}',
        example: 'for i in 0..5 {\n    println!("{}", i);\n}',
        notes: ['Range-based loops', 'Iterator traits', 'Loop labels']
      }
    }
  }
};

// Generate all possible language pair combinations
function generateAllLanguagePairs(): { [key: string]: LanguagePairCurriculum } {
  const languages = Object.keys(languageConfigs);
  const pairs: { [key: string]: LanguagePairCurriculum } = {};

  for (const source of languages) {
    for (const target of languages) {
      if (source !== target) {
        const pairKey = `${source}-${target}`;
        pairs[pairKey] = generateLanguagePairCurriculum(source, target);
      }
    }
  }

  return pairs;
}

// Generate curriculum for a specific language pair
function generateLanguagePairCurriculum(source: string, target: string): LanguagePairCurriculum {
  const sourceConfig = languageConfigs[source];
  const targetConfig = languageConfigs[target];

  return {
    sourceLanguage: sourceConfig.name,
    targetLanguage: targetConfig.name,
    sections: generateSections(source, target),
    metadata: {
      totalLessons: 300,
      estimatedHours: 40,
      difficulty: 'Beginner to Advanced',
      prerequisites: [`Basic ${sourceConfig.name} knowledge`],
      learningOutcomes: [
        `Write ${targetConfig.name} code confidently`,
        `Understand key differences between ${sourceConfig.name} and ${targetConfig.name}`,
        `Build ${targetConfig.name} applications using ${sourceConfig.name} knowledge`
      ]
    }
  };
}

function generateSections(source: string, target: string) {
  const sourceConfig = languageConfigs[source];
  const targetConfig = languageConfigs[target];

  // Generate lessons for each concept using the mappings
  const conceptLessons = Object.keys(commonConcepts).map(concept => 
    generateLesson(source, target, concept, commonConcepts[concept])
  );

  // Add language-specific concept lessons
  const sourceSpecificConcepts = sourceConfig.conceptMappings || {};
  const targetSpecificConcepts = targetConfig.conceptMappings || {};

  // Combine and organize lessons into the standard curriculum structure
  return [
    {
      id: 'section_1_fundamentals',
      title: `${targetConfig.name} Fundamentals for ${sourceConfig.name} Developers`,
      description: `Learn ${targetConfig.name} basics coming from ${sourceConfig.name}`,
      units: [
        {
          id: 'unit_1_1_output',
          title: 'Console Output',
          description: `Learn how ${targetConfig.name} handles console output compared to ${sourceConfig.name}`,
          lessons: conceptLessons.filter(lesson => lesson.title.toLowerCase().includes('print')),
          skillLevel: 'beginner',
          xpToUnlock: 0
        },
        // Additional units would be populated similarly
      ],
      requiredSections: []
    }
    // Additional sections would be populated similarly
  ];
}

// Export all language pairs
export const languagePairs = generateAllLanguagePairs();
