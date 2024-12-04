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
let y;
let clickCount = 0;
let isDead = false;

// class Create {
//   constructor(x, y) {
//     this.x = x;
//     this.y = y;
//     this.isDead = false;
//   }

//   createAsteroid() {
//     if (!this.isDead) {
//       circle(this.x, this.y, ASTEROID_SIZE/2);
//     }
//   }

//   moveAsteroid() {
//     if (this.x<width && frameCount%moveDelay === 0) {
//       this.x += random(10, 50);
//     }
//   }

//   dead() {
//     if (clickCount === 3) {
//       this.isDead = true;
//     }
//     else {
//       this.isDead = false;
//     }
//   }
// }

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  asteroidDist = height/MAX_ASTEROIDS;
}

function draw() {
  background(220);
  createAsteroids();
  moveAsteroids();
  dead();
}

function mousePressed() {
  if (dist(mouseX, mouseY, x, y) <= ASTEROID_SIZE) {
    clickCount++;
  }
}

function createAsteroids() {
  let offsetX = 0;
  let offsetY = 0;
  offsetX += random(ASTEROID_SIZE, ASTEROID_SIZE*2);
  offsetY += random(ASTEROID_SIZE, ASTEROID_SIZE*2);
  for (let i = 0; i<MAX_ASTEROIDS; i++) {
    let y = 100*noise(0.010*frameCount + 10000);
    let x = 100*noise(0.010*frameCount);
    circle(x+offsetX, y+offsetY, ASTEROID_SIZE/2);
  }
}

function moveAsteroids() {
  if (x<width && frameCount%moveDelay === 0) {
    x += random(10, 50);
  }  
} 
 

function dead() {
  if (clickCount === 3) {
    isDead = true;
  }
  else {
    isDead = false;
  }
}
