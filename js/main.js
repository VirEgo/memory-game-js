// import GameField from 'GameField';
import GameField from './GameField.js';

const sizesValue = document.querySelectorAll('input[name="size"]');
let gridSize = SelectedInput();

for (const radioButton of sizesValue) {
	radioButton.addEventListener('change', showSelected);
}

function findSquareRoot(number) {
	for (let i = 1; i <= number; i++) {
		if (i * i === number) {
			return i;
		}
	}
	return null; // Если такого числа не существует
}

function showSelected(e) {
	if (this.checked) {
		let fieldSize = findSquareRoot(+e.target.value);
		startNewGame(fieldSize);
	}
}

function SelectedInput() {
	return findSquareRoot(+[...sizesValue].filter((x) => x.checked)[0].value);
}

const startNewGameBtn = document.getElementById('startNewGameBtn');
const stopGameBtn = document.getElementById('stopGameBtn');

let gameField = null; // Экземпляр класса GameField

startNewGameBtn.addEventListener('click', () => startNewGame(gridSize));

function startNewGame(fieldSize = gridSize) {
	if (gameField) {
		gameField.resetGame();
	}

	const wrapper = document.getElementById('gameWrapper');
	gameField = new GameField(fieldSize, wrapper);
}

stopGameBtn.addEventListener('click', () => {
	if (gameField) {
		gameField.resetGame();
	}
});

document.addEventListener('DOMContentLoaded', startNewGame);
