import { LanguagePairCurriculum } from '../curriculumTemplate';
import { generateLesson, commonConcepts } from '../lessonGenerator';
import { languageConfigs } from '../languagePairFactory';

const rustToPythonSpecificConcepts = {
  'ownership': {
    source: 'fn process(s: String) {\n    println!("{}", s);\n}',
    target: 'def process(s: str) -> None:\n    print(s)',
    explanation: 'Python handles memory automatically, no ownership system needed',
    examples: [
      {
        source: 'let mut s = String::from("hello");\ns.push_str(" world");',
        target: 's = "hello"\ns += " world"',
        explanation: 'String mutations are simpler in Python'
      }
    ]
  },
  'result-type': {
    source: 'fn divide(x: f64, y: f64) -> Result<f64, &\'static str> {\n    if y == 0.0 {\n        Err("division by zero")\n    } else {\n        Ok(x / y)\n    }\n}',
    target: 'def divide(x: float, y: float) -> float:\n    if y == 0.0:\n        raise ValueError("division by zero")\n    return x / y',
    explanation: 'Rust Results become Python exceptions',
    examples: [
      {
        source: 'match result {\n    Ok(value) => println!("{}", value),\n    Err(e) => eprintln!("{}", e),\n}',
        target: 'try:\n    value = result()\n    print(value)\nexcept Exception as e:\n    print(f"Error: {e}", file=sys.stderr)',
        explanation: 'Match on Result becomes try-except'
      }
    ]
  },
  'pattern-matching': {
    source: 'match value {\n    0 => println!("zero"),\n    1 | 2 => println!("one or two"),\n    _ => println!("other"),\n}',
    target: 'match value:\n    case 0:\n        print("zero")\n    case 1 | 2:\n        print("one or two")\n    case _:\n        print("other")',
    explanation: 'Rust pattern matching maps to Python match statements (3.10+)',
    examples: [
      {
        source: 'match opt {\n    Some(x) => x,\n    None => 0,\n}',
        target: 'x if x is not None else 0',
        explanation: 'Option matching becomes None check'
      }
    ]
  }
};

export const rustToPython: LanguagePairCurriculum = {
  sourceLanguage: 'Rust',
  targetLanguage: 'Python',
  sections: [
    {
      id: 'section_1_fundamentals',
      title: 'Python Fundamentals for Rust Developers',
      description: 'Learn Python basics coming from Rust',
      units: [
        {
          id: 'unit_1_1_basics',
          title: 'Basic Syntax',
          description: 'Learn Python syntax differences from Rust',
          lessons: [
            {
              id: 'lesson_1_1_1',
              title: 'Variables and Types',
              content: {
                theory: 'Python uses dynamic typing and simpler variable declarations',
                difficulty: 'beginner',
                xpPoints: 15,
                examples: [
                  {
                    source: 'let x: i32 = 42;\nlet mut y: String = String::from("hello");',
                    target: 'x = 42  # type hints optional\ny: str = "hello"  # type hints if desired',
                    explanation: 'Python variables are simpler and mutable by default'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Rust code to Python',
                    code: 'let name: String = String::from("John");\nlet age: i32 = 30;\nprintln!("{} is {} years old", name, age);',
                    solution: 'name = "John"\nage = 30\nprint(f"{name} is {age} years old")',
                    hints: [
                      'Remove type annotations',
                      'Use simple assignment',
                      'Use f-strings for formatting',
                      'No semicolons needed'
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
          id: 'unit_1_2_collections',
          title: 'Collections',
          description: 'Learn Python collections compared to Rust',
          lessons: [
            {
              id: 'lesson_1_2_1',
              title: 'Lists and Vectors',
              content: {
                theory: 'Python lists are similar to Rust vectors but with dynamic typing',
                difficulty: 'beginner',
                xpPoints: 20,
                examples: [
                  {
                    source: 'let mut vec: Vec<i32> = Vec::new();\nvec.push(1);\nvec.push(2);',
                    target: 'vec = []\nvec.append(1)\nvec.append(2)',
                    explanation: 'Python lists are more flexible than Rust vectors'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Rust vector code to Python',
                    code: 'let mut numbers: Vec<i32> = vec![1, 2, 3];\nnumbers.push(4);\nfor num in numbers.iter() {\n    println!("{}", num);\n}',
                    solution: 'numbers = [1, 2, 3]\nnumbers.append(4)\nfor num in numbers:\n    print(num)',
                    hints: [
                      'Use list syntax []',
                      'Use append for adding items',
                      'Simpler for loop syntax',
                      'No explicit iteration needed'
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
      title: 'Advanced Python Patterns',
      description: 'Learn Python-specific patterns coming from Rust',
      units: [
        {
          id: 'unit_2_1_error',
          title: 'Error Handling',
          description: 'Learn Python error handling compared to Rust',
          lessons: [
            {
              id: 'lesson_2_1_1',
              title: 'Exceptions vs Results',
              content: {
                theory: 'Python uses exceptions instead of Result types',
                difficulty: 'intermediate',
                xpPoints: 30,
                examples: [
                  {
                    source: 'fn process_file(path: &str) -> Result<String, std::io::Error> {\n    std::fs::read_to_string(path)\n}',
                    target: 'def process_file(path: str) -> str:\n    try:\n        with open(path) as f:\n            return f.read()\n    except IOError as e:\n        raise',
                    explanation: 'Error handling with exceptions instead of Results'
                  }
                ],
                exercises: [
                  {
                    type: 'code_conversion',
                    question: 'Convert this Rust Result handling to Python',
                    code: 'fn get_user_data(id: i32) -> Result<User, Error> {\n    if id < 0 {\n        return Err(Error::new("invalid id"));\n    }\n    Ok(User { id })\n}',
                    solution: 'def get_user_data(id: int) -> User:\n    if id < 0:\n        raise ValueError("invalid id")\n    return User(id=id)',
                    hints: [
                      'Use exceptions for errors',
                      'raise for error cases',
                      'Return directly for success',
                      'No Result wrapper needed'
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
    prerequisites: ['Basic Rust knowledge'],
    learningOutcomes: [
      'Write Python code confidently',
      'Understand key differences between Rust and Python',
      'Handle errors with exceptions',
      'Work with Python collections',
      'Use Python\'s dynamic typing effectively'
    ]
  }
};
