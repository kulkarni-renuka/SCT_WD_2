let startTime = 0;
let elapsedTime = 0;
let isRunning = false;
let interval;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const startStopBtn = document.getElementById('startStopBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const lapsContainer = document.getElementById('laps');

startStopBtn.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(interval);
        startStopBtn.textContent = 'Start';
    } else {
        startTime = Date.now() - elapsedTime; 
        interval = setInterval(updateTime, 10); 
        startStopBtn.textContent = 'Pause';
    }
    isRunning = !isRunning; 
    lapBtn.disabled = !isRunning; 
});

lapBtn.addEventListener('click', () => {
    const lapTime = `${minutesDisplay.textContent}:${secondsDisplay.textContent}:${millisecondsDisplay.textContent}`;
    const lapElement = document.createElement('li');
    lapElement.textContent = `Lap ${lapsContainer.children.length + 1}: ${lapTime}`;
    lapsContainer.appendChild(lapElement);
});

resetBtn.addEventListener('click', () => {
    clearInterval(interval); 
    elapsedTime = 0; 
    isRunning = false; 
    minutesDisplay.textContent = '00';
    secondsDisplay.textContent = '00';
    millisecondsDisplay.textContent = '00';
    startStopBtn.textContent = 'Start';
    lapBtn.disabled = true;
    lapsContainer.innerHTML = ''; 
});

function updateTime() {
    elapsedTime = Date.now() - startTime;
    const minutes = Math.floor((elapsedTime / 60000) % 60); 
    const seconds = Math.floor((elapsedTime / 1000) % 60);
    const milliseconds = Math.floor((elapsedTime % 1000) / 10); 

    minutesDisplay.textContent = String(minutes).padStart(2, '0');
    secondsDisplay.textContent = String(seconds).padStart(2, '0');
    millisecondsDisplay.textContent = String(milliseconds).padStart(2, '0');
}
