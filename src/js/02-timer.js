
import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/dark.css';

    let selectedTime = null; 
   
  const refs = {
    inputDate: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('button[data-startt]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
     body: document.querySelector('body'),
  };
  
  function convertMs(ms) { 

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = pad(Math.floor(ms / day));
    const hours = pad(Math.floor((ms % day) / hour));
    const minutes = pad(Math.floor(((ms % day) % hour) / minute));
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
        const starTik = 100*1000;
        const starAlarm = 8*1000;
        
            // Звуковое оформление
        if (deltaTime <= starTik && deltaTime > starAlarm) {
            const audio1 = document.getElementById('kitchen-timer');
            audio1.play(); 
            refs.startBtn.textContent = 'Start HIMARS. Time to Goal'; 
          } else if (deltaTime <= starAlarm) {
            const audio1 = document.getElementById('kitchen-timer');
            audio1.pause(); 
            audio1.currentTime = 0;
            const audioTrevoga = document.getElementById('trevoga');
            audioTrevoga.play(); 
            refs.body.style.backgroundColor = "#ff0000"; 
          }

        if (deltaTime <= 0) {
          this.stopTimer();
          this.isActive = false;
          this.updateComponentsTimer({ days: '00', hours: '00', minutes: '00', seconds: '00' });
       
          const audioBoom = document.getElementById('boom');
          audioBoom.play();

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
  
  const timer = new Timer();
  flatpickr(refs.inputDate, options);
  refs.startBtn.addEventListener('click', () => timer.startTimer());