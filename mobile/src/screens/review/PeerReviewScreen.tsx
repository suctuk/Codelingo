import React, { useState, useEffect } from 'react';
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

interface PeerReview {
  id: string;
  submissionId: string;
  reviewerId: string;
  rating: number;
  feedback: string;
  helpfulness: number;
  createdAt: Date;
}

interface CodeReviewSubmission {
  id: string;
  userId: string;
  username: string;
  challengeId: string;
  code: string;
  language: string;
  foundIssues: any[];
  metrics: {
    accuracy: number;
    completeness: number;
    timeSpent: number;
    issuesFound: number;
  };
  reviews: PeerReview[];
  createdAt: Date;
}

export const PeerReviewScreen = () => {
  const [submissions, setSubmissions] = useState<CodeReviewSubmission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<CodeReviewSubmission | null>(null);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [helpfulness, setHelpfulness] = useState(0);
  const [filter, setFilter] = useState<'all' | 'pending' | 'reviewed'>('pending');

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    // Mock data
    const mockSubmissions: CodeReviewSubmission[] = [
      {
        id: '1',
        userId: 'user1',
        username: 'pythonmaster',
        challengeId: 'challenge1',
        code: `function optimizePerformance(data) {
  // Process data
  for (let i = 0; i < data.length; i++) {
    // Heavy computation
    data[i] = data[i] * Math.random();
  }
  return data;
}`,
        language: 'javascript',
        foundIssues: [
          {
            type: 'performance',
            line: 3,
            description: 'Consider using map() for better performance',
            severity: 'medium',
          },
        ],
        metrics: {
          accuracy: 0.8,
          completeness: 0.9,
          timeSpent: 300,
          issuesFound: 3,
        },
        reviews: [],
        createdAt: new Date(),
      },
      // Add more mock submissions
    ];

    setSubmissions(mockSubmissions);
  };

  const handleSubmitReview = async () => {
    if (!selectedSubmission) return;

    if (rating === 0 || !feedback.trim()) {
      Alert.alert('Error', 'Please provide both rating and feedback');
      return;
    }

    try {
      const review: PeerReview = {
        id: Date.now().toString(),
        submissionId: selectedSubmission.id,
        reviewerId: 'currentUser',
        rating,
        feedback,
        helpfulness,
        createdAt: new Date(),
      };

      // Update submissions
      setSubmissions(prev =>
        prev.map(sub =>
          sub.id === selectedSubmission.id
            ? { ...sub, reviews: [...sub.reviews, review] }
            : sub
        )
      );

      // Reset form
      setSelectedSubmission(null);
      setRating(0);
      setFeedback('');
      setHelpfulness(0);

      Alert.alert('Success', 'Review submitted successfully!');
    } catch (error) {
      console.error('Error submitting review:', error);
      Alert.alert('Error', 'Failed to submit review');
    }
  };

  const renderRatingStars = (currentRating: number, onRate: (rating: number) => void) => (
    <View style={styles.ratingContainer}>
      {[1, 2, 3, 4, 5].map(star => (
        <TouchableOpacity
          key={star}
          onPress={() => onRate(star)}
          style={styles.starButton}
        >
          <Icon
            name={star <= currentRating ? 'star' : 'star-outline'}
            size={32}
            color={theme.colors.warning}
          />
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderSubmissionCard = (submission: CodeReviewSubmission) => (
    <ScaleView
      key={submission.id}
      style={styles.submissionCard}
      onPress={() => setSelectedSubmission(submission)}
    >
      <View style={styles.submissionHeader}>
        <View style={styles.userInfo}>
          <Icon name="account" size={24} color={theme.colors.primary} />
          <Text style={styles.username}>{submission.username}</Text>
        </View>
        <Text style={styles.timestamp}>
          {new Date(submission.createdAt).toLocaleDateString()}
        </Text>
      </View>

      <View style={styles.metricsContainer}>
        <View style={styles.metric}>
          <Icon name="target" size={20} color={theme.colors.success} />
          <Text style={styles.metricValue}>
            {Math.round(submission.metrics.accuracy * 100)}%
          </Text>
          <Text style={styles.metricLabel}>Accuracy</Text>
        </View>

        <View style={styles.metric}>
          <Icon name="check-all" size={20} color={theme.colors.primary} />
          <Text style={styles.metricValue}>
            {Math.round(submission.metrics.completeness * 100)}%
          </Text>
          <Text style={styles.metricLabel}>Complete</Text>
        </View>

        <View style={styles.metric}>
          <Icon name="bug" size={20} color={theme.colors.error} />
          <Text style={styles.metricValue}>
            {submission.metrics.issuesFound}
          </Text>
          <Text style={styles.metricLabel}>Issues</Text>
        </View>
      </View>

      <View style={styles.codePreview}>
        <CodeBlock
          code={submission.code}
          language={submission.language}
          fontSize={12}
        />
      </View>

      <View style={styles.reviewStatus}>
        <Icon
          name={submission.reviews.length > 0 ? 'check-circle' : 'clock'}
          size={20}
          color={
            submission.reviews.length > 0
              ? theme.colors.success
              : theme.colors.warning
          }
        />
        <Text style={styles.reviewStatusText}>
          {submission.reviews.length > 0
            ? `${submission.reviews.length} Reviews`
            : 'Pending Review'}
        </Text>
      </View>
    </ScaleView>
  );

  const renderReviewForm = () => (
    <View style={styles.reviewForm}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => setSelectedSubmission(null)}
      >
        <Icon name="close" size={24} color={theme.colors.text.secondary} />
      </TouchableOpacity>

      <Text style={styles.reviewFormTitle}>Review Submission</Text>

      <Text style={styles.ratingLabel}>Rating</Text>
      {renderRatingStars(rating, setRating)}

      <Text style={styles.feedbackLabel}>Feedback</Text>
      <TextInput
        style={styles.feedbackInput}
        placeholder="Provide detailed feedback..."
        value={feedback}
        onChangeText={setFeedback}
        multiline
        numberOfLines={4}
      />

      <Text style={styles.helpfulnessLabel}>Helpfulness</Text>
      <View style={styles.helpfulnessContainer}>
        {[1, 2, 3].map(level => (
          <TouchableOpacity
            key={level}
            style={[
              styles.helpfulnessButton,
              helpfulness === level && styles.selectedHelpfulness,
            ]}
            onPress={() => setHelpfulness(level)}
          >
            <Icon
              name="thumb-up"
              size={20}
              color={
                helpfulness === level
                  ? theme.colors.primary
                  : theme.colors.text.secondary
              }
            />
            <Text
              style={[
                styles.helpfulnessText,
                helpfulness === level && styles.selectedHelpfulnessText,
              ]}
            >
              {level === 1
                ? 'Somewhat Helpful'
                : level === 2
                ? 'Helpful'
                : 'Very Helpful'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmitReview}
      >
        <Text style={styles.submitButtonText}>Submit Review</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Peer Reviews</Text>
        <View style={styles.filterContainer}>
          {(['all', 'pending', 'reviewed'] as const).map(f => (
            <TouchableOpacity
              key={f}
              style={[styles.filterButton, filter === f && styles.selectedFilter]}
              onPress={() => setFilter(f)}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === f && styles.selectedFilterText,
                ]}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {selectedSubmission ? (
        renderReviewForm()
      ) : (
        <ScrollView style={styles.submissionsList}>
          {submissions
            .filter(sub => {
              if (filter === 'pending') return sub.reviews.length === 0;
              if (filter === 'reviewed') return sub.reviews.length > 0;
              return true;
            })
            .map(renderSubmissionCard)}
        </ScrollView>
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
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  title: {
    fontSize: theme.typography.fontSize.xl,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  filterContainer: {
    flexDirection: 'row',
  },
  filterButton: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    marginHorizontal: theme.spacing.xs,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  selectedFilter: {
    backgroundColor: theme.colors.primary,
  },
  filterText: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text.secondary,
  },
  selectedFilterText: {
    color: theme.colors.text.inverse,
  },
  submissionsList: {
    flex: 1,
    padding: theme.spacing.md,
  },
  submissionCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.medium,
  },
  submissionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    marginLeft: theme.spacing.sm,
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.primary,
  },
  timestamp: {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.text.secondary,
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: theme.spacing.md,
  },
  metric: {
    alignItems: 'center',
  },
  metricValue: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.primary,
    marginVertical: theme.spacing.xs,
  },
  metricLabel: {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.text.secondary,
  },
  codePreview: {
    marginBottom: theme.spacing.md,
  },
  reviewStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewStatusText: {
    marginLeft: theme.spacing.xs,
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text.secondary,
  },
  reviewForm: {
    flex: 1,
    padding: theme.spacing.md,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: theme.spacing.sm,
  },
  reviewFormTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xl,
  },
  ratingLabel: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: theme.spacing.xl,
  },
  starButton: {
    padding: theme.spacing.xs,
  },
  feedbackLabel: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  feedbackInput: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xl,
    textAlignVertical: 'top',
  },
  helpfulnessLabel: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  helpfulnessContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xl,
  },
  helpfulnessButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.sm,
    marginHorizontal: theme.spacing.xs,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surface,
  },
  selectedHelpfulness: {
    backgroundColor: theme.colors.primary + '20',
  },
  helpfulnessText: {
    marginLeft: theme.spacing.xs,
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text.secondary,
  },
  selectedHelpfulnessText: {
    color: theme.colors.primary,
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.inverse,
  },
});
