import { describe, expect, test } from "vitest";

import { Result } from "./Result";

describe("Result", () => {
	test("should create successful value", () => {
		const output = Result.success("Successful");

		expect(output.type).toBe("success");
		expect(output.value).toBe("Successful");
	});

	test("should create failure value", () => {
		const output: Result<"Success", "Failure"> = Result.failure("Failure");

		expect(output.type).toBe("failure");
		expect(output.value).toBe("Failure");
	});

	test("should unwrap value", () => {
		const output = Result.success("Successful").unwrap();

		expect(output).toBe("Successful");

		expect(() => {
			Result.failure("Failure").unwrap();
		}).toThrow("Failure");
	});

	test("should match value", () => {
		const matcher = <ResultInput extends Result<unknown, unknown>>(
			result: ResultInput,
		) => {
			return result.match({
				failure(input) {
					return input;
				},
				success(input) {
					return input;
				},
			});
		};

		expect(matcher(Result.success("Successful"))).toStrictEqual({
			type: "success",
			value: "Successful",
		});
		expect(matcher(Result.failure("Failure"))).toStrictEqual({
			type: "failure",
			value: "Failure",
		});
	});
});
