// Game Player
// Jacob Koshman
// November 19th, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// const MAX_ASTEROIDS = 10;
// const ASTEROID_SIZE = 50;
// let asteroidArray = [];
// let spaceCoalition;
// let asteroidDist;
// let moveDelay = 50;
// let creationDelay = 1000;
// let x;
// let y;
// let clickCount = 0;
// let isDead = false;

// // class Create {
// //   constructor(x, y) {
// //     this.x = x;
// //     this.y = y;
// //     this.isDead = false;
// //   }

// //   createAsteroid() {
// //     if (!this.isDead) {
// //       circle(this.x, this.y, ASTEROID_SIZE/2);
// //     }
// //   }

// //   moveAsteroid() {
// //     if (this.x<width && frameCount%moveDelay === 0) {
// //       this.x += random(10, 50);
// //     }
// //   }

// //   dead() {
// //     if (clickCount === 3) {
// //       this.isDead = true;
// //     }
// //     else {
// //       this.isDead = false;
// //     }
// //   }
// // }

// function setup() {
//   createCanvas(windowWidth, windowHeight, WEBGL);
//   angleMode(DEGREES);
//   asteroidDist = height/MAX_ASTEROIDS;
// }

// function draw() {
//   background(220);
//   createAsteroids();
//   moveAsteroids();
//   dead();
// }

// function mousePressed() {
//   if (dist(mouseX, mouseY, x, y) <= ASTEROID_SIZE) {
//     clickCount++;
//   }
// }

// function createAsteroids() {
//   let offsetX = 0;
//   let offsetY = 0;
//   offsetX += random(ASTEROID_SIZE, ASTEROID_SIZE*2);
//   offsetY += random(ASTEROID_SIZE, ASTEROID_SIZE*2);
//   for (let i = 0; i<MAX_ASTEROIDS; i++) {
//     let y = 100*noise(0.010*frameCount + 10000);
//     let x = 100*noise(0.010*frameCount);
//     circle(x+offsetX, y+offsetY, ASTEROID_SIZE/2);
//   }
// }

// function moveAsteroids() {
//   if (x<width && frameCount%moveDelay === 0) {
//     x += random(10, 50);
//   }  
// } 
 

// function dead() {
//   if (clickCount === 3) {
//     isDead = true;
//   }
//   else {
//     isDead = false;
//   }
// }

const ROT_ANGLE = 0.1;
const FORCE_DIVIDER = 0.5;
const MAX_ASTEROIDS = 10;
const VEL_MULTI = 2.5;
const DRAG = 0.99;
const MIN_SIZE = 10;
let ship;
let asteroids = [];
let lasers = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  ship = new Ship();
  for (let i = 0; i<MAX_ASTEROIDS; i++) {
    asteroids.push(new Asteroid());
  }
}

function draw() {
  background(220);
  
  for (let i = 0; i<asteroids.length; i++) {
    if (ship.hits(asteroids[i])) {
      console.log("oops");
    }
    asteroids[i].render();
    asteroids[i].update();
    asteroids[i].edges();
  }
  
  for (let i = lasers.length-1; i>=0; i--) {
    lasers[i].render();
    lasers[i].update();
    if(lasers[i].offScreen()) {
      lasers.splice(i, 1);
    }
    else{     
      for (let j = asteroids.length-1; j>=0; j--) {
        if (lasers[i].hits(asteroids[j])) {
          if (asteroids[j].size > MIN_SIZE) {
            let newAsteroids = asteroids[j].breakApart();       
            asteroids = asteroids.concat(newAsteroids);
          }
          asteroids.splice(j, 1);
          lasers.splice(i, 1);
          break;
        }
      }
    }
  }
  shipFunctions();
}

function mousePressed() {
  lasers.push(new Laser(ship.pos, ship.heading));
}

function keyPressed() {
  if (keyIsDown(65)) {
    ship.setRotation(0.1);
  } 
  else if (keyIsDown(68)) {
    ship.setRotation(-0.1);
  }
  else if(keyIsDown(87)) {
    ship.boosting = true;
    ship.boost();
  }
}

function keyReleased() {
  ship.setRotation(0);
  ship.boosting = false;
}

function shipFunctions() {
  ship.render();
  ship.turn();
  ship.update();
  ship.edges();
}

class Ship {
  constructor() {
    this.pos = createVector(width/2, height/2);
    this.size = 10;
    this.angle = 0;
    this.heading = 0;
    this.velocity = createVector(0, 0);
    this.boosting = false;
  }
  
  render() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.heading+PI/2);
    fill("blue");
    triangle(-this.size, this.size, this.size, this.size, 0, -this.size);
    pop();
  }
  
  update() {
    this.pos.add(this.velocity);
    this.velocity.mult(DRAG);
  }
  
  setRotation(angle) {
    this.angle = angle;
  }
  
  turn() {
    this.heading += this.angle;
  }
  
  boost() {
    if (this.boosting) {
      let force = p5.Vector.fromAngle(this.heading);
      force.mult(FORCE_DIVIDER);
      this.velocity.add(force);
    } 
  }
  
  edges() {
    if (this.pos.x > width+this.size) {
      this.pos.x = -this.size;
    }
    
    else if(this.pos.x < -this.size) {
      this.pos.x = width+this.size;
    }
    
    if (this.pos.y > height+this.size) {
      this.pos.y = -this.size;
    }
    
    else if(this.pos.y < -this.size) {
      this.pos.y = height+this.size;
    }
  }
  
  hits(asteroid) {
    let distance = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    return distance<this.size+asteroid.size;
  }
}

class Asteroid {
  constructor(pos, size) {
    if (pos) {
      this.pos = pos.copy();
    }
    else {
      this.pos = createVector(random(width), random(height));
    }
    
    if(size) {
      this.size = size/2;
    }
    else {
      this.size = random(5, 25);
    }
    this.velocity = p5.Vector.random2D();
    this.vertexAmount = floor(random(5, 15));
    this.offset = [];
    for (let k = 0; k<this.vertexAmount; k++) {
      this.offset[k] = random(-this.size/2, this.size);
    }
  }
  render() {
    push();
    translate(this.pos.x, this.pos.y);
    beginShape();
    for (let j = 0; j<this.vertexAmount; j++) {
      let angle = map(j, 0, this.vertexAmount, 0, TWO_PI);
      let newSize = this.size+this.offset[j];
      let x = newSize*cos(angle);
      let y = newSize*sin(angle);
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
  }
  
  update() {
    this.pos.add(this.velocity);
  }
  
  edges() {
    if (this.pos.x > width+this.size) {
      this.pos.x = -this.size;
    }
    
    else if(this.pos.x < -this.size) {
      this.pos.x = width+this.size;
    }
    
    if (this.pos.y > height+this.size) {
      this.pos.y = -this.size;
    }
    
    else if(this.pos.y < -this.size) {
      this.pos.y = height+this.size;
    }
  }
  
  breakApart() {
    let newSpaceRocks = [];
    newSpaceRocks[0] = new Asteroid(this.pos, this.size);
    newSpaceRocks[1] = new Asteroid(this.pos, this.size);
    return newSpaceRocks;
  }
}

class Laser {
  constructor(shipPos, angle) {
    this.pos = createVector(shipPos.x, shipPos.y);
    this.velocity = p5.Vector.fromAngle(angle);
    this.velocity.mult(VEL_MULTI);
    
  }
  update() {
    this.pos.add(this.velocity);
  }
  
  render() {
    push();
    stroke("red");
    strokeWeight(4);
    point(this.pos.x, this.pos.y);
    pop();
  }
  
  hits(asteroid) {
    let distance = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    return distance<asteroid.size;
  }
  
  offScreen() {
    return this.pos.x > width || this.pos.x < 0 || (this.pos.y > height || this.pos.y < 0);
  }
}