var mancalaBoard, activePlayer, score, stoneCount, conditional, gamePlaying;

function init() {
  gamePlaying = true;
  mancalaBoard = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0];
  console.log(mancalaBoard);
  score = [mancalaBoard[6], mancalaBoard[13]];
  activePlayer = 0;
  document.querySelector("#start-button").remove();
  document.querySelector("body > header > div.rules").remove();
  document
    .querySelector("body > div.container > div > div.col > div:nth-child(1)")
    .classList.add("active");
  updateMancala();
  console.log("Start");
}

document.querySelector("#start-button").addEventListener("click", init);

function move(loc) {
    document.querySelector( "div.row.active").onclick = function(e) {
    let stoneCount = mancalaBoard[Number(e.target.attributes.id.value)];
    let conditional = Number(e.target.attributes.id.value) + stoneCount;
    let position;
    for (let i = Number(e.target.attributes.id.value); i <= Number(e.target.attributes.id.value) + stoneCount; i++) {
        mancalaBoard[i % 14]++;
        position = mancalaBoard[conditional]
      console.log('>>>>COND>>> '+conditional, '>>>>POS>>> '+position);
    }
    console.log('Position Value: ' + position);
    console.log('Value at Bucket: ' + mancalaBoard[6]);
    
    if (activePlayer === 0 && position === mancalaBoard[6]) {
      activePlayer = 0;
    } else if (activePlayer === 0 && position !== mancalaBoard[6]) {
      document
        .querySelector("div.row.pit-" + activePlayer)
        .classList.remove("active");
      activePlayer = 1;
      document
        .querySelector("div.row.pit-" + activePlayer)
        .classList.add("active");
    } else if (activePlayer === 1 && position === mancalaBoard[13]) {
      activePlayer = 1;
    } else if (activePlayer === 1 && position !== mancalaBoard[13]) {
      document
        .querySelector("div.row.pit-" + activePlayer)
        .classList.remove("active");
      activePlayer = 0;
      document
        .querySelector("div.row.pit-" + activePlayer)
        .classList.add("active");
    } else {
        console.log('sometingwong!!')
    }
    mancalaBoard[e.target.attributes.id.value] = 0;
    updateMancala();
  };
}

function updateMancala() {
  document.querySelector(
    "body > div.container > div > div.col > div:nth-child(1) > div:nth-child(6)"
  ).innerHTML = mancalaBoard[0];
  document.querySelector(
    "body > div.container > div > div.col > div:nth-child(1) > div:nth-child(5)"
  ).innerHTML = mancalaBoard[1];
  document.querySelector(
    "body > div.container > div > div.col > div:nth-child(1) > div:nth-child(4)"
  ).innerHTML = mancalaBoard[2];
  document.querySelector(
    "body > div.container > div > div.col > div:nth-child(1) > div:nth-child(3)"
  ).innerHTML = mancalaBoard[3];
  document.querySelector(
    "body > div.container > div > div.col > div:nth-child(1) > div:nth-child(2)"
  ).innerHTML = mancalaBoard[4];
  document.querySelector(
    "body > div.container > div > div.col > div:nth-child(1) > div:nth-child(1)"
  ).innerHTML = mancalaBoard[5];
  document.querySelector("#\\36 ").innerText = mancalaBoard[6];
  document.querySelector(
    "body > div.container > div > div.col > div:nth-child(2) > div:nth-child(1)"
  ).innerHTML = mancalaBoard[7];
  document.querySelector(
    "body > div.container > div > div.col > div:nth-child(2) > div:nth-child(2)"
  ).innerHTML = mancalaBoard[8];
  document.querySelector(
    "body > div.container > div > div.col > div:nth-child(2) > div:nth-child(3)"
  ).innerHTML = mancalaBoard[9];
  document.querySelector(
    "body > div.container > div > div.col > div:nth-child(2) > div:nth-child(4)"
  ).innerHTML = mancalaBoard[10];
  document.querySelector(
    "body > div.container > div > div.col > div:nth-child(2) > div:nth-child(5)"
  ).innerHTML = mancalaBoard[11];
  document.querySelector(
    "body > div.container > div > div.col > div:nth-child(2) > div:nth-child(6)"
  ).innerHTML = mancalaBoard[12];
  document.querySelector("#\\31 3").innerText = mancalaBoard[13];
}

//****   Functionality to increase and decrease Stone Count in the NavBar Modal  */
document
  .querySelector(
    "#stones > div > div > div.modal-body > button.btn.btn-outline-success"
  )
  .addEventListener("click", upStone);
document
  .querySelector(
    "#stones > div > div > div.modal-body > button.btn.btn-outline-danger"
  )
  .addEventListener("click", downStone);

function upStone() {
  document.querySelector("#stones > div > div > div.modal-body > input")
    .value++;
}

function downStone() {
  document.querySelector("#stones > div > div > div.modal-body > input")
    .value--;
}