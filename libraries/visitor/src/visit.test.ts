import { describe, expect, test } from "vitest";

import { visit } from "./visit";

describe("visit", () => {
	test("should visit a single node", () => {
		let actualNode: Nodes["Root"] | undefined = undefined;

		visit<Nodes>(TREE, {
			Root(node) {
				actualNode = node;
			},
		});

		expect(actualNode).toStrictEqual(TREE);
	});

	test("should visit a list of nodes", () => {
		const actualNodes: Nodes["Variable"][] = [];

		visit<Nodes>(TREE, {
			Variable(node) {
				actualNodes.push(node);
			},
		});

		expect(actualNodes).toHaveLength(1);
		expect(actualNodes[0]).toStrictEqual(TREE.value.value[0]);
	});

	test("should enter a node", () => {
		const enterQueue: Node<unknown, unknown>["type"][] = [];

		visit<Nodes>(TREE, {
			Array: {
				enter(node) {
					enterQueue.push(node.type);
				},
			},
			Variable(node) {
				enterQueue.push(node.type);
			},
		});

		expect(enterQueue).toStrictEqual(["Array", "Variable"]);
	});

	test("should exit a node", () => {
		const exitQueue: Node<unknown, unknown>["type"][] = [];

		visit<Nodes>(TREE, {
			Array: {
				exit(node) {
					exitQueue.push(node.type);
				},
			},
			Variable(node) {
				exitQueue.push(node.type);
			},
		});

		expect(exitQueue).toStrictEqual(["Variable", "Array"]);
	});
});

const TREE = {
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
} as const;

type Nodes = {
	Array: Node<"Array", Nodes["Variable"][]>;
	Root: Node<"Root", Nodes["Array"][]>;
	Variable: Node<"Variable", string>;
};

type Node<Type, Value> = {
	type: Type;
	value: Value;
};
