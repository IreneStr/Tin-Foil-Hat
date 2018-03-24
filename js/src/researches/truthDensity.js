let createRegexFromArray = require( "yoastseo/js/stringProcessing/createRegexFromArray" );
let wordCount = require( "yoastseo/js/stringProcessing/countWords" );
let getLanguage = require( "yoastseo/js/helpers/getLanguage" );

let englishTruths = [ "the truth", "the shocking truth", "uncovering the truth", "it is true", "this is true", "no lie", "not a lie" ];
let dutchTruths = [ "de waarheid", "de schokkende waarheid", "is waar", "is zeker waar", "geen leugen" ];

/**
 * Gets the subjects and denial phrases based on the passed language.
 *
 * @param {string} language The text's language.
 * @returns {Object} The subjects and denial phrases.
 */
const getTruthPhrases = function( language ) {
	switch( language ) {
		case "nl": return dutchTruths;
		default: return englishTruths;
	}
};

/**
 * Finds truth mentions in a text.
 *
 * @param {string} text The text to check for truths.
 * @param {string} language The language of the text.
 * @returns {array} A list of found truths.
 */
const findTruths = function( text, language ) {
	let truthPhrases = getTruthPhrases( language );
	const truthRegex = createRegexFromArray( truthPhrases );
	let formattedText = text.toLocaleLowerCase();
	return formattedText.match( truthRegex ) || [];
};

/**
 * Calculates the density of truths in a text.
 *
 * @param {string} text The text to check for truths.
 * @param {string} language The text to check for truths.
 * @returns {number} The percentage of truths in the text.
 */
const calculateTruthDensity = function( text, language ) {
	let truthCount = findTruths( text, language );
	if ( truthCount === null ) {
		return 0;
	}
	let numberOfTruths = truthCount.length;
	let numberOfWords = wordCount( text );
	return Math.round( numberOfTruths / numberOfWords * 100 );
};

/**
 * Checks a text for truths and returns the density of them.
 *
 * @param {Object} paper The paper to check for governmental organizations.
 * @returns {number} The truth density.
 */
module.exports = function( paper ) {
	let locale = paper.getLocale();
	let text = paper.getText();
	let language = getLanguage( locale );
	return calculateTruthDensity( text, language );
};
