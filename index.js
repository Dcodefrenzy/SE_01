const  express = require('express'); 
const app  = express();
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});





//Created a list of input manually 
const numbers = [[1,4,2,3], [5,6,7,8], [9,10,11,12], [13, 14, 15, 0]];
const orderedNumbers = [[0,1,2,3], [4,5,6, 7], [8,9,10,11], [12,13,14, 15]];


//A function to get the position of the number to be moved
const getPosition =(numbers, number )=>{
  for (let x = 0; x < numbers.length; x++) {
        for (let y = 0; y < numbers[x].length; y++) {
          if (numbers[x][y] === 0) {
            return {x:x, y:y}
          }
        }
    
  }
}


// a function to move a tile, this check for the kex pressed and move accordingly
function moveTile(move) {
  if (comparePuzzle(numbers, orderedNumbers)) {
    console.log("You won!!!!!!!")
    rl.close();
  }else {
    if (move === "UP" || move === "U" || move === "u" ) {
      up()
    }else if (move === "DOWN" || move === "D" || move === "d") {
      down()
    }else if (move === "RIGHT" || move === "R" || move === "r") {
      right()
    }else if (move === "LEFT" || move === "L" || move === "l") {
      left()
    }
  }
}

//Moves the number downwards
function down() {
  const position = getPosition(numbers, 0);
  if (position.x - 1 < 0 ) {
      console.log("cant move")
  }else{
    swapPosition(position, {x:position.x -1, y:position.y})
  }

}

//Moves the number upwards
function up (){
  const position = getPosition(numbers, 0);
  if (position.x + 1 > 3 ) {
      console.log("cant move")
  }else{
    swapPosition(position, {x:position.x + 1, y:position.y})
  }

}

//Moves the number to the right position
function right(){
  const position = getPosition(numbers, 0);
  if (position.y - 1 < 0 ) {
      console.log("cant move")
  }else{
    swapPosition(position, {x:position.x, y:position.y -1})
  }

}

//Moves the number leftwards
function left() {
  const position = getPosition(numbers, 0);
  if (position.y + 1 > 3 ) {
      console.log("cant move")
  }else{
    swapPosition(position, {x:position.x, y:position.y +1})
  }

}

//Swap the position of 0 and the numbers it wants to swap with.
const swapPosition = (oldPosition, newPosition)=>{
  numbers[oldPosition.x][oldPosition.y] = numbers[newPosition.x][newPosition.y];
  numbers[newPosition.x][newPosition.y] = 0
  for (let index = 0; index < numbers.length; index++) {
    console.log(numbers[index])
    
  }
}

//checks if the puzzle is sorted in order
function comparePuzzle(unordered, ordered) {
  if (unordered.length !== ordered.length) {
    return false;
  }else{
    for (let index = 0; index < unordered.length; index++) {
        for (let j = 0; j < unordered[index].length; j++) {
          if (unordered[index][j] === ordered[index][j]) {
            return true;
          }
          else{
            return false;
          }
          
        }
    }
  }

}


function startGame() {
  rl.question("Your Move ? ", function(move) {
    moveTile(move);
    if (comparePuzzle(numbers, orderedNumbers)) {
      console.log("You won!!!!!!!")
      return rl.close();
    }else{
      startGame()
    }
  });
    
}


rl.on("close", function() {
  console.log("\nBYE BYE !!!");
  process.exit(0);
});


app.listen(3000, () => {
    
    console.log("Starting the game, You can only move either R(Right), L(Left), U(Up), D(Down)");
    console.log("PUZZLE!!!!!!!!!!!!!!!!!!!!!!!");

    rl.question("Start Game ? ", function(answer) {
      if (answer === "YES" || answer === "Yes" || answer === "y" || answer === "Y") {   
        for (let i = 0; i < numbers.length; i++) {
          console.log(numbers[i]);
        }

        startGame()
      } else {
        console.log("Game Over!!")
      return rl.close();
      }
    });
  });