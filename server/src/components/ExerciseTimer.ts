export class ExerciseTimer {
  private timeLeft: number;
  private warningTime: number;
  private onTick: (timeLeft: number) => void;
  private onTimeUp: () => void;
  private onWarning: () => void;
  private intervalId: NodeJS.Timeout | null = null;

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

  start() {
    if (this.intervalId) return;
    
    this.intervalId = setInterval(() => {
      this.timeLeft--;
      this.onTick(this.timeLeft);
      
      if (this.timeLeft === this.warningTime) {
        this.onWarning();
      }
      
      if (this.timeLeft <= 0) {
        this.stop();
        this.onTimeUp();
      }
    }, 1000);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  getTimeLeft() {
    return this.timeLeft;
  }

  isRunning() {
    return this.intervalId !== null;
  }
}
