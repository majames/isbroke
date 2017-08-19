"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var typescript_1 = require("typescript");
;
var getPropertyNameAndType = function (node) {
    switch (node.kind) {
        case typescript_1.SyntaxKind.PropertySignature:
            var propSig = node;
            return {
                name: propSig.name.text || '',
                type: propSig.type ? typescript_1.SyntaxKind[propSig.type.kind] : ''
            };
        case typescript_1.SyntaxKind.IndexSignature:
            var indexSig = node;
            var firstParam = indexSig.parameters[0];
            return {
                name: firstParam.type ? typescript_1.SyntaxKind[firstParam.type.kind] : '',
                type: indexSig.type ? typescript_1.SyntaxKind[indexSig.type.kind] : ''
            };
    }
    return;
};
var checkNode = function (node) {
    switch (node.kind) {
        case typescript_1.SyntaxKind.InterfaceDeclaration:
            var properties = node
                .members
                .map(getPropertyNameAndType)
                .filter(function (prop) { return prop !== undefined; });
            properties.forEach(function (_a) {
                var name = _a.name, type = _a.type;
                return console.log(name + ": " + type);
            });
            break;
    }
    typescript_1.forEachChild(node, checkNode);
};
var getPublicAPI = function (file) {
    checkNode(file);
};
var fileName = './example/example.d.ts';
var file = typescript_1.createSourceFile(fileName, fs_1.readFileSync(fileName).toString(), typescript_1.ScriptTarget.ES2015, true);
getPublicAPI(file);
//# sourceMappingURL=index.js.map