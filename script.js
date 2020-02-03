  document.querySelector('#start-button').onclick = function() {
      this.remove()  //removes start button
      document.querySelector("body > div").remove()
      startGame() //calls startGame
    //   grab();// function that grabs the whole
    }

const canvas = document.querySelector('#canvas'); //Get the canvas
var img = new Image(); //load an image element

canvas.width = window.innerWidth - 15; //MAC
canvas.height = window.innerHeight - 20; //MAC

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

let mancalaBoard = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0]
];
console.log(mancalaBoard);

var activePlayer = 0;

  let board = {
    x: canvas.width / 2 - 500,
    y: canvas.height / 2 - 150,
    width: 1000,
    height: 300
  };

  function drawBoard() {
    ctx.drawImage(img, board.x, board.y, board.width, board.height); //draws the board depending on the coords in the obj above 
    mancalaBoard = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0]

  }

  function grab (i) {
      document.onclick = function (e) {
          
      }
      console.log(mancalaBoard)
      mancalaBoard[i] = 0
      mancalaBoard[i+1]++
      mancalaBoard[i+2]++
      mancalaBoard[i+3]++
      mancalaBoard[i+4]++
      console.log(mancalaBoard, i)
    //   document.onclick = function (e) {
    //       console.log(e)
    //   }
  }


  function animate(){
    let loop = window.requestAnimationFrame(animate) //continues the loop
    
    ctx.clearRect(0,0,canvas.width, canvas.height) //clears the whole canvas, the car, the board everything in the canvas
    drawBoard()  //redraws the board over and over and over again
    
  }