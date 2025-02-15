export class ExerciseTimer {
  private timeLeft: number;
  private warningTime: number;
  private onTick: (timeLeft: number) => void;
  private onTimeUp: () => void;
  private onWarning: () => void;
  private isTimerRunning: boolean = false;

  constructor({
    defaultTime,
    warningTime,
    onTick,
    onTimeUp,
    onWarning
  }: {
    defaultTime: number;
    warningTime: number;
    onTick: (timeLeft: number) => void;
    onTimeUp: () => void;
    onWarning: () => void;
  }) {
    this.timeLeft = defaultTime;
    this.warningTime = warningTime;
    this.onTick = onTick;
    this.onTimeUp = onTimeUp;
    this.onWarning = onWarning;
  }

  start(): void {
    if (this.isTimerRunning) return;
    this.isTimerRunning = true;
    this.onTick(this.timeLeft);
  }

  stop(): void {
    this.isTimerRunning = false;
  }

  getTimeLeft(): number {
    return this.timeLeft;
  }

  isRunning(): boolean {
    return this.isTimerRunning;
  }

  // Test helper methods
  mockTick(): void {
    if (!this.isTimerRunning) return;
    this.timeLeft--;
    this.onTick(this.timeLeft);
    
    if (this.timeLeft === this.warningTime) {
      this.onWarning();
    }
    
    if (this.timeLeft <= 0) {
      this.stop();
      this.onTimeUp();
    }
  }

  mockTimeUp(): void {
    if (!this.isTimerRunning) return;
    this.timeLeft = 0;
    this.stop();
    this.onTimeUp();
  }
}
