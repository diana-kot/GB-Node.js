// 1. Решите задачу по выводу данных в консоль.

// console.log("Record 1");

// setTimeout(() => {
//   console.log("Record 2");
//   Promise.resolve().then(() => {
//     setTimeout(() => {
//       console.log("Record 3");
//       Promise.resolve().then(() => {
//         console.log("Record 4");
//       });
//     });
//   });
// });

// console.log("Record 5");

// Promise.resolve().then(() =>
//   Promise.resolve().then(() => console.log("Record 6"))
// );

// Ответ

// Record 1
// Record 5
// Record 6
// Record 2
// Record 3
// Record 4

const EventEmitter = require('events');
const emitter = new EventEmitter();

let userTimer = process.argv[2];

if (userTimer.length < 13) {
    console.log('Вы не ввели один из параметров даты("час-день-мес-год").Попробуйте еще раз.')
}

let userHour = +(userTimer.slice(0, 2))
let userDay = +(userTimer.slice(3, 5))
let userMonth = +(userTimer.slice(6, 8))
let userYear = +(userTimer.slice(9))
let timer = new Date(userYear, userMonth - 1, userDay, userHour + 1)

let currentDay = new Date();

let timerObj = {
    timer: 'on',
    yearDiff: 0,
    monthDiff: 0,
    daysDiff: 0,
    hoursDiff: 0,
    minutesDiff: 0,
    secondsDiff: 0
}
if (timer.getTime() < currentDay.getTime()) {
    console.log('Введенная дата уже истекла')
    timerObj.timer = 'off'
}

const diffTimer = () => {
    let now = new Date();
    let diff = timer.getTime() - now.getTime()
    let yearDiff = Math.abs(timer.getFullYear() - now.getFullYear())
    let monthDiff = Math.abs(timer.getMonth() - now.getMonth())
    let daysDiff = Math.floor(diff / (1000 * 60 * 60 * 24));
    let hoursDiff = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutesDiff = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    let secondsDiff = Math.floor((diff % (1000 * 60)) / 1000);

    if (yearDiff == 0 && monthDiff == 0 && daysDiff == 0 && hoursDiff == 0 && minutesDiff == 0 && secondsDiff == 0) {
        timerObj.timer = 'off'
    } else {
        timerObj.yearDiff = yearDiff
        timerObj.monthDiff = monthDiff
        timerObj.daysDiff = daysDiff
        timerObj.hoursDiff = hoursDiff
        timerObj.minutesDiff = minutesDiff
        timerObj.secondsDiff = secondsDiff
    }
}

const timerTick = async () => {
    diffTimer();
    if (timerObj.timer === 'on') {
        emitter.emit('timertick')
        await new Promise((resolve) => setInterval(resolve, 1000))
        await timerTick()
    } else if (timerObj.timer === 'off') {
        emitter.emit('timeroff')
        emitter.removeAllListeners()
        return
    } else {
        emitter.emit('error', 'Uuups! Error')
        emitter.removeAllListeners()
        return
    }
}

class Handler {
    static tick() {
        console.log('осталось: ' + timerObj.yearDiff + ' лет,', timerObj.monthDiff + ' месяцев,', timerObj.daysDiff + ' дней,', timerObj.hoursDiff + ' часов,', timerObj.minutesDiff + ' минут,', timerObj.secondsDiff + ' секунд')
    }
    static timeroff() {
        console.log('Таймер истек')
    }
}

emitter.on('timertick', Handler.tick)
emitter.on('timeroff', Handler.timeroff)
emitter.on('error', console.log)

timerTick();

