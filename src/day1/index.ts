// each line is a calibration value -> should be recovered
// on each line the calibration is -> first number, last number : 25
// answer -> sum of all 2 digit numbers

// first question
// split the text to line
// find the first and last number
// form a 2-digit number
// add all numbers together

// second question
// -> numbers can be spelled with letters => one = 1, two = 2, ...
// split the text to line
// find the index of each number in the form of text or digit
// sort the result => use the lowest and highest index

import * as fs from 'fs';

const numbersAsString = [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
];

const numbersAsDigits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const workingDir = process.cwd();

const input = fs.readFileSync(workingDir + '/src/day1/input.txt').toString();

const question1 = () => {
    const inputSplitedToLine = input.split(/\r?\n/);
    const result = inputSplitedToLine.reduce((acc, line) => {
        let firstDigitString: string = '';
        let lastDigitString: string = '';
        line.split('').forEach((char) => {
            if (Number(char)) {
                if (!firstDigitString) {
                    firstDigitString = char;
                }
                lastDigitString = char;
            }
        });
        return (acc += Number(firstDigitString + lastDigitString));
    }, 0);

    console.log(result);
};

const findNumberInLine = (line: string) => {
    const numbersInLine: { value: number; index: number }[] = [];
    [...numbersAsString, ...numbersAsDigits].forEach((number, index) => {
        let numIndex = 0;
        while (numIndex != -1) {
            numIndex = line.indexOf(`${number}`, numIndex);
            if (numIndex != -1) {
                numbersInLine.push({
                    value: Number(number) ? index - 10 : index,
                    index: numIndex,
                });
                numIndex += `${number}`.length;
            }
        }
    });
    const numbersSorted = numbersInLine.sort((a, b) => a.index - b.index);
    const firstDigit = numbersSorted.at(0)?.value;
    const lastDigit = numbersSorted.at(-1)?.value;
    return Number(`${firstDigit}${lastDigit || firstDigit}`);
};

const question2 = () => {
    const inputSplitedToLine = input.split(/\r?\n/);
    const result = inputSplitedToLine.reduce((acc, line) => {
        const numberInLine = findNumberInLine(line);
        return (acc += numberInLine);
    }, 0);

    console.log(result);
};

console.log('--- Day 1 - Question 1 ---');
question1();
console.log('--- Day 1 - Question 2 ---');
question2();
