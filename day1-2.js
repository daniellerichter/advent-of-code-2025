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
    console.log(acc);
    const position = getCircularPosition(curr, acc); 
    const passes = getPassesByZero(acc, position, curr);
    zeroCounter = zeroCounter + passes;
    console.log(`Current location ${acc}, Direction ${curr}, passes for this round ${passes}`);
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

    return Math.abs(value);
}

function getPassesByZero(prevPos, newPos, direction) {
    let totalPasses = 0;

    if (Math.abs(direction) > 100) {
        let passes = Math.floor(Math.abs(direction)/100);
        totalPasses = totalPasses + passes;
    }

    let remainder = direction % 100;

    if (prevPos + remainder > 100 && newPos != 0) {
        totalPasses++;
    }

    if (prevPos + remainder < 0 && prevPos != 0 && newPos != 0) {
        totalPasses++;
    }

    return totalPasses;
}