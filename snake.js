//snake

const GRID_SIZE = 50;
const MOVE_DELAY = 4;
const MAX_TIME = 600000;
let gameState = "start";
let moveAmount;

class Snake {
  constructor() {
    this.spawn();
  }

  spawn() {
    this.bodyArray = [];
    this.bodyArray.push({x: width/2, y: height/2});
    this.direction = "right";
    this.lastX = width/2;
    this.lastY = height/2;
    this.score = 0;
    moveAmount = width/GRID_SIZE;
  }

  makeSnake() {
    push();
    fill("blue");
    for (let bodyPart of this.bodyArray) {
      rect(bodyPart.x, bodyPart.y, width/GRID_SIZE);
    }
    pop();
  }

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

  grow() {
    this.bodyArray.push({x:this.lastX, y:this.lastY});
  }

  hasEatenFood() {
    if (this.bodyArray[0].x >=food.x && this.bodyArray[0].x < food.x + 1
      && this.bodyArray[0].y >=food.y && this.bodyArray[0].y < food.y+1) {
      food.spawnFood();
      this.grow();
      this.score++;
    }
  }

  displayScore() {
    push();
    text(this.score, width-100, 100);
    textSize(50);
    pop();
  }

  timeTrial() {
    let ms = millis();
    if (this.score === 100 && ms < MAX_TIME) {
      gameState = "WIN";
    }

    else if (ms>MAX_TIME) {
      gameState = "LOSE";
    }
  }

  edges() {
    if (this.bodyArray[0].x > width) {
      this.bodyArray[0].x = width/GRID_SIZE * this.bodyArray.length-2;
    }
  }
}

class Consumable {
  constructor() {
    this.spawnFood();
  }

  spawnFood() {
    let xLocation = width/2;
    let yLocation = height/2;
    this.x = xLocation + width/GRID_SIZE * random(GRID_SIZE/2);
    this.y = yLocation + height/GRID_SIZE * random(GRID_SIZE/2);
  }

  render() {
    push();
    fill("red");
    rect(this.x, this.y, width/GRID_SIZE);
    pop();
  }
}

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

function snakeStuff(playerName) {
  if (gameState === "start") {
    playerName.updateSnake();
    food.render();
    playerName.makeSnake();
    playerName.hasEatenFood();
    playerName.displayScore();
    playerName.timeTrial();
    playerName.edges();
  }
  if (gameState === "WIN") {
    push();
    text("You Win!", width/2, height/2);
    textSize(100);
    textAlign(CENTER);
    pop();
  }
}