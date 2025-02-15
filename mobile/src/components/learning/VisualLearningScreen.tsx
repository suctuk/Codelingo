import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { CodeBlock } from '../code/CodeBlock';
import { InteractiveAnimation } from './InteractiveAnimation';
import { StoryGame } from './StoryGame';
import { VisualPuzzle } from './VisualPuzzle';
import { RealWorldSimulation } from './RealWorldSimulation';
import { useTheme } from '../../hooks/useTheme';

interface VisualLearningScreenProps {
  concept: {
    id: string;
    analogies: any[];
    exercises: any[];
  };
  onComplete: (progress: any) => void;
}

export const VisualLearningScreen: React.FC<VisualLearningScreenProps> = ({
  concept,
  onComplete,
}) => {
  const { colors } = useTheme();
  const [currentMode, setCurrentMode] = useState<'story' | 'simulation' | 'puzzle'>('story');
  const [progress, setProgress] = useState({
    completed: false,
    score: 0,
    understanding: 0,
  });
  const [showHint, setShowHint] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(1));

  const handleModeChange = (mode: 'story' | 'simulation' | 'puzzle') => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
    setCurrentMode(mode);
  };

  const renderStoryMode = () => (
    <View style={styles.modeContainer}>
      <StoryGame
        story={{
          title: 'The Magic of Variables',
          scenes: [
            {
              setting: 'bedroom',
              description: 'Help Alex organize their room',
              task: {
                type: 'variable_creation',
                description: 'Create boxes to store different items',
                codeEquivalent: 'toys = []\nbooks = []',
              },
            },
            {
              setting: 'kitchen',
              description: 'Help make a sandwich',
              task: {
                type: 'loop_usage',
                description: 'Add ingredients one by one',
                codeEquivalent: 'for ingredient in ingredients:\n    add_to_sandwich(ingredient)',
              },
            },
          ],
        }}
        onProgress={(sceneProgress) => {
          setProgress(prev => ({
            ...prev,
            understanding: Math.min(100, prev.understanding + 10),
          }));
        }}
      />
    </View>
  );

  const renderSimulationMode = () => (
    <View style={styles.modeContainer}>
      <RealWorldSimulation
        scenario={{
          type: 'room_organization',
          objects: ['books', 'toys', 'clothes'],
          actions: ['create_container', 'add_item', 'check_container'],
          codeMapping: {
            create_container: 'variable = []',
            add_item: 'variable.append(item)',
            check_container: 'len(variable)',
          },
        }}
        onAction={(action) => {
          // Update progress based on correct actions
          setProgress(prev => ({
            ...prev,
            score: prev.score + 10,
          }));
        }}
      />
    </View>
  );

  const renderPuzzleMode = () => (
    <View style={styles.modeContainer}>
      <VisualPuzzle
        puzzle={{
          type: 'code_blocks',
          description: 'Arrange the blocks to create a program',
          blocks: [
            {
              type: 'variable_declaration',
              visual: 'box_creation',
              code: 'items = []',
            },
            {
              type: 'loop_start',
              visual: 'repeat_arrow',
              code: 'for item in new_items:',
            },
            {
              type: 'action',
              visual: 'add_item',
              code: '    items.append(item)',
            },
          ],
          solution: [0, 1, 2],
        }}
        onSolved={() => {
          setProgress(prev => ({
            ...prev,
            completed: true,
            understanding: 100,
          }));
          onComplete(progress);
        }}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text.primary }]}>
          Learn by Doing
        </Text>
        <View style={styles.progressBar}>
          <Animated.View
            style={[
              styles.progressFill,
              {
                backgroundColor: colors.primary,
                width: `${progress.understanding}%`,
              },
            ]}
          />
        </View>
      </View>

      <View style={styles.modeSwitcher}>
        <TouchableOpacity
          style={[
            styles.modeButton,
            currentMode === 'story' && { backgroundColor: colors.primary },
          ]}
          onPress={() => handleModeChange('story')}
        >
          <Text
            style={[
              styles.modeButtonText,
              { color: currentMode === 'story' ? '#fff' : colors.text.primary },
            ]}
          >
            Story
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.modeButton,
            currentMode === 'simulation' && { backgroundColor: colors.primary },
          ]}
          onPress={() => handleModeChange('simulation')}
        >
          <Text
            style={[
              styles.modeButtonText,
              { color: currentMode === 'simulation' ? '#fff' : colors.text.primary },
            ]}
          >
            Simulate
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.modeButton,
            currentMode === 'puzzle' && { backgroundColor: colors.primary },
          ]}
          onPress={() => handleModeChange('puzzle')}
        >
          <Text
            style={[
              styles.modeButtonText,
              { color: currentMode === 'puzzle' ? '#fff' : colors.text.primary },
            ]}
          >
            Puzzle
          </Text>
        </TouchableOpacity>
      </View>

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        {currentMode === 'story' && renderStoryMode()}
        {currentMode === 'simulation' && renderSimulationMode()}
        {currentMode === 'puzzle' && renderPuzzleMode()}
      </Animated.View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.hintButton, { borderColor: colors.primary }]}
          onPress={() => setShowHint(!showHint)}
        >
          <Text style={[styles.hintButtonText, { color: colors.primary }]}>
            {showHint ? 'Hide Hint' : 'Need a Hint?'}
          </Text>
        </TouchableOpacity>

        {showHint && (
          <View style={[styles.hintBox, { backgroundColor: colors.background.secondary }]}>
            <Text style={[styles.hintText, { color: colors.text.secondary }]}>
              Think about how you would organize things in real life. Each container is like
              a variable in code!
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#eee',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  modeSwitcher: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  modeButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 4,
    borderRadius: 8,
    alignItems: 'center',
  },
  modeButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  modeContainer: {
    flex: 1,
  },
  footer: {
    marginTop: 24,
  },
  hintButton: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  hintButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  hintBox: {
    marginTop: 12,
    padding: 16,
    borderRadius: 8,
  },
  hintText: {
    fontSize: 14,
    lineHeight: 20,
  },
});
