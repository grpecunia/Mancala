function superEasy(event) { //easiest
    console.log('super easy')
    let x = Math.floor(Math.random() * 6 + 7);
    while (document.getElementById(x).attributes.disabled && document.getElementById(x).innerText != '0') {
        console.log(x)
        // console.log("Jamming with them nomeis");
        x = Math.floor(Math.random() * 6 + 7);
      }

    // console.log('Random Index from 7 - 12 for Computer = ['+x+']')
    // console.log(document.getElementById(x).attributes.disabled);
    // console.log('X is = ' + x)
    // console.log('X after second term is = ' + x)
    // document.getElementById(x).click(event);
    //   let stoneCount = Number(mancalaBoard[Number(event.target.id)]);
    //   let conditional = Number(event.target.attributes.id.value) + stoneCount;
    //   let position;
    //   for (let i = Number(event.target.attributes.id.value); i <= conditional; i++) {
    //     ++mancalaBoard[i % 14];
    //     position = conditional;
    //   }
    //   mancalaBoard[event.target.attributes.id.value] = 0;
    pickPeice(event, x)
}


function isEasy(event) { //hardest
  for (let i = 7; i <= 12; i++) {
    console.log("bucket", mancalaBoard[i], i);
    if (13 - i === mancalaBoard[i]) {
      console.log("take index", i);
      return pickPeice(event, i);

    }
  }
  console.log("no first");
  //pickPeice(event, 13);
  isLittleEasier(event);
}

function isLittleEasier(event){ //medium
  for (let i = 7; i <= 12; i++) {
    console.log("bucket again", mancalaBoard[i], i);
    if (13 - i === mancalaBoard[i] + 1) {
      console.log("second best", i);
      return pickPeice(event, i);
    }

  }
  superEasy(event)

}


function pickPeice(event, x){
        console.log("picking peice ",x)
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
        mancalaBoard[event.target.attributes.id.value] = 0;
}