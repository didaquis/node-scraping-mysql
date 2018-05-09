const CronJob = require('cron').CronJob;
const { scrapingWebsiteAndSaveDataOnDatabase } = require('./scraping');

const { sequelize } = require('./config-sequelize');

/**
 * Define target of scraping
 */
const targetWebsite = 'https://en.wikipedia.org/wiki/Special:Random';


/**
 * Cron task schedule. Define how often execute a task.
 * Example: 
 * '00 00 10-23 * * *' (every hour from 10AM to 23PM)
 * '00 00,20,40 * * * *' (every hour on minute 00, 20 and 40)
 * '00 00 22 * * *' (every day at minute 22:00:00 PM)
 */
const mainTask = new CronJob({
	cronTime: '00,10,20,30,40,50 * * * * *',
	onTick: function() {
		// task to execute:
		scrapingWebsiteAndSaveDataOnDatabase(targetWebsite);
	},
	start: false,
	timeZone: 'Europe/Madrid'
});


/**
 * Login database and then, execute main task
 */
sequelize.authenticate()
	.then(() => {
		//console.log('Connection has been established successfully.');
		mainTask.start(); // Init cron job defined as 'mainTask'
	})
	.catch(err => {
		console.error('Unable to connect to the database:', err);
	});

