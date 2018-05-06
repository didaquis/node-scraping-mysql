const { parseText, arrayOfWords } = require('./utils');

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
	const target = response.href;
	console.log(target);
	const $ = cheerio.load(response.body);
	//console.log($('#firstHeading').text());
	//console.log($('#mw-content-text').children('.mw-parser-output').children('p').text());
	const text = $('#mw-content-text').children('.mw-parser-output').children('p').text();
	const textParsed = parseText(text);
	console.log( arrayOfWords(textParsed) );
}

module.exports = {
	scrapingWebsiteAndSaveDataOnDatabase, 
	retrieveDataFromTargetWebsite,
	scrapingResponse
};
