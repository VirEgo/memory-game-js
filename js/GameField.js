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
		this.gridContainer = document.querySelector('.grid-container');
		// this.gridSize.loadScoresFromLocalStorage();

		this.timerStopped = false; // Флаг для отслеживания остановки таймера
		this.moveCount = 0;
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
		console.log(this.width, 'this.width');
		const multipluWidth = Math.pow(this.width, 2);
		// Вычисление количества строк и столбцов сетки
		const rows = Math.sqrt(multipluWidth);
		const columns = Math.ceil(multipluWidth / rows);
		// const gridContainer = document.querySelector('.grid-container');

		// const gridTemplate = `repeat(${this.width}, minmax(calc(calc(600px / ${this.width}) - 50px),1fr))`;
		// const gridTemplate = `repeat(auto-fill, minmax(100px, 1fr))`;
		// this.$wrapper.style.gridTemplateColumns = gridTemplate;
		// this.$wrapper.style.gridTemplateRows = gridTemplate;

		// Настройка сетки
		this.$wrapper.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
		this.$wrapper.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

		this.$wrapper.style.opacity = 1;
		this.$wrapper.style.transform = 'scale(1)';

		this.doubledArray = this.numberArray();
		this.doubledArrayLength = this.doubledArray.length;
	}

	buildTile(value) {
		const tileElement = document.createElement('div');
		tileElement.classList.add('grid-cell', 'card');

		const innerCard = document.createElement('div');
		const innerCardFront = document.createElement('div');
		innerCardFront.classList.add('card-front');

		const innerCardBack = document.createElement('div');
		innerCardBack.classList.add('card-back');
		innerCardBack.textContent = value;
		innerCard.classList.add('card-inner');
		innerCard.append(innerCardFront, innerCardBack);

		tileElement.appendChild(innerCard);
		tileElement.setAttribute('data-value', value);
		tileElement.setAttribute('data-active', 'false');

		tileElement.addEventListener('click', () => {
			this.handleTileClick(tileElement, value);
		});

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
		tileElement.classList.add('active');
		tileElement.querySelector('.card-back').innerText = value;

		if (!this.activeTile) {
			this.activeTile = tileElement;
			return;
		}

		const activeValue = parseInt(this.activeTile.getAttribute('data-value'));

		if (activeValue === value) {
			this.matchTiles(tileElement);
			this.incrementMoveCount();
			return;
		}

		this.isWaitingForTurn = true;
		this.incrementMoveCount();
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
				time: this.timer.formatMilliseconds(this.timer.elapsedTime()),
				moves: this.moveCount + 1,
			};

			this.leaderboard.addScore(score);
			this.resetGame();
		}
	}

	resetMismatchedTiles(tileElement) {
		this.activeTile.querySelector('.card-back').innerText = null;
		this.activeTile.classList.remove('active');

		tileElement.querySelector('.card-back').innerText = null;
		tileElement.classList.remove('active');
		this.isWaitingForTurn = false;
		this.activeTile = null;
	}

	generateGrid() {
		this.$wrapper.innerHTML = '';
		for (let i = 0; i < this.doubledArrayLength; i++) {
			const randomIndex = Math.floor(Math.random() * this.doubledArray.length);
			console.log(randomIndex, 'randomIndex');
			const value = this.doubledArray[randomIndex];
			const item = this.buildTile(value);
			this.doubledArray.splice(randomIndex, 1);
			this.$wrapper.appendChild(item);
			setTimeout(() => {
				item.style.opacity = 1;
				item.style.transform = 'translateY(0)';
			}, i * 50); // Задержка появления для каждой карточки
		}
	}

	incrementMoveCount() {
		this.moveCount++;
		console.log(this.moveCount);
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
