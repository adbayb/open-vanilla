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
	console.error("Failure case", output.payload);
} else {
	console.log("Success case", output.payload);
}

if (simulatedErrorOutput.type === "failure") {
	console.error("Failure case", simulatedErrorOutput.payload);
} else {
	console.log("Success cas", simulatedErrorOutput.payload);
}

const customOutput = output.match({
	failure(input) {
		return {
			hasError: true,
			value: input.payload,
		};
	},
	success(input) {
		return {
			hasError: false,
			value: input.payload,
		};
	},
});

const customSimulatedErrorOutput = simulatedErrorOutput.match({
	failure(input) {
		return {
			hasError: true,
			value: input.payload,
		};
	},
	success(input) {
		return {
			hasError: false,
			value: input.payload,
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
