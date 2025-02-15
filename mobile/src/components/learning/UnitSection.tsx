import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { FadeInView } from '../animations/FadeInView';
import { LessonCard } from './LessonCard';
import { theme } from '../../../shared/styles/theme';
import { Mascot } from '../mascots/Mascot';

interface Lesson {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  isLocked: boolean;
  isCompleted: boolean;
  type: 'text' | 'code' | 'quiz' | 'practice';
}

interface UnitSectionProps {
  title: string;
  description: string;
  lessons: Lesson[];
  mascot?: {
    type: 'robot' | 'computer';
    mood: 'happy' | 'sad' | 'excited' | 'thinking';
  };
  onLessonPress: (lessonId: string) => void;
}

export const UnitSection: React.FC<UnitSectionProps> = ({
  title,
  description,
  lessons,
  mascot,
  onLessonPress,
}) => {
  const scrollY = new Animated.Value(0);

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -50],
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      {/* Animated Header */}
      <Animated.View
        style={[
          styles.header,
          {
            transform: [{ translateY: headerTranslateY }],
            opacity: headerOpacity,
          },
        ]}
      >
        <View style={styles.headerContent}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>
          {mascot && (
            <View style={styles.mascotContainer}>
              <Mascot type={mascot.type} mood={mascot.mood} size="small" />
            </View>
          )}
        </View>
      </Animated.View>

      {/* Lessons Grid */}
      <Animated.ScrollView
        style={styles.scrollView}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.grid}>
          {lessons.map((lesson, index) => (
            <FadeInView
              key={lesson.id}
              style={styles.lessonCard}
              delay={index * 100}
            >
              <LessonCard
                title={lesson.title}
                description={lesson.description}
                icon={lesson.icon}
                progress={lesson.progress}
                isLocked={lesson.isLocked}
                isCompleted={lesson.isCompleted}
                onPress={() => onLessonPress(lesson.id)}
              />
            </FadeInView>
          ))}
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    zIndex: 1,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: theme.typography.fontSize.xl,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  description: {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.text.secondary,
  },
  mascotContainer: {
    marginLeft: theme.spacing.md,
  },
  scrollView: {
    flex: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: theme.spacing.sm,
  },
  lessonCard: {
    width: '50%',
    padding: theme.spacing.xs,
  },
});
