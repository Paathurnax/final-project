// Game Player
// Jacob Koshman
// November 19th, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const MAX_ASTEROIDS = 9;
const ASTEROID_SIZE = 50;
let asteroidArray = [];
let spaceCoalition;
let asteroidDist;
let moveDelay = 50;
let creationDelay = 1000;
let x;
let isDead = false;


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  asteroidDist = height/ MAX_ASTEROIDS;
  x = -width/2;
}

function draw() {
  background(220);
  createAsteroids();
  moveAsteroids();
  if (frameCount%creationDelay === 0 || x===width) {
    createAsteroids();
  }
}

function createAsteroids() {
  let y = height/2;
  for (let i = 0; i<MAX_ASTEROIDS; i++) {
    circle(x, y, ASTEROID_SIZE/2);
    y -= asteroidDist;
  }
}

function moveAsteroids() {
  if (x<width && frameCount%moveDelay === 0) {
    x += random(10, 50);
  }
}
