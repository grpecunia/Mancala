  document.querySelector('#start-button').onclick = function() {
      this.remove()  //removes start button
      document.querySelector("body > div").remove()
      document.querySelector("header > h1").remove()
      startGame() //calls startGame
    //   grab();// function that grabs the whole
    }

const canvas = document.querySelector('#canvas'); //Get the canvas
var img = new Image(); //load an image element

canvas.width = window.innerWidth - 15; //MAC
canvas.height = window.innerHeight - 20; //MAC

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

  // function drawSquares() {
  // ctx.rect(180, 185, 75, 100);
  // ctx.rect(275, 185, 75, 100);
  // ctx.rect(370, 185, 75, 100);
  // ctx.rect(470, 185, 75, 100);
  // ctx.rect(560, 185, 75, 100);
  // ctx.rect(650, 185, 75, 100);
  // ctx.rect(185, 315, 75, 100);
  // ctx.rect(275, 315, 75, 100);
  // ctx.rect(365, 315, 75, 100);
  // ctx.rect(465, 315, 75, 100);
  // ctx.rect(555, 315, 75, 100);
  // ctx.rect(650, 315, 75, 100);
  // ctx.rect(85, 190, 80, 220);//mancala 1 location
  // ctx.rect(740, 190, 80, 220);// mancala 2 location
  // ctx.stroke();
  // }

  document.onclick = boxClick

  function boxClick(e) {
    if (e.x >= 180 && e.x <= 255 && e.y >= 185 && e.y <= 285)
    console.log('you clicked box12!');
    if (e.x >= 275 && e.x <= 350 && e.y >= 185 && e.y <= 285)
    console.log('you clicked box11!');
    if (e.x >= 370 && e.x <= 445 && e.y >= 185 && e.y <= 285)
    console.log('you clicked box10!');
    if (e.x >= 470 && e.x <= 545 && e.y >= 185 && e.y <= 285)
    console.log('you clicked box9!');
    if (e.x >= 560 && e.x <= 635 && e.y >= 185 && e.y <= 285)
    console.log('you clicked box8!');
    if (e.x >= 650 && e.x <= 725 && e.y >= 185 && e.y <= 285)
    console.log('you clicked box7!');
    if (e.x >= 185 && e.x <= 260 && e.y >= 315 && e.y <= 415)
    console.log('you clicked box0!');
    if (e.x >= 275 && e.x <= 350 && e.y >= 315 && e.y <= 415)
    console.log('you clicked box1!');
    if (e.x >= 365 && e.x <= 440 && e.y >= 315 && e.y <= 415)
    console.log('you clicked box2!');
    if (e.x >= 465 && e.x <= 540 && e.y >= 315 && e.y <= 415)
    console.log('you clicked box3!');
    if (e.x >= 555 && e.x <= 630 && e.y >= 315 && e.y <= 415)
    console.log('you clicked box4!');
    if (e.x >= 650 && e.x <= 725 && e.y >= 315 && e.y <= 415)
    console.log('you clicked box5!');
    }



  function animate(){
    let loop = window.requestAnimationFrame(animate) //continues the loop
    
    ctx.clearRect(0,0,canvas.width, canvas.height) //clears the whole canvas, the car, the board everything in the canvas
    drawBoard()  //redraws the board over and over and over again
    // drawSquares()
  }