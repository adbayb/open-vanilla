import { describe, expect, test } from "vitest";

import { failure, match, success, unwrap } from "./Result";
import type { Result } from "./Result";

const matcher = <ResultInput extends Result<unknown>>(result: ResultInput) => {
	return match(result, {
		failure(input) {
			return input;
		},
		success(input) {
			return input;
		},
	});
};

describe("Result", () => {
	test("should create successful value", () => {
		const output = success("Successful");

		expect(output.payload).toBe("Successful");
	});

	test("should create failure value", () => {
		const output = failure(new Error("Failure"));

		expect(output.payload).toStrictEqual(new Error("Failure"));
	});

	test("should unwrap value", () => {
		const output = unwrap(success("Successful"));

		expect(output).toBe("Successful");

		expect(() => {
			unwrap(failure(new Error("Failure")));
		}).toThrow("Failure");
	});

	test("should match value", () => {
		expect(matcher(success("Successful"))).toBe("Successful");
		expect(matcher(failure(new Error("Failure")))).toStrictEqual(
			new Error("Failure"),
		);
	});
});
