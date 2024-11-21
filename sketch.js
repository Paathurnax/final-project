// Game Player
// Jacob Koshman
// November 19th, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let asteroid;
const MAX_ASTEROIDS = 10;
let asteroidArray = [];

function preload() {
  asteroid = loadModel("asteroid.obj");
}

class Asteroid {
  constuctor(x, y) {
    this.x = x;
    this.y = y;
    this.rotYSpeed = frameCount*0.01;
    this.meteor = asteroid;
  }

  display() {
    for(let asteroid of asteroidArray) {
      model(asteroid);
    }
  }

  rotate() {
    rotateY(this.rotYSpeed);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
}

function draw() {
  background(220);
  orbitControl();
  for (let i = 0; i<MAX_ASTEROIDS; i++) {
    let someSpaceRock = new Asteroid;
    asteroidArray.push(someSpaceRock);
  }
}
