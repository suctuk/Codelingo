import React, { useState } from 'react';
import { Lock, Check, Star } from 'lucide-react';

const LearningPath = ({ targetLanguage }) => {
  // Sample data structure for units and lessons
  const units = [
    {
      id: 1,
      title: 'Basics',
      lessons: [
        { id: 1, title: 'Hello World', xp: 10, completed: true },
        { id: 2, title: 'Variables', xp: 15, completed: true },
        { id: 3, title: 'Data Types', xp: 20, completed: false },
      ],
      unlocked: true
    },
    {
      id: 2,
      title: 'Control Flow',
      lessons: [
        { id: 4, title: 'If Statements', xp: 20, completed: false },
        { id: 5, title: 'Loops', xp: 25, completed: false },
        { id: 6, title: 'Switch Cases', xp: 30, completed: false },
      ],
      unlocked: false
    },
    {
      id: 3,
      title: 'Functions',
      lessons: [
        { id: 7, title: 'Basic Functions', xp: 25, completed: false },
        { id: 8, title: 'Parameters', xp: 30, completed: false },
        { id: 9, title: 'Return Values', xp: 35, completed: false },
      ],
      unlocked: false
    }
  ];

  const [selectedUnit, setSelectedUnit] = useState(null);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Learning {targetLanguage}</h1>
      
      <div className="space-y-8">
        {units.map((unit, index) => (
          <div key={unit.id} className="relative">
            {/* Connector Line */}
            {index < units.length - 1 && (
              <div className="absolute left-1/2 top-full h-8 w-0.5 bg-gray-300 -translate-x-1/2" />
            )}
            
            {/* Unit Card */}
            <div 
              className={`relative z-10 max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden
                ${unit.unlocked ? 'cursor-pointer hover:shadow-lg' : 'opacity-75'}`}
              onClick={() => unit.unlocked && setSelectedUnit(unit.id === selectedUnit ? null : unit.id)}
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">{unit.title}</h3>
                  {!unit.unlocked && <Lock className="w-5 h-5 text-gray-400" />}
                </div>
                
                {/* Progress bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div 
                    className="bg-blue-500 rounded-full h-2"
                    style={{ 
                      width: `${(unit.lessons.filter(l => l.completed).length / unit.lessons.length) * 100}%`
                    }}
                  />
                </div>

                {/* Lesson list (shown when unit is selected) */}
                {selectedUnit === unit.id && (
                  <div className="space-y-2 mt-4">
                    {unit.lessons.map(lesson => (
                      <button
                        key={lesson.id}
                        className={`w-full p-3 rounded-lg border flex items-center justify-between
                          ${lesson.completed 
                            ? 'bg-green-50 border-green-200' 
                            : 'bg-white border-gray-200 hover:border-blue-200'}`}
                      >
                        <div className="flex items-center">
                          {lesson.completed 
                            ? <Check className="w-5 h-5 text-green-500 mr-2" />
                            : <div className="w-5 h-5 rounded-full border-2 border-gray-300 mr-2" />
                          }
                          <span>{lesson.title}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Star className="w-4 h-4 mr-1" />
                          {lesson.xp} XP
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningPath;