import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { CodeMascot } from '../../components/characters/CodeMascot';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Unit {
  id: number;
  title: string;
  description: string;
  icon: string;
  sections: Section[];
  locked: boolean;
  progress: number;
}

interface Section {
  id: number;
  title: string;
  description: string;
  conceptType: string;
  icon: string;
  character: {
    type: 'robot' | 'computer' | 'ai';
    name: string;
  };
  completed: boolean;
}

export const HomePage = () => {
  const { colors, spacing } = useTheme();
  const [selectedLanguagePair, setSelectedLanguagePair] = React.useState({
    from: 'JavaScript',
    to: 'Python',
  });

  // Mock data - replace with API calls
  const units: Unit[] = [
    {
      id: 1,
      title: 'Basics',
      description: 'Learn the fundamentals of Python syntax',
      icon: '🚀',
      locked: false,
      progress: 100,
      sections: [
        {
          id: 1,
          title: 'Print Statements',
          description: 'Learn how to output text',
          conceptType: 'print_statements',
          icon: '📝',
          character: {
            type: 'robot',
            name: 'Byte',
          },
          completed: true,
        },
        // Add more sections
      ],
    },
    {
      id: 2,
      title: 'Variables',
      description: 'Store and manipulate data',
      icon: '📦',
      locked: false,
      progress: 60,
      sections: [
        {
          id: 3,
          title: 'Data Types',
          description: 'Understanding different types of data',
          conceptType: 'data_types',
          icon: '🔢',
          character: {
            type: 'computer',
            name: 'Data',
          },
          completed: false,
        },
      ],
    },
    // Add more units
  ];

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.languagePair}>
        <Text style={[styles.languageText, { color: colors.text.primary }]}>
          {selectedLanguagePair.from}
        </Text>
        <Icon name="arrow-right" size={24} color={colors.text.secondary} />
        <Text style={[styles.languageText, { color: colors.text.primary }]}>
          {selectedLanguagePair.to}
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.changeButton, { backgroundColor: colors.primary }]}
        onPress={() => {/* Handle language change */}}
      >
        <Text style={[styles.changeButtonText, { color: colors.text.inverse }]}>
          Change
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderUnit = (unit: Unit) => (
    <View
      key={unit.id}
      style={[
        styles.unitContainer,
        { backgroundColor: colors.surface },
      ]}
    >
      <View style={styles.unitHeader}>
        <View style={styles.unitTitleContainer}>
          <Text style={styles.unitIcon}>{unit.icon}</Text>
          <View>
            <Text style={[styles.unitTitle, { color: colors.text.primary }]}>
              {unit.title}
            </Text>
            <Text style={[styles.unitDescription, { color: colors.text.secondary }]}>
              {unit.description}
            </Text>
          </View>
        </View>
        {unit.locked ? (
          <TouchableOpacity
            style={[styles.unlockButton, { backgroundColor: colors.warning }]}
          >
            <Icon name="lock" size={20} color={colors.text.inverse} />
            <Text style={[styles.unlockButtonText, { color: colors.text.inverse }]}>
              Unlock
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.progressContainer}>
            <View
              style={[
                styles.progressBar,
                { backgroundColor: colors.border },
              ]}
            >
              <View
                style={[
                  styles.progressFill,
                  {
                    backgroundColor: colors.success,
                    width: `${unit.progress}%`,
                  },
                ]}
              />
            </View>
            <Text style={[styles.progressText, { color: colors.text.secondary }]}>
              {unit.progress}%
            </Text>
          </View>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.sectionsScroll}
      >
        {unit.sections.map((section) => (
          <TouchableOpacity
            key={section.id}
            style={[
              styles.sectionCard,
              {
                backgroundColor: section.completed
                  ? colors.success + '20'
                  : colors.background,
              },
            ]}
          >
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionIcon}>{section.icon}</Text>
              {section.completed && (
                <Icon
                  name="check-circle"
                  size={20}
                  color={colors.success}
                  style={styles.completedIcon}
                />
              )}
            </View>
            <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
              {section.title}
            </Text>
            <Text
              style={[styles.sectionDescription, { color: colors.text.secondary }]}
              numberOfLines={2}
            >
              {section.description}
            </Text>
            <View style={styles.characterPreview}>
              <CodeMascot
                type={section.character.type}
                name={section.character.name}
                size="small"
              />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {renderHeader()}
      <View style={styles.unitsContainer}>
        {units.map(renderUnit)}
      </View>
    </ScrollView>
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  languagePair: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  languageText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  changeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  changeButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  unitsContainer: {
    padding: 16,
    gap: 16,
  },
  unitContainer: {
    borderRadius: 16,
    padding: 16,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  unitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  unitTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  unitIcon: {
    fontSize: 32,
  },
  unitTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  unitDescription: {
    fontSize: 14,
  },
  unlockButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  unlockButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  progressContainer: {
    alignItems: 'center',
    gap: 4,
  },
  progressBar: {
    width: 100,
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
  },
  sectionsScroll: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  sectionCard: {
    width: 200,
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionIcon: {
    fontSize: 24,
  },
  completedIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  sectionDescription: {
    fontSize: 12,
    lineHeight: 16,
  },
  characterPreview: {
    position: 'absolute',
    bottom: -20,
    right: -10,
    transform: [{ scale: 0.8 }],
  },
});
