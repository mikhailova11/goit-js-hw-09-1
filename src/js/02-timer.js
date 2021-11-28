import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

//1.Диапозон дат, если selectedDates[0] < selectedDates , то window.alert() с текстом "Please choose a date in the future"
//2.Если пользователь выбрал валидную дату (в будущем), кнопка «Start» становится активной.
//3.Кнопка «Start» должа быть не активна до тех пор, пока пользователь не выбрал дату в будущем.
//4.При нажатии на кнопку «Start» начинается отсчет времени до выбранной даты с момента нажатия.
//5.Количество дней может состоять из более чем двух цифр.
//6.Таймер должен останавливаться когда дошел до конечной даты, то есть 00:00:00:00.
//7.Напиши функцию addLeadingZero(value), которая использует метод метод padStart() и перед отрисовкой интефрейса форматируй значение.
//8.Для отображения уведомлений пользователю вместо window.alert() используй библиотеку notiflix.

const refs = {
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]'),
    startBtn: document.querySelector('button[data-start]'),
    clockface: document.querySelector('#datetime-picker'),
    selectedTime: null,
}

new flatpickr('#datetime-picker', {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if(selectedDates[0].getTime() < new Date().getTime()){
            Notify.failure('Please choose a date in the future');
            refs.startBtn.setAttribute('disabled', true)
            return;
        }
        refs.selectedTime = selectedDates[0].getTime()
        refs.startBtn.removeAttribute('disabled')  
    },
 }); 
 
class Timer {
    constructor({onTick}){
    this.intervalId = null;
    this.isActive = false;
    this.onTick = onTick;

    this.init();
    
    }
    init(){
    const time = this.getTimeComponents(0);
    this.onTick(time);
    }
    start(){
        if (this.isActive){
            return;
        }

        const startTime = refs.selectedTime;
        this.isActive = true;

        this.intervalId = setInterval(() =>{
            const currentTime = new Date().getTime(); 
            const deltaTime = startTime - currentTime;
            const time = this.getTimeComponents(deltaTime);
        
            this.onTick(time);
        }, 1000);
    }

    addLeadingZero(value){
        return String(value).padStart(2, '0')
    }
    
    getTimeComponents(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = this.addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = this.addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  }
  
    
}

const timer = new Timer({
    onTick: updateClockfase,
});

refs.startBtn.addEventListener('click', timer.start.bind(timer));

function updateClockfase({ days, hours, minutes, seconds }) {
    refs.days.textContent = `${days}`;
    refs.hours.textContent = `${hours}`;
    refs.minutes.textContent = `${minutes}`;
    refs.seconds.textContent = `${seconds}`;
}

