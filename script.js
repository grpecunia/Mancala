  document.querySelector('#start-button').onclick = function() {
      this.remove()  //removes start button
      document.querySelector("body > div").remove()
      document.querySelector("header > h1").remove()
      startGame() //calls startGame
    //   grab();// function that grabs the whole
    }

const canvas = document.querySelector('#canvas'); //Get the canvas
var img = new Image(); //load an image element

<<<<<<< HEAD
canvas.width = window.innerWidth - 15; //MAC
canvas.height = window.innerHeight - 20; //MAC
=======
canvas.width = 900;
canvas.height = 500;
>>>>>>> 8b61f752c54474bba336171b5e749f7bc7c71304

document.querySelector('#start-button').click();

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

  function drawBoard() {
    ctx.fillStyle = 'none';
    ctx.fillRect(0,0,canvas.width, canvas.height) //draws the green grass 
  }

  let board = {
    x: 75,
    y: 150,
    width: 750,
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
    // drawSquares()
  }