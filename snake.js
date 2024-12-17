//snake

let grid;
const SQUARESIZE = 50;

function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = new grid(windowWidth, windowHeight);
}

function draw() {
}

class Grid {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.size = width/SQUARESIZE;
  }
}