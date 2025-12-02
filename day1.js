var fs = require('fs');

const directions = fs.readFileSync('input1.txt').toString().split('\n');

const values = directions.map(direction => {
    let value = Number.parseInt(direction.substring(1));
    if (direction[0] === 'L') {
        value = -value;
    }

    return value;
});


let zeroCounter = 0;
values.reduce((acc, curr) => {
    const position = getCircularPosition(curr, acc);
    
    if (position === 0) {
        zeroCounter++;
    }
    return position;
}, 50);

console.log('Password is', zeroCounter);

function getCircularPosition(direction, current) {
    let value = (direction + current) % 100;

    if (value < 0) {
        value = value + 100;
    } 

    if (value >= 100) {
        value = value - 100;
    }

    return value;
}