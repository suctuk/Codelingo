import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { CodeMascot } from '../../components/characters/CodeMascot';
import { CodeBlock } from '../../components/code/CodeBlock';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DraggableList from '../../components/DraggableList';
import TextInput from '../../components/TextInput';

interface LessonChallenge {
  id: number;
  type: 'translation' | 'matching' | 'fill_blank' | 'word_pool' | 'debug' | 'reorder' | 'output_prediction' | 'code_review' | 'refactoring' | 'pattern_matching' | 'time_complexity' | 'memory_quiz';
  prompt: string;
  fromCode?: string;
  toCode?: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  hints: string[];
  buggyCode?: string;
  bugDescription?: string;
  codeLines?: string[];
  expectedOutput?: string;
  reviewOptions?: {
    code: string;
    issues: string[];
  }[];
  patterns?: {
    name: string;
    example: string;
    description: string;
  }[];
  complexityOptions?: {
    code: string;
    timeComplexity: string;
    spaceComplexity: string;
  }[];
}

interface Character {
  type: 'robot' | 'computer' | 'ai';
  name: string;
  specialty: string;
}

interface PowerUp {
  id: string;
  type: 'hint' | 'time_freeze' | 'heart_boost' | 'xp_boost' | 'skip';
  name: string;
  description: string;
  icon: string;
  duration?: number;
  quantity: number;
}

export const LessonScreen = () => {
  const { colors } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [hearts, setHearts] = useState(5);
  const [activePowerUps, setActivePowerUps] = useState<PowerUp[]>([]);
  const [powerUps, setPowerUps] = useState<PowerUp[]>([
    {
      id: 'hint_boost',
      type: 'hint',
      name: 'Hint Boost',
      description: 'Get an extra hint for this challenge',
      icon: '💡',
      quantity: 3,
    },
    {
      id: 'time_freeze',
      type: 'time_freeze',
      name: 'Time Freeze',
      description: 'Freeze the timer for 30 seconds',
      icon: '⏸️',
      duration: 30,
      quantity: 2,
    },
    {
      id: 'heart_boost',
      type: 'heart_boost',
      name: 'Heart Boost',
      description: 'Get an extra heart',
      icon: '❤️',
      quantity: 1,
    },
  ]);
  const progressAnim = React.useRef(new Animated.Value(0)).current;

  // Mock data - replace with API calls
  const challenges: LessonChallenge[] = [
    {
      id: 1,
      type: 'translation',
      prompt: 'Convert this JavaScript code to Python:',
      fromCode: 'console.log("Hello, World!");',
      correctAnswer: 'print("Hello, World!")',
      explanation: 'In Python, we use print() instead of console.log() for output.',
      hints: ['Python uses print for console output', 'Syntax is similar but simpler'],
    },
    {
      id: 2,
      type: 'debug',
      prompt: 'Find and fix the bug in this Python code:',
      buggyCode: 'def calculate_average(numbers):\n    total = 0\n    for num in numbers\n        total += num\n    return total / len(numbers)',
      bugDescription: 'The code has a syntax error in the for loop.',
      correctAnswer: 'def calculate_average(numbers):\n    total = 0\n    for num in numbers:\n        total += num\n    return total / len(numbers)',
      explanation: 'Python for loops require a colon (:) after the loop condition.',
      hints: ['Check the for loop syntax', 'Python blocks need a specific character'],
    },
    {
      id: 3,
      type: 'reorder',
      prompt: 'Arrange these lines of code to create a valid Python function:',
      codeLines: [
        'def bubble_sort(arr):',
        'for i in range(len(arr)):',
        'for j in range(len(arr) - i - 1):',
        'if arr[j] > arr[j + 1]:',
        'arr[j], arr[j + 1] = arr[j + 1], arr[j]',
        'return arr'
      ],
      correctAnswer: '0,1,2,3,4,5',
      explanation: 'Bubble sort works by repeatedly comparing adjacent elements.',
      hints: ['Start with the function definition', 'Think about nested loops'],
    },
    {
      id: 4,
      type: 'output_prediction',
      prompt: 'What will this Python code output?',
      fromCode: 'x = 5\ny = 3\nprint(x * y)\nprint(x ** y)',
      correctAnswer: '15\n125',
      explanation: 'The * operator multiplies numbers, while ** is for exponentiation.',
      hints: ['* means multiplication', '** means power'],
      expectedOutput: '15\n125',
    },
    {
      id: 5,
      type: 'code_review',
      prompt: 'Review this code and identify potential issues:',
      reviewOptions: [
        {
          code: `def process_data(data):
    result = []
    for i in range(len(data)):
        item = data[i]
        result.append(item * 2)
    return result`,
          issues: [
            'Using index-based iteration instead of direct iteration',
            'No type hints',
            'No input validation',
            'Could use list comprehension',
          ],
        },
      ],
      correctAnswer: '0,2,3',
      explanation: 'The code could be improved by using direct iteration, adding type hints, and using list comprehension.',
      hints: ['Think about Python best practices', 'Consider performance implications'],
    },
    {
      id: 6,
      type: 'pattern_matching',
      prompt: 'Match these code patterns with their design patterns:',
      patterns: [
        {
          name: 'Singleton',
          example: `class Database:
    _instance = None
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance`,
          description: 'Ensures a class has only one instance',
        },
        {
          name: 'Observer',
          example: `class Subject:
    def __init__(self):
        self._observers = []
    def notify(self):
        for observer in self._observers:
            observer.update()`,
          description: 'Defines one-to-many dependency between objects',
        },
      ],
      correctAnswer: 'singleton,observer',
      explanation: 'Design patterns are reusable solutions to common problems in software design.',
      hints: ['Look for characteristic class structures', 'Think about object relationships'],
    },
    {
      id: 7,
      type: 'time_complexity',
      prompt: 'Analyze the time complexity of these algorithms:',
      complexityOptions: [
        {
          code: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,
          timeComplexity: 'O(log n)',
          spaceComplexity: 'O(1)',
        },
      ],
      correctAnswer: 'O(log n),O(1)',
      explanation: 'Binary search divides the search space in half each time, leading to logarithmic time complexity.',
      hints: ['Think about how the input size affects iterations', 'Consider memory usage'],
    },
  ];

  const character: Character = {
    type: 'robot',
    name: 'Byte',
    specialty: 'Python Basics',
  };

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    const isCorrect = answer === challenges[currentIndex].correctAnswer;
    
    if (!isCorrect) {
      setHearts(prev => Math.max(0, prev - 1));
    }

    setShowExplanation(true);
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    
    if (currentIndex < challenges.length - 1) {
      setCurrentIndex(prev => prev + 1);
      Animated.timing(progressAnim, {
        toValue: (currentIndex + 1) / challenges.length,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleUsePowerUp = (powerUp: PowerUp) => {
    if (powerUp.quantity <= 0) return;

    switch (powerUp.type) {
      case 'hint':
        const challenge = challenges[currentIndex];
        const unusedHints = challenge.hints.filter(
          hint => !shownHints.includes(hint)
        );
        if (unusedHints.length > 0) {
          setShownHints([...shownHints, unusedHints[0]]);
          setPowerUps(
            powerUps.map(p =>
              p.id === powerUp.id
                ? { ...p, quantity: p.quantity - 1 }
                : p
            )
          );
        }
        break;

      case 'time_freeze':
        setActivePowerUps([...activePowerUps, powerUp]);
        setPowerUps(
          powerUps.map(p =>
            p.id === powerUp.id
              ? { ...p, quantity: p.quantity - 1 }
              : p
          )
        );
        setTimeout(() => {
          setActivePowerUps(current =>
            current.filter(p => p.id !== powerUp.id)
          );
        }, (powerUp.duration || 0) * 1000);
        break;

      case 'heart_boost':
        setHearts(prev => prev + 1);
        setPowerUps(
          powerUps.map(p =>
            p.id === powerUp.id
              ? { ...p, quantity: p.quantity - 1 }
              : p
          )
        );
        break;
    }

    // Play power-up sound and vibration
    sounds.powerUp.play();
    Vibration.vibrate([0, 50, 50, 50]);
  };

  const renderProgress = () => (
    <View style={styles.progressContainer}>
      <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
        <Animated.View
          style={[
            styles.progressFill,
            {
              backgroundColor: colors.primary,
              width: progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </View>
      <View style={styles.hearts}>
        {[...Array(hearts)].map((_, i) => (
          <Icon
            key={i}
            name="heart"
            size={24}
            color={colors.error}
            style={styles.heart}
          />
        ))}
      </View>
    </View>
  );

  const renderChallenge = () => {
    const challenge = challenges[currentIndex];

    return (
      <View style={styles.challengeContainer}>
        <Text style={[styles.prompt, { color: colors.text.primary }]}>
          {challenge.prompt}
        </Text>

        {(challenge.fromCode || challenge.buggyCode) && (
          <View style={styles.codeContainer}>
            <CodeBlock
              code={challenge.fromCode || challenge.buggyCode || ''}
              language={challenge.type === 'translation' ? 'javascript' : 'python'}
              editable={challenge.type === 'debug'}
              onCodeChange={code => setSelectedAnswer(code)}
            />
          </View>
        )}

        {challenge.type === 'word_pool' && (
          <View style={styles.wordPool}>
            {challenge.options?.map((word) => (
              <TouchableOpacity
                key={word}
                style={[
                  styles.wordChip,
                  {
                    backgroundColor:
                      selectedAnswer?.includes(word)
                        ? colors.primary
                        : colors.surface,
                  },
                ]}
                onPress={() => {
                  const words = selectedAnswer ? selectedAnswer.split(',') : [];
                  if (words.includes(word)) {
                    setSelectedAnswer(
                      words.filter((w) => w !== word).join(',')
                    );
                  } else {
                    setSelectedAnswer([...words, word].join(','));
                  }
                }}
              >
                <Text
                  style={[
                    styles.wordText,
                    {
                      color: selectedAnswer?.includes(word)
                        ? colors.text.inverse
                        : colors.text.primary,
                    },
                  ]}
                >
                  {word}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {challenge.type === 'reorder' && (
          <DraggableList
            items={challenge.codeLines || []}
            onReorder={indices => setSelectedAnswer(indices.join(','))}
            renderItem={(item, isDragging) => (
              <View
                style={[
                  styles.codeLineItem,
                  {
                    backgroundColor: isDragging ? colors.primary + '20' : colors.surface,
                  },
                ]}
              >
                <CodeBlock code={item} language="python" />
              </View>
            )}
          />
        )}

        {challenge.type === 'output_prediction' && (
          <View style={styles.outputPrediction}>
            <View style={styles.codeContainer}>
              <CodeBlock
                code={challenge.fromCode || ''}
                language="python"
              />
            </View>
            <Text style={[styles.outputLabel, { color: colors.text.secondary }]}>
              Expected Output:
            </Text>
            <TextInput
              style={[
                styles.outputInput,
                {
                  backgroundColor: colors.surface,
                  color: colors.text.primary,
                },
              ]}
              multiline
              value={selectedAnswer}
              onChangeText={setSelectedAnswer}
              placeholder="Enter the expected output..."
              placeholderTextColor={colors.text.secondary}
            />
          </View>
        )}

        {challenge.type === 'code_review' && (
          <View style={styles.codeReview}>
            {challenge.reviewOptions?.map((option, index) => (
              <View key={index} style={styles.codeReviewOption}>
                <CodeBlock code={option.code} language="python" />
                <Text style={styles.codeReviewIssues}>
                  Issues:
                </Text>
                <Text style={styles.codeReviewIssueList}>
                  {option.issues.join(', ')}
                </Text>
              </View>
            ))}
          </View>
        )}

        {challenge.type === 'pattern_matching' && (
          <View style={styles.patternMatching}>
            {challenge.patterns?.map((pattern, index) => (
              <View key={index} style={styles.patternMatchingOption}>
                <Text style={styles.patternMatchingName}>
                  {pattern.name}
                </Text>
                <CodeBlock code={pattern.example} language="python" />
                <Text style={styles.patternMatchingDescription}>
                  {pattern.description}
                </Text>
              </View>
            ))}
          </View>
        )}

        {challenge.type === 'time_complexity' && (
          <View style={styles.timeComplexity}>
            {challenge.complexityOptions?.map((option, index) => (
              <View key={index} style={styles.timeComplexityOption}>
                <CodeBlock code={option.code} language="python" />
                <Text style={styles.timeComplexityLabel}>
                  Time Complexity:
                </Text>
                <Text style={styles.timeComplexityValue}>
                  {option.timeComplexity}
                </Text>
                <Text style={styles.timeComplexityLabel}>
                  Space Complexity:
                </Text>
                <Text style={styles.timeComplexityValue}>
                  {option.spaceComplexity}
                </Text>
              </View>
            ))}
          </View>
        )}

        {showExplanation && (
          <View
            style={[
              styles.explanation,
              {
                backgroundColor:
                  selectedAnswer === challenge.correctAnswer
                    ? colors.success + '20'
                    : colors.error + '20',
              },
            ]}
          >
            <CodeMascot
              type={character.type}
              name={character.name}
              emotion={
                selectedAnswer === challenge.correctAnswer
                  ? 'celebrating'
                  : 'explaining'
              }
              message={challenge.explanation}
              size="small"
            />
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {renderProgress()}
      <View style={styles.powerUpsContainer}>
        {powerUps.map(powerUp => (
          <TouchableOpacity
            key={powerUp.id}
            style={[
              styles.powerUpButton,
              {
                backgroundColor:
                  powerUp.quantity > 0 ? colors.primary : colors.border,
                opacity: powerUp.quantity > 0 ? 1 : 0.5,
              },
            ]}
            onPress={() => handleUsePowerUp(powerUp)}
            disabled={powerUp.quantity <= 0}
          >
            <Text style={styles.powerUpIcon}>{powerUp.icon}</Text>
            <Text style={[styles.powerUpCount, { color: colors.text.inverse }]}>
              {powerUp.quantity}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView style={styles.content}>{renderChallenge()}</ScrollView>
      {selectedAnswer && (
        <TouchableOpacity
          style={[styles.nextButton, { backgroundColor: colors.primary }]}
          onPress={handleNext}
        >
          <Text style={[styles.nextButtonText, { color: colors.text.inverse }]}>
            {currentIndex < challenges.length - 1 ? 'Continue' : 'Finish'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  progressContainer: {
    padding: 16,
    gap: 8,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  hearts: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  heart: {
    marginLeft: 4,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  challengeContainer: {
    gap: 16,
  },
  prompt: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  codeContainer: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  wordPool: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 16,
  },
  wordChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  wordText: {
    fontSize: 16,
    fontWeight: '500',
  },
  explanation: {
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  nextButton: {
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  codeLineItem: {
    padding: 8,
    borderRadius: 8,
    marginVertical: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  outputPrediction: {
    gap: 16,
  },
  outputLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  outputInput: {
    borderRadius: 8,
    padding: 12,
    minHeight: 100,
    textAlignVertical: 'top',
    fontFamily: 'monospace',
  },
  powerUpsContainer: {
    flexDirection: 'row',
    padding: 8,
    gap: 8,
  },
  powerUpButton: {
    padding: 8,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 4,
  },
  powerUpIcon: {
    fontSize: 20,
  },
  powerUpCount: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  codeReview: {
    gap: 16,
  },
  codeReviewOption: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: colors.surface,
  },
  codeReviewIssues: {
    fontSize: 16,
    fontWeight: '600',
  },
  codeReviewIssueList: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  patternMatching: {
    gap: 16,
  },
  patternMatchingOption: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: colors.surface,
  },
  patternMatchingName: {
    fontSize: 16,
    fontWeight: '600',
  },
  patternMatchingDescription: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  timeComplexity: {
    gap: 16,
  },
  timeComplexityOption: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: colors.surface,
  },
  timeComplexityLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  timeComplexityValue: {
    fontSize: 14,
    color: colors.text.secondary,
  },
});
