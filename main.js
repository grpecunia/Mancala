//*************************************************************************************** */
//** Initial VARIABLE declarations */

var mancalaBoard, activePlayer, score, stoneCount, conditional, position, gamePlaying, sC, gamePlay, diff;


/*************************************************************************************** */
//****   Functionality to Change DIFFICULTY in the NavBar Modal  ********/

var diff = 0;

document.querySelector("#difficulty > div > div > div.modal-body > button.btn.btn-outline-success").addEventListener("click", easy)

function easy() {
  diff = 0;
}

document.querySelector("#difficulty > div > div > div.modal-body > button.btn.btn-outline-warning").addEventListener("click", advanced)

function advanced() {
  diff = 1;
  document.querySelector("#difficulty > div > div > div.modal-body > button.btn.btn-outline-success").classList.remove('active')
  document.querySelector("#difficulty > div > div > div.modal-body > button.btn.btn-outline-warning").classList.add('active')
}

document.querySelector("#difficulty > div > div > div.modal-body > button.btn.btn-outline-danger").addEventListener("click", legendary)

function legendary() {
  diff = 2;
  document.querySelector("#difficulty > div > div > div.modal-body > button.btn.btn-outline-success").classList.remove('active')
  document.querySelector("#difficulty > div > div > div.modal-body > button.btn.btn-outline-danger").classList.add('active')
}

/*************************************************************************************** */
//****   Functionality to Change PLAYER SETTINGS in the NavBar Modal  ********/

var gamePlay = 0;

document.querySelector("#players > div > div > div.modal-body > button.btn.btn-outline-success").addEventListener("click", multi)

function multi(){
    gamePlay = 0
    document.querySelector("#players > div > div > div.modal-body > button.btn.btn-outline-success").classList.add('active')
    document.querySelector("#players > div > div > div.modal-body > button.btn.btn-outline-danger").classList.remove('active')
}

document.querySelector("#players > div > div > div.modal-body > button.btn.btn-outline-danger").addEventListener("click", comp)

function comp() {
    gamePlay = 1;
    document.querySelector("#players > div > div > div.modal-body > button.btn.btn-outline-success").classList.remove('active')
    document.querySelector("#players > div > div > div.modal-body > button.btn.btn-outline-danger").classList.add('active')
}

//*************************************************************************************** */
//** Initiation FUNCTION - Runs when 'START GAME' Button is clicked */

function init() {
  sC = Number(document.querySelector("#stones > div > div > div.modal-body > input").value)
  gamePlaying = true;
  mancalaBoard = [sC, sC, sC, sC, sC, sC, 0, sC, sC, sC, sC, sC, sC, 0];
  score = [mancalaBoard[6], mancalaBoard[13]];
  activePlayer = 0;
  document.querySelector("#start-button").remove()
  document.querySelector("#navbarSupportedContent > form").innerHTML += `<button class='btn btn-outline-danger' id="restart" onclick='init()'>Restart Game</button>`;
  document.querySelector("body > div.container > div > div.col > div:nth-child(1)").classList.add("active");
  updateMancala();
  console.log("Start");
  gameStart.play();
  displayPlayerTurn();
}

document.querySelector("#start-button").addEventListener("click", init); //START GAME onClick Event to init()


//*************************************************************************************** */
//** FUNCTION CENTRAL FOR BOARD MOVES */

var rockSound = new Audio('assets/rocksmove.wav');
var gameStart = new Audio('assets/startgame.wav')
var gameOver = new Audio('assets/gameover.wav');


function pick(){ // is called once you any player picks a square
  // console.log(event)
  let e = event
  if(gamePlay === 1) {  // if you're playing vs pc
    // if (activePlayer === 0) { 
      // debugger;
      // document.querySelector("div.row.pit-" + activePlayer).onclick = function(e) {
        let stoneCount = Number(mancalaBoard[Number(e.target.id)]);
        let conditional = Number(e.target.attributes.id.value) + stoneCount;
        let position = conditional;
        
        for (let i = Number(e.target.attributes.id.value); i <= conditional; i++) {
          ++mancalaBoard[i % 14];
          // position = conditional;
        }
        
        mancalaBoard[e.target.attributes.id.value] = 0;
        
        validateTurn(position);
        // console.log('POS not in comp ** ' +position)
      // } 
      // }
      // console.log("here")
      console.log('Current activePlayer is Player '+ (activePlayer + 1))
    if (activePlayer === 1) {
      console.log("Computer Pick triggered!")
      compPick(event);
    }
  }
  else if (gamePlay === 0) {
    console.log("multiplayer");
    document.querySelector("div.row.pit-" + activePlayer).onclick = function(e) {
      let stoneCount = Number(mancalaBoard[Number(e.target.id)]);
      let conditional = Number(e.target.attributes.id.value) + stoneCount;
      let position = conditional;
      for (let i = Number(e.target.attributes.id.value); i <= conditional; i++) {
        ++mancalaBoard[i % 14];
        // position = conditional;
      }
      mancalaBoard[e.target.attributes.id.value] = 0;
      validateTurn(position);
    } 
  } 
} 

function compPick(event) {
  console.log("Easy Pick firing off...>>>");
  if (diff === 0) {
    // console.log('>> IM I EVER HERE????')
      setTimeout(function() {
        isEasy(event);
      }, 2000);
  }
  else if (diff === 1) {
    isAdvanced();
  }
  else if (diff === 2) {
    isLegendary();
  }
}

function validateTurn(position) {
  console.log('Current activePlayer is Player '+ (activePlayer + 1))
  console.log('Last Play Index before Validation Runs >> mancalaBoard['+position%14+']');
  // if (activePlayer === 0 && position % 14 === 6) { // check if player 1 keeps playing
  if (activePlayer === 0 && position % 14 === 6) { // check if player 1 keeps playing
    activePlayer = 0;
  } else if (activePlayer === 0 && position % 14 !== 6) {
    document
      .querySelector("div.row.pit-" + activePlayer)
      .classList.remove("active");
    [
      ...document.querySelector("div.row.pit-" + activePlayer).children
    ].forEach(button => button.setAttribute("disabled", "true"));
    activePlayer = 1;
    document
      .querySelector("div.row.pit-" + activePlayer)
      .classList.add("active");
      // console.log("player 2", activePlayer)
  } else if (activePlayer === 1 && position % 14 === 13) {
    activePlayer = 1;
  } else if (activePlayer === 1 && position % 14 !== 13) {
    document
      .querySelector("div.row.pit-" + activePlayer)
      .classList.remove("active");
    [
      ...document.querySelector("div.row.pit-" + activePlayer).children
    ].forEach(button => button.setAttribute("disabled", "true"));
    activePlayer = 0;
    document
      .querySelector("div.row.pit-" + activePlayer)
      .classList.add("active");
  } 
  updateMancala();
  rockSound.play();
  checkButtons();
  displayPlayerTurn();
}


//********************************************************************************************* */
//** Function that checks the BUTTON VALUES and TOGGLES the DISABLE if they are equal to (=) 0 */

function checkButtons() {
    [...document.querySelector("div.row.pit-" + activePlayer).children].forEach(button => {
        if (button.innerHTML != 0) {
          button.removeAttribute("disabled");
        }
      }
    );
}

//*************************************************************************************** */
//** Function that UPDATES the PITS ***************************************************  */

function updateMancala() {
  document.querySelector(
    "body > div.container > div > div.col > div:nth-child(1) > button:nth-child(6)"
  ).innerHTML = mancalaBoard[0];
  document.querySelector(
    "body > div.container > div > div.col > div:nth-child(1) > button:nth-child(5)"
  ).innerHTML = mancalaBoard[1];
  document.querySelector(
    "body > div.container > div > div.col > div:nth-child(1) > button:nth-child(4)"
  ).innerHTML = mancalaBoard[2];
  document.querySelector(
    "body > div.container > div > div.col > div:nth-child(1) > button:nth-child(3)"
  ).innerHTML = mancalaBoard[3];
  document.querySelector(
    "body > div.container > div > div.col > div:nth-child(1) > button:nth-child(2)"
  ).innerHTML = mancalaBoard[4];
  document.querySelector(
    "body > div.container > div > div.col > div:nth-child(1) > button:nth-child(1)"
  ).innerHTML = mancalaBoard[5];
  document.querySelector("#\\36 ").innerText = mancalaBoard[6];
  document.querySelector(
    "body > div.container > div > div.col > div:nth-child(2) > button:nth-child(1)"
  ).innerHTML = mancalaBoard[7];
  document.querySelector(
    "body > div.container > div > div.col > div:nth-child(2) > button:nth-child(2)"
  ).innerHTML = mancalaBoard[8];
  document.querySelector(
    "body > div.container > div > div.col > div:nth-child(2) > button:nth-child(3)"
  ).innerHTML = mancalaBoard[9];
  document.querySelector(
    "body > div.container > div > div.col > div:nth-child(2) > button:nth-child(4)"
  ).innerHTML = mancalaBoard[10];
  document.querySelector(
    "body > div.container > div > div.col > div:nth-child(2) > button:nth-child(5)"
  ).innerHTML = mancalaBoard[11];
  document.querySelector(
    "body > div.container > div > div.col > div:nth-child(2) > button:nth-child(6)"
  ).innerHTML = mancalaBoard[12];
  document.querySelector("#\\31 3").innerText = mancalaBoard[13];
  checkBoard();
}


/*************************************************************************************** */
//****   Functionality to increase and decrease Stone Count in the NavBar Modal  ********/

document.querySelector("#stones > div > div > div.modal-body > button.btn.btn-outline-success")
.addEventListener("click", upStone);
document.querySelector("#stones > div > div > div.modal-body > button.btn.btn-outline-danger")
.addEventListener("click", downStone);

function upStone() {
  document.querySelector("#stones > div > div > div.modal-body > input")
    .value++;
}

function downStone() {
  document.querySelector("#stones > div > div > div.modal-body > input")
    .value--;
}

/*************************************************************************************** */
//****   Functions to display relevant bottom text  ********/

function displayPlayerTurn() {
  let p1t = `Player 1's turn`;
  let p2t = `Player 2's turn`;
  if(activePlayer === 0) {
    document.getElementById("btext").innerText = p1t;
  } else {
    document.getElementById("btext").innerText = p2t;
  }
}

function p1Wins() {
  let p1w = `Game over. Player 1 wins!`;
  document.getElementById("btext").innerText = p1w;
}

function p2Wins() {
  let p2w = `Game over. Player 2 wins!`;
  document.getElementById("btext").innerText = p2w;
}

function tieGame() {
  let tie = `Game over. It's a tie!`;
  document.getElementById("btext").innerText = tie;
}

/*************************************************************************************** */
//****   Check if GAME  Mancala board to make sure there are values in PITS  ********/

function checkBoard() {
//   console.log(gamePlaying);
  let sum1 = 0;
  let sum2 = 0;
  for (let i = 0; i < 6; i++) {
    sum1 += Number(mancalaBoard[i]);
  }
//   console.log(sum1);
  for (let i = 7; i < 13; i++) {
    sum2 += Number(mancalaBoard[i]);
  }
  // console.log(sum2);
  // console.log("the sum of side player 1 is - " + sum1);
  // console.log("the sum of side player 2 is - " + sum2);
  if (sum1 === 0 || sum2 === 0) {
    gamePlaying = false;
    // console.log("One of the pit sides is empty");
    // console.log(gamePlaying,"Player 1 Score - " + mancalaBoard[6],"Player 2 Score - " + mancalaBoard[13]);

    if (mancalaBoard[6] > mancalaBoard[13]) {
      gameOver.play();
      // console.log("player 1 wins with score " + mancalaBoard[6]);
      gameOver.addEventListener(
        "ended",
        function() {
          p1Wins();
        },
        false
      );
    } else if (mancalaBoard[13] > mancalaBoard[6]){
        // console.log("player 2 wins with score " + mancalaBoard[13]);
        gameOver.play();
        gameOver.addEventListener('ended', function() {
          p2Wins();
      }, false)
    } else {
      gameOver.play();
      tieGame();
    }
  }
}

// *************************************************************************************** */
//****   RESTART GAME FUNCTION  ********/

// function restart() {
//     window.location.reload();
// }
// document.querySelector("#restart").addEventListener("click", restart);

