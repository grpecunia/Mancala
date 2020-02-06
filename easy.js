function isEasy() {
    document.getElementById((Math.round((Math.random()*6)+6))).click()
    document.querySelector("div.row.pit-1").onclick = function(e) {
      let stoneCount = Number(mancalaBoard[Number(e.target.id)]);
      let conditional = Number(e.target.attributes.id.value) + stoneCount;
      let position;
      for (let i = Number(e.target.attributes.id.value); i <= conditional; i++) {
        ++mancalaBoard[i % 14];
        position = conditional;
      }
      mancalaBoard[e.target.attributes.id.value] = 0;
      validateTurn(position);
    }
}
