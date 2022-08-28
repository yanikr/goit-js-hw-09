import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const dateTime = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const hoursId = document.querySelector('[data-hours]');
const daysId = document.querySelector('[data-days]');
const minutesId = document.querySelector('[data-minutes]');
const secondsId = document.querySelector('[data-seconds]');
const timerClass = document.querySelector('.timer');
const fieldClass = document.querySelectorAll('.field');

timerClass.style.display = 'flex';
timerClass.style.fontSize = '20px';
timerClass.style.fontWeight = '600';
dateTime.style.height = '30px';
dateTime.style.textAlign = 'center';
dateTime.style.fontSize = '20px';
dateTime.style.width = '309px';
dateTime.style.borderRadius = '4px';
dateTime.style.verticalAlign = 'bottom';
startBtn.style.width = '105px';
startBtn.style.borderRadius = '4px';
startBtn.style.height = '30px';
startBtn.style.cursor = 'pointer';
fieldClass.forEach(element => {
  element.style.marginRight = '20px';
});

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      Notiflix.Notify.warning('Please choose a date in the future');
      startBtn.disabled = true;
    }
    startBtn.disabled = false;
    startBtn.addEventListener('click', () => {
      timerId = setInterval(() => {
        const now = Date.now();
        const timeLeft = selectedDates[0] - now;
        if (timeLeft < 0) {
          clearInterval(timerId);
          startBtn.disabled = false;
          return;
        }
        countdown(convertMs(timeLeft));
        startBtn.disabled = true;
      }, 1000);
    });
  },
};
flatpickr(dateTime, options);
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
function countdown({ days, hours, minutes, seconds }) {
  daysId.textContent = addLeadingZero(days);
  hoursId.textContent = addLeadingZero(hours);
  minutesId.textContent = addLeadingZero(minutes);
  secondsId.textContent = addLeadingZero(seconds);
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}
