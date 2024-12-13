import type { Either } from "./Either";

/**
 * TypeScript's implementation for the Result pattern inspired by the [Rust](https://doc.rust-lang.org/std/result/) and [Swift](https://developer.apple.com/documentation/swift/result) primitive.
 * The Result pattern is an implementation variant of [Either pattern](https://www.thoughtworks.com/insights/blog/either-data-type-alternative-throwing-exceptions) well-known in some functional programming languages.
 *
 * In contrast to traditional exception handling, the Result pattern:
 * - Makes the control flow and error handling more explicit (the developer has to handle both scenarios (failure and success)).
 * - Add less performance overhead as returning a value is generally faster than [throwing an exception](https://dev.to/ephilips/better-error-handling-in-c-with-result-types-4aan).
 */
export type Result<SuccessValue, FailureValue extends Error = Error> = Either<
	FailureValue,
	SuccessValue
>;

/**
 * A success, storing a success value.
 * @param input - The success value to store.
 * @returns Result instance.
 * @example
 * const output = success({ data: "hello" });
 */
export const success = <Payload>(input: Payload): Result<Payload, never> => {
	return {
		payload: input,
		type: "success",
	};
};

/**
 * A failure, storing a failure value.
 * @param input - The failure value to store (the value must be an Error-like instance).
 * @returns Result instance.
 * @example
 * const output = failure(new Error("Must be..."));
 */
export const failure = <Payload extends Error>(
	input: Payload,
): Result<never, Payload> => {
	return {
		payload: input,
		type: "failure",
	};
};

/**
 * Map any success and failure value using the given transformation.
 * @param input - The `Result` instance.
 * @param mappers - Mapper definition to handle transformation cases.
 * @param mappers.failure - The failure transformation case matched in case of a failure-like result.
 * @param mappers.success - The success transformation case matched in case of a success-like result.
 * @returns The matched transformation output.
 * @example
 * const output = match(anyResultInstance, {
 * 	failure() {
 * 		return "Failed";
 * 	},
 * 	success() {
 * 		return "Success";
 * 	}
 * })
 */
export const match = <
	SuccessPayload,
	FailurePayload extends Error,
	SuccessOutput,
	FailureOutput,
>(
	input: Result<SuccessPayload, FailurePayload>,
	mappers: {
		failure: (input: FailurePayload) => SuccessOutput;
		success: (input: SuccessPayload) => FailureOutput;
	},
) => {
	switch (input.type) {
		case "failure": {
			return mappers.failure(input.payload);
		}
		case "success": {
			return mappers.success(input.payload);
		}
	}
};

/**
 * Convert a `Result` instance to a throwable expression.
 * @param input - The `Result` instance.
 * @returns Returns the success value.
 * @throws Throws an exception in case of failure.
 * @example
 * const value = unwrap(success("hello"));
 */
export const unwrap = <SuccessPayload, FailurePayload extends Error>(
	input: Result<SuccessPayload, FailurePayload>,
) => {
	if (input.type === "failure") {
		throw input.payload;
	}

	return input.payload;
};
