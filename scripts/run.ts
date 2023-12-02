import { execSync } from "child_process";

const arg = process.argv[2];

if (!arg) {
	console.log(execSync(`ts-node src/index.ts`).toString());
} else {
	console.log(execSync(`ts-node src/day${arg}/index.ts`).toString());
}
