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
  superState = "Breakout";
  breakState = "start";
  breakoutTitleMusic.loop();
}

//state related and specific game functions
function superStateStuff() {

  if (superState === "start") {
    push();
    textSize(100);
    text("Click to Start", width/2 - textWidth("Click to Start")/2, height/2);
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
  else if (superState === "Breakout") {
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
    alert("all games use wasd controls and use click to shoot projectiles. When a game has been won or lost, press enter to return to menu");
    mainMenuMusic.loop();
    superState = "Start Game";
  }
}

//key detection for all 3 games
function keyPressed() {

  if (asteroidsState === "lose" || gameState === "LOSE" || breakState === "lose" || asteroidsState === "win" || gameState === "WIN" || breakState === "win") {
    if (keyIsDown(13)) {
      universalLoseMusic.stop();
      universalWinMusic.stop();
      superState = "Start Game";
      asteroidsState = "none";
      gameState = "none";
      breakState = "none";
    }
  }

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

  //space invaders key binds
  else if (superState === "Breakout") {
    
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