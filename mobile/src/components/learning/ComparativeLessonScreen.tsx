import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { CodeBlock } from '../code/CodeBlock';
import { CodeEditor } from '../code/CodeEditor';
import { CodeMascot } from '../characters/CodeMascot';
import { useTheme } from '../../hooks/useTheme';
import { LessonProgress } from './LessonProgress';
import { SplitView } from './SplitView';
import { ConceptComparison } from './ConceptComparison';
import { InteractiveExample } from './InteractiveExample';

interface ComparativeLessonScreenProps {
  sourceLanguage: string;
  targetLanguage: string;
  lessonId: string;
  onComplete: (score: number) => void;
  onExit: () => void;
}

export const ComparativeLessonScreen: React.FC<ComparativeLessonScreenProps> = ({
  sourceLanguage,
  targetLanguage,
  lessonId,
  onComplete,
  onExit,
}) => {
  const { colors } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [lesson, setLesson] = useState<any>(null);
  const [mascotEmotion, setMascotEmotion] = useState<'happy' | 'thinking' | 'explaining'>('explaining');
  const [slideAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    fetchLesson();
  }, [lessonId]);

  const fetchLesson = async () => {
    // Mock lesson data
    const mockLesson = {
      title: 'Print Statements Comparison',
      concepts: [
        {
          concept: 'print_output',
          sourceLanguage: {
            name: 'Python',
            syntax: 'print(value)',
            example: 'print("Hello, World!")\nprint("Multiple", "values", sep=" ")',
            notes: [
              'Automatically adds newline',
              'Can print multiple values with comma separation',
              'Optional sep parameter for separator',
            ],
          },
          targetLanguage: {
            name: 'JavaScript',
            syntax: 'console.log(value)',
            example: 'console.log("Hello, World!");\nconsole.log("Multiple", "values");',
            notes: [
              'Part of console object',
              'Automatically adds newline',
              'Can print multiple values with comma separation',
              'Semicolon recommended at end',
            ],
          },
          commonMistakes: [
            {
              mistake: 'print("Hello");',
              explanation: 'Python\'s print() doesn\'t exist in JavaScript',
              correction: 'console.log("Hello");',
            },
          ],
          exercises: [
            {
              type: 'code_conversion',
              prompt: 'Convert this Python code to JavaScript:',
              sourceCode: 'print("Hello")\nprint("World")',
              solution: 'console.log("Hello");\nconsole.log("World");',
              hints: ['Remember to use console.log', 'Don\'t forget semicolons'],
            },
          ],
        },
      ],
    };
    setLesson(mockLesson);
  };

  const handleExerciseComplete = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 10);
      setMascotEmotion('happy');
      animateTransition(() => {
        setCurrentStep(currentStep + 1);
      });
    } else {
      setHearts(hearts - 1);
      setMascotEmotion('thinking');
      if (hearts - 1 <= 0) {
        onExit();
      }
    }
  };

  const animateTransition = (callback: () => void) => {
    Animated.sequence([
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }),
    ]).start(callback);
  };

  if (!lesson) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const renderConceptComparison = (concept: any) => {
    return (
      <View style={styles.conceptContainer}>
        <SplitView
          leftContent={
            <View style={styles.languageSection}>
              <Text style={[styles.languageTitle, { color: colors.text.primary }]}>
                {concept.sourceLanguage.name}
              </Text>
              <CodeBlock
                code={concept.sourceLanguage.example}
                language={sourceLanguage.toLowerCase()}
              />
              <View style={styles.notes}>
                {concept.sourceLanguage.notes.map((note: string, index: number) => (
                  <Text key={index} style={[styles.note, { color: colors.text.secondary }]}>
                    • {note}
                  </Text>
                ))}
              </View>
            </View>
          }
          rightContent={
            <View style={styles.languageSection}>
              <Text style={[styles.languageTitle, { color: colors.text.primary }]}>
                {concept.targetLanguage.name}
              </Text>
              <CodeBlock
                code={concept.targetLanguage.example}
                language={targetLanguage.toLowerCase()}
              />
              <View style={styles.notes}>
                {concept.targetLanguage.notes.map((note: string, index: number) => (
                  <Text key={index} style={[styles.note, { color: colors.text.secondary }]}>
                    • {note}
                  </Text>
                ))}
              </View>
            </View>
          }
        />
        
        <View style={styles.commonMistakes}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            Common Mistakes
          </Text>
          {concept.commonMistakes.map((mistake: any, index: number) => (
            <View key={index} style={styles.mistake}>
              <Text style={[styles.mistakeTitle, { color: colors.error }]}>
                ❌ {mistake.mistake}
              </Text>
              <Text style={[styles.mistakeExplanation, { color: colors.text.secondary }]}>
                {mistake.explanation}
              </Text>
              <Text style={[styles.mistakeCorrection, { color: colors.success }]}>
                ✓ {mistake.correction}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderExercise = (exercise: any) => {
    switch (exercise.type) {
      case 'code_conversion':
        return (
          <View style={styles.exercise}>
            <Text style={[styles.exercisePrompt, { color: colors.text.primary }]}>
              {exercise.prompt}
            </Text>
            <CodeBlock
              code={exercise.sourceCode}
              language={sourceLanguage.toLowerCase()}
            />
            <CodeEditor
              placeholder="Type your solution here..."
              onSubmit={(code) => {
                handleExerciseComplete(code.trim() === exercise.solution.trim());
              }}
            />
            <TouchableOpacity
              style={styles.hintButton}
              onPress={() => {
                // Show hint
              }}
            >
              <Text style={[styles.hintButtonText, { color: colors.primary }]}>
                Need a hint?
              </Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onExit} style={styles.exitButton}>
          <Text style={{ color: colors.text.primary }}>✕</Text>
        </TouchableOpacity>
        <LessonProgress
          current={currentStep + 1}
          total={lesson.concepts.length * 2} // Concepts + Exercises
          hearts={hearts}
          score={score}
        />
      </View>

      <ScrollView style={styles.content}>
        {currentStep % 2 === 0 ? (
          // Concept comparison step
          renderConceptComparison(lesson.concepts[Math.floor(currentStep / 2)])
        ) : (
          // Exercise step
          renderExercise(lesson.concepts[Math.floor(currentStep / 2)].exercises[0])
        )}
      </ScrollView>

      <View style={styles.mascotContainer}>
        <CodeMascot
          type="robot"
          name="Cody"
          emotion={mascotEmotion}
          message={
            mascotEmotion === 'happy'
              ? 'Great job! You\'re learning the differences quickly!'
              : mascotEmotion === 'thinking'
              ? 'Remember the syntax differences we just learned!'
              : 'Let me show you how these languages differ...'
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  exitButton: {
    padding: 8,
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  conceptContainer: {
    marginBottom: 24,
  },
  languageSection: {
    flex: 1,
    padding: 12,
  },
  languageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  notes: {
    marginTop: 12,
  },
  note: {
    fontSize: 14,
    marginBottom: 4,
  },
  commonMistakes: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  mistake: {
    marginBottom: 16,
  },
  mistakeTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  mistakeExplanation: {
    fontSize: 14,
    marginBottom: 4,
  },
  mistakeCorrection: {
    fontSize: 14,
    fontWeight: '500',
  },
  exercise: {
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 12,
  },
  exercisePrompt: {
    fontSize: 16,
    marginBottom: 16,
  },
  hintButton: {
    marginTop: 12,
    padding: 8,
    alignItems: 'center',
  },
  hintButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  mascotContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
});
