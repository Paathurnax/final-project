// Game Player
// Jacob Koshman
// November 19th, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const MAX_ASTEROIDS = 10;
const ASTEROID_SIZE = 50;
const MOVE_SPEED = 5;
let asteroidArray = [];
let posArray = [];
let spaceCoalition;
let space;
let delay = 50;

// function preload() {
//   space = loadImage("space.gif");
// }

class AsteroidCreation {
  constuctor(y, distance) {
    this.speed = MOVE_SPEED;
    this.asteroidDist = distance;
    this.y = y;
  }

  display() {
    for (let i = 0; i<MAX_ASTEROIDS; i++) {
      circle(ASTEROID_SIZE, this.y, ASTEROID_SIZE);
      this.y -= this.asteroidDist;
    }
  }
  // move() {
  //   if (frameCount%delay === 0) {
  //     for (let i = 0; i<MAX_ASTEROIDS; i++) {
  //       posArray[i]
  //     }
  //   }
  // }
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  spaceCoalition = new AsteroidCreation(height, height/MAX_ASTEROIDS);
}

function draw() {
  background(220);
  spaceCoalition.display();
}
