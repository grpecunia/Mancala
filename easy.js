function isEasy(event) {
    let x = Math.floor(Math.random() * 6 + 7);
    while (document.getElementById(x).attributes.disabled) {
        console.log("Jamming with them nomeis");
        x = Math.floor(Math.random() * 6 + 7);
      }

    console.log('Random Index from 7 - 12 for Computer = ['+x+']')
    // console.log(document.getElementById(x).attributes.disabled);
    // console.log('X is = ' + x)
    // console.log('X after second term is = ' + x)
    document.getElementById(x).click(event);
      let stoneCount = Number(mancalaBoard[Number(event.target.id)]);
      let conditional = Number(event.target.attributes.id.value) + stoneCount;
      let position;
      for (let i = Number(event.target.attributes.id.value); i <= conditional; i++) {
        ++mancalaBoard[i % 14];
        position = conditional;
      }
      mancalaBoard[event.target.attributes.id.value] = 0;
}
