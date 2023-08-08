# Memory Game with Leaderboard

Welcome to the simple "Memory" game project with a leaderboard, implemented in JavaScript.

## Game Rules

The goal of the game is to find all matching pairs of cards with the fewest moves and in the shortest time.

## How to Play

1. Click on a card to reveal it.
2. Try to find another card with the same value.
3. If two revealed cards have the same value, they will remain open.
4. If the values of the cards are different, they will be flipped back after a short delay.
5. Your objective is to find all pairs of cards as quickly as possible with the fewest moves.

## Starting a New Game

1. Click the "Start New Game" button.
2. Cards will be shuffled, and the timer will start.

## Stopping the Game

1. Click the "Stop Game" button.
2. The timer will stop, and you can start a new game.

## Classes and Methods

### `Timer` (js/Timer.js)

The `Timer` class provides functionality to manage game time.

#### Methods:

- `start()`: Starts the timer.
- `stop()`: Stops the timer.
- `reset()`: Resets the timer.
- `update()`: Updates the timer based on elapsed time.
- `updateTimerDisplay(elapsedTime)`: Updates the timer display on the page.
- `formatTime(value, digits)`: Formats the time value.

### `GameField` (js/GameField.js)

The `GameField` class manages the game field and game logic.

#### Methods:

- `constructor(width, wrapper)`: Creates an instance of the game field.
- `numberArray()`: Generates an array of unique numbers for the cards.
- `setStyleToWrapper()`: Applies styles to the game field and generates the number array.
- `buildTile(value)`: Creates a card element.
- `generateGrid()`: Generates the game field with cards.
- `initApp()`: Initializes the game.

### `Leaderboard` (js/Leaderboard.js)

The `Leaderboard` class manages the leaderboard and stores player results.

#### Methods:

- `constructor()`: Creates an instance of the leaderboard.
- `addScore(score)`: Adds a game result to the leaderboard.
- `updateLeaderboard()`: Updates the leaderboard display.
- `saveScoresToLocalStorage()`: Saves results to localStorage.
- `loadScoresFromLocalStorage()`: Loads results from localStorage.

## Usage

1. Clone the repository.
2. Open `index.html` in your web browser.
3. Enjoy the "Memory" game and compete with other players for the best scores!

---
