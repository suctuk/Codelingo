import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import { CodeBlock } from '../code/CodeBlock';
import { CodeMascot } from '../characters/CodeMascot';
import { useTheme } from '../../hooks/useTheme';

interface Suggestion {
  id: string;
  code: string;
  explanation: string;
  isCorrect: boolean;
}

interface Props {
  challenge: {
    title: string;
    description: string;
    initialCode: string;
    suggestions: Suggestion[];
    mascot: {
      type: 'robot' | 'computer' | 'ai';
      name: string;
      specialty: string;
    };
    hints: string[];
  };
  onComplete: (success: boolean) => void;
}

export const PairProgramming: React.FC<Props> = ({ challenge, onComplete }) => {
  const { colors } = useTheme();
  const [code, setCode] = useState(challenge.initialCode);
  const [currentSuggestion, setCurrentSuggestion] = useState<Suggestion | null>(null);
  const [mascotEmotion, setMascotEmotion] = useState<'thinking' | 'happy' | 'explaining'>('thinking');
  const [mascotMessage, setMascotMessage] = useState<string>('Let\'s write some code together!');
  const [shownHints, setShownHints] = useState<string[]>([]);
  const [suggestionAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    // Periodically offer suggestions
    const timer = setInterval(() => {
      if (!currentSuggestion) {
        const availableSuggestions = challenge.suggestions.filter(s =>
          !code.includes(s.code)
        );
        if (availableSuggestions.length > 0) {
          const suggestion = availableSuggestions[Math.floor(Math.random() * availableSuggestions.length)];
          setCurrentSuggestion(suggestion);
          setMascotEmotion('explaining');
          setMascotMessage(`How about we try this: ${suggestion.explanation}`);
          
          // Animate suggestion appearance
          Animated.sequence([
            Animated.timing(suggestionAnim, {
              toValue: 1,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(suggestionAnim, {
              toValue: 0.8,
              duration: 200,
              useNativeDriver: true,
            }),
          ]).start();
        }
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [code, currentSuggestion]);

  const handleAcceptSuggestion = () => {
    if (currentSuggestion) {
      const newCode = code + '\n' + currentSuggestion.code;
      setCode(newCode);
      
      if (currentSuggestion.isCorrect) {
        setMascotEmotion('happy');
        setMascotMessage('Great choice! That\'s exactly what we needed!');
        
        // Check if all correct suggestions have been used
        const remainingCorrectSuggestions = challenge.suggestions.filter(s =>
          s.isCorrect && !newCode.includes(s.code)
        );
        
        if (remainingCorrectSuggestions.length === 0) {
          onComplete(true);
        }
      } else {
        setMascotEmotion('explaining');
        setMascotMessage('Hmm, that might work, but there might be a better way...');
      }
      
      setCurrentSuggestion(null);
    }
  };

  const handleRejectSuggestion = () => {
    if (currentSuggestion) {
      if (currentSuggestion.isCorrect) {
        setMascotEmotion('explaining');
        setMascotMessage('Are you sure? That suggestion could have been helpful...');
        
        // Show a hint if available
        const unusedHints = challenge.hints.filter(h => !shownHints.includes(h));
        if (unusedHints.length > 0) {
          const hint = unusedHints[0];
          setShownHints([...shownHints, hint]);
          setTimeout(() => {
            setMascotMessage(`Hint: ${hint}`);
          }, 2000);
        }
      } else {
        setMascotEmotion('happy');
        setMascotMessage('Good thinking! Let\'s try something else.');
      }
      
      setCurrentSuggestion(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text.primary }]}>
        {challenge.title}
      </Text>
      <Text style={[styles.description, { color: colors.text.secondary }]}>
        {challenge.description}
      </Text>

      <ScrollView style={styles.codeContainer}>
        <CodeBlock
          code={code}
          language="python"
          editable={false}
        />
      </ScrollView>

      {currentSuggestion && (
        <Animated.View
          style={[
            styles.suggestionContainer,
            {
              backgroundColor: colors.surface,
              transform: [{ scale: suggestionAnim }],
            },
          ]}
        >
          <Text style={[styles.suggestionTitle, { color: colors.text.primary }]}>
            Suggested Code:
          </Text>
          <CodeBlock
            code={currentSuggestion.code}
            language="python"
            fontSize={14}
          />
          <View style={styles.suggestionActions}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: colors.success }]}
              onPress={handleAcceptSuggestion}
            >
              <Text style={[styles.actionButtonText, { color: colors.text.inverse }]}>
                Accept
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: colors.error }]}
              onPress={handleRejectSuggestion}
            >
              <Text style={[styles.actionButtonText, { color: colors.text.inverse }]}>
                Reject
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}

      <View style={styles.mascotContainer}>
        <CodeMascot
          type={challenge.mascot.type}
          name={challenge.mascot.name}
          emotion={mascotEmotion}
          message={mascotMessage}
          size="medium"
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 24,
  },
  codeContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  suggestionContainer: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  suggestionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  suggestionActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 16,
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  mascotContainer: {
    marginTop: 16,
  },
});
