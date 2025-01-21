//snake


//initializing the variables
const GRID_SIZE = 24;
const MOVE_DELAY = 4;
const MAX_TIME = 600000;
let gameState;
let moveAmount;


//player class
class Snake {
  constructor() {
    //running function when a new snake is created
    this.spawn();
  }

  //makes the initial snake and the initial coordinates
  spawn() {
    this.bodyArray = [];
    this.bodyArray.push({x: width/2, y: height/2});
    this.direction = "none";
    this.lastX = width/2;
    this.lastY = height/2;

    //resets the score
    this.score = 0;
    moveAmount = width/GRID_SIZE;
  }

  //displays the snake/player
  makeSnake() {
    push();
    fill("blue");
    for (let bodyPart of this.bodyArray) {
      rect(bodyPart.x, bodyPart.y, width/GRID_SIZE);
    }
    pop();
  }

  //updates the snake for movement purposes
  updateSnake() {
    this.lastX = this.bodyArray[this.bodyArray.length-1].x;
    this.lastY = this.bodyArray[this.bodyArray.length-1].y;
    for (let i = this.bodyArray.length-1; i>=1; i--) {
      this.bodyArray[i].x = this.bodyArray[i-1].x;
      this.bodyArray[i].y = this.bodyArray[i-1].y;
    }


    if (this.direction === "right") {
      if (frameCount % MOVE_DELAY === 0) {
        this.bodyArray[0].x += moveAmount;
      }
    }

    else if (this.direction === "down") {
      if (frameCount % MOVE_DELAY === 0) {
        this.bodyArray[0].y += moveAmount;
      }
    }

    else if (this.direction === "left") {
      if (frameCount % MOVE_DELAY === 0) {
        this.bodyArray[0].x -= moveAmount;
      }
    }

    else if (this.direction === "up") {
      if (frameCount % MOVE_DELAY === 0) {
        this.bodyArray[0].y -= moveAmount;
      }
    }
  }

  //adds more parts to the snake when food is eaten
  grow() {
    this.bodyArray.push({x:this.lastX, y:this.lastY});
  }

  //checks to see if the food has been "eaten"
  hasEatenFood() {
    if (round(this.bodyArray[0].x, 1) === round(food.x, 1) && round(this.bodyArray[0].y, 1) === round(food.y, 1)) {
      snakeEatingSound.play();
      food.spawnFood();
      this.grow();
      this.score++;
    }
  }

  //displays the score on the top right of the canvas
  displayScore() {
    push();
    text(this.score, width-100, 100);
    textSize(50);
    pop();
  }

  //the game is timed as to make it so you must reach a certain score within 5 minutes
  timeTrial() {
    let ms = millis();
    if (this.score === 100 && ms < MAX_TIME) {
      gameState = "WIN";
    }

    else if (ms>MAX_TIME) {
      gameState = "LOSE";
    }
  }

  //moves the snakes head when an edge of the canvas is touched
  edges() {
    if (this.bodyArray[0].x > width) {
      this.bodyArray[0].x = 0;
    }

    if (this.bodyArray[0].x < 0) {
      this.bodyArray[0].x = width;
    }

    if (this.bodyArray[0].y > height) {
      this.bodyArray[0].y = 0;
    }

    if (this.bodyArray[0].y < 0) {
      this.bodyArray[0].y = height;
    }
  }
}


//food class
class Consumable {
  constructor() {
    //running the spawn function when a new food is made
    this.spawnFood();
  }

  //gives the food a random location
  spawnFood() {
    let randX = random(width);
    let randY = random(height);
    this.x = randX - randX % (width / GRID_SIZE);
    this.y = randY - randY % (height / GRID_SIZE);
  }

  //displays the food
  render() {
    push();
    fill("red");
    rect(this.x, this.y, width/GRID_SIZE);
    pop();
  }
}

//button to start the game
function createSnakeButton() {
  snakeGameButton = createButton("Start Game");
  snakeGameButton.position(windowWidth/2-buttonSize/2, height/2);
  snakeGameButton.size(buttonSize, buttonSize/4);
  snakeGameButton.mousePressed(startGame);
}

//function for the button to run when it is pressed
function startGame() {
  buttonPressedSound.play();
  gameState = "Start Game";
  snakeTitleMusic.stop();
  snakeBackgroundMusic.loop();
}

//creates the grid (will be removed in final product)
function createGrid() {
  for (let x = 0; x < width; x += width / GRID_SIZE) {
    for (let y = 0; y < height; y += height / GRID_SIZE) {
      stroke(0);
      strokeWeight(1);
      line(x, 0, x, height);
      line(0, y, width, y);
    }
  }
}

//snake related function calls and whatnot
function snakeStuff(playerName) {

  //start screem
  if (gameState === "start") {
    background("lightgreen");
    push();
    textSize(100);
    text("Snake", width/2-textWidth("Snake")/2, height/3);
    pop();
    snakeGameButton.show();
  }

  //starting the game
  else if (gameState === "Start Game") {
    playerName.updateSnake();
    food.render();
    playerName.makeSnake();
    playerName.hasEatenFood();
    playerName.displayScore();
    playerName.timeTrial();
    playerName.edges();
    snakeGameButton.hide();
  }

  //you won!
  else if (gameState === "WIN") {
    if (!universalWinMusic.isPlaying()) {
      universalWinMusic.loop();
    }
    push();
    text("You Win!", width/2-textWidth("You Win!")/2, height/2);
    textSize(100);
    pop();
    snakeGameButton.hide();
    snakeBackgroundMusic.stop();
  }

  //you lost!
  else if (gameState === "LOSE") {
    if (!universalLoseMusic.isPlaying()) {
      universalLoseMusic.loop();
    }
    push();
    text("You Lose!", width/2-textWidth("You Lose!")/2, height/2);
    textSize(100);
    pop();
    snakeGameButton.hide();
    snakeBackgroundMusic.stop();
  }
}