const rp = require('request-promise');
const cheerio = require('cheerio');

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
	const $ = cheerio.load(response.body);
	console.log(target);
	console.log('\n');
	//console.log($('#firstHeading').text());
	//console.log($('#mw-content-text').children('.mw-parser-output').children('p').text());
	const text = $('#mw-content-text').children('.mw-parser-output').children('p').text();
	console.log( arrayOfWordsFromParsingText(text) );

}

function arrayOfWordsFromParsingText(text) {
	// Throw away extra white space and non-alphanumeric characters.
	const cleanText = text.replace(/\s+/g, ' ')
		.replace(/[^a-zA-Z0-9 ]/g, '')
		.toLowerCase();

	// Create an array of words
	const words = [];
	cleanText.split(' ').forEach((word) => {
		if(word !== '') { 
			words.push(word);
		}
	});

	return words;
}


module.exports = {
	retrieveDataFromTargetWebsite,
	scrapingResponse,
	arrayOfWordsFromParsingText
};
