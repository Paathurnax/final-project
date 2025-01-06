//snake

const GRID_SIZE = 100;
const MOVE_DELAY = 30;

class Grid {
  constructor() {
    if (windowHeight > windowWidth) {
      this.width = height/2;
    }
  
    else {
      this.width = width/2; 
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
  }

  displayGrid() {
    for (let x = width/4; x< this.width; x+= this.width/GRID_SIZE) {
      for (let y = width/4; y <height; y += height / GRID_SIZE) {
        stroke(0);
        strokeWeight(1);
        line(x, 0, x, height);
        line(width/4, y, this.width, y);
      }
    }
  }
}

class Snake {
  constructor() {
    this.bodyArray = [];
    this.bodyArray.push({x: width/2, y: height/2});
    this.direction = "right";
  }

  makeSnake() {
    fill("blue");
    for (let bodyPart of this.bodyArray) {
      rect(bodyPart.x, bodyPart.y, width/GRID_SIZE, height/GRID_SIZE);
    }
  }

  updateSnake() {
    if (this.direction === "right") {
      if (frameCount % MOVE_DELAY === 0) {
        this.bodyArray[0].x += width/GRID_SIZE;
      }
    }

    else if (this.direction === "down") {
      if (frameCount % MOVE_DELAY === 0) {
        this.bodyArray[0].y += height/GRID_SIZE;
      }
    }

    else if (this.direction === "left") {
      if (frameCount % MOVE_DELAY === 0) {
        this.bodyArray[0].x -= width/GRID_SIZE;
      }
    }

    else if (this.direction === "up") {
      if (frameCount % MOVE_DELAY === 0) {
        this.bodyArray[0].y -= height/GRID_SIZE;
      }
    }
  }
}