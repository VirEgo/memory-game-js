export default class Timer {
	constructor(timerElement) {
		this.timerElement = timerElement;
		this.startTime = null;
		this.intervalId = null;
	}

	start() {
		if (!this.startTime) {
			this.startTime = Date.now();
			this.intervalId = setInterval(this.update.bind(this), 10);
		}
	}

	stop() {
		console.log('Stop method called', this.intervalId);
		this.updateTimerDisplay(0);
		clearInterval(this.intervalId);
	}

	reset() {
		this.intervalId = null;
		this.startTime = null;
		this.updateTimerDisplay(0);

		clearInterval(this.intervalId);
	}

	update() {
		const currentTime = Date.now();
		const elapsedTime = currentTime - this.startTime;
		this.updateTimerDisplay(elapsedTime);
	}

	formatMilliseconds(milliseconds) {
		const totalSeconds = Math.floor(milliseconds / 1000);
		const minutes = Math.floor(totalSeconds / 60);
		const seconds = totalSeconds % 60;
		const remainingMilliseconds = milliseconds % 1000;

		return `${this.formatTime(minutes)}:${this.formatTime(
			seconds,
		)}.${this.formatTime(remainingMilliseconds, 3)}`;
	}

	updateTimerDisplay(elapsedTime) {
		// const milliseconds = elapsedTime % 1000;
		// const totalSeconds = Math.floor(elapsedTime / 1000);
		// const minutes = Math.floor(totalSeconds / 60);
		// const seconds = totalSeconds % 60;

		// const formattedTime = `${this.formatTime(minutes)}:${this.formatTime(
		// 	seconds,
		// )}.${this.formatTime(milliseconds, 3)}`;
		this.timerElement.textContent = this.formatMilliseconds(elapsedTime);
	}

	isRunning() {
		return this.intervalId !== null;
	}

	formatTime(value, digits = 2) {
		return value.toString().padStart(digits, '0');
	}

	elapsedTime() {
		if (this.startTime) {
			const currentTime = Date.now();
			return currentTime - this.startTime;
		}
		return 0;
	}
}
