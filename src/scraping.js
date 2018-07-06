const { parseText, arrayOfWords } = require('./utils');
const { Scraping_results } = require('./scraping_results-model');

const rp = require('request-promise');
const cheerio = require('cheerio');

/**
 * Request data and then send it to process
 * @param {string} targetWebsite - a valid URL
 */
function scrapingWebsiteAndSaveDataOnDatabase(targetWebsite) {
	retrieveDataFromTargetWebsite(targetWebsite)
		.then((response) => {
			if (response.status === 200) {
				// send response for process it
				scrapingResponse(response);
			}
		})
		.catch((err) => {
			console.error(err); // eslint-disable-line no-console
		});
}

/**
 * Execute request and return a custom formed response
 * @param {string} targetURL - a valid URL
 * @returns {Promise} Return custom response
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
 * Process custom response and then, send it to store
 * @param {object} response 
 */
function scrapingResponse(response) {
	const $ = cheerio.load(response.body);
	const text = $('#mw-content-text').children('.mw-parser-output').children('p').text();
	const textParsed = parseText(text);
	const words = arrayOfWords(textParsed);
	const listOfWords = JSON.stringify(words);

	// send processed response to store it (target url of scraping, data obtained from scraping)
	saveOnDatabase(response.href,listOfWords);
}

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
			console.log('Data successfully inserted!'); // eslint-disable-line no-console
		}).catch(err => {
			console.error('Error inserting record:', err); // eslint-disable-line no-console
		});
}

module.exports = {
	scrapingWebsiteAndSaveDataOnDatabase, 
	retrieveDataFromTargetWebsite,
	scrapingResponse
};
