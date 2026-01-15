const test = require('node:test');
const assert = require('node:assert/strict');

// eslint-disable-next-line n8n-nodes-base/node-module-relative-import
const { transformFieldsData } = require('../dist/nodes/Twenty/FieldTransformation.js');

test('transformFieldsData: handles pipe-delimited fieldName', () => {
	const out = transformFieldsData([{ fieldName: 'name|simple', fieldType: 'simple', fieldValue: 'Acme' }]);
	assert.deepEqual(out, { name: 'Acme' });
});

test('transformFieldsData: currency amount converts to micros', () => {
	const out = transformFieldsData([
		{
			fieldName: 'annualRecurringRevenue',
			fieldType: 'currency',
			currencyAmount: 12.34,
			currencyCode: 'USD',
		},
	]);

	assert.deepEqual(out, {
		annualRecurringRevenue: {
			amountMicros: 12340000,
			currencyCode: 'USD',
		},
	});
});

test('transformFieldsData: link rejects unevaluated n8n expressions', () => {
	assert.throws(() =>
		transformFieldsData([
			{
				fieldName: 'website',
				fieldType: 'link',
				primaryLinkUrl: "{{ $json['url'] }}",
			},
		]),
	);
});

