<br>
<div align="center">
    <h1>@open-vanilla/visitor</h1>
    <strong>A vanilla module to visit any hashmap-like structure (AST, custom tree, ...) and apply some algorithms</strong>
</div>
<br>
<br>

## ✨ Features

- Tiny module with zero dependencies (less than 300B 🚀)
- Apply the visitor design pattern in a functional way with ease
- Data structure agnostic (a custom tree, a parser-specific abstract syntax tree, ...).  
  Any hashmap-like structure can be visited as long as each node exposes a `type` field

<br>

## 🚀 Quickstart

1️⃣ Install the library:

```bash
# Npm
npm install @open-vanilla/visitor
# Pnpm
pnpm add @open-vanilla/visitor
# Yarn
yarn add @open-vanilla/visitor
```

2️⃣ Once you're done, you can play with the API:

```ts
import { visit } from "@open-vanilla/visitor";

visit<Nodes>(
	{
		type: "Root",
		value: {
			type: "Array",
			value: [
				{
					type: "Variable",
					value: "Hello",
				},
			],
		},
	},
	{
		Array(node) {
			console.log("Array node: ", node);
		},
		Root(node) {
			console.log("Root node: ", node);
		},
		Variable(node) {
			console.log("Variable node: ", node);
		},
	},
);

type Nodes = {
	Array: Node<"Array", Nodes["Variable"][]>;
	Root: Node<"Root", Nodes["Array"][]>;
	Variable: Node<"Variable", string>;
};

type Node<Type, Value> = {
	type: Type;
	value: Value;
};
```

_You can check the [examples](https://github.com/adbayb/open-vanilla/tree/main/libraries/visitor/examples) folder for different hashmap structure processing (including parser-specific abstract syntax trees)._

<br>

## ✍️ Contribution

We're open to new contributions, you can find more details [here](https://github.com/adbayb/open-vanilla/blob/main/CONTRIBUTING.md).

<br>

## 📖 License

[MIT](https://github.com/adbayb/open-vanilla/blob/main/LICENSE "License MIT")

<br>
