// Game Player
// Jacob Koshman
// November 19th, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let superState = "start";
let buttonOffset = 25;

function setup() {
  createCanvas(windowWidth, windowHeight);
  superStateStuff();
}

function draw() {
  background(220);
}

function createGameButtons() {
  button1 = createButton("Asteroids");
  button2 = createButton("Snake");
  button3 = createButton("Space Invaders");

  button1.position(width/2-buttonOffset, height/2);
  button2.position(width/2, height/2);
  button3.position(width/2+buttonOffset, height/2);

  button1.mousePressed(startAsteroids);
  button2.mousePressed(startSnake);
  button3.mousePressed(startSpaceInvaders);

  button1.draggable();
  button2.draggable();
  button3.draggable();
}

function startAsteroids() {
  superState = "asteroids";
}

function startSnake() {
  superState = "snake";
}

function startSpaceInvaders() {
  superState = "spaceInvaders";
}

function superStateStuff() {
  if (superState === "start") {
    createGameButtons();
    button.show();
    button2.show();
    button3.show();
  }
  else if (superState === "asteroids") {
    stateStuff();
    button.hide();
    button2.hide();
    button3.hide();
  }
}
