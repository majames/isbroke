import {readFileSync} from "fs";
import {
  ScriptTarget,

  createSourceFile,
  forEachChild,

  SourceFile,
  Node,
  SyntaxKind,

  InterfaceDeclaration,
  PropertySignature,
  IndexSignatureDeclaration,
  Identifier
} from "typescript";

// TODO get all exported types from declaration files
// construct syntax tree
// compare syntax tree between "latest" and local files

interface Property {
  name: string;
  type: string;
};

const getPropertyNameAndType = (node: PropertySignature | IndexSignatureDeclaration): Property | undefined => {
  switch (node.kind) {
    case SyntaxKind.PropertySignature:
      const propSig = node as PropertySignature;

      return {
        name: (propSig.name as Identifier).text || '',
        type: propSig.type ? SyntaxKind[propSig.type.kind] : ''
      };
    case SyntaxKind.IndexSignature:
      const indexSig = node as IndexSignatureDeclaration;
      const [firstParam] = indexSig.parameters; 
      return {
        name: firstParam.type ? SyntaxKind[firstParam.type.kind] : '',
        type: indexSig.type ? SyntaxKind[indexSig.type.kind] : ''
      };
  }

  return;
};

const checkNode = (node: Node) => {
  switch(node.kind) {
    case SyntaxKind.InterfaceDeclaration:
      const properties = (node as InterfaceDeclaration)
        .members
        .map(getPropertyNameAndType)
        .filter(prop => prop !== undefined) as Property[];
        
      properties.forEach(({name, type}) => console.log(`${name}: ${type}`));
      break;
  }

  forEachChild(node, checkNode);
};

const getPublicAPI = (file: SourceFile) => {
  checkNode(file);
};

const fileName = './example/example.d.ts';
const file = createSourceFile(fileName, readFileSync(fileName).toString(), ScriptTarget.ES2015, true);

getPublicAPI(file);