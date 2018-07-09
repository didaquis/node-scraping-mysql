/* Home doc */
/**
 * @file Manages the configuration settings for sequelize module.
 */

/* Module doc */
/**
 * Configuration settings for sequelize module
 * @module sequelize
 */

require('dotenv').config();

/**
 * @constant
 * @type {string}
 */
const DB_HOST = process.env.DB_HOST;
/**
 * @constant
 * @type {number}
 */
const DB_PORT = process.env.DB_PORT;
/**
 * @constant
 * @type {string}
 */
const DB_DATABASE = process.env.DB_DATABASE;
/**
 * @constant
 * @type {string}
 */
const DB_USER = process.env.DB_USER;
/**
 * @constant
 * @type {string}
 */
const DB_PASS = process.env.DB_PASS;


const Sequelize = require('sequelize');

/**
 * create an instance of connection
 */
const sequelize = new Sequelize(`mysql://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`, { logging: false, operatorsAliases: false });

module.exports = { sequelize };
