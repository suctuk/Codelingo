export * from './pythonToJavaScript';
export * from './pythonToJava';
export * from './pythonToTypeScript';
export * from './javaScriptToJava';
export * from './javaToPython';
export * from './typeScriptToPython';
export * from './javaToJavaScript';
export * from './javaScriptToTypeScript';
export * from './pythonToCpp';
export * from './javaScriptToCpp';
export * from './englishToPython';
export * from './englishToJavaScript';
export * from './englishToJava';
export * from './englishToCpp';
export * from './englishToTypeScript';
export * from './englishToRust';
export * from './englishToC';
export * from './englishToRuby';
export * from './englishToR';
export * from './englishToGo';
export * from './swiftToJavaScript';
export * from './swiftToPython';
export * from './kotlinToJavaScript';
export * from './kotlinToPython';
export * from './phpToPython';
export * from './csharpToPython';
export * from './goToCpp';
export * from './goToJava';
export * from './goToJavaScript';
export * from './goToPython';
export * from './goToRuby';
export * from './goToRust';
export * from './goToTypeScript';
export * from './rubyToGo';
export * from './rubyToJava';
export * from './rubyToJavaScript';
export * from './rubyToPython';
export * from './rubyToRust';
export * from './rubyToTypescript';
export * from './rustToPython';
export * from './typescriptToRust';

export const supportedLanguages = [
  'english',
  'python',
  'javascript',
  'java',
  'typescript',
  'cpp',
  'rust',
  'c',
  'ruby',
  'r',
  'go',
  'swift',
  'kotlin',
  'php',
  'csharp'
] as const;

export type SupportedLanguage = typeof supportedLanguages[number];

export const languagePairs = [
  { source: 'english', target: 'python' },
  { source: 'english', target: 'javascript' },
  { source: 'english', target: 'java' },
  { source: 'english', target: 'cpp' },
  { source: 'english', target: 'typescript' },
  { source: 'english', target: 'rust' },
  { source: 'english', target: 'c' },
  { source: 'english', target: 'ruby' },
  { source: 'english', target: 'r' },
  { source: 'english', target: 'go' },
  { source: 'python', target: 'javascript' },
  { source: 'python', target: 'java' },
  { source: 'python', target: 'typescript' },
  { source: 'python', target: 'cpp' },
  { source: 'python', target: 'go' },
  { source: 'python', target: 'ruby' },
  { source: 'python', target: 'rust' },
  { source: 'javascript', target: 'python' },
  { source: 'javascript', target: 'java' },
  { source: 'javascript', target: 'typescript' },
  { source: 'javascript', target: 'cpp' },
  { source: 'javascript', target: 'ruby' },
  { source: 'typescript', target: 'python' },
  { source: 'typescript', target: 'rust' },
  { source: 'java', target: 'python' },
  { source: 'java', target: 'javascript' },
  { source: 'java', target: 'typescript' },
  { source: 'java', target: 'go' },
  { source: 'java', target: 'rust' },
  { source: 'cpp', target: 'python' },
  { source: 'cpp', target: 'javascript' },
  { source: 'cpp', target: 'typescript' },
  { source: 'cpp', target: 'go' },
  { source: 'cpp', target: 'rust' },
  { source: 'go', target: 'cpp' },
  { source: 'go', target: 'java' },
  { source: 'go', target: 'javascript' },
  { source: 'go', target: 'python' },
  { source: 'go', target: 'ruby' },
  { source: 'go', target: 'rust' },
  { source: 'go', target: 'typescript' },
  { source: 'ruby', target: 'go' },
  { source: 'ruby', target: 'java' },
  { source: 'ruby', target: 'javascript' },
  { source: 'ruby', target: 'python' },
  { source: 'ruby', target: 'rust' },
  { source: 'ruby', target: 'typescript' },
  { source: 'rust', target: 'python' },
  { source: 'swift', target: 'javascript' },
  { source: 'swift', target: 'python' },
  { source: 'kotlin', target: 'javascript' },
  { source: 'kotlin', target: 'python' },
  { source: 'php', target: 'python' },
  { source: 'csharp', target: 'python' }
] as const;

export interface LanguagePairInfo {
  source: SupportedLanguage;
  target: SupportedLanguage;
  displayName: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  prerequisites: SupportedLanguage[];
}

export const languagePairMetadata: Record<string, LanguagePairInfo> = {
  'english-python': {
    source: 'english',
    target: 'python',
    displayName: 'English to Python',
    description: 'Learn Python programming from plain English',
    difficulty: 'beginner',
    prerequisites: []
  },
  'english-javascript': {
    source: 'english',
    target: 'javascript',
    displayName: 'English to JavaScript',
    description: 'Learn JavaScript programming from plain English',
    difficulty: 'beginner',
    prerequisites: []
  },
  'python-javascript': {
    source: 'python',
    target: 'javascript',
    displayName: 'Python to JavaScript',
    description: 'Learn JavaScript using your Python knowledge',
    difficulty: 'beginner',
    prerequisites: ['python']
  },
  'python-java': {
    source: 'python',
    target: 'java',
    displayName: 'Python to Java',
    description: 'Transition from Python to Java',
    difficulty: 'intermediate',
    prerequisites: ['python']
  },
  'python-typescript': {
    source: 'python',
    target: 'typescript',
    displayName: 'Python to TypeScript',
    description: 'Learn TypeScript with Python background',
    difficulty: 'intermediate',
    prerequisites: ['python', 'javascript']
  },
  'javascript-java': {
    source: 'javascript',
    target: 'java',
    displayName: 'JavaScript to Java',
    description: 'Move from JavaScript to Java',
    difficulty: 'intermediate',
    prerequisites: ['javascript']
  },
  'java-python': {
    source: 'java',
    target: 'python',
    displayName: 'Java to Python',
    description: 'Learn Python from Java',
    difficulty: 'beginner',
    prerequisites: ['java']
  },
  'typescript-python': {
    source: 'typescript',
    target: 'python',
    displayName: 'TypeScript to Python',
    description: 'Switch from TypeScript to Python',
    difficulty: 'intermediate',
    prerequisites: ['typescript']
  },
  'java-javascript': {
    source: 'java',
    target: 'javascript',
    displayName: 'Java to JavaScript',
    description: 'Move from Java to JavaScript',
    difficulty: 'intermediate',
    prerequisites: ['java']
  },
  'javascript-typescript': {
    source: 'javascript',
    target: 'typescript',
    displayName: 'JavaScript to TypeScript',
    description: 'Add static typing to your JavaScript code',
    difficulty: 'beginner',
    prerequisites: ['javascript']
  },
  'python-cpp': {
    source: 'python',
    target: 'cpp',
    displayName: 'Python to C++',
    description: 'Learn C++ from Python with focus on memory management',
    difficulty: 'advanced',
    prerequisites: ['python']
  },
  'javascript-cpp': {
    source: 'javascript',
    target: 'cpp',
    displayName: 'JavaScript to C++',
    description: 'Move from JavaScript to C++ with static typing',
    difficulty: 'advanced',
    prerequisites: ['javascript']
  },
  'english-java': {
    source: 'english',
    target: 'java',
    displayName: 'English to Java',
    description: 'Learn Java programming from plain English',
    difficulty: 'beginner',
    prerequisites: []
  },
  'english-cpp': {
    source: 'english',
    target: 'cpp',
    displayName: 'English to C++',
    description: 'Learn C++ programming from plain English',
    difficulty: 'intermediate',
    prerequisites: []
  },
  'english-typescript': {
    source: 'english',
    target: 'typescript',
    displayName: 'English to TypeScript',
    description: 'Learn TypeScript programming from plain English',
    difficulty: 'intermediate',
    prerequisites: []
  },
  'english-rust': {
    source: 'english',
    target: 'rust',
    displayName: 'English to Rust',
    description: 'Learn Rust programming from plain English',
    difficulty: 'advanced',
    prerequisites: []
  },
  'english-c': {
    source: 'english',
    target: 'c',
    displayName: 'English to C',
    description: 'Learn C programming from plain English',
    difficulty: 'advanced',
    prerequisites: []
  },
  'english-ruby': {
    source: 'english',
    target: 'ruby',
    displayName: 'English to Ruby',
    description: 'Learn Ruby programming from plain English',
    difficulty: 'beginner',
    prerequisites: []
  },
  'english-r': {
    source: 'english',
    target: 'r',
    displayName: 'English to R',
    description: 'Learn R programming and data analysis from plain English',
    difficulty: 'intermediate',
    prerequisites: []
  },
  'english-go': {
    source: 'english',
    target: 'go',
    displayName: 'English to Go',
    description: 'Learn Go programming from plain English',
    difficulty: 'intermediate',
    prerequisites: []
  },
  'python-rust': {
    source: 'python',
    target: 'rust',
    displayName: 'Python to Rust',
    description: 'Transition from Python to Rust with focus on memory safety',
    difficulty: 'advanced',
    prerequisites: ['python']
  },
  'python-go': {
    source: 'python',
    target: 'go',
    displayName: 'Python to Go',
    description: 'Move from Python to Go with focus on concurrency',
    difficulty: 'intermediate',
    prerequisites: ['python']
  },
  'javascript-rust': {
    source: 'javascript',
    target: 'rust',
    displayName: 'JavaScript to Rust',
    description: 'Learn Rust coming from JavaScript',
    difficulty: 'advanced',
    prerequisites: ['javascript']
  },
  'javascript-go': {
    source: 'javascript',
    target: 'go',
    displayName: 'JavaScript to Go',
    description: 'Transition from JavaScript to Go',
    difficulty: 'intermediate',
    prerequisites: ['javascript']
  },
  'java-rust': {
    source: 'java',
    target: 'rust',
    displayName: 'Java to Rust',
    description: 'Move from Java to Rust with focus on memory management',
    difficulty: 'advanced',
    prerequisites: ['java']
  },
  'java-go': {
    source: 'java',
    target: 'go',
    displayName: 'Java to Go',
    description: 'Learn Go coming from Java',
    difficulty: 'intermediate',
    prerequisites: ['java']
  },
  'typescript-rust': {
    source: 'typescript',
    target: 'rust',
    displayName: 'TypeScript to Rust',
    description: 'Learn Rust with TypeScript background',
    difficulty: 'advanced',
    prerequisites: ['typescript']
  },
  'typescript-go': {
    source: 'typescript',
    target: 'go',
    displayName: 'TypeScript to Go',
    description: 'Move from TypeScript to Go',
    difficulty: 'intermediate',
    prerequisites: ['typescript']
  },
  'rust-go': {
    source: 'rust',
    target: 'go',
    displayName: 'Rust to Go',
    description: 'Learn Go coming from Rust',
    difficulty: 'intermediate',
    prerequisites: ['rust']
  }
};

export function getCurriculum(source: SupportedLanguage, target: SupportedLanguage) {
  const key = `${source}-${target}`;
  switch (key) {
    case 'english-python':
      return import('./englishToPython').then(m => m.englishToPythonCurriculum);
    case 'english-javascript':
      return import('./englishToJavaScript').then(m => m.englishToJavaScriptCurriculum);
    case 'python-javascript':
      return import('./pythonToJavaScript').then(m => m.pythonToJavaScriptCurriculum);
    case 'python-java':
      return import('./pythonToJava').then(m => m.pythonToJavaCurriculum);
    case 'python-typescript':
      return import('./pythonToTypeScript').then(m => m.pythonToTypeScriptCurriculum);
    case 'javascript-java':
      return import('./javaScriptToJava').then(m => m.javaScriptToJavaCurriculum);
    case 'java-python':
      return import('./javaToPython').then(m => m.javaToPythonCurriculum);
    case 'typescript-python':
      return import('./typeScriptToPython').then(m => m.typeScriptToPythonCurriculum);
    case 'java-javascript':
      return import('./javaToJavaScript').then(m => m.javaToJavaScriptCurriculum);
    case 'javascript-typescript':
      return import('./javaScriptToTypeScript').then(m => m.javaScriptToTypeScriptCurriculum);
    case 'python-cpp':
      return import('./pythonToCpp').then(m => m.pythonToCppCurriculum);
    case 'javascript-cpp':
      return import('./javaScriptToCpp').then(m => m.javaScriptToCppCurriculum);
    case 'english-java':
      return import('./englishToJava').then(m => m.englishToJavaCurriculum);
    case 'english-cpp':
      return import('./englishToCpp').then(m => m.englishToCppCurriculum);
    case 'english-typescript':
      return import('./englishToTypeScript').then(m => m.englishToTypeScriptCurriculum);
    case 'english-rust':
      return import('./englishToRust').then(m => m.englishToRustCurriculum);
    case 'english-c':
      return import('./englishToC').then(m => m.englishToCCurriculum);
    case 'english-ruby':
      return import('./englishToRuby').then(m => m.englishToRubyCurriculum);
    case 'english-r':
      return import('./englishToR').then(m => m.englishToRCurriculum);
    case 'english-go':
      return import('./englishToGo').then(m => m.englishToGoCurriculum);
    case 'python-rust':
      return import('./pythonToRust').then(m => m.pythonToRustCurriculum);
    case 'python-go':
      return import('./pythonToGo').then(m => m.pythonToGoCurriculum);
    case 'javascript-rust':
      return import('./javascriptToRust').then(m => m.javascriptToRustCurriculum);
    case 'javascript-go':
      return import('./javascriptToGo').then(m => m.javascriptToGoCurriculum);
    case 'java-rust':
      return import('./javaToRust').then(m => m.javaToRustCurriculum);
    case 'java-go':
      return import('./javaToGo').then(m => m.javaToGoCurriculum);
    case 'typescript-rust':
      return import('./typescriptToRust').then(m => m.typescriptToRustCurriculum);
    case 'typescript-go':
      return import('./typescriptToGo').then(m => m.typescriptToGoCurriculum);
    case 'rust-go':
      return import('./rustToGo').then(m => m.rustToGoCurriculum);
    default:
      throw new Error(`Unsupported language pair: ${key}`);
  }
}

export function getRecommendedPath(
  source: SupportedLanguage,
  currentLevel: 'beginner' | 'intermediate' | 'advanced'
): SupportedLanguage[] {
  const paths: Record<SupportedLanguage, SupportedLanguage[][]> = {
    python: [
      ['javascript', 'typescript', 'java'], // Beginner path
      ['typescript', 'java'], // Intermediate path
      ['java'] // Advanced path
    ],
    javascript: [
      ['typescript', 'python'], // Beginner path
      ['java', 'python'], // Intermediate path
      ['java'] // Advanced path
    ],
    java: [
      ['javascript', 'python'], // Beginner path
      ['typescript', 'python'], // Intermediate path
      ['typescript'] // Advanced path
    ],
    typescript: [
      ['javascript', 'python'], // Beginner path
      ['java', 'python'], // Intermediate path
      ['java'] // Advanced path
    ]
  };

  const levelIndex = {
    beginner: 0,
    intermediate: 1,
    advanced: 2
  }[currentLevel];

  return paths[source][levelIndex] || [];
}
