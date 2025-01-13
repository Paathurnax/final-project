//snake

const GRID_SIZE = 50;
const MOVE_DELAY = 5;

class Snake {
  constructor() {
    this.bodyArray = [];
    this.bodyArray.push({x: width/2, y: height/2});
    this.direction = "right";
    this.lastX = width/2;
    this.lastY = height/2;
    this.score = 0;
  }

  makeSnake() {
    fill("blue");
    for (let bodyPart of this.bodyArray) {
      rect(bodyPart.x, bodyPart.y, width/GRID_SIZE/2, height/GRID_SIZE);
    }
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
        this.bodyArray[0].x += width/GRID_SIZE/2;
      }
    }

    else if (this.direction === "down") {
      if (frameCount % MOVE_DELAY === 0) {
        this.bodyArray[0].y += height/GRID_SIZE;
      }
    }

    else if (this.direction === "left") {
      if (frameCount % MOVE_DELAY === 0) {
        this.bodyArray[0].x -= width/GRID_SIZE/2;
      }
    }

    else if (this.direction === "up") {
      if (frameCount % MOVE_DELAY === 0) {
        this.bodyArray[0].y -= height/GRID_SIZE;
      }
    }
  }

  grow() {
    this.bodyArray.push({x:this.lastX, y:this.lastY})
  }

  hasEatenFood() {
    if (round(this.bodyArray[0].x, 2) === round(food.x, 2) && round(this.bodyArray[0].y, 2) === round(food.y, 2)) {
      food.spawnFood();
      this.grow();
      this.score++;
    }
  }

  displayScore() {
    text(this.score, width-100, 50);
  }
}

class Consumable {
  constructor() {
    this.spawnFood();
  }

  spawnFood() {
    let xLocation = random(width);
    let yLocation = random(height);
    this.x = xLocation - xLocation%(width/GRID_SIZE/2);
    this.y = yLocation - yLocation%(height/GRID_SIZE);
  }

  render() {
    fill("red");
    rect(this.x, this.y, width/GRID_SIZE/2, height/GRID_SIZE);
  }
}

function createGrid() {
  for (let x = 0; x < width; x += width / GRID_SIZE/2) {
    for (let y = 0; y < height; y += height / GRID_SIZE) {
      stroke(0);
      strokeWeight(1);
      line(x, 0, x, height);
      line(0, y, width, y);
    }
  }
}