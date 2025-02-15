import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Exercise } from '../Exercise';
import { ThemeProvider } from 'styled-components';
import { codeTheme } from '../../styles/codeTheme';
import { Exercise as ExerciseType } from '../../types';
import { ExerciseTimer } from '../ExerciseTimer';

// Mock ExerciseTimer
jest.mock('../ExerciseTimer');

const mockExercise: ExerciseType = {
  type: 'multipleChoice',
  prompt: 'Convert this JavaScript print statement to Python',
  sourceCode: 'console.log("Hello World");',
  options: [
    'print("Hello World")',
    'System.out.println("Hello World")',
    'echo("Hello World")',
    'printf("Hello World")'
  ],
  correctAnswer: 'print("Hello World")',
  timeLimit: 30,
  xpReward: 10
};

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={codeTheme}>
      {component}
    </ThemeProvider>
  );
};

describe('Exercise Component', () => {
  let mockTimer: ExerciseTimer;

  beforeEach(() => {
    mockTimer = new ExerciseTimer({
      defaultTime: 30,
      warningTime: 10,
      onTick: jest.fn(),
      onTimeUp: jest.fn(),
      onWarning: jest.fn()
    });
  });

  afterEach(() => {
    mockTimer.stop();
    jest.clearAllMocks();
  });

  it('renders exercise prompt and code correctly', () => {
    renderWithTheme(
      <Exercise
        exercise={mockExercise}
        onComplete={jest.fn()}
        hearts={5}
        onHeartLost={jest.fn()}
      />
    );

    expect(screen.getByText(mockExercise.prompt)).toBeInTheDocument();
    expect(screen.getByText(mockExercise.sourceCode as string)).toBeInTheDocument();
    mockExercise.options?.forEach(option => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  it('shows correct feedback when right answer is selected', async () => {
    const onComplete = jest.fn();
    renderWithTheme(
      <Exercise
        exercise={mockExercise}
        onComplete={onComplete}
        hearts={5}
        onHeartLost={jest.fn()}
      />
    );

    const correctOption = screen.getByText(mockExercise.correctAnswer as string);
    await userEvent.click(correctOption);

    expect(await screen.findByText(/Correct!/i)).toBeInTheDocument();
    expect(onComplete).toHaveBeenCalledWith(true);
  });

  it('shows incorrect feedback and loses heart when wrong answer is selected', async () => {
    const onHeartLost = jest.fn();
    renderWithTheme(
      <Exercise
        exercise={mockExercise}
        onComplete={jest.fn()}
        hearts={5}
        onHeartLost={onHeartLost}
      />
    );

    const wrongOption = screen.getByText('printf("Hello World")');
    await userEvent.click(wrongOption);

    expect(await screen.findByText(/Incorrect/i)).toBeInTheDocument();
    expect(onHeartLost).toHaveBeenCalled();
  });

  it('handles timer expiration correctly', async () => {
    const onHeartLost = jest.fn();
    renderWithTheme(
      <Exercise
        exercise={mockExercise}
        onComplete={jest.fn()}
        hearts={5}
        onHeartLost={onHeartLost}
      />
    );

    // Fast-forward timer to near expiration
    for (let i = 0; i < 28; i++) {
      mockTimer.mockTick();
    }

    // Timer warning should appear
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByTestId('timer')).toHaveStyle({ color: expect.stringContaining('warning') });

    // Expire timer
    mockTimer.mockTimeUp();
    expect(onHeartLost).toHaveBeenCalled();
  });

  it('displays correct number of hearts', () => {
    renderWithTheme(
      <Exercise
        exercise={mockExercise}
        onComplete={jest.fn()}
        hearts={3}
        onHeartLost={jest.fn()}
      />
    );

    const activeHearts = screen.getAllByTestId('heart-active');
    const inactiveHearts = screen.getAllByTestId('heart-inactive');
    
    expect(activeHearts).toHaveLength(3);
    expect(inactiveHearts).toHaveLength(2); // Assuming max hearts is 5
  });

  it('disables options after answer is selected', async () => {
    renderWithTheme(
      <Exercise
        exercise={mockExercise}
        onComplete={jest.fn()}
        hearts={5}
        onHeartLost={jest.fn()}
      />
    );

    const option = screen.getByText(mockExercise.options![0]);
    await userEvent.click(option);

    mockExercise.options?.forEach(optionText => {
      const optionElement = screen.getByText(optionText);
      expect(optionElement).toBeDisabled();
    });
  });
});
