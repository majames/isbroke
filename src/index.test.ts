import {
  cleanSyntaxTree
} from './index';

const ast = {
  kind: 0,
  getChildren() {
    return [
      {kind: 2, getChildren: () => []},
      {kind: 1, getChildren: () => []}
    ]
  }
};

const expectedAst = {
  kind: 0,
  children: [
    {kind: 1, children: []},
    {kind: 2, children: []}
  ]
}

describe('cleanSyntaxTree', () => {
  it('sorts children by kind', () => {
    expect(cleanSyntaxTree(ast as any)).toEqual(expectedAst);
  });

  describe('Node', () => {
    // TODO ensure it handles generic nodes correctly
  });

  describe('VariableDeclaration node', () => {
    // TODO ensure important variable declaration attributes are retained
    it('preserves the variable "name"', () => {
    });

    it('preserves the variable "type" (if present)', () => {
    });
  });
});