/* Home doc */
/**
 * @file Defined sequelize data model.
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