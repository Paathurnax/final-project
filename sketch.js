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
  for (let i = 0; i<MAX_ASTEROIDS; i++) {
    if (i<5) {
      posArray.push(createVector(-width/4, random(-height/2, height/2), random(-width*0.75, width/2)));
    }
    else {
      posArray.push(createVector(width, random(-height/2, height/2), random(-width*0.75, width/2)));
    }
  }
  // makePerspective();
}

function draw() {
  background(220);
  orbitControl();
  push();
  scale(0.5);
  for (let i = 0; i<MAX_ASTEROIDS; i++) {
    translate(posArray[i].x, posArray[i].y, posArray[i].z);
    model(meteor);
  }
  pop();
}

function makePerspective() {
  let cam = createCamera();
  cam.setPosition(width/2, height*0.75, 0);
  cam.lookAt(0, height/2, 0);
}
