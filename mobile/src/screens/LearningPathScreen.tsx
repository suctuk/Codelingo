import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const UNIT_SIZE = SCREEN_WIDTH * 0.35;
const PATH_WIDTH = 4;

interface Unit {
  id: number;
  title: string;
  description: string;
  icon: string;
  status: 'locked' | 'unlocked' | 'completed';
  progress: number;
  sections: {
    id: number;
    title: string;
    lessons: {
      id: number;
      title: string;
      type: string;
      completed: boolean;
    }[];
  }[];
}

const SAMPLE_UNITS: Unit[] = [
  {
    id: 1,
    title: 'Getting Started',
    description: 'Learn the basics of Python syntax',
    icon: '🚀',
    status: 'completed',
    progress: 1,
    sections: [
      {
        id: 1,
        title: 'Print Statements',
        lessons: [
          { id: 1, title: 'Basic Print', type: 'TUTORIAL', completed: true },
          { id: 2, title: 'Variables', type: 'PRACTICE', completed: true },
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Data Types',
    description: 'Understanding Python data types',
    icon: '📊',
    status: 'unlocked',
    progress: 0.5,
    sections: [
      {
        id: 2,
        title: 'Numbers and Strings',
        lessons: [
          { id: 3, title: 'Numbers', type: 'TUTORIAL', completed: true },
          { id: 4, title: 'Strings', type: 'PRACTICE', completed: false },
        ],
      },
    ],
  },
  // Add more units...
];

const LearningPathScreen = () => {
  const navigation = useNavigation();
  const scrollRef = useRef<ScrollView>(null);
  const selectedUnit = useSharedValue<number | null>(null);

  const renderUnit = (unit: Unit, index: number) => {
    const isLeft = index % 2 === 0;
    const unitStyle = useAnimatedStyle(() => ({
      transform: [
        {
          scale: selectedUnit.value === unit.id ? withSpring(1.1) : withSpring(1),
        },
      ],
    }));

    return (
      <View
        key={unit.id}
        style={[
          styles.unitContainer,
          { alignSelf: isLeft ? 'flex-start' : 'flex-end' },
        ]}
      >
        {/* Path connector */}
        <View
          style={[
            styles.pathConnector,
            {
              left: isLeft ? UNIT_SIZE - PATH_WIDTH / 2 : -PATH_WIDTH / 2,
              height: UNIT_SIZE * 0.8,
            },
          ]}
        >
          <LinearGradient
            colors={['#58CC02', '#58CC02']}
            style={[StyleSheet.absoluteFill, { opacity: unit.progress }]}
          />
        </View>

        {/* Unit card */}
        <Animated.View style={[styles.unitCard, unitStyle]}>
          <TouchableOpacity
            onPress={() => {
              if (unit.status !== 'locked') {
                selectedUnit.value = unit.id;
                // Navigate to unit details
                navigation.navigate('UnitDetail', { unitId: unit.id });
              }
            }}
            style={[
              styles.unitContent,
              unit.status === 'locked' && styles.unitLocked,
            ]}
          >
            {/* Unit icon */}
            <View style={styles.unitIcon}>
              <Text style={styles.unitIconText}>{unit.icon}</Text>
              {unit.status === 'completed' && (
                <View style={styles.completedBadge}>
                  <Icon name="check" size={12} color="#fff" />
                </View>
              )}
            </View>

            {/* Unit title */}
            <Text style={styles.unitTitle}>{unit.title}</Text>

            {/* Progress indicator */}
            {unit.status !== 'locked' && (
              <View style={styles.progressBar}>
                <View
                  style={[styles.progressFill, { width: `${unit.progress * 100}%` }]}
                />
              </View>
            )}

            {/* Lock icon for locked units */}
            {unit.status === 'locked' && (
              <View style={styles.lockIcon}>
                <Icon name="lock" size={20} color="#999" />
              </View>
            )}
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Learning Path</Text>
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Icon name="star" size={20} color="#FFD700" />
            <Text style={styles.statText}>Level 5</Text>
          </View>
          <View style={styles.statItem}>
            <Icon name="fire" size={20} color="#FF4B4B" />
            <Text style={styles.statText}>7 Day Streak</Text>
          </View>
        </View>
      </View>

      {/* Learning path */}
      <ScrollView
        ref={scrollRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Main path line */}
        <View style={styles.mainPath} />

        {/* Units */}
        {SAMPLE_UNITS.map((unit, index) => renderUnit(unit, index))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  stats: {
    flexDirection: 'row',
    marginTop: 8,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  mainPath: {
    position: 'absolute',
    left: '50%',
    width: PATH_WIDTH,
    height: '100%',
    backgroundColor: '#ddd',
    zIndex: -1,
  },
  unitContainer: {
    width: UNIT_SIZE,
    marginVertical: 16,
  },
  pathConnector: {
    position: 'absolute',
    width: PATH_WIDTH,
    backgroundColor: '#ddd',
    zIndex: -1,
  },
  unitCard: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  unitContent: {
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  unitLocked: {
    opacity: 0.5,
  },
  unitIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  unitIconText: {
    fontSize: 24,
  },
  completedBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#58CC02',
    alignItems: 'center',
    justifyContent: 'center',
  },
  unitTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
    marginBottom: 8,
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: '#eee',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#58CC02',
  },
  lockIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -10 }, { translateY: -10 }],
  },
});

export default LearningPathScreen;
