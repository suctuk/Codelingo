import React from 'react';
import { motion } from 'framer-motion';

interface Unit {
  id: number;
  title: string;
  description: string;
  icon: string;
  status: 'locked' | 'unlocked' | 'completed';
  sections: Section[];
}

interface Section {
  id: number;
  title: string;
  description: string;
  conceptName: string;
  lessons: Lesson[];
}

interface Lesson {
  id: number;
  title: string;
  type: 'TUTORIAL' | 'PRACTICE' | 'CHALLENGE' | 'REVIEW';
  completed: boolean;
  xp: number;
}

interface LearningPathProps {
  units: Unit[];
  onUnitClick: (unitId: number) => void;
  onLessonClick: (lessonId: number) => void;
}

const LearningPath: React.FC<LearningPathProps> = ({
  units,
  onUnitClick,
  onLessonClick,
}) => {
  return (
    <div className="relative py-8">
      {/* Path Background */}
      <div className="absolute top-0 left-1/2 w-2 h-full bg-gray-200 transform -translate-x-1/2 z-0" />

      {/* Units */}
      <div className="relative z-10">
        {units.map((unit, index) => (
          <motion.div
            key={unit.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="mb-16"
          >
            {/* Unit Header */}
            <div 
              className={`
                relative mx-auto w-48 p-4 rounded-xl shadow-lg cursor-pointer
                transform transition-transform hover:scale-105
                ${unit.status === 'locked' ? 'bg-gray-100' : 
                  unit.status === 'completed' ? 'bg-green-100' : 'bg-white'}
              `}
              onClick={() => unit.status !== 'locked' && onUnitClick(unit.id)}
            >
              {/* Unit Icon */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center
                  ${unit.status === 'locked' ? 'bg-gray-300' :
                    unit.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'}
                `}>
                  <img src={unit.icon} alt={unit.title} className="w-8 h-8" />
                </div>
              </div>

              <h3 className={`
                text-center mt-4 font-bold
                ${unit.status === 'locked' ? 'text-gray-500' : 'text-gray-800'}
              `}>
                {unit.title}
              </h3>

              {/* Progress Indicator */}
              {unit.status !== 'locked' && (
                <div className="mt-2">
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div 
                      className={`h-full rounded-full ${
                        unit.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
                      }`}
                      style={{ 
                        width: `${(unit.sections.reduce(
                          (acc, section) => acc + section.lessons.filter(l => l.completed).length,
                          0
                        ) / unit.sections.reduce(
                          (acc, section) => acc + section.lessons.length,
                          0
                        ) * 100)}%`
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Sections (only show for unlocked/completed units) */}
            {unit.status !== 'locked' && (
              <div className="mt-8 space-y-6">
                {unit.sections.map((section) => (
                  <div key={section.id} className="max-w-2xl mx-auto">
                    <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
                    <div className="grid grid-cols-3 gap-4">
                      {section.lessons.map((lesson) => (
                        <motion.button
                          key={lesson.id}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => onLessonClick(lesson.id)}
                          className={`
                            p-4 rounded-lg shadow-md text-left
                            ${lesson.completed ? 'bg-green-100' : 'bg-white'}
                          `}
                        >
                          {/* Lesson Type Icon */}
                          <div className="flex items-center space-x-2 mb-2">
                            <div className={`
                              w-8 h-8 rounded-full flex items-center justify-center
                              ${getLessonTypeColor(lesson.type)}
                            `}>
                              {getLessonTypeIcon(lesson.type)}
                            </div>
                            <span className="text-sm font-medium">
                              {lesson.title}
                            </span>
                          </div>

                          {/* XP Reward */}
                          <div className="text-xs text-gray-600">
                            {lesson.xp} XP
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Helper functions for lesson styling
const getLessonTypeColor = (type: string) => {
  switch (type) {
    case 'TUTORIAL':
      return 'bg-blue-500 text-white';
    case 'PRACTICE':
      return 'bg-green-500 text-white';
    case 'CHALLENGE':
      return 'bg-purple-500 text-white';
    case 'REVIEW':
      return 'bg-orange-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};

const getLessonTypeIcon = (type: string) => {
  switch (type) {
    case 'TUTORIAL':
      return '📚';
    case 'PRACTICE':
      return '⌨️';
    case 'CHALLENGE':
      return '🏆';
    case 'REVIEW':
      return '🔄';
    default:
      return '📝';
  }
};

export default LearningPath;
