let getSentences = require( "yoastseo/js/stringProcessing/getSentences" );

/**
 * Counts the number of sentences ending with an exclamation mark or exclamation mark combination.
 *
 * @param {array} sentences The sentences from the text to check for exclamation marks.
 * @returns {number} The number of sentences ending with an exclamation mark.
 */
const countExclamationMarkSentences = function( sentences ) {
	// Match !, !!, !?, !??, !???, !??!? enz. at the end.
	let exclamationRegex = new RegExp( /!\?*$/, "g" );
	let count = 0;
	for ( let i = 0; i < sentences.length; i++ ) {
		let match = sentences[ i ].match( exclamationRegex );
		if ( match && match.length > 0 ) {
			count++;
		}
	}
	return count;
};

/**
 * Counts the number of sentences ending with an exclamation mark or exclamation mark combination.
 *
 * @param {Object} paper The paper to check for governmental organizations.
 * @returns {number} The number of sentences ending with an exclamation mark or exclamation mark combination.
 */
module.exports = function( paper ) {
	let text = paper.getText();
	let sentences = getSentences( text );
	return countExclamationMarkSentences( sentences );
};
