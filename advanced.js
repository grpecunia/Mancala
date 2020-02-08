function isAdvanced(event) {
  //hardest
  for (let i = 7; i <= 12; i++) {
    // console.log("bucket", mancalaBoard[i], i);
    if (13 - i === mancalaBoard[i%14]) {
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
    if (13 - i === mancalaBoard[i%14] + 1 && mancalaBoard[i%14] !== 0) {
      console.log("Second Option Executed with Pick @ Index ", i);
      return pickPiece(event, i);
    }
    // debugger;
  }
  isEasy(event);
}