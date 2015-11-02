# alex-vscode

[![NPM version](https://img.shields.io/npm/v/alex-vscode.svg)](https://www.npmjs.com/package/alex-vscode)
[![Build Status](https://travis-ci.org/shinnn/alex-vscode.svg?branch=master)](https://travis-ci.org/shinnn/alex-vscode)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/alex-vscode.svg)](https://coveralls.io/github/shinnn/alex-vscode)
[![Dependency Status](https://david-dm.org/shinnn/alex-vscode.svg)](https://david-dm.org/shinnn/alex-vscode)
[![devDependency Status](https://david-dm.org/shinnn/alex-vscode/dev-status.svg)](https://david-dm.org/shinnn/alex-vscode#info=devDependencies)

[alex](http://alexjs.com/) wrapper to easily integrate with [Visual Studio Code](https://code.visualstudio.com/)

```javascript
const alexVSCode = require('alex-vscode');
const {TextDocuments, createConnection} = require('vscode-languageserver');

const connection = createConnection(process.stdin, process.stdout);
const documents = new TextDocuments();

documents.onDidChangeContent(event => {
  event.document.getText(); //=> 'He is a video game maniac.'
  event.document.uri; //=> 'file:///Users/user/foo.txt'

  alexVSCode({event.document});
  /* =>
    [
      {
        message: '`He` may be insensitive, use `They`, `It` instead',
        range: {
          start: {
            character: 0,
            line: 0
          },
          end: {
            character: 2,
            line: 0
          }
        },
        severity: 2
      },
      {
        message: '`maniac` may be insensitive, use `fanatic`, `zealot`, `enthusiast` instead',
        range: {
          end: {
            character: 25,
            line: 0
          },
          start: {
            character: 19,
            line: 0
          }
        },
        severity: 1
      }
    ]
  */
});

documents.listen(connection);
connection.listen();
```

## Installation

[Use npm.](https://docs.npmjs.com/cli/install)

```
npm install alex-vscode
```

## API

```javascript
const alexVSCode = require('alex-vscode');
```

### alexVSCode(*textDocument*)

*textDocument*: `Object` ([TextDocument](https://code.visualstudio.com/docs/extensionAPI/vscode-api#TextDocument) instance)  
Return: `Array` ([VS Code](https://github.com/microsoft/vscode) [Diagnostic](https://github.com/Microsoft/vscode-extension-vscode/blob/0.10.6/vscode.d.ts#L2220)s)

It checks a given document with [alex](https://github.com/wooorm/alex) and returns warnings as an array of [Visual Studio Code](https://code.visualstudio.com/docs/extensionAPI/vscode-api) compatible [diagnostic](https://code.visualstudio.com/docs/extensionAPI/vscode-api#Diagnostic) objects.

When the document is a [markdown](https://daringfireball.net/projects/markdown/syntax) file, it [parses the text as markdown](https://github.com/wooorm/alex#alexmarkdownvalue).

```javascript
document.getText(); //=> '```\nHe is a video game maniac.\n```\n'
document.uri; //=> 'file:///Users/user/foo.markdown'

alexVSCode(document); //=> []
```

## License

Copyright (c) 2015 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT License](./LICENSE).
