//*************************************************************************************** */
//** Initial Load of Game Sounds */

var rockSound = new Audio("assets/rocksmove.wav");
var gameStart = new Audio("assets/startgame.wav");
var gameOver = new Audio("assets/gameover.wav");

document.querySelector("#sounds > div > div > div.modal-body > button.btn.btn-outline-danger").addEventListener("click", muteSounds);

function muteSounds() {
  document.querySelector("#sounds > div > div > div.modal-body > button.btn.btn-outline-danger").classList.add('active')
  document.querySelector("#sounds > div > div > div.modal-body > button.btn.btn-outline-success").classList.remove('active')
  rockSound.muted = true;
  gameStart.muted = true;
  gameOver.muted = true;
}

document.querySelector("#sounds > div > div > div.modal-body > button.btn.btn-outline-success").addEventListener("click", playSounds);

function playSounds() {
  document.querySelector("#sounds > div > div > div.modal-body > button.btn.btn-outline-success").classList.add('active')
  document.querySelector("#sounds > div > div > div.modal-body > button.btn.btn-outline-danger").classList.remove('active')
  rockSound.muted = false;
  gameStart.muted = false;
  gameOver.muted = false;
}

//*************************************************************************************** */
//** Initiation FUNCTION - Runs when 'START GAME' Button is clicked */

// document.querySelector("#start-button").addEventListener("click", init); //START GAME onClick Event to init()

function init() {
  sounds = document.querySelector("#sounds > div > div > div.modal-body > button.active").value;
  stones = Number(document.querySelector("#stones > div > div > div.modal-body > input").value);
  gamePlay = Number(document.querySelector("#players > div > div > div.modal-body > button.active").value);
  diff = Number(document.querySelector("#difficulty > div > div > div.modal-body > button.active").value);
  gamePlaying = true;
  activePlayer = 0;
  mancalaBoard = [stones, stones, stones, stones, stones, stones, 0, stones, stones, stones, stones, stones, stones, 0];
  score = [mancalaBoard[6], mancalaBoard[13]];
  document.querySelector("body > div.container > div > div.col > div:nth-child(1)").classList.add("active");
  document.querySelector("body > div.container > div > div.col > div:nth-child(2)").classList.remove("active");
  updateMancala();
  checkButtons();
  changeForComp();
  displayPlayerTurn();
  gameStart.play();
  document.querySelector("#start-button").remove()
  document.querySelector("#navbarSupportedContent > form").innerHTML += `<button class='btn btn-warning' id="start-button" onclick='init()'>Restart Game</button>`;
  console.log("Start");
}

/*************************************************************************************** */
//****   Functionality to Change DIFFICULTY in the NavBar Modal  ********/

//Easy Difficulty
document.querySelector("#difficulty > div > div > div.modal-body > button.btn.btn-outline-success").addEventListener("click", easy)

function easy() {
  diff = 0;
  document.querySelector("#difficulty > div > div > div.modal-body > button.btn.btn-outline-success").classList.add('active')
  document.querySelector("#difficulty > div > div > div.modal-body > button.btn.btn-outline-warning").classList.remove('active')
}

//Advanced (Normal) Difficulty
document.querySelector("#difficulty > div > div > div.modal-body > button.btn.btn-outline-warning").addEventListener("click", advanced)

function advanced() {
  diff = 1;
  document.querySelector("#difficulty > div > div > div.modal-body > button.btn.btn-outline-success").classList.remove('active')
  document.querySelector("#difficulty > div > div > div.modal-body > button.btn.btn-outline-warning").classList.add('active')
}

//Legendary Difficulty
// document.querySelector("#difficulty > div > div > div.modal-body > button.btn.btn-outline-danger").addEventListener("click", legendary)

// function legendary() {
//   diff = 2;
//   document.querySelector("#difficulty > div > div > div.modal-body > button.btn.btn-outline-success").classList.remove('active')
//   document.querySelector("#difficulty > div > div > div.modal-body > button.btn.btn-outline-danger").classList.add('active')
// }

/*************************************************************************************** */
//****   Functionality to Change PLAYER SETTINGS in the NavBar Modal  ********/

document.querySelector("#players > div > div > div.modal-body > button.btn.btn-outline-success").addEventListener("click", multi)

function multi(){
    gamePlay = 0
    document.querySelector("#players > div > div > div.modal-body > button.btn.btn-outline-success").classList.add('active')
    document.querySelector("#players > div > div > div.modal-body > button.btn.btn-outline-danger").classList.remove('active')
    displayPlayerTurn();
}

document.querySelector("#players > div > div > div.modal-body > button.btn.btn-outline-danger").addEventListener("click", comp)

function comp() {
    gamePlay = 1;
    document.querySelector("#players > div > div > div.modal-body > button.btn.btn-outline-success").classList.remove('active')
    document.querySelector("#players > div > div > div.modal-body > button.btn.btn-outline-danger").classList.add('active')
    displayPlayerTurn();
    changeForComp();
}



//*************************************************************************************** */
//** FUNCTION CENTRAL FOR BOARD MOVES */

function pick(){ // is called once you any player picks a square
  // console.log(event)
  // checkBoard()
  let e = event
  if(gamePlay === 1 && gamePlaying === true) {  // if you're playing vs pc
    // if (activePlayer === 0) { 
      // debugger;
      // document.querySelector("div.row.pit-" + activePlayer).onclick = function(e) {
      let stoneCount = Number(mancalaBoard[Number(e.target.id)]);
      let conditional = Number(e.target.attributes.id.value) + stoneCount;
      let position = conditional;
      
      for (let i = Number(e.target.attributes.id.value); i <= conditional; i++) {
        // console.log(activePlayer, i%14)
          if((activePlayer === 0 && i%14 === 13) || (activePlayer === 1 && i%14 === 6)) {
          conditional++;
        }
        ++mancalaBoard[i % 14];
        // position = conditional;
      }
        
    mancalaBoard[e.target.attributes.id.value] = 0; 
    // checkBoard();   
    validateTurn(position);
    if (activePlayer === 1) {
      // console.log("Computer Pick triggered!")
      compPick(event);
    }
  }
  else if (gamePlay === 0 && gamePlaying === true) {
    console.log("multiplayer");
    // debugger;
    document.querySelector("div.row.pit-" + activePlayer).onclick = function(e) {
      let stoneCount = Number(mancalaBoard[Number(e.target.id)]);
      let conditional = Number(e.target.attributes.id.value) + stoneCount;
      let position = conditional;
      for (let i = Number(e.target.attributes.id.value); i <= conditional; i++) {
        console.log(activePlayer, i%14);
        if((activePlayer === 0 && i%14 === 13) || (activePlayer === 1 && i%14 === 6)) {
          // console.log(activePlayer, i)
          conditional++;
        }
        else {
          ++mancalaBoard[i % 14];
        }
        // position = conditional;
      }
      mancalaBoard[e.target.attributes.id.value] = 0;
      // checkBoard();
      validateTurn(position);
    } 
  } 
  checkButtons();
} 

function compPick(event) {
  console.log("COMP Pick firing off...>>>");
  if (diff === 0 && gamePlaying == true) {
    // console.log('>> IM I EVER HERE????')
    checkButtons();
      setTimeout(function() {
        isEasy(event);
      }, 3000);
  }
  else if (diff === 1 && gamePlaying == true) {
    checkButtons();
    setTimeout(function() {
      isAdvanced(event);
    }, 3000);
    
  }
  else if (diff === 2 && gamePlaying == true) {
    checkButtons();
    isLegendary();
  }
}

function validateTurn(position) {
  if (activePlayer === 0 && position % 14 === 6) { // check if player 1 keeps playing
    activePlayer = 0;
  } 
  else if (activePlayer === 0 && position % 14 !== 6) {
    if (mancalaBoard[position % 14] === 1 && document.getElementById(position%14).attributes.disabled) {
      console.log("Hello CowBoy!");
      pickCapture(position);
    }
    document.querySelector("div.row.pit-" + activePlayer).classList.remove("active");
    [
      ...document.querySelector("div.row.pit-" + activePlayer).children
    ].forEach(button => button.setAttribute("disabled", "true"));
    activePlayer = 1;
    document
      .querySelector("div.row.pit-" + activePlayer)
      .classList.add("active");
      // console.log("player 2", activePlayer)
  } 
  else if (activePlayer === 1 && position % 14 === 13) {
    activePlayer = 1;
  } 
  else if (activePlayer === 1 && position % 14 !== 13) {
    if (mancalaBoard[position % 14] === 1 && document.getElementById(position%14).attributes.disabled) {
      console.log("Hello CowBoy!");
      pickCapture(position);
    }
    document.querySelector("div.row.pit-" + activePlayer).classList.remove("active");
    [
      ...document.querySelector("div.row.pit-" + activePlayer).children
    ].forEach(button => button.setAttribute("disabled", "true"));
    activePlayer = 0;
    document
      .querySelector("div.row.pit-" + activePlayer)
      .classList.add("active");
  } 
  checkButtons();
  updateMancala();
  rockSound.play();
  displayPlayerTurn();
}

// function pickCapture(position) {
//     let inverse = 0;
//     let boost = mancalaBoard[position % 14] + mancalaBoard[inverse];
//     switch (position%14) {
//       case 0 :
//         console.log("the switch is working 0 - 12")
//         inverse = 12;
//         boost = mancalaBoard[position % 14] + mancalaBoard[inverse];
        
//         if (activePlayer === 0 && document.getElementById(position%14).attributes.disabled && mancalaBoard[inverse] !== 0) {
//           console.log('Boost bout to happen...')
//           mancalaBoard[position % 14] = 0;
//           mancalaBoard[inverse] = 0;
//           mancalaBoard[6] += boost;
//           console.log("Play was BOOSTED = " + boost);
//       } 
     
//         break;
//       case 1 :
//         console.log("the switch is working 1 - 11")
//         inverse = 11;
//         boost = mancalaBoard[position % 14] + mancalaBoard[inverse];
        
//         if (activePlayer === 0 && document.getElementById(position%14).attributes.disabled && mancalaBoard[inverse] !== 0) {
//           console.log("Boost bout to happen...");
//           mancalaBoard[position % 14] = 0;
//           mancalaBoard[inverse] = 0;
//           mancalaBoard[6] += boost;
//           console.log("Play was BOOSTED = " + boost);
//         } 
  
//         break;
//       case 2:
//         console.log("the switch is working 2 - 10");
//         inverse = 10;
//         // console.log('the boost = '+ boost)
//         boost = mancalaBoard[position % 14] + mancalaBoard[inverse];
//         if (activePlayer === 0 && document.getElementById(position%14).attributes.disabled && mancalaBoard[inverse] !== 0) {
//           console.log("Boost bout to happen...");
//           mancalaBoard[position % 14] = 0;
//           mancalaBoard[inverse] = 0;
//           mancalaBoard[6] += boost;
//           console.log("Play was BOOSTED = " + boost);
//         } 
       
//         break;
//       case 3:
//         console.log("the switch is working 3 - 9");
//         inverse = 9;
//         boost = mancalaBoard[position % 14] + mancalaBoard[inverse];
//         if (activePlayer === 0 && document.getElementById(position%14).attributes.disabled && mancalaBoard[inverse] !== 0) {
//           console.log("Boost bout to happen...");
//           mancalaBoard[position % 14] = 0;
//           mancalaBoard[inverse] = 0;
//           mancalaBoard[6] += boost;
//           console.log("Play was BOOSTED = " + boost);
//         } 
       
//         break;
//       case 4:
//         console.log("the switch is working 4 - 8");
//         inverse = 8;
//         boost = mancalaBoard[position % 14] + mancalaBoard[inverse];
        
//         if (activePlayer === 0 && document.getElementById(position%14).attributes.disabled && mancalaBoard[inverse] !== 0) {
//           console.log("Boost bout to happen...");
//           mancalaBoard[position % 14] = 0;
//           mancalaBoard[inverse] = 0;
//           mancalaBoard[6] += boost;
//           console.log("Play was BOOSTED = " + boost);
//         } 
        
//         break;
//       case 5:
//         console.log("the switch is working 5 - 7");
//         inverse = 7;
//         boost = mancalaBoard[position % 14] + mancalaBoard[inverse];
//         if (activePlayer === 0 && document.getElementById(position%14).attributes.disabled && mancalaBoard[inverse] !== 0) {
//           console.log("Boost bout to happen...");
//           mancalaBoard[position % 14] = 0;
//           mancalaBoard[inverse] = 0;
//           mancalaBoard[6] += boost;
//           console.log("Play was BOOSTED = " + boost);
//         } 

//         break;
//       case 7:
//         console.log("the switch is working 7 - 5");
//         inverse = 5;
//         boost = mancalaBoard[position % 14] + mancalaBoard[inverse];
        
//         if (activePlayer === 1 && document.getElementById(position % 14).attributes.disabled && mancalaBoard[inverse] !== 0) {
//           console.log("Boost bout to happen...");
//           mancalaBoard[position % 14] = 0;
//           mancalaBoard[inverse] = 0;
//           mancalaBoard[13] += boost;
//           console.log("Play was BOOSTED = " + boost);
//         }
//         break;
//       case 8:
//         console.log("the switch is working 8 - 4");
//         inverse = 4;
//         boost = mancalaBoard[position % 14] + mancalaBoard[inverse];
        
//         if (activePlayer === 1 && document.getElementById(position % 14).attributes.disabled && mancalaBoard[inverse] !== 0) {
//           console.log("Boost bout to happen...");
//           mancalaBoard[position % 14] = 0;
//           mancalaBoard[inverse] = 0;
//           mancalaBoard[13] += boost;
//           console.log("Play was BOOSTED = " + boost);
//         }
//         break;
//       case 9:
//         console.log("the switch is working 9 - 3");
//         inverse = 3;
//         boost = mancalaBoard[position % 14] + mancalaBoard[inverse];
        
//         if (activePlayer === 1 && document.getElementById(position % 14).attributes.disabled && mancalaBoard[inverse] !== 0) {
//           console.log("Boost bout to happen...");
//           mancalaBoard[position % 14] = 0;
//           mancalaBoard[inverse] = 0;
//           mancalaBoard[13] += boost;
//           console.log("Play was BOOSTED = " + boost);
//         }
//         break;
//       case 10:
//         console.log("the switch is working 10 - 2");
//         inverse = 2;
//         boost = mancalaBoard[position % 14] + mancalaBoard[inverse];
        
//         if (activePlayer === 1 && document.getElementById(position % 14).attributes.disabled && mancalaBoard[inverse] !== 0) {
//           console.log("Boost bout to happen...");
//           mancalaBoard[position % 14] = 0;
//           mancalaBoard[inverse] = 0;
//           mancalaBoard[13] += boost;
//           console.log("Play was BOOSTED = " + boost);
//         }
//         break;
//       case 11:
//         console.log("the switch is working 11 - 1");
//         inverse = 1;
//         boost = mancalaBoard[position % 14] + mancalaBoard[inverse];
        
//         if (activePlayer === 1 && document.getElementById(position % 14).attributes.disabled && mancalaBoard[inverse] !== 0) {
//           console.log("Boost bout to happen...");
//           mancalaBoard[13] += boost;
//           mancalaBoard[position % 14] = 0;
//           mancalaBoard[inverse] = 0;
//           console.log("Play was BOOSTED = " + boost);
//         }
//         break;
//       case 12:
//         console.log("the switch is working 12 - 0");
//         inverse = 0;
//         boost = mancalaBoard[position % 14] + mancalaBoard[inverse];
         
//         if (activePlayer === 1 && document.getElementById(position % 14).attributes.disabled && mancalaBoard[inverse] !== 0) {
//           console.log("Boost bout to happen...");
//           mancalaBoard[13] += boost;
//           mancalaBoard[position % 14] = 0;
//           mancalaBoard[inverse] = 0;
//           console.log("Play was BOOSTED = " + boost);
//         }
//         break;
//       default:
//         console.log("<< Something is WRONG! >>");
//         break;
//     }  
//     checkBoard()
// }



// //********************************************************************************************* */
// //** Function that checks the BUTTON VALUES and TOGGLES the DISABLE if they are equal to (=) 0 */

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
  checkButtons();
  let totalGameStones = 0;
  for (let i = 0; i <=13; i++) {
    totalGameStones += Number(mancalaBoard[i]);
  }
  console.log('Current Total Stones @ ',totalGameStones)
}


/*************************************************************************************** */
//****   Functionality to increase and decrease Stone Count in the NavBar Modal  ********/

document.querySelector("#stones > div > div > div.modal-body > button.btn.btn-success")
.addEventListener("click", upStone);
document.querySelector("#stones > div > div > div.modal-body > button.btn.btn-danger")
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
 if (gamePlay == 0){
    let p1t = `Player 1's turn`;
    let p2t = `Player 2's turn`;
    if(activePlayer === 0) {
      document.getElementById("btext").innerText = p1t;
    } else {
      document.getElementById("btext").innerText = p2t;
    } 
  } else if (gamePlay == 1) {
      let p1t = `Player 1's turn`;
      let p2t = `Computer's turn`;
      if(activePlayer === 0) {
        document.getElementById("btext").innerText = p1t;
      } else {
        document.getElementById("btext").innerText = p2t; 
      }
  }
  checkBoard();
}

function changeForComp() {
  if (gamePlay === 1) {
    document.querySelector("#bucket-1 > span").innerText = `Computer's SCORE:`;
    document.querySelector("body > div > div > div.col > span").innerText = `Computer`
  } else {
    document.querySelector("#bucket-1 > span").innerText = `Player 2's SCORE:`;
    document.querySelector("body > div > div > div.col > span").innerText = `Player 2`
  }
}

function p1Wins() {
  let p1w = `Game over. Player 1 wins!`;
  document.getElementById("btext").innerText = p1w;
}

function p2Wins() {
  if (gamePlay == 0) {
    let p2w = `Game over. Player 2 wins!`;
    document.getElementById("btext").innerText = p2w;
  }
  let comp = `Game over!! Computer dominated the Human again!!`;
  document.getElementById("btext").innerText = comp;
}

function tieGame() {
  let tie = `Game over. It's a tie!`;
  document.getElementById("btext").innerText = tie;
}

/*************************************************************************************** */
//****   Check if GAME  Mancala board to make sure there are values in PITS  ********/

function checkBoard() {
//   console.log(gamePlaying);
  score[0] = mancalaBoard[6];
  score[1] = mancalaBoard[13];
  console.log("Current Score for Player 1 = ", score[0])
  console.log("Current Score for Player 2 = ", score[1]);
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
    score[0] = mancalaBoard[6] += sum1;
    score[1] = mancalaBoard[13] += sum2;
    mancalaBoard = [0,0,0,0,0,0, score[0],0,0,0,0,0,0,score[1]];
    document.querySelector("#\\36 ").innerText = score[0];
    document.querySelector("#\\31 3").innerText = score[1];
    [...document.querySelector("div.row.pit-0").children].forEach(button => button.setAttribute("disabled", "true"));
    [...document.querySelector("div.row.pit-0").children].forEach(button => button.innerText = '0');
    [...document.querySelector("div.row.pit-1").children].forEach(button => button.setAttribute("disabled", "true"));
    [...document.querySelector("div.row.pit-1").children].forEach(button => button.innerText = '0');
    // console.log("One of the pit sides is empty");
    // console.log(gamePlaying,"Player 1 Score - " + mancalaBoard[6],"Player 2 Score - " + mancalaBoard[13]);

    if (score[0] > score[1]) {
      gameOver.play();
      // console.log("player 1 wins with score " + score[6]);
      gameOver.addEventListener(
        "ended",
        function() {
          p1Wins();
        },
        false
      );
    } else if (score[1] > score[0]){
        // console.log("player 2 wins with score " + score[13]);
        gameOver.play();
        gameOver.addEventListener('ended', function() {
          p2Wins();
      }, false)
    } else if (score[1] === score[0]) {
      gameOver.play();
      tieGame();
    }
  }
}



function pickCapture(position) {
  if (gamePlaying == true && position !== undefined) {
    console.log('<<Dropped into PickCapture!>>')
    // debugger;
    let inverse = 0;
    let boost = 0;
    if (activePlayer === 0){
  
      switch (position % 14) {
        case 0:
          console.log("the switch is working 0 - 12");
          inverse = 12;
          boost = mancalaBoard[position % 14] + mancalaBoard[inverse];
    
          if (mancalaBoard[inverse] !== 0) {
            console.log("Boost bout to happen...");
            mancalaBoard[position % 14] = 0;
            mancalaBoard[inverse] = 0;
            mancalaBoard[6] += boost;
            console.log("Play was BOOSTED = " + boost);
          }
    
          break;
        case 1:
          console.log("the switch is working 1 - 11");
          inverse = 11;
          boost = mancalaBoard[position % 14] + mancalaBoard[inverse];
          if (mancalaBoard[inverse] !== 0) {
            console.log("Boost bout to happen...");
            mancalaBoard[position % 14] = 0;
            mancalaBoard[inverse] = 0;
            mancalaBoard[6] += boost;
            console.log("Play was BOOSTED = " + boost);
          }
    
          break;
        case 2:
          console.log("the switch is working 2 - 10");
          inverse = 10;
          // console.log('the boost = '+ boost)
          boost = mancalaBoard[position % 14] + mancalaBoard[inverse];
          if (mancalaBoard[inverse] !== 0) {
            console.log("Boost bout to happen...");
            mancalaBoard[position % 14] = 0;
            mancalaBoard[inverse] = 0;
            mancalaBoard[6] += boost;
            console.log("Play was BOOSTED = " + boost);
          }
    
          break;
        case 3:
          console.log("the switch is working 3 - 9");
          inverse = 9;
          boost = mancalaBoard[position % 14] + mancalaBoard[inverse];
          if (mancalaBoard[inverse] !== 0) {
            console.log("Boost bout to happen...");
            mancalaBoard[position % 14] = 0;
            mancalaBoard[inverse] = 0;
            mancalaBoard[6] += boost;
            console.log("Play was BOOSTED = " + boost);
          }
    
          break;
        case 4:
          console.log("the switch is working 4 - 8");
          inverse = 8;
          boost = mancalaBoard[position % 14] + mancalaBoard[inverse];
    
          if (mancalaBoard[inverse] !== 0) {
            console.log("Boost bout to happen...");
            mancalaBoard[position % 14] = 0;
            mancalaBoard[inverse] = 0;
            mancalaBoard[6] += boost;
            console.log("Play was BOOSTED = " + boost);
          }
    
          break;
        case 5:
          console.log("the switch is working 5 - 7");
          inverse = 7;
          boost = mancalaBoard[position % 14] + mancalaBoard[inverse];
          if (mancalaBoard[inverse] !== 0) {
            console.log("Boost bout to happen...");
            mancalaBoard[position % 14] = 0;
            mancalaBoard[inverse] = 0;
            mancalaBoard[6] += boost;
            console.log("Play was BOOSTED = " + boost);
          }
          break;
        default:
          console.log("<< Not on your side - its not your pie! >>");
          break;
      }
    } 
    else if (activePlayer === 1) {
  
      switch (position % 14) {
        case 7:
          console.log("the switch is working 7 - 5");
          inverse = 5;
          boost = mancalaBoard[position % 14] + mancalaBoard[inverse];
    
          if (mancalaBoard[inverse] !== 0) {
            console.log("Boost bout to happen...");
            mancalaBoard[position % 14] = 0;
            mancalaBoard[inverse] = 0;
            mancalaBoard[13] += boost;
            console.log("Play was BOOSTED = " + boost);
          }
          break;
        case 8:
          console.log("the switch is working 8 - 4");
          inverse = 4;
          boost = mancalaBoard[position % 14] + mancalaBoard[inverse];
    
          if (mancalaBoard[inverse] !== 0) {
            console.log("Boost bout to happen...");
            mancalaBoard[position % 14] = 0;
            mancalaBoard[inverse] = 0;
            mancalaBoard[13] += boost;
            console.log("Play was BOOSTED = " + boost);
          }
          break;
        case 9:
          console.log("the switch is working 9 - 3");
          inverse = 3;
          boost = mancalaBoard[position % 14] + mancalaBoard[inverse];
    
          if (mancalaBoard[inverse] !== 0) {
            console.log("Boost bout to happen...");
            mancalaBoard[position % 14] = 0;
            mancalaBoard[inverse] = 0;
            mancalaBoard[13] += boost;
            console.log("Play was BOOSTED = " + boost);
          }
          break;
        case 10:
          console.log("the switch is working 10 - 2");
          inverse = 2;
          boost = mancalaBoard[position % 14] + mancalaBoard[inverse];
    
          if (mancalaBoard[inverse] !== 0) {
            console.log("Boost bout to happen...");
            mancalaBoard[position % 14] = 0;
            mancalaBoard[inverse] = 0;
            mancalaBoard[13] += boost;
            console.log("Play was BOOSTED = " + boost);
          }
          break;
        case 11:
          console.log("the switch is working 11 - 1");
          inverse = 1;
          boost = mancalaBoard[position % 14] + mancalaBoard[inverse];
    
          if (mancalaBoard[inverse] !== 0) {
            console.log("Boost bout to happen...");
            mancalaBoard[13] += boost;
            mancalaBoard[position % 14] = 0;
            mancalaBoard[inverse] = 0;
            console.log("Play was BOOSTED = " + boost);
          }
          break;
        case 12:
          console.log("the switch is working 12 - 0");
          inverse = 0;
          boost = mancalaBoard[position % 14] + mancalaBoard[inverse];
    
          if (mancalaBoard[inverse] !== 0) {
            console.log("Boost bout to happen...");
            mancalaBoard[13] += boost;
            mancalaBoard[position % 14] = 0;
            mancalaBoard[inverse] = 0;
            console.log("Play was BOOSTED = " + boost);
          }
          break;
        default:
          console.log("<< Not on your side - its not your pie! >>");
          break;
      }
    }
  }
  // checkBoard();
}