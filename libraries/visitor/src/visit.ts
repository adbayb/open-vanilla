type Visit<Node> = (node: Node) => void;

type BaseNode = { type: string };

export const visit = <Nodes extends Record<string, BaseNode>>(
	node: Nodes[string],
	callbacks: {
		[Key in keyof Nodes]?:
			| Visit<Nodes[Key]>
			| { enter?: Visit<Nodes[Key]>; exit?: Visit<Nodes[Key]> };
	},
	// eslint-disable-next-line sonarjs/cognitive-complexity, sonarjs/cyclomatic-complexity
) => {
	const callback = callbacks[node.type];

	if (isNode(node)) {
		if (typeof callback === "function") {
			// eslint-disable-next-line n/callback-return
			callback(node);
		}

		if (isHashMap(callback) && typeof callback.enter === "function") {
			callback.enter(node);
		}
	}

	for (const key of Object.keys(node)) {
		const child = node[key as keyof typeof node] as
			| (Nodes[string] | null | undefined)[]
			| Nodes[string]
			| null
			| undefined;

		if (Array.isArray(child)) {
			for (const item of child) {
				if (isHashMap(item)) visit(item, callbacks);
			}

			continue;
		}

		if (isHashMap(child)) {
			visit(child, callbacks);
		}
	}

	if (
		isNode(node) &&
		isHashMap(callback) &&
		typeof callback.exit === "function"
	) {
		callback.exit(node);
	}
};

const isNode = (value: unknown): value is Node => {
	return isHashMap(value) && "type" in value;
};

const isHashMap = (value: unknown): value is Record<string, unknown> => {
	return value !== null && typeof value === "object";
};
