//snake

const GRID_SIZE = 100;

class Grid {
  constructor() {
  }

  displayGrid() {
    for (let x = 0; x< width; x+= width/GRID_SIZE) {
      for (let y = 0; y <height; y += height / GRID_SIZE) {
        stroke(0);
        strokeWeight(1);
        line(x, 0, x, height);
        line(0, y, width, y);
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
      this.bodyArray[0].x += width/GRID_SIZE/15;
    }

    else if (this.direction === "down") {
      this.bodyArray[0].y += height/GRID_SIZE/15;
    }

    else if (this.direction === "left") {
      this.bodyArray[0].x -= width/GRID_SIZE/15;
    }

    else if (this.direction === "up") {
      this.bodyArray[0].y -= height/GRID_SIZE/15;
    }
  }
}