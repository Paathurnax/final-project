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

function preload() {
  space = loadImage("space.gif");
}

class AsteroidCreation {
  constuctor() {
    this.speed = MOVE_SPEED;
  }

  generateLocations() {
    for (let i = 0; i<MAX_ASTEROIDS; i++) {
      if (i<5) {
        posArray.push(createVector(-width/4, random(-height/2, height/2), 0));
      }
      else {
        posArray.push(createVector(width*0.99, random(-height/2, height/2), 0));
      }
    }
  }
  display() {
    for (let i = 0; i<MAX_ASTEROIDS; i++) {
      circle(posArray[i].x, posArray[i].y, ASTEROID_SIZE);
    }
  }
  move() {
    if 
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  spaceCoalition = new AsteroidCreation();
  spaceCoalition.generateLocations();
}

function draw() {
  background(220);
  push();
  spaceCoalition.display();
  pop();
}
