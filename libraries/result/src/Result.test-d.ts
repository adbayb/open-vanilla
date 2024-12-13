import { describe, expectTypeOf, test } from "vitest";

import { failure, match, success, unwrap } from "./Result";
import type { Result } from "./Result";

const successOutput = { data: "success" } as const;
const failureOutput = new ReferenceError("Failure");

const getResultWithImplicitOutput = (simulatedError = false) => {
	if (simulatedError) {
		return failure(failureOutput);
	}

	return success(successOutput);
};

const getResultWithExplicitOutput = (
	simulatedError = false,
): Result<typeof successOutput, typeof failureOutput> => {
	return getResultWithImplicitOutput(simulatedError);
};

describe("Result", () => {
	test("should type check `success` and `failure` methods given strict check", () => {
		expectTypeOf(success(successOutput)).toEqualTypeOf<
			Result<typeof successOutput, never>
		>();

		expectTypeOf(failure(failureOutput)).toEqualTypeOf<
			Result<never, typeof failureOutput>
		>();
	});

	test("should type check `success` and `failure` methods given loose check", () => {
		expectTypeOf(success(successOutput)).toMatchTypeOf<
			Result<typeof successOutput, typeof failureOutput>
		>();

		expectTypeOf(failure(failureOutput)).toMatchTypeOf<
			Result<typeof successOutput, typeof failureOutput>
		>();
	});

	test("should type check `payload` attribute", () => {
		expectTypeOf(success(successOutput).payload).toEqualTypeOf<
			typeof successOutput
		>();

		expectTypeOf(failure(failureOutput).payload).toEqualTypeOf<
			typeof failureOutput
		>();

		const resultWithImplicitOutput = getResultWithImplicitOutput();

		// eslint-disable-next-line vitest/no-conditional-in-test
		if (resultWithImplicitOutput.type === "failure") {
			expectTypeOf(resultWithImplicitOutput.payload).toEqualTypeOf<
				typeof failureOutput
			>();
		} else {
			expectTypeOf(resultWithImplicitOutput.payload).toEqualTypeOf<
				typeof successOutput
			>();
		}

		const resultWithExplicitOutput = getResultWithExplicitOutput();

		// eslint-disable-next-line vitest/no-conditional-in-test
		if (resultWithExplicitOutput.type === "failure") {
			expectTypeOf(resultWithExplicitOutput.payload).toEqualTypeOf<
				typeof failureOutput
			>();
		} else {
			expectTypeOf(resultWithExplicitOutput.payload).toEqualTypeOf<
				typeof successOutput
			>();
		}
	});

	test("should type check `match` method", () => {
		expectTypeOf(
			match(success(successOutput), {
				failure(input) {
					return input satisfies never;
				},
				success(input) {
					return input satisfies typeof successOutput;
				},
			}),
		).toEqualTypeOf<typeof successOutput>();

		expectTypeOf(
			match(getResultWithImplicitOutput(), {
				failure(input) {
					return input satisfies typeof failureOutput;
				},
				success(input) {
					return input satisfies typeof successOutput;
				},
			}),
		).toEqualTypeOf<typeof failureOutput | typeof successOutput>();

		expectTypeOf(
			match(getResultWithExplicitOutput(), {
				failure(input) {
					return input satisfies typeof failureOutput;
				},
				success(input) {
					return input satisfies typeof successOutput;
				},
			}),
		).toEqualTypeOf<typeof failureOutput | typeof successOutput>();
	});

	test("should type check `unwrap` method", () => {
		expectTypeOf(unwrap(success(successOutput))).toEqualTypeOf<
			typeof successOutput
		>();

		expectTypeOf(unwrap(getResultWithImplicitOutput())).toEqualTypeOf<
			typeof successOutput
		>();

		expectTypeOf(unwrap(getResultWithExplicitOutput())).toEqualTypeOf<
			typeof successOutput
		>();
	});
});
