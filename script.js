const gameContainer = document.getElementById("game");

  // console.log({gameContainer});

let cardGuess1 = null;

let cardGuess2 = null;

let flippedCards = 0

let noClick = false;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want to research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");
    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);
    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  
  if (noClick) {
    
    return;

  }

  if (event.target.classList.contains("flipped")) {

    return;
    
  }

  let currentCard = event.target;
  
  currentCard.style.backgroundColor = currentCard.classList[0];

  if (!cardGuess1 || !cardGuess2) { // loops for guessing
    
    currentCard.classList.add("flipped"); // class for clicked cards
    
    cardGuess1 = cardGuess1 || currentCard; // determines if the cards match

    cardGuess2 = currentCard === cardGuess1 ? null : currentCard;

  }

  if (cardGuess1 && cardGuess2) {
    noClick = true;

    let click1 = cardGuess1.className; // saves clicks with class to new var 
    
    let click2 = cardGuess2.className;

    if (click1 === click2) {

      flippedCards += 2; // checks for two selected cards

      cardGuess1.removeEventListener ("click", handleCardClick); // removes event listener for matched cards

      cardGuess2.removeEventListener ("click", handleCardClick);

      cardGuess1 = null;

      cardGuess2 = null;

      noClick = false; 

    }

    else {

      setTimeout(function() { // card is visible for one second before flipping back

        cardGuess1.style.backgroundColor = "";

        cardGuess2.style.backgroundColor = "";

        cardGuess1.classList.remove("flipped");

        cardGuess2.classList.remove("flipped");

        cardGuess1 = null;

        cardGuess2 = null;

        noClick = false;

      }, 1000);

    }

  }

  setTimeout(function() {
  
  if (flippedCards === COLORS.length) alert("YOU WIN!"); // ends the game when all matches are discovered

  }, 200);

}
// when the DOM loads
createDivsForColors(shuffledColors);

/* */