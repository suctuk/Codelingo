// client/src/pages/Learn.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LearningPath from '../components/learning/LearningPath';
import { Alert } from '@/components/ui/alert';

const Learn = () => {
  const { language } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch initial data
  }, [language]);

  if (loading) return <div>Loading...</div>;
  if (error) return <Alert variant="destructive">{error}</Alert>;

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Learning {language}</h1>
      <LearningPath targetLanguage={language} />
    </div>
  );
};

export default Learn;