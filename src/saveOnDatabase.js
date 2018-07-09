/* Home doc */
/**
 * @file Save data to database.
 */

const { Scraping_results } = require('./scraping_results-model');
const { logger } = require('./config-log4js');

/**
 * Store on database result of scraping website
 * @param {string} hrefValue - url scraped 
 * @param {string} listOfWords - data scraped from url
 */
function saveOnDatabase(hrefValue, listOfWords) {
	// prepare data
	const dataToStore = Scraping_results.build({
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
