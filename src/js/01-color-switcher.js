/*<button type="button" data-start>Start</button>
<button type="button" data-stop>Stop</button>

Напиши скрипт, 
который после нажатия кнопки «Start», раз в секунду меняет цвет фона <body> 
на случайное значение используя инлайн стиль. 
При нажатии на кнопку «Stop», изменение цвета фона должно останавливаться.

⚠️ Учти, на кнопку «Start» можно нажать бесконечное количество раз. 
Сделай так, чтобы пока изменение темы запушено, кнопка «Start» была не активна (disabled).

Для генерации случайного цвета используй функцию getRandomHexColor.

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}*/ 

const refs = {
    start: document.querySelector('button[data-start]'),
    stop: document.querySelector('button[data-stop]'),
    body: document.querySelector('body'),  
    timerId: null,
}

refs.start.addEventListener('click', onStartBtnClick);
refs.stop.addEventListener('click', onStopBtnClick);

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

function onStartBtnClick(){
    refs.start.setAttribute('disabled', true);
    timerId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
}, 1000);
console.log(timerId);
};
    
function onStopBtnClick() {
    clearInterval(timerId);
    refs.stop.removeAttribute('disabled')  
    };