const { parseText, arrayOfWords } = require('./../src/utils');

const expect = require('chai').expect;
const assertChai = require('chai').assert;

describe('Testing utils', () => {

	it('parseText function should remove space, remove non-alphanumeric characters and convert to lower case', () => {
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
	});


	it('parseText function should convert to lower case', () => {
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

		assertChai.lengthOf(arrayOfWords(' '), 0);
		expect(arrayOfWords(' ')).to.be.an('array');
	});

	
	it('arrayOfWords function should create an empty array from empty string', () => {
		assertChai.lengthOf(arrayOfWords(' '), 0);
		expect(arrayOfWords(' ')).to.be.an('array');

		assertChai.lengthOf(arrayOfWords(''), 0);
		expect(arrayOfWords('')).to.be.an('array');
	});

});