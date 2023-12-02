// Day 2
// if in a bag there are only 12 red cubes, 13 green cubes, and 14 blue cubes:
// a possible combination of the subset of the cubes in the bag can be demonstrate as
// iteration 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
// OR
// iteration 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue

// Question 1
// given a set of iterations
// if the bag had been loaded with only 12 red cubes, 13 green cubes, and 14 blue cubes.
// what is the sum of the IDs (iteration numbers) of possible games?

// on each iteration: 0 <= number of subsets
// on each iteration: 0 <= count of each color >= number of that color in the bag
// on each iteration:
// find the iteration number
// find the subsets
// check if all subsets are possible
// add all iteration numbers of possible games

// Question 2
// in each game find the maximum number of each color in the subsets
// multiply the numbers
// add up all results

import * as fs from "fs";

type ISubset = {
	red: number;
	blue: number;
	green: number;
};

const convertSubsetToObject = (subsetAsString: string) => {
	return subsetAsString.split(",").reduce(
		(acc, color) => {
			const numberColorPair = color.trim().split(" ");
			return {
				...acc,
				[numberColorPair[1]]: Number(numberColorPair[0]),
			};
		},
		{ red: 0, blue: 0, green: 0 } as ISubset
	);
};

const extractLineData = (line: string) => {
	const iterationNumber = line.match(/\d+(?=:)/)?.[0];
	const subsetsInLine = line.split(":")[1].split(";");
	const subsets = subsetsInLine.reduce((acc, subset) => {
		acc.push(convertSubsetToObject(subset));
		return acc;
	}, [] as ISubset[]);
	return {
		number: Number(iterationNumber),
		subsets,
	};
};

const workingDir = process.cwd();

const input = fs.readFileSync(workingDir + "/src/day2/input.txt").toString();

const inputSplittedToLine = input.split(/\r?\n/);

const question1 = () => {
	const validationData = {
		red: 12,
		blue: 14,
		green: 13,
	};

	const sumOfAllValidGames = inputSplittedToLine.reduce((acc, line) => {
		const lineData = extractLineData(line);

		const isValid = lineData.subsets.every(
			(subset) =>
				subset.blue <= validationData.blue &&
				subset.green <= validationData.green &&
				subset.red <= validationData.red
		);

		return isValid ? (acc += lineData.number) : acc;
	}, 0);

	console.log(sumOfAllValidGames);
};
const question2 = () => {
	const sumOfAllMultipliedMaxNumbers = inputSplittedToLine.reduce(
		(acc, line) => {
			const lineData = extractLineData(line);
			const maxCountOfColors = lineData.subsets.reduce(
				(acc, item) => {
					return {
						blue: item.blue > acc.blue ? item.blue : acc.blue,
						green: item.green > acc.green ? item.green : acc.green,
						red: item.red > acc.red ? item.red : acc.red,
					};
				},
				{ red: 1, blue: 1, green: 1 } as ISubset
			);

			const numberOfColorsMultiplied = Object.values(
				maxCountOfColors
			).reduce((acc, value) => {
				return (acc *= value);
			}, 1);

			return (acc += numberOfColorsMultiplied);
		},
		0
	);

	console.log(sumOfAllMultipliedMaxNumbers);
};

console.log("--- Day 2 - Question 1 ---");
question1();
console.log("--- Day 2 - Question 2 ---");
question2();
