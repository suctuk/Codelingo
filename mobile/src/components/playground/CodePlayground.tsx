import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import MonacoEditor from 'react-monaco-editor';
import { useTheme } from '../../hooks/useTheme';
import { useLearning } from '../../hooks/useLearning';
import { CodeBlock } from '../code/CodeBlock';
import { ScaleView } from '../animations/ScaleView';

interface CodePlaygroundProps {
  initialCode?: string;
  language: string;
  theme?: 'vs-dark' | 'light';
  readOnly?: boolean;
  onCodeChange?: (code: string) => void;
  onRun?: (code: string) => void;
}

export const CodePlayground: React.FC<CodePlaygroundProps> = ({
  initialCode = '',
  language,
  theme = 'vs-dark',
  readOnly = false,
  onCodeChange,
  onRun,
}) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { colors, spacing } = useTheme();
  const { getAICodeSuggestions } = useLearning();

  useEffect(() => {
    if (code !== initialCode) {
      onCodeChange?.(code);
    }
  }, [code]);

  const handleEditorChange = (newCode: string) => {
    setCode(newCode);
  };

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('');
    try {
      const result = await onRun?.(code);
      setOutput(result || 'Code executed successfully!');
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleGetSuggestions = async () => {
    try {
      const { suggestions } = await getAICodeSuggestions(code);
      setSuggestions(suggestions.split('\n'));
      setShowSuggestions(true);
    } catch (error) {
      console.error('Error getting suggestions:', error);
    }
  };

  const editorOptions = {
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    fontSize: 14,
    lineNumbers: 'on',
    readOnly,
    automaticLayout: true,
  };

  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <Text style={[styles.languageLabel, { color: colors.text.primary }]}>
          {language.toUpperCase()}
        </Text>
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={handleGetSuggestions}
          >
            <Text style={styles.buttonText}>Get Suggestions</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.success }]}
            onPress={handleRun}
            disabled={isRunning}
          >
            {isRunning ? (
              <ActivityIndicator color={colors.text.inverse} />
            ) : (
              <Text style={styles.buttonText}>Run Code</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.editorContainer}>
        <MonacoEditor
          width="100%"
          height="300"
          language={language}
          theme={theme}
          value={code}
          options={editorOptions}
          onChange={handleEditorChange}
        />
      </View>

      {output && (
        <View style={[styles.output, { backgroundColor: colors.surface }]}>
          <Text style={[styles.outputTitle, { color: colors.text.primary }]}>
            Output:
          </Text>
          <CodeBlock
            code={output}
            language="plaintext"
            showLineNumbers={false}
          />
        </View>
      )}

      {showSuggestions && (
        <ScaleView style={styles.suggestions}>
          <View style={styles.suggestionsHeader}>
            <Text style={[styles.suggestionsTitle, { color: colors.text.primary }]}>
              AI Suggestions
            </Text>
            <TouchableOpacity
              onPress={() => setShowSuggestions(false)}
              style={styles.closeButton}
            >
              <Text style={{ color: colors.text.secondary }}>✕</Text>
            </TouchableOpacity>
          </View>
          {suggestions.map((suggestion, index) => (
            <Text
              key={index}
              style={[styles.suggestion, { color: colors.text.secondary }]}
            >
              • {suggestion}
            </Text>
          ))}
        </ScaleView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  languageLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  editorContainer: {
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
  },
  output: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  outputTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  suggestions: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  suggestionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  suggestionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 4,
  },
  suggestion: {
    marginBottom: 8,
    lineHeight: 20,
  },
});
