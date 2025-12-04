export class Chronometer {
  private time: number = 0;
  private time_max: number = 0;
  private running: boolean = false;
  private intervalId: any | null = null;
  private _element: HTMLElement;
  private element_record: HTMLElement;
  private chrono_freq: number = 100;

  constructor(element: HTMLElement, element_record: HTMLElement) {
    this._element = element;
    this.element_record = element_record;
  }

  // Start the chronometer
  start(): void {
    if (this.running) return; // Prevent multiple intervals

    this.running = true;
    this.intervalId = setInterval(() => {
      this.time += this.chrono_freq;
      this.element = this.displayTime();
    }, this.chrono_freq);
  }

  // Stop the chronometer
  stop(): void {
    if (!this.running) return; // If it's already stopped

    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.running = false;
  }

  // Reset the chronometer
  reset(): void {
    this.stop(); // Stop the timer first
    this.time = 0; // Reset time
    this.element = this.displayTime(); // Optionally display reset time immediately
  }

  // Display the current time (in seconds for simplicity)
  private displayTime(): number {
    // console.log(`Time: ${this.formatTime()}`);
    return this.time;
  }

  set element(newTime: number) {
    this._element.innerHTML = this.formatTime();
    if (this.time > this.time_max) {
      this.time_max = newTime;
      this.element_record.innerHTML = this.formatTime();
    }
  }

  private formatTime(): string {
    return `${this.time / 1000}s`;
  }
}
