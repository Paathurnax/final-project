// Game Player
// Jacob Koshman
// November 19th, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const MAX_ASTEROIDS = 10;
let asteroidArray = [];
let positions;
let posArray = [];
let meteor;

function preload() {
  meteor = loadModel("asteroid.obj", true);
}

class Asteroid {
  constuctor(x, y) {
    this.x = x;
    this.y = y;
    this.rotYSpeed = frameCount*0.01;
  }

  display() {
    
  }

  rotate() {
    rotateY(this.rotYSpeed);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  for (let i = 0; i<MAX_ASTEROIDS; i+=1) {
    posArray.push(createVector(random(-width/2, width/2), random(-height/2, height/2), random(-width/2, width/2)));
  }
}

function draw() {
  background(220);
  orbitControl();
  scale(0.5);
  for (let i = 0; i<MAX_ASTEROIDS; i+=1) {
    translate(posArray[i].x, posArray[i].y, posArray[i].z);
    model(meteor);
  }
}
