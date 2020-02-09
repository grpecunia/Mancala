function isEasy(event) { //easiest
    console.log('Random PICK Selection is Triggered')
    let x = Math.floor(Math.random() * 6 + 7);
    while (document.getElementById(x).attributes.disabled ) { //&& document.getElementById(x).innerText != '0'
        console.log('Random Value Iterator looking for options...')
        x = Math.floor(Math.random() * 6 + 7);
      }
    pickPiece(event, x)
}

function pickPiece(event, x){
  if (gamePlaying == true) {
    console.log("Picking Position in Index ",x)
    console.log("The Picked Position had a value of ", mancalaBoard[x]);
    document.getElementById(x).click(event);
    let stoneCount = Number(mancalaBoard[Number(event.target.id)]);
    let conditional = Number(event.target.attributes.id.value) + stoneCount;
    let position;
    for (
      let i = Number(event.target.attributes.id.value);
      i <= conditional;
      i++
    ) {
      ++mancalaBoard[i % 14];
      position = conditional;
    }
  }
  mancalaBoard[event.target.attributes.id.value] = 0;
}