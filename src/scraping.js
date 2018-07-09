/* Home doc */
/**
 * @file Retrieve data, process it and then send to database.
 * @see {@link src/scraping}
 */

/**
 * @namespace src/scraping
 * @description Functions for scrap and process data
 */


const { parseText, arrayOfWords } = require('./utils');
const { saveOnDatabase } = require('./saveOnDatabase');
const { logger } = require('./config-log4js');

const rp = require('request-promise');
const cheerio = require('cheerio');

/**
 * Request data and then send it to process
 * @param {string} targetWebsite - a valid URL
 * @memberOf src/scraping
 */
function scrapingWebsiteAndSaveDataOnDatabase(targetWebsite) {
	retrieveDataFromTargetWebsite(targetWebsite)
		.then((response) => {
			if (response.status === 200) {
				// send response for process it
				scrapingResponse(response,saveOnDatabase);
			}
		})
		.catch((err) => {
			logger.error('scrapingWebsiteAndSaveDataOnDatabase: ', err.message);
		});
}

/**
 * Execute request and return a custom formed response
 * @param {string} targetURL - a valid URL
 * @returns {Promise} Return an object with custom response
 * @memberOf src/scraping
 */
function retrieveDataFromTargetWebsite(targetURL) {
	return Promise.resolve().then(() => {
		return rp({ uri: targetURL, resolveWithFullResponse: true })
			.then((res) => {
				// prepare custom response
				let response = {
					href: res.request.uri.href,
					status: res.statusCode,
					body: res.body
				};
				return response;
			});
	});
}

/**
 * Process custom response and then, send it to callback
 * @param {object} response
 * @param {string} response.body Response from request
 * @param {string} response.href URL target of scraping
 * @param {function} callback
 * @memberOf src/scraping
 */
function scrapingResponse(response, cb) {
	const $ = cheerio.load(response.body);
	const text = $('#mw-content-text').children('.mw-parser-output').children('p').text();
	const textParsed = parseText(text);
	const words = arrayOfWords(textParsed);
	const listOfWords = JSON.stringify(words);

	// send processed response to callback (target url of scraping, data obtained from scraping)
	cb(response.href,listOfWords);
}

module.exports = {
	scrapingWebsiteAndSaveDataOnDatabase, 
	retrieveDataFromTargetWebsite,
	scrapingResponse
};
