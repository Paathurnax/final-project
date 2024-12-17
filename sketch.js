// Game Player
// Jacob Koshman
// November 19th, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const ROT_ANGLE = 0.1;
const FORCE_DIVIDER = 0.7;
const MAX_ASTEROIDS = 25;
const VEL_MULTI = 5;
const DRAG = 0.99;
const ASTEROID_SIZE = 25;
const MIN_DIVISER = 5;
let minSize = ASTEROID_SIZE/MIN_DIVISER;
let ship;
let asteroids = [];
let lasers = [];
let gameOver;
let youWon;
let invulnurable = false;
let answer;
let score = 0;
let state = "start";
let textOffset = 200;

function setup() {
  createCanvas(windowWidth, windowHeight);
  ship = new Ship();
  for (let i = 0; i<MAX_ASTEROIDS; i++) {
    asteroids.push(new Asteroid());
  }
  createStartButton();
}

function draw() {
  background(220);
  stateStuff();
}

function mousePressed() {
  lasers.push(new Laser(ship.pos, ship.heading));
}

function keyPressed() {
  if (keyIsDown(65)) {
    ship.setRotation(-0.1);
  } 
  else if (keyIsDown(68)) {
    ship.setRotation(0.1);
  }
  else if(keyIsDown(87)) {
    ship.boosting = true;
    ship.boost();
  }
  else if(keyIsDown(192)) {
    answer = prompt("command console");
    if (answer === "IDDQD") {
      invulnurable = true;
    }
    else if (answer === "AUTOWIN") {
      youWon = true;
    }
    else if (answer === "AUTOLOSE") {
      gameOver = true;
    }
    else {
      alert("Not A CheatCode");
    }
  }
}

function keyReleased() {
  ship.setRotation(0);
  ship.boosting = false;
}

function stateStuff() {
  if (state === "start") {
    background(0);
    push();
    fill(255);
    textSize(100);
    textWidth(textOffset*2);
    text("ASTEROIDS", width/2-textOffset*1.5, height-textOffset*2.5);
    button.show();
    pop();
  }
  else if (state === "asteroids") {
    if (!gameOver && !youWon) {
      laserStuff();
      asteroidStuff();
      shipFunctions();
      textSize(50);
      button.hide();
      text(score, width-100, 50);
      if (score === MAX_ASTEROIDS*MIN_DIVISER*3) {
        youWon = true;
      }
    }
    else if (gameOver) {
      text("you lose!", width/2, height/2);
      textSize(100);
      textAlign(CENTER);
    }
    else {
      text("you win!", width/2, height/2);
      textSize(100);
      textAlign(CENTER);
    }
  }
}

function createStartButton() {
  button = createButton("Start");
  button.mouseClicked(changeState);
  button.size(100);
  button.center();
}

function changeState() {
  state = "asteroids";
}
function shipFunctions() {
  ship.render();
  ship.turn();
  ship.update();
  ship.edges();
}

function laserStuff() {
  for (let i = lasers.length-1; i>=0; i--) {
    lasers[i].render();
    lasers[i].update();
    if(lasers[i].offScreen()) {
      lasers.splice(i, 1);
    }
    else{     
      for (let j = asteroids.length-1; j>=0; j--) {
        if (lasers[i].hits(asteroids[j])) {
          score++;
          if (asteroids[j].size > minSize) {
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
}

function asteroidStuff() {
  for (let i = 0; i<asteroids.length; i++) {
    if (ship.hits(asteroids[i])) {
      gameOver = true;
    }
    asteroids[i].render();
    asteroids[i].update();
    asteroids[i].edges();
  }
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
    if(!invulnurable && frameCount>300) {
      let distance = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
      return distance<this.size+asteroid.size*1.5;
    }
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
      this.size = 25;
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
    return distance<asteroid.size*1.5;
  }
  
  offScreen() {
    return this.pos.x > width || this.pos.x < 0 || (this.pos.y > height || this.pos.y < 0);
  }
}