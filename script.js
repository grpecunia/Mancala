  document.querySelector('#start-button').onclick = function() {
      this.remove()  //removes start button
      document.querySelector("body > div").remove()
      startGame() //calls startGame
    }

const canvas = document.querySelector('#canvas'); //Get the canvas
var img = new Image(); //load an image element

canvas.width = 1100
canvas.height = 600

// document.querySelector('#start-button').click();

const ctx = canvas.getContext('2d');

function startGame(){  
    console.log("START") 
    img.onload = function() {  //Load the board for the first time 
       ctx.drawImage(img, board.x, board.y, board.width, board.height); 
    }
    img.src = "assets/mancala.png";
  
    window.requestAnimationFrame(animate) //Starts the animation infinite loop
  }

  function drawBoard() {
    ctx.fillStyle = 'green'
    ctx.fillRect(0,0,canvas.width, canvas.height) //draws the green grass 
  }

  let board = {
    x: 100,
    y: 100,
    width: 1000,
    height: 300
  };

  function drawBoard() {
    ctx.drawImage(img, board.x, board.y, board.width, board.height); //draws the board depending on the coords in the obj above 
//     ctx.font = "32px OpenSans";
//     ctx.fillText(`Gameplay - 1. The game begins with one player picking up all of the pieces in any one of the pockets on his/her side.
// 2. Moving counter-clockwise, the player deposits one of the stones in each pocket until the stones run out.
// 3. If you run into your own Mancala (store), deposit one piece in it. If you run into your opponent's Mancala, skip it and
//  continue moving to the next pocket.
// 4. If the last piece you drop is in your own Mancala, you take another turn.
// 5. If the last piece you drop is in an empty pocket on your side, you capture that piece and any pieces in the pocket directly
// opposite.`, 200, 500);
  }

  function animate(){
    let loop = window.requestAnimationFrame(animate) //continues the loop
    
    ctx.clearRect(0,0,canvas.width, canvas.height) //clears the whole canvas, the car, the board everything in the canvas
    drawBoard()  //redraws the board over and over and over again
  }