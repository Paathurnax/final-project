//asteroids
 
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
let invulnurable = false;
let answer;
let score = 0;
let asteroidsState = "start";
let textOffset = 200;
let asteroidsStartButton;
let gameOver;
let gameWon;
let spawnTimer;

function stateStuff() {
  //Start screen
  if (asteroidsState === "start") {
    background(0);
    
    push();
    fill(255);
    //title text
    textSize(100);
    textWidth(textOffset*2);
    text("ASTEROIDS", width/2-textOffset*1.5, height-textOffset*2.5);
    asteroidsStartButton.show();
    pop();
  }

  //starting the game
  else if (asteroidsState === "asteroids") {
    laserStuff();
    asteroidStuff();
    shipFunctions();
    textSize(50);
    asteroidsStartButton.hide();
    text(score, width-100, 50);
    if (score === MAX_ASTEROIDS*MIN_DIVISER*3) {
      asteroidsState = "win";
    }
  }

  //you lost
  if (asteroidsState === "lose") {
    push();
    text("you lose!", width/2-textWidth("you lose!")/2, height/2);
    textSize(100);
    pop();
    asteroidsBackgroundMusic.stop();
  }

  //you won
  if (asteroidsState === "win") {
    push();
    text("you win!", width/2-textWidth("you win!")/2, height/2);
    textSize(100);
    pop();
    asteroidsBackgroundMusic.stop();
  }
}


//creating the button that starts the game
function createStartButton() {
  asteroidsStartButton = createButton("Start");
  asteroidsStartButton.mouseClicked(changeState);
  asteroidsStartButton.size(buttonSize, buttonSize/4);
  asteroidsStartButton.position(windowWidth/2-buttonSize/2, height/2);
}

//function for the button to run when clicked
function changeState() {
  buttonPressedSound.play();
  asteroidsState = "asteroids";
  asteroidsTitleMusic.stop();
  asteroidsBackgroundMusic.loop();
}

//exactly what the name says
function shipFunctions() {
  ship.render();
  ship.turn();
  ship.update();
  ship.edges();
}

//laser functions and loops
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
          //checking if the asteroid is big enough to be hit
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

//asteroid functions and loops
function asteroidStuff() {
  for (let i = 0; i<asteroids.length; i++) {
    if (ship.hits(asteroids[i])) {
      asteroidsState = "lose";
    }

    //running the asteroid fucntions
    asteroids[i].render();
    asteroids[i].update();
    asteroids[i].edges();
  }
}

//class for the player
class Ship {

  //initializing the variables
  constructor() {
    this.pos = createVector(width/2, height/2);
    this.size = 10;
    this.angle = 0;
    this.heading = 0;
    this.velocity = createVector(0, 0);
    this.boosting = false;
  }
  
  //rendering the ship
  render() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.heading+PI/2);
    fill("blue");
    triangle(-this.size, this.size, this.size, this.size, 0, -this.size);
    pop();
  }
  
  //updating the ship for velocity changes
  update() {
    this.pos.add(this.velocity);
    this.velocity.mult(DRAG);
  }
  
  //turning the ship
  setRotation(angle) {
    this.angle = angle;
  }
  
  //turning the ship 2
  turn() {
    this.heading += this.angle;
  }
  
  //adding velocity
  boost() {
    if (this.boosting) {
      let force = p5.Vector.fromAngle(this.heading);
      force.mult(FORCE_DIVIDER);
      this.velocity.add(force);
    } 
  }
  
  //making the ship go from side to side when hitting the edge of the canvas
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
  
  //hit detection for when the ship hits an asteroid
  hits(asteroid) {
    spawnTimer = millis();
    //statement to check if a specific cheatcode was used and if the spawn timer has run out
    if(!invulnurable && spawnTimer>5000) {
      let distance = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
      return distance<this.size+asteroid.size*1.5;
    }
  }
}

//class for the asteroids
class Asteroid {
  
  //randomizing initial positions and changing size when needed
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

    //radnomizing the vertex amounts and the asteroids velocity
    this.velocity = p5.Vector.random2D();
    this.vertexAmount = floor(random(5, 15));
    this.offset = [];
    for (let k = 0; k<this.vertexAmount; k++) {
      this.offset[k] = random(-this.size/2, this.size);
    }
  }

  //displaying the asteroids
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
  
  //moving the asteroids across the screen
  update() {
    this.pos.add(this.velocity);
  }
  
  //teleporting the asteroid to the opposite side of the canvas when an edge is hit
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
  
  //creating new, smaller asteroids whenever it is shot by the player
  breakApart() {
    let newSpaceRocks = [];
    newSpaceRocks[0] = new Asteroid(this.pos, this.size);
    newSpaceRocks[1] = new Asteroid(this.pos, this.size);
    return newSpaceRocks;
  }
}

//class for the lasers fired by the player
class Laser {

  //initial location and launch angle
  constructor(shipPos, angle) {
    this.pos = createVector(shipPos.x, shipPos.y);
    this.velocity = p5.Vector.fromAngle(angle);
    this.velocity.mult(VEL_MULTI);
    
  }

  //moving the laser
  update() {
    this.pos.add(this.velocity);
  }
  
  //displaying the laser
  render() {
    push();
    stroke("red");
    strokeWeight(4);
    point(this.pos.x, this.pos.y);
    pop();
  }
  
  //hit detection to check if the laser has hit an asteroid
  hits(asteroid) {
    let distance = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    return distance<asteroid.size*1.5;
  }
  
  //removing the laser when it leaves the screen
  offScreen() {
    return this.pos.x > width || this.pos.x < 0 || (this.pos.y > height || this.pos.y < 0);
  }
}