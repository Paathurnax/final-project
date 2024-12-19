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
}

function draw() {
  background(220);
}

function createGameButtons() {
  button = createButton();
  button2 = createButton();
  button3 = createButton();

  button.position(width/2-buttonOffset, height/2);
  button2.positon(width/2, height/2);
  button3.position(width/2+buttonOffset, height/2);

  button.mousePressed(startAsteroids);
  button2.mousePressed(startSnake);
  button3.mousePressed(startSpaceInvaders);
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
