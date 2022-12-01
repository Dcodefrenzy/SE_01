const  express = require('express'); 
const app  = express();



const numbers = [[1,4,2], [3,0,5,], [6,7,8]];
const orderedNumbers = [[0,1,2], [3,4,5], [6,7,8]];

const direction = ["UP", "DOWN", "LEFT", "RIGHT"];
for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i]);
  
}

const getPosition =(numbers, number )=>{
  for (let x = 0; x < numbers.length; x++) {
        for (let y = 0; y < numbers[x].length; y++) {
          if (numbers[x][y] === 0) {
            return {x:x, y:y}
          }
        }
    
  }
}



function moveTile(move) {
  if (JSON.stringify(numbers) === JSON.stringify(orderedNumbers)) {
    console.log("You won!")
  }else {
    if (move === "UP") {
      up()
    }else if (move === "DOWN") {
      down()
    }else if (move === "RIGHT") {
      right()
    }else if (move === "LEFT") {
      left()
    }
  }
}


function down() {
  const position = getPosition(numbers, 0);
  if (position.x - 1 < 0 ) {
      console.log("cant move")
  }else{
    swapPosition(position, {x:position.x -1, y:position.y})
  }

}


function up (){
  const position = getPosition(numbers, 0);
  if (position.x + 1 > 2 ) {
      console.log("cant move")
  }else{
    swapPosition(position, {x:position.x + 1, y:position.y})
  }

}


function right(){
  const position = getPosition(numbers, 0);
  if (position.y - 1 < 0 ) {
      console.log("cant move")
  }else{
    swapPosition(position, {x:position.x, y:position.y -1})
  }

}


function left() {
  const position = getPosition(numbers, 0);
  if (position.x + 1 > 2 ) {
      console.log("cant move")
  }else{
    swapPosition(position, {x:position.x, y:position.y +1})
  }

}


const swapPosition = (oldPosition, newPosition)=>{
  numbers[oldPosition.x][oldPosition.y] = numbers[newPosition.x][newPosition.y];
  numbers[newPosition.x][newPosition.y] = 0
  for (let index = 0; index < numbers.length; index++) {
    console.log(numbers[index])
    
  }
}


const moves = ["DOWN", "RIGHT", "END"]

function startGame(moves) {
  for (let index = 0; index < moves.length; index++) {

    console.log(moves[index]);
    moveTile(moves[index]);
  }  

}
app.listen(3000, () => {
    
    console.log("Listening to app at 3000")

    startGame(moves);
  });