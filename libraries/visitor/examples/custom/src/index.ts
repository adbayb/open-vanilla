import { visit } from "@open-vanilla/visitor";

const customTree = {
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
};

visit<Nodes>(customTree, {
	Array(node) {
		console.log("Array node:", node);
	},
	Root(node) {
		console.log("Root node:", node);
	},
	Variable(node) {
		console.log("Variable node:", node);
	},
});

type Nodes = {
	Array: Node<"Array", Nodes["Variable"][]>;
	Root: Node<"Root", Nodes["Array"][]>;
	Variable: Node<"Variable", string>;
};

type Node<Type, Value> = {
	type: Type;
	value: Value;
};
