import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { theme } from '../../../../shared/styles/theme';
import { ScaleView } from '../../../components/animations/ScaleView';
import { CodeBlock } from '../../../components/code/CodeBlock';

interface CodePair {
  id: string;
  sourceCode: string;
  sourceLanguage: string;
  targetCode: string;
  targetLanguage: string;
}

interface CodeMatchingExerciseProps {
  pairs: CodePair[];
  onComplete: (isCorrect: boolean) => void;
  timeLimit?: number;
}

export const CodeMatchingExercise: React.FC<CodeMatchingExerciseProps> = ({
  pairs,
  onComplete,
  timeLimit = 60,
}) => {
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [selectedTarget, setSelectedTarget] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [shuffledTargets, setShuffledTargets] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [isCompleted, setIsCompleted] = useState(false);

  const bounceAnim = new Animated.Value(0);

  useEffect(() => {
    // Shuffle target codes
    const targets = pairs.map(p => p.targetCode);
    setShuffledTargets(shuffle(targets));
  }, [pairs]);

  useEffect(() => {
    if (timeLeft > 0 && !isCompleted) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isCompleted) {
      handleComplete();
    }
  }, [timeLeft, isCompleted]);

  const shuffle = (array: string[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const handleSourceSelect = (id: string) => {
    if (isCompleted) return;
    setSelectedSource(id);
    animateBounce();
  };

  const handleTargetSelect = (code: string) => {
    if (isCompleted || !selectedSource) return;

    const newMatches = { ...matches };
    // Remove any existing matches for this source or target
    Object.keys(newMatches).forEach(key => {
      if (key === selectedSource || newMatches[key] === code) {
        delete newMatches[key];
      }
    });
    newMatches[selectedSource] = code;
    setMatches(newMatches);
    setSelectedSource(null);
    setSelectedTarget(null);

    // Check if all pairs are matched
    if (Object.keys(newMatches).length === pairs.length) {
      handleComplete();
    }
  };

  const handleComplete = () => {
    setIsCompleted(true);
    const isCorrect = pairs.every(pair => matches[pair.id] === pair.targetCode);
    onComplete(isCorrect);
  };

  const animateBounce = () => {
    Animated.sequence([
      Animated.timing(bounceAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(bounceAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const renderSourceCode = (pair: CodePair) => (
    <ScaleView
      key={pair.id}
      onPress={() => handleSourceSelect(pair.id)}
      style={[
        styles.codeContainer,
        selectedSource === pair.id && styles.selectedContainer,
      ]}
    >
      <View style={styles.languageTag}>
        <Text style={styles.languageText}>{pair.sourceLanguage}</Text>
      </View>
      <CodeBlock
        code={pair.sourceCode}
        language={pair.sourceLanguage.toLowerCase()}
        style={styles.code}
      />
    </ScaleView>
  );

  const renderTargetCode = (code: string) => {
    const pair = pairs.find(p => p.targetCode === code);
    if (!pair) return null;

    const isMatched = Object.values(matches).includes(code);
    const matchedSourceId = Object.keys(matches).find(key => matches[key] === code);
    const matchedPair = matchedSourceId ? pairs.find(p => p.id === matchedSourceId) : null;

    return (
      <ScaleView
        key={code}
        onPress={() => handleTargetSelect(code)}
        style={[
          styles.codeContainer,
          isMatched && styles.matchedContainer,
          selectedTarget === code && styles.selectedContainer,
        ]}
      >
        <View style={styles.languageTag}>
          <Text style={styles.languageText}>{pair.targetLanguage}</Text>
        </View>
        <CodeBlock
          code={code}
          language={pair.targetLanguage.toLowerCase()}
          style={styles.code}
        />
        {isMatched && matchedPair && (
          <View style={styles.matchIndicator}>
            <Text style={styles.matchText}>
              Matched with {matchedPair.sourceLanguage}
            </Text>
          </View>
        )}
      </ScaleView>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Match the equivalent code</Text>
        <Text style={styles.timer}>{timeLeft}s</Text>
      </View>

      <View style={styles.content}>
        <Animated.View
          style={[
            styles.sourceContainer,
            {
              transform: [
                {
                  scale: bounceAnim.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [1, 1.05, 1],
                  }),
                },
              ],
            },
          ]}
        >
          {pairs.map(renderSourceCode)}
        </Animated.View>

        <View style={styles.targetContainer}>
          {shuffledTargets.map(renderTargetCode)}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.md,
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
    flexDirection: 'row',
  },
  sourceContainer: {
    flex: 1,
    padding: theme.spacing.sm,
  },
  targetContainer: {
    flex: 1,
    padding: theme.spacing.sm,
  },
  codeContainer: {
    marginBottom: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surface,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: theme.colors.border,
  },
  selectedContainer: {
    borderColor: theme.colors.primary,
  },
  matchedContainer: {
    borderColor: theme.colors.success,
    backgroundColor: theme.colors.success + '10',
  },
  languageTag: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderTopLeftRadius: theme.borderRadius.md,
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
  },
  languageText: {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text.inverse,
  },
  code: {
    padding: theme.spacing.md,
    paddingTop: theme.spacing.xl,
  },
  matchIndicator: {
    backgroundColor: theme.colors.success,
    padding: theme.spacing.xs,
    alignItems: 'center',
  },
  matchText: {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text.inverse,
  },
});
