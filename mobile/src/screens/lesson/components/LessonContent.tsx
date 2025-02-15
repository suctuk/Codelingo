import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CodeEditor } from '../../components/CodeEditor';
import { theme } from '../../../../shared/styles/theme';

interface LessonContentProps {
  step: any;
  onAnswer: (isCorrect: boolean) => void;
  timeLeft: number;
  isAnswered: boolean;
}

export const LessonContent: React.FC<LessonContentProps> = ({
  step,
  onAnswer,
  timeLeft,
  isAnswered,
}) => {
  const renderExplanation = () => (
    <View style={styles.explanationContainer}>
      <Text style={styles.title}>{step.content.title}</Text>
      <Text style={styles.text}>{step.content.text}</Text>
      <View style={styles.codeComparison}>
        {Object.entries(step.content.codeComparison).map(([language, code]) => (
          <View key={language} style={styles.codeBlock}>
            <Text style={styles.languageLabel}>{language}</Text>
            <CodeEditor
              code={code as string}
              language={language}
              readOnly
              style={styles.code}
            />
          </View>
        ))}
      </View>
    </View>
  );

  const renderMultipleChoice = () => (
    <View style={styles.multipleChoiceContainer}>
      <Text style={styles.question}>{step.content.question}</Text>
      <View style={styles.options}>
        {step.content.options.map((option: string, index: number) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.option,
              isAnswered && index === step.content.correctAnswer && styles.correctOption,
              isAnswered && index !== step.content.correctAnswer && styles.wrongOption,
            ]}
            onPress={() => !isAnswered && onAnswer(index === step.content.correctAnswer)}
            disabled={isAnswered}
          >
            <Text
              style={[
                styles.optionText,
                isAnswered && (index === step.content.correctAnswer ? styles.correctText : styles.wrongText),
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderCodeCompletion = () => (
    <View style={styles.codeCompletionContainer}>
      <Text style={styles.question}>{step.content.question}</Text>
      <CodeEditor
        code={step.content.code}
        language="python"
        onChangeText={(text) => {
          if (!isAnswered) {
            const userAnswer = text.trim();
            onAnswer(userAnswer === step.content.answer);
          }
        }}
        style={styles.codeEditor}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Timer */}
      <View style={styles.timerContainer}>
        <Text style={[styles.timer, timeLeft <= 5 && styles.timerWarning]}>
          {timeLeft}s
        </Text>
      </View>

      {/* Content */}
      {step.type === 'explanation' && renderExplanation()}
      {step.type === 'multipleChoice' && renderMultipleChoice()}
      {step.type === 'codeCompletion' && renderCodeCompletion()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  timer: {
    fontSize: theme.typography.fontSize.xl,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.primary,
  },
  timerWarning: {
    color: theme.colors.error,
  },
  explanationContainer: {
    flex: 1,
  },
  title: {
    fontSize: theme.typography.fontSize.xl,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  text: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.lg,
  },
  codeComparison: {
    marginTop: theme.spacing.md,
  },
  codeBlock: {
    marginBottom: theme.spacing.md,
  },
  languageLabel: {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
  },
  code: {
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
  },
  multipleChoiceContainer: {
    flex: 1,
  },
  question: {
    fontSize: theme.typography.fontSize.lg,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.lg,
  },
  options: {
    gap: theme.spacing.md,
  },
  option: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surface,
    borderWidth: 2,
    borderColor: theme.colors.border,
  },
  correctOption: {
    backgroundColor: theme.colors.success + '20',
    borderColor: theme.colors.success,
  },
  wrongOption: {
    backgroundColor: theme.colors.error + '20',
    borderColor: theme.colors.error,
  },
  optionText: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text.primary,
  },
  correctText: {
    color: theme.colors.success,
  },
  wrongText: {
    color: theme.colors.error,
  },
  codeCompletionContainer: {
    flex: 1,
  },
  codeEditor: {
    flex: 1,
    marginTop: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surface,
  },
});
