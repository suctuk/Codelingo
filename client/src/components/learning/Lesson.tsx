import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Editor from '@monaco-editor/react';
import { FaHeart, FaClock, FaLightbulb } from 'react-icons/fa';

interface LessonContent {
  id: number;
  type: 'TEXT' | 'CODE' | 'MULTIPLE_CHOICE' | 'FILL_BLANK' | 'MATCHING' | 'WORD_BANK';
  question: string;
  options?: string[];
  hints?: string[];
  timeLimit: number;
}

interface LessonProps {
  lessonId: number;
  content: LessonContent[];
  hearts: number;
  onComplete: (results: {
    correctAnswers: number;
    totalQuestions: number;
    timeSpent: number;
    heartsLost: number;
  }) => void;
}

const Lesson: React.FC<LessonProps> = ({
  lessonId,
  content,
  hearts,
  onComplete,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [heartsLeft, setHeartsLeft] = useState(hearts);
  const [showHint, setShowHint] = useState(false);
  const [startTime] = useState(Date.now());

  const currentQuestion = content[currentIndex];

  useEffect(() => {
    if (currentQuestion) {
      setTimeLeft(currentQuestion.timeLimit);
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [currentIndex, currentQuestion]);

  const handleTimeUp = () => {
    handleAnswer('');
  };

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    // For now, we'll consider the answer correct if it's not empty
    // In a real implementation, this would check against the correct answer
    const isCorrect = answer !== '';

    if (!isCorrect) {
      setHeartsLeft((prev) => prev - 1);
    }

    if (heartsLeft <= 1 && !isCorrect) {
      // Game over - out of hearts
      handleComplete(newAnswers);
    } else if (currentIndex === content.length - 1) {
      // Lesson complete
      handleComplete(newAnswers);
    } else {
      // Next question
      setCurrentIndex((prev) => prev + 1);
      setShowHint(false);
    }
  };

  const handleComplete = (finalAnswers: string[]) => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    const correctAnswers = finalAnswers.filter(a => a !== '').length;
    
    onComplete({
      correctAnswers,
      totalQuestions: content.length,
      timeSpent,
      heartsLost: hearts - heartsLeft,
    });
  };

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'TEXT':
        return (
          <div className="prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />
          </div>
        );

      case 'CODE':
        return (
          <div className="space-y-4">
            <div className="prose max-w-none">
              <div dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />
            </div>
            <div className="h-64 border rounded-lg overflow-hidden">
              <Editor
                height="100%"
                defaultLanguage="javascript"
                theme="vs-dark"
                onChange={(value) => {
                  // Handle code changes
                }}
              />
            </div>
          </div>
        );

      case 'MULTIPLE_CHOICE':
        return (
          <div className="space-y-4">
            <div className="prose max-w-none">
              <div dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {currentQuestion.options?.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-4 border rounded-lg hover:bg-gray-50"
                  onClick={() => handleAnswer(option)}
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </div>
        );

      case 'FILL_BLANK':
        return (
          <div className="space-y-4">
            <div className="prose max-w-none">
              <div dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />
            </div>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Type your answer..."
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAnswer(e.currentTarget.value);
                }
              }}
            />
          </div>
        );

      case 'MATCHING':
        return (
          <div className="space-y-4">
            <div className="prose max-w-none">
              <div dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {/* Implement drag and drop matching here */}
            </div>
          </div>
        );

      case 'WORD_BANK':
        return (
          <div className="space-y-4">
            <div className="prose max-w-none">
              <div dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />
            </div>
            <div className="flex flex-wrap gap-2">
              {currentQuestion.options?.map((word, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1 bg-blue-100 rounded-full"
                  onClick={() => {
                    // Implement word bank selection logic
                  }}
                >
                  {word}
                </motion.button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        {/* Progress bar */}
        <div className="flex-1 mx-4">
          <div className="h-3 bg-gray-200 rounded-full">
            <div
              className="h-full bg-green-500 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex) / content.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Hearts */}
        <div className="flex items-center space-x-1">
          {Array.from({ length: heartsLeft }).map((_, i) => (
            <FaHeart key={i} className="text-red-500" />
          ))}
        </div>

        {/* Timer */}
        <div className="ml-4 flex items-center space-x-2">
          <FaClock className="text-gray-600" />
          <span className="font-medium">{timeLeft}s</span>
        </div>
      </div>

      {/* Main content */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {renderQuestion()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Hint button */}
      {currentQuestion.hints && currentQuestion.hints.length > 0 && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
          >
            <FaLightbulb />
            <span>Need a hint?</span>
          </button>
        </div>
      )}

      {/* Hint content */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 p-4 bg-yellow-50 rounded-lg"
          >
            {currentQuestion.hints?.[0]}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Lesson;
