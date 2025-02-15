import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Animated,
  Keyboard,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../../../shared/styles/theme';
import { CodeBlock } from '../../components/code/CodeBlock';

interface Participant {
  id: string;
  username: string;
  progress: number;
  wpm: number;
  accuracy: number;
}

interface CodeChallenge {
  code: string;
  language: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const CodeSpeedTypingGame = () => {
  const [countdown, setCountdown] = useState(3);
  const [isStarted, setIsStarted] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [challenge, setChallenge] = useState<CodeChallenge | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [stats, setStats] = useState({
    wpm: 0,
    accuracy: 100,
    progress: 0,
  });

  const progressAnim = useRef(new Animated.Value(0)).current;
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    // Mock challenge data
    setChallenge({
      code: `function quickSort(arr) {
  if (arr.length <= 1) return arr;
  
  const pivot = arr[0];
  const left = [];
  const right = [];
  
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  
  return [...quickSort(left), pivot, ...quickSort(right)];
}`,
      language: 'javascript',
      difficulty: 'medium',
    });

    // Mock participants
    setParticipants([
      {
        id: '1',
        username: 'speedcoder',
        progress: 0,
        wpm: 0,
        accuracy: 100,
      },
      {
        id: '2',
        username: 'typingmaster',
        progress: 0,
        wpm: 0,
        accuracy: 100,
      },
    ]);
  }, []);

  useEffect(() => {
    if (countdown > 0 && !isStarted) {
      const timer = setTimeout(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && !isStarted) {
      startGame();
    }
  }, [countdown, isStarted]);

  const startGame = () => {
    setIsStarted(true);
    setStartTime(Date.now());
    inputRef.current?.focus();
  };

  const updateStats = (input: string) => {
    if (!challenge || !startTime) return;

    const timeElapsed = (Date.now() - startTime) / 1000 / 60; // in minutes
    const words = input.length / 5; // average word length
    const wpm = Math.round(words / timeElapsed);

    const targetChars = challenge.code.slice(0, input.length).split('');
    const correctChars = input.split('').filter((char, i) => char === targetChars[i]);
    const accuracy = Math.round((correctChars.length / input.length) * 100);

    const progress = Math.round((input.length / challenge.code.length) * 100);

    setStats({ wpm, accuracy, progress });

    Animated.timing(progressAnim, {
      toValue: progress / 100,
      duration: 200,
      useNativeDriver: false,
    }).start();

    // Update other participants (mock)
    setParticipants(prev =>
      prev.map(p => ({
        ...p,
        progress: Math.min(p.progress + Math.random() * 2, 100),
        wpm: p.wpm + Math.random() * 2,
      }))
    );

    if (progress === 100) {
      handleComplete();
    }
  };

  const handleInput = (text: string) => {
    if (!isStarted || !challenge) return;

    setUserInput(text);
    updateStats(text);
  };

  const handleComplete = () => {
    Keyboard.dismiss();
    // Calculate final stats and submit score
  };

  const renderParticipant = (participant: Participant) => (
    <View key={participant.id} style={styles.participantContainer}>
      <View style={styles.participantInfo}>
        <Text style={styles.username}>{participant.username}</Text>
        <View style={styles.statsContainer}>
          <Text style={styles.statText}>{Math.round(participant.wpm)} WPM</Text>
          <Text style={styles.statText}>{participant.accuracy}% ACC</Text>
        </View>
      </View>
      <View style={styles.progressBarContainer}>
        <View
          style={[
            styles.progressBar,
            { width: `${participant.progress}%` },
          ]}
        />
      </View>
    </View>
  );

  if (!challenge) return null;

  return (
    <View style={styles.container}>
      {!isStarted ? (
        <View style={styles.countdownContainer}>
          <Text style={styles.countdownText}>{countdown}</Text>
        </View>
      ) : (
        <>
          <View style={styles.statsBar}>
            <View style={styles.stat}>
              <Icon name="speedometer" size={20} color={theme.colors.primary} />
              <Text style={styles.statValue}>{stats.wpm} WPM</Text>
            </View>
            <View style={styles.stat}>
              <Icon name="target" size={20} color={theme.colors.success} />
              <Text style={styles.statValue}>{stats.accuracy}%</Text>
            </View>
            <View style={styles.stat}>
              <Icon name="percent" size={20} color={theme.colors.warning} />
              <Text style={styles.statValue}>{stats.progress}%</Text>
            </View>
          </View>

          <View style={styles.codeContainer}>
            <CodeBlock
              code={challenge.code}
              language={challenge.language}
              highlightLines={[
                {
                  line: userInput.split('\n').length - 1,
                  color: theme.colors.primary + '40',
                },
              ]}
            />
            <TextInput
              ref={inputRef}
              style={styles.hiddenInput}
              value={userInput}
              onChangeText={handleInput}
              multiline
              autoCorrect={false}
              autoCapitalize="none"
              spellCheck={false}
            />
          </View>

          <View style={styles.participantsContainer}>
            {participants.map(renderParticipant)}
          </View>

          <Animated.View
            style={[
              styles.progressIndicator,
              {
                transform: [
                  {
                    translateX: progressAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-theme.spacing.md, 0],
                    }),
                  },
                ],
              },
            ]}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  countdownContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countdownText: {
    fontSize: 72,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.primary,
  },
  statsBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statValue: {
    marginLeft: theme.spacing.xs,
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.primary,
  },
  codeContainer: {
    flex: 1,
    padding: theme.spacing.md,
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    height: 0,
  },
  participantsContainer: {
    padding: theme.spacing.md,
  },
  participantContainer: {
    marginBottom: theme.spacing.md,
  },
  participantInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  username: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text.primary,
  },
  statsContainer: {
    flexDirection: 'row',
  },
  statText: {
    marginLeft: theme.spacing.sm,
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text.secondary,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: theme.colors.border,
    borderRadius: theme.borderRadius.full,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: theme.colors.primary,
  },
  progressIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: theme.colors.primary,
  },
});
