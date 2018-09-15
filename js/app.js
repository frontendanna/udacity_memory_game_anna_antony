// variable for moves
let moves = 0;
let counter = document.querySelector(".moves");
// star icons
const score = document.querySelectorAll(".fa-star");
//this holds the stack
const stack = document.getElementById("card-stack");
// this holds all the cards
let card = document.getElementsByClassName("card");
let cards = [...card]
console.log(cards);
// this holds the matched cards
let matchCard = document.getElementsByClassName("match");
// stars list
let starsList = document.querySelectorAll(".stars li");
// this declares the text message
let popup = document.getElementById("popup")
// the array for the opened cards
let openCards = [];
//opens and shows class to display the cards
var displayCard = function() {
	this.classList.toggle("open");
	this.classList.toggle("show");
	this.classList.toggle("disabled");
  if (moves === 0 && second === 0) {
    startTime();
  }
};
// closing icon
let closeicon = document.querySelector(".close");
// checks if cards are open and if they match
function cardOpen() {
	openCards.push(this);
	var len = openCards.length;
	if (len === 2) {
		moveCounter();
		if (openCards[0].type === openCards[1].type) {
			match();
		} else {
			unmatch();
		}
	}
};
// function for not matching cards
function unmatch() {
	openCards[0].classList.add("unmatched");
	openCards[1].classList.add("unmatched");
	disable();
  setTimeout(function() {
		openCards[0].classList.remove("show", "open", "no-event", "unmatched");
		openCards[1].classList.remove("show", "open", "no-event", "unmatched");
		enable();
		openCards = [];
	}, 1100);
}
// function for matching cards
function match() {
	openCards[0].classList.add("match", "disabled");
	openCards[1].classList.add("match", "disabled");
	openCards[0].classList.remove("show", "open", "no-event");
	openCards[1].classList.remove("show", "open", "no-event");
	openCards = [];
}
// cards are disabled if matched
function enable() {
	Array.prototype.filter.call(cards, function(card) {
		card.classList.remove('disabled');
		for (var i = 0; i < matchCard.length; i++) {
			matchCard[i].classList.add("disabled");
		}
	});
}
// disables cards temporarily
function disable() {
	Array.prototype.filter.call(cards, function(card) {
		card.classList.add('disabled');
	});
}
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
	var currentIndex = array.length,
		temporaryValue, randomIndex;
	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
};
// shuffles the cards when page is reloaded
document.body.onload = startGame();
// this starts a new game
function startGame() {
	openCards=[];
  // shuffles the deck
	cards = shuffle(cards);
	// removing existing classes from the card stack
	for (var i = 0; i < cards.length; i++) {
		stack.innerHTML = "";
		[].forEach.call(cards, function(item) {
			stack.appendChild(item);
		});
		cards[i].classList.remove("show", "open", "match", "disabled");
  }
	// resets moves
	moves = 0;
	counter.innerHTML = moves;
	// reseting star score rating
	for (var i = 0; i < score.length; i++) {
		score[i].style.color = "#ffd700";
		score[i].style.visibility = "visible";
	}
	//resets timer
	second = 0;
	minute = 0;
	var time = document.querySelector(".time");
	time.innerHTML = "0 mins 0 secs";
	clearInterval(interval);
}
// counter for moves
function moveCounter() {
	moves++;
	counter.innerHTML = moves;
	// rating system
	if (moves > 1 && moves < 14) {
		for (i = 0; i < 3; i++) {
			if (i > 2) {
				score[i].style.visibility = "collapse";
			}
		}
	} else if (moves > 15 && moves < 25) {
		for (i = 0; i < 3; i++) {
			if (i > 1) {
				score[i].style.visibility = "collapse";
			}
		}
	}
}
// timer
var second = 0,
	minute = 0;
hour = 0;
var time = document.querySelector(".time");
var interval;

function startTime() {
	interval = setInterval(function() {
		time.innerHTML = minute + "minutes " + second + "seconds";
		second++;
		if (second == 60) {
			minute++;
			second = 0;
		}
		if (minute == 60) {
			hour++;
			minute = 0;
		}
	}, 1000);
}
// loop that adds event listeners to every card
for (var i = 0; i < cards.length; i++) {
	card = cards[i];
	card.addEventListener("click", displayCard);
	card.addEventListener("click", cardOpen);
	card.addEventListener("click", congratulations);
};
// closing icon
function closePopup() {
	closeicon.addEventListener("click", function(e) {
		popup.classList.remove("show");
		startGame();
	});
}
// play again
function playAgain() {
	popup.classList.remove("show");
	startGame();
  openCards=[];
}
//message after game is completed
function congratulations() {
	if (matchCard.length == 16) {
		clearInterval(interval);
		finalTime = time.innerHTML;
		//message
		popup.classList.add("show");
		//rating
		var Rating = document.querySelector(".score").innerHTML;
		//time, moves, rating
		document.getElementById("totaltime").innerHTML = finalTime;
		document.getElementById("totalmoves").innerHTML = moves;
		document.getElementById("Rating").innerHTML = Rating;
		//closing icon
		closePopup();
	};
}
