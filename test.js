'use strong';

const {DiagnosticSeverity} = require('vscode-languageserver-types');
const alexVSCode = require('.');
const {test} = require('tape');

test('alexVSCode()', t => {
	t.plan(4);

	t.deepEqual(
		alexVSCode({
			getText: () => 'He is a video game maniac.',
			uri: 'file:///Users/shinnn/foo.txt'
		}),
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
				severity: DiagnosticSeverity.Warning
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
				severity: DiagnosticSeverity.Warning
			}
		],
		'should return VS Code diagnostics.'
	);

	t.deepEqual(
		alexVSCode({
			getText: () => '```\nHe is a video game maniac.\n```\n',
			languageId: 'markdown'
		}),
		[],
		'should regard the content as a markdown when the document is a markdown file.'
	);

	t.throws(
		() => alexVSCode([1, 2]),
		/TypeError.*1,2 is not a textDocument\. Expected a VS Code's textDocument\./u,
		'should throw a type error when the argument is not a textDocument.'
	);

	t.throws(
		() => alexVSCode(),
		/TypeError.*undefined is not a textDocument\. Expected a VS Code's textDocument\./u,
		'should throw a type error when it takes no arguments.'
	);
});
