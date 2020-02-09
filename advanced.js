function isAdvanced(event) {
  //hardest
  for (let i = 7; i <= 12; i++) {
    // console.log("bucket", mancalaBoard[i], i);
    if (1 === mancalaBoard[i] && i == 12) {
      console.log("Optimal Option available and Executed with Pick @ Index ", i);
      return pickPiece(event, i);
    }
  }
  // console.log("no first");
  //pickPiece(event, 13);
  advRoundTwo(event);
}

function advRoundTwo(event) {
  //medium
  for (let i = 7; i <= 12; i++) {
    // console.log("bucket again", mancalaBoard[i], i);
    if (13 - i === mancalaBoard[i % 14] && mancalaBoard[i % 14] !== 0) {
      console.log("Second Optimal Option Executed with Pick @ Index ", i);
      return pickPiece(event, i);
    }
    // debugger;
  }
  advRoundThree(event);
}

function advRoundThree(event) {
  //medium
  for (let i = 7; i <= 12; i++) {
    // console.log("bucket again", mancalaBoard[i], i);
    if (mancalaBoard[i % 14] === 1 && mancalaBoard[(i % 14) + 1] == 0) {
      console.log("Third Optimal Option Executed with Pick @ Index ", i);
      return pickPiece(event, i);
    }
    // debugger;
  }
  advRoundFour(event);
}


function advRoundFour(event) {
  //medium
  for (let i = 7; i <= 12; i++) {
    // console.log("bucket again", mancalaBoard[i], i);
    if (mancalaBoard[i % 14] >= 6 && mancalaBoard[i % 14] !== 0) {
    
      console.log("Forth Option Executed with Pick @ Index ", i);
      return pickPiece(event, i);
    }
    // debugger;
  }
  advRoundFive(event);
}

function advRoundFive (event) {
  //medium
  for (let i = 7; i <= 12; i++) {
    // console.log("bucket again", mancalaBoard[i], i);
    if (13 - i === mancalaBoard[i % 14] + 1 && mancalaBoard[i % 14] !== 0) {
      console.log("Fifth Option Executed with Pick @ Index ", i);
      return pickPiece(event, i);
    }
    // debugger;
  }
  advRoundSix(event);
}



function advRoundSix(event) {
  //medium
  for (let i = 7; i <= 12; i++) {
    // console.log("bucket again", mancalaBoard[i], i);
    if (12 - i === mancalaBoard[i % 14] && mancalaBoard[i % 14] !== 0) {
      console.log("Sixth Option Executed with Pick @ Index ", i);
      return pickPiece(event, i);
    }
    // debugger;
  }
  isEasy(event);
}