/**
 * sequelize module
 * @module sequelize
 */

require('dotenv').config();

const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_DATABASE = process.env.DB_DATABASE;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;

const Sequelize = require('sequelize');

/**
 * create an instance of connection
 */
const sequelize = new Sequelize(`mysql://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`, { logging: false, operatorsAliases: false });

module.exports = { sequelize };