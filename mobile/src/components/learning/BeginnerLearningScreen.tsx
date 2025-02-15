import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Image,
} from 'react-native';
import { CodeBlock } from '../code/CodeBlock';
import { CodeEditor } from '../code/CodeEditor';
import { CodeMascot } from '../characters/CodeMascot';
import { useTheme } from '../../hooks/useTheme';
import { InteractiveAnimation } from './InteractiveAnimation';
import { StepByStepGuide } from './StepByStepGuide';
import { RealWorldExample } from './RealWorldExample';

interface BeginnerLearningScreenProps {
  concept: {
    id: string;
    englishDescription: string;
    realWorldAnalogy: string;
    visualExample: {
      type: string;
      content: string;
    };
    codeImplementations: {
      [language: string]: {
        code: string;
        explanation: string;
        steps: string[];
      };
    };
  };
  selectedLanguage: string;
  onComplete: (success: boolean) => void;
}

export const BeginnerLearningScreen: React.FC<BeginnerLearningScreenProps> = ({
  concept,
  selectedLanguage,
  onComplete,
}) => {
  const { colors } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const [userCode, setUserCode] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [mascotMessage, setMascotMessage] = useState('');
  const [slideAnim] = useState(new Animated.Value(0));

  const steps = [
    'understand',  // Understand in plain English
    'visualize',   // See the visual example
    'relate',      // Real-world analogy
    'learn',       // Code explanation
    'practice',    // Practice coding
    'review'       // Review and complete
  ];

  useEffect(() => {
    updateMascotMessage();
  }, [currentStep]);

  const updateMascotMessage = () => {
    const messages = {
      understand: "Let's understand what we're trying to do in simple terms!",
      visualize: "Here's a visual way to think about it!",
      relate: "Think about it like this in real life...",
      learn: "Now, let's see how we write this in code!",
      practice: "Your turn! Try writing the code yourself!",
      review: "Great job! Let's review what you've learned!"
    };
    setMascotMessage(messages[steps[currentStep]]);
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setCurrentStep(currentStep + 1);
        slideAnim.setValue(0);
      });
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderUnderstandStep = () => (
    <View style={styles.stepContainer}>
      <Text style={[styles.stepTitle, { color: colors.text.primary }]}>
        What are we trying to do?
      </Text>
      <Text style={[styles.englishDescription, { color: colors.text.primary }]}>
        {concept.englishDescription}
      </Text>
      <View style={styles.exampleBox}>
        <Text style={[styles.exampleText, { color: colors.text.secondary }]}>
          For example, if you wanted to {concept.englishDescription.toLowerCase()}, 
          you would need to tell the computer exactly how to do it.
        </Text>
      </View>
    </View>
  );

  const renderVisualStep = () => (
    <View style={styles.stepContainer}>
      <Text style={[styles.stepTitle, { color: colors.text.primary }]}>
        Let's see it in action!
      </Text>
      <InteractiveAnimation
        type={concept.visualExample.type}
        content={concept.visualExample.content}
        style={styles.animation}
      />
      <Text style={[styles.visualExplanation, { color: colors.text.secondary }]}>
        Watch how this works step by step...
      </Text>
    </View>
  );

  const renderRelateStep = () => (
    <View style={styles.stepContainer}>
      <Text style={[styles.stepTitle, { color: colors.text.primary }]}>
        Think of it like this...
      </Text>
      <RealWorldExample
        analogy={concept.realWorldAnalogy}
        style={styles.realWorldExample}
      />
      <Text style={[styles.analogyExplanation, { color: colors.text.secondary }]}>
        Just like in the real world, we need to follow specific steps in code!
      </Text>
    </View>
  );

  const renderLearnStep = () => (
    <View style={styles.stepContainer}>
      <Text style={[styles.stepTitle, { color: colors.text.primary }]}>
        Here's how we write it in code:
      </Text>
      <StepByStepGuide
        steps={concept.codeImplementations[selectedLanguage].steps}
        code={concept.codeImplementations[selectedLanguage].code}
        explanation={concept.codeImplementations[selectedLanguage].explanation}
      />
    </View>
  );

  const renderPracticeStep = () => (
    <View style={styles.stepContainer}>
      <Text style={[styles.stepTitle, { color: colors.text.primary }]}>
        Now it's your turn!
      </Text>
      <Text style={[styles.practicePrompt, { color: colors.text.primary }]}>
        Write code to {concept.englishDescription.toLowerCase()}
      </Text>
      <CodeEditor
        value={userCode}
        onChangeText={setUserCode}
        language={selectedLanguage}
        placeholder={`Type your ${selectedLanguage} code here...`}
      />
      {showHint && (
        <View style={styles.hintContainer}>
          <Text style={[styles.hintText, { color: colors.text.secondary }]}>
            Hint: Follow these steps:
            {concept.codeImplementations[selectedLanguage].steps.map((step, index) => (
              <Text key={index}>{'\n'}• {step}</Text>
            ))}
          </Text>
        </View>
      )}
      <TouchableOpacity
        style={[styles.hintButton, { borderColor: colors.primary }]}
        onPress={() => setShowHint(!showHint)}
      >
        <Text style={[styles.hintButtonText, { color: colors.primary }]}>
          {showHint ? 'Hide Hint' : 'Need a Hint?'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderReviewStep = () => (
    <View style={styles.stepContainer}>
      <Text style={[styles.stepTitle, { color: colors.text.primary }]}>
        Let's review what you've learned!
      </Text>
      <View style={styles.reviewContainer}>
        <Text style={[styles.reviewText, { color: colors.text.primary }]}>
          • You learned how to {concept.englishDescription.toLowerCase()}
        </Text>
        <Text style={[styles.reviewText, { color: colors.text.primary }]}>
          • In real life, it's like {concept.realWorldAnalogy}
        </Text>
        <Text style={[styles.reviewText, { color: colors.text.primary }]}>
          • In {selectedLanguage}, we write it as:
        </Text>
        <CodeBlock
          code={concept.codeImplementations[selectedLanguage].code}
          language={selectedLanguage}
        />
      </View>
    </View>
  );

  const renderCurrentStep = () => {
    switch (steps[currentStep]) {
      case 'understand':
        return renderUnderstandStep();
      case 'visualize':
        return renderVisualStep();
      case 'relate':
        return renderRelateStep();
      case 'learn':
        return renderLearnStep();
      case 'practice':
        return renderPracticeStep();
      case 'review':
        return renderReviewStep();
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <Animated.View
          style={[
            styles.stepWrapper,
            {
              transform: [
                {
                  translateX: slideAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -300],
                  }),
                },
              ],
            },
          ]}
        >
          {renderCurrentStep()}
        </Animated.View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.navButton, { opacity: currentStep > 0 ? 1 : 0.5 }]}
          onPress={handlePrevStep}
          disabled={currentStep === 0}
        >
          <Text style={[styles.navButtonText, { color: colors.primary }]}>
            Previous
          </Text>
        </TouchableOpacity>

        <View style={styles.progressDots}>
          {steps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressDot,
                {
                  backgroundColor:
                    index === currentStep ? colors.primary : colors.text.secondary,
                },
              ]}
            />
          ))}
        </View>

        <TouchableOpacity
          style={[styles.navButton, { opacity: currentStep < steps.length - 1 ? 1 : 0.5 }]}
          onPress={handleNextStep}
          disabled={currentStep === steps.length - 1}
        >
          <Text style={[styles.navButtonText, { color: colors.primary }]}>
            Next
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.mascotContainer}>
        <CodeMascot
          type="robot"
          name="Cody"
          emotion="explaining"
          message={mascotMessage}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  content: {
    flex: 1,
  },
  stepWrapper: {
    flex: 1,
  },
  stepContainer: {
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    marginBottom: 16,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  englishDescription: {
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 16,
  },
  exampleBox: {
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 8,
    marginTop: 16,
  },
  exampleText: {
    fontSize: 16,
    lineHeight: 22,
  },
  animation: {
    height: 200,
    marginVertical: 16,
  },
  visualExplanation: {
    fontSize: 16,
    marginTop: 16,
  },
  realWorldExample: {
    marginVertical: 16,
  },
  analogyExplanation: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  practicePrompt: {
    fontSize: 18,
    marginBottom: 16,
  },
  hintContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 8,
  },
  hintText: {
    fontSize: 14,
    lineHeight: 20,
  },
  hintButton: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  hintButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  reviewContainer: {
    marginTop: 16,
  },
  reviewText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  navButton: {
    padding: 12,
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  progressDots: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  mascotContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
});
