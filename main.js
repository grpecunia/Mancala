var mancalaBoard, activePlayer, score;

function init() {
    mancalaBoard = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0]
    score = [mancalaBoard[6],mancalaBoard[13]];
    activePlayer = 0;
    document.querySelector("#start-button").remove();
    document.querySelector("body > header > div.rules").remove();
    document.querySelector(
      "body > div.container > div > div.col > div:nth-child(1)"
    ).classList.add('active')
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
    console.log("Start");
}

document.querySelector("#start-button").addEventListener('click', init)


function move(loc) {
    document.onclick = function(e) {
      console.log(e.target.innerHTML, e.target);
    };
}

