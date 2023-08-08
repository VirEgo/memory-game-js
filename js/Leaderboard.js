export default class Leaderboard {
	constructor() {
		this.scores = [];
		this.loadScoresFromLocalStorage();
	}

	addScore(score) {
		this.scores.push(score);
		this.scores.sort((a, b) => a.time - b.time);
		this.saveScoresToLocalStorage();
		this.updateLeaderboard();
		console.log('Результат добавлен');
	}

	loadScoresFromLocalStorage() {
		const savedScores = localStorage.getItem('leaderboard');
		if (savedScores) {
			this.scores = JSON.parse(savedScores);
			this.updateLeaderboard();
		}
	}

	saveScoresToLocalStorage() {
		localStorage.setItem('leaderboard', JSON.stringify(this.scores));
	}

	updateLeaderboard() {
		const leaderboardList = document.getElementById('leaderboardList');
		leaderboardList.innerHTML = '';

		for (const score of this.scores) {
			const listItem = document.createElement('li');
			listItem.textContent = `Время: ${score.time} мс, Количество ходов: ${score.moves}`;
			leaderboardList.appendChild(listItem);
		}
	}
}
