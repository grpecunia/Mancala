function isEasy(event) {
    let options = [];
    for (let i = 7; i <= 6; i++) {
        options.push(mancalaBoard[i]);
    }
      mancalaBoard.forEach(option => {
        if (option > 0) {
          options.push(option)
        } 
      });
    console.log(options)
    let x = Math.floor(Math.random() * 6 + 7);
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
    
      // validateTurn(position);
      // console.log("POS IN computer TURN -=-= " + position, 
      // 'index is equal to mancalaBoard['+position%14+']');

    
}
