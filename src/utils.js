/* Home doc */
/**
 * @file Some useful functions
 * @see {@link src/utils}
 */


/**
 * @namespace src/utils
 * @description Some useful functions
 */


/**
 * Remove space, remove non-alphanumeric characters and convert to lower case
 * @param {string} text 
 * @returns {string} Parsed string
 * @memberof src/utils
 */
function parseText(text) {
	return text.replace(/\s+/g, ' ').replace(/[^a-zA-Z0-9 ]/g, ' ').toLowerCase();
}


/**
 * Create an array of words from string.
 * @param {string} text
 * @returns {Array} Array of words 
 * @memberof src/utils
 */
function arrayOfWords(text) {
	const words = [];
	text.split(' ').forEach((word) => {
		if(word !== '') { 
			words.push(word);
		}
	});

	return words;
}


module.exports = {
	parseText, 
	arrayOfWords
};
