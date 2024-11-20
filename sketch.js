// Game Player
// Jacob Koshman
// November 19th, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let asteroid;

function preload() {
  asteroid = loadModel("asteroid.obj");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
  background(220);
  orbitControl();
  push();
  fill(150);
  scale(0.1);
  model(asteroid);
  pop();
}
