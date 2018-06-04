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
		console.log(oneCard);
	}
}


//This function creats the deck of cards
function createDeck() {
	// Shuffle the items in the icons array
	shuffle(icons);
	/* Loop thrugh each card and create its html */
	createCard();
}

// Add a function that counts the moves
const countedMoves = document.querySelector(".moves");
let moves = 0;
function movesCounter() {
	moves++;
	countedMoves.innerHTML = moves;
	console.log("Moves: " + moves);
}

// Add the star rating functionality
const starOne = document.getElementById("starOne");
const starTwo = document.getElementById("starTwo");
const starThree = document.getElementById("starThree");

function starRating() {
	if (moves <= 16) {
		starOne.classList.add("orange");
		starTwo.classList.add("orange");
		starThree.classList.add("orange");
		console.log("Moves: <= 16")
	}
	if (17 <= moves && moves <= 23) {
		console.log("Moves: 17 < moves < 23")
		starThree.classList.remove("orange");
	}
	if (moves >= 24) {
		console.log("Moves: >= 24")
		starTwo.classList.remove("orange");
	}
}

function limitOpenedCards() {
	if (openedCards > 2) {
		return;
	}
	else {
		return;
	}
}

// Declare variables for the clickCard function
let openedCards = 0;
let flippedCards = [];
let matchedCards = [];
let cardOne = flippedCards[0];
let cardTwo = flippedCards[1];

// This function that initialises a new game
function startGame() {
	//Create the Deck
	createDeck();

	const cards = document.querySelectorAll('.card');

	function clickCard() {
		/* Loop through all the cards. */

		for (let i = 0; i < cards.length; i++) {
			function openCards() {
				//console.log("This card was clicked!")
				cards[i].classList.add("open", "show");
				openedCards++;
				console.log("opened cards: " + openedCards);
			}
			function pushCards() {
				if (openedCards > 2) {
					// Print an alarm if more than two items are in the array of flipped cards
					console.log("%c Alert - Too many items in array!!!",  "color: white; background: blue");
				}

				if (flippedCards.length < 2) {
					flippedCards.push(cards[i]);
					console.log("Length of array: " + flippedCards.length);
					console.log("Items in flippedCards: " + flippedCards);
				}

				if (flippedCards.length === 1) {
					cards[i].classList.add("disableClick");
				}
				if (flippedCards.length === 2) {
					cardOne = flippedCards[0];
					cardTwo = flippedCards[1];
					pairCards();
				}
			}
			function clickEventListener() {
				cards[i].addEventListener('click', openCards);
				cards[i].addEventListener('click', pushCards);
			}
			clickEventListener();
		}

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

	// When both cards match, call this function
	function cardsMatch() {
		/* If the cards match, add the class "match" to them and push them into
		a new array. */
		console.log("This is a match!");
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
		console.log("No match!");
		setTimeout(function() {
			cardOne.classList.remove("open", "show", "disableClick");
			cardTwo.classList.remove("open", "show", "disableClick");
			flippedCards = [];
		}, 500);
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

	/* The function gameOver checks whether there are 16 items in the array with the
	matched cards and in the original array of cards and then decides if the game is
	finished. */
	function gameOver() {
		if (matchedCards.length === icons.length) {
			alert("You win!!!");
		}
	}

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
