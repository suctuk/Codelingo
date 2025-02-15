import { LanguagePairCurriculum, standardSections } from './curriculumTemplate';

interface LanguageConfig {
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
}

const languageConfigs: { [key: string]: LanguageConfig } = {
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
    }
  }
};

function generateBasicLesson(sourceConfig: LanguageConfig, targetConfig: LanguageConfig, topic: string): any {
  return {
    theory: `Learn how to ${topic} in ${targetConfig.name} coming from ${sourceConfig.name}`,
    difficulty: 'beginner',
    xpPoints: 10,
    examples: [
      {
        source: `${sourceConfig.commentStyle.single} ${sourceConfig.name} code\n${sourceConfig.printStatement}`,
        target: `${targetConfig.commentStyle.single} ${targetConfig.name} code\n${targetConfig.printStatement}`,
        explanation: `Converting ${sourceConfig.name} print statement to ${targetConfig.name}`
      }
    ],
    exercises: [
      {
        type: 'code_completion',
        question: `Complete the ${targetConfig.name} code to print "Hello"`,
        code: targetConfig.printStatement.replace('Hello World', '___'),
        solution: targetConfig.printStatement.replace('Hello World', 'Hello'),
        hints: [`Use ${targetConfig.name}'s print syntax`],
        xpReward: 5
      }
    ],
    practice: {
      type: 'interactive_terminal',
      instructions: `Write a ${targetConfig.name} program that prints your name`,
      testCases: [
        {
          input: '',
          expectedOutput: 'Alice',
          code: targetConfig.printStatement.replace('Hello World', 'Alice')
        }
      ],
      xpReward: 10
    }
  };
}

export function createLanguagePairCurriculum(sourceLanguage: string, targetLanguage: string): LanguagePairCurriculum {
  const sourceConfig = languageConfigs[sourceLanguage.toLowerCase()];
  const targetConfig = languageConfigs[targetLanguage.toLowerCase()];

  if (!sourceConfig || !targetConfig) {
    throw new Error('Unsupported language pair');
  }

  return {
    sourceLanguage: sourceConfig.name,
    targetLanguage: targetConfig.name,
    sections: standardSections.map(section => ({
      ...section,
      units: section.units.map(unit => ({
        ...unit,
        lessons: Array(10).fill(null).map((_, i) => ({
          id: `${unit.id}_lesson_${i + 1}`,
          title: `Lesson ${i + 1}`,
          content: generateBasicLesson(sourceConfig, targetConfig, unit.title.toLowerCase()),
          estimatedTime: 15
        }))
      }))
    })),
    metadata: {
      totalLessons: standardSections.reduce((acc, section) => 
        acc + section.units.reduce((acc2, unit) => acc2 + unit.lessons, 0), 0),
      estimatedHours: 40,
      difficulty: 'Progressive',
      prerequisites: [`Basic ${sourceConfig.name} knowledge`],
      learningOutcomes: [
        `Write basic ${targetConfig.name} programs`,
        `Understand ${targetConfig.name} syntax and structure`,
        `Convert ${sourceConfig.name} code to ${targetConfig.name}`,
        'Build simple applications'
      ]
    }
  };
}

interface LanguagePair {
  source: string;
  target: string;
  conceptMappings: {
    [key: string]: {
      source: string;
      target: string;
      explanation: string;
    };
  };
}

const languagePairs: { [key: string]: LanguagePair } = {
  'python-javascript': {
    source: 'Python',
    target: 'JavaScript',
    conceptMappings: {
      print: {
        source: 'print()',
        target: 'console.log()',
        explanation: 'JavaScript uses console.log() for output instead of print()'
      },
      variables: {
        source: 'name = "value"',
        target: 'let name = "value";',
        explanation: 'JavaScript requires let/const declarations and semicolons'
      },
      functions: {
        source: 'def function_name():',
        target: 'function functionName() {',
        explanation: 'JavaScript uses function keyword and curly braces'
      }
    }
  },
  'python-java': {
    source: 'Python',
    target: 'Java',
    conceptMappings: {
      print: {
        source: 'print()',
        target: 'System.out.println()',
        explanation: 'Java uses System.out.println() for console output'
      },
      variables: {
        source: 'name = "value"',
        target: 'String name = "value";',
        explanation: 'Java requires explicit type declarations'
      },
      functions: {
        source: 'def function_name():',
        target: 'public void functionName() {',
        explanation: 'Java requires access modifiers and return types'
      }
    }
  },
  'javascript-python': {
    source: 'JavaScript',
    target: 'Python',
    conceptMappings: {
      print: {
        source: 'console.log()',
        target: 'print()',
        explanation: 'Python uses the simpler print() function'
      },
      variables: {
        source: 'let name = "value";',
        target: 'name = "value"',
        explanation: 'Python does not require variable declarations'
      },
      functions: {
        source: 'function functionName() {',
        target: 'def function_name():',
        explanation: 'Python uses def and indentation instead of curly braces'
      }
    }
  }
};

export function generateLessonContent(sourceLang: string, targetLang: string, concept: string) {
  const pairKey = `${sourceLang}-${targetLang}`;
  const pair = languagePairs[pairKey];
  const mapping = pair?.conceptMappings[concept];

  if (!mapping) {
    throw new Error(`No mapping found for ${concept} from ${sourceLang} to ${targetLang}`);
  }

  return {
    theory: mapping.explanation,
    examples: [
      {
        source: mapping.source,
        target: mapping.target,
        explanation: mapping.explanation
      }
    ],
    exercises: generateExercises(mapping)
  };
}

function generateExercises(mapping: any) {
  return [
    {
      type: 'code_conversion',
      question: `Convert this ${mapping.source} code to ${mapping.target}:`,
      code: mapping.source,
      solution: mapping.target,
      hints: [mapping.explanation]
    },
    {
      type: 'fill_in_blanks',
      question: 'Complete the conversion:',
      template: mapping.target.replace(/\w+/g, '___'),
      solution: mapping.target,
      hints: [mapping.explanation]
    }
  ];
}

export function generateLanguagePairCurriculum(sourceLang: string, targetLang: string) {
  return {
    basics: {
      title: `${targetLang} Basics for ${sourceLang} Developers`,
      units: [
        {
          title: 'Getting Started',
          lessons: [
            {
              title: 'Your First Program',
              content: generateLessonContent(sourceLang, targetLang, 'print')
            },
            {
              title: 'Variables and Types',
              content: generateLessonContent(sourceLang, targetLang, 'variables')
            }
          ]
        },
        {
          title: 'Functions and Methods',
          lessons: [
            {
              title: 'Writing Functions',
              content: generateLessonContent(sourceLang, targetLang, 'functions')
            }
          ]
        }
      ]
    }
  };
}
