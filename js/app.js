"strict mode";

var ranNum, numberOfGuesses = 0;

function handleOverlay() {
	// Display modal
  	$(".what").click( function(){
    	$(".overlay").fadeIn(1000);
  	});
  	// Hide modal
  	$("a.close").click( function(){
  		$(".overlay").fadeOut(1000);
  	});
}

function getFeedback( ranNum, userNum ) {
	// take the generated number and number guessed by the user
	// if user > 51 away, return "ice cold"
	// if between 31 and 50, cold
	// if between 21 and 30, warm
	// if between 11 and 20, hot
	// if between 1 and 10, very hot
	var absDiff = Math.abs( userNum - ranNum );
	if ( userNum === ranNum ) {
		return "Yup, you got it. Big deal. Start a new game – unless you're afraid.";
	}
	else if ( absDiff <= 10 ) {
		return "very hot";
	} else if ( absDiff <= 20 ) {
		return "hot";
	} else if ( absDiff <= 30 ) {
		return "warm";
	} else if ( absDiff <= 50  ) {
		return "cold";
	} else {
		return "ice cold";
	}
}

function displayFeedback( feedback ) {
	// set feedback to appear in div#feedback
	$('h2#feedback').text( feedback );
}

function displayNumberOfGuesses( guesses ) {
	// set number of guesses in span#count
	$('span#count').text( guesses );
}

function displayGuess( guessNum ) {
	// add each guessed number as an <li> to ul#guessList
	$('ul#guessList').append('<li>' + guessNum + '</li>');
}

function incrementGuess() {
	numberOfGuesses++;
}

function clearGuess() {
	$('form input#userGuess').val('');
}

function handleGuess() {
	// ensure that users provide valid inputs
	// ensure that the user has supplied a numeric input between 1 and 100
	$('form').submit( function(e) {
		e.preventDefault();
			
		var guessNum = parseInt( $(this).find('input#userGuess').val() );
		if ( guessNum%1 !== 0 ) { 
			alert("Enter a number, idiot.");
			clearGuess();
		} else if ( guessNum > 100 || guessNum < 0 ) {
			alert("It has to be between 1 and 100, moron.");
			clearGuess();
		} else {
			// check how hot or cold it is, and display
			displayFeedback( getFeedback(ranNum, guessNum) );
			// update number of guesses
			incrementGuess();
			displayNumberOfGuesses( numberOfGuesses );
			// update guess list
			displayGuess( guessNum );
			//clear guess
			clearGuess();
		}
	});
}

function generateRandomNumber() {
	//return a random number between 1 and 100
	return Math.floor(Math.random() * 101);
}

function newGame() {
	//do everything necessary to start a new game
	// generate a new guess number
	// clear number of guesses
	// clear guess list
	ranNum = generateRandomNumber();
	numberOfGuesses = 0;
	console.log("The number is " + ranNum + ", cheater.");
	$('h2#feedback').text( 'Make your Guess!' );
	$('span#count').text( '0' );
	$('ul#guessList').empty();
}

function handleStartNewGame() {
	//attach handler on button click, start a new game
	$('li .new').click( newGame );
}

$(document).ready(function(){
	newGame();
	handleStartNewGame();
	handleGuess();
	handleOverlay();
});