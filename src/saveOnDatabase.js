/* Home doc */
/**
 * @file Save data to database.
 * @see {@link src/saveOnDatabase}
 */


/**
 * @namespace src/saveOnDatabase
 * @description Functions for save data on database
 */

const { scrapedDataModel } = require('./scrapedDataModel');
const { logger } = require('./config-log4js');

/**
 * Store on database result of scraping website
 * @param {string} hrefValue - url scraped 
 * @param {string} listOfWords - data scraped from url
 * @memberOf src/saveOnDatabase
 */
function saveOnDatabase(hrefValue, listOfWords) {
	// prepare data
	const dataToStore = scrapedDataModel.build({
		href: hrefValue,
		results: listOfWords
	});

	// insert data on database
	dataToStore.save().
		then(() => {
			logger.debug('Data successfully saved in the database');
		}).catch(err => {
			logger.error('Error saving data in the database: ', err.message);
		});
}

module.exports = { saveOnDatabase };
