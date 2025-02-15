export const englishToGoCurriculum = {
  sections: [
    {
      id: 'basics',
      title: 'From English to Go: Getting Started',
      description: 'Learn how to translate everyday concepts into Go code',
      units: [
        {
          id: 'unit_1',
          title: 'Program Structure',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Basic Program Setup',
              content: {
                theory: 'Go programs are organized into packages',
                examples: [
                  {
                    source: `Create a program that:
1. Belongs to main package
2. Uses formatting tools
3. Shows "Hello, World!"`,
                    target: `package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`,
                    explanation: 'Go programs need a package, imports, and a main function'
                  }
                ],
                exercises: [
                  {
                    type: 'english_to_code',
                    question: 'Convert these English instructions to Go:',
                    statements: [
                      'Create a program that:',
                      '1. Shows "Starting..."',
                      '2. Shows "Processing"',
                      '3. Shows "Done!"'
                    ],
                    solution: `package main

import "fmt"

func main() {
    fmt.Println("Starting...")
    fmt.Println("Processing")
    fmt.Println("Done!")
}`,
                    hints: [
                      'Start with package main',
                      'Import fmt package',
                      'Use main function',
                      'fmt.Println for output'
                    ]
                  }
                ]
              }
            },
            {
              id: 'lesson_1_2',
              title: 'Variables and Types',
              content: {
                theory: 'Go has static typing with type inference',
                examples: [
                  {
                    source: `Store the number 42 in a box labeled "age"
Store the text "Go" in a box labeled "language"
Let Go figure out the types automatically`,
                    target: `age := 42
language := "Go"

// Or with explicit types:
var age int = 42
var language string = "Go"`,
                    explanation: 'Go can infer types with := or use explicit var declarations'
                  }
                ],
                exercises: [
                  {
                    type: 'english_to_code',
                    question: 'Create these Go variables:',
                    statements: [
                      'Store 99.9 in "score"',
                      'Store "Programming" in "activity"',
                      'Store yes/no in "isComplete"',
                      'Show all values'
                    ],
                    solution: `score := 99.9
activity := "Programming"
isComplete := true

fmt.Printf("Score: %.1f, Activity: %s, Complete: %v\\n", 
           score, activity, isComplete)`,
                    hints: [
                      'Use := for short declaration',
                      'Printf for formatted output',
                      'Use %f, %s, %v formatters',
                      'Add \\n for newline'
                    ]
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'unit_2',
          title: 'Slices and Maps',
          lessons: [
            {
              id: 'lesson_2_1',
              title: 'Working with Collections',
              content: {
                theory: 'Go uses slices for dynamic arrays and maps for key-value pairs',
                examples: [
                  {
                    source: `Create a list of numbers: 1, 2, 3
Create a dictionary of ages:
- "Alice" is 25
- "Bob" is 30`,
                    target: `numbers := []int{1, 2, 3}
ages := map[string]int{
    "Alice": 25,
    "Bob":   30,
}`,
                    explanation: 'Slices use [] and maps use map[keyType]valueType'
                  }
                ],
                exercises: [
                  {
                    type: 'english_to_code',
                    question: 'Create these Go collections:',
                    statements: [
                      'Create a list of colors: "red", "blue", "green"',
                      'Create a dictionary of scores:',
                      '- "Math" is 95',
                      '- "Science" is 88',
                      'Show all items'
                    ],
                    solution: `colors := []string{"red", "blue", "green"}
scores := map[string]int{
    "Math":    95,
    "Science": 88,
}

fmt.Println("Colors:", colors)
fmt.Println("Scores:", scores)`,
                    hints: [
                      'Use []type for slices',
                      'map[string]int for scores',
                      'Use := for declaration',
                      'Println for simple output'
                    ]
                  }
                ]
              }
            }
          ]
        }
      ]
    },
    {
      id: 'advanced',
      title: 'Go Concurrency',
      description: 'Learn Go-specific concurrency features',
      units: [
        {
          id: 'unit_1',
          title: 'Goroutines and Channels',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Basic Concurrency',
              content: {
                theory: 'Go makes concurrent programming simple with goroutines and channels',
                examples: [
                  {
                    source: `Create two tasks that run at the same time:
1. Count from 1 to 3
2. Show "Working..."
Wait for both to finish`,
                    target: `func main() {
    done := make(chan bool)
    
    go func() {
        for i := 1; i <= 3; i++ {
            fmt.Println(i)
            time.Sleep(time.Second)
        }
        done <- true
    }()
    
    go func() {
        fmt.Println("Working...")
        time.Sleep(time.Second * 2)
        done <- true
    }()
    
    <-done
    <-done
}`,
                    explanation: 'go keyword starts goroutines, channels coordinate them'
                  }
                ],
                exercises: [
                  {
                    type: 'english_to_code',
                    question: 'Create these concurrent tasks:',
                    statements: [
                      'Create two tasks that run together:',
                      '1. Show "Processing..." every second, 3 times',
                      '2. Show "Waiting..." every 2 seconds, 2 times',
                      'Wait for both to finish'
                    ],
                    solution: `package main

import (
    "fmt"
    "time"
)

func main() {
    done := make(chan bool)
    
    go func() {
        for i := 0; i < 3; i++ {
            fmt.Println("Processing...")
            time.Sleep(time.Second)
        }
        done <- true
    }()
    
    go func() {
        for i := 0; i < 2; i++ {
            fmt.Println("Waiting...")
            time.Sleep(time.Second * 2)
        }
        done <- true
    }()
    
    <-done
    <-done
}`,
                    hints: [
                      'Use go keyword',
                      'Create channel with make',
                      'time.Sleep for delays',
                      'Wait for both signals'
                    ]
                  }
                ]
              }
            }
          ]
        }
      ]
    }
  ]
};
