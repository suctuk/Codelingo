import React, { useState } from 'react';

const OnboardingFlow = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Welcome to CodeLingo!</h2>
        {step === 1 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Choose your programming language</h3>
            {/* Add language selection UI here */}
          </div>
        )}
        {step === 2 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Set your learning goals</h3>
            {/* Add goals selection UI here */}
          </div>
        )}
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => setStep(prev => prev + 1)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {step === 2 ? 'Get Started' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;
