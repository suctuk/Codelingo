import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { codeTheme } from '../styles/codeTheme';
import { ExerciseProps } from '../types';
import { ExerciseTimer } from './ExerciseTimer';

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  ${codeTheme.editor};
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Hearts = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Heart = styled.div<{ $active: boolean }>`
  width: 20px;
  height: 20px;
  color: ${props => props.$active ? codeTheme.colors.error : codeTheme.colors.syntax.comment};
  opacity: ${props => props.$active ? 1 : 0.5};
  transition: all ${codeTheme.animation.fast};
  &::after {
    content: '❤️';
  }
`;

const Timer = styled.div<{ $warning: boolean }>`
  font-family: ${codeTheme.fonts.mono};
  color: ${props => props.$warning ? codeTheme.colors.warning : codeTheme.colors.syntax.string};
  font-size: 1.2rem;
`;

const ProgressBar = styled.div<{ $progress: number }>`
  width: 100%;
  height: 4px;
  background: ${codeTheme.colors.sidebar};
  margin-bottom: 1rem;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => props.$progress}%;
    background: ${codeTheme.colors.primary};
    transition: width ${codeTheme.animation.fast};
  }
`;

const ExercisePrompt = styled.div`
  margin-bottom: 2rem;
  font-size: 1.1rem;
  line-height: 1.5;
`;

const CodeBlock = styled.div<{ $language: string }>`
  ${codeTheme.editor};
  margin: 1rem 0;
  padding: 1rem;
  border-radius: 4px;
  background: ${codeTheme.colors.sidebar};
  font-family: ${codeTheme.fonts.mono};
  font-size: 0.9rem;
  line-height: 1.4;
  overflow-x: auto;
  position: relative;

  &::before {
    content: attr(data-language);
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.25rem 0.5rem;
    font-size: 0.8rem;
    color: ${codeTheme.colors.syntax.comment};
    background: ${codeTheme.colors.background};
    border-bottom-left-radius: 4px;
  }

  .line-numbers {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2rem;
    padding: 1rem 0;
    text-align: right;
    padding-right: 0.5rem;
    color: ${codeTheme.colors.syntax.comment};
    user-select: none;
  }

  .code-content {
    margin-left: 2rem;
    padding-left: 0.5rem;
    border-left: 1px solid ${codeTheme.colors.syntax.comment}33;
  }
`;

const AnswerOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
`;

const Option = styled.button<{ $status?: 'correct' | 'incorrect' | null }>`
  ${codeTheme.editor};
  width: 100%;
  text-align: left;
  cursor: pointer;
  transition: all ${codeTheme.animation.fast};
  border: 1px solid ${props => {
    switch (props.$status) {
      case 'correct': return codeTheme.colors.success;
      case 'incorrect': return codeTheme.colors.error;
      default: return codeTheme.colors.syntax.comment;
    }
  }};
  &:hover:not(:disabled) {
    border-color: ${codeTheme.colors.primary};
    background: ${codeTheme.colors.sidebar};
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const Feedback = styled.div<{ $type: 'correct' | 'incorrect' }>`
  margin-top: 2rem;
  padding: 1rem;
  border-radius: 4px;
  text-align: center;
  background: ${props => props.$type === 'correct' ? codeTheme.colors.success + '20' : codeTheme.colors.error + '20'};
  color: ${props => props.$type === 'correct' ? codeTheme.colors.success : codeTheme.colors.error};
  font-weight: bold;
`;

export const Exercise: React.FC<ExerciseProps> = ({ 
  exercise, 
  onComplete,
  hearts,
  onHeartLost 
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [timer] = useState(() => new ExerciseTimer({
    defaultTime: exercise.timeLimit,
    warningTime: 10,
    onTick: () => {},
    onTimeUp: () => {
      if (selectedAnswer === null) {
        handleAnswerSelect('');
      }
    },
    onWarning: () => {}
  }));

  useEffect(() => {
    timer.start();
    return () => timer.stop();
  }, [timer]);

  const handleAnswerSelect = (answer: string) => {
    if (selectedAnswer !== null) return; // Prevent multiple selections
    
    setSelectedAnswer(answer);
    const correct = answer === exercise.correctAnswer;
    setIsCorrect(correct);
    
    if (!correct) {
      onHeartLost();
    }
    
    setTimeout(() => {
      onComplete(correct);
    }, 1500);
  };

  return (
    <Container>
      <ProgressBar $progress={(exercise.timeLimit - timer.getTimeLeft()) / exercise.timeLimit * 100} />
      
      <TopBar>
        <Hearts>
          {Array.from({ length: 5 }).map((_, i) => (
            <Heart 
              key={i} 
              $active={i < hearts}
              data-testid={i < hearts ? 'heart-active' : 'heart-inactive'}
            />
          ))}
        </Hearts>
        <Timer 
          $warning={timer.getTimeLeft() <= 10}
          data-testid="exercise-timer"
        >
          {timer.getTimeLeft()}s
        </Timer>
      </TopBar>

      <ExercisePrompt>
        {exercise.prompt}
        {exercise.sourceCode && (
          <CodeBlock 
            $language="JavaScript" 
            data-language="JavaScript"
            data-testid="source-code"
          >
            <div className="line-numbers">1</div>
            <div className="code-content">{exercise.sourceCode}</div>
          </CodeBlock>
        )}
      </ExercisePrompt>

      <AnswerOptions>
        {exercise.options?.map((option, index) => (
          <Option
            key={index}
            onClick={() => handleAnswerSelect(option)}
            $status={selectedAnswer === option 
              ? option === exercise.correctAnswer 
                ? 'correct' 
                : 'incorrect'
              : null}
            disabled={selectedAnswer !== null}
            data-testid={`answer-option-${index}`}
          >
            {option}
          </Option>
        ))}
      </AnswerOptions>

      {isCorrect !== null && (
        <Feedback 
          $type={isCorrect ? 'correct' : 'incorrect'}
          data-testid="feedback-message"
        >
          {isCorrect ? 'Correct! +10 XP' : 'Incorrect. Try again!'}
        </Feedback>
      )}
    </Container>
  );
};
