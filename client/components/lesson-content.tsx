'use client';

import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface LessonContentProps {
  content: string;
}

export default function LessonContent({ content }: LessonContentProps) {
  const renderContent = () => {
    const parts = content.split('```');
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        // This is a code block
        const [language, ...code] = part.split('\n');
        return (
          <div key={index} className="my-4">
            <SyntaxHighlighter
              language={language}
              style={vscDarkPlus}
              className="rounded-lg"
            >
              {code.join('\n')}
            </SyntaxHighlighter>
          </div>
        );
      } else {
        // This is regular text
        return (
          <div key={index} className="prose max-w-none">
            {part.split('\n').map((paragraph, i) => (
              <p key={i} className="mb-4 text-slate-600">
                {paragraph}
              </p>
            ))}
          </div>
        );
      }
    });
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-slate-900">Lesson</h2>
      {renderContent()}
    </div>
  );
}
