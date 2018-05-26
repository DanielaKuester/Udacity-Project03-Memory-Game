/* TODO: How will I proceed from start to finish?
		1. Learn JS debugging: https://www.youtube.com/watch?v=-q1z8BPFItw	--> CHECK!
		2. Watch Cameron Pittman's webinar about debugging: https://www.youtube.com/watch?v=vftSDWcA6to
		3. Break down the Memory Game Project into a list of smaller steps; write that list down on paper and/or in a Markdown file
		4. Rewatch Mark Wales' webinar about this Memory Game project: https://www.youtube.com/watch?v=_rUH-sEs68Y
			 --> Do *not* try to memorise the code that he writes (come up with your own code!) but focus on his problem solving strategies
			 and the order of the steps that he takes. Maybe take notes about this order. What does he do first, what next, etc.?
		5. Analyse the shuffle function from the starter code and write into comments what it does exactly. It is very important that I
			 understand *everything* that is in my code!
 */

/* TODO: What do I want to practice strategically with this project (apart from *applying* my theoretical programming knowledge)?
	 1. Use Git branches to test out new little features in JavaScript and merge the branch into the master branch when they are working.
	  	--> Make more effective use of Git and GitHub!
	 2. Apply my new debugging knowledge in this project regularly.
	 		** console.log() and console.clear()
			** breakpoints and watches
			** code snippets
			** live debugging
			--> Use the dev tools as frequent as possible!!!
 */

/*
 * Create a list that holds all of your cards
 */

 /* I store the FontAwesome Icons in variables first and then I'll put them into
 an array. Maybe that will help me later to access them easily. (Or not. Who knows. ;)) */
const diamond = "fa fa-diamond";
const paperPlane = "fa fa-paper-plane-o";
const anchor = "fa fa-anchor";
const bolt = "fa fa-bolt";
const cube = "fa fa-cube";
const leaf = "fa fa-leaf";
const bicycle = "fa fa-bicycle";
const bomb = "fa fa-bomb";

/* An array with the variables that contain the FontAwesome Icons. I need 16 cards
so I have to add every icon twice. */
const icons = [
							diamond, diamond,
							paperPlane, paperPlane,
							anchor, anchor,
							bolt, bolt,
							cube, cube,
							leaf, leaf,
							bicycle, bicycle,
							bomb, bomb
							]

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

/* Select all the cards and add one event listener for all the cards. */
const cards = document.querySelectorAll('.card');
const flippedCards = [];
cards.forEach(function(oneCard) {
		oneCard.addEventListener('click', function (e) {
			oneCard.classList.add("open", "show");

			if (flippedCards.length < 2) {
				flippedCards.push(oneCard.innerHTML);
				console.log("Length of array: " + flippedCards.length);
				console.log("Items in flippedCards: " + flippedCards);
			} else {
				// Print an alarm if more than two items are in the array of flipped cards
				console.log("%c Alert - Too many items in array!!!",  "color: white; background: blue")
			}

			if (flippedCards.length === 2) {
				//compare flippedCards
				if (flippedCards[0] === flippedCards[1]) {
					console.log("This is a match!");
					this.classList.add("match");
					//add class "match" also to the first item in the array
				} else {
					console.log("No match!");
				}
			}
	})
});
