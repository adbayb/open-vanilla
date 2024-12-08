import { describe, expectTypeOf, test } from "vitest";

import { Result } from "./Result";

const successOutput = { data: "success" } as const;
const failureOutput = { data: "failure" } as const;

describe("Result", () => {
	test("should type check `success` and `failure` methods given strict check", () => {
		expectTypeOf(Result.success(successOutput)).toEqualTypeOf<
			Result<typeof successOutput, never, "success">
		>();

		expectTypeOf(Result.failure(failureOutput)).toEqualTypeOf<
			Result<never, typeof failureOutput, "failure">
		>();
	});

	test("should type check `success` and `failure` methods given loose check", () => {
		expectTypeOf(Result.success(successOutput)).toMatchTypeOf<
			Result<typeof successOutput, never>
		>();

		expectTypeOf(Result.failure(failureOutput)).toMatchTypeOf<
			Result<never, typeof failureOutput>
		>();

		expectTypeOf(Result.success(successOutput)).toMatchTypeOf<
			Result<typeof successOutput, typeof failureOutput>
		>();

		expectTypeOf(Result.failure(failureOutput)).toMatchTypeOf<
			Result<typeof successOutput, typeof failureOutput>
		>();
	});

	test("should type check `match` method", () => {
		expectTypeOf(
			Result.success(successOutput).match({
				failure() {
					return failureOutput;
				},
				success() {
					return successOutput;
				},
			}),
		).toEqualTypeOf<typeof failureOutput | typeof successOutput>();
	});

	test("should type check `unwrap` method", () => {
		expectTypeOf(Result.success(successOutput).unwrap()).toEqualTypeOf<
			typeof successOutput
		>();
	});
});
