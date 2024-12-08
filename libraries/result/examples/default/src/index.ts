import { Result } from "@open-vanilla/result";

const getOutput = (simulatedError = false) => {
	if (simulatedError) {
		return Result.failure("Unable to process the value");
	}

	return Result.success({ value: "hello world" });
};

const output = getOutput();
const simulatedErrorOutput = getOutput(true);

if (output.type === "failure") {
	console.error("Failure case", output.value);
} else {
	console.log("Success case", output.value);
}

if (simulatedErrorOutput.type === "failure") {
	console.error("Failure case", simulatedErrorOutput.value);
} else {
	console.log("Success cas", simulatedErrorOutput.value);
}

const customOutput = output.match({
	failure(input) {
		return {
			hasError: true,
			value: input.value,
		};
	},
	success(input) {
		return {
			hasError: false,
			value: input.value,
		};
	},
});

const customSimulatedErrorOutput = simulatedErrorOutput.match({
	failure(input) {
		return {
			hasError: true,
			value: input.value,
		};
	},
	success(input) {
		return {
			hasError: false,
			value: input.value,
		};
	},
});

console.log(customOutput);
console.log(customSimulatedErrorOutput);

console.log(output.unwrap());

try {
	simulatedErrorOutput.unwrap();
} catch (error) {
	console.error(error);
}
