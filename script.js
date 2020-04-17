const gameContainer = document.getElementById("game");
const scoreDisplay = document.querySelector("h3")
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "pink",
  "aqua",
  "darkblue",
  "forestgreen",
  "goldenrod"
];
let matchCheck
let totalMatched = 0
let counter = 0
let score = 0

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  const range = document.querySelector("input[type = range]")
  let newArray= []
  for (let i = 0; i <= range.value; i ++){
    newArray.push(array[i])
  }
  newArray = newArray.concat(newArray)
  

  let counter = newArray.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = newArray[counter];
    newArray[counter] = newArray[index];
    newArray[index] = temp;
  }

  return newArray;
}



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
let clickRestriction = false; // to make sure you cant flip cards while 2 are already clicked
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  //console.log("you just clicked", event.target.classList);

//restrict to 2 divs only
if(clickRestriction){ return }else{
//First Div Clicked
  if (counter < 1) {
    event.target.style.backgroundColor = event.target.classList["0"]
    event.target.setAttribute("data-clicked", "true")
    matchCheck = event.target
    counter++

//Second Div Clicked
  } else {
    clickRestriction = true
    event.target.style.backgroundColor = event.target.classList["0"]
    
  //if their colors match set match to truee  
    if (matchCheck.style.backgroundColor === event.target.style.backgroundColor && event.target.dataset.clicked != "true") {
      matchCheck.setAttribute("data-match", "true");
      event.target.setAttribute("data-match", "true");
      counter = 0 
      totalMatched++
      checkGameEnd()
      return clickRestriction = false ;
  //Do nothing if you click an already matched div    
    } else if (event.target.dataset.match === "true" || event.target.dataset.clicked === "true") {
      console.log ("pick a different div")
      return clickRestriction = false;
  //only show colors for one second if you click nonmatching divs    
    } else {
      setTimeout(function () {
        event.target.style.backgroundColor = "white"
        matchCheck.style.backgroundColor = "white"
        matchCheck.dataset.clicked = ""
        counter = 0
        score++
        scoreDisplay.innerText = `Score : ${score}`
        return clickRestriction = false;
      }, 1000)
    }
  }
}
  //reset if all divs hav matched.

}

function setScore(){
  
  if (localStorage.getItem("score")){
    let best = parseInt(localStorage.getItem("score"))
    
    score < best ? localStorage.setItem("score",`${score}`) : null;
  } else {
    localStorage.setItem("score",`${score}`)
  }


}

function checkGameEnd(){
  if(totalMatched === 5){
    setScore()
    scoreDisplay.innerText =` You win with a score of : ${score}, your best score is : ${localStorage.getItem("score")}`
    
  }
}



// when the DOM loads
document.addEventListener("DOMContentLoaded", function(){

  const startBtn = document.querySelector("#start")
  const restartBtn = document.querySelector("#restart")
  

  startBtn.addEventListener("click", function(event){
    let shuffledColors = shuffle(COLORS);
    createDivsForColors(shuffledColors)
    event.target.classList.toggle("hidden")
    scoreDisplay.innerText = `Score : ${score}`
  })
  
  restartBtn.addEventListener("click", function(event){
       
    while(gameContainer.firstElementChild){
      gameContainer.removeChild(gameContainer.firstElementChild);
    }
    score = 0;
    startBtn.classList.toggle("hidden")
  })
});
