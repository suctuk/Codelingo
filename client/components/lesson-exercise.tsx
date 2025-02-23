'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface LessonExerciseProps {
  exercise: string;
}

export default function LessonExercise({ exercise }: LessonExerciseProps) {
  const [code, setCode] = useState('');

  const handleRunCode = () => {
    // TODO: Implement code execution
    console.log('Running code:', code);
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <p className="mb-4 text-slate-600">{exercise}</p>
      <div className="relative">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="min-h-[200px] w-full rounded-lg border border-slate-200 bg-slate-50 p-4 font-mono text-slate-900"
          placeholder="Write your code here..."
        />
        <Button 
          onClick={handleRunCode}
          className="absolute bottom-4 right-4"
        >
          Run Code
        </Button>
      </div>
    </div>
  );
}
