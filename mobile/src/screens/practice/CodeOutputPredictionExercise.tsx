import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { theme } from '../../../shared/styles/theme';
import { CodeBlock } from '../../components/code/CodeBlock';
import { ScaleView } from '../../components/animations/ScaleView';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface OutputPredictionProps {
  code: string;
  language: string;
  expectedOutput: string;
  hints: string[];
  explanation: string;
  onComplete: (isCorrect: boolean) => void;
}

export const CodeOutputPredictionExercise: React.FC<OutputPredictionProps> = ({
  code,
  language,
  expectedOutput,
  hints,
  explanation,
  onComplete,
}) => {
  const [prediction, setPrediction] = useState('');
  const [showHints, setShowHints] = useState(false);
  const [currentHint, setCurrentHint] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSubmit = () => {
    if (isSubmitted) return;

    const isCorrect = normalizeOutput(prediction) === normalizeOutput(expectedOutput);
    setIsSubmitted(true);
    setShowExplanation(true);
    onComplete(isCorrect);
  };

  const normalizeOutput = (output: string): string => {
    return output
      .trim()
      .replace(/\s+/g, ' ')
      .replace(/[\n\r]/g, '')
      .toLowerCase();
  };

  const showNextHint = () => {
    if (currentHint < hints.length - 1) {
      setCurrentHint(curr => curr + 1);
    }
  };

  const renderOutputComparison = () => {
    if (!isSubmitted) return null;

    const isCorrect = normalizeOutput(prediction) === normalizeOutput(expectedOutput);

    return (
      <View style={styles.comparisonContainer}>
        <View style={styles.outputSection}>
          <Text style={styles.outputLabel}>Your Prediction:</Text>
          <Text style={[
            styles.outputText,
            isCorrect ? styles.correctOutput : styles.incorrectOutput,
          ]}>
            {prediction}
          </Text>
        </View>

        <View style={styles.outputSection}>
          <Text style={styles.outputLabel}>Expected Output:</Text>
          <Text style={[styles.outputText, styles.correctOutput]}>
            {expectedOutput}
          </Text>
        </View>

        {showExplanation && (
          <View style={styles.explanationContainer}>
            <Text style={styles.explanationTitle}>Explanation:</Text>
            <Text style={styles.explanationText}>{explanation}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.instruction}>
          What will this code output? Make your prediction:
        </Text>

        <View style={styles.codeContainer}>
          <CodeBlock
            code={code}
            language={language}
            style={styles.code}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            multiline
            value={prediction}
            onChangeText={setPrediction}
            placeholder="Type your predicted output here..."
            placeholderTextColor={theme.colors.text.disabled}
            editable={!isSubmitted}
          />
        </View>

        {renderOutputComparison()}

        <ScaleView
          onPress={() => setShowHints(!showHints)}
          style={styles.hintsButton}
        >
          <Icon
            name={showHints ? 'lightbulb-on' : 'lightbulb-outline'}
            size={24}
            color={theme.colors.warning}
          />
          <Text style={styles.hintsButtonText}>
            {showHints ? 'Hide Hints' : 'Show Hints'}
          </Text>
        </ScaleView>

        {showHints && (
          <View style={styles.hintsContainer}>
            {hints.slice(0, currentHint + 1).map((hint, index) => (
              <Text key={index} style={styles.hintText}>
                {index + 1}. {hint}
              </Text>
            ))}
            {currentHint < hints.length - 1 && (
              <TouchableOpacity
                style={styles.nextHintButton}
                onPress={showNextHint}
              >
                <Text style={styles.nextHintText}>Show Next Hint</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.submitButton,
            (!prediction.trim() || isSubmitted) && styles.disabledButton,
          ]}
          onPress={handleSubmit}
          disabled={!prediction.trim() || isSubmitted}
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
  content: {
    flex: 1,
    padding: theme.spacing.md,
  },
  instruction: {
    fontSize: theme.typography.fontSize.lg,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  codeContainer: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    marginBottom: theme.spacing.lg,
    ...theme.shadows.small,
  },
  code: {
    padding: theme.spacing.md,
  },
  inputContainer: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    borderWidth: 2,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.lg,
    ...theme.shadows.small,
  },
  input: {
    padding: theme.spacing.md,
    minHeight: 100,
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.mono,
    color: theme.colors.text.primary,
    textAlignVertical: 'top',
  },
  comparisonContainer: {
    marginBottom: theme.spacing.lg,
  },
  outputSection: {
    marginBottom: theme.spacing.md,
  },
  outputLabel: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  outputText: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.mono,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
  },
  correctOutput: {
    backgroundColor: theme.colors.success + '20',
    color: theme.colors.success,
  },
  incorrectOutput: {
    backgroundColor: theme.colors.error + '20',
    color: theme.colors.error,
  },
  explanationContainer: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginTop: theme.spacing.md,
  },
  explanationTitle: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  explanationText: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.text.primary,
  },
  hintsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  hintsButtonText: {
    marginLeft: theme.spacing.sm,
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.warning,
  },
  hintsContainer: {
    backgroundColor: theme.colors.warning + '10',
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  hintText: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  nextHintButton: {
    alignSelf: 'flex-start',
    marginTop: theme.spacing.sm,
  },
  nextHintText: {
    fontSize: theme.typography.fontSize.sm,
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
