const { parseText, arrayOfWords } = require('./utils');
const { Scraping_results } = require('./config-sequelize');

const rp = require('request-promise');
const cheerio = require('cheerio');

function scrapingWebsiteAndSaveDataOnDatabase(targetWebsite) {
	retrieveDataFromTargetWebsite(targetWebsite)
		.then((response) => {
			if (response.status === 200) {
				scrapingResponse(response);
			}
		})
		.catch((err) => {
			console.error(err);
		});
}

function retrieveDataFromTargetWebsite(targetURL) {
	return Promise.resolve().then(() => {
		return rp({ uri: targetURL, resolveWithFullResponse: true })
			.then((res) => {
				let response = {
					href: res.request.uri.href,
					status: res.statusCode,
					body: res.body
				};
				return response;
			});
	});
}

function scrapingResponse(response) {
	const $ = cheerio.load(response.body);
	const text = $('#mw-content-text').children('.mw-parser-output').children('p').text();
	const textParsed = parseText(text);
	const words = arrayOfWords(textParsed);
	const listOfWords = JSON.stringify(words);

	saveOnDatabase(response.href,listOfWords);
}

function saveOnDatabase(hrefValue, listOfWords) {
	// prepare data
	const dataToStore = Scraping_results.build({
		href: hrefValue,
		results: listOfWords
	});

	// insert data on database
	dataToStore.save().
		then(() => {
			console.log('Data successfully inserted!');
		}).catch(err => {
			console.error('Error in Inserting Record:', err);
		});
}

module.exports = {
	scrapingWebsiteAndSaveDataOnDatabase, 
	retrieveDataFromTargetWebsite,
	scrapingResponse
};
