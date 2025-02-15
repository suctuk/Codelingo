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
import { CodeEditor } from '../code/CodeEditor';
import { SyntaxComparison } from './SyntaxComparison';
import { FeatureExplorer } from './FeatureExplorer';
import { PracticeExercise } from './PracticeExercise';
import { useTheme } from '../../hooks/useTheme';

interface LanguageTransitionScreenProps {
  sourceLanguage: string;
  targetLanguage: string;
  transitionPath: {
    features: any[];
    syntax: any;
    exercises: any[];
  };
  onProgress: (progress: any) => void;
}

export const LanguageTransitionScreen: React.FC<LanguageTransitionScreenProps> = ({
  sourceLanguage,
  targetLanguage,
  transitionPath,
  onProgress,
}) => {
  const { colors } = useTheme();
  const [currentMode, setCurrentMode] = useState<'syntax' | 'features' | 'practice'>('syntax');
  const [progress, setProgress] = useState({
    syntax: 0,
    features: 0,
    practice: 0,
  });
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const [showComparison, setShowComparison] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(1));

  const handleModeChange = (mode: 'syntax' | 'features' | 'practice') => {
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

  const renderSyntaxMode = () => (
    <View style={styles.modeContainer}>
      <SyntaxComparison
        sourceLanguage={sourceLanguage}
        targetLanguage={targetLanguage}
        syntaxMappings={transitionPath.syntax}
        onUnderstanding={(understanding) => {
          setProgress(prev => ({
            ...prev,
            syntax: Math.min(100, prev.syntax + understanding),
          }));
        }}
      />
      {showComparison && (
        <View style={styles.comparisonContainer}>
          <View style={styles.codeContainer}>
            <Text style={[styles.languageLabel, { color: colors.text.secondary }]}>
              {sourceLanguage.toUpperCase()}
            </Text>
            <CodeBlock
              code={transitionPath.syntax[currentFeatureIndex]?.source}
              language={sourceLanguage}
            />
          </View>
          <View style={styles.arrow}>
            <Text>→</Text>
          </View>
          <View style={styles.codeContainer}>
            <Text style={[styles.languageLabel, { color: colors.text.secondary }]}>
              {targetLanguage.toUpperCase()}
            </Text>
            <CodeBlock
              code={transitionPath.syntax[currentFeatureIndex]?.target}
              language={targetLanguage}
            />
          </View>
        </View>
      )}
    </View>
  );

  const renderFeaturesMode = () => (
    <View style={styles.modeContainer}>
      <FeatureExplorer
        features={transitionPath.features}
        sourceLanguage={sourceLanguage}
        targetLanguage={targetLanguage}
        onFeatureLearned={(featureIndex) => {
          setProgress(prev => ({
            ...prev,
            features: Math.min(100, prev.features + (100 / transitionPath.features.length)),
          }));
        }}
      />
    </View>
  );

  const renderPracticeMode = () => (
    <View style={styles.modeContainer}>
      <PracticeExercise
        exercise={transitionPath.exercises[currentFeatureIndex]}
        sourceLanguage={sourceLanguage}
        targetLanguage={targetLanguage}
        onComplete={(success) => {
          if (success) {
            setProgress(prev => ({
              ...prev,
              practice: Math.min(100, prev.practice + (100 / transitionPath.exercises.length)),
            }));
          }
        }}
      />
    </View>
  );

  useEffect(() => {
    onProgress(progress);
  }, [progress]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text.primary }]}>
          {sourceLanguage.toUpperCase()} → {targetLanguage.toUpperCase()}
        </Text>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <Animated.View
              style={[
                styles.progressFill,
                {
                  backgroundColor: colors.primary,
                  width: `${(progress.syntax + progress.features + progress.practice) / 3}%`,
                },
              ]}
            />
          </View>
          <Text style={[styles.progressText, { color: colors.text.secondary }]}>
            {Math.round((progress.syntax + progress.features + progress.practice) / 3)}%
          </Text>
        </View>
      </View>

      <View style={styles.modeSwitcher}>
        <TouchableOpacity
          style={[
            styles.modeButton,
            currentMode === 'syntax' && { backgroundColor: colors.primary },
          ]}
          onPress={() => handleModeChange('syntax')}
        >
          <Text
            style={[
              styles.modeButtonText,
              { color: currentMode === 'syntax' ? '#fff' : colors.text.primary },
            ]}
          >
            Syntax
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.modeButton,
            currentMode === 'features' && { backgroundColor: colors.primary },
          ]}
          onPress={() => handleModeChange('features')}
        >
          <Text
            style={[
              styles.modeButtonText,
              { color: currentMode === 'features' ? '#fff' : colors.text.primary },
            ]}
          >
            Features
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.modeButton,
            currentMode === 'practice' && { backgroundColor: colors.primary },
          ]}
          onPress={() => handleModeChange('practice')}
        >
          <Text
            style={[
              styles.modeButtonText,
              { color: currentMode === 'practice' ? '#fff' : colors.text.primary },
            ]}
          >
            Practice
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
        {currentMode === 'syntax' && renderSyntaxMode()}
        {currentMode === 'features' && renderFeaturesMode()}
        {currentMode === 'practice' && renderPracticeMode()}
      </Animated.View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.navigationButton, { opacity: currentFeatureIndex > 0 ? 1 : 0.5 }]}
          onPress={() => setCurrentFeatureIndex(Math.max(0, currentFeatureIndex - 1))}
          disabled={currentFeatureIndex === 0}
        >
          <Text style={[styles.navigationButtonText, { color: colors.primary }]}>
            Previous
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.navigationButton,
            {
              opacity:
                currentFeatureIndex < transitionPath[currentMode].length - 1 ? 1 : 0.5,
            },
          ]}
          onPress={() =>
            setCurrentFeatureIndex(
              Math.min(transitionPath[currentMode].length - 1, currentFeatureIndex + 1)
            )
          }
          disabled={currentFeatureIndex === transitionPath[currentMode].length - 1}
        >
          <Text style={[styles.navigationButtonText, { color: colors.primary }]}>
            Next
          </Text>
        </TouchableOpacity>
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
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#eee',
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 12,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '500',
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
  comparisonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  codeContainer: {
    flex: 1,
  },
  languageLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 8,
  },
  arrow: {
    paddingHorizontal: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  navigationButton: {
    padding: 12,
  },
  navigationButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
