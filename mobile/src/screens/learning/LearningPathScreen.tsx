import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../../../shared/styles/theme';
import { Mascot } from '../../components/mascots/Mascot';
import { ScaleView } from '../../components/animations/ScaleView';
import { useApp } from '../../context/AppContext';

interface Unit {
  id: string;
  title: string;
  description: string;
  sections: {
    id: string;
    title: string;
    lessons: {
      id: string;
      title: string;
      type: 'text' | 'code' | 'quiz';
      isLocked: boolean;
      isCompleted: boolean;
      progress: number;
    }[];
  }[];
  isLocked: boolean;
  isCompleted: boolean;
  mascot?: {
    type: 'robot' | 'computer';
    mood: 'happy' | 'sad' | 'excited' | 'thinking';
  };
}

export const LearningPathScreen = () => {
  const navigation = useNavigation();
  const { state } = useApp();
  const [units, setUnits] = useState<Unit[]>([]);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const expandAnim = new Animated.Value(0);

  useEffect(() => {
    // Fetch units from API
    fetchUnits();
  }, []);

  const fetchUnits = async () => {
    // Mock data - replace with API call
    const mockUnits: Unit[] = [
      {
        id: '1',
        title: 'Getting Started',
        description: 'Learn the basics of Python syntax and data types',
        sections: [
          {
            id: '1',
            title: 'Print Statements',
            lessons: [
              {
                id: '1',
                title: 'Introduction to Print',
                type: 'text',
                isLocked: false,
                isCompleted: true,
                progress: 100,
              },
              {
                id: '2',
                title: 'Multiple Arguments',
                type: 'code',
                isLocked: false,
                isCompleted: false,
                progress: 0,
              },
            ],
          },
          // Add more sections...
        ],
        isLocked: false,
        isCompleted: false,
        mascot: {
          type: 'robot',
          mood: 'excited',
        },
      },
      // Add more units...
    ];

    setUnits(mockUnits);
  };

  const handleUnitPress = (unit: Unit) => {
    if (unit.isLocked) {
      // Show unlock dialog
      return;
    }

    setSelectedUnit(unit);
    Animated.timing(expandAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setIsExpanded(true);
  };

  const handleUnitClose = () => {
    Animated.timing(expandAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setSelectedUnit(null);
      setIsExpanded(false);
    });
  };

  const handleBypassTest = () => {
    navigation.navigate('UnitBypassTest');
  };

  const renderUnit = (unit: Unit) => (
    <ScaleView
      key={unit.id}
      onPress={() => handleUnitPress(unit)}
      style={styles.unitContainer}
    >
      <LinearGradient
        colors={
          unit.isLocked
            ? ['#E0E0E0', '#CCCCCC']
            : unit.isCompleted
            ? [theme.colors.success, theme.colors.primaryDark]
            : [theme.colors.primary, theme.colors.primaryDark]
        }
        style={styles.unit}
      >
        <View style={styles.unitHeader}>
          <Text style={styles.unitTitle}>{unit.title}</Text>
          {unit.isLocked && (
            <Icon name="lock" size={24} color={theme.colors.text.disabled} />
          )}
        </View>
        <Text style={styles.unitDescription}>{unit.description}</Text>
        {unit.mascot && (
          <View style={styles.mascotContainer}>
            <Mascot
              type={unit.mascot.type}
              mood={unit.mascot.mood}
              size="small"
              animate={!unit.isLocked}
            />
          </View>
        )}
      </LinearGradient>
    </ScaleView>
  );

  const renderExpandedUnit = () => {
    if (!selectedUnit) return null;

    const expandStyle = {
      maxHeight: expandAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 500],
      }),
      opacity: expandAnim,
    };

    return (
      <Animated.View style={[styles.expandedUnit, expandStyle]}>
        <View style={styles.expandedHeader}>
          <TouchableOpacity onPress={handleUnitClose}>
            <Icon name="close" size={24} color={theme.colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.expandedTitle}>{selectedUnit.title}</Text>
          <TouchableOpacity onPress={handleBypassTest}>
            <Text style={styles.bypassText}>Take Test</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.sections}>
          {selectedUnit.sections.map((section) => (
            <View key={section.id} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              {section.lessons.map((lesson) => (
                <TouchableOpacity
                  key={lesson.id}
                  style={[
                    styles.lesson,
                    lesson.isLocked && styles.lockedLesson,
                  ]}
                  onPress={() =>
                    !lesson.isLocked &&
                    navigation.navigate('Lesson', { lessonId: lesson.id })
                  }
                  disabled={lesson.isLocked}
                >
                  <View style={styles.lessonContent}>
                    <Icon
                      name={
                        lesson.type === 'text'
                          ? 'text-box'
                          : lesson.type === 'code'
                          ? 'code-braces'
                          : 'help-circle'
                      }
                      size={24}
                      color={
                        lesson.isLocked
                          ? theme.colors.text.disabled
                          : theme.colors.text.primary
                      }
                    />
                    <Text
                      style={[
                        styles.lessonTitle,
                        lesson.isLocked && styles.lockedText,
                      ]}
                    >
                      {lesson.title}
                    </Text>
                  </View>
                  {lesson.isCompleted ? (
                    <Icon
                      name="check-circle"
                      size={24}
                      color={theme.colors.success}
                    />
                  ) : lesson.isLocked ? (
                    <Icon
                      name="lock"
                      size={24}
                      color={theme.colors.text.disabled}
                    />
                  ) : (
                    <View style={styles.progressCircle}>
                      <Text style={styles.progressText}>
                        {lesson.progress}%
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </ScrollView>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        scrollEnabled={!isExpanded}
      >
        {units.map(renderUnit)}
      </ScrollView>
      {renderExpandedUnit()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: theme.spacing.md,
  },
  unitContainer: {
    marginBottom: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.medium,
  },
  unit: {
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    minHeight: 150,
  },
  unitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  unitTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.inverse,
  },
  unitDescription: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.text.inverse,
    opacity: 0.8,
  },
  mascotContainer: {
    position: 'absolute',
    bottom: theme.spacing.md,
    right: theme.spacing.md,
  },
  expandedUnit: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.background,
    zIndex: 1000,
  },
  expandedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  expandedTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.primary,
  },
  bypassText: {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.secondary,
  },
  sections: {
    flex: 1,
  },
  section: {
    padding: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  lesson: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.sm,
  },
  lockedLesson: {
    opacity: 0.5,
  },
  lessonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lessonTitle: {
    marginLeft: theme.spacing.sm,
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text.primary,
  },
  lockedText: {
    color: theme.colors.text.disabled,
  },
  progressCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.inverse,
  },
});
