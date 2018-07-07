/**
 * logger module
 * @module logger
 */

const log4js = require('log4js');

/**
 * log4js configuration.
 * @type {Object}
 * @example
 * logger.trace('trace');
 * logger.debug('debug');
 * logger.info('info');
 * logger.warn('warn');
 * logger.error('error');
 * logger.fatal('fatal');
 * // All loggers are printed in console! 
 * // Loggers WARN, ERROR and FATAL are logged in a log file.
 */
log4js.configure({
	appenders: {
		out:{ type: 'stdout' },
		file_log: { type: 'file' , filename: 'logs/application.log', maxLogSize: 20480, keepFileExt: true },
		logLevelFilter: {  type:'logLevelFilter',level: 'warn', appender: 'file_log' }   
	},
	categories: {
		default: {
			appenders: [ 'logLevelFilter','out'], level: 'all' 
		}
	}
});


/**
 * Logger, use log4js config settings 
 */
const logger = log4js.getLogger();


module.exports = { logger };