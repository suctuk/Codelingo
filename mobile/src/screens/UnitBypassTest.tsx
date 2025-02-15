import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../../shared/styles/theme';
import { Mascot } from '../components/mascots/Mascot';
import { ProgressBar } from '../components/animations/ProgressBar';
import { useApp } from '../context/AppContext';

interface Question {
  id: string;
  type: 'code' | 'multipleChoice';
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  content: any;
}

export const UnitBypassTest = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { state, dispatch } = useApp();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes

  // Mock test questions (replace with actual questions from API)
  const questions: Question[] = [
    {
      id: '1',
      type: 'code',
      difficulty: 'medium',
      points: 10,
      content: {
        question: 'Convert this JavaScript function to Python:',
        code: `function calculateSum(arr) {
  return arr.reduce((sum, num) => sum + num, 0);
}`,
        expectedOutput: `def calculate_sum(arr):
    return sum(arr)`,
      },
    },
    // Add more questions...
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          handleTestComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleTestComplete();
    }
  };

  const calculateScore = () => {
    let totalScore = 0;
    questions.forEach((question) => {
      const answer = answers[question.id];
      if (answer) {
        // Implement scoring logic based on question type and difficulty
        totalScore += question.points;
      }
    });
    return totalScore;
  };

  const handleTestComplete = () => {
    const finalScore = calculateScore();
    setScore(finalScore);

    // Determine how many units to bypass based on score
    const unitsToBypass = Math.floor(finalScore / 50); // Example: bypass 1 unit per 50 points

    // Update user progress
    dispatch({
      type: 'UPDATE_USER_PROGRESS',
      payload: {
        unitsCompleted: state.user.unitsCompleted + unitsToBypass,
        xp: state.user.xp + finalScore,
      },
    });

    navigation.replace('TestComplete', {
      score: finalScore,
      unitsSkipped: unitsToBypass,
    });
  };

  const currentQ = questions[currentQuestion];

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.primaryDark]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
          <ProgressBar
            progress={(currentQuestion + 1) / questions.length * 100}
            width={200}
            height={8}
            backgroundColor="rgba(255,255,255,0.2)"
            fillColor={theme.colors.text.inverse}
          />
          <Text style={styles.progress}>
            {currentQuestion + 1}/{questions.length}
          </Text>
        </View>
      </LinearGradient>

      {/* Content */}
      <ScrollView style={styles.content}>
        <Text style={styles.questionTitle}>
          Question {currentQuestion + 1} ({currentQ.difficulty})
        </Text>
        
        {/* Render question based on type */}
        {currentQ.type === 'code' ? (
          <View style={styles.codeQuestion}>
            <Text style={styles.questionText}>{currentQ.content.question}</Text>
            {/* Add CodeEditor component here */}
          </View>
        ) : (
          <View style={styles.multipleChoice}>
            <Text style={styles.questionText}>{currentQ.content.question}</Text>
            {/* Add MultipleChoice component here */}
          </View>
        )}
      </ScrollView>

      {/* Mascot */}
      <View style={styles.mascotContainer}>
        <Mascot
          type="computer"
          mood="thinking"
          size="medium"
        />
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        {/* Add navigation controls */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingTop: 40,
    paddingBottom: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timer: {
    fontSize: theme.typography.fontSize.lg,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.inverse,
  },
  progress: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text.inverse,
  },
  content: {
    flex: 1,
    padding: theme.spacing.md,
  },
  questionTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  questionText: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  codeQuestion: {
    marginBottom: theme.spacing.lg,
  },
  multipleChoice: {
    marginBottom: theme.spacing.lg,
  },
  mascotContainer: {
    position: 'absolute',
    bottom: 100,
    right: theme.spacing.md,
  },
  controls: {
    padding: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
});
