import Timer from './Timer.js'; // Подставьте путь к вашему классу Timer
import Leaderboard from './Leaderboard.js'; // Подставьте путь к вашему файлу с классом Leaderboard

export default class GameField {
	constructor(width, wrapper) {
		this.width = width;
		this.$wrapper = wrapper;
		this.doubledArray = null;
		this.doubledArrayLength = 0;
		this.activeTile = null;
		this.totalDoneTiles = 0;
		this.isWaitingForTurn = false;

		this.timer = new Timer(document.getElementById('timer'));
		this.leaderboard = new Leaderboard();
		this.leaderboard.loadScoresFromLocalStorage();

		this.timerStopped = false; // Флаг для отслеживания остановки таймера

		this.initApp();
	}

	numberArray() {
		const numberArray = [];
		const maxNumber = Math.pow(this.width, 2) / 2;

		for (let i = 0; i < maxNumber; i++) {
			let uniqueNumber;
			do {
				uniqueNumber = Math.floor(Math.random() * maxNumber);
			} while (numberArray.includes(uniqueNumber));

			numberArray.push(uniqueNumber);
		}

		return [...numberArray, ...numberArray];
	}

	setStyleToWrapper() {
		const gridTemplate = `repeat(${this.width}, minmax(50px,1fr))`;
		this.$wrapper.style.gridTemplateColumns = gridTemplate;
		this.$wrapper.style.gridTemplateRows = gridTemplate;

		this.doubledArray = this.numberArray();
		this.doubledArrayLength = this.doubledArray.length;
	}

	buildTile(value) {
		const tileElement = document.createElement('div');
		tileElement.classList.add('grid-cell');
		tileElement.setAttribute('data-value', value);
		tileElement.setAttribute('data-active', 'false');

		tileElement.addEventListener('click', () =>
			this.handleTileClick(tileElement, value),
		);

		return tileElement;
	}

	handleTileClick(tileElement, value) {
		if (
			this.isWaitingForTurn ||
			tileElement.getAttribute('data-active') === 'true' ||
			tileElement === this.activeTile
		) {
			return;
		}

		if (!this.timer.isRunning()) {
			this.timer.start();
		}

		tileElement.innerText = value;

		if (!this.activeTile) {
			this.activeTile = tileElement;
			return;
		}

		const activeValue = parseInt(this.activeTile.getAttribute('data-value'));

		if (activeValue === value) {
			this.matchTiles(tileElement);
			return;
		}

		this.isWaitingForTurn = true;

		setTimeout(() => {
			this.resetMismatchedTiles(tileElement);
		}, 1000);
	}

	matchTiles(tileElement) {
		this.activeTile.setAttribute('data-active', 'true');
		tileElement.setAttribute('data-active', 'true');
		this.activeTile = null;
		this.isWaitingForTurn = false;
		this.totalDoneTiles += 2;

		if (this.totalDoneTiles === this.doubledArrayLength) {
			this.timerStopped = true;
			this.timer.stop();

			const score = {
				time: this.timer.elapsedTime(),
				moves: this.totalDoneTiles / 2,
			};

			this.leaderboard.addScore(score);
			this.resetGame();
		}
	}

	resetMismatchedTiles(tileElement) {
		this.activeTile.innerText = null;
		tileElement.innerText = null;
		this.isWaitingForTurn = false;
		this.activeTile = null;
	}

	generateGrid() {
		this.$wrapper.innerHTML = '';
		for (let i = 0; i < this.doubledArrayLength; i++) {
			const randomIndex = Math.floor(Math.random() * this.doubledArray.length);
			const value = this.doubledArray[randomIndex];
			const item = this.buildTile(value);
			this.doubledArray.splice(randomIndex, 1);
			this.$wrapper.appendChild(item);
		}
	}

	resetGame() {
		this.totalDoneTiles = 0;
		this.isWaitingForTurn = false;
		this.isInitialClick = true;
		this.timer.stop();
		this.generateGrid();
	}

	initApp() {
		this.setStyleToWrapper();
		this.generateGrid();
	}
}
