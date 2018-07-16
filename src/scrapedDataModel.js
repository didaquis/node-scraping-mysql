/* Home doc */
/**
 * @file Defined sequelize data model.
 * @see module:scrapedDataModel
 */

const Sequelize = require('sequelize');
const { sequelize } = require('./config-sequelize');

/* Module doc */
/**
 * Define model for 'scrapedDataModel' data
 * @module scrapedDataModel
 */

/**
 * Define model for 'scraping_results' table on database
 * @type {scraping_results}
 * @property {integer} id Identificator of record
 * @property {string|null} href The data's source url
 * @property {string|null} results Data scraped
 */
const scrapedDataModel = sequelize.define('scraping_results',
	{
		id: {
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		},

		href: {
			type: Sequelize.STRING,
			allowNull: true
		},

		results: {
			type: Sequelize.TEXT,
			allowNull: true
		}
	}
);

module.exports = { scrapedDataModel };