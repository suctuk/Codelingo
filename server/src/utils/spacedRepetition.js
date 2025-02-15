// Implements the SuperMemo 2 algorithm for spaced repetition
// https://www.supermemo.com/en/archives1990-2015/english/ol/sm2

const MIN_INTERVAL = 1; // 1 day
const MAX_INTERVAL = 365; // 1 year
const DEFAULT_EASE = 2.5;

export function calculateNextReview(performance) {
  const { correctAnswers, totalQuestions, previousEase = DEFAULT_EASE, previousInterval = 0 } = performance;
  
  // Calculate quality of response (0-5)
  const quality = Math.round((correctAnswers / totalQuestions) * 5);
  
  // Calculate new ease factor
  let ease = previousEase + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  ease = Math.max(1.3, ease); // Minimum ease factor
  
  // Calculate next interval
  let interval;
  if (previousInterval === 0) {
    interval = 1; // First review
  } else if (previousInterval === 1) {
    interval = 6; // Second review
  } else {
    interval = Math.round(previousInterval * ease);
  }
  
  // Constrain interval
  interval = Math.max(MIN_INTERVAL, Math.min(MAX_INTERVAL, interval));
  
  // Calculate next review date
  const now = new Date();
  const nextReview = new Date(now.getTime() + interval * 24 * 60 * 60 * 1000);
  
  return {
    nextReview,
    ease,
    interval,
  };
}

// Determine if a lesson should be reviewed based on its review schedule
export function shouldReview(lessonProgress) {
  if (!lessonProgress || !lessonProgress.nextReview) {
    return true; // Never reviewed before
  }
  
  const now = new Date();
  return now >= new Date(lessonProgress.nextReview);
}

// Calculate review priority for multiple lessons
export function calculateReviewPriority(lessonProgresses) {
  return lessonProgresses
    .map(progress => {
      if (!progress.nextReview) {
        return { ...progress, priority: 1 }; // Highest priority for new lessons
      }
      
      const now = new Date();
      const nextReview = new Date(progress.nextReview);
      const daysOverdue = (now - nextReview) / (24 * 60 * 60 * 1000);
      
      // Priority formula: higher priority for more overdue lessons
      const priority = Math.max(0, daysOverdue + 1);
      
      return { ...progress, priority };
    })
    .sort((a, b) => b.priority - a.priority);
}
