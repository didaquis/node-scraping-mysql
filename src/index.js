const CronJob = require('cron').CronJob;
//const rp = require('request-promise');
//const cheerio = require('cheerio');
const { retrieveDataFromTargetWebsite, scrapingResponse, arrayOfWordsFromParsingText } = require('./utils');

const targetWebsite = 'https://en.wikipedia.org/wiki/Special:Random';


/**
 * Cron task schedule
 * Example: 
 * '00 00 10-23 * * *' (every hour from 10AM to 23PM)
 * '00 00,20,40 * * * *' (every hour on minute 00, 20 and 40)
 */
new CronJob('00 00 22 * * *', () => {
	// task to execute:
	//mainTask();
}, null, true, 'Europe/Madrid');



mainTask(); // TODO: quitar esta linea y desomentar la que hay dentro del cron.

function mainTask() {
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
