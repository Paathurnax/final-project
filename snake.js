//snake

let grid;
const SQUARESIZE = 50;

// function setup() {
//   createCanvas(windowWidth, windowHeight);
// }
// function draw() {
// }

class Grid {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.size = width/SQUARESIZE;
    this.gridArray = [];
    this.color = "green";
  }

  createGrid() {
    for (let x = 0; x<this.size; x++) {
      this.gridArray[x] = [];
      for (let y = 0; y<this.size; y++) {
        this.gridArray[x][y] = this.color;
      }
    }
    this.displayGrid();
  }

  displayGrid() {
    for (let x = 0; x<this.size; x++) {
      for (let y = 0; y<this.size; y++) {
        if (this.gridArray[x][y] === this.color) {
          fill(this.color);
        }

        else {
          console.error("how did that happen?");
        }

        square(x*SQUARESIZE, y*SQUARESIZE, SQUARESIZE);
      }
    }
  }
}