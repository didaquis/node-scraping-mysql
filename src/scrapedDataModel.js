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
 * Define model for 'scrapedDataModel' data
 */
const scrapedDataModel = sequelize.define('scrapedDataModel',
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