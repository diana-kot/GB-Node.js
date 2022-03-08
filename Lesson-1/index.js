const colors = require('colors');
const green = colors.green
const yellow = colors.yellow
const red = colors.red

let a = +process.argv[2]
let b = +process.argv[3]
let arr = []


const validFunc = () => {
    if (isNaN(a) || isNaN(b)) {
        console.log(red('Попробуйте еще раз, и в этот раз введите ЧИСЛА'))
    } else {
        if (a > b) {
            [b, a] = [a, b]
        }
        findNum();
    }
}


const findNum = () => {
    if (a < 2) {
        a = 2
        console.log('Простые числа начинаются с 2')
    }

    while (a <= b) {
        if (a % 2 == 0 & a != 2) {
            ++a;
        } else if (a % 3 == 0 & a != 3) {
            ++a;
        } else if (a % 5 == 0 & a != 5) {
            ++a;
        } else if (a % 7 == 0 & a != 7) {
            ++a;
        } else {
            arr.push(a)
            ++a;
        }
    }
    if (arr.length == 0) {
        console.log(red('В введенном диапозоне нет простых чисел'))
        return
    }
    outputFunc();
}

const outputFunc = () => {
    for (let i = 0; i < arr.length; i += 3) {

        console.log(green(arr[i]))

        if (arr[i + 1] === undefined) {
            break
        }
        console.log(yellow(arr[i + 1]))

        if (arr[i + 2] === undefined) {
            break
        }
        console.log(red(arr[i + 2]))
    }
}
validFunc();