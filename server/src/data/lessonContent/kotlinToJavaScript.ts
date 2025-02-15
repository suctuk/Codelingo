import { createLanguagePairCurriculum } from './languagePairFactory';

export const kotlinToJavaScriptCurriculum = {
  ...createLanguagePairCurriculum('kotlin', 'javascript'),
  sections: [
    {
      id: 'section_1_basics',
      title: 'JavaScript Fundamentals',
      description: 'Learn JavaScript basics from a Kotlin perspective',
      units: [
        {
          id: 'unit_1_types',
          title: 'Variables and Types',
          description: 'Learn JavaScript variables and types',
          skillLevel: 'beginner',
          xpToUnlock: 0,
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Variable Declaration',
              estimatedTime: 10,
              content: {
                theory: 'Converting Kotlin variables to JavaScript',
                difficulty: 'beginner',
                xpPoints: 10,
                examples: [
                  {
                    source: `val name: String = "Alice"
var age: Int = 25
val height: Double = 1.75
var isActive: Boolean = true
val score = 95 // Type inference`,
                    target: `const name = "Alice"
let age = 25
const height = 1.75
let isActive = true
const score = 95  // Dynamic typing`,
                    explanation: 'JavaScript uses let/const and dynamic typing'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert Kotlin variables to JavaScript',
                    code: '___ message = "Hello"\n___ count = 42\n___ isValid = true',
                    solution: 'const message = "Hello"\nlet count = 42\nlet isValid = true',
                    hints: ['Use const for val', 'Use let for var', 'No type annotations'],
                    xpReward: 5
                  }
                ]
              }
            },
            {
              id: 'lesson_1_2',
              title: 'Null Safety',
              estimatedTime: 15,
              content: {
                theory: 'Converting Kotlin null safety to JavaScript',
                difficulty: 'beginner',
                xpPoints: 15,
                examples: [
                  {
                    source: `var name: String? = null
println(name?.length)
val length = name?.length ?: 0
name!!.length // Force unwrap`,
                    target: `let name = null
console.log(name?.length)
const length = name?.length ?? 0
if (!name) throw new Error()  // Force unwrap`,
                    explanation: 'JavaScript uses optional chaining and nullish coalescing'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert Kotlin null safety to JavaScript',
                    code: 'const user = ___\nconst displayName = user___.name ___ "Anonymous"',
                    solution: 'const user = null\nconst displayName = user?.name ?? "Anonymous"',
                    hints: ['Use optional chaining ?.', 'Use nullish coalescing ??'],
                    xpReward: 8
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'unit_2_functions',
          title: 'Functions',
          description: 'Learn JavaScript functions',
          skillLevel: 'beginner',
          xpToUnlock: 50,
          lessons: [
            {
              id: 'lesson_2_1',
              title: 'Function Definition',
              estimatedTime: 20,
              content: {
                theory: 'Converting Kotlin functions to JavaScript',
                difficulty: 'beginner',
                xpPoints: 20,
                examples: [
                  {
                    source: `fun greet(name: String): String {
    return "Hello, $name!"
}

fun add(a: Int, b: Int) = a + b

val multiply = { x: Int, y: Int -> x * y }`,
                    target: `function greet(name) {
    return \`Hello, \${name}!\`
}

const add = (a, b) => a + b

const multiply = (x, y) => x * y`,
                    explanation: 'JavaScript uses function keyword or arrow functions'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert Kotlin function to JavaScript',
                    code: '___ divide(x, y) {\n    ___ x / y\n}',
                    solution: 'function divide(x, y) {\n    return x / y\n}',
                    hints: ['Use function keyword', 'Add return statement'],
                    xpReward: 10
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'unit_3_classes',
          title: 'Classes',
          description: 'Learn JavaScript classes',
          skillLevel: 'intermediate',
          xpToUnlock: 100,
          lessons: [
            {
              id: 'lesson_3_1',
              title: 'Data Classes',
              estimatedTime: 25,
              content: {
                theory: 'Converting Kotlin data classes to JavaScript',
                difficulty: 'intermediate',
                xpPoints: 25,
                examples: [
                  {
                    source: `data class Person(
    val name: String,
    var age: Int
) {
    fun greet() = "Hello, I'm $name!"
}`,
                    target: `class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    
    greet() {
        return \`Hello, I'm \${this.name}!\`
    }
    
    toString() {
        return \`Person(name=\${this.name}, age=\${this.age})\`
    }
}`,
                    explanation: 'JavaScript needs explicit toString for data class behavior'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert Kotlin data class to JavaScript',
                    code: 'class Rectangle {\n    ___(width, height) {\n        this.___ = width\n        this.___ = height\n    }\n\n    toString() {\n        return \`Rectangle(width=\${___}, height=\${___})\`\n    }\n}',
                    solution: 'class Rectangle {\n    constructor(width, height) {\n        this.width = width\n        this.height = height\n    }\n\n    toString() {\n        return \`Rectangle(width=\${this.width}, height=\${this.height})\`\n    }\n}',
                    hints: ['Use constructor', 'Use this.property', 'Template literals'],
                    xpReward: 15
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'unit_4_coroutines',
          title: 'Asynchronous Programming',
          description: 'Learn JavaScript async/await',
          skillLevel: 'advanced',
          xpToUnlock: 150,
          lessons: [
            {
              id: 'lesson_4_1',
              title: 'Coroutines to Async/Await',
              estimatedTime: 30,
              content: {
                theory: 'Converting Kotlin coroutines to JavaScript async/await',
                difficulty: 'advanced',
                xpPoints: 30,
                examples: [
                  {
                    source: `suspend fun fetchUser(): User {
    delay(1000)
    return User("Alice")
}

launch {
    val user = fetchUser()
    println(user)
}

runBlocking {
    val result = async { fetchData() }
    println(await(result))
}`,
                    target: `async function fetchUser() {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return new User("Alice")
}

(async () => {
    const user = await fetchUser()
    console.log(user)
})()

async function main() {
    const result = await fetchData()
    console.log(result)
}`,
                    explanation: 'JavaScript uses async/await for asynchronous code'
                  }
                ],
                exercises: [
                  {
                    type: 'code_completion',
                    question: 'Convert Kotlin coroutine to JavaScript',
                    code: '___ function getData() {\n    ___ fetch("api/data")\n}\n\n___ () => {\n    const data = ___ getData()\n    console.log(data)\n})()',
                    solution: 'async function getData() {\n    return await fetch("api/data")\n}\n\n(async () => {\n    const data = await getData()\n    console.log(data)\n})()',
                    hints: ['Use async keyword', 'Use await keyword', 'IIFE with async'],
                    xpReward: 20
                  }
                ],
                practice: {
                  type: 'code_project',
                  instructions: 'Create an async function that fetches user data and handles errors',
                  testCases: [
                    {
                      input: 'fetchUserData("123")',
                      expectedOutput: '{ name: "Alice", id: "123" }',
                      code: `async function fetchUserData(id) {
    try {
        const response = await fetch(\`/api/users/\${id}\`)
        if (!response.ok) throw new Error('User not found')
        return await response.json()
    } catch (error) {
        console.error(\`Error: \${error.message}\`)
        return null
    }
}`
                    }
                  ],
                  xpReward: 25
                }
              }
            }
          ]
        }
      ]
    }
  ]
};
