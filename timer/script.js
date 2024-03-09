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
        const editBtn = container.querySelector(".eq-timer__group-label-edit");
        const label = container.querySelector(".eq-timer__group-label h3");
        const input = container.querySelector("input");
        const timerDisplay = container.querySelector(".timer");
        let countdown;
        let timeLeft = 0;
        let isPaused = false;

        startBtn.addEventListener("click", () => {
            if (!countdown) {
                timeLeft = timerDuration; // Initialize timeLeft to timerDuration
                startTimer();
                startBtn.textContent = "Pause";
            } else {
                togglePause();
            }
        });

        resetBtn.addEventListener("click", () => {
            clearInterval(countdown);
            countdown = null;
            startBtn.textContent = "Start";
            startBtn.style.display = "inline-block"; // Show the start button
            timeLeft = timerDuration;
            timerDisplay.classList.remove("attention", "warning", "complete");
            displayTimeLeft(timerDisplay, timerDuration);
        });

        editBtn.addEventListener("click", () => {
            if (editBtn.textContent === "Edit") {
                label.style.display = "none";
                input.style.display = "inline-block";
                input.value = label.textContent.trim();
                editBtn.textContent = "Save";
            } else {
                label.textContent = input.value.trim();
                label.style.display = "inline-block";
                input.style.display = "none";
                editBtn.textContent = "Edit";
            }
        });

        function startTimer() {
            const startTime = Date.now() - (timerDuration - timeLeft) * 1000;
            countdown = setInterval(() => {
                const secondsElapsed = Math.floor((Date.now() - startTime) / 1000);
                timeLeft = timerDuration - secondsElapsed;
                if (timeLeft <= 0) {
                    timerDisplay.classList.remove("attention", "warning");
                    if (timeLeft === 0) {
                        timerDisplay.classList.add("complete");
                        startBtn.style.display = "none"; // Hide the start button
                    }
                    displayTimeLeft(timerDisplay, timeLeft);
                } else {
                    displayTimeLeft(timerDisplay, timeLeft);
                    updateTimerClasses();
                }
                if (timeLeft <= -timerDuration) {
                    clearInterval(countdown);
                    countdown = null;
                }
            }, 1000);
        }

        function togglePause() {
            if (isPaused) {
                startTimer();
                startBtn.textContent = "Pause";
                isPaused = false;
            } else {
                clearInterval(countdown);
                isPaused = true;
                startBtn.textContent = "Continue";
            }
        }

        function updateTimerClasses() {
            timerDisplay.classList.remove("attention", "warning");
            if (timeLeft <= 60 && timeLeft > 30) {
                timerDisplay.classList.add("attention");
            } else if (timeLeft <= 30 && timeLeft > 0) {
                timerDisplay.classList.add("warning");
            }
        }
    });

    function displayTimeLeft(timerDisplay, seconds) {
        const absSeconds = Math.abs(seconds);
        const hours = Math.floor(absSeconds / 3600);
        const minutes = Math.floor((absSeconds % 3600) / 60);
        const remainingSeconds = absSeconds % 60;
        const display = `${seconds < 0 ? '-' : ''}${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
        timerDisplay.textContent = display;
    }
});
