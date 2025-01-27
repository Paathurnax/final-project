// Game Player
// Jacob Koshman
// November 19th, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//initializing the variables
let superState = "start";
let buttonSize = 120;


//loading the background for asteroids (not currently being used)
function preload() {
  // bg = loadImage("space.gif");
  pew = loadSound("assets/laser_shooting_sfx.wav");
  asteroidsTitleMusic = loadSound("assets/asteroidsMain.mp3");
  snakeTitleMusic = loadSound("assets/snakeMain.wav");
  asteroidsBackgroundMusic = loadSound("assets/asteroidsbg.ogg");
  snakeBackgroundMusic = loadSound("assets/snakebg.wav");
  buttonPressedSound = loadSound("assets/button.wav");
  snakeEatingSound = loadSound("assets/snakeEat.ogg");
  breakoutTitleMusic = loadSound("assets/breakoutMain.mp3");
  mainMenuMusic = loadSound("assets/MainMenu.mp3");
  universalLoseMusic = loadSound("assets/YouLost.ogg");
  universalWinMusic = loadSound("assets/YouWon.mp3");
  breakoutBackgroundMusic = loadSound("assets/breakoutbg.ogg");
}


//using all the classes
function setup() {
//creating the canvas and centering it
  let cnv = createCanvas(windowHeight, windowHeight);
  let canvasX = (windowWidth-width)/2;
  let canvasY = (windowHeight-height)/2;
  cnv.position(canvasX, canvasY);
  controllerStuff();
  
  snake = new Snake();
  ship = new Ship();
  food = new Consumable();
  ball = new Ball();
  paddle = new Paddle();
  bricks = new Brick();

  //creating the asteroids
  for (let i = 0; i<MAX_ASTEROIDS; i++) {
    asteroids.push(new Asteroid());
  }

  bricks.createBricks();

  //button functions
  createGameButtons();
  createStartButton();
  createSnakeButton();
  createBreakoutButton();
}

//super state function and rendering the background
function draw() {
  background(220);
  superStateStuff();
}

//creating all three of the game buttons
function createGameButtons() {
  asteroidsButton = createButton("Asteroids");
  snakeButton = createButton("Snake");
  breakoutButton = createButton("Breakout");

  asteroidsButton.position(windowWidth/2-buttonSize/2, height/2-buttonSize/4);
  snakeButton.position(windowWidth/2-buttonSize/2, height/2);
  breakoutButton.position(windowWidth/2-buttonSize/2, height/2+buttonSize/4);

  asteroidsButton.mousePressed(startAsteroids);
  snakeButton.mousePressed(startSnake);
  breakoutButton.mousePressed(startBreakout);

  asteroidsButton.size(buttonSize, buttonSize/4);
  snakeButton.size(buttonSize, buttonSize/4);
  breakoutButton.size(buttonSize, buttonSize/4);
}

//fucntions for each game button to run when clicked
function startAsteroids() {
  buttonPressedSound.play();
  superState = "asteroids";
  asteroidsState = "start";
  asteroidsTitleMusic.loop();
}

function startSnake() {
  buttonPressedSound.play();
  superState = "snake";
  gameState = "start";
  snakeTitleMusic.loop();
}

function startBreakout() {
  buttonPressedSound.play();
  superState = "breakout";
  breakState = "start";
  breakoutTitleMusic.loop();
}

//state related and specific game functions
function superStateStuff() {

  if (superState === "start") {
    push();
    textSize(50);
    text("Click to Start/Press A to Start", width/2 - textWidth("Click to Start/Press A to Start")/2, height/2);
    pop();
    asteroidsButton.hide();
    snakeButton.hide();
    breakoutButton.hide();
    asteroidsStartButton.hide();
    snakeGameButton.hide();
    breakoutStartButton.hide();
  }

  //hiding and showing buttons when needed
  else if (superState === "Start Game") {
    push();
    textSize(100);
    text("The Mini-Arcade", width/2 - textWidth("The Mini-Arcade")/2, height/3);
    asteroidsButton.show();
    snakeButton.show();
    breakoutButton.show();
    asteroidsStartButton.hide();
    snakeGameButton.hide();
    breakoutStartButton.hide();
  }

  //starting the asteroids game
  else if (superState === "asteroids") {
    stateStuff();
  }

  //starting snake
  else if (superState === "snake") {
    snakeStuff(snake);
  }

  //starting Breakout
  else if (superState === "breakout") {
    breakoutStuff();
  }

  //hiding the game buttons when the state changes
  if (superState !== "start" && superState !== "Start Game") {
    asteroidsButton.hide();
    snakeButton.hide();
    breakoutButton.hide();
    mainMenuMusic.stop();
  }
}

//shooting a laser when the mouse is pressed while playing asteroids
function mousePressed() {
  if (asteroidsState === "asteroids") {
    lasers.push(new Laser(ship.pos, ship.heading));
    pew.play();
  }

  if (superState === "start") {
    alert("all games use wasd controls and use click to shoot projectiles");
    mainMenuMusic.loop();
    superState = "Start Game";
  }
}

//key detection for all 3 games
function keyPressed() {

  //for asteroids
  if (asteroidsState === "asteroids") {

    //rotating the ship
    if (keyIsDown(65)) {
      ship.setRotation(-0.1);
    } 
    else if (keyIsDown(68)) {
      ship.setRotation(0.1);
    }

    //moving the ship
    else if(keyIsDown(87)) {
      ship.boosting = true;
      ship.boost();
    }

    //this is a secret lol
    else if(keyIsDown(192)) {
      answer = prompt("command console");
      asteroidsCheatMenu(answer);
    }
  }

  //snake keybinds
  else if (superState === "snake") {
    //changing the movement direction of the snake
    if (keyIsDown(87) && snake.direction !== "down" && snake.bodyArray[0].x < width && snake.bodyArray[0].x > 0 && snake.bodyArray[0].y > 0 && snake.bodyArray[0].y < height) {
      snake.direction = "up";
    }

    else if (keyIsDown(65) && snake.direction !== "right" && snake.bodyArray[0].x < width && snake.bodyArray[0].x > 0 && snake.bodyArray[0].y > 0 && snake.bodyArray[0].y < height) {
      snake.direction = "left";    
    }

    else if (keyIsDown(68) && snake.direction !== "left" && snake.bodyArray[0].x < width && snake.bodyArray[0].x > 0 && snake.bodyArray[0].y > 0 && snake.bodyArray[0].y < height) {
      snake.direction = "right";    
    }

    else if (keyIsDown(83) && snake.direction !== "up" && snake.bodyArray[0].x < width && snake.bodyArray[0].x > 0 && snake.bodyArray[0].y > 0 && snake.bodyArray[0].y < height) {
      snake.direction = "down";    
    }
  }
}

//key released function
function keyReleased() {

  //stops accelerating the ship when the key is no longer being pressed and stops ship rotation
  if (asteroidsState === "asteroids") {
    ship.setRotation(0);
    ship.boosting = false;
  }
}

function asteroidsCheatMenu(answer) {
  if (answer === "IDDQD") {
    invulnurable = true;
  }
  else if (answer === "AUTOWIN") {
    asteroidsState = "win";
  }
  else if (answer === "AUTOLOSE") {
    asteroidsState = "lose";
  }
  else if (answer === "MAIN MENU") {
    asteroidsState = "start";
  }
  else {
    alert("Not A CheatCode");
  }
}

function controllerStuff() {
  if (Controller && Controller.supported) {
    Controller.search();
  }
  window.addEventListener('gc.analog.hold', function (event) {
    let analog = event.detail;
    gameAnalog(analog);
  }, false);

  window.addEventListener('gc.analog.change', function (event) {
    let thing = event.detail;
    analogChange(thing);
  }, false);

  window.addEventListener('gc.button.press', function (event) {
    let button = event.detail;
    gameButton(button);
  }, false);

  window.addEventListener('gc.button.release', function (event) {
    let button = event.detail;
    buttonRelease(button);
  }, false);
}

function gameAnalog(analog) {
  if (superState === "snake" && gameState === "Start Game") {
    if (analog.name === "LEFT_ANALOG_STICK") {
      if (analog.position.x > 0.5 && snake.direction !== "left" && snake.bodyArray[0].x < width && snake.bodyArray[0].x > 0 && snake.bodyArray[0].y > 0 && snake.bodyArray[0].y < height) {
        snake.direction = "right";
      }

      else if (analog.position.x < -0.5 && snake.direction !== "right" && snake.bodyArray[0].x < width && snake.bodyArray[0].x > 0 && snake.bodyArray[0].y > 0 && snake.bodyArray[0].y < height) {
        snake.direction = "left";
      }

      else if (analog.position.y < -0.5 && snake.direction !== "down" && snake.bodyArray[0].x < width && snake.bodyArray[0].x > 0 && snake.bodyArray[0].y > 0 && snake.bodyArray[0].y < height) {
        snake.direction = "up";
      }

      else if (analog.position.y > 0.5 && snake.direction !== "up" && snake.bodyArray[0].x < width && snake.bodyArray[0].x > 0 && snake.bodyArray[0].y > 0 && snake.bodyArray[0].y < height) {
        snake.direction = "down";
      }
    }
  }

  if (superState === "asteroids" && asteroidsState === "asteroids") {
    if (analog.name === "LEFT_ANALOG_STICK") {
      if (analog.position.x > 0.5) {
        ship.setRotation(0.1);
      }

      else if (analog.position.x < -0.5) {
        ship.setRotation(-0.1);
      }
    }
  }

  if (superState === "breakout" && breakState === "Start Game") {
    if (analog.name === "LEFT_ANALOG_STICK") {
      if (analog.position.x > 0.5) {
        paddle.move("right");      
      }
      else if (analog.position.x < -0.5) {
        paddle.move("left");
      }
    }
  }
}

function gameButton(button) {
  if (superState === "asteroids" && asteroidsState === "asteroids") {
    if (button.name === "FACE_1") {
      ship.boosting = true;
      ship.boost();
    }

    else if (button.name === "RIGHT_SHOULDER_BOTTOM") {
      lasers.push(new Laser(ship.pos, ship.heading));
      pew.play();
    }

    else if (button.name === "START") {
      answer = prompt("command console");
      asteroidsCheatMenu(answer);
    }
  }

  if (superState === "start") {
    if (button.name === "FACE_1") {
      alert("all games use wasd controls and use click to shoot projectiles. Also, all games now use controlller inputs except for start buttons");
      mainMenuMusic.loop();
      superState = "Start Game";
    }
  }
}

function analogChange() {
  if (superState === "asteroids") {
    ship.setRotation(0);
  }
}

function buttonRelease() {
  if (superState === "asteroids") {
    ship.boosting = false;
  }
}