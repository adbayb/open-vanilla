type ResultType = "failure" | "success";

/**
 * TypeScript's implementation for the Result pattern inspired by the [Rust](https://doc.rust-lang.org/std/result/) and [Swift](https://developer.apple.com/documentation/swift/result) primitive.
 * The Result pattern is also known as [Either pattern](https://www.thoughtworks.com/insights/blog/either-data-type-alternative-throwing-exceptions) in other programming languages (functional ones).
 *
 * In contrast to traditional exception handling, the Result pattern:
 * - Makes the control flow and error handling more explicit (the developer has to handle both scenarios (failure and success)).
 * - Add less performance overhead as returning a value is generally faster than [throwing an exception](https://dev.to/ephilips/better-error-handling-in-c-with-result-types-4aan).
 */
export class Result<
	SuccessValue,
	FailureValue,
	Type extends ResultType = ResultType,
> {
	public type: Type;

	public payload: FailureValue | SuccessValue;

	private constructor(
		type: ResultType,
		payload: FailureValue | SuccessValue,
	) {
		this.type = type as typeof this.type;
		this.payload = payload;
	}

	/**
	 * A success, storing a success value.
	 * @param input - The success value to store.
	 * @returns Result instance.
	 * @example
	 * const output = Result.success({});
	 */
	public static success<const Input>(input: Input) {
		return new Result("success", input) as Result<Input, never, "success">;
	}

	/**
	 * A failure, storing a failure value.
	 * @param input - The failure value to store.
	 * @returns Result instance.
	 * @example
	 * const output = Result.failure("Must be...");
	 */
	public static failure<const Input>(input: Input) {
		return new Result("failure", input) as Result<never, Input, "failure">;
	}

	/**
	 * Convert a `Result` instance to a throwable expression.
	 * @returns Returns the success value.
	 * @throws Throws an exception in case of failure.
	 * @example
	 * const result = Result.success("hello");
	 * console.log(`Value = ${result.unwrap()}`);
	 */
	public unwrap() {
		if (this.type === "failure") {
			throw this.payload instanceof Error
				? this.payload
				: new Error(
						typeof this.payload === "string"
							? this.payload
							: JSON.stringify(this.payload),
					);
		}

		return this.payload as SuccessValue;
	}

	/**
	 * Map any success and failure value using the given transformation.
	 * @param input - Transformation cases.
	 * @param input.failure - The failure transformation case matched in case of a failure-like result.
	 * @param input.success - The success transformation case matched in case of a success-like result.
	 * @returns The matched transformation output.
	 * @example
	 * const output = anyResultInstance.match({
	 * 	failure() {
	 * 		return "Failed";
	 * 	},
	 * 	success() {
	 * 		return "Success";
	 * 	}
	 * })
	 */
	public match<const FailureOutput, const SuccessOutput>(input: {
		failure: (
			input: Pick<
				Result<never, FailureValue, "failure">,
				"payload" | "type"
			>,
		) => FailureOutput;
		success: (
			input: Pick<
				Result<SuccessValue, never, "success">,
				"payload" | "type"
			>,
		) => SuccessOutput;
	}) {
		return this.type === "failure"
			? input.failure({
					payload: this.payload as FailureValue,
					type: this.type,
				})
			: input.success({
					payload: this.payload as SuccessValue,
					type: this.type,
				});
	}
}
