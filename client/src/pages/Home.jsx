import React from 'react';
import { useAuth } from '../hooks/useAuth';
import OnboardingFlow from '../components/onboarding/OnboardingFlow';
import LearningPath from '../components/learning/LearningPath';

const Home = () => {
  const { user } = useAuth();

  return (
    <div>
      {!user.onboarded ? (
        <OnboardingFlow onComplete={(data) => {
          // Handle onboarding completion
        }} />
      ) : (
        <LearningPath targetLanguage={user.targetLanguage} />
      )}
    </div>
  );
};

export default Home;

