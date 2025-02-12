import React from 'react';

const LearningPath = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Your Learning Path</h2>
        <div className="space-y-4">
          {/* Add learning modules here */}
          <div className="border rounded p-4">
            <h3 className="text-lg font-semibold">Introduction to Programming</h3>
            <p className="text-gray-600">Learn the basics of programming concepts</p>
            <div className="mt-2">
              <span className="text-sm text-blue-500">Progress: 0%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPath;
