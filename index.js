/*!
 * alex-vscode | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/alex-vscode
*/
'use strict';

const alex = require('alex');
const isMdPath = require('is-md');
const vFileMessagesToVSCodeDiagnostics = require('vfile-messages-to-vscode-diagnostics');

function isTextDocument(textDocument) {
  if (
    textDocument !== null &&
    typeof textDocument === 'object' &&
    typeof textDocument.getText === 'function'
  ) {
    return true;
  }

  return false;
}

function isMarkdown(textDocument) {
  if (textDocument.languageId) {
    return textDocument.languageId === 'markdown';
  }

  return isMdPath(String(textDocument.uri));
}

module.exports = function alexVSCode(textDocument) {
  if (!isTextDocument(textDocument)) {
    throw new TypeError(
      String(textDocument) +
      ' is not a textDocument. Expected a VS Code\'s textDocument.'
    );
  }

  const messages = (isMarkdown(textDocument) ? alex : alex.text)(textDocument.getText()).messages;
  return vFileMessagesToVSCodeDiagnostics(messages);
};
