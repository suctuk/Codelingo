export const englishToRCurriculum = {
  sections: [
    {
      id: 'basics',
      title: 'From English to R: Getting Started',
      description: 'Learn how to translate everyday concepts into R code',
      units: [
        {
          id: 'unit_1',
          title: 'R Basics',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Basic Operations',
              content: {
                theory: 'R is designed for statistical computing and data analysis',
                examples: [
                  {
                    source: `Create a list of numbers: 1, 2, 3, 4, 5
Calculate their average
Show the result`,
                    target: `numbers <- c(1, 2, 3, 4, 5)
avg <- mean(numbers)
print(avg)`,
                    explanation: 'R uses <- for assignment and c() for combining values'
                  }
                ],
                exercises: [
                  {
                    type: 'english_to_code',
                    question: 'Convert these English statements to R:',
                    statements: [
                      'Create temperatures: 98.6, 97.5, 99.1',
                      'Calculate their average',
                      'Find the highest temperature',
                      'Show both results'
                    ],
                    solution: `temps <- c(98.6, 97.5, 99.1)
avg_temp <- mean(temps)
max_temp <- max(temps)
print(paste("Average:", avg_temp))
print(paste("Maximum:", max_temp))`,
                    hints: [
                      'Use c() for vectors',
                      '<- for assignment',
                      'mean() for average',
                      'max() for highest'
                    ]
                  }
                ]
              }
            },
            {
              id: 'lesson_1_2',
              title: 'Data Frames',
              content: {
                theory: 'Data frames are R\'s primary data structure for analysis',
                examples: [
                  {
                    source: `Create a table with:
- Names: "Alice", "Bob", "Charlie"
- Ages: 25, 30, 35
- Scores: 90, 85, 95`,
                    target: `data <- data.frame(
  name = c("Alice", "Bob", "Charlie"),
  age = c(25, 30, 35),
  score = c(90, 85, 95)
)
print(data)`,
                    explanation: 'Data frames combine different types of data in columns'
                  }
                ],
                exercises: [
                  {
                    type: 'english_to_code',
                    question: 'Create this R data frame:',
                    statements: [
                      'Create a student table with:',
                      '- IDs: 1, 2, 3',
                      '- Names: "John", "Jane", "Bob"',
                      '- Grades: 88, 92, 85',
                      'Show the average grade'
                    ],
                    solution: `students <- data.frame(
  id = c(1, 2, 3),
  name = c("John", "Jane", "Bob"),
  grade = c(88, 92, 85)
)
print(students)
print(paste("Average grade:", mean(students$grade)))`,
                    hints: [
                      'Use data.frame()',
                      'c() for column values',
                      'Use $ to access columns',
                      'mean() for average'
                    ]
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'unit_2',
          title: 'Data Visualization',
          lessons: [
            {
              id: 'lesson_2_1',
              title: 'Basic Plotting',
              content: {
                theory: 'R has powerful built-in plotting capabilities',
                examples: [
                  {
                    source: `Create points: 1,2,3,4,5
Create values: 2,4,6,8,10
Make a line plot`,
                    target: `x <- 1:5
y <- x * 2
plot(x, y, type="l", main="Line Plot")`,
                    explanation: 'R\'s plot function creates various types of graphs'
                  }
                ],
                exercises: [
                  {
                    type: 'english_to_code',
                    question: 'Create these R plots:',
                    statements: [
                      'Create months: 1 to 12',
                      'Create sales: 100,120,150,130,160,180,200,190,170,150,140,180',
                      'Make a line plot with title "Monthly Sales"'
                    ],
                    solution: `months <- 1:12
sales <- c(100,120,150,130,160,180,200,190,170,150,140,180)
plot(months, sales, type="l", 
     main="Monthly Sales",
     xlab="Month",
     ylab="Sales")`,
                    hints: [
                      'Use 1:12 for sequence',
                      'c() for sales values',
                      'type="l" for line plot',
                      'Add labels with xlab/ylab'
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
      title: 'Statistical Analysis',
      description: 'Learn R-specific statistical features',
      units: [
        {
          id: 'unit_1',
          title: 'Statistical Tests',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Basic Statistics',
              content: {
                theory: 'R provides many statistical functions',
                examples: [
                  {
                    source: `Create two groups of scores:
Group 1: 75, 80, 85, 90, 95
Group 2: 70, 75, 80, 85, 90
Compare their means`,
                    target: `group1 <- c(75, 80, 85, 90, 95)
group2 <- c(70, 75, 80, 85, 90)
t.test(group1, group2)`,
                    explanation: 'R can perform statistical tests like t-tests'
                  }
                ],
                exercises: [
                  {
                    type: 'english_to_code',
                    question: 'Perform these statistical analyses:',
                    statements: [
                      'Create two sets of data:',
                      'Old method: 10,12,15,11,13',
                      'New method: 12,14,16,13,15',
                      'Compare them statistically'
                    ],
                    solution: `old <- c(10,12,15,11,13)
new <- c(12,14,16,13,15)
result <- t.test(old, new)
print(result)
print(paste("Old mean:", mean(old)))
print(paste("New mean:", mean(new)))`,
                    hints: [
                      'Use c() for data',
                      't.test() compares groups',
                      'mean() for averages',
                      'print results clearly'
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
