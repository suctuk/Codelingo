export const englishToRubyCurriculum = {
  sections: [
    {
      id: 'basics',
      title: 'From English to Ruby: Getting Started',
      description: 'Learn how to translate everyday concepts into Ruby code',
      units: [
        {
          id: 'unit_1',
          title: 'Ruby Basics',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Simple Expressions',
              content: {
                theory: 'Ruby is designed to be natural and expressive',
                examples: [
                  {
                    source: `Show the message "Hello, World!"
Calculate 2 plus 2
Check if 5 is greater than 3`,
                    target: `puts "Hello, World!"
puts 2 + 2
puts 5 > 3`,
                    explanation: 'Ruby reads almost like English and often omits parentheses'
                  }
                ],
                exercises: [
                  {
                    type: 'english_to_code',
                    question: 'Convert these English statements to Ruby:',
                    statements: [
                      'Show "Starting now"',
                      'Calculate 10 times 5',
                      'Check if 100 is less than 200',
                      'Show the result'
                    ],
                    solution: `puts "Starting now"
result = 10 * 5
is_less = 100 < 200
puts result
puts is_less`,
                    hints: [
                      'Use puts for output',
                      'No semicolons needed',
                      'Use snake_case names',
                      'Expressions return values'
                    ]
                  }
                ]
              }
            },
            {
              id: 'lesson_1_2',
              title: 'Variables and Types',
              content: {
                theory: 'Ruby variables are dynamic and flexible',
                examples: [
                  {
                    source: `Store the number 42 in a box labeled "age"
Store the text "Ruby" in a box labeled "language"
Store yes/no in a box labeled "is_fun"`,
                    target: `age = 42
language = "Ruby"
is_fun = true

puts "#{language} is fun: #{is_fun}"`,
                    explanation: 'Ruby variables don\'t need type declarations'
                  }
                ],
                exercises: [
                  {
                    type: 'english_to_code',
                    question: 'Create these Ruby variables:',
                    statements: [
                      'Store 99.9 in "score"',
                      'Store "Programming" in "activity"',
                      'Store no in "is_finished"',
                      'Show all values in one message'
                    ],
                    solution: `score = 99.9
activity = "Programming"
is_finished = false
puts "#{activity} score: #{score}, Finished: #{is_finished}"`,
                    hints: [
                      'No type declarations needed',
                      'Use string interpolation',
                      'true/false for yes/no',
                      'puts for output'
                    ]
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'unit_2',
          title: 'Collections and Blocks',
          lessons: [
            {
              id: 'lesson_2_1',
              title: 'Arrays and Iteration',
              content: {
                theory: 'Ruby has powerful array methods and block syntax',
                examples: [
                  {
                    source: `Create a list of numbers: 1, 2, 3
Add 4 to the list
For each number in the list:
    Show the number doubled`,
                    target: `numbers = [1, 2, 3]
numbers.push(4)
numbers.each do |num|
  puts num * 2
end`,
                    explanation: 'Ruby blocks use do...end and can iterate easily'
                  }
                ],
                exercises: [
                  {
                    type: 'english_to_code',
                    question: 'Create these Ruby collections and blocks:',
                    statements: [
                      'Create a list of names: "Alice", "Bob", "Charlie"',
                      'For each name:',
                      '    Show "Hello, [name]!"',
                      'Add "David" to the list'
                    ],
                    solution: `names = ["Alice", "Bob", "Charlie"]
names.each do |name|
  puts "Hello, #{name}!"
end
names.push("David")`,
                    hints: [
                      'Use [] for arrays',
                      'each for iteration',
                      'do |var| ... end for blocks',
                      'push or << to add items'
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
      title: 'Ruby Magic',
      description: 'Learn Ruby-specific features',
      units: [
        {
          id: 'unit_1',
          title: 'Classes and Objects',
          lessons: [
            {
              id: 'lesson_1_1',
              title: 'Creating Classes',
              content: {
                theory: 'Ruby classes are blueprints for objects',
                examples: [
                  {
                    source: `Create a Person blueprint with:
- a name
- an age
- ability to say hello`,
                    target: `class Person
  def initialize(name, age)
    @name = name
    @age = age
  end

  def say_hello
    puts "Hello, I'm #{@name}!"
  end
end

person = Person.new("Ruby", 25)
person.say_hello`,
                    explanation: 'Ruby classes use @ for instance variables'
                  }
                ],
                exercises: [
                  {
                    type: 'english_to_code',
                    question: 'Create this Ruby class:',
                    statements: [
                      'Create a Book blueprint with:',
                      '- title',
                      '- author',
                      '- ability to display info',
                      'Create a book and show its info'
                    ],
                    solution: `class Book
  def initialize(title, author)
    @title = title
    @author = author
  end

  def display_info
    puts "#{@title} by #{@author}"
  end
end

book = Book.new("Ruby Guide", "Alice Smith")
book.display_info`,
                    hints: [
                      'Use class keyword',
                      'define initialize method',
                      'Use @ for instance vars',
                      'new creates objects'
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
