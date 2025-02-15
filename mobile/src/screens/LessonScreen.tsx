import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
  Platform,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
  useSharedValue,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CodeEditor from 'react-native-code-editor';
import { useNavigation } from '@react-navigation/native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface LessonContent {
  id: number;
  type: 'TEXT' | 'CODE' | 'MULTIPLE_CHOICE' | 'FILL_BLANK' | 'MATCHING' | 'WORD_BANK';
  question: string;
  options?: string[];
  hints?: string[];
  timeLimit: number;
}

const LessonScreen = () => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const progress = useSharedValue(0);

  const [content] = useState<LessonContent[]>([
    // Sample content - replace with actual lesson content
    {
      id: 1,
      type: 'TEXT',
      question: 'Let\'s learn about Python print statements!',
      timeLimit: 30,
    },
    {
      id: 2,
      type: 'CODE',
      question: 'Complete the print statement:',
      options: ['print("Hello, World!")', 'console.log("Hello, World!")'],
      timeLimit: 60,
    },
    // Add more content...
  ]);

  useEffect(() => {
    progress.value = withSpring(currentIndex / (content.length - 1));
  }, [currentIndex, content.length, progress]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  const renderQuestion = (item: LessonContent) => {
    switch (item.type) {
      case 'TEXT':
        return (
          <View style={styles.textContainer}>
            <Text style={styles.questionText}>{item.question}</Text>
          </View>
        );

      case 'CODE':
        return (
          <View style={styles.codeContainer}>
            <Text style={styles.questionText}>{item.question}</Text>
            <CodeEditor
              style={styles.codeEditor}
              language="python"
              syntaxStyle={{
                keyword: { color: '#7c4dff' },
                string: { color: '#43a047' },
                comment: { color: '#999999' },
              }}
              showLineNumbers
            />
          </View>
        );

      case 'MULTIPLE_CHOICE':
        return (
          <View style={styles.multipleChoiceContainer}>
            <Text style={styles.questionText}>{item.question}</Text>
            {item.options?.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionButton}
                onPress={() => handleAnswer(option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        );

      case 'WORD_BANK':
        return (
          <View style={styles.wordBankContainer}>
            <Text style={styles.questionText}>{item.question}</Text>
            <View style={styles.wordBank}>
              {item.options?.map((word, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.wordChip}
                  onPress={() => handleWordSelect(word)}
                >
                  <Text style={styles.wordChipText}>{word}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  const handleAnswer = (answer: string) => {
    // Implement answer validation and progression
    if (currentIndex < content.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Lesson complete
      navigation.goBack();
    }
  };

  const handleWordSelect = (word: string) => {
    // Implement word bank selection logic
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.closeButton}
        >
          <Icon name="close" size={24} color="#666" />
        </TouchableOpacity>
        
        {/* Progress bar */}
        <View style={styles.progressContainer}>
          <Animated.View style={[styles.progressBar, progressStyle]} />
        </View>

        {/* Hearts */}
        <View style={styles.heartsContainer}>
          {Array.from({ length: hearts }).map((_, i) => (
            <Icon key={i} name="heart" size={20} color="#ff4b4b" />
          ))}
        </View>
      </View>

      {/* Timer */}
      {timeLeft > 0 && (
        <View style={styles.timerContainer}>
          <Icon name="clock-outline" size={20} color="#666" />
          <Text style={styles.timerText}>{timeLeft}s</Text>
        </View>
      )}

      {/* Main content */}
      <ScrollView
        contentContainerStyle={styles.content}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {renderQuestion(content[currentIndex])}
      </ScrollView>

      {/* Hint button */}
      {content[currentIndex].hints && (
        <TouchableOpacity
          style={styles.hintButton}
          onPress={() => setShowHint(!showHint)}
        >
          <Icon name="lightbulb-outline" size={20} color="#666" />
          <Text style={styles.hintButtonText}>Need a hint?</Text>
        </TouchableOpacity>
      )}

      {/* Hint content */}
      {showHint && content[currentIndex].hints && (
        <Animated.View
          entering={withTiming({ opacity: 1, transform: [{ translateY: 0 }] })}
          style={styles.hintContainer}
        >
          <Text style={styles.hintText}>{content[currentIndex].hints[0]}</Text>
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  closeButton: {
    padding: 8,
  },
  progressContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#eee',
    borderRadius: 4,
    marginHorizontal: 16,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#58CC02',
    borderRadius: 4,
  },
  heartsContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    backgroundColor: '#f5f5f5',
  },
  timerText: {
    marginLeft: 4,
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  content: {
    padding: 16,
  },
  textContainer: {
    marginBottom: 24,
  },
  codeContainer: {
    marginBottom: 24,
  },
  codeEditor: {
    marginTop: 16,
    height: 200,
    borderRadius: 8,
    backgroundColor: '#1e1e1e',
  },
  multipleChoiceContainer: {
    marginBottom: 24,
  },
  wordBankContainer: {
    marginBottom: 24,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  optionButton: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    marginBottom: 8,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  wordBank: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  wordChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#e3f2fd',
  },
  wordChipText: {
    fontSize: 14,
    color: '#1976d2',
  },
  hintButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  hintButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#666',
  },
  hintContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: '#fff9c4',
    borderRadius: 8,
  },
  hintText: {
    fontSize: 14,
    color: '#666',
  },
});

export default LessonScreen;
