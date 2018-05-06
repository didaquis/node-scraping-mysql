const { parseText, arrayOfWords } = require('./../src/utils');

const expect = require('chai').expect;
const assertChai = require('chai').assert;

describe('Testing utils', () => {

	it('parseText function should remove space and non-alphanumeric characters from text', () => {
		const text = 'The [] cake - is ... a / lie ?';
		const result = parseText(text);

		expect(result).to.be.an('string');

		expect(result).not.to.include('[');
		expect(result).not.to.include(']');
		expect(result).not.to.include('-');
		expect(result).not.to.include('.');
		expect(result).not.to.include('/');
		expect(result).not.to.include('?');

		expect(result).to.include('t');
		expect(result).to.include('h');
		expect(result).to.include('e');
		expect(result).to.include(' ');
		expect(result).to.include('c');
		expect(result).to.include('a');
		expect(result).to.include('k');
		expect(result).to.include('e');

		assertChai.strictEqual(parseText('FOO'), 'foo');
	});

	it('arrayOfWords function should create an array of words from string', () => {
		const text = 'The cake is a lie';
		const result = arrayOfWords(text);

		expect(result).to.be.an('array');

		assertChai.lengthOf(result, 5);

		expect(result).to.include('The');
		expect(result).to.include('cake');
		expect(result).to.include('is');
		expect(result).to.include('a');
		expect(result).to.include('lie');
	});

});