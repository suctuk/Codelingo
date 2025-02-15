import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../../../shared/styles/theme';
import { ScaleView } from '../../components/animations/ScaleView';
import { Mascot } from '../../components/mascots/Mascot';

interface Language {
  id: string;
  name: string;
  icon: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  popularityRank: number;
}

const KNOWN_LANGUAGES: Language[] = [
  {
    id: 'python',
    name: 'Python',
    icon: '🐍',
    difficulty: 'beginner',
    popularityRank: 1,
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    icon: '🟨',
    difficulty: 'beginner',
    popularityRank: 2,
  },
  {
    id: 'java',
    name: 'Java',
    icon: '☕',
    difficulty: 'intermediate',
    popularityRank: 3,
  },
  {
    id: 'cpp',
    name: 'C++',
    icon: '⚡',
    difficulty: 'advanced',
    popularityRank: 4,
  },
  // Add more languages
];

const TARGET_LANGUAGES: Language[] = [
  {
    id: 'rust',
    name: 'Rust',
    icon: '🦀',
    difficulty: 'advanced',
    popularityRank: 5,
  },
  {
    id: 'go',
    name: 'Go',
    icon: '🐹',
    difficulty: 'intermediate',
    popularityRank: 6,
  },
  // Add more languages
];

export const LanguageSelectionScreen = () => {
  const navigation = useNavigation();
  const [step, setStep] = useState<'known' | 'target'>('known');
  const [selectedKnown, setSelectedKnown] = useState<string | null>(null);
  const [selectedTarget, setSelectedTarget] = useState<string | null>(null);

  const handleLanguageSelect = (languageId: string) => {
    if (step === 'known') {
      setSelectedKnown(languageId);
      setStep('target');
    } else {
      setSelectedTarget(languageId);
      navigation.navigate('ExperienceLevel', {
        knownLanguage: languageId,
        targetLanguage: selectedKnown,
      });
    }
  };

  const renderLanguageCard = (language: Language) => (
    <ScaleView
      key={language.id}
      onPress={() => handleLanguageSelect(language.id)}
      style={styles.cardContainer}
    >
      <LinearGradient
        colors={[theme.colors.surface, theme.colors.background]}
        style={[
          styles.card,
          (step === 'known' ? selectedKnown : selectedTarget) === language.id &&
            styles.selectedCard,
        ]}
      >
        <Text style={styles.languageIcon}>{language.icon}</Text>
        <Text style={styles.languageName}>{language.name}</Text>
        <View style={styles.difficultyContainer}>
          <Icon
            name="star"
            size={16}
            color={theme.colors.warning}
            style={styles.difficultyIcon}
          />
          <Text style={styles.difficultyText}>{language.difficulty}</Text>
        </View>
        {language.popularityRank <= 3 && (
          <View style={styles.popularBadge}>
            <Text style={styles.popularText}>Popular</Text>
          </View>
        )}
      </LinearGradient>
    </ScaleView>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {step === 'known'
            ? 'What programming language do you know?'
            : 'What do you want to learn?'}
        </Text>
        <Text style={styles.subtitle}>
          {step === 'known'
            ? 'Select your most comfortable language'
            : 'Choose a language to start learning'}
        </Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.grid}>
          {(step === 'known' ? KNOWN_LANGUAGES : TARGET_LANGUAGES)
            .sort((a, b) => a.popularityRank - b.popularityRank)
            .map(renderLanguageCard)}
        </View>
      </ScrollView>

      <View style={styles.mascotContainer}>
        <Mascot
          type="robot"
          mood="excited"
          size="large"
          animate={true}
        />
      </View>

      {step === 'target' && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setStep('known')}
        >
          <Icon name="arrow-left" size={24} color={theme.colors.text.primary} />
          <Text style={styles.backText}>Change known language</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: theme.spacing.lg,
    alignItems: 'center',
  },
  title: {
    fontSize: theme.typography.fontSize.xl,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: theme.spacing.md,
    justifyContent: 'center',
  },
  cardContainer: {
    width: '45%',
    margin: theme.spacing.sm,
  },
  card: {
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.border,
    ...theme.shadows.small,
  },
  selectedCard: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary + '10',
  },
  languageIcon: {
    fontSize: 36,
    marginBottom: theme.spacing.sm,
  },
  languageName: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  difficultyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  difficultyIcon: {
    marginRight: 4,
  },
  difficultyText: {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text.secondary,
    textTransform: 'capitalize',
  },
  popularBadge: {
    position: 'absolute',
    top: -10,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    backgroundColor: theme.colors.warning,
    borderRadius: theme.borderRadius.full,
  },
  popularText: {
    fontSize: theme.typography.fontSize.xs,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.inverse,
  },
  mascotContainer: {
    position: 'absolute',
    bottom: 80,
    right: theme.spacing.md,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  backText: {
    marginLeft: theme.spacing.sm,
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text.primary,
  },
});
