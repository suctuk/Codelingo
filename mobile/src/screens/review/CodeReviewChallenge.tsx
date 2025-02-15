import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../../../shared/styles/theme';
import { CodeBlock } from '../../components/code/CodeBlock';
import { ScaleView } from '../../components/animations/ScaleView';
import {
  CodeReviewType,
  CodeQualityMetric,
  CodeIssue,
} from '../../../server/src/services/codeReview';

interface IssueMarker {
  line: number;
  type: 'bug' | 'performance' | 'quality';
  description: string;
  severity: 'low' | 'medium' | 'high';
}

export const CodeReviewChallenge = () => {
  const [code, setCode] = useState('');
  const [selectedLines, setSelectedLines] = useState<number[]>([]);
  const [issues, setIssues] = useState<IssueMarker[]>([]);
  const [currentIssue, setCurrentIssue] = useState<Partial<IssueMarker> | null>(
    null
  );
  const [metrics, setMetrics] = useState<any>(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const timer = useRef<NodeJS.Timeout>();
  const startTime = useRef<number>(Date.now());

  useEffect(() => {
    // Mock challenge data
    setCode(`function processData(data) {
  var results = [];
  
  // Loop through data
  for (var i = 0; i < data.length; i++) {
    var item = data[i];
    
    // Process each item
    if (item != null) {
      var processed = item.toString().trim();
      results.push(processed);
    }
  }
  
  // Return processed data
  return results;
}`);

    // Start timer
    timer.current = setInterval(() => {
      setTimeSpent(Math.floor((Date.now() - startTime.current) / 1000));
    }, 1000);

    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    };
  }, []);

  useEffect(() => {
    if (code) {
      analyzeCode();
    }
  }, [code]);

  const analyzeCode = async () => {
    // Mock metrics
    setMetrics({
      quality: {
        readability: 0.7,
        maintainability: 0.6,
        modularity: 0.8,
        documentation: 0.5,
        naming: 0.9,
      },
      performance: {
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        resourceUsage: 'medium',
      },
    });
  };

  const handleLineSelect = (lineNumber: number) => {
    if (selectedLines.includes(lineNumber)) {
      setSelectedLines(prev => prev.filter(line => line !== lineNumber));
    } else {
      setSelectedLines(prev => [...prev, lineNumber]);
      setCurrentIssue({ line: lineNumber });
    }
  };

  const handleIssueTypeSelect = (type: 'bug' | 'performance' | 'quality') => {
    if (!currentIssue) return;
    setCurrentIssue(prev => ({ ...prev, type }));
  };

  const handleIssueSeveritySelect = (
    severity: 'low' | 'medium' | 'high'
  ) => {
    if (!currentIssue) return;
    setCurrentIssue(prev => ({ ...prev, severity }));
  };

  const handleIssueSubmit = () => {
    if (
      !currentIssue ||
      !currentIssue.line ||
      !currentIssue.type ||
      !currentIssue.severity ||
      !currentIssue.description
    ) {
      Alert.alert('Error', 'Please fill in all issue details');
      return;
    }

    setIssues(prev => [...prev, currentIssue as IssueMarker]);
    setCurrentIssue(null);
    setSelectedLines([]);
  };

  const handleSubmitReview = async () => {
    if (issues.length === 0) {
      Alert.alert('Error', 'Please identify at least one issue');
      return;
    }

    setIsSubmitting(true);
    try {
      // Submit review
      const submission = {
        issues,
        metrics: {
          timeSpent,
          issuesFound: issues.length,
        },
      };

      console.log('Submitting review:', submission);
      Alert.alert('Success', 'Review submitted successfully!');
    } catch (error) {
      console.error('Error submitting review:', error);
      Alert.alert('Error', 'Failed to submit review');
    }
    setIsSubmitting(false);
  };

  const renderMetrics = () => (
    <View style={styles.metricsContainer}>
      <Text style={styles.metricsTitle}>Code Analysis</Text>
      
      <View style={styles.metricSection}>
        <Text style={styles.metricSectionTitle}>Quality Metrics</Text>
        {Object.entries(metrics.quality).map(([key, value]: [string, number]) => (
          <View key={key} style={styles.metricRow}>
            <Text style={styles.metricLabel}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </Text>
            <View style={styles.metricBarContainer}>
              <View
                style={[styles.metricBar, { width: `${value * 100}%` }]}
              />
            </View>
            <Text style={styles.metricValue}>{Math.round(value * 100)}%</Text>
          </View>
        ))}
      </View>

      <View style={styles.metricSection}>
        <Text style={styles.metricSectionTitle}>Performance Metrics</Text>
        {Object.entries(metrics.performance).map(([key, value]) => (
          <View key={key} style={styles.metricRow}>
            <Text style={styles.metricLabel}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </Text>
            <Text style={styles.metricValue}>{value}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderIssueForm = () => (
    <View style={styles.issueFormContainer}>
      <Text style={styles.issueFormTitle}>New Issue</Text>
      
      <View style={styles.issueTypeContainer}>
        <TouchableOpacity
          style={[
            styles.issueTypeButton,
            currentIssue?.type === 'bug' && styles.selectedIssueType,
          ]}
          onPress={() => handleIssueTypeSelect('bug')}
        >
          <Icon name="bug" size={20} color={theme.colors.error} />
          <Text style={styles.issueTypeText}>Bug</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.issueTypeButton,
            currentIssue?.type === 'performance' && styles.selectedIssueType,
          ]}
          onPress={() => handleIssueTypeSelect('performance')}
        >
          <Icon name="speedometer" size={20} color={theme.colors.warning} />
          <Text style={styles.issueTypeText}>Performance</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.issueTypeButton,
            currentIssue?.type === 'quality' && styles.selectedIssueType,
          ]}
          onPress={() => handleIssueTypeSelect('quality')}
        >
          <Icon name="check-circle" size={20} color={theme.colors.success} />
          <Text style={styles.issueTypeText}>Quality</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.severityContainer}>
        <TouchableOpacity
          style={[
            styles.severityButton,
            currentIssue?.severity === 'low' && styles.selectedSeverity,
            { backgroundColor: theme.colors.success + '20' },
          ]}
          onPress={() => handleIssueSeveritySelect('low')}
        >
          <Text style={styles.severityText}>Low</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.severityButton,
            currentIssue?.severity === 'medium' && styles.selectedSeverity,
            { backgroundColor: theme.colors.warning + '20' },
          ]}
          onPress={() => handleIssueSeveritySelect('medium')}
        >
          <Text style={styles.severityText}>Medium</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.severityButton,
            currentIssue?.severity === 'high' && styles.selectedSeverity,
            { backgroundColor: theme.colors.error + '20' },
          ]}
          onPress={() => handleIssueSeveritySelect('high')}
        >
          <Text style={styles.severityText}>High</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.issueDescription}
        placeholder="Describe the issue..."
        value={currentIssue?.description || ''}
        onChangeText={text =>
          setCurrentIssue(prev => ({ ...prev, description: text }))
        }
        multiline
      />

      <TouchableOpacity
        style={styles.addIssueButton}
        onPress={handleIssueSubmit}
      >
        <Text style={styles.addIssueButtonText}>Add Issue</Text>
      </TouchableOpacity>
    </View>
  );

  if (!code || !metrics) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Code Review Challenge</Text>
        <View style={styles.timer}>
          <Icon name="clock-outline" size={20} color={theme.colors.warning} />
          <Text style={styles.timerText}>
            {Math.floor(timeSpent / 60)}:
            {(timeSpent % 60).toString().padStart(2, '0')}
          </Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.codeContainer}>
          <CodeBlock
            code={code}
            language="javascript"
            highlightLines={selectedLines.map(line => ({
              line,
              color: theme.colors.primary + '40',
            }))}
            onLinePress={handleLineSelect}
          />
        </View>

        {metrics && renderMetrics()}

        {currentIssue && renderIssueForm()}

        {issues.length > 0 && (
          <View style={styles.issuesContainer}>
            <Text style={styles.issuesTitle}>Identified Issues</Text>
            {issues.map((issue, index) => (
              <View key={index} style={styles.issueItem}>
                <View style={styles.issueHeader}>
                  <View style={styles.issueType}>
                    <Icon
                      name={
                        issue.type === 'bug'
                          ? 'bug'
                          : issue.type === 'performance'
                          ? 'speedometer'
                          : 'check-circle'
                      }
                      size={20}
                      color={
                        issue.type === 'bug'
                          ? theme.colors.error
                          : issue.type === 'performance'
                          ? theme.colors.warning
                          : theme.colors.success
                      }
                    />
                    <Text style={styles.issueTypeText}>
                      {issue.type.charAt(0).toUpperCase() + issue.type.slice(1)}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.severityBadge,
                      {
                        backgroundColor:
                          issue.severity === 'high'
                            ? theme.colors.error + '20'
                            : issue.severity === 'medium'
                            ? theme.colors.warning + '20'
                            : theme.colors.success + '20',
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.severityText,
                        {
                          color:
                            issue.severity === 'high'
                              ? theme.colors.error
                              : issue.severity === 'medium'
                              ? theme.colors.warning
                              : theme.colors.success,
                        },
                      ]}
                    >
                      {issue.severity.charAt(0).toUpperCase() +
                        issue.severity.slice(1)}
                    </Text>
                  </View>
                </View>
                <Text style={styles.issueLine}>Line {issue.line}</Text>
                <Text style={styles.issueDescription}>
                  {issue.description}
                </Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <TouchableOpacity
        style={[styles.submitButton, isSubmitting && styles.disabledButton]}
        onPress={handleSubmitReview}
        disabled={isSubmitting}
      >
        <Text style={styles.submitButtonText}>Submit Review</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  title: {
    fontSize: theme.typography.fontSize.lg,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.primary,
  },
  timer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timerText: {
    marginLeft: theme.spacing.xs,
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text.primary,
  },
  content: {
    flex: 1,
  },
  codeContainer: {
    padding: theme.spacing.md,
  },
  metricsContainer: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    marginBottom: theme.spacing.md,
  },
  metricsTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  metricSection: {
    marginBottom: theme.spacing.md,
  },
  metricSectionTitle: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  metricRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  metricLabel: {
    width: 120,
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text.secondary,
  },
  metricBarContainer: {
    flex: 1,
    height: 4,
    backgroundColor: theme.colors.border,
    borderRadius: theme.borderRadius.full,
    marginRight: theme.spacing.sm,
  },
  metricBar: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.full,
  },
  metricValue: {
    width: 60,
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text.primary,
    textAlign: 'right',
  },
  issueFormContainer: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    marginBottom: theme.spacing.md,
  },
  issueFormTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  issueTypeContainer: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
  },
  issueTypeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.sm,
    marginHorizontal: theme.spacing.xs,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  selectedIssueType: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary + '10',
  },
  issueTypeText: {
    marginLeft: theme.spacing.xs,
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text.primary,
  },
  severityContainer: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
  },
  severityButton: {
    flex: 1,
    padding: theme.spacing.sm,
    marginHorizontal: theme.spacing.xs,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  selectedSeverity: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  severityText: {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text.primary,
  },
  issueDescription: {
    height: 100,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.md,
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.text.primary,
    textAlignVertical: 'top',
  },
  addIssueButton: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    marginTop: theme.spacing.md,
  },
  addIssueButtonText: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.inverse,
  },
  issuesContainer: {
    padding: theme.spacing.md,
  },
  issuesTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  issueItem: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
  },
  issueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  issueType: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  severityBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.full,
  },
  issueLine: {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    margin: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  submitButtonText: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.inverse,
  },
});
