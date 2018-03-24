let exclamationMarkSentences = require( "../researches/exclamationMarkSentences" );
let Paper = require( "yoastseo/js/values/Paper.js" );

describe( "a research to count the number sentences ending in exclamation marks or exclamation mark combinations", function() {
	it( "returns 1 when there is 1 sentence ending in !", () => {
		let mockPaper = new Paper( "It is the truth!" );
		let count = exclamationMarkSentences( mockPaper );
		expect( count ).toEqual( 1 );
	} );
	it( "returns 1 when there is 1 sentence ending in !?", () => {
		let mockPaper = new Paper( "Is it the truth!?" );
		let count = exclamationMarkSentences( mockPaper );
		expect( count ).toEqual( 1 );
	} );
	it( "returns 1 when there is 1 sentence ending in !?!!?!?", () => {
		let mockPaper = new Paper( "It is the truth!?!!?!?" );
		let count = exclamationMarkSentences( mockPaper );
		expect( count ).toEqual( 1 );
	} );
	it( "returns 0 when there is only a sentence ending in ?", () => {
		let mockPaper = new Paper( "It is the truth?" );
		let count = exclamationMarkSentences( mockPaper );
		expect( count ).toEqual( 0 );
	} );
	it( "returns 2 when there are 2 sentences ending in ! and 3 other sentences.", () => {
		let mockPaper = new Paper( "It is the truth! The very truth! Yep. Yep. Yep." );
		let count = exclamationMarkSentences( mockPaper );
		expect( count ).toEqual( 2 );
	} );
} );
