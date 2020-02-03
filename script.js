  document.querySelector('#start-button').onclick = function() {
      this.remove()  //removes start button
      startGame() //calls startGame
    }

const canvas = document.querySelector('#canvas'); //Get the canvas
var img = new Image(); //load an image element

canvas.width = 800
canvas.height = 600

// document.querySelector('#start-button').click();

const ctx = canvas.getContext('2d');

function startGame(){  
    console.log("START") 
    img.onload = function() {  //Load the board for the first time 
       ctx.drawImage(img, board.x, board.y, board.width, board.height); 
    }
    img.src = "assets/board2.png";
  
    window.requestAnimationFrame(animate) //Starts the animation infinite loop
  }

  function drawBoard() {
    ctx.fillStyle = 'green'
    ctx.fillRect(0,0,canvas.width, canvas.height) //draws the green grass 
  }

  let board = {  
    x:100,
    y:200,
    width: 550,
    height: 200
  }

  function drawBoard() {
    ctx.drawImage(img, board.x, board.y, board.width, board.height); //draws the car depending on the coords in the obj above 
  }

  function animate(){
    let loop = window.requestAnimationFrame(animate) //continues the loop
    
    ctx.clearRect(0,0,canvas.width, canvas.height) //clears the whole canvas, the car, the board everything in the canvas
    drawBoard()  //redraws the board over and over and over again
  }