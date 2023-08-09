import GameField from './GameField.js';

const gameBoard = document.getElementById('gameField');
const gameModeSelectors = document.querySelectorAll('.selector-item');
const additionalSettings = document.getElementById('additionalSettings');
const additionalSettingsImage = document.getElementById(
	'additionalSettingsImage',
);
const numSquaresInput = document.getElementById('numSquaresInput');
const themeInput = document.getElementById('themeInput');
const gameSettingsForm = document.getElementById('gameSettingsForm');
const sizesValue = document.querySelectorAll('input[name="size"]');

let gridSize = null;
let gameMode = 'numbers';
let isGameGameModeChoosen = false;
let isAdditionalSettingsOn = false;

// Обработчик изменения режима игры
gameModeSelectors.forEach((selector, index) => {
	selector.addEventListener('click', () => {
		gameMode = selector.getAttribute('data-mode');
		toggleActiveGameMode(gameMode);
		updateGameSettings();
	});
});

// Обработчик клика на опции размера
const sizeOptions = document.querySelectorAll('.size-option');
sizeOptions.forEach((option) => {
	option.addEventListener('click', () => {
		const size = option.getAttribute('data-size');
		if (gridSize === size) return;

		gridSize = size;
		isAdditionalSettingsOn = true;
		updateSizeOptions(option);
		updateGameSettings();
	});
});

// Функция для обновления классов опций размера
function updateSizeOptions(activeOption) {
	sizeOptions.forEach((option) => {
		if (option === activeOption) {
			option.classList.add('active');
		} else {
			option.classList.remove('active');
		}
	});
}

function initDefaultSettings() {
	gameModeSelectors[0].classList.add('active');
	isGameGameModeChoosen = true;
}

function toggleActiveGameMode(mode) {
	gameModeSelectors.forEach((x) => {
		if (x.getAttribute('data-mode') === mode) {
			x.classList.add('active');
		} else x.classList.remove('active');
	});
}

// Функция для обновления настроек игры
function updateGameSettings() {
	gameBoard.innerHTML = ''; // Очищаем игровую доску

	if (gameMode === 'numbers') {
		additionalSettings.style.display = 'block';
		additionalSettingsImage.style.display = 'none';
	} else {
		additionalSettings.style.display = 'none';
		additionalSettingsImage.style.display = 'block';
	}

	const theme = themeInput.value;

	// Проверяем выбор режима и наличие значения для количества квадратов (для Numbers Mode)
	const isSettingsValid = isGameGameModeChoosen && isAdditionalSettingsOn;
	if (!isSettingsValid) {
		// Выводим сообщение об ошибке или блокируем начало игры
		console.log('Please select all game settings.');
		return;
	}

	document.getElementById('startNewGameButton').removeAttribute('disabled');
	// Используйте numSquares и theme при генерации карточек
}

for (const radioButton of sizesValue) {
	radioButton.addEventListener('change', showSelected);
}

function findSquareRoot(number) {
	console.log(number);
	for (let i = 1; i <= number; i++) {
		if (i * i === number) {
			return i;
		}
	}
	return null; // Если такого числа не существует
}

function showSelected(e) {
	if (this.checked) {
		return findSquareRoot(+e.target.value);
		// startNewGame(fieldSize);
	}
}

function SelectedInput() {
	return findSquareRoot(+[...sizesValue].filter((x) => x.checked)[0].value);
}

const startNewGameBtn = document.getElementById('startNewGameBtn');
const stopGameBtn = document.getElementById('stopGameBtn');

let gameField = null; // Экземпляр класса GameField

startNewGameBtn.addEventListener('click', () => startNewGame(gridSize));

function startNewGame(fieldSize = 4) {
	document.querySelector('.main-content').setAttribute('disabled', true);
	if (gameField) {
		gameField.resetGame();
		document
			.getElementById('gameSettingsWrapper')
			.setAttribute('disabled', 'true');
		document.querySelector('.main-content').removeAttribute('disabled');
	}

	const wrapper = document.getElementById('gameField');
	wrapper.classList.add('show');
	gameField = new GameField(fieldSize, wrapper);
}

stopGameBtn.addEventListener('click', () => {
	if (gameField) {
		gameField.resetGame();
	}
});

// Обработчик отправки формы
gameSettingsForm.addEventListener('submit', (event) => {
	event.preventDefault(); // Отменяем стандартное поведение формы
	const numSquares = findSquareRoot(parseInt(gridSize));

	startNewGame(numSquares);
});

// Проверка на мобильное устройство
function isMobileDevice() {
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
		navigator.userAgent,
	);
}

document.addEventListener('DOMContentLoaded', startNewGame);

window.addEventListener('load', () => {
	initDefaultSettings();
	updateGameSettings();
});
