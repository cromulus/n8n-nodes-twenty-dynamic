const test = require('node:test');
const assert = require('node:assert/strict');

test('Twenty node is marked usableAsTool', () => {
	// Built output is what n8n loads, so validate against dist
	// eslint-disable-next-line n8n-nodes-base/node-module-relative-import
	const { Twenty } = require('../dist/nodes/Twenty/Twenty.node.js');

	const node = new Twenty();
	assert.equal(node.description.usableAsTool, true);
});

