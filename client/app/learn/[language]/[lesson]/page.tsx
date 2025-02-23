'use client';

import { Button } from "@/components/ui/button";
import { notFound, useRouter } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import dynamic from "next/dynamic";

interface PageProps {
  params: {
    language: string;
    lesson: string;
  };
}

import { lessons } from "@/data/lessons";

const LessonContent = dynamic(() => import('@/components/lesson-content'), {
  loading: () => <div className="animate-pulse bg-slate-200 h-32 rounded-lg"></div>,
  ssr: false
});

const LessonExercise = dynamic(() => import('@/components/lesson-exercise'), {
  loading: () => <div className="animate-pulse bg-slate-200 h-32 rounded-lg"></div>,
  ssr: false
});

export default function LessonPage({ params }: PageProps) {
  const router = useRouter();
  const { language, lesson } = params;

  if (!lessons[language] || !lessons[language][lesson]) {
    notFound();
  }

  const lessonData = lessons[language][lesson];
  
  // Get lesson order for navigation
  const lessonKeys = Object.keys(lessons[language]);
  const currentIndex = lessonKeys.indexOf(lesson);
  const nextLesson = currentIndex < lessonKeys.length - 1 ? lessonKeys[currentIndex + 1] : null;
  const prevLesson = currentIndex > 0 ? lessonKeys[currentIndex - 1] : null;

  const handleNextLesson = () => {
    if (nextLesson) {
      router.push(`/learn/${language}/${nextLesson}`);
    }
  };

  const handlePrevLesson = () => {
    if (prevLesson) {
      router.push(`/learn/${language}/${prevLesson}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href={`/learn/${language}`}>
            <Button variant="ghost" className="mb-4">
              ← Back to Course
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            {lessonData.title}
          </h1>
        </div>

        <div className="space-y-8">
          <Suspense fallback={<div className="animate-pulse bg-slate-200 h-32 rounded-lg"></div>}>
            <LessonContent content={lessonData.content} />
          </Suspense>

          <div className="border-t border-slate-200 pt-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Exercise</h2>
            <Suspense fallback={<div className="animate-pulse bg-slate-200 h-32 rounded-lg"></div>}>
              <LessonExercise exercise={lessonData.exercise} />
            </Suspense>
          </div>

          <div className="flex justify-between items-center pt-8">
            {prevLesson ? (
              <Button
                variant="outline"
                onClick={handlePrevLesson}
                className="flex items-center gap-2"
              >
                ← Previous Lesson
              </Button>
            ) : (
              <div /> /* Empty div for spacing */
            )}
            {nextLesson ? (
              <Button
                onClick={handleNextLesson}
                className="flex items-center gap-2"
              >
                Next Lesson →
              </Button>
            ) : (
              <Button
                onClick={() => router.push(`/learn/${language}`)}
                variant="success"
              >
                Complete Course
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
