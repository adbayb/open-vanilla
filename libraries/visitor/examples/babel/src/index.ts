import { visit } from "@open-vanilla/visitor";
import type {
	ImportDeclaration,
	JSXOpeningElement,
	TSType,
} from "@babel/types";
import { parse } from "@babel/parser";

const CODE = `import { ChakraProvider, Button } from "@chakra-ui/react";

const App = () => {
  return (
    <ChakraProvider>
      <Button>Click on me!</Button>
    </ChakraProvider>
  );
};`;

const main = () => {
	const AST = parse(CODE, {
		plugins: ["typescript", "jsx"],
		sourceType: "module",
	});

	visit<{
		ImportDeclaration: ImportDeclaration;
		JSXOpeningElement: JSXOpeningElement;
		TSType: TSType;
	}>(AST, {
		ImportDeclaration(node) {
			console.log("ImportDeclaration", node);
		},
		JSXOpeningElement(node) {
			console.log("JSXOpeningElement", node);
		},
		TSType(node) {
			console.log("TSType", node);
		},
	});
};

main();
