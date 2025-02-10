import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const OnboardingFlow = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    preferredLanguage: '',
    targetLanguage: '',
    experienceLevel: '',
    avatar: '',
  });

  const programmingLanguages = [
    'Python', 'JavaScript', 'Java', 'C++', 'Ruby', 'Go'
  ];

  const experienceLevels = [
    'Beginner', 'Intermediate', 'Advanced'
  ];

  const avatars = [
    '👨‍💻', '👩‍💻', '🦊', '🐯', '🐸', '🦉'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (step === 3) {
      onComplete(formData);
    } else {
      setStep(prev => prev + 1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">What's your preferred programming language?</h2>
            <div className="grid grid-cols-2 gap-4">
              {programmingLanguages.map(lang => (
                <button
                  key={lang}
                  onClick={() => handleInputChange('preferredLanguage', lang)}
                  className={`p-4 rounded-lg border-2 ${
                    formData.preferredLanguage === lang 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-blue-200'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">Choose your avatar</h2>
            <div className="grid grid-cols-3 gap-4">
              {avatars.map(avatar => (
                <button
                  key={avatar}
                  onClick={() => handleInputChange('avatar', avatar)}
                  className={`p-4 text-4xl rounded-lg border-2 ${
                    formData.avatar === avatar 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-blue-200'
                  }`}
                >
                  {avatar}
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">What language do you want to learn?</h2>
            <div className="grid grid-cols-2 gap-4">
              {programmingLanguages
                .filter(lang => lang !== formData.preferredLanguage)
                .map(lang => (
                  <button
                    key={lang}
                    onClick={() => handleInputChange('targetLanguage', lang)}
                    className={`p-4 rounded-lg border-2 ${
                      formData.targetLanguage === lang 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-blue-200'
                    }`}
                  >
                    {lang}
                  </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">What's your experience level with {formData.targetLanguage}?</h2>
            <div className="space-y-4">
              {experienceLevels.map(level => (
                <button
                  key={level}
                  onClick={() => handleInputChange('experienceLevel', level)}
                  className={`w-full p-4 rounded-lg border-2 ${
                    formData.experienceLevel === level 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-blue-200'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        );
    }
  };

  const isStepComplete = () => {
    switch (step) {
      case 0:
        return !!formData.preferredLanguage;
      case 1:
        return !!formData.avatar;
      case 2:
        return !!formData.targetLanguage;
      case 3:
        return !!formData.experienceLevel;
      default:
        return false;
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="mb-8 flex justify-between">
        {[0, 1, 2, 3].map(index => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              step >= index ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
      
      {renderStep()}
      
      <button
        onClick={handleNext}
        disabled={!isStepComplete()}
        className="mt-8 w-full flex items-center justify-center space-x-2 bg-blue-500 text-white p-4 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        <span>{step === 3 ? 'Get Started' : 'Continue'}</span>
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default OnboardingFlow;