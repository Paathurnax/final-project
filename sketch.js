// Game Player
// Jacob Koshman
// November 19th, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const MAX_ASTEROIDS = 10;
const ASTEROID_SIZE = 50;
let asteroidArray = [];
let spaceCoalition;
let asteroidDist;
let moveDelay = 50;
let creationDelay = 1000;
let x;
let isDead = false;
let clickCount = 0;

class Create {
  constructor() {
    this.x = -width/2;
    this.y = height;
    this.distBetween = asteroidDist;
    this.isDead = false;
  }

  createAsteroid() {
    if (!this.isDead) {
      circle(this.x, this.y, ASTEROID_SIZE/2);
      if (this.y > 0) {
        this.y -= this.distBetween;
      }
    }
  }

  moveAsteroid() {
    if (this.x<width && frameCount%moveDelay === 0) {
      this.x += random(10, 50);
    }
  }

  dead() {
    if (clickCount === 3) {
      this.isDead = true;
    }
    else {
      this.isDead = false;
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  asteroidDist = height/MAX_ASTEROIDS;
  x = -width/2;
  for (let i = 0; i<MAX_ASTEROIDS; i++) {
    let meteor = new Create();
    asteroidArray.push(meteor);
  }
}

function draw() {
  background(220);
  for (let spaceRock of asteroidArray) {
    spaceRock.createAsteroid();
    spaceRock.moveAsteroid();
    spaceRock.dead();
  }
  if (clickCount>3){
    clickCount === 0;
  }
}

function mousePressed() {
  clickCount++;
}

// function createAsteroids() {
//   let y = height/3;
//   for (let i = 0; i<MAX_ASTEROIDS; i++) {
//     circle(x, y, ASTEROID_SIZE/2);
//     y -= asteroidDist;
//   }
// }

// function moveAsteroids() {
//   if (x<width && frameCount%moveDelay === 0) {
//     x += random(10, 50);
//   }
// }
