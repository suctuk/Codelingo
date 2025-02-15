import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from 'react-native';
import { theme } from '../../../shared/styles/theme';
import { CodeBlock } from '../../components/code/CodeBlock';
import { ScaleView } from '../../components/animations/ScaleView';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface CodeTranslationExerciseProps {
  sourceCode: string;
  sourceLanguage: string;
  targetLanguage: string;
  correctAnswer: string;
  hints: string[];
  onComplete: (isCorrect: boolean) => void;
}

export const CodeTranslationExercise: React.FC<CodeTranslationExerciseProps> = ({
  sourceCode,
  sourceLanguage,
  targetLanguage,
  correctAnswer,
  hints,
  onComplete,
}) => {
  const [userCode, setUserCode] = useState('');
  const [showHints, setShowHints] = useState(false);
  const [currentHint, setCurrentHint] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<string[]>([]);

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setShowHints(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleSubmit = () => {
    if (isSubmitted) return;

    const normalizedUserCode = normalizeCode(userCode);
    const normalizedCorrectCode = normalizeCode(correctAnswer);
    const isCorrect = normalizedUserCode === normalizedCorrectCode;

    setIsSubmitted(true);
    setFeedback(generateFeedback(normalizedUserCode, normalizedCorrectCode));
    onComplete(isCorrect);
  };

  const normalizeCode = (code: string): string => {
    return code
      .trim()
      .replace(/\s+/g, ' ')
      .replace(/[\n\r]/g, '')
      .toLowerCase();
  };

  const generateFeedback = (
    userCode: string,
    correctCode: string
  ): string[] => {
    const feedback: string[] = [];

    // Check for basic syntax
    if (!/[;{}()]/.test(userCode) && /[;{}()]/.test(correctCode)) {
      feedback.push('Check your syntax - you might be missing some punctuation');
    }

    // Check for common keywords
    const correctKeywords = correctCode.match(/\b(if|while|for|return|class|function)\b/g) || [];
    const userKeywords = userCode.match(/\b(if|while|for|return|class|function)\b/g) || [];
    
    const missingKeywords = correctKeywords.filter(k => !userKeywords.includes(k));
    if (missingKeywords.length > 0) {
      feedback.push(`You might need to use: ${missingKeywords.join(', ')}`);
    }

    // Check code length
    const lengthDiff = Math.abs(userCode.length - correctCode.length);
    if (lengthDiff > correctCode.length * 0.3) {
      feedback.push('Your solution seems too short or too long');
    }

    return feedback.length > 0 ? feedback : ['Keep practicing!'];
  };

  const showNextHint = () => {
    if (currentHint < hints.length - 1) {
      setCurrentHint(curr => curr + 1);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.sourceContainer}>
          <Text style={styles.label}>
            Translate this {sourceLanguage} code to {targetLanguage}:
          </Text>
          <CodeBlock
            code={sourceCode}
            language={sourceLanguage.toLowerCase()}
            style={styles.sourceCode}
          />
        </View>

        <View style={styles.editorContainer}>
          <TextInput
            style={styles.editor}
            multiline
            value={userCode}
            onChangeText={setUserCode}
            placeholder={`Write your ${targetLanguage} code here...`}
            placeholderTextColor={theme.colors.text.disabled}
            autoCapitalize="none"
            autoCorrect={false}
            editable={!isSubmitted}
          />
        </View>

        {isSubmitted && feedback.length > 0 && (
          <View style={styles.feedbackContainer}>
            {feedback.map((item, index) => (
              <Text key={index} style={styles.feedbackText}>
                • {item}
              </Text>
            ))}
          </View>
        )}

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
            (!userCode.trim() || isSubmitted) && styles.disabledButton,
          ]}
          onPress={handleSubmit}
          disabled={!userCode.trim() || isSubmitted}
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
  sourceContainer: {
    marginBottom: theme.spacing.lg,
  },
  label: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  sourceCode: {
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
  },
  editorContainer: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    borderWidth: 2,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.lg,
    ...theme.shadows.small,
  },
  editor: {
    padding: theme.spacing.md,
    minHeight: 150,
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.mono,
    color: theme.colors.text.primary,
    textAlignVertical: 'top',
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
