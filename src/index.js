const CronJob = require('cron').CronJob;
const { scrapingWebsiteAndSaveDataOnDatabase } = require('./scraping');

/**
 * Define target of scraping
 */
const targetWebsite = 'https://en.wikipedia.org/wiki/Special:Random';

/**
 * Cron task schedule. define how often execute a task.
 * Example: 
 * '00 00 10-23 * * *' (every hour from 10AM to 23PM)
 * '00 00,20,40 * * * *' (every hour on minute 00, 20 and 40)
 */
new CronJob('00 00 22 * * *', () => {
	// task to execute:
	executeTasks();
}, null, true, 'Europe/Madrid');

/**
 * Execute list of tasks
 */
function executeTasks() {
	// Main task
	scrapingWebsiteAndSaveDataOnDatabase(targetWebsite);
}





executeTasks(); // TODO: quitar esta linea y descomentar la que hay dentro del cron.
