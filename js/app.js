/*******************************************************************************
Credits:

These two Udacity study jam sessions helped me to implement the basic functions:
Memory Game tutorial by Yahya Elharony: https://youtu.be/G8J13lmApkQ?t=9
Memory Game webinar by Mike Wales: https://youtu.be/_rUH-sEs68Y?t=2

The code for the modal box was taken from the following tutorial and adapted to
my memory project: https://sabe.io/tutorials/how-to-create-modal-popup-box

*******************************************************************************/
/* TODO: What do I want to implement next?

		1. Transform the alert at the end of a game into a modal box: https://www.w3schools.com/howto/howto_css_modals.asp
		2. Add the star rating and the restart button to the modal box / pop-up
		3. Animate the cards accordingly to whether they match or don't match
		4. Add animation to the cards when they are turned around
		5. Maybe add animation to the stars in the pop-up-window
		6. Fix the bug that you can turn around more than two cards when you click quickly
		7. Fix the bug that the last card is only turned after the alert/pop-up is clicked away
 */

/*
 * Create a list that holds all of your cards
 */

/* An array with the variables that contain the FontAwesome Icons. I need 16 cards
so I have to add every icon twice. */
const icons = [
	"fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o",
	"fa-anchor", "fa-anchor", "fa-bolt", "fa-bolt", "fa-cube", "fa-cube",
	"fa-leaf", "fa-leaf", "fa-bicycle", "fa-bicycle", "fa-bomb", "fa-bomb",
]

// This variable contains the deck (the square behind the cards)
const deck = document.querySelector(".deck");

// This variable selects all the card elements
const allCards = document.querySelectorAll(".card");

// This variable creates an empty array for the newly created card deck
const cardDeck = [];

// These variables are needed for the timer
let minutes = document.querySelector(".minutes");
let seconds = document.querySelector(".seconds");
let minute = 0;
let second = 0;
let increment;

// Declare variables for the clickCard function
let openedCards = 0;
let flippedCards = [];
let matchedCards = [];
let cardOne = flippedCards[0];
let cardTwo = flippedCards[1];

// Variables for the moves counter
const countedMoves = document.querySelector(".moves");
let moves = 0;

// The stars for the star rating
const starOne = document.getElementById("starOne");
const starTwo = document.getElementById("starTwo");
const starThree = document.getElementById("starThree");

const cards = document.querySelectorAll('.card');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976

function shuffle(array) {
		var currentIndex = array.length, temporaryValue, randomIndex;

		while (currentIndex !== 0) {
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex -= 1;
				temporaryValue = array[currentIndex];
				array[currentIndex] = array[randomIndex];
				array[randomIndex] = temporaryValue;
		}

		return array;
}

// This function creates the cards
function createCard() {
	for (let i = 0; i < icons.length; i ++) {
		const oneCard = document.createElement("li");
		oneCard.classList.add("card");
		oneCard.innerHTML = "<i class=" + "'fa " + icons[i] + "'></i>";
		deck.appendChild(oneCard);
		cardDeck.push(oneCard);
	}
}

//This function creats the deck of cards
function createDeck() {
	// Shuffle the items in the icons array
	shuffle(icons);
	/* Loop thrugh each card and create its html */
	createCard();
}

// This function runs when a card is clicked
function clickCard() {
	const cards = document.querySelectorAll('.card');
	/* Loop through all the cards. */
	for (let i = 0; i < cards.length; i++) {
		function openCards() {
			if (flippedCards === 2) {
				for (let i = 0; cards.length < i; i++) {
					cards[i].classList.add("disableClick");
				}
			}
			else {
				cards[i].classList.add("open", "show");
				openedCards++;
			}
		}
		function pushCards() {
			if (flippedCards.length < 2) {
				flippedCards.push(cards[i]);
			}

			if (flippedCards.length === 1) {
				cards[i].classList.add("disableClick");
			}
			if (flippedCards.length === 2) {
				for (let i = 0; cards.length < i; i++) {
					cards[i].classList.add("disableClick");
				}
				cardOne = flippedCards[0];
				cardTwo = flippedCards[1];
				pairCards();
			}
		}
		function clickEventListener() {
			cards[i].addEventListener('click', openCards);
			cards[i].addEventListener('click', pushCards);
		}
		function removeEventListener() {
			cards[i].removeEventListener('click', openCards);
			cards[i].removeEventListener('click', pushCards);
		}
		if (flippedCards.length >= 2) {
			removeEventListener();
		}
		else {
			clickEventListener();
		}
	}
}

// When both cards match, call this function
function cardsMatch() {
	/* If the cards match, add the class "match" to them and push them into
	a new array. */
	for (let i = 0; cards.length < i; i++) {
		cards[i].classList.add("disableClick");
	}
	flippedCards[0].classList.add("match");
	flippedCards[1].classList.add("match");
	matchedCards.push(cardOne, cardTwo);
	flippedCards = [];

	//Find out if all cards are matched and if the game is over
	gameOver();
}

// When both cards don't match, call this function
function noMatch() {
	//Set a timeout: turn the cards after one second if they don't match
	flippedCards = [];
	for (let i = 0; cards.length < i; i++) {
		cards[i].classList.add("disableClick");
	}
	setTimeout(function() {
		cardOne.classList.remove("open", "show", "disableClick");
		cardTwo.classList.remove("open", "show", "disableClick");
	}, 200);
}

// Add a function to compare the cards
function compareCards() {
	//compare flippedCards
	if (flippedCards[0].innerHTML === flippedCards[1].innerHTML) {

		cardsMatch();

	} else {

			noMatch();

	}
	//empty the array again
	flippedCards = [];
}

// When two cards are in the flippedCards-array, call this function
function pairCards() {

	//Count the moves
	movesCounter();

	//Adjust star star rating
	starRating();

	//Compare the cards
	compareCards();
}

// Add a function that counts the moves
function movesCounter() {
	moves++;
	countedMoves.innerHTML = moves;
	// Sets the point where the timer starts
	if (moves == 0) {
		second = 0;
		minute = 0;
	}
	if (moves == 1) {
		second = 0;
		minute = 0;
		startTimer();
	}
}

// Add a function with the timer
function startTimer() {
	if (matchedCards.length < 16) {
		// Implement the interval by which the timer should increase
		let increment = setInterval(function() {
			second++;
			minutes.innerHTML = minute;
			seconds.innerHTML = second;
			if (second == 59) {
				minute++;
				//seconds.innerHTML = -4;
				second = -1;
			}
		}, 1000);
	}
	else {
		clearInterval(increment);
		minute = 0;
		second = -1;
	}
}

// Add the star rating functionality
function starRating() {
	if (moves <= 16) {
		starOne.classList.add("orange");
		starTwo.classList.add("orange");
		starThree.classList.add("orange");
	}
	if (17 <= moves && moves <= 23) {
		starThree.classList.remove("orange");
	}
	if (moves >= 24) {
		starTwo.classList.remove("orange");
	}
}

/* A function that can help me in the future to limit the opened cards
function limitOpenedCards() {
	if (openedCards > 2) {
		return;
	}
	else {
		return;
	}
}
*/

/* When 16 cards are matched, the game is finished */
function gameOver() {
	if (matchedCards.length === icons.length) {
		alert("You win!!!");
	}
}

// This function that initialises a new game
function startGame() {
	//Create the Deck
	createDeck();

	//Open cards
	clickCard();
}

// Start the game for the first time
startGame();

// Add reset button

const restartButton = document.querySelector(".restart");
restartButton.addEventListener("click", function() {

	//Remove all the cards from the deck
	while (deck.firstChild) {
  	deck.removeChild(deck.firstChild);
	}

	// Reset movesCounter to 0
	moves = 0;
	countedMoves.innerHTML = 0;
	openedCards = 0;
	flippedCards = [];
	matchedCards = [];

	// Reset stars rating to three orange stars
	starOne.classList.add("orange");
	starTwo.classList.add("orange");
	starThree.classList.add("orange");

	// Reset timer
	minute = 0;
	second = 0;
	clearInterval(increment);

	//Start new game
	startGame();

});




/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
