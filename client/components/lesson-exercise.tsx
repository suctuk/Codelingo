'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface LessonExerciseProps {
  exercise: string | {
    instruction: string;
    template: string;
  };
  template?: string;
}

export default function LessonExercise({ exercise, template }: LessonExerciseProps) {
  const exerciseText = typeof exercise === 'string' ? exercise : exercise.instruction;
  const initialCode = typeof exercise === 'string' ? (template || '') : exercise.template;

  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;

      // Insert 4 spaces for indentation
      const newCode = code.substring(0, start) + '    ' + code.substring(end);
      setCode(newCode);

      // Put cursor after the inserted spaces
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 4;
      }, 0);
    }
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    try {
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          code,
          language: 'python' // TODO: Get this from the lesson context
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to execute code');
      }

      const result = await response.json();
      setOutput(result.output);
    } catch (error) {
      setOutput(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-900 mb-2">Exercise</h3>
        <p className="text-slate-600 whitespace-pre-wrap">{exerciseText}</p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={handleKeyDown}
            className="min-h-[200px] w-full rounded-lg border border-slate-200 bg-slate-50 p-4 font-mono text-slate-900"
            placeholder="Write your code here..."
            spellCheck="false"
            autoComplete="off"
            autoCapitalize="off"
          />
          <Button 
            onClick={handleRunCode}
            className="absolute bottom-4 right-4"
            disabled={isRunning || !code.trim()}
          >
            {isRunning ? 'Running...' : 'Run Code'}
          </Button>
        </div>

        {output && (
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <h4 className="text-sm font-semibold text-slate-700 mb-2">Output:</h4>
            <pre className="font-mono text-black whitespace-pre-wrap">{output}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
