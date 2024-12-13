import { failure, match, success, unwrap } from "@open-vanilla/result";

const getResult = (simulatedError = false) => {
	if (simulatedError) {
		return failure(new Error("Unable to process the value"));
	}

	return success({ value: "hello world" });
};

const output = getResult();
const simulatedErrorOutput = getResult(true);

if (output.type === "failure") {
	console.error("Failure case", output.payload);
} else {
	console.log("Success case", output.payload);
}

if (simulatedErrorOutput.type === "failure") {
	console.error("Failure case", simulatedErrorOutput.payload);
} else {
	console.log("Success case", simulatedErrorOutput.payload);
}

const customOutput = match(output, {
	failure(input) {
		return {
			hasError: true,
			value: input,
		};
	},
	success(input) {
		return {
			hasError: false,
			value: input,
		};
	},
});

const customSimulatedErrorOutput = match(simulatedErrorOutput, {
	failure(input) {
		return {
			hasError: true,
			value: input,
		};
	},
	success(input) {
		return {
			hasError: false,
			value: input,
		};
	},
});

console.log(customOutput);
console.log(customSimulatedErrorOutput);

console.log(unwrap(output));

try {
	unwrap(simulatedErrorOutput);
} catch (error) {
	console.error(error);
}
