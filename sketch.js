// Game Player
// Jacob Koshman
// November 19th, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const MAX_ASTEROIDS = 10;
let asteroidArray = [];
let posArray = [];
let spaceCoalition;
let meteor;
let space;

function preload() {
  meteor = loadModel("asteroid.obj", true);
  space = loadImage("space.gif")
}

class AsteroidCreation {
  constuctor() {
    // this.locationArray = [];
    this.rotYSpeed = frameCount*0.01;
    // this.startingRandomPosition = createVector(-width/4, random(-height/2, height/2), random(-width*0.75, width/2));
    // this.endingRandomPosition = createVector(width, random(-height/2, height/2), random(-width*0.75, width/2));
  }

  generateLocations() {
    for (let i = 0; i<MAX_ASTEROIDS; i++) {
      if (i<5) {
        posArray.push(createVector(-width/4, random(-height/2, height/2), random(-width*0.75, width/2)));
      }
      else {
        posArray.push(createVector(width, random(-height/2, height/2), random(-width*0.75, width/2)));
      }
    }
  }
  display() {
    for (let i = 0; i<MAX_ASTEROIDS; i++) {
      translate(posArray[i].x, posArray[i].y, posArray[i].z);
      model(meteor);
    }
  }

  rotate() {
    rotateY(this.rotYSpeed);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  spaceCoalition = new AsteroidCreation();
  spaceCoalition.generateLocations();
  // for (let i = 0; i<MAX_ASTEROIDS; i++) {
  //   if (i<5) {
  //     posArray.push(createVector(-width/4, random(-height/2, height/2), random(-width*0.75, width/2)));
  //   }
  //   else {
  //     posArray.push(createVector(width, random(-height/2, height/2), random(-width*0.75, width/2)));
  //   }
  // }
  // makePerspective();
}

function draw() {
  background(220);
  orbitControl();
  push();
  scale(0.5);
  spaceCoalition.display();
  spaceCoalition.rotate();
  // for (let i = 0; i<MAX_ASTEROIDS; i++) {
  //   translate(posArray[i].x, posArray[i].y, posArray[i].z);
  //   model(meteor);
  // }
  pop();
}

function makePerspective() {
  let cam = createCamera();
  cam.setPosition(width/2, height*0.75, 0);
  cam.lookAt(0, height/2, 0);
}
