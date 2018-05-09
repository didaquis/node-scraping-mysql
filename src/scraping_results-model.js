const Sequelize = require('sequelize');
const { sequelize } = require('./config-sequelize');

/**
 * Define model for 'scraping_results' data
 */
const Scraping_results = sequelize.define('scraping_results',
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

module.exports = { Scraping_results };