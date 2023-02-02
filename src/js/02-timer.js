// Напиши скрипт таймера, который ведёт обратный отсчет
//  до определенной даты. Такой таймер может использоваться
//   в блогах и интернет-магазинах, страницах регистрации событий, 
//   во время технического обслуживания 
  
import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/dark.css';

    let selectedTime = null; 
const refs = {
    inputDate: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('button[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
  };
  console.log(refs.startBtn,refs.inputDate,refs.days, refs.hours, refs.mins, refs.secs);
  
  function convertMs(ms) { 

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    //   days
    const days = pad(Math.floor(ms / day));
    //   hours
    const hours = pad(Math.floor((ms % day) / hour));
    //   minutes
    const minutes = pad(Math.floor(((ms % day) % hour) / minute));
    //   seconds
    const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  }
  
  function pad(value) {
    return String(value).padStart(2, '0');
  }
  
  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: Date.now(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if (selectedDates[0] < Date.now()) {
        Notify.failure('Please choose a date in the future');
        selectedDates[0] = new Date();
      } else {
        refs.startBtn.disabled = false;
        selectedTime = selectedDates[0];
      }
    },
  };

  class Timer {
    constructor() {
      this.timerID = null;
      this.isActive = false;
      refs.startBtn.disabled = true;
    }
  
    startTimer() {
      if (this.isActive) {
        return;
      }
  
      this.isActive = true;
      this.timerID = setInterval(() => {
        const currentTime = Date.now();
        const deltaTime = selectedTime - currentTime;
        const componentsTimer = convertMs(deltaTime);
        this.updateComponentsTimer(componentsTimer);
        if (deltaTime <= 0) {
          this.stopTimer();
        }
      }, 1000);
    }
  
    updateComponentsTimer({ days, hours, minutes, seconds }) {
      refs.days.textContent = days;
      refs.hours.textContent = hours;
      refs.minutes.textContent = minutes;
      refs.seconds.textContent = seconds;
    }
  
    stopTimer() {
      clearInterval(this.timerID);
    }
  }
 // debugger
  const timer = new Timer();
  flatpickr(refs.inputDate, options);
  refs.startBtn.addEventListener('click', () => timer.startTimer());