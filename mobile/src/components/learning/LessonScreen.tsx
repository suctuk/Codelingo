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
import { MultipleChoice } from './exercises/MultipleChoice';
import { CodeCompletion } from './exercises/CodeCompletion';
import { WriteCode } from './exercises/WriteCode';
import { MatchOutput } from './exercises/MatchOutput';

interface LessonScreenProps {
  lessonId: string;
  onComplete: (score: number) => void;
  onExit: () => void;
}

export const LessonScreen: React.FC<LessonScreenProps> = ({
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
    // Fetch lesson content from API
    // For now, using mock data
    const mockLesson = {
      title: 'Introduction to Variables',
      content: {
        theory: 'Variables are containers for storing data values...',
        examples: [
          {
            description: 'Creating variables',
            code: 'name = "Alice"\nage = 25',
            explanation: 'This creates two variables: a string and a number',
          },
        ],
        exercises: [
          {
            type: 'multiple_choice',
            prompt: 'Which of these is a valid variable name?',
            options: ['1name', 'my-name', '_name', 'my name'],
            correctAnswer: 2,
          },
          {
            type: 'code_completion',
            prompt: 'Complete the code to create a variable age with value 30',
            template: 'age ___ 30',
            solution: 'age = 30',
          },
        ],
      },
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

  const renderExercise = (exercise: any) => {
    switch (exercise.type) {
      case 'multiple_choice':
        return (
          <MultipleChoice
            question={exercise.prompt}
            options={exercise.options}
            onAnswer={handleExerciseComplete}
          />
        );
      case 'code_completion':
        return (
          <CodeCompletion
            prompt={exercise.prompt}
            template={exercise.template}
            solution={exercise.solution}
            onComplete={handleExerciseComplete}
          />
        );
      case 'write_code':
        return (
          <WriteCode
            prompt={exercise.prompt}
            testCases={exercise.testCases}
            onComplete={handleExerciseComplete}
          />
        );
      case 'match_output':
        return (
          <MatchOutput
            code={exercise.code}
            options={exercise.outputs}
            onAnswer={handleExerciseComplete}
          />
        );
      default:
        return null;
    }
  };

  const renderContent = () => {
    if (currentStep === 0) {
      // Theory section
      return (
        <ScrollView style={styles.content}>
          <Text style={[styles.theory, { color: colors.text.primary }]}>
            {lesson.content.theory}
          </Text>
          {lesson.content.examples.map((example: any, index: number) => (
            <View key={index} style={styles.example}>
              <Text style={[styles.exampleDescription, { color: colors.text.secondary }]}>
                {example.description}
              </Text>
              <CodeBlock
                code={example.code}
                language="python"
              />
              <Text style={[styles.explanation, { color: colors.text.secondary }]}>
                {example.explanation}
              </Text>
            </View>
          ))}
        </ScrollView>
      );
    }

    // Exercise section
    const exerciseIndex = currentStep - 1;
    if (exerciseIndex < lesson.content.exercises.length) {
      return (
        <Animated.View
          style={[
            styles.content,
            {
              transform: [
                {
                  translateX: slideAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 300],
                  }),
                },
              ],
            },
          ]}
        >
          {renderExercise(lesson.content.exercises[exerciseIndex])}
        </Animated.View>
      );
    }

    // Lesson complete
    onComplete(score);
    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onExit} style={styles.exitButton}>
          <Text style={{ color: colors.text.primary }}>✕</Text>
        </TouchableOpacity>
        <LessonProgress
          current={currentStep + 1}
          total={lesson.content.exercises.length + 1}
          hearts={hearts}
          score={score}
        />
      </View>

      {renderContent()}

      <View style={styles.mascotContainer}>
        <CodeMascot
          type="robot"
          name="Cody"
          emotion={mascotEmotion}
          message={
            mascotEmotion === 'happy'
              ? 'Great job! Keep going!'
              : mascotEmotion === 'thinking'
              ? 'Try again, you can do it!'
              : 'Let me explain this concept...'
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
  theory: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  example: {
    marginBottom: 24,
  },
  exampleDescription: {
    fontSize: 14,
    marginBottom: 8,
  },
  explanation: {
    fontSize: 14,
    marginTop: 8,
    fontStyle: 'italic',
  },
  mascotContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
});
