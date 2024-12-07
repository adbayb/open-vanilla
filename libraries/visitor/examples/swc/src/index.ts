import { parse } from "@swc/core";
import type { ImportDeclaration, JSXOpeningElement, TsType } from "@swc/core";
import { visit } from "@open-vanilla/visitor";

const CODE = `import { ChakraProvider, Button } from "@chakra-ui/react";

const App = () => {
  return (
    <ChakraProvider>
      <Button>Click on me!</Button>
    </ChakraProvider>
  );
};`;

const main = async () => {
	const AST = await parse(CODE, {
		syntax: "typescript",
		tsx: true,
	});

	visit<{
		ImportDeclaration: ImportDeclaration;
		JSXOpeningElement: JSXOpeningElement;
		TsType: TsType;
	}>(AST, {
		ImportDeclaration(node) {
			console.log("ImportDeclaration", node);
		},
		JSXOpeningElement(node) {
			console.log("JSXOpeningElement", node);
		},
		TsType(node) {
			console.log("TsType", node);
		},
	});
};

void main();
