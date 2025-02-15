import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../../../shared/styles/theme';
import { CodeBlock } from '../../components/code/CodeBlock';
import { ScaleView } from '../../components/animations/ScaleView';

interface ChallengeTemplate {
  id: string;
  title: string;
  description: string;
  type: 'code' | 'quiz' | 'debug';
  difficulty: 'easy' | 'medium' | 'hard';
  xpReward: number;
  gemReward: number;
  timeLimit?: number;
}

export const CreateChallengeScreen = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');
  const [solution, setSolution] = useState('');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [type, setType] = useState<'code' | 'quiz' | 'debug'>('code');
  const [timeLimit, setTimeLimit] = useState(300); // 5 minutes
  const [isPrivate, setIsPrivate] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<ChallengeTemplate | null>(null);

  const templates: ChallengeTemplate[] = [
    {
      id: '1',
      title: 'Algorithm Challenge',
      description: 'Create a coding challenge that tests algorithmic thinking',
      type: 'code',
      difficulty: 'medium',
      xpReward: 100,
      gemReward: 50,
      timeLimit: 300,
    },
    {
      id: '2',
      title: 'Debug Challenge',
      description: 'Create a challenge where users need to find and fix bugs',
      type: 'debug',
      difficulty: 'hard',
      xpReward: 150,
      gemReward: 75,
      timeLimit: 600,
    },
    // Add more templates...
  ];

  const handleTemplateSelect = (template: ChallengeTemplate) => {
    setSelectedTemplate(template);
    setType(template.type);
    setDifficulty(template.difficulty);
    setTimeLimit(template.timeLimit || 300);
  };

  const handleCreate = () => {
    // Validate inputs
    if (!title.trim() || !description.trim() || !code.trim() || !solution.trim()) {
      // Show error
      return;
    }

    // Create challenge
    const challenge = {
      title,
      description,
      code,
      solution,
      type,
      difficulty,
      timeLimit,
      isPrivate,
      template: selectedTemplate?.id,
    };

    // Submit challenge
    console.log('Creating challenge:', challenge);
    navigation.goBack();
  };

  const renderTemplates = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.templatesContainer}
    >
      {templates.map((template) => (
        <ScaleView
          key={template.id}
          onPress={() => handleTemplateSelect(template)}
          style={[
            styles.templateCard,
            selectedTemplate?.id === template.id && styles.selectedTemplate,
          ]}
        >
          <Icon
            name={
              template.type === 'code'
                ? 'code-braces'
                : template.type === 'quiz'
                ? 'help-circle'
                : 'bug'
            }
            size={24}
            color={theme.colors.primary}
          />
          <Text style={styles.templateTitle}>{template.title}</Text>
          <Text style={styles.templateDescription}>
            {template.description}
          </Text>
          <View style={styles.templateStats}>
            <View style={styles.templateStat}>
              <Icon name="star" size={16} color={theme.colors.warning} />
              <Text style={styles.templateStatText}>
                {template.difficulty}
              </Text>
            </View>
            <View style={styles.templateStat}>
              <Icon name="clock" size={16} color={theme.colors.text.secondary} />
              <Text style={styles.templateStatText}>
                {template.timeLimit ? `${template.timeLimit / 60}m` : 'No limit'}
              </Text>
            </View>
          </View>
        </ScaleView>
      ))}
    </ScrollView>
  );

  const renderDifficultySelector = () => (
    <View style={styles.difficultyContainer}>
      {(['easy', 'medium', 'hard'] as const).map((d) => (
        <TouchableOpacity
          key={d}
          style={[
            styles.difficultyButton,
            difficulty === d && styles.selectedDifficulty,
            {
              backgroundColor:
                d === 'easy'
                  ? theme.colors.success + '20'
                  : d === 'medium'
                  ? theme.colors.warning + '20'
                  : theme.colors.error + '20',
            },
          ]}
          onPress={() => setDifficulty(d)}
        >
          <Text
            style={[
              styles.difficultyText,
              {
                color:
                  d === 'easy'
                    ? theme.colors.success
                    : d === 'medium'
                    ? theme.colors.warning
                    : theme.colors.error,
              },
            ]}
          >
            {d.charAt(0).toUpperCase() + d.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Challenge Template</Text>
        {renderTemplates()}

        <Text style={styles.sectionTitle}>Basic Information</Text>
        <TextInput
          style={styles.input}
          placeholder="Challenge Title"
          value={title}
          onChangeText={setTitle}
          placeholderTextColor={theme.colors.text.disabled}
        />

        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="Challenge Description"
          value={description}
          onChangeText={setDescription}
          multiline
          placeholderTextColor={theme.colors.text.disabled}
        />

        <Text style={styles.sectionTitle}>Difficulty</Text>
        {renderDifficultySelector()}

        <Text style={styles.sectionTitle}>Challenge Code</Text>
        <View style={styles.codeContainer}>
          <TextInput
            style={[styles.input, styles.codeInput]}
            placeholder="Enter the challenge code here..."
            value={code}
            onChangeText={setCode}
            multiline
            placeholderTextColor={theme.colors.text.disabled}
          />
          {code && (
            <View style={styles.codePreview}>
              <Text style={styles.previewLabel}>Preview:</Text>
              <CodeBlock code={code} language="javascript" />
            </View>
          )}
        </View>

        <Text style={styles.sectionTitle}>Solution</Text>
        <View style={styles.codeContainer}>
          <TextInput
            style={[styles.input, styles.codeInput]}
            placeholder="Enter the solution code here..."
            value={solution}
            onChangeText={setSolution}
            multiline
            placeholderTextColor={theme.colors.text.disabled}
          />
          {solution && (
            <View style={styles.codePreview}>
              <Text style={styles.previewLabel}>Preview:</Text>
              <CodeBlock code={solution} language="javascript" />
            </View>
          )}
        </View>

        <Text style={styles.sectionTitle}>Settings</Text>
        <View style={styles.settingsContainer}>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Time Limit</Text>
            <TextInput
              style={styles.timeInput}
              value={String(timeLimit / 60)}
              onChangeText={(text) => setTimeLimit(Number(text) * 60)}
              keyboardType="number-pad"
              placeholder="Minutes"
              placeholderTextColor={theme.colors.text.disabled}
            />
          </View>

          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Private Challenge</Text>
            <Switch
              value={isPrivate}
              onValueChange={setIsPrivate}
              trackColor={{
                false: theme.colors.border,
                true: theme.colors.primary,
              }}
              thumbColor={theme.colors.surface}
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.createButton,
            (!title || !description || !code || !solution) &&
              styles.disabledButton,
          ]}
          onPress={handleCreate}
          disabled={!title || !description || !code || !solution}
        >
          <Text style={styles.createButtonText}>Create Challenge</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    padding: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  templatesContainer: {
    marginBottom: theme.spacing.lg,
  },
  templateCard: {
    width: 200,
    padding: theme.spacing.md,
    marginRight: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    ...theme.shadows.small,
  },
  selectedTemplate: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  templateTitle: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.primary,
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.xs,
  },
  templateDescription: {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.sm,
  },
  templateStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  templateStat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  templateStatText: {
    marginLeft: theme.spacing.xs,
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text.secondary,
  },
  input: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  difficultyContainer: {
    flexDirection: 'row',
    marginBottom: theme.spacing.lg,
  },
  difficultyButton: {
    flex: 1,
    padding: theme.spacing.md,
    marginHorizontal: theme.spacing.xs,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  selectedDifficulty: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  difficultyText: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.bold,
  },
  codeContainer: {
    marginBottom: theme.spacing.lg,
  },
  codeInput: {
    fontFamily: theme.typography.fontFamily.mono,
    minHeight: 150,
  },
  codePreview: {
    marginTop: theme.spacing.sm,
  },
  previewLabel: {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
  },
  settingsContainer: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  settingLabel: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text.primary,
  },
  timeInput: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm,
    width: 80,
    textAlign: 'center',
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.text.primary,
  },
  footer: {
    padding: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  createButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  createButtonText: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.inverse,
  },
});
