// Задание для копилота
// Write a script that, after pressing the "Start" button, changes the background 
// color of the <body> once per second to a random value using the inline style. 
// When you click on the "Stop" button, the background color change should stop.
// Instead of var use const and let
//  Keep in mind that you can press the "Start" button an infinite number of times.
//  Make it so that while the theme change is running, the "Start" button
//  was not active (disabled).

let intervalId = null;
const body = document.querySelector('body');
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

startBtn.addEventListener('click', () => {
    startBtn.disabled = true;
    stopBtn.disabled = false;
    intervalId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    console.log(startBtn);
});

stopBtn.addEventListener('click', () => {
    startBtn.disabled = false;
    stopBtn.disabled = true;
    clearInterval(intervalId);
    console.log("Очистили ",stopBtn);
});
// генератор случайного цвета
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }