<br>
<div align="center">
    <h1>@open-vanilla/result</h1>
    <strong>A vanilla module implementing the Result pattern to make the error handling more explicit</strong>
</div>
<br>
<br>

## ✨ Features

TypeScript's implementation for the Result pattern inspired by the [Rust](https://doc.rust-lang.org/std/result/) and [Swift](https://developer.apple.com/documentation/swift/result) primitive.
The Result pattern is an implementation variant of [Either pattern](https://www.thoughtworks.com/insights/blog/either-data-type-alternative-throwing-exceptions) well-known in some functional programming languages.

In contrast to traditional exception handling, the Result pattern:

- Makes the control flow and error handling more explicit (the developer has to handle both scenarios (failure and success)).
- Add less performance overhead as returning a value is generally faster than [throwing an exception](https://dev.to/ephilips/better-error-handling-in-c-with-result-types-4aan).

<br>

## 🚀 Quickstart

1️⃣ Install the library:

```bash
# Npm
npm install @open-vanilla/result
# Pnpm
pnpm add @open-vanilla/result
# Yarn
yarn add @open-vanilla/result
```

2️⃣ Once you're done, you can play with the API:

```ts
import { success, failure } from "@open-vanilla/result";
import type { Result } from "@open-vanilla/result";

const createPassword = (input: string): Result<string> => {
	if (input.length < 12) {
		return failure(
			new Error("The password must be longer than 12 characters"),
		);
	}

	return success(input);
};

const password = createPassword("hello1234");

if (password.type === "failure") {
	// Password failure case logic.
	console.error("Failure case", password.payload);
} else {
	// Password success case logic.
	console.log("Success case", password.payload);
}
```

_You can check the [examples](https://github.com/adbayb/open-vanilla/tree/main/libraries/result/examples) folder for more use cases._

<br>

## ✍️ Contribution

We're open to new contributions, you can find more details [here](https://github.com/adbayb/open-vanilla/blob/main/CONTRIBUTING.md).

<br>

## 📖 License

[MIT](https://github.com/adbayb/open-vanilla/blob/main/LICENSE "License MIT")

<br>
