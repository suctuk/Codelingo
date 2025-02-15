import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../../../shared/styles/theme';
import { CodeBlock } from '../../components/code/CodeBlock';

interface Card {
  id: number;
  code: string;
  language: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface GameStats {
  moves: number;
  matches: number;
  time: number;
  score: number;
}

const INITIAL_CARDS: Card[] = [
  {
    id: 1,
    code: 'const sum = (a, b) => a + b;',
    language: 'javascript',
    isFlipped: false,
    isMatched: false,
  },
  {
    id: 2,
    code: 'const sum = (a, b) => a + b;',
    language: 'javascript',
    isFlipped: false,
    isMatched: false,
  },
  {
    id: 3,
    code: 'def factorial(n):\n  return 1 if n <= 1 else n * factorial(n-1)',
    language: 'python',
    isFlipped: false,
    isMatched: false,
  },
  {
    id: 4,
    code: 'def factorial(n):\n  return 1 if n <= 1 else n * factorial(n-1)',
    language: 'python',
    isFlipped: false,
    isMatched: false,
  },
  {
    id: 5,
    code: 'public static void main(String[] args) {}',
    language: 'java',
    isFlipped: false,
    isMatched: false,
  },
  {
    id: 6,
    code: 'public static void main(String[] args) {}',
    language: 'java',
    isFlipped: false,
    isMatched: false,
  },
  {
    id: 7,
    code: 'SELECT * FROM users WHERE age > 18;',
    language: 'sql',
    isFlipped: false,
    isMatched: false,
  },
  {
    id: 8,
    code: 'SELECT * FROM users WHERE age > 18;',
    language: 'sql',
    isFlipped: false,
    isMatched: false,
  },
];

export const CodeMemoryGame = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [stats, setStats] = useState<GameStats>({
    moves: 0,
    matches: 0,
    time: 0,
    score: 0,
  });
  const [isGameOver, setIsGameOver] = useState(false);
  const [animations] = useState(() =>
    INITIAL_CARDS.map(() => new Animated.Value(0))
  );

  useEffect(() => {
    startNewGame();
  }, []);

  useEffect(() => {
    if (!isGameOver) {
      const timer = setInterval(() => {
        setStats(prev => ({ ...prev, time: prev.time + 1 }));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isGameOver]);

  const startNewGame = () => {
    const shuffledCards = [...INITIAL_CARDS]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, isFlipped: false, isMatched: false }));
    setCards(shuffledCards);
    setFlippedCards([]);
    setStats({
      moves: 0,
      matches: 0,
      time: 0,
      score: 0,
    });
    setIsGameOver(false);
    animations.forEach(anim => anim.setValue(0));
  };

  const handleCardPress = (index: number) => {
    if (
      flippedCards.length === 2 ||
      cards[index].isFlipped ||
      cards[index].isMatched
    ) {
      return;
    }

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    Animated.spring(animations[index], {
      toValue: 1,
      useNativeDriver: true,
    }).start();

    if (newFlippedCards.length === 2) {
      const [firstIndex, secondIndex] = newFlippedCards;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      setStats(prev => ({ ...prev, moves: prev.moves + 1 }));

      if (firstCard.code === secondCard.code) {
        setTimeout(() => {
          setCards(prev =>
            prev.map((card, i) =>
              i === firstIndex || i === secondIndex
                ? { ...card, isMatched: true }
                : card
            )
          );
          setStats(prev => {
            const newMatches = prev.matches + 1;
            const isComplete = newMatches === INITIAL_CARDS.length / 2;
            if (isComplete) {
              setIsGameOver(true);
            }
            return {
              ...prev,
              matches: newMatches,
              score: calculateScore(prev.moves, prev.time, newMatches),
            };
          });
          setFlippedCards([]);
        }, 500);
      } else {
        setTimeout(() => {
          animations[firstIndex].setValue(0);
          animations[secondIndex].setValue(0);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const calculateScore = (moves: number, time: number, matches: number) => {
    const baseScore = matches * 100;
    const movesPenalty = moves * 5;
    const timePenalty = Math.floor(time / 10) * 2;
    return Math.max(0, baseScore - movesPenalty - timePenalty);
  };

  const renderCard = (card: Card, index: number) => {
    const isFlipped = flippedCards.includes(index) || card.isMatched;
    const rotateY = animations[index].interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });

    return (
      <TouchableOpacity
        key={card.id}
        style={styles.cardContainer}
        onPress={() => handleCardPress(index)}
        activeOpacity={0.8}
      >
        <Animated.View
          style={[
            styles.card,
            {
              transform: [{ rotateY }],
            },
          ]}
        >
          {isFlipped ? (
            <View style={styles.cardFront}>
              <CodeBlock
                code={card.code}
                language={card.language}
                fontSize={10}
              />
            </View>
          ) : (
            <LinearGradient
              colors={[theme.colors.primary, theme.colors.primaryDark]}
              style={styles.cardBack}
            >
              <Icon name="code-braces" size={32} color="white" />
            </LinearGradient>
          )}
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Icon name="clock-outline" size={20} color={theme.colors.primary} />
            <Text style={styles.statText}>
              {Math.floor(stats.time / 60)}:
              {(stats.time % 60).toString().padStart(2, '0')}
            </Text>
          </View>
          <View style={styles.stat}>
            <Icon name="swap-horizontal" size={20} color={theme.colors.warning} />
            <Text style={styles.statText}>{stats.moves}</Text>
          </View>
          <View style={styles.stat}>
            <Icon name="star" size={20} color={theme.colors.success} />
            <Text style={styles.statText}>{stats.score}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.newGameButton}
          onPress={startNewGame}
        >
          <Text style={styles.newGameText}>New Game</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        {cards.map((card, index) => renderCard(card, index))}
      </View>

      {isGameOver && (
        <View style={styles.gameOverContainer}>
          <LinearGradient
            colors={[theme.colors.primary, theme.colors.primaryDark]}
            style={styles.gameOverContent}
          >
            <Text style={styles.gameOverTitle}>Game Complete!</Text>
            <View style={styles.gameOverStats}>
              <Text style={styles.gameOverStatText}>
                Time: {Math.floor(stats.time / 60)}:
                {(stats.time % 60).toString().padStart(2, '0')}
              </Text>
              <Text style={styles.gameOverStatText}>
                Moves: {stats.moves}
              </Text>
              <Text style={styles.gameOverStatText}>
                Score: {stats.score}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.playAgainButton}
              onPress={startNewGame}
            >
              <Text style={styles.playAgainText}>Play Again</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      )}
    </View>
  );
};

const { width } = Dimensions.get('window');
const CARD_MARGIN = 4;
const GRID_SIZE = 4;
const CARD_SIZE = (width - theme.spacing.md * 2 - CARD_MARGIN * (GRID_SIZE - 1)) / GRID_SIZE;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  statsContainer: {
    flexDirection: 'row',
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: theme.spacing.lg,
  },
  statText: {
    marginLeft: theme.spacing.xs,
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.primary,
  },
  newGameButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
  },
  newGameText: {
    color: theme.colors.text.inverse,
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.bold,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  cardContainer: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    margin: CARD_MARGIN,
  },
  card: {
    flex: 1,
    backfaceVisibility: 'hidden',
  },
  cardFront: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm,
    ...theme.shadows.medium,
  },
  cardBack: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.borderRadius.md,
    ...theme.shadows.medium,
  },
  gameOverContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameOverContent: {
    padding: theme.spacing.xl,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
  },
  gameOverTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.inverse,
    marginBottom: theme.spacing.lg,
  },
  gameOverStats: {
    marginBottom: theme.spacing.xl,
  },
  gameOverStatText: {
    fontSize: theme.typography.fontSize.lg,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text.inverse,
    marginBottom: theme.spacing.sm,
  },
  playAgainButton: {
    backgroundColor: theme.colors.text.inverse,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  playAgainText: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.primary,
  },
});
