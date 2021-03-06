const { parseText, arrayOfWords } = require('./../src/utils');
const { sequelize } = require('../src/config-sequelize');

const CronJob = require('cron').CronJob;
require('dotenv').config();

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

describe('Testing CronJob patterns', () => {
	it('should be valid patterns', () => {
		expect(() => {
			new CronJob('00 */28 * * * *', function () {
			});
		}).not.to.throw();

		expect(() => {
			new CronJob('0 */28 * * * *', function () {
			});
		}).not.to.throw();

		expect(() => {
			new CronJob('0 0,20,40 * * * *', function () {
			});
		}).not.to.throw();

		expect(() => {
			new CronJob('0 0,20,40 0-23 1-31 0-11 0-6', function () {
			});
		}).not.to.throw();
	
		expect(() => {
			new CronJob('00 00 22 * * *', function () {
			});
		}).not.to.throw();

		expect(() => {
			new CronJob('00,10,20,30,40,50 * * * * *', function () {
			});
		}).not.to.throw();
		
		expect(() => {
			new CronJob('00 * * * * *', function () {
			});
		}).not.to.throw();
	});

	it('should be invalid patterns', () => {
		try {
			new CronJob('', function () {
				console.log('this should not be printed');
			});
		} catch (e) {
			expect(e).to.instanceOf(Error);
		}

		try {
			new CronJob('60 60 1-24 0-31 1-12 1-7', function () {
				console.log('this should not be printed');
			});
		} catch (e) {
			expect(e).to.instanceOf(Error);
		}

	});

});

describe('Testing enviroment vars', () => {
	it('DB_HOST var should be defined', () => {
		expect(process.env.DB_HOST).not.to.be.undefined;
		expect(process.env.DB_HOST).not.to.equal('');
	});


	it('DB_PORT var should be defined', () => {
		expect(process.env.DB_PORT).not.to.be.undefined;
		expect(process.env.DB_PORT).not.to.equal('');
	});


	it('DB_DATABASE var should be defined', () => {
		expect(process.env.DB_DATABASE).not.to.be.undefined;
		expect(process.env.DB_DATABASE).not.to.equal('');
	});


	it('DB_USER var should be defined', () => {
		expect(process.env.DB_USER).not.to.be.undefined;
		expect(process.env.DB_USER).not.to.equal('');
	});


	it('DB_PASS var should be defined', () => {
		expect(process.env.DB_PASS).not.to.be.undefined;
		expect(process.env.DB_PASS).not.to.equal('');
	});

});

describe('Testing database connection', () => {
	it('Should connect to database', (done) => {
		const resolvingPromise = new Promise( (resolve) =>{
			sequelize.authenticate()
				.then(() => {
					resolve('Connection with database has been successful');
				})
				.catch( () => {
					resolve('Unable to connect to the database:');
				});
		});

		resolvingPromise.then( (result) => {
			expect(result).to.equal('Connection with database has been successful');
			done();
		}).catch(done);
	});

});
