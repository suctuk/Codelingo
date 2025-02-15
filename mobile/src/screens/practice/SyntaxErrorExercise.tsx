import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { theme } from '../../../shared/styles/theme';
import { CodeBlock } from '../../components/code/CodeBlock';
import { ScaleView } from '../../components/animations/ScaleView';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface SyntaxError {
  line: number;
  description: string;
  hint?: string;
}

interface SyntaxErrorExerciseProps {
  code: string;
  language: string;
  errors: SyntaxError[];
  timeLimit?: number;
  onComplete: (score: number) => void;
}

export const SyntaxErrorExercise: React.FC<SyntaxErrorExerciseProps> = ({
  code,
  language,
  errors,
  timeLimit = 60,
  onComplete,
}) => {
  const [selectedLines, setSelectedLines] = useState<number[]>([]);
  const [revealedHints, setRevealedHints] = useState<number[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [feedback, setFeedback] = useState<string[]>([]);

  React.useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isSubmitted) {
      handleSubmit();
    }
  }, [timeLeft, isSubmitted]);

  const handleLinePress = (lineNumber: number) => {
    if (isSubmitted) return;

    setSelectedLines((prev) => {
      if (prev.includes(lineNumber)) {
        return prev.filter((l) => l !== lineNumber);
      }
      return [...prev, lineNumber];
    });
  };

  const toggleHint = (errorIndex: number) => {
    setRevealedHints((prev) => {
      if (prev.includes(errorIndex)) {
        return prev.filter((i) => i !== errorIndex);
      }
      return [...prev, errorIndex];
    });
  };

  const handleSubmit = () => {
    if (isSubmitted) return;

    const correctLines = errors.map((error) => error.line);
    const foundErrors = selectedLines.filter((line) =>
      correctLines.includes(line)
    );
    const falsePositives = selectedLines.filter(
      (line) => !correctLines.includes(line)
    );

    const score = calculateScore(foundErrors.length, falsePositives.length);
    setFeedback(generateFeedback(foundErrors, falsePositives, errors));
    setIsSubmitted(true);
    onComplete(score);
  };

  const calculateScore = (found: number, falsePositives: number): number => {
    const maxScore = 100;
    const perErrorScore = maxScore / errors.length;
    const falsePositivePenalty = perErrorScore / 2;

    return Math.max(
      0,
      Math.round(found * perErrorScore - falsePositives * falsePositivePenalty)
    );
  };

  const generateFeedback = (
    found: number[],
    falsePositives: number[],
    allErrors: SyntaxError[]
  ): string[] => {
    const feedback: string[] = [];

    if (found.length === allErrors.length && falsePositives.length === 0) {
      feedback.push('Perfect! You found all the syntax errors! 🎉');
    } else {
      if (found.length > 0) {
        feedback.push(
          `You correctly identified ${found.length} out of ${allErrors.length} errors.`
        );
      }
      if (falsePositives.length > 0) {
        feedback.push(
          `You marked ${falsePositives.length} line${
            falsePositives.length > 1 ? 's' : ''
          } that didn't have errors.`
        );
      }

      const missedErrors = allErrors.filter(
        (error) => !found.includes(error.line)
      );
      if (missedErrors.length > 0) {
        feedback.push('Missed errors:');
        missedErrors.forEach((error) => {
          feedback.push(`• Line ${error.line}: ${error.description}`);
        });
      }
    }

    return feedback;
  };

  const renderCodeLine = (line: string, index: number) => {
    const lineNumber = index + 1;
    const isSelected = selectedLines.includes(lineNumber);
    const isError = errors.some((error) => error.line === lineNumber);
    const showError = isSubmitted && isError;

    return (
      <TouchableOpacity
        key={index}
        onPress={() => handleLinePress(lineNumber)}
        style={[
          styles.codeLine,
          isSelected && styles.selectedLine,
          showError && styles.errorLine,
        ]}
      >
        <Text style={styles.lineNumber}>{lineNumber}</Text>
        <Text style={styles.codeText}>{line}</Text>
        {showError && (
          <Icon
            name="alert-circle"
            size={20}
            color={theme.colors.error}
            style={styles.errorIcon}
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Find the Syntax Errors</Text>
        <Text style={styles.timer}>{timeLeft}s</Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.instruction}>
          Tap the lines that contain syntax errors
        </Text>

        <View style={styles.codeContainer}>
          {code.split('\n').map(renderCodeLine)}
        </View>

        {isSubmitted && (
          <View style={styles.feedbackContainer}>
            {feedback.map((message, index) => (
              <Text
                key={index}
                style={[
                  styles.feedbackText,
                  message.startsWith('Perfect') && styles.perfectFeedback,
                ]}
              >
                {message}
              </Text>
            ))}
          </View>
        )}

        <View style={styles.hintsContainer}>
          {errors.map((error, index) => (
            <ScaleView
              key={index}
              onPress={() => toggleHint(index)}
              style={styles.hintButton}
            >
              <Icon
                name={revealedHints.includes(index) ? 'lightbulb-on' : 'lightbulb-outline'}
                size={24}
                color={theme.colors.warning}
              />
              <Text style={styles.hintButtonText}>
                {revealedHints.includes(index)
                  ? error.hint || error.description
                  : `Reveal Hint ${index + 1}`}
              </Text>
            </ScaleView>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.submitButton,
            (selectedLines.length === 0 || isSubmitted) && styles.disabledButton,
          ]}
          onPress={handleSubmit}
          disabled={selectedLines.length === 0 || isSubmitted}
        >
          <Text style={styles.submitButtonText}>
            {isSubmitted ? 'Continue' : 'Check'}
          </Text>
        </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  title: {
    fontSize: theme.typography.fontSize.lg,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.primary,
  },
  timer: {
    fontSize: theme.typography.fontSize.lg,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.primary,
  },
  content: {
    flex: 1,
    padding: theme.spacing.md,
  },
  instruction: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.md,
  },
  codeContainer: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    marginBottom: theme.spacing.lg,
    ...theme.shadows.small,
  },
  codeLine: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
  },
  selectedLine: {
    backgroundColor: theme.colors.primary + '20',
  },
  errorLine: {
    backgroundColor: theme.colors.error + '20',
  },
  lineNumber: {
    width: 30,
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.mono,
    color: theme.colors.text.disabled,
    textAlign: 'right',
    marginRight: theme.spacing.sm,
  },
  codeText: {
    flex: 1,
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.mono,
    color: theme.colors.text.primary,
  },
  errorIcon: {
    marginLeft: theme.spacing.sm,
  },
  feedbackContainer: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  feedbackText: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  perfectFeedback: {
    color: theme.colors.success,
    fontFamily: theme.typography.fontFamily.bold,
  },
  hintsContainer: {
    marginBottom: theme.spacing.lg,
  },
  hintButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  hintButtonText: {
    marginLeft: theme.spacing.sm,
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.warning,
  },
  footer: {
    padding: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  submitButtonText: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.inverse,
  },
});
