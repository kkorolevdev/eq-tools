document.addEventListener("DOMContentLoaded", () => {
	const setTimeBtn = document.getElementById("setTimeBtn");
	const timerContainers = document.querySelectorAll(".eq-timer__group");
	let timerDuration = 0;

	setTimeBtn.addEventListener("click", () => {
		const zoneRespMinInput = document.getElementById("zoneRespMin");
		const zoneRespSecInput = document.getElementById("zoneRespSec");
		const minutes = parseInt(zoneRespMinInput.value) || 0;
		const seconds = parseInt(zoneRespSecInput.value) || 0;
		timerDuration = minutes * 60 + seconds;

		timerContainers.forEach(container => {
			const timerDisplay = container.querySelector(".timer");
			displayTimeLeft(timerDisplay, timerDuration);
		});
	});

	timerContainers.forEach(container => {
		const startBtn = container.querySelector(".eq-timer__start");
		const resetBtn = container.querySelector(".eq-timer__reset");
		let countdown;
		let timeLeft = 0;
		let isPaused = false;

		startBtn.addEventListener("click", () => {
			const timerDisplay = container.querySelector(".timer");
			if (!countdown) {
				timeLeft = timerDuration; // Initialize timeLeft to timerDuration
				startTimer(timerDisplay);
				startBtn.textContent = "Pause";
			} else {
				if (isPaused) {
					startTimer(timerDisplay);
					startBtn.textContent = "Pause";
					isPaused = false;
				} else {
					clearInterval(countdown);
					isPaused = true;
					startBtn.textContent = "Continue";
				}
			}
		});

		resetBtn.addEventListener("click", () => {
			const timerDisplay = container.querySelector(".timer");
			clearInterval(countdown);
			countdown = null;
			startBtn.textContent = "Start";
			timeLeft = timerDuration;
			displayTimeLeft(timerDisplay, timerDuration);
		});

		function startTimer(timerDisplay) {
			const startTime = Date.now() - (timerDuration - timeLeft) * 1000;
			countdown = setInterval(() => {
				const secondsElapsed = Math.floor((Date.now() - startTime) / 1000);
				timeLeft = timerDuration - secondsElapsed;
				if (timeLeft < 0) {
					clearInterval(countdown);
					timerDisplay.textContent = "00:00:00";
					startBtn.textContent = "Start";
				} else {
					displayTimeLeft(timerDisplay, timeLeft);
				}
			}, 1000);
		}
	});

	function displayTimeLeft(timerDisplay, seconds) {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const remainingSeconds = seconds % 60;
		const display = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
		timerDisplay.textContent = display;
	}
});
