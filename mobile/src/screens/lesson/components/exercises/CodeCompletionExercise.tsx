import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { theme } from '../../../../shared/styles/theme';
import { CodeBlock } from '../../../components/code/CodeBlock';
import { ScaleView } from '../../../components/animations/ScaleView';

interface CodeCompletionExerciseProps {
  question: string;
  code: string;
  options: string[];
  correctAnswer: string;
  language: string;
  onComplete: (isCorrect: boolean) => void;
}

export const CodeCompletionExercise: React.FC<CodeCompletionExerciseProps> = ({
  question,
  code,
  options,
  correctAnswer,
  language,
  onComplete,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOptionSelect = (option: string) => {
    if (isSubmitted) return;
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (!selectedOption || isSubmitted) return;
    setIsSubmitted(true);
    onComplete(selectedOption === correctAnswer);
  };

  const getCompletedCode = (option: string) => {
    return code.replace('___', option);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.question}>{question}</Text>

        <View style={styles.codeContainer}>
          <CodeBlock
            code={getCompletedCode(selectedOption || '___')}
            language={language}
            style={styles.code}
            highlightLines={[
              {
                line: code.split('\n').findIndex(line => line.includes('___')),
                color: selectedOption
                  ? isSubmitted
                    ? selectedOption === correctAnswer
                      ? theme.colors.success + '40'
                      : theme.colors.error + '40'
                    : theme.colors.primary + '40'
                  : 'transparent',
              },
            ]}
          />
        </View>

        <View style={styles.optionsContainer}>
          {options.map((option, index) => (
            <ScaleView
              key={index}
              onPress={() => handleOptionSelect(option)}
              style={styles.optionWrapper}
            >
              <View
                style={[
                  styles.option,
                  selectedOption === option && styles.selectedOption,
                  isSubmitted && selectedOption === option && 
                    (option === correctAnswer
                      ? styles.correctOption
                      : styles.wrongOption),
                ]}
              >
                <Text
                  style={[
                    styles.optionText,
                    selectedOption === option && styles.selectedOptionText,
                    isSubmitted &&
                      selectedOption === option &&
                      (option === correctAnswer
                        ? styles.correctOptionText
                        : styles.wrongOptionText),
                  ]}
                >
                  {option}
                </Text>
              </View>
            </ScaleView>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.submitButton,
            (!selectedOption || isSubmitted) && styles.disabledButton,
          ]}
          onPress={handleSubmit}
          disabled={!selectedOption || isSubmitted}
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
  },
  content: {
    flex: 1,
    padding: theme.spacing.md,
  },
  question: {
    fontSize: theme.typography.fontSize.lg,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.lg,
  },
  codeContainer: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.lg,
    overflow: 'hidden',
    ...theme.shadows.small,
  },
  code: {
    padding: theme.spacing.md,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: theme.spacing.sm,
  },
  optionWrapper: {
    margin: theme.spacing.xs,
  },
  option: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surface,
    borderWidth: 2,
    borderColor: theme.colors.border,
    minWidth: 100,
    alignItems: 'center',
  },
  selectedOption: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary + '10',
  },
  correctOption: {
    borderColor: theme.colors.success,
    backgroundColor: theme.colors.success + '10',
  },
  wrongOption: {
    borderColor: theme.colors.error,
    backgroundColor: theme.colors.error + '10',
  },
  optionText: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text.primary,
  },
  selectedOptionText: {
    color: theme.colors.primary,
  },
  correctOptionText: {
    color: theme.colors.success,
  },
  wrongOptionText: {
    color: theme.colors.error,
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
