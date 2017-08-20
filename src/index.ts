import {
  SourceFile,
  SyntaxKind,

  Node,
  VariableDeclaration
} from "typescript";

export interface CleanedNode {
  kind: number;
  children: Array<any>;
}

export const cleanSyntaxTree = (file: SourceFile) => {
  return cleanNode(file);
};

const cleanNode = (node: Node): CleanedNode => {
  const {VariableDeclaration} = SyntaxKind;
  const {kind} = node;


  switch(kind) {
    case VariableDeclaration:
      return cleanVariableDeclaration(node as VariableDeclaration);
    default:
      return cleanGenericNode(node);
  }
};

const cleanVariableDeclaration = (node: VariableDeclaration) => {
  return {name: node.name, type: node.type, ...cleanGenericNode(node)};
};

const cleanGenericNode = (node: Node) => {
  const cleanedChildren = node
    .getChildren()
    .sort((x, y) => x.kind < y.kind ? -1 : 1)
    .map(cleanNode);

  return {
     kind: node.kind, 
     children: cleanedChildren
  };
};

