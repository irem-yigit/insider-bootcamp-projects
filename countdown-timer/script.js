const timeInput = document.getElementById("timeInput");
const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("resetButton");
const timer = document.getElementById("timer");

let countdown = null;

startButton.addEventListener("click", () => {
    if (countdown !== null ) {
        return;
    }

    let timeLeft = parseInt(timeInput.value); 

    if (!isNaN(timeLeft) && timeLeft > 0) {
        countdown = setInterval(() => {
            timer.textContent = `Remaining Time: ${timeLeft} seconds`;
            timeLeft--;
            
            if (timeLeft < 0) {
                timer.textContent = 'Time is up!';
                clearInterval(countdown);
                countdown = null;
            }
        }, 1000); 
    } else {
        alert('Please enter a valid time in seconds.');
    }

});

resetButton.addEventListener("click", () => {
    clearInterval(countdown);
    countdown = null;
    timer.textContent = 'Enter a duration and press start!';
    timeInput.value = '';
});
