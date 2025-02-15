import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView,
} from 'react-native';
import { CodeBlock } from '../code/CodeBlock';
import { CodeEditor } from '../code/CodeEditor';
import { useTheme } from '../../hooks/useTheme';
import { SyntaxHighlight } from './SyntaxHighlight';
import { DiffView } from './DiffView';

interface InteractiveCodeComparisonProps {
  sourceLanguage: string;
  targetLanguage: string;
  sourceCode: string;
  targetCode: string;
  explanation: string[];
  onRunCode?: (code: string, language: string) => Promise<string>;
  onComplete?: () => void;
}

export const InteractiveCodeComparison: React.FC<InteractiveCodeComparisonProps> = ({
  sourceLanguage,
  targetLanguage,
  sourceCode,
  targetCode,
  explanation,
  onRunCode,
  onComplete,
}) => {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState<'compare' | 'practice' | 'run'>('compare');
  const [userCode, setUserCode] = useState('');
  const [output, setOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [highlightedLines, setHighlightedLines] = useState<number[]>([]);
  const [slideAnim] = useState(new Animated.Value(0));

  const handleTabChange = (tab: 'compare' | 'practice' | 'run') => {
    Animated.timing(slideAnim, {
      toValue: tab === 'compare' ? 0 : tab === 'practice' ? 1 : 2,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setActiveTab(tab);
  };

  const handleRunCode = async () => {
    if (onRunCode && userCode) {
      setIsRunning(true);
      try {
        const result = await onRunCode(userCode, targetLanguage);
        setOutput(result);
      } catch (error) {
        setOutput(error.message);
      }
      setIsRunning(false);
    }
  };

  const renderCompareTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.codeContainer}>
        <View style={styles.codeHeader}>
          <Text style={[styles.languageTitle, { color: colors.text.primary }]}>
            {sourceLanguage}
          </Text>
        </View>
        <SyntaxHighlight
          code={sourceCode}
          language={sourceLanguage.toLowerCase()}
          highlightedLines={highlightedLines}
        />
      </View>

      <View style={styles.comparisonArrow}>
        <Text style={{ color: colors.text.secondary }}>↓</Text>
      </View>

      <View style={styles.codeContainer}>
        <View style={styles.codeHeader}>
          <Text style={[styles.languageTitle, { color: colors.text.primary }]}>
            {targetLanguage}
          </Text>
        </View>
        <SyntaxHighlight
          code={targetCode}
          language={targetLanguage.toLowerCase()}
          highlightedLines={highlightedLines}
        />
      </View>

      <DiffView
        sourceCode={sourceCode}
        targetCode={targetCode}
        onLineHover={setHighlightedLines}
      />

      <ScrollView style={styles.explanationContainer}>
        {explanation.map((item, index) => (
          <View key={index} style={styles.explanationItem}>
            <Text style={[styles.explanationNumber, { color: colors.primary }]}>
              {index + 1}
            </Text>
            <Text style={[styles.explanationText, { color: colors.text.primary }]}>
              {item}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );

  const renderPracticeTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.practiceContainer}>
        <Text style={[styles.practicePrompt, { color: colors.text.primary }]}>
          Convert this {sourceLanguage} code to {targetLanguage}:
        </Text>
        <CodeBlock
          code={sourceCode}
          language={sourceLanguage.toLowerCase()}
        />
        <CodeEditor
          value={userCode}
          onChangeText={setUserCode}
          language={targetLanguage.toLowerCase()}
          placeholder={`Write your ${targetLanguage} code here...`}
        />
        <TouchableOpacity
          style={[styles.checkButton, { backgroundColor: colors.primary }]}
          onPress={() => {
            // Compare userCode with targetCode
            if (userCode.trim() === targetCode.trim()) {
              onComplete?.();
            }
          }}
        >
          <Text style={styles.checkButtonText}>Check Solution</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderRunTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.runContainer}>
        <CodeEditor
          value={userCode || targetCode}
          onChangeText={setUserCode}
          language={targetLanguage.toLowerCase()}
          placeholder={`Modify the ${targetLanguage} code here...`}
        />
        <TouchableOpacity
          style={[
            styles.runButton,
            { backgroundColor: colors.primary },
            isRunning && { opacity: 0.7 },
          ]}
          onPress={handleRunCode}
          disabled={isRunning}
        >
          <Text style={styles.runButtonText}>
            {isRunning ? 'Running...' : 'Run Code'}
          </Text>
        </TouchableOpacity>
        {output !== null && (
          <View style={styles.outputContainer}>
            <Text style={[styles.outputTitle, { color: colors.text.primary }]}>
              Output:
            </Text>
            <Text style={[styles.output, { color: colors.text.secondary }]}>
              {output}
            </Text>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'compare' && { borderBottomColor: colors.primary },
          ]}
          onPress={() => handleTabChange('compare')}
        >
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'compare' ? colors.primary : colors.text.secondary },
            ]}
          >
            Compare
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'practice' && { borderBottomColor: colors.primary },
          ]}
          onPress={() => handleTabChange('practice')}
        >
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'practice' ? colors.primary : colors.text.secondary },
            ]}
          >
            Practice
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'run' && { borderBottomColor: colors.primary },
          ]}
          onPress={() => handleTabChange('run')}
        >
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'run' ? colors.primary : colors.text.secondary },
            ]}
          >
            Run
          </Text>
        </TouchableOpacity>
      </View>

      <Animated.View
        style={[
          styles.tabContentContainer,
          {
            transform: [
              {
                translateX: slideAnim.interpolate({
                  inputRange: [0, 1, 2],
                  outputRange: [0, -100, -200],
                }),
              },
            ],
          },
        ]}
      >
        {activeTab === 'compare' && renderCompareTab()}
        {activeTab === 'practice' && renderPracticeTab()}
        {activeTab === 'run' && renderRunTab()}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  tabContentContainer: {
    flex: 1,
  },
  tabContent: {
    flex: 1,
    padding: 16,
  },
  codeContainer: {
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  codeHeader: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  languageTitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  comparisonArrow: {
    alignItems: 'center',
    marginVertical: 8,
  },
  explanationContainer: {
    marginTop: 16,
  },
  explanationItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  explanationNumber: {
    fontSize: 14,
    fontWeight: '500',
    marginRight: 8,
  },
  explanationText: {
    flex: 1,
    fontSize: 14,
  },
  practiceContainer: {
    flex: 1,
  },
  practicePrompt: {
    fontSize: 16,
    marginBottom: 16,
  },
  checkButton: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  runContainer: {
    flex: 1,
  },
  runButton: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  runButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  outputContainer: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  outputTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  output: {
    fontSize: 14,
    fontFamily: 'monospace',
  },
});
